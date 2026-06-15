import { useI18n } from '../i18n'

export default function Footer() {
  const { t } = useI18n()
  return (
    <footer className="relative border-t border-white/8 py-10">
      <div className="container-max flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-gold to-gold2 font-display text-sm font-bold text-black">J</span>
          <span className="text-sm text-white/55">© {new Date().getFullYear()} João Ferreira</span>
        </div>
        <p className="text-center text-sm text-white/40">{t('footer.tag')}</p>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="pill glass text-white/70 hover:text-gold" data-hover>
          {t('footer.top')} ↑
        </button>
      </div>
    </footer>
  )
}
