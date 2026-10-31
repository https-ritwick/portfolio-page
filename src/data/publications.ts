/** Research publications. Authors are listed in published order; `self` marks the site owner. */

export interface Publication {
  title: string;
  authors: { name: string; self?: boolean }[];
  venue: string;
  venueShort: string;
  host: string;
  year: number;
  url?: string;
  linkLabel?: string;
  summary: string;
  keywords: string[];
}

export const publications: Publication[] = [
  {
    title:
      'FusionSight-YOLO: A Modified YOLOv8 Architecture with Multi-Channel Input Fusion for UAV-Based Object Detection',
    authors: [
      { name: 'Johari, R.', self: true },
      { name: 'Joshi, M.' },
      { name: 'Singh, A.P.' },
      { name: 'Arora, A.' },
    ],
    venue: 'International Conference on Emerging Trends in Autonomous Aerial Vehicles',
    venueShort: 'ETAAV 2025',
    host: 'IISc Bangalore',
    year: 2025,
    url: 'https://ieeexplore.ieee.org/document/11213298',
    linkLabel: 'IEEE Xplore · 11213298',
    summary:
      'Proposes a modification to the YOLOv8 detector that fuses multiple input channels for object detection in UAV imagery. The model was trained and evaluated on UAV data, with real-time monitoring and transport safety as target applications.',
    keywords: ['YOLOv8', 'Multi-channel fusion', 'UAV imagery', 'Object detection'],
  },
];
