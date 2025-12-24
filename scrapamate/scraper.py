import asyncio
import pandas as pd
from playwright.async_api import async_playwright
import re
import os

# ============================================
# LANGUAGE CONFIG (default: en)
# ============================================
i18n = {
    'en': {
        'starting': 'Harvester starting... Target',
        'waiting': 'Waiting for results...',
        'no_feed': 'Result feed not found. Page structure may have changed.',
        'scrolling': 'Scanning list (Infinite Scroll)...',
        'end_of_list': 'Reached end of list.',
        'potential': 'Potential targets found',
        'extracting': 'Data extraction starting...',
        'scanning_site': 'Scanning website',
        'target_acquired': 'Target Acquired',
        'skipped': 'Target skipped',
        'no_data': 'No data to save.',
        'saved': 'Data saved to',
        'total': 'Total',
        'site_error': 'Website scan error',
        'site_unreachable': 'Site unreachable',
        'about_found': 'About page found',
        'selector_fallback': 'Selectors insufficient, extracting full page text...',
        'context_extracted': 'Context extracted',
        'chars': 'characters',
        'text_error': 'Text extraction error',
        'context_error': 'Context extraction error',
    },
    'tr': {
        'starting': 'Harvester başlatılıyor... Hedef',
        'waiting': 'Sonuçlar bekleniyor...',
        'no_feed': 'Sonuç akışı bulunamadı. Sayfa yapısı değişmiş olabilir.',
        'scrolling': 'Liste taranıyor (Infinite Scroll)...',
        'end_of_list': 'Listenin sonuna gelindi.',
        'potential': 'Bulunan potansiyel hedef',
        'extracting': 'Veri çekme işlemi başlıyor...',
        'scanning_site': 'Web sitesi taranıyor',
        'target_acquired': 'Hedef Alındı',
        'skipped': 'Bir hedef atlandı',
        'no_data': 'Kaydedilecek veri yok.',
        'saved': 'Veriler kaydedildi',
        'total': 'Toplam',
        'site_error': 'Web sitesi tarama hatası',
        'site_unreachable': 'Siteye erişilemedi',
        'about_found': 'Hakkımızda sayfası bulundu',
        'selector_fallback': 'Selectorler yetersiz kaldı, tüm sayfa metni alınıyor...',
        'context_extracted': 'Context çıkarıldı',
        'chars': 'karakter',
        'text_error': 'Metin alma hatası',
        'context_error': 'Context çıkarma hatası',
    }
}


class TheHarvester:
    def __init__(self, headless=False, lang='en'):
        self.headless = headless
        self.lang = lang
        self.results = []
        self.output_file = 'targets.csv'
    
    def t(self, key):
        return i18n.get(self.lang, i18n['en']).get(key, key)

    async def scrape_google_maps(self, query, max_results=50):
        print(f"[*] {self.t('starting')}: {query}")
        
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=self.headless)
            context = await browser.new_context(
                viewport={'width': 1920, 'height': 1080},
                user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            )
            page = await context.new_page()

            await page.goto("https://www.google.com/maps", timeout=60000)
            await page.wait_for_selector('input#searchboxinput')
            await page.fill('input#searchboxinput', query)
            await page.keyboard.press('Enter')
            
            print(f"[*] {self.t('waiting')}")
            try:
                await page.wait_for_selector('div[role="feed"]', timeout=15000)
            except:
                print(f"[!] {self.t('no_feed')}")
                await browser.close()
                return

            feed_selector = 'div[role="feed"]'
            print(f"[*] {self.t('scrolling')}")
            previous_height = 0
            
            while len(self.results) < max_results:
                await page.eval_on_selector(feed_selector, 'el => el.scrollTop = el.scrollHeight')
                await asyncio.sleep(2)
                
                new_height = await page.eval_on_selector(feed_selector, 'el => el.scrollHeight')
                if new_height == previous_height:
                    print(f"[*] {self.t('end_of_list')}")
                    break
                previous_height = new_height
                
                items = await page.locator('div[role="article"]').count()
                print(f"[*] {self.t('potential')}: {items}")
                if items >= max_results:
                    break

            print(f"[*] {self.t('extracting')}")
            listings = page.locator('div[role="article"]')
            count = await listings.count()
            
            for i in range(min(count, max_results)):
                try:
                    listing = listings.nth(i)
                    await listing.click()
                    await asyncio.sleep(1)
                    
                    data = {}
                    
                    try:
                        data['name'] = await page.locator('h1.DUwDvf').inner_text(timeout=2000)
                    except:
                        data['name'] = "Unknown"

                    try:
                        data['address'] = await page.locator('button[data-item-id="address"] .fontBodyMedium').inner_text(timeout=1000)
                    except:
                        data['address'] = ""

                    try:
                        data['phone'] = await page.locator('button[data-item-id^="phone"] .fontBodyMedium').inner_text(timeout=1000)
                    except:
                        data['phone'] = ""

                    try:
                        data['website'] = await page.locator('a[data-item-id="authority"] .fontBodyMedium').inner_text(timeout=1000)
                    except:
                        data['website'] = ""
                        
                    data['email'] = ""
                    data['context'] = ""
                    if data['website']:
                        print(f"   -> {self.t('scanning_site')}: {data['website']}")
                        data['email'] = await self.extract_email_from_website(page, data['website'])
                        data['context'] = await self.extract_context(page, data['website'])

                    print(f"[+] {self.t('target_acquired')}: {data['name']} | {data['phone']} | {data['email']}")
                    self.results.append(data)
                    
                except Exception as e:
                    print(f"[!] {self.t('skipped')}: {e}")
                    continue

            await browser.close()
            self.save_data()

    async def extract_email_from_website(self, page, url):
        try:
            if not url.startswith('http'):
                url = 'https://' + url

            context = page.context
            site_page = await context.new_page()
            
            try:
                await site_page.goto(url, timeout=15000, wait_until="domcontentloaded")
            except:
                await site_page.close()
                return ""

            try:
                mailto = await site_page.locator('a[href^="mailto:"]').first.get_attribute('href')
                if mailto:
                    email = mailto.replace('mailto:', '').split('?')[0].strip()
                    await site_page.close()
                    return email
            except:
                pass

            content = await site_page.content()
            emails = re.findall(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', content)
            valid_emails = [e for e in emails if not e.endswith(('.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp')) and 'example.com' not in e]
            
            await site_page.close()
            return valid_emails[0] if valid_emails else ""

        except Exception as e:
            print(f"   [!] {self.t('site_error')}: {e}")
            return ""

    async def extract_context(self, page, url):
        try:
            if not url.startswith('http'):
                url = 'https://' + url
                
            context = page.context
            site_page = await context.new_page()
            try:
                await site_page.goto(url, timeout=30000, wait_until="domcontentloaded")
            except Exception as e:
                print(f"   [!] {self.t('site_unreachable')} ({url}): {e}")
                await site_page.close()
                return ""

            text_content = ""
            about_keywords = ['hakkımızda', 'about', 'biz kimiz', 'vizyon', 'misyon', 'kurumsal']
            
            for keyword in about_keywords:
                try:
                    link = site_page.locator(f"a:has-text('{keyword}')").first
                    if await link.count() > 0:
                        print(f"   -> {self.t('about_found')}: {keyword}")
                        await link.click(timeout=5000)
                        await site_page.wait_for_load_state("domcontentloaded", timeout=10000)
                        break
                except:
                    continue

            try:
                elements = await site_page.locator('p, h1, h2, h3, article, section').all_inner_texts()
                text_content = " ".join([e.strip() for e in elements if len(e.strip()) > 10])
                
                if len(text_content) < 50:
                    print(f"   -> {self.t('selector_fallback')}")
                    text_content = await site_page.evaluate("document.body.innerText")
                    text_content = re.sub(r'\s+', ' ', text_content).strip()

                print(f"   -> {self.t('context_extracted')}: {len(text_content)} {self.t('chars')}")
                text_content = text_content[:1500]
            except Exception as e:
                print(f"   [!] {self.t('text_error')}: {e}")

            await site_page.close()
            return text_content

        except Exception as e:
            print(f"   [!] {self.t('context_error')}: {e}")
            return ""

    def save_data(self):
        if not self.results:
            print(f"[!] {self.t('no_data')}")
            return
            
        df = pd.DataFrame(self.results)
        if os.path.exists(self.output_file):
            df.to_csv(self.output_file, mode='a', header=False, index=False)
        else:
            df.to_csv(self.output_file, index=False)
            
        print(f"[*] {self.t('saved')} {self.output_file}. {self.t('total')}: {len(self.results)}")


if __name__ == "__main__":
    harvester = TheHarvester(headless=True, lang='en')
    asyncio.run(harvester.scrape_google_maps("Software Companies in Istanbul", max_results=3))
