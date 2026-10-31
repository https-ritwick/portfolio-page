/** Leadership & community roles, most recent first. */

export interface LeadershipRole {
  title: string;
  organization: string;
  period: string;
  description?: string;
  metric?: { value: string; label: string };
}

export const leadership: LeadershipRole[] = [
  {
    title: 'College President',
    organization: 'Student Council, GGSIPU',
    period: '2025 – 2026',
    description:
      'Led university-level student governance: coordinating with the institution, representing the student body and driving student-welfare initiatives.',
  },
  {
    title: 'Head Coordinator',
    organization: 'Smart India Hackathon 2024, Internal Hackathon, GGSIPU',
    period: '2024',
    description:
      'Ran the internal round of Smart India Hackathon end to end, from team coordination to event operations on the day.',
    metric: { value: '1110+', label: 'participants' },
  },
  {
    title: 'Secretary',
    organization: 'Ek Bharat Shreshtha Bharat – Viksit Bharat Club, GGSIPU',
    period: '2023 – 2024',
  },
  {
    title: 'Joint Secretary',
    organization: 'IEEE-USAR Chapter',
    period: '2023 – 2024',
    description:
      'Coordinated technical events, hackathons and workshops, and grew student engagement within the IEEE community.',
  },
];
