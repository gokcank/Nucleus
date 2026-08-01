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
3. ~~Ana sayfa (tanıtım)~~ — **tamamlandı**.
   - `src/pages/Home.tsx`: hero bölümü (`hero.png`, başlık, alt başlık,
     açıklama, "GitHub'da Görüntüle" ve "Yol Haritasına Bak" butonları) ve
     README'deki özellik listesinden türetilmiş 8 kartlık bir ızgara
     (`.glass-panel`, Lucide ikonları, EN/TR çevirisi).
   - `src/i18n/translations.ts` genişletildi: hero + 8 özellik kartı için
     EN/TR anahtarlar eklendi (toplam 25/25, iki dilde birebir eşleşiyor).
   - Playwright ile (chromium-cli mevcut değildi, global `@playwright/test`
     paketinin çekirdek modülleri elle kullanıldı) ışık/koyu tema ve EN/TR
     geçişi görsel olarak doğrulandı — konsol hatası yok, düzen bozuk değil.
4. ~~Roadmap ve Kararlar sayfaları~~ — **tamamlandı**.
   - `src/pages/MarkdownPage.tsx`: `react-markdown` + `remark-gfm` ile
     markdown'ı render eden ortak bileşen; `src/pages/Roadmap.tsx` ve
     `src/pages/Decisions.tsx` bunu `src/content/*.md`'yi Vite'ın `?raw`
     içe aktarımıyla besliyor.
   - `src/index.css`'e UI_GUIDELINES tipografisine uygun bir `.prose`
     yardımcı sınıfı eklendi (başlıklar, blockquote → vurgu kartı, tablo,
     kod bloğu/satır içi kod, `hr` ayırıcılar). Kod bloğu arka planı için
     yeni bir `--color-code-bg` token'ı eklendi.
   - Playwright ile her iki sayfanın tamamı (tablo, blockquote, kod bloğu,
     liste, `hr` dahil) görsel olarak kontrol edildi — konsol hatası yok.
   - Not: markdown içerikleri (roadmap.md/decisions.md) tek dilde
     (İngilizce); dil değiştirme düğmesi yalnızca site arayüzünü (nav,
     ana sayfa metinleri) çeviriyor, bu iki belgeyi değil — bilinçli bir
     kapsam sınırı, belgelerin ayrıca çevrilmesi istenmedi.
5. ~~Nav/Footer ve genel layout~~ — **tamamlandı**.
   - `src/components/Nav.tsx`: üstte sabit (sticky), cam görünümlü bir üst
     bar — logo + "Project Nucleus" yazısı (dar ekranlarda yalnızca logo),
     Ana Sayfa/Yol Haritası/Kararlar bağlantıları (aktif sayfa vurgulu) ve
     `Languages` ikonlu dil değiştirme düğmesi.
   - `src/components/Footer.tsx`: kısa açıklama metni + bu sitenin kendi
     kaynak koduna (`Nucleus`) ve ana uygulamanın MIT lisansına
     (`ProjectNucleus` deposu) bağlantılar.
   - **Düzeltilen hata:** Ana sayfadaki "GitHub'da Görüntüle" butonu adım
     3'te yanlışlıkla bu web sitesinin kendi deposuna (`Nucleus`)
     işaret ediyordu; asıl uygulama deposu olan `ProjectNucleus`'a
     düzeltildi.
   - **Düzeltilen mobil hata:** İlk halinde 420px gibi dar ekranlarda
     marka yazısı satırı bölüp dil düğmesiyle çakışıyordu; dar ekranda
     yazı gizlenip gezinme bağlantıları alt satıra alınarak düzeltildi —
     Playwright ile 420px genişlikte doğrulandı.
   - `App.tsx` artık `Nav`/`Footer`'ı sarıp sayfaları ortada gösteren ince
     bir kabuk.
6. ~~GitHub Pages deploy workflow'u~~ — **tamamlandı**.
   - **Karar (kullanıcıyla netleşti):** Proje sayfası olarak yayınlanacak —
     `https://gokcank.github.io/Nucleus/`. Özel alan adı yok.
   - `vite.config.ts`: `base`, sadece `vite build` sırasında
     `/Nucleus/` oluyor (dev sunucusunda hâlâ `/` — yerel geliştirme
     etkilenmedi).
   - `src/router/Router.tsx` taban yola duyarlı hale getirildi: uygulama
     içindeki rotalar hep temiz kalıyor (`/`, `/roadmap`, `/decisions`),
     `import.meta.env.BASE_URL` üzerinden gerçek adresle
     eklenip/çıkarılıyor — taban yol ileride değişirse (örn. özel domain)
     tek değişiklik yeri `vite.config.ts` olacak.
   - **GitHub Pages'in statik barındırmada sunucu taraflı yönlendirme
     yapmaması sorunu:** `/Nucleus/roadmap` gibi bir adrese doğrudan
     gidildiğinde (ya da sayfa yenilendiğinde) eşleşen bir dosya
     bulunamıyor. Çözüm: `package.json`'a bir `postbuild` betiği eklendi
     (`dist/index.html`'i `dist/404.html`'e kopyalıyor). GitHub Pages
     404 durumunda bu dosyanın içeriğini döndürüyor; adres çubuğundaki
     gerçek yol değişmediği için istemci taraflı router doğru sayfayı
     render ediyor — karmaşık bir yönlendirme hilesi gerekmedi.
   - `.github/workflows/deploy.yml`: `main`'e push'ta tetiklenen, `npm ci`
     + `npm run build` yapıp `actions/upload-pages-artifact` +
     `actions/deploy-pages` ile yayınlayan standart bir workflow.
   - **Kullanıcının GitHub'da yapması gereken tek şey:** Repo
     Settings → Pages → Source kısmını "GitHub Actions" olarak
     ayarlamak (bu, Claude Code'un otomatikleştiremeyeceği bir GitHub UI
     adımı).
   - Doğrulama: gerçek bir statik dosya sunucusu ile (`dist/` içeriğini,
     GitHub Pages'in 404 davranışını taklit edecek şekilde) yerel olarak
     simüle edildi — doğrudan derin bağlantı, taban yoldan varlık
     yükleme, geri/ileri gezinme ve dil değiştirme Playwright ile
     doğrulandı, konsol hatası yok. Ayrıca yerel `npm run dev`'in hâlâ
     kök dizinde (taban yolsuz) sorunsuz çalıştığı da ayrıca test edildi.
7. ~~Dev sunucusunu çalıştırıp tarayıcıda gözden geçirme~~ — her adımda
   zaten Playwright ile yapılıyor, ayrı bir adım olarak kapatıldı.

## 5. Tasarım referansı

Site, ana uygulamanın `docs/UI_GUIDELINES.md` dosyasındaki ilkeleri
(restrained glassmorphism, spacing skalası 4/8/12/16/24/32px, radius:
buton/input 10px, kart 18px, panel 24px, Lucide ikonlar, sistem fontu,
150-250ms ease-out animasyonlar) takip etmeli — bu belge `reference/`
altında mevcut.

## 6. Sabit kurallar (ana projeden taşınan, burada da geçerli)

- Commit mesajlarında asla `Co-Authored-By: Claude` veya benzeri
  kullanılmayacak.
- **Her yeni adıma başlamadan önce** (sadece sorulunca değil, proaktif olarak)
  o adıma uygun bir model + efor seviyesi öner; sonra kullanıcının `/model`
  ile açıkça seçim yapmasını bekle — aynı model zaten aktif olsa bile
  sessizce ilerleme.
- Kullanıcıya gösterilen plan ve raporlar düz dille yazılır — kod bloğu,
  sınıf/fonksiyon adı kullanılmadan.
- Yeni klasör/mimari kararları (örn. bu projenin kendisi) gerekçelendirilmeli;
  ana projedeki ADR sistemine benzer bir kayıt bu repoda da düşünülebilir
  ama henüz kurulmadı.

## 7. Açık sorular

- ~~GitHub Pages nasıl servis edilecek~~ — **çözüldü**: proje sayfası olarak,
  `gokcank.github.io/Nucleus`. Kalan tek manuel adım: GitHub'da repo
  Settings → Pages → Source'u "GitHub Actions" yapmak.
- ~~Bu repo GitHub'a ne zaman/nasıl push edilecek~~ — **çözüldü**: repo
  `git init` edildi, ilk push `git@github.com:gokcank/NucleusWeb.git`
  adresine yapıldı.
- **Site/depo adı değişti: `NucleusWeb` → `Nucleus`.** Kullanıcı site
  adresinin `gokcank.github.io/Nucleus` olmasını istedi. Kod tarafında
  (`vite.config.ts`'deki `base`, `Router.tsx`, `Footer.tsx`'teki kaynak
  kod bağlantısı, bu belge) `Nucleus` olarak güncellendi ve yerel `origin`
  adresi `git@github.com:gokcank/Nucleus.git` olarak değiştirildi.
  **Kullanıcının GitHub'da yapması gereken:** deponun adını `NucleusWeb`'den
  `Nucleus`'a çevirmek (Settings → General → Repository name) — `gh` CLI
  bu ortamda kurulu olmadığı için bu adım otomatikleştirilemedi.

## 8. Git iş akışı kuralı

**Bundan sonra bu depoda yalnızca commit atılacak, `git push` çalıştırılmayacak
— push'u kullanıcı kendisi yapacak.** Bu, önceki bir push onaylandıktan sonra
kullanıcının kalıcı kural olarak istediği bir şey; tek seferlik onay olarak
değil, her oturumda geçerli varsayılan olarak uygulanmalı.
