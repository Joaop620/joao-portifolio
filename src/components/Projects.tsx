import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Projects(){
  const { t } = useTranslation()
  const items = t('projects.items', { returnObjects:true }) as any[]

  const secRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: secRef, offset: ['start end','end start'] })
  const yTitle = useTransform(scrollYProgress, [0,1], [20,-20])
  const oTitle = useTransform(scrollYProgress, [0,.2,.8,1], [.75,1,1,.9])
  const ySub = useTransform(scrollYProgress, [0,1], [14,-8])

  return (
    <div ref={secRef}>
      <motion.h2 style={{y: yTitle, opacity: oTitle}} className="section-title reveal">{t('projects.title')}</motion.h2>
      <motion.p style={{y: ySub}} className="section-sub reveal">{t('projects.sub')}</motion.p>

      <div className="mt-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 items-stretch"
          style={{ gridAutoRows: '1fr' }}
        >
          {items.map((p:any, idx:number)=>(
            <motion.article
              key={idx}
              className="card h-full flex flex-col justify-between"
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <div>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
                {p.tags && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {p.tags.map((tg:string,i:number)=>(
                      <span key={i} className="px-3 py-1 rounded-full border border-current text-xs">{tg}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-4 flex gap-3">
                {p.demo && (
                  <a className="btn" href={p.demo} target="_blank" rel="noreferrer">Demo</a>
                )}
                {p.code && (
                  <a className="btn btn-cv" href={p.code} target="_blank" rel="noreferrer">Code</a>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
