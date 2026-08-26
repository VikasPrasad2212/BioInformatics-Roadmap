import React, { useState } from 'react';
import {
  Zap,
  Info,
  Flame,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Activity,
  Layers,
  RotateCcw
} from 'lucide-react';

export const TriphosphateDiagram: React.FC = () => {
  const [selectedPhosphate, setSelectedPhosphate] = useState<'alpha' | 'beta' | 'gamma' | 'all'>('all');
  const [showMgCoordination, setShowMgCoordination] = useState<boolean>(true);
  const [isCleaved, setIsCleaved] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'structure' | 'energy' | 'polymerization'>('structure');

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-stone-900 border border-stone-800 text-stone-100 space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950 border border-pink-500/40 text-pink-300 text-xs font-bold">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>High-Energy Precursor & Polymerization Engine</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Nucleoside Triphosphate (dNTP / NTP) & Phosphoanhydride Chemistry
          </h3>
          <p className="text-xs sm:text-sm text-stone-300">
            Atomic anatomy of the Alpha (α), Beta (β), and Gamma (γ) phosphates, high-energy phosphoanhydrides, Mg²⁺ coordination, and irreversible pyrophosphate hydrolysis.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 bg-stone-950 p-1.5 rounded-xl border border-stone-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('structure')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'structure'
                ? 'bg-pink-600 text-white shadow-md'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            🔬 Triphosphate Anatomy
          </button>
          <button
            onClick={() => setActiveTab('polymerization')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'polymerization'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            ⚡ Cleavage & PPi Release
          </button>
          <button
            onClick={() => setActiveTab('energy')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'energy'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            📊 Free Energy (ΔG)
          </button>
        </div>
      </div>

      {/* Main Interactive SVG Canvas */}
      <div className="space-y-4">
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-stone-400 font-semibold">Inspect Phosphate:</span>
            {[
              { id: 'all', label: 'All (α-β-γ)' },
              { id: 'alpha', label: 'Alpha (α) - Ester' },
              { id: 'beta', label: 'Beta (β) - Anhydride' },
              { id: 'gamma', label: 'Gamma (γ) - Terminal' }
            ].map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPhosphate(p.id as any)}
                className={`px-2.5 py-1 rounded-lg border font-bold text-[11px] transition-all ${
                  selectedPhosphate === p.id
                    ? 'bg-pink-950 text-pink-300 border-pink-500/60 shadow'
                    : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMgCoordination(!showMgCoordination)}
              className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                showMgCoordination
                  ? 'bg-emerald-950 border-emerald-500/50 text-emerald-300'
                  : 'bg-stone-950 border-stone-800 text-stone-500'
              }`}
            >
              {showMgCoordination ? '🟢 Mg²⁺ Ion Active' : '⚪ Mg²⁺ Ion Hidden'}
            </button>

            <button
              onClick={() => setIsCleaved(!isCleaved)}
              className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                isCleaved
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-950/40'
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700'
              }`}
            >
              {isCleaved ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5" /> Reset to Intact dNTP
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> Trigger Polymerization Attack (Cleave PPi)
                </>
              )}
            </button>
          </div>
        </div>

        {/* Large SVG Vector Display */}
        <div className="p-4 sm:p-6 bg-stone-950 rounded-2xl border border-stone-800/90 overflow-x-auto">
          <svg viewBox="0 0 760 320" className="w-full min-w-[700px] h-auto font-mono select-none">
            {/* Background Grid Lines */}
            <line x1="50" y1="280" x2="710" y2="280" stroke="#27272a" strokeWidth="1" strokeDasharray="4 4" />

            {/* BASE (Adenine / Guanine / etc.) */}
            <g transform="translate(40, 60)">
              <rect x="0" y="0" width="110" height="90" rx="12" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
              <text x="55" y="45" textAnchor="middle" fill="#c7d2fe" fontSize="13" fontWeight="bold">
                Nitrogenous
              </text>
              <text x="55" y="65" textAnchor="middle" fill="#a5b4fc" fontSize="12" fontWeight="bold">
                Base (A/T/G/C)
              </text>
              <text x="55" y="22" textAnchor="middle" fill="#818cf8" fontSize="9">
                Purine / Pyrimidine
              </text>
            </g>

            {/* Glycosidic Bond */}
            <line x1="150" y1="105" x2="185" y2="120" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="3 3" />
            <text x="168" y="100" textAnchor="middle" fill="#c084fc" fontSize="8" fontWeight="bold">
              β-N-Glycosidic
            </text>

            {/* SUGAR (Deoxyribose / Ribose) */}
            <g transform="translate(180, 80)">
              <polygon points="40,20 85,55 70,110 15,110 0,55" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" />
              <circle cx="40" cy="20" r="8" fill="#ef4444" />
              <text x="40" y="24" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">O</text>
              <text x="42" y="70" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">Sugar</text>
              <text x="42" y="85" textAnchor="middle" fill="#6ee7b7" fontSize="8">Pentose</text>

              {/* 3'-OH */}
              <circle cx="15" cy="110" r="9" fill="#047857" stroke="#34d399" strokeWidth="1.5" />
              <text x="15" y="113" textAnchor="middle" fill="#d1fae5" fontSize="7" fontWeight="bold">3'-OH</text>

              {/* 5'-CH2 Arm */}
              <line x1="0" y1="55" x2="-25" y2="25" stroke="#ec4899" strokeWidth="2.5" />
              <circle cx="-25" cy="25" r="9" fill="#831843" stroke="#f472b6" strokeWidth="1.5" />
              <text x="-25" y="28" textAnchor="middle" fill="#fbcfe8" fontSize="8" fontWeight="bold">5'C</text>
            </g>

            {/* 5'-Phosphoester Bond Linkage */}
            <line x1="155" y1="105" x2="310" y2="105" stroke="#ec4899" strokeWidth="3" />
            <text x="235" y="95" textAnchor="middle" fill="#f472b6" fontSize="9" fontWeight="bold">
              5'-Phosphoester Bond (C5'—O—P)
            </text>

            {/* ============================================================ */}
            {/* ALPHA PHOSPHATE (α) */}
            {/* ============================================================ */}
            <g
              transform="translate(310, 50)"
              opacity={selectedPhosphate === 'all' || selectedPhosphate === 'alpha' ? 1 : 0.3}
            >
              {/* Highlight Box for Alpha */}
              <rect x="-10" y="0" width="80" height="110" rx="10" fill="#831843" fillOpacity="0.2" stroke="#f472b6" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="30" y="20" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="bold">
                Alpha (α)
              </text>

              {/* Central Phosphorus */}
              <circle cx="30" cy="55" r="16" fill="#f43f5e" stroke="#fda4af" strokeWidth="2" />
              <text x="30" y="60" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Pα</text>

              {/* Top P=O */}
              <line x1="30" y1="39" x2="30" y2="15" stroke="#ef4444" strokeWidth="2" />
              <circle cx="30" cy="15" r="8" fill="#dc2626" />
              <text x="30" y="18" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">O</text>

              {/* Bottom P-O⁻ */}
              <line x1="30" y1="71" x2="30" y2="95" stroke="#ef4444" strokeWidth="2" />
              <circle cx="30" cy="95" r="9" fill="#991b1b" />
              <text x="30" y="98" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">O⁻</text>
            </g>

            {/* ALPHA-BETA PHOSPHOANHYDRIDE BOND */}
            <g opacity={isCleaved ? 0.3 : 1}>
              <line x1="370" y1="105" x2="430" y2="105" stroke={isCleaved ? '#71717a' : '#f59e0b'} strokeWidth="3.5" />
              {/* Bridging Oxygen */}
              <circle cx="400" cy="105" r="11" fill="#ef4444" stroke="#f87171" strokeWidth="1.5" />
              <text x="400" y="109" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">O</text>
              <text x="400" y="85" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold">
                Phosphoanhydride 1
              </text>
              <text x="400" y="130" textAnchor="middle" fill="#fde68a" fontSize="8">
                ΔG°' ≈ -30.5 kJ/mol
              </text>
            </g>

            {/* CLEAVAGE SITE VISUAL INDICATOR */}
            {isCleaved ? (
              <g transform="translate(390, 80)">
                <line x1="0" y1="0" x2="20" y2="50" stroke="#f43f5e" strokeWidth="3" strokeDasharray="4 4" />
                <rect x="25" y="10" width="95" height="30" rx="6" fill="#881337" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="72" y="28" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                  CLEAVED! (PPi Released)
                </text>
              </g>
            ) : (
              <g transform="translate(385, 45)">
                <polygon points="15,0 25,12 5,12" fill="#ef4444" />
                <text x="15" y="-5" textAnchor="middle" fill="#f87171" fontSize="8" fontWeight="bold">
                  3'-OH Attack Point
                </text>
              </g>
            )}

            {/* ============================================================ */}
            {/* BETA PHOSPHATE (β) */}
            {/* ============================================================ */}
            <g
              transform={`translate(${isCleaved ? 480 : 430}, 50)`}
              opacity={selectedPhosphate === 'all' || selectedPhosphate === 'beta' ? 1 : 0.3}
              className="transition-transform duration-500"
            >
              <rect x="-10" y="0" width="80" height="110" rx="10" fill="#ca8a04" fillOpacity="0.2" stroke="#eab308" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="30" y="20" textAnchor="middle" fill="#facc15" fontSize="11" fontWeight="bold">
                Beta (β)
              </text>

              <circle cx="30" cy="55" r="16" fill="#eab308" stroke="#fef08a" strokeWidth="2" />
              <text x="30" y="60" textAnchor="middle" fill="#713f12" fontSize="12" fontWeight="bold">Pβ</text>

              {/* Top P=O */}
              <line x1="30" y1="39" x2="30" y2="15" stroke="#ef4444" strokeWidth="2" />
              <circle cx="30" cy="15" r="8" fill="#dc2626" />
              <text x="30" y="18" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">O</text>

              {/* Bottom P-O⁻ */}
              <line x1="30" y1="71" x2="30" y2="95" stroke="#ef4444" strokeWidth="2" />
              <circle cx="30" cy="95" r="9" fill="#991b1b" />
              <text x="30" y="98" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">O⁻</text>
            </g>

            {/* BETA-GAMMA PHOSPHOANHYDRIDE BOND */}
            <g
              transform={`translate(${isCleaved ? 50 : 0}, 0)`}
              className="transition-transform duration-500"
            >
              <line x1="490" y1="105" x2="550" y2="105" stroke="#38bdf8" strokeWidth="3.5" />
              {/* Bridging Oxygen */}
              <circle cx="520" cy="105" r="11" fill="#ef4444" stroke="#f87171" strokeWidth="1.5" />
              <text x="520" y="109" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">O</text>
              <text x="520" y="85" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="bold">
                Phosphoanhydride 2
              </text>
              <text x="520" y="130" textAnchor="middle" fill="#7dd3fc" fontSize="8">
                ΔG°' ≈ -30.5 kJ/mol
              </text>
            </g>

            {/* ============================================================ */}
            {/* GAMMA PHOSPHATE (γ) */}
            {/* ============================================================ */}
            <g
              transform={`translate(${isCleaved ? 600 : 550}, 50)`}
              opacity={selectedPhosphate === 'all' || selectedPhosphate === 'gamma' ? 1 : 0.3}
              className="transition-transform duration-500"
            >
              <rect x="-10" y="0" width="85" height="110" rx="10" fill="#0369a1" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="32" y="20" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontWeight="bold">
                Gamma (γ)
              </text>

              <circle cx="32" cy="55" r="16" fill="#0284c7" stroke="#bae6fd" strokeWidth="2" />
              <text x="32" y="60" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Pγ</text>

              {/* Top P=O */}
              <line x1="32" y1="39" x2="32" y2="15" stroke="#ef4444" strokeWidth="2" />
              <circle cx="32" cy="15" r="8" fill="#dc2626" />
              <text x="32" y="18" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">O</text>

              {/* Bottom P-O⁻ */}
              <line x1="32" y1="71" x2="32" y2="95" stroke="#ef4444" strokeWidth="2" />
              <circle cx="32" cy="95" r="9" fill="#991b1b" />
              <text x="32" y="98" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">O⁻</text>

              {/* Terminal P-O⁻ (Right) */}
              <line x1="48" y1="55" x2="68" y2="55" stroke="#ef4444" strokeWidth="2" />
              <circle cx="68" cy="55" r="9" fill="#991b1b" />
              <text x="68" y="58" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">O⁻</text>
            </g>

            {/* ============================================================ */}
            {/* MAGNESIUM (Mg²⁺) CO-FACTOR COORDINATION */}
            {/* ============================================================ */}
            {showMgCoordination && !isCleaved && (
              <g transform="translate(430, 200)">
                <rect x="-15" y="-10" width="170" height="60" rx="12" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="70" cy="20" r="18" fill="#047857" stroke="#34d399" strokeWidth="2.5" />
                <text x="70" y="24" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                  Mg²⁺
                </text>
                <text x="70" y="42" textAnchor="middle" fill="#a7f3d0" fontSize="8">
                  Divalent Cofactor
                </text>

                {/* Coordination coordinate bonds (Dotted lines) */}
                <line x1="55" y1="5" x2="-90" y2="-55" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="70" y1="5" x2="30" y2="-55" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="85" y1="5" x2="152" y2="-55" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3 3" />
              </g>
            )}

            {/* Bottom Summary Labels */}
            <text x="210" y="305" textAnchor="middle" fill="#a1a1aa" fontSize="10">
              [Nucleoside Monophosphate = Base + Sugar + Pα]
            </text>
            <text x="560" y="305" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">
              [Pyrophosphate Group (PPi) = Pβ + Pγ]
            </text>
          </svg>
        </div>
      </div>

      {/* Explanatory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* Card 1 */}
        <div className="p-4 rounded-2xl bg-stone-950 border border-pink-500/30 space-y-2">
          <span className="font-extrabold text-pink-300 uppercase text-[10px] block">
            1. Ester vs Anhydride Distinction
          </span>
          <h4 className="text-sm font-bold text-white">5'-Phosphoester vs. Phosphoanhydrides</h4>
          <p className="text-stone-300 leading-relaxed text-[11px]">
            The bond linking C5' of the sugar to the α-phosphate is a standard <strong>phosphoester bond</strong> (low energy, ~14 kJ/mol). In contrast, the α—β and β—γ linkages are <strong>phosphoanhydrides</strong> formed between two acid groups (high energy, ~30.5 kJ/mol).
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-4 rounded-2xl bg-stone-950 border border-emerald-500/30 space-y-2">
          <span className="font-extrabold text-emerald-300 uppercase text-[10px] block">
            2. The Critical Role of Mg²⁺
          </span>
          <h4 className="text-sm font-bold text-white">Neutralizing Negative Repulsion</h4>
          <p className="text-stone-300 leading-relaxed text-[11px]">
            At pH 7.4, the triphosphate carries a total charge of <strong>-4</strong>. The divalent cation <strong>Mg²⁺</strong> coordinates the non-bridging oxygens of α, β, and γ phosphates, neutralizing electrostatics and perfectly positioning the α-phosphorus for attack.
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-4 rounded-2xl bg-stone-950 border border-amber-500/30 space-y-2">
          <span className="font-extrabold text-amber-300 uppercase text-[10px] block">
            3. Irreversible Polymerization Drive
          </span>
          <h4 className="text-sm font-bold text-white">Pyrophosphatase Hydrolysis (PPi → 2 Pi)</h4>
          <p className="text-stone-300 leading-relaxed text-[11px]">
            When DNA Polymerase attacks Pα, it liberates <strong>Pyrophosphate (PPi)</strong>. The cellular enzyme <strong>Inorganic Pyrophosphatase</strong> instantly hydrolyzes PPi into 2 Pi (ΔG ≈ -19 kJ/mol), shifting chemical equilibrium irreversibly forward (net ΔG ≈ -50 kJ/mol)!
          </p>
        </div>
      </div>
    </div>
  );
};
