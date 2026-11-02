/**
 * Achievements & recognition.
 * `tier: 'major'` items are shown large at the top; the rest form the ledger below.
 */

export interface Achievement {
  placement: string;
  event: string;
  organizer?: string;
  tier: 'major' | 'standard';
  note?: string;
  /** Path under public/, e.g. 'certificates/x.pdf'. */
  certificate?: string;
}

export const achievements: Achievement[] = [
  {
    placement: 'Global Top 50',
    event: 'IBM TechXchange 2025 watsonx Hackathon',
    organizer: 'IBM',
    tier: 'major',
    note: 'Agentic AI',
  },
  {
    placement: 'Winner',
    event: 'BuildWithDelhi Hackathon',
    tier: 'major',
  },
  {
    placement: 'Winner',
    event: 'Codex Hackathon',
    organizer: 'GGSIPU',
    tier: 'major',
  },
  {
    placement: '3rd Place',
    event: 'ETAAV Challenge 2025',
    organizer: 'IISc Bangalore',
    tier: 'standard',
    note: 'UAV EO-IR slant-angle object detection',
    certificate: 'certificates/etaav-2025-third-place.pdf',
  },
  {
    placement: '3rd Place',
    event: 'Vespera Hackathon',
    organizer: 'AWS & Intel',
    tier: 'standard',
  },
  {
    placement: '5th Place',
    event: 'Vigyan Hackathon',
    organizer: 'AIC GGSIPU',
    tier: 'standard',
  },
];
