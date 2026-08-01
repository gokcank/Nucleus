import { useI18n } from '../i18n/I18nContext'

const SITE_REPO_URL = 'https://github.com/gokcank/NucleusWeb'
const LICENSE_URL = 'https://github.com/gokcank/ProjectNucleus/blob/main/LICENSE'

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="border-t border-border">
      <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3 text-sm text-text">
        <p>{t('footer.tagline')}</p>
        <div className="flex items-center gap-4">
          <a href={SITE_REPO_URL} target="_blank" rel="noreferrer" className="hover:text-heading transition-colors duration-150">
            {t('footer.source')}
          </a>
          <a href={LICENSE_URL} target="_blank" rel="noreferrer" className="hover:text-heading transition-colors duration-150">
            {t('footer.license')}
          </a>
        </div>
      </div>
    </footer>
  )
}
