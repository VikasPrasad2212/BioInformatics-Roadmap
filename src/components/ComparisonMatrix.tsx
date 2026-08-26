import React from 'react';
import { DOGMA_COMPARISONS, PROKARYOTE_VS_EUKARYOTE } from '../data/centralDogmaData';
import { Split, Sparkles, CheckCircle2 } from 'lucide-react';

export const ComparisonMatrix: React.FC = () => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-stone-900 border border-blue-900/40 text-stone-100 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono text-xs font-bold uppercase tracking-wider border border-blue-500/30">
              Comparative Analysis
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Dogma Comparison Matrix & Cellular Archetypes
          </h2>
          <p className="text-sm text-stone-300 max-w-2xl">
            Direct side-by-side breakdowns across the three fundamental steps of genetic transfer and the structural divergence between prokaryotic and eukaryotic life.
          </p>
        </div>
      </div>

      {/* Table 1: Replication vs Transcription vs Translation */}
      <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Split className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            Replication vs. Transcription vs. Translation
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-700 dark:text-stone-300">
                <th className="p-3.5 font-bold uppercase tracking-wider">Feature</th>
                <th className="p-3.5 font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  DNA Replication
                </th>
                <th className="p-3.5 font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  Transcription
                </th>
                <th className="p-3.5 font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  Translation
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-stone-700 dark:text-stone-300">
              {DOGMA_COMPARISONS.map((row, idx) => (
                <tr
                  key={row.feature}
                  className={idx % 2 === 0 ? 'bg-transparent' : 'bg-stone-50/50 dark:bg-stone-950/30'}
                >
                  <td className="p-3.5 font-bold text-stone-900 dark:text-stone-100">
                    {row.feature}
                  </td>
                  <td className="p-3.5 font-mono text-stone-800 dark:text-stone-200">
                    {row.replication}
                  </td>
                  <td className="p-3.5 font-mono text-stone-800 dark:text-stone-200">
                    {row.transcription}
                  </td>
                  <td className="p-3.5 font-mono text-stone-800 dark:text-stone-200">
                    {row.translation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table 2: Prokaryotes vs Eukaryotes */}
      <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            Prokaryotic vs. Eukaryotic Dogma Organization
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROKARYOTE_VS_EUKARYOTE.map((item) => (
            <div
              key={item.feature}
              className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-950/50 space-y-2.5"
            >
              <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                {item.feature}
              </h4>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-300">
                  <span className="font-bold block mb-0.5">🦠 Prokaryotes (Bacteria):</span>
                  <span>{item.prokaryote}</span>
                </div>
                <div className="p-2 rounded bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/40 text-purple-900 dark:text-purple-300">
                  <span className="font-bold block mb-0.5">🧬 Eukaryotes (Animals/Plants/Fungi):</span>
                  <span>{item.eukaryote}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
