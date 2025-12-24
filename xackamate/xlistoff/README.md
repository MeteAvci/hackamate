# XLISTOFF v1.5

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Platform](https://img.shields.io/badge/Platform-X%20(Twitter)-1DA1F2?logo=x)](https://x.com)

**Browser console script to bulk unfollow accounts that don't follow you back.**

<details>
<summary>🇹🇷 Türkçesi için Tıkla!</summary>

## Özellikler

- 👁️ **Sadece Takip Etmeyenleri Göster** – Seni geri takip etmeyenleri listeler
- 📋 **İnceleme Modu** – Önce listele, sonra koru/sil seç
- 🔍 **Akıllı Scroll Arama** – Kullanıcıyı bulmak için tüm sayfayı tarar
- 🌐 **Çift Dilli UI** – İngilizce (varsayılan) / Türkçe geçişi
- ⚡ **Ayarlanabilir Hız** – 300ms-4000ms arası gecikme
- 🖥️ **Sürüklenebilir Panel** – Koyu tema GUI arayüzü
- 📊 **Canlı İstatistikler** – Toplam, hedef, hariç sayıları anlık gösterir

## Hızlı Başlangıç

1. [X.com](https://x.com) aç ve **Following (Takip Edilenler)** sayfana git
2. Tarayıcıda **DevTools** aç (`F12` → Console sekmesi)
3. Script içeriğini **yapıştır** ve `Enter`a bas
4. **BAŞLAT** butonuna tıkla (liste modu aktif)
5. Sayfa sonuna kadar seni takip etmeyenler listelenir
6. İstediğin kullanıcıları **çift tıkla** ile koruma altına al
7. **🔥 TAKİBİ BIRAK** butonuna tıkla

## Arayüz Kontrolleri

| Kontrol | Açıklama |
|---------|----------|
| **EN/TR** | Dil değiştirme |
| **LİSTELEME MODU** | Açık: Önce listeler. Kapalı: Anında siler |
| **BEKLEME SÜRESİ** | İşlemler arası gecikme (300-4000ms) |
| **BAŞLAT** | Taramayı başlat/durdur |
| **🔥 TAKİBİ BIRAK** | Listedeki hedefleri sırayla siler |
| **Çift Tıkla** | Kullanıcıyı koru/korumadan çıkar |

## Akıllı Arama Mantığı

Script, kullanıcıları bulmak için **3-pass akıllı scroll sistemi** kullanır:

| Geçiş | Eylem |
|-------|-------|
| 1️⃣ | Mevcut konumdan aşağı doğru tara |
| 2️⃣ | Bulunamadı? En başa dön, tekrar ara |
| 3️⃣ | Hala yok? Son bir geçiş daha yap |

Bu sayede liste ne kadar uzun olursa olsun, hiçbir kullanıcı atlanmaz.

## ⚠️ Uyarı

> [!CAUTION]
> **Kullanım Riski:** X (Twitter) Hizmet Şartları, "toplu işlemler"i gri alan olarak tanımlar. Aşırı hızlı unfollow geçici hesap kısıtlamasına yol açabilir.

- Bu araç **yalnızca kişisel kullanım** içindir
- Script API kullanmaz, DOM manipülasyonu yapar
- Yerleşik hız sınırlayıcı güvenli kullanım için tasarlanmıştır
- Yazar, olası hesap kısıtlamalarından sorumlu değildir

</details>

---

## Features

- 👁️ **Non-Followers Only** – Lists accounts that don't follow you back
- 📋 **Review Mode** – List first, then choose to protect/remove
- 🔍 **Smart Scroll Search** – Scans entire page to find each user
- 🌐 **Bilingual UI** – English (default) / Turkish toggle
- ⚡ **Adjustable Speed** – 300ms to 4000ms delay between operations
- 🖥️ **Draggable UI Panel** – Dark theme GUI overlay
- 📊 **Live Statistics** – Real-time count of total, target, excluded

---

## Quick Start

1. Open [X.com](https://x.com) and go to your **Following** page
2. Open browser **DevTools** (`F12` → Console tab)
3. **Paste** the entire script content and press `Enter`
4. Click **START** button (listing mode is active by default)
5. Script scrolls and lists non-followers
6. **Double-click** any user to mark as protected
7. Click **🔥 UNFOLLOW** to process the list

---

## UI Controls

| Control | Description |
|---------|-------------|
| **EN/TR** | Toggle between English and Turkish UI |
| **LISTING MODE** | On: Lists first. Off: Instantly removes |
| **WAIT TIME** | Delay between operations (300-4000ms) |
| **START** | Start/Stop scanning |
| **🔥 UNFOLLOW** | Process listed targets one by one |
| **Double-click** | Toggle user protection |

---

## How It Works

```
1. Script scans visible user cells in DOM
2. Checks if each user has "follows you" badge
3. If no badge → Added to target list
4. User clicks UNFOLLOW button
5. Script scrolls to TOP first
6. For each target:
   - Smart scroll search (3-pass system)
   - Click unfollow → Confirm dialog
7. Repeat until all processed
```

### Smart Scroll Search

The script uses a **3-pass intelligent scroll system** to find users:

| Pass | Action |
|------|--------|
| 1️⃣ | Scan from current position to bottom |
| 2️⃣ | Not found? Go to top, scan again |
| 3️⃣ | Still missing? One more full pass |

This ensures **no user is ever skipped**, regardless of list length.

---

## Requirements

- Modern browser (Chrome, Firefox, Edge)
- Logged into X.com
- On your own Following page

---

## ⚠️ Disclaimer

> [!CAUTION]
> **Usage Risk:** X (Twitter) Terms of Service define "mass actions" as a gray area. Aggressive unfollowing may result in temporary account restrictions.

- This tool is for **personal use only**
- Script uses DOM manipulation, not API – no API rate limits apply
- Built-in speed limiter is designed for safe usage
- The author is not responsible for any account restrictions

---

## License

[MIT](../../LICENSE)
