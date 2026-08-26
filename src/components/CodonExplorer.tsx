import React, { useState, useMemo } from 'react';
import { AMINO_ACIDS, ALL_CODONS } from '../data/geneticCode';
import { Search, Filter, Sparkles, BookOpen, Info, CheckCircle2 } from 'lucide-react';
import { AminoAcid } from '../types';

export const CodonExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedAminoAcid, setSelectedAminoAcid] = useState<AminoAcid | null>(AMINO_ACIDS['Met']);
  const [viewMode, setViewMode] = useState<'grid' | 'grouped'>('grid');

  const types = ['All', 'Hydrophobic', 'Polar', 'Acidic (-)', 'Basic (+)', 'Special / Start', 'Stop'];

  // Filtered codons
  const filteredCodons = useMemo(() => {
    return ALL_CODONS.filter((item) => {
      const matchesSearch =
        item.codon.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.aminoAcid.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.abbr3.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.abbr1.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = selectedType === 'All' || item.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [searchQuery, selectedType]);

  const uniqueAminoAcids = useMemo(() => {
    return Object.values(AMINO_ACIDS);
  }, []);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-stone-900 border border-indigo-900/40 text-stone-100 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
              Universal Genetic Code
            </span>
            <span className="text-xs text-stone-400">64 Triplet Combinations</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Codon Decipherer & Amino Acid Chemical Directory
          </h2>
          <p className="text-sm text-stone-300 max-w-2xl">
            Explore the degenerate genetic code that bridges 4 nucleic acid letters (A, U, C, G) to the 20 standard protein-building amino acids.
          </p>
        </div>

        {/* Search & Mode */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search codon or amino acid..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-100 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs font-bold text-stone-500 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Filter by Chemistry:
        </span>
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedType === type
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Main Content: 2-column Grid with Codons + Selected Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Codon Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Showing {filteredCodons.length} of 64 Codons
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-2.5 py-1 rounded text-xs font-medium ${
                  viewMode === 'grid'
                    ? 'bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-white font-bold'
                    : 'text-stone-500'
                }`}
              >
                All 64 Grid
              </button>
              <button
                onClick={() => setViewMode('grouped')}
                className={`px-2.5 py-1 rounded text-xs font-medium ${
                  viewMode === 'grouped'
                    ? 'bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-white font-bold'
                    : 'text-stone-500'
                }`}
              >
                By Amino Acid (20)
              </button>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
              {filteredCodons.map((entry) => (
                <div
                  key={entry.codon}
                  onClick={() => {
                    const aa = AMINO_ACIDS[entry.abbr3];
                    if (aa) setSelectedAminoAcid(aa);
                  }}
                  className={`p-3 rounded-xl border text-center cursor-pointer transition-all hover:scale-105 hover:shadow-md ${
                    selectedAminoAcid?.abbr3 === entry.abbr3
                      ? 'ring-2 ring-indigo-500 dark:ring-indigo-400 shadow-lg border-indigo-400'
                      : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900'
                  }`}
                >
                  <div className="font-mono font-bold text-sm text-stone-900 dark:text-stone-100 tracking-wider">
                    {entry.codon}
                  </div>
                  <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                    {entry.abbr3}
                  </div>
                  <div className="text-[10px] text-stone-500 truncate mt-0.5">
                    {entry.abbr1}
                  </div>
                  {entry.isStart && (
                    <span className="inline-block mt-1 px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-[9px] font-bold text-emerald-700 dark:text-emerald-300">
                      START
                    </span>
                  )}
                  {entry.isStop && (
                    <span className="inline-block mt-1 px-1.5 py-0.2 rounded bg-rose-100 dark:bg-rose-950 text-[9px] font-bold text-rose-700 dark:text-rose-300">
                      STOP
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {uniqueAminoAcids.map((aa) => (
                <div
                  key={aa.abbr3}
                  onClick={() => setSelectedAminoAcid(aa)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all hover:border-indigo-400 ${
                    selectedAminoAcid?.abbr3 === aa.abbr3
                      ? 'bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-500 ring-2 ring-indigo-500/30'
                      : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                      {aa.name} ({aa.abbr3} / {aa.abbr1})
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 font-semibold">
                      {aa.type}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {aa.codons.map((c) => (
                      <span
                        key={c}
                        className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-950 text-stone-800 dark:text-stone-200 font-mono text-xs font-bold border border-stone-300 dark:border-stone-700"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Col: Deep Dive Card for Selected Amino Acid */}
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Residue Chemistry Inspector
          </span>

          {selectedAminoAcid ? (
            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md space-y-4 sticky top-24">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    {selectedAminoAcid.abbr3} / Single-letter &apos;{selectedAminoAcid.abbr1}&apos;
                  </span>
                  <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                    {selectedAminoAcid.name}
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  {selectedAminoAcid.type}
                </span>
              </div>

              {/* Chemical Formula */}
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 font-mono text-xs flex items-center justify-between">
                <span className="text-stone-500">Chemical Formula:</span>
                <span className="font-bold text-stone-800 dark:text-stone-200">
                  {selectedAminoAcid.chemicalFormula}
                </span>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                  Biological & Chemical Role:
                </span>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {selectedAminoAcid.description}
                </p>
              </div>

              {/* Synonymous Codons */}
              <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-700 dark:text-stone-300">
                    Synonymous Codons ({selectedAminoAcid.codons.length}):
                  </span>
                  <span className="text-[11px] text-stone-500 font-mono">5&apos; ➔ 3&apos;</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedAminoAcid.codons.map((c) => (
                    <div
                      key={c}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-mono font-bold text-xs shadow-sm flex items-center gap-1.5"
                    >
                      <span>{c}</span>
                      {c === 'AUG' && <Sparkles className="w-3 h-3 text-amber-300" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Wobble Base Pairing Note */}
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-800 dark:text-amber-300 space-y-1">
                <div className="flex items-center gap-1 font-bold">
                  <Info className="w-3.5 h-3.5" /> Wobble Hypothesis
                </div>
                <p className="text-[11px] leading-relaxed text-amber-700 dark:text-amber-400">
                  Notice how multiple codons for {selectedAminoAcid.abbr3} often share the first 2 letters and vary only at the 3rd &quot;wobble&quot; base position.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-stone-400 text-xs bg-stone-50 dark:bg-stone-900/50 rounded-xl border border-dashed border-stone-300 dark:border-stone-800">
              Click any codon or amino acid to inspect its chemical profile.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
