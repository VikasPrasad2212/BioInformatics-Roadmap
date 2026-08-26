import React, { useState, useMemo } from 'react';
import { DICTIONARY_ENTRIES, DictionaryEntry } from '../data/dictionaryData';
import {
  BookOpen,
  Search,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
  Activity,
  Layers,
  Atom,
  HelpCircle
} from 'lucide-react';
import { createSoothingFemaleUtterance } from '../utils/voiceUtils';

interface DictionaryViewProps {
  onNavigateToTab?: (tabId: string) => void;
}

export const DictionaryView: React.FC<DictionaryViewProps> = ({ onNavigateToTab }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLetter, setSelectedLetter] = useState<string>('all');
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Terms' },
    { id: 'nucleic-acids', label: '🧬 Nucleic Acid Chemistry' },
    { id: 'replication', label: '⚙️ Replication Machinery' },
    { id: 'transcription', label: '📜 Transcription & Processing' },
    { id: 'translation', label: '🏭 Translation & Ribosome' },
    { id: 'protein-structure', label: '🥩 Protein Structure & Folding' },
    { id: 'genetics-mutations', label: '🔬 Genetics & Pathology' },
  ];

  const alphabet = ['all', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  // Filter dictionary entries
  const filteredEntries = useMemo(() => {
    return DICTIONARY_ENTRIES.filter((entry) => {
      const matchesCategory = selectedCategory === 'all' || entry.category === selectedCategory;
      const firstLetter = entry.term.charAt(0).toUpperCase();
      const matchesLetter = selectedLetter === 'all' || firstLetter === selectedLetter;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory && matchesLetter;

      const matchesSearch =
        entry.term.toLowerCase().includes(q) ||
        entry.shortDefinition.toLowerCase().includes(q) ||
        entry.fullExplanation.toLowerCase().includes(q) ||
        entry.roleInCentralDogma.toLowerCase().includes(q) ||
        (entry.clinicalOrPracticalNote && entry.clinicalOrPracticalNote.toLowerCase().includes(q)) ||
        (entry.chemicalFormulaOrNotation && entry.chemicalFormulaOrNotation.toLowerCase().includes(q)) ||
        entry.relatedTerms.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && (selectedLetter === 'all' || matchesLetter) && matchesSearch;
    });
  }, [searchQuery, selectedCategory, selectedLetter]);

  const handleSpeak = (entry: DictionaryEntry) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingId === entry.id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    setSpeakingId(entry.id);
    const textToSpeak = `${entry.term}. ${entry.shortDefinition} In the Central Dogma, ${entry.roleInCentralDogma}`;
    const utterance = createSoothingFemaleUtterance(
      textToSpeak,
      0.95,
      'documentary-female',
      () => setSpeakingId(null),
      () => setSpeakingId(null)
    );
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Top Banner / Hero */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 text-white border border-stone-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-300 text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Comprehensive Molecular Biology & Central Dogma Lexicon</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-100 tracking-tight leading-tight">
            Molecular Biology Dictionary & Glossary
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Searchable definitions, chemical notations, phonetic pronunciations, biochemical mechanisms, and clinical correlates for every essential concept in genetics and the Central Dogma.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mt-6 pt-6 border-t border-stone-800 flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any term (e.g. Deoxyribose, TATA box, Spliceosome, Okazaki)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 text-xs placeholder:text-stone-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-200"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full text-xs font-medium">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all text-xs font-bold ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-stone-800/70 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Alphabet A-Z Index Bar */}
          <div className="flex items-center gap-1 overflow-x-auto py-1 border-t border-stone-800/60 text-xs font-mono">
            <span className="text-[10px] text-stone-500 font-sans font-bold mr-2 uppercase">Jump to:</span>
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`px-2 py-1 rounded transition-colors text-xs font-bold ${
                  selectedLetter === letter
                    ? 'bg-emerald-500 text-stone-950'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800'
                }`}
              >
                {letter === 'all' ? 'All A-Z' : letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dictionary Results Container */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2 text-xs text-stone-500 font-semibold">
          <span>Showing {filteredEntries.length} dictionary entries</span>
          {selectedCategory !== 'all' && (
            <span>Filtered by: {categories.find((c) => c.id === selectedCategory)?.label}</span>
          )}
        </div>

        {filteredEntries.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 text-stone-500">
            <HelpCircle className="w-12 h-12 mx-auto text-stone-400 mb-3" />
            <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">No dictionary terms found</h3>
            <p className="text-xs mt-1">Try modifying your search keywords or reset the category/alphabet filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedLetter('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredEntries.map((entry) => (
              <article
                key={entry.id}
                id={entry.id}
                className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden transition-all duration-300 hover:border-blue-500/40 p-6 sm:p-8 space-y-4"
              >
                {/* Entry Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800/80 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
                        {entry.term}
                      </h2>
                      <span className="text-xs font-mono text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded">
                        {entry.phonetic}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        {entry.categoryLabel}
                      </span>
                    </div>

                    {entry.chemicalFormulaOrNotation && (
                      <p className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        Formula / Notation: {entry.chemicalFormulaOrNotation}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSpeak(entry)}
                      className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      title="Audio Pronunciation & Explanation"
                    >
                      {speakingId === entry.id ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-rose-500" />
                          <span>Stop</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-blue-500" />
                          <span>Pronounce & Listen</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Short Definition */}
                <div className="p-3.5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
                  <p className="text-xs sm:text-sm font-semibold text-blue-950 dark:text-blue-200 leading-relaxed">
                    {entry.shortDefinition}
                  </p>
                </div>

                {/* Full In-Depth Chemical & Biological Explanation */}
                <div className="space-y-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                  <p>{entry.fullExplanation}</p>
                </div>

                {/* Role in Dogma & Chemical Bond Tag */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Role in Central Dogma
                    </span>
                    <p className="text-xs text-stone-700 dark:text-stone-300">
                      {entry.roleInCentralDogma}
                    </p>
                  </div>

                  {entry.bondType && (
                    <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1">
                        <Atom className="w-3 h-3" /> Chemical Bonding Involved
                      </span>
                      <p className="text-xs font-mono font-medium text-stone-700 dark:text-stone-300">
                        {entry.bondType}
                      </p>
                    </div>
                  )}
                </div>

                {/* Clinical / Practical Box */}
                {entry.clinicalOrPracticalNote && (
                  <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-1 text-xs">
                    <span className="font-extrabold uppercase text-[10px] text-rose-700 dark:text-rose-400 flex items-center gap-1">
                      <Activity className="w-3 h-3" /> Clinical & Laboratory Correlate
                    </span>
                    <p className="text-rose-950/90 dark:text-rose-200/90 leading-relaxed text-[11px] sm:text-xs">
                      {entry.clinicalOrPracticalNote}
                    </p>
                  </div>
                )}

                {/* Related Terms Cross-Links */}
                {entry.relatedTerms && entry.relatedTerms.length > 0 && (
                  <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="text-stone-500 dark:text-stone-400 font-semibold text-[11px] mr-1">
                      Related Concepts:
                    </span>
                    {entry.relatedTerms.map((term, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSearchQuery(term.replace(/\s*\([^)]*\)/, ''));
                        }}
                        className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-blue-100 dark:hover:bg-blue-950/60 hover:text-blue-600 dark:hover:text-blue-300 transition-colors text-[11px] font-medium"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
