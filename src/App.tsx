/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StepId } from './types';
import { CENTRAL_DOGMA_STEPS } from './data/centralDogmaData';
import { Header } from './components/Header';
import { OverviewView } from './components/OverviewView';
import { StepDetailView } from './components/StepDetailView';
import { InteractiveDogmaLab } from './components/InteractiveDogmaLab';
import { CodonExplorer } from './components/CodonExplorer';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { KnowledgeQuiz } from './components/KnowledgeQuiz';
import { FullVideoWalkthrough } from './components/FullVideoWalkthrough';
import { InfographicNotesView } from './components/InfographicNotesView';
import { ChemicalBondsView } from './components/ChemicalBondsView';
import { Molecule3DView } from './components/Molecule3DView';
import { AiCareerReadinessView } from './components/AiCareerReadinessView';
import { DictionaryView } from './components/DictionaryView';
import { Dna, ArrowUpRight, Sparkles } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<StepId | 'comparisons'>('overview');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark mode class to html/body
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const currentStep = CENTRAL_DOGMA_STEPS.find((s) => s.id === currentTab);

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col font-sans transition-colors selection:bg-emerald-500 selection:text-white">
      {/* Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentTab === 'overview' && (
          <OverviewView
            onSelectStep={(stepId) => {
              setCurrentTab(stepId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'molecule-3d' && <Molecule3DView />}

        {currentTab === 'ai-career' && <AiCareerReadinessView />}

        {currentTab === 'chemical-bonds' && <ChemicalBondsView />}

        {currentTab === 'dictionary' && (
          <DictionaryView
            onNavigateToTab={(tabId) => {
              setCurrentTab(tabId as any);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'infographic-notes' && <InfographicNotesView />}

        {currentTab === 'video-walkthrough' && <FullVideoWalkthrough />}

        {currentStep && (
          <StepDetailView
            step={currentStep}
            onNavigateStep={(stepId) => {
              setCurrentTab(stepId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoOverview={() => {
              setCurrentTab('overview');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'simulator' && <InteractiveDogmaLab />}

        {currentTab === 'codon-table' && <CodonExplorer />}

        {currentTab === 'comparisons' && <ComparisonMatrix />}

        {currentTab === 'quiz' && <KnowledgeQuiz />}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 py-6 text-xs text-stone-500 dark:text-stone-400 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
              🧬
            </div>
            <span className="font-semibold text-stone-800 dark:text-stone-200">
              Central Dogma Masterclass
            </span>
            <span>• High-Yield Molecular Biology & Genetics</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              onClick={() => {
                setCurrentTab('simulator');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Sequence Simulator
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setCurrentTab('codon-table');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Codon Table
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setCurrentTab('quiz');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Self-Quiz
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
