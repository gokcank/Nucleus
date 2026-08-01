export type Lang = 'en' | 'tr'

export const translations = {
  en: {
    'nav.home': 'Home',
    'nav.roadmap': 'Roadmap',
    'nav.decisions': 'Decisions',

    'home.title': 'Project Nucleus',
    'home.subtitle': 'A modular control center for Linux.',
    'home.description':
      'Project Nucleus brings your everyday desktop tools — monitoring, productivity, utilities — into a single floating panel, one shortcut away.',
    'home.cta.github': 'View on GitHub',
    'home.cta.roadmap': 'See the Roadmap',

    'features.heading': 'What it does',

    'feature.panel.title': 'Floating Panel',
    'feature.panel.desc':
      'A borderless, glass-styled panel toggled with a global shortcut or the tray icon.',
    'feature.dashboard.title': 'Card Dashboard',
    'feature.dashboard.desc':
      'A responsive grid of cards you can reorder, resize, and show or hide.',
    'feature.monitoring.title': 'At-a-Glance Monitoring',
    'feature.monitoring.desc':
      'CPU, RAM, temperature and disk usage, always visible without opening a monitor app.',
    'feature.productivity.title': 'Productivity Tools',
    'feature.productivity.desc':
      'Clipboard history, notes, timer, stopwatch, Pomodoro, quick links and a todo list.',
    'feature.connectivity.title': 'Battery & Network',
    'feature.connectivity.desc':
      'Charge level for your machine and peripherals, plus connection type and live throughput.',
    'feature.weather.title': 'Weather',
    'feature.weather.desc':
      'Current conditions for a city you choose — no account, no location permission.',
    'feature.hardware.title': 'Hardware Info',
    'feature.hardware.desc':
      'Board, processor, graphics, memory, OS and kernel — read once, selectable text.',
    'feature.theming.title': 'Theming',
    'feature.theming.desc':
      'Light, Dark, or System — tracked live from your actual desktop color scheme.',
  },
  tr: {
    'nav.home': 'Ana Sayfa',
    'nav.roadmap': 'Yol Haritası',
    'nav.decisions': 'Kararlar',

    'home.title': 'Project Nucleus',
    'home.subtitle': 'Linux için modüler bir kontrol merkezi.',
    'home.description':
      'Project Nucleus, günlük masaüstü araçlarınızı — izleme, üretkenlik, yardımcı araçlar — tek bir kısayolla açılan, tek bir yüzen panelde bir araya getirir.',
    'home.cta.github': "GitHub'da Görüntüle",
    'home.cta.roadmap': 'Yol Haritasına Bak',

    'features.heading': 'Neler yapar',

    'feature.panel.title': 'Yüzen Panel',
    'feature.panel.desc':
      'Genel bir kısayol veya sistem tepsisi simgesiyle açılan, kenarlıksız, cam görünümlü bir panel.',
    'feature.dashboard.title': 'Kart Panosu',
    'feature.dashboard.desc':
      'Yeniden sıralayabileceğiniz, boyutlandırabileceğiniz, gösterip gizleyebileceğiniz duyarlı bir kart ızgarası.',
    'feature.monitoring.title': 'Bir Bakışta İzleme',
    'feature.monitoring.desc':
      'CPU, RAM, sıcaklık ve disk kullanımı; ayrı bir izleme uygulaması açmadan her zaman görünür.',
    'feature.productivity.title': 'Üretkenlik Araçları',
    'feature.productivity.desc':
      'Pano geçmişi, notlar, zamanlayıcı, kronometre, Pomodoro, hızlı bağlantılar ve yapılacaklar listesi.',
    'feature.connectivity.title': 'Pil ve Ağ',
    'feature.connectivity.desc':
      'Bilgisayarınız ve çevre birimleriniz için şarj seviyesi, bağlantı türü ve anlık veri hızı.',
    'feature.weather.title': 'Hava Durumu',
    'feature.weather.desc':
      'Seçtiğiniz bir şehir için güncel hava durumu — hesap veya konum izni gerekmez.',
    'feature.hardware.title': 'Donanım Bilgisi',
    'feature.hardware.desc':
      'Anakart, işlemci, ekran kartı, bellek, işletim sistemi ve çekirdek — bir kez okunur, seçilebilir metin.',
    'feature.theming.title': 'Tema',
    'feature.theming.desc':
      'Açık, Koyu veya Sistem — masaüstünüzün gerçek renk şemasından anlık olarak takip edilir.',
  },
} as const satisfies Record<Lang, Record<string, string>>

export type TranslationKey = keyof (typeof translations)['en']
