import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import {
  SiHtml5, SiCss3, SiJavascript, SiTypescript,
  SiReact, SiNextdotjs, SiVite, SiWebpack,
  SiNodedotjs, SiExpress,
  SiTailwindcss, SiSass, SiStyledcomponents,
  SiGit, SiGithub,
  SiAxios, SiEslint, SiPrettier,
  SiFramer, SiReacthookform, SiI18Next, SiZod, SiFigma
} from 'react-icons/si'

const ICONS: Record<string, any> = {
  'HTML5': SiHtml5,
  'CSS3': SiCss3,
  'JavaScript': SiJavascript,
  'TypeScript': SiTypescript,
  'React': SiReact,
  'Next.js': SiNextdotjs,
  'Vite': SiVite,
  'Webpack': SiWebpack,
  'Node.js': SiNodedotjs,
  'Express': SiExpress,
  'Tailwind CSS': SiTailwindcss,
  'Sass': SiSass,
  'Styled-Components': SiStyledcomponents,
  'Git': SiGit,
  'GitHub': SiGithub,
  'Axios': SiAxios,
  'ESLint': SiEslint,
  'Prettier': SiPrettier,
  'Framer Motion': SiFramer,
  'React Hook Form': SiReacthookform,
  'i18next': SiI18Next,
  'Zod': SiZod,
  'Figma': SiFigma
}

export default function Skills(){
  const { t } = useTranslation()

  const secRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: secRef, offset: ['start end','end start'] })
  const yTitle = useTransform(scrollYProgress, [0,1], [20,-20])
  const oTitle = useTransform(scrollYProgress, [0,.2,.8,1], [.75,1,1,.9])

  const gridRef = useRef<HTMLUListElement>(null)
  const inView = useInView(gridRef, { amount: 0.15, once: true })

  const names = (t('skills.list', { returnObjects:true }) as string[]) ?? []

  return (
    <section ref={secRef} id="skills" className="py-24 md:py-28">
      <motion.h2 style={{ y:yTitle, opacity:oTitle }} className="text-3xl md:text-4xl font-extrabold text-center mb-12">
        {t('skills.title')}
      </motion.h2>

      <div className="container mx-auto px-6">
        <motion.ul
          ref={gridRef}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 md:gap-7"
        >
          {names.map((name) => {
            const Icon = ICONS[name] ?? SiReact
            return (
              <li
                key={name}
                className="group relative overflow-hidden rounded-2xl bg-black text-white ring-1 ring-white/10 p-4 flex flex-col items-center gap-2 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12">
                  <Icon className="w-full h-full" aria-label={name} />
                </div>
                <span className="text-sm md:text-base font-medium text-center">{name}</span>

                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                     style={{ background: 'radial-gradient(120px 80px at 50% 0%, rgba(0,0,0,0.06), transparent 70%)' }} />
              </li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
