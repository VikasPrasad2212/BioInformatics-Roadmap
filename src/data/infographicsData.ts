import { InfographicSection } from '../types';

export const INFOGRAPHIC_SECTIONS: InfographicSection[] = [
  {
    id: 'central-dogma-macro',
    number: '01',
    title: 'The Central Dogma Master Framework',
    subtitle: 'Directional Information Flow: DNA ➔ RNA ➔ Functional Protein & Phenotypes',
    badge: '🧬 Core Paradigm',
    color: 'emerald',
    category: 'core-dogma',
    overview:
      'First articulated by Francis Crick in 1958, the Central Dogma establishes the universal pathway by which genetic storage in DNA is transcribed into temporary RNA messengers and translated into working 3D protein machinery that directly manifests observable traits.',
    highYieldBullets: [
      'DNA is the archival storage bank in the eukaryotic nucleus; RNA serves as the mobile working blueprint.',
      'Information transfer from Nucleic Acid (DNA/RNA) to Protein is irreversible under normal cellular conditions.',
      'Special exceptions to standard flow include Reverse Transcription in retroviruses (RNA ➔ cDNA via Reverse Transcriptase) and RNA Replication in RNA viruses.',
      'A single gene sequence ultimately dictates the 3D structure and chemical activity of an enzyme or structural protein, bridging Genotype to Phenotype.',
    ],
    keyMnemonic: {
      phrase: 'Do Not Alter (DNA) ➔ Read New Article (RNA) ➔ Perform (Protein)',
      meaning: 'DNA stores the pristine code ➔ RNA reads and carries it ➔ Protein performs the work.',
      explanation: 'Remember the sequence: DNA is preserved in the vault, RNA is the working copy, Protein is the machinery.',
    },
    molecularKeyStats: [
      { label: 'Human Genome Size', value: '~3.2 Billion bp', sublabel: 'Across 23 chromosome pairs' },
      { label: 'Protein-Coding Genes', value: '~20,000 to 25,000', sublabel: 'Only ~1.5% of total DNA' },
      { label: 'Flow Direction', value: 'DNA ➔ RNA ➔ Protein', sublabel: 'Transcription then Translation' },
      { label: 'Primary Exception', value: 'Reverse Transcription', sublabel: 'HIV & Telomerase' },
    ],
    clinicalOrPhenotypeConnection: {
      title: 'Phenotype Manifestation: MC1R & Pigmentation',
      geneOrDisease: 'MC1R Gene (Melanocortin 1 Receptor)',
      mechanism:
        'The MC1R gene on chromosome 16 codes for a transmembrane receptor on melanocytes. When active, it triggers synthesis of black/brown eumelanin. Recessive loss-of-function variants produce red/yellow pheomelanin.',
      significance:
        'Directly dictates hair color, fair skin tone, and freckle clustering (ephelides) across human populations.',
    },
    infographicDiagramType: 'central-flow',
  },
  {
    id: 'dna-structure-chemistry',
    number: '02',
    title: 'DNA Double Helix Architecture',
    subtitle: 'Chemical Geometry, Antiparallel Strands & Complementary Base-Pairing Rules',
    badge: '📐 Chemical Blueprint',
    color: 'blue',
    category: 'dna-structure',
    overview:
      'DNA is a right-handed B-form double helix composed of two antiparallel poly-deoxyribonucleotide chains held together by complementary hydrogen bonds and stabilized by vertical base-stacking van der Waals interactions.',
    highYieldBullets: [
      'Each nucleotide consists of a 5-carbon Deoxyribose sugar (2\'-H lacking oxygen), a negative Phosphate group at 5\', and a Nitrogenous base at 1\'.',
      'Antiparallel Geometry: One strand runs 5\' ➔ 3\' (phosphate to hydroxyl), while the complementary strand runs 3\' ➔ 5\'.',
      'Phosphodiester bonds link the 3\'-OH of one sugar to the 5\'-phosphate of the next, forming the rigid outer backbone.',
      'Chargaff\'s Equivalence: [A] = [T] (2 Hydrogen bonds) and [G] = [C] (3 Hydrogen bonds). G-C pairs require higher melting temperatures (Tm).',
    ],
    keyMnemonic: {
      phrase: 'Pure As Gold (A, G) & CUT the Py (C, U, T)',
      meaning: 'Purines = Adenine & Guanine (2 rings). Pyrimidines = Cytosine, Uracil, Thymine (1 ring).',
      explanation: 'A Purine must always pair with a Pyrimidine to maintain the constant 2.0 nm double-helix diameter.',
    },
    molecularKeyStats: [
      { label: 'Helix Diameter', value: '2.0 nm', sublabel: 'Uniform across whole length' },
      { label: 'Helical Pitch', value: '3.4 nm / turn', sublabel: '~10.5 base pairs per helical turn' },
      { label: 'Base Pair Spacing', value: '0.34 nm', sublabel: 'Vertical rise per base step' },
      { label: 'Hydrogen Bonds', value: 'A=T (2 H-bonds) | G≡C (3 H-bonds)', sublabel: 'G-C rich DNA has higher thermal stability' },
    ],
    clinicalOrPhenotypeConnection: {
      title: 'Structural Stability & DNA Denaturation',
      geneOrDisease: 'Polymerase Chain Reaction (PCR) & DNA Melting',
      mechanism:
        'Because G≡C pairs have 3 hydrogen bonds compared to A=T (2 hydrogen bonds), genomic regions with high GC content require significantly higher temperatures to denature and separate.',
      significance:
        'Essential for designing PCR primers, understanding CpG islands, and predicting promoter melting kinetics.',
    },
    infographicDiagramType: 'dna-helix',
  },
  {
    id: 'dna-replication-fork',
    number: '03',
    title: 'DNA Replication Molecular Factory',
    subtitle: 'Semi-Conservative Duplication, Replication Fork Coordination & Asymmetric Synthesis',
    badge: '⚡ Molecular Engine',
    color: 'amber',
    category: 'replication',
    overview:
      'During S-phase of the cell cycle, the replisome synthesizes two identical sister chromatids from one parent molecule in a semi-conservative manner, where each new helix preserves one original maternal template strand.',
    highYieldBullets: [
      'DNA Helicase unwinds the double helix at the replication fork; Topoisomerase (Gyrase) relieves upstream torsional supercoiling strain.',
      'Single-Stranded Binding Proteins (SSBs) prevent single strands from re-annealing or forming secondary hairpin knots.',
      'DNA Polymerases strictly require a free 3\'-OH group and can ONLY synthesize in the 5\' ➔ 3\' direction.',
      'RNA Primase lays down a ~10-nucleotide complementary RNA primer to initiate polymerase elongation.',
      'Leading Strand synthesizes continuously toward the fork; Lagging Strand synthesizes discontinuously away from the fork in Okazaki fragments.',
      'DNA Polymerase I removes RNA primers (5\'➔3\' exonuclease) and fills DNA; DNA Ligase seals the phosphodiester nicks.',
    ],
    keyMnemonic: {
      phrase: 'Leading is Lean (continuous), Lagging gets Left Behind (Okazaki pieces)',
      meaning: 'Leading strand moves in one smooth stroke; Lagging strand is synthesized in fragmented backward loops.',
      explanation: 'Both polymerases move with the fork simultaneously, but the lagging strand loops to maintain 5\'->3\' synthesis direction.',
    },
    molecularKeyStats: [
      { label: 'Synthesis Speed', value: '~50-100 nt/sec (Humans)', sublabel: 'Up to 1000 nt/sec in E. coli' },
      { label: 'Okazaki Length', value: '100-200 bp (Eukaryotes)', sublabel: '1,000-2,000 bp in Prokaryotes' },
      { label: 'Replication Error Rate', value: '1 in 10^9 to 10^10 bp', sublabel: 'With 3\'->5\' proofreading and mismatch repair' },
      { label: 'Cellular Timing', value: 'S-Phase', sublabel: 'Prior to mitosis or meiosis' },
    ],
    clinicalOrPhenotypeConnection: {
      title: 'Replication Inhibitors as Chemotherapy & Antibiotics',
      geneOrDisease: 'Topoisomerase Inhibitors & Fluoroquinolones',
      mechanism:
        'Ciprofloxacin targets bacterial DNA Gyrase (topoisomerase II). Etoposide and Doxorubicin poison human topoisomerases in rapidly dividing cancer cells, inducing double-stranded DNA breaks.',
      significance:
        'Directly exploits the mechanical vulnerability of replicating DNA forks for cancer oncology and antimicrobial therapy.',
    },
    infographicDiagramType: 'replication-fork',
  },
  {
    id: 'transcription-bubble',
    number: '04',
    title: 'Transcription & RNA Polymerase II',
    subtitle: 'Promoter Recognition, Transcription Bubble Dynamics & Nascent Pre-mRNA Elongation',
    badge: '📜 Gene Transcription',
    color: 'purple',
    category: 'transcription',
    overview:
      'Transcription is the enzymatic synthesis of complementary RNA from a specific DNA template strand by RNA Polymerase II in the eukaryotic nucleus, regulated by promoters, enhancers, and transcription factors.',
    highYieldBullets: [
      'Promoter Recognition: General transcription factors (TFIID, TFIIB, etc.) and TATA-Binding Protein (TBP) bind the TATA box ~25-30 bp upstream of the transcription start site (+1).',
      'RNA Polymerase II reads the Template (Antisense/Non-Coding) strand in the 3\' ➔ 5\' direction.',
      'Pre-mRNA is synthesized in the 5\' ➔ 3\' direction, identical in sequence to the Coding (Sense) DNA strand except Thymine (T) is replaced by Uracil (U).',
      'Unlike DNA Polymerase, RNA Polymerase II does NOT require a primer to initiate RNA synthesis.',
      'Energetics: Driven forward by the hydrolysis of ribonucleotide triphosphates (ATP, UTP, GTP, CTP), releasing inorganic pyrophosphate (PPi).',
    ],
    keyMnemonic: {
      phrase: 'Read 3 to 5, Build 5 to 3 (Same for ALL nucleic acid polymerases!)',
      meaning: 'All polymerases (DNA Pol & RNA Pol) read the template strand 3\'->5\' and build the new strand 5\'->3\'.',
      explanation: 'Nucleotides can only be added to the free 3\'-OH group of the growing polymer chain.',
    },
    molecularKeyStats: [
      { label: 'Transcription Speed', value: '~20-50 nt/sec', sublabel: 'Enzyme: RNA Polymerase II' },
      { label: 'Promoter TATA Box', value: '-25 to -30 bp', sublabel: 'Consensus: 5\'-TATAAA-3\'' },
      { label: 'Transcription Bubble', value: '~12-14 bp unwound', sublabel: 'Transient DNA-RNA hybrid is ~8-9 bp' },
      { label: 'RNA Base Pair', value: 'Uracil (U) for Thymine (T)', sublabel: 'Ribose has 2\'-OH group' },
    ],
    clinicalOrPhenotypeConnection: {
      title: 'Amanitin Poisoning (Death Cap Mushroom)',
      geneOrDisease: 'Alpha-Amanitin Toxicity',
      mechanism:
        'Alpha-amanitin from Amanita phalloides mushrooms binds tightly to RNA Polymerase II, halting mRNA transcription entirely in hepatocytes (liver cells) and leading to severe fatal hepatic failure.',
      significance:
        'Demonstrates the absolute indispensability of continuous RNA Polymerase II transcription for cellular viability.',
    },
    infographicDiagramType: 'transcription-bubble',
  },
  {
    id: 'rna-processing-spliceosome',
    number: '05',
    title: 'Eukaryotic RNA Processing & Splicing',
    subtitle: '5\' Capping, 3\' Polyadenylation & Spliceosome Lariat Exon Ligation',
    badge: '✂️ Post-Transcriptional',
    color: 'rose',
    category: 'rna-splicing',
    overview:
      'Before exiting the nucleus, newly synthesized pre-mRNA undergoes three coordinated co-transcriptional modifications: 5\' 7-methylguanosine capping, 3\' polyadenylation, and spliceosomal removal of non-coding introns.',
    highYieldBullets: [
      '5\' 7-Methylguanosine (m7G) Cap: Added via atypical 5\'-to-5\' triphosphate bridge; protects from 5\' exonucleases and serves as ribosome binding beacon.',
      '3\' Poly-A Tail: Polyadenylate polymerase adds 150-250 Adenines following the AAUAAA signal; controls mRNA stability and nuclear export.',
      'Spliceosome Machinery: Formed by 5 small nuclear ribonucleoproteins (snRNPs: U1, U2, U4, U5, U6) and ~100 associated proteins.',
      'Splicing Mechanism: Recognizes 5\' splice site (GU), branch point Adenine (forming a 2\'-5\' phosphodiester lariat loop), and 3\' splice site (AG).',
      'Alternative Splicing: Different combinations of exons are stitched together, allowing one single gene to produce thousands of distinct protein isoforms.',
    ],
    keyMnemonic: {
      phrase: 'EXons are EXpressed (Kept); INtrons are IN the way (Cut Out)',
      meaning: 'Exons contain the coding sequence; Introns are spliced out as lariat loops and degraded.',
      explanation: 'Alternative splicing can include or exclude specific exons to generate tissue-specific protein variants.',
    },
    molecularKeyStats: [
      { label: '5\' Cap Structure', value: '7-Methylguanosine', sublabel: 'Atypical 5\'-to-5\' triphosphate linkage' },
      { label: 'Poly-A Tail Length', value: '150 to 250 Adenines', sublabel: 'Determines mRNA half-life in cytoplasm' },
      { label: 'Splice Junctions', value: '5\'-GU ... A (Branch) ... AG-3\'', sublabel: 'Highly conserved boundary consensus' },
      { label: 'Human Gene Splicing', value: '>95% of multiexon genes', sublabel: 'Undergo alternative splicing' },
    ],
    clinicalOrPhenotypeConnection: {
      title: 'Splice Site Mutations: Beta-Thalassemia & SMA',
      geneOrDisease: 'Spinal Muscular Atrophy (SMN2) & Beta-Thalassemia',
      mechanism:
        'Point mutations at splice donor (GU) or acceptor (AG) sites cause exon skipping or retention of aberrant introns. In SMA, Nusinersen (Spinraza) antisense oligonucleotide restores exon 7 inclusion in SMN2 pre-mRNA.',
      significance:
        'Highlights RNA splicing modification as a premier breakthrough modality in modern precision genomic medicine.',
    },
    infographicDiagramType: 'rna-splicing-lariat',
  },
  {
    id: 'translation-ribosome-cycle',
    number: '06',
    title: 'Translation & The 80S Ribosomal Cycle',
    subtitle: 'Decoding Triplet Codons, tRNA Delivery & Peptidyl Transferase Elongation',
    badge: '🏭 Protein Synthesis',
    color: 'cyan',
    category: 'translation',
    overview:
      'In the cytoplasm, the 80S ribosome (40S small and 60S large subunits) decodes mature mRNA in the 5\' ➔ 3\' direction, linking amino acids brought by charged tRNAs into a growing polypeptide chain.',
    highYieldBullets: [
      'Aminoacyl-tRNA Synthetases attach specific amino acids to the 3\'-CCA end of cognate tRNAs using ATP (tRNA charging).',
      'The 3 Ribosomal Sites: A-site (Aminoacyl entry), P-site (Peptidyl polymer holder), E-site (Exit site for deacylated tRNA).',
      'Initiation: 40S subunit + Initiator Met-tRNA binds the 5\' cap, scans to the first AUG start codon, and recruits the 60S subunit.',
      'Elongation: Incoming aminoacyl-tRNA docks at A-site; the 28S rRNA ribozyme catalyzes peptide bond formation; EF-G/eEF-2 shifts ribosome by 3 nt (GTP-driven).',
      'Termination: A stop codon (UAA, UAG, UGA) enters A-site; Release Factors (eRF1) cleave the completed polypeptide from the final tRNA.',
    ],
    keyMnemonic: {
      phrase: 'APE Sites: Acceptor (A) ➔ Peptide (P) ➔ Exit (E)',
      meaning: 'tRNAs arrive at A-site, pass their chain to P-site, and depart through E-site.',
      explanation: 'Remember the direction: A ➔ P ➔ E as the ribosome translocates along the mRNA 5\' to 3\'.',
    },
    molecularKeyStats: [
      { label: 'Eukaryotic Ribosome', value: '80S (40S + 60S)', sublabel: 'Contains 4 rRNAs and ~80 proteins' },
      { label: 'Translation Speed', value: '~5-10 amino acids/sec', sublabel: 'Multiple ribosomes form polyribosomes (polysomes)' },
      { label: 'Energy Cost per Bond', value: '4 High-Energy Bonds', sublabel: '2 ATP (charging) + 2 GTP (elongation & translocation)' },
      { label: 'Start & Stop Signals', value: 'AUG (Start/Met) | UAA, UAG, UGA (Stop)', sublabel: '61 sense codons + 3 stop codons' },
    ],
    clinicalOrPhenotypeConnection: {
      title: 'Antibiotic Targeting of Ribosomal Subunits',
      geneOrDisease: 'Tetracyclines, Macrolides & Aminoglycosides',
      mechanism:
        'Bacterial 70S ribosomes differ from human 80S ribosomes: Tetracycline blocks the bacterial 30S A-site; Erythromycin/Azithromycin blocks the 50S exit tunnel; Chloramphenicol inhibits peptidyl transferase.',
      significance:
        'Demonstrates selective toxicity exploiting molecular differences between prokaryotic and eukaryotic translational machines.',
    },
    infographicDiagramType: 'ribosome-translation',
  },
  {
    id: 'protein-folding-hierarchy',
    number: '07',
    title: 'Protein Structural Hierarchy & Folding',
    subtitle: 'From Primary Linear Sequence to Active 3D Globular Machine & Multi-Subunit Assemblies',
    badge: '🧩 3D Architecture',
    color: 'teal',
    category: 'protein-folding',
    overview:
      'Proteins fold spontaneously down a thermodynamic funnel into lowest-energy free states, transitioning through four distinct hierarchical levels of structural organization to acquire biochemical function.',
    highYieldBullets: [
      'Primary (1°) Structure: The linear sequence of amino acids held together by covalent peptide (amide) bonds.',
      'Secondary (2°) Structure: Local hydrogen bonding of peptide backbones creating right-handed Alpha-helices (3.6 residues/turn) and Beta-pleated sheets.',
      'Tertiary (3°) Structure: Overall 3D spatial conformation of a single polypeptide, stabilized by hydrophobic core collapse, electrostatic salt bridges, and covalent Disulfide bonds (Cys-S-S-Cys).',
      'Quaternary (4°) Structure: Spatial arrangement of multiple folded polypeptide subunits (e.g., Hemoglobin tetramer: 2 alpha + 2 beta chains).',
      'Molecular Chaperones (Hsp70, Chaperonins/GroEL): Shield hydrophobic regions of unfolded proteins to prevent lethal aggregation.',
    ],
    keyMnemonic: {
      phrase: 'Primary = Peptide | Secondary = Backbone H-Bonds | Tertiary = Side-Chains (R-groups) | Quaternary = Multi-Polypeptides',
      meaning: 'Distinguishes the chemical bonding responsible for each structural level.',
      explanation: 'Primary uses covalent amide bonds; Secondary uses backbone H-bonds; Tertiary uses R-group chemistry; Quaternary uses subunit interactions.',
    },
    molecularKeyStats: [
      { label: 'Alpha-Helix Geometry', value: '3.6 amino acids/turn', sublabel: 'Hydrogen bond every 4th peptide group' },
      { label: 'Strongest 3° Bond', value: 'Disulfide Bridge (Covalent)', sublabel: 'Formed between Cysteine thiol (-SH) groups' },
      { label: 'Driving Force', value: 'Hydrophobic Effect', sublabel: 'Burying non-polar residues inside core away from water' },
      { label: 'Chaperone Class', value: 'Heat Shock Proteins (HSP)', sublabel: 'ATP-dependent protein folding assist' },
    ],
    clinicalOrPhenotypeConnection: {
      title: 'Misfolding Diseases & Amyloidosis',
      geneOrDisease: 'Prion Diseases, Alzheimer\'s (Aβ/Tau) & Sickle Cell',
      mechanism:
        'In Alzheimer\'s, misfolded amyloid-beta and hyperphosphorylated Tau form insoluble cross-beta sheet fibrils. In Sickle Cell Disease (HbS), a Glu6Val mutation exposes a hydrophobic patch causing deoxygenated hemoglobin to polymerize into rigid sickling fibers.',
      significance:
        'Shows how a single amino acid alteration profoundly distorts higher-order quaternary folding and physical cell shape.',
    },
    infographicDiagramType: 'protein-hierarchy',
  },
  {
    id: 'mutation-spectrum-consequences',
    number: '08',
    title: 'The Mutation Spectrum & Genetic Code Logic',
    subtitle: 'Point Mutations, Frameshifts & Observable Phenotypic Consequences',
    badge: '🧬 Genetics & Pathology',
    color: 'rose',
    category: 'genetics-mutations',
    overview:
      'Mutations are heritable alterations in DNA sequence ranging from single nucleotide substitutions to insertions and deletions that alter mRNA codons and downstream protein synthesis.',
    highYieldBullets: [
      'Silent (Synonymous) Mutation: Nucleotide change produces a different codon that codes for the SAME amino acid due to code degeneracy (e.g., GAA ➔ GAG both code for Glutamate).',
      'Missense (Non-synonymous) Mutation: Nucleotide change produces a codon coding for a DIFFERENT amino acid (Conservative vs. Non-conservative).',
      'Nonsense Mutation: Nucleotide change converts an amino acid codon into a premature STOP codon (UAA, UAG, UGA), generating a truncated, non-functional protein.',
      'Frameshift Mutation: Insertion or deletion of a number of nucleotides NOT divisible by 3, altering the entire downstream triplet reading frame.',
      'Splice-Site Mutation: Mutation at exon-intron boundaries disrupting proper spliceosome excision.',
    ],
    keyMnemonic: {
      phrase: 'Silent = Same | Missense = Mistake (Wrong AA) | Nonsense = No More (Stop) | Frameshift = Fatal Shuffle',
      meaning: 'Quick classification of point and indel mutation consequences.',
      explanation: 'Nonsense creates STOP codons prematurely; Frameshift destroys all downstream amino acid assignments.',
    },
    molecularKeyStats: [
      { label: 'Genetic Code Degeneracy', value: '64 Codons for 20 AAs', sublabel: 'Allows silent mutations to buffer against error' },
      { label: 'Frameshift Trigger', value: '+1, +2, -1, -2 bp indels', sublabel: 'Non-multiples of 3 completely shift reading frame' },
      { label: 'Most Damaging', value: 'Nonsense & Frameshift', sublabel: 'Often triggers Nonsense-Mediated Decay (NMD)' },
      { label: 'Classic Missense', value: 'HbS: GAG (Glu) ➔ GTG (Val)', sublabel: 'Hydrophilic Glutamate replaced by Hydrophobic Valine' },
    ],
    clinicalOrPhenotypeConnection: {
      title: 'Sickle Cell Anemia & Cystic Fibrosis',
      geneOrDisease: 'Sickle Cell (HBB) & Cystic Fibrosis (CFTR ΔF508)',
      mechanism:
        'In CFTR, a 3-bp in-frame deletion (ΔF508) deletes one single Phenylalanine codon without shifting the frame, but causes the CFTR chloride channel to misfold and degrade in the ER.',
      significance:
        'Contrasts point missense pathology (Sickle Cell) with in-frame triplet deletion misfolding (Cystic Fibrosis).',
    },
    infographicDiagramType: 'mutation-spectrum',
  },
];
