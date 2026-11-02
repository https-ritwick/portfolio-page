/**
 * Projects, grouped by category and shown in this order.
 *
 * - `detail: 'full'` projects get the full row (problem / approach / what I built).
 * - `detail: 'compact'` projects get a short card (summary + stack + links).
 *
 * Links: only add URLs that exist — every link is shown as-is.
 * `diagram` (optional) adds an expandable architecture schematic.
 * `screenshot` (optional) shows a real screenshot of the project. Put the file in
 * src/assets/projects/ and import it below; Astro resizes and compresses it at build.
 * `video` (optional, full projects) replaces the screenshot with a short muted demo:
 * the MP4 goes in public/videos/, its poster frame in src/assets/projects/.
 */

import type { ImageMetadata } from 'astro';
import rifflePoster from '../assets/projects/riffle-demo-poster.jpg';
import efestShot from '../assets/projects/efest.webp';
import bloomShot from '../assets/projects/bloom.webp';
import wasteguardShot from '../assets/projects/wasteguard.webp';
import batchShot from '../assets/projects/batch.webp';
import hostelShot from '../assets/projects/hostel.webp';

export type DiagramKind = 'agents' | 'fusion' | 'fog';
export type CategoryId = 'ai' | 'campus' | 'games';
export type LinkKind = 'source' | 'live' | 'play' | 'paper';

export interface ProjectLink {
  kind: LinkKind;
  href: string;
  /** Overrides the default label for this kind, e.g. "Repository". */
  label?: string;
}

interface BaseProject {
  id: string;
  name: string;
  tagline: string;
  categoryId: CategoryId;
  /** Short topic label shown above the name. */
  topic: string;
  stack?: string[];
  links: ProjectLink[];
  /** A documented outcome only — never an invented metric. */
  outcome?: string;
  note?: string;
  /** Shown in the default "Selected" view of the projects filter. */
  selected?: boolean;
  /** A real screenshot of the project; `alt` describes what it shows. */
  screenshot?: { src: ImageMetadata; alt: string };
  /** Short muted demo clip. `src` is a path under public/; `label` describes it. */
  video?: { src: string; poster: ImageMetadata; label: string; caption: string };
}

export interface FullProject extends BaseProject {
  detail: 'full';
  problem: string;
  approach: string;
  built: string[];
  diagram?: DiagramKind;
}

export interface CompactProject extends BaseProject {
  detail: 'compact';
  summary: string;
}

export type Project = FullProject | CompactProject;

export const categories: { id: CategoryId; label: string }[] = [
  { id: 'ai', label: 'AI & machine learning' },
  { id: 'campus', label: 'Campus & university' },
  { id: 'games', label: 'Games' },
];

export const linkLabels: Record<LinkKind, string> = {
  source: 'Source',
  live: 'Live site',
  play: 'Play',
  paper: 'Paper',
};

export const projects: Project[] = [
  /* ---------------------------------------------------------- AI & ML */
  {
    id: 'bloom',
    selected: true,
    detail: 'full',
    categoryId: 'ai',
    name: 'BloomAI',
    tagline: 'Multi-agent AI assistant for menopause and women’s health',
    topic: 'Agentic AI',
    problem:
      'Over 150 million women in India go through menopause, mostly without reliable information or empathetic care. A single general-purpose chatbot also treats medical, nutrition and fitness questions the same way, though each needs different context.',
    approach:
      'An orchestrator classifies each message and routes it to a specialised agent. The agents are grounded through RAG, reachable on the web and on WhatsApp, and work from the user’s logged symptoms and history.',
    built: [
      'Orchestrator plus four agents: consultation, diet, exercise and menopause education',
      'RAG pipelines for context-aware, evidence-based recommendations',
      'Web app and WhatsApp channel (Twilio), with Google Calendar reminders and scheduling',
      'Symptom and cycle calendar, trend charts and a downloadable health report',
      'Consultation agent that points users to gynaecologists when symptoms are severe',
    ],
    stack: ['IBM watsonx (Granite)', 'Llama 3.3', 'LangChain', 'Flask', 'RAG', 'Twilio', 'Google Calendar API', 'Firebase'],
    screenshot: {
      src: bloomShot,
      alt: 'Three BloomAI phone screens: a daily overview with a 7-day wellness chart, a health report with symptom statistics, and a chat with the Bloom assistant.',
    },
    // The repository on the resume (github.com/https-ritwick/Bloom-AI) is not public.
    // Add { kind: 'source', href: '…' } here once it is.
    links: [],
    diagram: 'agents',
  },
  {
    id: 'fusion',
    selected: true,
    detail: 'full',
    categoryId: 'ai',
    name: 'FusionSight-YOLO',
    tagline: 'Object detection in UAV imagery with multi-channel input fusion',
    topic: 'Computer vision · Research',
    problem:
      'Aerial imagery from UAVs has small targets and shifting viewpoints and conditions, so robust detection for real-time monitoring and transport safety is hard.',
    approach:
      'Modified the YOLOv8 architecture to fuse multiple input channels at the network input, then trained and evaluated it on UAV data.',
    built: [
      'Multi-channel input fusion in a modified YOLOv8',
      'Training and evaluation on UAV imagery',
      'Lead author of the published paper',
    ],
    stack: ['YOLOv8', 'Deep learning', 'Computer vision'],
    outcome: 'Published at ETAAV 2025, IISc Bangalore (IEEE Xplore)',
    links: [
      { kind: 'source', href: 'https://github.com/https-ritwick/IndraEye_Labels' },
      { kind: 'paper', href: 'https://ieeexplore.ieee.org/document/11213298' },
    ],
    diagram: 'fusion',
  },
  {
    id: 'iotfog',
    detail: 'full',
    categoryId: 'ai',
    name: 'IoT-Fog Health Monitoring',
    tagline: 'Distributed edge–fog–cloud system for real-time patient monitoring',
    topic: 'Machine learning · Distributed systems',
    problem: 'Routing every vital-sign reading through the cloud adds latency where medical monitoring can least afford it.',
    approach:
      'A three-tier edge, fog and cloud architecture that processes data close to the patient, with predictive models running on real-time health data.',
    built: [
      'Distributed edge–fog–cloud architecture for low-latency monitoring',
      'Scikit-learn models for diabetes and heart-disease prediction',
      'Real-time health-data processing and predictive analytics',
    ],
    stack: ['Scikit-learn', 'Edge & fog computing', 'Google Cloud'],
    links: [],
    diagram: 'fog',
  },
  {
    id: 'wasteguard',
    detail: 'compact',
    categoryId: 'ai',
    name: 'AI WasteGuard',
    tagline: 'Marine waste detection on sonar imagery',
    topic: 'Computer vision',
    summary:
      'Designed for forward-looking sonar cameras on ships: a YOLO model detects and classifies underwater debris across 11 classes, from bottles, cans and tyres to chains and propellers. A Flask web app returns annotated detections for uploaded images. Trained on public datasets so it can work across different water bodies.',
    outcome: 'F1 0.90 across all 11 classes (precision 0.92, recall 0.90)',
    stack: ['YOLO (Ultralytics)', 'Python', 'Flask', 'Computer vision'],
    screenshot: {
      src: wasteguardShot,
      alt: 'F1–confidence curve for the 11 debris classes. The combined curve peaks at an F1 of 0.90 at a confidence of 0.457.',
    },
    links: [
      { kind: 'source', href: 'https://github.com/https-ritwick/marine-waste-detection-project' },
    ],
  },
  {
    id: 'krishitech',
    detail: 'compact',
    categoryId: 'ai',
    name: 'KrishiTech',
    tagline: 'One-stop AI platform for farmers',
    topic: 'Applied AI',
    summary:
      'Location-aware crop recommendation (SVM on weather, soil and crop history), fertiliser recommendation (Random Forest on temperature, humidity, moisture, soil and NPK levels) and crop-disease detection from leaf images (CNN). Also covers a farmer marketplace without middlemen, NPK, moisture and temperature sensor input, and an English and Hindi chatbot.',
    stack: ['Python', 'Scikit-learn', 'CNN', 'IoT sensors'],
    // github.com/https-ritwick/Krishi-Tech is not public yet. Once it is, uncomment:
    // links: [{ kind: 'source', href: 'https://github.com/https-ritwick/Krishi-Tech' }],
    links: [],
  },

  /* --------------------------------------------------- Campus & university */
  {
    id: 'batch',
    selected: true,
    detail: 'full',
    categoryId: 'campus',
    name: 'Batch Allotment & Reporting System',
    tagline: 'Admission reporting portal for USAR, GGSIPU',
    topic: 'Full-stack web app · Go',
    problem:
      'Allotting newly admitted students to batches and groups by hand is slow, and branch upgrades and withdrawals keep unbalancing the groups.',
    approach:
      'A Go web application with server-side rendering and MySQL. It registers students, allots batches and groups automatically, and gives each university office its own dashboard.',
    built: [
      'Branch-wise balanced batch and group allotment, with lateral-entry and withdrawal rules',
      'Branch-upgrade workflow with validation, automatic re-allotment and cooldown periods',
      'Role-based access for seven roles, from students to the Dean’s office, with JWT authentication',
      'Document upload and verification, filters, search and Excel export for the Student Cell',
    ],
    stack: ['Go', 'MySQL', 'JWT', 'HTML', 'Tailwind CSS'],
    screenshot: {
      src: batchShot,
      alt: 'The Batch & Group Allotment Portal home page with notices and a batch lookup box, overlapped by the Branch Upgrade form.',
    },
    links: [{ kind: 'source', href: 'https://github.com/https-ritwick/Reporting-Management-System' }],
  },
  {
    id: 'efest',
    detail: 'compact',
    categoryId: 'campus',
    name: 'Elysian × Synesthesia',
    tagline: 'Fest website for GGSIPU East Delhi Campus',
    topic: 'Website',
    summary:
      'Official site for Elysian (USAR’s technical fest) and Synesthesia (USDI’s design fest), held 21–23 October 2026. It covers technical, design, cultural and Garba events, plus schedules, clubs, team, volunteer sign-up, sponsors, announcements and FAQs. Registration links out to each event’s official platform.',
    stack: ['React', 'Motion', 'Cloudflare Workers'],
    screenshot: {
      src: efestShot,
      alt: 'Home page of the Elysian × Synesthesia fest site: the university name above the two fest logos on a starry background.',
    },
    links: [{ kind: 'live', href: 'https://fests.ggsipuedc.workers.dev/' }],
  },

  {
    id: 'hostel',
    detail: 'compact',
    categoryId: 'campus',
    name: 'Hostel Leave Management System',
    tagline: 'Leave requests and approvals for university hostels',
    topic: 'Full-stack web app · Go',
    summary:
      'Students apply for leave with a date range and reason and track each request; wardens approve or reject them from their own dashboard. Role-based logins keep each user to their own view.',
    stack: ['Go', 'MySQL', 'JWT', 'Bootstrap'],
    screenshot: {
      src: hostelShot,
      alt: 'The student dashboard with a leave application form and previous requests, overlapped by the warden dashboard listing pending and past leave requests.',
    },
    note: 'Built with Khushi Thakur',
    links: [{ kind: 'source', href: 'https://github.com/https-ritwick/Hostel-Leave-System_Demo' }],
  },

  /* ------------------------------------------------------------- Games */
  {
    id: 'riffle',
    selected: true,
    detail: 'full',
    categoryId: 'games',
    name: 'Riffle',
    tagline: 'Real-time multiplayer music quiz: name the song before your friends do',
    topic: 'Real-time web app',
    problem:
      'Group music quizzes usually need one shared screen. Riffle lets everyone play from their own phone, hearing the same clip at the same moment.',
    approach:
      'Each room is a Cloudflare Durable Object running the game engine over WebSockets, with client clock sync so clips start together. D1 stores users, groups and game history; the client is React and Vite.',
    built: [
      'Look-alike answer options ranked by singer, album, era and title similarity, across three difficulty levels',
      '“Blend” mode that mixes every player’s Spotify music, plus Spotify and Apple Music playlist import',
      'Bollywood challenge rounds with Gemini-generated questions that are schema-checked before use',
      'Voice chat over WebRTC with a WebSocket fallback, and Google sign-in groups with shared leaderboards',
    ],
    stack: ['TypeScript', 'React', 'Cloudflare Workers', 'Durable Objects', 'D1', 'WebRTC', 'Gemini API', 'Playwright'],
    video: {
      src: 'videos/riffle-demo.mp4',
      poster: rifflePoster,
      label: 'Riffle demo: starting a solo game, choosing a game mode, then answering a round correctly for 859 points.',
      caption: 'Solo game demo · 24 s, no sound',
    },
    links: [
      { kind: 'play', href: 'https://riffle.musicquiz.workers.dev' },
      { kind: 'source', href: 'https://github.com/https-ritwick/Riffle-Guess-the-Song' },
    ],
  },
];
