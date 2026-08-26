import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'The Big Picture',
    difficulty: 'Beginner',
    question: 'What is the classic, canonical direction of genetic information flow defined by Francis Crick in the Central Dogma?',
    options: [
      'Protein ➔ RNA ➔ DNA',
      'DNA ➔ RNA ➔ Protein',
      'RNA ➔ DNA ➔ Protein',
      'DNA ➔ Protein ➔ RNA'
    ],
    correctIndex: 1,
    explanation: 'The standard flow is DNA (storage) ➔ RNA (messenger) ➔ Protein (functional worker).',
    relatedStep: 'overview'
  },
  {
    id: 2,
    category: 'DNA Replication',
    difficulty: 'Intermediate',
    question: 'Why must the lagging strand in DNA replication be synthesized in discontinuous Okazaki fragments?',
    options: [
      'Because RNA Primase runs out of nucleotides rapidly.',
      'Because DNA Polymerase can only synthesize in the 5\' to 3\' direction, while the replication fork moves in the opposite direction on that strand.',
      'Because topoisomerase cuts the lagging strand into pieces.',
      'Because DNA Ligase only works on single base pairs.'
    ],
    correctIndex: 1,
    explanation: 'DNA polymerases strictly add nucleotides only to the 3\'-OH end (5\' ➔ 3\' synthesis). Since the two DNA template strands run antiparallel, the lagging strand must be synthesized in backward segments (Okazaki fragments) as the fork opens.',
    relatedStep: 'replication'
  },
  {
    id: 3,
    category: 'Transcription',
    difficulty: 'Beginner',
    question: 'Which nitrogenous base is present in RNA but NOT in DNA?',
    options: [
      'Thymine (T)',
      'Uracil (U)',
      'Guanine (G)',
      'Adenine (A)'
    ],
    correctIndex: 1,
    explanation: 'In RNA, Uracil (U) replaces Thymine (T) and pairs with Adenine (A).',
    relatedStep: 'transcription'
  },
  {
    id: 4,
    category: 'RNA Processing',
    difficulty: 'Intermediate',
    question: 'In eukaryotic pre-mRNA splicing, what are the non-protein-coding segments called that are cut out by the spliceosome?',
    options: [
      'Exons',
      'Introns',
      'Promoters',
      'Codons'
    ],
    correctIndex: 1,
    explanation: 'Introns ("IN the way") are removed and degraded, while Exons ("EXpressed sequences") are spliced together into mature mRNA.',
    relatedStep: 'rna-processing'
  },
  {
    id: 5,
    category: 'Translation & Genetic Code',
    difficulty: 'Beginner',
    question: 'What is the universal START codon that marks where the ribosome begins translating mRNA into a protein?',
    options: [
      '5\'-UAA-3\'',
      '5\'-AUG-3\' (Methionine)',
      '5\'-UAG-3\'',
      '5\'-CCC-3\''
    ],
    correctIndex: 1,
    explanation: 'AUG is the universal start codon in eukaryotes, coding for Methionine (Met).',
    relatedStep: 'translation'
  },
  {
    id: 6,
    category: 'Translation Mechanism',
    difficulty: 'Advanced',
    question: 'What happens when a ribosome encounters a STOP codon (UAA, UAG, or UGA) in its A-site?',
    options: [
      'A special "stop tRNA" delivers a termination amino acid.',
      'A protein Release Factor enters the A-site and catalyzes the hydrolytic release of the polypeptide chain.',
      'RNA Polymerase binds to the ribosome and halts transcription.',
      'DNA Helicase unwinds the ribosome.'
    ],
    correctIndex: 1,
    explanation: 'No tRNAs match stop codons; instead, protein release factors (eRF1 in eukaryotes) bind the A-site and hydrolyze the ester bond linking the polypeptide to the P-site tRNA.',
    relatedStep: 'translation'
  },
  {
    id: 7,
    category: 'Mutations',
    difficulty: 'Intermediate',
    question: 'If a single nucleotide is inserted or deleted in a protein-coding sequence, what severe type of mutation usually results?',
    options: [
      'Silent Mutation',
      'Frameshift Mutation',
      'Conservative Missense Mutation',
      'Synonymous Substitution'
    ],
    correctIndex: 1,
    explanation: 'Because ribosomes read mRNA in rigid triplets (codons), inserting or deleting a non-multiple-of-three base shifts the entire reading frame downstream, altering every subsequent amino acid and usually producing a premature STOP codon.',
    relatedStep: 'simulator'
  },
  {
    id: 8,
    category: 'Dogma Exceptions',
    difficulty: 'Intermediate',
    question: 'Which enzyme allows retroviruses like HIV to synthesize DNA from an RNA template, running contrary to the classical dogma flow?',
    options: [
      'DNA Ligase',
      'Reverse Transcriptase',
      'RNA Polymerase II',
      'Peptidyl Transferase'
    ],
    correctIndex: 1,
    explanation: 'Reverse Transcriptase is an RNA-dependent DNA polymerase that converts viral RNA into double-stranded DNA inside the host cell.',
    relatedStep: 'folding'
  },
  {
    id: 9,
    category: 'Cellular Differences',
    difficulty: 'Advanced',
    question: 'Why can prokaryotes (bacteria) carry out simultaneous transcription and translation on the same mRNA molecule, whereas eukaryotes cannot?',
    options: [
      'Bacterial mRNA has no nucleotides.',
      'Prokaryotes lack a nuclear membrane, so ribosomes have immediate physical access to mRNA as it is extruded from RNA polymerase.',
      'Eukaryotic ribosomes are too small to bind mRNA.',
      'Prokaryotes do not use DNA.'
    ],
    correctIndex: 1,
    explanation: 'In prokaryotes, without a nuclear envelope, ribosomes begin translating the 5\' end of mRNA while RNA polymerase is still finishing transcription at the 3\' end. In eukaryotes, the nuclear membrane physically separates transcription (nucleus) from translation (cytoplasm).',
    relatedStep: 'overview'
  }
];
