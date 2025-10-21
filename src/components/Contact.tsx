import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(5),
})
type FormData = z.infer<typeof schema>

export default function Contact(){
  const { t } = useTranslation()
  const [sent, setSent] = useState<string>('')
  const { register, handleSubmit, reset, formState:{ errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data:FormData)=>{
    const endpoint = (document.getElementById('formspree-endpoint') as HTMLInputElement)?.value || ''
    if(!endpoint.startsWith('https://formspree.io/f/')){
      setSent('⚠ Defina seu ID do Formspree (input oculto).'); return
    }
    const res = await fetch(endpoint, { method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'}, body: JSON.stringify(data) })
    if(res.ok){ setSent('✅ Mensagem enviada!'); reset() } else { setSent('❌ Erro ao enviar. Tente novamente.') }
    setTimeout(()=>setSent(''), 3000)
  }

  const secRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: secRef, offset: ['start end','end start'] })
  const yTitle = useTransform(scrollYProgress, [0,1], [20,-20])
  const oTitle = useTransform(scrollYProgress, [0,.2,.8,1], [.75,1,1,.9])

  return (
    <div ref={secRef}>
      <motion.h2 style={{y: yTitle, opacity: oTitle}} className="section-title reveal">{t('contact.title')}</motion.h2>
      <p className="section-sub reveal">{t('contact.sub')}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2 card mt-6">
        <input id="formspree-endpoint" type="hidden" value="https://formspree.io/f/XXXXXXXX" />
        <div className="md:col-span-1">
          <label className="block mb-1">{t('contact.name')}</label>
          <input {...register('name')} className="w-full rounded-lg border border-current bg-transparent px-3 py-2" />
          {errors.name && <p className="text-red-400 text-sm mt-1">Nome inválido</p>}
        </div>
        <div className="md:col-span-1">
          <label className="block mb-1">{t('contact.email')}</label>
          <input {...register('email')} className="w-full rounded-lg border border-current bg-transparent px-3 py-2" />
          {errors.email && <p className="text-red-400 text-sm mt-1">Email inválido</p>}
        </div>
        <div className="md:col-span-2">
          <label className="block mb-1">{t('contact.message')}</label>
          <textarea rows={5} {...register('message')} className="w-full rounded-lg border border-current bg-transparent px-3 py-2" />
          {errors.message && <p className="text-red-400 text-sm mt-1">Mensagem muito curta</p>}
        </div>
        <div className="md:col-span-2 flex items-center gap-3">
          <button disabled={isSubmitting} className="btn btn-cv">{t('contact.send')}</button>
          <span className="opacity-80 text-sm">{t('contact.note')}</span>
        </div>
        {sent && <div className="md:col-span-2">{sent}</div>}
      </form>
    </div>
  )
}
