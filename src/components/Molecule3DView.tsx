/**
 * 3D Molecule Explorer View
 * Interactive 3D workspace allowing users to rotate, inspect, zoom,
 * and measure DNA, RNA, tRNA, Ribosome decoding, and nucleotide structures.
 */

import React, { useState } from 'react';
import {
  ModelType,
  RenderStyle,
  ColorScheme,
  getMoleculeModel,
  SpatialFeatureAnnotation
} from './molecule3d/moleculeData';
import { MoleculeViewer3D } from './molecule3d/MoleculeViewer3D';
import { MoleculeControls } from './molecule3d/MoleculeControls';
import {
  Rotate3d,
  Sparkles,
  Volume2,
  VolumeX,
  Atom,
  Dna,
  Layers,
  Zap,
  Info,
  CheckCircle2,
  Split,
  Eye
} from 'lucide-react';
import { createSoothingFemaleUtterance } from '../utils/voiceUtils';

export const Molecule3DView: React.FC = () => {
  const [currentModelId, setCurrentModelId] = useState<ModelType>('b-dna');
  const [renderStyle, setRenderStyle] = useState<RenderStyle>('ball-and-stick');
  const [colorScheme, setColorScheme] = useState<ColorScheme>('base-type');
  const [showAnnotations, setShowAnnotations] = useState<boolean>(true);
  const [showHBonds, setShowHBonds] = useState<boolean>(true);
  const [showHelicalAxis, setShowHelicalAxis] = useState<boolean>(false);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);
  const [autoRotateSpeed, setAutoRotateSpeed] = useState<number>(1.0);
  const [selectedNucleotideIndex, setSelectedNucleotideIndex] = useState<number | null>(null);
  const [isReadingAloud, setIsReadingAloud] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'viewer' | 'comparisons'>('viewer');

  const modelData = getMoleculeModel(currentModelId);

  const handleReadAloud = () => {
    if (!('speechSynthesis' in window)) return;
    if (isReadingAloud) {
      window.speechSynthesis.cancel();
      setIsReadingAloud(false);
      return;
    }

    const textToRead = `${modelData.title}. ${modelData.subtitle}. Key structural facts: ${modelData.keyTakeaways.join(' ')}. Clinical significance: ${modelData.clinicalOrBiologicalSignificance}`;
    const utterance = createSoothingFemaleUtterance(textToRead);
    utterance.onend = () => setIsReadingAloud(false);
    utterance.onerror = () => setIsReadingAloud(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsReadingAloud(true);
  };

  const handleSelectAnnotation = (annotation: SpatialFeatureAnnotation) => {
    // Speak or highlight annotation details
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30">
              <Rotate3d className="w-3.5 h-3.5" />
              <span>3D Spatial Macromolecule Explorer</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Interactive 3D DNA & RNA Molecular Viewer
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Rotate, inspect, and measure 3D nucleic acid architectures in real-time space: examine Watson-Crick base stacking, Major/Minor groove asymmetry, C2'-endo vs C3'-endo sugar puckers, tRNA tertiary L-folding, and ribosome decoding geometry.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handleReadAloud}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shadow-md ${
                isReadingAloud
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-700'
              }`}
            >
              {isReadingAloud ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              <span>{isReadingAloud ? 'Stop Voice' : 'Listen to Structural Audio'}</span>
            </button>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="mt-6 pt-6 border-t border-stone-800 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('viewer')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'viewer'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            <Rotate3d className="w-3.5 h-3.5" />
            <span>Interactive 3D Stage</span>
          </button>

          <button
            onClick={() => setActiveTab('comparisons')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'comparisons'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            <Split className="w-3.5 h-3.5" />
            <span>3D Helical Comparison Matrix (B-DNA vs A-RNA vs Z-DNA)</span>
          </button>
        </div>
      </div>

      {activeTab === 'viewer' && (
        <div className="space-y-6">
          {/* Main 3D Canvas Stage */}
          <div className="w-full h-[580px]">
            <MoleculeViewer3D
              modelData={modelData}
              renderStyle={renderStyle}
              colorScheme={colorScheme}
              showAnnotations={showAnnotations}
              showHBonds={showHBonds}
              showHelicalAxis={showHelicalAxis}
              isAutoRotating={isAutoRotating}
              autoRotateSpeed={autoRotateSpeed}
              selectedNucleotideIndex={selectedNucleotideIndex}
              onSelectNucleotide={setSelectedNucleotideIndex}
              onSelectAnnotation={handleSelectAnnotation}
            />
          </div>

          {/* Molecule Controls & Inspector Panel */}
          <MoleculeControls
            currentModelId={currentModelId}
            onSelectModel={setCurrentModelId}
            renderStyle={renderStyle}
            onChangeRenderStyle={setRenderStyle}
            colorScheme={colorScheme}
            onChangeColorScheme={setColorScheme}
            showAnnotations={showAnnotations}
            onToggleAnnotations={() => setShowAnnotations(!showAnnotations)}
            showHBonds={showHBonds}
            onToggleHBonds={() => setShowHBonds(!showHBonds)}
            showHelicalAxis={showHelicalAxis}
            onToggleHelicalAxis={() => setShowHelicalAxis(!showHelicalAxis)}
            isAutoRotating={isAutoRotating}
            onToggleAutoRotate={() => setIsAutoRotating(!isAutoRotating)}
            autoRotateSpeed={autoRotateSpeed}
            onChangeAutoRotateSpeed={setAutoRotateSpeed}
            modelData={modelData}
            selectedNucleotideIndex={selectedNucleotideIndex}
            onSelectNucleotide={setSelectedNucleotideIndex}
          />
        </div>
      )}

      {/* Helical Comparison Matrix Tab */}
      {activeTab === 'comparisons' && (
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Split className="w-5 h-5 text-emerald-500" />
              Structural Comparison of B-DNA, A-Form (DNA/RNA), and Z-DNA Helices
            </h3>
            <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm mt-1">
              Side-by-side comparison of the three primary double-helical geometries observed in living organisms.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-400 font-mono text-[11px]">
                  <th className="py-3 px-4 font-bold text-stone-900 dark:text-stone-100">Structural Parameter</th>
                  <th className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold">B-DNA (Canonical)</th>
                  <th className="py-3 px-4 text-sky-600 dark:text-sky-400 font-bold">A-Form (RNA / dsRNA)</th>
                  <th className="py-3 px-4 text-amber-600 dark:text-amber-400 font-bold">Z-DNA (Left-Handed)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60 font-mono text-stone-700 dark:text-stone-300">
                <tr>
                  <td className="py-3 px-4 font-sans font-bold text-stone-900 dark:text-stone-100">Helical Sense</td>
                  <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold">Right-handed</td>
                  <td className="py-3 px-4 text-sky-600 dark:text-sky-400 font-bold">Right-handed</td>
                  <td className="py-3 px-4 text-amber-600 dark:text-amber-400 font-bold">Left-handed (Zigzag)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-bold text-stone-900 dark:text-stone-100">Base Pairs Per Turn</td>
                  <td className="py-3 px-4 font-bold">10.5 bp</td>
                  <td className="py-3 px-4 font-bold">11.0 bp</td>
                  <td className="py-3 px-4 font-bold">12.0 bp (6 dimers)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-bold text-stone-900 dark:text-stone-100">Axial Rise Per Base Pair</td>
                  <td className="py-3 px-4">3.38 Å</td>
                  <td className="py-3 px-4">2.56 Å (compressed)</td>
                  <td className="py-3 px-4">3.70 Å (elongated)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-bold text-stone-900 dark:text-stone-100">Helical Pitch (Length/Turn)</td>
                  <td className="py-3 px-4">34.0 Å</td>
                  <td className="py-3 px-4">28.2 Å</td>
                  <td className="py-3 px-4">44.4 Å</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-bold text-stone-900 dark:text-stone-100">Helix Diameter</td>
                  <td className="py-3 px-4">20.0 Å</td>
                  <td className="py-3 px-4">23.0 Å (widest)</td>
                  <td className="py-3 px-4">18.0 Å (slender)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-bold text-stone-900 dark:text-stone-100">Base Pair Tilt to Helix Axis</td>
                  <td className="py-3 px-4">~ -6° (Perpendicular)</td>
                  <td className="py-3 px-4 font-bold text-sky-600 dark:text-sky-400">+19.0° (High tilt)</td>
                  <td className="py-3 px-4">~ -9°</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-bold text-stone-900 dark:text-stone-100">Sugar Pucker Conformation</td>
                  <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">C2'-endo</td>
                  <td className="py-3 px-4 font-bold text-sky-600 dark:text-sky-400">C3'-endo (2'-OH steric clash)</td>
                  <td className="py-3 px-4 font-bold text-amber-600 dark:text-amber-400">Alternating: C2'-endo / C3'-endo</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-bold text-stone-900 dark:text-stone-100">Glycosidic Bond Conformation</td>
                  <td className="py-3 px-4">anti</td>
                  <td className="py-3 px-4">anti</td>
                  <td className="py-3 px-4 font-bold text-amber-600 dark:text-amber-400">anti (pyrimidines) / syn (purines)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-bold text-stone-900 dark:text-stone-100">Major Groove Geometry</td>
                  <td className="py-3 px-4">Wide & Deep (22 Å)</td>
                  <td className="py-3 px-4">Extremely narrow & deep</td>
                  <td className="py-3 px-4">Flat on helix surface</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-bold text-stone-900 dark:text-stone-100">Minor Groove Geometry</td>
                  <td className="py-3 px-4">Narrow & Deep (12 Å)</td>
                  <td className="py-3 px-4">Broad & Shallow</td>
                  <td className="py-3 px-4">Narrow & Deep</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-bold text-stone-900 dark:text-stone-100">Hydration & Salt Trigger</td>
                  <td className="py-3 px-4 font-sans">Aqueous solution (&gt;92% RH)</td>
                  <td className="py-3 px-4 font-sans">Low humidity (&lt;75% RH) or dsRNA</td>
                  <td className="py-3 px-4 font-sans">High salt, negative supercoiling</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
