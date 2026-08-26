import React, { useState } from 'react';
import { Play, RotateCcw, ArrowRight, Check, Sparkles, AlertCircle, Scissors } from 'lucide-react';

/* -------------------------------------------------------------
   1. DNA REPLICATION SIMULATOR
------------------------------------------------------------- */
export const ReplicationSimulator: React.FC = () => {
  const [forkProgress, setForkProgress] = useState<number>(45); // percentage opened
  const [ligaseActive, setLigaseActive] = useState<boolean>(false);

  const totalBases = 10;
  const openedBases = Math.round((forkProgress / 100) * totalBases);

  const topStrand = ['5\'', 'T', 'A', 'C', 'G', 'G', 'C', 'T', 'T', 'A', 'C', 'G', 'A', 'A', '3\''];
  const bottomStrand = ['3\'', 'A', 'T', 'G', 'C', 'C', 'G', 'A', 'A', 'T', 'G', 'C', 'T', 'T', '5\''];

  return (
    <div className="bg-stone-900 text-stone-100 rounded-xl p-5 border border-stone-800 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Interactive Mechanism
          </span>
          <h4 className="text-base font-bold text-white">Replication Fork Unwinding & Strand Synthesis</h4>
        </div>
        <button
          onClick={() => {
            setForkProgress(45);
            setLigaseActive(false);
          }}
          className="text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Slider */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-stone-400">
          <span>Helicase Position: <strong>{forkProgress}% Unwound</strong></span>
          <span className="text-emerald-400 font-mono">
            {forkProgress > 80 ? 'Fully Replicated' : 'Active Fork Moving ➔'}
          </span>
        </div>
        <input
          type="range"
          min="10"
          max="100"
          value={forkProgress}
          onChange={(e) => setForkProgress(Number(e.target.value))}
          className="w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />
      </div>

      {/* Visual Canvas */}
      <div className="relative bg-stone-950 rounded-lg p-4 font-mono text-xs overflow-x-auto border border-stone-800 min-h-[220px] flex flex-col justify-center gap-3">
        {/* Leading Strand (Top) */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold text-sky-400 w-28 shrink-0">
            Leading Strand (5\'➔3\')
          </span>
          <div className="flex gap-1.5">
            {topStrand.slice(0, openedBases + 3).map((base, idx) => (
              <span
                key={`lead-${idx}`}
                className={`w-6 h-6 rounded flex items-center justify-center font-bold transition-all duration-300 ${
                  base === '5\'' || base === '3\''
                    ? 'text-stone-400 text-[10px]'
                    : idx <= openedBases
                    ? 'bg-sky-600 text-white shadow-md ring-1 ring-sky-400'
                    : 'bg-stone-800 text-stone-600'
                }`}
              >
                {base}
              </span>
            ))}
          </div>
          {forkProgress < 100 && (
            <span className="text-[10px] bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800 animate-pulse">
              DNA Pol III Continuous ➔
            </span>
          )}
        </div>

        {/* Unwinding Core (Helicase Icon) */}
        <div className="flex items-center gap-2 py-1">
          <span className="text-[10px] uppercase font-bold text-amber-400 w-28 shrink-0">
            Helicase Wedge
          </span>
          <div
            className="flex items-center gap-2 transition-all duration-300"
            style={{ marginLeft: `${Math.max(10, openedBases * 26)}px` }}
          >
            <div className="w-8 h-8 rounded-full bg-amber-500 text-stone-950 font-bold flex items-center justify-center shadow-lg ring-4 ring-amber-500/30 text-[10px]">
              ⚡ Hel
            </div>
            <span className="text-[10px] text-amber-300">Unzipping H-bonds</span>
          </div>
        </div>

        {/* Lagging Strand (Bottom) */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold text-amber-400 w-28 shrink-0">
            Lagging Strand (3\'➔5\')
          </span>
          <div className="flex gap-1.5">
            {bottomStrand.slice(0, openedBases + 3).map((base, idx) => (
              <span
                key={`lag-${idx}`}
                className={`w-6 h-6 rounded flex items-center justify-center font-bold transition-all duration-300 ${
                  base === '5\'' || base === '3\''
                    ? 'text-stone-400 text-[10px]'
                    : idx <= openedBases
                    ? ligaseActive
                      ? 'bg-emerald-600 text-white'
                      : idx % 3 === 0
                      ? 'bg-rose-700 text-white ring-1 ring-rose-400' // RNA Primer
                      : 'bg-amber-600 text-white' // Okazaki fragment
                    : 'bg-stone-800 text-stone-600'
                }`}
              >
                {base}
              </span>
            ))}
          </div>
          <button
            onClick={() => setLigaseActive(!ligaseActive)}
            className={`text-[10px] px-2 py-0.5 rounded border transition-colors ${
              ligaseActive
                ? 'bg-emerald-900 text-emerald-200 border-emerald-700'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-300 border-stone-600'
            }`}
          >
            {ligaseActive ? '✓ Ligase Sealed Nicks' : '🧪 Apply DNA Ligase'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-900/50">
          <span className="font-bold text-sky-400 block mb-1">Continuous Leading Strand</span>
          <p className="text-stone-300 text-[11px] leading-relaxed">
            DNA Polymerase moves along effortlessly in the direction of the fork (5&apos; to 3&apos;), adding dNTPs without stopping.
          </p>
        </div>
        <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-900/50">
          <span className="font-bold text-amber-400 block mb-1">Discontinuous Lagging Strand</span>
          <p className="text-stone-300 text-[11px] leading-relaxed">
            Synthesized backwards in Okazaki fragments. RNA Primers (red) are replaced, then DNA Ligase seals the backbone.
          </p>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
   2. TRANSCRIPTION SIMULATOR
------------------------------------------------------------- */
export const TranscriptionSimulator: React.FC = () => {
  const templateDna = ['3\'', 'T', 'A', 'C', 'G', 'G', 'C', 'T', 'T', 'A', '5\''];
  const expectedRna = ['5\'', 'A', 'U', 'G', 'C', 'C', 'G', 'A', 'A', 'U', '3\''];

  const [synthesizedRna, setSynthesizedRna] = useState<string[]>(['5\'']);
  const [feedback, setFeedback] = useState<string | null>(null);

  const currentIndex = synthesizedRna.length;
  const currentDnaBase = templateDna[currentIndex];
  const targetRnaBase = expectedRna[currentIndex];

  const handleAddBase = (base: string) => {
    if (currentIndex >= templateDna.length - 1) {
      if (base === '3\'') {
        setSynthesizedRna([...synthesizedRna, '3\'']);
        setFeedback('🎉 Transcription complete! Ready for RNA processing.');
      }
      return;
    }

    if (base === targetRnaBase) {
      const next = [...synthesizedRna, base];
      setSynthesizedRna(next);
      setFeedback(`✓ Correct! ${currentDnaBase} in DNA pairs with ${base} in RNA.`);
      if (next.length === templateDna.length - 1) {
        setSynthesizedRna([...next, '3\'']);
        setFeedback('🎉 Pre-mRNA transcript synthesis complete!');
      }
    } else {
      setFeedback(`❌ Mismatch: ${currentDnaBase} pairs with ${targetRnaBase}, not ${base}. Remember: RNA uses Uracil (U), not Thymine (T)!`);
    }
  };

  const handleReset = () => {
    setSynthesizedRna(['5\'']);
    setFeedback(null);
  };

  return (
    <div className="bg-stone-900 text-stone-100 rounded-xl p-5 border border-stone-800 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
            Hands-on Activity
          </span>
          <h4 className="text-base font-bold text-white">Transcribe the DNA Template Strand</h4>
        </div>
        <button
          onClick={handleReset}
          className="text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <p className="text-xs text-stone-300">
        Act as <strong>RNA Polymerase II</strong>. Pair complementary ribonucleotides to build the pre-mRNA strand in the 5&apos; to 3&apos; direction!
      </p>

      {/* DNA Template & RNA transcript view */}
      <div className="space-y-3 bg-stone-950 rounded-lg p-4 font-mono border border-stone-800">
        {/* DNA Template Strand */}
        <div>
          <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
            <span>DNA Template Strand (3&apos; ➔ 5&apos;)</span>
            <span className="text-amber-400">Reading Frame</span>
          </div>
          <div className="flex gap-2 items-center overflow-x-auto pb-1">
            {templateDna.map((base, idx) => (
              <div
                key={`dna-${idx}`}
                className={`w-8 h-8 rounded flex items-center justify-center font-bold text-sm transition-all ${
                  idx === currentIndex
                    ? 'bg-amber-500 text-stone-950 ring-4 ring-amber-400/40 scale-110'
                    : idx < currentIndex
                    ? 'bg-stone-800 text-stone-400'
                    : 'bg-stone-800 text-stone-200'
                }`}
              >
                {base}
              </div>
            ))}
          </div>
        </div>

        {/* Synthesized RNA Strand */}
        <div>
          <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
            <span>Growing pre-mRNA Transcript (5&apos; ➔ 3&apos;)</span>
            <span className="text-teal-400">Length: {synthesizedRna.length} bases</span>
          </div>
          <div className="flex gap-2 items-center min-h-[36px] overflow-x-auto pb-1">
            {synthesizedRna.map((base, idx) => (
              <div
                key={`rna-${idx}`}
                className="w-8 h-8 rounded bg-teal-500 text-stone-950 font-bold text-sm flex items-center justify-center shadow animate-in zoom-in-50 duration-150"
              >
                {base}
              </div>
            ))}
            {synthesizedRna.length < templateDna.length && (
              <div className="w-8 h-8 rounded border-2 border-dashed border-teal-500/50 flex items-center justify-center text-teal-400 text-xs animate-pulse">
                ?
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feedback banner */}
      {feedback && (
        <div
          className={`p-2.5 rounded-lg text-xs flex items-center gap-2 ${
            feedback.includes('Correct') || feedback.includes('complete')
              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
              : 'bg-rose-950/60 text-rose-300 border border-rose-800'
          }`}
        >
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Base selection buttons */}
      {synthesizedRna.length < templateDna.length ? (
        <div className="flex items-center gap-3">
          <span className="text-xs text-stone-400">Select Complementary Base:</span>
          {['A', 'U', 'C', 'G'].map((base) => (
            <button
              key={base}
              onClick={() => handleAddBase(base)}
              className="flex-1 py-2 px-3 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold font-mono text-sm shadow hover:scale-105 active:scale-95 transition-all"
            >
              {base}
            </button>
          ))}
        </div>
      ) : (
        <div className="p-3 bg-emerald-950/50 border border-emerald-800 rounded-lg text-center text-emerald-300 text-xs font-semibold">
          ✨ Pre-mRNA successfully transcribed! Proceed to Step 3: RNA Splicing & Capping.
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------
   3. RNA SPLICING SIMULATOR
------------------------------------------------------------- */
export const SplicingSimulator: React.FC = () => {
  const [has5Cap, setHas5Cap] = useState(false);
  const [hasPolyA, setHasPolyA] = useState(false);
  const [intron1Removed, setIntron1Removed] = useState(false);
  const [intron2Removed, setIntron2Removed] = useState(false);

  const isMature = has5Cap && hasPolyA && intron1Removed && intron2Removed;

  const handleReset = () => {
    setHas5Cap(false);
    setHasPolyA(false);
    setIntron1Removed(false);
    setIntron2Removed(false);
  };

  return (
    <div className="bg-stone-900 text-stone-100 rounded-xl p-5 border border-stone-800 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
            Interactive Machine
          </span>
          <h4 className="text-base font-bold text-white">Eukaryotic RNA Processing & Splicing</h4>
        </div>
        <button
          onClick={handleReset}
          className="text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <p className="text-xs text-stone-300">
        Turn immature <strong>pre-mRNA</strong> into <strong>Mature mRNA</strong> ready for nuclear export by clicking to add protective caps and splicing out non-coding introns!
      </p>

      {/* Action Controls */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => setHas5Cap(!has5Cap)}
          className={`p-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all border ${
            has5Cap
              ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md'
              : 'bg-stone-800 hover:bg-stone-700 text-stone-300 border-stone-700'
          }`}
        >
          {has5Cap ? '✓ 5\' m7G Cap Added' : '+ Add 5\' m7G Cap'}
        </button>

        <button
          onClick={() => setIntron1Removed(!intron1Removed)}
          className={`p-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all border ${
            intron1Removed
              ? 'bg-purple-600 text-white border-purple-500 shadow-md'
              : 'bg-stone-800 hover:bg-stone-700 text-stone-300 border-stone-700'
          }`}
        >
          <Scissors className="w-3.5 h-3.5" />
          {intron1Removed ? '✓ Splice Intron 1' : 'Excise Intron 1'}
        </button>

        <button
          onClick={() => setIntron2Removed(!intron2Removed)}
          className={`p-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all border ${
            intron2Removed
              ? 'bg-purple-600 text-white border-purple-500 shadow-md'
              : 'bg-stone-800 hover:bg-stone-700 text-stone-300 border-stone-700'
          }`}
        >
          <Scissors className="w-3.5 h-3.5" />
          {intron2Removed ? '✓ Splice Intron 2' : 'Excise Intron 2'}
        </button>

        <button
          onClick={() => setHasPolyA(!hasPolyA)}
          className={`p-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all border ${
            hasPolyA
              ? 'bg-emerald-500 text-stone-950 border-emerald-400 shadow-md'
              : 'bg-stone-800 hover:bg-stone-700 text-stone-300 border-stone-700'
          }`}
        >
          {hasPolyA ? '✓ 3\' Poly-A Added' : '+ Add 3\' Poly-A Tail'}
        </button>
      </div>

      {/* Transcript Visualizer */}
      <div className="bg-stone-950 rounded-lg p-5 border border-stone-800 flex items-center justify-center min-h-[140px] overflow-x-auto">
        <div className="flex items-center gap-1 text-xs font-bold font-mono">
          {/* 5' Cap */}
          {has5Cap ? (
            <div className="bg-amber-400 text-stone-950 px-3 py-2 rounded-l-xl flex items-center gap-1 shadow-lg ring-2 ring-amber-300/40 animate-in fade-in">
              <span>m7G</span>
            </div>
          ) : (
            <div className="border border-dashed border-stone-700 text-stone-600 px-2 py-2 rounded-l-xl text-[10px]">
              No Cap
            </div>
          )}

          {/* Exon 1 */}
          <div className="bg-sky-600 text-white px-4 py-3 rounded flex items-center justify-center shadow">
            Exon 1 (Coding)
          </div>

          {/* Intron 1 */}
          {!intron1Removed ? (
            <div
              onClick={() => setIntron1Removed(true)}
              className="bg-rose-950 border border-rose-600/70 text-rose-300 px-3 py-1.5 rounded cursor-pointer hover:bg-rose-900 transition-colors flex items-center gap-1"
              title="Click to splice with Spliceosome"
            >
              <span>Intron 1 (Non-coding)</span>
              <Scissors className="w-3 h-3" />
            </div>
          ) : (
            <div className="w-2 h-0.5 bg-emerald-400" title="Splice Junction" />
          )}

          {/* Exon 2 */}
          <div className="bg-sky-600 text-white px-4 py-3 rounded flex items-center justify-center shadow">
            Exon 2 (Coding)
          </div>

          {/* Intron 2 */}
          {!intron2Removed ? (
            <div
              onClick={() => setIntron2Removed(true)}
              className="bg-rose-950 border border-rose-600/70 text-rose-300 px-3 py-1.5 rounded cursor-pointer hover:bg-rose-900 transition-colors flex items-center gap-1"
              title="Click to splice with Spliceosome"
            >
              <span>Intron 2</span>
              <Scissors className="w-3 h-3" />
            </div>
          ) : (
            <div className="w-2 h-0.5 bg-emerald-400" title="Splice Junction" />
          )}

          {/* Exon 3 */}
          <div className="bg-sky-600 text-white px-4 py-3 rounded flex items-center justify-center shadow">
            Exon 3 (Coding)
          </div>

          {/* 3' Poly-A Tail */}
          {hasPolyA ? (
            <div className="bg-emerald-400 text-stone-950 px-3 py-2 rounded-r-xl shadow-lg ring-2 ring-emerald-300/40 animate-in fade-in">
              AAAAA-3&apos;
            </div>
          ) : (
            <div className="border border-dashed border-stone-700 text-stone-600 px-2 py-2 rounded-r-xl text-[10px]">
              No Tail
            </div>
          )}
        </div>
      </div>

      {/* Completion status */}
      <div
        className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
          isMature
            ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300'
            : 'bg-stone-950 border border-stone-800 text-stone-400'
        }`}
      >
        {isMature ? (
          <>
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Mature mRNA formed!</strong> Exons 1-2-3 joined seamlessly. Protected from cytoplasmic ribonucleases and ready to enter the Ribosome!
            </span>
          </>
        ) : (
          <>
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Remaining steps to mature mRNA: {[
                !has5Cap && '5\' Cap',
                (!intron1Removed || !intron2Removed) && 'Remove Introns',
                !hasPolyA && '3\' Poly-A Tail'
              ].filter(Boolean).join(', ')}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
   4. TRANSLATION SIMULATOR
------------------------------------------------------------- */
export const TranslationSimulator: React.FC = () => {
  const codons = [
    { codon: 'AUG', aa: 'Met', anticodon: 'UAC', type: 'Start' },
    { codon: 'GCC', aa: 'Ala', anticodon: 'CGG', type: 'Hydrophobic' },
    { codon: 'AAG', aa: 'Lys', anticodon: 'UUC', type: 'Basic (+)' },
    { codon: 'GGC', aa: 'Gly', anticodon: 'CCG', type: 'Small' },
    { codon: 'UAA', aa: 'STOP', anticodon: 'Release', type: 'Stop' },
  ];

  const [stepIndex, setStepIndex] = useState(0);

  const currentCodon = codons[Math.min(stepIndex, codons.length - 1)];
  const isFinished = stepIndex >= codons.length - 1;
  const translatedPeptide = codons.slice(0, stepIndex + (isFinished ? 0 : 1)).filter(c => c.aa !== 'STOP');

  const handleNextStep = () => {
    if (stepIndex < codons.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  };

  const handleReset = () => {
    setStepIndex(0);
  };

  return (
    <div className="bg-stone-900 text-stone-100 rounded-xl p-5 border border-stone-800 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
            Live Ribosome Cycle
          </span>
          <h4 className="text-base font-bold text-white">Ribosomal Translation (A ➔ P ➔ E Sites)</h4>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="text-xs flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          {!isFinished && (
            <button
              onClick={handleNextStep}
              className="text-xs font-bold flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white shadow transition-all"
            >
              Next Codon Step <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Ribosome Stage Illustration */}
      <div className="bg-stone-950 rounded-lg p-4 border border-stone-800 font-mono space-y-4">
        {/* Growing Polypeptide */}
        <div>
          <span className="text-[11px] text-stone-400 block mb-1">
            Growing Polypeptide Ribbon (N-term ➔ C-term):
          </span>
          <div className="flex items-center gap-2 min-h-[32px] overflow-x-auto">
            <span className="text-stone-500 text-xs">H2N-</span>
            {translatedPeptide.map((item, idx) => (
              <span
                key={`aa-${idx}`}
                className="px-2 py-1 rounded bg-rose-600 text-white text-xs font-bold shadow animate-in zoom-in"
              >
                {item.aa}
              </span>
            ))}
            {isFinished && <span className="text-emerald-400 text-xs font-bold">-COOH (Complete!)</span>}
          </div>
        </div>

        {/* Ribosome Body (A, P, E Sites) */}
        <div className="border border-stone-700 bg-stone-900/80 rounded-xl p-3 relative">
          <div className="text-[10px] text-stone-400 uppercase font-bold tracking-wider mb-2 flex justify-between">
            <span>80S Ribosome Complex (Large 60S Subunit)</span>
            <span className="text-amber-400">Step {stepIndex + 1} of {codons.length}</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            {/* E Site */}
            <div className="p-2.5 rounded-lg bg-stone-800/80 border border-stone-700">
              <span className="text-[10px] font-bold text-stone-400 block">E SITE (Exit)</span>
              <span className="text-[11px] text-stone-500 mt-1 block">
                {stepIndex > 0 ? 'Deacylated tRNA ejected' : 'Empty'}
              </span>
            </div>

            {/* P Site */}
            <div className="p-2.5 rounded-lg bg-indigo-950/60 border border-indigo-700/80">
              <span className="text-[10px] font-bold text-indigo-300 block">P SITE (Peptidyl)</span>
              <span className="text-xs font-bold text-indigo-200 mt-1 block">
                {currentCodon.aa !== 'STOP' ? `Holds ${currentCodon.aa}-tRNA` : 'Peptide Released'}
              </span>
            </div>

            {/* A Site */}
            <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-700/80">
              <span className="text-[10px] font-bold text-rose-300 block">A SITE (Aminoacyl)</span>
              <span className="text-xs font-bold text-rose-200 mt-1 block">
                {isFinished ? 'eRF1 Release Factor' : `Accepts Codon ${currentCodon.codon}`}
              </span>
            </div>
          </div>
        </div>

        {/* mRNA Track */}
        <div className="pt-2">
          <span className="text-[11px] text-stone-400 block mb-1">mRNA Codon Track (5&apos; ➔ 3&apos;):</span>
          <div className="flex gap-2 items-center overflow-x-auto pb-1">
            {codons.map((item, idx) => (
              <div
                key={`codon-${idx}`}
                className={`px-3 py-1.5 rounded text-xs font-bold flex flex-col items-center transition-all ${
                  idx === stepIndex
                    ? 'bg-rose-500 text-stone-950 ring-4 ring-rose-400/40 scale-105'
                    : idx < stepIndex
                    ? 'bg-stone-800 text-stone-500 line-through'
                    : 'bg-stone-800 text-stone-300'
                }`}
              >
                <span>{item.codon}</span>
                <span className="text-[10px] opacity-80">{item.aa}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
