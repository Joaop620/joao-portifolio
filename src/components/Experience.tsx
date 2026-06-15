import { useI18n } from '../i18n'
import { experience } from '../data'
import Reveal from './Reveal'

export default function Experience() {
  const { t, lang } = useI18n()
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="container-max">
        <Reveal>
          <span className="eyebrow">{t('exp.eyebrow')}</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">{t('exp.title')}</h2>
        </Reveal>

        <div className="relative mt-14 pl-8 sm:pl-0">
          <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-gold/50 via-white/10 to-transparent sm:left-1/2" />
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.08}>
              <div className={`relative mb-12 sm:w-1/2 ${i % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:ml-auto sm:pl-12'}`}>
                <span className={`absolute top-2 h-3 w-3 rounded-full bg-gold shadow-gold -left-[2.05rem] sm:left-auto ${i % 2 === 0 ? 'sm:-right-[0.42rem]' : 'sm:-left-[0.42rem]'}`} />
                <div className="rounded-2xl glass p-6 transition hover:border-gold/30">
                  <div className={`mb-3 flex items-center gap-3 ${i % 2 === 0 ? 'sm:justify-end' : ''}`}>
                    <h3 className="font-display text-xl text-white">{job.company}</h3>
                    <span className="font-mono text-xs text-gold/70">{job.period}</span>
                  </div>
                  <ul className="space-y-2">
                    {job.bullets[lang].map((b, j) => (
                      <li key={j} className="text-sm leading-relaxed text-white/55">{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
