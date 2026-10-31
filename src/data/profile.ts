/**
 * Personal profile — the single source of truth for identity, links and
 * contact details shown across the site (hero, header, footer, contact, SEO).
 */

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
  icon: 'github' | 'linkedin';
}

export interface Education {
  institution: string;
  school?: string;
  credential: string;
  period: string;
  detail: string;
}

export const profile = {
  name: 'Ritwick Johari',
  initials: 'RJ',
  role: 'Software Engineer',
  // Current position — shown in the hero status line and "At a glance".
  current: {
    title: 'Advanced App Engineering Associate',
    organization: 'Accenture',
  },
  headline: 'Software engineer building agentic AI and LLM systems.',
  // Keep to two or three lines: the hero is designed around it.
  intro:
    'I build multi-agent and retrieval-augmented LLM systems, and the software around them: orchestration, data pipelines and the interfaces people use.',
  focusAreas: ['Agentic AI', 'RAG & LLM systems', 'Computer vision', 'Full-stack engineering'],
  location: 'New Delhi, India',
  email: 'ritwickjohari@gmail.com',
  // Served from /public/resume.pdf. Replace that file to update the resume.
  resumePath: 'resume.pdf',
  resumeFileName: 'Ritwick_Johari_Resume.pdf',
} as const;

export const socials: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/https-ritwick',
    handle: 'github.com/https-ritwick',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ritwick-johari',
    handle: 'linkedin.com/in/ritwick-johari',
    icon: 'linkedin',
  },
];

export const education: Education[] = [
  {
    institution: 'Guru Gobind Singh Indraprastha University',
    school: 'University School of Automation and Robotics',
    credential: 'B.Tech, Artificial Intelligence & Data Science',
    period: '2022 – 2026',
    detail: 'CGPA 8.3 / 10',
  },
  {
    institution: 'Ahlcon International School, Delhi',
    credential: 'CBSE Class XII & Class X',
    period: '2019 – 2022',
    detail: '85% in both',
  },
];

/** Header navigation, in page order. `id` must match the section element id. */
export const navigation = [
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'research', label: 'Research' },
  { id: 'awards', label: 'Awards' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
] as const;
