/**
 * Controls and Inspector Panel for 3D Molecule Viewer
 * Provides model selection, display mode options, color schemes,
 * nucleotide sequence inspector, and educational structural breakdowns.
 */

import React from 'react';
import {
  ModelType,
  RenderStyle,
  ColorScheme,
  MoleculeModelData,
  Nucleotide3D,
  BASE_COLORS
} from './moleculeData';
import {
  Layers,
  Palette,
  RotateCw,
  Sliders,
  CheckCircle2,
  Atom,
  Dna,
  Zap,
  Activity,
  Compass,
  ArrowRight,
  Info,
  Sparkles,
  Link2
} from 'lucide-react';

interface MoleculeControlsProps {
  currentModelId: ModelType;
  onSelectModel: (id: ModelType) => void;
  renderStyle: RenderStyle;
  onChangeRenderStyle: (style: RenderStyle) => void;
  colorScheme: ColorScheme;
  onChangeColorScheme: (scheme: ColorScheme) => void;
  showAnnotations: boolean;
  onToggleAnnotations: () => void;
  showHBonds: boolean;
  onToggleHBonds: () => void;
  showHelicalAxis: boolean;
  onToggleHelicalAxis: () => void;
  isAutoRotating: boolean;
  onToggleAutoRotate: () => void;
  autoRotateSpeed: number;
  onChangeAutoRotateSpeed: (speed: number) => void;
  modelData: MoleculeModelData;
  selectedNucleotideIndex: number | null;
  onSelectNucleotide: (index: number | null) => void;
}

export const MoleculeControls: React.FC<MoleculeControlsProps> = ({
  currentModelId,
  onSelectModel,
  renderStyle,
  onChangeRenderStyle,
  colorScheme,
  onChangeColorScheme,
  showAnnotations,
  onToggleAnnotations,
  showHBonds,
  onToggleHBonds,
  showHelicalAxis,
  onToggleHelicalAxis,
  isAutoRotating,
  onToggleAutoRotate,
  autoRotateSpeed,
  onChangeAutoRotateSpeed,
  modelData,
  selectedNucleotideIndex,
  onSelectNucleotide
}) => {
  const modelsList: { id: ModelType; label: string; badge: string; icon: any }[] = [
    { id: 'b-dna', label: 'B-DNA Canonical Helix', badge: '10.5 bp/turn', icon: Dna },
    { id: 'a-rna', label: 'A-Form RNA Double Helix', badge: '11.0 bp/turn', icon: Zap },
    { id: 'trna-phe', label: 'tRNA-Phe 3D L-Fold', badge: '76 nt Tertiary', icon: Sparkles },
    { id: 'ribosome-decoding', label: 'Ribosome Decoding & PTC', badge: 'mRNA-tRNA-A/P', icon: Layers },
    { id: 'single-datp', label: 'dATP High-Energy Nucleotide', badge: 'Triphosphate', icon: Atom },
    { id: 'z-dna', label: 'Z-DNA Left-Handed Helix', badge: '12 bp/turn Left', icon: Compass },
    { id: 'a-dna', label: 'A-DNA Dehydrated Form', badge: '19° Tilted Bases', icon: Dna },
  ];

  const selectedNucleotide: Nucleotide3D | undefined =
    selectedNucleotideIndex !== null
      ? modelData.nucleotides.find((n) => n.index === selectedNucleotideIndex)
      : undefined;

  return (
    <div className="space-y-6">
      {/* 1. Model Selection Matrix */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Atom className="w-4 h-4 text-emerald-500" />
            Select 3D Molecular Model
          </h3>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
            {modelsList.length} Structures
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {modelsList.map((m) => {
            const isSelected = currentModelId === m.id;
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => {
                  onSelectModel(m.id);
                  onSelectNucleotide(null);
                }}
                className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 shadow-sm ring-1 ring-emerald-500/40'
                    : 'bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-400'}`} />
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                    {m.badge}
                  </span>
                </div>
                <span className={`text-xs font-bold leading-tight ${isSelected ? 'text-emerald-900 dark:text-emerald-100' : 'text-stone-800 dark:text-stone-200'}`}>
                  {m.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Visual Style & Color Scheme Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Render Style */}
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 shadow-xs space-y-3">
          <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-blue-500" />
            3D Representation Style
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'ball-and-stick' as const, label: 'Ball & Stick', desc: 'Atoms & Covalent Bonds' },
              { id: 'space-filling' as const, label: 'Space-Filling (CPK)', desc: 'van der Waals Radii' },
              { id: 'ribbon-ladder' as const, label: 'Ribbon & Ladder', desc: 'Cartoon Backbone' },
              { id: 'backbone-wire' as const, label: 'Wireframe Trace', desc: 'Phosphodiester Axis' },
            ].map((style) => (
              <button
                key={style.id}
                onClick={() => onChangeRenderStyle(style.id)}
                className={`p-2.5 rounded-xl text-left border transition-all ${
                  renderStyle === style.id
                    ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 ring-1 ring-blue-500/40'
                    : 'bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <div className="text-xs font-bold text-stone-900 dark:text-stone-100">{style.label}</div>
                <div className="text-[10px] text-stone-500 dark:text-stone-400">{style.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Color Scheme */}
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 shadow-xs space-y-3">
          <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Palette className="w-3.5 h-3.5 text-purple-500" />
            Atomic & Base Color Palette
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'element-cpk' as const, label: 'CPK Atomic Elements', desc: 'C:Gray, N:Blue, O:Red, P:Amber' },
              { id: 'base-type' as const, label: 'Nucleotide Base Type', desc: 'A:Green, T:Red, G:Gold, C:Blue, U:Purple' },
              { id: 'strand-id' as const, label: 'Strand Polarity', desc: 'Strand 1: Green, Strand 2: Amber' },
              { id: 'sugar-pucker' as const, label: 'Sugar Conformation', desc: "C2'-endo (DNA) vs C3'-endo (RNA)" },
            ].map((scheme) => (
              <button
                key={scheme.id}
                onClick={() => onChangeColorScheme(scheme.id)}
                className={`p-2.5 rounded-xl text-left border transition-all ${
                  colorScheme === scheme.id
                    ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-500 ring-1 ring-purple-500/40'
                    : 'bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <div className="text-xs font-bold text-stone-900 dark:text-stone-100">{scheme.label}</div>
                <div className="text-[10px] text-stone-500 dark:text-stone-400">{scheme.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Toggles: Hydrogen Bonds, Helical Axis, Annotations, Auto-Rotate */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Hydrogen Bonds Toggle */}
            <button
              onClick={onToggleHBonds}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
                showHBonds
                  ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-500 text-sky-700 dark:text-sky-300 shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-sky-500" />
              <span>Watson-Crick H-Bonds</span>
            </button>

            {/* Helical Axis Toggle */}
            <button
              onClick={onToggleHelicalAxis}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
                showHelicalAxis
                  ? 'bg-pink-50 dark:bg-pink-950/40 border-pink-500 text-pink-700 dark:text-pink-300 shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-pink-500" />
              <span>Central Helical Axis</span>
            </button>

            {/* Annotations Toggle */}
            <button
              onClick={onToggleAnnotations}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
                showAnnotations
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-300 shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>Spatial 3D Annotations</span>
            </button>
          </div>

          {/* Auto Rotate & Speed Slider */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleAutoRotate}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
                isAutoRotating
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-700 dark:text-amber-300 shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
              }`}
            >
              <RotateCw className={`w-3.5 h-3.5 text-amber-500 ${isAutoRotating ? 'animate-spin' : ''}`} />
              <span>Auto-Rotate</span>
            </button>

            {isAutoRotating && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-stone-500">Speed:</span>
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
                  step="0.2"
                  value={autoRotateSpeed}
                  onChange={(e) => onChangeAutoRotateSpeed(parseFloat(e.target.value))}
                  className="w-20 accent-amber-500"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Nucleotide Sequence Inspector Strip */}
      {modelData.nucleotides.length > 0 && (
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Dna className="w-3.5 h-3.5 text-emerald-500" />
              Interactive Nucleotide Sequence Inspector (Click to Target in 3D)
            </h4>
            {selectedNucleotide && (
              <button
                onClick={() => onSelectNucleotide(null)}
                className="text-[10px] text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 underline font-mono"
              >
                Clear Selection
              </button>
            )}
          </div>

          {/* Sequence Carousel Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
            {modelData.nucleotides.map((n) => {
              const isSelected = selectedNucleotideIndex === n.index;
              const color = BASE_COLORS[n.base] || '#10B981';
              return (
                <button
                  key={n.index}
                  onClick={() => onSelectNucleotide(isSelected ? null : n.index)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold font-mono shrink-0 border transition-all flex flex-col items-center gap-0.5 ${
                    isSelected
                      ? 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-105'
                      : 'bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 hover:border-stone-400'
                  }`}
                >
                  <span className="text-[9px] opacity-70">
                    S{n.strand}#{n.index + 1}
                  </span>
                  <span className="text-sm font-extrabold" style={{ color: isSelected ? '#FFFFFF' : color }}>
                    {n.base}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Targeted Nucleotide Detail Card */}
          {selectedNucleotide && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 font-mono">
                  {selectedNucleotide.name} • Strand {selectedNucleotide.strand}
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200">
                  Sugar: {selectedNucleotide.sugarPucker || "C2'-endo"}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                <div>
                  <span className="text-stone-500 block">Base Identity:</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">
                    {selectedNucleotide.base} ({selectedNucleotide.base === 'A' ? 'Adenine' : selectedNucleotide.base === 'T' ? 'Thymine' : selectedNucleotide.base === 'G' ? 'Guanine' : selectedNucleotide.base === 'C' ? 'Cytosine' : 'Uracil'})
                  </span>
                </div>
                <div>
                  <span className="text-stone-500 block">Watson-Crick H-Bonds:</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">
                    {selectedNucleotide.hBondCount || '—'} Bonds
                  </span>
                </div>
                <div>
                  <span className="text-stone-500 block">Glycosidic Angle:</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">
                    {selectedNucleotide.glycosidicAngle || 'anti'}
                  </span>
                </div>
                <div>
                  <span className="text-stone-500 block">Phosphate 3D Coords:</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">
                    [{selectedNucleotide.phosphateCenter[0].toFixed(1)}, {selectedNucleotide.phosphateCenter[1].toFixed(1)}, {selectedNucleotide.phosphateCenter[2].toFixed(1)}]
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. High-Yield Educational Key Takeaways */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-xs space-y-4">
        <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Info className="w-4 h-4 text-emerald-500" />
          High-Yield Structural Insights for {modelData.title}
        </h4>

        <div className="space-y-2">
          {modelData.keyTakeaways.map((point, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{point}</span>
            </div>
          ))}
        </div>

        {/* Clinical / Biological Impact Callout */}
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" /> Biological & Clinical Relevance
          </span>
          <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
            {modelData.clinicalOrBiologicalSignificance}
          </p>
        </div>
      </div>
    </div>
  );
};
