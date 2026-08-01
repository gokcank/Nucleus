import { Link, useRoute } from './router/Router'
import { useI18n } from './i18n/I18nContext'

function Home() {
  const { t } = useI18n()
  return (
    <div className="glass-panel rounded-panel p-8 max-w-md text-center">
      <h1 className="text-3xl">{t('home.title')}</h1>
      <p className="mt-3 text-text">{t('home.subtitle')}</p>
    </div>
  )
}

function Placeholder({ title }: { title: string }) {
  return (
    <div className="glass-panel rounded-panel p-8 max-w-md text-center">
      <h1 className="text-3xl">{title}</h1>
    </div>
  )
}

function Nav() {
  const { path } = useRoute()
  const { lang, setLang, t } = useI18n()

  const navLink = (to: string, label: string) => (
    <Link to={to} className={path === to ? 'text-accent' : 'text-text'}>
      {label}
    </Link>
  )

  return (
    <nav className="flex items-center justify-center gap-6 p-4">
      {navLink('/', t('nav.home'))}
      {navLink('/roadmap', t('nav.roadmap'))}
      {navLink('/decisions', t('nav.decisions'))}
      <button
        type="button"
        onClick={() => setLang(lang === 'en' ? 'tr' : 'en')}
        className="text-text"
      >
        {lang === 'en' ? 'TR' : 'EN'}
      </button>
    </nav>
  )
}

function App() {
  const { path } = useRoute()
  const { t } = useI18n()

  let page = <Home />
  if (path === '/roadmap') page = <Placeholder title={t('nav.roadmap')} />
  else if (path === '/decisions') page = <Placeholder title={t('nav.decisions')} />

  return (
    <div className="min-h-svh flex flex-col">
      <Nav />
      <div className="flex-1 flex items-center justify-center p-6">{page}</div>
    </div>
  )
}

export default App
