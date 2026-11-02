/**
 * Professional experience, most recent first.
 * Leave `start` / `location` undefined if not yet known; they are hidden.
 */

export interface Role {
  id: string;
  organization: string;
  /** Legal entity or business unit, shown as secondary text. */
  entity?: string;
  title: string;
  location?: string;
  start?: string;
  end: string;
  current?: boolean;
  summary?: string;
  highlights?: { title: string; detail: string }[];
  stack?: string[];
}

export const experience: Role[] = [
  {
    id: 'accenture',
    organization: 'Accenture',
    entity: 'Accenture Solutions Private Limited',
    title: 'Advanced App Engineering Associate',
    // Add your office location, a one-line summary and highlights here as they
    // become shareable, e.g. location: 'Gurugram, India'.
    start: 'Aug 2026',
    end: 'Present',
    current: true,
  },
  {
    id: 'exl',
    organization: 'EXL',
    entity: 'EXL Services · IPS',
    title: 'Gen AI & Software Trainee Intern',
    location: 'Noida, India',
    start: 'Sep 2025',
    end: 'Jul 2026',
    summary:
      'Built AI-assisted tooling for the software development lifecycle, working across LLM orchestration, full-stack product development and analytics.',
    highlights: [
      {
        title: 'Agentic SDLC platform.',
        detail:
          'Contributed to a platform that automates parts of the software lifecycle using multi-agent orchestration and RAG-based LLM workflows.',
      },
      {
        title: 'Planning Poker & Sprint Grooming app.',
        detail: 'Developed a collaborative agile-estimation tool with an Angular front end and a Python back end.',
      },
      {
        title: 'Analytics & data automation.',
        detail:
          'Built interactive Power BI dashboards for operational insight; automated data preprocessing in Python over large MySQL Server datasets.',
      },
    ],
    stack: ['Python', 'Angular', 'LLMs', 'RAG', 'Multi-agent systems', 'Power BI', 'MySQL'],
  },
];
