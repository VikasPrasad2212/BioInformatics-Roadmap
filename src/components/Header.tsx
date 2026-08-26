import React, { useState } from 'react';
import { StepId } from '../types';
import {
  Dna,
  FileText,
  Scissors,
  Cpu,
  Shapes,
  FlaskConical,
  BookOpen,
  Award,
  Split,
  Moon,
  Sun,
  Menu,
  X,
  Video,
  Atom,
  Library,
  Rotate3d,
  Briefcase,
} from 'lucide-react';

interface HeaderProps {
  currentTab: StepId | 'comparisons';
  onSelectTab: (tab: StepId | 'comparisons') => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  isDarkMode,
  onToggleTheme,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'overview' as const, label: 'Overview', icon: Dna },
    { id: 'molecule-3d' as const, label: '🧊 3D Molecule', icon: Rotate3d },
    { id: 'ai-career' as const, label: '🤖 AI-Proof Career', icon: Briefcase },
    { id: 'chemical-bonds' as const, label: '🧪 Chemical Bonds', icon: Atom },
    { id: 'dictionary' as const, label: '📖 Dictionary', icon: Library },
    { id: 'infographic-notes' as const, label: '📑 Notes & Infographics', icon: BookOpen },
    { id: 'video-walkthrough' as const, label: '🎬 Video & Audio', icon: Video },
    { id: 'replication' as const, label: '1. Replication', icon: Dna },
    { id: 'transcription' as const, label: '2. Transcription', icon: FileText },
    { id: 'rna-processing' as const, label: '3. RNA Splicing', icon: Scissors },
    { id: 'translation' as const, label: '4. Translation', icon: Cpu },
    { id: 'folding' as const, label: '5. Folding & Exceptions', icon: Shapes },
    { id: 'simulator' as const, label: '⚡ Live Lab', icon: FlaskConical },
    { id: 'codon-table' as const, label: 'Codon Table', icon: BookOpen },
    { id: 'comparisons' as const, label: 'Matrix', icon: Split },
    { id: 'quiz' as const, label: 'Quiz', icon: Award },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div
            onClick={() => onSelectTab('overview')}
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center shadow-md">
              <Dna className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100 tracking-tight block leading-none">
                Central Dogma
              </span>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                DNA ➔ RNA ➔ Protein
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500/40 shadow-xs'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="xl:hidden py-3 border-t border-stone-200 dark:border-stone-800 grid grid-cols-2 sm:grid-cols-3 gap-1.5 animate-in slide-in-from-top duration-200">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 text-left transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
