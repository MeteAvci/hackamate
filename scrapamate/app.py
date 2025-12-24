from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit
import asyncio
import threading
import os
from scraper import TheHarvester

# ============================================
# LANGUAGE CONFIG (default: en)
# Set SCRAPAMATE_LANG=tr for Turkish
# ============================================
LANG = os.environ.get('SCRAPAMATE_LANG', 'en')

i18n = {
    'en': {
        'started': 'Harvester started',
        'complete': 'Scraping complete.',
        'error': 'Scraping error',
        'busy': 'System busy.',
        'config_updated': 'Config updated.',
        'startup': [
            '=' * 50,
            '  SCRAPAMATE - Google Maps Lead Harvester',
            '  Open: http://127.0.0.1:5000',
            '=' * 50,
        ]
    },
    'tr': {
        'started': 'Harvester başlatıldı',
        'complete': 'Scraping tamamlandı.',
        'error': 'Scraping hatası',
        'busy': 'Sistem meşgul.',
        'config_updated': 'Ayarlar güncellendi.',
        'startup': [
            '=' * 50,
            '  SCRAPAMATE - Google Maps Lead Toplayıcı',
            '  Aç: http://127.0.0.1:5000',
            '=' * 50,
        ]
    }
}

t = lambda key: i18n.get(LANG, i18n['en']).get(key, key)

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-key-change-in-production')
socketio = SocketIO(app, async_mode='threading')

state = {
    'status': 'idle',
    'config': {
        'query': 'Software Companies in Istanbul',
    }
}


def log(message, type='info'):
    print(f"[{type.upper()}] {message}")
    socketio.emit('log', {'message': message, 'type': type})


def run_scraper(query):
    state['status'] = 'scraping'
    socketio.emit('status_update', state['status'])
    log(f"{t('started')}: {query}", 'warn')
    
    harvester = TheHarvester(headless=False, lang=LANG)
    
    original_print = print
    def new_print(*args, **kwargs):
        msg = " ".join(map(str, args))
        if "[*]" in msg: log(msg.replace("[*]", "").strip(), 'info')
        elif "[+]" in msg: 
            try:
                clean_msg = msg.replace("[+]", "").strip()
                parts = clean_msg.split("|")
                if len(parts) >= 3:
                    target_data = {
                        'name': parts[0].strip(),
                        'phone': parts[1].strip(),
                        'email': parts[2].strip(),
                    }
                    socketio.emit('target_found', target_data)
            except:
                pass
            log(msg.replace("[+]", "").strip(), 'success')
        elif "[!]" in msg: log(msg.replace("[!]", "").strip(), 'error')
        original_print(*args, **kwargs)
    
    import builtins
    builtins.print = new_print
    
    try:
        asyncio.run(harvester.scrape_google_maps(query, max_results=20))
        log(t('complete'), 'success')
    except Exception as e:
        log(f"{t('error')}: {e}", 'error')
    finally:
        builtins.print = original_print
        state['status'] = 'idle'
        socketio.emit('status_update', state['status'])


@app.route('/')
def index():
    return render_template('index.html', config=state['config'])


@socketio.on('start_scrape')
def handle_start_scrape(data):
    if state['status'] != 'idle':
        log(t('busy'), 'error')
        return
    
    query = data.get('query', state['config']['query'])
    threading.Thread(target=run_scraper, args=(query,)).start()


@socketio.on('update_config')
def handle_update_config(data):
    state['config'].update(data)
    log(t('config_updated'), 'success')


if __name__ == '__main__':
    for line in t('startup'):
        print(line)
    socketio.run(app, host='127.0.0.1', port=5000, allow_unsafe_werkzeug=True)
