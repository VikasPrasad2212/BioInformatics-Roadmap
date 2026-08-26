import React, { useState } from 'react';
import { CHEMICAL_PARTS_DATA, ChemicalPart } from '../data/chemicalBondsData';
import {
  DnaDeoxyriboseDiagram,
  DnaPhosphateDiagram,
  DnaNitrogenBasesDiagram,
  RnaRiboseAndUracilDiagram,
  ProteinPeptideAndFoldingDiagram,
  InteractiveDnaHelixBondMaster,
  RiboseConversionDiagram,
  TriphosphateDiagram,
  AllBasesDiagram,
  NucleotideAssemblyDiagram
} from './chemical/ChemicalBondDiagrams';
import {
  Sparkles,
  Atom,
  Flame,
  Layers,
  Zap,
  BookOpen,
  Volume2,
  VolumeX,
  Printer,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Activity,
  ArrowRight,
  Link2,
  FlaskConical
} from 'lucide-react';
import { createSoothingFemaleUtterance } from '../utils/voiceUtils';

export const ChemicalBondsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'helix' | 'assembly' | 'sugars' | 'triphosphate' | 'bases' | 'dna-sub' | 'rna' | 'protein'
  >('helix');
  const [isReadingAloud, setIsReadingAloud] = useState<boolean>(false);

  const handleRead = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    if (isReadingAloud) {
      window.speechSynthesis.cancel();
      setIsReadingAloud(false);
      return;
    }
    setIsReadingAloud(true);
    const utterance = createSoothingFemaleUtterance(
      text,
      0.95,
      'documentary-female',
      () => setIsReadingAloud(false),
      () => setIsReadingAloud(false)
    );
    window.speechSynthesis.speak(utterance);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 text-white border border-stone-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
              <Atom className="w-3.5 h-3.5" />
              <span>Molecular Architecture & Chemical Bonding Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-100 tracking-tight leading-tight">
              DNA, RNA & Protein Chemical Bonds Explorer
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Explore the exact atomic bonds that power life: covalent phosphodiesters, 2'-deoxy vs 2'-OH pentose rings, nucleotide assembly, triphosphate phosphoanhydrides, all 5 nitrogenous bases (A, T, G, C, U), Watson-Crick pairing, and protein folding thermodynamics.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
              title="Print Chemical Diagrams"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-6 pt-6 border-t border-stone-800 flex flex-wrap gap-2">
          {[
            { id: 'helix', label: '🧬 Double Helix Bonds', icon: Atom },
            { id: 'assembly', label: '🔗 Sugar + Phosphate + Base Assembly', icon: Link2 },
            { id: 'sugars', label: '🧪 Ribose ⇄ Deoxyribose Conversion', icon: FlaskConical },
            { id: 'triphosphate', label: '⚡ Triphosphate (α, β, γ) & Energy', icon: Zap },
            { id: 'bases', label: '🔬 All 5 Bases (A, T, G, C, U)', icon: Sparkles },
            { id: 'protein', label: '🥩 Protein Bonds & Folding', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/40 scale-105'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'helix' && (
        <div className="space-y-8">
          <InteractiveDnaHelixBondMaster />

          {/* Deep Chemistry Reference Box */}
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 dark:border-stone-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Comprehensive Chemical Matrix
                </span>
                <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                  Why the DNA Double Helix is Thermodynamically Unique
                </h2>
              </div>
              <button
                onClick={() =>
                  handleRead(
                    'The DNA double helix is stabilized by a combination of covalent phosphodiester bonds along the backbone, transverse hydrogen bonds between complementary base pairs, and vertical aromatic base stacking.'
                  )
                }
                className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                {isReadingAloud ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-rose-500" />
                    <span>Stop Voice</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Listen to Explanation</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-2">
                <span className="text-xs font-extrabold text-pink-600 dark:text-pink-400 block uppercase">
                  1. Covalent Backbone
                </span>
                <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                  3'-5' Phosphodiester Bonds
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  High energy covalent bonds (~330 kJ/mol) that hold genetic sequence order intact against extreme cellular conditions.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-2">
                <span className="text-xs font-extrabold text-purple-600 dark:text-purple-400 block uppercase">
                  2. Glycosidic Link
                </span>
                <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                  C1'-N Glycosidic Bonds
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Covalent bond (~350 kJ/mol) anchoring planar bases to sugar C1'. Its glycosidic dihedral angle creates the Major and Minor grooves.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-2">
                <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 block uppercase">
                  3. Transverse Pairing
                </span>
                <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                  Watson-Crick H-Bonds
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Reversible dipole bonds (A=T with 2, G≡C with 3) allowing Helicase and Polymerases to unzip strands at room temperature.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-2">
                <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 block uppercase">
                  4. Pi-Pi Base Stacking
                </span>
                <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                  Hydrophobic Dispersion
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Overlap of aromatic electron clouds stacked 3.4 Å apart, providing ~70% of the net thermodynamic stability of the double helix.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assembly Tab */}
      {activeTab === 'assembly' && (
        <div className="space-y-8">
          <NucleotideAssemblyDiagram />
        </div>
      )}

      {/* Sugars Tab */}
      {activeTab === 'sugars' && (
        <div className="space-y-8">
          <RiboseConversionDiagram />
        </div>
      )}

      {/* Triphosphate Tab */}
      {activeTab === 'triphosphate' && (
        <div className="space-y-8">
          <TriphosphateDiagram />
        </div>
      )}

      {/* Bases Tab */}
      {activeTab === 'bases' && (
        <div className="space-y-8">
          <AllBasesDiagram />
        </div>
      )}

      {/* Protein Tab */}
      {activeTab === 'protein' && (
        <div className="space-y-8">
          <ProteinPeptideAndFoldingDiagram />

          {/* Deep Folding Chemical Matrix */}
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-500" />
              Detailed Chemistry of the 4 Protein Folding Forces
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-amber-600 dark:text-amber-400">
                    1. Covalent Disulfide Bonds (-S-S-)
                  </h4>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                    ~250 kJ/mol
                  </span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Oxidation of two Cysteine sulfhydryl (-SH) groups in the ER lumen. Gives structural rigidity to extracellular proteins like Antibodies, Insulin, and Keratin.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-blue-600 dark:text-blue-400">
                    2. Ionic Salt Bridges
                  </h4>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                    ~15–30 kJ/mol
                  </span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Electrostatic attraction between positively charged basic side chains (Lys⁺, Arg⁺, His⁺) and negatively charged acidic side chains (Asp⁻, Glu⁻).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    3. Secondary & Tertiary Hydrogen Bonds
                  </h4>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                    ~8–16 kJ/mol
                  </span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  In secondary structures (α-helices and β-sheets), backbone C=O groups pair with N-H groups. In tertiary structures, polar R-groups (Ser, Thr, Tyr) form stabilizing networks.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-rose-600 dark:text-rose-400">
                    4. Hydrophobic Collapse & van der Waals
                  </h4>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300">
                    Entropic (+ΔS)
                  </span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Nonpolar residues (Val, Leu, Ile, Phe) rapidly collapse into the protein core, releasing ordered water cages into bulk solvent to maximize thermodynamic entropy.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

