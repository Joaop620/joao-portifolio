import { createContext, useContext, useState, ReactNode } from 'react'
import type { Lang } from './data'

type Dict = Record<string, Record<Lang, string>>

const dict: Dict = {
  'nav.work': { pt: 'Projetos', en: 'Work' },
  'nav.about': { pt: 'Sobre', en: 'About' },
  'nav.skills': { pt: 'Skills', en: 'Skills' },
  'nav.experience': { pt: 'Experiência', en: 'Experience' },
  'nav.contact': { pt: 'Contacto', en: 'Contact' },

  'hero.kicker': { pt: 'Desenvolvedor Front-end', en: 'Front-end Developer' },
  'hero.sub': {
    pt: 'Trabalho com React e TypeScript a construir interfaces simples, rápidas e bem acabadas. Vivo em Viana do Castelo, Portugal.',
    en: 'I work with React and TypeScript, building interfaces that are simple, fast and well crafted. Based in Viana do Castelo, Portugal.',
  },
  'hero.cta1': { pt: 'Ver projetos', en: 'View work' },
  'hero.cta2': { pt: 'Baixar CV', en: 'Download CV' },
  'hero.located': { pt: 'Viana do Castelo, Portugal', en: 'Viana do Castelo, Portugal' },

  'work.eyebrow': { pt: 'Trabalho selecionado', en: 'Selected work' },
  'work.title': { pt: 'Projetos', en: 'Work' },
  'work.sub': { pt: 'Projetos de desenvolvimento e design, do meu GitHub e Behance.', en: 'Development and design projects, from my GitHub and Behance.' },
  'work.demo': { pt: 'Demo', en: 'Live' },
  'work.code': { pt: 'Código', en: 'Code' },
  'work.view': { pt: 'Ver no Behance', en: 'View on Behance' },
  'work.all': { pt: 'Todos', en: 'All' },
  'work.dev': { pt: 'Dev', en: 'Dev' },
  'work.design': { pt: 'Design', en: 'Design' },
  'work.featured': { pt: 'Destaque', en: 'Featured' },

  'about.eyebrow': { pt: 'Sobre mim', en: 'About me' },
  'about.title': { pt: 'Olá, sou o João.', en: "Hi, I'm João." },
  'about.p1': {
    pt: 'Tenho 23 anos e há mais de três anos que estudo e construo para a web. Vivo em Viana do Castelo, Portugal, e gosto de transformar ideias em interfaces que funcionam bem.',
    en: "I'm 23 and have been building for the web for over three years. I live in Viana do Castelo, Portugal, and I enjoy turning ideas into interfaces that actually work.",
  },
  'about.p2': {
    pt: 'Combino programação com design e passo do código ao layout no Figma e no Behance com à vontade. Procuro uma oportunidade para criar produtos com cuidado e qualidade.',
    en: 'I combine code with design and move comfortably between development and layouts in Figma and Behance. I am looking for a chance to build products with care and quality.',
  },

  'skills.eyebrow': { pt: 'Capacidades', en: 'Capabilities' },
  'skills.title': { pt: 'Habilidades técnicas', en: 'Technical skills' },
  'skills.sub': { pt: 'As tecnologias e ferramentas com que trabalho no dia a dia.', en: 'The technologies and tools I work with every day.' },

  'exp.eyebrow': { pt: 'Percurso', en: 'Journey' },
  'exp.title': { pt: 'Experiência', en: 'Experience' },

  'contact.eyebrow': { pt: 'Vamos falar', en: "Let's talk" },
  'contact.title': { pt: 'Vamos criar algo juntos', en: "Let's build something together" },
  'contact.sub': { pt: 'Tens um projeto em mente ou uma vaga? Envia-me uma mensagem, respondo rápido.', en: 'Have a project in mind or a role to fill? Send me a message, I reply fast.' },
  'contact.name': { pt: 'O teu nome', en: 'Your name' },
  'contact.email': { pt: 'O teu email', en: 'Your email' },
  'contact.message': { pt: 'A tua mensagem', en: 'Your message' },
  'contact.send': { pt: 'Enviar mensagem', en: 'Send message' },
  'contact.or': { pt: 'ou contacta diretamente', en: 'or reach out directly' },
  'contact.sent': { pt: 'Mensagem enviada. Obrigado!', en: 'Message sent. Thank you!' },
  'contact.config': { pt: 'Configura o teu ID do Formspree.', en: 'Set your Formspree ID.' },
  'contact.error': { pt: 'Erro ao enviar. Tenta novamente.', en: 'Failed to send. Please try again.' },

  'footer.tag': { pt: 'Feito com React e TypeScript.', en: 'Built with React and TypeScript.' },
  'footer.top': { pt: 'Voltar ao topo', en: 'Back to top' },
}

interface Ctx { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string }
const I18nContext = createContext<Ctx>({ lang: 'pt', setLang: () => {}, t: (k) => k })

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('pt')
  const t = (k: string) => dict[k]?.[lang] ?? k
  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>
}

export const useI18n = () => useContext(I18nContext)
