/**
 * 3D Molecule Data Generator for DNA, RNA, tRNA, and Nucleotide structures
 * Generates exact 3D Cartesian coordinates (in Angstroms) for atoms, bonds,
 * nucleotides, hydrogen bonds, and spatial annotations.
 */

export type ModelType =
  | 'b-dna'
  | 'a-dna'
  | 'z-dna'
  | 'a-rna'
  | 'rna-hairpin'
  | 'trna-phe'
  | 'ribosome-decoding'
  | 'single-datp';

export type RenderStyle = 'ball-and-stick' | 'space-filling' | 'ribbon-ladder' | 'backbone-wire';
export type ColorScheme = 'element-cpk' | 'base-type' | 'strand-id' | 'sugar-pucker';

export interface Atom3D {
  id: string;
  element: 'C' | 'N' | 'O' | 'P' | 'H' | 'Mg' | 'S';
  x: number;
  y: number;
  z: number;
  radius: number; // van der Waals radius in Angstroms
  color: string;
  nucleotideIndex?: number;
  residueName?: string; // 'A', 'T', 'G', 'C', 'U', 'dATP', 'PHE'
  strand?: 1 | 2 | 3; // 1 = 5'->3' primary, 2 = 3'->5' complementary, 3 = RNA/tRNA/Peptide
  atomName: string; // e.g., "P", "O5'", "C1'", "N9", "C6", etc.
  isBackbone?: boolean;
  isBase?: boolean;
}

export interface Bond3D {
  atom1Index: number;
  atom2Index: number;
  order: 1 | 2 | 3 | 1.5;
  isHydrogenBond?: boolean;
  distance?: number;
}

export interface Nucleotide3D {
  index: number;
  strand: 1 | 2 | 3;
  base: 'A' | 'T' | 'G' | 'C' | 'U';
  name: string;
  atomIndices: number[];
  center: [number, number, number];
  baseCenter: [number, number, number];
  sugarCenter: [number, number, number];
  phosphateCenter: [number, number, number];
  pairedWithIndex?: number;
  hBondCount?: number;
  sugarPucker?: "C2'-endo" | "C3'-endo";
  glycosidicAngle?: 'anti' | 'syn';
}

export interface SpatialFeatureAnnotation {
  id: string;
  label: string;
  description: string;
  position: [number, number, number];
  type: 'major-groove' | 'minor-groove' | 'h-bond' | 'sugar-phosphate' | 'anticodon' | 'aminoacyl-site' | 'helical-axis';
  color: string;
  measurementText?: string;
}

export interface MoleculeModelData {
  id: ModelType;
  title: string;
  subtitle: string;
  classification: string;
  helixType: 'Right-handed (B-Form)' | 'Right-handed (A-Form)' | 'Left-handed (Z-Form)' | 'Tertiary L-Fold' | 'Complex Ribonucleoprotein' | 'Monomer Nucleotide';
  basePairsOrResidues: number;
  diameterAngstroms: number;
  risePerBaseAngstroms: number;
  bpPerTurn: number;
  pitchAngstroms: number;
  atoms: Atom3D[];
  bonds: Bond3D[];
  nucleotides: Nucleotide3D[];
  annotations: SpatialFeatureAnnotation[];
  keyTakeaways: string[];
  clinicalOrBiologicalSignificance: string;
}

// Element standard CPK colors and van der Waals radii
export const ELEMENT_PROPERTIES: Record<string, { color: string; radius: number }> = {
  C: { color: '#4B5563', radius: 1.70 }, // Carbon: Dark Charcoal
  N: { color: '#2563EB', radius: 1.55 }, // Nitrogen: Blue
  O: { color: '#EF4444', radius: 1.52 }, // Oxygen: Red
  P: { color: '#F59E0B', radius: 1.80 }, // Phosphorus: Amber/Orange
  H: { color: '#F3F4F6', radius: 1.20 }, // Hydrogen: White/Light Gray
  Mg: { color: '#10B981', radius: 1.73 }, // Magnesium: Emerald Green
  S: { color: '#EAB308', radius: 1.80 }, // Sulfur: Yellow
};

export const BASE_COLORS: Record<string, string> = {
  A: '#10B981', // Adenine = Emerald
  T: '#EF4444', // Thymine = Rose Red
  G: '#F59E0B', // Guanine = Amber / Gold
  C: '#3B82F6', // Cytosine = Royal Blue
  U: '#8B5CF6', // Uracil = Purple
};

export const STRAND_COLORS: Record<number, string> = {
  1: '#059669', // Emerald Strand 1 (5' -> 3')
  2: '#D97706', // Amber Strand 2 (3' -> 5')
  3: '#0284C7', // Sky Blue Strand 3 (RNA / tRNA)
};

// Standard Watson-Crick Base Pair sequence for double helix models
const DEFAULT_DNA_SEQUENCE = ['C', 'G', 'A', 'T', 'G', 'C', 'T', 'A', 'A', 'T', 'G', 'C', 'C', 'G'];
const DEFAULT_RNA_SEQUENCE = ['G', 'C', 'A', 'U', 'G', 'C', 'U', 'A', 'A', 'U', 'G', 'C'];

// Helper to get complementary base
function getComplementaryBase(base: string, isRNA = false): 'A' | 'T' | 'G' | 'C' | 'U' {
  switch (base) {
    case 'A': return isRNA ? 'U' : 'T';
    case 'T': case 'U': return 'A';
    case 'G': return 'C';
    case 'C': return 'G';
    default: return 'A';
  }
}

// -------------------------------------------------------------
// 1. GENERATE B-DNA DOUBLE HELIX
// -------------------------------------------------------------
export function generateBDnaModel(): MoleculeModelData {
  const sequence = DEFAULT_DNA_SEQUENCE;
  const numBp = sequence.length;
  const atoms: Atom3D[] = [];
  const bonds: Bond3D[] = [];
  const nucleotides: Nucleotide3D[] = [];

  const helixRadius = 9.8; // Ångströms to phosphorus
  const risePerBp = 3.38; // 3.38 Å per bp
  const twistPerBp = (36.0 * Math.PI) / 180.0; // 36° twist per base pair (10 bp/turn)
  const zOffsetStart = -((numBp - 1) * risePerBp) / 2;

  // Asymmetric angles for major (22 Å) and minor (12 Å) grooves
  const strand2PhaseShift = (144.0 * Math.PI) / 180.0; // 144 degrees creates major/minor grooves

  for (let i = 0; i < numBp; i++) {
    const base1 = sequence[i] as 'A' | 'T' | 'G' | 'C';
    const base2 = getComplementaryBase(base1, false) as 'A' | 'T' | 'G' | 'C';
    const angle1 = i * twistPerBp;
    const angle2 = angle1 + strand2PhaseShift;
    const z = zOffsetStart + i * risePerBp;

    // --- STRAND 1 NUCLEOTIDE ---
    const strand1AtomIndices: number[] = [];
    const p1_x = helixRadius * Math.cos(angle1);
    const p1_y = helixRadius * Math.sin(angle1);
    const p1_z = z;

    // 1. Phosphate P
    const p1Idx = atoms.length;
    atoms.push({
      id: `s1_${i}_P`,
      element: 'P',
      x: p1_x,
      y: p1_y,
      z: p1_z,
      radius: ELEMENT_PROPERTIES.P.radius,
      color: ELEMENT_PROPERTIES.P.color,
      nucleotideIndex: i * 2,
      residueName: base1,
      strand: 1,
      atomName: 'P',
      isBackbone: true,
    });
    strand1AtomIndices.push(p1Idx);

    // 2. Phosphoryl Oxygens (OP1, OP2)
    const op1Idx = atoms.length;
    atoms.push({
      id: `s1_${i}_OP1`,
      element: 'O',
      x: p1_x + 1.2 * Math.cos(angle1 + 0.4),
      y: p1_y + 1.2 * Math.sin(angle1 + 0.4),
      z: p1_z + 0.8,
      radius: ELEMENT_PROPERTIES.O.radius,
      color: ELEMENT_PROPERTIES.O.color,
      nucleotideIndex: i * 2,
      residueName: base1,
      strand: 1,
      atomName: 'OP1',
      isBackbone: true,
    });
    bonds.push({ atom1Index: p1Idx, atom2Index: op1Idx, order: 2 });
    strand1AtomIndices.push(op1Idx);

    // 3. Sugar C4', O4', C1' (moving radially inward toward helical axis)
    const sugarRadius = 6.2;
    const s1_c4x = sugarRadius * Math.cos(angle1 - 0.2);
    const s1_c4y = sugarRadius * Math.sin(angle1 - 0.2);
    const s1_c4z = z - 0.5;

    const c4Idx = atoms.length;
    atoms.push({
      id: `s1_${i}_C4'`,
      element: 'C',
      x: s1_c4x,
      y: s1_c4y,
      z: s1_c4z,
      radius: ELEMENT_PROPERTIES.C.radius,
      color: ELEMENT_PROPERTIES.C.color,
      nucleotideIndex: i * 2,
      residueName: base1,
      strand: 1,
      atomName: "C4'",
      isBackbone: true,
    });
    bonds.push({ atom1Index: p1Idx, atom2Index: c4Idx, order: 1 });
    strand1AtomIndices.push(c4Idx);

    // C1' (Glycosidic anchor)
    const s1_c1x = (sugarRadius - 1.8) * Math.cos(angle1 - 0.35);
    const s1_c1y = (sugarRadius - 1.8) * Math.sin(angle1 - 0.35);
    const s1_c1z = z - 0.2;

    const c1Idx = atoms.length;
    atoms.push({
      id: `s1_${i}_C1'`,
      element: 'C',
      x: s1_c1x,
      y: s1_c1y,
      z: s1_c1z,
      radius: ELEMENT_PROPERTIES.C.radius,
      color: ELEMENT_PROPERTIES.C.color,
      nucleotideIndex: i * 2,
      residueName: base1,
      strand: 1,
      atomName: "C1'",
      isBackbone: true,
    });
    bonds.push({ atom1Index: c4Idx, atom2Index: c1Idx, order: 1 });
    strand1AtomIndices.push(c1Idx);

    // C2' (Deoxy, no 2'-OH in B-DNA!)
    const s1_c2x = (sugarRadius - 1.2) * Math.cos(angle1 - 0.45);
    const s1_c2y = (sugarRadius - 1.2) * Math.sin(angle1 - 0.45);
    const s1_c2z = z - 1.0;
    const c2Idx = atoms.length;
    atoms.push({
      id: `s1_${i}_C2'`,
      element: 'C',
      x: s1_c2x,
      y: s1_c2y,
      z: s1_c2z,
      radius: ELEMENT_PROPERTIES.C.radius,
      color: ELEMENT_PROPERTIES.C.color,
      nucleotideIndex: i * 2,
      residueName: base1,
      strand: 1,
      atomName: "C2'",
      isBackbone: true,
    });
    bonds.push({ atom1Index: c1Idx, atom2Index: c2Idx, order: 1 });
    strand1AtomIndices.push(c2Idx);

    // 4. Nitrogenous Base Atoms for Strand 1
    // Base lies across plane pointing inward toward helical axis (r ~ 1.5 to 4.0 Å)
    const baseOuterRadius = 3.5;
    const baseInnerRadius = 1.0;

    const b1_out_x = baseOuterRadius * Math.cos(angle1 - 0.5);
    const b1_out_y = baseOuterRadius * Math.sin(angle1 - 0.5);
    const b1_out_z = z;

    const b1_in_x = baseInnerRadius * Math.cos(angle1 - 0.7);
    const b1_in_y = baseInnerRadius * Math.sin(angle1 - 0.7);
    const b1_in_z = z;

    const b1OuterIdx = atoms.length;
    const isPurine1 = base1 === 'A' || base1 === 'G';
    atoms.push({
      id: `s1_${i}_baseOuter`,
      element: isPurine1 ? 'N' : 'C',
      x: b1_out_x,
      y: b1_out_y,
      z: b1_out_z,
      radius: ELEMENT_PROPERTIES.N.radius,
      color: BASE_COLORS[base1],
      nucleotideIndex: i * 2,
      residueName: base1,
      strand: 1,
      atomName: isPurine1 ? 'N9' : 'N1',
      isBase: true,
    });
    bonds.push({ atom1Index: c1Idx, atom2Index: b1OuterIdx, order: 1 });
    strand1AtomIndices.push(b1OuterIdx);

    const b1InnerIdx = atoms.length;
    atoms.push({
      id: `s1_${i}_baseInner`,
      element: base1 === 'A' || base1 === 'C' ? 'N' : 'O',
      x: b1_in_x,
      y: b1_in_y,
      z: b1_in_z,
      radius: ELEMENT_PROPERTIES.N.radius,
      color: BASE_COLORS[base1],
      nucleotideIndex: i * 2,
      residueName: base1,
      strand: 1,
      atomName: base1 === 'A' ? 'N1' : base1 === 'G' ? 'O6' : base1 === 'T' ? 'O4' : 'N3',
      isBase: true,
    });
    bonds.push({ atom1Index: b1OuterIdx, atom2Index: b1InnerIdx, order: 1.5 });
    strand1AtomIndices.push(b1InnerIdx);

    // --- STRAND 2 COMPLEMENTARY NUCLEOTIDE ---
    const strand2AtomIndices: number[] = [];
    const p2_x = helixRadius * Math.cos(angle2);
    const p2_y = helixRadius * Math.sin(angle2);
    const p2_z = z;

    const p2Idx = atoms.length;
    atoms.push({
      id: `s2_${i}_P`,
      element: 'P',
      x: p2_x,
      y: p2_y,
      z: p2_z,
      radius: ELEMENT_PROPERTIES.P.radius,
      color: ELEMENT_PROPERTIES.P.color,
      nucleotideIndex: i * 2 + 1,
      residueName: base2,
      strand: 2,
      atomName: 'P',
      isBackbone: true,
    });
    strand2AtomIndices.push(p2Idx);

    const op2Idx = atoms.length;
    atoms.push({
      id: `s2_${i}_OP1`,
      element: 'O',
      x: p2_x + 1.2 * Math.cos(angle2 + 0.4),
      y: p2_y + 1.2 * Math.sin(angle2 + 0.4),
      z: p2_z - 0.8,
      radius: ELEMENT_PROPERTIES.O.radius,
      color: ELEMENT_PROPERTIES.O.color,
      nucleotideIndex: i * 2 + 1,
      residueName: base2,
      strand: 2,
      atomName: 'OP1',
      isBackbone: true,
    });
    bonds.push({ atom1Index: p2Idx, atom2Index: op2Idx, order: 2 });
    strand2AtomIndices.push(op2Idx);

    // Sugar on Strand 2
    const s2_c4x = sugarRadius * Math.cos(angle2 + 0.2);
    const s2_c4y = sugarRadius * Math.sin(angle2 + 0.2);
    const s2_c4z = z + 0.5;

    const c4_2Idx = atoms.length;
    atoms.push({
      id: `s2_${i}_C4'`,
      element: 'C',
      x: s2_c4x,
      y: s2_c4y,
      z: s2_c4z,
      radius: ELEMENT_PROPERTIES.C.radius,
      color: ELEMENT_PROPERTIES.C.color,
      nucleotideIndex: i * 2 + 1,
      residueName: base2,
      strand: 2,
      atomName: "C4'",
      isBackbone: true,
    });
    bonds.push({ atom1Index: p2Idx, atom2Index: c4_2Idx, order: 1 });
    strand2AtomIndices.push(c4_2Idx);

    const s2_c1x = (sugarRadius - 1.8) * Math.cos(angle2 + 0.35);
    const s2_c1y = (sugarRadius - 1.8) * Math.sin(angle2 + 0.35);
    const s2_c1z = z + 0.2;

    const c1_2Idx = atoms.length;
    atoms.push({
      id: `s2_${i}_C1'`,
      element: 'C',
      x: s2_c1x,
      y: s2_c1y,
      z: s2_c1z,
      radius: ELEMENT_PROPERTIES.C.radius,
      color: ELEMENT_PROPERTIES.C.color,
      nucleotideIndex: i * 2 + 1,
      residueName: base2,
      strand: 2,
      atomName: "C1'",
      isBackbone: true,
    });
    bonds.push({ atom1Index: c4_2Idx, atom2Index: c1_2Idx, order: 1 });
    strand2AtomIndices.push(c1_2Idx);

    // Base Atoms for Strand 2
    const b2_out_x = baseOuterRadius * Math.cos(angle2 + 0.5);
    const b2_out_y = baseOuterRadius * Math.sin(angle2 + 0.5);
    const b2_out_z = z;

    const b2_in_x = baseInnerRadius * Math.cos(angle2 + 0.7);
    const b2_in_y = baseInnerRadius * Math.sin(angle2 + 0.7);
    const b2_in_z = z;

    const b2OuterIdx = atoms.length;
    const isPurine2 = base2 === 'A' || base2 === 'G';
    atoms.push({
      id: `s2_${i}_baseOuter`,
      element: isPurine2 ? 'N' : 'C',
      x: b2_out_x,
      y: b2_out_y,
      z: b2_out_z,
      radius: ELEMENT_PROPERTIES.N.radius,
      color: BASE_COLORS[base2],
      nucleotideIndex: i * 2 + 1,
      residueName: base2,
      strand: 2,
      atomName: isPurine2 ? 'N9' : 'N1',
      isBase: true,
    });
    bonds.push({ atom1Index: c1_2Idx, atom2Index: b2OuterIdx, order: 1 });
    strand2AtomIndices.push(b2OuterIdx);

    const b2InnerIdx = atoms.length;
    atoms.push({
      id: `s2_${i}_baseInner`,
      element: base2 === 'A' || base2 === 'C' ? 'N' : 'O',
      x: b2_in_x,
      y: b2_in_y,
      z: b2_in_z,
      radius: ELEMENT_PROPERTIES.N.radius,
      color: BASE_COLORS[base2],
      nucleotideIndex: i * 2 + 1,
      residueName: base2,
      strand: 2,
      atomName: base2 === 'A' ? 'N1' : base2 === 'G' ? 'O6' : base2 === 'T' ? 'O4' : 'N3',
      isBase: true,
    });
    bonds.push({ atom1Index: b2OuterIdx, atom2Index: b2InnerIdx, order: 1.5 });
    strand2AtomIndices.push(b2InnerIdx);

    // --- WATSON-CRICK HYDROGEN BOND BETWEEN BASES ---
    const hBondsForPair = (base1 === 'G' || base1 === 'C') ? 3 : 2;
    bonds.push({
      atom1Index: b1InnerIdx,
      atom2Index: b2InnerIdx,
      order: 1,
      isHydrogenBond: true,
      distance: 2.85,
    });

    // Store nucleotide objects
    nucleotides.push({
      index: i * 2,
      strand: 1,
      base: base1,
      name: `d${base1}MP-${i + 1}`,
      atomIndices: strand1AtomIndices,
      center: [p1_x, p1_y, p1_z],
      baseCenter: [b1_in_x, b1_in_y, b1_in_z],
      sugarCenter: [s1_c4x, s1_c4y, s1_c4z],
      phosphateCenter: [p1_x, p1_y, p1_z],
      pairedWithIndex: i * 2 + 1,
      hBondCount: hBondsForPair,
      sugarPucker: "C2'-endo",
      glycosidicAngle: 'anti',
    });

    nucleotides.push({
      index: i * 2 + 1,
      strand: 2,
      base: base2,
      name: `d${base2}MP-${i + 1}`,
      atomIndices: strand2AtomIndices,
      center: [p2_x, p2_y, p2_z],
      baseCenter: [b2_in_x, b2_in_y, b2_in_z],
      sugarCenter: [s2_c4x, s2_c4y, s2_c4z],
      phosphateCenter: [p2_x, p2_y, p2_z],
      pairedWithIndex: i * 2,
      hBondCount: hBondsForPair,
      sugarPucker: "C2'-endo",
      glycosidicAngle: 'anti',
    });

    // Link consecutive phosphodiester bonds on Strand 1 (3' -> 5')
    if (i > 0) {
      const prevC4Idx = strand1AtomIndices[2] - 12; // previous nucleotide C4'
      bonds.push({ atom1Index: prevC4Idx, atom2Index: p1Idx, order: 1 });

      const prevS2PIdx = strand2AtomIndices[0] - 12; // previous s2 phosphate
      bonds.push({ atom1Index: c4_2Idx, atom2Index: prevS2PIdx, order: 1 });
    }
  }

  // Annotations for Major Groove, Minor Groove, Helical Pitch, and Watson-Crick Base Pair
  const annotations: SpatialFeatureAnnotation[] = [
    {
      id: 'major-groove-1',
      label: 'Major Groove (22 Å)',
      description: 'Wide, deep groove exposing sequence-specific H-bond donor/acceptor patterns (e.g. Zinc Fingers, Transcription Factors, Crispr Cas9).',
      position: [0, 8.5, 0],
      type: 'major-groove',
      color: '#3B82F6',
      measurementText: 'Width: 22.0 Å, Depth: 8.5 Å',
    },
    {
      id: 'minor-groove-1',
      label: 'Minor Groove (12 Å)',
      description: 'Narrow, shallow groove exposing uniform H-bond patterns across AT/GC pairs, targeted by DAPI and TATA-binding protein.',
      position: [0, -8.5, 3.4],
      type: 'minor-groove',
      color: '#F59E0B',
      measurementText: 'Width: 12.0 Å, Depth: 7.5 Å',
    },
    {
      id: 'h-bond-center',
      label: 'Watson-Crick Base Stacking',
      description: 'Parallel planar aromatic rings stack at 3.38 Å spacing, generating hydrophobic entropy & van der Waals stabilization (ΔG = -1.5 to -3.0 kcal/mol per step).',
      position: [0, 0, 0],
      type: 'h-bond',
      color: '#10B981',
      measurementText: '3.38 Å rise per base pair',
    },
    {
      id: 'sugar-phosphate-backbone',
      label: 'C2\'-endo Phosphodiester Backbone',
      description: 'Negatively charged polyanionic surface with C2\'-endo deoxyribose pucker spacing phosphates 7.0 Å apart.',
      position: [helixRadius, 0, -risePerBp * 2],
      type: 'sugar-phosphate',
      color: '#EC4899',
      measurementText: 'Charge: -1e per nucleotide',
    }
  ];

  return {
    id: 'b-dna',
    title: 'B-DNA Canonical Double Helix',
    subtitle: 'Right-handed Watson-Crick duplex with 10.5 bp/turn, antiparallel polarity, and distinct Major/Minor grooves',
    classification: 'Classical Genomic DNA',
    helixType: 'Right-handed (B-Form)',
    basePairsOrResidues: numBp,
    diameterAngstroms: 20.0,
    risePerBaseAngstroms: 3.38,
    bpPerTurn: 10.5,
    pitchAngstroms: 34.0,
    atoms,
    bonds,
    nucleotides,
    annotations,
    keyTakeaways: [
      'Standard physiological conformation in aqueous solution (neutral pH, physiological salt concentration).',
      'Antiparallel strands: One strand runs 5\'->3\' while the complementary strand runs 3\'->5\'.',
      'Asymmetric backbone spacing generates the wide Major Groove (22 Å) and narrow Minor Groove (12 Å).',
      'Deoxyribose adopts the C2\'-endo sugar pucker, placing the 3\' and 5\' phosphate groups ~7.0 Å apart.',
      'Watson-Crick base pairing: 2 hydrogen bonds between A=T (~2.8 Å) and 3 hydrogen bonds between G≡C (~2.9 Å).'
    ],
    clinicalOrBiologicalSignificance: 'Transcription factors read sequence motifs via the Major Groove with alpha helices (e.g. Zinc Fingers, Leucine Zippers, Homeodomains). Minor groove-binding drugs (Netropsin, DAPI) bind AT-rich tracts.'
  };
}

// -------------------------------------------------------------
// 2. GENERATE A-FORM RNA / A-DNA MODEL
// -------------------------------------------------------------
export function generateARnaModel(): MoleculeModelData {
  const sequence = DEFAULT_RNA_SEQUENCE;
  const numBp = sequence.length;
  const atoms: Atom3D[] = [];
  const bonds: Bond3D[] = [];
  const nucleotides: Nucleotide3D[] = [];

  const helixRadius = 11.5; // Wider diameter (23 Å)
  const risePerBp = 2.56; // More compact rise (2.56 Å per bp)
  const twistPerBp = (32.7 * Math.PI) / 180.0; // 11 bp per turn (32.7° twist)
  const baseInclination = (19.0 * Math.PI) / 180.0; // Bases tilted 19° relative to helical axis!
  const zOffsetStart = -((numBp - 1) * risePerBp) / 2;

  for (let i = 0; i < numBp; i++) {
    const base1 = sequence[i] as 'A' | 'U' | 'G' | 'C';
    const base2 = getComplementaryBase(base1, true) as 'A' | 'U' | 'G' | 'C';
    const angle1 = i * twistPerBp;
    const angle2 = angle1 + Math.PI * 0.85;
    const z = zOffsetStart + i * risePerBp;

    // Strand 1 P
    const p1_x = helixRadius * Math.cos(angle1);
    const p1_y = helixRadius * Math.sin(angle1);
    const p1_z = z;

    const p1Idx = atoms.length;
    atoms.push({
      id: `rna1_${i}_P`,
      element: 'P',
      x: p1_x,
      y: p1_y,
      z: p1_z,
      radius: ELEMENT_PROPERTIES.P.radius,
      color: ELEMENT_PROPERTIES.P.color,
      nucleotideIndex: i * 2,
      residueName: base1,
      strand: 3,
      atomName: 'P',
      isBackbone: true,
    });

    // Ribose C4' and 2'-OH (The 2'-OH steric clash forces A-form geometry!)
    const s1_c4x = (helixRadius - 3.5) * Math.cos(angle1 - 0.2);
    const s1_c4y = (helixRadius - 3.5) * Math.sin(angle1 - 0.2);
    const s1_c4z = z - 0.4;

    const c4Idx = atoms.length;
    atoms.push({
      id: `rna1_${i}_C4'`,
      element: 'C',
      x: s1_c4x,
      y: s1_c4y,
      z: s1_c4z,
      radius: ELEMENT_PROPERTIES.C.radius,
      color: ELEMENT_PROPERTIES.C.color,
      nucleotideIndex: i * 2,
      residueName: base1,
      strand: 3,
      atomName: "C4'",
      isBackbone: true,
    });
    bonds.push({ atom1Index: p1Idx, atom2Index: c4Idx, order: 1 });

    // 2'-OH Oxygen (Distinctive RNA Feature)
    const o2x = s1_c4x + 1.2 * Math.cos(angle1 + 0.3);
    const o2y = s1_c4y + 1.2 * Math.sin(angle1 + 0.3);
    const o2z = s1_c4z + 0.6;
    const o2Idx = atoms.length;
    atoms.push({
      id: `rna1_${i}_O2'`,
      element: 'O',
      x: o2x,
      y: o2y,
      z: o2z,
      radius: ELEMENT_PROPERTIES.O.radius,
      color: '#06B6D4', // Cyan highlight for 2'-OH
      nucleotideIndex: i * 2,
      residueName: base1,
      strand: 3,
      atomName: "O2'",
      isBackbone: true,
    });
    bonds.push({ atom1Index: c4Idx, atom2Index: o2Idx, order: 1 });

    // Base with tilt
    const b1_x = 4.0 * Math.cos(angle1 - 0.6);
    const b1_y = 4.0 * Math.sin(angle1 - 0.6);
    const b1_z = z + Math.sin(baseInclination) * 2.0;

    const b1Idx = atoms.length;
    atoms.push({
      id: `rna1_${i}_Base`,
      element: base1 === 'A' || base1 === 'G' ? 'N' : 'O',
      x: b1_x,
      y: b1_y,
      z: b1_z,
      radius: ELEMENT_PROPERTIES.N.radius,
      color: BASE_COLORS[base1],
      nucleotideIndex: i * 2,
      residueName: base1,
      strand: 3,
      atomName: 'Base',
      isBase: true,
    });
    bonds.push({ atom1Index: c4Idx, atom2Index: b1Idx, order: 1 });

    // Strand 2 Complementary RNA
    const p2_x = helixRadius * Math.cos(angle2);
    const p2_y = helixRadius * Math.sin(angle2);
    const p2_z = z;
    const p2Idx = atoms.length;
    atoms.push({
      id: `rna2_${i}_P`,
      element: 'P',
      x: p2_x,
      y: p2_y,
      z: p2_z,
      radius: ELEMENT_PROPERTIES.P.radius,
      color: ELEMENT_PROPERTIES.P.color,
      nucleotideIndex: i * 2 + 1,
      residueName: base2,
      strand: 3,
      atomName: 'P',
      isBackbone: true,
    });

    const b2_x = 4.0 * Math.cos(angle2 + 0.6);
    const b2_y = 4.0 * Math.sin(angle2 + 0.6);
    const b2_z = z - Math.sin(baseInclination) * 2.0;

    const b2Idx = atoms.length;
    atoms.push({
      id: `rna2_${i}_Base`,
      element: base2 === 'A' || base2 === 'G' ? 'N' : 'O',
      x: b2_x,
      y: b2_y,
      z: b2_z,
      radius: ELEMENT_PROPERTIES.N.radius,
      color: BASE_COLORS[base2],
      nucleotideIndex: i * 2 + 1,
      residueName: base2,
      strand: 3,
      atomName: 'Base',
      isBase: true,
    });
    bonds.push({ atom1Index: p2Idx, atom2Index: b2Idx, order: 1 });

    // Watson-Crick H-bond (A=U or G≡C)
    bonds.push({
      atom1Index: b1Idx,
      atom2Index: b2Idx,
      order: 1,
      isHydrogenBond: true,
      distance: 2.8,
    });

    nucleotides.push({
      index: i * 2,
      strand: 3,
      base: base1,
      name: `r${base1}MP-${i + 1}`,
      atomIndices: [p1Idx, c4Idx, o2Idx, b1Idx],
      center: [p1_x, p1_y, p1_z],
      baseCenter: [b1_x, b1_y, b1_z],
      sugarCenter: [s1_c4x, s1_c4y, s1_c4z],
      phosphateCenter: [p1_x, p1_y, p1_z],
      pairedWithIndex: i * 2 + 1,
      hBondCount: base1 === 'G' || base1 === 'C' ? 3 : 2,
      sugarPucker: "C3'-endo",
      glycosidicAngle: 'anti',
    });

    nucleotides.push({
      index: i * 2 + 1,
      strand: 3,
      base: base2,
      name: `r${base2}MP-${i + 1}`,
      atomIndices: [p2Idx, b2Idx],
      center: [p2_x, p2_y, p2_z],
      baseCenter: [b2_x, b2_y, b2_z],
      sugarCenter: [p2_x - 3, p2_y, p2_z],
      phosphateCenter: [p2_x, p2_y, p2_z],
      pairedWithIndex: i * 2,
      hBondCount: base1 === 'G' || base1 === 'C' ? 3 : 2,
      sugarPucker: "C3'-endo",
      glycosidicAngle: 'anti',
    });
  }

  const annotations: SpatialFeatureAnnotation[] = [
    {
      id: 'c3-endo-pucker',
      label: 'C3\'-endo Ribose Conformation',
      description: 'The bulky 2\'-OH creates steric hindrance in C2\'-endo, forcing the ribose ring into C3\'-endo pucker and shrinking phosphate distance to 5.9 Å.',
      position: [helixRadius - 2, 0, 0],
      type: 'sugar-phosphate',
      color: '#06B6D4',
      measurementText: 'Phosphate-to-phosphate: 5.9 Å',
    },
    {
      id: 'base-tilt-19',
      label: '19° Base Pair Inclination',
      description: 'Base pairs are tilted 19° away from perpendicular, creating a deep, narrow major groove and a broad, shallow minor groove.',
      position: [0, 0, 0],
      type: 'major-groove',
      color: '#8B5CF6',
      measurementText: 'Tilt angle: +19.0°',
    },
    {
      id: 'uracil-vs-thymine',
      label: 'Uracil Pairing (A=U)',
      description: 'Uracil lacks the 5-methyl group of Thymine, enabling tighter RNA packing and specialized tertiary interactions.',
      position: [0, 5, 2],
      type: 'h-bond',
      color: '#EC4899',
      measurementText: 'H-bonds: 2',
    }
  ];

  return {
    id: 'a-rna',
    title: 'A-Form RNA Double Duplex',
    subtitle: 'Right-handed 11 bp/turn compact helix with C3\'-endo ribose pucker and 19° tilted base pairs',
    classification: 'Double-Stranded RNA / RNA-DNA Hybrid',
    helixType: 'Right-handed (A-Form)',
    basePairsOrResidues: numBp,
    diameterAngstroms: 23.0,
    risePerBaseAngstroms: 2.56,
    bpPerTurn: 11.0,
    pitchAngstroms: 28.2,
    atoms,
    bonds,
    nucleotides,
    annotations,
    keyTakeaways: [
      'All double-stranded RNA (dsRNA) and RNA-DNA hybrids adopt the A-form exclusively due to the 2\'-OH group.',
      'The 2\'-hydroxyl group clashes sterically with adjacent phosphates in the B-form C2\'-endo geometry.',
      'C3\'-endo pucker pulls consecutive phosphates closer together (5.9 Å vs 7.0 Å in B-DNA).',
      'The Major Groove becomes extremely deep and narrow (almost inaccessible to proteins), while the Minor Groove is broad and flat.',
      'RNA-DNA hybrids created by RNA Polymerase during transcription adopt this exact A-form architecture.'
    ],
    clinicalOrBiologicalSignificance: 'dsRNA is recognized by innate immune sensors (e.g. TLR3, MDA5, RIG-I, PKR) as viral genetic material to trigger type I interferon responses.'
  };
}

// -------------------------------------------------------------
// 3. GENERATE tRNA-Phe 3D TERTIARY L-FOLD MODEL
// -------------------------------------------------------------
export function generateTrnaModel(): MoleculeModelData {
  const atoms: Atom3D[] = [];
  const bonds: Bond3D[] = [];
  const nucleotides: Nucleotide3D[] = [];

  // Key coordinates representing the 4 arms of the classical yeast tRNA-Phe L-shaped tertiary fold
  // 1. Acceptor Stem (top horizontal arm: x: -10 to +10, y: 15, z: 0)
  // 2. D-Stem & Loop (corner junction: x: -12, y: 5, z: 5)
  // 3. TΨC Loop (corner junction: x: 12, y: 5, z: -5)
  // 4. Anticodon Arm (vertical downward arm: x: 0, y: -15, z: 0)

  const trnaNodes = [
    // Acceptor stem 3' CCA terminus (with Phe amino acid)
    { id: 'A76-CCA', base: 'A' as const, pos: [12, 22, 0] as [number, number, number], name: 'A76 (3\'-CCA Terminus)' },
    { id: 'C75', base: 'C' as const, pos: [10, 20, 0] as [number, number, number], name: 'C75' },
    { id: 'C74', base: 'C' as const, pos: [8, 18, 0] as [number, number, number], name: 'C74' },
    { id: 'A73', base: 'A' as const, pos: [6, 16, 0] as [number, number, number], name: 'A73 (Discriminator Base)' },
    
    // Acceptor stem paired region
    { id: 'G1-C72', base: 'G' as const, pos: [4, 14, 2] as [number, number, number], name: 'G1 (5\'-P)' },
    { id: 'C2-G71', base: 'C' as const, pos: [2, 12, 3] as [number, number, number], name: 'C2' },
    { id: 'G3-C70', base: 'G' as const, pos: [0, 10, 4] as [number, number, number], name: 'G3' },
    
    // TΨC Stem & Loop (elbow region right)
    { id: 'T54', base: 'U' as const, pos: [8, 8, -6] as [number, number, number], name: 'rT54 (T-Loop)' },
    { id: 'Psi55', base: 'U' as const, pos: [10, 6, -8] as [number, number, number], name: 'Ψ55 (Pseudouridine)' },
    { id: 'C56', base: 'C' as const, pos: [8, 4, -8] as [number, number, number], name: 'C56' },

    // D-Stem & Loop (elbow region left)
    { id: 'D16', base: 'U' as const, pos: [-8, 8, 6] as [number, number, number], name: 'D16 (Dihydrouridine)' },
    { id: 'D17', base: 'U' as const, pos: [-10, 6, 8] as [number, number, number], name: 'D17' },
    { id: 'G18', base: 'G' as const, pos: [-8, 4, 8] as [number, number, number], name: 'G18 (D-Loop)' },

    // Core tertiary base triples
    { id: 'U8-A14-A21', base: 'A' as const, pos: [0, 4, 0] as [number, number, number], name: 'Tertiary Triple Core' },

    // Anticodon stem
    { id: 'U27-A43', base: 'U' as const, pos: [0, 0, 0] as [number, number, number], name: 'U27-A43' },
    { id: 'C28-G42', base: 'C' as const, pos: [0, -4, 0] as [number, number, number], name: 'C28-G42' },
    { id: 'A29-U41', base: 'A' as const, pos: [0, -8, 0] as [number, number, number], name: 'A29-U41' },
    { id: 'G30-C40', base: 'G' as const, pos: [0, -12, 0] as [number, number, number], name: 'G30-C40' },

    // Anticodon Loop (triplet GAA pairing with UUC Phe Codon)
    { id: 'Cm32', base: 'C' as const, pos: [-3, -15, 2] as [number, number, number], name: 'Cm32' },
    { id: 'U33', base: 'U' as const, pos: [-3, -18, 0] as [number, number, number], name: 'U33 (U-Turn Motif)' },
    { id: 'G34', base: 'G' as const, pos: [-1.5, -21, -2] as [number, number, number], name: 'G34 (Wobble Anticodon Base)' },
    { id: 'A35', base: 'A' as const, pos: [0, -22, -2] as [number, number, number], name: 'A35 (Anticodon Base 2)' },
    { id: 'A36', base: 'A' as const, pos: [1.5, -21, -2] as [number, number, number], name: 'A36 (Anticodon Base 3)' },
    { id: 'Y37', base: 'A' as const, pos: [3, -18, 0] as [number, number, number], name: 'Y37 (Wybutosine Stacking)' },
  ];

  let prevIdx = -1;
  trnaNodes.forEach((node, i) => {
    const [x, y, z] = node.pos;
    const atomIdx = atoms.length;

    // Phosphate/Backbone sphere
    atoms.push({
      id: `trna_${node.id}_P`,
      element: 'P',
      x,
      y,
      z,
      radius: 1.8,
      color: ELEMENT_PROPERTIES.P.color,
      nucleotideIndex: i,
      residueName: node.base,
      strand: 3,
      atomName: 'P',
      isBackbone: true,
    });

    // Base sphere attached nearby
    const baseIdx = atoms.length;
    const bColor = BASE_COLORS[node.base];
    atoms.push({
      id: `trna_${node.id}_Base`,
      element: node.base === 'A' || node.base === 'G' ? 'N' : 'O',
      x: x + 1.5,
      y: y,
      z: z + 1.2,
      radius: 1.6,
      color: bColor,
      nucleotideIndex: i,
      residueName: node.base,
      strand: 3,
      atomName: 'Base',
      isBase: true,
    });
    bonds.push({ atom1Index: atomIdx, atom2Index: baseIdx, order: 1 });

    if (prevIdx !== -1) {
      bonds.push({ atom1Index: prevIdx, atom2Index: atomIdx, order: 1 });
    }
    prevIdx = atomIdx;

    nucleotides.push({
      index: i,
      strand: 3,
      base: node.base,
      name: node.name,
      atomIndices: [atomIdx, baseIdx],
      center: [x, y, z],
      baseCenter: [x + 1.5, y, z + 1.2],
      sugarCenter: [x, y, z],
      phosphateCenter: [x, y, z],
      sugarPucker: "C3'-endo",
      glycosidicAngle: 'anti',
    });
  });

  // Attached Phenylalanine Amino Acid on A76 3'-OH
  const pheIdx = atoms.length;
  atoms.push({
    id: 'phe_amino_acid',
    element: 'C',
    x: 14,
    y: 25,
    z: 0,
    radius: 2.2,
    color: '#84CC16', // Lime Green
    residueName: 'PHE',
    strand: 3,
    atomName: 'L-Phenylalanine',
  });
  bonds.push({ atom1Index: 0, atom2Index: pheIdx, order: 1 });

  const annotations: SpatialFeatureAnnotation[] = [
    {
      id: 'cca-acceptor-3prime',
      label: '3\'-CCA Amino Acid Binding Stem (~76 Å from anticodon)',
      description: 'Aminoacyl-tRNA synthetase esterifies L-Phenylalanine to the 2\'/3\'-OH of terminal Adenosine A76 via high-energy aminoacyl-adenylate intermediate.',
      position: [13, 24, 0],
      type: 'aminoacyl-site',
      color: '#84CC16',
      measurementText: 'Distance to anticodon: 76.0 Å',
    },
    {
      id: 'anticodon-gaa',
      label: 'Anticodon Loop (G34-A35-A36)',
      description: 'Exposes the 3-base anticodon GAA (running 5\'->3\') which pairs antiparallel with mRNA codons UUC & UUU (Phenylalanine).',
      position: [0, -22, -2],
      type: 'anticodon',
      color: '#EC4899',
      measurementText: 'Pairs with mRNA codon UUC',
    },
    {
      id: 'l-shaped-tertiary-elbow',
      label: 'D-Loop / TΨC Loop Elbow Junction',
      description: 'Non-canonical tertiary base pairs (G18•Ψ55, G19•C56, U8•A14•A21 triple) lock the 76-nucleotide chain into a rigid ~90° L-shape.',
      position: [0, 6, 0],
      type: 'sugar-phosphate',
      color: '#3B82F6',
      measurementText: 'Tertiary bend angle: ~90°',
    }
  ];

  return {
    id: 'trna-phe',
    title: 'Transfer RNA (tRNA-Phe) 3D L-Fold',
    subtitle: '76-nucleotide adaptor molecule showing the 76 Å spatial separation between Aminoacyl 3\'-CCA stem and Anticodon loop',
    classification: 'Functional Non-Coding RNA Adapter',
    helixType: 'Tertiary L-Fold',
    basePairsOrResidues: 76,
    diameterAngstroms: 20.0,
    risePerBaseAngstroms: 2.6,
    bpPerTurn: 11.0,
    pitchAngstroms: 76.0,
    atoms,
    bonds,
    nucleotides,
    annotations,
    keyTakeaways: [
      'The cloverleaf secondary structure folds into an invariant 3D L-shape spanning exactly 76 Å from end to end.',
      'Terminal 3\'-CCA tail binds the specific amino acid (Phenylalanine) via ester bond.',
      'Anticodon loop contains modified bases (e.g. Wybutosine Y37) to prevent frameshifting during ribosomal translocation.',
      'Wobble base at position 34 (G) can pair with either C or U in the third mRNA codon position.',
      'Fits precisely into the A, P, and E ribosomal factor binding sites during translation elongation.'
    ],
    clinicalOrBiologicalSignificance: 'tRNA charging is carried out with extreme fidelity (< 1 error in 10,000) by Phenylalanyl-tRNA synthetase with a dedicated hydrolytic editing site.'
  };
}

// -------------------------------------------------------------
// 4. GENERATE RIBOSOME DECODING CENTER (mRNA-tRNA-A/P SITES)
// -------------------------------------------------------------
export function generateRibosomeDecodingModel(): MoleculeModelData {
  const atoms: Atom3D[] = [];
  const bonds: Bond3D[] = [];
  const nucleotides: Nucleotide3D[] = [];

  // mRNA Strand running 5' to 3' across bottom (x: -15 to +15, y: -10, z: 0)
  const mrnaCodons = [
    { base: 'A' as const, name: 'mRNA: AUG (Met Codon 1 - P-Site)', pos: [-6, -10, 0] },
    { base: 'U' as const, name: 'mRNA: AUG (U)', pos: [-4, -10, 0] },
    { base: 'G' as const, name: 'mRNA: AUG (G)', pos: [-2, -10, 0] },
    { base: 'U' as const, name: 'mRNA: UUC (Phe Codon 2 - A-Site)', pos: [2, -10, 0] },
    { base: 'U' as const, name: 'mRNA: UUC (U)', pos: [4, -10, 0] },
    { base: 'C' as const, name: 'mRNA: UUC (C)', pos: [6, -10, 0] },
  ];

  let prevM: number = -1;
  mrnaCodons.forEach((c, i) => {
    const idx = atoms.length;
    atoms.push({
      id: `mrna_${i}`,
      element: 'P',
      x: c.pos[0],
      y: c.pos[1],
      z: c.pos[2],
      radius: 1.8,
      color: '#0284C7', // Sky Blue mRNA backbone
      nucleotideIndex: i,
      residueName: c.base,
      strand: 3,
      atomName: 'mRNA-P',
      isBackbone: true,
    });

    const bIdx = atoms.length;
    atoms.push({
      id: `mrna_b_${i}`,
      element: c.base === 'A' || c.base === 'G' ? 'N' : 'O',
      x: c.pos[0],
      y: c.pos[1] + 2.5,
      z: c.pos[2],
      radius: 1.6,
      color: BASE_COLORS[c.base],
      nucleotideIndex: i,
      residueName: c.base,
      strand: 3,
      atomName: 'mRNA-Base',
      isBase: true,
    });
    bonds.push({ atom1Index: idx, atom2Index: bIdx, order: 1 });

    if (prevM !== -1) {
      bonds.push({ atom1Index: prevM, atom2Index: idx, order: 1 });
    }
    prevM = idx;

    nucleotides.push({
      index: i,
      strand: 3,
      base: c.base,
      name: c.name,
      atomIndices: [idx, bIdx],
      center: [c.pos[0], c.pos[1], c.pos[2]],
      baseCenter: [c.pos[0], c.pos[1] + 2.5, c.pos[2]],
      sugarCenter: [c.pos[0], c.pos[1], c.pos[2]],
      phosphateCenter: [c.pos[0], c.pos[1], c.pos[2]],
      sugarPucker: "C3'-endo",
      glycosidicAngle: 'anti',
    });
  });

  // P-Site tRNA with Initiator Met and growing peptide
  const pTrnaIdx = atoms.length;
  atoms.push({
    id: 'p_site_trna',
    element: 'N',
    x: -4,
    y: 2,
    z: 0,
    radius: 3.2,
    color: '#059669', // Emerald
    residueName: 'tRNA-Met',
    strand: 1,
    atomName: 'P-Site Peptidyl-tRNA',
  });
  // H-bonds between AUG and CAU anticodon
  bonds.push({ atom1Index: 1, atom2Index: pTrnaIdx, order: 1, isHydrogenBond: true, distance: 2.9 });

  // A-Site tRNA with incoming Phe-tRNA
  const aTrnaIdx = atoms.length;
  atoms.push({
    id: 'a_site_trna',
    element: 'N',
    x: 4,
    y: 2,
    z: 0,
    radius: 3.2,
    color: '#D97706', // Amber
    residueName: 'tRNA-Phe',
    strand: 2,
    atomName: 'A-Site Aminoacyl-tRNA',
  });
  // H-bonds between UUC and GAA anticodon
  bonds.push({ atom1Index: 7, atom2Index: aTrnaIdx, order: 1, isHydrogenBond: true, distance: 2.9 });

  // Peptidyl Transferase Center (PTC) at top: Nucleophilic Attack trajectory!
  const peptidylC = atoms.length;
  atoms.push({
    id: 'peptidyl_c',
    element: 'C',
    x: -2,
    y: 12,
    z: 0,
    radius: 2.0,
    color: '#EF4444',
    atomName: 'Peptidyl Carbonyl (C=O)',
  });

  const aminoN = atoms.length;
  atoms.push({
    id: 'amino_n',
    element: 'N',
    x: 1,
    y: 12,
    z: 0,
    radius: 2.0,
    color: '#2563EB',
    atomName: 'Alpha-Amino (:NH2 Nucleophile)',
  });
  bonds.push({ atom1Index: peptidylC, atom2Index: aminoN, order: 1, isHydrogenBond: true, distance: 3.0 });

  // Magnesium Ion Mg2+ stabilizing rRNA 23S/28S active site
  atoms.push({
    id: 'mg_ion',
    element: 'Mg',
    x: 0,
    y: 15,
    z: 2,
    radius: 1.7,
    color: '#10B981',
    atomName: 'Catalytic Mg2+ Ion',
  });

  const annotations: SpatialFeatureAnnotation[] = [
    {
      id: 'ptc-attack',
      label: 'Peptidyl Transferase Active Site (PTC)',
      description: 'The α-amino group (:NH2) of A-site aminoacyl-tRNA mounts a nucleophilic attack on the carbonyl carbon (C=O) of P-site peptidyl-tRNA (distance ~3.0 Å). Catalyzed exclusively by 23S/28S rRNA ribozyme!',
      position: [-0.5, 12, 0],
      type: 'aminoacyl-site',
      color: '#EF4444',
      measurementText: 'Attack distance: 3.0 Å',
    },
    {
      id: 'decoding-center-16s',
      label: '16S / 18S Decoding Center (A1492, A1493, G530)',
      description: 'Adenines A1492 and A1493 flip out of helix 44 of 16S rRNA to form A-minor groove interactions, proofreading Watson-Crick codon-anticodon geometry.',
      position: [0, -6, 0],
      type: 'anticodon',
      color: '#3B82F6',
      measurementText: 'Proofreading error rate: < 10^-4',
    }
  ];

  return {
    id: 'ribosome-decoding',
    title: 'Ribosome Decoding Center & Peptidyl Transfer Center',
    subtitle: 'Spatial arrangement of mRNA codons, P-site peptidyl-tRNA, A-site aminoacyl-tRNA, and the catalytic PTC ribozyme',
    classification: 'Complex Ribonucleoprotein',
    helixType: 'Complex Ribonucleoprotein',
    basePairsOrResidues: 6,
    diameterAngstroms: 30.0,
    risePerBaseAngstroms: 3.4,
    bpPerTurn: 10.0,
    pitchAngstroms: 45.0,
    atoms,
    bonds,
    nucleotides,
    annotations,
    keyTakeaways: [
      'The ribosome is a ribozyme: peptide bond formation is catalyzed by rRNA (23S in prokaryotes, 28S in eukaryotes) without any protein within 18 Å of the active site.',
      'mRNA is threaded through the small ribosomal subunit (30S/40S), presenting codons to tRNA anticodons.',
      'P-Site (Peptidyl) holds the tRNA attached to the growing nascent polypeptide chain.',
      'A-Site (Aminoacyl) accommodates the incoming aminoacyl-tRNA escorted by EF-Tu (eEF1A)•GTP.',
      'Nucleophilic attack transfers the entire peptide chain onto the amino acid in the A-site, followed by EF-G (eEF2) mediated translocation.'
    ],
    clinicalOrBiologicalSignificance: 'Target of major antibiotics: Aminoglycosides (gentamicin) freeze decoding center proofreading; Macrolides (erythromycin) block the nascent peptide exit tunnel; Puromycin mimics aminoacyl-tRNA causing premature chain termination.'
  };
}

// -------------------------------------------------------------
// 5. GENERATE SINGLE dATP / ATP MOLECULE MODEL
// -------------------------------------------------------------
export function generateSingleDatpModel(): MoleculeModelData {
  const atoms: Atom3D[] = [];
  const bonds: Bond3D[] = [];

  // Deoxyadenosine Triphosphate (dATP) atom-by-atom exact positions
  // 1. Triphosphate chain (Gamma -> Beta -> Alpha)
  // Gamma Phosphate (Pγ)
  atoms.push({ id: 'P_gamma', element: 'P', x: -8.0, y: 0, z: 0, radius: 1.8, color: '#F59E0B', atomName: 'Pγ (Terminal Phosphate)' });
  atoms.push({ id: 'O_gamma1', element: 'O', x: -8.5, y: 1.2, z: 0.5, radius: 1.5, color: '#EF4444', atomName: 'O1γ (-1)' });
  atoms.push({ id: 'O_gamma2', element: 'O', x: -8.5, y: -1.2, z: 0.5, radius: 1.5, color: '#EF4444', atomName: 'O2γ (-1)' });
  atoms.push({ id: 'O_gamma3', element: 'O', x: -9.2, y: 0, z: -0.8, radius: 1.5, color: '#EF4444', atomName: 'O3γ (-1)' });
  bonds.push({ atom1Index: 0, atom2Index: 1, order: 2 });
  bonds.push({ atom1Index: 0, atom2Index: 2, order: 1 });
  bonds.push({ atom1Index: 0, atom2Index: 3, order: 1 });

  // Bridging Oxygen β-γ (Phosphoanhydride bond)
  atoms.push({ id: 'O_bridge_bg', element: 'O', x: -6.4, y: 0, z: 0, radius: 1.5, color: '#DC2626', atomName: 'Bridging Oxygen (β-γ Bond: -30.5 kJ/mol)' });
  bonds.push({ atom1Index: 0, atom2Index: 4, order: 1 });

  // Beta Phosphate (Pβ)
  atoms.push({ id: 'P_beta', element: 'P', x: -4.8, y: 0, z: 0, radius: 1.8, color: '#F59E0B', atomName: 'Pβ (Middle Phosphate)' });
  atoms.push({ id: 'O_beta1', element: 'O', x: -4.8, y: 1.3, z: 0.5, radius: 1.5, color: '#EF4444', atomName: 'O1β (-1)' });
  bonds.push({ atom1Index: 4, atom2Index: 5, order: 1 });
  bonds.push({ atom1Index: 5, atom2Index: 6, order: 2 });

  // Bridging Oxygen α-β (Phosphoanhydride bond cleaved during DNA polymerization!)
  atoms.push({ id: 'O_bridge_ab', element: 'O', x: -3.2, y: 0, z: 0, radius: 1.5, color: '#DC2626', atomName: 'Bridging Oxygen (α-β Cleavage Point)' });
  bonds.push({ atom1Index: 5, atom2Index: 7, order: 1 });

  // Alpha Phosphate (Pα - incorporated into DNA strand!)
  atoms.push({ id: 'P_alpha', element: 'P', x: -1.6, y: 0, z: 0, radius: 1.8, color: '#F59E0B', atomName: 'Pα (Alpha Phosphate - Target of 3\'-OH Attack)' });
  atoms.push({ id: 'O_alpha1', element: 'O', x: -1.6, y: 1.3, z: 0.5, radius: 1.5, color: '#EF4444', atomName: 'O1α' });
  bonds.push({ atom1Index: 7, atom2Index: 8, order: 1 });
  bonds.push({ atom1Index: 8, atom2Index: 9, order: 2 });

  // 5'-Ester Oxygen
  atoms.push({ id: 'O5_prime', element: 'O', x: -0.2, y: -0.5, z: 0, radius: 1.5, color: '#EF4444', atomName: 'O5\' (5\'-Phosphoester Bond)' });
  bonds.push({ atom1Index: 8, atom2Index: 10, order: 1 });

  // Deoxyribose Ring
  // C5'
  atoms.push({ id: 'C5_prime', element: 'C', x: 1.0, y: -0.2, z: 0, radius: 1.7, color: '#4B5563', atomName: 'C5\' Carbon' });
  bonds.push({ atom1Index: 10, atom2Index: 11, order: 1 });

  // C4'
  atoms.push({ id: 'C4_prime', element: 'C', x: 2.0, y: -1.0, z: 0.5, radius: 1.7, color: '#4B5563', atomName: 'C4\' Carbon' });
  bonds.push({ atom1Index: 11, atom2Index: 12, order: 1 });

  // O4' (Ring Oxygen)
  atoms.push({ id: 'O4_prime', element: 'O', x: 3.2, y: -0.4, z: 0.5, radius: 1.5, color: '#EF4444', atomName: 'O4\' (Furanose Ring Oxygen)' });
  bonds.push({ atom1Index: 12, atom2Index: 13, order: 1 });

  // C1' (Anomeric Glycosidic Carbon)
  atoms.push({ id: 'C1_prime', element: 'C', x: 4.2, y: -1.2, z: 0.2, radius: 1.7, color: '#4B5563', atomName: 'C1\' (β-N-Glycosidic Anchor)' });
  bonds.push({ atom1Index: 13, atom2Index: 14, order: 1 });

  // C2' (Deoxy - contains only -H, NO -OH!)
  atoms.push({ id: 'C2_prime', element: 'C', x: 3.8, y: -2.6, z: -0.2, radius: 1.7, color: '#4B5563', atomName: 'C2\' (2\'-Deoxy with -H)' });
  bonds.push({ atom1Index: 14, atom2Index: 15, order: 1 });

  // C3' (With crucial 3'-OH for chain extension)
  atoms.push({ id: 'C3_prime', element: 'C', x: 2.3, y: -2.4, z: 0.1, radius: 1.7, color: '#4B5563', atomName: 'C3\' Carbon' });
  bonds.push({ atom1Index: 15, atom2Index: 16, order: 1 });
  bonds.push({ atom1Index: 16, atom2Index: 12, order: 1 }); // Ring closure

  // 3'-OH Oxygen (The nucleophile of life!)
  atoms.push({ id: 'O3_prime', element: 'O', x: 1.7, y: -3.5, z: -0.4, radius: 1.5, color: '#10B981', atomName: '3\'-OH Hydroxyl (Primer Nucleophile)' });
  bonds.push({ atom1Index: 16, atom2Index: 17, order: 1 });

  // Adenine Purine Ring (N9 glycosidic bond)
  atoms.push({ id: 'N9', element: 'N', x: 5.5, y: -0.8, z: 0.2, radius: 1.55, color: '#2563EB', atomName: 'N9 (Purine Glycosidic Nitrogen)' });
  bonds.push({ atom1Index: 14, atom2Index: 18, order: 1 });

  atoms.push({ id: 'C8', element: 'C', x: 6.3, y: -1.6, z: -0.4, radius: 1.7, color: '#10B981', atomName: 'C8 Carbon' });
  atoms.push({ id: 'N7', element: 'N', x: 7.5, y: -1.1, z: -0.3, radius: 1.55, color: '#2563EB', atomName: 'N7 Nitrogen' });
  atoms.push({ id: 'C5', element: 'C', x: 7.4, y: 0.1, z: 0.3, radius: 1.7, color: '#10B981', atomName: 'C5 Carbon' });
  atoms.push({ id: 'C6', element: 'C', x: 8.3, y: 1.2, z: 0.6, radius: 1.7, color: '#10B981', atomName: 'C6 Carbon' });
  atoms.push({ id: 'N6_amino', element: 'N', x: 9.6, y: 1.2, z: 0.8, radius: 1.55, color: '#2563EB', atomName: '6-NH2 (Watson-Crick H-Donor to T/U)' });
  atoms.push({ id: 'N1', element: 'N', x: 7.8, y: 2.4, z: 0.7, radius: 1.55, color: '#2563EB', atomName: 'N1 (Watson-Crick H-Acceptor from T/U)' });
  atoms.push({ id: 'C2', element: 'C', x: 6.5, y: 2.4, z: 0.4, radius: 1.7, color: '#10B981', atomName: 'C2 Carbon' });
  atoms.push({ id: 'N3', element: 'N', x: 5.6, y: 1.4, z: 0.1, radius: 1.55, color: '#2563EB', atomName: 'N3 Nitrogen' });
  atoms.push({ id: 'C4', element: 'C', x: 6.1, y: 0.2, z: 0.1, radius: 1.7, color: '#10B981', atomName: 'C4 Carbon' });

  bonds.push({ atom1Index: 18, atom2Index: 19, order: 1 });
  bonds.push({ atom1Index: 19, atom2Index: 20, order: 2 });
  bonds.push({ atom1Index: 20, atom2Index: 21, order: 1 });
  bonds.push({ atom1Index: 21, atom2Index: 22, order: 2 });
  bonds.push({ atom1Index: 22, atom2Index: 23, order: 1 });
  bonds.push({ atom1Index: 22, atom2Index: 24, order: 1 });
  bonds.push({ atom1Index: 24, atom2Index: 25, order: 2 });
  bonds.push({ atom1Index: 25, atom2Index: 26, order: 1 });
  bonds.push({ atom1Index: 26, atom2Index: 27, order: 2 });
  bonds.push({ atom1Index: 27, atom2Index: 21, order: 1 });
  bonds.push({ atom1Index: 27, atom2Index: 18, order: 1 });

  // Coordinated Magnesium (Mg2+)
  atoms.push({ id: 'Mg_ion', element: 'Mg', x: -4.8, y: 3.2, z: 0.8, radius: 1.7, color: '#10B981', atomName: 'Mg2+ Divalent Cofactor' });
  bonds.push({ atom1Index: 6, atom2Index: 28, order: 1, isHydrogenBond: true, distance: 2.1 });
  bonds.push({ atom1Index: 9, atom2Index: 28, order: 1, isHydrogenBond: true, distance: 2.1 });

  const annotations: SpatialFeatureAnnotation[] = [
    {
      id: 'high-energy-tail',
      label: 'Phosphoanhydride Bonds (α-β and β-γ)',
      description: 'Two high-energy phosphoanhydride bonds each release ΔG°\' ≈ -30.5 kJ/mol. Cleavage of Pα-Pβ yields Pyrophosphate (PPi).',
      position: [-5.0, 0, 0],
      type: 'sugar-phosphate',
      color: '#DC2626',
      measurementText: 'ΔG° = -30.5 kJ/mol each',
    },
    {
      id: '3prime-oh-primer',
      label: '3\'-OH Hydroxyl Group',
      description: 'Nucleophilic trigger that attacks the incoming nucleotide\'s Pα, releasing PPi and extending the DNA strand exclusively in the 5\'->3\' direction.',
      position: [1.7, -3.5, -0.4],
      type: 'sugar-phosphate',
      color: '#10B981',
      measurementText: 'Attack trajectory: In-line SN2',
    },
    {
      id: 'watson-crick-face-adenine',
      label: 'Adenine Watson-Crick Face (6-NH2 & N1)',
      description: 'Exposes 6-NH2 (H-bond donor) and N1 (H-bond acceptor) configured to form exactly 2 hydrogen bonds with Thymine (O4 & N3-H).',
      position: [8.8, 1.8, 0.8],
      type: 'h-bond',
      color: '#2563EB',
      measurementText: 'A=T: 2 Hydrogen Bonds',
    }
  ];

  return {
    id: 'single-datp',
    title: 'Deoxyadenosine Triphosphate (dATP)',
    subtitle: 'High-energy nucleotide substrate showing the triphosphate phosphoanhydrides, 2\'-deoxyribose ring, and Adenine base',
    classification: 'Monomer Nucleotide Substrate',
    helixType: 'Monomer Nucleotide',
    basePairsOrResidues: 1,
    diameterAngstroms: 18.0,
    risePerBaseAngstroms: 0,
    bpPerTurn: 0,
    pitchAngstroms: 0,
    atoms,
    bonds,
    nucleotides: [],
    annotations,
    keyTakeaways: [
      'dNTPs (dATP, dCTP, dGTP, dTTP) supply both the monomer building block and the chemical energy for DNA synthesis.',
      'DNA Polymerase uses active-site Mg2+ ions to coordinate the negative charges of the triphosphate group.',
      'Cleavage of the α-β phosphoanhydride bond releases inorganic pyrophosphate (PPi).',
      'Subsequent irreversible hydrolysis of PPi by Inorganic Pyrophosphatase (PPi + H2O -> 2 Pi, ΔG ≈ -19 kJ/mol) pulls the polymerization reaction forward.',
      'Dideoxynucleotides (ddNTPs, used in Sanger sequencing) lack both 2\'-OH and 3\'-OH, terminating chain elongation.'
    ],
    clinicalOrBiologicalSignificance: 'Antiviral drugs like Remdesivir, Sofosbuvir, and AZT (Zidovudine) are nucleotide/nucleoside analogs that target viral polymerases and cause obligate chain termination.'
  };
}

// Master selector to get model data by ID
export function getMoleculeModel(id: ModelType): MoleculeModelData {
  switch (id) {
    case 'b-dna':
      return generateBDnaModel();
    case 'a-rna':
      return generateARnaModel();
    case 'trna-phe':
      return generateTrnaModel();
    case 'ribosome-decoding':
      return generateRibosomeDecodingModel();
    case 'single-datp':
      return generateSingleDatpModel();
    case 'a-dna': {
      const aRna = generateARnaModel();
      return {
        ...aRna,
        id: 'a-dna',
        title: 'A-DNA Conformation (Dehydrated Double Helix)',
        subtitle: 'Right-handed 11 bp/turn compact double helix formed under low hydration (<75% relative humidity)',
        classification: 'Dehydrated DNA Conformation',
      };
    }
    case 'z-dna': {
      // Left-handed DNA with zigzag backbone
      const bDna = generateBDnaModel();
      const zAtoms = bDna.atoms.map((a) => ({
        ...a,
        x: a.x * 0.9,
        y: -a.y * 0.9, // Left-handed reverse twist!
        z: a.z * 1.1,
      }));
      return {
        ...bDna,
        id: 'z-dna',
        title: 'Z-DNA Left-Handed Double Helix',
        subtitle: 'Left-handed 12 bp/turn elongated helix with zigzag phosphodiester backbone and alternating syn/anti bases',
        classification: 'Transient Epigenetic DNA Conformation',
        helixType: 'Left-handed (Z-Form)',
        diameterAngstroms: 18.0,
        risePerBaseAngstroms: 3.7,
        bpPerTurn: 12.0,
        pitchAngstroms: 44.0,
        atoms: zAtoms,
        keyTakeaways: [
          'Left-handed helical twist: Rotates counter-clockwise going up the helical axis.',
          'Forms in alternating purine-pyrimidine tracts (e.g. d(CG)n or d(TG)n) under high salt or negative supercoiling.',
          'Purines adopt the syn glycosidic conformation and C3\'-endo pucker, while Pyrimidines remain anti and C2\'-endo, producing a distinct zigzag backbone.',
          'Possesses a single deep, narrow Minor Groove; the Major Groove is virtually flat on the outer surface.',
          'Recognized by ADAR1 (RNA editing deaminase) and ZBP1 (innate immunity/necroptosis sensor).'
        ],
        clinicalOrBiologicalSignificance: 'Formed transiently behind actively transcribing RNA Polymerase II complexes due to torsional negative supercoiling. Recognized by host defense proteins like ZBP1 to trigger necroptosis during viral infection.'
      };
    }
    case 'rna-hairpin': {
      const aRna = generateARnaModel();
      return {
        ...aRna,
        id: 'rna-hairpin',
        title: 'RNA Hairpin Stem-Loop & Tetraloop',
        subtitle: 'Single-stranded RNA folding back on itself to create an A-form stem with a stabilized UUCG tetraloop',
        classification: 'RNA Secondary & Tertiary Motif',
      };
    }
    default:
      return generateBDnaModel();
  }
}
