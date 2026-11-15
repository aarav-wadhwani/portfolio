/**
 * Single source of truth for all site copy and assets.
 *
 * Every claim here comes from Section 4 (Fact Sheet) of the redesign plan.
 * Do not add, round, or reword a number without checking it there first.
 * House style: first person, sentence case, no em dashes. En dashes are fine
 * in numeric ranges (0–100, 4.8–4.9).
 *
 * Open items are marked TODO(aarav) and listed in CHANGELOG.md.
 */
import headshot from '../assets/headshot.webp'
import nailsenseDevice from '../assets/ubicomp-device.webp'
import birdnetDevice from '../assets/birdnet-device.webp'
import llmCoefficients from '../assets/llm-style-coefficients.webp'
import llmRankingComparison from '../assets/llm-ranking-comparison.webp'

/* ── Identity and links ─────────────────────────────────────────────── */

export const links = {
  email: 'aaravw28@uw.edu',
  linkedin: 'https://www.linkedin.com/in/aarav-wadhwani/',
  github: 'https://github.com/aarav-wadhwani',
  // TODO(aarav): D3. This PDF predates Indago. Replace it before production.
  resume: '/resume/Aarav_Wadhwani_Resume.pdf',
}

export const positioning = {
  name: 'Aarav Wadhwani',
  headline: 'I build AI systems inside finance teams, and stay until people use them.',
  supporting:
    'Most recently AI Solutions Engineering Intern at Indago Capital, an asset-based finance firm in New York. Before that, commodities modeling at Macquarie and wearable ML research at UW (first author, ACM UIST ’26 demo).',
  // TODO(aarav): D8. Swap in a new headshot if you want one (assets-src/headshot.jpeg).
  headshot: {
    src: headshot,
    alt: 'Aarav Wadhwani, outdoors with evergreen trees behind him',
  },
}

/** Small plain-text proof line under the hero. */
export const proof = [
  'First author, ACM UIST ’26 demo',
  '10+ Claude skills shipped at Indago',
  '2,500+ UW students on Questra',
  'Desk tools at Macquarie CGM',
]

/* ── Case study model ───────────────────────────────────────────────── */

export interface Figure {
  src: string
  alt: string
  caption: string
  width: number
  height: number
}

/** A labeled empty slot for an asset Aarav still needs to supply. */
export interface AssetSlot {
  label: string
  detail: string
}

export interface CaseBlock {
  label: 'Input' | 'Process' | 'Output'
  body?: string
  points?: string[]
}

export interface CaseStudy {
  org: string
  title: string
  role: string
  dates: string
  location?: string
  tags: string[]
  /** Framing line shown at the top of the case (for example a confidentiality note). */
  note?: string
  blocks: [CaseBlock, CaseBlock, CaseBlock]
  impact: string
  /** One small headline metric, where the Fact Sheet has one. Only `value` is set in mono. */
  metric?: { prefix?: string; value: string; label: string }
  /** A row of result figures (used by the NailSense case). */
  stats?: { value: string; label: string }[]
  visual?: 'indago-flow' | 'convergence' | 'forecast'
  /** Named tools, rendered as a compact two-column list. */
  catalog?: { heading: string; items: { name: string; does: string }[]; more?: string }
  figures?: Figure[]
  slot?: AssetSlot
  links?: { href: string; label: string }[]
}

export interface Deployment {
  /** Anchor id: aaravwadhwani.vercel.app/#indago opens this row. */
  id: string
  client: string
  team: string
  shipped: string
  dates: string
  /** live = amber dot (most recent or ongoing); otherwise a neutral completed dot. */
  status: { label: string; live: boolean }
  caseStudy: CaseStudy
}

/* ── The deployment ledger ──────────────────────────────────────────── */

export const deployments: Deployment[] = [
  {
    id: 'indago',
    client: 'Indago Capital',
    team: 'BD and deal team',
    shipped: '10+ Claude skills, a DealCloud connector, a deal wiki',
    dates: 'Jul to Sep 2026',
    // Only Firm Dossier is confirmed as still in use, so the row says Shipped.
    status: { label: 'Shipped', live: true },
    caseStudy: {
      org: 'Indago Capital',
      title: 'AI tooling for a non-technical deal team',
      role: 'AI Solutions Engineering Intern',
      dates: 'Jul to Sep 2026',
      location: 'New York',
      tags: ['Claude skills', 'Connectors', 'RAG', 'DealCloud', 'Microsoft 365', 'Snowflake'],
      note: 'Methodology only. No client or deal data.',
      blocks: [
        {
          label: 'Input',
          body: 'A non-technical business development and deal team at an asset-based finance firm. Their systems: DealCloud, Outlook, SharePoint, Snowflake and deal data rooms.',
        },
        {
          label: 'Process',
          points: [
            'Built an in-house DealCloud connector so the BD team can read, create and update CRM records in batches from Claude, in place of a paid vendor integration.',
            'Configured the Microsoft 365 connector firm-wide: search Outlook, consolidate SharePoint notes, and upload to SharePoint from Claude.',
            'Wrote 10+ Claude skills for BD, plus skills for deal memo drafting and LP reporting.',
            'Built the deal wiki: each data room is ingested once into a linked markdown knowledge base on SharePoint, enriched with email, meeting notes, Snowflake and DealCloud context, then queried and updated through three Claude skills (ingest, query, update).',
            'Built a quantitative relative value and risk based pricing framework for evaluating asset-based finance deals.',
            'Built a RAG-based internal knowledge base, and evaluated AI vendors and RAG platforms for the firm’s tooling strategy.',
          ],
        },
        {
          label: 'Output',
          points: [
            'Firm Dossier is now used before every meeting.',
            'Cumulative Brief was generated programmatically for all 488 prospect companies.',
            'A Granola notes recipe for BD meeting notes, and an interactive fundraise pipeline dashboard.',
          ],
        },
      ],
      impact:
        'The team is non-technical, so everything runs in Claude chat. Nobody on the deal team touches code.',
      visual: 'indago-flow',
      catalog: {
        heading: 'Skills written for the BD team',
        items: [
          {
            name: 'Contact Enrichment',
            does: 'A name and company list becomes one enriched spreadsheet using Outlook, DealCloud and the web, flagging existing records and prior correspondence.',
          },
          {
            name: 'Firm Dossier',
            does: 'A branded pre-meeting document combining internal history, firm research and attendee bios.',
          },
          {
            name: 'Cumulative Brief',
            does: 'Consolidates all past meetings and email with a company into one record.',
          },
          {
            name: 'Mail Merge',
            does: 'Personalized Outlook drafts as replies to existing threads, pulling recipients from DealCloud by LP category and product.',
          },
        ],
        more: 'Also: Status Update, Bounce-Back Recovery, Individual Summary, and DC Add Contact / Add Company for batch CRM entry without complex prompting.',
      },
    },
  },
  {
    id: 'copper',
    client: 'Macquarie CGM',
    team: 'Metals desk',
    shipped: 'Daily copper conviction score',
    dates: 'Jul to Sep 2025',
    status: { label: 'Delivered', live: false },
    caseStudy: {
      org: 'Macquarie Group, Commodities and Global Markets',
      title: 'Copper Scorecard',
      // D1: official title per LinkedIn.
      role: 'Commodities and Global Markets Intern',
      dates: 'Jul to Sep 2025',
      location: 'Gurugram',
      tags: ['XGBoost', 'Random Forest', 'Time-series CV', 'Dataiku'],
      note: 'Quant modeling for the metals desk. Methodology first.',
      blocks: [
        {
          label: 'Input',
          body: 'LME 3-month copper futures, described by 8 signal families: momentum and technicals, term structure, positioning, exchange open interest, macro / FX / rates, cross-asset, microstructure, and volatility.',
        },
        {
          label: 'Process',
          body: 'Per-family XGBoost, Random Forest and logistic baseline models, validated with rolling-window time-series cross-validation and pruned with VIF. The signal families are re-weighted dynamically on a biweekly cycle.',
        },
        {
          label: 'Output',
          body: 'A daily 0–100 conviction score, delivered each morning before London open through an automated Dataiku pipeline.',
        },
      ],
      // D2: one small public number, methodology framing kept.
      metric: { value: '71%', label: 'directional accuracy' },
      impact:
        'Across the internship: 6+ Dataiku pipelines, strategy turnaround time cut by 60%, and work with desks in London, Singapore and Hong Kong.',
      visual: 'convergence',
    },
  },
  {
    id: 'livestock',
    client: 'Macquarie CGM',
    team: 'Agriculture desk',
    shipped: 'Livestock export nowcast',
    dates: 'Jul to Sep 2025',
    status: { label: 'Delivered', live: false },
    caseStudy: {
      org: 'Macquarie Group, Commodities and Global Markets',
      title: 'Livestock exports nowcast',
      role: 'Commodities and Global Markets Intern',
      dates: 'Jul to Sep 2025',
      location: 'Gurugram',
      tags: ['SARIMAX', 'Backtesting', 'Grid search'],
      note: 'Quant modeling for the agriculture desk. Methodology first.',
      blocks: [
        {
          label: 'Input',
          body: 'Customs data as the endogenous series, with weekly USDA shipments as an exogenous leading indicator.',
        },
        {
          label: 'Process',
          body: 'A SARIMAX model per country, tuned by grid search and validated with expanding-window backtests.',
        },
        {
          label: 'Output',
          body: 'Per-country nowcasts for the agriculture desk.',
        },
      ],
      metric: { prefix: 'Under', value: '5%', label: 'MAPE across 10 markets' },
      impact: 'Nowcasts run about two months ahead of official data.',
      visual: 'forecast',
    },
  },
  {
    id: 'nailsense',
    client: 'UW UbiComp Lab',
    team: 'Research',
    shipped: 'NailSense, ACM UIST ’26 demo',
    dates: 'Jan 2026 to present',
    status: { label: 'Ongoing', live: true },
    caseStudy: {
      org: 'UW UbiComp Lab, Paul G. Allen School',
      title: 'NailSense: whole-hand posture from four nail stickers',
      role: 'Undergraduate Research Assistant',
      dates: 'Jan 2026 to present',
      location: 'Seattle',
      tags: ['Wearable ML', 'BLE', 'Flexible PCB', 'Computer vision'],
      note: 'First author, ACM UIST ’26 demo. PI: Prof. Qiuyue (Shirley) Xue.',
      blocks: [
        {
          label: 'Input',
          body: 'Four nail stickers on the thumb, index, middle and ring fingers. Each is a 10 × 9 mm flexible PCB with a 3-axis accelerometer and MCU, streaming at 100 Hz over Bluetooth Low Energy. Finger pads, palm and wrist stay free.',
        },
        {
          label: 'Process',
          body: 'A model turns one second of all 12 signals into 21 3D hand joints. Cameras (dual-camera stereo, MediaPipe, ChArUco calibration, triangulation) are used only to label training data.',
        },
        {
          label: 'Output',
          body: 'Whole-hand posture tracking and gesture classification from four nail stickers.',
        },
      ],
      stats: [
        { value: '8.91 mm', label: 'average joint error, new user' },
        { value: '5.97 mm', label: 'personalized (PA-MPJPE)' },
        { value: '93.4%', label: 'gesture classification' },
      ],
      impact:
        'Demo applications: live 3D hand rendering, ASL to voice translation in real time, and gesture-controlled music.',
      links: [{ href: '#research', label: 'Publication details' }],
    },
  },
]

/* ── How I work ─────────────────────────────────────────────────────── */

export const howIWork = [
  {
    title: 'Sit with the team.',
    body: 'Learn the workflow from the people doing it, not from a spec.',
    evidence:
      'At Indago I was embedded with a non-technical BD and deal team.',
  },
  {
    title: 'Find the step that hurts.',
    body: 'Pick the one with the clearest payoff and the least ambiguity.',
    evidence:
      'The DealCloud connector lets the BD team read, create and update CRM records in batches from Claude, in place of a paid vendor integration.',
  },
  {
    title: 'Ship something small that week.',
    body: 'Put it where the team already works. For Indago, that meant inside Claude chat, because the team is non-technical.',
    evidence:
      'The deal wiki runs on three Claude skills (ingest, query, update), so a non-technical deal team never touches code.',
  },
  {
    title: 'Measure use, then harden.',
    body: 'Fold feedback in, and document so it survives handoff.',
    evidence:
      'Firm Dossier is now used before every meeting.',
  },
]

/* ── Research ───────────────────────────────────────────────────────── */

export const publication = {
  label: 'First author, ACM UIST ’26 demo',
  title:
    'Demo of NailSense: Unobtrusive Wireless Smart Nail Stickers for Whole-Hand Posture Tracking',
  venue:
    'UIST Adjunct ’26: Adjunct Proceedings of the 39th Annual ACM Symposium on User Interface Software and Technology, Article 158, pp. 1–3.',
  published: '13 Nov 2026',
  datePublished: '2026-11-13',
  doi: 'https://doi.org/10.1145/3830397.3842456',
  doiLabel: '10.1145/3830397.3842456',
  authors: [
    { name: 'Aarav Wadhwani', self: true },
    { name: 'Jiayi Shao' },
    { name: 'Rishabh L Goenka' },
    { name: 'Zhenyang Fu' },
    { name: 'Xiyuan Shen' },
    { name: 'Qiuyue (Shirley) Xue' },
  ],
  affiliations: 'University of Washington and Purdue University',
  // TODO(aarav): D6. Sticker weight omitted (poster says 0.65 g, paper says 0.39 g).
  specs: ['10 × 9 mm flexible PCB', '100 Hz over BLE', '18 h on a 14.5 mAh cell'],
  battery: 'An estimated 14 days of use at 30 minutes a day.',
  results: [
    { value: '8.91 mm', label: 'average joint error, new user' },
    { value: '5.97 mm', label: 'personalized (PA-MPJPE)' },
    { value: '93.4%', label: 'gesture classification' },
  ],
  demos: 'Live 3D hand rendering, ASL to voice translation in real time, and gesture-controlled music.',
  figure: {
    src: nailsenseDevice,
    alt: 'A hand resting on a table with small flexible circuit stickers on two fingernails',
    caption: 'Nail stickers as worn.',
    width: 900,
    height: 1200,
  } as Figure,
  // TODO(aarav): D8. Add the poster pipeline figure or demo photos to assets-src/.
  slot: {
    label: 'Figure slot: NailSense poster pipeline or demo photo',
    detail: 'Add the file to assets-src/ and reference it in site.ts.',
  } as AssetSlot,
}

export const llmStudy = {
  title: 'Style-aware LLM ranking',
  kind: 'Independent research',
  summary:
    'Using 65K+ human pairwise battles across 20+ models and a Bradley–Terry baseline, response length has a stronger effect on rank than most model-identity coefficients.',
  method:
    'I extended the model to learn strength and style jointly (length, lists, headers, bold), with bootstrapped confidence intervals and per-category breakdowns.',
  link: {
    href: 'https://github.com/aarav-wadhwani/style-aware-llm-ranking',
    label: 'Code on GitHub',
  },
  figures: [
    {
      src: llmCoefficients,
      alt: 'Dot plot of style feature coefficients with confidence intervals, for response length, lists, bold and headers.',
      caption: 'Style feature coefficients with confidence intervals.',
      width: 1280,
      height: 501,
    },
    {
      src: llmRankingComparison,
      alt: 'Heatmap comparing model ranks with and without style control.',
      caption: 'Ranks with and without style control.',
      width: 1280,
      height: 611,
    },
  ] as Figure[],
}

/* ── Builds, earlier work, teaching ─────────────────────────────────── */

export interface Build {
  name: string
  role: string
  body: string
  stack?: string
  link?: { href: string; label: string }
  figure?: Figure
  slot?: AssetSlot
}

export const builds: Build[] = [
  {
    name: 'Questra AI',
    role: 'Co-founder with Hemil Patel, Apr 2024 to Feb 2026',
    // TODO(aarav): D7. "5,000+ image questions", "over 92% accuracy" and
    // "sub-2-second responses" are left out until you confirm them.
    body: 'Sorts real past UW exam questions by course, professor and topic with a GPT-based classifier. It generates nothing. Launched for 5 UW math courses and used by 2,500+ UW students.',
    stack: 'FastAPI, React, Supabase, AWS',
    // TODO(aarav): questra-ai.com has lapsed and now redirects to an unrelated site
    // (checked 14 Nov 2026), so the link is removed. Restore it if you renew the domain.
    // TODO(aarav): D8. The old screenshot showed an error banner and is not used.
    slot: {
      label: 'Screenshot slot: Questra practice view',
      detail: 'Add a new capture as assets-src/questra-ui.png.',
    },
  },
  {
    name: 'PocketBirdNET',
    role: 'Edge ML build',
    body: 'Distills the ~50 MB BirdNET model into a 60 KB INT8 student (about 800× smaller) running on an Arduino Nano 33 BLE Sense, with an SSD1306 readout and a Web Bluetooth dashboard.',
    link: { href: 'https://pocketbirdnet.vercel.app/', label: 'pocketbirdnet.vercel.app' },
    figure: {
      src: birdnetDevice,
      alt: 'Breadboard circuit with a small LCD showing a detected bird species and its score',
      caption: 'On-device classification.',
      width: 1048,
      height: 640,
    },
  },
]

// TODO(aarav): D5. Khao (pre-launch) is left off. Add a line here if you want it.
// TODO(aarav): add links for OneGlance and Food Desert Mapper if you want them clickable.
export const alsoBuilt = [
  { name: 'OneGlance', body: 'A portfolio tracker.' },
  { name: 'Food Desert Mapper', body: 'Maps 1,500+ Washington census tracts.' },
]

export const earlierWork = [
  {
    org: 'ValueFirst',
    role: 'Software Engineering Intern',
    dates: 'Jul to Sep 2024',
    body: 'A FastAPI analytics dashboard monitoring 100K+ weekly conversations across 6 enterprise chatbot deployments, with prompt versioning and A/B-tested rollouts. Response quality up 15%, latency stabilized by 20%.',
  },
  // The Fact Sheet has no detail for this one, so it is a single line.
  { org: 'Kernel Labs', role: 'Internship', dates: '2022', body: '' },
]

export const teaching = {
  title: 'Teaching Assistant, EE 201 Computer Hardware Skills',
  org: 'UW Electrical and Computer Engineering',
  dates: 'Dec 2025 to present',
  body: 'About 96 students across 4 sections and 2 quarters.',
  rating: { value: '4.8–4.9 / 5.0', label: 'student ratings' },
  quote:
    'Overall, I’m very happy to have met and had Aarav as my TA in this class. I always appreciated his willingness to ask questions to my group during lab checkoffs, since it helps students be able to explain what they have just done in the lab in a conversational setting, and then he would either confirm our explanations were accurate, or give useful feedback on where we thought wrong. His debugging skills were very impressive whenever my group faced challenges while developing our robot cart, such as desoldering difficulties and motor issues. Well done Aarav.',
  secondQuote:
    'I thought the TA was super helpful, and he always brought good energy and enthusiasm to the labs. You can tell he knows what he is talking about, and he offers a lot of general advice.',
  why: 'Explaining a copper-futures model to a trading desk and explaining an oscilloscope to a first-year turn out to be the same skill: finding the one sentence that makes an unfamiliar thing click.',
}

/* ── About, skills, contact ─────────────────────────────────────────── */

export const about = {
  // TODO(aarav): confirm the "New Delhi to Seattle" wording reads the way you want.
  body: 'I’m from New Delhi and study in Seattle, where I study electrical and computer engineering with a minor in data science at the University of Washington.',
  next: 'I’m looking for 2027 roles in ML engineering, applied AI and forward deployed engineering, and quant or trading technology.',
  education: [
    { label: 'Degree', value: 'B.S. Electrical and Computer Engineering, minor in Data Science' },
    { label: 'School', value: 'University of Washington, Seattle' },
    { label: 'Dates', value: 'Sep 2023 to Jun 2027 (expected)' },
    { label: 'GPA', value: '3.85, Dean’s List' },
  ],
}

export const skills = [
  {
    group: 'Applied AI and FDE',
    items:
      'Claude (skills, connectors), Model Context Protocol (MCP), RAG, LLM evaluation, prompt versioning and A/B testing, Microsoft 365 / SharePoint, DealCloud, Snowflake',
  },
  {
    group: 'Quant and ML',
    items:
      'Time series forecasting (SARIMAX), XGBoost, Random Forest, PyTorch, scikit-learn, TensorFlow, feature engineering, backtesting and time-series CV, signal processing, computer vision (OpenCV, MediaPipe), ONNX',
  },
  {
    group: 'Engineering',
    items:
      'Python, SQL, TypeScript / JavaScript, Java, R, C++, FastAPI, React, PostgreSQL / Supabase, Docker, AWS, Dataiku, embedded firmware, BLE, PCB design',
  },
]

export const contact = {
  heading: 'Open to 2027 roles in applied AI, forward deployed engineering, and quant tech.',
  updated: '14 Nov 2026',
}

export const nav = [
  { href: '#work', label: 'Work' },
  { href: '#how', label: 'How I work' },
  { href: '#research', label: 'Research' },
  { href: '#about', label: 'About' },
]
