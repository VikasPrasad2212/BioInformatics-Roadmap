# Central Dogma & AI-Proof Biotech Career Readiness Masterclass

An interactive web application and computational biology learning suite combining interactive 3D WebGL molecular visualizations, central dogma simulators, and an **AI Bioinformatician Career Readiness & PopVax Interview Preparation Platform**.

---

## 🌟 Key Features

### 1. Interactive Central Dogma Simulations
* **Replication Simulator**: Real-time replication fork mechanics, leading & lagging strand synthesis, Okazaki fragments, DNA Polymerase III, and proofreading.
* **Transcription Studio**: Promoter recognition, RNA Polymerase transcription, pre-mRNA processing (5'-capping, splicing, polyadenylation).
* **Translation Lab**: Ribosome subunit assembly, tRNA anti-codon charging, peptide bond formation, and translation elongation.
* **Codon Decipherer & Mutation Sandbox**: Synonymous, missense, nonsense, and frameshift mutation analysis with instantaneous peptide translation.
* **Chemical Bonds Explorer**: Interactive 3D electrostatic, covalent, hydrogen bonding, and Van der Waals force inspector.
* **3D WebGL Molecular Viewer**: Interactive Three.js structural models for B-DNA double helix, tRNA, RNA Polymerase, and Ribosome.

### 2. AI-Proof Biotech Career Masterclass
* **The 5 Biotech Career Moats**:
  1. *Generative Design & Wet-Lab Loop Closing* (Closing the loop with robotic automation).
  2. *Thermodynamic & Kinetic Grounding* (Transition states, conformational ensembles).
  3. *Post-Translational & Glycosylation Engineering* (N-linked glycan shields, sequons).
  4. *Translational & In Vivo Delivery Physics* (LNP formulations, endosomal escape).
  5. *Regulatory, Quality by Design & CMC* (GMP compliance, FDA IND assays).
* **AI Hallucination & Failure Lab**: Detailed forensic case studies analyzing where AlphaFold3, ESMFold, and RFdiffusion fail in real-world clinical development.
* **Biotech Technical Interview Simulator**: Real-world interview questions with high-yield scoring keywords, model answers, and candidate pitfalls.

### 3. Dual-Track Computational Biology Roadmaps (Low to Cutting-Edge)
* **Track 1: General AI Bioinformatician**:
  * Stage 1: Classical Sequences & Bioconductor in R
  * Stage 2: Single-Cell RNA-seq & Multi-Omics
  * Stage 3: Protein Language Models (ESM-2/ESM-3) & PyTorch
  * Stage 4: Cloud Workflows (Nextflow/Docker) & Generative Structural AI (RFdiffusion/AlphaFold3)
* **Track 2: PopVax-Targeted mRNA & Protein AI Track** ([PopVax Job 39342](https://jobs.popvax.com/39342)):
  * Stage 1: Viral Antigen Sequence Mining, Shannon Entropy & Epitope Mapping
  * Stage 2: mRNA Construct Engineering, Codon Optimization & ViennaRNA MFE Thermostability
  * Stage 3: Generative Protein Design & Self-Assembling Nanoparticles (ESM-2 + ProteinMPNN)
  * Stage 4: High-Throughput Analytics (HPLC/LC-MS), LNP Formulation & PyLabRobot Automation

---

## 🚀 Quickstart & Local Development

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm** or **bun** / **yarn** / **pnpm**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/central-dogma-ai-biology.git

# 2. Navigate to project root
cd central-dogma-ai-biology

# 3. Install dependencies
npm install

# 4. Start local development server (binds to http://localhost:3000)
npm run dev
```

### Production Build

```bash
# Build optimized static bundle in dist/
npm run build

# Preview production build locally
npm run preview
```

---

## 🛠️ Tech Stack & Architecture

* **Frontend Framework**: React 19 + TypeScript
* **Build Tool**: Vite 6
* **3D Visualizations**: Three.js (@types/three)
* **Styling & UI**: Tailwind CSS v4 + Lucide React Icons + Motion (Framer Motion)
* **Data Processing & AI**: Modern computational biology data pipelines, BioPython & ViennaRNA reference implementations

---

## 📂 Project Structure

```
.
├── src/
│   ├── components/
│   │   ├── AiCareerReadinessView.tsx   # AI Career Moats, Roadmaps & Interview Simulator
│   │   ├── aiCareerData.ts             # Curriculums, Moats, Failure Cases & Interview Questions
│   │   ├── roadmapSolutionsData.ts     # Python, R, PyTorch & Nextflow code solutions & capstones
│   │   ├── MoleculeViewer3D.tsx        # Three.js 3D structural viewer
│   │   ├── ReplicationSimulator.tsx    # DNA replication animation & fork mechanics
│   │   ├── TranscriptionStudio.tsx     # RNA transcription & splicing engine
│   │   ├── TranslationLab.tsx          # Ribosome translation workbench
│   │   ├── CodonDecipherer.tsx         # Genetic code dictionary & mutation engine
│   │   ├── ChemicalBondsExplorer.tsx   # Molecular forces & thermodynamics
│   │   └── MolecularDictionary.tsx     # Comprehensive glossary
│   ├── App.tsx                         # Root app navigation & global state
│   ├── main.tsx                        # React application entry point
│   └── index.css                       # Global Tailwind styling
├── index.html                          # HTML shell
├── package.json                        # Node dependencies and scripts
├── tsconfig.json                       # TypeScript compiler configuration
└── vite.config.ts                      # Vite build configuration
```

---

## 📄 License
This project is open-source under the MIT License.
