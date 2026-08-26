import { DogmaStep } from '../types';

export const CENTRAL_DOGMA_STEPS: DogmaStep[] = [
  {
    id: 'replication',
    stepNumber: 1,
    title: 'DNA Replication',
    subtitle: 'Copying the Master Genetic Blueprint',
    shortTag: 'DNA ➔ DNA',
    imageSrc: '/src/assets/images/dna_replication_step_1787721811902.jpg',
    imageAlt: 'DNA Replication Fork with Helicase, DNA Polymerase, and Okazaki Fragments',
    location: 'Nucleus',
    cellularPhase: 'S Phase (Synthesis) of Interphase',
    summary: 'Before a cell divides, it must faithfully duplicate its entire genome so both daughter cells inherit an identical complete set of instructions. This is semiconservative: each daughter molecule keeps one original parental strand and gains one newly built strand.',
    whyItMatters: 'Without high-fidelity DNA replication, cells cannot multiply, repair tissues, or pass on genetic inheritance without fatal mutations and genomic instability.',
    detailedProcess: [
      {
        phase: '1. Initiation & Unwinding',
        description: 'Initiator proteins recognize origin sequences (oriC). DNA Helicase breaks the hydrogen bonds between base pairs, unzipping the double helix and forming a Y-shaped replication fork.',
        keyPoints: [
          'Topoisomerase / Gyrase relieves upstream supercoiling strain.',
          'Single-Stranded Binding Proteins (SSBs) prevent the single strands from snapping back together.'
        ]
      },
      {
        phase: '2. Priming',
        description: 'DNA Polymerases cannot start synthesis from scratch; they need an existing 3\'-OH group. RNA Primase synthesizes a short complementary RNA primer (~10 nucleotides).',
        keyPoints: [
          'Provides the free 3\'-hydroxyl chemical hook needed for DNA Polymerase III.'
        ]
      },
      {
        phase: '3. Elongation (Leading vs. Lagging Strands)',
        description: 'DNA Polymerase synthesizes strictly in the 5\' ➔ 3\' direction. Because the template strands are antiparallel, synthesis proceeds differently on each strand.',
        keyPoints: [
          'Leading Strand: Synthesized continuously toward the progressing replication fork.',
          'Lagging Strand: Synthesized discontinuously away from the fork in short segments called Okazaki Fragments (~100-200 bp in eukaryotes, ~1000-2000 bp in bacteria).'
        ]
      },
      {
        phase: '4. Primer Removal, Gap Filling & Ligation',
        description: 'RNA primers are excised and replaced with deoxynucleotides by DNA Polymerase I (in prokaryotes) or RNase H / Pol delta (in eukaryotes).',
        keyPoints: [
          'DNA Ligase seals the remaining nicks in the sugar-phosphate backbone using ATP/NAD+, creating continuous intact strands.'
        ]
      }
    ],
    enzymes: [
      {
        name: 'DNA Helicase',
        category: 'Unwinding Machine',
        role: 'Unzips the DNA double helix by breaking hydrogen bonds between base pairs.',
        mechanism: 'Hexameric ring motor powered by ATP hydrolysis.',
        location: 'Replication Fork',
        funFact: 'Can unwind DNA at speeds up to 1,000 base pairs per second!'
      },
      {
        name: 'Topoisomerase (Gyrase)',
        category: 'Strain Reliever',
        role: 'Cuts, rotates, and reseals DNA strands to prevent torsional supercoiling ahead of helicase.',
        mechanism: 'Transiently nicks single or double strands and swivels them.',
        location: 'Ahead of replication fork',
        funFact: 'Many chemotherapy drugs (e.g. camptothecin) target topoisomerases to stop cancer cell division.'
      },
      {
        name: 'RNA Primase',
        category: 'Initiator Polymerase',
        role: 'Synthesizes short RNA primers required for DNA polymerase to bind and extend.',
        mechanism: 'RNA polymerase specialized for de novo synthesis on single-strand DNA templates.',
        location: 'Origin & Lagging strand fragments'
      },
      {
        name: 'DNA Polymerase III / δ & ε',
        category: 'Master Synthesizer',
        role: 'Adds complementary dNTPs (A, T, C, G) to the growing 3\'-OH strand with high-fidelity proofreading.',
        mechanism: '5\' ➔ 3\' polymerase activity + 3\' ➔ 5\' exonuclease proofreading activity.',
        location: 'Leading and Lagging strands',
        funFact: 'Has an error rate of only 1 in 100 million bases thanks to instant proofreading!'
      },
      {
        name: 'DNA Ligase',
        category: 'Molecular Glue',
        role: 'Catalyzes phosphodiester bond formation to seal Okazaki fragments into continuous DNA.',
        mechanism: 'Uses ATP (or NAD+ in bacteria) to join 3\'-OH to 5\'-phosphate.',
        location: 'Lagging strand joints'
      }
    ],
    hotspots: [
      {
        id: 'helicase-spot',
        x: 35,
        y: 48,
        label: 'Helicase Unwinding Point',
        description: 'The molecular motor splitting double-stranded DNA into two separate template strands.'
      },
      {
        id: 'leading-strand-spot',
        x: 65,
        y: 28,
        label: 'Leading Strand (Continuous 5\' ➔ 3\')',
        description: 'Synthesized smoothly toward the replication fork without interruption.'
      },
      {
        id: 'lagging-strand-spot',
        x: 68,
        y: 72,
        label: 'Lagging Strand (Okazaki Fragments)',
        description: 'Built in reverse segments that must be stitched together by DNA Ligase.'
      }
    ],
    commonMisconceptions: [
      {
        myth: 'DNA replication happens during cell mitosis.',
        fact: 'DNA replicates before division during the S-phase of Interphase, not during active mitosis.'
      },
      {
        myth: 'Both DNA strands are synthesized continuously.',
        fact: 'Because DNA Polymerase can only add nucleotides to the 3\' end, one strand (lagging) MUST be made in short discontinuous Okazaki pieces.'
      }
    ],
    quickCheck: {
      question: 'Which enzyme is responsible for joining the Okazaki fragments on the lagging strand into a continuous sugar-phosphate backbone?',
      options: ['DNA Helicase', 'RNA Primase', 'DNA Ligase', 'Topoisomerase'],
      correctIndex: 2,
      explanation: 'DNA Ligase acts as the molecular glue, forming covalent phosphodiester bonds between adjacent Okazaki fragments.'
    }
  },
  {
    id: 'transcription',
    stepNumber: 2,
    title: 'Transcription',
    subtitle: 'Rewriting DNA into Messenger RNA',
    shortTag: 'DNA ➔ pre-mRNA',
    imageSrc: '/src/assets/images/transcription_step_1787721835918.jpg',
    imageAlt: 'Transcription Bubble with RNA Polymerase synthesising single-stranded RNA',
    location: 'Nucleus',
    cellularPhase: 'Throughout G1 and G2 phases of cell life',
    summary: 'The cell transcribes the specific sequence of a gene from the permanent DNA storage format into a portable single-stranded messenger RNA (mRNA) copy. Uracil (U) replaces Thymine (T) during this step.',
    whyItMatters: 'Protects the original master DNA inside the nucleus while allowing millions of temporary RNA copies to travel to ribosomes for rapid protein production.',
    detailedProcess: [
      {
        phase: '1. Initiation',
        description: 'Transcription factors and RNA Polymerase bind to a specific regulatory sequence in DNA called the Promoter (such as the TATA box in eukaryotes).',
        keyPoints: [
          'Promoter dictates which DNA strand is the template and which direction to transcribe.',
          'RNA Polymerase unwinds ~14 base pairs of DNA to form the transcription bubble.'
        ]
      },
      {
        phase: '2. Elongation',
        description: 'RNA Polymerase traverses the template strand in the 3\' ➔ 5\' direction, assembling a complementary single strand of pre-mRNA in the 5\' ➔ 3\' direction.',
        keyPoints: [
          'Adenine (A) in DNA pairs with Uracil (U) in RNA.',
          'Thymine (T) in DNA pairs with Adenine (A) in RNA.',
          'Cytosine (C) pairs with Guanine (G).'
        ]
      },
      {
        phase: '3. Termination',
        description: 'RNA Polymerase reaches a termination signal (polyadenylation signal AAUAAA in eukaryotes or hairpin loop in bacteria).',
        keyPoints: [
          'The newly synthesized pre-mRNA transcript is released.',
          'RNA Polymerase dissociates from the DNA, and the double helix zips back together.'
        ]
      }
    ],
    enzymes: [
      {
        name: 'RNA Polymerase II',
        category: 'Transcriptional Engine',
        role: 'Reads DNA template strand and polymerizes complementary ribonucleotides (A, U, C, G) into pre-mRNA.',
        mechanism: 'Catalyzes phosphodiester linkages 5\' ➔ 3\' without requiring a primer.',
        location: 'Nucleus / Chromatin',
        funFact: 'Transcribes roughly 40-50 nucleotides per second in human cells!'
      },
      {
        name: 'Transcription Factors (TFs)',
        category: 'Gene Regulators',
        role: 'Bind to promoter motifs (like TATA box) to recruit and position RNA Polymerase II.',
        mechanism: 'Protein-DNA sequence-specific recognition complexes (e.g. TFIID, TFIIH).',
        location: 'Promoter & Enhancer DNA'
      }
    ],
    hotspots: [
      {
        id: 'promoter-spot',
        x: 20,
        y: 40,
        label: 'Promoter / TATA Box',
        description: 'The start docking platform where transcription factors guide RNA Polymerase.'
      },
      {
        id: 'bubble-spot',
        x: 52,
        y: 48,
        label: 'Transcription Bubble & RNA Pol',
        description: 'Where the DNA helix is temporarily opened and ribonucleotides are added.'
      },
      {
        id: 'mrna-tail-spot',
        x: 75,
        y: 65,
        label: 'Growing mRNA Transcript',
        description: 'Single-stranded RNA emerging with Uracil (U) instead of Thymine (T).'
      }
    ],
    commonMisconceptions: [
      {
        myth: 'Both strands of DNA are transcribed at the same time.',
        fact: 'Only one strand serves as the template strand for a given gene. The other strand is called the coding (sense) strand.'
      },
      {
        myth: 'RNA Polymerase requires an RNA primer like DNA Polymerase does.',
        fact: 'RNA Polymerase can initiate synthesis de novo (from scratch) without any pre-existing primer.'
      }
    ],
    quickCheck: {
      question: 'If the DNA template strand reads 3\'-TAC GGC TTA-5\', what is the complementary mRNA sequence produced during transcription?',
      options: ['5\'-AUG CCG AAU-3\'', '5\'-ATG CCG AAT-3\'', '5\'-UAC GGC UUA-3\'', '5\'-AUG GGC AAU-3\''],
      correctIndex: 0,
      explanation: 'RNA Polymerase pairs A with U, T with A, G with C, and C with G in the 5\' to 3\' direction, yielding 5\'-AUG CCG AAU-3\'.'
    }
  },
  {
    id: 'rna-processing',
    stepNumber: 3,
    title: 'RNA Processing & Splicing',
    subtitle: 'Maturing pre-mRNA for Nuclear Export (Eukaryotes)',
    shortTag: 'pre-mRNA ➔ Mature mRNA',
    imageSrc: '/src/assets/images/rna_processing_step_1787721854420.jpg',
    imageAlt: 'RNA Splicing and Capping: Spliceosome removing introns and adding 5 cap and poly-A tail',
    location: 'Nucleus',
    cellularPhase: 'Co-transcriptional / Post-transcriptional',
    summary: 'In eukaryotic cells, the initial RNA transcript (pre-mRNA) contains non-coding interruptions called Introns. The cell adds protective caps on both ends and cuts out introns, fusing the protein-coding Exons into a mature mRNA ready for the cytoplasm.',
    whyItMatters: 'Alternative splicing allows a single human gene (~20,000 genes total) to produce hundreds of thousands of distinct proteins! The caps protect RNA from degradation and guide nuclear export.',
    detailedProcess: [
      {
        phase: '1. 5\' Capping',
        description: 'A 7-methylguanosine (m7G) cap is chemically linked to the 5\' end of the nascent transcript via a unique 5\'-to-5\' triphosphate bridge.',
        keyPoints: [
          'Protects the 5\' end from exonucleases in the cell.',
          'Serves as the binding tag for ribosome recognition during translation initiation.'
        ]
      },
      {
        phase: '2. 3\' Polyadenylation (Poly-A Tail)',
        description: 'An endonuclease cleaves the 3\' end after the AAUAAA signal, and Poly-A Polymerase adds a string of 150-250 Adenine nucleotides without a template.',
        keyPoints: [
          'Acts as a molecular timer: the tail slowly shortens over time, dictating mRNA half-life.',
          'Facilitates nuclear export through nuclear pore complexes.'
        ]
      },
      {
        phase: '3. Splicing (Spliceosome Machinery)',
        description: 'The Spliceosome (a massive complex of snRNAs and proteins called snRNPs) recognizes splice donor (GU) and acceptor (AG) sites.',
        keyPoints: [
          'Introns are looped out into a "lariat" structure, excised, and degraded.',
          'Exons (EXpressed sequences) are precisely ligated together into continuous coding sequence.'
        ]
      },
      {
        phase: '4. Alternative Splicing',
        description: 'Different combinations of exons can be included or excluded in different tissues or developmental stages.',
        keyPoints: [
          'Example: Calcitonin gene produces calcitonin in thyroid cells, but CGRP in neural cells through alternative splicing.'
        ]
      }
    ],
    enzymes: [
      {
        name: 'Spliceosome (snRNPs)',
        category: 'Ribonucleoprotein Machine',
        role: 'Catalyzes two transesterification reactions to cut out introns and splice exons together.',
        mechanism: 'Composed of U1, U2, U4, U5, and U6 snRNAs and over 100 proteins.',
        location: 'Nucleoplasm',
        funFact: 'The spliceosome is one of the most complex molecular machines in the cell, rivaling the ribosome.'
      },
      {
        name: 'Capping Enzyme Complex',
        category: 'Modifier',
        role: 'Attaches 7-methylguanosine cap to 5\' end.',
        mechanism: 'Phosphatase, guanylyltransferase, and methyltransferase activities.',
        location: 'Attached to RNA Polymerase II CTD tail'
      },
      {
        name: 'Poly-A Polymerase (PAP)',
        category: 'Tail Synthesizer',
        role: 'Synthesizes long tail of 200+ Adenines at 3\' end.',
        mechanism: 'Template-independent RNA polymerase using ATP.',
        location: 'Nucleus'
      }
    ],
    hotspots: [
      {
        id: '5cap-spot',
        x: 15,
        y: 42,
        label: '5\' Methylguanosine Cap',
        description: 'The protective front helmet that ribosomes grab onto.'
      },
      {
        id: 'spliceosome-spot',
        x: 50,
        y: 45,
        label: 'Spliceosome & Intron Lariat',
        description: 'Cutting out non-coding introns (junk/regulatory loops) and fusing coding exons.'
      },
      {
        id: 'polya-spot',
        x: 85,
        y: 42,
        label: '3\' Poly-A Tail',
        description: 'A protective string of Adenine bases guarding against degradation.'
      }
    ],
    commonMisconceptions: [
      {
        myth: 'Bacteria (prokaryotes) also do extensive RNA splicing and capping.',
        fact: 'Prokaryotes lack a nucleus, do not have introns in most genes, and begin translating mRNA immediately while it is still being transcribed!'
      },
      {
        myth: 'Introns are exons and exons are introns.',
        fact: 'Easy memory trick: EXons are EXpressed (kept). INtrons are IN the way (cut out).'
      }
    ],
    quickCheck: {
      question: 'Which of the following modifications is NOT part of eukaryotic pre-mRNA processing?',
      options: ['Addition of a 5\' 7-methylguanosine cap', 'Removal of introns by the spliceosome', 'Addition of a 3\' poly-A tail', 'Binding to the large 50S bacterial ribosomal subunit'],
      correctIndex: 3,
      explanation: 'Bacterial 50S subunit binding is a translation feature in prokaryotes, not a eukaryotic pre-mRNA processing step.'
    }
  },
  {
    id: 'translation',
    stepNumber: 4,
    title: 'Translation',
    subtitle: 'Decoding mRNA into a Functional Polypeptide Chain',
    shortTag: 'mRNA ➔ Protein',
    imageSrc: '/src/assets/images/translation_step_1787721869520.jpg',
    imageAlt: 'Ribosome with A, P, E sites translating mRNA into a folding amino acid polypeptide chain',
    location: 'Cytoplasm / Rough Endoplasmic Reticulum',
    cellularPhase: 'Constant activity in living cells',
    summary: 'The mature mRNA is fed into the Ribosome machine. Transfer RNA (tRNA) molecules matching 3-letter mRNA codons deliver specific amino acids one by one, linking them with peptide bonds into a growing protein chain.',
    whyItMatters: 'Proteins are the active molecular workhorses of life: enzymes, muscle fibers, antibodies, receptors, and hormones that perform virtually all biological functions.',
    detailedProcess: [
      {
        phase: '1. Initiation',
        description: 'Small ribosomal subunit (40S in eukaryotes) binds the 5\' cap and scans along the mRNA until it finds the START codon (5\'-AUG-3\').',
        keyPoints: [
          'Initiator tRNA carrying Methionine (Met) docks at the AUG codon in the P site.',
          'Large ribosomal subunit (60S) locks on top, completing the active 80S ribosome complex.'
        ]
      },
      {
        phase: '2. Elongation (A ➔ P ➔ E Cycle)',
        description: 'The ribosome shifts codon by codon along the mRNA with the help of elongation factors (eEF-1, eEF-2) and GTP energy.',
        keyPoints: [
          'A Site (Aminoacyl): Incoming tRNA with matching anticodon docks and delivers next amino acid.',
          'P Site (Peptidyl): Peptidyl transferase (ribozyme in large subunit) forms a peptide bond between the old chain and the new amino acid.',
          'E Site (Exit): The empty, deacylated tRNA moves to the Exit site and is ejected back to the cytoplasm to be recharged.'
        ]
      },
      {
        phase: '3. Termination',
        description: 'When the ribosome reaches a STOP codon (UAA, UAG, UGA), no tRNA exists to pair with it. A Release Factor protein enters the A site.',
        keyPoints: [
          'Release Factor adds a water molecule instead of an amino acid, hydrolyzing the bond.',
          'The newly completed polypeptide chain is liberated into the cytoplasm or ER lumen.',
          'Ribosomal subunits disassemble to be recycled for another round.'
        ]
      }
    ],
    enzymes: [
      {
        name: 'Ribosome (80S / 70S)',
        category: 'Master Translation Ribozyme',
        role: 'Translates triplet codons on mRNA into covalent peptide bonds linking amino acids.',
        mechanism: 'Catalytic 28S/23S rRNA acts as a ribozyme (peptidyl transferase).',
        location: 'Cytosol & Rough ER surface',
        funFact: 'Human cells contain up to 10 million ribosomes, each synthesizing ~5 peptide bonds every second!'
      },
      {
        name: 'Aminoacyl-tRNA Synthetase',
        category: 'Charging Enzyme',
        role: 'The "molecular dictionary": attaches the exact correct amino acid to its cognate tRNA using ATP.',
        mechanism: 'High-specificity two-step esterification of 3\'-CCA terminal adenosine on tRNA.',
        location: 'Cytoplasm',
        funFact: 'There are 20 distinct aminoacyl-tRNA synthetases—one for each standard amino acid.'
      },
      {
        name: 'Release Factors (eRF1 / eRF3)',
        category: 'Terminators',
        role: 'Recognize STOP codons and trigger peptidyl-tRNA hydrolysis to release the finished protein.',
        mechanism: 'Mimic the shape of a tRNA molecule to fit directly into the A site.',
        location: 'Ribosomal A Site'
      }
    ],
    hotspots: [
      {
        id: 'ribosome-spot',
        x: 48,
        y: 45,
        label: 'Ribosome (A, P, E Sites)',
        description: 'The biological factory where mRNA codons are matched with tRNA anticodons.'
      },
      {
        id: 'trna-spot',
        x: 35,
        y: 35,
        label: 'tRNA Molecule & Anticodon',
        description: 'Cloverleaf adaptor carrying a specific amino acid to match the 3-letter mRNA codon.'
      },
      {
        id: 'polypeptide-spot',
        x: 62,
        y: 20,
        label: 'Growing Polypeptide Chain',
        description: 'Linear chain of amino acids emerging from the exit tunnel to fold into active 3D protein.'
      }
    ],
    commonMisconceptions: [
      {
        myth: 'tRNA reads the DNA directly.',
        fact: 'tRNA only interacts with mRNA codons in the cytoplasm/ribosome, never directly with genomic DNA.'
      },
      {
        myth: 'The STOP codon codes for a special "stop amino acid".',
        fact: 'STOP codons do not code for any amino acid; they bind protein release factors that terminate translation.'
      }
    ],
    quickCheck: {
      question: 'During translation elongation, at which ribosomal site does a newly incoming charged tRNA dock first?',
      options: ['P Site (Peptidyl)', 'A Site (Aminoacyl)', 'E Site (Exit)', 'T Site (Template)'],
      correctIndex: 1,
      explanation: 'Incoming charged tRNAs enter at the A (Aminoacyl) site, where their anticodon tests pairing with the mRNA codon.'
    }
  },
  {
    id: 'folding',
    stepNumber: 5,
    title: 'Protein Folding & Exceptions',
    subtitle: 'From Linear Chains to 3D Shape & Non-Canonical Dogma Flows',
    shortTag: 'Polypeptide ➔ 3D Structure + Exceptions',
    imageSrc: '/src/assets/images/central_dogma_overview_1787721789446.jpg',
    imageAlt: 'Overview of the Central Dogma showing full pathway and folding in eukaryotic cell',
    location: 'Cytoplasm / Endoplasmic Reticulum / Golgi',
    cellularPhase: 'Immediately following or during translation',
    summary: 'A linear chain of amino acids is not yet functional. It must fold into a precise 3D shape (Primary ➔ Secondary ➔ Tertiary ➔ Quaternary) guided by chemical interactions and chaperone proteins. In addition, special biological systems can reverse or alter the classical dogma flow!',
    whyItMatters: 'Shape determines function. Misfolded proteins lead to devastating diseases like Alzheimer\'s, Huntington\'s, and Creutzfeldt-Jakob prion disease. Understanding exceptions (like Reverse Transcription in HIV) enabled modern antiviral drugs and mRNA vaccines.',
    detailedProcess: [
      {
        phase: '1. The 4 Levels of Protein Structure',
        description: 'Hierarchical organization creating active binding pockets and structural fibers.',
        keyPoints: [
          'Primary (1°): Linear sequence of amino acids linked by covalent peptide bonds.',
          'Secondary (2°): Local hydrogen bonding forming Alpha-Helices and Beta-Pleated Sheets.',
          'Tertiary (3°): Full 3D globular shape stabilized by hydrophobic collapse, disulfide bridges (-S-S-), salt bridges, and hydrogen bonds.',
          'Quaternary (4°): Assembly of multiple polypeptide subunits (e.g. Hemoglobin with 4 subunits).'
        ]
      },
      {
        phase: '2. Molecular Chaperones (Hsp70, Chaperonins)',
        description: 'Protective barrel complexes that isolate misfolded or newly born proteins to give them a safe environment to fold correctly without clumping.',
        keyPoints: [
          'GroEL/GroES (bacteria) or TRiC/CCT (eukaryotes) use ATP cycles to fold challenging proteins.'
        ]
      },
      {
        phase: '3. Special Dogma Exceptions & Special Flows',
        description: 'Francis Crick originally formulated the Central Dogma in 1958. Since then, biologists have discovered crucial exceptions to the simple DNA ➔ RNA ➔ Protein rule:',
        keyPoints: [
          'Reverse Transcription (RNA ➔ DNA): Discovered in Retroviruses (like HIV) and Retrotransposons via the enzyme Reverse Transcriptase (RNA-dependent DNA polymerase).',
          'RNA Replication (RNA ➔ RNA): Many RNA viruses (like Poliovirus, Influenza, Coronaviruses) replicate their genomes directly using RNA-dependent RNA Polymerase (RdRP).',
          'Prions (Protein ➔ Protein conformation transfer): Infectious misfolded proteins (PrPSc) that force normal proteins (PrPC) to misfold without any nucleic acid involved!',
          'Non-coding RNAs (ncRNAs): Thousands of genes are transcribed into functional RNAs (miRNA, lncRNA, rRNA, tRNA, ribozymes) that never get translated into proteins.'
        ]
      }
    ],
    enzymes: [
      {
        name: 'Chaperonins (GroEL/ES, Hsp60/70)',
        category: 'Folding Assist',
        role: 'Prevent aggregation of hydrophobic residues and provide shielded folding chambers.',
        mechanism: 'ATP-dependent conformational pulsing.',
        location: 'Cytosol & Mitochondria'
      },
      {
        name: 'Reverse Transcriptase',
        category: 'Dogma Exception Enzyme',
        role: 'Synthesizes complementary DNA (cDNA) from an RNA template.',
        mechanism: 'RNA-dependent DNA polymerase with RNase H activity.',
        location: 'Retroviruses (HIV), Telomerase in human stem cells'
      }
    ],
    hotspots: [
      {
        id: 'primary-spot',
        x: 20,
        y: 50,
        label: 'Primary Sequence (1°)',
        description: 'Linear chain of amino acids determined by the mRNA codon sequence.'
      },
      {
        id: 'tertiary-spot',
        x: 60,
        y: 40,
        label: 'Tertiary 3D Globular Fold (3°)',
        description: 'Hydrophobic amino acids bury in the core, hydrophilic on the surface.'
      },
      {
        id: 'exception-spot',
        x: 80,
        y: 75,
        label: 'Special Exception: Reverse Transcription',
        description: 'RNA ➔ DNA conversion by Retroviruses and Telomerase.'
      }
    ],
    commonMisconceptions: [
      {
        myth: 'Proteins can be reverse-translated back into RNA or DNA sequences in cells.',
        fact: 'Information flow NEVER goes from Protein back to Nucleic Acid. Crick’s Central Dogma strictly prohibits Protein ➔ RNA or Protein ➔ DNA translation.'
      },
      {
        myth: 'All genes in the genome code for proteins.',
        fact: 'Only ~1.5% of the human genome codes for proteins! Much of the rest codes for non-coding RNAs (rRNA, tRNA, miRNA, lncRNA) or regulatory regions.'
      }
    ],
    quickCheck: {
      question: 'Which biological phenomenon directly violates the classical DNA ➔ RNA one-way direction by producing DNA from an RNA template?',
      options: ['Alternative Splicing', 'Reverse Transcription in Retroviruses', 'Okazaki fragment ligation', 'Chaperone-assisted protein folding'],
      correctIndex: 1,
      explanation: 'Reverse Transcription uses Reverse Transcriptase to synthesize cDNA from an RNA template, as seen in HIV and Telomerase.'
    }
  }
];

export const DOGMA_COMPARISONS = [
  {
    feature: 'Starting Molecule',
    replication: 'Double-Stranded DNA',
    transcription: 'Double-Stranded DNA (Template strand)',
    translation: 'Mature single-stranded mRNA'
  },
  {
    feature: 'Product Formed',
    replication: '2 Identical DNA Double Helices',
    transcription: 'Single-Stranded RNA (pre-mRNA)',
    translation: 'Polypeptide Chain (Amino Acids)'
  },
  {
    feature: 'Primary Enzyme Machine',
    replication: 'DNA Polymerase (with Helicase & Primase)',
    transcription: 'RNA Polymerase II',
    translation: 'Ribosome (80S in Eukaryotes, 70S in Bacteria)'
  },
  {
    feature: 'Cellular Location (Eukaryotes)',
    replication: 'Nucleus',
    transcription: 'Nucleus',
    translation: 'Cytoplasm / Rough Endoplasmic Reticulum'
  },
  {
    feature: 'Base Pairing Rules',
    replication: 'A-T, G-C',
    transcription: 'A-U (in RNA), T-A, G-C',
    translation: 'tRNA Anticodon (3\'-5\') to mRNA Codon (5\'-3\')'
  },
  {
    feature: 'Direction of Synthesis',
    replication: '5\' ➔ 3\'',
    transcription: '5\' ➔ 3\'',
    translation: 'N-terminus ➔ C-terminus'
  },
  {
    feature: 'Energy Source',
    replication: 'dNTP hydrolysis (dATP, dCTP, dGTP, dTTP)',
    transcription: 'NTP hydrolysis (ATP, CTP, GTP, UTP)',
    translation: 'GTP & ATP (Charging tRNAs and Translocation)'
  }
];

export const PROKARYOTE_VS_EUKARYOTE = [
  {
    feature: 'Cellular Compartment',
    prokaryote: 'No nucleus: all processes occur in the cytoplasm / nucleoid.',
    eukaryote: 'Compartmentalized: Replication & Transcription in nucleus; Translation in cytoplasm.'
  },
  {
    feature: 'Coupling of Processes',
    prokaryote: 'Coupled: Translation begins immediately on mRNA while transcription is still ongoing!',
    eukaryote: 'Separated in time and space: pre-mRNA is fully transcribed, processed, and exported before translation.'
  },
  {
    feature: 'RNA Processing',
    prokaryote: 'None: Most bacterial mRNAs have no 5\' cap, no poly-A tail, and no introns.',
    eukaryote: 'Extensive: 5\' m7G cap, 3\' poly-A tail, and spliceosome splicing of introns.'
  },
  {
    feature: 'Ribosome Size',
    prokaryote: '70S (comprising 30S small and 50S large subunits).',
    eukaryote: '80S (comprising 40S small and 60S large subunits).'
  },
  {
    feature: 'Start Amino Acid',
    prokaryote: 'N-Formylmethionine (fMet).',
    eukaryote: 'Standard Methionine (Met).'
  }
];
