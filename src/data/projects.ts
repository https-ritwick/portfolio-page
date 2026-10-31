/**
 * Featured projects, in display order.
 *
 * Links: only add URLs that exist. Leave `repo` / `demo` / `publication`
 * undefined to hide that link.
 * `diagram` picks the architecture schematic shown under "Architecture".
 */

export type DiagramKind = 'agents' | 'fusion' | 'fog';

export interface Project {
  id: string;
  name: string;
  tagline: string;
  category: string;
  problem: string;
  approach: string;
  built: string[];
  stack: string[];
  /** A documented outcome only — never an invented metric. */
  outcome?: string;
  links: {
    repo?: string;
    demo?: string;
    publication?: string;
  };
  diagram: DiagramKind;
}

export const projects: Project[] = [
  {
    id: 'bloom',
    name: 'BloomAI',
    tagline: 'Multi-agent conversational healthcare assistant',
    category: 'Agentic AI',
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
    links: {
      repo: 'https://github.com/https-ritwick/Bloom-AI',
    },
    diagram: 'agents',
  },
  {
    id: 'fusion',
    name: 'FusionSight-YOLO',
    tagline: 'Object detection in UAV imagery with multi-channel input fusion',
    category: 'Computer vision · Research',
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
    links: {
      repo: 'https://github.com/https-ritwick/IndraEye_Labels',
      publication: 'https://ieeexplore.ieee.org/document/11213298',
    },
    diagram: 'fusion',
  },
  {
    id: 'iotfog',
    name: 'IoT-Fog Health Monitoring',
    tagline: 'Distributed edge–fog–cloud system for real-time patient monitoring',
    category: 'Machine learning · Distributed systems',
    problem: 'Routing every vital-sign reading through the cloud adds latency where medical monitoring can least afford it.',
    approach:
      'A three-tier edge, fog and cloud architecture that processes data close to the patient, with predictive models running on real-time health data.',
    built: [
      'Distributed edge–fog–cloud architecture for low-latency monitoring',
      'Scikit-learn models for diabetes and heart-disease prediction',
      'Real-time health-data processing and predictive analytics',
    ],
    stack: ['Scikit-learn', 'Edge & fog computing', 'Google Cloud'],
    links: {},
    diagram: 'fog',
  },
];
