import { Languages } from 'lucide-react'
import { Link, useRoute } from '../router/Router'
import { useI18n } from '../i18n/I18nContext'
import heroImg from '../assets/hero.png'

export function Nav() {
  const { path } = useRoute()
  const { lang, setLang, t } = useI18n()

  const navLink = (to: string, label: string) => (
    <Link
      to={to}
      className={
        path === to
          ? 'text-accent font-medium'
          : 'text-text hover:text-heading transition-colors duration-150'
      }
    >
      {label}
    </Link>
  )

  return (
    <header className="sticky top-0 z-10 bg-surface backdrop-blur-[16px] border-b border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <Link to="/" className="flex items-center gap-2 text-heading shrink-0">
          <img src={heroImg} alt="" width={24} height={25} />
          <span className="font-medium hidden sm:inline">Project Nucleus</span>
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6 order-3 sm:order-none w-full sm:w-auto justify-center sm:justify-start">
          {navLink('/', t('nav.home'))}
          {navLink('/roadmap', t('nav.roadmap'))}
          {navLink('/decisions', t('nav.decisions'))}
        </nav>

        <button
          type="button"
          onClick={() => setLang(lang === 'en' ? 'tr' : 'en')}
          aria-label={t('nav.language')}
          className="flex items-center gap-1.5 rounded-btn border border-border px-3 py-1.5 text-sm text-text hover:text-heading transition-colors duration-150 shrink-0"
        >
          <Languages size={16} strokeWidth={1.75} aria-hidden="true" />
          {lang === 'en' ? 'TR' : 'EN'}
        </button>
      </div>
    </header>
  )
}
