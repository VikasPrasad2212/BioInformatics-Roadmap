import React, { useState } from 'react';
import { StepId } from '../types';
import { CENTRAL_DOGMA_STEPS } from '../data/centralDogmaData';
import { ImageModal } from './ImageModal';
import { ArrowRight, ZoomIn, Sparkles, Dna, FileText, Scissors, Cpu, Shapes, HelpCircle, Layers, CheckCircle2, Eye, LayoutGrid } from 'lucide-react';
import { InfographicDiagram } from './infographics/InfographicDiagrams';
import centralDogmaOverviewImg from '../assets/images/central_dogma_overview_1787721789446.jpg';

interface OverviewViewProps {
  onSelectStep: (stepId: StepId) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ onSelectStep }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [heroMode, setHeroMode] = useState<'render' | 'vector'>('render');
  const [imgError, setImgError] = useState(false);

  const stepsList = [
    {
      id: 'replication' as StepId,
      number: 1,
      title: 'DNA Replication',
      tag: 'DNA ➔ DNA',
      icon: Dna,
      location: 'Nucleus (S-Phase)',
      description: 'Faithful duplication of the entire genome before cell division.',
      color: 'from-blue-600 to-sky-500',
      badgeBg: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
    },
    {
      id: 'transcription' as StepId,
      number: 2,
      title: 'Transcription',
      tag: 'DNA ➔ pre-mRNA',
      icon: FileText,
      location: 'Nucleus',
      description: 'RNA Polymerase rewrites gene DNA into complementary single-stranded RNA.',
      color: 'from-teal-600 to-emerald-500',
      badgeBg: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300',
    },
    {
      id: 'rna-processing' as StepId,
      number: 3,
      title: 'RNA Processing & Splicing',
      tag: 'pre-mRNA ➔ Mature mRNA',
      icon: Scissors,
      location: 'Nucleus',
      description: '5\' cap and 3\' poly-A tail addition + spliceosome excision of non-coding introns.',
      color: 'from-purple-600 to-indigo-500',
      badgeBg: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300',
    },
    {
      id: 'translation' as StepId,
      number: 4,
      title: 'Translation',
      tag: 'mRNA ➔ Polypeptide',
      icon: Cpu,
      location: 'Cytoplasm / Ribosome',
      description: 'Ribosome matches tRNA anticodons with mRNA codons to build peptide chains.',
      color: 'from-rose-600 to-amber-500',
      badgeBg: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
    },
    {
      id: 'folding' as StepId,
      number: 5,
      title: 'Protein Folding & Exceptions',
      tag: 'Chain ➔ 3D Machine',
      icon: Shapes,
      location: 'Cytoplasm / ER / Golgi',
      description: 'Primary to quaternary folding + special flows (Reverse Transcription, Prions).',
      color: 'from-amber-600 to-orange-500',
      badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
    },
  ];

  const overviewHotspots = [
    {
      id: 'nucleus-dna',
      x: 25,
      y: 40,
      label: 'Nucleus & DNA Master Storage',
      description: 'Double-stranded DNA stays protected in the nucleus where Replication & Transcription occur.',
    },
    {
      id: 'mrna-export',
      x: 48,
      y: 48,
      label: 'Nuclear Pore mRNA Export',
      description: 'Mature mRNA with 5\' cap and poly-A tail exits the nucleus through nuclear pore complexes.',
    },
    {
      id: 'ribosome-cytoplasm',
      x: 75,
      y: 52,
      label: 'Cytoplasmic Ribosomal Translation',
      description: 'Ribosomes decode triplets into amino acid sequences, forming functional 3D enzymes.',
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Hero Banner with Medical Illustration */}
      <div className="relative rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 shadow-2xl text-stone-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 p-6 md:p-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              The Flow of Genetic Information
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Central Dogma of the Cell
            </h1>

            <p className="text-stone-300 text-sm leading-relaxed">
              First articulated by Nobel laureate Francis Crick in 1958, the Central Dogma describes how genetic instructions stored in <strong>DNA</strong> are transcribed into portable <strong>mRNA</strong> messengers and translated into <strong>Proteins</strong>—the functional molecular machines of all living organisms.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => onSelectStep('ai-career')}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-950/40 transition-all hover:scale-105"
              >
                🤖 AI-Proof Career Masterclass <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onSelectStep('molecule-3d')}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition-all hover:scale-105"
              >
                🧊 3D Molecule Viewer <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onSelectStep('chemical-bonds')}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-950/40 transition-all hover:scale-105"
              >
                🧪 Chemical Bonds Explorer <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onSelectStep('dictionary')}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-950/40 transition-all hover:scale-105"
              >
                📖 Molecular Dictionary <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onSelectStep('infographic-notes')}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-teal-950/40 transition-all hover:scale-105"
              >
                📑 Illustrated Notes
              </button>
              <button
                onClick={() => onSelectStep('video-walkthrough')}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-950/40 transition-all hover:scale-105"
              >
                🎬 Video Walkthrough
              </button>
              <button
                onClick={() => onSelectStep('replication')}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold flex items-center gap-2 border border-stone-700 transition-all"
              >
                Step 1: Replication
              </button>
              <button
                onClick={() => onSelectStep('simulator')}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold flex items-center gap-2 border border-stone-700 transition-all"
              >
                ⚡ Live Lab
              </button>
            </div>
          </div>

          {/* Right Image / Architecture Column */}
          <div className="lg:col-span-7 relative p-4 lg:p-6 flex flex-col justify-center">
            {/* View Mode Switcher Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-stone-200 uppercase tracking-wider">
                  Scientific Macro Organization
                </span>
              </div>
              <div className="flex items-center bg-stone-900/90 border border-stone-700/80 rounded-xl p-1 shadow-inner">
                <button
                  type="button"
                  onClick={() => setHeroMode('render')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    heroMode === 'render' && !imgError
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" /> High-Res Render
                </button>
                <button
                  type="button"
                  onClick={() => setHeroMode('vector')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    heroMode === 'vector' || imgError
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" /> Vector Architecture
                </button>
              </div>
            </div>

            {heroMode === 'render' && !imgError ? (
              <div
                className="relative group cursor-pointer overflow-hidden rounded-2xl border border-stone-700/80 shadow-2xl bg-stone-950 min-h-[260px] flex items-center justify-center"
                onClick={() => setIsModalOpen(true)}
              >
                <img
                  src={centralDogmaOverviewImg}
                  alt="Central Dogma in Eukaryotic Cell: DNA in nucleus to protein in cytoplasm"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-auto object-cover max-h-[380px] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                  <span className="text-xs font-semibold text-white">
                    Click to inspect full diagram & hotspots
                  </span>
                  <span className="p-1.5 rounded-lg bg-white/20 text-white backdrop-blur">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-stone-700/80 shadow-2xl overflow-hidden">
                <InfographicDiagram type="central-flow" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5-Step Visual Pathway Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
              The 5 Steps of the Molecular Cascade
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Click any step below for an in-depth textbook breakdown with interactive animations and enzyme mechanics.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stepsList.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                onClick={() => onSelectStep(step.id)}
                className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md hover:border-emerald-500 dark:hover:border-emerald-500 cursor-pointer transition-all duration-200 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold text-xs flex items-center justify-center">
                      #{step.number}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${step.badgeBg}`}>
                      {step.tag}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${step.color} text-white shadow`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {step.title}
                      </h3>
                      <span className="text-[11px] text-stone-400 font-mono">
                        {step.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-bold text-stone-700 dark:text-stone-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  <span>Explore Deep-Dive</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI-Proof Career & Biotech Industry Readiness Callout */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-purple-950/40 via-stone-900 to-stone-900 border border-purple-800/40 shadow-xl space-y-4 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Career Moat & Technical Interview Readiness</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              How to Land a Top Biotech Job & Stay Irreplaceable in the Age of AI
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Generative AI tools (AlphaFold 3, RFdiffusion, ESM-3, Boltz-1) predict static patterns, but cannot compute dynamic solvent entropy, execute wet-lab SPR/Cryo-EM assays, or solve in vivo LNP delivery barriers. Master the 5 career moats and pass technical interview case studies.
            </p>
          </div>

          <button
            onClick={() => onSelectStep('ai-career')}
            className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-purple-950/60 shrink-0 transition-all hover:scale-105"
          >
            Launch Career Masterclass <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Classical Dogma vs Modern Discovery Accordion */}
      <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-500" />
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            Classical Dogma (1958) vs. Modern Additions & Exceptions
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Classical Rule */}
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-2">
            <span className="font-bold text-stone-900 dark:text-stone-100 text-sm block">
              1. The Classical Canon: DNA ➔ RNA ➔ Protein
            </span>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              DNA stores sequence information stably. Transcription copies it into transient RNA. Translation reads RNA triplets into covalent peptide bonds. Once information passes into a protein, it cannot flow back out into nucleic acid sequence.
            </p>
          </div>

          {/* Special Modern Additions */}
          <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 space-y-2 text-indigo-950 dark:text-indigo-200">
            <span className="font-bold text-indigo-900 dark:text-indigo-300 text-sm block">
              2. Special Biological Exceptions
            </span>
            <ul className="space-y-1.5 list-disc pl-4 text-stone-700 dark:text-stone-300">
              <li>
                <strong>Reverse Transcription (RNA ➔ DNA):</strong> Retroviruses like HIV use Reverse Transcriptase to build DNA from viral RNA templates.
              </li>
              <li>
                <strong>RNA Replication (RNA ➔ RNA):</strong> RNA viruses (e.g. Polio, Flu, Coronaviruses) replicate directly using RNA-dependent RNA polymerase.
              </li>
              <li>
                <strong>Prions (Protein ➔ Protein conformation):</strong> Misfolded proteins can induce normal proteins to adopt abnormal folds without nucleic acids.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* High-Res Diagram Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc={centralDogmaOverviewImg}
        imageAlt="Central Dogma in Eukaryotic Cell: DNA in nucleus to protein in cytoplasm"
        title="Central Dogma Macro Organization"
        hotspots={overviewHotspots}
      />
    </div>
  );
};
