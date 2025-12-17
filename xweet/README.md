# XWEET DESTROYER v2.5

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Platform](https://img.shields.io/badge/Platform-X%20(Twitter)-1DA1F2?logo=twitter)](https://x.com)

**Browser console script to bulk delete old tweets and unretweet content before a specified date.**

<details>
<summary>🇹🇷 Türkçesi için Tıkla!</summary>

## Özellikler

- 🗓️ **Tarihe göre filtreleme** – Sadece belirlenen tarihten eski tweetleri siler
- 🔁 **Retweet silme** – İsteğe bağlı olarak eski retweetleri geri alır
- 🌐 **Çift dilli arayüz** – İngilizce (varsayılan) / Türkçe geçişi
- ⚡ **Ayarlanabilir hız** – İşlemler arası 1000-5000ms gecikme
- 🖥️ **Sürüklenebilir panel** – Koyu tema GUI arayüzü
- 📊 **Canlı istatistikler** – Silinen, RT, atlanan sayıları anlık gösterir
- 🛡️ **Kayma önleme mantığı** – DOM scroll sorunlarını önler

## Hızlı Başlangıç

1. [X.com](https://x.com) aç ve **profil sayfana** git
2. Tarayıcıda **DevTools** aç (`F12` → Console sekmesi)
3. Script içeriğini **yapıştır** ve `Enter`a bas
4. Panelde **hedef tarihi** seç
5. İstersen **Retweet silme** seçeneğini aç/kapa
6. Gerekirse dil tuşuna (**TR/EN**) tıkla
7. **BAŞLAT**'a tıkla

## Arayüz Kontrolleri

| Kontrol | Açıklama |
|---------|----------|
| **TR/EN** | Türkçe ve İngilizce arayüz geçişi |
| **HEDEF TARİH** | Bu tarihten eski tweetler silinir |
| **RETWEETLERİ SİL** | Retweet silme aç/kapa |
| **HIZ AYARI** | İşlemler arası gecikme (1000-5000ms) |
| **BAŞLAT** | Silme işlemini başlat |
| **DURDUR** | Silme işlemini durdur |

## Gereksinimler

- Modern tarayıcı (Chrome, Firefox, Edge)
- X.com'a giriş yapılmış olmalı
- Kendi profil sayfanızda olmalısınız

### Algılama Mantığı

Script, silme/retweet butonlarını **çok katmanlı fallback sistemi** ile bulur:

| Öncelik | Yöntem | Açıklama |
|---------|--------|----------|
| 1️⃣ | **Metin Eşleşme** | Menüde "delete"/"sil" (EN/TR) arar |
| 2️⃣ | **SVG İkon** | Metin bulunamazsa çöp kutusu ikonu eşleştirir |
| 3️⃣ | **Renk** | Kırmızı renk (`rgb(244,33,46)`) tehlike butonu olarak algılar |

Bu sayede X buton etiketlerini değiştirse veya farklı dil kullansanız bile script çalışır.

## ⚠️ Uyarı

> [!CAUTION]
> **Kullanım Riski:** X (Twitter) Hizmet Şartları, "toplu işlemler" ve "otomasyon"u gri alan olarak tanımlar. Aşırı agresif kullanım (çok hızlı silme) geçici hesap kısıtlamasına yol açabilir.

- Bu araç **yalnızca kişisel kullanım** içindir
- Script API kullanmaz, DOM manipülasyonu yapar – API limitleri uygulanmaz
- Yerleşik hız sınırlayıcı (1000-5000ms) güvenli kullanım için tasarlanmıştır
- Silinen tweetler **geri alınamaz** – önce arşiv indirmeniz önerilir
- Yazar, olası hesap kısıtlamalarından veya veri kaybından sorumlu değildir

</details>

---

## Features

- 🗓️ **Date-based filtering** – Delete only tweets older than your target date
- 🔁 **Retweet removal** – Optionally unretweet old retweets
- 🌐 **Bilingual UI** – English (default) / Turkish toggle
- ⚡ **Adjustable speed** – 1000ms to 5000ms delay between operations
- 🖥️ **Draggable UI panel** – Dark theme GUI overlay
- 📊 **Live statistics** – Real-time count of deleted, retweeted, skipped
- 🛡️ **Anti-drift logic** – Prevents DOM scroll issues

---

## Quick Start

1. Open [X.com](https://x.com) and go to your **profile page**
2. Open browser **DevTools** (`F12` → Console tab)
3. **Paste** the entire script content and press `Enter`
4. **Set target date** in the panel
5. Toggle **Retweet deletion** if desired
6. Click language toggle (**TR/EN**) if needed
7. Click **START**

---

## UI Controls

| Control | Description |
|---------|-------------|
| **TR/EN** | Toggle between Turkish and English UI |
| **TARGET DATE** | Tweets older than this will be deleted |
| **DELETE RETWEETS** | Toggle retweet removal on/off |
| **SPEED SETTING** | Delay between operations (1000-5000ms) |
| **START** | Start the deletion process |
| **STOP** | Stop the deletion process |

---

## How It Works

```
1. Script scans visible tweets in DOM
2. Checks each tweet's datetime against target date
3. For tweets older than target:
   - If retweet: clicks unretweet → confirms
   - If own tweet: opens menu → clicks delete → confirms
4. Scrolls down to load more tweets
5. Repeats until stopped
```

### Detection Logic

The script finds delete/unretweet buttons using a **multi-layer fallback system**:

| Priority | Method | Description |
|----------|--------|-------------|
| 1️⃣ | **Text Match** | Looks for "delete"/"sil" (EN/TR) in menu items |
| 2️⃣ | **SVG Icon** | Matches trash icon SVG path if text not found |
| 3️⃣ | **Color** | Detects red color (`rgb(244,33,46)`) as danger button |

This ensures the script works even if X changes button labels or you use a different language.

---

## Requirements

- Modern browser (Chrome, Firefox, Edge)
- Logged into X.com
- On your own profile page

---

## ⚠️ Disclaimer

> [!CAUTION]
> **Usage Risk:** X (Twitter) Terms of Service define "mass actions" and "automation" as a gray area. Aggressive usage (very fast deletion) may result in temporary account restrictions.

- This tool is for **personal use only**
- Script uses DOM manipulation, not API – no API rate limits apply
- Built-in speed limiter (1000-5000ms) is designed for safe usage
- Deleted tweets are **irreversible** – consider downloading your archive first
- The author is not responsible for any account restrictions or data loss


## License

[MIT](LICENSE)
