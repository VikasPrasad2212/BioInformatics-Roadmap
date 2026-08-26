import React, { useState } from 'react';
import {
  Sparkles,
  Info,
  Layers,
  ArrowRight,
  Zap,
  CheckCircle2,
  Activity,
  Flame,
  RefreshCw,
  FlaskConical,
  ShieldCheck
} from 'lucide-react';

export const RiboseConversionDiagram: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedSugar, setSelectedSugar] = useState<'ribose' | 'deoxyribose' | 'comparison'>('comparison');
  const [showEnzymeDetail, setShowEnzymeDetail] = useState<boolean>(true);

  const steps = [
    {
      step: 1,
      title: '1. Substrate Binding & Free Radical Generation',
      subtitle: 'NDP Substrate + RNR Diferric-Tyrosyl Radical (Tyr122•)',
      desc: 'Ribonucleotide Diphosphate (NDP: ADP, GDP, CDP, UDP) enters the RNR active site. The stable tyrosyl radical (Tyr122•) on the β₂ subunit transfers an electron over 35 Å to generate an active thiyl radical (Cys439•) on the α₂ catalytic subunit.',
      reactionState: 'Cys439• + Ribose-NDP',
      atomsHighlight: 'C3\'-H'
    },
    {
      step: 2,
      title: '2. Hydrogen Atom Abstraction at C3\'',
      subtitle: 'Thiyl Radical (Cys439•) abstracts H from C3\' of Ribose',
      desc: 'The Cys439• thiyl radical abstracts the hydrogen atom from C3\' of the ribofuranose ring, generating a highly reactive carbon radical at C3\' [C3\'•]. This transient radical weakens the adjacent C2\'—O bond.',
      reactionState: 'C3\'• Carbon Radical formed',
      atomsHighlight: 'C3\' Radical'
    },
    {
      step: 3,
      title: '3. Protonation & Departure of 2\'-OH as H₂O',
      subtitle: 'Acid catalysis by Cys225 and H₂O Elimination',
      desc: 'An active-site pair of redox-active cysteines (Cys225 and Cys462) donates a proton to the 2\'-OH group. Water (H₂O) leaves from C2\', forming a 3\'-keto-2\'-deoxy radical intermediate on the sugar ring.',
      reactionState: 'Loss of H₂O (Deoxygenation)',
      atomsHighlight: 'H₂O Released'
    },
    {
      step: 4,
      title: '4. Hydride Transfer & Disulfide Bond Formation',
      subtitle: 'Cys225-SH + Cys462-SH reduce C2\' → form Cys225-S-S-Cys462',
      desc: 'The catalytic dithiol pair (Cys225 and Cys462) delivers a hydride equivalent (2 electrons + 1 proton) to reduce C2\', converting the dithiol into an oxidized, inactive disulfide bridge (—S—S—).',
      reactionState: 'C2\' Reduced to —CH₂— & Disulfide Bridge (—S—S—) formed',
      atomsHighlight: '2\'-Deoxy C2\''
    },
    {
      step: 5,
      title: '5. Hydrogen Return & Product Release (dNDP)',
      subtitle: 'Regeneration of Cys439 & Release of 2\'-Deoxyribonucleotide',
      desc: 'Cys439 returns a hydrogen atom to C3\', resolving the radical and releasing 2\'-Deoxyribonucleoside diphosphate (dNDP). The oxidized RNR enzyme is subsequently reduced and reactivated by Thioredoxin / Glutaredoxin using NADPH!',
      reactionState: 'Final Product: 2\'-Deoxy-D-Ribose (dNDP) + Disulfide Reduction by Thioredoxin',
      atomsHighlight: 'Complete dNDP'
    }
  ];

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-stone-900 border border-stone-800 text-stone-100 space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950 border border-teal-500/40 text-teal-300 text-xs font-bold">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Enzymatic Sugar Conversion & Pentose Chemistry</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Ribose vs. Deoxyribose & RNR Reduction Mechanism
          </h3>
          <p className="text-xs sm:text-sm text-stone-300">
            How cells convert D-Ribose (C₅H₁₀O₅) to 2'-Deoxy-D-Ribose (C₅H₁₀O₄) via free-radical Ribonucleotide Reductase (RNR).
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 bg-stone-950 p-1.5 rounded-xl border border-stone-800 text-xs font-bold">
          <button
            onClick={() => setSelectedSugar('comparison')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedSugar === 'comparison'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            ⚖️ 2D Side-by-Side
          </button>
          <button
            onClick={() => setSelectedSugar('ribose')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedSugar === 'ribose'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            🧪 D-Ribose Ring
          </button>
          <button
            onClick={() => setSelectedSugar('deoxyribose')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedSugar === 'deoxyribose'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            🧬 2'-Deoxyribose Ring
          </button>
        </div>
      </div>

      {/* SECTION 1: 2D Ring Structure Comparison */}
      {selectedSugar === 'comparison' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Ribose Card */}
          <div className="p-5 rounded-2xl bg-stone-950 border border-teal-500/30 space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-teal-400">RNA Pentose Sugar</span>
                <h4 className="text-base font-bold text-white">β-D-Ribofuranose (C₅H₁₀O₅)</h4>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-teal-950 text-teal-300 border border-teal-800">
                MW: 150.13 g/mol
              </span>
            </div>

            <div className="flex justify-center p-3 bg-stone-900/80 rounded-xl border border-stone-800">
              <svg viewBox="0 0 360 250" className="w-full max-w-xs h-auto font-mono select-none">
                <defs>
                  <linearGradient id="riboseGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#0f766e" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* Ring Polygon */}
                <polygon points="180,50 265,110 230,195 130,195 95,110" fill="url(#riboseGrad)" stroke="#14b8a6" strokeWidth="2.5" />

                {/* Ring Oxygen */}
                <circle cx="180" cy="50" r="14" fill="#ef4444" stroke="#f87171" strokeWidth="1.5" />
                <text x="180" y="55" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">O</text>
                <text x="180" y="28" textAnchor="middle" fill="#fca5a5" fontSize="10">Ring Oxygen</text>

                {/* C1' */}
                <circle cx="265" cy="110" r="12" fill="#334155" stroke="#38bdf8" strokeWidth="2" />
                <text x="265" y="114" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">C1'</text>
                <line x1="265" y1="110" x2="310" y2="90" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                <text x="325" y="94" fill="#38bdf8" fontSize="9" fontWeight="bold">to Base (N-Glycosidic)</text>

                {/* C2' with 2'-OH Highlight */}
                <circle cx="230" cy="195" r="14" fill="#0f766e" stroke="#2dd4bf" strokeWidth="2.5" />
                <text x="230" y="199" textAnchor="middle" fill="#5eead4" fontSize="10" fontWeight="bold">C2'</text>
                <line x1="230" y1="209" x2="250" y2="235" stroke="#2dd4bf" strokeWidth="2" />
                <rect x="235" y="225" width="45" height="20" rx="5" fill="#134e4a" stroke="#2dd4bf" strokeWidth="1.5" />
                <text x="257" y="239" textAnchor="middle" fill="#ccfbf1" fontSize="10" fontWeight="bold">2'-OH</text>

                {/* C3' with 3'-OH */}
                <circle cx="130" cy="195" r="14" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="130" y="199" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="bold">C3'</text>
                <line x1="130" y1="209" x2="110" y2="235" stroke="#10b981" strokeWidth="2" />
                <rect x="75" y="225" width="45" height="20" rx="5" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
                <text x="97" y="239" textAnchor="middle" fill="#d1fae5" fontSize="10" fontWeight="bold">3'-OH</text>

                {/* C4' */}
                <circle cx="95" cy="110" r="12" fill="#334155" stroke="#a855f7" strokeWidth="2" />
                <text x="95" y="114" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">C4'</text>

                {/* C5' */}
                <line x1="95" y1="110" x2="50" y2="60" stroke="#ec4899" strokeWidth="2" />
                <circle cx="50" cy="60" r="12" fill="#500724" stroke="#ec4899" strokeWidth="2" />
                <text x="50" y="64" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">C5'</text>
                <text x="45" y="40" fill="#fbcfe8" fontSize="9">5'-CH₂OH / PO₄</text>
              </svg>
            </div>

            <div className="space-y-2 text-xs text-stone-300">
              <div className="p-3 rounded-xl bg-teal-950/40 border border-teal-500/30 space-y-1">
                <span className="font-bold text-teal-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Has Reactive 2'-OH (Hydroxyl)
                </span>
                <p className="text-[11px] leading-relaxed text-stone-300">
                  The C2' carbon carries a hydroxyl group (—OH). This makes RNA chemically versatile for catalytic cleavage (ribozymes) but susceptible to nucleophilic attack by hydroxide ions (OH⁻) in alkaline environments.
                </p>
              </div>
              <div className="text-[11px] text-stone-400 flex items-center justify-between px-1">
                <span>Sugar Pucker Conformation:</span>
                <strong className="text-teal-400">C3'-endo (A-form RNA helix)</strong>
              </div>
            </div>
          </div>

          {/* Deoxyribose Card */}
          <div className="p-5 rounded-2xl bg-stone-950 border border-amber-500/30 space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-amber-400">DNA Pentose Sugar</span>
                <h4 className="text-base font-bold text-white">2-Deoxy-D-Ribofuranose (C₅H₁₀O₄)</h4>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-amber-950 text-amber-300 border border-amber-800">
                MW: 134.13 g/mol
              </span>
            </div>

            <div className="flex justify-center p-3 bg-stone-900/80 rounded-xl border border-stone-800">
              <svg viewBox="0 0 360 250" className="w-full max-w-xs h-auto font-mono select-none">
                <defs>
                  <linearGradient id="deoxyGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#b45309" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* Ring Polygon */}
                <polygon points="180,50 265,110 230,195 130,195 95,110" fill="url(#deoxyGrad)" stroke="#f59e0b" strokeWidth="2.5" />

                {/* Ring Oxygen */}
                <circle cx="180" cy="50" r="14" fill="#ef4444" stroke="#f87171" strokeWidth="1.5" />
                <text x="180" y="55" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">O</text>
                <text x="180" y="28" textAnchor="middle" fill="#fca5a5" fontSize="10">Ring Oxygen</text>

                {/* C1' */}
                <circle cx="265" cy="110" r="12" fill="#334155" stroke="#38bdf8" strokeWidth="2" />
                <text x="265" y="114" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">C1'</text>
                <line x1="265" y1="110" x2="310" y2="90" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                <text x="325" y="94" fill="#38bdf8" fontSize="9" fontWeight="bold">to Base (N-Glycosidic)</text>

                {/* C2' with 2'-H (NO OH) Highlight */}
                <circle cx="230" cy="195" r="14" fill="#78350f" stroke="#fbbf24" strokeWidth="2.5" />
                <text x="230" y="199" textAnchor="middle" fill="#fde68a" fontSize="10" fontWeight="bold">C2'</text>
                <line x1="230" y1="209" x2="250" y2="235" stroke="#fbbf24" strokeWidth="2" />
                <rect x="235" y="225" width="45" height="20" rx="5" fill="#451a03" stroke="#fbbf24" strokeWidth="1.5" />
                <text x="257" y="239" textAnchor="middle" fill="#fde68a" fontSize="10" fontWeight="bold">2'-H (-H)</text>

                {/* C3' with 3'-OH */}
                <circle cx="130" cy="195" r="14" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="130" y="199" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="bold">C3'</text>
                <line x1="130" y1="209" x2="110" y2="235" stroke="#10b981" strokeWidth="2" />
                <rect x="75" y="225" width="45" height="20" rx="5" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
                <text x="97" y="239" textAnchor="middle" fill="#d1fae5" fontSize="10" fontWeight="bold">3'-OH</text>

                {/* C4' */}
                <circle cx="95" cy="110" r="12" fill="#334155" stroke="#a855f7" strokeWidth="2" />
                <text x="95" y="114" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">C4'</text>

                {/* C5' */}
                <line x1="95" y1="110" x2="50" y2="60" stroke="#ec4899" strokeWidth="2" />
                <circle cx="50" cy="60" r="12" fill="#500724" stroke="#ec4899" strokeWidth="2" />
                <text x="50" y="64" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">C5'</text>
                <text x="45" y="40" fill="#fbcfe8" fontSize="9">5'-CH₂OH / PO₄</text>
              </svg>
            </div>

            <div className="space-y-2 text-xs text-stone-300">
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 space-y-1">
                <span className="font-bold text-amber-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Lacks 2'-OH (2'-Deoxy Nature)
                </span>
                <p className="text-[11px] leading-relaxed text-stone-300">
                  Carries two hydrogen atoms (—H and —H) at C2'. Without the nucleophilic 2'-OH, DNA cannot self-cleave, giving the genome extreme thermodynamic stability over hundreds of thousands of years.
                </p>
              </div>
              <div className="text-[11px] text-stone-400 flex items-center justify-between px-1">
                <span>Sugar Pucker Conformation:</span>
                <strong className="text-amber-400">C2'-endo (B-form DNA helix)</strong>
              </div>
            </div>
          </div>
        </div>
      ) : selectedSugar === 'ribose' ? (
        <div className="p-5 rounded-2xl bg-stone-950 border border-teal-500/40 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <span className="text-xs font-mono font-bold text-teal-400 uppercase">Chemical Deep-Dive</span>
              <h4 className="text-lg font-bold text-white">D-Ribose in RNA & Ribonucleotide Metabolism</h4>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-teal-950 text-teal-300 border border-teal-800">
              Formula: C₅H₁₀O₅
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 space-y-1.5">
              <strong className="text-teal-300 block">1. Stereochemistry (D-Enantiomer)</strong>
              <p className="text-stone-300 leading-relaxed text-[11px]">
                In biological systems, ribose exclusively exists as the <strong>D-aldopentose</strong> isomer. The furanose 5-membered cyclic form is created by intramolecular hemiacetal formation between the C1 aldehyde and C4 hydroxyl.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 space-y-1.5">
              <strong className="text-teal-300 block">2. C3'-endo Sugar Pucker</strong>
              <p className="text-stone-300 leading-relaxed text-[11px]">
                Due to steric clash from the 2'-OH, ribose in RNA favors the <strong>C3'-endo envelope conformation</strong>. This restricts RNA duplexes to the compact, wide <strong>A-form double helix</strong> (11 bp per turn).
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 space-y-1.5">
              <strong className="text-teal-300 block">3. Alkaline Hydrolysis Mechanism</strong>
              <p className="text-stone-300 leading-relaxed text-[11px]">
                At pH &gt; 9, base removes a proton from 2'-OH to form a 2'-alkoxide ion (2'-O⁻). This ion launches an intramolecular nucleophilic attack on the adjacent 3'-phosphate, creating a 2',3'-cyclic monophosphate and snapping the RNA backbone.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-5 rounded-2xl bg-stone-950 border border-amber-500/40 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">Chemical Deep-Dive</span>
              <h4 className="text-lg font-bold text-white">2-Deoxy-D-Ribose in DNA Architecture</h4>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
              Formula: C₅H₁₀O₄
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 space-y-1.5">
              <strong className="text-amber-300 block">1. 2'-Deoxy Stabilization</strong>
              <p className="text-stone-300 leading-relaxed text-[11px]">
                By replacing 2'-OH with a non-polar C—H bond, DNA eliminates the internal nucleophile capable of attacking the phosphodiester backbone, increasing hydrolytic half-life by over 1,000,000-fold compared to RNA.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 space-y-1.5">
              <strong className="text-amber-300 block">2. C2'-endo Pucker & B-DNA</strong>
              <p className="text-stone-300 leading-relaxed text-[11px]">
                Without steric crowding at C2', the deoxyribose ring adopts the <strong>C2'-endo conformation</strong>, which elongates the phosphate-to-phosphate distance to 7.0 Å and allows the canonical <strong>B-DNA double helix</strong> with prominent Major and Minor grooves.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 space-y-1.5">
              <strong className="text-amber-300 block">3. Sanger Dideoxy (ddNTP) Extension</strong>
              <p className="text-stone-300 leading-relaxed text-[11px]">
                Synthetic 2',3'-dideoxyribose (ddNTP) lacks BOTH 2'-OH and 3'-OH. When incorporated by DNA Polymerase, it forms no 3'-5' phosphodiester bond, causing irreversible chain termination.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: Ribonucleotide Reductase (RNR) Enzymatic Conversion Mechanism */}
      <div className="p-5 sm:p-6 rounded-2xl bg-stone-950 border border-stone-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-400">
              De Novo Deoxyribonucleotide Biosynthesis
            </span>
            <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              How Ribose is Converted to Deoxyribose: The RNR Free-Radical Engine
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-stone-400">Step {activeStep} of 5</span>
            <button
              onClick={() => setActiveStep(prev => (prev > 1 ? prev - 1 : 5))}
              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold"
            >
              Prev
            </button>
            <button
              onClick={() => setActiveStep(prev => (prev < 5 ? prev + 1 : 1))}
              className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1 shadow"
            >
              Next <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Step Progress Pills */}
        <div className="grid grid-cols-5 gap-1.5">
          {steps.map(s => (
            <button
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`p-2 rounded-xl text-left transition-all ${
                activeStep === s.step
                  ? 'bg-purple-900/80 border border-purple-500/60 text-purple-200 shadow-md'
                  : 'bg-stone-900/60 border border-stone-800/80 text-stone-400 hover:text-stone-200'
              }`}
            >
              <span className="text-[10px] font-bold block">Stage {s.step}</span>
              <span className="text-[11px] font-semibold truncate block">{s.subtitle.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Active Stage Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* Reaction Visualizer SVG */}
          <div className="lg:col-span-7 p-4 rounded-2xl bg-stone-900 border border-purple-500/30 flex flex-col items-center justify-center">
            <svg viewBox="0 0 460 260" className="w-full max-w-md h-auto font-mono select-none">
              {/* Enzyme Active Site Pocket */}
              <rect x="20" y="20" width="420" height="220" rx="16" fill="#1e1b4b" fillOpacity="0.4" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4 4" />
              <text x="40" y="45" fill="#a5b4fc" fontSize="10" fontWeight="bold">
                Ribonucleotide Reductase (RNR) Active Site Pocket
              </text>

              {/* Tyrosyl / Thiyl Radical Cys439 */}
              <circle cx="100" cy="80" r="22" fill={activeStep <= 2 ? '#7c2d12' : '#334155'} stroke={activeStep <= 2 ? '#ea580c' : '#64748b'} strokeWidth="2" />
              <text x="100" y="83" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Cys439•</text>
              <text x="100" y="60" textAnchor="middle" fill="#fdba74" fontSize="8">Thiyl Radical</text>

              {/* Radical Transfer Dotted Line */}
              {activeStep === 1 && (
                <g>
                  <line x1="125" y1="85" x2="200" y2="105" stroke="#ea580c" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="160" y="85" fill="#fdba74" fontSize="8" fontWeight="bold">e⁻ / H• Transfer</text>
                </g>
              )}

              {/* Central Pentose Sugar Intermediate */}
              <polygon
                points="230,85 295,120 270,185 190,185 165,120"
                fill="#0f766e"
                fillOpacity="0.3"
                stroke={activeStep >= 4 ? '#f59e0b' : '#14b8a6'}
                strokeWidth="2.5"
              />

              {/* C3' Atom */}
              <circle
                cx="190"
                cy="185"
                r="13"
                fill={activeStep === 2 ? '#dc2626' : '#064e3b'}
                stroke={activeStep === 2 ? '#f87171' : '#10b981'}
                strokeWidth="2"
              />
              <text x="190" y="189" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">C3'</text>
              {activeStep === 2 && (
                <text x="190" y="215" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">
                  [C3'• Radical]
                </text>
              )}

              {/* C2' Atom */}
              <circle
                cx="270"
                cy="185"
                r="14"
                fill={activeStep >= 4 ? '#78350f' : '#0f766e'}
                stroke={activeStep >= 4 ? '#f59e0b' : '#2dd4bf'}
                strokeWidth="2.5"
              />
              <text x="270" y="189" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">C2'</text>

              {/* C2' 2'-OH or Departure of H2O */}
              {activeStep <= 2 && (
                <g>
                  <line x1="270" y1="199" x2="285" y2="225" stroke="#2dd4bf" strokeWidth="2" />
                  <rect x="275" y="215" width="40" height="18" rx="4" fill="#134e4a" stroke="#2dd4bf" strokeWidth="1" />
                  <text x="295" y="228" textAnchor="middle" fill="#ccfbf1" fontSize="9" fontWeight="bold">2'-OH</text>
                </g>
              )}

              {activeStep === 3 && (
                <g>
                  <line x1="270" y1="199" x2="310" y2="230" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="3 3" />
                  <circle cx="330" cy="235" r="14" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                  <text x="330" y="239" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">H₂O</text>
                  <text x="375" y="238" fill="#fda4af" fontSize="9" fontWeight="bold">Leaves!</text>
                </g>
              )}

              {activeStep >= 4 && (
                <g>
                  <line x1="270" y1="199" x2="285" y2="225" stroke="#f59e0b" strokeWidth="2" />
                  <rect x="275" y="215" width="45" height="18" rx="4" fill="#451a03" stroke="#f59e0b" strokeWidth="1" />
                  <text x="297" y="228" textAnchor="middle" fill="#fde68a" fontSize="9" fontWeight="bold">2'-H (-H)</text>
                </g>
              )}

              {/* Catalytic Dithiol Pair: Cys225 & Cys462 */}
              <g transform="translate(320, 60)">
                <rect x="0" y="0" width="100" height="70" rx="10" fill="#022c22" stroke="#10b981" strokeWidth="1.5" />
                <text x="50" y="18" textAnchor="middle" fill="#6ee7b7" fontSize="8" fontWeight="bold">Redox Dithiol Pair</text>
                {activeStep < 4 ? (
                  <g>
                    <text x="50" y="38" textAnchor="middle" fill="#a7f3d0" fontSize="9">Cys225—SH</text>
                    <text x="50" y="55" textAnchor="middle" fill="#a7f3d0" fontSize="9">Cys462—SH</text>
                  </g>
                ) : (
                  <g>
                    <text x="50" y="38" textAnchor="middle" fill="#fde047" fontSize="8" fontWeight="bold">Cys225—S</text>
                    <line x1="45" y1="42" x2="55" y2="48" stroke="#fde047" strokeWidth="2" />
                    <text x="50" y="58" textAnchor="middle" fill="#fde047" fontSize="8" fontWeight="bold">Cys462—S</text>
                    <text x="50" y="82" textAnchor="middle" fill="#fde047" fontSize="7">(Disulfide Bridge)</text>
                  </g>
                )}
              </g>

              {/* Substrate NDP to Product dNDP Label */}
              <text x="230" y="45" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="bold">
                {activeStep === 5 ? 'Product: dNDP (Deoxyribonucleoside)' : 'Substrate: NDP (Ribonucleoside)'}
              </text>
            </svg>
          </div>

          {/* Explanation Text Box */}
          <div className="lg:col-span-5 space-y-3">
            <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/40 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
                Current Chemical Mechanism (Step {activeStep})
              </span>
              <h5 className="text-sm font-bold text-white">{steps[activeStep - 1].title}</h5>
              <p className="text-xs text-stone-300 leading-relaxed">
                {steps[activeStep - 1].desc}
              </p>
            </div>

            {/* Reaction Formula Box */}
            <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-xs space-y-1">
              <span className="text-[10px] font-mono text-stone-400 block">State Transformation:</span>
              <div className="font-mono text-emerald-400 font-bold text-[11px]">
                {steps[activeStep - 1].reactionState}
              </div>
            </div>

            {/* Overall RNR Stoichiometry */}
            <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 text-xs space-y-1">
              <span className="text-[10px] font-mono text-purple-300 font-bold block">Overall Cellular Reaction:</span>
              <p className="font-mono text-[11px] text-stone-300">
                NDP + NADPH + H⁺ <span className="text-purple-400 font-bold">→ RNR →</span> dNDP + NADP⁺ + H₂O
              </p>
            </div>
          </div>
        </div>

        {/* Clinical & Pharmacological Callout */}
        <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="space-y-1">
            <strong className="text-rose-300 block flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-rose-400" /> 1. Hydroxyurea
            </strong>
            <p className="text-stone-300 text-[11px]">
              Scavenges the free radical on Tyr122 of the RNR β₂ subunit, halting DNA synthesis in S-phase. Used in sickle cell anemia to induce fetal hemoglobin (HbF) and in polycythemia vera.
            </p>
          </div>
          <div className="space-y-1">
            <strong className="text-rose-300 block flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400" /> 2. Gemcitabine (dFdC)
            </strong>
            <p className="text-stone-300 text-[11px]">
              A difluorodeoxycytidine prodrug that acts as a mechanism-based suicide inhibitor of RNR, permanently locking the enzyme in an inactive state to treat pancreatic and lung cancers.
            </p>
          </div>
          <div className="space-y-1">
            <strong className="text-rose-300 block flex items-center gap-1">
              <RefreshCw className="w-3.5 h-3.5 text-rose-400" /> 3. Allosteric Regulation
            </strong>
            <p className="text-stone-300 text-[11px]">
              dATP binds to RNR's allosteric activity site to shut off the entire enzyme, maintaining strict balanced ratios between dATP, dGTP, dCTP, and dTTP to prevent mutation catastrophe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
