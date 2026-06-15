import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '../i18n'
import { projects, type Project } from '../data'
import Reveal from './Reveal'

function TiltCard({ p, big }: { p: Project; big?: boolean }) {
  const { t, lang } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<React.CSSProperties>({})

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    setStyle({
      transform: `perspective(900px) rotateX(${(0.5 - py) * 7}deg) rotateY(${(px - 0.5) * 9}deg) translateY(-6px)`,
      ['--mx' as any]: `${px * 100}%`,
      ['--my' as any]: `${py * 100}%`,
    })
  }
  const reset = () => setStyle({ transform: 'perspective(900px) rotateX(0) rotateY(0)' })

  const link = p.demo || p.code
  return (
    <motion.div layout
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5 }}
      className={big ? 'md:col-span-2 md:row-span-2' : ''}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ ...style, transition: 'transform .3s ease' }}
        className="group relative h-full overflow-hidden rounded-3xl glass p-px"
      >
        {/* glow following cursor */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: 'radial-gradient(380px circle at var(--mx) var(--my), rgba(255,215,0,.14), transparent 60%)' }} />

        <div className="relative flex h-full flex-col rounded-[calc(1.5rem-1px)] bg-dark/40 p-6">
          {/* cover */}
          <div className={`relative mb-5 overflow-hidden rounded-2xl ${big ? 'aspect-[16/10]' : 'aspect-[16/9]'}`}>
            {p.cover ? (
              <img src={p.cover} alt={p.title} loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink to-dark">
                <span className="font-display text-5xl text-white/10 transition-transform duration-700 group-hover:scale-110">
                  {p.title.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                </span>
                <div className="absolute inset-0 opacity-40"
                  style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(255,215,0,.18), transparent 50%)' }} />
              </div>
            )}
            <div className="absolute left-3 top-3 flex gap-2">
              <span className={`pill !px-3 !py-1 text-[11px] ${p.source === 'behance' ? 'glass-gold text-gold' : 'glass text-white/80'}`}>
                {p.source === 'behance' ? 'Behance' : p.language || 'Code'}
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col">
            <div className="mb-1 flex items-center justify-between gap-3">
              <h3 className={`font-display font-semibold leading-tight ${big ? 'text-2xl' : 'text-xl'}`}>{p.title}</h3>
              {p.year && <span className="font-mono text-xs text-white/35">{p.year}</span>}
            </div>
            <p className="mb-4 text-sm leading-relaxed text-white/55">{p.desc[lang]}</p>

            <div className="mb-5 flex flex-wrap gap-2">
              {p.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/55">{tag}</span>
              ))}
            </div>

            <div className="mt-auto flex items-center gap-3">
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-gold transition hover:gap-2.5" data-hover>
                  {p.source === 'behance' ? t('work.view') : t('work.demo')}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              )}
              {p.code && (
                <a href={p.code} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-white/60 transition hover:text-white" data-hover>
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
    <section id="work" className="relative py-24 sm:py-32">
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

        <motion.div layout className="mt-12 grid auto-rows-fr grid-cols-1 gap-5 md:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => <TiltCard key={p.title} p={p} big={p.featured} />)}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
