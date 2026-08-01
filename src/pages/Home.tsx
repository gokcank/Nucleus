import {
  LayoutPanelTop,
  LayoutGrid,
  Activity,
  ListChecks,
  BatteryCharging,
  CloudSun,
  MonitorCog,
  Palette,
  ExternalLink,
  type LucideIcon,
} from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import type { TranslationKey } from '../i18n/translations'
import { Link } from '../router/Router'
import heroImg from '../assets/hero.png'

const REPO_URL = 'https://github.com/gokcank/NucleusWeb'

const features: { icon: LucideIcon; titleKey: TranslationKey; descKey: TranslationKey }[] = [
  { icon: LayoutPanelTop, titleKey: 'feature.panel.title', descKey: 'feature.panel.desc' },
  { icon: LayoutGrid, titleKey: 'feature.dashboard.title', descKey: 'feature.dashboard.desc' },
  { icon: Activity, titleKey: 'feature.monitoring.title', descKey: 'feature.monitoring.desc' },
  { icon: ListChecks, titleKey: 'feature.productivity.title', descKey: 'feature.productivity.desc' },
  { icon: BatteryCharging, titleKey: 'feature.connectivity.title', descKey: 'feature.connectivity.desc' },
  { icon: CloudSun, titleKey: 'feature.weather.title', descKey: 'feature.weather.desc' },
  { icon: MonitorCog, titleKey: 'feature.hardware.title', descKey: 'feature.hardware.desc' },
  { icon: Palette, titleKey: 'feature.theming.title', descKey: 'feature.theming.desc' },
]

export function Home() {
  const { t } = useI18n()

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-8 flex flex-col items-center gap-16">
      <section className="text-center flex flex-col items-center gap-4 max-w-2xl">
        <img src={heroImg} alt="" width={96} height={101} className="mb-2" />
        <h1 className="text-3xl">{t('home.title')}</h1>
        <p className="text-lg text-heading">{t('home.subtitle')}</p>
        <p className="text-text">{t('home.description')}</p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="glass-panel rounded-btn px-4 py-2 flex items-center gap-2 text-heading"
          >
            <ExternalLink size={16} strokeWidth={1.75} aria-hidden="true" />
            {t('home.cta.github')}
          </a>
          <Link
            to="/roadmap"
            className="rounded-btn px-4 py-2 border border-border text-text"
          >
            {t('home.cta.roadmap')}
          </Link>
        </div>
      </section>

      <section className="w-full flex flex-col items-center gap-6">
        <h2 className="text-xl">{t('features.heading')}</h2>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ icon: Icon, titleKey, descKey }) => (
            <div key={titleKey} className="glass-panel rounded-card p-4 text-left flex flex-col gap-2">
              <Icon size={20} strokeWidth={1.75} className="text-accent" aria-hidden="true" />
              <h3 className="text-base">{t(titleKey)}</h3>
              <p className="text-sm text-text">{t(descKey)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
