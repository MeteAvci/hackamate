# 🎯 SCRAPAMATE

**Google Maps lead harvester with real-time web UI.**

> *Harvest business leads from Google Maps with email extraction and context analysis.*

![SCRAPAMATE Dashboard](./screenshot.png)

<details>
<summary>🇹🇷 Türkçesi için Tıkla!</summary>

## 🎯 SCRAPAMATE

**Gerçek zamanlı web arayüzlü Google Maps potansiyel müşteri toplayıcı.**

> *Google Maps'ten e-posta çıkarma ve bağlam analizi ile iş potansiyel müşterilerini toplayın.*

---

### 🚀 Kurulum

```bash
cd scrapamate
pip install -r requirements.txt
playwright install chromium
```

### ▶️ Başlatma

```bash
python app.py
```

Tarayıcıda aç: **http://127.0.0.1:5000**

> 💡 UI'da sağ üstteki **🇹🇷 TR** butonuyla Türkçe'ye geçebilirsin.

---

### 📦 Yapı

| Dosya | Açıklama |
|-------|----------|
| `app.py` | Flask web arayüzü (ana giriş noktası) |
| `scraper.py` | Google Maps scraper motoru |
| `sniper.py` | E-posta kampanya modülü |
| `templates/` | Web UI şablonları |

---

### ⚠️ Uyarı

Sadece eğitim amaçlıdır. Sorumlu kullanın.

</details>

---

## 🚀 Setup

```bash
cd scrapamate
pip install -r requirements.txt
playwright install chromium
```

## ▶️ Run

```bash
python app.py
```

Open in browser: **http://127.0.0.1:5000**

> 💡 Use the **🇹🇷 TR** button in the UI header to switch to Turkish.

---

## 📦 Structure

| File | Description |
|------|-------------|
| `app.py` | Flask web UI (main entry point) |
| `scraper.py` | Google Maps scraper engine |
| `sniper.py` | Email campaign module |
| `templates/` | Web UI templates |

---

## 🔧 How It Works

1. **Enter a search query** (e.g., "Software Companies in Istanbul")
2. **Click INITIATE HARVEST** - Playwright opens Chrome and scrapes Google Maps
3. **Watch real-time logs** as targets are found
4. **Targets saved** to `targets.csv` with name, phone, email, context

---

## 👤 Author

Built by **[Mete Avcı](https://github.com/MeteAvci)** with **AI Final Boss aka ÇeteGPT**

Part of [Hackamate](https://github.com/MeteAvci/hackamate) arsenal

---

## ⚠️ Disclaimer

Educational purposes only. Use responsibly.
