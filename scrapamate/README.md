# 🎯 SCRAPAMATE

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?logo=python&logoColor=white)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-SocketIO-000000?logo=flask)](https://flask.palletsprojects.com)

**Google Maps lead harvester with cyberpunk real-time web UI.**

![SCRAPAMATE Dashboard](./screenshot.png)

<details>
<summary>🇹🇷 Türkçesi için Tıkla!</summary>

## Özellikler

- 🗺️ **Google Maps Scraping** – İşletme adı, telefon, adres, web sitesi çeker
- 📧 **E-posta Çıkarma** – Web sitelerinden otomatik e-posta bulur
- 🧠 **Context Analizi** – Hakkımızda sayfalarından içerik çıkarır
- 🌐 **Çift Dilli UI** – İngilizce (varsayılan) / Türkçe geçişi
- 🖥️ **Cyberpunk Arayüz** – Matrix efektli, 3D parallax GUI
- 📊 **Canlı Loglar** – WebSocket ile anlık durum takibi
- 🔊 **Ses Efektleri** – Synth tabanlı bildirim sesleri

## Hızlı Başlangıç

```bash
cd scrapamate
pip install -r requirements.txt
playwright install chromium
python app.py
```

Tarayıcıda aç: **http://127.0.0.1:5000**

> 💡 UI'da sağ üstteki **🇹🇷 TR** butonuyla Türkçe'ye geçebilirsin.

## Arayüz Kontrolleri

| Kontrol | Açıklama |
|---------|----------|
| **🇹🇷 TR / 🇬🇧 EN** | Dil değiştirme |
| **TARGET QUERY** | Google Maps arama sorgusu |
| **INITIATE HARVEST** | Scraping başlat |
| **NEURO-LINK** | Hedef analiz çıktıları |
| **SYSTEM LOGS** | Canlı log akışı |

## Yapı

| Dosya | Açıklama |
|-------|----------|
| `app.py` | Flask + SocketIO web sunucusu |
| `scraper.py` | Playwright ile Google Maps scraper |
| `sniper.py` | E-posta kampanya modülü |
| `templates/` | Cyberpunk HTML arayüzü |

## Nasıl Çalışır

```
1. Arama sorgusu gir (örn: "Software Companies in Istanbul")
2. INITIATE HARVEST butonuna tıkla
3. Playwright Chrome açar ve Google Maps'i tarar
4. Her işletme için:
   - İsim, telefon, adres, web sitesi çekilir
   - Web sitesinden e-posta aranır
   - Hakkımızda sayfasından context çıkarılır
5. Veriler targets.csv dosyasına kaydedilir
```

## ⚠️ Uyarı

> [!CAUTION]
> **Kullanım Riski:** Web scraping, sitelerin Hizmet Şartları tarafından kısıtlanabilir. Dikkatli ve sorumlu kullanın.

- Bu araç **yalnızca eğitim amaçlıdır**
- Aşırı hızlı sorgular IP engellemesine yol açabilir
- Yerleşik gecikmeler güvenli kullanım için tasarlanmıştır
- Yazar, herhangi bir hesap kısıtlamasından sorumlu değildir

</details>

---

## Features

- �️ **Google Maps Scraping** – Extracts business name, phone, address, website
- 📧 **Email Extraction** – Automatically finds emails from business websites
- 🧠 **Context Analysis** – Scrapes About Us pages for personalization data
- 🌐 **Bilingual UI** – English (default) / Turkish toggle
- 🖥️ **Cyberpunk Interface** – Matrix rain effect, 3D parallax GUI
- 📊 **Live Logs** – Real-time status via WebSocket
- 🔊 **Sound Effects** – Synth-based notification sounds

---

## Quick Start

```bash
cd scrapamate
pip install -r requirements.txt
playwright install chromium
python app.py
```

Open in browser: **http://127.0.0.1:5000**

> 💡 Use the **🇹🇷 TR** button in the UI header to switch to Turkish.

---

## UI Controls

| Control | Description |
|---------|-------------|
| **🇹🇷 TR / 🇬🇧 EN** | Language toggle |
| **TARGET QUERY** | Google Maps search query |
| **INITIATE HARVEST** | Start the scraping process |
| **NEURO-LINK** | AI-style target analysis output |
| **SYSTEM LOGS** | Real-time log stream |

---

## Structure

| File | Description |
|------|-------------|
| `app.py` | Flask + SocketIO web server |
| `scraper.py` | Playwright-based Google Maps scraper |
| `sniper.py` | Email campaign module |
| `templates/` | Cyberpunk HTML interface |

---

## How It Works

```
1. Enter search query (e.g., "Software Companies in Istanbul")
2. Click INITIATE HARVEST
3. Playwright opens Chrome and scrapes Google Maps
4. For each business:
   - Extracts name, phone, address, website
   - Visits website to find email
   - Scrapes About Us page for context
5. Data saved to targets.csv
```

### Scraping Flow

| Step | Action | Output |
|------|--------|--------|
| 1️⃣ | Search Google Maps | List of businesses |
| 2️⃣ | Click each result | Business details panel |
| 3️⃣ | Extract info | Name, phone, address, website |
| 4️⃣ | Visit website | Email via mailto or regex |
| 5️⃣ | Find About page | Context text (1500 chars max) |

---

## Requirements

- Python 3.8+
- Modern browser (Chromium installed via Playwright)
- Internet connection

---

## ⚠️ Disclaimer

> [!CAUTION]
> **Usage Risk:** Web scraping may be restricted by websites' Terms of Service. Use responsibly and ethically.

- This tool is for **educational purposes only**
- Aggressive scraping may result in IP blocking
- Built-in delays are designed for safe usage
- The author is not responsible for any restrictions or data misuse

---

## Author

Built by **[Mete Avcı](https://github.com/MeteAvci)** with **AI Final Boss aka ÇeteGPT**

Part of [Hackamate](https://github.com/MeteAvci/hackamate) arsenal

---

## License

[MIT](../LICENSE)
