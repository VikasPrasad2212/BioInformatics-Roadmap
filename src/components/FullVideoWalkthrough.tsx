import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  FastForward,
  Rewind,
  Sparkles,
  Layers,
  Dna,
  Scissors,
  Cpu,
  Shapes,
  CheckCircle2,
  Maximize2,
  Minimize2,
  Radio,
  FileText,
  Mic,
  Music,
} from 'lucide-react';
import {
  createSoothingFemaleUtterance,
  getBestSoothingFemaleVoice,
  SOOTHING_VOICE_PRESETS,
} from '../utils/voiceUtils';
import { audioAtmosphere } from '../utils/audioAtmosphere';

interface SceneStep {
  id: string;
  title: string;
  subtitle: string;
  durationMs: number; // scene duration
  narration: string;
  stageName: string;
  color: string;
}

export const SCENES: SceneStep[] = [
  {
    id: 'intro',
    title: 'The Central Dogma: Genetic Master Blueprint',
    subtitle: 'From Francis Crick (1958) to Modern Molecular Biology',
    durationMs: 9000,
    narration:
      'Welcome to the Central Dogma Masterclass. All biological life relies on genetic information stored within double-stranded DNA in the cell nucleus, which is faithfully transcribed into messenger RNA and translated into three-dimensional functional protein machines.',
    stageName: 'Cell Nucleus & Overview',
    color: '#10b981',
  },
  {
    id: 'replication',
    title: 'Stage 1: DNA Replication & S-Phase',
    subtitle: 'Helicase Unwinding, Leading & Lagging Strands with Okazaki Fragments',
    durationMs: 11000,
    narration:
      'Before a cell divides, DNA Helicase unzips the double helix at the replication fork. DNA Polymerase synthesizes the leading strand continuously 5-prime to 3-prime, while the lagging strand forms discontinuous Okazaki fragments that are sealed by DNA Ligase.',
    stageName: 'Nucleus / S-Phase',
    color: '#0284c7',
  },
  {
    id: 'transcription',
    title: 'Stage 2: Transcription & pre-mRNA Synthesis',
    subtitle: 'RNA Polymerase II Reading the 3\' to 5\' DNA Template Strand',
    durationMs: 11000,
    narration:
      'In transcription, RNA Polymerase binds the gene promoter region, separates the strands, and reads the DNA template to synthesize a complementary pre-mRNA transcript, substituting Uracil everywhere Thymine would appear.',
    stageName: 'Nucleus / Transcription Bubble',
    color: '#0d9488',
  },
  {
    id: 'processing',
    title: 'Stage 3: RNA Processing & Spliceosome Splicing',
    subtitle: '5\' 7-Methylguanosine Cap, 3\' Poly-A Tail, and Intron Excision',
    durationMs: 11000,
    narration:
      'Before exiting the nucleus, the primary transcript receives a 5-prime methylguanosine cap and a 3-prime poly-A tail for stability. Spliceosome complexes excise non-coding introns and stitch coding exons together into mature mRNA.',
    stageName: 'Nucleus / Spliceosome',
    color: '#9333ea',
  },
  {
    id: 'export',
    title: 'Stage 4: Nuclear Pore Export',
    subtitle: 'Transport of Mature mRNA into Cytoplasm',
    durationMs: 8000,
    narration:
      'The mature mRNA molecule passes through the nuclear pore complex into the cytoplasm, where ribosomes are ready to decode the triplet genetic message.',
    stageName: 'Nuclear Pore Complex',
    color: '#4f46e5',
  },
  {
    id: 'translation',
    title: 'Stage 5: Ribosomal Translation & Codon Decoding',
    subtitle: 'A, P, and E Sites, Transfer RNA (tRNA), and Peptidyl Transferase',
    durationMs: 12000,
    narration:
      'The ribosome locks onto the mRNA start codon AUG. Aminoacyl-tRNAs deliver corresponding amino acids matching codons via anticodons. Peptidyl transferase catalyzes covalent peptide bonds, elongating the growing polypeptide chain.',
    stageName: 'Cytoplasm / 80S Ribosome',
    color: '#e11d48',
  },
  {
    id: 'folding',
    title: 'Stage 6: Polypeptide Folding & 3D Quaternary Assembly',
    subtitle: 'Primary, Secondary, Tertiary & Quaternary Folding into Functional Enzymes',
    durationMs: 10000,
    narration:
      'The newly minted polypeptide folds from linear primary sequence into alpha-helices and beta-sheets, packing into a precise 3D tertiary conformation assisted by molecular chaperones to perform essential life functions.',
    stageName: 'Cytoplasm & Endoplasmic Reticulum',
    color: '#d97706',
  },
];

export type AnimationStyle = 'scifi' | 'cyberpunk' | 'cartoon' | 'blueprint';

interface AnimationStyleConfig {
  id: AnimationStyle;
  name: string;
  badge: string;
  description: string;
  bgGradStart: string;
  bgGradEnd: string;
  glowBlur: number;
  outlineColor: string;
  accentColor: string;
}

export const ANIMATION_STYLES: Record<AnimationStyle, AnimationStyleConfig> = {
  scifi: {
    id: 'scifi',
    name: 'Futuristic Sci-Fi Hologram',
    badge: '🚀 Sci-Fi',
    description: 'High-tech glowing holograms, laser beams, and deep space particle fields.',
    bgGradStart: '#090d16',
    bgGradEnd: '#05070a',
    glowBlur: 25,
    outlineColor: '#38bdf8',
    accentColor: '#10b981',
  },
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon Matrix',
    badge: '⚡ Neon',
    description: 'Vibrant hot-pink & cyan neon tubes, retro scanlines, and digital electric grids.',
    bgGradStart: '#14051f',
    bgGradEnd: '#06010d',
    glowBlur: 35,
    outlineColor: '#f43f5e',
    accentColor: '#06b6d4',
  },
  cartoon: {
    id: 'cartoon',
    name: 'Cell Cartoon & Anime Style',
    badge: '🎨 Anime 2D',
    description: 'Bold expressive cel-shading outlines, vibrant warm cartoon tones, and pop motion effects.',
    bgGradStart: '#1e1b4b',
    bgGradEnd: '#0f172a',
    glowBlur: 10,
    outlineColor: '#fbbf24',
    accentColor: '#f43f5e',
  },
  blueprint: {
    id: 'blueprint',
    name: 'Clean Medical Blueprint',
    badge: '📐 Blueprint',
    description: 'Precise technical grid drafting, monochrome drafting calipers, and white blueprint lines.',
    bgGradStart: '#0a192f',
    bgGradEnd: '#020c1b',
    glowBlur: 5,
    outlineColor: '#64ffda',
    accentColor: '#ccd6f6',
  },
};

export const FullVideoWalkthrough: React.FC = () => {
  const [currentSceneIdx, setCurrentSceneIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [sceneProgress, setSceneProgress] = useState<number>(0); // 0 to 1
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [captionsEnabled, setCaptionsEnabled] = useState<boolean>(true);
  const [animStyle, setAnimStyle] = useState<AnimationStyle>('scifi');
  const [voicePresetId, setVoicePresetId] = useState<string>('documentary-female');
  const [ambientAudioEnabled, setAmbientAudioEnabled] = useState<boolean>(true);

  const [voiceName, setVoiceName] = useState<string>('Soothing Female (Default)');

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const sceneStartTimeRef = useRef<number>(Date.now());
  const currentSceneRef = useRef<number>(currentSceneIdx);
  const isPlayingRef = useRef<boolean>(isPlaying);
  const isMutedRef = useRef<boolean>(isMuted);
  const playbackRateRef = useRef<number>(playbackRate);
  const animStyleRef = useRef<AnimationStyle>(animStyle);
  const voicePresetRef = useRef<string>(voicePresetId);

  currentSceneRef.current = currentSceneIdx;
  isPlayingRef.current = isPlaying;
  isMutedRef.current = isMuted;
  playbackRateRef.current = playbackRate;
  animStyleRef.current = animStyle;
  voicePresetRef.current = voicePresetId;

  // Pre-load available soothing female voice name for UI
  useEffect(() => {
    const updateVoice = () => {
      const best = getBestSoothingFemaleVoice();
      if (best) {
        setVoiceName(best.name);
      }
    };
    updateVoice();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoice;
    }
  }, []);

  const currentScene = SCENES[currentSceneIdx];

  // Soothing Voice narration handler (inspired by video voiceover cadence)
  const speakNarration = (text: string) => {
    if (!('speechSynthesis' in window) || isMutedRef.current) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = createSoothingFemaleUtterance(
        text,
        playbackRateRef.current,
        voicePresetRef.current
      );
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore
    }
  };

  // Toggle Play / Pause
  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      audioAtmosphere.stopAmbientAtmosphere();
    } else {
      setIsPlaying(true);
      sceneStartTimeRef.current = Date.now() - sceneProgress * (currentScene.durationMs / playbackRate);
      if (ambientAudioEnabled && !isMuted) {
        audioAtmosphere.startAmbientAtmosphere();
      }
      speakNarration(currentScene.narration);
    }
  };

  // Reset to start
  const handleReset = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setCurrentSceneIdx(0);
    setSceneProgress(0);
    sceneStartTimeRef.current = Date.now();
    if (isPlaying) {
      audioAtmosphere.playTransitionChime();
      speakNarration(SCENES[0].narration);
    }
  };

  // Select scene directly with smooth transition chime
  const handleSelectScene = (idx: number) => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    audioAtmosphere.playTransitionChime();
    setCurrentSceneIdx(idx);
    setSceneProgress(0);
    sceneStartTimeRef.current = Date.now();
    if (isPlayingRef.current) {
      speakNarration(SCENES[idx].narration);
    }
  };

  // Skip Next / Prev
  const handleNextScene = () => {
    if (currentSceneIdx < SCENES.length - 1) {
      handleSelectScene(currentSceneIdx + 1);
    } else {
      setIsPlaying(false);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      audioAtmosphere.stopAmbientAtmosphere();
    }
  };

  const handlePrevScene = () => {
    if (currentSceneIdx > 0) {
      handleSelectScene(currentSceneIdx - 1);
    } else {
      handleReset();
    }
  };

  // Toggle Mute
  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (nextMute) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      audioAtmosphere.stopAmbientAtmosphere();
    } else if (isPlaying) {
      if (ambientAudioEnabled) audioAtmosphere.startAmbientAtmosphere();
      speakNarration(currentScene.narration);
    }
  };

  // Fullscreen toggle
  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // ----------------------------------------------------
  // Canvas Render Loop for Animated Visual Scenes
  // ----------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localFrame = 0;

    const render = () => {
      localFrame++;
      const width = canvas.width;
      const height = canvas.height;

      // Update timing if playing
      if (isPlayingRef.current) {
        const elapsed = (Date.now() - sceneStartTimeRef.current) * playbackRateRef.current;
        const dur = SCENES[currentSceneRef.current].durationMs;
        const p = Math.min(1, elapsed / dur);
        setSceneProgress(p);

        if (p >= 1) {
          if (currentSceneRef.current < SCENES.length - 1) {
            const nextIdx = currentSceneRef.current + 1;
            setCurrentSceneIdx(nextIdx);
            setSceneProgress(0);
            sceneStartTimeRef.current = Date.now();
            speakNarration(SCENES[nextIdx].narration);
          } else {
            setIsPlaying(false);
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
          }
        }
      }

      const p = sceneProgress;
      const time = Date.now() * 0.002;
      const currentStyle = ANIMATION_STYLES[animStyleRef.current];

      // Dynamic style background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, currentStyle.bgGradStart);
      bgGrad.addColorStop(1, currentStyle.bgGradEnd);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Background Grid / Scanlines according to animation style
      if (animStyleRef.current === 'blueprint') {
        // High density technical blueprint graph
        ctx.strokeStyle = 'rgba(100, 255, 218, 0.08)';
        ctx.lineWidth = 1;
        const bGrid = 20;
        for (let x = 0; x < width; x += bGrid) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += bGrid) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      } else if (animStyleRef.current === 'cyberpunk') {
        // Cyberpunk retro horizontal scanlines & purple matrix
        ctx.strokeStyle = 'rgba(236, 72, 153, 0.05)';
        ctx.lineWidth = 2;
        for (let y = 0; y < height; y += 8) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      } else if (animStyleRef.current === 'cartoon') {
        // Cartoon comic halftone dots
        ctx.fillStyle = 'rgba(251, 191, 36, 0.04)';
        for (let x = 10; x < width; x += 30) {
          for (let y = 10; y < height; y += 30) {
            ctx.beginPath();
            ctx.arc(x, y, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      } else {
        // Futuristic Sci-Fi grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;
        const gridSize = 40;
        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      // Render scene visualization with smooth transition cross-fade / entry dissolve
      const sceneId = SCENES[currentSceneRef.current].id;
      
      // Calculate smooth scene entry & exit alpha (easing curves)
      let sceneAlpha = 1.0;
      if (p < 0.1) {
        // Smooth ease-in at beginning of stage (first 10%)
        sceneAlpha = Math.sin((p / 0.1) * (Math.PI / 2));
      } else if (p > 0.9) {
        // Smooth ease-out crossfade to next stage (last 10%)
        sceneAlpha = Math.sin(((1 - p) / 0.1) * (Math.PI / 2));
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0.05, Math.min(1.0, sceneAlpha));

      if (sceneId === 'intro') {
        drawIntroScene(ctx, width, height, p, time);
      } else if (sceneId === 'replication') {
        drawReplicationScene(ctx, width, height, p, time);
      } else if (sceneId === 'transcription') {
        drawTranscriptionScene(ctx, width, height, p, time);
      } else if (sceneId === 'processing') {
        drawProcessingScene(ctx, width, height, p, time);
      } else if (sceneId === 'export') {
        drawExportScene(ctx, width, height, p, time);
      } else if (sceneId === 'translation') {
        drawTranslationScene(ctx, width, height, p, time);
      } else if (sceneId === 'folding') {
        drawFoldingScene(ctx, width, height, p, time);
      }

      ctx.restore();

      // Atmospheric transition lens flare & stage transition sweep
      if (p < 0.08 || p > 0.92) {
        const transIntensity = p < 0.08 ? (1 - p / 0.08) : ((p - 0.92) / 0.08);
        const transGrad = ctx.createRadialGradient(
          width / 2,
          height / 2,
          10,
          width / 2,
          height / 2,
          width * 0.7
        );
        transGrad.addColorStop(0, `rgba(56, 189, 248, ${0.18 * transIntensity})`);
        transGrad.addColorStop(0.5, `rgba(99, 102, 241, ${0.1 * transIntensity})`);
        transGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = transGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Watermark / HUD elements
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`SCENE ${currentSceneRef.current + 1}/${SCENES.length} • ${SCENES[currentSceneRef.current].stageName.toUpperCase()}`, 24, 30);

      // Recording indicator
      if (isPlayingRef.current) {
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(width - 40, 26, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('LIVE ANIMATION', width - 55, 30);
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [sceneProgress, playbackRate]);

  // Clean up voice on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  // ----------------------------------------------------
  // SCENE DRAWING FUNCTIONS
  // ----------------------------------------------------

  function drawIntroScene(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    p: number,
    t: number
  ) {
    const centerY = h * 0.48;

    // Glowing Central Dogma Flow diagram in canvas
    const nodes = [
      { label: 'DNA', sub: 'Information Storage', color: '#0284c7', x: w * 0.22, y: centerY },
      { label: 'RNA', sub: 'Messenger Transcript', color: '#0d9488', x: w * 0.5, y: centerY },
      { label: 'PROTEIN', sub: 'Functional Machine', color: '#e11d48', x: w * 0.78, y: centerY },
    ];

    // Connectors with pulsing particles
    ctx.lineWidth = 4;
    for (let i = 0; i < nodes.length - 1; i++) {
      const n1 = nodes[i];
      const n2 = nodes[i + 1];

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.beginPath();
      ctx.moveTo(n1.x, n1.y);
      ctx.lineTo(n2.x, n2.y);
      ctx.stroke();

      // Flow arrows and animated pulse
      const pulseX = n1.x + ((t * 80) % (n2.x - n1.x));
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(pulseX, n1.y, 6, 0, Math.PI * 2);
      ctx.fill();

      // Arrow head
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.beginPath();
      ctx.moveTo(n2.x - 50, n1.y - 8);
      ctx.lineTo(n2.x - 36, n1.y);
      ctx.lineTo(n2.x - 50, n1.y + 8);
      ctx.fill();

      // Label above arrow
      ctx.fillStyle = '#6ee7b7';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(i === 0 ? 'TRANSCRIPTION' : 'TRANSLATION', (n1.x + n2.x) / 2, n1.y - 18);
    }

    // Circular self-arrow on DNA (Replication)
    ctx.strokeStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(nodes[0].x, nodes[0].y - 50, 24, 0, Math.PI * 1.5, false);
    ctx.stroke();
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('REPLICATION', nodes[0].x, nodes[0].y - 82);

    // Render 3 Major Nodes
    nodes.forEach((n, idx) => {
      ctx.save();
      ctx.shadowColor = n.color;
      ctx.shadowBlur = 25;

      // Outer ring
      ctx.strokeStyle = n.color;
      ctx.lineWidth = 3;
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(n.x, n.y, 45, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.restore();

      // Text inside
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(n.label, n.x, n.y + 6);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '11px sans-serif';
      ctx.fillText(n.sub, n.x, n.y + 68);
    });

    // Particle field in background
    for (let i = 0; i < 20; i++) {
      const px = ((i * 47 + t * 25) % w);
      const py = ((i * 31 + Math.sin(t + i) * 20 + 80) % h);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.beginPath();
      ctx.arc(px, py, 2 + (i % 3), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawReplicationScene(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    p: number,
    t: number
  ) {
    const forkX = w * 0.45;
    const centerY = h * 0.48;

    // Unwound duplex on left
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 4;

    // Double Helix on left before fork
    for (let x = 60; x < forkX; x += 6) {
      const y1 = centerY + Math.sin(x * 0.05 + t * 2) * 25;
      const y2 = centerY - Math.sin(x * 0.05 + t * 2) * 25;

      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(x, y1, 4, 4);
      ctx.fillStyle = '#f43f5e';
      ctx.fillRect(x, y2, 4, 4);

      // Base pair hydrogen rungs
      if (x % 18 === 0) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x, y1);
        ctx.lineTo(x, y2);
        ctx.stroke();
      }
    }

    // Helicase Enzyme ring at the fork
    ctx.save();
    ctx.shadowColor = '#eab308';
    ctx.shadowBlur = 20;
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.arc(forkX, centerY, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(forkX, centerY, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('HELICASE', forkX, centerY + 4);

    // Leading Strand branch (Top)
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(forkX, centerY - 15);
    ctx.bezierCurveTo(forkX + 80, centerY - 80, forkX + 200, centerY - 90, w - 80, centerY - 90);
    ctx.stroke();

    // Leading synthesized new strand (Green)
    const leadProg = Math.min(1, p * 1.5);
    const leadEndX = forkX + 40 + leadProg * (w - forkX - 140);
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(forkX + 40, centerY - 70);
    ctx.lineTo(leadEndX, centerY - 70);
    ctx.stroke();

    // DNA Polymerase on leading strand
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(leadEndX, centerY - 70, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText('Pol III', leadEndX, centerY - 67);

    // Lagging Strand branch (Bottom)
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(forkX, centerY + 15);
    ctx.bezierCurveTo(forkX + 80, centerY + 80, forkX + 200, centerY + 90, w - 80, centerY + 90);
    ctx.stroke();

    // Okazaki fragments (discontinuous)
    const okazaki = [
      { start: forkX + 60, end: forkX + 130 },
      { start: forkX + 150, end: forkX + 220 },
      { start: forkX + 240, end: forkX + 310 },
    ];

    okazaki.forEach((frag, idx) => {
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(frag.start, centerY + 70);
      ctx.lineTo(frag.end, centerY + 70);
      ctx.stroke();

      // RNA primer (red block) at 5' end
      ctx.fillStyle = '#f97316';
      ctx.fillRect(frag.end - 12, centerY + 65, 12, 10);
    });

    // DNA Ligase icon sealing gap
    ctx.fillStyle = '#a855f7';
    ctx.beginPath();
    ctx.arc(forkX + 230, centerY + 70, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 8px sans-serif';
    ctx.fillText('Ligase', forkX + 230, centerY + 73);

    // Annotations
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText("5' ➔ 3' Continuous Leading Strand", forkX + 60, centerY - 110);
    ctx.fillStyle = '#f43f5e';
    ctx.fillText("Discontinuous Lagging Strand (Okazaki Fragments)", forkX + 60, centerY + 120);
  }

  function drawTranscriptionScene(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    p: number,
    t: number
  ) {
    const bubbleX = w * 0.46;
    const centerY = h * 0.46;

    // Coding Strand (Top)
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(60, centerY - 45);
    ctx.lineTo(bubbleX - 120, centerY - 45);
    ctx.bezierCurveTo(bubbleX - 60, centerY - 90, bubbleX + 60, centerY - 90, bubbleX + 120, centerY - 45);
    ctx.lineTo(w - 60, centerY - 45);
    ctx.stroke();

    // Template Strand (Bottom)
    ctx.strokeStyle = '#0284c7';
    ctx.beginPath();
    ctx.moveTo(60, centerY + 45);
    ctx.lineTo(bubbleX - 120, centerY + 45);
    ctx.bezierCurveTo(bubbleX - 60, centerY + 90, bubbleX + 60, centerY + 90, bubbleX + 120, centerY + 45);
    ctx.lineTo(w - 60, centerY + 45);
    ctx.stroke();

    // RNA Polymerase II large enzyme blob
    ctx.save();
    ctx.shadowColor = '#0d9488';
    ctx.shadowBlur = 30;
    ctx.fillStyle = 'rgba(13, 148, 136, 0.85)';
    ctx.beginPath();
    ctx.ellipse(bubbleX, centerY, 80, 55, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('RNA POLYMERASE II', bubbleX, centerY - 15);

    // Growing pre-mRNA Transcript (Crimson / Orange, replacing T with U)
    const rnaLen = Math.min(1, p * 1.3);
    const rnaStartX = bubbleX - 40;
    const rnaEndX = bubbleX + 40;

    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(rnaStartX, centerY + 20);
    ctx.lineTo(rnaEndX, centerY + 20);
    // Extrusion tail falling down
    ctx.bezierCurveTo(rnaEndX + 30, centerY + 40, rnaEndX + 60, centerY + 90, rnaEndX + 100, centerY + 110);
    ctx.stroke();

    // Base pairing preview in the bubble
    const bases = ['A', 'U', 'G', 'C', 'G', 'A'];
    bases.forEach((b, idx) => {
      const bx = rnaStartX + idx * 14;
      ctx.fillStyle = b === 'U' ? '#fbbf24' : '#ffffff';
      ctx.font = 'bold 11px monospace';
      ctx.fillText(b, bx, centerY + 16);
    });

    // Label on tail
    ctx.fillStyle = '#f43f5e';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText("Nascent pre-mRNA (Contains Uracil 'U')", rnaEndX + 110, centerY + 115);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px sans-serif';
    ctx.fillText("DNA Template: 3' ➔ 5'  |  RNA Synthesis: 5' ➔ 3'", w * 0.1, h * 0.86);
  }

  function drawProcessingScene(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    p: number,
    t: number
  ) {
    const centerY = h * 0.44;

    // Pre-mRNA strip with Exons and Introns
    const startX = w * 0.15;
    const totalW = w * 0.7;

    // Blocks: Exon 1, Intron 1, Exon 2, Intron 2, Exon 3
    const blocks = [
      { type: 'exon', label: 'EXON 1', w: totalW * 0.2, color: '#10b981' },
      { type: 'intron', label: 'INTRON 1 (Non-coding)', w: totalW * 0.25, color: '#64748b' },
      { type: 'exon', label: 'EXON 2', w: totalW * 0.25, color: '#10b981' },
      { type: 'intron', label: 'INTRON 2', w: totalW * 0.15, color: '#64748b' },
      { type: 'exon', label: 'EXON 3', w: totalW * 0.15, color: '#10b981' },
    ];

    let curX = startX;

    // 5' Cap
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.arc(startX - 22, centerY + 18, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("5' CAP", startX - 22, centerY + 21);

    // Draw blocks
    blocks.forEach((b, i) => {
      ctx.fillStyle = b.color;
      if (b.type === 'intron' && p > 0.4) {
        // Intron looping out as a lariat during splicing!
        const lariatLift = Math.sin((p - 0.4) * Math.PI * 2) * 50;
        ctx.save();
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 3;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(curX + b.w / 2, centerY - 20, b.w / 2, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Spliceosome snRNP badge
        ctx.fillStyle = '#9333ea';
        ctx.beginPath();
        ctx.arc(curX + b.w / 2, centerY - 20, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 8px sans-serif';
        ctx.fillText('snRNP', curX + b.w / 2, centerY - 17);
      } else {
        ctx.fillRect(curX, centerY, b.w, 36);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(b.label, curX + b.w / 2, centerY + 22);
      }
      curX += b.w;
    });

    // 3' Poly-A Tail
    ctx.fillStyle = '#ec4899';
    ctx.fillRect(curX + 6, centerY + 4, 70, 28);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('AAAA... (Poly-A)', curX + 41, centerY + 21);

    // Mature mRNA result at bottom after splicing
    if (p > 0.6) {
      ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      const matureY = centerY + 120;
      ctx.strokeRect(w * 0.25, matureY, w * 0.5, 36);
      ctx.fillRect(w * 0.25, matureY, w * 0.5, 36);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('MATURE mRNA: 5\' Cap ➔ [Exon 1][Exon 2][Exon 3] ➔ Poly-A Tail', w * 0.5, matureY + 22);
    }
  }

  function drawExportScene(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    p: number,
    t: number
  ) {
    const membraneX = w * 0.5;

    // Nuclear envelope dual lipid bilayer
    ctx.fillStyle = '#1e1b4b';
    ctx.fillRect(0, 0, membraneX, h);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(membraneX, 0, w - membraneX, h);

    // Membrane border
    ctx.strokeStyle = '#4338ca';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(membraneX, 0);
    ctx.lineTo(membraneX, h * 0.35);
    ctx.moveTo(membraneX, h * 0.65);
    ctx.lineTo(membraneX, h);
    ctx.stroke();

    // Nuclear Pore Complex ring
    ctx.save();
    ctx.shadowColor = '#6366f1';
    ctx.shadowBlur = 25;
    ctx.fillStyle = '#6366f1';
    ctx.fillRect(membraneX - 20, h * 0.35, 40, 20);
    ctx.fillRect(membraneX - 20, h * 0.65 - 20, 40, 20);
    ctx.restore();

    // Labels
    ctx.fillStyle = '#818cf8';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('NUCLEUS (Storage & Processing)', membraneX * 0.5, 50);
    ctx.fillText('CYTOPLASM (Translation Engine)', membraneX + (w - membraneX) * 0.5, 50);

    // mRNA Thread moving through the pore
    const mrnaX = w * 0.15 + p * (w * 0.6);
    const mrnaY = h * 0.5;

    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(mrnaX - 80, mrnaY);
    ctx.bezierCurveTo(mrnaX - 30, mrnaY - 20, mrnaX + 30, mrnaY + 20, mrnaX + 80, mrnaY);
    ctx.stroke();

    // Cap & Poly-A on ends
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.arc(mrnaX + 85, mrnaY, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ec4899';
    ctx.beginPath();
    ctx.arc(mrnaX - 85, mrnaY, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('Nuclear Pore Complex (NPC)', membraneX, h * 0.5 - 40);
  }

  function drawTranslationScene(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    p: number,
    t: number
  ) {
    const riboX = w * 0.5;
    const centerY = h * 0.48;

    // mRNA Ribbon running horizontally
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(60, centerY);
    ctx.lineTo(w - 60, centerY);
    ctx.stroke();

    // Codon marks
    const codons = ['AUG', 'GCC', 'UAC', 'GGA', 'UUU', 'UAA'];
    codons.forEach((c, idx) => {
      const cx = 100 + idx * 75;
      ctx.fillStyle = '#34d399';
      ctx.fillRect(cx - 15, centerY - 6, 30, 12);
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(c, cx, centerY + 3);
    });

    // Large Ribosomal Subunit (60S) Top
    ctx.save();
    ctx.shadowColor = '#e11d48';
    ctx.shadowBlur = 20;
    ctx.fillStyle = 'rgba(225, 29, 72, 0.85)';
    ctx.beginPath();
    ctx.ellipse(riboX, centerY - 60, 95, 60, 0, 0, Math.PI * 2);
    ctx.fill();

    // Small Ribosomal Subunit (40S) Bottom
    ctx.fillStyle = 'rgba(244, 63, 94, 0.85)';
    ctx.beginPath();
    ctx.ellipse(riboX, centerY + 45, 85, 35, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Ribosome Site Labels: E, P, A
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('E', riboX - 45, centerY - 50);
    ctx.fillText('P', riboX, centerY - 50);
    ctx.fillText('A', riboX + 45, centerY - 50);

    ctx.font = '9px sans-serif';
    ctx.fillText('Exit', riboX - 45, centerY - 36);
    ctx.fillText('Peptidyl', riboX, centerY - 36);
    ctx.fillText('Aminoacyl', riboX + 45, centerY - 36);

    // tRNA cloverleaf / hairpin docking at P & A sites
    const trnaX = riboX;
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(trnaX, centerY - 10);
    ctx.lineTo(trnaX, centerY - 80);
    ctx.stroke();

    // Growing Polypeptide Beads coming out of exit tunnel
    const aminoAcids = ['Met', 'Ala', 'Tyr', 'Gly', 'Phe'];
    aminoAcids.forEach((aa, idx) => {
      const bx = riboX - 10 - idx * 24;
      const by = centerY - 100 - idx * 12;

      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(bx, by, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 8px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(aa, bx, by + 3);
    });

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Growing Polypeptide (Peptide Bonds)', riboX - 140, centerY - 150);
  }

  function drawFoldingScene(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    p: number,
    t: number
  ) {
    const centerX = w * 0.5;
    const centerY = h * 0.48;

    // 4 Levels of folding representation
    const stages = [
      { label: '1° Primary', desc: 'Linear Sequence', x: w * 0.18 },
      { label: '2° Secondary', desc: 'Alpha Helix / Beta Sheet', x: w * 0.39 },
      { label: '3° Tertiary', desc: '3D Globular Unit', x: w * 0.61 },
      { label: '4° Quaternary', desc: 'Multi-Subunit Complex', x: w * 0.82 },
    ];

    stages.forEach((st, idx) => {
      // Container box
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.strokeRect(st.x - 65, centerY - 80, 130, 160);

      // Title
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(st.label, st.x, centerY - 55);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '10px sans-serif';
      ctx.fillText(st.desc, st.x, centerY + 65);
    });

    // 1: Linear chain
    ctx.fillStyle = '#38bdf8';
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.arc(stages[0].x - 30 + i * 15, centerY, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2: Alpha Helix coil
    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = 0; x < 60; x++) {
      const y = Math.sin(x * 0.3 + t * 3) * 16;
      if (x === 0) ctx.moveTo(stages[1].x - 30 + x, centerY + y);
      else ctx.lineTo(stages[1].x - 30 + x, centerY + y);
    }
    ctx.stroke();

    // 3: 3D Globular Cluster
    ctx.save();
    ctx.shadowColor = '#818cf8';
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#6366f1';
    ctx.beginPath();
    ctx.arc(stages[2].x, centerY, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 4: Hemoglobin-style 4-unit tetramer
    const tetramerOffsets = [
      { ox: -12, oy: -12, c: '#f43f5e' },
      { ox: 12, oy: -12, c: '#f43f5e' },
      { ox: -12, oy: 12, c: '#0284c7' },
      { ox: 12, oy: 12, c: '#0284c7' },
    ];
    tetramerOffsets.forEach((u) => {
      ctx.fillStyle = u.c;
      ctx.beginPath();
      ctx.arc(stages[3].x + u.ox, centerY + u.oy, 14, 0, Math.PI * 2);
      ctx.fill();
    });

    // Success checkmark at bottom
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✓ Functional Biological Enzyme / Machine Complete', w * 0.5, h * 0.88);
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto" ref={containerRef}>
      {/* Video Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-500" />
            Cinematic Central Dogma Masterclass
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
            Molecular Animation Video & Audio Walkthrough
          </h1>
          <p className="text-xs text-stone-600 dark:text-stone-400">
            Watch the full genetic sequence with customizable animation rendering styles, real-time stage dynamics, and synchronized audio narration.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleToggleFullscreen}
            className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors flex items-center gap-1.5 text-xs font-bold"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
          </button>
        </div>
      </div>

      {/* Animation & Voice Settings Control Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Animation Style Selector Bar */}
        <div className="lg:col-span-7 p-4 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-stone-950 border border-stone-800 text-white space-y-2.5 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="text-xs font-extrabold uppercase tracking-wider text-stone-200">
                Visual Animation Style
              </span>
            </div>
            <span className="text-[11px] text-stone-400 font-mono hidden sm:inline">
              Active: {ANIMATION_STYLES[animStyle].name}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(Object.keys(ANIMATION_STYLES) as AnimationStyle[]).map((styleKey) => {
              const isSelected = animStyle === styleKey;
              const styleObj = ANIMATION_STYLES[styleKey];
              return (
                <button
                  key={styleKey}
                  onClick={() => setAnimStyle(styleKey)}
                  className={`p-2.5 rounded-xl text-left border transition-all relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? 'bg-stone-800 border-amber-400/80 shadow-lg shadow-amber-950/40 ring-1 ring-amber-400/50 scale-[1.02]'
                      : 'bg-stone-950/60 border-stone-800 hover:border-stone-700 hover:bg-stone-900/80 text-stone-400'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-bold text-stone-100 flex items-center gap-1">
                      {styleObj.badge}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    )}
                  </div>
                  <span className="text-[10px] text-stone-400 mt-1 line-clamp-1">
                    {styleObj.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Soothing Female Voice & Soundscape Profile (YouTube inspired) */}
        <div className="lg:col-span-5 p-4 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-stone-950 border border-stone-800 text-white space-y-2.5 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-pink-400" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-stone-200">
                Voice Narration Mode
              </span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800/60">
              ✓ Natural Female
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {SOOTHING_VOICE_PRESETS.map((preset) => {
              const isSelected = voicePresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    setVoicePresetId(preset.id);
                    if (isPlaying) speakNarration(currentScene.narration);
                  }}
                  className={`p-2 rounded-xl text-left border text-xs transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-pink-950/60 border-pink-500/80 text-pink-200 shadow-md ring-1 ring-pink-400/40'
                      : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                  }`}
                >
                  <span className="font-bold text-[11px] block">{preset.badge}</span>
                  <span className="text-[9px] text-stone-400 mt-0.5 line-clamp-1">{preset.description}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-1 text-[11px] text-stone-400 border-t border-stone-800/80">
            <span className="truncate max-w-[200px]" title={voiceName}>
              Voice Engine: <strong className="text-pink-300 font-mono">{voiceName}</strong>
            </span>
            <button
              onClick={() => {
                const next = !ambientAudioEnabled;
                setAmbientAudioEnabled(next);
                if (next && isPlaying && !isMuted) audioAtmosphere.startAmbientAtmosphere();
                else audioAtmosphere.stopAmbientAtmosphere();
              }}
              className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors flex items-center gap-1 ${
                ambientAudioEnabled
                  ? 'bg-indigo-950 border-indigo-500/50 text-indigo-300'
                  : 'bg-stone-800 border-stone-700 text-stone-400'
              }`}
            >
              <Music className="w-3 h-3" />
              {ambientAudioEnabled ? '432Hz Soundscape ON' : 'Soundscape OFF'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Video Canvas Player */}
      <div className="relative rounded-3xl overflow-hidden bg-stone-950 border border-stone-800 shadow-2xl">
        {/* Canvas Render Area (16:9 ratio) */}
        <div className="w-full relative aspect-video flex items-center justify-center bg-black">
          <canvas
            ref={canvasRef}
            width={960}
            height={540}
            className="w-full h-full object-contain"
          />

          {/* Big Center Play Button Overlay if Paused */}
          {!isPlaying && (
            <button
              onClick={handlePlayPause}
              className="absolute p-5 rounded-full bg-emerald-600/90 text-white hover:bg-emerald-500 hover:scale-110 transition-all shadow-2xl backdrop-blur group"
              title="Play Video"
            >
              <Play className="w-10 h-10 ml-1" />
            </button>
          )}

          {/* Subtitles / Closed Captions Overlay */}
          {captionsEnabled && (
            <div className="absolute bottom-16 left-6 right-6 pointer-events-none flex justify-center">
              <div className="max-w-2xl px-4 py-2.5 rounded-xl bg-stone-950/85 backdrop-blur border border-stone-700 text-stone-100 text-xs sm:text-sm font-medium text-center shadow-lg leading-relaxed animate-in fade-in">
                <span className="text-emerald-400 font-bold mr-1.5">
                  [{currentScene.stageName}]:
                </span>
                {currentScene.narration}
              </div>
            </div>
          )}
        </div>

        {/* Video Player Control Bar */}
        <div className="p-4 bg-stone-900 border-t border-stone-800 space-y-3">
          {/* Scene Progress Scrub Bar */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-stone-400">
              {Math.floor(sceneProgress * (currentScene.durationMs / 1000))}s
            </span>
            <div
              className="flex-1 h-2 rounded-full bg-stone-800 cursor-pointer relative overflow-hidden"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
                setSceneProgress(newProgress);
                sceneStartTimeRef.current = Date.now() - newProgress * (currentScene.durationMs / playbackRate);
              }}
            >
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all"
                style={{ width: `${sceneProgress * 100}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-stone-400">
              {Math.round(currentScene.durationMs / 1000)}s
            </span>
          </div>

          {/* Playback Button Group */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevScene}
                className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
                title="Previous Scene"
              >
                <Rewind className="w-4 h-4" />
              </button>

              <button
                onClick={handlePlayPause}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  isPlaying
                    ? 'bg-amber-500 text-stone-950 hover:bg-amber-400'
                    : 'bg-emerald-600 text-white hover:bg-emerald-500'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" /> Play Walkthrough
                  </>
                )}
              </button>

              <button
                onClick={handleNextScene}
                className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
                title="Next Scene"
              >
                <FastForward className="w-4 h-4" />
              </button>

              <button
                onClick={handleReset}
                className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
                title="Restart from Beginning"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Middle: Scene title indicator */}
            <div className="hidden md:block text-center">
              <span className="text-xs font-bold text-stone-100 block">
                {currentScene.title}
              </span>
              <span className="text-[10px] text-stone-400 font-mono">
                {currentScene.subtitle}
              </span>
            </div>

            {/* Right Controls: Audio & Speed & Captions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCaptionsEnabled(!captionsEnabled)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                  captionsEnabled
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
                }`}
                title="Toggle Subtitles"
              >
                CC
              </button>

              <button
                onClick={handleToggleMute}
                className={`p-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  isMuted
                    ? 'bg-rose-950/60 text-rose-400 border border-rose-800'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
                title={isMuted ? 'Unmute Audio Narration' : `Mute Audio Narration (Active: ${voiceName})`}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                <span className="hidden md:inline text-[11px] text-pink-300 flex items-center gap-1 font-normal">
                  <Mic className="w-3 h-3 text-pink-400" />
                  Soothing Voice
                </span>
              </button>

              {/* Voice Preset selector */}
              <select
                value={voicePresetId}
                onChange={(e) => {
                  setVoicePresetId(e.target.value);
                  if (isPlaying) {
                    speakNarration(currentScene.narration);
                  }
                }}
                aria-label="Soothing Voice Style"
                className="px-2 py-1.5 rounded-lg bg-stone-800 border border-pink-500/40 text-pink-300 text-xs font-bold focus:outline-none hidden sm:block"
                title="Select Soothing Voice Tone"
              >
                {SOOTHING_VOICE_PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.badge}
                  </option>
                ))}
              </select>

              {/* Ambient Atmosphere Soundscape toggle */}
              <button
                onClick={() => {
                  const next = !ambientAudioEnabled;
                  setAmbientAudioEnabled(next);
                  if (next && isPlaying && !isMuted) {
                    audioAtmosphere.startAmbientAtmosphere();
                  } else {
                    audioAtmosphere.stopAmbientAtmosphere();
                  }
                }}
                className={`p-2 rounded-lg text-xs font-bold transition-colors hidden sm:flex items-center gap-1 ${
                  ambientAudioEnabled && !isMuted
                    ? 'bg-indigo-950/70 text-indigo-300 border border-indigo-500/50'
                    : 'bg-stone-800 text-stone-500 hover:text-stone-300'
                }`}
                title="Ambient 432Hz Soundscape Harmony"
              >
                <Music className="w-3.5 h-3.5" />
                <span className="text-[10px] hidden md:inline">Atmosphere</span>
              </button>

              {/* Speed toggle */}
              <select
                value={playbackRate}
                onChange={(e) => setPlaybackRate(Number(e.target.value))}
                aria-label="Playback speed"
                className="px-2 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-stone-200 text-xs font-mono font-bold focus:outline-none"
              >
                <option value={0.75}>0.75x</option>
                <option value={1}>1.0x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
              </select>

              {/* In-player Style Switcher */}
              <select
                value={animStyle}
                onChange={(e) => setAnimStyle(e.target.value as AnimationStyle)}
                aria-label="Animation Style"
                className="px-2 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-amber-400 text-xs font-bold focus:outline-none hidden sm:block"
              >
                <option value="scifi">🚀 Sci-Fi</option>
                <option value="cyberpunk">⚡ Neon</option>
                <option value="cartoon">🎨 Anime 2D</option>
                <option value="blueprint">📐 Blueprint</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter Selection Grid */}
      <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-500" />
            <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
              Interactive Scene Chapters ({SCENES.length} Stages)
            </h3>
          </div>
          <span className="text-xs text-stone-400">Click any chapter to jump</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {SCENES.map((sc, idx) => {
            const isActive = currentSceneIdx === idx;
            return (
              <button
                key={sc.id}
                onClick={() => handleSelectScene(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                  isActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 shadow-md ring-2 ring-emerald-400/30'
                    : 'bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800 hover:border-emerald-400'
                }`}
              >
                <div className="flex items-center justify-between pb-1">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                    Chapter {idx + 1}
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono">
                    {Math.round(sc.durationMs / 1000)}s
                  </span>
                </div>

                <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100 mt-1 line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  {sc.title}
                </h4>

                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-2">
                  {sc.stageName}
                </p>

                {isActive && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
