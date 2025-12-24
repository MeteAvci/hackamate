// ==========================================
// PROJECT: XListOff v1.5
// CODENAME: VERTICAL_LIMIT
// AUTHOR: AI Final Boss aka ÇeteGPT
// ==========================================

(function () {
    'use strict';

    // --- i18n SYSTEM ---
    let currentLang = 'en';

    const i18n = {
        en: {
            // Stats
            total: "TOTAL",
            target: "TARGET",
            excluded: "EXCLUDED",
            // Statuses
            statusPending: "TARGET",
            statusDone: "REMOVED",
            statusExcluded: "EXCLUDED",
            // Buttons
            btnStart: "START",
            btnStop: "STOP",
            btnNuke: "🔥 UNFOLLOW",
            // Labels
            listingMode: "LISTING MODE (SAFE)",
            waitTime: "WAIT TIME",
            speedSlow: "SLOW",
            speedMedium: "MEDIUM",
            speedFast: "FAST",
            speedTurbo: "TURBO",
            // Logs
            systemReady: "SYSTEM READY.",
            scanning: "SCANNING MODE ACTIVE...",
            scanStopping: "STOPPING SCAN...",
            scrollingDown: "DIVING DEEP (SCROLL)...",
            scrollingUp: "RISING TO SURFACE (SCROLL UP)...",
            surfaceReached: "SURFACE REACHED. OPERATION STARTING.",
            searchingTarget: "SEARCHING TARGET",
            notInDOM: "NOT IN DOM, SCROLLING",
            notFound: "NOT FOUND AFTER FULL SCAN",
            targetHit: "TARGET HIT",
            btnNotFound: "BUTTON NOT FOUND",
            confirmNotFound: "CONFIRM DIALOG NOT FOUND",
            operationComplete: "OPERATION COMPLETE.",
            cleanupStopped: "CLEANUP STOPPED.",
            listEmpty: "LIST EMPTY!",
            confirmPrompt: "people in list. Will scroll to TOP first. Confirm?",
            cleanupActive: "CLEANUP PROTOCOL ACTIVE...",
            pass: "PASS",
            scrollingToFind: "SCROLLING TO FIND",
            // Tooltips
            tipVersion: "XListoff v1.5 - Vertical Limit",
            tipClose: "Close",
            tipTotal: "Total scanned",
            tipTarget: "To be processed",
            tipExcluded: "Protected",
            tipListing: "On: Lists and lets you choose. Off: Instantly removes.",
            tipSpeed: "Scroll and action wait time",
            tipScan: "Start/Stop Scan",
            tipNuke: "Unfollow listed users one by one",
            tipItem: "Double-click: Protect/Unprotect",
            // Alerts
            alertTerminator: "⚠️ LISTING DISABLED! Will remove on sight."
        },
        tr: {
            // Stats
            total: "TOPLAM",
            target: "HEDEF",
            excluded: "HARİÇ",
            // Statuses
            statusPending: "HEDEF",
            statusDone: "SİLİNDİ",
            statusExcluded: "HARİÇ",
            // Buttons
            btnStart: "BAŞLAT",
            btnStop: "DURDUR",
            btnNuke: "🔥 TAKİBİ BIRAK",
            // Labels
            listingMode: "LİSTELEME MODU (GÜVENLİ)",
            waitTime: "BEKLEME SÜRESİ",
            speedSlow: "YAVAŞ",
            speedMedium: "ORTA",
            speedFast: "HIZLI",
            speedTurbo: "TURBO",
            // Logs
            systemReady: "SİSTEM HAZIR.",
            scanning: "TARAMA MODU AKTİF...",
            scanStopping: "TARAMA DURDURULUYOR...",
            scrollingDown: "DERİNLERE İNİLİYOR (SCROLL)...",
            scrollingUp: "YÜZEYE ÇIKILIYOR (SCROLL UP)...",
            surfaceReached: "YÜZEYE ULAŞILDI. OPERASYON BAŞLIYOR.",
            searchingTarget: "HEDEF ARANIYOR",
            notInDOM: "DOM'DA YOK, KAYDIRILIYOR",
            notFound: "TAM TARAMA SONRASI BULUNAMADI",
            targetHit: "VURULDU",
            btnNotFound: "BUTON BULUNAMADI",
            confirmNotFound: "ONAY KUTUSU ÇIKMADI",
            operationComplete: "OPERASYON TAMAMLANDI.",
            cleanupStopped: "TEMİZLİK DURDURULDU.",
            listEmpty: "LİSTE BOŞ!",
            confirmPrompt: "kişi listede. Silme işlemi için önce EN ÜSTE çıkılacak. Onaylıyor musun?",
            cleanupActive: "TEMİZLİK PROTOKOLÜ DEVREDE...",
            pass: "GEÇİŞ",
            scrollingToFind: "BULMAK İÇİN KAYDIRILIYOR",
            // Tooltips
            tipVersion: "XListoff v1.5 - Vertical Limit",
            tipClose: "Kapat",
            tipTotal: "Taranan toplam kişi",
            tipTarget: "İşlenecek Kişiler",
            tipExcluded: "Dokunulmayacaklar",
            tipListing: "Açık: Listeler ve seçtirir. Kapalı: Gördüğünü siler.",
            tipSpeed: "Scroll ve İşlem bekleme süresi",
            tipScan: "Taramayı Başlat/Durdur",
            tipNuke: "Listelenenleri sırayla siler",
            tipItem: "Çift Tıkla: Koru / Sil",
            // Alerts
            alertTerminator: "⚠️ LİSTE DEVRE DIŞI! Görülen anında silinir."
        }
    };

    const t = (key) => i18n[currentLang][key] || i18n['en'][key] || key;

    // --- CONFIG ---
    const CONFIG = {
        scrollDelay: 1500,
        actionDelay: 2000,
        autoScrollStep: 500,
        scrollUpSpeed: -2000,
        maxSearchPasses: 3,
        scrollSearchStep: 400,
        scrollSearchWait: 300
    };

    // --- GUI STYLES ---
    const styleBlock = document.createElement('style');
    styleBlock.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

        #xl-panel {
            position: fixed;
            top: 80px;
            right: 20px;
            width: 380px;
            height: 650px;
            background-color: #050505;
            border: 1px solid #1a1a1a;
            border-left: 5px solid #004488;
            color: #e0e0e0;
            z-index: 999999;
            font-family: 'Share Tech Mono', monospace;
            box-shadow: 0 20px 50px rgba(0,0,0,0.9);
            display: flex;
            flex-direction: column;
            user-select: none;
            transition: opacity 0.3s;
        }

        .xl-header {
            padding: 15px;
            background: #020b16;
            border-bottom: 1px solid #004488;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: move;
        }

        .xl-title { font-size: 16px; color: #fff; font-weight: bold; letter-spacing: 2px; }
        
        .xl-header-btns { display: flex; gap: 8px; }
        
        .xl-lang-btn {
            background: #001a33; border: 1px solid #004488; color: #0088ff; cursor: pointer; 
            padding: 2px 8px; font-family: inherit; font-size: 11px; transition: 0.2s;
        }
        .xl-lang-btn:hover { background: #003366; }
        
        .xl-close { 
            background: none; border: 1px solid #333; color: #666; cursor: pointer; padding: 2px 8px;
            transition: 0.2s;
        }
        .xl-close:hover { border-color: #f00; color: #f00; }

        /* TOOLTIP */
        [data-tooltip]:hover::after {
            content: attr(data-tooltip);
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: #004488;
            color: #fff;
            padding: 5px 10px;
            font-size: 10px;
            border-radius: 4px;
            white-space: nowrap;
            z-index: 1000;
            pointer-events: none;
            box-shadow: 0 5px 15px rgba(0,0,0,0.5);
            margin-bottom: 5px;
            border: 1px solid #0066cc;
        }

        .xl-stats {
            display: flex;
            justify-content: space-between;
            padding: 10px 15px;
            background: #080808;
            border-bottom: 1px solid #222;
            font-size: 12px;
        }
        .xl-stat-box { text-align: center; }
        .xl-stat-val { font-size: 14px; font-weight: bold; color: #fff; }
        .xl-stat-label { font-size: 10px; color: #666; }

        .xl-list-container {
            flex: 1;
            overflow-y: auto;
            padding: 10px;
            background: #000;
        }
        .xl-list-container::-webkit-scrollbar { width: 5px; }
        .xl-list-container::-webkit-scrollbar-thumb { background: #004488; }

        .xl-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px;
            border-bottom: 1px solid #111;
            font-size: 12px;
            transition: 0.2s;
            cursor: pointer;
            position: relative;
        }
        .xl-item:hover { background: #0a1520; }
        
        .xl-item.excluded {
            background: #1a1a1a;
            color: #555;
            text-decoration: line-through;
            border-left: 3px solid #555;
        }

        .xl-user-info { display: flex; flex-direction: column; }
        .xl-handle { color: #0088ff; font-weight: bold; }
        .xl-name { color: #888; font-size: 10px; }
        .xl-status { font-size: 10px; font-weight: bold; }
        
        .xl-status.pending { color: #ff9900; }
        .xl-status.done { color: #f00; }
        .xl-status.excluded { color: #555; }

        .xl-controls {
            padding: 15px;
            background: #020b16;
            border-top: 1px solid #004488;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        /* INPUTS */
        .xl-option-row {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 5px;
            background: #0a1520;
            border-radius: 4px;
            border: 1px solid #333;
        }
        .xl-checkbox { accent-color: #004488; transform: scale(1.2); cursor: pointer; }
        .xl-option-label { color: #ccc; font-size: 11px; cursor: pointer; }

        /* SLIDER STYLE */
        .xl-range-wrapper {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        .xl-range-header {
            display: flex; justify-content: space-between; font-size: 10px; color: #888;
        }
        .xl-range {
            width: 100%;
            accent-color: #004488;
            height: 4px;
            background: #333;
            border-radius: 2px;
            cursor: pointer;
        }
        .xl-speed-val { color: #0088ff; font-weight: bold; }

        .xl-btn-row { display: flex; gap: 10px; }

        .xl-btn {
            flex: 1;
            padding: 12px;
            border: 1px solid #333;
            background: #000;
            color: #fff;
            font-family: inherit;
            font-weight: bold;
            cursor: pointer;
            transition: 0.2s;
            text-transform: uppercase;
        }
        
        .xl-btn-scan { border-color: #004488; background: #001a33; }
        .xl-btn-scan:hover { background: #003366; }
        .xl-btn-scan.active { border-color: #ff0000; background: #330000; color: #ffcccc; }

        .xl-btn-nuke { border-color: #880000; background: #220000; }
        .xl-btn-nuke:hover { background: #440000; color: #ffcccc; }

        .xl-log {
            font-size: 10px; color: #0088ff; text-align: center; margin-top: 5px; height: 12px;
        }
    `;
    document.head.appendChild(styleBlock);

    // --- GUI HTML ---
    const panelHTML = `
        <div id="xl-panel">
            <div class="xl-header" id="xl-drag">
                <span class="xl-title" id="xl-title">XListoff v1.5</span>
                <div class="xl-header-btns">
                    <button class="xl-lang-btn" id="xl-lang">EN</button>
                    <button class="xl-close" id="xl-close">X</button>
                </div>
            </div>
            
            <div class="xl-stats">
                <div class="xl-stat-box" id="tip-total">
                    <div class="xl-stat-val" id="cnt-total">0</div>
                    <div class="xl-stat-label" id="lbl-total">TOTAL</div>
                </div>
                <div class="xl-stat-box" id="tip-target">
                    <div class="xl-stat-val" id="cnt-target" style="color:#ff9900">0</div>
                    <div class="xl-stat-label" id="lbl-target">TARGET</div>
                </div>
                <div class="xl-stat-box" id="tip-excluded">
                    <div class="xl-stat-val" id="cnt-excluded" style="color:#666">0</div>
                    <div class="xl-stat-label" id="lbl-excluded">EXCLUDED</div>
                </div>
            </div>

            <div class="xl-list-container" id="xl-list"></div>

            <div class="xl-controls">
                
                <div class="xl-option-row" id="tip-listing">
                    <input type="checkbox" id="chk-review" class="xl-checkbox" checked>
                    <label for="chk-review" class="xl-option-label" id="lbl-listing">LISTING MODE (SAFE)</label>
                </div>

                <div class="xl-range-wrapper" id="tip-speed">
                    <div class="xl-range-header">
                        <span id="lbl-wait">WAIT TIME</span>
                        <span class="xl-speed-val" id="disp-speed">MEDIUM (1500ms)</span>
                    </div>
                    <input type="range" id="rng-speed" class="xl-range" min="300" max="4000" step="100" value="1500">
                </div>

                <div class="xl-log" id="xl-log">SYSTEM READY.</div>
                
                <button class="xl-btn xl-btn-scan" id="btn-scan">START</button>
                <button class="xl-btn xl-btn-nuke" id="btn-nuke">🔥 UNFOLLOW</button>
            </div>
        </div>
    `;

    if (document.getElementById('xl-panel')) document.getElementById('xl-panel').remove();
    const wrapper = document.createElement('div');
    wrapper.innerHTML = panelHTML;
    document.body.appendChild(wrapper.firstElementChild);

    // --- STATE ---
    let scannedUsers = new Map();
    let isScanning = false;
    let isNuking = false;

    // --- DOM REFS ---
    const ui = {
        list: document.getElementById('xl-list'),
        log: document.getElementById('xl-log'),
        cntTotal: document.getElementById('cnt-total'),
        cntTarget: document.getElementById('cnt-target'),
        cntExcluded: document.getElementById('cnt-excluded'),
        panel: document.getElementById('xl-panel'),
        drag: document.getElementById('xl-drag'),
        close: document.getElementById('xl-close'),
        btnScan: document.getElementById('btn-scan'),
        btnNuke: document.getElementById('btn-nuke'),
        chkReview: document.getElementById('chk-review'),
        rngSpeed: document.getElementById('rng-speed'),
        dispSpeed: document.getElementById('disp-speed'),
        langBtn: document.getElementById('xl-lang'),
        // Labels for i18n
        lblTotal: document.getElementById('lbl-total'),
        lblTarget: document.getElementById('lbl-target'),
        lblExcluded: document.getElementById('lbl-excluded'),
        lblListing: document.getElementById('lbl-listing'),
        lblWait: document.getElementById('lbl-wait'),
        tipTotal: document.getElementById('tip-total'),
        tipTarget: document.getElementById('tip-target'),
        tipExcluded: document.getElementById('tip-excluded'),
        tipListing: document.getElementById('tip-listing'),
        tipSpeed: document.getElementById('tip-speed')
    };

    // --- HELPERS ---
    const log = (msg) => ui.log.innerText = `> ${msg}`;
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    const getRandomDelay = (base) => {
        const variance = base * 0.2;
        return base + (Math.random() * variance);
    };

    // --- i18n UPDATE FUNCTION ---
    function updateUILanguage() {
        ui.langBtn.innerText = currentLang.toUpperCase();
        ui.log.innerText = `> ${t('systemReady')}`;
        ui.lblTotal.innerText = t('total');
        ui.lblTarget.innerText = t('target');
        ui.lblExcluded.innerText = t('excluded');
        ui.lblListing.innerText = t('listingMode');
        ui.lblWait.innerText = t('waitTime');
        ui.btnScan.innerText = isScanning ? t('btnStop') : t('btnStart');
        ui.btnNuke.innerText = t('btnNuke');

        // Tooltips
        ui.tipTotal.setAttribute('data-tooltip', t('tipTotal'));
        ui.tipTarget.setAttribute('data-tooltip', t('tipTarget'));
        ui.tipExcluded.setAttribute('data-tooltip', t('tipExcluded'));
        ui.tipListing.setAttribute('data-tooltip', t('tipListing'));
        ui.tipSpeed.setAttribute('data-tooltip', t('tipSpeed'));
        ui.btnScan.setAttribute('data-tooltip', t('tipScan'));
        ui.btnNuke.setAttribute('data-tooltip', t('tipNuke'));

        updateSpeedLabel();

        // Update list items
        scannedUsers.forEach((user, handle) => {
            const statusEl = document.getElementById(`status-${handle.substring(1)}`);
            if (statusEl) {
                if (user.excluded) {
                    statusEl.innerText = t('statusExcluded');
                } else if (user.status === 'done') {
                    statusEl.innerText = t('statusDone');
                } else {
                    statusEl.innerText = t('statusPending');
                }
            }
        });
    }

    // Button Toggle Logic
    const toggleScanButton = (isActive) => {
        if (isActive) {
            ui.btnScan.innerText = t('btnStop');
            ui.btnScan.classList.add('active');
        } else {
            ui.btnScan.innerText = t('btnStart');
            ui.btnScan.classList.remove('active');
        }
    };

    const updateStats = () => {
        let total = scannedUsers.size;
        let excluded = 0;
        let pending = 0;
        scannedUsers.forEach(u => {
            if (u.excluded) excluded++;
            else if (u.status === 'pending') pending++;
        });
        ui.cntTotal.innerText = total;
        ui.cntTarget.innerText = pending;
        ui.cntExcluded.innerText = excluded;
    };

    const updateSpeedLabel = () => {
        const val = parseInt(ui.rngSpeed.value);
        let text = "";
        let color = "#0088ff";
        if (val >= 2500) { text = `${t('speedSlow')} (${val}ms)`; color = "#00ff00"; }
        else if (val >= 1500) { text = `${t('speedMedium')} (${val}ms)`; color = "#0088ff"; }
        else if (val >= 800) { text = `${t('speedFast')} (${val}ms)`; color = "#ff9900"; }
        else { text = `${t('speedTurbo')} (${val}ms)`; color = "#ff0000"; }
        ui.dispSpeed.innerText = text;
        ui.dispSpeed.style.color = color;
    };
    ui.rngSpeed.addEventListener('input', updateSpeedLabel);

    const createListItem = (userData) => {
        const item = document.createElement('div');
        item.className = 'xl-item';
        item.dataset.handle = userData.handle;
        item.setAttribute('data-tooltip', t('tipItem'));
        item.innerHTML = `
            <div class="xl-user-info">
                <span class="xl-handle">${userData.handle}</span>
                <span class="xl-name">${userData.name}</span>
            </div>
            <span class="xl-status pending" id="status-${userData.handle.substring(1)}">${t('statusPending')}</span>
        `;
        item.addEventListener('dblclick', () => {
            const user = scannedUsers.get(userData.handle);
            user.excluded = !user.excluded;
            if (user.excluded) {
                item.classList.add('excluded');
                item.querySelector('.xl-status').innerText = t('statusExcluded');
                item.querySelector('.xl-status').className = 'xl-status excluded';
            } else {
                item.classList.remove('excluded');
                item.querySelector('.xl-status').innerText = t('statusPending');
                item.querySelector('.xl-status').className = 'xl-status pending';
            }
            updateStats();
        });
        ui.list.appendChild(item);
        ui.list.scrollTop = ui.list.scrollHeight;
    };

    // --- SMART USER SEARCH WITH SCROLL ---
    function findUserInDOM(handle) {
        const cells = document.querySelectorAll('[data-testid="UserCell"]');
        for (const cell of cells) {
            if (cell.innerHTML.includes(handle.replace('@', ''))) {
                return cell;
            }
        }
        return null;
    }

    async function findUserWithScroll(handle) {
        const maxPasses = CONFIG.maxSearchPasses;

        for (let pass = 0; pass < maxPasses; pass++) {
            log(`${t('searchingTarget')}: ${handle} (${t('pass')} ${pass + 1}/${maxPasses})`);

            // Search from current position to bottom
            let lastScrollY = -1;
            while (window.scrollY !== lastScrollY) {
                const cell = findUserInDOM(handle);
                if (cell) {
                    log(`${t('searchingTarget')}: ${handle} ✓`);
                    return cell;
                }

                lastScrollY = window.scrollY;
                window.scrollBy(0, CONFIG.scrollSearchStep);
                await sleep(CONFIG.scrollSearchWait);
            }

            // Didn't find, go back to top for next pass
            if (pass < maxPasses - 1) {
                log(`${t('scrollingToFind')}: ${handle}...`);
                window.scrollTo(0, 0);
                await sleep(500);
            }
        }

        log(`${t('notFound')}: ${handle}`);
        return null;
    }

    // --- SCROLL UP ---
    async function returnToSurface() {
        log(t('scrollingUp'));
        while (window.scrollY > 0) {
            window.scrollBy(0, -2500);
            await sleep(100);
        }
        window.scrollTo(0, 0);
        await sleep(1000);
        log(t('surfaceReached'));
    }

    // --- UNFOLLOW ACTION ---
    async function unfollowSingleUser(cell, handle) {
        const unfollowBtn = cell.querySelector('[data-testid$="-unfollow"]');
        if (!unfollowBtn) {
            log(`${t('btnNotFound')}: ${handle}`);
            return false;
        }

        unfollowBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await sleep(500);
        unfollowBtn.click();
        await sleep(800);

        const confirmBtn = document.querySelector('[data-testid="confirmationSheetConfirm"]');

        if (confirmBtn) {
            confirmBtn.click();
            log(`🔥 ${handle} ${t('targetHit')}!`);

            const baseDelay = parseInt(ui.rngSpeed.value);
            const safeDelay = baseDelay < 800 ? 800 : baseDelay;
            await sleep(getRandomDelay(safeDelay));
            return true;
        } else {
            log(`${t('confirmNotFound')}: ${handle}`);
            document.body.click();
            return false;
        }
    }

    // --- SCANNER ---
    async function scanLoop() {
        if (!isScanning) {
            toggleScanButton(false);
            return;
        }

        const isReviewMode = ui.chkReview.checked;
        const userCells = document.querySelectorAll('[data-testid="UserCell"]');
        let newFound = false;

        for (const cell of userCells) {
            if (!isScanning) break;

            const link = cell.querySelector('a[href^="/"]');
            if (!link) continue;
            const handle = link.getAttribute('href').replace('/', '@');

            if (isReviewMode && scannedUsers.has(handle)) continue;

            const followsYou = cell.querySelector('[data-testid="userFollowIndicator"]');

            if (!followsYou) {
                if (isReviewMode) {
                    const nameEl = cell.querySelector('[dir="ltr"] span');
                    const name = nameEl ? nameEl.innerText : handle;
                    const userData = { handle, name, excluded: false, status: 'pending' };
                    scannedUsers.set(handle, userData);
                    createListItem(userData);
                    newFound = true;
                } else {
                    if (cell.getAttribute('data-xl-nuked') === 'true') continue;
                    log(`TERMINATOR: ${handle}...`);
                    const success = await unfollowSingleUser(cell, handle);
                    if (success) {
                        cell.setAttribute('data-xl-nuked', 'true');
                        cell.style.opacity = '0.2';
                        cell.style.pointerEvents = 'none';
                    }
                }
            }
        }

        if (isReviewMode && newFound) updateStats();

        if (isScanning) {
            log(t('scrollingDown'));
            window.scrollTo(0, document.body.scrollHeight);
            const scrollWait = parseInt(ui.rngSpeed.value);
            await sleep(scrollWait);
            requestAnimationFrame(scanLoop);
        }
    }

    // --- NUKE LOOP (FIXED - SMART SCROLL SEARCH) ---
    async function nukeLoop() {
        if (!isNuking) {
            log(t('cleanupStopped'));
            toggleScanButton(false);
            return;
        }

        const targets = Array.from(scannedUsers.values());

        for (const user of targets) {
            if (!isNuking) break;
            if (user.excluded || user.status === 'done') continue;

            // SMART SEARCH: Find user with scroll
            const targetCell = await findUserWithScroll(user.handle);

            if (targetCell) {
                const success = await unfollowSingleUser(targetCell, user.handle);
                if (success) {
                    user.status = 'done';
                    const statusEl = document.getElementById(`status-${user.handle.substring(1)}`);
                    if (statusEl) {
                        statusEl.innerText = t('statusDone');
                        statusEl.className = 'xl-status done';
                    }
                    updateStats();
                }
            } else {
                // User not found even after full scroll - mark as skipped
                log(`${t('notFound')}: ${user.handle}`);
            }
        }

        isNuking = false;
        log(t('operationComplete'));
        toggleScanButton(false);
    }

    // --- EVENTS ---

    // Language Toggle
    ui.langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'tr' : 'en';
        updateUILanguage();
    });

    // Checkbox
    ui.chkReview.addEventListener('change', (e) => {
        if (e.target.checked) {
            ui.btnNuke.style.display = "block";
            ui.list.style.opacity = "1";
        } else {
            ui.btnNuke.style.display = "none";
            ui.list.style.opacity = "0.3";
            alert(t('alertTerminator'));
        }
    });

    // Drag
    let isDragging = false, startX, startY, initialLeft, initialTop;
    ui.drag.addEventListener('mousedown', (e) => {
        if (e.target === ui.close || e.target === ui.langBtn) return;
        isDragging = true; startX = e.clientX; startY = e.clientY;
        const rect = ui.panel.getBoundingClientRect();
        initialLeft = rect.left; initialTop = rect.top;
        ui.panel.style.cursor = 'grabbing';
    });
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        ui.panel.style.left = `${initialLeft + (e.clientX - startX)}px`;
        ui.panel.style.top = `${initialTop + (e.clientY - startY)}px`;
    });
    document.addEventListener('mouseup', () => { isDragging = false; ui.panel.style.cursor = 'default'; });

    // Close
    ui.close.addEventListener('click', () => {
        isScanning = false; isNuking = false; ui.panel.remove();
    });

    // SCAN BUTTON
    ui.btnScan.addEventListener('click', () => {
        if (isScanning) {
            isScanning = false;
            log(t('scanStopping'));
            toggleScanButton(false);
        } else {
            isScanning = true;
            isNuking = false;
            log(t('scanning'));
            toggleScanButton(true);
            scanLoop();
        }
    });

    // NUKE BUTTON
    ui.btnNuke.addEventListener('click', async () => {
        if (!ui.chkReview.checked) return;
        if (isNuking) {
            isNuking = false;
            log(t('cleanupStopped'));
            return;
        }

        const count = scannedUsers.size;
        if (count === 0) { log(t('listEmpty')); return; }

        if (confirm(`${count} ${t('confirmPrompt')}`)) {
            isNuking = true;
            isScanning = false;
            toggleScanButton(false);

            await returnToSurface();

            log(t('cleanupActive'));
            nukeLoop();
        }
    });

    // Initialize UI language
    updateUILanguage();

})();