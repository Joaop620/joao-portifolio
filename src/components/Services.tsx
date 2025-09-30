import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Services(){
  const { t } = useTranslation()
  const secRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: secRef, offset: ['start end','end start'] })
  const yTitle = useTransform(scrollYProgress, [0,1], [20,-20])
  const ySub = useTransform(scrollYProgress, [0,1], [14,-14])
  const oTitle = useTransform(scrollYProgress, [0,.2,.8,1], [.75,1,1,.9])

  const items = t('services.items', { returnObjects:true }) as any[]
  const gridV = { hidden: {opacity:1}, show: {opacity:1, transition:{staggerChildren:.08, delayChildren:.05}} }
  const itemV = { hidden:{opacity:0, y:12}, show:{opacity:1, y:0} }

  return (
    <div ref={secRef}>
      <motion.h2 style={{y: yTitle, opacity: oTitle}} className="section-title reveal" data-reveal="up">{t('services.title')}</motion.h2>
      <motion.p style={{y: ySub}} className="section-sub reveal" data-reveal="up">{t('services.sub')}</motion.p>
      <motion.div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 reveal-stagger mt-6"
        variants={gridV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        {items.map((it,idx)=>(
          <motion.article variants={itemV} key={idx} className="card">
            <h3>{it.t}</h3>
            <p>{it.d}</p>
          </motion.article>
        ))}
      </motion.div>
    </div>
  )
}
