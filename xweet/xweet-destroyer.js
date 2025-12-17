// ==========================================
// PROJECT: XWEET DESTROYER v2.3
// CODENAME: STABLE_AIM
// AUTHOR: AI Final Boss aka ÇeteGPT by Mete Avcı
// ==========================================

(function () {
    'use strict';

    // --- INTERNATIONALIZATION ---
    const i18n = {
        en: {
            title: 'XWEET DESTROYER v2.3',
            close: 'CLOSE',
            targetDate: 'TARGET DATE (CUTOFF)',
            deleteRetweets: 'DELETE RETWEETS',
            speedSetting: 'SPEED SETTING:',
            start: 'START',
            stop: 'STOP',
            initMsg: ['> SYSTEM INITIALIZED [STABLE].', '> DRIFT ISSUE RESOLVED.', '> SELECT DATE AND START.'],
            statDel: 'DEL',
            statRt: 'RT',
            statSkip: 'SKIP',
            noDate: 'ENTER DATE!',
            scrolling: '>> SCROLL (SEARCHING TARGET)...',
            targetRt: '>> TARGET (RT):',
            rtCancelled: '>> [RT CANCELLED]',
            target: '>> TARGET:',
            deleted: '>> [DELETED]',
            noPermission: '>> NO DELETE PERMISSION.',
            areaClean: '>> AREA CLEAN. SCROLLING DOWN...',
            started: '/// STARTED ///',
            stopped: '/// STOPPED ///'
        },
        tr: {
            title: 'XWEET DESTROYER v2.3',
            close: 'KAPAT',
            targetDate: 'HEDEF TARİH (SINIR)',
            deleteRetweets: 'RETWEETLERİ SİL',
            speedSetting: 'HIZ AYARI:',
            start: 'BAŞLAT',
            stop: 'DURDUR',
            initMsg: ['> SİSTEM BAŞLATILDI [STABLE].', '> KAYMA SORUNU GİDERİLDİ.', '> TARİH SEÇ VE BAŞLAT.'],
            statDel: 'SİL',
            statRt: 'RT',
            statSkip: 'ATLA',
            noDate: 'TARİH GİR!',
            scrolling: '>> SCROLL (HEDEF ARANIYOR)...',
            targetRt: '>> HEDEF (RT):',
            rtCancelled: '>> [RT İPTAL EDİLDİ]',
            target: '>> HEDEF:',
            deleted: '>> [SİLİNDİ]',
            noPermission: '>> SİLME YETKİSİ YOK.',
            areaClean: '>> BÖLGE TEMİZ. AŞAĞI İNİLİYOR...',
            started: '/// BAŞLATILDI ///',
            stopped: '/// DURDURULDU ///'
        }
    };

    let currentLang = 'en';
    const t = (key) => i18n[currentLang][key] || key;

    // --- 1. STYLE (DARK MATTER - BLACK/BLUE) ---
    const styleBlock = document.createElement('style');
    styleBlock.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

        #xd-panel {
            position: fixed;
            top: 100px;
            right: 50px;
            width: 360px;
            background-color: #000000;
            border: 1px solid #1a1a1a;
            border-left: 5px solid #002244;
            color: #e0e0e0;
            z-index: 99999;
            font-family: 'Share Tech Mono', 'Consolas', monospace;
            box-shadow: 0 0 0 1px #000, 0 10px 30px rgba(0, 0, 0, 1);
            user-select: none;
        }

        .xd-header {
            padding: 12px 15px;
            background: #020b16;
            border-bottom: 1px solid #002244;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: move;
        }

        .xd-title {
            font-weight: 700;
            font-size: 15px;
            color: #fff;
            letter-spacing: 2px;
            text-transform: uppercase;
        }

        .xd-header-btns {
            display: flex;
            gap: 8px;
        }

        .xd-lang-btn {
            background: transparent;
            border: 1px solid #003366;
            color: #0088ff;
            cursor: pointer;
            padding: 2px 8px;
            font-family: inherit;
            font-size: 11px;
            font-weight: bold;
            transition: all 0.2s;
        }
        .xd-lang-btn:hover { background: #003366; color: #fff; }

        .xd-close-btn {
            background: transparent;
            border: 1px solid #333;
            color: #555;
            cursor: pointer;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
        }
        .xd-close-btn:hover { color: #fff; background: #000; border-color: #fff; }

        .xd-body { padding: 20px; background: #000; }
        .xd-group { margin-bottom: 18px; }

        .xd-label {
            display: block;
            font-size: 11px;
            color: #666;
            margin-bottom: 8px;
            font-weight: bold;
            letter-spacing: 1px;
        }

        .xd-input {
            width: 100%;
            background: #050505;
            border: 1px solid #333;
            color: #fff;
            padding: 10px;
            font-family: inherit;
            font-size: 13px;
            outline: none;
            box-sizing: border-box;
        }
        .xd-input:focus { border-color: #003366; background: #080808; }

        .xd-checkbox-wrapper {
            display: flex;
            align-items: center;
            gap: 12px;
            background: #050505;
            padding: 10px;
            border: 1px solid #333;
            cursor: pointer;
        }
        .xd-checkbox { accent-color: #003366; transform: scale(1.2); cursor: pointer; }
        .xd-cb-label { font-size: 12px; color: #ccc; font-weight: bold; }

        .xd-console {
            height: 140px;
            background: #000;
            border: 1px solid #1a1a1a;
            border-top: 1px solid #002244;
            padding: 10px;
            font-size: 11px;
            overflow-y: auto;
            color: #aaa;
            margin-bottom: 15px;
            font-family: 'Share Tech Mono', monospace;
        }
        .xd-console::-webkit-scrollbar { width: 4px; }
        .xd-console::-webkit-scrollbar-thumb { background: #003366; }

        .xd-stats {
            display: flex;
            justify-content: space-between;
            font-size: 11px;
            color: #444;
            border-top: 1px solid #1a1a1a;
            padding-top: 10px;
            font-weight: bold;
        }

        .xd-actions { display: flex; gap: 15px; margin-top: 20px; }

        .xd-btn {
            flex: 1;
            padding: 12px;
            border: 1px solid #333;
            font-family: inherit;
            font-weight: 700;
            font-size: 13px;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 1px;
            background: #000;
            color: #fff;
            transition: all 0.2s;
        }
        .xd-btn-start { background: #001a33; border-color: #002244; }
        .xd-btn-start:hover { background: #003366; border-color: #004488; }
        .xd-btn-stop { background: #000; color: #888; }
        .xd-btn-stop:hover { border-color: #fff; color: #fff; }
    `;
    document.head.appendChild(styleBlock);

    // --- 2. HTML UI ---
    const panelHTML = `
        <div id="xd-panel">
            <div class="xd-header" id="xd-drag-handle">
                <span class="xd-title" id="xd-title">XWEET DESTROYER v2.4</span>
                <div class="xd-header-btns">
                    <button id="xd-lang" class="xd-lang-btn">TR</button>
                    <button id="xd-close" class="xd-close-btn" title="CLOSE">X</button>
                </div>
            </div>
            
            <div class="xd-body">
                <div class="xd-group">
                    <label class="xd-label" id="xd-date-label">TARGET DATE (CUTOFF)</label>
                    <input type="date" id="xd-date" class="xd-input">
                </div>

                <div class="xd-group">
                    <label class="xd-checkbox-wrapper">
                        <input type="checkbox" id="xd-rt-check" class="xd-checkbox" checked>
                        <span class="xd-cb-label" id="xd-rt-label">DELETE RETWEETS</span>
                    </label>
                </div>
                
                <div class="xd-group">
                    <label class="xd-label"><span id="xd-speed-label">SPEED SETTING:</span> <span id="xd-speed-val" style="color:#fff">2500ms</span></label>
                    <input type="range" id="xd-speed" class="xd-input" min="1000" max="5000" value="2500" step="100" style="padding:0; height:2px; accent-color: #fff;">
                </div>

                <div id="xd-console" class="xd-console">
> SYSTEM INITIALIZED [STABLE].
> DRIFT ISSUE RESOLVED.
> SELECT DATE AND START.
                </div>

                <div class="xd-stats">
                    <span><span id="xd-stat-del-label">DEL</span>: <span id="stat-del" style="color:#fff">0</span></span>
                    <span><span id="xd-stat-rt-label">RT</span>: <span id="stat-rt" style="color:#ccc">0</span></span>
                    <span><span id="xd-stat-skip-label">SKIP</span>: <span id="stat-skip" style="color:#666">0</span></span>
                </div>

                <div class="xd-actions">
                    <button id="xd-start" class="xd-btn xd-btn-start">START</button>
                    <button id="xd-stop" class="xd-btn xd-btn-stop">STOP</button>
                </div>
            </div>
        </div>
    `;

    if (document.getElementById('xd-panel')) document.getElementById('xd-panel').remove();
    const wrapper = document.createElement('div');
    wrapper.innerHTML = panelHTML;
    document.body.appendChild(wrapper.firstElementChild);

    // --- 3. LANGUAGE SWITCH ---
    const updateUI = () => {
        document.getElementById('xd-title').innerText = t('title');
        document.getElementById('xd-close').title = t('close');
        document.getElementById('xd-date-label').innerText = t('targetDate');
        document.getElementById('xd-rt-label').innerText = t('deleteRetweets');
        document.getElementById('xd-speed-label').innerText = t('speedSetting');
        document.getElementById('xd-start').innerText = t('start');
        document.getElementById('xd-stop').innerText = t('stop');
        document.getElementById('xd-stat-del-label').innerText = t('statDel');
        document.getElementById('xd-stat-rt-label').innerText = t('statRt');
        document.getElementById('xd-stat-skip-label').innerText = t('statSkip');
        document.getElementById('xd-lang').innerText = currentLang === 'en' ? 'TR' : 'EN';
    };

    document.getElementById('xd-lang').addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'tr' : 'en';
        updateUI();
        log(`>> LANG: ${currentLang.toUpperCase()}`, 'info');
    });

    // --- 4. DRAG & CLOSE ---
    const panel = document.getElementById('xd-panel');
    const handle = document.getElementById('xd-drag-handle');
    const closeBtn = document.getElementById('xd-close');
    let isRunning = false;

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isRunning = false;
        panel.remove();
    });

    let isDragging = false, startX, startY, initialLeft, initialTop;
    handle.addEventListener('mousedown', (e) => {
        if (e.target.closest('.xd-header-btns')) return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        const rect = panel.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;
        panel.style.cursor = 'grabbing';
    });
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        panel.style.left = `${initialLeft + (e.clientX - startX)}px`;
        panel.style.top = `${initialTop + (e.clientY - startY)}px`;
        panel.style.right = 'auto'; panel.style.bottom = 'auto';
    });
    document.addEventListener('mouseup', () => { isDragging = false; panel.style.cursor = 'default'; handle.style.cursor = 'move'; });

    // --- 5. ADVANCED OPERATION ---
    let deletedCount = 0;
    let rtCount = 0;
    let skippedCount = 0;

    const log = (msg, type = 'info') => {
        const consoleEl = document.getElementById('xd-console');
        if (!consoleEl) return;
        const time = new Date().toLocaleTimeString('en-GB').split(' ')[0];
        let color = '#aaa';
        if (type === 'error') color = '#fff';
        if (type === 'rt') color = '#ddd';
        consoleEl.innerHTML += `<div><span style="color:#444">[${time}]</span> <span style="color:${color}">${msg}</span></div>`;
        consoleEl.scrollTop = consoleEl.scrollHeight;
    };

    const updateStats = () => {
        if (document.getElementById('stat-del')) {
            document.getElementById('stat-del').innerText = deletedCount;
            document.getElementById('stat-rt').innerText = rtCount;
            document.getElementById('stat-skip').innerText = skippedCount;
        }
    };

    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    const randomDelay = (base) => base + Math.random() * 800;

    async function destroyerLoop() {
        if (!document.getElementById('xd-panel') || !isRunning) return;

        const dateVal = document.getElementById('xd-date').value;
        const rtEnabled = document.getElementById('xd-rt-check').checked;
        const speedBase = parseInt(document.getElementById('xd-speed').value);

        if (!dateVal) { log(t('noDate'), 'error'); isRunning = false; return; }
        const targetDate = new Date(dateVal);

        const timeElements = Array.from(document.querySelectorAll('time'));

        if (timeElements.length === 0) {
            log(t('scrolling'), 'warn');
            window.scrollBy(0, 500);
            await sleep(2000);
            requestAnimationFrame(destroyerLoop);
            return;
        }

        let targetFound = false;

        for (const timeEl of timeElements) {
            const tweetArticle = timeEl.closest('article[data-testid="tweet"]');
            if (!tweetArticle) continue;

            if (tweetArticle.getAttribute('data-xd-checked') === 'true') continue;

            const tweetDateStr = timeEl.getAttribute('datetime');
            const tweetDate = new Date(tweetDateStr);

            if (tweetDate > targetDate) {
                tweetArticle.setAttribute('data-xd-checked', 'true');
                skippedCount++;
                updateStats();
                continue;
            }

            targetFound = true;

            tweetArticle.scrollIntoView({ behavior: 'smooth', block: 'center' });
            await sleep(600);

            tweetArticle.setAttribute('data-xd-checked', 'true');

            const unretweetBtn = tweetArticle.querySelector('[data-testid="unretweet"]');
            if (unretweetBtn && rtEnabled) {
                log(`${t('targetRt')} ${tweetDate.toISOString().split('T')[0]}`, 'rt');
                unretweetBtn.click();
                await sleep(randomDelay(800));

                const confirmRT = document.querySelector('[data-testid="unretweetConfirm"]');
                if (confirmRT) {
                    confirmRT.click();
                    log(t('rtCancelled'), 'rt');
                    rtCount++;
                    updateStats();
                    await sleep(randomDelay(speedBase));
                    requestAnimationFrame(destroyerLoop);
                    return;
                } else {
                    document.body.click();
                }
            } else {
                const caret = tweetArticle.querySelector('[data-testid="caret"]');
                if (caret) {
                    log(`${t('target')} ${tweetDate.toISOString().split('T')[0]}`, 'info');
                    caret.click();
                    await sleep(randomDelay(800));

                    const menuItems = document.querySelectorAll('[role="menuitem"]');
                    let deleteBtn = null;
                    for (const item of menuItems) {
                        const text = item.innerText.toLowerCase();
                        if (text.includes('sil') || text.includes('delete')) {
                            deleteBtn = item;
                            break;
                        }
                    }

                    if (deleteBtn) {
                        deleteBtn.click();
                        await sleep(randomDelay(800));

                        const confirmDel = document.querySelector('[data-testid="confirmationSheetConfirm"]');
                        if (confirmDel) {
                            confirmDel.click();
                            log(t('deleted'), 'error');
                            deletedCount++;
                            updateStats();
                            await sleep(randomDelay(speedBase));
                            requestAnimationFrame(destroyerLoop);
                            return;
                        } else {
                            document.body.click();
                        }
                    } else {
                        log(t('noPermission'), 'warn');
                        document.body.click();
                        skippedCount++;
                    }
                } else {
                    skippedCount++;
                }
            }
            break;
        }

        if (!targetFound) {
            log(t('areaClean'), 'warn');
            window.scrollBy(0, 600);
            await sleep(2000);
        }

        if (isRunning) {
            requestAnimationFrame(destroyerLoop);
        }
    }

    // --- EVENTS ---
    document.getElementById('xd-start').addEventListener('click', () => {
        if (isRunning) return;
        isRunning = true;
        log(t('started'), 'info');
        destroyerLoop();
    });

    document.getElementById('xd-stop').addEventListener('click', () => {
        isRunning = false;
        log(t('stopped'), 'warn');
    });

    document.getElementById('xd-speed').addEventListener('input', (e) => {
        document.getElementById('xd-speed-val').innerText = e.target.value + "ms";
    });

})();