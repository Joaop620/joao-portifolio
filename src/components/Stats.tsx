import { motion } from 'framer-motion'
import { useI18n } from '../i18n'

const stats = [
  { n: '3+', key: 'stats.exp' },
  { n: '6', key: 'stats.projects' },
  { n: '14+', key: 'stats.stack' },
  { n: '∞', key: 'stats.coffee' },
]

export default function Stats() {
  const { t } = useI18n()
  return (
    <div className="container-max -mt-2">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl glass md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div key={s.key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            className="px-6 py-8 text-center">
            <div className="font-display text-4xl font-bold text-gradient sm:text-5xl">{s.n}</div>
            <div className="mt-2 text-xs uppercase tracking-wider text-white/50">{t(s.key)}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
