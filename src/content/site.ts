/**
 * Single source of truth for all site copy and assets.
 * Swap an image in src/assets/ (via assets-src/ + `npm run assets`) or edit a
 * string here; no component files need to change.
 *
 * House style: no em dashes anywhere in copy. Use commas, colons, periods,
 * or parentheses instead. En dashes in ranges (0–100, 4.8–4.9) are fine.
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
    'I turn raw signals, sensor streams, market data, unstructured documents, into working systems.',
  scrollCue: 'BEGIN TRACE',
}

export const legend = {
  refTag: 'LEGEND / SPECIFICATION',
  docTag: 'DOC AW-2027 · REV B · SHEET 1/1',
  headshot: {
    src: headshot,
    alt: 'Aarav Wadhwani, outdoors with evergreen trees and a waterfall behind him',
    caption: 'FIG. 1 · A. WADHWANI',
  },
  rows: [
    {
      key: 'EDUCATION',
      body: 'Aarav Wadhwani: B.S. Electrical & Computer Engineering, minor in Data Science, University of Washington. Expected June 2027 · GPA 3.85 · Dean’s List.',
    },
    {
      key: 'APPROACH',
      body: 'The ECE + data science combination sets the method: take a raw signal, find its structure, turn it into a decision, whether the signal is a sensor stream, a futures curve, or a pile of unstructured documents.',
    },
    {
      key: 'CURRENT',
      body: 'AI Integration & Automation Intern (incoming) at Indago Capital, Research Assistant at the UbiComp Lab, and TA for EE 201 (Computer Hardware Skills) at UW.',
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
  /** Intrinsic pixel size of the optimized asset; reserves layout space so
   *  lazy-loading never shifts the page under an in-flight anchor scroll. */
  width: number
  height: number
}

export interface Board {
  id: string
  org: string
  title: string
  /** 'teaching' renders the lab-notebook checkoff sheet instead of the pipeline diagram. */
  kind?: 'standard' | 'teaching'
  /** Small mono annotation under the title (framing notes, e.g. proprietary figures). */
  note?: string
  blocks?: [BoardBlock, BoardBlock, BoardBlock]
  /** Mono annotations on the two connector traces (input→process, process→output). */
  connectors?: [string, string]
  impact?: string
  link?: { href: string; label: string }
  /** In-block processing visual: quant/ML curves, or the drift monitor for ValueFirst. */
  visual?: 'convergence' | 'forecast' | 'monitor'
  figures?: BoardFigure[]
  /** Board 3's pose overlays are the clearest "signal → structure" image on the site. */
  figureEmphasis?: boolean
}

export const boards: Board[] = [
  {
    id: 'U1',
    org: 'MACQUARIE GROUP · COMMODITIES & GLOBAL MARKETS',
    title: 'Copper Scorecard',
    note: 'METHODOLOGY & IMPACT ONLY. PERFORMANCE FIGURES STAY ON THE DESK, BY DESIGN',
    blocks: [
      {
        role: 'INPUT',
        ref: 'J1',
        body: 'Daily LME 3-month copper futures data plus eight signal families (momentum/technicals, term structure, positioning, exchange open interest, macro/FX/rates, cross-asset, microstructure, and volatility), sourced from Bloomberg and pre-aligned upstream.',
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
        body: 'A daily 0–100 conviction score for the London metals desk, with full bucket-level transparency (which signal families are driving the call, and why) rather than a black-box number. Delivered automatically each morning ahead of market open via an automated Dataiku pipeline.',
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
    org: 'MACQUARIE GROUP · COMMODITIES & GLOBAL MARKETS',
    title: 'Livestock Exports Forecasting',
    note: 'METHODOLOGY & IMPACT ONLY, MATCHING BOARD U1’S FRAMING',
    blocks: [
      {
        role: 'INPUT',
        ref: 'J2',
        body: 'Weekly USDA export shipment data (cattle and pork, by country) used as a real-time proxy, reconciled against official U.S. Customs monthly totals: the ground truth, which arrives with a two-month reporting lag.',
        tooltip:
          'Weekly USDA shipments act as the fast, noisy proxy; monthly customs totals are the slow ground truth the model reconciles against.',
      },
      {
        role: 'PROCESS',
        ref: 'U2A',
        body: 'A SARIMAX model per country, using customs data as the endogenous series and aggregated USDA weekly data as an exogenous leading indicator, chosen for its ability to capture seasonal export cycles while incorporating a real-time signal. Parameters tuned via grid search and validated with expanding-window backtesting to simulate genuine real-time forecasting conditions.',
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
    org: 'UBICOMP LAB · PAUL G. ALLEN SCHOOL, UW',
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
        body: 'A progression of models (MLP, Residual MLP, Temporal CNN, tree-based baselines) mapping 12 sensor inputs to 63 landmark coordinates (21 joints × 3D), trained on a 2,377-sample aligned pose dataset. Two refinements drove the biggest gains: 8x physics-consistent data augmentation, and a structure-aware loss enforcing constant bone length and correct joint-to-joint direction, not just coordinate-wise accuracy.',
        tooltip:
          'The structure-aware loss penalizes broken bone lengths and wrong joint directions, not just coordinate error.',
      },
      {
        role: 'OUTPUT',
        ref: 'P3',
        body: 'Full 3D hand posture reconstructed from four fingertip sensors alone, reaching 1.74cm average joint error, accurate enough that predicted and ground-truth hand skeletons visually overlap almost exactly.',
        tooltip:
          'The pose-overlay plot below is actual model output: blue is predicted, red is ground truth.',
      },
    ],
    connectors: ['12 CH RAW', '63 COORDS / 21 JOINTS'],
    impact:
      'Beyond the modeling result, the project reached a genuine research insight: after structure-aware training and deeper architectures, further gains plateaued, pointing to data quality, not model complexity, as the real bottleneck. That diagnosis led directly to a follow-up dual-camera stereo capture protocol design (calibrated triangulation, per-joint dynamic camera weighting, reprojection-error quality gates) for the next phase.',
    figures: [
      {
        src: poseOverlay,
        width: 1100,
        height: 979,
        alt: '3D plot of a predicted hand skeleton in blue overlapping the ground-truth skeleton in red',
        caption: 'FIG U3.1 · PREDICTED SKELETON (BLUE) VS GROUND TRUTH (RED), 1.74CM AVG JOINT ERROR',
      },
      {
        src: ubicompDevice,
        width: 900,
        height: 1200,
        alt: 'Hand resting on a table with small flexible circuit sensors mounted on two fingernails',
        caption: 'FIG U3.2 · NAIL-MOUNTED IMU SENSORS, AS WORN',
      },
    ],
    figureEmphasis: true,
  },
  {
    id: 'U4',
    org: 'VALUEFIRST · SOFTWARE ENGINEERING INTERNSHIP',
    title: 'LLM Chatbot Quality Monitoring',
    blocks: [
      {
        role: 'INPUT',
        ref: 'J4',
        body: 'A high-volume, unlabeled stream of real user activity: 100K+ weekly conversations across 6 enterprise chatbot deployments, with no existing system to catch quality drift or failure modes as they happened.',
        tooltip:
          'Six enterprise deployments, each with its own clients and failure modes, and none of it labeled.',
      },
      {
        role: 'PROCESS',
        ref: 'U4A',
        body: 'Built a FastAPI-based analytics dashboard to monitor conversation quality across all deployments, then used it to run controlled, iterative improvements: prompt versioning and A/B-tested deployments rather than one-off fixes, so changes could be validated before they reached all users.',
        tooltip:
          'Prompt changes shipped as versioned, A/B-tested deployments, so every fix was validated before all users saw it.',
      },
      {
        role: 'OUTPUT',
        ref: 'P4',
        body: 'A working monitoring and iteration system that surfaced drift and client-specific regressions early, and measurably improved the product: chatbot response quality up 15%, latency stabilized by 20%.',
        tooltip:
          'Drift and client-specific regressions surfaced while they were still small, not after users noticed.',
      },
    ],
    connectors: ['100K+ CONVS / WK', 'QUALITY +15%'],
    impact:
      'Turned a black-box, high-volume system into something observable and improvable, the same instinct that shows up in the trading-desk work: don’t ship a model or a system you can’t explain the behavior of.',
    visual: 'monitor',
  },
  {
    id: 'U5',
    org: 'DEPT. OF ELECTRICAL & COMPUTER ENGINEERING, UW',
    title: 'Teaching Assistant, EE 201',
    kind: 'teaching',
  },
  {
    id: 'U6',
    org: 'INDEPENDENT PROJECT · EDGE ML',
    title: 'PocketBirdNET',
    blocks: [
      {
        role: 'INPUT',
        ref: 'J6',
        body: 'Raw audio captured on-device.',
        tooltip:
          'Audio is captured and classified entirely on the microcontroller; nothing leaves the device for inference.',
      },
      {
        role: 'PROCESS',
        ref: 'U6A',
        body: 'Knowledge distillation compresses the ~50MB BirdNET teacher model down to a 60KB INT8-quantized student model, roughly an 800x size reduction, small enough to deploy directly on an Arduino Nano 33 BLE Sense.',
        tooltip:
          'Distillation trains the tiny student to match the teacher’s output distribution rather than learning from labels alone.',
      },
      {
        role: 'OUTPUT',
        ref: 'P6',
        body: 'Live bird species classification displayed on an onboard SSD1306 screen, with results also streamed to a Web Bluetooth dashboard.',
        tooltip:
          'The Web Bluetooth dashboard needs no app install; a compatible browser connects straight to the board.',
      },
    ],
    connectors: ['AUDIO IN', '60KB INT8'],
    impact:
      'A full edge-ML pipeline, from a large teacher model down to a microcontroller-sized deployment, running real-time inference entirely on embedded hardware.',
    link: { href: 'https://pocketbirdnet.vercel.app/', label: 'LIVE DASHBOARD' },
    figures: [
      {
        src: birdnetDevice,
        width: 1048,
        height: 640,
        alt: 'Breadboard circuit with a small LCD screen reading American Robin, score 99%',
        caption: 'FIG U6.1 · ON-DEVICE CLASSIFICATION, ONBOARD READOUT',
      },
      {
        src: birdnetWebapp,
        width: 1000,
        height: 688,
        alt: 'PocketBirdNET web dashboard showing a detected American Robin at 78% confidence',
        caption: 'FIG U6.2 · WEB BLUETOOTH DASHBOARD, LIVE STREAM',
      },
    ],
  },
  {
    id: 'U7',
    org: 'CO-FOUNDED STARTUP · QUESTRA-AI.COM',
    title: 'Questra AI',
    note: 'SOURCES REAL PAST EXAM QUESTIONS. GENERATES NOTHING',
    blocks: [
      {
        role: 'INPUT',
        ref: 'J7',
        body: 'A large, multi-format archive of authentic past exam papers and course materials from UW, spanning many courses, where the same course can be taught by different professors, each with their own distinct question style, emphasis, and exam format.',
        tooltip:
          'The same UW course can look completely different across professors; the archive preserves each professor’s style rather than flattening it.',
      },
      {
        role: 'PROCESS',
        ref: 'U7A',
        body: 'A full-stack system (FastAPI + React + Supabase, AWS-backed) parses and organizes the archive. A GPT-based classifier trained on 5,000+ image-based questions (achieving over 92% accuracy) tags each archived question by course, professor, and topic, turning an unstructured pile of past papers into a searchable, filterable bank without generating any new questions.',
        tooltip:
          'The classifier only tags and organizes archived questions; it never generates new ones.',
      },
      {
        role: 'OUTPUT',
        ref: 'P7',
        body: 'A student picks their exact course, professor, and the specific topics they’re weak on, and Questra returns a custom question bank pulled entirely from real, previously-used exam questions matching that professor’s actual style: targeted practice sourced authentically from the archive, not invented.',
        tooltip:
          'Filters compose: exact course, specific professor, and the topics a student is weak on, answered in under two seconds.',
      },
    ],
    connectors: ['RAW ARCHIVE', 'FILTERED BANK'],
    impact:
      'Co-founded with Hemil Patel; scaled to 2,500+ active UW users with sub-2-second response times. Shipped and actively used, not just a prototype.',
    link: { href: 'https://questra-ai.com/', label: 'QUESTRA-AI.COM' },
    figures: [
      {
        src: questraUi,
        width: 1400,
        height: 781,
        alt: 'Questra practice interface with course, topic, and professor filters in a sidebar',
        caption: 'FIG U7.1 · PRACTICE INTERFACE: COURSE / TOPIC / PROFESSOR FILTERS',
      },
    ],
  },
  {
    id: 'U8',
    org: 'INDEPENDENT RESEARCH · LLM EVALUATION',
    title: 'Style-Aware LLM Ranking',
    blocks: [
      {
        role: 'INPUT',
        ref: 'J8',
        body: 'A large-scale human preference dataset of pairwise LLM battles: 65K+ human-labeled win/loss/tie outcomes across 20+ models, with full transcripts and metadata (token counts, formatting stats, language, turn counts).',
        tooltip:
          'The metadata (token counts, formatting stats, language, turn counts) is exactly the stylistic surface the analysis isolates.',
      },
      {
        role: 'PROCESS',
        ref: 'U8A',
        body: 'A baseline Bradley–Terry logistic regression model establishes a standard leaderboard from raw pairwise preferences. Analysis reveals response length has a stronger effect on rank than most model-identity coefficients, meaning verbosity alone was inflating scores. The model is extended to jointly learn intrinsic model strength and independent stylistic effects (length, list usage, headers, bold formatting), with bootstrapped confidence intervals quantifying ranking stability.',
        tooltip:
          'Jointly learning strength and style means verbosity can no longer masquerade as capability in the fit.',
      },
      {
        role: 'OUTPUT',
        ref: 'P8',
        body: 'A style-controlled leaderboard where some models drop after length is controlled for (revealing style inflation) and others rise (revealing understated intrinsic strength), effects invisible in standard leaderboards, plus per-category breakdowns showing model strengths vary by task type.',
        tooltip:
          'Some models drop once length is controlled for; others rise. A standard leaderboard cannot show either movement.',
      },
    ],
    connectors: ['65K+ BATTLES', 'STYLE-CONTROLLED RANKS'],
    impact:
      'Demonstrates that presentation can masquerade as capability in the leaderboards influencing LLM deployment and research direction, and provides a reproducible method to correct for it.',
    link: {
      href: 'https://github.com/aarav-wadhwani/style-aware-llm-ranking',
      label: 'GITHUB / SOURCE',
    },
    figures: [
      {
        src: llmCoefficients,
        width: 1280,
        height: 501,
        alt: 'Plot of style feature coefficients with confidence intervals; response length is dominant',
        caption: 'FIG U8.1 · STYLE FEATURE COEFFICIENTS: LENGTH DOMINATES',
      },
      {
        src: llmRankingComparison,
        width: 1280,
        height: 611,
        alt: 'Heatmap comparing model ranks with and without style control; several models shift rank',
        caption: 'FIG U8.2 · RANKING COMPARISON, WITH VS WITHOUT STYLE CONTROL',
      },
      {
        src: llmPerCategory,
        width: 950,
        height: 640,
        alt: 'Heatmap of overall and per-category model ranks across code, creativity, math and more',
        caption: 'FIG U8.3 · PER-CATEGORY RANKS ACROSS TASK TYPES',
      },
    ],
  },

  /* ──────────────────────────────────────────────────────────────────────
   * TEMPLATE, duplicate this block to add a new component board.
   * Copy it above this comment, give it the next id (U9, U10, …), and it
   * will render with the same shell, connectors, and reveal treatment.
   * (Set kind: 'teaching' only for checkoff-sheet style boards; their extra
   * content lives in the `teaching` export below.)
   *
   * {
   *   id: 'U9',
   *   org: 'ORG / CONTEXT · MONO, UPPERCASE',
   *   title: 'Project Title',
   *   note: 'OPTIONAL SMALL FRAMING NOTE',        // omit if not needed
   *   blocks: [
   *     { role: 'INPUT',   ref: 'J9',  body: 'What goes in.',        tooltip: 'One extra sentence on hover.' },
   *     { role: 'PROCESS', ref: 'U9A', body: 'What happens to it.',  tooltip: 'One extra sentence on hover.' },
   *     { role: 'OUTPUT',  ref: 'P9',  body: 'What comes out.',      tooltip: 'One extra sentence on hover.' },
   *   ],
   *   connectors: ['IN ANNOTATION', 'OUT ANNOTATION'],
   *   impact: 'Why it mattered.',
   *   link: { href: 'https://…', label: 'LINK LABEL' },              // optional
   *   visual: 'convergence' | 'forecast' | 'monitor',                // optional in-block curve
   *   figures: [{ src: imported, alt: '…', caption: 'FIG U9.1 · …' }], // optional images
   *   figureEmphasis: true,                                          // optional: render figures larger
   * },
   * ────────────────────────────────────────────────────────────────────── */
]

/** Extra content for the EE 201 teaching board (kind: 'teaching'). */
export const teaching = {
  sheetTitle: 'LAB CHECKOFF RECORD',
  sheetMeta: 'EE 201 · COMPUTER HARDWARE SKILLS · 2 QUARTERS · 4 SECTIONS · ~96 STUDENTS',
  context:
    'EE 201 is where UW ECE students meet real hardware for the first time. Over two quarters and four lab sections, I taught roughly 96 students to solder, breadboard, read an oscilloscope, program an Arduino, and build a line-following robot from parts and confusion. Most of them had never held a soldering iron before this class.',
  checklist: [
    'Soldering',
    'Breadboarding',
    'Oscilloscope',
    'Arduino programming',
    'Line-following robot',
  ],
  method: {
    key: 'CHECKOFF PROTOCOL',
    body: 'Checkoffs ran as conversations, not signoffs. Before a group could move on, they had to explain what they had just built and why it worked, then got either confirmation or a correction to their mental model. That caught misunderstandings early, instead of three weeks later in a broken robot.',
  },
  debug: {
    key: 'DEBUG LOG',
    body: 'The other half of the job was hands-on debugging alongside students: desoldering mistakes, dead motors, mis-sized PCBs, untested photoresistors. The tools stayed in their hands the whole time.',
  },
  ratings: {
    headline: '4.8–4.9 / 5.0',
    detail: 'SUMMATIVE RATINGS, ALL FOUR SECTIONS · LAB INSTRUCTOR EFFECTIVENESS RATED UP TO 4.9',
  },
  testimonials: [
    {
      tag: 'STUDENT EVAL · VERBATIM',
      quote:
        'Overall, I’m very happy to have met and had Aarav as my TA in this class. I always appreciated his willingness to ask questions to my group during lab checkoffs, since it helps students be able to explain what they have just done in the lab in a conversational setting, and then he would either confirm our explanations were accurate, or give useful feedback on where we thought wrong. His debugging skills were very impressive whenever my group faced challenges while developing our robot cart, such as desoldering difficulties and motor issues. Well done Aarav.',
    },
    {
      tag: 'STUDENT EVAL · VERBATIM',
      quote:
        'I thought the TA was super helpful, and he always brought good energy and enthusiasm to the labs. You can tell he knows what he is talking about, and he offers a lot of general advice.',
    },
  ],
  closing:
    'Explaining a copper-futures model to a trading desk and explaining an oscilloscope to a first-year turn out to be the same skill: finding the one sentence that makes an unfamiliar thing click. That shaped how everything else on this site got scoped. If it can’t be explained clearly to someone seeing it for the first time, it isn’t understood well enough yet.',
}

/**
 * Power Rail: the experience timeline that doubles as the site index.
 * Each item links down to its board(s); Indago has no board yet.
 */
export interface RailItem {
  id: string
  role: string
  org: string
  dates: string
  location?: string
  incoming?: boolean
  /** One-line preview revealed on hover (always visible on touch). */
  preview: string
  /** Board sections this node jumps to; first target is the primary one. */
  targets?: { boardId: string; label: string }[]
}

export const rail: RailItem[] = [
  {
    id: 'V1',
    role: 'AI Integration & Automation Intern',
    org: 'Indago Capital',
    dates: 'JUL 2026 – SEP 2026',
    location: 'NEW YORK, NY',
    incoming: true,
    preview:
      'RAG knowledge base, deal memo drafting, LP reporting automation, deal screening. Board pending.',
  },
  {
    id: 'V2',
    role: 'Quantitative Research Intern',
    org: 'Macquarie Group, Commodities & Global Markets',
    dates: 'JUL 2025 – SEP 2025',
    preview:
      'Two boards: a daily copper conviction score and a livestock export nowcast for global trading desks.',
    targets: [
      { boardId: 'U1', label: 'U1 · COPPER' },
      { boardId: 'U2', label: 'U2 · LIVESTOCK' },
    ],
  },
  {
    id: 'V3',
    role: 'Research Assistant',
    org: 'Ubiquitous Computing Lab, Paul G. Allen School, UW',
    dates: 'JAN 2026 – PRESENT',
    preview:
      'Full 3D hand posture from four nail-mounted IMUs, reaching 1.74cm average joint error.',
    targets: [{ boardId: 'U3', label: 'U3 · HAND POSTURE' }],
  },
  {
    id: 'V4',
    role: 'Software Engineering Intern',
    org: 'ValueFirst',
    dates: 'JUL 2024 – SEP 2024',
    preview:
      'Quality monitoring and A/B iteration across 100K+ weekly enterprise chatbot conversations.',
    targets: [{ boardId: 'U4', label: 'U4 · LLM MONITORING' }],
  },
  {
    id: 'V5',
    role: 'Teaching Assistant',
    org: 'Dept. of Electrical & Computer Engineering, UW',
    dates: 'DEC 2025 – PRESENT',
    preview:
      'EE 201 lab sections: soldering, oscilloscopes, Arduinos, and ratings holding at 4.8–4.9 / 5.0.',
    targets: [{ boardId: 'U5', label: 'U5 · EE 201' }],
  },
]

/** Proficiency: 3 = proficient, 2 = moderate, 1 = familiar. */
export interface SkillLevel {
  name: string
  level: 1 | 2 | 3
}

export const skills = {
  languages: {
    ref: 'L1',
    category: 'LANGUAGES',
    items: [
      { name: 'Python', level: 3 },
      { name: 'SQL', level: 3 },
      { name: 'Java', level: 2 },
      { name: 'JavaScript', level: 2 },
      { name: 'R', level: 2 },
      { name: 'C++', level: 1 },
      { name: 'SystemVerilog', level: 1 },
    ] as SkillLevel[],
  },
  modeling: {
    ref: 'M1',
    category: 'MODELING',
    items: [
      'Classification',
      'Regression',
      'Time series forecasting',
      'Feature engineering',
      'Dimensionality reduction (PCA)',
    ],
  },
  tools: {
    ref: 'T1',
    category: 'DATA & TOOLS',
    items: [
      'FastAPI',
      'scikit-learn',
      'XGBoost',
      'PyTorch',
      'TensorFlow',
      'Git',
      'Docker',
      'PostgreSQL',
      'AWS',
      'Dataiku',
    ],
  },
}

export const contact = {
  refTag: 'X1 · OUTPUT TERMINAL',
  heading: 'Signal resolved.',
  body: 'The trace ends here. Get in touch, or take the datasheet with you.',
  ports: [
    { id: 'P1', label: 'RESUME.PDF', href: '/resume/Aarav_Wadhwani_Resume.pdf', download: true },
    { id: 'P2', label: 'EMAIL', href: 'mailto:aaravw28@uw.edu', detail: 'aaravw28@uw.edu' },
    { id: 'P3', label: 'LINKEDIN', href: 'https://www.linkedin.com/in/aarav-wadhwani/', external: true },
    { id: 'P4', label: 'GITHUB', href: 'https://github.com/aarav-wadhwani', external: true },
  ],
}
