import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useInView, useMotionValue, animate, useScroll, useTransform } from 'framer-motion'

export default function Skills(){
  const { t } = useTranslation()

  const secRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: secRef, offset: ['start end','end start'] })
  const yTitle = useTransform(scrollYProgress, [0,1], [20,-20])
  const oTitle = useTransform(scrollYProgress, [0,.2,.8,1], [.75,1,1,.9])

  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.2, once: true })

  const bars = t('skills.bars', { returnObjects:true }) as any[]
  const tools = t('skills.tools', { returnObjects:true }) as string[]
  return (
    <div ref={secRef}>
      <motion.h2 style={{y: yTitle, opacity: oTitle}} className="section-title reveal">{t('skills.title')}</motion.h2>
      <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        {bars.map((b,idx)=>(
          <div key={idx} className="card">
            <div className="flex items-center justify-between mb-2"><span className="font-bold">{b.t}</span><AnimatedPercent value={b.v} active={inView} /></div>
            <div className="h-3 rounded bg-neutral-800 dark:bg-neutral-200">
              <motion.div initial={{width: 0}} animate={inView ? {width: `${b.v}%`} : {}} transition={{duration: 1.1, ease: [0.2,0.7,0.2,1]}} className="skill-bar" />
            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mt-6">
        {tools.map((tool,idx)=>(<span key={idx} className="text-center px-3 py-2 rounded-xl border border-current">{tool}</span>))}
      </div>
    </div>
  )
}

function AnimatedPercent({ value, active }:{ value:number, active:boolean }){
  const mv = useMotionValue(0)
  const [v, setV] = useState(0)
  useEffect(()=>{
    if(active){
      const controls = animate(mv, value, { duration: 1.1, ease: 'easeOut' })
      const unsub = mv.on('change', (latest:number)=> setV(Math.round(latest)))
      return ()=>{ controls.stop(); unsub() }
    }
  },[active, value])
  return <span>{v}%</span>
}
