import { motion } from 'framer-motion'
import { useI18n } from '../i18n'
import { skills, tools } from '../data'
import Reveal from './Reveal'

export default function Skills() {
  const { t } = useI18n()
  return (
    <section id="skills" className="relative py-20 sm:py-28">
      <div className="container-max">
        <Reveal>
          <span className="eyebrow">{t('skills.eyebrow')}</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">{t('skills.title')}</h2>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div className="grid gap-6">
            {skills.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.06}>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium text-white/85">{s.t}</span>
                    <span className="font-mono text-sm text-gold/70">{s.v}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/8">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.v}%` }}
                      viewport={{ once: true }} transition={{ duration: 1.1, delay: 0.1, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-gold to-gold2" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-3xl glass p-8">
              <h3 className="mb-6 font-display text-xl text-white/80">{t('skills.tools')}</h3>
              <div className="flex flex-wrap gap-3">
                {tools.map((tool, i) => (
                  <motion.span key={tool}
                    initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/70 transition hover:border-gold/40 hover:text-gold"
                    data-hover>
                    {tool}
                  </motion.span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
