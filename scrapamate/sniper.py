import smtplib
import imaplib
import email
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import pandas as pd
import os
import time

# ============================================
# LANGUAGE CONFIG (default: en)
# ============================================
i18n = {
    'en': {
        'no_file': 'Target file not found.',
        'targets_found': 'Valid email targets found',
        'smtp_connected': 'Connected to SMTP server.',
        'email_sent': 'Email sent',
        'send_error': 'Send error',
        'smtp_error': 'SMTP connection error',
        'campaign_done': 'Campaign complete.',
        'new_reply': 'New Reply',
        'imap_error': 'IMAP error',
    },
    'tr': {
        'no_file': 'Hedef dosyası bulunamadı.',
        'targets_found': 'Geçerli e-posta hedefi bulundu',
        'smtp_connected': 'SMTP Sunucusuna bağlanıldı.',
        'email_sent': 'E-posta gönderildi',
        'send_error': 'Gönderim hatası',
        'smtp_error': 'SMTP Bağlantı hatası',
        'campaign_done': 'Kampanya tamamlandı.',
        'new_reply': 'Yeni Yanıt',
        'imap_error': 'IMAP Hatası',
    }
}


class TheSniper:
    def __init__(self, smtp_server, smtp_port, imap_server, email_user, email_pass, lang='en'):
        self.smtp_server = smtp_server
        self.smtp_port = smtp_port
        self.imap_server = imap_server
        self.email_user = email_user
        self.email_pass = email_pass
        self.lang = lang
    
    def t(self, key):
        return i18n.get(self.lang, i18n['en']).get(key, key)

    def send_campaign(self, targets_file, subject_template, body_template):
        """Sends emails to targets from the CSV file."""
        if not os.path.exists(targets_file):
            print(f"[!] {self.t('no_file')}")
            return

        df = pd.read_csv(targets_file)
        targets = df[df['email'].notna() & (df['email'] != "")]
        print(f"[*] {self.t('targets_found')}: {len(targets)}")

        try:
            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            server.login(self.email_user, self.email_pass)
            print(f"[*] {self.t('smtp_connected')}")

            for index, row in targets.iterrows():
                try:
                    target_email = row['email']
                    target_name = row['name']
                    target_context = str(row.get('context', ''))
                    
                    smart_body = self.generate_smart_email(body_template, target_context)
                    subject = subject_template.format(name=target_name)
                    body = smart_body.format(name=target_name)

                    msg = MIMEMultipart()
                    msg['From'] = self.email_user
                    msg['To'] = target_email
                    msg['Subject'] = subject
                    msg.attach(MIMEText(body, 'plain'))

                    server.send_message(msg)
                    print(f"[+] {self.t('email_sent')}: {target_email}")
                    time.sleep(2)

                except Exception as e:
                    print(f"[!] {self.t('send_error')} ({target_email}): {e}")

            server.quit()
            print(f"[*] {self.t('campaign_done')}")

        except Exception as e:
            print(f"[!] {self.t('smtp_error')}: {e}")

    def generate_smart_email(self, template, context):
        """Injects personalized sentences based on context keywords."""
        if not context or len(context) < 10:
            return template

        context_lower = context.lower()
        injection = ""

        # Keyword matching (bilingual)
        keywords = {
            ('kahve', 'coffee'): {
                'en': "I noticed your passion for coffee and the variety you offer. ",
                'tr': "Özellikle kahve konusundaki tutkunuz ve sunduğunuz çeşitlilik dikkatimi çekti. "
            },
            ('yazılım', 'software'): {
                'en': "I reviewed your innovative tech projects, truly impressive. ",
                'tr': "Teknoloji alanındaki yenilikçi projelerinizi inceledim, gerçekten etkileyici. "
            },
            ('organik', 'doğal', 'organic', 'natural'): {
                'en': "Your commitment to natural and organic products is valuable today. ",
                'tr': "Doğal ve organik ürünlere verdiğiniz önem günümüzde çok kıymetli. "
            },
            ('tasarım', 'design'): {
                'en': "The aesthetic sensibility and attention to detail in your designs is amazing. ",
                'tr': "Tasarımlarınızdaki estetik anlayış ve detaycılık harika. "
            }
        }

        for kw_tuple, messages in keywords.items():
            if any(kw in context_lower for kw in kw_tuple):
                injection = messages.get(self.lang, messages['en'])
                break
        
        if injection:
            if "\n" in template:
                parts = template.split("\n", 1)
                return f"{parts[0]}\n\n{injection}\n{parts[1]}"
            else:
                return f"{injection}\n\n{template}"
        
        return template

    def check_inbox(self):
        """Checks for replies."""
        try:
            mail = imaplib.IMAP4_SSL(self.imap_server)
            mail.login(self.email_user, self.email_pass)
            mail.select('inbox')

            status, messages = mail.search(None, 'UNSEEN')
            if status != 'OK':
                return []

            replies = []
            for num in messages[0].split():
                status, data = mail.fetch(num, '(RFC822)')
                raw_email = data[0][1]
                msg = email.message_from_bytes(raw_email)
                
                from_header = msg['From']
                subject_header = msg['Subject']
                
                print(f"[+] {self.t('new_reply')}: {from_header} - {subject_header}")
                replies.append({'from': from_header, 'subject': subject_header})

            mail.close()
            mail.logout()
            return replies

        except Exception as e:
            print(f"[!] {self.t('imap_error')}: {e}")
            return []


if __name__ == "__main__":
    # Example usage - configure your credentials
    sniper = TheSniper(
        smtp_server="smtp.gmail.com",
        smtp_port=587,
        imap_server="imap.gmail.com",
        email_user="YOUR_EMAIL@gmail.com",
        email_pass="YOUR_APP_PASSWORD",
        lang='en'
    )
    
    # sniper.send_campaign('targets.csv', "Hello {name}", "Dear {name}, ...")
    # sniper.check_inbox()
