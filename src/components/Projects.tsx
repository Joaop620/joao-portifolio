import { useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Projects(){
  const { t } = useTranslation()
  const items = t('projects.items', { returnObjects:true }) as any[]
  const columns = useMemo(()=>{
    const cols:[any[],any[],any[]] = [[],[],[]]
    items.forEach((it,idx)=> cols[idx%3].push(it))
    return cols
  },[items])

  const secRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: secRef, offset: ['start end','end start'] })
  const yTitle = useTransform(scrollYProgress, [0,1], [20,-20])
  const ySub = useTransform(scrollYProgress, [0,1], [14,-14])
  const oTitle = useTransform(scrollYProgress, [0,.2,.8,1], [.75,1,1,.9])
  const y0 = useTransform(scrollYProgress, [0,1], [24,-16])
  const y1 = useTransform(scrollYProgress, [0,1], [48,-32])
  const y2 = useTransform(scrollYProgress, [0,1], [32,-24])

  const gridV = { hidden: {opacity:1}, show: {opacity:1, transition:{staggerChildren:.08, delayChildren:.05}} }
  const itemV = { hidden:{opacity:0, y:12}, show:{opacity:1, y:0} }

  return (
    <div ref={secRef}>
      <motion.h2 style={{y: yTitle, opacity: oTitle}} className="section-title reveal">{t('projects.title')}</motion.h2>
      <motion.p style={{y: ySub}} className="section-sub reveal">{t('projects.sub')}</motion.p>

      <div className="mt-6">
        <div className="grid gap-5 lg:grid-cols-3">
          <motion.div style={{ y: y0 }} variants={gridV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid gap-5">
            {columns[0].map((p,idx)=>(
              <motion.article variants={itemV} key={idx} className="card">
                <h3>{p.t}</h3>
                <p>{p.d}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {p.tags.map((tg:string,i:number)=>(<span key={i} className="px-3 py-1 rounded-full border border-current text-sm">{tg}</span>))}
                </div>
                <div className="flex gap-2 mt-3 flex-wrap">
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

          <motion.div style={{ y: y1 }} variants={gridV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid gap-5">
            {columns[1].map((p,idx)=>(
              <motion.article variants={itemV} key={idx} className="card">
                <h3>{p.t}</h3>
                <p>{p.d}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {p.tags.map((tg:string,i:number)=>(<span key={i} className="px-3 py-1 rounded-full border border-current text-sm">{tg}</span>))}
                </div>
                <div className="flex gap-2 mt-3 flex-wrap">
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

          <motion.div style={{ y: y2 }} variants={gridV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid gap-5">
            {columns[2].map((p,idx)=>(
              <motion.article variants={itemV} key={idx} className="card">
                <h3>{p.t}</h3>
                <p>{p.d}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {p.tags.map((tg:string,i:number)=>(<span key={i} className="px-3 py-1 rounded-full border border-current text-sm">{tg}</span>))}
                </div>
                <div className="flex gap-2 mt-3 flex-wrap">
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
    </div>
  )
}
