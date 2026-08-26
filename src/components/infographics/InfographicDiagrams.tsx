import React, { useState } from 'react';

interface DiagramProps {
  type: 'central-flow' | 'dna-helix' | 'replication-fork' | 'transcription-bubble' | 'rna-splicing-lariat' | 'ribosome-translation' | 'protein-hierarchy' | 'mutation-spectrum';
  activeHighlight?: string | null;
}

export const InfographicDiagram: React.FC<DiagramProps> = ({ type }) => {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  switch (type) {
    case 'central-flow':
      return (
        <div className="w-full bg-stone-950 rounded-2xl p-4 sm:p-6 border border-stone-800 text-stone-100 shadow-xl overflow-hidden relative">
          <div className="flex items-center justify-between mb-3 border-b border-stone-800 pb-2">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Interactive Process Flow Architecture
            </span>
            <span className="text-[11px] text-stone-400">
              Hover over nodes for molecular insights
            </span>
          </div>

          {/* SVG Canvas for Central Dogma Flow */}
          <div className="w-full overflow-x-auto">
            <svg viewBox="0 0 900 280" className="w-full min-w-[700px] h-auto select-none font-sans">
              <defs>
                <linearGradient id="dnaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <linearGradient id="rnaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
                <linearGradient id="protGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Cellular Compartment Dividers */}
              {/* Nucleus Area */}
              <rect x="20" y="20" width="530" height="240" rx="16" fill="rgba(16, 185, 129, 0.04)" stroke="rgba(16, 185, 129, 0.25)" strokeDasharray="4 4" />
              <text x="35" y="42" fill="#34d399" fontSize="11" fontWeight="bold" letterSpacing="1">NUCLEUS (EUKARYOTIC ARCHIVAL VAULT)</text>

              {/* Cytoplasm Area */}
              <rect x="570" y="20" width="310" height="240" rx="16" fill="rgba(245, 158, 11, 0.04)" stroke="rgba(245, 158, 11, 0.25)" strokeDasharray="4 4" />
              <text x="585" y="42" fill="#fbbf24" fontSize="11" fontWeight="bold" letterSpacing="1">CYTOPLASM (TRANSLATION FACTORY)</text>

              {/* Nuclear Membrane Boundary */}
              <line x1="555" y1="20" x2="555" y2="120" stroke="#64748b" strokeWidth="4" strokeDasharray="6 3" />
              <rect x="547" y="125" width="16" height="34" rx="4" fill="#38bdf8" filter="url(#glow)" />
              <text x="555" y="146" fill="#0f172a" fontSize="9" fontWeight="bold" textAnchor="middle">NPC</text>
              <line x1="555" y1="165" x2="555" y2="260" stroke="#64748b" strokeWidth="4" strokeDasharray="6 3" />
              <text x="555" y="178" fill="#94a3b8" fontSize="8" textAnchor="middle">Nuclear Pore</text>

              {/* Step 1: DNA Node */}
              <g
                className="cursor-pointer transition-transform hover:scale-105"
                onMouseEnter={() => setHoveredElement('dna')}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <rect x="40" y="70" width="130" height="120" rx="12" fill="url(#dnaGrad)" stroke="#6ee7b7" strokeWidth="2" filter="url(#glow)" />
                <text x="105" y="100" fill="#ffffff" fontSize="15" fontWeight="extrabold" textAnchor="middle">DNA</text>
                <text x="105" y="118" fill="#d1fae5" fontSize="10" textAnchor="middle">Double Helix</text>
                <text x="105" y="145" fill="#ffffff" fontSize="9" textAnchor="middle" opacity="0.9">Storage Bank</text>
                <text x="105" y="162" fill="#ecfdf5" fontSize="8" fontFamily="monospace" textAnchor="middle">A-T | G-C</text>

                {/* Self-Replication Loop */}
                <path d="M 65 70 C 65 45, 145 45, 145 70" fill="none" stroke="#34d399" strokeWidth="2.5" markerEnd="url(#arrow)" />
                <text x="105" y="48" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">Replication (DNA Pol)</text>
              </g>

              {/* Arrow 1: Transcription */}
              <g>
                <line x1="175" y1="130" x2="230" y2="130" stroke="#818cf8" strokeWidth="3" strokeDasharray="4 2" />
                <polygon points="235,130 225,124 225,136" fill="#818cf8" />
                <text x="205" y="118" fill="#a5b4fc" fontSize="9" fontWeight="bold" textAnchor="middle">Transcription</text>
                <text x="205" y="148" fill="#64748b" fontSize="8" textAnchor="middle">RNA Pol II</text>
              </g>

              {/* Step 2: Pre-mRNA Node */}
              <g
                className="cursor-pointer transition-transform hover:scale-105"
                onMouseEnter={() => setHoveredElement('premRNA')}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <rect x="240" y="70" width="120" height="120" rx="12" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
                <text x="300" y="100" fill="#ffffff" fontSize="14" fontWeight="extrabold" textAnchor="middle">Pre-mRNA</text>
                <text x="300" y="118" fill="#c7d2fe" fontSize="9" textAnchor="middle">Primary Transcript</text>
                <text x="300" y="145" fill="#a5b4fc" fontSize="8.5" textAnchor="middle">Exons + Introns</text>
                <text x="300" y="162" fill="#818cf8" fontSize="8" fontFamily="monospace" textAnchor="middle">A-U | G-C</text>
              </g>

              {/* Arrow 2: RNA Processing / Splicing */}
              <g>
                <line x1="365" y1="130" x2="400" y2="130" stroke="#f43f5e" strokeWidth="3" />
                <polygon points="405,130 395,124 395,136" fill="#f43f5e" />
                <text x="385" y="118" fill="#fda4af" fontSize="9" fontWeight="bold" textAnchor="middle">Splicing</text>
                <text x="385" y="148" fill="#fb7185" fontSize="8" textAnchor="middle">Spliceosome</text>
              </g>

              {/* Step 3: Mature mRNA Node */}
              <g
                className="cursor-pointer transition-transform hover:scale-105"
                onMouseEnter={() => setHoveredElement('mRNA')}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <rect x="410" y="70" width="120" height="120" rx="12" fill="url(#rnaGrad)" stroke="#c084fc" strokeWidth="2" filter="url(#glow)" />
                <text x="470" y="98" fill="#ffffff" fontSize="14" fontWeight="extrabold" textAnchor="middle">Mature mRNA</text>
                <text x="470" y="115" fill="#f3e8ff" fontSize="9" textAnchor="middle">5' Cap + Poly-A</text>
                <text x="470" y="140" fill="#e9d5ff" fontSize="8.5" textAnchor="middle">Exons Only</text>
                <text x="470" y="160" fill="#d8b4fe" fontSize="8" textAnchor="middle">Ready for Export</text>
              </g>

              {/* Arrow 3: Nuclear Export Through Pore */}
              <g>
                <line x1="535" y1="130" x2="590" y2="130" stroke="#38bdf8" strokeWidth="3.5" strokeDasharray="3 2" />
                <polygon points="595,130 585,124 585,136" fill="#38bdf8" />
                <text x="565" y="110" fill="#38bdf8" fontSize="8.5" fontWeight="bold" textAnchor="middle">Translocation</text>
              </g>

              {/* Step 4: Ribosomal Translation Node */}
              <g
                className="cursor-pointer transition-transform hover:scale-105"
                onMouseEnter={() => setHoveredElement('translation')}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <rect x="600" y="70" width="125" height="120" rx="12" fill="#831843" stroke="#f472b6" strokeWidth="2" />
                <text x="662" y="98" fill="#ffffff" fontSize="14" fontWeight="extrabold" textAnchor="middle">Translation</text>
                <text x="662" y="115" fill="#fbcfe8" fontSize="9" textAnchor="middle">80S Ribosome</text>
                <text x="662" y="140" fill="#f472b6" fontSize="8.5" textAnchor="middle">tRNA Anticodons</text>
                <text x="662" y="160" fill="#fda4af" fontSize="8" textAnchor="middle">A-P-E Sites</text>
              </g>

              {/* Arrow 4: Folding */}
              <g>
                <line x1="730" y1="130" x2="760" y2="130" stroke="#fbbf24" strokeWidth="3" />
                <polygon points="765,130 755,124 755,136" fill="#fbbf24" />
                <text x="748" y="118" fill="#fde68a" fontSize="8.5" fontWeight="bold" textAnchor="middle">Folding</text>
              </g>

              {/* Step 5: 3D Protein & Phenotype */}
              <g
                className="cursor-pointer transition-transform hover:scale-105"
                onMouseEnter={() => setHoveredElement('protein')}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <rect x="770" y="70" width="105" height="120" rx="12" fill="url(#protGrad)" stroke="#fde68a" strokeWidth="2" filter="url(#glow)" />
                <text x="822" y="98" fill="#ffffff" fontSize="13" fontWeight="extrabold" textAnchor="middle">3D Protein</text>
                <text x="822" y="115" fill="#fef3c7" fontSize="8.5" textAnchor="middle">Folded Complex</text>
                <text x="822" y="140" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle">Enzyme/Trait</text>
                <text x="822" y="160" fill="#fef08a" fontSize="7.5" textAnchor="middle">e.g. MC1R Pigment</text>
              </g>
            </svg>
          </div>

          {/* Dynamic Information Banner on Element Hover */}
          <div className="mt-3 p-3 rounded-xl bg-stone-900/90 border border-stone-800 text-xs flex items-center justify-between">
            <div>
              <strong className="text-emerald-400">
                {hoveredElement === 'dna' && 'DNA (Deoxyribonucleic Acid): Stable double-stranded genetic vault preserving instructions.'}
                {hoveredElement === 'premRNA' && 'Pre-mRNA: Nascent primary transcript containing alternating coding Exons and non-coding Introns.'}
                {hoveredElement === 'mRNA' && 'Mature mRNA: Processed transcript with 5\' m7G cap and 3\' poly-A tail ready for export.'}
                {hoveredElement === 'translation' && 'Translation Engine: Ribosomal machinery reading mRNA triplets to synthesize linear polypeptides.'}
                {hoveredElement === 'protein' && 'Functional Protein: Biologically active 3D conformation directly producing physiological traits (e.g. skin/hair pigmentation).'}
                {!hoveredElement && 'Tip: Click or hover any molecular milestone in the diagram above to inspect biochemical details.'}
              </strong>
            </div>
          </div>
        </div>
      );

    case 'dna-helix':
      return (
        <div className="w-full bg-stone-950 rounded-2xl p-4 sm:p-6 border border-stone-800 text-stone-100 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between mb-3 border-b border-stone-800 pb-2">
            <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">
              DNA Chemical Geometry & Antiparallel Double Helix (B-Form)
            </span>
            <span className="text-[11px] text-stone-400">Dimensions & Base Pairing</span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg viewBox="0 0 850 260" className="w-full min-w-[680px] h-auto select-none font-sans">
              {/* Strand Labels */}
              <text x="40" y="30" fill="#38bdf8" fontSize="12" fontWeight="bold">5' Strand</text>
              <text x="40" y="240" fill="#ec4899" fontSize="12" fontWeight="bold">3' Strand</text>

              <text x="800" y="30" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="end">3' Hydroxyl (-OH)</text>
              <text x="800" y="240" fill="#ec4899" fontSize="12" fontWeight="bold" textAnchor="end">5' Phosphate</text>

              {/* Phosphodiester Backbones */}
              <line x1="60" y1="45" x2="780" y2="45" stroke="#0284c7" strokeWidth="8" strokeLinecap="round" />
              <line x1="60" y1="225" x2="780" y2="225" stroke="#be185d" strokeWidth="8" strokeLinecap="round" />

              {/* Base Pairs (A=T, G≡C, T=A, C≡G) */}
              {/* Pair 1: A = T */}
              <g transform="translate(100, 0)">
                <rect x="0" y="55" width="45" height="55" rx="6" fill="#10b981" />
                <text x="22.5" y="88" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">A</text>
                <text x="22.5" y="103" fill="#d1fae5" fontSize="7.5" textAnchor="middle">Purine</text>

                {/* 2 Hydrogen bonds */}
                <line x1="22.5" y1="115" x2="22.5" y2="155" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="3 3" />
                <text x="30" y="138" fill="#fde68a" fontSize="8" fontWeight="bold">2 H-bonds</text>

                <rect x="0" y="160" width="45" height="55" rx="6" fill="#f43f5e" />
                <text x="22.5" y="193" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">T</text>
                <text x="22.5" y="208" fill="#ffe4e6" fontSize="7.5" textAnchor="middle">Pyrim</text>
              </g>

              {/* Pair 2: G ≡ C (3 H-bonds) */}
              <g transform="translate(240, 0)">
                <rect x="0" y="55" width="45" height="55" rx="6" fill="#06b6d4" />
                <text x="22.5" y="88" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">G</text>
                <text x="22.5" y="103" fill="#cffafe" fontSize="7.5" textAnchor="middle">Purine</text>

                {/* 3 Hydrogen bonds */}
                <line x1="16" y1="115" x2="16" y2="155" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="22.5" y1="115" x2="22.5" y2="155" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="29" y1="115" x2="29" y2="155" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                <text x="35" y="138" fill="#7dd3fc" fontSize="8" fontWeight="bold">3 H-bonds (Stronger)</text>

                <rect x="0" y="160" width="45" height="55" rx="6" fill="#eab308" />
                <text x="22.5" y="193" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">C</text>
                <text x="22.5" y="208" fill="#fef9c3" fontSize="7.5" textAnchor="middle">Pyrim</text>
              </g>

              {/* Pair 3: T = A */}
              <g transform="translate(420, 0)">
                <rect x="0" y="55" width="45" height="55" rx="6" fill="#f43f5e" />
                <text x="22.5" y="88" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">T</text>
                <line x1="22.5" y1="115" x2="22.5" y2="155" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="3 3" />
                <rect x="0" y="160" width="45" height="55" rx="6" fill="#10b981" />
                <text x="22.5" y="193" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">A</text>
              </g>

              {/* Pair 4: C ≡ G */}
              <g transform="translate(560, 0)">
                <rect x="0" y="55" width="45" height="55" rx="6" fill="#eab308" />
                <text x="22.5" y="88" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">C</text>
                <line x1="16" y1="115" x2="16" y2="155" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="22.5" y1="115" x2="22.5" y2="155" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="29" y1="115" x2="29" y2="155" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                <rect x="0" y="160" width="45" height="55" rx="6" fill="#06b6d4" />
                <text x="22.5" y="193" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">G</text>
              </g>

              {/* Dimension Callouts */}
              <line x1="680" y1="55" x2="680" y2="215" stroke="#a855f7" strokeWidth="1.5" />
              <line x1="675" y1="55" x2="685" y2="55" stroke="#a855f7" strokeWidth="1.5" />
              <line x1="675" y1="215" x2="685" y2="215" stroke="#a855f7" strokeWidth="1.5" />
              <text x="692" y="140" fill="#c084fc" fontSize="11" fontWeight="bold">Diameter = 2.0 nm</text>

              <line x1="240" y1="250" x2="420" y2="250" stroke="#64748b" strokeWidth="1.5" />
              <text x="330" y="245" fill="#94a3b8" fontSize="9" textAnchor="middle">Helical Rise = 0.34 nm / bp</text>
            </svg>
          </div>
        </div>
      );

    case 'replication-fork':
      return (
        <div className="w-full bg-stone-950 rounded-2xl p-4 sm:p-6 border border-stone-800 text-stone-100 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between mb-3 border-b border-stone-800 pb-2">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
              Replisome Enzyme Assembly & Asymmetric Fork Synthesis
            </span>
            <span className="text-[11px] text-stone-400">Leading vs Lagging Strand</span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg viewBox="0 0 850 280" className="w-full min-w-[700px] h-auto select-none font-sans">
              {/* Parental Unwound DNA */}
              <line x1="40" y1="140" x2="260" y2="140" stroke="#10b981" strokeWidth="6" />
              <text x="50" y="130" fill="#34d399" fontSize="11" fontWeight="bold">Parental DNA Double Helix</text>

              {/* Topoisomerase / Gyrase */}
              <ellipse cx="140" cy="140" rx="25" ry="18" fill="#6366f1" stroke="#a5b4fc" strokeWidth="1.5" />
              <text x="140" y="144" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle">Topoisomerase</text>

              {/* Helicase Enzyme at the apex */}
              <polygon points="260,110 300,140 260,170" fill="#f59e0b" stroke="#fde68a" strokeWidth="2" />
              <text x="270" y="144" fill="#000000" fontSize="9" fontWeight="extrabold">Helicase</text>

              {/* Fork Split Strands */}
              {/* Upper: Leading Strand Template (3'->5') */}
              <path d="M 300 140 Q 380 70 800 70" fill="none" stroke="#10b981" strokeWidth="4" />
              <text x="810" y="74" fill="#34d399" fontSize="11" fontWeight="bold">3' End</text>

              {/* Newly Synthesized Continuous Leading Strand (5'->3') */}
              <path d="M 330 85 Q 400 85 750 85" fill="none" stroke="#38bdf8" strokeWidth="4" strokeDasharray="none" />
              <polygon points="325,85 340,79 340,91" fill="#38bdf8" />
              <text x="550" y="105" fill="#38bdf8" fontSize="10" fontWeight="bold">Leading Strand (Continuous 5' ➔ 3')</text>

              {/* DNA Polymerase III on Leading */}
              <rect x="420" y="65" width="55" height="35" rx="8" fill="#0284c7" stroke="#bae6fd" strokeWidth="1.5" />
              <text x="447" y="86" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">DNA Pol III</text>

              {/* Lower: Lagging Strand Template (5'->3') */}
              <path d="M 300 140 Q 380 210 800 210" fill="none" stroke="#10b981" strokeWidth="4" />
              <text x="810" y="214" fill="#34d399" fontSize="11" fontWeight="bold">5' End</text>

              {/* Single-Strand Binding Proteins (SSBs) */}
              <circle cx="340" cy="180" r="7" fill="#ec4899" />
              <circle cx="360" cy="190" r="7" fill="#ec4899" />
              <circle cx="380" cy="198" r="7" fill="#ec4899" />
              <text x="350" y="165" fill="#f472b6" fontSize="8">SSB Proteins</text>

              {/* Okazaki Fragments on Lagging Strand */}
              {/* Fragment 1 */}
              <line x1="430" y1="195" x2="520" y2="195" stroke="#f59e0b" strokeWidth="4" />
              <line x1="520" y1="195" x2="540" y2="195" stroke="#dc2626" strokeWidth="4" /> {/* RNA Primer */}
              <polygon points="425,195 435,190 435,200" fill="#f59e0b" />

              {/* Fragment 2 */}
              <line x1="570" y1="195" x2="660" y2="195" stroke="#f59e0b" strokeWidth="4" />
              <line x1="660" y1="195" x2="680" y2="195" stroke="#dc2626" strokeWidth="4" /> {/* RNA Primer */}
              <polygon points="565,195 575,190 575,200" fill="#f59e0b" />

              {/* DNA Ligase Sealing */}
              <circle cx="555" cy="195" r="14" fill="#14b8a6" stroke="#99f6e4" strokeWidth="1" />
              <text x="555" y="198" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">Ligase</text>

              <text x="600" y="235" fill="#fbbf24" fontSize="10" fontWeight="bold">
                Lagging Strand: Okazaki Fragments (Discontinuous)
              </text>
              <text x="600" y="250" fill="#f87171" fontSize="8">
                Red segments = RNA Primers (Synthesized by Primase)
              </text>
            </svg>
          </div>
        </div>
      );

    case 'transcription-bubble':
      return (
        <div className="w-full bg-stone-950 rounded-2xl p-4 sm:p-6 border border-stone-800 text-stone-100 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between mb-3 border-b border-stone-800 pb-2">
            <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">
              Transcription Bubble & RNA Polymerase II Elongation
            </span>
            <span className="text-[11px] text-stone-400">Template vs Coding Strand</span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg viewBox="0 0 850 260" className="w-full min-w-[680px] h-auto select-none font-sans">
              {/* Promoter TATA Box */}
              <rect x="50" y="110" width="70" height="35" rx="6" fill="#4338ca" stroke="#818cf8" strokeWidth="1.5" />
              <text x="85" y="128" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">TATA Box</text>
              <text x="85" y="139" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">-25 to -30 bp</text>

              {/* DNA Strands opening into bubble */}
              {/* Coding (Sense) Strand: 5' -> 3' */}
              <path d="M 130 115 L 280 115 Q 450 40 620 115 L 800 115" fill="none" stroke="#0284c7" strokeWidth="4" />
              <text x="450" y="55" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Coding (Sense) Strand (5' ➔ 3')</text>

              {/* Template (Antisense) Strand: 3' -> 5' */}
              <path d="M 130 145 L 280 145 Q 450 220 620 145 L 800 145" fill="none" stroke="#059669" strokeWidth="4" />
              <text x="450" y="240" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Template (Antisense) Strand (3' ➔ 5')</text>

              {/* RNA Polymerase II Enzyme Body */}
              <ellipse cx="460" cy="140" rx="90" ry="55" fill="rgba(139, 92, 246, 0.35)" stroke="#a855f7" strokeWidth="2.5" />
              <text x="460" y="110" fill="#e9d5ff" fontSize="12" fontWeight="extrabold" textAnchor="middle">RNA Polymerase II</text>
              <text x="460" y="125" fill="#c084fc" fontSize="8" textAnchor="middle">Moving ➔ 3' direction along template</text>

              {/* Growing RNA Transcript (5' -> 3') with Uracil substitution */}
              <path d="M 380 148 Q 440 148 560 148 Q 580 165 600 190" fill="none" stroke="#f43f5e" strokeWidth="4" />
              <circle cx="600" cy="190" r="5" fill="#fb7185" />
              <text x="615" y="195" fill="#fb7185" fontSize="10" fontWeight="bold">5' Pre-mRNA (Incorporates Uracil 'U')</text>

              <text x="450" y="165" fill="#fecdd3" fontSize="9" fontFamily="monospace" textAnchor="middle">
                RNA: A - U - G - C - U - A
              </text>
            </svg>
          </div>
        </div>
      );

    case 'rna-splicing-lariat':
      return (
        <div className="w-full bg-stone-950 rounded-2xl p-4 sm:p-6 border border-stone-800 text-stone-100 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between mb-3 border-b border-stone-800 pb-2">
            <span className="text-xs font-mono text-rose-400 font-bold uppercase tracking-wider">
              Spliceosome snRNP Assembly & Intron Lariat Excision
            </span>
            <span className="text-[11px] text-stone-400">Exons Ligation & 5' Cap / 3' Tail</span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg viewBox="0 0 850 260" className="w-full min-w-[680px] h-auto select-none font-sans">
              {/* Stage 1: Pre-mRNA with Intron Loop */}
              {/* 5' Cap */}
              <rect x="40" y="55" width="40" height="30" rx="6" fill="#f59e0b" />
              <text x="60" y="74" fill="#000000" fontSize="8.5" fontWeight="bold" textAnchor="middle">5' m7G</text>

              {/* Exon 1 */}
              <rect x="90" y="50" width="90" height="40" rx="8" fill="#10b981" />
              <text x="135" y="74" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Exon 1</text>

              {/* Intron Loop (Lariat formation) */}
              <path d="M 180 70 C 230 -10, 310 -10, 360 70" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="4 2" />
              <circle cx="270" cy="20" r="16" fill="#7f1d1d" stroke="#f87171" strokeWidth="1.5" />
              <text x="270" y="24" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle">Branch A</text>

              {/* snRNPs U1, U2, U4/U6, U5 */}
              <circle cx="200" cy="40" r="11" fill="#8b5cf6" />
              <text x="200" y="44" fill="#ffffff" fontSize="7.5" fontWeight="bold" textAnchor="middle">U1</text>

              <circle cx="340" cy="40" r="11" fill="#8b5cf6" />
              <text x="340" y="44" fill="#ffffff" fontSize="7.5" fontWeight="bold" textAnchor="middle">U2</text>

              {/* Exon 2 */}
              <rect x="360" y="50" width="90" height="40" rx="8" fill="#10b981" />
              <text x="405" y="74" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Exon 2</text>

              {/* Poly-A Tail */}
              <rect x="460" y="55" width="80" height="30" rx="6" fill="#3b82f6" />
              <text x="500" y="74" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle">Poly-A Tail (200+ A)</text>

              {/* Downward Arrow for Splicing Result */}
              <path d="M 270 100 L 270 145" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrow)" />
              <polygon points="270,150 264,140 276,140" fill="#f43f5e" />
              <text x="290" y="130" fill="#fda4af" fontSize="9" fontWeight="bold">Intron Lariat Released & Degraded</text>

              {/* Stage 2: Spliced Mature mRNA */}
              <g transform="translate(60, 175)">
                <rect x="0" y="5" width="40" height="30" rx="6" fill="#f59e0b" />
                <text x="20" y="24" fill="#000000" fontSize="8.5" fontWeight="bold" textAnchor="middle">5' m7G</text>

                <rect x="45" y="0" width="100" height="40" rx="6" fill="#10b981" />
                <text x="95" y="24" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Exon 1</text>

                <rect x="150" y="0" width="100" height="40" rx="6" fill="#10b981" />
                <text x="200" y="24" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Exon 2</text>

                <rect x="255" y="5" width="80" height="30" rx="6" fill="#3b82f6" />
                <text x="295" y="24" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle">Poly-A Tail</text>

                <text x="420" y="25" fill="#34d399" fontSize="12" fontWeight="bold">
                  = Mature mRNA Ready for Nuclear Pore Export
                </text>
              </g>
            </svg>
          </div>
        </div>
      );

    case 'ribosome-translation':
      return (
        <div className="w-full bg-stone-950 rounded-2xl p-4 sm:p-6 border border-stone-800 text-stone-100 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between mb-3 border-b border-stone-800 pb-2">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              80S Ribosome Translational Complex (A, P, E Sites & tRNA Elongation)
            </span>
            <span className="text-[11px] text-stone-400">Codon to Amino Acid Synthesis</span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg viewBox="0 0 850 270" className="w-full min-w-[700px] h-auto select-none font-sans">
              {/* 60S Large Ribosomal Subunit */}
              <path d="M 200 130 C 200 40, 600 40, 600 130 Z" fill="#1e293b" stroke="#06b6d4" strokeWidth="3" />
              <text x="400" y="60" fill="#67e8f9" fontSize="12" fontWeight="bold" textAnchor="middle">60S Large Subunit (Peptidyl Transferase)</text>

              {/* 3 Ribosomal Pockets: E, P, A */}
              {/* E-Site */}
              <rect x="260" y="70" width="70" height="75" rx="8" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
              <text x="295" y="95" fill="#94a3b8" fontSize="14" fontWeight="extrabold" textAnchor="middle">E</text>
              <text x="295" y="112" fill="#cbd5e1" fontSize="8" textAnchor="middle">Exit Site</text>
              <text x="295" y="128" fill="#f87171" fontSize="7.5" textAnchor="middle">Deacylated</text>

              {/* P-Site */}
              <rect x="365" y="70" width="70" height="75" rx="8" fill="#0f766e" stroke="#2dd4bf" strokeWidth="2" />
              <text x="400" y="95" fill="#ffffff" fontSize="14" fontWeight="extrabold" textAnchor="middle">P</text>
              <text x="400" y="112" fill="#ccfbf1" fontSize="8" textAnchor="middle">Peptidyl Site</text>
              <text x="400" y="128" fill="#5eead4" fontSize="7.5" textAnchor="middle">Chain Holder</text>

              {/* A-Site */}
              <rect x="470" y="70" width="70" height="75" rx="8" fill="#831843" stroke="#f472b6" strokeWidth="2" />
              <text x="505" y="95" fill="#ffffff" fontSize="14" fontWeight="extrabold" textAnchor="middle">A</text>
              <text x="505" y="112" fill="#fce7f3" fontSize="8" textAnchor="middle">Aminoacyl</text>
              <text x="505" y="128" fill="#f472b6" fontSize="7.5" textAnchor="middle">Incoming tRNA</text>

              {/* Growing Polypeptide Chain emerging from P-Site */}
              <circle cx="400" cy="30" r="9" fill="#f59e0b" />
              <circle cx="390" cy="15" r="9" fill="#10b981" />
              <circle cx="375" cy="5" r="9" fill="#6366f1" />
              <text x="320" y="20" fill="#fde68a" fontSize="9" fontWeight="bold">Growing Peptide Chain</text>

              {/* mRNA Strand passing through */}
              <rect x="80" y="150" width="680" height="24" rx="6" fill="#475569" stroke="#94a3b8" strokeWidth="1" />
              <text x="100" y="166" fill="#ffffff" fontSize="10" fontWeight="bold">5'</text>
              <text x="740" y="166" fill="#ffffff" fontSize="10" fontWeight="bold">3'</text>

              {/* Codons on mRNA */}
              <text x="295" y="166" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">UAC</text>
              <text x="400" y="166" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">AUG (Start)</text>
              <text x="505" y="166" fill="#ec4899" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">GAG (Glu)</text>

              {/* 40S Small Subunit */}
              <path d="M 220 185 C 220 240, 580 240, 580 185 Z" fill="#0f172a" stroke="#06b6d4" strokeWidth="2.5" />
              <text x="400" y="215" fill="#67e8f9" fontSize="11" fontWeight="bold" textAnchor="middle">40S Small Subunit (Decodes Codons)</text>
            </svg>
          </div>
        </div>
      );

    case 'protein-hierarchy':
      return (
        <div className="w-full bg-stone-950 rounded-2xl p-4 sm:p-6 border border-stone-800 text-stone-100 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between mb-3 border-b border-stone-800 pb-2">
            <span className="text-xs font-mono text-teal-400 font-bold uppercase tracking-wider">
              Protein Structure Hierarchy (1° ➔ 2° ➔ 3° ➔ 4°)
            </span>
            <span className="text-[11px] text-stone-400">Chemical Bonds at Each Level</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* 1° Primary */}
            <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                1° Primary Structure
              </span>
              <h4 className="text-xs font-bold text-stone-100">Linear Sequence</h4>
              <div className="h-16 flex items-center justify-center gap-1.5 bg-stone-950 rounded-lg border border-stone-800/80 px-2">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-[9px] font-bold flex items-center justify-center">Met</span>
                <span className="text-stone-500 font-mono text-xs">-</span>
                <span className="w-6 h-6 rounded-full bg-blue-600 text-[9px] font-bold flex items-center justify-center">Ala</span>
                <span className="text-stone-500 font-mono text-xs">-</span>
                <span className="w-6 h-6 rounded-full bg-amber-600 text-[9px] font-bold flex items-center justify-center">Val</span>
              </div>
              <p className="text-[11px] text-stone-400">
                <strong>Bond:</strong> Covalent peptide (amide) bonds between $\alpha$-amino and carboxyl groups.
              </p>
            </div>

            {/* 2° Secondary */}
            <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800 text-[10px] font-bold">
                2° Secondary Structure
              </span>
              <h4 className="text-xs font-bold text-stone-100">Local Folding Motifs</h4>
              <div className="h-16 flex items-center justify-around bg-stone-950 rounded-lg border border-stone-800/80 px-2">
                <div className="text-center">
                  <span className="text-sm font-bold text-blue-400 block">α-Helix</span>
                  <span className="text-[9px] text-stone-400">3.6 res/turn</span>
                </div>
                <div className="w-[1px] h-8 bg-stone-800" />
                <div className="text-center">
                  <span className="text-sm font-bold text-cyan-400 block">β-Sheet</span>
                  <span className="text-[9px] text-stone-400">Pleated strands</span>
                </div>
              </div>
              <p className="text-[11px] text-stone-400">
                <strong>Bond:</strong> Hydrogen bonding along the polypeptide backbone ($C=O \cdots H-N$).
              </p>
            </div>

            {/* 3° Tertiary */}
            <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800 text-[10px] font-bold">
                3° Tertiary Structure
              </span>
              <h4 className="text-xs font-bold text-stone-100">3D Globular Conformation</h4>
              <div className="h-16 flex items-center justify-center bg-stone-950 rounded-lg border border-stone-800/80 p-2 text-center">
                <span className="text-[11px] text-purple-300 font-bold">
                  Hydrophobic Core + Disulfide (Cys-S-S-Cys) Bridges
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                <strong>Bond:</strong> R-group interactions, salt bridges, hydrophobic collapse, and covalent disulfide bonds.
              </p>
            </div>

            {/* 4° Quaternary */}
            <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800 text-[10px] font-bold">
                4° Quaternary Assembly
              </span>
              <h4 className="text-xs font-bold text-stone-100">Multi-Subunit Complex</h4>
              <div className="h-16 flex items-center justify-center bg-stone-950 rounded-lg border border-stone-800/80 p-2 text-center">
                <span className="text-[11px] text-amber-300 font-bold">
                  e.g. Hemoglobin Tetramer ($\alpha_2\beta_2$)
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                <strong>Bond:</strong> Non-covalent & inter-chain interactions joining separate polypeptide chains.
              </p>
            </div>
          </div>
        </div>
      );

    case 'mutation-spectrum':
      return (
        <div className="w-full bg-stone-950 rounded-2xl p-4 sm:p-6 border border-stone-800 text-stone-100 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between mb-3 border-b border-stone-800 pb-2">
            <span className="text-xs font-mono text-rose-400 font-bold uppercase tracking-wider">
              Mutation Impact Spectrum (Point Mutations & Frameshifts)
            </span>
            <span className="text-[11px] text-stone-400">Coding Changes & Clinical Effect</span>
          </div>

          <div className="space-y-2.5">
            {/* Silent Mutation */}
            <div className="p-2.5 rounded-xl bg-stone-900/80 border border-emerald-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800">
                  Silent (Synonymous)
                </span>
                <span className="text-xs font-mono text-stone-200">GAA ➔ GAG</span>
              </div>
              <span className="text-xs text-emerald-300 font-semibold">Result: Glu ➔ Glu (No amino acid change due to code redundancy)</span>
            </div>

            {/* Missense Mutation */}
            <div className="p-2.5 rounded-xl bg-stone-900/80 border border-amber-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 text-[10px] font-bold border border-amber-800">
                  Missense (HbS Sickle Cell)
                </span>
                <span className="text-xs font-mono text-stone-200">GAG ➔ GTG</span>
              </div>
              <span className="text-xs text-amber-300 font-semibold">Result: Glutamate (-) ➔ Valine (Hydrophobic) causing sickling</span>
            </div>

            {/* Nonsense Mutation */}
            <div className="p-2.5 rounded-xl bg-stone-900/80 border border-rose-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-400 text-[10px] font-bold border border-rose-800">
                  Nonsense (Premature Stop)
                </span>
                <span className="text-xs font-mono text-stone-200">CAG ➔ UAG</span>
              </div>
              <span className="text-xs text-rose-300 font-semibold">Result: Gln ➔ STOP (Truncated non-functional protein)</span>
            </div>

            {/* Frameshift Indel */}
            <div className="p-2.5 rounded-xl bg-stone-900/80 border border-purple-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-400 text-[10px] font-bold border border-purple-800">
                  Frameshift (+1 or -1 bp Indel)
                </span>
                <span className="text-xs font-mono text-stone-200">Deletion of single base</span>
              </div>
              <span className="text-xs text-purple-300 font-semibold">Result: Completely scrambles all downstream codon triplets</span>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};
