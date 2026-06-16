import { motion } from 'framer-motion'
import { useI18n } from '../i18n'
import { techStack } from '../data'
import { TechIcon } from '../icons'
import Reveal from './Reveal'

export default function Skills() {
  const { t, lang } = useI18n()
  return (
    <section id="skills" className="relative py-20 sm:py-28">
      <div className="container-max">
        <Reveal>
          <div className="mb-3 flex items-center gap-3">
            <span className="eyebrow">{t('skills.eyebrow')}</span>
            <span className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl">{t('skills.title')}</h2>
          <p className="mt-3 max-w-lg text-white/55">{t('skills.sub')}</p>
        </Reveal>

        <div className="mt-12 space-y-10">
          {techStack.map((cat, ci) => (
            <Reveal key={cat.group.en} delay={ci * 0.08}>
              <div className="grid gap-5 sm:grid-cols-[180px,1fr] sm:items-start">
                <div className="pt-1">
                  <span className="font-mono text-xs uppercase tracking-widest text-gold/70">{String(ci + 1).padStart(2, '0')}</span>
                  <h3 className="mt-1 font-display text-xl text-white/90">{cat.group[lang]}</h3>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                  {cat.items.map((tech, i) => (
                    <motion.div key={tech.name}
                      initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                      className="group flex flex-col items-center gap-3 rounded-2xl glass px-3 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-gold">
                      <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/[0.04] text-white/70 transition-colors duration-300 group-hover:text-gold">
                        <TechIcon name={tech.icon} className="h-6 w-6" />
                      </span>
                      <span className="text-sm font-medium text-white/75 transition-colors group-hover:text-white">{tech.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
