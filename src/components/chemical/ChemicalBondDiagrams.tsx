import React, { useState } from 'react';
import {
  Sparkles,
  Info,
  Flame,
  Layers,
  ArrowRight,
  ShieldAlert,
  Zap,
  CheckCircle2
} from 'lucide-react';

// Re-export specialized chemical diagrams
export { RiboseConversionDiagram } from './RiboseConversionDiagram';
export { TriphosphateDiagram } from './TriphosphateDiagram';
export { AllBasesDiagram } from './AllBasesDiagram';
export { NucleotideAssemblyDiagram } from './NucleotideAssemblyDiagram';

export const DnaDeoxyriboseDiagram: React.FC = () => {
  const [highlightedAtom, setHighlightedAtom] = useState<string | null>(null);

  return (
    <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 text-stone-100 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
            Pentose Furanose Sugar
          </span>
          <h4 className="text-sm font-bold text-white">2-Deoxy-D-Ribose Ring (C₅H₁₀O₄)</h4>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-stone-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
          <span>Click any carbon atom to inspect chemistry</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* SVG Structure */}
        <div className="md:col-span-7 flex justify-center p-3 bg-stone-950 rounded-xl border border-stone-800/80 relative overflow-hidden">
          <svg viewBox="0 0 400 280" className="w-full max-w-sm h-auto font-mono select-none">
            <defs>
              <linearGradient id="sugarGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Furanose Ring Polygon */}
            <polygon
              points="200,60 290,120 250,210 150,210 110,120"
              fill="url(#sugarGrad)"
              stroke="#10b981"
              strokeWidth="2.5"
            />

            {/* Ring Oxygen */}
            <circle
              cx="200"
              cy="60"
              r="16"
              fill="#ef4444"
              className="cursor-pointer transition-transform hover:scale-110"
              onClick={() => setHighlightedAtom('ring-o')}
            />
            <text x="200" y="65" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">
              O
            </text>
            <text x="200" y="38" textAnchor="middle" fill="#fca5a5" fontSize="10">
              Ring Oxygen
            </text>

            {/* C1' Carbon & N-Glycosidic Bond */}
            <line x1="290" y1="120" x2="360" y2="100" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="3 3" />
            <circle
              cx="290"
              cy="120"
              r="14"
              fill={highlightedAtom === 'c1' ? '#38bdf8' : '#334155'}
              stroke="#38bdf8"
              strokeWidth="2"
              className="cursor-pointer transition-transform hover:scale-110"
              onClick={() => setHighlightedAtom('c1')}
            />
            <text x="290" y="125" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
              C1'
            </text>
            <rect x="340" y="85" width="55" height="28" rx="6" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="367" y="103" textAnchor="middle" fill="#e0f2fe" fontSize="10" fontWeight="bold">
              Base
            </text>
            <text x="325" y="80" fill="#38bdf8" fontSize="8">
              N-Glycosidic
            </text>

            {/* C2' Carbon (Key DNA difference: No OH!) */}
            <circle
              cx="250"
              cy="210"
              r="15"
              fill={highlightedAtom === 'c2' ? '#f59e0b' : '#451a03'}
              stroke="#f59e0b"
              strokeWidth="2.5"
              className="cursor-pointer transition-transform hover:scale-110"
              onClick={() => setHighlightedAtom('c2')}
            />
            <text x="250" y="215" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">
              C2'
            </text>
            {/* 2' Hydrogens */}
            <line x1="250" y1="225" x2="270" y2="260" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="270" cy="260" r="10" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="270" y="264" textAnchor="middle" fill="#fde68a" fontSize="10" fontWeight="bold">
              -H
            </text>
            <text x="295" y="235" fill="#f59e0b" fontSize="9" fontWeight="bold">
              NO -OH! (2'-Deoxy)
            </text>

            {/* C3' Carbon (3'-OH for elongation) */}
            <circle
              cx="150"
              cy="210"
              r="15"
              fill={highlightedAtom === 'c3' ? '#10b981' : '#064e3b'}
              stroke="#10b981"
              strokeWidth="2.5"
              className="cursor-pointer transition-transform hover:scale-110"
              onClick={() => setHighlightedAtom('c3')}
            />
            <text x="150" y="215" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="bold">
              C3'
            </text>
            {/* 3'-OH */}
            <line x1="150" y1="225" x2="130" y2="260" stroke="#10b981" strokeWidth="2" />
            <rect x="95" y="250" width="45" height="22" rx="6" fill="#047857" stroke="#34d399" strokeWidth="1.5" />
            <text x="117" y="265" textAnchor="middle" fill="#d1fae5" fontSize="10" fontWeight="bold">
              3'-OH
            </text>
            <text x="50" y="240" fill="#34d399" fontSize="9">
              Nucleophilic site
            </text>

            {/* C4' Carbon */}
            <circle
              cx="110"
              cy="120"
              r="14"
              fill={highlightedAtom === 'c4' ? '#a855f7' : '#334155'}
              stroke="#a855f7"
              strokeWidth="2"
              className="cursor-pointer transition-transform hover:scale-110"
              onClick={() => setHighlightedAtom('c4')}
            />
            <text x="110" y="125" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
              C4'
            </text>

            {/* C5' Exocyclic Carbon & Phosphate Bond */}
            <line x1="110" y1="120" x2="60" y2="60" stroke="#ec4899" strokeWidth="2" />
            <circle
              cx="60"
              cy="60"
              r="14"
              fill={highlightedAtom === 'c5' ? '#ec4899' : '#500724'}
              stroke="#ec4899"
              strokeWidth="2"
              className="cursor-pointer transition-transform hover:scale-110"
              onClick={() => setHighlightedAtom('c5')}
            />
            <text x="60" y="65" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="bold">
              C5'
            </text>
            {/* Phosphate Linkage */}
            <line x1="60" y1="60" x2="30" y2="20" stroke="#ec4899" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="25" cy="20" r="14" fill="#831843" stroke="#f472b6" strokeWidth="1.5" />
            <text x="25" y="24" textAnchor="middle" fill="#fbcfe8" fontSize="9" fontWeight="bold">
              5'-PO₄
            </text>
          </svg>
        </div>

        {/* Dynamic Explanatory Box */}
        <div className="md:col-span-5 space-y-2.5 text-xs">
          {highlightedAtom === 'c2' ? (
            <div className="p-3.5 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-200 space-y-1 animate-fade-in">
              <h5 className="font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> C2' Carbon: 2'-Deoxy Nature
              </h5>
              <p className="leading-relaxed">
                Carries two Hydrogen atoms (-H and -H). Because it lacks the reactive 2'-OH found in RNA, DNA is chemically shielded from spontaneous alkaline self-hydrolysis, allowing genetic storage across millennia.
              </p>
            </div>
          ) : highlightedAtom === 'c3' ? (
            <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 space-y-1 animate-fade-in">
              <h5 className="font-bold text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> C3' Carbon: Free 3'-OH
              </h5>
              <p className="leading-relaxed">
                The universal nucleophilic attacker. During synthesis, the 3'-OH attacks the incoming dNTP's alpha-phosphate, liberating pyrophosphate (PPi) to forge a new phosphodiester bond.
              </p>
            </div>
          ) : highlightedAtom === 'c1' ? (
            <div className="p-3.5 rounded-xl bg-blue-950/60 border border-blue-500/40 text-blue-200 space-y-1 animate-fade-in">
              <h5 className="font-bold text-blue-300 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" /> C1' Carbon: Base Attachment
              </h5>
              <p className="leading-relaxed">
                Forms the covalent beta-N-glycosidic bond linking the sugar to nitrogen N9 of purines (A, G) or N1 of pyrimidines (T, C).
              </p>
            </div>
          ) : highlightedAtom === 'c5' ? (
            <div className="p-3.5 rounded-xl bg-pink-950/60 border border-pink-500/40 text-pink-200 space-y-1 animate-fade-in">
              <h5 className="font-bold text-pink-300 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" /> C5' Carbon: 5'-Phosphate Arm
              </h5>
              <p className="leading-relaxed">
                Exocyclic carbon extending outside the furanose ring that holds the 5'-monophosphate or triphosphate moiety.
              </p>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-300 space-y-1">
              <h5 className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" /> Sugar Ring Geometry
              </h5>
              <p className="leading-relaxed">
                The numbering convention uses primes (1', 2', 3', 4', 5') to differentiate sugar carbons from the unprimed numbered positions of the nitrogenous base rings (1–9).
              </p>
            </div>
          )}

          <div className="p-2.5 rounded-lg bg-stone-950/60 border border-stone-800/80 text-[11px] text-stone-400">
            <strong>Chemical Formula:</strong> C₅H₁₀O₄ • Molecular Weight: 134.13 g/mol
          </div>
        </div>
      </div>
    </div>
  );
};

export const DnaPhosphateDiagram: React.FC = () => {
  return (
    <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 text-stone-100 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-pink-400">
            Polyanionic Connector
          </span>
          <h4 className="text-sm font-bold text-white">Phosphate Group & 3'-5' Phosphodiester Linkage</h4>
        </div>
        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-pink-950 border border-pink-500/40 text-pink-300 font-bold">
          Net Charge: -1 per nucleotide
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-7 flex justify-center p-3 bg-stone-950 rounded-xl border border-stone-800/80">
          <svg viewBox="0 0 380 240" className="w-full max-w-sm h-auto font-mono select-none">
            {/* Top Deoxyribose C3' */}
            <rect x="150" y="15" width="80" height="30" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
            <text x="190" y="34" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">
              Sugar (3'-C)
            </text>
            <line x1="190" y1="45" x2="190" y2="75" stroke="#10b981" strokeWidth="2.5" />

            {/* Phosphodiester Core */}
            {/* Ester Oxygen 1 */}
            <circle cx="190" cy="75" r="10" fill="#ef4444" stroke="#f87171" strokeWidth="1.5" />
            <text x="190" y="79" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
              O
            </text>
            <line x1="190" y1="85" x2="190" y2="120" stroke="#f43f5e" strokeWidth="2.5" />

            {/* Central Phosphorus */}
            <circle cx="190" cy="120" r="16" fill="#f43f5e" stroke="#fda4af" strokeWidth="2" />
            <text x="190" y="125" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">
              P
            </text>

            {/* Double Bonded Oxygen (P=O) */}
            <line x1="174" y1="116" x2="135" y2="105" stroke="#ef4444" strokeWidth="2" />
            <line x1="176" y1="124" x2="137" y2="113" stroke="#ef4444" strokeWidth="2" />
            <circle cx="130" cy="110" r="11" fill="#dc2626" stroke="#f87171" strokeWidth="1.5" />
            <text x="130" y="114" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
              O
            </text>
            <text x="95" y="113" textAnchor="end" fill="#fca5a5" fontSize="9">
              Double Bond (P=O)
            </text>

            {/* Deprotonated Oxygen (P-O⁻) */}
            <line x1="206" y1="120" x2="250" y2="120" stroke="#ef4444" strokeWidth="2.5" />
            <circle cx="250" cy="120" r="12" fill="#b91c1c" stroke="#f87171" strokeWidth="1.5" />
            <text x="250" y="124" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
              O⁻
            </text>
            <text x="270" y="124" fill="#f87171" fontSize="10" fontWeight="bold">
              -1 Charge
            </text>

            {/* Ester Oxygen 2 */}
            <line x1="190" y1="136" x2="190" y2="165" stroke="#f43f5e" strokeWidth="2.5" />
            <circle cx="190" cy="165" r="10" fill="#ef4444" stroke="#f87171" strokeWidth="1.5" />
            <text x="190" y="169" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
              O
            </text>

            {/* Bottom Deoxyribose C5' */}
            <line x1="190" y1="175" x2="190" y2="200" stroke="#ec4899" strokeWidth="2.5" />
            <rect x="150" y="200" width="80" height="30" rx="8" fill="#500724" stroke="#ec4899" strokeWidth="1.5" />
            <text x="190" y="219" textAnchor="middle" fill="#fbcfe8" fontSize="11" fontWeight="bold">
              Sugar (5'-C)
            </text>
          </svg>
        </div>

        <div className="md:col-span-5 space-y-2 text-xs text-stone-300">
          <div className="p-3 rounded-xl bg-pink-950/40 border border-pink-500/30 space-y-1">
            <h5 className="font-bold text-pink-300">Why the Negative Charge Matters</h5>
            <p className="leading-relaxed text-stone-300">
              Each nucleotide donates a negative phosphate charge at pH 7.4. This prevents DNA from leaking across cell membranes and creates strong electrostatic affinity for basic histone proteins (Lys/Arg).
            </p>
          </div>
          <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
            <h5 className="font-bold text-stone-200">Covalent Bond Energy</h5>
            <p className="leading-relaxed text-stone-400">
              Phosphodiester bonds (~330 kJ/mol) resist thermal disruption, ensuring the sequence cannot break under temperatures that easily melt hydrogen bonds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DnaNitrogenBasesDiagram: React.FC = () => {
  const [selectedBasePair, setSelectedBasePair] = useState<'AT' | 'GC'>('GC');

  return (
    <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 text-stone-100 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400">
            Watson-Crick Base Pairing
          </span>
          <h4 className="text-sm font-bold text-white">Purines vs Pyrimidines & Hydrogen Bonding</h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedBasePair('GC')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedBasePair === 'GC'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            G ≡ C (3 H-Bonds)
          </button>
          <button
            onClick={() => setSelectedBasePair('AT')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedBasePair === 'AT'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            A = T (2 H-Bonds)
          </button>
        </div>
      </div>

      {selectedBasePair === 'GC' ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center animate-fade-in">
          <div className="md:col-span-7 flex justify-center p-3 bg-stone-950 rounded-xl border border-stone-800/80">
            <svg viewBox="0 0 420 220" className="w-full max-w-md h-auto font-mono select-none">
              {/* Guanine Box (Purine - Double Ring) */}
              <rect x="20" y="30" width="150" height="160" rx="12" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
              <text x="95" y="55" textAnchor="middle" fill="#c7d2fe" fontSize="13" fontWeight="bold">
                Guanine (Purine)
              </text>
              <text x="95" y="72" textAnchor="middle" fill="#818cf8" fontSize="9">
                2 Rings (9 Atoms)
              </text>
              <text x="95" y="170" textAnchor="middle" fill="#a5b4fc" fontSize="9">
                N9 → C1' Glycosidic
              </text>

              {/* Guanine Functional Groups */}
              <circle cx="150" cy="90" r="10" fill="#dc2626" stroke="#f87171" strokeWidth="1.5" />
              <text x="150" y="94" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                O6
              </text>

              <circle cx="150" cy="120" r="10" fill="#2563eb" stroke="#60a5fa" strokeWidth="1.5" />
              <text x="150" y="124" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
                N1-H
              </text>

              <circle cx="150" cy="150" r="10" fill="#2563eb" stroke="#60a5fa" strokeWidth="1.5" />
              <text x="150" y="154" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">
                N2-H₂
              </text>

              {/* 3 Hydrogen Bonds (Dotted Lines) */}
              <line x1="162" y1="90" x2="258" y2="90" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 4" />
              <text x="210" y="83" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">
                H-Bond 1
              </text>

              <line x1="162" y1="120" x2="258" y2="120" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 4" />
              <text x="210" y="113" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">
                H-Bond 2
              </text>

              <line x1="162" y1="150" x2="258" y2="150" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 4" />
              <text x="210" y="143" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">
                H-Bond 3
              </text>

              {/* Cytosine Box (Pyrimidine - Single Ring) */}
              <rect x="250" y="30" width="150" height="160" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <text x="325" y="55" textAnchor="middle" fill="#bae6fd" fontSize="13" fontWeight="bold">
                Cytosine (Pyrim.)
              </text>
              <text x="325" y="72" textAnchor="middle" fill="#7dd3fc" fontSize="9">
                1 Ring (6 Atoms)
              </text>
              <text x="325" y="170" textAnchor="middle" fill="#7dd3fc" fontSize="9">
                N1 → C1' Glycosidic
              </text>

              {/* Cytosine Functional Groups */}
              <circle cx="270" cy="90" r="10" fill="#2563eb" stroke="#60a5fa" strokeWidth="1.5" />
              <text x="270" y="94" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">
                N4-H₂
              </text>

              <circle cx="270" cy="120" r="10" fill="#2563eb" stroke="#60a5fa" strokeWidth="1.5" />
              <text x="270" y="124" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                N3
              </text>

              <circle cx="270" cy="150" r="10" fill="#dc2626" stroke="#f87171" strokeWidth="1.5" />
              <text x="270" y="154" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                O2
              </text>
            </svg>
          </div>

          <div className="md:col-span-5 space-y-2 text-xs text-stone-300">
            <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/40 space-y-1">
              <h5 className="font-bold text-blue-300">G ≡ C Triple Hydrogen Bond (ΔG ~ -21 kJ/mol)</h5>
              <ul className="space-y-1 text-stone-300 text-[11px]">
                <li>• <strong>Bond 1:</strong> Guanine O6 (acceptor) ··· H-N4 Cytosine (donor)</li>
                <li>• <strong>Bond 2:</strong> Guanine N1-H (donor) ··· N3 Cytosine (acceptor)</li>
                <li>• <strong>Bond 3:</strong> Guanine N2-H (donor) ··· O2 Cytosine (acceptor)</li>
              </ul>
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              Because GC base pairs contain 3 hydrogen bonds, GC-rich DNA sequences melt at significantly higher temperatures (higher Tm).
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center animate-fade-in">
          <div className="md:col-span-7 flex justify-center p-3 bg-stone-950 rounded-xl border border-stone-800/80">
            <svg viewBox="0 0 420 220" className="w-full max-w-md h-auto font-mono select-none">
              {/* Adenine Box (Purine - Double Ring) */}
              <rect x="20" y="30" width="150" height="160" rx="12" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
              <text x="95" y="55" textAnchor="middle" fill="#a7f3d0" fontSize="13" fontWeight="bold">
                Adenine (Purine)
              </text>
              <text x="95" y="72" textAnchor="middle" fill="#6ee7b7" fontSize="9">
                2 Rings (9 Atoms)
              </text>
              <text x="95" y="170" textAnchor="middle" fill="#6ee7b7" fontSize="9">
                N9 → C1' Glycosidic
              </text>

              {/* Adenine Groups */}
              <circle cx="150" cy="95" r="10" fill="#2563eb" stroke="#60a5fa" strokeWidth="1.5" />
              <text x="150" y="99" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">
                N6-H₂
              </text>

              <circle cx="150" cy="140" r="10" fill="#2563eb" stroke="#60a5fa" strokeWidth="1.5" />
              <text x="150" y="144" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                N1
              </text>

              {/* 2 Hydrogen Bonds */}
              <line x1="162" y1="95" x2="258" y2="95" stroke="#10b981" strokeWidth="2.5" strokeDasharray="4 4" />
              <text x="210" y="87" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">
                H-Bond 1
              </text>

              <line x1="162" y1="140" x2="258" y2="140" stroke="#10b981" strokeWidth="2.5" strokeDasharray="4 4" />
              <text x="210" y="132" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">
                H-Bond 2
              </text>

              {/* Thymine Box (Pyrimidine - Single Ring) */}
              <rect x="250" y="30" width="150" height="160" rx="12" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
              <text x="325" y="55" textAnchor="middle" fill="#fde68a" fontSize="13" fontWeight="bold">
                Thymine (Pyrim.)
              </text>
              <text x="325" y="72" textAnchor="middle" fill="#fbbf24" fontSize="9">
                1 Ring + 5-CH₃
              </text>
              <text x="325" y="170" textAnchor="middle" fill="#fbbf24" fontSize="9">
                N1 → C1' Glycosidic
              </text>

              {/* Thymine Groups */}
              <circle cx="270" cy="95" r="10" fill="#dc2626" stroke="#f87171" strokeWidth="1.5" />
              <text x="270" y="99" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                O4
              </text>

              <circle cx="270" cy="140" r="10" fill="#2563eb" stroke="#60a5fa" strokeWidth="1.5" />
              <text x="270" y="144" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
                N3-H
              </text>
            </svg>
          </div>

          <div className="md:col-span-5 space-y-2 text-xs text-stone-300">
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-1">
              <h5 className="font-bold text-emerald-300">A = T Double Hydrogen Bond (ΔG ~ -12 kJ/mol)</h5>
              <ul className="space-y-1 text-stone-300 text-[11px]">
                <li>• <strong>Bond 1:</strong> Adenine N6-H (donor) ··· O4 Thymine (acceptor)</li>
                <li>• <strong>Bond 2:</strong> Adenine N1 (acceptor) ··· H-N3 Thymine (donor)</li>
              </ul>
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              The TATA promoter box is enriched in A=T pairs so that RNA Polymerase II can easily separate the two strands with minimal ATP expenditure.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export const RnaRiboseAndUracilDiagram: React.FC = () => {
  return (
    <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 text-stone-100 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-400">
            RNA Chemical Signature
          </span>
          <h4 className="text-sm font-bold text-white">Ribose Sugar 2'-OH vs Uracil Chemistry</h4>
        </div>
        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-teal-950 border border-teal-500/40 text-teal-300 font-bold">
          C₅H₁₀O₅ & Uracil (C₄H₄N₂O₂)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Box 1: 2'-OH comparison */}
        <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
          <h5 className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> 1. The Reactive 2'-OH on Ribose
          </h5>
          <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-500/30 space-y-2 text-xs">
            <p className="text-stone-300 leading-relaxed">
              Unlike DNA (which has -H at C2'), RNA contains a reactive hydroxyl (<strong>-OH</strong>) group at C2'.
            </p>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded bg-stone-900 border border-stone-800">
                <span className="font-bold text-emerald-400 block">DNA Deoxyribose:</span>
                <span className="text-stone-400">2'-H (Stable, protected from nucleophilic self-attack).</span>
              </div>
              <div className="p-2 rounded bg-teal-950/60 border border-teal-800">
                <span className="font-bold text-teal-300 block">RNA Ribose:</span>
                <span className="text-stone-300">2'-OH (Enables ribozyme catalysis, but hydrolyzes at high pH).</span>
              </div>
            </div>
          </div>
        </div>

        {/* Box 2: Uracil vs Thymine */}
        <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
          <h5 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" /> 2. Uracil vs Thymine (Missing 5-Methyl)
          </h5>
          <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/30 space-y-2 text-xs">
            <p className="text-stone-300 leading-relaxed">
              Uracil lacks the <strong>5-methyl (-CH₃)</strong> group found on Thymine.
            </p>
            <ul className="space-y-1 text-[11px] text-stone-300">
              <li>• <strong>Why RNA uses Uracil:</strong> Energetically cheaper to synthesize for temporary transcripts.</li>
              <li>• <strong>Why DNA uses Thymine:</strong> Spontaneous deamination turns Cytosine into Uracil. DNA uses Thymine so repair enzymes (Uracil-DNA Glycosylase) can instantly spot and fix deaminated cytosines!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProteinPeptideAndFoldingDiagram: React.FC = () => {
  return (
    <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 text-stone-100 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-400">
            Protein Architecture & Folding Forces
          </span>
          <h4 className="text-sm font-bold text-white">Peptide Bond Resonance & The 4 Folding Forces</h4>
        </div>
        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-purple-950 border border-purple-500/40 text-purple-300 font-bold">
          Amide Plane & R-Group Bonds
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Peptide Bond Condensation */}
        <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2.5">
          <h5 className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> Planar Peptide Bond (Amide Linkage)
          </h5>
          <div className="p-3 rounded-lg bg-purple-950/30 border border-purple-500/30 text-xs space-y-1.5 text-stone-300">
            <div className="font-mono text-center text-purple-200 py-1 bg-stone-900 rounded border border-purple-900/50">
              —C(=O)—NH— + H₂O (released)
            </div>
            <p className="leading-relaxed text-[11px]">
              Due to resonance delocalization between the carbonyl oxygen and nitrogen, the C-N bond has <strong>40% double bond character</strong>. This forces the peptide bond into a rigid, planar trans geometry (omega = 180°), restricting conformational folding to the phi (φ) and psi (ψ) angles.
            </p>
          </div>
        </div>

        {/* 4 Tertiary Folding Forces */}
        <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2.5">
          <h5 className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" /> The 4 Chemical Forces of Protein Folding
          </h5>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 rounded bg-amber-950/40 border border-amber-800/60">
              <strong className="text-amber-300 block">1. Disulfide (-S-S-)</strong>
              <span className="text-stone-400">Covalent crosslink between two Cysteine thiols (~250 kJ/mol).</span>
            </div>
            <div className="p-2 rounded bg-blue-950/40 border border-blue-800/60">
              <strong className="text-blue-300 block">2. Salt Bridges (Ionic)</strong>
              <span className="text-stone-400">Attraction between Lys⁺/Arg⁺ and Asp⁻/Glu⁻ (~20 kJ/mol).</span>
            </div>
            <div className="p-2 rounded bg-emerald-950/40 border border-emerald-800/60">
              <strong className="text-emerald-300 block">3. Hydrogen Bonds</strong>
              <span className="text-stone-400">Between polar sidechains (Ser, Thr, Tyr) and backbone.</span>
            </div>
            <div className="p-2 rounded bg-rose-950/40 border border-rose-800/60">
              <strong className="text-rose-300 block">4. Hydrophobic Effect</strong>
              <span className="text-stone-400">Nonpolar residues (Val, Leu, Phe) burying in interior.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const InteractiveDnaHelixBondMaster: React.FC = () => {
  const [temperature, setTemperature] = useState<number>(37); // Celsius
  const [showCovalent, setShowCovalent] = useState<boolean>(true);
  const [showHydrogen, setShowHydrogen] = useState<boolean>(true);
  const [showGlycosidic, setShowGlycosidic] = useState<boolean>(true);
  const [activeAtomFilter, setActiveAtomFilter] = useState<'all' | 'P' | 'O' | 'N' | 'C' | 'H'>('all');

  // Calculate denaturation percentage based on temperature (Tm approx 85C)
  const isDenatured = temperature >= 85;
  const hBondOpacity = Math.max(0.05, 1 - Math.max(0, (temperature - 55) / 35));

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-stone-900 border border-stone-800 text-stone-100 space-y-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Chemical Bonding Master Diagram</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            DNA Double Helix: Complete Atomic & Bond Connectivity
          </h3>
          <p className="text-xs sm:text-sm text-stone-400">
            Antiparallel 5'→3' / 3'←5' strands showing covalent phosphodiesters, N-glycosidic linkages, and Watson-Crick hydrogen bonds.
          </p>
        </div>

        {/* Temperature & Denaturation Simulator */}
        <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 space-y-2 min-w-[260px]">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-stone-300 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              Thermal Denaturation
            </span>
            <span
              className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
                isDenatured ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-stone-800 text-emerald-300'
              }`}
            >
              {temperature}°C {isDenatured ? '(Melted / Single Strands)' : '(Intact Double Helix)'}
            </span>
          </div>

          <input
            type="range"
            min="20"
            max="100"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />

          <div className="flex justify-between text-[10px] text-stone-500 font-mono">
            <span>20°C (Stable)</span>
            <span>55°C</span>
            <span className="text-amber-400">85°C (Tm Melt)</span>
            <span className="text-rose-400">100°C (PCR)</span>
          </div>
        </div>
      </div>

      {/* Bond & Atom Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Toggle Bond Layers */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-stone-400 font-semibold">Bonds:</span>
          <button
            onClick={() => setShowCovalent(!showCovalent)}
            className={`px-2.5 py-1 rounded-lg border font-bold text-[11px] transition-colors ${
              showCovalent
                ? 'bg-pink-950/80 border-pink-500/50 text-pink-300'
                : 'bg-stone-950 border-stone-800 text-stone-500'
            }`}
          >
            Phosphodiester (330 kJ/mol)
          </button>
          <button
            onClick={() => setShowGlycosidic(!showGlycosidic)}
            className={`px-2.5 py-1 rounded-lg border font-bold text-[11px] transition-colors ${
              showGlycosidic
                ? 'bg-purple-950/80 border-purple-500/50 text-purple-300'
                : 'bg-stone-950 border-stone-800 text-stone-500'
            }`}
          >
            N-Glycosidic (350 kJ/mol)
          </button>
          <button
            onClick={() => setShowHydrogen(!showHydrogen)}
            className={`px-2.5 py-1 rounded-lg border font-bold text-[11px] transition-colors ${
              showHydrogen
                ? 'bg-blue-950/80 border-blue-500/50 text-blue-300'
                : 'bg-stone-950 border-stone-800 text-stone-500'
            }`}
          >
            Hydrogen Bonds (12–21 kJ/mol)
          </button>
        </div>

        {/* Atom Filter Chips */}
        <div className="flex items-center gap-1.5">
          <span className="text-stone-400 font-semibold">Atoms:</span>
          {[
            { id: 'all', label: 'All Atoms' },
            { id: 'P', label: 'P (Phosphorus)', color: 'text-pink-400' },
            { id: 'O', label: 'O (Oxygen)', color: 'text-rose-400' },
            { id: 'N', label: 'N (Nitrogen)', color: 'text-blue-400' },
            { id: 'C', label: 'C (Carbon)', color: 'text-stone-300' }
          ].map((atom) => (
            <button
              key={atom.id}
              onClick={() => setActiveAtomFilter(atom.id as any)}
              className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-all ${
                activeAtomFilter === atom.id
                  ? 'bg-stone-100 text-stone-950 shadow'
                  : 'bg-stone-950 text-stone-400 border border-stone-800 hover:text-stone-200'
              }`}
            >
              {atom.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main SVG Chemical Bond Ladder View */}
      <div className="p-4 sm:p-6 bg-stone-950 rounded-2xl border border-stone-800/80 overflow-x-auto">
        <svg viewBox="0 0 760 480" className="w-full min-w-[700px] h-auto font-mono select-none">
          {/* Background Grids / Axis Labels */}
          <text x="80" y="25" textAnchor="middle" fill="#10b981" fontSize="13" fontWeight="bold">
            5' Strand (Left Backbone)
          </text>
          <text x="80" y="40" textAnchor="middle" fill="#6ee7b7" fontSize="10">
            5' → 3' Direction
          </text>

          <text x="680" y="25" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="bold">
            3' Strand (Right Backbone)
          </text>
          <text x="680" y="40" textAnchor="middle" fill="#fde68a" fontSize="10">
            3' ← 5' Antiparallel
          </text>

          <text x="380" y="30" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">
            Central Hydrogen Bonding Core (Watson-Crick Pairing)
          </text>

          {/* ----------------- RUNG 1: A = T ----------------- */}
          {/* Left Strand: Phosphate 1 */}
          {showCovalent && (
            <g opacity={activeAtomFilter === 'all' || activeAtomFilter === 'P' || activeAtomFilter === 'O' ? 1 : 0.2}>
              <circle cx="50" cy="70" r="14" fill="#831843" stroke="#f472b6" strokeWidth="1.5" />
              <text x="50" y="74" textAnchor="middle" fill="#fbcfe8" fontSize="9" fontWeight="bold">
                5'-P
              </text>
              <line x1="50" y1="84" x2="80" y2="105" stroke="#ec4899" strokeWidth="2.5" />
            </g>
          )}

          {/* Left Sugar 1 */}
          <polygon
            points="80,105 115,115 105,145 65,145 55,115"
            fill="#064e3b"
            stroke="#10b981"
            strokeWidth="1.5"
            opacity={activeAtomFilter === 'all' || activeAtomFilter === 'C' ? 1 : 0.3}
          />
          <text x="84" y="130" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontWeight="bold">
            Sugar 1'
          </text>

          {/* N-Glycosidic Bond to Adenine */}
          {showGlycosidic && (
            <line x1="115" y1="115" x2="160" y2="115" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="3 3" />
          )}

          {/* Adenine Box (Purine) */}
          <rect
            x="160"
            y="95"
            width="140"
            height="40"
            rx="8"
            fill="#134e4a"
            stroke="#2dd4bf"
            strokeWidth="2"
            opacity={activeAtomFilter === 'all' || activeAtomFilter === 'N' ? 1 : 0.3}
          />
          <text x="230" y="120" textAnchor="middle" fill="#ccfbf1" fontSize="12" fontWeight="bold">
            Adenine (A)
          </text>

          {/* Hydrogen Bonds A=T (2 Lines) */}
          {showHydrogen && (
            <g opacity={hBondOpacity}>
              <line x1="300" y1="107" x2="460" y2="107" stroke="#34d399" strokeWidth="2.5" strokeDasharray="4 4" />
              <line x1="300" y1="123" x2="460" y2="123" stroke="#34d399" strokeWidth="2.5" strokeDasharray="4 4" />
              <text x="380" y="102" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">
                2 H-Bonds (N6-H···O4, N1···H-N3)
              </text>
            </g>
          )}

          {/* Thymine Box (Pyrimidine) */}
          <rect
            x="460"
            y="95"
            width="140"
            height="40"
            rx="8"
            fill="#713f12"
            stroke="#facc15"
            strokeWidth="2"
            opacity={activeAtomFilter === 'all' || activeAtomFilter === 'N' ? 1 : 0.3}
          />
          <text x="530" y="120" textAnchor="middle" fill="#fef08a" fontSize="12" fontWeight="bold">
            Thymine (T)
          </text>

          {/* N-Glycosidic to Right Sugar */}
          {showGlycosidic && (
            <line x1="600" y1="115" x2="645" y2="115" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="3 3" />
          )}

          {/* Right Sugar 1 */}
          <polygon
            points="680,105 715,115 705,145 665,145 645,115"
            fill="#451a03"
            stroke="#f59e0b"
            strokeWidth="1.5"
            opacity={activeAtomFilter === 'all' || activeAtomFilter === 'C' ? 1 : 0.3}
          />
          <text x="680" y="130" textAnchor="middle" fill="#fde68a" fontSize="10" fontWeight="bold">
            Sugar 3'
          </text>

          {/* ----------------- PHOSPHODIESTER BRIDGE 1 → 2 ----------------- */}
          {showCovalent && (
            <>
              {/* Left 3' to 5' Phosphodiester */}
              <line x1="84" y1="145" x2="60" y2="185" stroke="#ec4899" strokeWidth="3" />
              <circle cx="60" cy="185" r="12" fill="#831843" stroke="#f472b6" strokeWidth="1.5" />
              <text x="60" y="189" textAnchor="middle" fill="#fbcfe8" fontSize="8" fontWeight="bold">
                P
              </text>
              <line x1="60" y1="185" x2="80" y2="225" stroke="#ec4899" strokeWidth="3" />

              {/* Right 3' to 5' Phosphodiester */}
              <line x1="680" y1="145" x2="700" y2="185" stroke="#ec4899" strokeWidth="3" />
              <circle cx="700" cy="185" r="12" fill="#831843" stroke="#f472b6" strokeWidth="1.5" />
              <text x="700" y="189" textAnchor="middle" fill="#fbcfe8" fontSize="8" fontWeight="bold">
                P
              </text>
              <line x1="700" y1="185" x2="680" y2="225" stroke="#ec4899" strokeWidth="3" />
            </>
          )}

          {/* ----------------- RUNG 2: G ≡ C ----------------- */}
          {/* Left Sugar 2 */}
          <polygon
            points="80,225 115,235 105,265 65,265 55,235"
            fill="#064e3b"
            stroke="#10b981"
            strokeWidth="1.5"
            opacity={activeAtomFilter === 'all' || activeAtomFilter === 'C' ? 1 : 0.3}
          />
          <text x="84" y="250" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontWeight="bold">
            Sugar 2
          </text>

          {showGlycosidic && (
            <line x1="115" y1="235" x2="160" y2="235" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="3 3" />
          )}

          {/* Guanine Box */}
          <rect
            x="160"
            y="215"
            width="140"
            height="40"
            rx="8"
            fill="#1e1b4b"
            stroke="#6366f1"
            strokeWidth="2"
            opacity={activeAtomFilter === 'all' || activeAtomFilter === 'N' ? 1 : 0.3}
          />
          <text x="230" y="240" textAnchor="middle" fill="#c7d2fe" fontSize="12" fontWeight="bold">
            Guanine (G)
          </text>

          {/* Hydrogen Bonds G≡C (3 Lines) */}
          {showHydrogen && (
            <g opacity={hBondOpacity}>
              <line x1="300" y1="225" x2="460" y2="225" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 4" />
              <line x1="300" y1="235" x2="460" y2="235" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 4" />
              <line x1="300" y1="245" x2="460" y2="245" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 4" />
              <text x="380" y="220" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">
                3 H-Bonds (O6···H-N4, N1-H···N3, N2-H···O2)
              </text>
            </g>
          )}

          {/* Cytosine Box */}
          <rect
            x="460"
            y="215"
            width="140"
            height="40"
            rx="8"
            fill="#0f172a"
            stroke="#38bdf8"
            strokeWidth="2"
            opacity={activeAtomFilter === 'all' || activeAtomFilter === 'N' ? 1 : 0.3}
          />
          <text x="530" y="240" textAnchor="middle" fill="#bae6fd" fontSize="12" fontWeight="bold">
            Cytosine (C)
          </text>

          {showGlycosidic && (
            <line x1="600" y1="235" x2="645" y2="235" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="3 3" />
          )}

          {/* Right Sugar 2 */}
          <polygon
            points="680,225 715,235 705,265 665,265 645,235"
            fill="#451a03"
            stroke="#f59e0b"
            strokeWidth="1.5"
            opacity={activeAtomFilter === 'all' || activeAtomFilter === 'C' ? 1 : 0.3}
          />
          <text x="680" y="250" textAnchor="middle" fill="#fde68a" fontSize="10" fontWeight="bold">
            Sugar 2
          </text>

          {/* ----------------- PHOSPHODIESTER BRIDGE 2 → 3 ----------------- */}
          {showCovalent && (
            <>
              <line x1="84" y1="265" x2="60" y2="305" stroke="#ec4899" strokeWidth="3" />
              <circle cx="60" cy="305" r="12" fill="#831843" stroke="#f472b6" strokeWidth="1.5" />
              <text x="60" y="309" textAnchor="middle" fill="#fbcfe8" fontSize="8" fontWeight="bold">
                P
              </text>
              <line x1="60" y1="305" x2="80" y2="345" stroke="#ec4899" strokeWidth="3" />

              <line x1="680" y1="265" x2="700" y2="305" stroke="#ec4899" strokeWidth="3" />
              <circle cx="700" cy="305" r="12" fill="#831843" stroke="#f472b6" strokeWidth="1.5" />
              <text x="700" y="309" textAnchor="middle" fill="#fbcfe8" fontSize="8" fontWeight="bold">
                P
              </text>
              <line x1="700" y1="305" x2="680" y2="345" stroke="#ec4899" strokeWidth="3" />
            </>
          )}

          {/* ----------------- RUNG 3: C ≡ G ----------------- */}
          {/* Left Sugar 3 */}
          <polygon
            points="80,345 115,355 105,385 65,385 55,355"
            fill="#064e3b"
            stroke="#10b981"
            strokeWidth="1.5"
            opacity={activeAtomFilter === 'all' || activeAtomFilter === 'C' ? 1 : 0.3}
          />
          <text x="84" y="370" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontWeight="bold">
            Sugar 3
          </text>

          {showGlycosidic && (
            <line x1="115" y1="355" x2="160" y2="355" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="3 3" />
          )}

          {/* Cytosine Box */}
          <rect
            x="160"
            y="335"
            width="140"
            height="40"
            rx="8"
            fill="#0f172a"
            stroke="#38bdf8"
            strokeWidth="2"
            opacity={activeAtomFilter === 'all' || activeAtomFilter === 'N' ? 1 : 0.3}
          />
          <text x="230" y="360" textAnchor="middle" fill="#bae6fd" fontSize="12" fontWeight="bold">
            Cytosine (C)
          </text>

          {/* Hydrogen Bonds C≡G (3 Lines) */}
          {showHydrogen && (
            <g opacity={hBondOpacity}>
              <line x1="300" y1="345" x2="460" y2="345" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 4" />
              <line x1="300" y1="355" x2="460" y2="355" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 4" />
              <line x1="300" y1="365" x2="460" y2="365" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 4" />
              <text x="380" y="340" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">
                3 H-Bonds (ΔG ~ -21 kJ/mol)
              </text>
            </g>
          )}

          {/* Guanine Box */}
          <rect
            x="460"
            y="335"
            width="140"
            height="40"
            rx="8"
            fill="#1e1b4b"
            stroke="#6366f1"
            strokeWidth="2"
            opacity={activeAtomFilter === 'all' || activeAtomFilter === 'N' ? 1 : 0.3}
          />
          <text x="530" y="360" textAnchor="middle" fill="#c7d2fe" fontSize="12" fontWeight="bold">
            Guanine (G)
          </text>

          {showGlycosidic && (
            <line x1="600" y1="355" x2="645" y2="355" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="3 3" />
          )}

          {/* Right Sugar 3 */}
          <polygon
            points="680,345 715,355 705,385 665,385 645,355"
            fill="#451a03"
            stroke="#f59e0b"
            strokeWidth="1.5"
            opacity={activeAtomFilter === 'all' || activeAtomFilter === 'C' ? 1 : 0.3}
          />
          <text x="680" y="370" textAnchor="middle" fill="#fde68a" fontSize="10" fontWeight="bold">
            Sugar 3
          </text>

          {/* Bottom Labels: 3'-OH vs 5'-P */}
          <text x="84" y="420" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">
            3'-OH Terminus
          </text>
          <text x="680" y="420" textAnchor="middle" fill="#f472b6" fontSize="12" fontWeight="bold">
            5'-P Terminus
          </text>
        </svg>
      </div>

      {/* Thermodynamic Callout Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
        <div className="p-3 rounded-xl bg-pink-950/40 border border-pink-500/30 space-y-1">
          <span className="font-bold text-pink-300 block">1. Covalent Backbone</span>
          <p className="text-stone-300 text-[11px]">
            Phosphodiester bonds (~330 kJ/mol) hold sequence order longitudinally. Never disrupted by physiological heat.
          </p>
        </div>
        <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 space-y-1">
          <span className="font-bold text-blue-300 block">2. Hydrogen Base Pairs</span>
          <p className="text-stone-300 text-[11px]">
            Non-covalent (12–21 kJ/mol) transverse bonds. Reversible, allowing Helicase to unzip strands for replication.
          </p>
        </div>
        <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 space-y-1">
          <span className="font-bold text-purple-300 block">3. Pi-Pi Base Stacking</span>
          <p className="text-stone-300 text-[11px]">
            Hydrophobic aromatic orbital overlap (3.4 Å rise) provides majority of helical thermodynamic free energy.
          </p>
        </div>
      </div>
    </div>
  );
};
