import { motion } from 'framer-motion'
import { useI18n } from '../i18n'
import { links } from '../data'

export default function Hero() {
  const { t } = useI18n()
  return (
    <section id="top" className="relative flex min-h-[90svh] items-center pt-28">
      <div className="container-max grid items-center gap-14 lg:grid-cols-[1.3fr,0.7fr]">
        <div>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="eyebrow mb-6">{t('hero.kicker')}</motion.p>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-6xl font-semibold leading-[0.94] tracking-tight sm:text-7xl lg:text-[5.8rem]">
            <span className="block text-white">João</span>
            <span className="block text-gold">Ferreira</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-white/65">{t('hero.sub')}</motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-10 flex flex-wrap items-center gap-3">
            <button onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })} className="btn-gold">{t('hero.cta1')}</button>
            <a href={links.cv} download className="btn-ghost">{t('hero.cta2')}</a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="mt-12 flex items-center gap-5 text-sm text-white/45">
            <a href={links.github} target="_blank" rel="noreferrer" className="transition hover:text-gold">GitHub</a>
            <span className="h-3 w-px bg-white/15" />
            <a href={links.behance} target="_blank" rel="noreferrer" className="transition hover:text-gold">Behance</a>
            <span className="h-3 w-px bg-white/15" />
            <a href={links.linkedin} target="_blank" rel="noreferrer" className="transition hover:text-gold">LinkedIn</a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto hidden w-full max-w-[340px] lg:block">
          <div className="overflow-hidden rounded-2xl border border-white/10 grayscale-[15%]">
            <img src="https://avatars.githubusercontent.com/u/115476517?v=4" alt="João Ferreira" className="aspect-[4/5] w-full object-cover" />
          </div>
          <div className="mt-3 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-white/40">
            <span>{t('hero.located')}</span>
            <span>EST. 2022</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
