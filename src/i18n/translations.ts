export type Lang = 'en' | 'tr'

export const translations = {
  en: {
    'nav.home': 'Home',
    'nav.roadmap': 'Roadmap',
    'nav.decisions': 'Decisions',
    'home.title': 'Project Nucleus',
    'home.subtitle': 'A modular control center for Linux.',
  },
  tr: {
    'nav.home': 'Ana Sayfa',
    'nav.roadmap': 'Yol Haritası',
    'nav.decisions': 'Kararlar',
    'home.title': 'Project Nucleus',
    'home.subtitle': 'Linux için modüler bir kontrol merkezi.',
  },
} as const satisfies Record<Lang, Record<string, string>>

export type TranslationKey = keyof (typeof translations)['en']
