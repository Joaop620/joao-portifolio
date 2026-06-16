import { useState, type FormEvent } from 'react'
import { useI18n } from '../i18n'
import { links } from '../data'
import Reveal from './Reveal'

// Replace XXXXXXXX with your Formspree form ID (https://formspree.io)
const FORMSPREE = 'https://formspree.io/f/XXXXXXXX'

export default function Contact() {
  const { t } = useI18n()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error' | 'config'>('idle')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!FORMSPREE.includes('/f/') || FORMSPREE.endsWith('XXXXXXXX')) { setStatus('config'); return }
    setStatus('sending')
    const data = new FormData(e.currentTarget)
    try {
      const res = await fetch(FORMSPREE, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      if (res.ok) { setStatus('sent'); e.currentTarget.reset() } else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="container-max">
        <div className="relative overflow-hidden rounded-[2rem] glass p-8 sm:p-14">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-amber/10 blur-3xl" />

          <div className="relative grid gap-12 lg:grid-cols-[1fr,1.1fr]">
            <Reveal>
              <span className="eyebrow">{t('contact.eyebrow')}</span>
              <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{t('contact.title')}</h2>
              <p className="mt-5 max-w-md text-white/60">{t('contact.sub')}</p>

              <div className="mt-8">
                <p className="mb-3 text-sm text-white/40">{t('contact.or')}</p>
                <a href={`mailto:${links.email}`} className="group flex items-center gap-2 font-display text-xl text-white transition hover:text-gold" data-hover>
                  {links.email}
                  <span className="transition group-hover:translate-x-1">→</span>
                </a>
                <div className="mt-5 flex gap-3">
                  <a href={links.github} target="_blank" rel="noreferrer" className="pill glass hover:text-gold" data-hover>GitHub</a>
                  <a href={links.behance} target="_blank" rel="noreferrer" className="pill glass hover:text-gold" data-hover>Behance</a>
                  <a href={links.linkedin} target="_blank" rel="noreferrer" className="pill glass hover:text-gold" data-hover>LinkedIn</a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <form onSubmit={onSubmit} className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input name="name" required placeholder={t('contact.name')}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-gold/50" />
                  <input name="email" type="email" required placeholder={t('contact.email')}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-gold/50" />
                </div>
                <textarea name="message" required rows={5} placeholder={t('contact.message')}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-gold/50" />
                <button type="submit" disabled={status === 'sending'} className="btn-gold justify-center disabled:opacity-60">
                  {status === 'sending' ? '…' : t('contact.send')}
                </button>
                {status === 'sent' && <p className="text-sm text-gold">{t('contact.sent')}</p>}
                {status === 'config' && <p className="text-sm text-amber">{t('contact.config')}</p>}
                {status === 'error' && <p className="text-sm text-red-400">{t('contact.error')}</p>}
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
