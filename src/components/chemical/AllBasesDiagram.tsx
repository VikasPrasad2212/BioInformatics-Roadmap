import React, { useState } from 'react';
import {
  Sparkles,
  Info,
  CheckCircle2,
  Atom,
  Flame,
  Layers,
  ArrowRight,
  ShieldCheck,
  Activity,
  Zap
} from 'lucide-react';

export const AllBasesDiagram: React.FC = () => {
  const [selectedBase, setSelectedBase] = useState<'all' | 'A' | 'T' | 'G' | 'C' | 'U'>('all');
  const [activeFilter, setActiveFilter] = useState<'all' | 'purines' | 'pyrimidines'>('all');
  const [showTautomerism, setShowTautomerism] = useState<boolean>(false);

  const basesInfo = {
    A: {
      name: 'Adenine (A)',
      systematic: '6-Aminopurine',
      category: 'Purine (Bicyclic 9-atom ring)',
      formula: 'C₅H₅N₅',
      mw: '135.13 g/mol',
      foundIn: 'Both DNA & RNA',
      glycosidic: 'N9 (Nitrogen 9) → C1\' Sugar',
      pairing: 'Pairs with Thymine (DNA, 2 H-bonds) or Uracil (RNA, 2 H-bonds)',
      hBondDonor: 'C6-NH₂ (Exocyclic Amino)',
      hBondAcceptor: 'N1 (Ring Nitrogen)',
      color: 'emerald',
      bgColor: 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
    },
    T: {
      name: 'Thymine (T)',
      systematic: '5-Methyluracil / 2,4-Dioxo-5-methylpyrimidine',
      category: 'Pyrimidine (Monocyclic 6-atom ring)',
      formula: 'C₅H₆N₂O₂',
      mw: '126.11 g/mol',
      foundIn: 'DNA Only (replaces Uracil)',
      glycosidic: 'N1 (Nitrogen 1) → C1\' Sugar',
      pairing: 'Pairs with Adenine (2 H-bonds)',
      hBondDonor: 'N3-H (Ring Amide)',
      hBondAcceptor: 'C4=O (Carbonyl Oxygen)',
      specialGroup: '5-CH₃ (Methyl group in Major Groove)',
      color: 'amber',
      bgColor: 'bg-amber-950/40 border-amber-500/40 text-amber-200'
    },
    G: {
      name: 'Guanine (G)',
      systematic: '2-Amino-6-oxopurine',
      category: 'Purine (Bicyclic 9-atom ring)',
      formula: 'C₅H₅N₅O',
      mw: '151.13 g/mol',
      foundIn: 'Both DNA & RNA',
      glycosidic: 'N9 (Nitrogen 9) → C1\' Sugar',
      pairing: 'Pairs with Cytosine (3 H-bonds, High Stability)',
      hBondDonor: 'N1-H (Ring) and C2-NH₂ (Exocyclic Amino)',
      hBondAcceptor: 'C6=O (Carbonyl Oxygen)',
      color: 'indigo',
      bgColor: 'bg-indigo-950/40 border-indigo-500/40 text-indigo-200'
    },
    C: {
      name: 'Cytosine (C)',
      systematic: '4-Amino-2-oxopyrimidine',
      category: 'Pyrimidine (Monocyclic 6-atom ring)',
      formula: 'C₄H₅N₃O',
      mw: '111.10 g/mol',
      foundIn: 'Both DNA & RNA',
      glycosidic: 'N1 (Nitrogen 1) → C1\' Sugar',
      pairing: 'Pairs with Guanine (3 H-bonds)',
      hBondDonor: 'C4-NH₂ (Exocyclic Amino)',
      hBondAcceptor: 'N3 (Ring Nitrogen) and C2=O (Carbonyl Oxygen)',
      color: 'sky',
      bgColor: 'bg-sky-950/40 border-sky-500/40 text-sky-200'
    },
    U: {
      name: 'Uracil (U)',
      systematic: '2,4-Dioxopyrimidine (Demethylated Thymine)',
      category: 'Pyrimidine (Monocyclic 6-atom ring)',
      formula: 'C₄H₄N₂O₂',
      mw: '112.09 g/mol',
      foundIn: 'RNA Only (replaced by Thymine in DNA)',
      glycosidic: 'N1 (Nitrogen 1) → C1\' Sugar',
      pairing: 'Pairs with Adenine (2 H-bonds)',
      hBondDonor: 'N3-H (Ring Amide)',
      hBondAcceptor: 'C4=O and C2=O (Carbonyl Oxygens)',
      color: 'teal',
      bgColor: 'bg-teal-950/40 border-teal-500/40 text-teal-200'
    }
  };

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-stone-900 border border-stone-800 text-stone-100 space-y-6 shadow-xl">
      {/* Top Banner Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-500/40 text-blue-300 text-xs font-bold">
            <Atom className="w-3.5 h-3.5" />
            <span>Nitrogenous Base Chemical Gallery</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            All 5 Nitrogenous Bases (A, T, G, C, U) & Atomic Structures
          </h3>
          <p className="text-xs sm:text-sm text-stone-300">
            Purines (Adenine, Guanine) vs. Pyrimidines (Thymine, Cytosine, Uracil): atom numbering, hydrogen-bonding functional groups, and tautomeric forms.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 bg-stone-950 p-1.5 rounded-xl border border-stone-800 text-xs font-bold">
          <button
            onClick={() => { setSelectedBase('all'); setActiveFilter('all'); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedBase === 'all' && activeFilter === 'all'
                ? 'bg-blue-600 text-white shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Show All 5
          </button>
          <button
            onClick={() => { setSelectedBase('all'); setActiveFilter('purines'); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeFilter === 'purines'
                ? 'bg-purple-600 text-white shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Purines (A, G)
          </button>
          <button
            onClick={() => { setSelectedBase('all'); setActiveFilter('pyrimidines'); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeFilter === 'pyrimidines'
                ? 'bg-sky-600 text-white shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Pyrimidines (T, C, U)
          </button>
        </div>
      </div>

      {/* Individual Base Selector Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-stone-400 font-semibold mr-1">Select Single Base:</span>
        {(['A', 'T', 'G', 'C', 'U'] as const).map(b => (
          <button
            key={b}
            onClick={() => setSelectedBase(b)}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
              selectedBase === b
                ? 'bg-stone-100 text-stone-950 shadow-md scale-105'
                : 'bg-stone-950 border border-stone-800 text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            <span>{basesInfo[b].name}</span>
          </button>
        ))}
      </div>

      {/* GRID DISPLAY: All 5 Bases or Filtered Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
        {/* ========================================================================= */}
        {/* 1. ADENINE (A) */}
        {/* ========================================================================= */}
        {(selectedBase === 'all' || selectedBase === 'A') && (activeFilter === 'all' || activeFilter === 'purines') && (
          <div className="p-5 rounded-2xl bg-stone-950 border border-emerald-500/40 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-400">Purine (Double Ring)</span>
                  <h4 className="text-base font-bold text-white">Adenine (A)</h4>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  C₅H₅N₅
                </span>
              </div>

              {/* Vector Structure */}
              <div className="my-3 p-3 bg-stone-900 rounded-xl border border-stone-800 flex justify-center">
                <svg viewBox="0 0 240 180" className="w-full max-w-[210px] h-auto font-mono select-none">
                  {/* 6-Membered Pyrimidine Ring */}
                  <polygon points="90,40 140,40 165,80 140,120 90,120 65,80" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                  {/* 5-Membered Imidazole Ring */}
                  <polygon points="140,40 180,60 180,100 140,120" fill="#064e3b" stroke="#10b981" strokeWidth="2" />

                  {/* C6-NH2 (Exocyclic Donor) */}
                  <line x1="90" y1="40" x2="60" y2="15" stroke="#38bdf8" strokeWidth="2" />
                  <circle cx="50" cy="12" r="12" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="50" y="15" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">NH₂</text>
                  <text x="35" y="32" fill="#38bdf8" fontSize="7" fontWeight="bold">(C6 Donor)</text>

                  {/* N1 (Acceptor) */}
                  <circle cx="65" cy="80" r="10" fill="#dc2626" stroke="#f87171" strokeWidth="1.5" />
                  <text x="65" y="83" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">N1</text>
                  <text x="35" y="96" fill="#fca5a5" fontSize="7" fontWeight="bold">(Acceptor)</text>

                  {/* N9 (Glycosidic Anchor) */}
                  <circle cx="180" cy="100" r="11" fill="#7c3aed" stroke="#c084fc" strokeWidth="1.5" />
                  <text x="180" y="103" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">N9</text>
                  <line x1="180" y1="100" x2="215" y2="120" stroke="#c084fc" strokeWidth="2" strokeDasharray="2 2" />
                  <text x="200" y="138" textAnchor="middle" fill="#c084fc" fontSize="8" fontWeight="bold">→ Sugar C1'</text>

                  {/* Ring Name */}
                  <text x="120" y="85" textAnchor="middle" fill="#a7f3d0" fontSize="12" fontWeight="bold">Adenine</text>
                </svg>
              </div>

              <div className="space-y-1.5 text-xs text-stone-300">
                <p className="text-[11px] leading-relaxed">
                  <strong>Pairs with:</strong> Thymine (DNA) or Uracil (RNA) via <strong>2 Hydrogen Bonds</strong>.
                </p>
                <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-[10px] space-y-0.5">
                  <div>• <strong>H-Bond 1:</strong> N6-H (donor) ··· O4 of T/U</div>
                  <div>• <strong>H-Bond 2:</strong> N1 (acceptor) ··· H-N3 of T/U</div>
                </div>
              </div>
            </div>
            <div className="pt-2 text-[10px] text-stone-500 font-mono">Found in: DNA & RNA • MW: 135.13 g/mol</div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. THYMINE (T) */}
        {/* ========================================================================= */}
        {(selectedBase === 'all' || selectedBase === 'T') && (activeFilter === 'all' || activeFilter === 'pyrimidines') && (
          <div className="p-5 rounded-2xl bg-stone-950 border border-amber-500/40 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-amber-400">Pyrimidine (DNA Only)</span>
                  <h4 className="text-base font-bold text-white">Thymine (T)</h4>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                  C₅H₆N₂O₂
                </span>
              </div>

              {/* Vector Structure */}
              <div className="my-3 p-3 bg-stone-900 rounded-xl border border-stone-800 flex justify-center">
                <svg viewBox="0 0 240 180" className="w-full max-w-[210px] h-auto font-mono select-none">
                  {/* 6-Membered Pyrimidine Ring */}
                  <polygon points="120,40 165,65 165,115 120,140 75,115 75,65" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />

                  {/* C5-CH3 (Methyl Group signature) */}
                  <line x1="75" y1="65" x2="40" y2="45" stroke="#facc15" strokeWidth="2.5" />
                  <rect x="15" y="30" width="38" height="20" rx="4" fill="#713f12" stroke="#facc15" strokeWidth="1.5" />
                  <text x="34" y="44" textAnchor="middle" fill="#fef08a" fontSize="8" fontWeight="bold">5-CH₃</text>
                  <text x="35" y="20" textAnchor="middle" fill="#facc15" fontSize="7" fontWeight="bold">(DNA marker)</text>

                  {/* C4=O (Acceptor) */}
                  <line x1="120" y1="40" x2="120" y2="15" stroke="#ef4444" strokeWidth="2" />
                  <circle cx="120" cy="12" r="10" fill="#dc2626" stroke="#f87171" strokeWidth="1.5" />
                  <text x="120" y="15" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">O4</text>

                  {/* N3-H (Donor) */}
                  <circle cx="165" cy="65" r="11" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="165" y="68" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">N3-H</text>

                  {/* C2=O */}
                  <circle cx="165" cy="115" r="9" fill="#dc2626" />
                  <text x="165" y="118" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">O2</text>

                  {/* N1 (Glycosidic Anchor) */}
                  <circle cx="120" cy="140" r="11" fill="#7c3aed" stroke="#c084fc" strokeWidth="1.5" />
                  <text x="120" y="143" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">N1</text>
                  <line x1="120" y1="140" x2="120" y2="165" stroke="#c084fc" strokeWidth="2" strokeDasharray="2 2" />
                  <text x="160" y="165" textAnchor="middle" fill="#c084fc" fontSize="8" fontWeight="bold">→ Sugar C1'</text>

                  {/* Center Name */}
                  <text x="120" y="95" textAnchor="middle" fill="#fde68a" fontSize="12" fontWeight="bold">Thymine</text>
                </svg>
              </div>

              <div className="space-y-1.5 text-xs text-stone-300">
                <p className="text-[11px] leading-relaxed">
                  <strong>Pairs with:</strong> Adenine via <strong>2 Hydrogen Bonds</strong>. Has a unique <strong>5-methyl group</strong>.
                </p>
                <div className="p-2 rounded-lg bg-amber-950/40 border border-amber-800/60 text-[10px] space-y-0.5">
                  <div>• <strong>5-CH₃ group:</strong> Projects into Major Groove for DNA-binding proteins</div>
                  <div>• <strong>Prevents mutation:</strong> Distinguishes natural base from deaminated Cytosine</div>
                </div>
              </div>
            </div>
            <div className="pt-2 text-[10px] text-stone-500 font-mono">Found in: DNA Only • MW: 126.11 g/mol</div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. GUANINE (G) */}
        {/* ========================================================================= */}
        {(selectedBase === 'all' || selectedBase === 'G') && (activeFilter === 'all' || activeFilter === 'purines') && (
          <div className="p-5 rounded-2xl bg-stone-950 border border-indigo-500/40 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-indigo-400">Purine (Double Ring)</span>
                  <h4 className="text-base font-bold text-white">Guanine (G)</h4>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                  C₅H₅N₅O
                </span>
              </div>

              {/* Vector Structure */}
              <div className="my-3 p-3 bg-stone-900 rounded-xl border border-stone-800 flex justify-center">
                <svg viewBox="0 0 240 180" className="w-full max-w-[210px] h-auto font-mono select-none">
                  <polygon points="90,40 140,40 165,80 140,120 90,120 65,80" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                  <polygon points="140,40 180,60 180,100 140,120" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />

                  {/* C6=O (Acceptor 1) */}
                  <circle cx="90" cy="20" r="10" fill="#dc2626" stroke="#f87171" strokeWidth="1.5" />
                  <text x="90" y="23" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">O6</text>

                  {/* N1-H (Donor 1) */}
                  <circle cx="65" cy="80" r="10" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="65" y="83" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">N1-H</text>

                  {/* C2-NH2 (Donor 2) */}
                  <circle cx="90" cy="140" r="11" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="90" y="143" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">N2-H₂</text>

                  {/* N9 (Glycosidic Anchor) */}
                  <circle cx="180" cy="100" r="11" fill="#7c3aed" stroke="#c084fc" strokeWidth="1.5" />
                  <text x="180" y="103" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">N9</text>
                  <line x1="180" y1="100" x2="215" y2="120" stroke="#c084fc" strokeWidth="2" strokeDasharray="2 2" />
                  <text x="200" y="138" textAnchor="middle" fill="#c084fc" fontSize="8" fontWeight="bold">→ Sugar C1'</text>

                  <text x="120" y="85" textAnchor="middle" fill="#c7d2fe" fontSize="12" fontWeight="bold">Guanine</text>
                </svg>
              </div>

              <div className="space-y-1.5 text-xs text-stone-300">
                <p className="text-[11px] leading-relaxed">
                  <strong>Pairs with:</strong> Cytosine via <strong>3 Strong Hydrogen Bonds</strong>.
                </p>
                <div className="p-2 rounded-lg bg-indigo-950/40 border border-indigo-800/60 text-[10px] space-y-0.5">
                  <div>• <strong>O6 (Acceptor):</strong> pairs with Cytosine N4-H</div>
                  <div>• <strong>N1-H (Donor):</strong> pairs with Cytosine N3</div>
                  <div>• <strong>N2-H₂ (Donor):</strong> pairs with Cytosine O2</div>
                </div>
              </div>
            </div>
            <div className="pt-2 text-[10px] text-stone-500 font-mono">Found in: DNA & RNA • MW: 151.13 g/mol</div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. CYTOSINE (C) */}
        {/* ========================================================================= */}
        {(selectedBase === 'all' || selectedBase === 'C') && (activeFilter === 'all' || activeFilter === 'pyrimidines') && (
          <div className="p-5 rounded-2xl bg-stone-950 border border-sky-500/40 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-sky-400">Pyrimidine (Single Ring)</span>
                  <h4 className="text-base font-bold text-white">Cytosine (C)</h4>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                  C₄H₅N₃O
                </span>
              </div>

              {/* Vector Structure */}
              <div className="my-3 p-3 bg-stone-900 rounded-xl border border-stone-800 flex justify-center">
                <svg viewBox="0 0 240 180" className="w-full max-w-[210px] h-auto font-mono select-none">
                  <polygon points="120,40 165,65 165,115 120,140 75,115 75,65" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />

                  {/* C4-NH2 (Donor 1) */}
                  <circle cx="120" cy="15" r="11" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="120" y="18" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">N4-H₂</text>

                  {/* N3 (Acceptor 1) */}
                  <circle cx="165" cy="65" r="10" fill="#dc2626" stroke="#f87171" strokeWidth="1.5" />
                  <text x="165" y="68" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">N3</text>

                  {/* C2=O (Acceptor 2) */}
                  <circle cx="165" cy="115" r="10" fill="#dc2626" stroke="#f87171" strokeWidth="1.5" />
                  <text x="165" y="118" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">O2</text>

                  {/* N1 (Glycosidic Anchor) */}
                  <circle cx="120" cy="140" r="11" fill="#7c3aed" stroke="#c084fc" strokeWidth="1.5" />
                  <text x="120" y="143" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">N1</text>
                  <line x1="120" y1="140" x2="120" y2="165" stroke="#c084fc" strokeWidth="2" strokeDasharray="2 2" />
                  <text x="160" y="165" textAnchor="middle" fill="#c084fc" fontSize="8" fontWeight="bold">→ Sugar C1'</text>

                  <text x="120" y="95" textAnchor="middle" fill="#bae6fd" fontSize="12" fontWeight="bold">Cytosine</text>
                </svg>
              </div>

              <div className="space-y-1.5 text-xs text-stone-300">
                <p className="text-[11px] leading-relaxed">
                  <strong>Pairs with:</strong> Guanine via <strong>3 Hydrogen Bonds</strong>.
                </p>
                <div className="p-2 rounded-lg bg-sky-950/40 border border-sky-800/60 text-[10px] space-y-0.5">
                  <div>• <strong>Methylation Target:</strong> 5-methylcytosine in CpG epigenetic silencing</div>
                  <div>• <strong>Deamination:</strong> Spontaneously deaminates to Uracil (~100/day/cell)</div>
                </div>
              </div>
            </div>
            <div className="pt-2 text-[10px] text-stone-500 font-mono">Found in: DNA & RNA • MW: 111.10 g/mol</div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 5. URACIL (U) */}
        {/* ========================================================================= */}
        {(selectedBase === 'all' || selectedBase === 'U') && (activeFilter === 'all' || activeFilter === 'pyrimidines') && (
          <div className="p-5 rounded-2xl bg-stone-950 border border-teal-500/40 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-teal-400">Pyrimidine (RNA Only)</span>
                  <h4 className="text-base font-bold text-white">Uracil (U)</h4>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800">
                  C₄H₄N₂O₂
                </span>
              </div>

              {/* Vector Structure */}
              <div className="my-3 p-3 bg-stone-900 rounded-xl border border-stone-800 flex justify-center">
                <svg viewBox="0 0 240 180" className="w-full max-w-[210px] h-auto font-mono select-none">
                  <polygon points="120,40 165,65 165,115 120,140 75,115 75,65" fill="#042f2e" stroke="#14b8a6" strokeWidth="2" />

                  {/* C5-H (NO Methyl group!) */}
                  <line x1="75" y1="65" x2="45" y2="50" stroke="#14b8a6" strokeWidth="1.5" />
                  <circle cx="45" cy="50" r="8" fill="#134e4a" stroke="#2dd4bf" strokeWidth="1" />
                  <text x="45" y="53" textAnchor="middle" fill="#ccfbf1" fontSize="7" fontWeight="bold">-H</text>
                  <text x="35" y="32" textAnchor="middle" fill="#2dd4bf" fontSize="7">(No -CH₃)</text>

                  {/* C4=O (Acceptor) */}
                  <circle cx="120" cy="15" r="10" fill="#dc2626" stroke="#f87171" strokeWidth="1.5" />
                  <text x="120" y="18" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">O4</text>

                  {/* N3-H (Donor) */}
                  <circle cx="165" cy="65" r="11" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="165" y="68" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">N3-H</text>

                  {/* C2=O (Acceptor) */}
                  <circle cx="165" cy="115" r="10" fill="#dc2626" stroke="#f87171" strokeWidth="1.5" />
                  <text x="165" y="118" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">O2</text>

                  {/* N1 (Glycosidic Anchor) */}
                  <circle cx="120" cy="140" r="11" fill="#7c3aed" stroke="#c084fc" strokeWidth="1.5" />
                  <text x="120" y="143" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">N1</text>
                  <line x1="120" y1="140" x2="120" y2="165" stroke="#c084fc" strokeWidth="2" strokeDasharray="2 2" />
                  <text x="160" y="165" textAnchor="middle" fill="#c084fc" fontSize="8" fontWeight="bold">→ Sugar C1'</text>

                  <text x="120" y="95" textAnchor="middle" fill="#99f6e4" fontSize="12" fontWeight="bold">Uracil</text>
                </svg>
              </div>

              <div className="space-y-1.5 text-xs text-stone-300">
                <p className="text-[11px] leading-relaxed">
                  <strong>Pairs with:</strong> Adenine in RNA via <strong>2 Hydrogen Bonds</strong>.
                </p>
                <div className="p-2 rounded-lg bg-teal-950/40 border border-teal-800/60 text-[10px] space-y-0.5">
                  <div>• <strong>Energetic Savings:</strong> Lacks C5-CH₃, saving metabolic ATP during transcription</div>
                  <div>• <strong>Wobble Pairing:</strong> In tRNA anticodons, Uracil can wobble pair with Guanine (G•U pair)</div>
                </div>
              </div>
            </div>
            <div className="pt-2 text-[10px] text-stone-500 font-mono">Found in: RNA Only • MW: 112.09 g/mol</div>
          </div>
        )}
      </div>

      {/* Tautomerism & Transition Mutations Educational Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-2.5">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-purple-400">Chemical Dynamics</span>
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-purple-400" /> Tautomeric Shifts: How Keto-Enol & Amino-Imino Cause Spontaneous Mutations
            </h4>
          </div>
          <button
            onClick={() => setShowTautomerism(!showTautomerism)}
            className="px-3 py-1 rounded-lg bg-purple-950 hover:bg-purple-900 border border-purple-800 text-purple-300 text-xs font-bold"
          >
            {showTautomerism ? 'Hide Tautomerism Details' : 'Show Tautomerism Details'}
          </button>
        </div>

        {showTautomerism && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs animate-fade-in pt-1">
            <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/50 space-y-1.5">
              <strong className="text-purple-300 block">1. Amino ⇄ Imino Shift (Adenine & Cytosine)</strong>
              <p className="text-stone-300 text-[11px] leading-relaxed">
                Adenine normally exists in the <strong>amino (-NH₂)</strong> form and pairs with Thymine. If it transiently shifts to the rare <strong>imino (=NH)</strong> tautomer (1 in 10,000 bases), its H-bond donor/acceptor pattern inverts, causing DNA Polymerase to erroneously incorporate <strong>Cytosine</strong> (causing an A:T → G:C transition mutation).
              </p>
            </div>

            <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/50 space-y-1.5">
              <strong className="text-purple-300 block">2. Keto ⇄ Enol Shift (Guanine & Thymine)</strong>
              <p className="text-stone-300 text-[11px] leading-relaxed">
                Guanine and Thymine normally exist in the <strong>keto (C=O)</strong> state. The rare <strong>enol (C—OH)</strong> tautomer allows Guanine to pair with Thymine, and Thymine to pair with Guanine. Proofreading 3'→5' exonucleases detect and excise these mispairings.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
