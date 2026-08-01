# AI Handoff — nucleus-web

Bu dosya, bu projeyle ilgili sohbetin başka bir Claude Code oturumuna
taşınması için yazıldı. Amaç: yeni oturumun buradan sıfırdan başlamak yerine
kaldığımız yerden devam edebilmesi. Kaynak konuşma `Linux/Project Nucleus`
dizininde geçti; oradaki proje koduna **hiçbir değişiklik yapılmadı**, sadece
bu yeni, bağımsız site projesi burada oluşturuldu.

---

## 1. Ne yapıyoruz

**Project Nucleus** (`/home/gokcank/projects/Linux/Project Nucleus`) için
GitHub Pages'da yayınlanacak bir tanıtım + dokümantasyon web sitesi.
Nucleus kendisi bir Tauri masaüstü uygulaması olduğu için tarayıcıda
çalışmaz — bu site onun ayrı, bağımsız bir web vitrinidir.

## 2. Kapsam kararları (kullanıcıyla netleşti)

- **İçerik:** Sadece tanıtım sayfası değil — Roadmap ve Kararlar (ADR)
  belgeleri de sitede gezilebilir olacak.
- **Dil:** İki dilli (EN/TR), README ile tutarlı.
- **Teknoloji:** Vite + React + TypeScript, ana Tauri projesinden tamamen
  bağımsız, ayrı bir repo/proje (`react-router-dom` yerine hafif, elle
  yazılmış routing — aşağıya bakın).
- **Görseller:** Kullanıcı ekran görüntülerini kendisi sağlayacak, henüz
  teslim edilmedi. Şimdilik görselsiz/placeholder ile ilerlenecek.

## 3. Şimdiye kadar yapılanlar

- `npm create vite@latest . -- --template react-ts` ile proje iskeleti
  kuruldu.
- Bağımlılıklar kuruldu: `tailwindcss` + `@tailwindcss/vite` (v4, ana
  projeyle aynı yaklaşım), `lucide-react` (ikonlar, UI_GUIDELINES gereği),
  `react-markdown` + `remark-gfm` (Roadmap/Kararlar sayfalarını markdown'dan
  render etmek için).
- **`react-router-dom` kuruldu, sonra kaldırıldı.** Güncel sürüm aralığının
  tamamı (RSC/SSR odaklı, bizim kullanmayacağımız özellikler için) `npm
  audit`'te yüksek önem dereceli olarak işaretlendi ve net bir "güvenli"
  sürüm yoktu. Sadece birkaç sayfamız olacağı için (Ana Sayfa, Roadmap,
  Kararlar), `docs/ARCHITECTURE.md`'deki "gereksiz bağımlılıktan kaçın"
  ilkesine uyarak bağımlılığı kaldırıp basit, kendi yazdığımız bir
  path-based routing kullanma kararı alındı. **Bu routing henüz yazılmadı.**
- `npm audit`: 0 açık.
- **Tailwind v4 kurulumu ve tasarım tokenleri tamamlandı.** `vite.config.ts`'e
  `@tailwindcss/vite` eklendi. `src/index.css`, UI_GUIDELINES'a göre tasarım
  tokenleri içeriyor: renkler (light/dark, `prefers-color-scheme` ile) CSS
  değişkenleri üzerinden `--color-*` adlarıyla Tailwind temasına bağlandı,
  radius (`--radius-btn/input/card/panel/dialog`) ve tekrar kullanılabilir bir
  `.glass-panel` yardımcı sınıfı eklendi. Spacing için **özel token
  eklenmedi** — Tailwind'in varsayılan 4px'lik ölçeği zaten UI_GUIDELINES'daki
  ölçekle birebir örtüşüyor (p-1=4/XS, p-2=8/SM, p-3=12/MD, p-4=16/LG,
  p-6=24/XL, p-8=32/XXL).
  - **Öğrenilen tuzak:** Spacing token'larını `xs/sm/md/lg/xl/2xl` gibi
    t-shirt isimleriyle tanımlamak, Tailwind'in `max-w-*`/`min-w-*` çözümleme
    sırasında (`--spacing` önce, `--container` sonra kontrol ediliyor)
    `max-w-md` gibi sınıfları sessizce bozuyor. Bu yüzden spacing için özel
    isim kullanılmadı, sadece varsayılan sayısal ölçek kullanılıyor.
  - `src/App.tsx`, bozuk olan create-vite şablonunu (`App.css` içe aktarımı
    zaten yoktu, dosya bulunamıyordu) basit bir yer tutucu ile değiştirdi —
    yeni token'ların (`.glass-panel`, `.rounded-panel`) çalıştığını
    doğrulamak için. Gerçek ana sayfa hâlâ adım 3'te yapılacak.
  - Kullanılmayan create-vite kalıntıları silindi: `src/assets/react.svg`,
    `src/assets/vite.svg`, `public/icons.svg`.
  - `npx tsc -b --noEmit` temiz, dev sunucusu (`npm run dev`) test edildi ve
    tokenler doğru derleniyor.

### Kopyalanan dosyalar

- **`reference/`** (git'e dahil değil, `.gitignore`'da — sadece metin/kopya
  yazarken referans için, iki repo'nun sessizce birbirinden sapmaması
  amacıyla asla commit edilmeyecek): `README.md`, `PRODUCT.md`, `VISION.md`,
  `UI_GUIDELINES.md`, `WIDGET_API.md`, `LICENSE` — hepsi ana projenin
  kopyası.
- **`src/content/roadmap.md`** ve **`src/content/decisions.md`** — bunlar
  gerçek içerik kaynağı (Roadmap ve Kararlar sayfaları bunları render
  edecek). Git'e dahil, ama iki ayrı repo olduğu için ana projedeki
  `docs/ROADMAP.md` / `docs/DECISIONS.md` güncellenince buraya **elle**
  taşınması gerekiyor — otomatik senkron yok.

## 4. Yapılacaklar (todo listesi, kaldığımız sıra)

1. ~~Tailwind v4 kurulumu + UI_GUIDELINES'daki tasarım tokenleri (renk, radius,
   spacing)~~ — **tamamlandı**.
2. ~~Basit i18n (EN/TR) ve routing altyapısı~~ — **tamamlandı**.
   - `src/i18n/translations.ts` + `src/i18n/I18nContext.tsx`: EN/TR sözlük,
     `localStorage`'da saklanan dil tercihi (`nucleus-web:lang`), yoksa
     tarayıcı dilinden (`navigator.language`) otomatik tespit.
   - `src/router/Router.tsx`: `react-router-dom` yerine elle yazılmış,
     `history.pushState`/`popstate` tabanlı minimal router (`RouterProvider`,
     `useRoute`, `Link`).
   - `src/main.tsx` bu iki provider'la (`I18nProvider`, `RouterProvider`)
     sarıldı. `src/App.tsx` şimdilik üç rotayı (`/`, `/roadmap`,
     `/decisions`) ve dil değiştirme butonunu içeren en yalın haliyle bu
     altyapıyı test ediyor — gerçek sayfa tasarımları adım 3/4/5'te.
   - **Açık nokta (adım 6'ya not):** Bu path-tabanlı routing, doğrudan
     `/roadmap` gibi bir adrese gidildiğinde veya sayfa yenilendiğinde
     sunucunun `index.html`'e yönlendirmesini gerektirir. Vite dev sunucusu
     bunu otomatik yapıyor (test edildi), ama GitHub Pages statik hosting
     için bu genelde bir `404.html` → `index.html` yönlendirme hilesi ister.
     GitHub Pages dağıtımı kurulurken (adım 6) unutulmamalı.
3. Ana sayfa (tanıtım) — **sıradaki adım**.
4. Roadmap ve Kararlar sayfaları (`src/content/*.md`'den `react-markdown` ile
   render).
5. Nav/Footer ve genel layout.
6. GitHub Pages deploy workflow'u (GitHub Actions ile `actions/deploy-pages`,
   henüz kurulmadı) — repo adı/özel domain netleşince `vite.config.ts`'deki
   `base` değeri buna göre ayarlanmalı, bu karar henüz verilmedi.
7. Dev sunucusunu çalıştırıp tarayıcıda gözden geçirme.

## 5. Tasarım referansı

Site, ana uygulamanın `docs/UI_GUIDELINES.md` dosyasındaki ilkeleri
(restrained glassmorphism, spacing skalası 4/8/12/16/24/32px, radius:
buton/input 10px, kart 18px, panel 24px, Lucide ikonlar, sistem fontu,
150-250ms ease-out animasyonlar) takip etmeli — bu belge `reference/`
altında mevcut.

## 6. Sabit kurallar (ana projeden taşınan, burada da geçerli)

- Commit mesajlarında asla `Co-Authored-By: Claude` veya benzeri
  kullanılmayacak.
- Model/efor önerdikten sonra kullanıcının `/model` ile açıkça seçim
  yapmasını bekle — aynı model zaten aktif olsa bile sessizce ilerleme.
- Kullanıcıya gösterilen plan ve raporlar düz dille yazılır — kod bloğu,
  sınıf/fonksiyon adı kullanılmadan.
- Yeni klasör/mimari kararları (örn. bu projenin kendisi) gerekçelendirilmeli;
  ana projedeki ADR sistemine benzer bir kayıt bu repoda da düşünülebilir
  ama henüz kurulmadı.

## 7. Açık sorular

- GitHub Pages nasıl servis edilecek: proje bazlı (`kullanıcıadi.github.io/
  nucleus-web`) mi, yoksa özel domain mi? `vite.config.ts`'deki `base`
  ayarını etkiliyor, henüz karar verilmedi.
- Bu repo GitHub'a ne zaman/nasıl push edilecek (repo henüz `git init`
  edilmedi).
