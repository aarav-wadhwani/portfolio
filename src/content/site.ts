/**
 * Single source of truth for all site copy and assets.
 * Swap an image in src/assets/ (via assets-src/ + `npm run assets`) or edit a
 * string here — no component files need to change.
 */
import headshot from '../assets/headshot.webp'
import poseOverlay from '../assets/ubicomp-pose-overlay-1.webp'
import ubicompDevice from '../assets/ubicomp-device.webp'
import birdnetDevice from '../assets/birdnet-device.webp'
import birdnetWebapp from '../assets/birdnet-webapp.webp'
import questraUi from '../assets/questra-ui.webp'
import llmCoefficients from '../assets/llm-style-coefficients.webp'
import llmRankingComparison from '../assets/llm-ranking-comparison.webp'
import llmPerCategory from '../assets/llm-per-category-ranks.webp'

export const hero = {
  refTag: 'U0 / SIGNAL SOURCE',
  name: 'Aarav Wadhwani',
  role: 'ECE + DATA SCIENCE · UNIVERSITY OF WASHINGTON',
  tagline:
    'I turn raw signals — sensor streams, market data, unstructured documents — into working systems.',
  scrollCue: 'BEGIN TRACE',
}

export const legend = {
  refTag: 'LEGEND / SPECIFICATION',
  docTag: 'DOC AW-2027 · REV A · SHEET 1/1',
  headshot: {
    src: headshot,
    alt: 'Aarav Wadhwani, outdoors with evergreen trees and a waterfall behind him',
    caption: 'FIG. 1 — A. WADHWANI',
  },
  rows: [
    {
      key: 'EDUCATION',
      body: 'Aarav Wadhwani — B.S. Electrical & Computer Engineering, minor in Data Science, University of Washington. Expected June 2027 · GPA 3.85 · Dean’s List.',
    },
    {
      key: 'APPROACH',
      body: 'The ECE + data science combination sets the method: take a raw signal, find its structure, turn it into a decision — whether the signal is a sensor stream, a futures curve, or a pile of unstructured documents.',
    },
    {
      key: 'CURRENT',
      body: 'AI Integration & Automation Intern (incoming) at Indago Capital, Research Assistant at the UbiComp Lab, and TA for EE 201 — Computer Hardware Skills — at UW.',
    },
  ],
}

export interface BoardBlock {
  role: 'INPUT' | 'PROCESS' | 'OUTPUT'
  ref: string
  body: string
  /** One extra sentence, revealed on hover/focus (desktop only). */
  tooltip: string
}

export interface BoardFigure {
  src: string
  alt: string
  caption: string
}

export interface Board {
  id: string
  org: string
  title: string
  /** Small mono annotation under the title (framing notes, e.g. proprietary figures). */
  note?: string
  blocks: [BoardBlock, BoardBlock, BoardBlock]
  /** Mono annotations on the two connector traces (input→process, process→output). */
  connectors: [string, string]
  impact: string
  link?: { href: string; label: string }
  /** In-block processing visual: quant/ML curves for the Macquarie boards. */
  visual?: 'convergence' | 'forecast'
  figures?: BoardFigure[]
  /** Board 3's pose overlays are the clearest "signal → structure" image on the site. */
  figureEmphasis?: boolean
}

export const boards: Board[] = [
  {
    id: 'U1',
    org: 'MACQUARIE GROUP — COMMODITIES & GLOBAL MARKETS',
    title: 'Copper Scorecard',
    note: 'METHODOLOGY & IMPACT ONLY — PERFORMANCE FIGURES STAY ON THE DESK, BY DESIGN',
    blocks: [
      {
        role: 'INPUT',
        ref: 'J1',
        body: 'Daily LME 3-month copper futures data plus eight signal families — momentum/technicals, term structure, positioning, exchange open interest, macro/FX/rates, cross-asset, microstructure, and volatility — sourced from Bloomberg and pre-aligned upstream.',
        tooltip:
          'Bloomberg-sourced series arrive pre-aligned upstream, so the scorecard consumes a clean daily feature matrix.',
      },
      {
        role: 'PROCESS',
        ref: 'U1A',
        body: 'Per-bucket models (XGBoost, Random Forest, Logistic baseline) trained independently per signal family, validated with rolling-window time-series cross-validation and VIF-based collinearity pruning. Bucket outputs combined through a dynamic weighting scheme that re-ranks each signal family biweekly based on recent predictive accuracy and realized performance, replacing what had been a fixed, hand-tuned rule set.',
        tooltip:
          'Rolling-window cross-validation keeps validation honest: every fold trains strictly on the past and scores on unseen future days.',
      },
      {
        role: 'OUTPUT',
        ref: 'P1',
        body: 'A daily 0–100 conviction score for the London metals desk, with full bucket-level transparency — which signal families are driving the call, and why — rather than a black-box number. Delivered automatically each morning ahead of market open via an automated Dataiku pipeline.',
        tooltip:
          'The score lands before London market open every morning, with no manual steps left in the loop.',
      },
    ],
    connectors: ['8 SIGNAL FAMILIES', 'SCORE 0–100'],
    impact:
      'Adopted with strong engagement from the trading desk; drew cross-desk interest from other commodity teams evaluating similar approaches.',
    visual: 'convergence',
  },
  {
    id: 'U2',
    org: 'MACQUARIE GROUP — COMMODITIES & GLOBAL MARKETS',
    title: 'Livestock Exports Forecasting',
    note: 'METHODOLOGY & IMPACT ONLY — MATCHING BOARD U1’S FRAMING',
    blocks: [
      {
        role: 'INPUT',
        ref: 'J2',
        body: 'Weekly USDA export shipment data (cattle and pork, by country) used as a real-time proxy, reconciled against official U.S. Customs monthly totals — the ground truth, which arrives with a two-month reporting lag.',
        tooltip:
          'Weekly USDA shipments act as the fast, noisy proxy; monthly customs totals are the slow ground truth the model reconciles against.',
      },
      {
        role: 'PROCESS',
        ref: 'U2A',
        body: 'A SARIMAX model per country, using customs data as the endogenous series and aggregated USDA weekly data as an exogenous leading indicator — chosen for its ability to capture seasonal export cycles while incorporating a real-time signal. Parameters tuned via grid search and validated with expanding-window backtesting to simulate genuine real-time forecasting conditions.',
        tooltip:
          'Expanding-window backtesting only ever scores the model on data it could genuinely have seen at forecast time.',
      },
      {
        role: 'OUTPUT',
        ref: 'P2',
        body: 'Monthly country-level and aggregate export forecasts, “nowcasting” trade volumes roughly two months ahead of official government data, delivered to the Agriculture Trading Desk as a recurring scorecard ahead of position discussions.',
        tooltip:
          'The scorecard recurs on a cadence timed to land ahead of the desk’s position discussions.',
      },
    ],
    connectors: ['WEEKLY PROXY', 'T−2 MO NOWCAST'],
    impact:
      'Gave traders early visibility into export-driven supply shifts, directly informing forward curve expectations, basis spread analysis, and position sizing ahead of official data releases.',
    visual: 'forecast',
  },
  {
    id: 'U3',
    org: 'UBICOMP LAB — PAUL G. ALLEN SCHOOL, UW',
    title: 'Fingertip IMU Hand Posture Reconstruction',
    blocks: [
      {
        role: 'INPUT',
        ref: 'J3',
        body: 'Four nail-mounted IMU sensors (12 raw channels: 4 sensors × 3 axes), tracking hand motion during natural finger movements, aligned against MediaPipe video-based ground truth via a start/end pinch synchronization protocol.',
        tooltip:
          'A start/end pinch gesture bookends each session, giving a clean synchronization anchor between IMU streams and video.',
      },
      {
        role: 'PROCESS',
        ref: 'U3A',
        body: 'A progression of models (MLP, Residual MLP, Temporal CNN, tree-based baselines) mapping 12 sensor inputs to 63 landmark coordinates (21 joints × 3D), trained on a 2,377-sample aligned pose dataset. Two refinements drove the biggest gains: 8x physics-consistent data augmentation, and a structure-aware loss enforcing constant bone length and correct joint-to-joint direction — not just coordinate-wise accuracy.',
        tooltip:
          'The structure-aware loss penalizes broken bone lengths and wrong joint directions, not just coordinate error.',
      },
      {
        role: 'OUTPUT',
        ref: 'P3',
        body: 'Full 3D hand posture reconstructed from four fingertip sensors alone, reaching 1.74cm average joint error — accurate enough that predicted and ground-truth hand skeletons visually overlap almost exactly.',
        tooltip:
          'The pose-overlay plot below is actual model output: blue is predicted, red is ground truth.',
      },
    ],
    connectors: ['12 CH RAW', '63 COORDS / 21 JOINTS'],
    impact:
      'Beyond the modeling result, the project reached a genuine research insight: after structure-aware training and deeper architectures, further gains plateaued — pointing to data quality, not model complexity, as the real bottleneck. That diagnosis led directly to a follow-up dual-camera stereo capture protocol design (calibrated triangulation, per-joint dynamic camera weighting, reprojection-error quality gates) for the next phase.',
    figures: [
      {
        src: poseOverlay,
        alt: '3D plot of a predicted hand skeleton in blue overlapping the ground-truth skeleton in red',
        caption: 'FIG U3.1 — PREDICTED SKELETON (BLUE) VS GROUND TRUTH (RED), 1.74CM AVG JOINT ERROR',
      },
      {
        src: ubicompDevice,
        alt: 'Hand resting on a table with small flexible circuit sensors mounted on two fingernails',
        caption: 'FIG U3.2 — NAIL-MOUNTED IMU SENSORS, AS WORN',
      },
    ],
    figureEmphasis: true,
  },
  {
    id: 'U4',
    org: 'INDEPENDENT PROJECT — EDGE ML',
    title: 'PocketBirdNET',
    blocks: [
      {
        role: 'INPUT',
        ref: 'J4',
        body: 'Raw audio captured on-device.',
        tooltip:
          'Audio is captured and classified entirely on the microcontroller — nothing leaves the device for inference.',
      },
      {
        role: 'PROCESS',
        ref: 'U4A',
        body: 'Knowledge distillation compresses the ~50MB BirdNET teacher model down to a 60KB INT8-quantized student model — roughly an 800x size reduction, small enough to deploy directly on an Arduino Nano 33 BLE Sense.',
        tooltip:
          'Distillation trains the tiny student to match the teacher’s output distribution rather than learning from labels alone.',
      },
      {
        role: 'OUTPUT',
        ref: 'P4',
        body: 'Live bird species classification displayed on an onboard SSD1306 screen, with results also streamed to a Web Bluetooth dashboard.',
        tooltip:
          'The Web Bluetooth dashboard needs no app install — a compatible browser connects straight to the board.',
      },
    ],
    connectors: ['AUDIO IN', '60KB INT8'],
    impact:
      'A full edge-ML pipeline — from a large teacher model down to a microcontroller-sized deployment — running real-time inference entirely on embedded hardware.',
    link: { href: 'https://pocketbirdnet.vercel.app/', label: 'LIVE DASHBOARD' },
    figures: [
      {
        src: birdnetDevice,
        alt: 'Breadboard circuit with a small LCD screen reading American Robin, score 99%',
        caption: 'FIG U4.1 — ON-DEVICE CLASSIFICATION, ONBOARD READOUT',
      },
      {
        src: birdnetWebapp,
        alt: 'PocketBirdNET web dashboard showing a detected American Robin at 78% confidence',
        caption: 'FIG U4.2 — WEB BLUETOOTH DASHBOARD, LIVE STREAM',
      },
    ],
  },
  {
    id: 'U5',
    org: 'CO-FOUNDED STARTUP — QUESTRA-AI.COM',
    title: 'Questra AI',
    note: 'SOURCES REAL PAST EXAM QUESTIONS — GENERATES NOTHING',
    blocks: [
      {
        role: 'INPUT',
        ref: 'J5',
        body: 'A large, multi-format archive of authentic past exam papers and course materials from UW, spanning many courses — where the same course can be taught by different professors, each with their own distinct question style, emphasis, and exam format.',
        tooltip:
          'The same UW course can look completely different across professors — the archive preserves each professor’s style rather than flattening it.',
      },
      {
        role: 'PROCESS',
        ref: 'U5A',
        body: 'A full-stack system (FastAPI + React + Supabase, AWS-backed) parses and organizes the archive. A GPT-based classifier trained on 5,000+ image-based questions (achieving over 92% accuracy) tags each archived question by course, professor, and topic — turning an unstructured pile of past papers into a searchable, filterable bank without generating any new questions.',
        tooltip:
          'The classifier only tags and organizes archived questions — it never generates new ones.',
      },
      {
        role: 'OUTPUT',
        ref: 'P5',
        body: 'A student picks their exact course, professor, and the specific topics they’re weak on, and Questra returns a custom question bank pulled entirely from real, previously-used exam questions matching that professor’s actual style — targeted practice sourced authentically from the archive, not invented.',
        tooltip:
          'Filters compose: exact course, specific professor, and the topics a student is weak on — answered in under two seconds.',
      },
    ],
    connectors: ['RAW ARCHIVE', 'FILTERED BANK'],
    impact:
      'Co-founded with Hemil Patel; scaled to 2,500+ active UW users with sub-2-second response times — shipped and actively used, not just a prototype.',
    link: { href: 'https://questra-ai.com/', label: 'QUESTRA-AI.COM' },
    figures: [
      {
        src: questraUi,
        alt: 'Questra practice interface with course, topic, and professor filters in a sidebar',
        caption: 'FIG U5.1 — PRACTICE INTERFACE: COURSE / TOPIC / PROFESSOR FILTERS',
      },
    ],
  },
  {
    id: 'U6',
    org: 'INDEPENDENT RESEARCH — LLM EVALUATION',
    title: 'Style-Aware LLM Ranking',
    blocks: [
      {
        role: 'INPUT',
        ref: 'J6',
        body: 'A large-scale human preference dataset of pairwise LLM battles — 65K+ human-labeled win/loss/tie outcomes across 20+ models, with full transcripts and metadata (token counts, formatting stats, language, turn counts).',
        tooltip:
          'The metadata — token counts, formatting stats, language, turn counts — is exactly the stylistic surface the analysis isolates.',
      },
      {
        role: 'PROCESS',
        ref: 'U6A',
        body: 'A baseline Bradley–Terry logistic regression model establishes a standard leaderboard from raw pairwise preferences. Analysis reveals response length has a stronger effect on rank than most model-identity coefficients — meaning verbosity alone was inflating scores. The model is extended to jointly learn intrinsic model strength and independent stylistic effects (length, list usage, headers, bold formatting), with bootstrapped confidence intervals quantifying ranking stability.',
        tooltip:
          'Jointly learning strength and style means verbosity can no longer masquerade as capability in the fit.',
      },
      {
        role: 'OUTPUT',
        ref: 'P6',
        body: 'A style-controlled leaderboard where some models drop after length is controlled for (revealing style inflation) and others rise (revealing understated intrinsic strength) — effects invisible in standard leaderboards — plus per-category breakdowns showing model strengths vary by task type.',
        tooltip:
          'Some models drop once length is controlled for; others rise — movements a standard leaderboard cannot show.',
      },
    ],
    connectors: ['65K+ BATTLES', 'STYLE-CONTROLLED RANKS'],
    impact:
      'Demonstrates that presentation can masquerade as capability in the leaderboards influencing LLM deployment and research direction — and provides a reproducible method to correct for it.',
    link: {
      href: 'https://github.com/aarav-wadhwani/style-aware-llm-ranking',
      label: 'GITHUB / SOURCE',
    },
    figures: [
      {
        src: llmCoefficients,
        alt: 'Plot of style feature coefficients with confidence intervals; response length is dominant',
        caption: 'FIG U6.1 — STYLE FEATURE COEFFICIENTS: LENGTH DOMINATES',
      },
      {
        src: llmRankingComparison,
        alt: 'Heatmap comparing model ranks with and without style control; several models shift rank',
        caption: 'FIG U6.2 — RANKING COMPARISON, WITH VS WITHOUT STYLE CONTROL',
      },
      {
        src: llmPerCategory,
        alt: 'Heatmap of overall and per-category model ranks across code, creativity, math and more',
        caption: 'FIG U6.3 — PER-CATEGORY RANKS ACROSS TASK TYPES',
      },
    ],
  },

  /* ──────────────────────────────────────────────────────────────────────
   * TEMPLATE — duplicate this block to add a new component board.
   * Copy it above this comment, give it the next id (U7, U8, …), and it
   * will render with the same shell, connectors, and reveal treatment.
   *
   * {
   *   id: 'U7',
   *   org: 'ORG / CONTEXT — MONO, UPPERCASE',
   *   title: 'Project Title',
   *   note: 'OPTIONAL SMALL FRAMING NOTE',        // omit if not needed
   *   blocks: [
   *     { role: 'INPUT',   ref: 'J7',  body: 'What goes in.',        tooltip: 'One extra sentence on hover.' },
   *     { role: 'PROCESS', ref: 'U7A', body: 'What happens to it.',  tooltip: 'One extra sentence on hover.' },
   *     { role: 'OUTPUT',  ref: 'P7',  body: 'What comes out.',      tooltip: 'One extra sentence on hover.' },
   *   ],
   *   connectors: ['IN ANNOTATION', 'OUT ANNOTATION'],
   *   impact: 'Why it mattered.',
   *   link: { href: 'https://…', label: 'LINK LABEL' },              // optional
   *   visual: 'convergence' | 'forecast',                            // optional in-block curve
   *   figures: [{ src: imported, alt: '…', caption: 'FIG U7.1 — …' }], // optional images
   *   figureEmphasis: true,                                          // optional: render figures larger
   * },
   * ────────────────────────────────────────────────────────────────────── */
]

export interface Role {
  id: string
  role: string
  org: string
  dates: string
  location?: string
  incoming?: boolean
  body: string
}

export const experience: Role[] = [
  {
    id: 'V1',
    role: 'AI Integration & Automation Intern',
    org: 'Indago Capital',
    dates: 'JUL 2026 – SEP 2026',
    location: 'NEW YORK, NY',
    incoming: true,
    body: 'Building AI-powered workflow tools for a small asset-based finance firm: a RAG-based internal knowledge base, a deal memo drafting assistant, LP reporting automation, and a deal screening agent.',
  },
  {
    id: 'V2',
    role: 'Quantitative Research Intern',
    org: 'Macquarie Group, Commodities & Global Markets',
    dates: 'JUL 2025 – SEP 2025',
    body: 'Built forecasting models for commodity markets (see boards U1–U2 above); unified multi-format datasets across carbon, agriculture, and metals into 6+ Dataiku pipelines; collaborated with global trading desks in London, Singapore, and Hong Kong.',
  },
  {
    id: 'V3',
    role: 'Research Assistant',
    org: 'Ubiquitous Computing Lab, Paul G. Allen School, UW',
    dates: 'JAN 2026 – PRESENT',
    body: 'Reconstructing full 3D hand posture from nail-mounted IMU sensors (see board U3 above).',
  },
  {
    id: 'V4',
    role: 'Software Engineering Intern',
    org: 'ValueFirst',
    dates: 'JUL 2024 – SEP 2024',
    body: 'Built a FastAPI-based analytics dashboard monitoring LLM chatbot quality across 6 enterprise deployments, analyzing 100K+ weekly conversations to identify drift and failure modes; improved chatbot response quality by 15% and stabilized latency by 20%.',
  },
  {
    id: 'V5',
    role: 'Teaching Assistant',
    org: 'Dept. of Electrical & Computer Engineering, UW',
    dates: 'DEC 2025 – PRESENT',
    body: 'Guiding 50+ students through embedded programming and circuit debugging across microcontrollers, sensors, power systems, and custom PCBs.',
  },
]

export const skills = [
  {
    ref: 'L1',
    category: 'LANGUAGES',
    groups: [
      { level: 'PROFICIENT', items: 'Python, SQL' },
      { level: 'MODERATE', items: 'Java, JavaScript, R' },
      { level: 'FAMILIAR', items: 'C++, SystemVerilog' },
    ],
  },
  {
    ref: 'M1',
    category: 'MODELING',
    groups: [
      {
        level: '',
        items:
          'Classification, regression, time series forecasting, feature engineering, dimensionality reduction (PCA)',
      },
    ],
  },
  {
    ref: 'T1',
    category: 'DATA & TOOLS',
    groups: [
      {
        level: '',
        items:
          'FastAPI, scikit-learn, XGBoost, PyTorch, TensorFlow, Git, Docker, PostgreSQL, AWS, Dataiku',
      },
    ],
  },
]

export const contact = {
  refTag: 'X1 · OUTPUT TERMINAL',
  heading: 'Signal resolved.',
  body: 'The trace ends here. Get in touch — or take the datasheet with you.',
  ports: [
    { id: 'P1', label: 'RESUME.PDF', href: '/resume/Aarav_Wadhwani_Resume.pdf', download: true },
    { id: 'P2', label: 'EMAIL', href: 'mailto:aaravw28@uw.edu', detail: 'aaravw28@uw.edu' },
    { id: 'P3', label: 'LINKEDIN', href: 'https://www.linkedin.com/in/aarav-wadhwani/', external: true },
    { id: 'P4', label: 'GITHUB', href: 'https://github.com/aarav-wadhwani', external: true },
  ],
}
