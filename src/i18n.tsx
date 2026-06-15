import { createContext, useContext, useState, ReactNode } from 'react'
import type { Lang } from './data'

type Dict = Record<string, Record<Lang, string>>

const dict: Dict = {
  'nav.work': { pt: 'Projetos', en: 'Work' },
  'nav.about': { pt: 'Sobre', en: 'About' },
  'nav.skills': { pt: 'Skills', en: 'Skills' },
  'nav.experience': { pt: 'Experiência', en: 'Experience' },
  'nav.contact': { pt: 'Contacto', en: 'Contact' },

  'hero.available': { pt: 'Disponível para projetos', en: 'Available for projects' },
  'hero.role': { pt: 'Front-end Developer & Designer', en: 'Front-end Developer & Designer' },
  'hero.sub': {
    pt: 'Construo experiências web rápidas, acessíveis e bonitas — da interface ao deploy. React, TypeScript e um olho atento ao detalhe.',
    en: 'I build web experiences that are fast, accessible and beautiful — from interface to deploy. React, TypeScript and a sharp eye for detail.',
  },
  'hero.cta1': { pt: 'Ver projetos', en: 'View work' },
  'hero.cta2': { pt: 'Baixar CV', en: 'Download CV' },
  'hero.scroll': { pt: 'Scroll', en: 'Scroll' },
  'hero.located': { pt: 'Viana do Castelo, Portugal', en: 'Viana do Castelo, Portugal' },

  'stats.exp': { pt: 'Anos a programar', en: 'Years coding' },
  'stats.projects': { pt: 'Projetos públicos', en: 'Public projects' },
  'stats.stack': { pt: 'Tecnologias', en: 'Technologies' },
  'stats.coffee': { pt: 'Cafés / commit', en: 'Coffee / commit' },

  'work.eyebrow': { pt: 'Trabalho selecionado', en: 'Selected work' },
  'work.title': { pt: 'Projetos', en: 'Work' },
  'work.sub': {
    pt: 'Uma seleção de projetos de desenvolvimento e design — puxados diretamente do meu GitHub e Behance.',
    en: 'A selection of development and design projects — pulled directly from my GitHub and Behance.',
  },
  'work.demo': { pt: 'Demo', en: 'Live' },
  'work.code': { pt: 'Código', en: 'Code' },
  'work.view': { pt: 'Ver no Behance', en: 'View on Behance' },
  'work.all': { pt: 'Todos', en: 'All' },
  'work.dev': { pt: 'Dev', en: 'Dev' },
  'work.design': { pt: 'Design', en: 'Design' },

  'about.eyebrow': { pt: 'Sobre mim', en: 'About me' },
  'about.title': { pt: 'Olá, sou o João.', en: "Hi, I'm João." },
  'about.p1': {
    pt: 'Tenho 23 anos e estudo desenvolvimento front-end há mais de 3 anos. Vivo em Viana do Castelo, Portugal, e gosto de transformar ideias em interfaces que funcionam e encantam.',
    en: "I'm 23 and have been studying front-end development for over 3 years. I live in Viana do Castelo, Portugal, and I love turning ideas into interfaces that work and delight.",
  },
  'about.p2': {
    pt: 'Combino programação com design — passo facilmente do código ao layout no Figma e Behance. Procuro uma oportunidade onde possa criar produtos com cuidado e qualidade.',
    en: 'I blend code with design — moving easily from code to layouts in Figma and Behance. I’m looking for an opportunity to craft products with care and quality.',
  },

  'skills.eyebrow': { pt: 'Capacidades', en: 'Capabilities' },
  'skills.title': { pt: 'Habilidades técnicas', en: 'Technical skills' },
  'skills.tools': { pt: 'Ferramentas & tecnologias', en: 'Tools & technologies' },

  'exp.eyebrow': { pt: 'Percurso', en: 'Journey' },
  'exp.title': { pt: 'Experiência', en: 'Experience' },

  'contact.eyebrow': { pt: 'Vamos falar', en: "Let's talk" },
  'contact.title': { pt: 'Vamos criar algo juntos', en: "Let's build something together" },
  'contact.sub': {
    pt: 'Tens um projeto em mente ou uma vaga? Envia-me uma mensagem — respondo rápido.',
    en: 'Have a project in mind or a role to fill? Send me a message — I reply fast.',
  },
  'contact.name': { pt: 'O teu nome', en: 'Your name' },
  'contact.email': { pt: 'O teu email', en: 'Your email' },
  'contact.message': { pt: 'A tua mensagem', en: 'Your message' },
  'contact.send': { pt: 'Enviar mensagem', en: 'Send message' },
  'contact.or': { pt: 'ou contacta diretamente', en: 'or reach out directly' },
  'contact.sent': { pt: '✓ Mensagem enviada! Obrigado.', en: '✓ Message sent! Thank you.' },
  'contact.config': { pt: 'Configura o teu ID do Formspree no campo oculto.', en: 'Set your Formspree ID in the hidden field.' },
  'contact.error': { pt: 'Erro ao enviar. Tenta novamente.', en: 'Failed to send. Please try again.' },

  'footer.tag': { pt: 'Feito com React, TypeScript & atenção ao detalhe.', en: 'Built with React, TypeScript & attention to detail.' },
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
