import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useI18n } from '../i18n'
import { links } from '../data'

const roles = ['React Developer', 'TypeScript', 'UI Designer', 'Front-end Engineer']

export default function Hero() {
  const { t } = useI18n()
  const [text, setText] = useState('')
  const [idx, setIdx] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    const full = roles[idx % roles.length]
    let i = 0, deleting = false
    let timer: number
    const tick = () => {
      if (!deleting) {
        setText(full.slice(0, ++i))
        if (i === full.length) { deleting = true; timer = window.setTimeout(tick, 1600); return }
      } else {
        setText(full.slice(0, --i))
        if (i === 0) { setIdx((p) => p + 1); return }
      }
      timer = window.setTimeout(tick, deleting ? 45 : 80)
    }
    timer = window.setTimeout(tick, 120)
    return () => clearTimeout(timer)
  }, [idx])

  return (
    <section id="top" ref={ref} className="relative flex min-h-[100svh] items-center pt-28">
      <motion.div style={{ y, opacity }} className="container-max grid items-center gap-12 lg:grid-cols-[1.15fr,0.85fr]">
        {/* left */}
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="pill glass-gold mb-6 text-gold">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            {t('hero.available')}
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-[15vw] leading-[0.92] tracking-tight sm:text-7xl lg:text-[5.4rem]">
            <span className="block text-white">João</span>
            <span className="block text-gradient animate-shine">Ferreira</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
            className="mt-5 flex items-center gap-2 font-mono text-base text-white/80 sm:text-lg">
            <span className="text-gold">&gt;</span>
            <span>{text}</span>
            <span className="inline-block h-5 w-[2px] animate-pulse bg-gold" />
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            {t('hero.sub')}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="mt-9 flex flex-wrap items-center gap-3">
            <button onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })} className="btn-gold">
              {t('hero.cta1')}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <a href={links.cv} download className="btn-ghost">{t('hero.cta2')}</a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="mt-9 flex items-center gap-5 text-sm text-white/45">
            <a href={links.github} target="_blank" rel="noreferrer" className="transition hover:text-gold">GitHub</a>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <a href={links.behance} target="_blank" rel="noreferrer" className="transition hover:text-gold">Behance</a>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <a href={links.linkedin} target="_blank" rel="noreferrer" className="transition hover:text-gold">LinkedIn</a>
          </motion.div>
        </div>

        {/* right visual */}
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }}
          className="relative mx-auto hidden aspect-square w-full max-w-[420px] lg:block">
          <div className="absolute inset-0 animate-spinslow rounded-full border border-dashed border-gold/25" />
          <div className="absolute inset-8 animate-spinslow rounded-full border border-gold/10" style={{ animationDirection: 'reverse' }} />
          <div className="absolute inset-12 overflow-hidden rounded-[2rem] glass shadow-gold">
            <img src="https://avatars.githubusercontent.com/u/115476517?v=4" alt="João Ferreira"
              className="h-full w-full object-cover opacity-95" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
          </div>

          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity }}
            className="absolute -left-4 top-10 glass rounded-2xl px-4 py-3 shadow-glass">
            <p className="font-mono text-xs text-gold">{'</>'} React · TS</p>
          </motion.div>
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 6, repeat: Infinity }}
            className="absolute -right-3 top-1/2 glass rounded-2xl px-4 py-3 shadow-glass">
            <p className="text-xs text-white/80">🎨 Design</p>
          </motion.div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity }}
            className="absolute -bottom-2 left-1/4 glass-gold rounded-2xl px-4 py-3">
            <p className="text-xs font-medium text-gold">📍 {t('hero.located')}</p>
          </motion.div>
        </motion.div>
      </motion.div>

      <a href="#work" className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 sm:flex" data-hover>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">{t('hero.scroll')}</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <span className="h-2 w-1 animate-bounce rounded-full bg-gold" />
        </span>
      </a>
    </section>
  )
}
