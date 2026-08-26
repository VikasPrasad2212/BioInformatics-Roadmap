import React, { useState, useEffect } from 'react';
import { DogmaStep, StepId } from '../types';
import { ImageModal } from './ImageModal';
import { InfographicDiagram } from './infographics/InfographicDiagrams';
import {
  ReplicationSimulator,
  TranscriptionSimulator,
  SplicingSimulator,
  TranslationSimulator,
} from './simulators/StepSimulators';
import {
  Volume2,
  VolumeX,
  ZoomIn,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  Zap,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { createSoothingFemaleUtterance } from '../utils/voiceUtils';

interface StepDetailViewProps {
  step: DogmaStep;
  onNavigateStep: (stepId: StepId) => void;
  onGoOverview: () => void;
}

export const StepDetailView: React.FC<StepDetailViewProps> = ({
  step,
  onNavigateStep,
  onGoOverview,
}) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [quickCheckAnswer, setQuickCheckAnswer] = useState<number | null>(null);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Reset state when step changes
  useEffect(() => {
    setQuickCheckAnswer(null);
    setShowAnswerFeedback(false);
    setImgError(false);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [step.id]);

  // Voice narration
  const handleToggleVoice = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const textToRead = `${step.title}. ${step.subtitle}. ${step.summary}`;
      const utterance = createSoothingFemaleUtterance(
        textToRead,
        0.92,
        'documentary-female',
        () => setIsSpeaking(false),
        () => setIsSpeaking(false)
      );
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const allStepIds: StepId[] = [
    'replication',
    'transcription',
    'rna-processing',
    'translation',
    'folding',
  ];
  const currentIndex = allStepIds.indexOf(step.id);
  const prevStepId = currentIndex > 0 ? allStepIds[currentIndex - 1] : null;
  const nextStepId = currentIndex < allStepIds.length - 1 ? allStepIds[currentIndex + 1] : null;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-stone-200 dark:border-stone-800">
        <button
          onClick={onGoOverview}
          className="text-xs font-bold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Overview
        </button>

        <div className="flex items-center gap-2">
          {/* Audio narration button */}
          {'speechSynthesis' in window && (
            <button
              onClick={handleToggleVoice}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                isSpeaking
                  ? 'bg-amber-500 text-stone-950 animate-pulse ring-2 ring-amber-400/50'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
              title="Listen to audio explanation"
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" /> Stop Voice
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-500" /> Listen to Audio
                </>
              )}
            </button>
          )}

          <button
            onClick={() => setIsImageModalOpen(true)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 flex items-center gap-1.5"
          >
            <ZoomIn className="w-3.5 h-3.5 text-indigo-500" /> Zoom Diagram
          </button>
        </div>
      </div>

      {/* Step Hero & Overview */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow">
                #{step.stepNumber}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                {step.shortTag}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
              {step.title}
            </h1>
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              {step.subtitle}
            </p>
          </div>

          {/* Location & Phase Badges */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0 text-xs">
            <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 flex items-center gap-2 text-stone-700 dark:text-stone-300">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
              <div>
                <span className="text-[10px] text-stone-400 block font-semibold">Location</span>
                <span className="font-bold">{step.location}</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 flex items-center gap-2 text-stone-700 dark:text-stone-300">
              <Clock className="w-4 h-4 text-blue-500 shrink-0" />
              <div>
                <span className="text-[10px] text-stone-400 block font-semibold">Cell Phase</span>
                <span className="font-bold">{step.cellularPhase}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Banner */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-2">
          <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
            {step.summary}
          </p>
          <div className="pt-2 border-t border-stone-200 dark:border-stone-800/60 flex items-start gap-2 text-xs text-stone-600 dark:text-stone-400">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span>
              <strong>Why it matters:</strong> {step.whyItMatters}
            </span>
          </div>
        </div>

        {/* Medical Textbook Illustration with Hotspot pinpoints */}
        <div className="relative rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-950 shadow-md min-h-[240px] flex items-center justify-center">
          {imgError ? (
            <div className="w-full p-4">
              <InfographicDiagram
                type={
                  step.id === 'replication'
                    ? 'replication-fork'
                    : step.id === 'transcription'
                    ? 'transcription-bubble'
                    : step.id === 'rna-processing'
                    ? 'rna-splicing-lariat'
                    : step.id === 'translation'
                    ? 'ribosome-translation'
                    : 'protein-hierarchy'
                }
              />
            </div>
          ) : (
            <>
              <img
                src={step.imageSrc}
                alt={step.imageAlt}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-auto max-h-[460px] object-cover mx-auto"
              />

              {/* Hotspot buttons on the image */}
              {step.hotspots.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setIsImageModalOpen(true)}
                  className="absolute w-7 h-7 -ml-3.5 -mt-3.5 rounded-full bg-emerald-500 text-stone-950 font-bold flex items-center justify-center text-xs shadow-lg ring-4 ring-emerald-400/40 hover:scale-125 transition-transform"
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  title={`${spot.label}: ${spot.description}`}
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
              ))}

              <div className="absolute bottom-3 right-3">
                <button
                  onClick={() => setIsImageModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-stone-900/80 backdrop-blur text-white text-xs font-semibold hover:bg-stone-900 flex items-center gap-1.5 border border-stone-700 shadow"
                >
                  <ZoomIn className="w-3.5 h-3.5" /> Expand & Annotate
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Interactive Micro-Simulator Widget */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          Interactive Step Laboratory
        </h3>
        {step.id === 'replication' && <ReplicationSimulator />}
        {step.id === 'transcription' && <TranscriptionSimulator />}
        {step.id === 'rna-processing' && <SplicingSimulator />}
        {step.id === 'translation' && <TranslationSimulator />}
        {step.id === 'folding' && (
          <div className="p-6 rounded-2xl bg-stone-900 text-stone-100 border border-stone-800 space-y-4">
            <h4 className="font-bold text-base text-white">
              The 4 Hierarchical Levels of Protein Conformation
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                <span className="font-bold text-sky-400 block">1° Primary Structure</span>
                <p className="text-stone-300 text-[11px] leading-relaxed">
                  Linear amino acid sequence joined by covalent peptide bonds. Dictates all higher folding.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                <span className="font-bold text-teal-400 block">2° Secondary Structure</span>
                <p className="text-stone-300 text-[11px] leading-relaxed">
                  Alpha-helices and Beta-pleated sheets stabilized by periodic backbone hydrogen bonds.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                <span className="font-bold text-indigo-400 block">3° Tertiary Structure</span>
                <p className="text-stone-300 text-[11px] leading-relaxed">
                  Full 3D globular shape with hydrophobic core, ionic salt bridges, and covalent disulfide (-S-S-) bonds.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                <span className="font-bold text-amber-400 block">4° Quaternary Structure</span>
                <p className="text-stone-300 text-[11px] leading-relaxed">
                  Multiple polypeptide subunits assembling together (e.g. Hemoglobin tetramer).
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Step-by-Step Biological Phases */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
          Detailed Molecular Mechanism (Step by Step)
        </h3>

        <div className="space-y-4">
          {step.detailedProcess.map((phase, idx) => (
            <div
              key={`phase-${idx}`}
              className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-2"
            >
              <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                {phase.phase}
              </h4>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                {phase.description}
              </p>
              <ul className="space-y-1 pt-1">
                {phase.keyPoints.map((point, pIdx) => (
                  <li
                    key={`point-${pIdx}`}
                    className="text-xs text-stone-600 dark:text-stone-400 flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Key Molecular Players / Enzymes */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
          Key Molecular Players & Enzymes
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {step.enzymes.map((enz) => (
            <div
              key={enz.name}
              className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">
                    {enz.category}
                  </span>
                  <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                    {enz.name}
                  </h4>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                  {enz.location}
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div>
                  <span className="font-semibold text-stone-700 dark:text-stone-300">Primary Role: </span>
                  <span className="text-stone-600 dark:text-stone-400">{enz.role}</span>
                </div>
                <div>
                  <span className="font-semibold text-stone-700 dark:text-stone-300">Mechanism: </span>
                  <span className="text-stone-600 dark:text-stone-400">{enz.mechanism}</span>
                </div>
                {enz.funFact && (
                  <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-amber-800 dark:text-amber-300 text-[11px]">
                    💡 <strong>Bio Insight:</strong> {enz.funFact}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Common Misconceptions & Exam Tips */}
      <div className="p-6 md:p-8 rounded-3xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
            Common Misconceptions & Exam Traps
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {step.commonMisconceptions.map((item, idx) => (
            <div
              key={`myth-${idx}`}
              className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-amber-200 dark:border-amber-900/50 space-y-2 shadow-sm"
            >
              <div className="text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1.5">
                <span>❌ Myth:</span> {item.myth}
              </div>
              <div className="text-emerald-700 dark:text-emerald-400 font-medium leading-relaxed">
                <span className="font-bold">✓ Fact:</span> {item.fact}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mini Quick-Check Question */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-500" />
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
            Step Comprehension Quick-Check
          </h3>
        </div>

        <p className="text-xs text-stone-700 dark:text-stone-300 font-medium">
          {step.quickCheck.question}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {step.quickCheck.options.map((option, idx) => {
            const isSelected = quickCheckAnswer === idx;
            const isCorrect = idx === step.quickCheck.correctIndex;

            let btnClass =
              'bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 hover:border-emerald-500';

            if (showAnswerFeedback) {
              if (isCorrect) {
                btnClass =
                  'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-400/30';
              } else if (isSelected && !isCorrect) {
                btnClass =
                  'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-200';
              } else {
                btnClass = 'opacity-50 bg-stone-100 dark:bg-stone-950';
              }
            }

            return (
              <button
                key={`qc-opt-${idx}`}
                onClick={() => {
                  setQuickCheckAnswer(idx);
                  setShowAnswerFeedback(true);
                }}
                disabled={showAnswerFeedback}
                className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all ${btnClass}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {showAnswerFeedback && (
          <div className="p-3.5 rounded-xl bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs space-y-1 animate-in fade-in">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 block">
              {quickCheckAnswer === step.quickCheck.correctIndex ? '🎉 Spot on!' : '💡 Key Insight:'}
            </span>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
              {step.quickCheck.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Prev / Next Step Navigation footer */}
      <div className="flex items-center justify-between pt-4 border-t border-stone-200 dark:border-stone-800">
        {prevStepId ? (
          <button
            onClick={() => onNavigateStep(prevStepId)}
            className="px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Previous Step
          </button>
        ) : (
          <div />
        )}

        {nextStepId ? (
          <button
            onClick={() => onNavigateStep(nextStepId)}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow transition-all hover:scale-105"
          >
            Next Step <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => onNavigateStep('simulator')}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow transition-all hover:scale-105"
          >
            Test in Live Lab <Zap className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Lightbox Modal */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageSrc={step.imageSrc}
        imageAlt={step.imageAlt}
        title={step.title}
        hotspots={step.hotspots}
      />
    </div>
  );
};
