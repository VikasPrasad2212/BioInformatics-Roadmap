import React, { useState } from 'react';
import {
  Link2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Zap,
  Layers,
  FlaskConical,
  RotateCcw,
  Activity,
  Plus
} from 'lucide-react';

export const NucleotideAssemblyDiagram: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedBaseType, setSelectedBaseType] = useState<'purine' | 'pyrimidine'>('purine');

  const steps = [
    {
      step: 1,
      title: '1. Three Unconnected Precursors',
      subtitle: 'Deoxyribose Sugar + Free Nitrogenous Base + Inorganic Phosphate Pool',
      desc: 'Nucleotides are built from three distinct chemical units: (1) A pentose sugar (2-deoxy-D-ribose), (2) A planar heterocyclic nitrogenous base (Purine A/G or Pyrimidine T/C/U), and (3) Inorganic phosphate ions (PO₄³⁻).',
      bondFormed: 'None yet (3 independent chemical species)',
      byproduct: 'None',
      deltaG: '0 kJ/mol'
    },
    {
      step: 2,
      title: '2. Connection 1: Base + Sugar → Nucleoside',
      subtitle: 'Formation of the β-N-Glycosidic Bond at C1\'',
      desc: 'The C1\' anomeric carbon of the sugar condenses with N9 of a Purine (or N1 of a Pyrimidine). A water molecule (H₂O) is eliminated, forming a stable covalent β-N-Glycosidic bond. The resulting unit is a Nucleoside (e.g., Deoxyadenosine).',
      bondFormed: 'β-N-Glycosidic Bond (C1\'—N9 / C1\'—N1)',
      byproduct: 'H₂O (Water condensation product)',
      deltaG: '~350 kJ/mol covalent bond energy'
    },
    {
      step: 3,
      title: '3. Connection 2: Nucleoside + Phosphates → Nucleotide (dNTP)',
      subtitle: 'Formation of 5\'-Phosphoester & High-Energy Phosphoanhydrides',
      desc: 'The C5\'-OH of the nucleoside condenses with an α-phosphate, forming a covalent 5\'-Phosphoester bond (releasing H₂O). Cellular kinases subsequently attach β and γ phosphates via high-energy phosphoanhydride bonds to create a complete dNTP substrate.',
      bondFormed: '5\'-Phosphoester Bond (C5\'—O—Pα) + α-β & β-γ Phosphoanhydrides',
      byproduct: 'H₂O + High-energy activation',
      deltaG: '-30.5 kJ/mol per phosphoanhydride bond'
    },
    {
      step: 4,
      title: '4. Connection 3: Nucleotide + Growing Chain → 3\'-5\' Phosphodiester Backbone',
      subtitle: 'Polymerization by DNA Polymerase & Pyrophosphate Release',
      desc: 'The 3\'-OH of the primer strand mounts an in-line nucleophilic attack on the incoming dNTP α-phosphate. The α-β phosphoanhydride bond breaks, releasing Pyrophosphate (PPi) and creating a continuous 3\'-5\' Phosphodiester Bridge.',
      bondFormed: '3\'-5\' Phosphodiester Bond (C3\'—O—P(=O)(O⁻)—O—C5\')',
      byproduct: 'Pyrophosphate (PPi) → hydrolyzed to 2 Pi by Pyrophosphatase',
      deltaG: 'Total ΔG ≈ -50 kJ/mol (Irreversible)'
    }
  ];

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-stone-900 border border-stone-800 text-stone-100 space-y-6 shadow-xl">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950 border border-amber-500/40 text-amber-300 text-xs font-bold">
            <Link2 className="w-3.5 h-3.5" />
            <span>Step-by-Step Chemical Bonding Architecture</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            How Sugar, Phosphate, and Base Connect to Each Other
          </h3>
          <p className="text-xs sm:text-sm text-stone-300">
            Interactive step-by-step synthesis: from independent building blocks → β-N-Glycosidic bond → 5'-Phosphoester linkage → 3'-5' Phosphodiester chain elongation.
          </p>
        </div>

        {/* Base Type Toggle */}
        <div className="flex items-center gap-2 bg-stone-950 p-1.5 rounded-xl border border-stone-800 text-xs font-bold">
          <span className="text-stone-400 text-[11px] px-1">Base Type:</span>
          <button
            onClick={() => setSelectedBaseType('purine')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedBaseType === 'purine'
                ? 'bg-purple-600 text-white shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Purine (N9 Link)
          </button>
          <button
            onClick={() => setSelectedBaseType('pyrimidine')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedBaseType === 'pyrimidine'
                ? 'bg-sky-600 text-white shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Pyrimidine (N1 Link)
          </button>
        </div>
      </div>

      {/* Interactive Step Navigator */}
      <div className="space-y-4">
        {/* Step Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {steps.map(s => (
            <button
              key={s.step}
              onClick={() => setCurrentStep(s.step)}
              className={`p-3 rounded-2xl text-left border transition-all ${
                currentStep === s.step
                  ? 'bg-amber-950/60 border-amber-500/80 text-amber-200 shadow-lg scale-[1.02]'
                  : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-amber-400">Step {s.step}</span>
                {currentStep > s.step && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
              <div className="text-xs font-bold text-white mt-1 truncate">
                {s.title.replace(/^\d+\.\s*/, '')}
              </div>
            </button>
          ))}
        </div>

        {/* Dynamic Vector SVG Stage */}
        <div className="p-4 sm:p-6 bg-stone-950 rounded-2xl border border-stone-800/90 overflow-x-auto">
          <svg viewBox="0 0 760 300" className="w-full min-w-[700px] h-auto font-mono select-none">
            {/* STAGE 1: THREE SEPARATE MOLECULES */}
            {currentStep === 1 && (
              <g>
                {/* 1. Free Base */}
                <g transform="translate(60, 80)">
                  <rect x="0" y="0" width="130" height="90" rx="12" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                  <text x="65" y="45" textAnchor="middle" fill="#c7d2fe" fontSize="13" fontWeight="bold">
                    {selectedBaseType === 'purine' ? 'Adenine (Purine)' : 'Thymine (Pyrimidine)'}
                  </text>
                  <text x="65" y="65" textAnchor="middle" fill="#818cf8" fontSize="10">
                    {selectedBaseType === 'purine' ? 'Has N9-H group' : 'Has N1-H group'}
                  </text>
                  <circle cx="130" cy="45" r="10" fill="#dc2626" stroke="#f87171" strokeWidth="1.5" />
                  <text x="130" y="49" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
                    {selectedBaseType === 'purine' ? 'N9' : 'N1'}
                  </text>
                </g>

                {/* Plus Sign 1 */}
                <g transform="translate(225, 120)">
                  <circle cx="0" cy="0" r="14" fill="#27272a" stroke="#52525b" strokeWidth="1.5" />
                  <text x="0" y="5" textAnchor="middle" fill="#fbbf24" fontSize="16" fontWeight="bold">+</text>
                </g>

                {/* 2. Free Sugar */}
                <g transform="translate(280, 75)">
                  <polygon points="50,15 100,50 85,105 20,105 5,50" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" />
                  <circle cx="50" cy="15" r="8" fill="#ef4444" />
                  <text x="50" y="19" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">O</text>
                  <text x="52" y="65" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">2-Deoxyribose</text>

                  {/* C1'-OH */}
                  <circle cx="100" cy="50" r="11" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="100" y="53" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">C1'-OH</text>

                  {/* C3'-OH */}
                  <circle cx="20" cy="105" r="9" fill="#047857" stroke="#34d399" strokeWidth="1.5" />
                  <text x="20" y="108" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">3'-OH</text>

                  {/* C5'-OH */}
                  <circle cx="5" cy="50" r="10" fill="#ec4899" stroke="#f472b6" strokeWidth="1.5" />
                  <text x="5" y="53" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">5'-OH</text>
                </g>

                {/* Plus Sign 2 */}
                <g transform="translate(435, 120)">
                  <circle cx="0" cy="0" r="14" fill="#27272a" stroke="#52525b" strokeWidth="1.5" />
                  <text x="0" y="5" textAnchor="middle" fill="#fbbf24" fontSize="16" fontWeight="bold">+</text>
                </g>

                {/* 3. Free Triphosphate Group */}
                <g transform="translate(480, 80)">
                  <rect x="0" y="0" width="220" height="85" rx="12" fill="#831843" fillOpacity="0.3" stroke="#f472b6" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="40" cy="42" r="15" fill="#f43f5e" />
                  <text x="40" y="47" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Pα</text>

                  <line x1="55" y1="42" x2="95" y2="42" stroke="#f59e0b" strokeWidth="2.5" />
                  <circle cx="110" cy="42" r="15" fill="#eab308" />
                  <text x="110" y="47" textAnchor="middle" fill="#713f12" fontSize="11" fontWeight="bold">Pβ</text>

                  <line x1="125" y1="42" x2="165" y2="42" stroke="#38bdf8" strokeWidth="2.5" />
                  <circle cx="180" cy="42" r="15" fill="#0284c7" />
                  <text x="180" y="47" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Pγ</text>

                  <text x="110" y="18" textAnchor="middle" fill="#fbcfe8" fontSize="9" fontWeight="bold">
                    Triphosphate Pool (PPPi)
                  </text>
                </g>

                <text x="380" y="240" textAnchor="middle" fill="#a1a1aa" fontSize="12">
                  Three independent substrates awaiting enzymatic condensation.
                </text>
              </g>
            )}

            {/* STAGE 2: FORMATION OF β-N-GLYCOSIDIC BOND */}
            {currentStep === 2 && (
              <g>
                {/* Base Connected to Sugar */}
                <g transform="translate(100, 80)">
                  <rect x="0" y="0" width="130" height="90" rx="12" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                  <text x="65" y="45" textAnchor="middle" fill="#c7d2fe" fontSize="13" fontWeight="bold">
                    {selectedBaseType === 'purine' ? 'Adenine' : 'Thymine'} Base
                  </text>
                  <text x="65" y="65" textAnchor="middle" fill="#a5b4fc" fontSize="10">
                    {selectedBaseType === 'purine' ? 'Purine Ring' : 'Pyrimidine Ring'}
                  </text>
                </g>

                {/* Glycosidic Bond Highlighted */}
                <g transform="translate(230, 125)">
                  <line x1="0" y1="0" x2="60" y2="0" stroke="#a855f7" strokeWidth="4" />
                  <circle cx="30" cy="0" r="10" fill="#7c3aed" stroke="#c084fc" strokeWidth="2" />
                  <text x="30" y="4" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">β-N</text>
                  <text x="30" y="-14" textAnchor="middle" fill="#c084fc" fontSize="9" fontWeight="bold">
                    β-N-Glycosidic Bond
                  </text>
                  <text x="30" y="24" textAnchor="middle" fill="#e9d5ff" fontSize="8">
                    C1' (Sugar) — {selectedBaseType === 'purine' ? 'N9' : 'N1'} (Base)
                  </text>
                </g>

                {/* Sugar */}
                <g transform="translate(290, 75)">
                  <polygon points="50,15 100,50 85,105 20,105 5,50" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" />
                  <circle cx="50" cy="15" r="8" fill="#ef4444" />
                  <text x="50" y="19" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">O</text>
                  <text x="52" y="65" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">Deoxyribose</text>
                </g>

                {/* Byproduct Water Ejected */}
                <g transform="translate(230, 210)">
                  <circle cx="30" cy="0" r="16" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                  <text x="30" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">H₂O</text>
                  <text x="30" y="24" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">
                    Condensation Byproduct Ejected
                  </text>
                </g>

                {/* Nucleoside Banner */}
                <rect x="100" y="20" width="310" height="30" rx="8" fill="#581c87" fillOpacity="0.5" stroke="#a855f7" strokeWidth="1.5" />
                <text x="255" y="40" textAnchor="middle" fill="#f3e8ff" fontSize="12" fontWeight="bold">
                  NUCLEOSIDE FORMED: Base + Sugar
                </text>
              </g>
            )}

            {/* STAGE 3: FORMATION OF 5'-PHOSPHOESTER & TRIPHOSPHATE */}
            {currentStep === 3 && (
              <g>
                {/* Full dNTP Monomer */}
                {/* Base */}
                <g transform="translate(50, 80)">
                  <rect x="0" y="0" width="110" height="90" rx="12" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                  <text x="55" y="50" textAnchor="middle" fill="#c7d2fe" fontSize="12" fontWeight="bold">Base (A/T)</text>
                </g>

                {/* Glycosidic Link */}
                <line x1="160" y1="125" x2="200" y2="125" stroke="#a855f7" strokeWidth="3" />

                {/* Sugar */}
                <g transform="translate(200, 75)">
                  <polygon points="50,15 100,50 85,105 20,105 5,50" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" />
                  <circle cx="50" cy="15" r="8" fill="#ef4444" />
                  <text x="50" y="19" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">O</text>
                  <text x="52" y="65" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">Sugar</text>
                </g>

                {/* 5'-Phosphoester Bond Highlighted */}
                <g transform="translate(305, 125)">
                  <line x1="0" y1="0" x2="65" y2="0" stroke="#ec4899" strokeWidth="4" />
                  <circle cx="32" cy="0" r="10" fill="#831843" stroke="#f472b6" strokeWidth="2" />
                  <text x="32" y="4" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">5'-O</text>
                  <text x="32" y="-14" textAnchor="middle" fill="#f472b6" fontSize="9" fontWeight="bold">
                    5'-Phosphoester Link
                  </text>
                  <text x="32" y="24" textAnchor="middle" fill="#fbcfe8" fontSize="8">
                    C5'—O—Pα
                  </text>
                </g>

                {/* Triphosphate Tail */}
                <g transform="translate(370, 80)">
                  <circle cx="40" cy="45" r="16" fill="#f43f5e" stroke="#fda4af" strokeWidth="2" />
                  <text x="40" y="50" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Pα</text>

                  <line x1="56" y1="45" x2="104" y2="45" stroke="#f59e0b" strokeWidth="3" />
                  <circle cx="120" cy="45" r="16" fill="#eab308" stroke="#fef08a" strokeWidth="2" />
                  <text x="120" y="50" textAnchor="middle" fill="#713f12" fontSize="11" fontWeight="bold">Pβ</text>

                  <line x1="136" y1="45" x2="184" y2="45" stroke="#38bdf8" strokeWidth="3" />
                  <circle cx="200" cy="45" r="16" fill="#0284c7" stroke="#bae6fd" strokeWidth="2" />
                  <text x="200" y="50" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Pγ</text>
                </g>

                {/* Banner */}
                <rect x="80" y="20" width="580" height="30" rx="8" fill="#831843" fillOpacity="0.5" stroke="#ec4899" strokeWidth="1.5" />
                <text x="370" y="40" textAnchor="middle" fill="#fce7f3" fontSize="12" fontWeight="bold">
                  NUCLEOTIDE TRIPHOSPHATE (dNTP) COMPLETE: Ready for Polymerization
                </text>
              </g>
            )}

            {/* STAGE 4: 3'-5' PHOSPHODIESTER CHAIN POLYMERIZATION */}
            {currentStep === 4 && (
              <g>
                {/* Preceding Nucleotide (3'-OH Primer) */}
                <g transform="translate(60, 40)">
                  <rect x="0" y="0" width="90" height="40" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                  <text x="45" y="24" textAnchor="middle" fill="#c7d2fe" fontSize="10" fontWeight="bold">Base (n-1)</text>

                  <polygon points="120,5 150,25 140,55 100,55 90,25" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                  <text x="120" y="35" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="bold">Sugar 1</text>
                </g>

                {/* 3'-5' PHOSPHODIESTER BRIDGE */}
                <g transform="translate(200, 70)">
                  <line x1="0" y1="10" x2="60" y2="70" stroke="#ec4899" strokeWidth="4" />
                  <circle cx="30" cy="40" r="14" fill="#831843" stroke="#f472b6" strokeWidth="2" />
                  <text x="30" y="45" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Pα</text>
                  <text x="110" y="35" fill="#f472b6" fontSize="11" fontWeight="bold">
                    3'-5' Phosphodiester Bond!
                  </text>
                  <text x="110" y="52" fill="#fbcfe8" fontSize="9">
                    C3'—O—P(=O)(O⁻)—O—C5'
                  </text>
                </g>

                {/* Incoming Nucleotide Now Incorporated */}
                <g transform="translate(260, 130)">
                  <polygon points="50,15 100,50 85,105 20,105 5,50" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" />
                  <circle cx="50" cy="15" r="8" fill="#ef4444" />
                  <text x="50" y="19" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">O</text>
                  <text x="52" y="65" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">Sugar 2</text>

                  {/* 3'-OH of new end */}
                  <circle cx="20" cy="105" r="10" fill="#047857" stroke="#34d399" strokeWidth="2" />
                  <text x="20" y="109" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">3'-OH</text>
                  <text x="20" y="130" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">New 3' End</text>

                  {/* Base attached to Sugar 2 */}
                  <rect x="115" y="15" width="100" height="70" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                  <text x="165" y="52" textAnchor="middle" fill="#c7d2fe" fontSize="11" fontWeight="bold">Base (n)</text>
                  <line x1="100" y1="50" x2="115" y2="50" stroke="#a855f7" strokeWidth="2.5" />
                </g>

                {/* Released Pyrophosphate (PPi) & Hydrolysis */}
                <g transform="translate(480, 50)">
                  <rect x="0" y="0" width="220" height="100" rx="12" fill="#713f12" fillOpacity="0.4" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="110" y="25" textAnchor="middle" fill="#fde68a" fontSize="11" fontWeight="bold">
                    Pyrophosphate (PPi) Released!
                  </text>
                  <circle cx="70" cy="55" r="14" fill="#eab308" />
                  <text x="70" y="59" textAnchor="middle" fill="#713f12" fontSize="9" fontWeight="bold">Pβ</text>
                  <line x1="84" y1="55" x2="136" y2="55" stroke="#f59e0b" strokeWidth="2" />
                  <circle cx="150" cy="55" r="14" fill="#0284c7" />
                  <text x="150" y="59" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Pγ</text>

                  <text x="110" y="85" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold">
                    Hydrolyzed → 2 Pi (ΔG ≈ -19 kJ/mol)
                  </text>
                </g>
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Detail Showcase & Stoichiometry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-8 p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
          <div className="flex items-center justify-between border-b border-stone-800 pb-2">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-amber-400">
                Bonding Step {currentStep} Summary
              </span>
              <h4 className="text-base font-bold text-white">{steps[currentStep - 1].title}</h4>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-amber-950 text-amber-300 border border-amber-800">
              {steps[currentStep - 1].deltaG}
            </span>
          </div>

          <p className="text-xs text-stone-300 leading-relaxed">
            {steps[currentStep - 1].desc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 space-y-0.5">
              <span className="text-[10px] font-bold text-amber-300 uppercase block">Covalent Bond Formed:</span>
              <span className="font-semibold text-white text-[11px]">{steps[currentStep - 1].bondFormed}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 space-y-0.5">
              <span className="text-[10px] font-bold text-sky-300 uppercase block">Byproduct / Fate:</span>
              <span className="font-semibold text-stone-200 text-[11px]">{steps[currentStep - 1].byproduct}</span>
            </div>
          </div>
        </div>

        {/* 3 Crucial Connecting Bonds Reference Table */}
        <div className="lg:col-span-4 p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-2 text-xs">
          <span className="font-bold text-amber-300 uppercase text-[10px] block">
            Summary of 3 Major Connecting Bonds
          </span>

          <div className="space-y-2 text-[11px]">
            <div className="p-2 rounded-lg bg-stone-900/80 border border-purple-800/40">
              <strong className="text-purple-300 block">1. β-N-Glycosidic Bond</strong>
              <span className="text-stone-400 text-[10px]">Sugar C1' ⇄ Base N9 (Pur) / N1 (Pyr)</span>
            </div>
            <div className="p-2 rounded-lg bg-stone-900/80 border border-pink-800/40">
              <strong className="text-pink-300 block">2. 5'-Phosphoester Bond</strong>
              <span className="text-stone-400 text-[10px]">Sugar C5' ⇄ Alpha Phosphate (Pα)</span>
            </div>
            <div className="p-2 rounded-lg bg-stone-900/80 border border-emerald-800/40">
              <strong className="text-emerald-300 block">3. 3'-5' Phosphodiester Link</strong>
              <span className="text-stone-400 text-[10px]">Prev Sugar C3' ⇄ Next Sugar C5' via P</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
