/**
 * Interactive 3D WebGL Molecular Viewer powered by Three.js
 * Enables real-time rotation, zoom, pan, atom/nucleotide picking,
 * distance measurement, multiple rendering styles (Ball & Stick, Space-Filling, Ribbon/Ladder),
 * and spatial feature annotations in 3D space.
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import {
  MoleculeModelData,
  Atom3D,
  RenderStyle,
  ColorScheme,
  SpatialFeatureAnnotation,
  ELEMENT_PROPERTIES,
  BASE_COLORS,
  STRAND_COLORS
} from './moleculeData';
import {
  Rotate3d,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Eye,
  Camera,
  Layers,
  Ruler,
  Info,
  Sparkles,
  RefreshCw,
  Compass,
  Download,
  Crosshair
} from 'lucide-react';

interface MoleculeViewer3DProps {
  modelData: MoleculeModelData;
  renderStyle: RenderStyle;
  colorScheme: ColorScheme;
  showAnnotations: boolean;
  showHBonds: boolean;
  showHelicalAxis: boolean;
  isAutoRotating: boolean;
  autoRotateSpeed: number;
  selectedNucleotideIndex: number | null;
  onSelectNucleotide: (index: number | null) => void;
  onSelectAnnotation?: (annotation: SpatialFeatureAnnotation) => void;
}

export const MoleculeViewer3D: React.FC<MoleculeViewer3DProps> = ({
  modelData,
  renderStyle,
  colorScheme,
  showAnnotations,
  showHBonds,
  showHelicalAxis,
  isAutoRotating,
  autoRotateSpeed,
  selectedNucleotideIndex,
  onSelectNucleotide,
  onSelectAnnotation
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Three.js instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Interactive groups
  const moleculeGroupRef = useRef<THREE.Group | null>(null);
  const annotationsGroupRef = useRef<THREE.Group | null>(null);
  const measurementGroupRef = useRef<THREE.Group | null>(null);
  const helicalAxisGroupRef = useRef<THREE.Group | null>(null);

  // State for interactive UI
  const [hoveredAtom, setHoveredAtom] = useState<Atom3D | null>(null);
  const [selectedAtom, setSelectedAtom] = useState<Atom3D | null>(null);
  const [measurementPoints, setMeasurementPoints] = useState<Atom3D[]>([]);
  const [measuredDistance, setMeasuredDistance] = useState<number | null>(null);
  const [isMeasurementMode, setIsMeasurementMode] = useState<boolean>(false);
  const [activePresetView, setActivePresetView] = useState<string>('front');

  // Mouse & Touch Interaction tracking
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchStartDistanceRef = useRef<number | null>(null);

  // Get color for an atom based on active color scheme
  const getAtomColor = useCallback(
    (atom: Atom3D): THREE.Color => {
      if (colorScheme === 'base-type' && atom.residueName && BASE_COLORS[atom.residueName]) {
        return new THREE.Color(BASE_COLORS[atom.residueName]);
      }
      if (colorScheme === 'strand-id' && atom.strand && STRAND_COLORS[atom.strand]) {
        return new THREE.Color(STRAND_COLORS[atom.strand]);
      }
      if (colorScheme === 'sugar-pucker' && atom.isBackbone) {
        return atom.strand === 3 ? new THREE.Color('#06B6D4') : new THREE.Color('#EC4899');
      }
      // Default: CPK Element Color
      const elemProp = ELEMENT_PROPERTIES[atom.element] || ELEMENT_PROPERTIES.C;
      return new THREE.Color(elemProp.color);
    },
    [colorScheme]
  );

  // Initialize Three.js Scene, Camera, Renderer
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const width = containerRef.current.clientWidth || 800;
    const height = containerRef.current.clientHeight || 560;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null; // transparent to inherit dark/light theme container
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 48);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(30, 40, 40);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x90cdf4, 0.6);
    dirLight2.position.set(-30, -20, -30);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 0.8, 100);
    pointLight.position.set(0, 0, 30);
    scene.add(pointLight);

    // Groups
    const moleculeGroup = new THREE.Group();
    scene.add(moleculeGroup);
    moleculeGroupRef.current = moleculeGroup;

    const annotationsGroup = new THREE.Group();
    scene.add(annotationsGroup);
    annotationsGroupRef.current = annotationsGroup;

    const measurementGroup = new THREE.Group();
    scene.add(measurementGroup);
    measurementGroupRef.current = measurementGroup;

    const helicalAxisGroup = new THREE.Group();
    scene.add(helicalAxisGroup);
    helicalAxisGroupRef.current = helicalAxisGroup;

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      renderer.dispose();
    };
  }, []);

  // Re-build 3D Meshes whenever Model, RenderStyle, ColorScheme, or toggles change
  useEffect(() => {
    const moleculeGroup = moleculeGroupRef.current;
    if (!moleculeGroup) return;

    // Clear previous geometries
    while (moleculeGroup.children.length > 0) {
      const obj = moleculeGroup.children[0];
      moleculeGroup.remove(obj);
      if ((obj as any).geometry) (obj as any).geometry.dispose();
      if ((obj as any).material) {
        if (Array.isArray((obj as any).material)) {
          (obj as any).material.forEach((m: any) => m.dispose());
        } else {
          (obj as any).material.dispose();
        }
      }
    }

    const { atoms, bonds, helixType } = modelData;

    // 1. BALL & STICK / SPACE-FILLING ATOM SPHERES
    const sphereGeometryDetail = renderStyle === 'space-filling' ? 24 : 18;
    const atomMeshMap = new Map<number, THREE.Mesh>();

    atoms.forEach((atom, idx) => {
      const isSelected = selectedNucleotideIndex !== null && atom.nucleotideIndex === selectedNucleotideIndex;
      const isAtomSelected = selectedAtom?.id === atom.id;

      let radius = atom.radius * 0.38; // standard ball and stick scale
      if (renderStyle === 'space-filling') {
        radius = atom.radius * 0.85; // true CPK van der Waals scale
      } else if (renderStyle === 'ribbon-ladder' && atom.isBackbone) {
        radius = 0.5;
      } else if (renderStyle === 'backbone-wire') {
        radius = 0.25;
      }

      if (isSelected || isAtomSelected) {
        radius *= 1.25;
      }

      const sphereGeo = new THREE.SphereGeometry(radius, sphereGeometryDetail, sphereGeometryDetail);
      const baseColor = getAtomColor(atom);

      const mat = new THREE.MeshStandardMaterial({
        color: isSelected ? new THREE.Color('#38BDF8') : baseColor,
        roughness: 0.25,
        metalness: 0.15,
        emissive: isAtomSelected ? new THREE.Color('#F59E0B') : isSelected ? new THREE.Color('#0284C7') : new THREE.Color(0x000000),
        emissiveIntensity: isAtomSelected ? 0.6 : isSelected ? 0.35 : 0.0,
      });

      const sphereMesh = new THREE.Mesh(sphereGeo, mat);
      sphereMesh.position.set(atom.x, atom.y, atom.z);
      sphereMesh.userData = { atomIndex: idx, atomData: atom };
      sphereMesh.castShadow = true;
      sphereMesh.receiveShadow = true;

      moleculeGroup.add(sphereMesh);
      atomMeshMap.set(idx, sphereMesh);
    });

    // 2. COVALENT & HYDROGEN BONDS (CYLINDERS / DASHED LINES)
    bonds.forEach((bond) => {
      const atom1 = atoms[bond.atom1Index];
      const atom2 = atoms[bond.atom2Index];
      if (!atom1 || !atom2) return;

      const p1 = new THREE.Vector3(atom1.x, atom1.y, atom1.z);
      const p2 = new THREE.Vector3(atom2.x, atom2.y, atom2.z);
      const distance = p1.distanceTo(p2);
      const direction = new THREE.Vector3().subVectors(p2, p1).normalize();
      const midpoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);

      if (bond.isHydrogenBond) {
        if (!showHBonds) return;
        // Render dashed line / glowing cylinder for H-bond
        const hBondGeo = new THREE.CylinderGeometry(0.08, 0.08, distance, 8);
        const hBondMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#38BDF8'),
          roughness: 0.1,
          metalness: 0.1,
          emissive: new THREE.Color('#0284C7'),
          emissiveIntensity: 0.8,
          transparent: true,
          opacity: 0.85,
        });
        const hBondMesh = new THREE.Mesh(hBondGeo, hBondMat);
        hBondMesh.position.copy(midpoint);
        hBondMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
        moleculeGroup.add(hBondMesh);
        return;
      }

      if (renderStyle === 'space-filling') return; // Space-filling shows overlapping spheres without bond cylinders

      // Covalent Bond Cylinder
      let bondRadius = 0.16;
      if (renderStyle === 'ribbon-ladder') bondRadius = 0.22;
      if (renderStyle === 'backbone-wire') bondRadius = 0.06;

      const bondGeo = new THREE.CylinderGeometry(bondRadius, bondRadius, distance, 12);
      const bondColor = new THREE.Color('#6B7280'); // Neutral dark silver
      const bondMat = new THREE.MeshStandardMaterial({
        color: bondColor,
        roughness: 0.4,
        metalness: 0.2,
      });

      const bondMesh = new THREE.Mesh(bondGeo, bondMat);
      bondMesh.position.copy(midpoint);
      bondMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
      bondMesh.castShadow = true;
      moleculeGroup.add(bondMesh);
    });

    // 3. RIBBON / TUBE CARTOON HELIX (When in Ribbon Mode or Double Helix)
    if (renderStyle === 'ribbon-ladder' && modelData.nucleotides.length > 0) {
      const strand1Points: THREE.Vector3[] = [];
      const strand2Points: THREE.Vector3[] = [];

      modelData.nucleotides.forEach((n) => {
        const v = new THREE.Vector3(n.phosphateCenter[0], n.phosphateCenter[1], n.phosphateCenter[2]);
        if (n.strand === 1 || n.strand === 3) {
          strand1Points.push(v);
        } else if (n.strand === 2) {
          strand2Points.push(v);
        }
      });

      if (strand1Points.length > 2) {
        const curve1 = new THREE.CatmullRomCurve3(strand1Points);
        const tube1Geo = new THREE.TubeGeometry(curve1, 64, 0.45, 12, false);
        const tube1Mat = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#10B981'), // Emerald Strand 1
          roughness: 0.2,
          metalness: 0.3,
        });
        const tube1Mesh = new THREE.Mesh(tube1Geo, tube1Mat);
        moleculeGroup.add(tube1Mesh);
      }

      if (strand2Points.length > 2) {
        const curve2 = new THREE.CatmullRomCurve3(strand2Points);
        const tube2Geo = new THREE.TubeGeometry(curve2, 64, 0.45, 12, false);
        const tube2Mat = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#F59E0B'), // Amber Strand 2
          roughness: 0.2,
          metalness: 0.3,
        });
        const tube2Mesh = new THREE.Mesh(tube2Geo, tube2Mat);
        moleculeGroup.add(tube2Mesh);
      }
    }
  }, [modelData, renderStyle, colorScheme, showHBonds, selectedNucleotideIndex, selectedAtom, getAtomColor]);

  // Re-build Helical Axis Cylinder if enabled
  useEffect(() => {
    const axisGroup = helicalAxisGroupRef.current;
    if (!axisGroup) return;

    while (axisGroup.children.length > 0) {
      const obj = axisGroup.children[0];
      axisGroup.remove(obj);
      if ((obj as any).geometry) (obj as any).geometry.dispose();
      if ((obj as any).material) (obj as any).material.dispose();
    }

    if (!showHelicalAxis) return;

    const zMin = -24;
    const zMax = 24;
    const axisLength = zMax - zMin;

    const axisGeo = new THREE.CylinderGeometry(0.12, 0.12, axisLength, 12);
    const axisMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#EC4899'), // Magenta axis line
      emissive: new THREE.Color('#BE185D'),
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.7,
    });
    const axisMesh = new THREE.Mesh(axisGeo, axisMat);
    axisMesh.position.set(0, 0, 0);
    axisMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1));
    axisGroup.add(axisMesh);
  }, [showHelicalAxis]);

  // Re-build Measurement line & markers
  useEffect(() => {
    const mgGroup = measurementGroupRef.current;
    if (!mgGroup) return;

    while (mgGroup.children.length > 0) {
      const obj = mgGroup.children[0];
      mgGroup.remove(obj);
      if ((obj as any).geometry) (obj as any).geometry.dispose();
      if ((obj as any).material) (obj as any).material.dispose();
    }

    if (measurementPoints.length === 2) {
      const p1 = new THREE.Vector3(measurementPoints[0].x, measurementPoints[0].y, measurementPoints[0].z);
      const p2 = new THREE.Vector3(measurementPoints[1].x, measurementPoints[1].y, measurementPoints[1].z);
      const distance = p1.distanceTo(p2);
      setMeasuredDistance(parseFloat(distance.toFixed(2)));

      // Line between atoms
      const lineGeo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      const lineMat = new THREE.LineDashedMaterial({
        color: 0xf59e0b,
        dashSize: 0.5,
        gapSize: 0.25,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      line.computeLineDistances();
      mgGroup.add(line);

      // Rings around measured atoms
      [p1, p2].forEach((p) => {
        const ringGeo = new THREE.RingGeometry(0.8, 1.1, 24);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, side: THREE.DoubleSide });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.copy(p);
        mgGroup.add(ring);
      });
    } else {
      setMeasuredDistance(null);
    }
  }, [measurementPoints]);

  // Animation Loop with Auto-Rotation
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (isAutoRotating && moleculeGroupRef.current) {
        moleculeGroupRef.current.rotation.y += autoRotateSpeed * delta * 0.5;
        if (helicalAxisGroupRef.current) helicalAxisGroupRef.current.rotation.y = moleculeGroupRef.current.rotation.y;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isAutoRotating, autoRotateSpeed]);

  // Preset Views Camera Controller
  const setCameraPreset = (preset: 'front' | 'top-axial' | 'major-groove' | 'minor-groove' | 'base-stack') => {
    if (!moleculeGroupRef.current || !cameraRef.current) return;
    setActivePresetView(preset);

    switch (preset) {
      case 'front':
        cameraRef.current.position.set(0, 0, 48);
        cameraRef.current.lookAt(0, 0, 0);
        moleculeGroupRef.current.rotation.set(0, 0, 0);
        break;
      case 'top-axial': // Look straight down the z-axis into helix core cylinder
        cameraRef.current.position.set(0, 0, 48);
        cameraRef.current.lookAt(0, 0, 0);
        moleculeGroupRef.current.rotation.set(Math.PI / 2, 0, 0);
        break;
      case 'major-groove': // Angle to expose wide 22 Å major groove
        cameraRef.current.position.set(0, 0, 45);
        cameraRef.current.lookAt(0, 0, 0);
        moleculeGroupRef.current.rotation.set(0.2, 0.9, 0);
        break;
      case 'minor-groove': // Angle to expose narrow 12 Å minor groove
        cameraRef.current.position.set(0, 0, 45);
        cameraRef.current.lookAt(0, 0, 0);
        moleculeGroupRef.current.rotation.set(-0.2, -1.2, 0);
        break;
      case 'base-stack': // Face-on Watson-Crick base pair view
        cameraRef.current.position.set(0, 0, 32);
        cameraRef.current.lookAt(0, 0, 0);
        moleculeGroupRef.current.rotation.set(0.6, 0.4, 0);
        break;
    }
  };

  // Raycasting for Atom Picking
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !cameraRef.current || !moleculeGroupRef.current) return;

    if (isDraggingRef.current) {
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      moleculeGroupRef.current.rotation.y += deltaX * 0.008;
      moleculeGroupRef.current.rotation.x += deltaY * 0.008;

      if (helicalAxisGroupRef.current) {
        helicalAxisGroupRef.current.rotation.copy(moleculeGroupRef.current.rotation);
      }

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
      return;
    }

    // Hover raycasting
    const rect = canvasRef.current.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, cameraRef.current);
    const intersects = raycaster.intersectObjects(moleculeGroupRef.current.children, false);

    if (intersects.length > 0 && intersects[0].object.userData?.atomData) {
      setHoveredAtom(intersects[0].object.userData.atomData);
    } else {
      setHoveredAtom(null);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = false;

    // Check if it was a quick click to select an atom or measure
    if (!canvasRef.current || !cameraRef.current || !moleculeGroupRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, cameraRef.current);
    const intersects = raycaster.intersectObjects(moleculeGroupRef.current.children, false);

    if (intersects.length > 0 && intersects[0].object.userData?.atomData) {
      const clickedAtom: Atom3D = intersects[0].object.userData.atomData;
      setSelectedAtom(clickedAtom);

      if (isMeasurementMode) {
        setMeasurementPoints((prev) => {
          if (prev.length >= 2) return [clickedAtom];
          return [...prev, clickedAtom];
        });
      } else {
        if (clickedAtom.nucleotideIndex !== undefined) {
          onSelectNucleotide(clickedAtom.nucleotideIndex);
        }
      }
    }
  };

  // Zoom with wheel
  const handleWheel = (e: React.WheelEvent) => {
    if (!cameraRef.current) return;
    cameraRef.current.position.z += e.deltaY * 0.05;
    cameraRef.current.position.z = Math.max(12, Math.min(100, cameraRef.current.position.z));
  };

  // Capture High-Res Screenshot
  const handleDownloadSnapshot = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `${modelData.id}_3d_molecular_structure.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="relative w-full h-full min-h-[540px] rounded-3xl overflow-hidden bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 border border-stone-800 shadow-2xl flex flex-col select-none">
      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className="relative flex-1 w-full h-full cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
      >
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="w-full h-full block"
        />

        {/* Top-Left Model & Spatial Stats Overlay */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 max-w-sm pointer-events-none">
          <div className="bg-stone-900/85 backdrop-blur-md border border-stone-700/60 rounded-2xl p-3.5 shadow-xl text-stone-100 space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-emerald-400">
                {modelData.classification}
              </h4>
            </div>
            <h3 className="text-sm font-extrabold text-white">{modelData.title}</h3>
            <p className="text-[11px] text-stone-300 line-clamp-2 leading-relaxed">
              {modelData.subtitle}
            </p>

            <div className="pt-2 mt-2 border-t border-stone-800 grid grid-cols-3 gap-2 text-[10px] font-mono">
              <div>
                <span className="text-stone-400 block">Diameter</span>
                <span className="font-bold text-white">{modelData.diameterAngstroms} Å</span>
              </div>
              <div>
                <span className="text-stone-400 block">Rise/bp</span>
                <span className="font-bold text-white">{modelData.risePerBaseAngstroms || '—'} Å</span>
              </div>
              <div>
                <span className="text-stone-400 block">Pitch</span>
                <span className="font-bold text-white">{modelData.pitchAngstroms || '—'} Å</span>
              </div>
            </div>
          </div>

          {/* Atom Hover HUD */}
          {hoveredAtom && (
            <div className="bg-stone-900/90 backdrop-blur-md border border-emerald-500/40 rounded-xl p-2.5 shadow-lg text-xs text-stone-200 animate-in fade-in duration-150">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-emerald-400 font-mono">
                  {hoveredAtom.atomName} ({hoveredAtom.element})
                </span>
                {hoveredAtom.residueName && (
                  <span className="px-1.5 py-0.5 rounded bg-stone-800 text-[10px] font-mono font-bold text-amber-300">
                    Residue: {hoveredAtom.residueName}
                  </span>
                )}
              </div>
              <div className="text-[10px] text-stone-400 font-mono mt-0.5">
                Coords: [{hoveredAtom.x.toFixed(1)}, {hoveredAtom.y.toFixed(1)}, {hoveredAtom.z.toFixed(1)}] Å
              </div>
            </div>
          )}

          {/* Active Measurement HUD */}
          {isMeasurementMode && (
            <div className="bg-amber-950/80 backdrop-blur-md border border-amber-500/50 rounded-xl p-3 shadow-lg text-xs text-amber-100 pointer-events-auto">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold flex items-center gap-1.5 text-amber-400">
                  <Ruler className="w-3.5 h-3.5" /> 3D Spatial Ruler
                </span>
                <button
                  onClick={() => {
                    setMeasurementPoints([]);
                    setMeasuredDistance(null);
                  }}
                  className="text-[10px] underline hover:text-white"
                >
                  Reset
                </button>
              </div>
              <p className="text-[11px] text-stone-300">
                {measurementPoints.length === 0 && 'Click any first atom to anchor measurement...'}
                {measurementPoints.length === 1 && `Anchored at ${measurementPoints[0].atomName}. Click a second atom...`}
                {measurementPoints.length === 2 && (
                  <span className="font-bold text-emerald-400 text-sm">
                    Distance: {measuredDistance} Å ({((measuredDistance || 0) * 0.1).toFixed(2)} nm)
                  </span>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Top-Right Quick Floating Controls */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 pointer-events-auto">
          {/* Preset Views */}
          <div className="bg-stone-900/80 backdrop-blur-md border border-stone-800 rounded-2xl p-1.5 flex flex-col gap-1 shadow-xl">
            <span className="text-[9px] font-bold uppercase tracking-wider text-stone-400 text-center py-0.5">
              Views
            </span>
            <button
              onClick={() => setCameraPreset('front')}
              className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activePresetView === 'front' ? 'bg-emerald-600 text-white shadow-md' : 'text-stone-300 hover:bg-stone-800'
              }`}
              title="Front View"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden sm:inline">Front</span>
            </button>

            <button
              onClick={() => setCameraPreset('top-axial')}
              className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activePresetView === 'top-axial' ? 'bg-emerald-600 text-white shadow-md' : 'text-stone-300 hover:bg-stone-800'
              }`}
              title="Top-Down Axial View (Into Helix Cylinder)"
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden sm:inline">Axial</span>
            </button>

            <button
              onClick={() => setCameraPreset('major-groove')}
              className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activePresetView === 'major-groove' ? 'bg-emerald-600 text-white shadow-md' : 'text-stone-300 hover:bg-stone-800'
              }`}
              title="Major Groove Angle"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-[11px] hidden sm:inline">Major</span>
            </button>

            <button
              onClick={() => setCameraPreset('minor-groove')}
              className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activePresetView === 'minor-groove' ? 'bg-emerald-600 text-white shadow-md' : 'text-stone-300 hover:bg-stone-800'
              }`}
              title="Minor Groove Angle"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] hidden sm:inline">Minor</span>
            </button>

            <button
              onClick={() => setCameraPreset('base-stack')}
              className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activePresetView === 'base-stack' ? 'bg-emerald-600 text-white shadow-md' : 'text-stone-300 hover:bg-stone-800'
              }`}
              title="Watson-Crick Base Pair Face View"
            >
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-[11px] hidden sm:inline">Base Pair</span>
            </button>
          </div>

          {/* Zoom and Snapshot Tools */}
          <div className="bg-stone-900/80 backdrop-blur-md border border-stone-800 rounded-2xl p-1.5 flex flex-col gap-1 shadow-xl">
            <button
              onClick={() => {
                if (cameraRef.current) cameraRef.current.position.z = Math.max(12, cameraRef.current.position.z - 6);
              }}
              className="p-2 rounded-xl text-stone-300 hover:bg-stone-800 hover:text-white transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                if (cameraRef.current) cameraRef.current.position.z = Math.min(100, cameraRef.current.position.z + 6);
              }}
              className="p-2 rounded-xl text-stone-300 hover:bg-stone-800 hover:text-white transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMeasurementMode(!isMeasurementMode)}
              className={`p-2 rounded-xl transition-all ${
                isMeasurementMode ? 'bg-amber-600 text-white shadow-md' : 'text-stone-300 hover:bg-stone-800'
              }`}
              title="Toggle 3D Distance Ruler"
            >
              <Ruler className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownloadSnapshot}
              className="p-2 rounded-xl text-stone-300 hover:bg-stone-800 hover:text-emerald-400 transition-colors"
              title="Download High-Res 3D Snapshot"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Spatial Feature Annotations Overlay */}
        {showAnnotations && modelData.annotations && (
          <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full pointer-events-auto scrollbar-thin">
              {modelData.annotations.map((ann) => (
                <button
                  key={ann.id}
                  onClick={() => onSelectAnnotation?.(ann)}
                  className="px-3 py-1.5 rounded-xl bg-stone-900/90 hover:bg-stone-800/95 backdrop-blur-md border border-stone-700/80 text-xs font-semibold text-stone-200 flex items-center gap-1.5 shrink-0 shadow-lg hover:border-emerald-500 transition-all"
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ann.color }} />
                  <span className="font-bold text-white">{ann.label}</span>
                  {ann.measurementText && (
                    <span className="text-[10px] font-mono text-stone-400 bg-stone-800 px-1.5 py-0.5 rounded">
                      {ann.measurementText}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Drag Hint Footer */}
        <div className="absolute bottom-16 right-4 z-10 pointer-events-none hidden md:block">
          <div className="text-[10px] font-mono text-stone-500 bg-stone-950/60 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-stone-800/50">
            🖱️ Drag to rotate • Scroll to zoom • Click atom to inspect
          </div>
        </div>
      </div>
    </div>
  );
};
