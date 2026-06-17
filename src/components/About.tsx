import { useI18n } from '../i18n'
import { links } from '../data'
import Reveal from './Reveal'

const rows = [
  { k: '01', t: 'Front-end', d: 'React, TypeScript, Tailwind' },
  { k: '02', t: 'Design', d: 'Figma, Behance, Branding' },
  { k: '03', t: 'Performance', d: 'Acessibilidade, SEO, velocidade' },
]

export default function About() {
  const { t } = useI18n()
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="container-max grid gap-12 lg:grid-cols-[1fr,0.8fr]">
        <Reveal>
          <span className="eyebrow">{t('about.eyebrow')}</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">{t('about.title')}</h2>
          <p className="mt-6 leading-relaxed text-white/65">{t('about.p1')}</p>
          <p className="mt-4 leading-relaxed text-white/65">{t('about.p2')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={links.github} target="_blank" rel="noreferrer" className="btn-ghost !py-2.5 text-sm">GitHub</a>
            <a href={links.behance} target="_blank" rel="noreferrer" className="btn-ghost !py-2.5 text-sm">Behance</a>
            <a href={links.linkedin} target="_blank" rel="noreferrer" className="btn-ghost !py-2.5 text-sm">LinkedIn</a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="divide-y divide-white/8 rounded-2xl border border-white/8">
            {rows.map((r) => (
              <div key={r.k} className="flex items-baseline gap-5 px-6 py-5">
                <span className="font-mono text-sm text-gold/60">{r.k}</span>
                <div>
                  <h3 className="font-display text-lg text-white/90">{r.t}</h3>
                  <p className="text-sm text-white/45">{r.d}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
