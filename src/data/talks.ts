/** Talks and speaking engagements, most recent first. */

export interface Talk {
  title: string;
  format: string;
  host: string;
  /** Leave undefined if unknown; it is hidden. */
  date?: string;
  summary: string;
  recognition?: string;
}

export const talks: Talk[] = [
  {
    title: 'Generative AI: Behind the Prompts',
    format: 'Speaker session',
    host: 'Keshav Mahavidyalaya, University of Delhi',
    summary:
      'A seminar for students and faculty on how generative AI works: the technology underneath it and where it is being applied in practice.',
    recognition: 'Letter of Appreciation from the college',
  },
];
