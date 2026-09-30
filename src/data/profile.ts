import type { Lang, Localized } from '@/i18n/ui';

/**
 * All portfolio content lives here. Edit this file to update the site —
 * components only handle layout.
 */

export const profile = {
  name: 'Emanuel Umbelino',
  firstName: 'Emanuel',
  lastName: 'Umbelino',
  email: 'umbelino.emanuel@gmail.com',
  location: { pt: 'Rio de Janeiro, Brasil', en: 'Rio de Janeiro, Brazil' } as Localized,
  /** Shows the "open to opportunities" badge in the hero. */
  openToWork: true,
  headline: {
    pt: 'Engenheiro de Software · Full-Stack · Especialista em IA e Automação',
    en: 'Software Engineer · Full-Stack · AI & Automation Specialist',
  } as Localized,
  roles: {
    pt: [
      'Engenheiro de Software',
      'Desenvolvedor Full-Stack',
      'Especialista em IA',
      'Front-End & UX',
    ],
    en: ['Software Engineer', 'Full-Stack Developer', 'AI Specialist', 'Front-End & UX'],
  } as Localized<string[]>,
  intro: {
    pt: 'Engenheiro de software full-stack com mais de 10 anos de experiência, base forte em front-end e UX, e foco em IA aplicada — de agentes de atendimento a desenvolvimento guiado por especificação. Transformo problemas de negócio em produtos claros, rápidos e fáceis de usar.',
    en: 'Full-stack software engineer with 10+ years of experience, a strong front-end and UX foundation, and a focus on applied AI — from customer service agents to spec-driven development. I turn business problems into clear, fast and easy-to-use products.',
  } as Localized,
  cv: {
    pt: '/cv/Emanuel_Umbelino_PT.pdf',
    en: '/cv/Emanuel_Umbelino_EN.pdf',
  } as Localized,
  social: {
    github: 'https://github.com/EmanuelUmbelino',
    linkedin: 'https://www.linkedin.com/in/emanuelumbelino',
  },
  repo: 'https://github.com/EmanuelUmbelino/emanuelumbelino.github.io',
};

/** Companies I worked at, delivering the client projects below. */
export const employers = ['PUC-Rio', 'Vonex.AI'];

export const clients = [
  'Petrobras',
  'Shell',
  'Petronas',
  'CNOOC',
  'Samsung',
  'Carrefour',
  'Jequiti',
  'Consigaz',
  'Fiocruz',
];

export const about = {
  paragraphs: {
    pt: [
      'Programo desde os 15 anos e construo software profissionalmente há mais de 10. Sou full-stack, com uma base forte em front-end, UX e desenvolvimento de interfaces, e hoje me especializo em agentes de IA, automações com LLMs e Spec-Driven Development (SDD) assistido por IA.',
      'Já entreguei sistemas em produção para Petrobras, Shell, Petronas, CNOOC, Samsung e Carrefour. Trabalho 100% remoto desde 2019, com clientes internacionais e em diferentes fusos. Tenho visão de produto: busco entender a necessidade de quem vai usar o sistema para entregar a solução certa — não só a tarefa do backlog.',
    ],
    en: [
      "I've been programming since I was 15 and building software professionally for over 10 years. I'm full-stack with a strong front-end, UX and interface background, and today I specialize in AI agents, LLM-powered automation and AI-assisted Spec-Driven Development (SDD).",
      "I've delivered production systems for Petrobras, Shell, Petronas, CNOOC, Samsung and Carrefour. I've been fully remote since 2019, working across time zones with international clients. I'm product-minded: I focus on understanding what users actually need so I can deliver the right solution — not just the backlog ticket.",
    ],
  } as Localized<string[]>,
  stats: [
    { value: '10+', label: { pt: 'anos de experiência', en: 'years of experience' } },
    { value: '9', label: { pt: 'clientes atendidos', en: 'clients served' } },
    {
      value: '4',
      label: {
        pt: 'gigantes de óleo e gás usam minhas plataformas',
        en: 'oil & gas majors use my platforms',
      },
    },
    {
      value: '24/7',
      label: { pt: 'atendimento automatizado com IA', en: 'AI-automated customer service' },
    },
  ] satisfies { value: string; label: Localized }[],
  facts: [
    {
      label: { pt: 'Localização', en: 'Location' },
      value: { pt: 'Rio de Janeiro · UTC-3', en: 'Rio de Janeiro · UTC-3' },
    },
    {
      label: { pt: 'Atuação', en: 'Work mode' },
      value: { pt: 'Remoto, Brasil e exterior', en: 'Remote, worldwide' },
    },
    {
      label: { pt: 'Foco', en: 'Focus' },
      value: { pt: 'Full-stack, front-end e IA', en: 'Full-stack, front-end & AI' },
    },
    {
      label: { pt: 'Formação', en: 'Education' },
      value: { pt: 'Ciência da Computação · PUC-Rio', en: 'B.Sc. Computer Science · PUC-Rio' },
    },
  ] satisfies { label: Localized; value: Localized }[],
};

export type AiIcon = 'bot' | 'plug' | 'layers' | 'spec';

export const aiHighlights: { icon: AiIcon; title: Localized; text: Localized; tags: string[] }[] = [
  {
    icon: 'bot',
    title: { pt: 'Agentes de atendimento 24/7', en: '24/7 customer service agents' },
    text: {
      pt: 'Fluxos de atendimento automatizados com agentes de IA em uma plataforma omnichannel usada por Samsung, Carrefour e outras marcas — milhares de mensagens por dia, com atendimento completo e personalizado a cada cliente.',
      en: 'Automated support flows powered by AI agents on an omnichannel platform used by Samsung, Carrefour and other brands — thousands of messages a day, with complete and personalized service for each customer.',
    },
    tags: ['AI Agents', 'Omnichannel', 'Automation'],
  },
  {
    icon: 'plug',
    title: { pt: 'Integração com Gemini e OpenAI', en: 'Gemini & OpenAI integration' },
    text: {
      pt: 'Integração das APIs de IA do Google Gemini e da OpenAI (ChatGPT) para automatizar o atendimento ao cliente, com respostas contextualizadas para cada marca e cada conversa.',
      en: 'Integrated Google Gemini and OpenAI (ChatGPT) APIs to automate customer service, with responses tailored to each brand and each conversation.',
    },
    tags: ['Gemini API', 'OpenAI API', 'LLM'],
  },
  {
    icon: 'layers',
    title: { pt: 'RAG & orquestração de prompts', en: 'RAG & prompt orchestration' },
    text: {
      pt: 'Orquestração de prompts e sistemas RAG para que os agentes respondam com base nos dados e no contexto de cada negócio — respostas mais precisas e confiáveis.',
      en: 'Prompt orchestration and RAG systems so agents answer grounded in each business’s data and context — more accurate, reliable responses.',
    },
    tags: ['RAG', 'Prompt Orchestration'],
  },
  {
    icon: 'spec',
    title: {
      pt: 'Spec-Driven Development com Claude',
      en: 'Spec-Driven Development with Claude',
    },
    text: {
      pt: 'Desenvolvimento guiado por especificação e assistido por IA com Claude Code — aplicado nas plataformas para a indústria de petróleo, com mais velocidade sem abrir mão de qualidade e testes.',
      en: 'AI-assisted, spec-driven development with Claude Code — applied to the oil & gas platforms, delivering faster without giving up quality and tests.',
    },
    tags: ['SDD', 'Claude Code', 'Cursor'],
  },
];

export const skills: { group: Localized; items: string[] }[] = [
  {
    group: { pt: 'IA', en: 'AI' },
    items: [
      'Gemini API',
      'OpenAI API',
      'LLM Agents',
      'Prompt Orchestration',
      'RAG',
      'SDD',
      'Claude Code',
      'Cursor',
    ],
  },
  {
    group: { pt: 'Front-End', en: 'Front-End' },
    items: ['Angular', 'React', 'Vue', 'Flutter', 'Vite', 'TanStack Query', 'Tailwind CSS', 'SCSS'],
  },
  {
    group: { pt: 'Back-End', en: 'Back-End' },
    items: ['.NET', 'Node.js', 'Fastify', 'Django', 'Laravel', 'REST APIs', 'Socket.IO'],
  },
  {
    group: { pt: 'Linguagens', en: 'Languages' },
    items: ['TypeScript', 'JavaScript', 'Python', 'C#', 'Dart', 'Java', 'C++'],
  },
  {
    group: { pt: 'Dados & DevOps', en: 'Data & DevOps' },
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Drizzle ORM', 'Docker', 'CI/CD', 'GitHub Actions'],
  },
  {
    group: { pt: 'Testes & Design', en: 'Testing & Design' },
    items: ['Vitest', 'Playwright', 'Testing Library', 'Figma', 'UX/UI', 'Design Thinking'],
  },
];

/** Technologies shown in the scrolling marquee. */
export const marquee = [
  'TypeScript',
  'Angular',
  'React',
  'Vue',
  'Gemini',
  'OpenAI',
  'Claude Code',
  'Node.js',
  'Python',
  '.NET',
  'Flutter',
  'PostgreSQL',
  'Docker',
  'Tailwind CSS',
  'Playwright',
  'Figma',
];

export const experience: {
  company: string;
  context: Localized;
  role: Localized;
  start: Localized;
  end: Localized | null;
  mode: Localized;
  bullets: Localized<string[]>;
  tags: string[];
}[] = [
  {
    company: 'PUC-Rio · GTEP',
    context: { pt: 'Indústria de Petróleo', en: 'Oil & Gas Industry' },
    role: { pt: 'Desenvolvedor Full-Stack', en: 'Full-Stack Developer' },
    start: { pt: 'Nov 2019', en: 'Nov 2019' },
    end: null,
    mode: { pt: 'Remoto', en: 'Remote' },
    bullets: {
      pt: [
        'Plataformas web para processamento e análise de dados de poços de petróleo para Petrobras, Petronas, Shell e CNOOC, em projetos de múltiplos milhões de reais.',
        'Entrega ponta a ponta: prototipação de telas (UX), front-end, backend e banco de dados, com interfaces limpas, dinâmicas e instruções claras de uso.',
        'Uso de Claude com Spec-Driven Development (SDD) para acelerar o desenvolvimento das plataformas, além da automação de CI/CD com Docker.',
      ],
      en: [
        'Web platforms for well data processing and analysis for Petrobras, Petronas, Shell and CNOOC, in multi-million (BRL) projects.',
        'End-to-end ownership: UX prototyping, front-end, backend and database, with clean, dynamic interfaces and clear user guidance.',
        'Adopted Claude with Spec-Driven Development (SDD) to speed up platform development, and automated CI/CD pipelines with Docker.',
      ],
    },
    tags: ['Full-Stack', 'UX', 'SDD', 'Claude Code', 'Docker', 'CI/CD'],
  },
  {
    company: 'Vonex.AI',
    context: { pt: 'SAC com IA e Automações', en: 'AI Customer Service & Automation' },
    role: {
      pt: 'Especialista em IA & Front-End Sênior · Líder de Front-End',
      en: 'AI Specialist & Senior Front-End Engineer · Front-End Lead',
    },
    start: { pt: 'Ago 2022', en: 'Aug 2022' },
    end: { pt: 'Set 2026', en: 'Sep 2026' },
    mode: { pt: 'Remoto', en: 'Remote' },
    bullets: {
      pt: [
        'Plataforma de atendimento omnichannel com IA para Samsung, Carrefour, Jequiti, Consigaz e outras empresas, com milhares de mensagens diárias.',
        'Integração das APIs do Google Gemini e da OpenAI (ChatGPT) em fluxos de atendimento 24/7 com agentes de IA, para um atendimento completo e personalizado a cada cliente.',
        'Disparo de campanhas publicitárias com milhares de envios.',
        'Liderança do time de front-end por um período.',
      ],
      en: [
        'Omnichannel customer service platform with AI for Samsung, Carrefour, Jequiti, Consigaz and others, handling thousands of messages daily.',
        'Integrated Google Gemini and OpenAI (ChatGPT) APIs into 24/7 automated support flows with AI agents, delivering complete and personalized service to each customer.',
        'Delivered advertising campaign dispatch with thousands of sends.',
        'Led the front-end team for a period.',
      ],
    },
    tags: ['Gemini API', 'OpenAI API', 'AI Agents', 'Front-End', 'Leadership'],
  },
  {
    company: 'IBM',
    context: { pt: 'Indústria de Petróleo', en: 'Oil & Gas Industry' },
    role: { pt: 'Estagiário em Pesquisa UX · Front-End', en: 'UX Research Intern · Front-End' },
    start: { pt: 'Set 2018', en: 'Sep 2018' },
    end: { pt: 'Out 2019', en: 'Oct 2019' },
    mode: { pt: 'Presencial', en: 'On-site' },
    bullets: {
      pt: [
        'Criação de interfaces, otimização de performance e integração da aplicação web com serviços backend.',
        'Colaboração com especialistas da área para transformar telas desenhadas em uma aplicação funcional.',
      ],
      en: [
        'Built interfaces, optimized performance and integrated the web application with backend services.',
        'Worked with domain specialists to turn designed screens into a functional application.',
      ],
    },
    tags: ['UX Research', 'Front-End', 'Performance'],
  },
];

export const projects: {
  name: string;
  type: Localized;
  period: Localized;
  description: Localized;
  highlights: Localized<string[]>;
  tags: string[];
  live?: string;
  code?: string;
  featured?: boolean;
}[] = [
  {
    name: 'ShopList',
    type: { pt: 'App Mobile & Web', en: 'Mobile & Web App' },
    period: { pt: 'Mai 2026', en: 'May 2026' },
    description: {
      pt: 'App colaborativo de lista de compras: listas compartilhadas por um código de 8 caracteres, sem cadastro, com sincronização em tempo real entre dispositivos.',
      en: 'Collaborative shopping list app: lists shared by an 8-character code, no sign-up, with real-time sync across devices.',
    },
    highlights: {
      pt: [
        'PWA instalável com resiliência offline, dark mode e i18n (PT, EN, ES)',
        'API REST com Swagger, rate limiting, jobs agendados e dashboard de uso',
        'Testes unitários, de integração e E2E; CI/CD com GitHub Actions e Docker',
      ],
      en: [
        'Installable PWA with offline resilience, dark mode and i18n (PT, EN, ES)',
        'REST API with Swagger, rate limiting, scheduled jobs and a usage dashboard',
        'Unit, integration and E2E tests; CI/CD with GitHub Actions and Docker',
      ],
    },
    tags: ['PWA', 'WebSocket', 'REST', 'Docker', 'GitHub Actions', 'Railway'],
    live: 'https://shop-list.up.railway.app/',
    featured: true,
  },
  {
    name: 'SAGIL',
    type: { pt: 'App Mobile · IoT', en: 'Mobile App · IoT' },
    period: { pt: 'Jul – Out 2024', en: 'Jul – Oct 2024' },
    description: {
      pt: 'Front-end de um app IoT para refrigeradores médicos: cadastro, configuração, conexão à rede e integração com dashboard e controlador para monitorar a temperatura.',
      en: 'Front-end of an IoT app for medical refrigerators: register, configure and connect devices, integrated with a dashboard and controller for temperature monitoring.',
    },
    highlights: { pt: [], en: [] },
    tags: ['Mobile', 'IoT', 'Front-End'],
  },
  {
    name: 'Leite Sobre Rodas',
    type: { pt: 'App Mobile & Web · Fiocruz', en: 'Mobile & Web App · Fiocruz' },
    period: { pt: 'Set 2018 – Nov 2019', en: 'Sep 2018 – Nov 2019' },
    description: {
      pt: 'App que gerencia todo o fluxo de doação de leite materno, conectando doadoras a um hospital, com módulo estilo delivery com GPS e otimização de rotas para a coleta.',
      en: 'App managing the full breast milk donation flow, connecting donors to a hospital, with a delivery-style module using GPS and route optimization for pickups.',
    },
    highlights: { pt: [], en: [] },
    tags: ['Mobile', 'GPS', 'Route Optimization', 'Health'],
  },
  {
    name: 'Portfolio',
    type: { pt: 'Este site', en: 'This website' },
    period: { pt: 'Set 2026', en: 'Sep 2026' },
    description: {
      pt: 'Site estático bilíngue, rápido e acessível, com CI/CD no GitHub Actions: lint, type-check, testes E2E com Playwright e deploy automático no GitHub Pages.',
      en: 'Fast, accessible, bilingual static site with CI/CD on GitHub Actions: lint, type-check, Playwright E2E tests and automatic deploy to GitHub Pages.',
    },
    highlights: { pt: [], en: [] },
    tags: ['Astro', 'Tailwind CSS', 'TypeScript', 'Playwright', 'GitHub Actions'],
    code: 'https://github.com/EmanuelUmbelino/emanuelumbelino.github.io',
  },
];

/**
 * LinkedIn recommendations (excerpts). `translatedFrom` marks quotes that were
 * written in another language, so the page can say it's a translation.
 */
export const testimonials: {
  name: string;
  role: Localized;
  linkedin: string;
  quote: Localized;
  translatedFrom?: Lang;
}[] = [
  {
    name: 'Maria Clara Coimbra',
    role: { pt: 'Product Owner na Vonex.AI', en: 'Product Owner at Vonex.AI' },
    linkedin: 'https://www.linkedin.com/in/maria-clara-coimbra-a416401a4/',
    quote: {
      pt: 'Se eu tivesse que resumir o Emanuel em uma palavra, seria confiança. Sempre soube que, quando uma entrega estava com ele, estaria bem feita, no detalhe e dentro do combinado. O Emanuel tem um olhar muito atento para a experiência de quem usa o sistema.',
      en: 'If I had to sum Emanuel up in one word, it would be trust. I always knew that when a delivery was in his hands, it would be done well, down to the details and as agreed. Emanuel has a very keen eye for the experience of the people using the system.',
    },
    translatedFrom: 'pt',
  },
  {
    name: 'Paulo Lebtag',
    role: {
      pt: 'AI Design Engineer & Product Manager',
      en: 'AI Design Engineer & Product Manager',
    },
    linkedin: 'https://www.linkedin.com/in/paulolebtag/',
    quote: {
      pt: 'O Emanuel combina um alto nível de perfeccionismo técnico com uma visão de produto refinada. Ele não se limita a entregar o código; ele entende o contexto do negócio e questiona decisões para entregar a melhor experiência. É o tipo de profissional que eleva a qualidade de qualquer time ou projeto.',
      en: "Emanuel combines a high level of technical perfectionism with a refined product mindset. He doesn't just deliver code; he truly understands the business context and challenges decisions to deliver the best possible user experience. He is the kind of professional who elevates the quality of any team or project.",
    },
  },
  {
    name: 'Marcus Vinicius Coube',
    role: { pt: 'Senior Frontend Engineer', en: 'Senior Frontend Engineer' },
    linkedin: 'https://www.linkedin.com/in/marcus-coube/',
    quote: {
      pt: 'Além da competência técnica, ele teve um papel importante no apoio à liderança do time, orientando desenvolvedores plenos e juniores com paciência e generosidade. Também se destaca pela organização e pela facilidade com metodologias ágeis, ajudando o time a manter um bom ritmo de entregas.',
      en: "Beyond his technical skills, he played an important role supporting the team's leadership, mentoring mid-level and junior developers with patience and generosity. He also stands out for his organization and ease with agile methodologies, helping the team keep a steady delivery pace.",
    },
    translatedFrom: 'pt',
  },
];

export const education: { school: string; degree: Localized; period: Localized }[] = [
  {
    school: 'PUC-Rio',
    degree: {
      pt: 'Bacharelado em Ciência da Computação',
      en: 'B.Sc. in Computer Science',
    },
    period: { pt: 'Fev 2017 – Jul 2022', en: 'Feb 2017 – Jul 2022' },
  },
  {
    school: 'NAVE · CEJLL',
    degree: {
      pt: 'Técnico em Programação de Jogos Digitais',
      en: 'Technical Degree in Digital Game Programming',
    },
    period: { pt: 'Fev 2014 – Dez 2016', en: 'Feb 2014 – Dec 2016' },
  },
];

export const spokenLanguages: { name: Localized; level: Localized }[] = [
  { name: { pt: 'Português', en: 'Portuguese' }, level: { pt: 'Nativo', en: 'Native' } },
  { name: { pt: 'Inglês', en: 'English' }, level: { pt: 'Avançado', en: 'Advanced' } },
];
