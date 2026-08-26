import React, { useState, useMemo } from 'react';
import { PRESET_SEQUENCES, AMINO_ACIDS, GENETIC_CODE_MAP } from '../data/geneticCode';
import { Sparkles, Dna, Play, RotateCcw, AlertTriangle, Info, Zap, Layers, RefreshCw } from 'lucide-react';

export const InteractiveDogmaLab: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('intro-short');
  const [dnaInput, setDnaInput] = useState<string>('ATGGCTAAGGGCTAA');
  const [activeMutation, setActiveMutation] = useState<string>('none');
  const [customError, setCustomError] = useState<string | null>(null);

  // Clean DNA sequence: only A, T, C, G uppercase
  const cleanDna = useMemo(() => {
    return dnaInput.toUpperCase().replace(/[^ATCG]/g, '');
  }, [dnaInput]);

  // Load preset
  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    setActiveMutation('none');
    setCustomError(null);
    const found = PRESET_SEQUENCES.find((p) => p.id === presetId);
    if (found) {
      setDnaInput(found.dnaCodingStrand);
    }
  };

  // Complementary template strand (3' to 5')
  const templateStrand = useMemo(() => {
    const complementMap: Record<string, string> = { A: 'T', T: 'A', C: 'G', G: 'C' };
    return cleanDna
      .split('')
      .map((b) => complementMap[b] || '')
      .join('');
  }, [cleanDna]);

  // mRNA transcript (5' to 3') - replaces T with U
  const mrnaSequence = useMemo(() => {
    return cleanDna.replace(/T/g, 'U');
  }, [cleanDna]);

  // Break mRNA into codons (triplets)
  const codons = useMemo(() => {
    const triplets: string[] = [];
    for (let i = 0; i < mrnaSequence.length; i += 3) {
      triplets.push(mrnaSequence.slice(i, i + 3));
    }
    return triplets;
  }, [mrnaSequence]);

  // Translation of codons into amino acids
  const translationResult = useMemo(() => {
    const result: { codon: string; aaKey: string; name: string; type: string; color: string; isStart: boolean; isStop: boolean }[] = [];
    let hasStarted = false;
    let hasTerminated = false;

    for (let i = 0; i < codons.length; i++) {
      const codon = codons[i];
      if (codon.length < 3) {
        result.push({
          codon,
          aaKey: 'Incomplete',
          name: 'Incomplete Codon',
          type: 'Polar',
          color: 'bg-stone-700 text-stone-300',
          isStart: false,
          isStop: false,
        });
        continue;
      }

      const aaKey = GENETIC_CODE_MAP[codon] || 'Unknown';
      const aa = AMINO_ACIDS[aaKey] || {
        name: 'Unknown',
        type: 'Polar',
        color: 'bg-stone-700 text-white',
      };

      const isStart = codon === 'AUG';
      const isStop = aaKey === 'STOP';

      if (isStart) hasStarted = true;

      result.push({
        codon,
        aaKey,
        name: aa.name,
        type: aa.type,
        color: aa.color,
        isStart,
        isStop,
      });

      if (isStop && hasStarted) {
        hasTerminated = true;
      }
    }

    return { result, hasStarted, hasTerminated };
  }, [codons]);

  // Apply mutations
  const handleApplyMutation = (type: string) => {
    setActiveMutation(type);
    let base = PRESET_SEQUENCES.find((p) => p.id === selectedPresetId)?.dnaCodingStrand || 'ATGGCTAAGGGCTAA';

    if (type === 'silent') {
      // e.g. GGC (Gly) -> GGT (Gly) at 3rd codon
      base = base.slice(0, 11) + 'T' + base.slice(12);
    } else if (type === 'missense') {
      // e.g. GAG (Glu) -> GTG (Val) or AAG (Lys) -> AAT (Asn)
      if (base.length >= 8) {
        base = base.slice(0, 7) + 'T' + base.slice(8);
      }
    } else if (type === 'nonsense') {
      // e.g. AAG (Lys) -> TAG (Stop)
      if (base.length >= 7) {
        base = base.slice(0, 6) + 'TAA' + base.slice(9);
      }
    } else if (type === 'frameshift-del') {
      // delete single nucleotide at position 5
      if (base.length >= 6) {
        base = base.slice(0, 4) + base.slice(5);
      }
    } else if (type === 'frameshift-ins') {
      // insert 'C' at position 5
      if (base.length >= 5) {
        base = base.slice(0, 4) + 'C' + base.slice(4);
      }
    }

    setDnaInput(base);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-teal-950/40 to-stone-900 border border-emerald-900/40 text-stone-100 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
              Interactive Lab
            </span>
            <span className="text-xs text-stone-400">Real-time Molecular Engine</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Central Dogma Live Sequence Simulator
          </h2>
          <p className="text-sm text-stone-300 max-w-2xl">
            Input or edit any DNA sequence to watch the full cascade: <strong>DNA Coding ➔ DNA Template ➔ mRNA Transcript ➔ Codon Reading ➔ Polypeptide Ribbon</strong>.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-col gap-1.5 min-w-[240px]">
          <label className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
            <Dna className="w-3.5 h-3.5" /> Select Gene Preset:
          </label>
          <select
            value={selectedPresetId}
            onChange={(e) => handleSelectPreset(e.target.value)}
            className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {PRESET_SEQUENCES.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mutation Testing Toolbar */}
      <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-stone-300">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="font-bold">Inject Mutation:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleApplyMutation('none')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeMutation === 'none'
                ? 'bg-stone-700 text-white shadow'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
            }`}
          >
            Wild Type (Normal)
          </button>
          <button
            onClick={() => handleApplyMutation('silent')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeMutation === 'silent'
                ? 'bg-emerald-600 text-white shadow'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
            }`}
            title="Changes nucleotide but codes for the same amino acid due to wobble degeneracy"
          >
            Silent Mutation
          </button>
          <button
            onClick={() => handleApplyMutation('missense')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeMutation === 'missense'
                ? 'bg-amber-600 text-white shadow'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
            }`}
            title="Substitutes one amino acid for another (e.g. Sickle Cell)"
          >
            Missense Mutation
          </button>
          <button
            onClick={() => handleApplyMutation('nonsense')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeMutation === 'nonsense'
                ? 'bg-rose-600 text-white shadow'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
            }`}
            title="Creates a premature STOP codon, truncating the protein"
          >
            Nonsense (Early STOP)
          </button>
          <button
            onClick={() => handleApplyMutation('frameshift-del')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeMutation === 'frameshift-del'
                ? 'bg-purple-600 text-white shadow'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
            }`}
            title="1 base deletion shifting all downstream codon triplets"
          >
            Frameshift (Deletion)
          </button>
          <button
            onClick={() => handleApplyMutation('frameshift-ins')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeMutation === 'frameshift-ins'
                ? 'bg-purple-600 text-white shadow'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
            }`}
            title="1 base insertion shifting all downstream codon triplets"
          >
            Frameshift (Insertion)
          </button>
        </div>
      </div>

      {/* Main Cascade Steps */}
      <div className="space-y-4">
        {/* Step A: DNA Sequence Editor */}
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                DNA Master Sequence (Nucleus)
              </h3>
            </div>
            <span className="text-xs text-stone-500 font-mono">
              Length: {cleanDna.length} bp ({Math.floor(cleanDna.length / 3)} codons)
            </span>
          </div>

          {/* DNA Coding Strand Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-600 dark:text-stone-400 flex items-center justify-between">
              <span>DNA Coding (Sense) Strand (5&apos; ➔ 3&apos;):</span>
              <span className="text-[11px] text-stone-400">Click to edit directly</span>
            </label>
            <input
              type="text"
              value={dnaInput}
              onChange={(e) => setDnaInput(e.target.value.toUpperCase())}
              placeholder="e.g. ATGGCTAAGGGCTAA"
              className="w-full font-mono text-sm px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 tracking-widest focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Complementary Template Strand */}
          <div className="space-y-1">
            <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">
              DNA Non-Coding Template Strand (3&apos; ➔ 5&apos;):
            </span>
            <div className="font-mono text-xs px-4 py-2 rounded-lg bg-stone-100 dark:bg-stone-950/70 text-stone-600 dark:text-stone-400 tracking-widest overflow-x-auto border border-stone-200 dark:border-stone-800">
              3&apos;-{templateStrand}-5&apos;
            </div>
          </div>
        </div>

        {/* Step B: Transcription Output (mRNA) */}
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-500 text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                Transcription: Messenger RNA (mRNA)
              </h3>
            </div>
            <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-800">
              T replaced by Uracil (U)
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-xs text-stone-500 dark:text-stone-400">
              mRNA Triplet Codons (5&apos; ➔ 3&apos;):
            </span>
            <div className="flex flex-wrap gap-2 font-mono text-sm">
              {codons.map((codon, idx) => (
                <div
                  key={`codon-chip-${idx}`}
                  className={`px-3 py-1.5 rounded-lg font-bold border flex flex-col items-center shadow-sm ${
                    codon === 'AUG'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-400/40'
                      : ['UAA', 'UAG', 'UGA'].includes(codon)
                      ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-700 dark:text-rose-300 ring-2 ring-rose-400/40'
                      : 'bg-stone-50 dark:bg-stone-950 border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200'
                  }`}
                >
                  <span className="tracking-widest">{codon}</span>
                  <span className="text-[10px] font-sans font-normal opacity-70">
                    Codon #{idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step C: Translation Output (Protein Chain) */}
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-rose-500 text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                Translation: Synthesized Polypeptide Chain
              </h3>
            </div>
            <div className="flex items-center gap-2">
              {translationResult.hasStarted ? (
                <span className="text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded font-semibold border border-emerald-300 dark:border-emerald-800">
                  ✓ Start Codon Recognized
                </span>
              ) : (
                <span className="text-xs bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded font-semibold border border-amber-300 dark:border-amber-800 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> No AUG Start Codon
                </span>
              )}
            </div>
          </div>

          {/* Visual Polypeptide Ribbon */}
          <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 overflow-x-auto min-h-[100px] flex items-center">
            <div className="flex items-center gap-2 font-mono">
              <span className="text-xs font-bold text-stone-400">N-terminus (H2N-)</span>
              {translationResult.result.map((item, idx) => (
                <div key={`aa-node-${idx}`} className="flex items-center">
                  <div
                    className={`px-3 py-2 rounded-xl font-bold text-xs shadow-lg border flex flex-col items-center min-w-[64px] transition-all hover:scale-110 ${item.color}`}
                    title={`${item.name} (${item.type}) - Codon: ${item.codon}`}
                  >
                    <span className="text-sm tracking-wider">{item.aaKey}</span>
                    <span className="text-[10px] opacity-80">{item.codon}</span>
                  </div>
                  {idx < translationResult.result.length - 1 && (
                    <div className="w-4 h-0.5 bg-stone-600" title="Peptide Bond (-CO-NH-)" />
                  )}
                </div>
              ))}
              <span className="text-xs font-bold text-stone-400">(-COOH) C-terminus</span>
            </div>
          </div>

          {/* Amino acid detail breakdown cards */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Amino Acid Residue Breakdown:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {translationResult.result.map((item, idx) => (
                <div
                  key={`card-${idx}`}
                  className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 dark:text-stone-100">
                      #{idx + 1} {item.aaKey}
                    </span>
                    <span className="font-mono text-[10px] text-stone-500">{item.codon}</span>
                  </div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 truncate">
                    {item.name}
                  </p>
                  <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-semibold bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
