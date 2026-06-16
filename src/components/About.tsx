import { useI18n } from '../i18n'
import { links } from '../data'
import Reveal from './Reveal'

const rows = [
  { k: '01', t: 'Front-end', d: 'React · TypeScript · Tailwind' },
  { k: '02', t: 'Design', d: 'Figma · Behance · Branding' },
  { k: '03', t: 'Performance', d: 'Acessibilidade · SEO · Velocidade' },
]

export default function About() {
  const { t } = useI18n()
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="container-max grid items-center gap-12 lg:grid-cols-[0.85fr,1fr]">
        {/* portrait */}
        <Reveal>
          <div className="relative mx-auto w-full max-w-[360px]">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-gold/20 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.8rem] glass p-2">
              <img src="https://avatars.githubusercontent.com/u/115476517?v=4" alt="João Ferreira"
                className="aspect-[4/5] w-full rounded-[1.4rem] object-cover" loading="lazy" />
            </div>
            <div className="absolute -bottom-5 -right-3 glass-gold rounded-2xl px-5 py-3 text-center">
              <div className="font-display text-2xl font-bold text-gold">23</div>
              <div className="text-[11px] uppercase tracking-wider text-white/60">anos</div>
            </div>
            <div className="absolute -left-3 top-8 glass rounded-2xl px-4 py-3">
              <div className="font-mono text-xs text-gold">📍 Portugal</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <span className="eyebrow">{t('about.eyebrow')}</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">{t('about.title')}</h2>
          <p className="mt-6 leading-relaxed text-white/65">{t('about.p1')}</p>
          <p className="mt-4 leading-relaxed text-white/65">{t('about.p2')}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {rows.map((r) => (
              <div key={r.k} className="rounded-2xl glass p-4">
                <span className="font-mono text-xs text-gold/70">{r.k}</span>
                <h3 className="mt-1 font-display text-lg">{r.t}</h3>
                <p className="text-xs text-white/50">{r.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={links.github} target="_blank" rel="noreferrer" className="btn-ghost !py-2.5 text-sm" data-hover>GitHub ↗</a>
            <a href={links.behance} target="_blank" rel="noreferrer" className="btn-ghost !py-2.5 text-sm" data-hover>Behance ↗</a>
            <a href={links.linkedin} target="_blank" rel="noreferrer" className="btn-ghost !py-2.5 text-sm" data-hover>LinkedIn ↗</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
