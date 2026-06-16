import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '../i18n'
import { projects, type Project } from '../data'
import Reveal from './Reveal'

function initials(title: string) {
  return title.replace(/[^A-Za-z0-9 ]/g, '').split(' ').filter(Boolean).map((w) => w[0]).join('').slice(0, 2).toUpperCase()
}

function Cover({ p }: { p: Project }) {
  const accent = p.accent || '#FFD700'
  if (p.cover) {
    return (
      <>
        <img src={p.cover} alt={p.title} loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-[800ms] ease-out group-hover:scale-[1.06]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
      </>
    )
  }
  // designed cover for projects without a live demo
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0" style={{ background: `radial-gradient(120% 120% at 20% 10%, ${accent}40, transparent 55%), radial-gradient(120% 120% at 90% 90%, ${accent}26, transparent 50%), #0c0c10` }} />
      <div className="absolute inset-0 opacity-[0.12]"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-[5.5rem] font-bold leading-none transition-transform duration-700 group-hover:scale-110"
          style={{ color: accent, opacity: 0.92, textShadow: `0 8px 40px ${accent}55` }}>
          {initials(p.title)}
        </span>
      </div>
      <div className="absolute bottom-3 left-3 font-mono text-[11px] uppercase tracking-widest text-white/55">
        {p.language || p.tags[0]}
      </div>
    </div>
  )
}

function Card({ p }: { p: Project }) {
  const { t, lang } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<React.CSSProperties>({})
  const accent = p.accent || '#FFD700'

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    setStyle({
      transform: `perspective(1000px) rotateX(${(0.5 - py) * 5}deg) rotateY(${(px - 0.5) * 6}deg) translateY(-6px)`,
      ['--mx' as any]: `${px * 100}%`,
      ['--my' as any]: `${py * 100}%`,
    })
  }
  const reset = () => setStyle({ transform: 'perspective(1000px) rotateX(0) rotateY(0)' })
  const link = p.demo || p.code

  return (
    <motion.div layout
      initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5 }}>
      <div ref={ref} onMouseMove={onMove} onMouseLeave={reset}
        style={{ ...style, transition: 'transform .35s ease' }}
        className="group relative h-full overflow-hidden rounded-[1.6rem] glass p-px">
        <div className="pointer-events-none absolute inset-0 z-10 rounded-[1.6rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: `radial-gradient(420px circle at var(--mx) var(--my), ${accent}22, transparent 60%)` }} />

        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.6rem-1px)] bg-[#0a0a0e]">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Cover p={p} />
            <div className="absolute left-3 top-3 z-10 flex gap-2">
              <span className="rounded-full px-3 py-1 text-[11px] font-medium backdrop-blur"
                style={{ background: `${accent}1f`, color: accent, border: `1px solid ${accent}40` }}>
                {p.source === 'behance' ? 'Behance · Design' : p.language || 'Code'}
              </span>
            </div>
            {p.featured && (
              <span className="absolute right-3 top-3 z-10 rounded-full bg-gold px-3 py-1 text-[11px] font-semibold text-black">★ {t('work.featured')}</span>
            )}
          </div>

          <div className="flex flex-1 flex-col p-6">
            <div className="mb-1.5 flex items-start justify-between gap-3">
              <h3 className="font-display text-xl font-semibold leading-tight">{p.title}</h3>
              {p.year && <span className="mt-1 font-mono text-xs text-white/35">{p.year}</span>}
            </div>
            <p className="mb-4 text-sm leading-relaxed text-white/55">{p.desc[lang]}</p>

            <div className="mb-5 flex flex-wrap gap-2">
              {p.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[11px] text-white/55">{tag}</span>
              ))}
            </div>

            <div className="mt-auto flex items-center gap-4">
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noreferrer"
                  className="relative z-20 inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition hover:gap-2.5" data-hover>
                  {p.source === 'behance' ? t('work.view') : t('work.demo')}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              )}
              {p.code && (
                <a href={p.code} target="_blank" rel="noreferrer"
                  className="relative z-20 inline-flex items-center gap-1.5 text-sm text-white/55 transition hover:text-white" data-hover>
                  {t('work.code')}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="m8 6-6 6 6 6m8-12 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              )}
            </div>
          </div>

          {link && <a href={link} target="_blank" rel="noreferrer" className="absolute inset-0 z-0" aria-label={p.title} tabIndex={-1} />}
        </div>
      </div>
    </motion.div>
  )
}

export default function Work() {
  const { t } = useI18n()
  const [filter, setFilter] = useState<'all' | 'github' | 'behance'>('all')
  const filters: { id: typeof filter; label: string }[] = [
    { id: 'all', label: t('work.all') },
    { id: 'github', label: t('work.dev') },
    { id: 'behance', label: t('work.design') },
  ]
  const shown = projects.filter((p) => filter === 'all' || p.source === filter)

  return (
    <section id="work" className="relative py-20 sm:py-28">
      <div className="container-max">
        <Reveal>
          <div className="mb-3 flex items-center gap-3">
            <span className="eyebrow">{t('work.eyebrow')}</span>
            <span className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
          </div>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl">{t('work.title')}</h2>
              <p className="mt-3 max-w-lg text-white/55">{t('work.sub')}</p>
            </div>
            <div className="flex gap-2 rounded-full glass p-1">
              {filters.map((f) => (
                <button key={f.id} onClick={() => setFilter(f.id)}
                  className={`relative rounded-full px-4 py-2 text-sm transition ${filter === f.id ? 'text-black' : 'text-white/65 hover:text-white'}`}>
                  {filter === f.id && <motion.span layoutId="filterpill" className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-gold to-gold2" />}
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <motion.div layout className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => <Card key={p.title} p={p} />)}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
