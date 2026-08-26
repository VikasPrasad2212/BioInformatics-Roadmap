export interface ChemicalPart {
  id: string;
  name: string;
  macromolecule: 'dna' | 'rna' | 'protein' | 'helix-bonds';
  title: string;
  formula: string;
  molecularWeight?: string;
  description: string;
  detailedChemistry: string;
  keyBonds: {
    name: string;
    type: 'Covalent' | 'Hydrogen' | 'Ionic / Salt Bridge' | 'Hydrophobic / vdW' | 'Ester / Phosphodiester' | 'Glycosidic' | 'Covalent / Ionic / Polar';
    strength: string;
    description: string;
    atomsInvolved: string;
  }[];
  biologicalSignificance: string;
  clinicalOrLabRelevance?: string;
}

export const CHEMICAL_PARTS_DATA: ChemicalPart[] = [
  // --- DNA CHEMICAL PARTS ---
  {
    id: 'dna-deoxyribose',
    name: 'Deoxyribose Sugar',
    macromolecule: 'dna',
    title: '2-Deoxy-D-Ribose Pentose Ring',
    formula: 'C₅H₁₀O₄',
    molecularWeight: '134.13 g/mol',
    description: 'A 5-carbon furanose cyclic sugar that lacks a hydroxyl group at the 2\' carbon (has 2\'-H instead of 2\'-OH).',
    detailedChemistry: 'The five carbons are numbered 1\' to 5\'. C1\' forms a covalent beta-N-glycosidic bond with a nitrogenous base (N9 of purines or N1 of pyrimidines). C2\' has two hydrogen atoms (-H and -H), giving DNA superior chemical stability. C3\' possesses a free hydroxyl group (-OH) required for nucleophilic attack during chain elongation. C4\' is part of the furanose ring. C5\' is an exocyclic carbon holding the phosphate ester.',
    keyBonds: [
      {
        name: 'C1\'-N Glycosidic Bond',
        type: 'Glycosidic',
        strength: '~350 kJ/mol (Covalent)',
        description: 'Attaches the planar nitrogenous base to the sugar ring in a beta-orientation.',
        atomsInvolved: 'C1\' (sugar) — N9 (Purine) or N1 (Pyrimidine)'
      },
      {
        name: '3\'-5\' Phosphoester Linkages',
        type: 'Ester / Phosphodiester',
        strength: '~330 kJ/mol (Covalent)',
        description: 'Binds the 3\'-OH to the incoming phosphate group to construct the longitudinal strand.',
        atomsInvolved: 'C3\'-O — P — O-C5\''
      }
    ],
    biologicalSignificance: 'The absence of a 2\'-OH prevents nucleophilic self-attack in basic conditions, allowing chromosomal DNA to endure intact for millennia (e.g., in fossils and forensic samples).',
    clinicalOrLabRelevance: 'Dideoxy sequencing (Sanger) uses artificial ddNTPs lacking both 2\'-OH and 3\'-OH, immediately terminating DNA polymerase elongation for base readout.'
  },
  {
    id: 'dna-phosphate',
    name: 'Phosphate Group & Backbone',
    macromolecule: 'dna',
    title: 'Tetrahedral Phosphate Ion (PO₄³⁻)',
    formula: 'PO₄³⁻',
    molecularWeight: '94.97 g/mol',
    description: 'The inorganic polyatomic connector that bridges adjacent sugar units with a net -1 negative charge per nucleotide at physiological pH.',
    detailedChemistry: 'Phosphorus is in a tetrahedral sp³ hybridization state surrounded by 4 oxygen atoms. In DNA, two of these oxygens form phosphoester bonds to the 3\' and 5\' carbons of adjacent deoxyribose units, while the third is double-bonded (P=O) and the fourth is deprotonated (P-O⁻) at pH 7.4.',
    keyBonds: [
      {
        name: 'Phosphodiester Bond',
        type: 'Ester / Phosphodiester',
        strength: '~330 kJ/mol (Covalent)',
        description: 'Two covalent ester bonds linking one phosphate to two sugar rings.',
        atomsInvolved: 'C3\'—O—P(=O)(O⁻)—O—C5\''
      },
      {
        name: 'Electrostatic Histone Interaction',
        type: 'Ionic / Salt Bridge',
        strength: '~20–40 kJ/mol',
        description: 'Polyanionic phosphate backbone binds tightly to positively charged Lysine and Arginine residues on histone octamers.',
        atomsInvolved: 'P-O⁻ ··· ⁺H₃N-Lys / ⁺H₂N=C(NH₂)₂-Arg'
      }
    ],
    biologicalSignificance: 'The polyanionic negative charge makes DNA hydrophilic, soluble in the nucleoplasm, incapable of passively leaking through lipid membranes, and resistant to hydrolytic nucleophiles due to electrostatic repulsion.',
    clinicalOrLabRelevance: 'Agarose gel electrophoresis exploits the uniform negative charge of the phosphate backbone, migrating DNA fragments toward the positive anode (red) proportionally to base-pair length.'
  },
  {
    id: 'dna-bases',
    name: 'Nitrogenous Bases (A, T, G, C)',
    macromolecule: 'dna',
    title: 'Purines (A, G) & Pyrimidines (T, C)',
    formula: 'Adenine (C₅H₅N₅), Thymine (C₅H₆N₂O₂), Guanine (C₅H₅N₅O), Cytosine (C₄H₅N₃O)',
    description: 'Heterocyclic aromatic planar rings that encode genetic information and form specific complementary hydrogen bonds.',
    detailedChemistry: 'Purines (Adenine, Guanine) are bicyclic (9 atoms). Pyrimidines (Thymine, Cytosine) are monocyclic (6 atoms). Aromatic pi-electron clouds create vertical pi-pi stacking interactions along the helix axis (-15 to -40 kJ/mol/base pair), which provides more thermodynamic stability to the double helix than the horizontal hydrogen bonds themselves.',
    keyBonds: [
      {
        name: 'A=T Hydrogen Bonds (2 Bonds)',
        type: 'Hydrogen',
        strength: '~12 kJ/mol total',
        description: 'Bond 1: N6-H (donor) ··· O4=C (acceptor); Bond 2: N1 (acceptor) ··· H-N3 (donor). Distance ~2.8–3.0 Å.',
        atomsInvolved: 'Adenine N6/N1 ⇄ Thymine O4/N3'
      },
      {
        name: 'G≡C Hydrogen Bonds (3 Bonds)',
        type: 'Hydrogen',
        strength: '~21 kJ/mol total',
        description: 'Bond 1: O6=C (acceptor) ··· H-N4 (donor); Bond 2: N1-H (donor) ··· N3 (acceptor); Bond 3: N2-H (donor) ··· O2=C (acceptor). Distance ~2.8–2.9 Å.',
        atomsInvolved: 'Guanine O6/N1/N2 ⇄ Cytosine N4/N3/O2'
      },
      {
        name: 'Aromatic Pi-Pi Stacking',
        type: 'Hydrophobic / vdW',
        strength: '~30–50 kJ/mol per step',
        description: 'Van der Waals and hydrophobic stacking between flat, planar base rings stacked 3.4 Å apart.',
        atomsInvolved: 'Delocalized pi-electron clouds of adjacent stacked base pairs'
      }
    ],
    biologicalSignificance: 'Ensures absolute Watson-Crick pairing fidelity: a purine (wide) always pairs with a pyrimidine (narrow), maintaining an invariant 2.0 nm helix width.',
    clinicalOrLabRelevance: 'High G+C content increases the melting temperature (Tm) of DNA, requiring higher PCR annealing temperatures and denaturing additives like DMSO or betaine.'
  },

  // --- RNA CHEMICAL PARTS ---
  {
    id: 'rna-ribose',
    name: 'Ribose Sugar (2\'-OH)',
    macromolecule: 'rna',
    title: 'D-Ribose Pentose Ring with Reactive 2\'-OH',
    formula: 'C₅H₁₀O₅',
    molecularWeight: '150.13 g/mol',
    description: 'A 5-carbon cyclic sugar with an oxygen atom at carbon 2\' (2\'-hydroxyl group), the central chemical differentiator of RNA.',
    detailedChemistry: 'The presence of the electronegative 2\'-OH group induces a C3\'-endo sugar pucker conformation, forcing RNA into a compact, wide A-form helical geometry with 11 base pairs per turn. In alkaline solutions (pH > 9), the 2\'-OH loses a proton (2\'-O⁻) and launches an intramolecular nucleophilic attack on the adjacent 3\'-phosphodiester bond, breaking the RNA strand via a 2\',3\'-cyclic phosphate intermediate.',
    keyBonds: [
      {
        name: 'Reactive 2\'-Hydroxyl Group (-OH)',
        type: 'Covalent',
        strength: '~460 kJ/mol (O-H covalent)',
        description: 'Enables ribozyme enzymatic catalysis (e.g., self-splicing, peptidyl transferase) but predisposes RNA to alkaline hydrolysis.',
        atomsInvolved: 'C2\'—O—H'
      },
      {
        name: '3\'-5\' Ribonucleotide Phosphodiester Bond',
        type: 'Ester / Phosphodiester',
        strength: '~330 kJ/mol (Covalent)',
        description: 'Binds ribonucleotide triphosphates (ATP, GTP, CTP, UTP) in transcription.',
        atomsInvolved: 'C3\'—O—P(=O)(O⁻)—O—C5\''
      }
    ],
    biologicalSignificance: 'The 2\'-OH allows RNA to fold into complex catalytic 3D tertiary shapes (ribozymes) and interact with water molecules, making RNA versatile for catalytic functions.',
    clinicalOrLabRelevance: 'Laboratories must use DEPC-treated water and RNase inhibitors because RNA rapidly degrades at room temperature via trace RNase enzymes and alkaline cleavage.'
  },
  {
    id: 'rna-uracil',
    name: 'Uracil vs Thymine Base Chemistry',
    macromolecule: 'rna',
    title: 'Uracil (2,4-Dioxypyrimidine) vs Thymine (5-Methyluracil)',
    formula: 'Uracil: C₄H₄N₂O₂ | Thymine: C₅H₆N₂O₂ (+CH₃)',
    description: 'Uracil is identical to Thymine except it lacks a methyl group (-CH₃) at carbon 5.',
    detailedChemistry: 'Synthesizing Thymine requires methylation of dUMP to dTMP by Thymidylate Synthase consuming N5,N10-methylenetetrahydrofolate. Cells use unmethylated Uracil for RNA because RNA transcripts are transient, saving massive cellular metabolic energy. However, spontaneous cytosine deamination produces uracil; in DNA, having Thymine allows Uracil-DNA Glycosylase to immediately flag and repair any deaminated cytosine.',
    keyBonds: [
      {
        name: 'U=A Hydrogen Bonding',
        type: 'Hydrogen',
        strength: '~12 kJ/mol',
        description: 'Two hydrogen bonds: N3-H (donor) ··· N1 (acceptor on Adenine); O4=C (acceptor) ··· H-N6 (donor on Adenine).',
        atomsInvolved: 'Uracil N3/O4 ⇄ Adenine N1/N6'
      },
      {
        name: 'Absent 5-Methyl Group',
        type: 'Covalent',
        strength: 'H atom at C5 instead of -CH₃',
        description: 'Reduces steric hindrance, allowing non-canonical G-U wobble base pairing in folded tRNAs and rRNAs.',
        atomsInvolved: 'C5—H'
      }
    ],
    biologicalSignificance: 'Enables flexible non-Watson-Crick pairing (e.g., G-U wobble pairs in codon recognition) and provides an energetic efficiency mechanism for high-turnover mRNA.',
    clinicalOrLabRelevance: 'Methotrexate and 5-Fluorouracil (5-FU) selectively starve cancer cells of dTMP by blocking thymidylate synthesis, selectively poisoning rapidly dividing malignant cells.'
  },
  {
    id: 'rna-cap-and-tail',
    name: '5\' Cap & 3\' Poly-A Chemistry',
    macromolecule: 'rna',
    title: '7-Methylguanosine Triphosphate Bridge (m⁷GpppN)',
    formula: 'm⁷G(5\')ppp(5\')N',
    description: 'An inverted 5\'-to-5\' triphosphate covalent bridge with a methylated N7 nitrogen that caps eukaryotic mRNA.',
    detailedChemistry: 'Normally, nucleotides are joined 3\'-to-5\'. The cap is added backward: Guanylyltransferase joins GTP to the 5\'-diphosphate end of pre-mRNA, forming a 5\'-5\' triphosphate linkage. Methyltransferase transfers a methyl group from S-adenosylmethionine (SAM) to the N7 of guanine. The 3\' poly-A tail consists of 200–250 adenine nucleotides linked by standard 3\'-5\' phosphodiester bonds.',
    keyBonds: [
      {
        name: '5\'-to-5\' Triphosphate Inverted Linkage',
        type: 'Ester / Phosphodiester',
        strength: 'Covalent phosphoanhydride/phosphoester bridge',
        description: 'Sterically blocks 5\'→3\' exoribonucleases (XRN1) that only recognize standard 5\'-monophosphates.',
        atomsInvolved: '5\'-C of m⁷G — O—P—O—P—O—P— O — 5\'-C of first pre-mRNA nucleotide'
      },
      {
        name: 'N7-Methylation (m⁷G)',
        type: 'Covalent',
        strength: '~350 kJ/mol (C-N)',
        description: 'Imparts a positive charge to the guanine ring, specifically recognized by eukaryotic translation initiation factor eIF4E.',
        atomsInvolved: 'N7(G) — CH₃'
      }
    ],
    biologicalSignificance: 'Mandatory chemical passport for mRNA export through the nuclear pore complex and ribosomal 40S subunit recruitment.',
    clinicalOrLabRelevance: 'Cap analogs (m⁷GpppG and CleanCap®) are essential reagents in in vitro transcription of therapeutic mRNA vaccines to avoid innate immune degradation.'
  },

  // --- PROTEIN CHEMICAL PARTS ---
  {
    id: 'protein-amino-acid',
    name: 'General Amino Acid Anatomy',
    macromolecule: 'protein',
    title: 'Chiral Alpha-Carbon (Cα) Zwitterionic Core',
    formula: 'H₃N⁺—CH(R)—COO⁻ (at pH 7.4)',
    description: 'The fundamental monomer containing a central alpha-carbon bonded to 4 distinct groups: Amino group, Carboxyl group, Hydrogen, and Variable R-side chain.',
    detailedChemistry: 'The central alpha-carbon is an sp³ hybridized chiral stereocenter (except Glycine where R=H). All 19 standard chiral amino acids in ribosomal proteins exist exclusively in the L-enantiomer configuration. At physiological pH (7.4), the amino group is protonated (-NH₃⁺, pKa ~9.5) and the carboxyl group is deprotonated (-COO⁻, pKa ~2.2), making amino acids dipolar Zwitterions.',
    keyBonds: [
      {
        name: 'Alpha-Carbon Covalent Tetrahedral Bonds',
        type: 'Covalent',
        strength: '~350–410 kJ/mol (C-C, C-N, C-H)',
        description: 'Rigid covalent framework organizing the variable chemical side chain.',
        atomsInvolved: 'Cα bonded to -NH₃⁺, -COO⁻, -H, and -R'
      },
      {
        name: 'Variable R-Group Side Chain Chemistry',
        type: 'Covalent / Ionic / Polar',
        strength: 'Varies by class',
        description: 'Determines chemical character: Hydrophobic (Leu/Val/Phe), Polar uncharged (Ser/Thr/Gln), Acidic negative (Asp/Glu), Basic positive (Lys/Arg/His).',
        atomsInvolved: 'Side chain functional groups (-OH, -SH, -COOH, -NH₂, aromatic rings)'
      }
    ],
    biologicalSignificance: 'The 20 distinct R-groups provide an immense repertoire of chemical reactivity: nucleophiles (-OH, -SH), acid-base catalysts (His imidazole pKa ~6.0), and structural anchors.',
    clinicalOrLabRelevance: 'Phenylketonuria (PKU) is a defect in phenylalanine hydroxylase (PAH), causing toxic accumulation of the hydrophobic amino acid Phenylalanine.'
  },
  {
    id: 'protein-peptide-bond',
    name: 'Peptide Bond Synthesis & Resonance',
    macromolecule: 'protein',
    title: 'Planar Amide Linkage with 40% Double-Bond Character',
    formula: '—C(=O)—NH— + H₂O released',
    description: 'A rigid covalent amide bond formed by condensation of an alpha-carboxyl carbon with an alpha-amino nitrogen.',
    detailedChemistry: 'The peptide bond is synthesized in the 60S/50S ribosomal peptidyl transferase center via nucleophilic attack of the incoming aminoacyl-tRNA alpha-amino group on the ester carbonyl of the peptidyl-tRNA. The unshared electron pair on nitrogen is delocalized into the carbonyl pi-system, giving the C-N bond ~40% partial double-bond character (bond length 1.32 Å vs standard C-N 1.47 Å). This restricts rotation completely around the peptide plane (omega angle fixed at trans 180°).',
    keyBonds: [
      {
        name: 'Planar Trans Amide Bond',
        type: 'Covalent',
        strength: '~305 kJ/mol (Resonance stabilized)',
        description: 'Resonance between C=O and C-N prevents rotation; rotation is confined strictly to the N-Cα (phi, φ) and Cα-C (psi, ψ) bonds.',
        atomsInvolved: 'C(=O)—N(—H)'
      },
      {
        name: 'Backbone Hydrogen Bonding Groups',
        type: 'Hydrogen',
        strength: '~15–20 kJ/mol',
        description: 'Carbonyl oxygen acts as strong H-bond acceptor; amide N-H acts as strong H-bond donor to build alpha-helices and beta-sheets.',
        atomsInvolved: 'C=O ··· H—N'
      }
    ],
    biologicalSignificance: 'The rigidity of the peptide plane restricts conformational entropy, enabling polypeptides to fold rapidly and predictably into stable 3D architectures (as mapped by the Ramachandran plot).',
    clinicalOrLabRelevance: 'Beta-lactam antibiotics (Penicillin, Amoxicillin) mimic the D-Ala-D-Ala peptide bond to irreversibly acyl-inactivate bacterial cell wall transpeptidase.'
  },
  {
    id: 'protein-folding-forces',
    name: 'The 4 Chemical Forces of Protein Folding',
    macromolecule: 'protein',
    title: 'Disulfide, Ionic Salt Bridges, H-Bonds & Hydrophobic Collapse',
    formula: 'Non-covalent Network + Covalent Disulfides (-S-S-)',
    description: 'The four distinct physical and chemical forces that drive a linear polypeptide into its native 3D active conformation.',
    detailedChemistry: '1) Hydrophobic Effect: Nonpolar residues (Val, Leu, Ile, Phe) cluster in the interior, releasing ordered water cages (favorable +Delta S entropy). 2) Hydrogen Bonds: Form between polar sidechains (Ser, Thr, Tyr) and backbone groups. 3) Ionic Salt Bridges: Electrostatic attraction between positive Lys+/Arg+ and negative Asp-/Glu- (Delta G ~ -15 to -30 kJ/mol). 4) Disulfide Bridges: Covalent oxidation of two Cysteine -SH thiols to form a -S-S- cystine crosslink.',
    keyBonds: [
      {
        name: 'Covalent Disulfide Bridge (-S-S-)',
        type: 'Covalent',
        strength: '~250 kJ/mol (Strong Covalent)',
        description: 'Oxidation of two Cys -SH thiol groups in the ER lumen creates permanent structural crosslinks.',
        atomsInvolved: 'Cys-CH₂—S — S—CH₂-Cys'
      },
      {
        name: 'Ionic Salt Bridge',
        type: 'Ionic / Salt Bridge',
        strength: '~15–30 kJ/mol',
        description: 'Electrostatic ion-pair attraction buried in low dielectric environments of protein cores.',
        atomsInvolved: 'Asp/Glu (—COO⁻) ··· (⁺H₃N—) Lys/Arg'
      },
      {
        name: 'Side-Chain Hydrogen Bonds',
        type: 'Hydrogen',
        strength: '~8–16 kJ/mol',
        description: 'Hydrogen bonding between tyrosine -OH, serine -OH, histidine, and asparagine amides.',
        atomsInvolved: 'Polar R-groups'
      },
      {
        name: 'Hydrophobic Collapse & van der Waals',
        type: 'Hydrophobic / vdW',
        strength: '~4–10 kJ/mol per contact',
        description: 'Burial of nonpolar aromatic and aliphatic side chains away from aqueous cytosol.',
        atomsInvolved: 'Aromatic and aliphatic carbon chains (Phe, Trp, Leu, Ile, Val)'
      }
    ],
    biologicalSignificance: 'These cooperative forces generate the microenvironments of catalytic active sites, ligand-binding pockets, and allosteric switches.',
    clinicalOrLabRelevance: 'In Sickle Cell Anemia (HbS), changing polar hydrophilic Glutamate (-COO⁻) to nonpolar hydrophobic Valine at position 6 exposes a hydrophobic patch that fits into a complementary pocket on adjacent tetramers, causing toxic polymer fiber formation.'
  },

  // --- DNA HELIX CHEMICAL BONDS ---
  {
    id: 'dna-double-helix-bonds',
    name: 'DNA Double Helix Bonding Master Map',
    macromolecule: 'helix-bonds',
    title: 'Atomic Connectivity & Base Pairing Mechanics',
    formula: 'B-DNA: 10.5 bp/turn, 3.4 Å rise, 20 Å (2.0 nm) diameter',
    description: 'The comprehensive chemical bond matrix integrating covalent phosphodiester backbones, N-glycosidic base linkages, and interstrand hydrogen bonds.',
    detailedChemistry: 'The standard physiological conformation of DNA is B-DNA (right-handed helix). The outer sugar-phosphate rails are connected by covalent 3\'-5\' phosphodiester bonds. Planar bases project inward at nearly 90° to the helical axis. The strands are antiparallel (5\'→3\' paired with 3\'←5\'). The offset angle of the glycosidic bonds creates a Major Groove (wide, 22 Å, exposing sequence-specific hydrogen bonding donors and acceptors to transcription factors) and a Minor Groove (narrow, 12 Å).',
    keyBonds: [
      {
        name: 'Backbone Covalent Phosphodiesters',
        type: 'Ester / Phosphodiester',
        strength: '~330 kJ/mol',
        description: 'Permanent longitudinal covalent chain holding genetic sequence in order.',
        atomsInvolved: '5\'-CH₂—O—P(=O)(O⁻)—O—CH₂-3\''
      },
      {
        name: 'Base-to-Sugar N-Glycosidic Bonds',
        type: 'Glycosidic',
        strength: '~350 kJ/mol',
        description: 'Covalent linkage between C1\' of deoxyribose and N9 of purines or N1 of pyrimidines.',
        atomsInvolved: 'C1\'(Deoxyribose) — N(Base)'
      },
      {
        name: 'Interstrand Watson-Crick Hydrogen Bonds',
        type: 'Hydrogen',
        strength: 'A=T: 2 H-bonds (~12 kJ/mol) | G≡C: 3 H-bonds (~21 kJ/mol)',
        description: 'Transverse electrostatic pairing stabilizing the double helix while allowing enzymatic unzipping.',
        atomsInvolved: 'A(N6-H···O4, N1···H-N3)T and G(O6···H-N4, N1-H···N3, N2-H···O2)C'
      },
      {
        name: 'Base-Stacking Dispersion & Hydrophobic Forces',
        type: 'Hydrophobic / vdW',
        strength: '~30–50 kJ/mol per dinucleotide step',
        description: 'Aromatic pi-orbital overlap between adjacent stacked base pairs driving helical stability.',
        atomsInvolved: 'Pi-pi electron cloud overlap along longitudinal axis'
      }
    ],
    biologicalSignificance: 'The combination of strong covalent backbones and reversible, non-covalent hydrogen bonds allows DNA to remain stable over generations while permitting transient unzipping for replication and transcription.',
    clinicalOrLabRelevance: 'Intercalating agents like Ethidium Bromide, Doxorubicin, and Proflavine slip between stacked base pairs, distorting the helix and triggering frameshift mutations or topoisomerase arrest.'
  }
];
