import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Particles from './Particles'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero(){
  const { t, i18n } = useTranslation()
  const typeRef = useRef<HTMLParagraphElement>(null)

  useEffect(()=>{
    const full = t('hero.role')
    const el = typeRef.current
    if(!el) return
    const timeouts: number[] = []
    el.textContent = ''
    let i = 0
    const tick = () => {
      if (i < full.length) {
        el.textContent += full.charAt(i++)
        const id = window.setTimeout(tick, 50)
        timeouts.push(id)
      }
    }
    tick()
    return () => { timeouts.forEach(clearTimeout) }
  },[i18n.language])

  useEffect(()=>{
    const container = document.getElementById('lottie-container')
    if(container && (window as any).lottie){
      const anim = (window as any).lottie.loadAnimation({
        container, renderer:'svg', loop:true, autoplay:true,
        path:'https://assets10.lottiefiles.com/packages/lf20_jcikwtux.json'
      })
      return () => anim?.destroy()
    }
  },[])

  const { scrollYProgress } = useScroll()
  const yText = useTransform(scrollYProgress, [0, 0.4], [0, -60])
  const yArt  = useTransform(scrollYProgress, [0, 0.4], [0, -40])

  return (
    <header className="relative min-h-screen flex items-center">
      <Particles />
      <div className="container-max grid md:grid-cols-[1fr,1.2fr] gap-12 items-center">
        <motion.div className="relative z-10 justify-self-start w-[44vw] max-w-[520px] h-[44vw] max-h-[520px]" style={{ y: yArt }} id="lottie-container" aria-label="Programmer animation"></motion.div>
        <motion.div className="relative z-10" style={{ y: yText }}>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-2 break-words">{t('hero.name')}</h1>
          <p ref={typeRef} className="min-h-[32px] text-lg"></p>
          <p className="opacity-90 max-w-2xl mt-1 mb-4">{t('hero.sub')}</p>
          <nav className="flex flex-wrap gap-3">
            <a className="btn" href="mailto:joaop620@gmail.com">{t('hero.email')}</a>
            <a className="btn" target="_blank" href="https://www.linkedin.com/in/jo%C3%A3ocresferreira/">{t('hero.linkedin')}</a>
            <a className="btn" target="_blank" href="https://github.com/Joaop620">{t('hero.github')}</a>
            <a className="btn btn-cv" target="_blank" download href="cv/joao-ferreira-cv.pdf">{t('hero.cv')}</a>
          </nav>
        </motion.div>
      </div>
      <a href="#servicos" className="absolute left-1/2 -translate-x-1/2 bottom-6 w-7 h-10 rounded-full border-2 border-current flex items-center justify-center opacity-85">
        <span className="w-1.5 h-2 rounded bg-current animate-bounce"></span>
      </a>
    </header>
  )
}
