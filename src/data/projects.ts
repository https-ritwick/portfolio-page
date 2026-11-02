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
 */

import type { ImageMetadata } from 'astro';
import riffleShot from '../assets/projects/riffle.webp';
import efestShot from '../assets/projects/efest.webp';

export type DiagramKind = 'agents' | 'fusion' | 'fog';
export type CategoryId = 'ai' | 'campus' | 'games';
export type LinkKind = 'source' | 'live' | 'play' | 'paper';

export interface ProjectLink {
  kind: LinkKind;
  href: string;
  /** Overrides the default label for this kind, e.g. "Team repository". */
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
    tagline: 'Multi-agent conversational healthcare assistant',
    topic: 'Agentic AI',
    problem:
      'A single general-purpose chatbot treats consultation, nutrition, exercise and health education the same way, though each needs different context.',
    approach:
      'Specialised autonomous agents, each owning one domain, grounded through RAG pipelines on IBM watsonx Granite models.',
    built: [
      'Four domain agents: consultation, diet, exercise and health education',
      'RAG pipelines on watsonx Granite for context-aware recommendations',
      'Application layer on Firebase',
    ],
    stack: ['IBM watsonx (Granite)', 'RAG', 'Multi-agent systems', 'Firebase'],
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
      'A YOLO object-detection model that finds waste in sonar imagery, served through a Flask web app that returns annotated detections for uploaded images.',
    stack: ['YOLO (Ultralytics)', 'Python', 'Flask'],
    note: 'Team project',
    links: [
      {
        kind: 'source',
        href: 'https://github.com/https-ritwick/marine-waste-detection-project',
        label: 'Team repository',
      },
    ],
  },
  {
    id: 'krishitech',
    detail: 'compact',
    categoryId: 'ai',
    name: 'KrishiTech',
    tagline: 'AI-based smart agriculture platform',
    topic: 'Applied AI',
    summary: 'Brings crop prediction, crop-disease detection and farmer support together in one platform.',
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
    screenshot: {
      src: riffleShot,
      alt: 'Riffle home page: “Name the song before your friends do”, with Create a game, Play solo and Join with a code options.',
    },
    links: [
      { kind: 'play', href: 'https://riffle.musicquiz.workers.dev' },
      { kind: 'source', href: 'https://github.com/https-ritwick/Riffle-Guess-the-Song' },
    ],
  },
];
