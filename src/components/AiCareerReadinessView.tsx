/**
 * AI-Proof Biologist & Biotech Career Masterclass
 * Equips students and researchers to master the biophysical first principles,
 * AI tool workflows, wet-lab closed-loop assays, and technical interview skills
 * required to land top biotech/pharma roles and remain irreplaceable by AI.
 */

import React, { useState } from 'react';
import {
  CAREER_MOATS,
  AI_FAILURE_CASES,
  BIOTECH_INTERVIEW_QUESTIONS,
  AI_BIOTECH_TOOLS,
  BIOINFORMATICS_ROADMAP,
  POPVAX_ROADMAP,
  CareerMoat,
  AiFailureCase,
  BiotechInterviewQuestion,
  RoadmapLevel
} from './aiCareerData';
import { ROADMAP_SOLUTIONS, POPVAX_ROADMAP_SOLUTIONS } from './roadmapSolutionsData';
import {
  ShieldCheck,
  Cpu,
  FlaskConical,
  Atom,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Volume2,
  VolumeX,
  Layers,
  ArrowRight,
  TrendingUp,
  Download,
  BookOpen,
  Award,
  Zap,
  Target,
  FileCheck,
  ChevronDown,
  ChevronUp,
  Briefcase,
  GraduationCap,
  ExternalLink,
  Code2,
  PlayCircle,
  FolderGit2,
  Copy,
  Check,
  Terminal,
  FileCode,
  Lightbulb,
  Eye,
  EyeOff
} from 'lucide-react';
import { createSoothingFemaleUtterance } from '../utils/voiceUtils';

export const AiCareerReadinessView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'roadmap' | 'moats' | 'failure-lab' | 'interview-sim' | 'tech-stack'>('roadmap');
  const [activeRoadmapTrack, setActiveRoadmapTrack] = useState<'general' | 'popvax'>('general');
  const [selectedRoadmapLevel, setSelectedRoadmapLevel] = useState<number>(1);
  const [selectedMoatId, setSelectedMoatId] = useState<string>(CAREER_MOATS[0].id);
  const [selectedFailureCaseId, setSelectedFailureCaseId] = useState<string>(AI_FAILURE_CASES[0].id);
  const [expandedInterviewQuestionId, setExpandedInterviewQuestionId] = useState<string | null>(BIOTECH_INTERVIEW_QUESTIONS[0].id);
  const [revealedAnswerIds, setRevealedAnswerIds] = useState<Set<string>>(new Set([BIOTECH_INTERVIEW_QUESTIONS[0].id]));
  const [isReadingAloud, setIsReadingAloud] = useState<boolean>(false);
  const [activeFilterCategory, setActiveFilterCategory] = useState<string>('All');
  
  // Exercise & Capstone Solutions UI State
  const [expandedExerciseIds, setExpandedExerciseIds] = useState<Set<string>>(new Set());
  const [isCapstoneSolutionOpen, setIsCapstoneSolutionOpen] = useState<boolean>(false);
  const [activeCapstoneFileIndex, setActiveCapstoneFileIndex] = useState<number>(0);
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);

  const activeRoadmapList = activeRoadmapTrack === 'popvax' ? POPVAX_ROADMAP : BIOINFORMATICS_ROADMAP;
  const activeSolutionsMap = activeRoadmapTrack === 'popvax' ? POPVAX_ROADMAP_SOLUTIONS : ROADMAP_SOLUTIONS;

  const currentRoadmap = activeRoadmapList.find((r) => r.levelNumber === selectedRoadmapLevel) || activeRoadmapList[0];
  const currentLevelSolutions = activeSolutionsMap[selectedRoadmapLevel] || activeSolutionsMap[1];
  const selectedMoat = CAREER_MOATS.find((m) => m.id === selectedMoatId) || CAREER_MOATS[0];
  const selectedFailureCase = AI_FAILURE_CASES.find((c) => c.id === selectedFailureCaseId) || AI_FAILURE_CASES[0];

  const toggleExerciseSolution = (exerciseId: string) => {
    setExpandedExerciseIds((prev) => {
      const next = new Set(prev);
      if (next.has(exerciseId)) {
        next.delete(exerciseId);
      } else {
        next.add(exerciseId);
      }
      return next;
    });
  };

  const copyToClipboard = (text: string, snippetId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippetId(snippetId);
    setTimeout(() => {
      setCopiedSnippetId((current) => (current === snippetId ? null : current));
    }, 2000);
  };

  const handleReadAloud = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    if (isReadingAloud) {
      window.speechSynthesis.cancel();
      setIsReadingAloud(false);
      return;
    }

    const utterance = createSoothingFemaleUtterance(text);
    utterance.onend = () => setIsReadingAloud(false);
    utterance.onerror = () => setIsReadingAloud(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsReadingAloud(true);
  };

  const toggleRevealAnswer = (id: string) => {
    setRevealedAnswerIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleDownloadPlaybook = () => {
    const content = `# The AI-Proof Biologist & Biotech Career Playbook
Created for Molecular Biology, Computational Therapeutics & PopVax Target Application

## Executive Summary: How to Be Irreplaceable in the Age of Generative AI (AlphaFold3, RFdiffusion, ESM-3)
AI models excel at pattern recognition on static crystalline databases, but fail at:
1. Predicting dynamic thermodynamic free energy (ΔG), conformational entropy, and allostery in solution.
2. Executing wet-lab active learning validation (Surface Plasmon Resonance, Cryo-EM, mass spec, deep mutational scanning).
3. Overcoming in vivo physiological delivery barriers (LNP pKa tuning, innate TLR3/7/8 evasion, nucleolytic stability).
4. Translating in silico designs into FDA IND-compliant, patentable biotherapeutics.

---
## TRACK 1: General AI Bioinformatician Learning Roadmap (Low to Advanced):
${BIOINFORMATICS_ROADMAP.map((lvl) => {
  const sol = ROADMAP_SOLUTIONS[lvl.levelNumber];
  return `### Stage ${lvl.levelNumber}: ${lvl.title} [${lvl.tier}]
- **Tagline**: ${lvl.tagline}
- **Overview**: ${lvl.description}
- **R & Python Competencies**:
${lvl.rAndPythonSkills.map((s) => `  * ${s}`).join('\n')}
- **Key Tools**:
${lvl.toolsToMaster.map((t) => `  * ${t.name} (${t.category}): ${t.useCase}`).join('\n')}
- **Free Learning Resources & YouTube Playlists**:
${lvl.freeResources.map((r) => `  * [${r.type}] ${r.title} (${r.providerOrChannel}) - ${r.url}: ${r.description}`).join('\n')}

#### Hands-On Practical Exercises & Executable Code Solutions:
${sol ? sol.exercises.map((ex, exIdx) => `##### Step ${exIdx + 1}: ${ex.title} [${ex.language}]
*Task Prompt*: ${ex.taskPrompt}

\`\`\`${ex.language.toLowerCase().includes('r') ? 'r' : 'python'}
${ex.codeSnippet}
\`\`\`

*Key Concepts*: ${ex.keyConcepts.join('; ')}
*Expected Output*:
\`\`\`
${ex.expectedOutput}
\`\`\`
*Execution Notes*: ${ex.executionNotes}
`).join('\n') : lvl.practicalExercises.map((e) => `* ${e}`).join('\n')}

#### Portfolio Capstone Project & Multi-File Architecture:
- **Title**: ${lvl.capstoneProject.title}
- **Overview**: ${lvl.capstoneProject.overview}
- **Deliverables**: ${lvl.capstoneProject.deliverables.join('; ')}
${sol ? `
*Architecture Breakdown*: ${sol.capstone.architectureOverview}

${sol.capstone.files.map((f) => `*File: \`${f.filename}\` (${f.language})* - ${f.description}
\`\`\`${f.language.toLowerCase().includes('r') ? 'r' : f.language.toLowerCase().includes('nextflow') ? 'groovy' : 'python'}
${f.code}
\`\`\`
`).join('\n')}

*GitHub README Template*:
\`\`\`markdown
${sol.capstone.githubReadmeSnippet}
\`\`\`

*Validation Checklist*:
${sol.capstone.validationChecklist.map((c) => `- [x] ${c}`).join('\n')}
` : ''}
`;
}).join('\n')}

---
## TRACK 2: PopVax-Targeted Roadmap (mRNA Therapeutics, Generative Protein Design & RNA Foundry Automation):
Target Job Reference: https://jobs.popvax.com/39342

${POPVAX_ROADMAP.map((lvl) => {
  const sol = POPVAX_ROADMAP_SOLUTIONS[lvl.levelNumber];
  return `### Stage ${lvl.levelNumber}: ${lvl.title} [${lvl.tier}]
- **Tagline**: ${lvl.tagline}
- **Overview**: ${lvl.description}
- **R & Python Competencies**:
${lvl.rAndPythonSkills.map((s) => `  * ${s}`).join('\n')}
- **Key Tools**:
${lvl.toolsToMaster.map((t) => `  * ${t.name} (${t.category}): ${t.useCase}`).join('\n')}
- **Free Learning Resources & YouTube Playlists**:
${lvl.freeResources.map((r) => `  * [${r.type}] ${r.title} (${r.providerOrChannel}) - ${r.url}: ${r.description}`).join('\n')}

#### Hands-On Practical Exercises & Executable Code Solutions:
${sol ? sol.exercises.map((ex, exIdx) => `##### Step ${exIdx + 1}: ${ex.title} [${ex.language}]
*Task Prompt*: ${ex.taskPrompt}

\`\`\`${ex.language.toLowerCase().includes('r') ? 'r' : 'python'}
${ex.codeSnippet}
\`\`\`

*Key Concepts*: ${ex.keyConcepts.join('; ')}
*Expected Output*:
\`\`\`
${ex.expectedOutput}
\`\`\`
*Execution Notes*: ${ex.executionNotes}
`).join('\n') : lvl.practicalExercises.map((e) => `* ${e}`).join('\n')}

#### Portfolio Capstone Project & Multi-File Architecture:
- **Title**: ${lvl.capstoneProject.title}
- **Overview**: ${lvl.capstoneProject.overview}
- **Deliverables**: ${lvl.capstoneProject.deliverables.join('; ')}
${sol ? `
*Architecture Breakdown*: ${sol.capstone.architectureOverview}

${sol.capstone.files.map((f) => `*File: \`${f.filename}\` (${f.language})* - ${f.description}
\`\`\`${f.language.toLowerCase().includes('r') ? 'r' : f.language.toLowerCase().includes('nextflow') ? 'groovy' : 'python'}
${f.code}
\`\`\`
`).join('\n')}

*GitHub README Template*:
\`\`\`markdown
${sol.capstone.githubReadmeSnippet}
\`\`\`

*Validation Checklist*:
${sol.capstone.validationChecklist.map((c) => `- [x] ${c}`).join('\n')}
` : ''}
`;
}).join('\n')}

---
## The 5 Career Moats:
${CAREER_MOATS.map(
  (m) => `### ${m.title} (${m.badge})
- **Human Superpower**: ${m.humanSuperpower}
- **Why Pure AI Fails**: ${m.whyAiFailsAlone}
- **Key Skills**: ${m.actionableSkills.join(', ')}
- **Salary Tier**: ${m.salaryTier}
`
).join('\n')}

---
## Real-World AI Failure Modes to Master:
${AI_FAILURE_CASES.map(
  (c) => `### ${c.title}
- **Tool**: ${c.aiTool}
- **In Vivo Failure**: ${c.whyItFailsInVivo}
- **Biophysical Principle**: ${c.biophysicalPrinciple}
- **Corrective Strategy**: ${c.correctiveStrategy}
- **Validation Assay**: ${c.validationAssay}
`
).join('\n')}

---
## High-Yield Interview Masterclass:
${BIOTECH_INTERVIEW_QUESTIONS.map(
  (q) => `### Role: ${q.roleTarget}
**Question**: ${q.question}
**High-Yield Keywords**: ${q.highYieldKeywords.join(', ')}
**Model Summary**: ${q.modelAnswerSummary}
`
).join('\n')}
`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'AI_Proof_Biologist_Career_Playbook.md';
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredInterviewQuestions =
    activeFilterCategory === 'All'
      ? BIOTECH_INTERVIEW_QUESTIONS
      : BIOTECH_INTERVIEW_QUESTIONS.filter((q) => q.category === activeFilterCategory);

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-mono font-bold border border-purple-500/30">
              <Cpu className="w-3.5 h-3.5" />
              <span>AI-Era Biotech Career & Technical Interview Mastery</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              The AI-Proof Biologist: Landing High-Impact Biotech Roles
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Why generative AI (AlphaFold 3, RFdiffusion, ESM-3) empowers rather than replaces biophysically grounded scientists. Master the 5 career moats, diagnose in silico AI failure modes, and excel in technical interviews across Big Pharma and venture-backed biotech.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() =>
                handleReadAloud(
                  `Welcome to the AI-Proof Biologist Masterclass. In the era of AlphaFold3 and generative models, the most valuable scientists are those who bridge first-principles biophysics, closed-loop wet-lab validation, and therapeutic delivery chemistry.`
                )
              }
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shadow-md ${
                isReadingAloud
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-700'
              }`}
            >
              {isReadingAloud ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-purple-400" />}
              <span>{isReadingAloud ? 'Stop Voice' : 'Audio Briefing'}</span>
            </button>

            <button
              onClick={handleDownloadPlaybook}
              className="px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-md hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span>Download Career Playbook (.md)</span>
            </button>
          </div>
        </div>

        {/* View Switcher Sub-Tabs */}
        <div className="mt-6 pt-6 border-t border-stone-800 flex items-center gap-2 overflow-x-auto scrollbar-thin">
          <button
            onClick={() => setActiveSubTab('roadmap')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 transition-all ${
              activeSubTab === 'roadmap' ? 'bg-purple-600 text-white shadow-lg ring-2 ring-purple-400/50' : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Bioinformatician Roadmap (Low → Advanced)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('moats')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 transition-all ${
              activeSubTab === 'moats' ? 'bg-purple-600 text-white shadow-lg' : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>The 5 Career Moats</span>
          </button>

          <button
            onClick={() => setActiveSubTab('failure-lab')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 transition-all ${
              activeSubTab === 'failure-lab' ? 'bg-purple-600 text-white shadow-lg' : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>AI vs. Wet-Lab Failure Simulator</span>
          </button>

          <button
            onClick={() => setActiveSubTab('interview-sim')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 transition-all ${
              activeSubTab === 'interview-sim' ? 'bg-purple-600 text-white shadow-lg' : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Biotech Technical Interview Simulator</span>
          </button>

          <button
            onClick={() => setActiveSubTab('tech-stack')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 transition-all ${
              activeSubTab === 'tech-stack' ? 'bg-purple-600 text-white shadow-lg' : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Modern AI-Biotech Tool Stack</span>
          </button>
        </div>
      </div>

      {/* 0. AI BIOINFORMATICIAN ROADMAP TAB (RANKED LOW TO ADVANCED) */}
      {activeSubTab === 'roadmap' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Track Switcher (General vs. PopVax Target Track) */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-4 sm:p-6 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-400">Roadmap Curriculum Track</span>
                <h2 className="text-lg sm:text-xl font-extrabold text-white">Choose Your Specialization Path</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveRoadmapTrack('general');
                    setSelectedRoadmapLevel(1);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeRoadmapTrack === 'general'
                      ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-400/50'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>General AI Bioinformatician</span>
                </button>
                <button
                  onClick={() => {
                    setActiveRoadmapTrack('popvax');
                    setSelectedRoadmapLevel(1);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeRoadmapTrack === 'popvax'
                      ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400/50'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>PopVax Target Track (mRNA & Protein AI)</span>
                </button>
              </div>
            </div>

            {/* Track Info Card */}
            {activeRoadmapTrack === 'general' ? (
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
                    <span>CS50 R & BioPython → Full-Stack AI Bioinformatician</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white">
                    4-Stage General Biotech & Computational Therapeutics Path
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 max-w-3xl">
                    Ranked progressive mastery: Master classical sequence & Bioconductor R pipelines, scale into scRNA-seq & autoencoders, fine-tune Protein Language Models (ESM-2), and deploy AlphaFold 3 / RFdiffusion in Nextflow cloud pipelines.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-purple-900/60 border border-purple-500/30 text-purple-200">
                    4 Tiered Levels • Free Courses • YouTube • Capstones
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <Target className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Direct Role Target: PopVax Computational Biologist</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-white">
                      PopVax Custom Track: mRNA Engineering, Protein Design & RNA Foundry Automation
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-300 max-w-3xl">
                      Tailored specifically to PopVax’s tech stack: Viral antigen mining, mRNA sequence optimization & ViennaRNA MFE thermostability, generative protein nanoparticle display (ESM-2/ProteinMPNN), analytical HPLC/CGE quality control, and closed-loop robotic automation with PyLabRobot and Nextflow.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href="https://jobs.popvax.com/39342"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md hover:scale-105"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View PopVax Job Posting (39342)</span>
                    </a>
                  </div>
                </div>

                {/* PopVax Application Intel & Moat Checklist */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-stone-850 border border-stone-700/60 space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">Moat 1: mRNA Engineering</span>
                    <h4 className="text-xs font-extrabold text-white">ViennaRNA MFE & CAI Optimization</h4>
                    <p className="text-[11px] text-stone-300">
                      Show you understand why CAI=1.0 is flawed and how to engineer secondary structures for room-temperature thermostable mRNA vaccines.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-stone-850 border border-stone-700/60 space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-wider">Moat 2: Generative Biologics</span>
                    <h4 className="text-xs font-extrabold text-white">ESM-2 & Nanoparticle Design</h4>
                    <p className="text-[11px] text-stone-300">
                      Deploy ProteinMPNN and ESM-2 zero-shot ΔLLR to engineer self-assembling 60-mer icosahedral nanoparticles displaying viral epitopes.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-stone-850 border border-stone-700/60 space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">Moat 3: RNA Foundry Loop</span>
                    <h4 className="text-xs font-extrabold text-white">HPLC Deconvolution & PyLabRobot</h4>
                    <p className="text-[11px] text-stone-300">
                      Bridge dry-lab to wet-lab by automating HPLC chromatogram peak integration and liquid handler 96-well LNP screening protocols.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Level Selection Cards (Ranked 1 to 4) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {activeRoadmapList.map((lvl) => {
              const isSelected = selectedRoadmapLevel === lvl.levelNumber;
              return (
                <button
                  key={lvl.id}
                  onClick={() => setSelectedRoadmapLevel(lvl.levelNumber)}
                  className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between gap-3 ${
                    isSelected
                      ? activeRoadmapTrack === 'popvax'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 shadow-md ring-2 ring-emerald-500/40'
                        : 'bg-purple-50 dark:bg-purple-950/40 border-purple-500 shadow-md ring-2 ring-purple-500/40'
                      : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                      Level {lvl.levelNumber}
                    </span>
                    <span
                      className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ${
                        lvl.levelNumber === 1
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : lvl.levelNumber === 2
                          ? 'bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300'
                          : lvl.levelNumber === 3
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                          : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                      }`}
                    >
                      {lvl.tier}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100 leading-tight">
                      {lvl.title.split(': ')[1] || lvl.title}
                    </h3>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">
                      {lvl.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Level Deep Dive View */}
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 space-y-8 shadow-xs animate-in fade-in duration-200">
            {/* Header of Selected Level */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
              <div className="space-y-1 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                    Stage {currentRoadmap.levelNumber} of 4
                  </span>
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                    Difficulty: {currentRoadmap.tier}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100">
                  {currentRoadmap.title}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                  {currentRoadmap.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() =>
                    handleReadAloud(
                      `${currentRoadmap.title}. In this stage, you will master ${currentRoadmap.tagline}. Key tools include ${currentRoadmap.toolsToMaster
                        .map((t) => t.name)
                        .join(', ')}.`
                    )
                  }
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 flex items-center gap-1.5 transition-all"
                >
                  <Volume2 className="w-3.5 h-3.5 text-purple-500" />
                  <span>Listen to Overview</span>
                </button>
              </div>
            </div>

            {/* R & Python Skills + Essential Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* R & Python Skills */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 font-mono flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-purple-500" />
                  R & Python Programming Competencies
                </h4>
                <div className="space-y-2">
                  {currentRoadmap.rAndPythonSkills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs text-stone-800 dark:text-stone-200 font-mono leading-relaxed"
                    >
                      <span className="text-purple-600 dark:text-purple-400 font-bold mr-1.5">▸</span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools to Master */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 font-mono flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-blue-500" />
                  Software, Packages & Foundation Models
                </h4>
                <div className="space-y-2">
                  {currentRoadmap.toolsToMaster.map((tool, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 flex flex-col justify-between gap-1 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-stone-900 dark:text-stone-100 font-mono">
                          {tool.name}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold">
                          {tool.category}
                        </span>
                      </div>
                      <p className="text-stone-600 dark:text-stone-400 text-[11px] leading-normal">
                        {tool.useCase}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Free Courses & YouTube Video Resources */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 font-mono flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-500" />
                  Recommended Free Courses, YouTube Playlists & Books
                </h4>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  100% Free / Open-Access
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {currentRoadmap.freeResources.map((res, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-2.5 flex flex-col justify-between hover:border-purple-300 dark:hover:border-purple-800 transition-all"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                            res.type === 'Free Course'
                              ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300'
                              : res.type === 'YouTube Video / Playlist'
                              ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                              : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          }`}
                        >
                          {res.type}
                        </span>
                        <span className="text-[10px] text-stone-500 dark:text-stone-400 font-mono truncate">
                          {res.providerOrChannel}
                        </span>
                      </div>

                      <h5 className="text-xs font-extrabold text-stone-900 dark:text-stone-100 leading-snug">
                        {res.title}
                      </h5>

                      <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                        {res.description}
                      </p>
                    </div>

                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 pt-2 border-t border-stone-200 dark:border-stone-800"
                    >
                      <span>Open Learning Resource</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Practical Coding Exercises with Solutions */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 font-mono flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  Hands-On Practical Coding Exercises & Solutions
                </h4>
                <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400 font-bold">
                  Click to Expand Full Working Code
                </span>
              </div>

              <div className="space-y-3">
                {currentLevelSolutions.exercises.map((ex, idx) => {
                  const isExpanded = expandedExerciseIds.has(ex.id);
                  const isCopied = copiedSnippetId === ex.id;
                  return (
                    <div
                      key={ex.id}
                      className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950 overflow-hidden transition-all"
                    >
                      {/* Exercise Header / Question Bar */}
                      <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-50 dark:bg-stone-900/80">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-mono font-bold shrink-0">
                              Step {idx + 1}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[10px] font-mono font-bold shrink-0">
                              {ex.language}
                            </span>
                            <h5 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                              {ex.title.split(': ')[1] || ex.title}
                            </h5>
                          </div>
                          <p className="text-xs text-stone-600 dark:text-stone-300 font-mono leading-relaxed pl-1">
                            {ex.taskPrompt}
                          </p>
                        </div>

                        <button
                          onClick={() => toggleExerciseSolution(ex.id)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono shrink-0 flex items-center gap-1.5 transition-all ${
                            isExpanded
                              ? 'bg-purple-600 text-white shadow-sm'
                              : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-700 hover:border-purple-400'
                          }`}
                        >
                          {isExpanded ? (
                            <>
                              <EyeOff className="w-3.5 h-3.5" />
                              <span>Hide Solution</span>
                            </>
                          ) : (
                            <>
                              <Code2 className="w-3.5 h-3.5 text-purple-500" />
                              <span>View Solution Code</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Expanded Solution Drawer */}
                      {isExpanded && (
                        <div className="p-4 sm:p-6 space-y-4 border-t border-stone-200 dark:border-stone-800 bg-stone-900 text-stone-100 animate-in fade-in duration-200">
                          {/* Code Header Bar */}
                          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                            <div className="flex items-center gap-2">
                              <FileCode className="w-4 h-4 text-purple-400" />
                              <span className="text-xs font-mono font-bold text-stone-300">
                                Reference Implementation ({ex.language})
                              </span>
                              <span className="text-[10px] font-mono text-stone-500 hidden sm:inline">
                                • {ex.executionNotes}
                              </span>
                            </div>

                            <button
                              onClick={() => copyToClipboard(ex.codeSnippet, ex.id)}
                              className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center gap-1.5 border border-stone-700 transition-all"
                            >
                              {isCopied ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  <span className="text-emerald-400">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5 text-stone-400" />
                                  <span>Copy Code</span>
                                </>
                              )}
                            </button>
                          </div>

                          {/* Code Viewer */}
                          <div className="relative rounded-xl overflow-hidden bg-black/70 border border-stone-800">
                            <pre className="p-4 text-xs font-mono text-stone-200 overflow-x-auto leading-relaxed scrollbar-thin">
                              <code>{ex.codeSnippet}</code>
                            </pre>
                          </div>

                          {/* Key Concepts Grid */}
                          <div className="space-y-1.5 pt-1">
                            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300">
                              <Lightbulb className="w-3.5 h-3.5" />
                              <span>Key Computational & Biological Concepts:</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {ex.keyConcepts.map((concept, cIdx) => (
                                <div
                                  key={cIdx}
                                  className="p-2.5 rounded-xl bg-stone-800/80 border border-stone-700/60 text-[11px] text-stone-300 leading-snug"
                                >
                                  <span className="text-amber-400 font-bold mr-1.5">✓</span>
                                  {concept}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Expected Output Console */}
                          <div className="space-y-1.5 pt-1">
                            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-stone-400">
                              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Expected Terminal Execution Output:</span>
                            </div>
                            <pre className="p-3.5 rounded-xl bg-black/80 border border-stone-800 text-[11px] font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-tight">
                              {ex.expectedOutput}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Portfolio Capstone Project with Full Architecture */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-950/40 via-stone-900 to-stone-900 border border-purple-500/40 space-y-5 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-purple-400" />
                  <span className="text-xs font-mono uppercase font-bold text-purple-300">
                    Stage {currentRoadmap.levelNumber} Portfolio Capstone Project for GitHub & Interviews
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
                    Production Portfolio Grade
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-extrabold text-white">
                  {currentRoadmap.capstoneProject.title}
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed">
                  {currentRoadmap.capstoneProject.overview}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-stone-800">
                <span className="text-[11px] font-mono font-bold uppercase text-stone-400">
                  Target Portfolio Deliverables:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300">
                  {currentRoadmap.capstoneProject.deliverables.map((deliv, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2 p-2 rounded-xl bg-stone-800/40 border border-stone-700/50">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Capstone Code Solution Toggle */}
              <div className="pt-2">
                <button
                  onClick={() => setIsCapstoneSolutionOpen((prev) => !prev)}
                  className={`w-full py-3 px-4 rounded-2xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all ${
                    isCapstoneSolutionOpen
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-stone-800 hover:bg-stone-700 text-purple-300 border border-purple-500/30 hover:border-purple-400'
                  }`}
                >
                  <FolderGit2 className="w-4 h-4 text-amber-300" />
                  <span>
                    {isCapstoneSolutionOpen
                      ? 'Hide Multi-File Capstone Architecture & Code'
                      : 'Explore Multi-File Capstone Project Implementation & Code'}
                  </span>
                  {isCapstoneSolutionOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Multi-File Capstone Drawer */}
              {isCapstoneSolutionOpen && currentLevelSolutions.capstone && (
                <div className="p-5 sm:p-6 rounded-2xl bg-stone-950 border border-purple-500/30 space-y-5 animate-in fade-in duration-300">
                  {/* Architecture Overview */}
                  <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/40 space-y-1">
                    <span className="text-xs font-mono font-bold text-purple-300 flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-purple-400" />
                      End-to-End Pipeline Architecture:
                    </span>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      {currentLevelSolutions.capstone.architectureOverview}
                    </p>
                  </div>

                  {/* File Tabs */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin pb-1">
                        {currentLevelSolutions.capstone.files.map((file, fIdx) => (
                          <button
                            key={fIdx}
                            onClick={() => setActiveCapstoneFileIndex(fIdx)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 shrink-0 transition-all ${
                              activeCapstoneFileIndex === fIdx
                                ? 'bg-purple-600 text-white shadow-md'
                                : 'bg-stone-800 text-stone-300 hover:bg-stone-700 border border-stone-700'
                            }`}
                          >
                            <FileCode className="w-3.5 h-3.5 text-purple-300" />
                            <span>{file.filename}</span>
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          const activeFile = currentLevelSolutions.capstone.files[activeCapstoneFileIndex];
                          if (activeFile) {
                            copyToClipboard(activeFile.code, `capstone-${activeFile.filename}`);
                          }
                        }}
                        className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center gap-1.5 border border-stone-700 transition-all"
                      >
                        {copiedSnippetId === `capstone-${currentLevelSolutions.capstone.files[activeCapstoneFileIndex]?.filename}` ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">File Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-stone-400" />
                            <span>Copy Active File</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Active File Display */}
                    {currentLevelSolutions.capstone.files[activeCapstoneFileIndex] && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono text-stone-400 px-1">
                          <span>
                            {currentLevelSolutions.capstone.files[activeCapstoneFileIndex].description}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-purple-900/60 text-purple-300 text-[10px] font-bold">
                            {currentLevelSolutions.capstone.files[activeCapstoneFileIndex].language}
                          </span>
                        </div>

                        <div className="rounded-xl overflow-hidden bg-black/80 border border-stone-800">
                          <pre className="p-4 text-xs font-mono text-stone-200 overflow-x-auto leading-relaxed scrollbar-thin">
                            <code>{currentLevelSolutions.capstone.files[activeCapstoneFileIndex].code}</code>
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* GitHub README Snippet & Validation Checklist */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-stone-800">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-stone-300 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                          GitHub README Documentation:
                        </span>
                        <button
                          onClick={() => copyToClipboard(currentLevelSolutions.capstone.githubReadmeSnippet, 'capstone-readme')}
                          className="text-[10px] font-mono text-purple-400 hover:text-purple-300 flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copy README</span>
                        </button>
                      </div>
                      <pre className="p-3.5 rounded-xl bg-black/70 border border-stone-800 text-[11px] font-mono text-stone-300 overflow-x-auto max-h-40 leading-snug">
                        {currentLevelSolutions.capstone.githubReadmeSnippet}
                      </pre>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-mono font-bold text-stone-300 flex items-center gap-1.5">
                        <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                        Portfolio Validation Checklist:
                      </span>
                      <div className="space-y-1.5">
                        {currentLevelSolutions.capstone.validationChecklist.map((chk, cIdx) => (
                          <div
                            key={cIdx}
                            className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-[11px] font-mono text-stone-300 flex items-center gap-2"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{chk}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 1. THE 5 CAREER MOATS TAB */}
      {activeSubTab === 'moats' && (
        <div className="space-y-6">
          {/* Moat Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {CAREER_MOATS.map((moat, idx) => {
              const isSelected = selectedMoatId === moat.id;
              return (
                <button
                  key={moat.id}
                  onClick={() => setSelectedMoatId(moat.id)}
                  className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-500 shadow-md ring-1 ring-purple-500/40'
                      : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                      Moat #{idx + 1}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: moat.color }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100 leading-tight">
                      {moat.title}
                    </h3>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">
                      {moat.badge}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Moat Deep Dive Card */}
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 space-y-6 shadow-xs animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {selectedMoat.badge}
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100">
                  {selectedMoat.title}
                </h2>
                <p className="text-sm text-stone-600 dark:text-stone-300 font-medium">
                  {selectedMoat.tagline}
                </p>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 p-3.5 rounded-2xl shrink-0">
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-800 dark:text-emerald-300 block">
                  Industry Salary Benchmark
                </span>
                <span className="text-sm font-extrabold text-emerald-900 dark:text-emerald-100">
                  {selectedMoat.salaryTier}
                </span>
              </div>
            </div>

            {/* Why AI Fails Alone vs Human Superpower Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Why AI Fails */}
              <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-2xl p-5 space-y-2.5">
                <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-xs uppercase font-mono">
                  <AlertTriangle className="w-4 h-4" />
                  Why Pure AI Fails Alone
                </div>
                <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
                  {selectedMoat.whyAiFailsAlone}
                </p>
              </div>

              {/* Human Superpower */}
              <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl p-5 space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs uppercase font-mono">
                  <Sparkles className="w-4 h-4" />
                  The Human Scientist's Irreplaceable Moat
                </div>
                <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
                  {selectedMoat.humanSuperpower}
                </p>
              </div>
            </div>

            {/* Actionable Skills & Industry Applications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-500" />
                  Essential High-Yield Technical Skills
                </h4>
                <div className="space-y-2">
                  {selectedMoat.actionableSkills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs text-stone-800 dark:text-stone-200 flex items-start gap-2.5 font-mono"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 font-mono flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-500" />
                  Top Industry Programs & Companies Hiring
                </h4>
                <div className="space-y-2">
                  {selectedMoat.industryApplications.map((app, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs text-stone-800 dark:text-stone-200 flex items-start gap-2.5"
                    >
                      <ArrowRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <span>{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. AI VS WET-LAB FAILURE SIMULATOR */}
      {activeSubTab === 'failure-lab' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Select an In Silico AI Failure Mode Scenario to Diagnose
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {AI_FAILURE_CASES.map((c) => {
                const isSelected = selectedFailureCaseId === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedFailureCaseId(c.id)}
                    className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between gap-2 ${
                      isSelected
                        ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 shadow-sm ring-1 ring-amber-500/40'
                        : 'bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                        {c.aiTool}
                      </span>
                      <span
                        className={`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded ${
                          c.difficulty === 'Industry Expert'
                            ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                            : c.difficulty === 'Advanced'
                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                            : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                        }`}
                      >
                        {c.difficulty}
                      </span>
                    </div>
                    <span className={`text-xs font-bold leading-tight ${isSelected ? 'text-amber-900 dark:text-amber-100' : 'text-stone-800 dark:text-stone-200'}`}>
                      {c.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Diagnostic Panel */}
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 space-y-6 shadow-xs animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
              <div>
                <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                  Case Study: {selectedFailureCase.aiTool}
                </span>
                <h3 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">
                  {selectedFailureCase.title}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 self-start">
                Difficulty: {selectedFailureCase.difficulty}
              </span>
            </div>

            {/* Scenario and AI Output */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-1.5">
                <h4 className="text-xs font-bold font-mono text-stone-500 uppercase">The Scenario & AI Prediction</h4>
                <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-medium">
                  {selectedFailureCase.scenario}
                </p>
                <div className="mt-2 pt-2 border-t border-stone-200 dark:border-stone-800 text-xs font-mono text-stone-600 dark:text-stone-400">
                  <span className="font-bold text-blue-600 dark:text-blue-400">AI Model Output: </span>
                  {selectedFailureCase.aiOutput}
                </div>
              </div>

              {/* The In Vivo Failure Trap & Biophysical Root Cause */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 space-y-2">
                  <div className="text-xs font-bold font-mono text-rose-800 dark:text-rose-300 flex items-center gap-2 uppercase">
                    <AlertTriangle className="w-4 h-4" />
                    Why It Fails in Living Cells / In Vivo
                  </div>
                  <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
                    {selectedFailureCase.whyItFailsInVivo}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50 space-y-2">
                  <div className="text-xs font-bold font-mono text-purple-800 dark:text-purple-300 flex items-center gap-2 uppercase">
                    <Atom className="w-4 h-4" />
                    Underlying Biophysical Principle
                  </div>
                  <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-mono">
                    {selectedFailureCase.biophysicalPrinciple}
                  </p>
                </div>
              </div>

              {/* Corrective Strategy & Wet-Lab Validation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
                  <div className="text-xs font-bold font-mono text-emerald-800 dark:text-emerald-300 flex items-center gap-2 uppercase">
                    <CheckCircle2 className="w-4 h-4" />
                    The Human Scientist's Corrective Strategy
                  </div>
                  <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
                    {selectedFailureCase.correctiveStrategy}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900/50 space-y-2">
                  <div className="text-xs font-bold font-mono text-sky-800 dark:text-sky-300 flex items-center gap-2 uppercase">
                    <FlaskConical className="w-4 h-4" />
                    Required Physical Laboratory Validation Assay
                  </div>
                  <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-mono">
                    {selectedFailureCase.validationAssay}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. BIOTECH TECHNICAL INTERVIEW SIMULATOR */}
      {activeSubTab === 'interview-sim' && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {['All', 'Structural Bio AI', 'mRNA & Oligo Therapeutics', 'Protein Design', 'Gene Editing & NGS', 'Biologics & Analytics'].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilterCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      activeFilterCategory === cat
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-400'
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>

            <span className="text-xs font-mono text-stone-500">
              Showing {filteredInterviewQuestions.length} Questions
            </span>
          </div>

          {/* Questions Accordion List */}
          <div className="space-y-4">
            {filteredInterviewQuestions.map((item) => {
              const isExpanded = expandedInterviewQuestionId === item.id;
              const isRevealed = revealedAnswerIds.has(item.id);

              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-xs space-y-4 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[10px] font-mono font-bold">
                          {item.category}
                        </span>
                        <span className="text-xs font-mono text-stone-500 font-bold">
                          Target Role: {item.roleTarget}
                        </span>
                      </div>
                      <h3 className="text-base font-extrabold text-stone-900 dark:text-stone-100 leading-snug">
                        {item.question}
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400 italic">
                        Context: {item.context}
                      </p>
                    </div>

                    <button
                      onClick={() => setExpandedInterviewQuestionId(isExpanded ? null : item.id)}
                      className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 shrink-0"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* High Yield Keyword Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] font-mono uppercase text-stone-400 font-bold mr-1">
                      Target Keywords:
                    </span>
                    {item.highYieldKeywords.map((kw, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-[11px] font-mono font-medium"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>

                  {/* Expanded Answer and Rubric */}
                  {isExpanded && (
                    <div className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold font-mono uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                          <Target className="w-4 h-4" />
                          Model Answer & Technical Scoring Rubric
                        </h4>

                        <button
                          onClick={() => toggleRevealAnswer(item.id)}
                          className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
                        >
                          {isRevealed ? 'Hide Detailed Answer' : 'Reveal Detailed Answer'}
                        </button>
                      </div>

                      {isRevealed && (
                        <div className="space-y-3">
                          {/* Model Answer Summary */}
                          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-1">
                            <span className="text-[10px] font-mono font-bold uppercase text-emerald-800 dark:text-emerald-300">
                              30-Second Executive Summary for the Interviewer
                            </span>
                            <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-medium">
                              {item.modelAnswerSummary}
                            </p>
                          </div>

                          {/* Detailed Biophysical Breakdown */}
                          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-1">
                            <span className="text-[10px] font-mono font-bold uppercase text-stone-500">
                              Deep-Dive Technical Explanation
                            </span>
                            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                              {item.detailedExplanation}
                            </p>
                          </div>

                          {/* Pitfalls to Avoid */}
                          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 space-y-2">
                            <span className="text-[10px] font-mono font-bold uppercase text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              Fatal Interview Traps / Red Flags to Avoid
                            </span>
                            <ul className="space-y-1 text-xs text-stone-700 dark:text-stone-300">
                              {item.pitfallsToAvoid.map((pitfall, pIdx) => (
                                <li key={pIdx} className="flex items-start gap-2">
                                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                                  <span>{pitfall}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. MODERN AI-BIOTECH TOOL STACK */}
      {activeSubTab === 'tech-stack' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 space-y-6 shadow-xs">
            <div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-purple-500" />
                The Modern 10x AI-Biotech Tool Stack Matrix
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
                How elite computational and wet-lab scientists harness state-of-the-art biological foundation models to accelerate discovery without falling for black-box traps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {AI_BIOTECH_TOOLS.map((tool, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-3.5 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                        {tool.name}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold">
                        {tool.category}
                      </span>
                    </div>

                    <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                      <strong className="text-stone-900 dark:text-stone-100">Core Capability: </strong>
                      {tool.coreCapability}
                    </p>

                    <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-900 dark:text-rose-200 space-y-1">
                      <span className="font-bold font-mono text-[10px] uppercase block">
                        Known In Silico Blindspot:
                      </span>
                      <span>{tool.knownLimitations}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
                      <span className="font-bold font-mono text-[10px] uppercase block">
                        How Human Engineers Win & Validate:
                      </span>
                      <span>{tool.howHumanEngineersWin}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-200 dark:border-stone-800 text-[11px] font-mono text-stone-600 dark:text-stone-400">
                    <span className="font-bold text-purple-600 dark:text-purple-400">Standard SOP Workflow: </span>
                    {tool.recommendedWorkflow}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
