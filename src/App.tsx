import { Link, useRoute } from './router/Router'
import { useI18n } from './i18n/I18nContext'
import { Home } from './pages/Home'
import { Roadmap } from './pages/Roadmap'
import { Decisions } from './pages/Decisions'

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

  let page = <Home />
  if (path === '/roadmap') page = <Roadmap />
  else if (path === '/decisions') page = <Decisions />

  return (
    <div className="min-h-svh flex flex-col">
      <Nav />
      <div className="flex-1 flex flex-col items-center">{page}</div>
    </div>
  )
}

export default App
