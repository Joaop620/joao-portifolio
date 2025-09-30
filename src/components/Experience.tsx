import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Experience(){
  const { t } = useTranslation()
  const secRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: secRef, offset: ['start end','end start'] })
  const yTitle = useTransform(scrollYProgress, [0,1], [20,-20])
  const oTitle = useTransform(scrollYProgress, [0,.2,.8,1], [.75,1,1,.9])

  const items = t('experience.items', { returnObjects:true }) as any[]
  const gridV = { hidden: {opacity:1}, show: {opacity:1, transition:{staggerChildren:.08, delayChildren:.05}} }
  const itemV = { hidden:{opacity:0, y:12}, show:{opacity:1, y:0} }

  return (
    <div ref={secRef}>
      <motion.h2 style={{y: yTitle, opacity: oTitle}} className="section-title reveal">{t('experience.title')}</motion.h2>
      <motion.div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 reveal-stagger mt-6"
        variants={gridV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        {items.map((xp,idx)=>(
          <motion.article variants={itemV} key={idx} className="card">
            <header className="flex items-center justify-between mb-1">
              <h3>{xp.c}</h3><span className="opacity-80">{xp.p}</span>
            </header>
            <ul className="list-disc ml-5 space-y-1">
              {xp.b.map((b:string,i:number)=>(<li key={i}>{b}</li>))}
            </ul>
          </motion.article>
        ))}
      </motion.div>
    </div>
  )
}
