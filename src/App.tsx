import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useSpring } from 'framer-motion'
import Hero from './components/Hero'
import Services from './components/Services'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import GridBG from './components/GridBG'
import CursorTrail from './components/CursorTrail'

export default function App(){
  const { t, i18n } = useTranslation()
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')
  useEffect(()=>{
    if(theme==='light') document.documentElement.classList.add('light')
    else document.documentElement.classList.remove('light')
    localStorage.setItem('theme', theme)
  },[theme])
  const toggleLang = () => i18n.changeLanguage(i18n.language === 'pt' ? 'en' : 'pt')
  const isPT = i18n.language === 'pt'

  // Scroll progress
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  // Global reveal for .reveal and .reveal-stagger
  useEffect(()=>{
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>('.reveal, .reveal-stagger'))
    const io = new IntersectionObserver((ents)=>{
      ents.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('visible')
          io.unobserve(e.target)
        }
      })
    }, { threshold: .18 })
    revealEls.forEach(el=> io.observe(el))
    return ()=> io.disconnect()
  }, [i18n.language])

  return (
    <div className={theme==='light' ? 'bg-light text-ink' : 'bg-dark text-gold'}>
      <motion.div id="progress" style={{ scaleX }} />
      <GridBG />
      <CursorTrail />
      <header className="fixed right-4 top-4 z-50 flex gap-3">
        <button onClick={()=>setTheme(theme==='light'?'dark':'light')} className="btn">{theme==='light'?'🌙':'☀️'}</button>
        <button onClick={toggleLang} className="btn">{isPT?'🇺🇸':'🇧🇷'}</button>
      </header>

      <Hero />
      <section id="servicos" className="band-darker">
        <div className="container-max py-20">
          <Services />
        </div>
      </section>
      <section id="experiencia" className="band-dark">
        <div className="container-max py-20">
          <Experience />
        </div>
      </section>
      <section id="projetos" className="band-darker">
        <div className="container-max py-20">
          <Projects />
        </div>
      </section>
      <section id="habilidades" className="band-dark">
        <div className="container-max py-20">
          <Skills />
        </div>
      </section>
      <section id="contato" className="band-darker">
        <div className="container-max py-20">
          <Contact />
        </div>
      </section>

      <footer className="border-t border-current">
        <div className="container-max py-8">
          <p>{t('footer')}</p>
        </div>
      </footer>
    </div>
  )
}
