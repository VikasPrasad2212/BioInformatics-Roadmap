/**
 * Data structures and content for the AI-Ready Biotech Career & High-Yield Industry Masterclass
 * Equips candidates with first-principles biophysical mastery, AI workflow integration,
 * wet-lab active learning triage, and technical interview excellence.
 */

export interface CareerMoat {
  id: string;
  title: string;
  badge: string;
  iconName: string;
  color: string;
  tagline: string;
  whyAiFailsAlone: string;
  humanSuperpower: string;
  actionableSkills: string[];
  industryApplications: string[];
  salaryTier: string;
}

export interface AiFailureCase {
  id: string;
  title: string;
  aiTool: string;
  scenario: string;
  aiOutput: string;
  whyItFailsInVivo: string;
  biophysicalPrinciple: string;
  correctiveStrategy: string;
  validationAssay: string;
  difficulty: 'Intermediate' | 'Advanced' | 'Industry Expert';
}

export interface BiotechInterviewQuestion {
  id: string;
  category: 'Structural Bio AI' | 'mRNA & Oligo Therapeutics' | 'Protein Design' | 'Gene Editing & NGS' | 'Biologics & Analytics';
  roleTarget: string;
  question: string;
  context: string;
  highYieldKeywords: string[];
  modelAnswerSummary: string;
  detailedExplanation: string;
  pitfallsToAvoid: string[];
}

export interface AiBiotechTool {
  name: string;
  category: string;
  coreCapability: string;
  knownLimitations: string;
  howHumanEngineersWin: string;
  recommendedWorkflow: string;
}

export interface LearningResource {
  title: string;
  providerOrChannel: string;
  url: string;
  type: 'Free Course' | 'YouTube Video / Playlist' | 'Interactive Tutorial' | 'Documentation / Book';
  description: string;
}

export interface RoadmapLevel {
  levelNumber: number;
  id: string;
  title: string;
  tier: 'Foundational (Low)' | 'Intermediate' | 'Advanced' | 'Cutting-Edge / AI Architect';
  tagline: string;
  description: string;
  rAndPythonSkills: string[];
  toolsToMaster: { name: string; category: string; useCase: string }[];
  freeResources: LearningResource[];
  practicalExercises: string[];
  capstoneProject: {
    title: string;
    overview: string;
    deliverables: string[];
  };
}

export const BIOINFORMATICS_ROADMAP: RoadmapLevel[] = [
  {
    levelNumber: 1,
    id: 'level-1-foundational',
    title: 'Level 1: Core Bioinformatic Scripting & Sequence Analysis',
    tier: 'Foundational (Low)',
    tagline: 'Bridging CS50 R and BioPython into classical sequence manipulation, alignments, and statistical genomics.',
    description: 'Transform your foundational R and Python syntax into biological problem-solving: parsing FASTA/GenBank/FASTQ files, computing GC-skew, running local/global alignments, and analyzing statistical distributions of genomic data.',
    rAndPythonSkills: [
      'BioPython: Bio.Seq, Bio.SeqIO, Bio.Align, Bio.Blast, Bio.Entrez (NCBI API)',
      'R: tidyverse (dplyr, ggplot2, tidyr), Biostrings, GenomicRanges, IRanges',
      'Data transformation: Parsing FASTQ quality scores, sequence motif finding, translating reading frames (ORFs)'
    ],
    toolsToMaster: [
      { name: 'BioPython', category: 'Sequence Parsing', useCase: 'Automated FASTA/GenBank retrieval via Entrez, translation, and motif search' },
      { name: 'Biostrings & GenomicRanges (R)', category: 'Genomic Coordinate Math', useCase: 'Interval arithmetic, overlap analysis, and BED-like manipulations in R' },
      { name: 'NCBI BLAST+ CLI', category: 'Sequence Alignment', useCase: 'Command-line local database indexing and homology search' },
      { name: 'Samtools & FastQC', category: 'NGS Quality Control', useCase: 'Assessing read quality distributions and BAM/SAM alignments' }
    ],
    freeResources: [
      {
        title: 'Rosalind: Learn Bioinformatics via Problem Solving',
        providerOrChannel: 'Rosalind.info (Free Interactive Platform)',
        url: 'https://rosalind.info/problems/locations/',
        type: 'Interactive Tutorial',
        description: 'The golden standard of hands-on bioinformatics problem sets. Solve 50+ programming challenges in Python/R.'
      },
      {
        title: 'Harvard CS50’s Introduction to Programming with Python',
        providerOrChannel: 'Harvard CS50 (Free Course / YouTube)',
        url: 'https://cs50.harvard.edu/python/',
        type: 'Free Course',
        description: 'Deepens your computer science rigor in Python (OOP, file I/O, regex, testing) to complement CS50 R.'
      },
      {
        title: 'BioPython Tutorial and Cookbook',
        providerOrChannel: 'BioPython Official Documentation',
        url: 'https://biopython.org/DIST/docs/tutorial/Tutorial.html',
        type: 'Documentation / Book',
        description: 'The definitive hands-on guide covering Bio.SeqIO, Bio.PDB, Bio.Phylo, and Entrez query construction.'
      },
      {
        title: 'Bioconductor for Genomic Data Science',
        providerOrChannel: 'Johns Hopkins / Coursera (Free to Audit)',
        url: 'https://www.coursera.org/learn/bioconductor',
        type: 'Free Course',
        description: 'Master GRanges, Biostrings, and ExpressionSet objects in R directly from Bioconductor core creators.'
      },
      {
        title: 'StatQuest with Josh Starmer: Genomics & RNA-seq Basics',
        providerOrChannel: 'StatQuest (YouTube)',
        url: 'https://www.youtube.com/@statquest',
        type: 'YouTube Video / Playlist',
        description: 'Crystal-clear visual explanations of p-values, FDR, PCA, and high-throughput sequencing fundamentals.'
      }
    ],
    practicalExercises: [
      'Exercise 1.1: Write a BioPython script using Bio.Entrez to fetch 20 mammalian Insulin gene homologues and compute amino acid conservation scores.',
      'Exercise 1.2: Build an R script with Biostrings to identify all Open Reading Frames (ORFs > 100 aa) in a viral genome FASTA file.',
      'Exercise 1.3: Parse a 10,000-read FASTQ file with Bio.SeqIO.QualityIO to compute Phred score quality percentiles and filter low-quality reads (Q < 30).'
    ],
    capstoneProject: {
      title: 'Automated Viral Mutation Tracking & Phylogeny Pipeline',
      overview: 'Develop a joint Python-R command line tool that downloads viral FASTA sequences from NCBI, identifies non-synonymous amino acid mutations relative to reference, builds a phylogenetic tree, and plots a publication-ready mutation frequency heatmap in R ggplot2.',
      deliverables: [
        'Python CLI script using Bio.Entrez & Bio.Align for automated sequence acquisition and pairwise alignment.',
        'R script utilizing ggplot2 + ggtree to visualize mutation hotspots and evolutionary branch divergence.',
        'GitHub repository with clear README documentation and sample test data.'
      ]
    }
  },
  {
    levelNumber: 2,
    id: 'level-2-intermediate',
    title: 'Level 2: Bulk & Single-Cell Transcriptomics + Classical ML',
    tier: 'Intermediate',
    tagline: 'Differential gene expression, scRNA-seq clustering, and classical machine learning (Random Forests, PCA, SVMs) for biomarker discovery.',
    description: 'Transition from basic sequence parsing to high-dimensional transcriptomics. Master bulk RNA-seq differential expression in R, single-cell analysis in Python, and classical machine learning algorithms to classify disease phenotypes.',
    rAndPythonSkills: [
      'R: DESeq2, edgeR, limma-voom, EnhancedVolcano, clusterProfiler (GSEA / KEGG)',
      'Python: scanpy, anndata, scikit-learn, UMAP-learn, scipy.stats',
      'ML Foundations: Cross-validation, ROC-AUC, feature importance (Gini/SHAP), unsupervised clustering (Leiden, Louvain)'
    ],
    toolsToMaster: [
      { name: 'DESeq2 & clusterProfiler (R)', category: 'Bulk Transcriptomics', useCase: 'Negative binomial GLM differential expression & Gene Set Enrichment Analysis' },
      { name: 'scanpy & anndata (Python)', category: 'Single-Cell Genomics', useCase: 'Scalable preprocessing, QC filtering, HVG selection, UMAP, and cell clustering' },
      { name: 'scikit-learn (Python)', category: 'Classical Machine Learning', useCase: 'Random Forests, XGBoost, and SVM classifiers for cancer subtype prediction' },
      { name: 'Seurat (R)', category: 'Single-Cell Analysis', useCase: 'Alternative industry-standard R pipeline for multi-modal single-cell data' }
    ],
    freeResources: [
      {
        title: 'Single-cell Best Practices (scverse Book)',
        providerOrChannel: 'Theis Lab / scverse Consortium (Free Online Book)',
        url: 'https://www.sc-best-practices.org/',
        type: 'Documentation / Book',
        description: 'Comprehensive, interactive handbook on single-cell RNA-seq, spatial transcriptomics, and multimodal analysis.'
      },
      {
        title: 'Harvard Chan Bioinformatic Core: RNA-seq with DESeq2',
        providerOrChannel: 'Harvard HBC Training (Free Modular Course)',
        url: 'https://hbctraining.github.io/DGE_workshop/',
        type: 'Free Course',
        description: 'World-renowned open curriculum for RNA-seq quality control, count normalization, and experimental design.'
      },
      {
        title: 'StatQuest: Machine Learning in Python & R (Random Forests, SVM, UMAP)',
        providerOrChannel: 'StatQuest (YouTube Playlist)',
        url: 'https://www.youtube.com/@statquest/playlists',
        type: 'YouTube Video / Playlist',
        description: 'First-principles breakdown of classification algorithms, decision trees, PCA, t-SNE, and UMAP.'
      },
      {
        title: 'Python for Data Science and Machine Learning Bootcamp (Theory Modules)',
        providerOrChannel: 'FreeCodeCamp (YouTube)',
        url: 'https://www.youtube.com/watch?v=LHBE6Q9XlzI',
        type: 'YouTube Video / Playlist',
        description: 'Full 12-hour free course on NumPy, pandas, matplotlib, seaborn, and scikit-learn algorithms.'
      }
    ],
    practicalExercises: [
      'Exercise 2.1: Download an RNA-seq count matrix from GEO (e.g. breast cancer vs. normal tissue), run DESeq2 in R, generate a volcano plot with EnhancedVolcano, and perform GSEA pathway enrichment.',
      'Exercise 2.2: Load a 10x Genomics PBMC 3k dataset in Python using scanpy, filter cells by mitochondrial percentage (<5%), find Highly Variable Genes (HVGs), compute PCA, and plot a UMAP colored by marker genes (CD3D, MS4A1, CD14).',
      'Exercise 2.3: Train a Random Forest classifier in scikit-learn on TCGA expression data to predict tumor grade, and extract top predictive genes using SHAP values.'
    ],
    capstoneProject: {
      title: 'End-to-End Single-Cell Tumor Microenvironment Dissection Atlas',
      overview: 'Process a public single-cell RNA-seq dataset of Melanoma or Glioblastoma patients undergoing immunotherapy. Perform doublet removal, batch correction, cell type annotation, differential expression of exhausted CD8+ T-cells, and train an ML classifier to predict responder vs. non-responder status.',
      deliverables: [
        'Complete Jupyter Notebook using scanpy and anndata for preprocessing, Leiden clustering, and marker gene identification.',
        'R integration script using DESeq2/clusterProfiler for pathway enrichment of immunotherapy resistance signatures.',
        'scikit-learn predictive model reporting 5-fold cross-validated ROC-AUC, confusion matrix, and feature importances.'
      ]
    }
  },
  {
    levelNumber: 3,
    id: 'level-3-advanced',
    title: 'Level 3: Deep Learning, Probabilistic Autoencoders & Protein Language Models (pLMs)',
    tier: 'Advanced',
    tagline: 'PyTorch deep learning, Variational Autoencoders (scVI) for batch integration, and Transformers (ESM-2) for variant effect prediction.',
    description: 'Enter modern AI in biology. Move beyond static tabular ML into deep learning architectures: train custom PyTorch neural networks, leverage variational inference (scVI) for complex cellular manifolds, and fine-tune Protein Language Models (ESM-2) to predict mutation pathogenicity and fitness landscapes.',
    rAndPythonSkills: [
      'PyTorch: Tensors, autograd, custom Dataset/DataLoader, nn.Module, loss functions (MSE, CrossEntropy, Focal Loss)',
      'scVI-tools: Generative probabilistic modeling, batch integration, differential expression via latent space',
      'Transformers & HuggingFace: Tokenization of amino acid sequences, ESM-2 embeddings extraction, sequence classification heads'
    ],
    toolsToMaster: [
      { name: 'PyTorch', category: 'Deep Learning Core', useCase: 'Building custom multi-layer perceptrons (MLP), 1D CNNs, and deep generative architectures' },
      { name: 'scvi-tools (Python)', category: 'Probabilistic Single-Cell AI', useCase: 'Variational autoencoders for scRNA-seq batch effect correction, imputation, and doublet detection' },
      { name: 'ESM-2 / ESM-3 (Meta AI via HuggingFace)', category: 'Protein Language Models', useCase: 'Zero-shot mutation effect prediction (ΔLLR) and sequence embedding feature extraction' },
      { name: 'Bio.PDB + PyMOL', category: 'Structural Parsing', useCase: '3D coordinate extraction, Cα distance matrices, and structural visualization' }
    ],
    freeResources: [
      {
        title: 'Deep Learning for Genomics & Biology (CS273B)',
        providerOrChannel: 'Stanford University (Free Online Course Materials / YouTube)',
        url: 'https://web.stanford.edu/class/cs273b/',
        type: 'Free Course',
        description: 'Stanford graduate course on CNNs, RNNs, and attention mechanisms applied to genomics, epigenomics, and regulatory DNA.'
      },
      {
        title: 'PyTorch for Deep Learning Bootcamp',
        providerOrChannel: 'Daniel Bourke / FreeCodeCamp (YouTube - 24 Hours)',
        url: 'https://www.youtube.com/watch?v=V_xro1bcAuA',
        type: 'YouTube Video / Playlist',
        description: 'The most comprehensive, beginner-friendly hands-on PyTorch course in existence. Build neural networks from scratch.'
      },
      {
        title: 'HuggingFace NLP Course (Applicable to Biological Sequences)',
        providerOrChannel: 'HuggingFace (Free Course)',
        url: 'https://huggingface.co/learn/nlp-course',
        type: 'Free Course',
        description: 'Master Tokenizers, Transformers, Fine-tuning, and the Datasets library (directly applicable to DNA/protein tokens).'
      },
      {
        title: 'scvi-tools Official Tutorials & Documentation',
        providerOrChannel: 'Yosef Lab / scvi-tools Community',
        url: 'https://docs.scvi-tools.org/en/stable/tutorials/index.html',
        type: 'Interactive Tutorial',
        description: 'Step-by-step guides for training scVI, scANVI, TotalVI, and ChemCPA on real biological data.'
      }
    ],
    practicalExercises: [
      'Exercise 3.1: Build a 1D Convolutional Neural Network (CNN) in PyTorch to classify DNA regulatory sequences (transcription factor binding motifs vs. random sequences).',
      'Exercise 3.2: Use scvi-tools to train a Variational Autoencoder on 3 different patient single-cell batches, extract the 10-dimensional latent representation, and plot batch-corrected UMAPs.',
      'Exercise 3.3: Use ESM-2 (esm2_t6_8M_UR50D or esm2_t33_650M) to compute log-likelihood ratios (ΔLLR) for 100 missense mutations in the TP53 tumor suppressor and correlate with experimental functional scores.'
    ],
    capstoneProject: {
      title: 'Zero-Shot Variant Pathogenicity & Antibody Affinity Predictor with ESM-2',
      overview: 'Develop a full AI pipeline combining BioPython and HuggingFace PyTorch to ingest Deep Mutational Scanning (DMS) datasets (from MaveDB), extract per-residue ESM-2 evolutionary embeddings, train a downstream predictor of antibody escape, and benchmark against clinical ClinVar variant databases.',
      deliverables: [
        'Python package/notebook integrating BioPython sequence handling and HuggingFace Transformers.',
        'Trained PyTorch model demonstrating superior Spearman correlation ($r > 0.70$) on zero-shot variant fitness prediction.',
        'Interactive Streamlit or R Shiny web demo allowing researchers to input a FASTA sequence and view predicted mutational fitness heatmaps.'
      ]
    }
  },
  {
    levelNumber: 4,
    id: 'level-4-cutting-edge',
    title: 'Level 4: Structural Bio AI, Generative Diffusion & Scalable Cloud Pipelines',
    tier: 'Cutting-Edge / AI Architect',
    tagline: 'AlphaFold3, RFdiffusion, Boltz-1, Graph Neural Networks (GNNs), OpenMM Molecular Dynamics & Nextflow cloud orchestration.',
    description: 'The pinnacle of modern computational biotech. Design de novo proteins, dock small molecules and nucleic acids with all-atom diffusion models, validate physical stability with molecular dynamics, and engineer production-grade reproducible Nextflow / Snakemake pipelines on AWS/GCP clusters.',
    rAndPythonSkills: [
      'Geometric Deep Learning: PyTorch Geometric (PyG), E(n)-Equivariant Graph Neural Networks, distance/torsion angle geometry',
      'Generative Bio-AI: Command-line execution & scripting for RFdiffusion, ProteinMPNN, AlphaFold 3, Boltz-1, Chai-1',
      'Bio-Orchestration: Nextflow (DSL2), Snakemake, Docker, Singularity/Apptainer, HPC Slurm cluster management'
    ],
    toolsToMaster: [
      { name: 'AlphaFold 3 / Boltz-1 / Chai-1', category: 'All-Atom Biomolecular Structure', useCase: 'Predicting complexes of proteins, DNA, RNA, chemical ligands, and post-translational modifications' },
      { name: 'RFdiffusion & ProteinMPNN', category: 'De Novo Generative Protein Design', useCase: 'Generating target-focused mini-protein binder backbones and designing soluble sequences' },
      { name: 'PyTorch Geometric (PyG)', category: 'Graph Neural Networks', useCase: 'Representing 3D biomolecules as coordinate graphs for binding affinity and pocket prediction' },
      { name: 'OpenMM & GROMACS', category: 'Molecular Dynamics (MD)', useCase: 'Explicit-solvent physics simulations (NVT/NPT) to validate conformational stability and RMSF' },
      { name: 'Nextflow & nf-core', category: 'Cloud Pipeline Engineering', useCase: 'Scalable, containerized pipeline execution on AWS Batch, GCP Life Sciences, or Slurm' }
    ],
    freeResources: [
      {
        title: 'Geometric Deep Learning Course',
        providerOrChannel: 'Michael Bronstein, Joan Bruna, Taco Cohen, Petar Veličković',
        url: 'https://geometricdeeplearning.com/lectures/',
        type: 'Free Course',
        description: 'First-principles mathematical theory of symmetries, graphs, manifolds, and equivariant neural networks for molecular biology.'
      },
      {
        title: 'Deep Learning for Structural Biology (Bioinformatics & AI Lectures)',
        providerOrChannel: 'OpenTop / MIT & Broad Institute Seminars (YouTube)',
        url: 'https://www.youtube.com/results?search_query=structural+biology+deep+learning+mit+broad',
        type: 'YouTube Video / Playlist',
        description: 'Seminars covering the architecture of AlphaFold, ESMFold, RFdiffusion, and generative molecular biology.'
      },
      {
        title: 'nf-core & Nextflow Training (Free Interactive Curriculum)',
        providerOrChannel: 'Seqera / nf-core Community',
        url: 'https://training.nextflow.io/',
        type: 'Interactive Tutorial',
        description: 'Industry-standard training for building reproducible, scalable, containerized computational genomics pipelines.'
      },
      {
        title: 'OpenMM User Guide & Python Scripting Tutorials',
        providerOrChannel: 'OpenMM Consortium',
        url: 'http://docs.openmm.org/latest/userguide/application/02_running_sims.html',
        type: 'Documentation / Book',
        description: 'Hands-on guide to running GPU-accelerated molecular dynamics simulations in Python with explicit solvent and ions.'
      }
    ],
    practicalExercises: [
      'Exercise 4.1: Write a Python script using Bio.PDB and PyTorch Geometric to convert a PDB file into a PyG Data object (node features = amino acid one-hot + dihedral angles; edge features = Cα-Cα distances < 10Å).',
      'Exercise 4.2: Execute an RFdiffusion trajectory to generate 10 de novo binder backbones against a target viral receptor, design sequences with ProteinMPNN, and score AlphaFold self-consistency (scRMSD < 1.5Å).',
      'Exercise 4.3: Write a reproducible Nextflow DSL2 pipeline with Docker containers that takes raw paired-end FASTQ files, runs FastQC, aligns with STAR/HISAT2, and generates DESeq2 counts.'
    ],
    capstoneProject: {
      title: 'Closed-Loop Generative Binder Design & Molecular Dynamics Pipeline in Nextflow',
      overview: 'Architect an enterprise-ready, containerized pipeline that automates: (1) de novo binder backbone generation with RFdiffusion, (2) sequence design with ProteinMPNN, (3) AlphaFold/Boltz-1 self-consistency triage (filtering by ipTM > 0.8 and inter-chain PAE < 10Å), (4) automated 100ns OpenMM explicit-solvent MD simulation, and (5) automated publication-quality HTML report generation.',
      deliverables: [
        'Complete Nextflow DSL2 pipeline with Docker/Singularity containers for RFdiffusion, ProteinMPNN, and OpenMM.',
        'Python analysis script computing RMSD trajectories, RMSF per residue, and hydrogen bond occupancy throughout MD simulation.',
        'Production-grade GitHub repo with Continuous Integration (CI), automated test dataset, and documentation.'
      ]
    }
  }
];

export const CAREER_MOATS: CareerMoat[] = [
  {
    id: 'first-principles',
    title: 'First-Principles Biophysical Grounding',
    badge: 'Thermodynamics & Kinetics',
    iconName: 'Atom',
    color: '#10B981',
    tagline: 'Understanding thermodynamic free energy (ΔG), entropic penalties, and allostery that pure AI pattern-matchers overlook.',
    whyAiFailsAlone: 'Deep learning models predict static minimum-energy conformations without computing solvent entropy, counterion condensation, dynamic state ensembles, or non-equilibrium cellular kinetics.',
    humanSuperpower: 'Evaluating binding free energy (ΔG = ΔH - TΔS), predicting hydration shell displacement, and identifying allosteric transitions that convert inactive binders into efficacious agonists/antagonists.',
    actionableSkills: [
      'Equilibrium binding thermodynamics (Kd, Ka, ΔG, ΔH, ΔS)',
      'Transient kinetic assays (kon, koff, residence time t1/2)',
      'Molecular dynamics (MD) trajectory analysis & RMSF flexibility',
      'Solvent-accessible surface area (SASA) & hydrophobic effect accounting'
    ],
    industryApplications: [
      'Small molecule allosteric modulator discovery (Relay, Schrödinger)',
      'Macrocyclic peptide stabilization against proteolytic cleavage',
      'Target residence time optimization for kinase inhibitors'
    ],
    salaryTier: '$140k - $210k+ (Biophysics Scientist)'
  },
  {
    id: 'closed-loop-active-learning',
    title: 'Wet-Lab Active Learning & Dry-Lab Triage',
    badge: 'Lab-in-the-Loop',
    iconName: 'FlaskConical',
    color: '#06B6D4',
    tagline: 'Closing the loop between in silico AI generation and high-throughput physical experimental validation.',
    whyAiFailsAlone: 'AI cannot run automated liquid handling pipettes, purify insoluble inclusion bodies, or diagnose why a cellular assay shows 0% viability despite a 99% in silico docking score.',
    humanSuperpower: 'Designing high-throughput yeast/phage display screening libraries, triaging 10,000 AI designs down to 48 synthesizable candidates, and troubleshooting expression in mammalian CHO/HEK cells.',
    actionableSkills: [
      'Surface Plasmon Resonance (SPR) & Bio-Layer Interferometry (BLI)',
      'Differential Scanning Fluorimetry (DSF) & NanoDSF thermal stability',
      'High-resolution Cryo-EM single-particle reconstruction workflows',
      'Deep mutational scanning (DMS) & Next-Generation Sequencing (NGS)'
    ],
    industryApplications: [
      'High-throughput antibody affinity maturation (Genentech, Amgen)',
      'Directed evolution of industrial enzymes (Codexis, Ginkgo)',
      'Rapid pandemic antigen screening and neutralization profiling'
    ],
    salaryTier: '$150k - $230k+ (Translational Protein Scientist)'
  },
  {
    id: 'therapeutic-chemistry-delivery',
    title: 'Therapeutic Chemistry & Delivery Formulation',
    badge: 'Oligo & LNP Engineering',
    iconName: 'Sparkles',
    color: '#F59E0B',
    tagline: 'Overcoming in vivo delivery barriers, innate immune toll-like receptor sensing, and serum degradation.',
    whyAiFailsAlone: 'AI protein models do not automatically solve pharmacokinetic clearance, blood-brain barrier penetration, kidney filtration, or endosomal escape in target tissues.',
    humanSuperpower: 'Mastering chemical modifications (N1-methylpseudouridine, 2\'-O-Me, 2\'-MOE, phosphorothioate backbones) and lipid nanoparticle (LNP) ionizable lipid pKa tuning to maximize cytosolic payload delivery.',
    actionableSkills: [
      'mRNA secondary structure thermodynamics & eIF4E cap analogues',
      'Ionizable lipid structure-activity relationships (e.g. ALC-0315, SM-102)',
      'GalNAc conjugation for targeted hepatocyte receptor uptake',
      'Innate immune toll-like receptor (TLR3/7/8, RIG-I, MDA5) evasion'
    ],
    industryApplications: [
      'mRNA vaccine & cancer neoantigen therapy (Moderna, BioNTech)',
      'Antisense oligonucleotide (ASO) and siRNA therapeutics (Alnylam, Ionis)',
      'Extra-hepatic targeted LNP delivery (Beam Therapeutics, Intellia)'
    ],
    salaryTier: '$155k - $240k+ (Nucleic Acid Drug Discovery Head)'
  },
  {
    id: 'ai-pipeline-architecture',
    title: 'AI Architecture & Generative Bio-Engineering',
    badge: 'AlphaFold3, RFdiffusion, ESM3',
    iconName: 'Cpu',
    color: '#8B5CF6',
    tagline: 'Leading the integration of state-of-the-art biological foundation models rather than treating them as black boxes.',
    whyAiFailsAlone: 'Default web interfaces generate unconstrained hallucinations without physics-based sanity checks, sequence diversity constraints, or steric clash resolution.',
    humanSuperpower: 'Scripting custom fine-tuning pipelines, combining protein language embeddings (ESM-3) with diffusion backbones (RFdiffusion) and molecular mechanics energy minimization (OpenMM/Rosetta).',
    actionableSkills: [
      'Command-line execution of AlphaFold3, Boltz-1, Chai-1, RFdiffusion',
      'Confidence metric interpretation (pLDDT, PAE matrices, pTM, ipTM)',
      'Sequence design via ProteinMPNN with fixed-backbone constraints',
      'High-performance computing (HPC) Slurm cluster & Nextflow pipelines'
    ],
    industryApplications: [
      'De novo de novo protein binder generation against undruggable targets',
      'Epitope scaffolding for universal viral vaccine immunogens',
      'Bispecific T-cell engager (BiTE) geometry optimization'
    ],
    salaryTier: '$165k - $260k+ (Computational Structural Biologist)'
  },
  {
    id: 'strategic-regulatory-translation',
    title: 'Regulatory, IP & Clinical Translation Strategy',
    badge: 'IND Filings & Bio-Strategy',
    iconName: 'ShieldCheck',
    color: '#EC4899',
    tagline: 'Navigating FDA IND requirements, patent claim boundaries, off-target toxicity liabilities, and manufacturability.',
    whyAiFailsAlone: 'AI has no legal accountability, cannot write Chemistry, Manufacturing, and Controls (CMC) documentation, and cannot defend a novel clinical trial protocol before the FDA.',
    humanSuperpower: 'Translating in silico molecules into GMP-compliant, patentable biopharmaceuticals with favorable immunogenicity, stability, and therapeutic windows in primates/humans.',
    actionableSkills: [
      'FDA IND / EMA guidance for gene and cell therapy modalities',
      'CMC manufacturability scoring (hydrophobic patches, deamidation, aggregation)',
      'Off-target risk assessment (GUIDE-seq, proteomics, cytokine release)',
      'Biotech IP strategy: claim breadth for generative sequence families'
    ],
    industryApplications: [
      'Biotech venture capital technical diligence & portfolio evaluation',
      'IND-enabling preclinical package leadership for clinical entry',
      'Biologics CMC scale-up in 2,000L bioreactors'
    ],
    salaryTier: '$175k - $300k+ (VP of Preclinical / Biotech Founder)'
  }
];

export const AI_FAILURE_CASES: AiFailureCase[] = [
  {
    id: 'case-1-disordered-loop',
    title: 'The "Rigid AlphaFold Loop" Kinase Inhibitor Trap',
    aiTool: 'AlphaFold 2/3 / ColabFold',
    scenario: 'An AI structural model predicts a tight drug-binding pocket for an oncogenic kinase with a high pLDDT score (>90). The medicinal chemistry team synthesizes 20 small-molecule analogues designed to dock into this pocket.',
    aiOutput: 'Static crystal-like structure showing the activation loop (A-loop) pinned in a rigid closed conformation.',
    whyItFailsInVivo: 'In physiological solution, kinase activation loops are intrinsically flexible and undergo dynamic DFG-in / DFG-out conformational equilibrium. The drug fails in vitro because the energetic penalty of freezing the flexible loop into the predicted conformation exceeds the binding energy.',
    biophysicalPrinciple: 'Conformational Entropy & Allosteric State Ensembles. High pLDDT merely reflects database homologies, not kinetic stability in solution.',
    correctiveStrategy: 'Run multi-replica molecular dynamics (MD) simulations in explicit solvent or generate conformational ensembles using enhanced sampling (Metadynamics). Focus chemistry on stabilizing the DFG-out inactive state.',
    validationAssay: 'Surface Plasmon Resonance (SPR) kinetic profiling, Hydrogen-Deuterium Exchange Mass Spectrometry (HDX-MS), and kinase activity LanthaScreen assays.',
    difficulty: 'Advanced'
  },
  {
    id: 'case-2-mrna-innate-immunity',
    title: 'The Untreated mRNA Toll-Like Receptor Catastrophe',
    aiTool: 'Generative mRNA Codon Optimizer',
    scenario: 'An AI algorithm designs a high-expression mRNA encoding a therapeutic enzyme by selecting maximum-frequency human codons. The mRNA is synthesized with standard unmodified uridine (U) bases and transfected into primary human dendritic cells.',
    aiOutput: 'Optimized mRNA transcript with theoretical 99.8% Translation Efficiency Index and zero secondary structure barriers.',
    whyItFailsInVivo: 'Unmodified uridine in synthetic mRNA triggers endosomal Toll-Like Receptors (TLR7 and TLR8) and cytosolic RIG-I/MDA5 receptors. The cell secretes massive Type I Interferons (IFN-α/β), phosphorylates eIF2α via PKR, shuts down global translation completely, and triggers apoptosis.',
    biophysicalPrinciple: 'Innate Immune Self vs. Non-Self Pattern Recognition. Cellular sensors recognize exogenous unmodified single-stranded and double-stranded RNA contaminants.',
    correctiveStrategy: 'Substitute 100% of UTP with N1-methylpseudouridine (m1ΨTP) during in vitro transcription (IVT), use an enzymatically capped CleanCap AG analogue, and perform Reverse-Phase HPLC to remove dsRNA hairpin byproducts.',
    validationAssay: 'ELISA for human IFN-β and TNF-α in peripheral blood mononuclear cells (PBMCs), plus capillary electrophoresis for RNA integrity.',
    difficulty: 'Industry Expert'
  },
  {
    id: 'case-3-oligo-renal-clearance',
    title: 'The Rapid-Clearance Antisense Oligonucleotide (ASO)',
    aiTool: 'In Silico RNAi / ASO Target Predictor',
    scenario: 'An AI model predicts a 20-mer antisense oligonucleotide sequence with sub-nanomolar hybridization affinity (Tm = 74°C) to a target mRNA. The oligo is synthesized using a standard unmodified phosphodiester DNA backbone.',
    aiOutput: 'Predicted 99.9% target mRNA knockdown with zero predicted off-target sequence matches.',
    whyItFailsInVivo: 'When injected intravenously, serum 3\'-exonucleases (e.g. phosphodiesterase I) digest the unmodified phosphodiester backbone within 5 to 15 minutes. The fragments are rapidly filtered by kidney glomeruli and excreted in urine before reaching target tissue cells.',
    biophysicalPrinciple: 'Nucleolytic Hydrolysis & Pharmacokinetic Half-Life (t1/2). Phosphodiester linkage cleavage kinetics in human serum.',
    correctiveStrategy: 'Synthesize a "Gapmer" design with a phosphorothioate (PS) backbone (sulfur replacing non-bridging oxygen) to resist nucleases and promote serum albumin binding, flanked by 2\'-O-methoxyethyl (2\'-MOE) or Locked Nucleic Acid (LNA) wings, plus GalNAc3 conjugation for liver targeting.',
    validationAssay: 'LC-MS/MS bioanalytical PK in cynomolgus monkey serum, human serum stability incubation assay (0 to 72 hours), and RNase H-mediated cleavage assay.',
    difficulty: 'Advanced'
  },
  {
    id: 'case-4-superoptimal-codon-aggregation',
    title: 'The "Maximum Speed" Codon Optimization Misfolding Trap',
    aiTool: 'Deep Learning Codon Replacement Engine',
    scenario: 'To maximize production of a complex multi-domain human antibody fragment in CHO cells, an AI replaces every single codon with the highest-abundance synonymous codon, creating an mRNA containing 100% super-optimal codons.',
    aiOutput: 'Maximum predicted CAI (Codon Adaptation Index = 1.0) and predicted 500% increase in translation rate.',
    whyItFailsInVivo: 'Ribosomes race across the mRNA without natural pauses. Multi-domain proteins require programmed ribosomal pausing at rare codons (dwell times) to allow the N-terminal domain to fold correctly before the C-terminal domain emerges from the exit tunnel. Without pauses, the hydrophobic domains misfold simultaneously, forming insoluble inclusion body aggregates.',
    biophysicalPrinciple: 'Co-Translational Protein Folding Kinetics vs. Elongation Rates. Ribosomal elongation speed must be harmonized with domain folding rates.',
    correctiveStrategy: 'Maintain natural codon rarity frequencies at inter-domain linker regions ("Codon Harmonization"). Introduce programmed translation pauses between independently folding domains.',
    validationAssay: 'Ribo-seq (Ribosome Profiling) translation pause mapping, analytical Size Exclusion Chromatography (SEC-HPLC), and Circular Dichroism (CD) spectra.',
    difficulty: 'Intermediate'
  },
  {
    id: 'case-5-buried-polar-rfdiffusion',
    title: 'The Buried Polar Amide Aggregation Failure in De Novo Binders',
    aiTool: 'RFdiffusion + ProteinMPNN',
    scenario: 'A generative AI pipeline designs a de novo 80-amino acid mini-protein binder to an oncogenic receptor. The model outputs a high-confidence prediction with zero steric clashes and high shape complementarity (Sc = 0.78).',
    aiOutput: 'Predicted sub-nanomolar binder with perfect backbone alignment to the target interface.',
    whyItFailsInVivo: 'The sequence placed two buried Asparagine (Asn) and Glutamine (Gln) residues inside the hydrophobic binding interface without pairing their polar amide NH/C=O groups with hydrogen bonding partners. In water, desolvating these unpaired polar groups requires a severe thermodynamic penalty (+5 to +10 kcal/mol), completely destroying binding.',
    biophysicalPrinciple: 'Solvation Free Energy & Desolvation Penalty (Born / Poisson-Boltzmann electrostatics). Burying unpaired polar groups in a non-polar core is energetically catastrophic.',
    correctiveStrategy: 'Filter AI designs through explicit Hydrogen-Bond Network (HBNet) algorithms to guarantee that every buried polar atom participates in an idealized bifurcated or secondary structural H-bond before synthesis.',
    validationAssay: 'Yeast Surface Display with FACS titration, NanoDSF thermal denaturation (Tm measurement), and Isothermal Titration Calorimetry (ITC).',
    difficulty: 'Industry Expert'
  },
  {
    id: 'case-6-crispr-chromatin-blindness',
    title: 'The Epigenetically Occluded CRISPR-Cas9 Cleavage Failure',
    aiTool: 'Linear Sequence CRISPR gRNA Optimizer',
    scenario: 'An AI tool analyzes the genomic sequence of a disease gene and predicts a top-ranking 20-nt guide RNA with a 98% On-Target score based on PAM frequency and minimal linear off-target matches. When tested in primary patient T-cells, cleavage efficiency is 0%.',
    aiOutput: 'Rank #1 gRNA with zero predicted off-targets across the human reference genome.',
    whyItFailsInVivo: 'The target locus in primary T-cells is packaged into dense, methylated heterochromatin (H3K9me3/H3K27me3 marks) with tightly wrapped nucleosomes. Cas9 cannot access DNA wrapped tightly around histone octamers in condensed chromatin, regardless of sequence complementarity.',
    biophysicalPrinciple: 'Chromatin Accessibility & Nucleosome Steric Occlusion. Linear DNA sequences do not reflect 3D epigenetic accessibility in living primary cells.',
    correctiveStrategy: 'Cross-reference gRNA predictions with cell-type-specific ATAC-seq (Assay for Transposase-Accessible Chromatin) and DNase I hypersensitivity profiles. Select gRNAs located in nucleosome-depleted open chromatin regions.',
    validationAssay: 'ATAC-seq for chromatin accessibility, GUIDE-seq / rhAmpSeq for cellular on/off-target cleavage quantification, and Western Blot for target protein knockout.',
    difficulty: 'Intermediate'
  }
];

export const BIOTECH_INTERVIEW_QUESTIONS: BiotechInterviewQuestion[] = [
  {
    id: 'q1',
    category: 'Structural Bio AI',
    roleTarget: 'Computational Structural Biologist / AI Drug Discovery Scientist',
    question: 'How do you interpret AlphaFold3 predicted alignment error (PAE) matrices versus pLDDT scores when deciding whether to trust an AI-predicted protein-ligand or protein-protein complex?',
    context: 'Big Pharma interview scenario: candidate is presented with an AlphaFold3 prediction of an antibody-antigen complex where individual domains have pLDDT > 85 but the interface is ambiguous.',
    highYieldKeywords: ['pLDDT (local confidence)', 'PAE matrix (relative domain orientation)', 'ipTM (interface predicted TM-score)', 'Clash score', 'Induced-fit dynamics'],
    modelAnswerSummary: 'pLDDT measures local stereochemical accuracy for individual residues (alpha carbon coordinates), while PAE (Predicted Alignment Error) measures the uncertainty in the relative position and orientation between two distinct residues or domains. A high pLDDT inside both proteins does NOT mean the binding interface is real if the inter-chain PAE is high (> 15 Å) and ipTM < 0.6.',
    detailedExplanation: 'In AlphaFold3 and multimer models, pLDDT reflects whether a single residue is in a well-defined secondary structure. However, domains can be internally rigid while having completely uncertain relative docking orientations. The candidate must evaluate the off-diagonal quadrants of the PAE matrix. Low off-diagonal PAE (< 5 Å) combined with an ipTM > 0.8 and no heavy-atom steric clashes indicates high confidence in the quaternary interface.',
    pitfallsToAvoid: [
      'Assuming high pLDDT alone validates a protein-protein interaction interface',
      'Ignoring the interface TM-score (ipTM) when evaluating multimeric complexes',
      'Failing to verify whether the complex requires post-translational modifications (PTMs) like glycosylation that alter binding'
    ]
  },
  {
    id: 'q2',
    category: 'mRNA & Oligo Therapeutics',
    roleTarget: 'mRNA Therapeutics Scientist / Oligo Formulation Lead',
    question: 'Why is N1-methylpseudouridine (m1Ψ) critical in modern mRNA vaccines, and how does the formulation of ionizable lipids in Lipid Nanoparticles (LNPs) ensure endosomal escape without systemic toxicity?',
    context: 'Biotech startup developing mRNA cancer vaccines asks how the molecular modification and delivery chemistry work in concert.',
    highYieldKeywords: ['N1-methylpseudouridine (m1Ψ)', 'TLR7/8 & RIG-I evasion', 'Ionizable lipid pKa (6.2 - 6.8)', 'Endosomal membrane destabilization', 'Hexagonal H_II phase transition'],
    modelAnswerSummary: 'm1Ψ prevents synthetic mRNA from activating innate immune sensors (TLR7, TLR8, RIG-I), eliminating interferon-mediated shutdown of translation and cellular toxicity. Ionizable lipids (e.g. ALC-0315, SM-102) remain neutral at physiological pH (7.4) for low toxicity in circulation, but become protonated and positively charged in the acidic endosome (pH ~5.5-6.0), fusing with anionic endosomal lipids to trigger inverted hexagonal phase transition and cytosolic release.',
    detailedExplanation: 'The 2023 Nobel Prize-winning discovery by Karikó and Weissman demonstrated that nucleoside modifications suppress immune recognition while enhancing translational capacity. Meanwhile, ionizable lipids possess an apparent pKa between 6.2 and 6.8. In the bloodstream (pH 7.4), they are uncharged, minimizing opsonization and erythrocyte lysis. Upon endocytosis, protonation creates an electrostatic interaction with anionic endosomal phospholipid heads (e.g., phosphatidylserine), inducing inverted cone geometry (H_II phase) that disrupts the bilayer and spills the mRNA into the cytoplasm.',
    pitfallsToAvoid: [
      'Confusing permanently cationic lipids (DOTAP/DOTMA - highly toxic) with ionizable lipids (SM-102/ALC-0315)',
      'Forgetting the role of helper lipids (DSPC for bilayer stability, Cholesterol for packing, PEG-lipid for stealth circulation)',
      'Claiming pseudouridine increases hybridization affinity rather than suppressing innate immune pattern recognition'
    ]
  },
  {
    id: 'q3',
    category: 'Protein Design',
    roleTarget: 'De Novo Protein Design Scientist / Generative Biologics Engineer',
    question: 'You generated 5,000 de novo binder backbones using RFdiffusion and designed their sequences with ProteinMPNN. What computational filters and biophysical triage pipeline do you execute before ordering gene synthesis for wet-lab validation?',
    context: 'Leading protein design company (e.g., Generate Biomedicines, Institute for Protein Design) evaluates candidate’s ability to filter in silico noise.',
    highYieldKeywords: ['AlphaFold2 self-consistency (scRMSD < 1.5 Å)', 'pAE interface < 10 Å', 'Shape complementarity (Sc > 0.65)', 'Buried unsatisfied polar amides (HBNet = 0)', 'Hydrophobic patch area (SASA)', 'Net charge & isoelectric point (pI)'],
    modelAnswerSummary: 'Run AlphaFold2 in single-sequence or multimer self-consistency mode: filter for scRMSD < 1.5 Å between RFdiffusion backbone and AF2 predicted structure, ipTM > 0.8, shape complementarity Sc > 0.65, zero buried unsatisfied polar hydrogen bonds, and eliminate designs with large hydrophobic surface patches or extreme pI to prevent non-specific aggregation.',
    detailedExplanation: 'A production pipeline uses a multi-tier triage filter: Tier 1: AF2 initial monomer self-consistency (scRMSD < 1.5 Å, pLDDT > 85). Tier 2: Target complex prediction (ipTM > 0.8, interface pLDDT > 80, inter-chain PAE < 8 Å). Tier 3: Biophysical surface chemistry (Rosetta buried unsatisfied polar atoms = 0, surface hydrophobicity SAP score < 15, shape complementarity Sc > 0.68). Tier 4: Sequence developability (remove deamidation motifs NG, isomerization DG, cleavage DP, and unpaired Cysteines). The top 48–96 candidates are then synthesized via high-throughput oligo pools for yeast surface display.',
    pitfallsToAvoid: [
      'Sending raw RFdiffusion outputs straight to gene synthesis without self-consistency validation',
      'Ignoring developability liabilities like free cysteines or NG deamidation sites',
      'Overlooking solubility metrics leading to insoluble inclusion body formation in E. coli'
    ]
  },
  {
    id: 'q4',
    category: 'Gene Editing & NGS',
    roleTarget: 'Gene Editing Scientist / CRISPR Pipeline Specialist',
    question: 'How do you differentiate between CRISPR-Cas9 on-target cleavage efficiency and off-target genotoxicity in human therapeutic cell manufacturing, and what unbiased cellular assays are required for an FDA IND submission?',
    context: 'Cell and gene therapy biotech preparing an IND submission for an ex vivo sickle cell or CAR-T gene knockout program.',
    highYieldKeywords: ['GUIDE-seq / CIRCLE-seq (unbiased genome-wide off-target profiling)', 'Targeted deep amplicon sequencing (rhAmpSeq / UMI-NGS)', 'High-fidelity Cas9 variants (e.g. HiFi Cas9, eSpCas9)', 'Large genomic rearrangements & chromothripsis', 'Indel spectrum analysis (Frameshift %)'],
    modelAnswerSummary: 'On-target efficiency is quantified using targeted deep NGS amplicon sequencing to measure the percentage of productive frameshift indels. Off-target liabilities cannot be assessed by in silico algorithms alone; FDA requires unbiased genome-wide cellular experimental assays like GUIDE-seq or CIRCLE-seq to discover empirical off-target sites, followed by targeted ultra-deep NGS (>50,000x coverage with UMIs) to confirm cleavage at those candidate sites is below the limit of detection (<0.1%).',
    detailedExplanation: 'In vivo and ex vivo cell therapies require rigorous genotoxicity de-risking. Unbiased methods like GUIDE-seq integrate double-stranded oligodeoxynucleotide (dsODN) tags into double-strand breaks in living cells, mapping all cleavage events genome-wide. Identified candidate sites are then validated across multiple donor cell lines using UMI-tagged amplicon sequencing. Furthermore, karyotype analysis and digital droplet PCR (ddPCR) or long-read sequencing (PacBio/Nanopore) are conducted to screen for translocations and large chromosomal deletions.',
    pitfallsToAvoid: [
      'Relying solely on in silico BLAST or Cas-OFFinder predictions for regulatory filings',
      'Ignoring structural chromosomal translocations between on-target and off-target double-strand break sites',
      'Failing to use Unique Molecular Identifiers (UMIs) to detect rare off-target indels below PCR error rates'
    ]
  },
  {
    id: 'q5',
    category: 'mRNA & Oligo Therapeutics',
    roleTarget: 'PopVax Computational Biologist / mRNA Construct Designer',
    question: 'Why is maximizing the Codon Adaptation Index (CAI to 1.0) alone insufficient or even detrimental in clinical mRNA vaccine design, and how do you computationally balance CAI with Minimum Free Energy (MFE) secondary structures and immunogenicity?',
    context: 'PopVax interview question on the RNA Foundry engineering principles for thermostable and high-expression mRNA constructs.',
    highYieldKeywords: ['Codon Adaptation Index (CAI)', 'Minimum Free Energy (MFE / ViennaRNA)', 'Ribosome translation elongation rate vs. pausing', 'dsRNA innate immunogenicity (TLR3 / MDA5)', 'mRNA degradation rate & chemical half-life (t1/2)', 'tRNA pool exhaustion'],
    modelAnswerSummary: 'Maximizing CAI to 1.0 creates a uniform sequence of frequent codons, which can cause tRNA pool exhaustion, aberrant co-translational protein misfolding by eliminating programmed pause sites, and inadvertently create stable secondary RNA hairpins that stall the translating ribosome. In addition, excessive secondary double-stranded structures create dsRNA motifs that activate innate sensors (MDA5, TLR3). An optimal clinical algorithm (like LinearDesign) multi-optimizes for CAI (translational efficiency), MFE (chemical hydrolysis resistance at room temperature), and unstructured 5\'/3\' translation initiation windows.',
    detailedExplanation: 'In clinical mRNA manufacturing at facilities like PopVax’s RNA Foundry, sequence design is a multi-objective Pareto optimization problem: 1. Translation initiation requires relaxed secondary structure (low base-pairing probability) around the Kozak sequence and start codon to allow 43S pre-initiation complex assembly. 2. Coding sequence elongation benefits from balanced CAI (~0.85-0.92) to match physiological human tRNA abundances while maintaining necessary kinetic pausing for multi-domain viral immunogens (e.g. Hemagglutinin trimer folding). 3. Structural stability: Maximizing intramolecular base pairing (lower MFE, higher GC% without creating long uninterrupted duplexes >30bp that trigger PKR/MDA5) dramatically protects against spontaneous in-solution phosphodiester bond hydrolysis, enabling room-temperature thermostable formulations for low-resource settings.',
    pitfallsToAvoid: [
      'Thinking CAI = 1.0 is always optimal for protein expression in vivo',
      'Forgetting that rigid hairpins immediately downstream of the 5\' UTR block scanning ribosomes',
      'Ignoring that uninterrupted RNA duplexes >30 bp trigger PKR and terminate host protein synthesis'
    ]
  },
  {
    id: 'q6',
    category: 'Protein Design',
    roleTarget: 'PopVax Generative Biologics Engineer / Vaccine Immunogen Designer',
    question: 'How do you engineer a computationally designed self-assembling protein nanoparticle (e.g. I53-50, ferritin) to multivalently display variable viral epitopes (e.g., Flu HA stem or Coronavirus RBD), and how do you prevent anti-scaffold immunodominance?',
    context: 'PopVax and premier vaccine biotechs design nanoparticle immunogens to elicit broadly neutralizing antibodies with high avidity.',
    highYieldKeywords: ['Self-assembling 2-component nanoparticle (I53-50A/B)', 'Multivalent avidity & B-cell receptor (BCR) crosslinking', 'Antigen surface density & geometric spacing (5-10 nm)', 'N-linked glycosylation scaffold shielding', 'ProteinMPNN interface stabilization'],
    modelAnswerSummary: 'Multivalent presentation on icosahedral or octahedral nanoparticles (e.g. 60-mer or 120-mer) clusters B-cell receptors to trigger potent germinal center reactions even at sub-nanomolar antigen concentrations. To present variable antigens, we fuse the viral domain (e.g. HA stem) to the scaffold subunit via a rigid helical linker or SpyTag/SpyCatcher bioconjugation. To prevent anti-scaffold antibody dominance, we computationally introduce engineered N-linked glycosylation sites (PNGS: Asn-X-Ser/Thr) onto non-antigenic scaffold surfaces with ProteinMPNN, physically shielding the core with host glycans.',
    detailedExplanation: 'Engineered nanoparticle vaccines solve the low-affinity problem of monomeric subunit antigens by leveraging geometric avidity. Using tools like RFdiffusion and ProteinMPNN, we computationally dock viral targets onto symmetry axes (e.g., C3 or C5) with optimal 50-100 Å inter-epitope spacing. Potential anti-scaffold immunogenicity is mitigated through "glycan masking", where computationally placed N-glycans sterically block B-cell receptor access to the nanoparticle base, focusing the immune response exclusively on the presented viral neutralizing epitopes.',
    pitfallsToAvoid: [
      'Using overly flexible unstructured linkers that allow antigens to collapse against the nanoparticle core',
      'Overlooking steric clashes at the symmetry axes during in silico oligomerization',
      'Failing to shield immunogenic non-neutralizing scaffold surfaces with glycan masking'
    ]
  },
  {
    id: 'q7',
    category: 'Biologics & Analytics',
    roleTarget: 'PopVax Analytical Scientist / QC Lead (HPLC / LC-MS / CGE)',
    question: 'In an mRNA manufacturing batch produced via In Vitro Transcription (IVT), how do you quantitatively measure mRNA 5\'-capping efficiency, poly(A) tail length distribution, and residual double-stranded RNA (dsRNA) impurities?',
    context: 'PopVax RNA Foundry quality control and analytical release testing for mRNA vaccine candidates.',
    highYieldKeywords: ['Cap1 vs Cap0 quantification via targeted RNase H cleavage & LC-MS', 'Capillary Gel Electrophoresis (CGE) for intact full-length %', 'Anion-Exchange (AEX) & RP-HPLC for dsRNA separation', 'RNase T1 digestion & MALDI-TOF for Poly(A) sizing', 'J2 / K1 antibody immunoblot for dsRNA detection'],
    modelAnswerSummary: '5\'-Capping efficiency (targeting >95% Cap1) is measured by hybridizing a complementary DNA probe to the 5\' end, digesting with RNase H, and quantifying cleaved 5\'-fragments via high-resolution LC-MS. Intact transcript percentage is determined using automated Capillary Gel Electrophoresis (CGE) or analytical ion-pair reversed-phase HPLC (IP-RP-HPLC). Residual immunogenic dsRNA byproducts from T7 RNA polymerase run-off are quantified using dot-blot assays with J2 monoclonal antibodies and purified via preparative cellulose or reverse-phase chromatography.',
    detailedExplanation: 'Capping: In modern IVT, co-transcriptional capping reagents (like CleanCap AG) yield Cap-1 structures directly. To verify efficiency, RNase H site-specifically cleaves the first 20-30 nt, which are resolved on Orbitrap LC-MS to calculate the exact ratio of m7G-capped vs un-capped 5\'-triphosphate transcripts. Poly(A) tail: Measured via enzymatic tail-cleavage and capillary electrophoresis to ensure >100nt length with minimal polydispersity. dsRNA: T7 polymerase inherently produces antisense 3\'-extended run-off transcripts forming dsRNA; these are resolved by analytical AEX-HPLC and monitored via J2 dot-blots to ensure limits below 0.001% of total batch mass.',
    pitfallsToAvoid: [
      'Assuming standard agarose gel electrophoresis is sensitive enough for release testing',
      'Confusing Cap-0 (lacks 2\'-O-methylation on first nucleotide) with Cap-1 (essential for preventing IFIT1 sensing in human cells)',
      'Overlooking dsRNA contamination which causes severe in vivo reactogenicity and shuts down protein translation'
    ]
  }
];

export const POPVAX_ROADMAP: RoadmapLevel[] = [
  {
    levelNumber: 1,
    id: 'popvax-level-1',
    title: 'Stage 1: Viral Antigen Sequence Mining, Epitope Mapping & Homology Modeling',
    tier: 'Foundational (Low)',
    tagline: 'BioPython sequence mining, NetMHCpan epitope prediction, conservation scoring, and viral strain variability analysis.',
    description: 'Master the sequence-level foundation of PopVax’s vaccine pipeline. Learn to query NCBI/GISAID for viral strains (Influenza HA, SARS-CoV-2, TB, Hepatitis C), calculate Shannon entropy across historical isolates, predict MHC-I/II and linear B-cell epitopes, and mask N-linked glycosylation sites to discover broadly neutralizing immunogen targets.',
    rAndPythonSkills: [
      'BioPython: Bio.Entrez for NCBI automated batch downloads, Bio.Align, Bio.SeqUtils (GC%, MW, pI)',
      'R: Biostrings, GenomicAlignments, pheatmap for epitope affinity matrices, ggplot2 for entropy plots',
      'Epitope Prediction: NetMHCpan-4.1 / NetMHCIIpan API wrappers, IEDB analysis tools, Bepipred-3.0'
    ],
    toolsToMaster: [
      { name: 'BioPython & NCBI Entrez', category: 'Viral Mining', useCase: 'Automated retrieval of thousands of viral hemagglutinin/spike variants across global clades' },
      { name: 'Shannon Entropy & MUSCLE', category: 'Conservation Profiling', useCase: 'Identifying hypervariable immune-escape loops vs. ultra-conserved neutralizing target sites' },
      { name: 'NetMHCpan-4.1 (CLI / API)', category: 'Immune Epitopes', useCase: 'Predicting IC50 binding affinity across diverse human HLA-A/B/C alleles for cytotoxic T-cell activation' },
      { name: 'NetNGlyc-1.0 / GlycoEP', category: 'Post-Translational Masking', useCase: 'Mapping sequons (Asn-X-Ser/Thr) that shield protein epitopes in viral isolates' }
    ],
    freeResources: [
      {
        title: 'Computational Vaccinology & Epitope Prediction Course',
        providerOrChannel: 'Bioinformatics.org / IEDB Training (Free Web Workshops)',
        url: 'https://help.iedb.org/hc/en-us/articles/114094145951-Online-Tools-Tutorials',
        type: 'Free Course',
        description: 'Comprehensive tutorials on MHC-I, MHC-II, and B-cell epitope prediction using the Immune Epitope Database (IEDB).'
      },
      {
        title: 'BioPython for Vaccine & Genomic Data Analysis',
        providerOrChannel: 'BioPython Tutorial & Cookbook (Free Documentation)',
        url: 'https://biopython.org/DIST/docs/tutorial/Tutorial.html',
        type: 'Documentation / Book',
        description: 'Complete hands-on reference for programmatic sequence retrieval, multi-alignment manipulation, and PDB parsing.'
      },
      {
        title: 'Nextstrain: Real-time Tracking of Pathogen Evolution',
        providerOrChannel: 'Nextstrain Team (Open-source Platform)',
        url: 'https://docs.nextstrain.org/en/latest/learn/about-nextstrain.html',
        type: 'Interactive Tutorial',
        description: 'Learn how phylogenetic trees and clade-defining mutations are tracked for global influenza and coronavirus surveillance.'
      }
    ],
    practicalExercises: [
      'Exercise 1.1: Automated Viral Antigen Mining & Conserved Epitope Extraction (BioPython + Shannon Entropy over 500+ Influenza A HA sequences).',
      'Exercise 1.2: HLA-A*02:01 T-Cell Epitope Affinity Matrix & Glycan Sequon Masking in R (pheatmap + NetMHCpan output processing).',
      'Exercise 1.3: Homology-based Trimer Modeling & B-Cell Epitope Solvent Accessibility Scoring (Bio.PDB + FreeSASA).'
    ],
    capstoneProject: {
      title: 'PopVax-EpitopeScout: Broadly Protective Viral Antigen Discovery Engine',
      overview: 'Develop an automated end-to-end Python/R pipeline that ingests hundreds of global Influenza A (H1N1/H3N2) or Hepatitis C viral isolates, computes position-specific Shannon entropy to locate universally conserved neutralizing patches, predicts high-affinity human HLA Class-I/II T-cell epitopes, and maps N-linked glycan shields onto a 3D structural model.',
      deliverables: [
        'Automated Python script (`antigen_miner.py`) fetching FASTA records from NCBI, aligning sequences, and outputting conservation metrics.',
        'R statistical script (`epitope_analysis.R`) generating publication-grade epitope binding affinity heatmaps across 12 global HLA alleles.',
        'Validated FASTA report prioritizing top 5 broadly protective vaccine immunogen candidate sequences for subsequent mRNA construct design.'
      ]
    }
  },
  {
    levelNumber: 2,
    id: 'popvax-level-2',
    title: 'Stage 2: mRNA Construct Engineering, Codon Optimization & Thermostability',
    tier: 'Intermediate',
    tagline: 'Designing clinical mRNA transcripts: Codon Adaptation Index, ViennaRNA/LinearFold MFE secondary structure, and N1-methylpseudouridine.',
    description: 'Directly address PopVax’s core mission: engineering high-expression, room-temperature thermostable mRNA vaccines. Learn to optimize the Open Reading Frame (ORF) for human translation, balance GC-content clamps, compute Minimum Free Energy (MFE) secondary structures with ViennaRNA, and engineer 5\'/3\' UTRs to prevent enzymatic degradation without stalling the ribosome.',
    rAndPythonSkills: [
      'Python: ViennaRNA python module (RNA.fold, RNA.bppm), LinearFold, BioPython SeqUtils, NumPy',
      'R: seqinr (codon usage indices, CAI calculation, relative synonymous codon usage RSCU)',
      'Multi-Objective Optimization: Pareto front balancing between translational speed (CAI) and chemical stability (MFE)'
    ],
    toolsToMaster: [
      { name: 'ViennaRNA Package (RNAfold / RNAeval / RNAalifold)', category: 'Secondary Structure', useCase: 'Calculating MFE, base-pairing probability matrices (BPPM), and ensemble defect' },
      { name: 'LinearFold & LinearDesign (Baidu/Stanford)', category: 'Linear-Time RNA Optimization', useCase: 'Simultaneous codon and secondary structure optimization in O(n) time for long mRNA transcripts' },
      { name: 'BioPython CodonUsage & GC-clamp Analyzers', category: 'Translation Kinetics', useCase: 'Eliminating premature polyA signals, splice sites, and extreme GC-bias in the transcript' },
      { name: 'UTRdb & Ribosome Density Predictors', category: 'Regulatory RNA', useCase: 'Designing high-efficiency human alpha-globin / beta-globin 5\' and 3\' UTR configurations' }
    ],
    freeResources: [
      {
        title: 'ViennaRNA Package 2.0 Web & Python Manual',
        providerOrChannel: 'University of Vienna Theoretical Chemistry (Documentation)',
        url: 'https://www.tbi.univie.ac.at/RNA/documentation.html',
        type: 'Documentation / Book',
        description: 'The definitive guide to secondary structure prediction, thermodynamic parameters, and Python scripting.'
      },
      {
        title: 'LinearDesign: Efficient Algorithm for mRNA Vaccine Optimization (Nature 2023)',
        providerOrChannel: 'Nature / Baidu Research (Open Access Paper & GitHub)',
        url: 'https://github.com/LinearDesignSoftware/LinearDesign',
        type: 'Interactive Tutorial',
        description: 'Learn the exact dynamic programming and context-free grammar approach behind modern clinical mRNA optimization.'
      },
      {
        title: 'mRNA Translation, Decay & Stability Foundations',
        providerOrChannel: 'iBiology / MIT OpenCourseWare (YouTube Series)',
        url: 'https://www.youtube.com/watch?v=0h09g8zW5m4',
        type: 'YouTube Video / Playlist',
        description: 'First-principles breakdown of ribosome scanning, eIF4E cap binding, poly(A) binding proteins, and mRNA turnover.'
      }
    ],
    practicalExercises: [
      'Exercise 2.1: Multi-Objective Codon Optimization Algorithm in Python (Balancing Human CAI vs. GC-Clamp Distribution).',
      'Exercise 2.2: RNA Secondary Structure & In-Solution Hydrolysis Half-Life Predictor using ViennaRNA Python bindings.',
      'Exercise 2.3: UTR Flanking & In Vitro Transcription (IVT) Construct Generator (Adding T7 promoter, Kozak, and 120nt Poly-A tail).'
    ],
    capstoneProject: {
      title: 'Thermostable-mRNA-Forge: Clinical-Grade mRNA Sequence Optimization Suite',
      overview: 'Build a production Python/R tool that takes any viral protein sequence, performs Pareto-optimal synonymous codon substitution to maximize human Codon Adaptation Index (CAI > 0.88), maximizes thermodynamic stability (MFE < -450 kcal/mol) using ViennaRNA, verifies zero cryptic splice sites / premature termination signals, and outputs a complete IVT-ready DNA template sequence.',
      deliverables: [
        'Modular Python engine (`mrna_optimizer.py`) with customizable weighting for CAI vs. MFE stability.',
        'Thermodynamics validation script (`structure_evaluator.py`) generating base-pairing dot plots and secondary structure SVG diagrams.',
        'Automated quality check report (`ivt_qc_check.py`) confirming compliance with PopVax RNA Foundry IVT synthesis specifications.'
      ]
    }
  },
  {
    levelNumber: 3,
    id: 'popvax-level-3',
    title: 'Stage 3: Generative Protein Design & Self-Assembling Antigen Nanoparticles',
    tier: 'Advanced',
    tagline: 'Deep learning protein design: ESM-2 zero-shot fitness, ProteinMPNN sequence design, RFdiffusion, and multivalent nanoparticle scaffolds.',
    description: 'Harness PopVax’s generative AI design engine. Learn how deep learning models (ESM-2, ESMFold, AlphaFold3, ProteinMPNN, RFdiffusion) are deployed to design self-assembling protein nanoparticles (e.g. 60-mer icosahedra) that multivalently display engineered viral antigens to elicit broad neutralizing antibody titers.',
    rAndPythonSkills: [
      'PyTorch & HuggingFace: Loading ESM-2 (esm2_t33_650M_UR50D), computing zero-shot log-likelihood ratios (ΔLLR)',
      'Structural AI: Interfacing with ProteinMPNN for sequence redesign, ESMFold / ColabFold for self-consistency validation',
      'Geometry & Symmetry: Docking and grafting viral epitopes onto 2-component symmetric scaffolds (I53-50A/B)'
    ],
    toolsToMaster: [
      { name: 'ESM-2 & ESM-3 (Meta AI via PyTorch)', category: 'Protein Language Models', useCase: 'Zero-shot deep mutational scanning prediction and evolutionary sequence fitness ranking' },
      { name: 'ProteinMPNN (Baker Lab)', category: 'De Novo Sequence Design', useCase: 'Rapidly designing ultra-stable amino acid sequences given a target 3D backbone' },
      { name: 'RFdiffusion / RFdiffusion-AA', category: 'Generative Backbones', useCase: 'Generating rigid helical linkers and epitope-focused presentation scaffolds' },
      { name: 'PyMOL & Bio.PDB Parser', category: 'Structural Validation', useCase: 'Computing root-mean-square deviation (RMSD), solvent accessible surface area (SASA), and steric clash scoring' }
    ],
    freeResources: [
      {
        title: 'Deep Learning for Biomolecular Design (IPD Baker Lab Series)',
        providerOrChannel: 'Institute for Protein Design (YouTube & Open Github)',
        url: 'https://github.com/dauparas/ProteinMPNN',
        type: 'Interactive Tutorial',
        description: 'Hands-on repository and tutorials for running ProteinMPNN, symmetry-aware design, and fixed-backbone redesign.'
      },
      {
        title: 'Evolutionary Scale Modeling (ESM) Tutorials',
        providerOrChannel: 'Meta AI / HuggingFace Transformers (Documentation)',
        url: 'https://github.com/facebookresearch/esm',
        type: 'Free Course',
        description: 'Comprehensive guide to computing zero-shot variant effect scores and extracting dense per-residue embeddings.'
      },
      {
        title: 'Protein Structure Prediction with AlphaFold & ColabFold',
        providerOrChannel: 'EMBL-EBI Training (Free Course)',
        url: 'https://www.ebi.ac.uk/training/online/courses/alphafold/',
        type: 'Free Course',
        description: 'Learn the architectural foundations of Evoformer, Pair Representation, and Predicted Aligned Error (PAE) matrices.'
      }
    ],
    practicalExercises: [
      'Exercise 3.1: Zero-Shot Antigen Mutation Fitness Scoring via ESM-2 Log-Likelihood Ratios in PyTorch.',
      'Exercise 3.2: ProteinMPNN Sequence Redesign for Thermostable Nanoparticle Display Subunits.',
      'Exercise 3.3: Self-Consistency Validation Pipeline: Measuring scRMSD and interface pLDDT with ESMFold.'
    ],
    capstoneProject: {
      title: 'PopVax-NanoDisplay-AI: Multivalent Nanoparticle Vaccine Design Pipeline',
      overview: 'Create an automated generative protein engineering pipeline that takes a viral antigen domain (e.g. Influenza stem or Coronavirus receptor binding domain), grafts it onto a 60-subunit icosahedral nanoparticle scaffold, redesigns the interface with ProteinMPNN for thermal stability, scores evolutionary compatibility using ESM-2, and performs AlphaFold/ESMFold self-consistency validation (filtering for scRMSD < 1.5 Å and pLDDT > 85).',
      deliverables: [
        'PyTorch deep learning script (`esm_fitness_ranker.py`) scoring mutational tolerance across target epitopes.',
        'ProteinMPNN orchestration script (`mpnn_scaffold_designer.py`) generating 100 sequences per nanoparticle subunit with fixed catalytic/binding residues.',
        'Self-consistency structural filter (`af_validator.py`) calculating PAE, pLDDT, and interface shape complementarity.'
      ]
    }
  },
  {
    levelNumber: 4,
    id: 'popvax-level-4',
    title: 'Stage 4: High-Throughput Analytics (HPLC/LC-MS), LNP Formulation & Closed-Loop Lab Automation',
    tier: 'Cutting-Edge / AI Architect',
    tagline: 'Closing the wet-lab/dry-lab loop: PyLabRobot automation, HPLC/CGE peak deconvolution, and Nextflow active learning pipelines.',
    description: 'The ultimate qualification for PopVax’s RNA Foundry: bridging computational AI directly to the physical wet lab. Master automated analytical data parsing (Reversed-Phase HPLC for mRNA purity, LC-MS for capping efficiency, Dynamic Light Scattering for LNP size/PDI), programmatic liquid handler orchestration with PyLabRobot, and automated Nextflow pipelines driving closed-loop Bayesian optimization.',
    rAndPythonSkills: [
      'Python: SciPy (signal processing for HPLC chromatogram peak deconvolution, baseline correction), pandas, PyLabRobot',
      'Workflow Engineering: Nextflow DSL2, Docker/Singularity containerization for reproducibility in GMP environments',
      'Active Learning: Bayesian Optimization (BoTorch / scikit-optimize) to iterate LNP formulation parameters (N/P ratio, lipid molar ratios)'
    ],
    toolsToMaster: [
      { name: 'SciPy Signal & Baseline Deconvolution', category: 'Analytical QC', useCase: 'Automated peak integration of RP-HPLC and CGE chromatograms to calculate intact mRNA purity percentage' },
      { name: 'PyLabRobot / Liquid Handler APIs', category: 'Robotic Automation', useCase: 'Programmatically generating 96-well pipetting protocols for Tecan/Hamilton robots at the RNA Foundry' },
      { name: 'Nextflow DSL2 + Docker', category: 'Closed-Loop Pipeline', useCase: 'End-to-end automated pipeline linking raw analytical instrument data back to in silico design models' },
      { name: 'BoTorch / Bayesian Optimization', category: 'Experimental Optimization', useCase: 'Guiding next-round wet-lab experiments to maximize mRNA encapsulation efficiency and in vivo translation' }
    ],
    freeResources: [
      {
        title: 'PyLabRobot: Universal Open-Source Lab Automation in Python',
        providerOrChannel: 'PyLabRobot Open Source Community (Documentation)',
        url: 'https://docs.pylabrobot.org/',
        type: 'Interactive Tutorial',
        description: 'Learn how to program liquid handlers, plate readers, and temperature blocks using pure Python.'
      },
      {
        title: 'Nextflow & nf-core Reproducible Pipeline Architecture',
        providerOrChannel: 'Seqera Labs / nf-core (Free Modular Training)',
        url: 'https://training.nextflow.io/',
        type: 'Free Course',
        description: 'Industry standard workflow engine for multi-stage computational biology pipelines running locally or on AWS/GCP.'
      },
      {
        title: 'Analytical Method Development for mRNA & Biologics (HPLC / CE / MS)',
        providerOrChannel: 'Separation Science / LCGC (Free Web Seminars)',
        url: 'https://www.chromatographyonline.com/',
        type: 'Documentation / Book',
        description: 'Practical guides on Ion-Pair RP-HPLC column chemistry, Capillary Gel Electrophoresis, and MS characterization of nucleic acids.'
      }
    ],
    practicalExercises: [
      'Exercise 4.1: Automated RP-HPLC & Capillary Gel Electrophoresis (CGE) Chromatogram Peak Deconvolution (Python SciPy).',
      'Exercise 4.2: PyLabRobot 96-Well High-Throughput LNP Formulation & Micromixer Dispensing Script.',
      'Exercise 4.3: Bayesian Optimization of LNP Formulation Parameters (Ionizable Lipid pKa, N/P Ratio, Cholesterol %).'
    ],
    capstoneProject: {
      title: 'PopVax-ClosedLoop-Foundry: High-Throughput mRNA Analytical & Formulation Flywheel',
      overview: 'Architect a production Nextflow pipeline that mirrors PopVax’s automated RNA Foundry. The pipeline ingests raw RP-HPLC and CGE instrument chromatograms from automated IVT runs, computes peak integration and % intact mRNA, assesses LNP size and polydispersity index from DLS data, updates a Bayesian active learning model, and automatically generates the next batch of optimized in silico sequences and liquid handler pipetting files.',
      deliverables: [
        'Analytical instrument parsing script (`hplc_cge_deconvolver.py`) with Gaussian peak fitting, baseline subtraction, and purity metrics.',
        'Robotic pipetting protocol generator (`hamilton_formulation_robot.py`) using PyLabRobot for 96-well LNP screening.',
        'Production Nextflow pipeline (`main.nf`) orchestrating QC analysis, feedback model updates, and candidate selection with full Docker containerization.'
      ]
    }
  }
];

export const AI_BIOTECH_TOOLS: AiBiotechTool[] = [
  {
    name: 'AlphaFold 3 / Boltz-1 / Chai-1',
    category: 'Structure Prediction (Proteins, DNA, RNA, Small Ligands, PTMs)',
    coreCapability: 'Diffusion-based structural prediction of all-atom biomolecular complexes including nucleic acids, ions, and chemical ligands with high accuracy.',
    knownLimitations: 'Cannot predict thermodynamic free energy of binding (ΔG), solvent entropy, kinetic rate constants (kon/koff), or dynamic conformational transitions (e.g. induced fit).',
    howHumanEngineersWin: 'Use AF3 as an initial structural hypothesis generator; validate binding stability with explicit-solvent MD simulations, SPR binding kinetics, and HDX-MS conformational footprinting.',
    recommendedWorkflow: 'Generate top 5 ranked models → Check PAE matrix and ipTM → Run 500ns MD simulation in OpenMM → Measure solvent accessibility → Validate in vitro with purified protein.'
  },
  {
    name: 'RFdiffusion & RFdiffusion-AA',
    category: 'De Novo Protein & Binder Backbone Generation',
    coreCapability: 'Denoising diffusion probabilistic model that generates novel protein backbones from scratch or creates focused binders conditioned on target surface epitopes.',
    knownLimitations: 'Generates un-sequenced poly-glycine/alanine backbones; does not consider side-chain packing, buried polar hydrogen-bonding networks, or expressibility.',
    howHumanEngineersWin: 'Pair RFdiffusion with ProteinMPNN and Rosetta HBNet to place buried hydrogen-bonding networks, and filter with AlphaFold self-consistency checks before synthesis.',
    recommendedWorkflow: 'Target epitope specification → RFdiffusion 5,000 trajectories → ProteinMPNN 8 sequences/backbone → AF2 self-consistency filter → HBNet polar check → Yeast display screening.'
  },
  {
    name: 'ESM-3 & Protein Language Models',
    category: 'Generative Protein Language & Multi-Modal Design',
    coreCapability: 'Generative masked language models trained on billions of evolutionary protein sequences that can simultaneously reason over sequence, 3D structure, and function.',
    knownLimitations: 'Can hallucinate sequences that lack soluble expression in bacterial or mammalian hosts due to non-natural hydrophobic patch distribution.',
    howHumanEngineersWin: 'Apply developability heuristics (CamSol solubility scoring, NetSurfP surface analysis, aggregation propensities) to filter generative outputs.',
    recommendedWorkflow: 'Prompt ESM-3 with structural motif constraints → Sample evolutionary plausible sequences → Score with ESM-1v zero-shot variant stability → Filter for solubility.'
  },
  {
    name: 'OpenMM & GROMACS',
    category: 'All-Atom Molecular Dynamics & Free Energy Perturbation',
    coreCapability: 'Physics-based simulation of atomic motions over time in explicit water with physiological counterions, computing free energy trajectories and flexibility.',
    knownLimitations: 'Computationally expensive; limited by classical force-field approximations and sampling time limits (microsecond scale).',
    howHumanEngineersWin: 'Leverage enhanced sampling (Metadynamics, Umbrella Sampling, FEP+) on GPU clusters to compute accurate ΔΔG of binding for prospective drug molecules.',
    recommendedWorkflow: 'AI prediction initial coordinate feed → Solvate with TIP3P water & 150mM NaCl → Energy minimization → NVT/NPT equilibration → 200ns production run → RMSF & SASA extraction.'
  }
];
