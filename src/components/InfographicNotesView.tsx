import React, { useState, useMemo } from 'react';
import { INFOGRAPHIC_SECTIONS } from '../data/infographicsData';
import { InfographicDiagram } from './infographics/InfographicDiagrams';
import {
  BookOpen,
  Sparkles,
  Search,
  CheckCircle2,
  Volume2,
  VolumeX,
  Printer,
  ChevronRight,
  Lightbulb,
  Activity,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { createSoothingFemaleUtterance } from '../utils/voiceUtils';

export const InfographicNotesView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isReadingAloud, setIsReadingAloud] = useState<boolean>(false);
  const [activeSectionId, setActiveSectionId] = useState<string>('central-dogma-macro');

  // Filter sections based on category and search query
  const filteredSections = useMemo(() => {
    return INFOGRAPHIC_SECTIONS.filter((sec) => {
      const matchesCat = selectedCategory === 'all' || sec.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCat;

      const matchesSearch =
        sec.title.toLowerCase().includes(q) ||
        sec.subtitle.toLowerCase().includes(q) ||
        sec.overview.toLowerCase().includes(q) ||
        sec.highYieldBullets.some((b) => b.toLowerCase().includes(q)) ||
        (sec.keyMnemonic && sec.keyMnemonic.phrase.toLowerCase().includes(q)) ||
        (sec.clinicalOrPhenotypeConnection &&
          (sec.clinicalOrPhenotypeConnection.title.toLowerCase().includes(q) ||
            sec.clinicalOrPhenotypeConnection.geneOrDisease.toLowerCase().includes(q)));

      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categories = [
    { id: 'all', label: 'All Modules (8 Chapters)' },
    { id: 'core-dogma', label: '1. Central Dogma' },
    { id: 'dna-structure', label: '2. DNA Architecture' },
    { id: 'replication', label: '3. Replication Fork' },
    { id: 'transcription', label: '4. Transcription' },
    { id: 'rna-splicing', label: '5. Splicing & Processing' },
    { id: 'translation', label: '6. Translation (80S)' },
    { id: 'protein-folding', label: '7. Protein Folding' },
    { id: 'genetics-mutations', label: '8. Mutations & Genetics' },
  ];

  // Voice narration of the active notes section
  const handleReadSection = (text: string) => {
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
      {/* Top Banner / Hero */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 text-white border border-stone-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Comprehensive Illustrated Study Notes & Infographics</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-100 tracking-tight leading-tight">
              DNA, Genetics & The Central Dogma Master Notes
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Curated high-yield molecular biology study guides with interactive process infographics,
              chemical geometry diagrams, clinical pearls, and high-retention mnemonics based on the
              master lecture series.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
              title="Print or Save PDF Cheat Sheet"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>Print Notes / PDF</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mt-6 pt-6 border-t border-stone-800/80 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts, enzymes (Helicase, TATA, MC1R, Spliceosome)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 text-xs placeholder:text-stone-500 focus:outline-none focus:border-emerald-500 transition-colors"
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
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-stone-800/70 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sections Container */}
      <div className="space-y-10">
        {filteredSections.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 text-stone-500">
            <HelpCircle className="w-12 h-12 mx-auto text-stone-400 mb-3" />
            <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">No matching notes found</h3>
            <p className="text-xs mt-1">Try refining your search query or reset the category filter.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredSections.map((sec) => (
            <article
              key={sec.id}
              id={sec.id}
              className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden transition-all duration-300 hover:border-emerald-500/40"
            >
              {/* Header Bar */}
              <div className="p-6 sm:p-8 border-b border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-extrabold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                      Module {sec.number}
                    </span>
                    <span className="text-xs font-bold text-stone-500 dark:text-stone-400">
                      {sec.badge}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                    {sec.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-medium">
                    {sec.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const textToSpeak = `${sec.title}. ${sec.overview}. Key points: ${sec.highYieldBullets.join(
                        '. '
                      )}`;
                      handleReadSection(textToSpeak);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    title="Audio Narration"
                  >
                    {isReadingAloud ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5 text-rose-500" />
                        <span>Stop Voice</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Listen to Notes</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Main Content Body */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Visual Interactive Infographic Diagram */}
                <div className="w-full">
                  <InfographicDiagram type={sec.infographicDiagramType} />
                </div>

                {/* Overview Paragraph */}
                <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800/80">
                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                    {sec.overview}
                  </p>
                </div>

                {/* Grid: High-Yield Key Points & Molecular Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: High-Yield Takeaways */}
                  <div className="lg:col-span-7 space-y-3">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      High-Yield Examination Takeaways
                    </h3>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                      {sec.highYieldBullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: Key Molecular Metrics */}
                  <div className="lg:col-span-5 space-y-3">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                      <Layers className="w-4 h-4" />
                      Essential Molecular Constants
                    </h3>
                    <div className="grid grid-cols-2 gap-2.5">
                      {sec.molecularKeyStats.map((stat, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-1"
                        >
                          <span className="text-[10px] text-stone-500 dark:text-stone-400 font-semibold block uppercase">
                            {stat.label}
                          </span>
                          <span className="text-xs sm:text-sm font-extrabold text-stone-900 dark:text-stone-100 font-mono block">
                            {stat.value}
                          </span>
                          {stat.sublabel && (
                            <span className="text-[9px] text-stone-400 dark:text-stone-500 block">
                              {stat.sublabel}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Mnemonic & Clinical Correlate Box */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {/* High Retention Mnemonic */}
                  {sec.keyMnemonic && (
                    <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 space-y-2">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        <span className="text-xs font-extrabold text-amber-900 dark:text-amber-300 uppercase tracking-wide">
                          Memory Mnemonic
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-amber-950 dark:text-amber-200 font-mono">
                        "{sec.keyMnemonic.phrase}"
                      </h4>
                      <p className="text-xs text-amber-900/80 dark:text-amber-300/80 leading-relaxed">
                        <strong>Meaning:</strong> {sec.keyMnemonic.meaning}
                      </p>
                      <p className="text-[11px] text-amber-800/70 dark:text-amber-400/70">
                        {sec.keyMnemonic.explanation}
                      </p>
                    </div>
                  )}

                  {/* Clinical & Phenotype Connection */}
                  {sec.clinicalOrPhenotypeConnection && (
                    <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 space-y-2">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                        <span className="text-xs font-extrabold text-rose-900 dark:text-rose-300 uppercase tracking-wide">
                          Clinical & Phenotypic Link
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-rose-950 dark:text-rose-200">
                        {sec.clinicalOrPhenotypeConnection.title}
                      </h4>
                      <p className="text-xs text-rose-900/80 dark:text-rose-300/80 leading-relaxed">
                        <strong>Target:</strong> {sec.clinicalOrPhenotypeConnection.geneOrDisease}
                      </p>
                      <p className="text-[11px] text-rose-800/80 dark:text-rose-400/80 leading-relaxed">
                        {sec.clinicalOrPhenotypeConnection.mechanism}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Quick Summary Footer Callout */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-950 to-stone-900 text-white border border-emerald-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold text-emerald-200">
            Ready to test your mastery of the Central Dogma?
          </h3>
          <p className="text-xs text-emerald-400">
            Jump into the interactive Knowledge Quiz or simulate live transcription and translation in the Live Lab.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
          >
            Back to Top ↑
          </a>
        </div>
      </div>
    </div>
  );
};
