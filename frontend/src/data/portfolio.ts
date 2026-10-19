/**
 * Central portfolio data — PARTH — THE SERIES
 * A cinematic, streaming-inspired portfolio for Parth Mishra:
 * AI / ML Engineer & Full-Stack Systems Specialist (VIT Bhopal Batch 2027 | 8.67 CGPA).
 */

export type Palette = { from: string; via: string; to: string; accent: string };

export const profile = {
  fullName: 'Parth Mishra',
  displayName: 'Parth Mishra',
  firstName: 'PARTH',
  seriesTag: 'THE SERIES',
  /** Fictional studio card shown at the very start of the opening sequence. */
  originalLabel: 'A MISHRA ORIGINAL',
  role: 'AI & Machine Learning Engineer | Full-Stack Systems',
  tagline: ['Agentic AI', 'Vector Search & LLMs', 'Full-Stack Systems', 'VIT Bhopal (8.67 CGPA)'],
  intro:
    'A Computer Science Engineering student specializing in AI & Machine Learning at VIT Bhopal University (CGPA 8.67). Building low-latency AI architectures, in-memory HNSW vector search engines, and resilient full-stack systems with Python, FastAPI, React, TypeScript, and Docker.',
  location: 'Kanpur, UP • Bhopal, MP, India',
  email: 'parthmishra9942@gmail.com',
  links: {
    linkedin: 'https://linkedin.com/in/parth-mishra-4b7578242',
    github: 'https://github.com/parthmishra9942',
  },
  resumePdf: '/assets/Parth_Mishra_Resume.pdf',
  portrait: {
    src: '/assets/portrait-720.webp',
    srcSet: '/assets/portrait-420.webp 420w, /assets/portrait-720.webp 720w, /assets/portrait-1100.webp 1100w',
    alt: 'Portrait of Parth Mishra',
  },
  interests: ['Autonomous Agent Swarms', 'Vector Databases (HNSW)', 'Deterministic Low-Latency Systems'],
};

export const education = [
  {
    school: 'VIT Bhopal University',
    place: 'Bhopal, MP',
    degree: 'Bachelor of Technology — Computer Science & Engineering (AI/ML)',
    period: '2023 – 2027',
    score: 'CGPA 8.67',
  },
  {
    school: 'Senior Secondary Schooling',
    place: 'Kanpur, Uttar Pradesh',
    degree: 'CBSE — Computer Science, Mathematics & Physics',
    period: '2021 – 2023',
    score: 'First Division with Distinction',
  },
];

export const experience = [
  {
    company: 'Forge Autonomous Lab',
    role: 'Lead Systems & AI Developer',
    place: 'Autonomous Fleet',
    period: '2025 – Present',
    points: [
      'Architected and deployed Forge Mission Control: a real-time autonomous coordinator orchestrating multi-stream job scrapers, deduplication engines, and cold email dispatchers.',
      'Designed a zero-auth streaming ingestion pipeline processing 200+ opportunities across Internshala, Remotive, and Jobicy with sub-100ms SQLite persistence.',
      'Implemented real-time bi-directional telemetry with FastAPI and WebSockets, delivering sub-second log streaming and automated candidate dossier generation.',
    ],
  },
];

export type Metric = { value: string; label: string };

export type Project = {
  id: string;
  title: string;
  year: string;
  genre: string;
  logline: string;
  stack: string[];
  build: string[];
  features: string[];
  metrics: Metric[];
  github?: string;
  live?: string;
  posterImage?: string;
  previewGif?: string;
  palette: Palette;
  motif: 'shield' | 'flow' | 'tenants';
};

export const projects: Project[] = [
  {
    id: 'vectordb',
    title: 'VectorDB (HNSW)',
    year: '2026',
    genre: 'Systems • AI Search • Algorithms',
    logline: 'An in-memory vector database built from scratch in Python with Hierarchical Navigable Small World (HNSW) graph indexing.',
    stack: ['Python', 'HNSW', 'Cosine Similarity', 'Vector Embeddings', 'FastAPI'],
    build: [
      'Engineered an in-memory vector database from first principles in Python, implementing multi-layer HNSW graph indexing delivering sub-15ms vector retrieval with a 38x speedup over brute-force linear search.',
      'Implemented normalized cosine similarity, Euclidean distance, and dot product metrics with dynamic entry point navigation and heuristic graph pruning.',
    ],
    features: [
      'Multi-layer HNSW graph indexing',
      'Sub-15ms approximate nearest neighbor (ANN) retrieval',
      'Configurable distance metrics (Cosine, Euclidean, Dot Product)',
      'Zero-dependency standalone core engine with clean REST APIs',
    ],
    metrics: [
      { value: '38×', label: 'speedup over brute-force search' },
      { value: '<15ms', label: 'vector retrieval latency' },
      { value: '100%', label: 'built from scratch in Python' },
      { value: '0', label: 'third-party vector library dependencies' },
    ],
    github: 'https://github.com/parthmishra9942/vectordb-python',
    posterImage: '/assets/projects/vectordb-poster.jpg',
    previewGif: '/assets/projects/vectordb-demo.gif',
    palette: { from: '#2a0610', via: '#7a0f24', to: '#0b0710', accent: '#ff3d5a' },
    motif: 'shield',
  },
  {
    id: 'voicecart',
    title: 'VoiceCart',
    year: '2026',
    genre: 'Client-Side AI • Speech NLU • PWA',
    logline: 'A 100% on-device voice shopping assistant running fully client-side with deterministic rule-based NLU and zero telemetry.',
    stack: ['Web Speech API', 'React', 'TypeScript', 'IndexedDB', 'Tailwind CSS'],
    build: [
      'Engineered a 100% on-device voice shopping assistant operating with zero cloud telemetry, utilizing browser-native Web Speech recognition and deterministic rule-based NLU parsing.',
      'Implemented IndexedDB persistence and optimistic state reconciliation, allowing instant offline grocery list compilation and sub-50ms voice command feedback.',
    ],
    features: [
      '100% on-device deterministic NLU voice engine',
      'Zero cloud dependencies and zero data telemetry',
      'Offline-first Progressive Web App (PWA) with IndexedDB',
      'Sub-50ms voice command-to-cart latency',
    ],
    metrics: [
      { value: '0ms', label: 'cloud network latency' },
      { value: '100%', label: 'offline capable PWA' },
      { value: '0', label: 'user data tracked or sent to servers' },
      { value: '<50ms', label: 'command execution response' },
    ],
    github: 'https://github.com/parthmishra9942/voicecart',
    posterImage: '/assets/projects/voicecart-poster.jpg',
    previewGif: '/assets/projects/voicecart-demo.gif',
    palette: { from: '#1a0d02', via: '#8a4a07', to: '#0a0806', accent: '#ffb547' },
    motif: 'flow',
  },
  {
    id: 'aimealtracker',
    title: 'AIMealTracker',
    year: '2026',
    genre: 'Vision AI • LLMs • HealthTech',
    logline: 'Real-time multi-modal food macro analyzer using Claude 3.5 Sonnet to parse nuanced colloquial Indian home-cooked meals.',
    stack: ['Claude 3.5 Sonnet', 'Vision AI', 'FastAPI', 'React', 'PostgreSQL'],
    build: [
      'Built a multi-modal meal nutritional analyzer leveraging Claude 3.5 Sonnet Vision to identify and extract macro breakdown from colloquial Indian dishes with 94% parsing accuracy.',
      'Integrated FastAPI backend caching with sub-800ms response time and comprehensive micronutrient visual dashboards in React.',
    ],
    features: [
      'Vision-based multi-entity colloquial food detection',
      'Claude 3.5 Sonnet structured JSON extraction',
      'Sub-800ms parsing turnaround via async caching',
      'Dynamic macro & micronutrient tracking dashboard',
    ],
    metrics: [
      { value: '94%', label: 'nutritional parsing accuracy' },
      { value: '<800ms', label: 'turnaround extraction latency' },
      { value: '150+', label: 'Indian regional recipes benchmarked' },
      { value: '4-in-1', label: 'protein, carb, fat & calorie tracking' },
    ],
    github: 'https://github.com/parthmishra9942/Ai-Meal-Tracker',
    posterImage: '/assets/projects/aimealtracker-poster.jpg',
    previewGif: '/assets/projects/aimealtracker-demo.gif',
    palette: { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' },
    motif: 'tenants',
  },
  {
    id: 'antigravity-fleet',
    title: 'Antigravity Job Fleet',
    year: '2026',
    genre: 'Multi-Agent • Systems Automation • DevOps',
    logline: 'An autonomous 4-agent fleet orchestrating scraping, resume auto-routing, and live SMTP outreach with zero-auth safeguards.',
    stack: ['Python', 'FastAPI', 'Uvicorn', 'Playwright', 'SQLite', 'Jina Reader'],
    build: [
      'Architected an autonomous 4-agent fleet coordinating Scout, Job Reader, CV Adapter, and Dispatcher modules to process software engineering roles with 100% account safety.',
      'Engineered an O(1) transcript synchronization engine parsing 5,000+ conversation turns in under 70ms and streaming real-time status to a Cyberpunk-styled Mission Control.',
    ],
    features: [
      '4 decoupled autonomous worker agents',
      'Zero-Auth Jina Reader web scraper with deduplication',
      'Live Chat Pulse dashboard with real-time WebSocket sync',
      '198+ verified applications tracked across portals & SMTP',
    ],
    metrics: [
      { value: '198+', label: 'tracked applications managed' },
      { value: '0.07s', label: 'session replay & transcript seek' },
      { value: '100%', label: 'anti-spam & anti-duplicate safe' },
      { value: '0', label: 'account flags or restrictions' },
    ],
    github: 'https://github.com/parthmishra9942/my-job-search',
    posterImage: '/assets/projects/forge-demo.gif',
    previewGif: '/assets/projects/forge-demo.gif',
    palette: { from: '#120822', via: '#3d1a6e', to: '#07060c', accent: '#b98bff' },
    motif: 'shield',
  },
];

export type Achievement = {
  id: string;
  title: string;
  org: string;
  detail: string;
  laurel: string;
  link?: string;
};

export const achievements: Achievement[] = [
  {
    id: 'oracle-agentic-ai',
    title: 'Oracle Certified Agentic AI',
    org: 'Oracle University (ID: 103546830AAI26OFA)',
    detail: 'Certified Foundations Associate in Agentic AI (September 2026) — Autonomous agent workflows, multi-agent reasoning, and orchestration.',
    laurel: 'Industry Certified',
    link: '/assets/certificates/Oracle_Agentic_AI_Parth_Mishra.pdf',
  },
  {
    id: 'competitive-coding',
    title: '250+ Problems Solved',
    org: 'LeetCode • GeeksforGeeks • HackerRank',
    detail: 'Solved 250+ algorithmic problems across Data Structures & Algorithms (Two Pointers, Graphs, Dynamic Programming, Trees).',
    laurel: 'Algorithmic Grit',
    link: 'https://leetcode.com/u/parth213g',
  },
  {
    id: 'academic-standing',
    title: '8.67 CGPA',
    org: 'VIT Bhopal University',
    detail: 'Top percentile academic standing in B.Tech Computer Science & Engineering (AI/ML specialization).',
    laurel: 'Academic Excellence',
    link: '/assets/Parth_Mishra_Resume.pdf',
  },
  {
    id: 'harvard-cs50-ai',
    title: 'CS50 AI with Python',
    org: 'Harvard University (CS50)',
    detail: 'Completed rigorous curriculum covering Graph Search, Reinforcement Learning, Neural Networks, and NLP. Verified credential.',
    laurel: 'Harvard Credential',
    link: 'https://cs50.harvard.edu/certificates/3e7e245a-5d02-4e80-ac1f-375fd52c3581',
  },
  {
    id: 'umichigan-ml',
    title: 'Applied Machine Learning',
    org: 'University of Michigan (Coursera)',
    detail: 'Advanced evaluation metrics, scikit-learn pipelines, model regularization, and supervised/unsupervised architectures. Verified credential.',
    laurel: 'University of Michigan',
    link: 'https://www.coursera.org/verify/G1Q6ZYPKPWP4',
  },
];

export type Certification = { issuer: string; name: string; link: string; credentialId?: string };

export const certifications: Certification[] = [
  { issuer: 'Oracle', name: 'Oracle Certified Foundations Associate – Agentic AI', link: '/assets/certificates/Oracle_Agentic_AI_Parth_Mishra.pdf', credentialId: '103546830AAI26OFA' },
  { issuer: 'Harvard', name: "CS50's Introduction to Artificial Intelligence with Python", link: 'https://cs50.harvard.edu/certificates/3e7e245a-5d02-4e80-ac1f-375fd52c3581', credentialId: '3e7e245a-5d02-4e80-ac1f-375fd52c3581' },
  { issuer: 'UMichigan', name: 'Applied Machine Learning in Python (Coursera)', link: 'https://www.coursera.org/verify/G1Q6ZYPKPWP4', credentialId: 'G1Q6ZYPKPWP4' },
  { issuer: 'LeetCode', name: '250+ Solved Algorithmic Badge & Profile', link: 'https://leetcode.com/u/parth213g' },
  { issuer: 'HackerRank', name: 'Problem Solving & Python Gold Badges', link: 'https://www.hackerrank.com/profile/parthmishra9942' },
  { issuer: 'VIT Bhopal', name: 'B.Tech CSE (AI/ML) – 8.67 CGPA Honor Roll & Resume', link: '/assets/Parth_Mishra_Resume.pdf' },
];

export type Skill = { name: string; mono: string; note?: string };
export type SkillCategory = { id: string; title: string; subtitle: string; skills: Skill[] };

export const skillCategories: SkillCategory[] = [
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    subtitle: 'Agentic AI • Vector Search • LLMs',
    skills: [
      { name: 'Agentic AI', mono: 'Ag', note: 'Oracle Certified' },
      { name: 'LangGraph', mono: 'Lg' },
      { name: 'VectorDB (HNSW)', mono: 'Vc', note: 'Built from scratch' },
      { name: 'RAG Pipelines', mono: 'Rg' },
      { name: 'Claude & Gemini APIs', mono: 'Ll' },
      { name: 'Ollama & Local LLMs', mono: 'Ol' },
      { name: 'PyTorch', mono: 'Pt' },
      { name: 'Prompt Engineering', mono: 'Pe' },
    ],
  },
  {
    id: 'languages',
    title: 'Languages',
    subtitle: 'Core programming languages',
    skills: [
      { name: 'Python', mono: 'Py', note: 'Primary' },
      { name: 'TypeScript', mono: 'Ts' },
      { name: 'JavaScript', mono: 'Js' },
      { name: 'C++', mono: 'C+' },
      { name: 'SQL', mono: 'Sq' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Systems',
    subtitle: 'High-throughput APIs & microservices',
    skills: [
      { name: 'FastAPI', mono: 'Fa', note: 'Primary' },
      { name: 'REST APIs', mono: 'Ap' },
      { name: 'Node.js', mono: 'No' },
      { name: 'Microservices', mono: 'Ms' },
      { name: 'WebSockets', mono: 'Ws' },
      { name: 'Asyncio & Concurrency', mono: 'As' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend & UI',
    subtitle: 'Reactive, fluid & accessible interfaces',
    skills: [
      { name: 'React', mono: 'Re' },
      { name: 'Next.js', mono: 'Nx' },
      { name: 'Tailwind CSS', mono: 'Tw' },
      { name: 'Framer Motion', mono: 'Fm' },
      { name: 'Web Speech API', mono: 'Sp' },
      { name: 'PWA', mono: 'Pw' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases & Storage',
    subtitle: 'Relational, Document & Vector',
    skills: [
      { name: 'PostgreSQL', mono: 'Pg' },
      { name: 'SQLite', mono: 'Sl' },
      { name: 'Vector Databases', mono: 'Vb' },
      { name: 'Redis', mono: 'Rd' },
      { name: 'IndexedDB', mono: 'Id' },
    ],
  },
  {
    id: 'fundamentals',
    title: 'CS Fundamentals',
    subtitle: 'Core engineering bedrock',
    skills: [
      { name: 'DSA (250+ Solved)', mono: 'Ds', note: 'LeetCode' },
      { name: 'System Design', mono: 'Sd' },
      { name: 'Operating Systems', mono: 'Os' },
      { name: 'DBMS', mono: 'Db' },
      { name: 'OOPs', mono: 'Oo' },
      { name: 'Computer Networks', mono: 'Cn' },
    ],
  },
];

export const skillEvidence: Record<string, string[]> = {
  'Agentic AI': ['Oracle Certified Foundations Associate – Agentic AI', 'Antigravity Job Fleet'],
  'VectorDB (HNSW)': ['VectorDB in-memory search from scratch (sub-15ms, 38x speedup)'],
  Python: ['VectorDB', 'Forge Backend', 'CS50 AI with Python'],
  FastAPI: ['AIMealTracker backend', 'Forge Mission Control REST API'],
  React: ['VoiceCart PWA', 'AIMealTracker frontend', 'Forge UI'],
  TypeScript: ['VoiceCart on-device assistant', 'Live Portfolio'],
  'DSA (250+ Solved)': ['LeetCode 250+ problems solved', 'Algorithms & Data Structures'],
  'Claude & Gemini APIs': ['AIMealTracker multi-modal food parsing'],
  PostgreSQL: ['AIMealTracker database', 'Forge backend'],
  'Tailwind CSS': ['Portfolio Series UI', 'Forge Mission Control'],
};

export type Episode = {
  code: string;
  title: string;
  description: string;
  tags: string[];
  runtime: string;
  palette: Palette;
};

export type Season = {
  number: number;
  title: string;
  period: string;
  synopsis: string;
  episodes: Episode[];
};

const crimson: Palette = { from: '#24060b', via: '#6e0d1d', to: '#09070a', accent: '#ff3d5a' };
const amber: Palette = { from: '#1c1003', via: '#6b3c06', to: '#0a0806', accent: '#ffb547' };
const ocean: Palette = { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' };
const violet: Palette = { from: '#120822', via: '#3d1a6e', to: '#07060c', accent: '#b98bff' };
const jade: Palette = { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' };

export const seasons: Season[] = [
  {
    number: 1,
    title: 'The Foundation',
    period: '2021 – 2023',
    synopsis: 'Rigorous preparatory years in Kanpur, UP — building mastery across Mathematics, Physics, and foundational algorithms.',
    episodes: [
      {
        code: 'S01 E01',
        title: 'Roots & Problem Solving',
        description: 'Deep-dive into mathematics, logic, and analytical reasoning in Kanpur, culminating in admission to VIT Bhopal Computer Science (AI/ML).',
        tags: ['Mathematics', 'Core Logic', 'Kanpur'],
        runtime: '2021 – 2023',
        palette: amber,
      },
    ],
  },
  {
    number: 2,
    title: 'Enter: AI & The Algorithmic Grind',
    period: '2023 – 2025',
    synopsis: 'B.Tech CSE in Artificial Intelligence & Machine Learning at VIT Bhopal University, conquering 250+ LeetCode problems.',
    episodes: [
      {
        code: 'S02 E01',
        title: 'The AI Engineer Takes Shape',
        description: 'B.Tech in Artificial Intelligence & Machine Learning at VIT Bhopal University, achieving a standout 8.67 CGPA.',
        tags: ['VIT Bhopal', 'AI/ML', 'CGPA 8.67'],
        runtime: '2023 – Present',
        palette: violet,
      },
      {
        code: 'S02 E02',
        title: 'The 250+ LeetCode Odyssey',
        description: 'Daily grinding through Two Pointers, Dynamic Programming, Graphs, and Tree algorithms on LeetCode and HackerRank.',
        tags: ['250+ LeetCode', 'DSA', 'Problem Solving'],
        runtime: 'Continuous',
        palette: jade,
      },
      {
        code: 'S02 E03',
        title: 'The Harvard & Michigan Credentials',
        description: 'Completed Harvard University CS50 AI with Python and University of Michigan Applied Machine Learning.',
        tags: ['Harvard CS50', 'UMichigan', 'Deep Learning'],
        runtime: 'Certifications',
        palette: crimson,
      },
    ],
  },
  {
    number: 3,
    title: 'Building the Originals',
    period: '2025 – 2026',
    synopsis: 'Engineering flagship systems from first principles — in-memory HNSW vector search, client-side NLU, and agentic workflows.',
    episodes: [
      {
        code: 'S03 E01',
        title: 'Vector Search from First Principles',
        description: 'Built VectorDB from scratch in Python with HNSW indexing, delivering sub-15ms vector queries with a 38x speedup.',
        tags: ['HNSW', 'Vector Search', 'Python'],
        runtime: 'Core Project',
        palette: crimson,
      },
      {
        code: 'S03 E02',
        title: 'VoiceCart: Zero-Latency Client NLU',
        description: 'Built a 100% on-device voice shopping assistant running fully client-side with deterministic rule-based NLU and zero telemetry.',
        tags: ['Web Speech', 'React', 'Offline PWA'],
        runtime: 'Production PWA',
        palette: amber,
      },
      {
        code: 'S03 E03',
        title: 'Oracle Certified Agentic AI',
        description: 'Earned Oracle Certified Foundations Associate in Agentic AI (Sept 2026), mastering autonomous agent swarms and MCP.',
        tags: ['Oracle Certified', 'Agentic AI', 'Autonomous Swarms'],
        runtime: 'Sept 2026',
        palette: ocean,
      },
    ],
  },
  {
    number: 4,
    title: 'The Autonomous Fleet',
    period: '2026 – Present',
    synopsis: 'Deploying real-time multi-agent systems and competing in campus placement drives.',
    episodes: [
      {
        code: 'S04 E01',
        title: 'Antigravity Job Fleet',
        description: 'Built a 4-agent autonomous system managing 198+ job opportunities with live WebSocket telemetry and 0.07s session replay.',
        tags: ['Multi-Agent', 'FastAPI', 'Automation'],
        runtime: 'Active Live',
        palette: violet,
      },
      {
        code: 'S04 E02',
        title: 'Placement Season & Beyond',
        description: 'Tackling Tier-1 engineering opportunities at Deloitte (7.6 LPA), top AI startups, and high-scale tech firms.',
        tags: ['Placements', 'Tier-1 SDE', 'Engineering Impact'],
        runtime: 'Now Streaming',
        palette: jade,
      },
    ],
  },
];

export type TopPick = { label: string; title: string; detail: string; palette: Palette };

export const topPicks: TopPick[] = [
  { label: 'The Flagship Original', title: 'VectorDB (HNSW)', detail: 'Sub-15ms vector retrieval • 38x speedup over brute-force', palette: crimson },
  { label: 'Industry Credential', title: 'Oracle Agentic AI', detail: 'Certified Foundations Associate (Sept 2026)', palette: ocean },
  { label: 'On-Device AI', title: 'VoiceCart', detail: '100% on-device deterministic NLU • Zero telemetry PWA', palette: amber },
  { label: 'Academic Standing', title: '8.67 CGPA', detail: 'B.Tech CSE (AI/ML) @ VIT Bhopal University', palette: violet },
  { label: 'Algorithmic Grit', title: '250+ Solved', detail: 'LeetCode, GFG & HackerRank algorithmic problem solving', palette: jade },
  { label: 'Vision AI System', title: 'AIMealTracker', detail: 'Claude 3.5 Sonnet colloquial Indian meal macro parsing', palette: crimson },
  { label: 'Ivy League Rigor', title: 'Harvard CS50 AI', detail: 'CS50 Introduction to Artificial Intelligence with Python', palette: ocean },
  { label: 'Systems Automation', title: 'Antigravity Fleet', detail: '198+ applications managed with autonomous agent swarms', palette: amber },
  { label: 'Primary Language', title: 'Python & TypeScript', detail: 'High-throughput async backends & reactive modern web', palette: violet },
  { label: 'Ready to Deploy', title: 'Placement Ready', detail: 'Targeting high-impact Software & AI Engineering roles', palette: jade },
];

/** Slides for the "▶ Play Intro" cinematic sequence. */
export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };

export const introSlides: IntroSlide[] = [
  {
    kicker: 'Education & Honors',
    title: 'B.Tech · AI & ML',
    lines: ['VIT Bhopal University (Batch 2023–2027)', 'Academic Standing: CGPA 8.67 / 10.0'],
    chips: ['CGPA 8.67', 'VIT Bhopal', 'Batch 2027'],
  },
  {
    kicker: 'Flagship Systems',
    title: 'Built from First Principles',
    lines: ['VectorDB: in-memory HNSW vector search with sub-15ms latency', 'VoiceCart: 100% on-device voice assistant with zero telemetry', 'AIMealTracker: Claude 3.5 Sonnet colloquial Indian meal analysis'],
    chips: ['HNSW Search', 'Voice NLU', 'Claude 3.5', 'FastAPI'],
  },
  {
    kicker: 'Credentials',
    title: 'Industry & Global Certifications',
    lines: ['Oracle Certified Foundations Associate in Agentic AI (Sept 2026)', 'CS50 AI with Python — Harvard University', 'Applied Machine Learning in Python — University of Michigan'],
    chips: ['Oracle Agentic AI', 'Harvard CS50', 'UMichigan'],
  },
  {
    kicker: 'Algorithmic Rigor',
    title: '250+ Solved',
    lines: ['Active competitive programmer on LeetCode, GFG, and HackerRank', 'Focus on Graphs, Dynamic Programming, Two Pointers, and Trees'],
    chips: ['LeetCode 250+', 'Two Pointers', 'Graphs', 'DP'],
  },
  {
    kicker: 'Autonomous Automation',
    title: 'Antigravity Fleet',
    lines: ['Orchestrating 198+ verified applications with a 4-agent autonomous system', 'O(1) transcript synchronization engine seeking 5,000+ turns in 70ms'],
    chips: ['Multi-Agent', 'Zero-Auth', 'Real-Time Telemetry'],
  },
  {
    kicker: 'Current Mission',
    title: 'Ready to Deploy',
    lines: ['Looking for high-impact Software Engineering & AI/ML opportunities', 'Available for immediate internship & FTE placement'],
    chips: ['SDE', 'AI/ML Engineer', 'Full-Stack'],
  },
];

export type ProfileId = 'parth' | 'recruiter' | 'developer' | 'creative';
export type SectionId = 'about' | 'journey' | 'originals' | 'picks' | 'skills' | 'moments' | 'story';

export const viewerProfiles: {
  id: ProfileId;
  name: string;
  blurb: string;
  color: string;
  order: SectionId[];
}[] = [
  {
    id: 'parth',
    name: 'Parth',
    blurb: 'The full cinematic series in order',
    color: '#e5132b',
    order: ['about', 'journey', 'originals', 'picks', 'skills', 'moments', 'story'],
  },
  {
    id: 'recruiter',
    name: 'Recruiter',
    blurb: 'Resume, 8.67 CGPA, metrics & core stack first',
    color: '#4cc9ff',
    order: ['story', 'moments', 'skills', 'originals', 'about', 'journey', 'picks'],
  },
  {
    id: 'developer',
    name: 'Developer',
    blurb: 'VectorDB HNSW, architecture & GitHub first',
    color: '#46e3a8',
    order: ['originals', 'skills', 'journey', 'moments', 'about', 'picks', 'story'],
  },
  {
    id: 'creative',
    name: 'Founder / Creative',
    blurb: 'Vision, story arc & problem solving first',
    color: '#ffb547',
    order: ['journey', 'picks', 'originals', 'moments', 'about', 'skills', 'story'],
  },
];

export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'About', card: 'About Me', meta: 'The Pilot • VIT Bhopal (8.67 CGPA)', palette: violet },
  journey: { nav: 'Journey', card: 'My Journey', meta: `${seasons.length} Seasons • ${seasons.reduce((n, s) => n + s.episodes.length, 0)} Episodes`, palette: amber },
  originals: { nav: 'Originals', card: 'My Projects', meta: `${projects.length} Flagship Originals • 2026`, palette: crimson },
  picks: { nav: 'Top Picks', card: 'Top Picks', meta: 'Top 10 Highlights & Achievements', palette: jade },
  skills: { nav: 'Skills', card: 'My Skills', meta: `${skillCategories.length} Categories`, palette: ocean },
  moments: { nav: 'Moments', card: 'My Achievements', meta: `${achievements.length} Moments • ${certifications.length} Certifications`, palette: crimson },
  story: { nav: 'Resume', card: 'The Full Story', meta: 'Resume • View & download PDF', palette: violet },
};
