export type StepId =
  | 'overview'
  | 'molecule-3d'
  | 'ai-career'
  | 'chemical-bonds'
  | 'dictionary'
  | 'infographic-notes'
  | 'video-walkthrough'
  | 'replication'
  | 'transcription'
  | 'rna-processing'
  | 'translation'
  | 'folding'
  | 'simulator'
  | 'codon-table'
  | 'quiz';

export interface InfographicSection {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  badge: string;
  color: string;
  category: 'core-dogma' | 'dna-structure' | 'replication' | 'transcription' | 'rna-splicing' | 'translation' | 'protein-folding' | 'genetics-mutations';
  overview: string;
  highYieldBullets: string[];
  keyMnemonic?: {
    phrase: string;
    meaning: string;
    explanation: string;
  };
  molecularKeyStats: {
    label: string;
    value: string;
    sublabel?: string;
  }[];
  clinicalOrPhenotypeConnection?: {
    title: string;
    geneOrDisease: string;
    mechanism: string;
    significance: string;
  };
  infographicDiagramType: 'central-flow' | 'dna-helix' | 'replication-fork' | 'transcription-bubble' | 'rna-splicing-lariat' | 'ribosome-translation' | 'protein-hierarchy' | 'mutation-spectrum';
}

export interface EnzymePlayer {
  name: string;
  category: string;
  role: string;
  mechanism: string;
  location: string;
  funFact?: string;
}

export interface StepHotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  label: string;
  description: string;
}

export interface DogmaStep {
  id: StepId;
  stepNumber: number;
  title: string;
  subtitle: string;
  shortTag: string;
  imageSrc: string;
  imageAlt: string;
  location: string;
  cellularPhase: string;
  summary: string;
  whyItMatters: string;
  detailedProcess: {
    phase: string;
    description: string;
    keyPoints: string[];
  }[];
  enzymes: EnzymePlayer[];
  hotspots: StepHotspot[];
  commonMisconceptions: {
    myth: string;
    fact: string;
  }[];
  quickCheck: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface AminoAcid {
  name: string;
  abbr3: string;
  abbr1: string;
  type: 'Hydrophobic' | 'Polar' | 'Acidic (-)' | 'Basic (+)' | 'Special / Start' | 'Stop';
  codons: string[];
  color: string;
  textColor: string;
  description: string;
  chemicalFormula: string;
}

export interface CodonEntry {
  codon: string;
  aminoAcid: string;
  abbr3: string;
  abbr1: string;
  type: AminoAcid['type'];
  isStart?: boolean;
  isStop?: boolean;
}

export interface MutationSimulation {
  type: 'silent' | 'missense' | 'nonsense' | 'frameshift-del' | 'frameshift-ins' | 'none';
  label: string;
  description: string;
  exampleChange: {
    pos: number;
    from: string;
    to: string;
  };
}

export interface QuizQuestion {
  id: number;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  relatedStep: StepId;
}
