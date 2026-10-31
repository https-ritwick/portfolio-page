/** Technical skills, grouped by discipline. Only technologies listed on the resume. */

export interface SkillGroup {
  label: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Generative & agentic AI',
    skills: ['LLMs', 'RAG', 'Agentic AI', 'Multi-agent systems', 'IBM watsonx (Granite)', 'Prompt engineering', 'NLP'],
  },
  {
    label: 'Machine learning & vision',
    skills: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'OpenCV', 'YOLO', 'Deep learning', 'Computer vision'],
  },
  {
    label: 'Languages',
    skills: ['Python', 'SQL', 'Java', 'C / C++', 'JavaScript', 'Go', 'HTML / CSS'],
  },
  {
    label: 'Application development',
    skills: ['Angular', 'React', 'Node.js', 'Firebase'],
  },
  {
    label: 'Data & big data',
    skills: ['Apache Spark', 'PySpark', 'Spark SQL', 'Databricks', 'Kafka', 'Hadoop', 'Hive', 'Pandas', 'NumPy', 'Power BI'],
  },
  {
    label: 'Databases',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase'],
  },
  {
    label: 'Cloud & tools',
    skills: ['AWS', 'Google Cloud Platform', 'Microsoft Azure', 'Docker', 'Git & GitHub', 'JIRA', 'Postman'],
  },
  {
    label: 'Engineering practice',
    skills: ['Data structures & algorithms', 'OOP', 'System design', 'Agile / Scrum', 'Technical writing'],
  },
];
