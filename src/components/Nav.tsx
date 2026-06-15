import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { useI18n } from '../i18n'

const sections = [
  { id: 'work', key: 'nav.work' },
  { id: 'about', key: 'nav.about' },
  { id: 'skills', key: 'nav.skills' },
  { id: 'experience', key: 'nav.experience' },
  { id: 'contact', key: 'nav.contact' },
]

export default function Nav() {
  const { t, lang, setLang } = useI18n()
  const [active, setActive] = useState('work')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll(); window.addEventListener('scroll', onScroll)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el) })
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])

  const go = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.div className="fixed left-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-gold to-gold2"
        style={{ scaleX, width: '100%' }} />

      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}>
        <div className="container-max">
          <nav className={`flex items-center justify-between rounded-2xl px-4 sm:px-5 py-2.5 transition-all duration-500 ${scrolled ? 'glass shadow-glass' : ''}`}>
            <button onClick={() => go('top')} className="group flex items-center gap-2.5" aria-label="Início">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-gold to-gold2 font-display text-lg font-bold text-black">J</span>
              <span className="hidden font-display text-lg font-semibold sm:block">João<span className="text-gold">.</span></span>
            </button>

            <div className="hidden items-center gap-1 md:flex">
              {sections.map((s) => (
                <button key={s.id} onClick={() => go(s.id)}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${active === s.id ? 'text-gold' : 'text-white/65 hover:text-white'}`}>
                  {active === s.id && (
                    <motion.span layoutId="navpill" className="absolute inset-0 -z-10 rounded-full glass-gold"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                  )}
                  {t(s.key)}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
                className="pill glass text-white/80 hover:text-gold" aria-label="Trocar idioma">
                <span className={lang === 'pt' ? 'text-gold' : ''}>PT</span>
                <span className="text-white/30">/</span>
                <span className={lang === 'en' ? 'text-gold' : ''}>EN</span>
              </button>
              <button onClick={() => go('contact')} className="btn-gold hidden !px-5 !py-2.5 text-sm sm:inline-flex">
                {t('nav.contact')}
              </button>
              <button onClick={() => setOpen((o) => !o)} className="pill glass md:hidden" aria-label="Menu">
                <div className="flex flex-col gap-[3px]">
                  <span className={`h-[2px] w-4 bg-current transition ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
                  <span className={`h-[2px] w-4 bg-current transition ${open ? 'opacity-0' : ''}`} />
                  <span className={`h-[2px] w-4 bg-current transition ${open ? '-translate-y-[5px] -rotate-45' : ''}`} />
                </div>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-dark/95 backdrop-blur-xl md:hidden">
            {sections.map((s, i) => (
              <motion.button key={s.id} onClick={() => go(s.id)}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="font-display text-3xl text-white/90 hover:text-gold">
                {t(s.key)}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
