export type Lang = 'pt' | 'en'

export interface Project {
  title: string
  desc: Record<Lang, string>
  tags: string[]
  demo?: string
  code?: string
  source: 'github' | 'behance'
  language?: string
  year?: string
  cover?: string
  accent?: string
  featured?: boolean
}

/* Real projects pulled from github.com/Joaop620 and behance.net/joaop620 */
export const projects: Project[] = [
  {
    title: 'Social Media — Juá Agency',
    desc: {
      pt: 'Carrosséis de social media para a Juá Agency: posts de dicas, carrossel de portfólio e identidade visual consistente. Design focado em hierarquia, ritmo e chamada para ação.',
      en: 'Social media carousels for Juá Agency: tips posts, portfolio carousel and consistent visual identity. Design focused on hierarchy, rhythm and clear call-to-action.',
    },
    tags: ['Branding', 'Social Media', 'Layout', 'Tipografia'],
    demo: 'https://www.behance.net/gallery/250335363/Social-Media-Jua-Agency-Carrossis',
    source: 'behance',
    year: '2025',
    cover: '/projects/jua.webp',
    accent: '#a855f7',
  },
  {
    title: 'Cantinho da Agonia',
    desc: {
      pt: 'Site de reservas diretas para a casa T2 Cantinho da Agonia, em Viana do Castelo. HTML/CSS/JS puro com backend serverless opcional.',
      en: 'Direct-booking site for the T2 house Cantinho da Agonia in Viana do Castelo. Vanilla HTML/CSS/JS with optional serverless backend.',
    },
    tags: ['JavaScript', 'Serverless', 'Booking', 'SEO'],
    demo: 'https://lima-mar.vercel.app',
    code: 'https://github.com/Joaop620/cantinho-da-agonia',
    source: 'github',
    language: 'JavaScript',
    year: '2025',
    cover: '/projects/cantinho.webp',
    accent: '#c9a227',
    featured: true,
  },
  {
    title: 'Lua — Design Portfolio',
    desc: {
      pt: 'Site portfólio criado para uma Designer, com temas claro/escuro e foco em apresentação de trabalho criativo.',
      en: 'Portfolio site built for a Designer, with light/dark themes and a focus on showcasing creative work.',
    },
    tags: ['React', 'TypeScript', 'Vite'],
    demo: 'https://lua-design-portfolio.vercel.app',
    code: 'https://github.com/Joaop620/lua-design-portfolio',
    source: 'github',
    language: 'TypeScript',
    year: '2024',
    cover: '/projects/lua.webp',
    accent: '#ec4899',
  },
  {
    title: 'Organograma Familiar',
    desc: {
      pt: 'Organograma interativo feito para organização familiar, com foco em usabilidade e clareza visual.',
      en: 'Interactive org chart built for family organization, focused on usability and visual clarity.',
    },
    tags: ['JavaScript', 'UI', 'Dataviz'],
    demo: 'https://organo-familiar.vercel.app',
    code: 'https://github.com/Joaop620/OrganoFamiliar',
    source: 'github',
    language: 'JavaScript',
    year: '2024',
    cover: '/projects/organo.webp',
    accent: '#3b82f6',
  },
  {
    title: 'Calculadora Angular',
    desc: {
      pt: 'Primeiro projeto feito em Angular — exploração de componentes, binding e arquitetura do framework.',
      en: 'First project built with Angular — exploring components, binding and the framework architecture.',
    },
    tags: ['Angular', 'TypeScript'],
    code: 'https://github.com/Joaop620/calculadora-angular',
    source: 'github',
    language: 'TypeScript',
    year: '2024',
    accent: '#dd0031',
  },
  {
    title: 'To-Do List',
    desc: {
      pt: 'Aplicação de tarefas com gestão de estado, filtros e persistência local.',
      en: 'Task app with state management, filters and local persistence.',
    },
    tags: ['JavaScript', 'State', 'UX'],
    code: 'https://github.com/Joaop620/To-Do-List',
    source: 'github',
    language: 'JavaScript',
    year: '2023',
    accent: '#10b981',
  },
]

export interface Tech { name: string; icon: string }

export const techStack: { group: Record<Lang, string>; items: Tech[] }[] = [
  {
    group: { pt: 'Front-end', en: 'Front-end' },
    items: [
      { name: 'React', icon: 'react' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'HTML5', icon: 'html5' },
      { name: 'CSS3', icon: 'css3' },
      { name: 'Angular', icon: 'angular' },
    ],
  },
  {
    group: { pt: 'Estilo & Animação', en: 'Styling & Motion' },
    items: [
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
      { name: 'Sass', icon: 'sass' },
      { name: 'Styled-Components', icon: 'styledcomponents' },
      { name: 'Framer Motion', icon: 'framer' },
    ],
  },
  {
    group: { pt: 'Ferramentas', en: 'Tooling' },
    items: [
      { name: 'Node.js', icon: 'nodedotjs' },
      { name: 'Vite', icon: 'vite' },
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Figma', icon: 'figma' },
      { name: 'Vercel', icon: 'vercel' },
    ],
  },
]

export const tools = [
  'React', 'TypeScript', 'JavaScript', 'Vite', 'Tailwind CSS', 'Framer Motion',
  'Sass', 'Styled-Components', 'Node.js', 'Angular', 'Figma', 'Git', 'Behance', 'Vercel',
]

export interface Job {
  company: string
  period: string
  bullets: Record<Lang, string[]>
}

export const experience: Job[] = [
  {
    company: 'BorgWarner',
    period: '2022 — Atual',
    bullets: {
      pt: [
        'Automação de rotinas e melhoria de UI interna.',
        'Criação de painéis e indicadores para fluxo logístico.',
        'Boas práticas de versionamento com Git.',
      ],
      en: [
        'Routine automation and internal UI improvements.',
        'Built dashboards and KPIs for the logistics flow.',
        'Version-control best practices with Git.',
      ],
    },
  },
  {
    company: 'Coca-Cola',
    period: '2020 — 2022',
    bullets: {
      pt: [
        'Suporte administrativo orientado a dados.',
        'Documentação e padronização de processos.',
        'Trabalho com equipas multidisciplinares.',
      ],
      en: [
        'Data-driven administrative support.',
        'Process documentation and standardization.',
        'Worked with multidisciplinary teams.',
      ],
    },
  },
  {
    company: 'R & M Madeiras',
    period: '2019 — 2020',
    bullets: {
      pt: [
        'Rotinas administrativas e relatórios.',
        'Atendimento a clientes e acompanhamento de KPIs.',
        'Melhorias no fluxo de trabalho.',
      ],
      en: [
        'Administrative routines and reporting.',
        'Customer support and KPI tracking.',
        'Workflow improvements.',
      ],
    },
  },
]

export const links = {
  email: 'joaop620@gmail.com',
  github: 'https://github.com/Joaop620',
  linkedin: 'https://www.linkedin.com/in/jo%C3%A3ocresferreira/',
  behance: 'https://www.behance.net/joaop620',
  cv: '/cv/joao-ferreira-cv.pdf',
}
