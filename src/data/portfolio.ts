export const portfolioData = {
  name: '[YOUR NAME]',
  email: 'muhammadali.7891014@gmail.com',
  city: '[YOUR CITY]',
  bio: 'I build intelligent systems, immersive digital experiences, and scalable software.',
  shortBio:
    'AI / Software Engineer passionate about building the future through code, design, and innovation.',
  social: {
    github: 'https://github.com/Abdullahshaz70',
    linkedin: 'https://linkedin.com/in/[YOUR-LINKEDIN]',
    email: 'mailto:muhammadali.7891014@gmail.com',
  },
};

export const skills = {
  languages: [
    { name: 'TypeScript', level: 95 },
    { name: 'Python', level: 90 },
    { name: 'JavaScript', level: 95 },
    { name: 'C++', level: 80 },
    { name: 'SQL', level: 85 },
  ],
  frontend: [
    { name: 'React', level: 95 },
    { name: 'Next.js', level: 95 },
    { name: 'Tailwind CSS', level: 90 },
    { name: 'Framer Motion', level: 85 },
    { name: 'Three.js', level: 80 },
  ],
  backend: [
    { name: 'Node.js', level: 90 },
    { name: 'Firebase', level: 85 },
    { name: 'REST APIs', level: 90 },
    { name: 'GraphQL', level: 75 },
  ],
  ai: [
    { name: 'PyTorch', level: 85 },
    { name: 'TensorFlow', level: 80 },
    { name: 'Generative AI', level: 85 },
    { name: 'Computer Vision', level: 80 },
    { name: 'NLP', level: 75 },
  ],
  tools: [
    { name: 'Git / GitHub', level: 95 },
    { name: 'Docker', level: 80 },
    { name: 'Linux', level: 85 },
    { name: 'VS Code', level: 95 },
  ],
};

export const projects = [
  {
    id: 1,
    name: '[PROJECT NAME]',
    description: 'A brief description of the project and its impact.',
    problem: 'The challenge or problem this project solved.',
    solution: 'How you approached and solved the problem.',
    image: '/projects/project-1.jpg',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/Abdullahshaz70',
    live: 'https://example.com',
    featured: true,
  },
  {
    id: 2,
    name: '[PROJECT NAME]',
    description: 'Description of second project.',
    problem: 'Problem statement.',
    solution: 'Solution approach.',
    image: '/projects/project-2.jpg',
    technologies: ['Next.js', 'Three.js', 'GSAP'],
    github: 'https://github.com/Abdullahshaz70',
    live: 'https://example.com',
    featured: false,
  },
  {
    id: 3,
    name: '[PROJECT NAME]',
    description: 'Description of third project.',
    problem: 'Problem statement.',
    solution: 'Solution approach.',
    image: '/projects/project-3.jpg',
    technologies: ['Python', 'PyTorch', 'FastAPI'],
    github: 'https://github.com/Abdullahshaz70',
    live: null,
    featured: false,
  },
];

export const experience = [
  {
    id: 1,
    year: '2024 - Present',
    title: '[COMPANY/PROJECT]',
    role: '[YOUR ROLE]',
    description:
      'What you did, technologies used, and impact. Keep it concise and results-focused.',
    type: 'work',
  },
  {
    id: 2,
    year: '2023',
    title: '[PROJECT/ACHIEVEMENT]',
    role: '[ACHIEVEMENT TYPE]',
    description: 'Major accomplishment or project milestone.',
    type: 'project',
  },
  {
    id: 3,
    year: '2022',
    title: '[EDUCATION/MILESTONE]',
    role: '[ROLE/CERTIFICATION]',
    description: 'Education or major milestone in your journey.',
    type: 'education',
  },
];

export const stats = [
  { label: 'Projects Built', value: '12+', icon: '📦' },
  { label: 'Years Experience', value: '3+', icon: '⏱️' },
  { label: 'Open Source Repos', value: '8+', icon: '🔓' },
  { label: 'Technologies', value: '20+', icon: '🛠️' },
];
