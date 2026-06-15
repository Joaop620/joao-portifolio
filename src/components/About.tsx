import { useI18n } from '../i18n'
import { links } from '../data'
import Reveal from './Reveal'

export default function About() {
  const { t } = useI18n()
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container-max grid items-center gap-12 lg:grid-cols-[1fr,1fr]">
        <Reveal>
          <span className="eyebrow">{t('about.eyebrow')}</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">{t('about.title')}</h2>
          <p className="mt-6 text-lg leading-relaxed text-white/65">{t('about.p1')}</p>
          <p className="mt-4 text-lg leading-relaxed text-white/65">{t('about.p2')}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={links.github} target="_blank" rel="noreferrer" className="btn-ghost !py-2.5 text-sm">GitHub ↗</a>
            <a href={links.behance} target="_blank" rel="noreferrer" className="btn-ghost !py-2.5 text-sm">Behance ↗</a>
            <a href={links.linkedin} target="_blank" rel="noreferrer" className="btn-ghost !py-2.5 text-sm">LinkedIn ↗</a>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative overflow-hidden rounded-3xl glass p-8">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
            <div className="grid gap-6">
              {[
                { k: '01', t: 'Front-end', d: 'React · TypeScript · Tailwind' },
                { k: '02', t: 'Design', d: 'Figma · Behance · Branding' },
                { k: '03', t: 'Performance', d: 'Acessibilidade · SEO · Velocidade' },
              ].map((row) => (
                <div key={row.k} className="flex items-start gap-5 border-b border-white/8 pb-5 last:border-0 last:pb-0">
                  <span className="font-mono text-sm text-gold/70">{row.k}</span>
                  <div>
                    <h3 className="font-display text-xl">{row.t}</h3>
                    <p className="text-sm text-white/50">{row.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
