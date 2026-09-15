/**
 * Andriyanto NA - Digital Twin Application Logic (v3.0.0 Multilingual)
 * Integrates:
 * 1. Multi-Language Switcher & Full i18n (Bahasa Indonesia 🇮🇩, English 🇬🇧, Japanese 🇯🇵)
 * 2. Semantic AI Persona Engine (AgriSensa v2.5, Suzuki Flower Farm TG2, Japanese 5S, MLOps, MMM)
 * 3. ElevenLabs High-Fidelity Neural Voice Synthesizer with language-aware fallback
 * 4. Interactive Live Endpoints (Railway Cloud FastAPI, n8n, Streamlit Hub, Vercel Edge)
 * 5. Production Career Timeline, Recruiter Matcher, and Twin-CLI Terminal
 */

// State Management
const TwinState = {
  activeTab: 'chat',
  currentLang: localStorage.getItem('twin_lang') || 'id',
  voiceEnabled: false,
  apiKey: localStorage.getItem('gemini_api_key') || '',
  engineMode: localStorage.getItem('engine_mode') || 'semantic',
  chatHistory: [],
  terminalHistory: []
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initLucideIcons();
  initLanguageSwitcher();
  initViewTabs();
  initChatSystem();
  initFeaturedProjects();
  initAgriSensaView();
  initSkillMatrix();
  initTimeline();
  initEducation();
  initMatcher();
  initTwinCLI();
  initSettings();
  initModal();
  applyLanguage(TwinState.currentLang);
});

function initLucideIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// --------------------------------------------------------------------------
// Multi-Language Switcher (i18n)
// --------------------------------------------------------------------------
function initLanguageSwitcher() {
  const container = document.getElementById('lang-dropdown-container');
  const triggerBtn = document.getElementById('lang-trigger-btn');
  const items = document.querySelectorAll('.lang-dropdown-item');

  if (triggerBtn && container) {
    triggerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = container.classList.contains('open');
      container.classList.toggle('open', !isOpen);
      triggerBtn.setAttribute('aria-expanded', !isOpen);
    });

    document.addEventListener('click', (e) => {
      if (!container.contains(e.target)) {
        container.classList.remove('open');
        triggerBtn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        container.classList.remove('open');
        triggerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  items.forEach(item => {
    item.addEventListener('click', () => {
      const selectedLang = item.dataset.lang;
      if (selectedLang) {
        setLanguage(selectedLang);
        if (container) {
          container.classList.remove('open');
          if (triggerBtn) triggerBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
}

function setLanguage(lang) {
  if (!TRANSLATIONS[lang]) lang = 'id';
  TwinState.currentLang = lang;
  localStorage.setItem('twin_lang', lang);

  // Update active label in trigger button
  const labelEl = document.getElementById('current-lang-label');
  if (labelEl) {
    const labels = { id: '🇮🇩 ID', en: '🇬🇧 EN', ja: '🇯🇵 日本語' };
    labelEl.innerText = labels[lang] || '🇮🇩 ID';
  }

  // Update active dropdown item
  document.querySelectorAll('.lang-dropdown-item').forEach(item => {
    item.classList.toggle('active', item.dataset.lang === lang);
  });

  applyLanguage(lang);
}

function applyLanguage(lang) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.id;

  // 1. Navigation Links
  const navChat = document.querySelector('.nav-btn[data-view="chat"]');
  const navProjects = document.querySelector('.nav-btn[data-view="projects"]');
  const navAgriSensa = document.querySelector('.nav-btn[data-view="agrisensa"]');
  const navSkills = document.querySelector('.nav-btn[data-view="skills"]');
  const navTimeline = document.querySelector('.nav-btn[data-view="timeline"]');
  const navMatcher = document.querySelector('.nav-btn[data-view="matcher"]');
  const navCLI = document.querySelector('.nav-btn[data-view="cli"]');
  const headerContact = document.getElementById('header-contact-btn');

  if (navChat) navChat.innerHTML = `<i data-lucide="message-square"></i> ${t.header.navChat}`;
  if (navProjects) navProjects.innerHTML = `<i data-lucide="folder-git-2"></i> ${t.header.navProjects}`;
  if (navAgriSensa) navAgriSensa.innerHTML = `<i data-lucide="cpu"></i> ${t.header.navAgriSensa}`;
  if (navSkills) navSkills.innerHTML = `<i data-lucide="sparkles"></i> ${t.header.navSkills}`;
  if (navTimeline) navTimeline.innerHTML = `<i data-lucide="history"></i> ${t.header.navTimeline}`;
  if (navMatcher) navMatcher.innerHTML = `<i data-lucide="check-circle-2"></i> ${t.header.navMatcher}`;
  if (navCLI) navCLI.innerHTML = `<i data-lucide="terminal"></i> ${t.header.navCLI}`;
  if (headerContact) headerContact.innerHTML = `<i data-lucide="send"></i> ${t.header.contactBtn}`;

  // 2. Section Nav Tabs
  const tabChat = document.querySelector('.tab-control-btn[data-view="chat"]');
  const tabProjects = document.querySelector('.tab-control-btn[data-view="projects"]');
  const tabAgriSensa = document.querySelector('.tab-control-btn[data-view="agrisensa"]');
  const tabSkills = document.querySelector('.tab-control-btn[data-view="skills"]');
  const tabTimeline = document.querySelector('.tab-control-btn[data-view="timeline"]');
  const tabEdu = document.querySelector('.tab-control-btn[data-view="education"]');
  const tabMatcher = document.querySelector('.tab-control-btn[data-view="matcher"]');
  const tabCLI = document.querySelector('.tab-control-btn[data-view="cli"]');

  if (tabChat) tabChat.innerHTML = `<i data-lucide="message-square"></i> ${t.header.navChat}`;
  if (tabProjects) tabProjects.innerHTML = `<i data-lucide="folder-git-2"></i> ${t.header.navProjects}`;
  if (tabAgriSensa) tabAgriSensa.innerHTML = `<i data-lucide="cpu"></i> ${t.header.navAgriSensa}`;
  if (tabSkills) tabSkills.innerHTML = `<i data-lucide="sparkles"></i> ${t.header.navSkills}`;
  if (tabTimeline) tabTimeline.innerHTML = `<i data-lucide="history"></i> ${t.header.navTimeline}`;
  if (tabEdu) tabEdu.innerHTML = `<i data-lucide="graduation-cap"></i> ${t.header.navEducation}`;
  if (tabMatcher) tabMatcher.innerHTML = `<i data-lucide="check-circle-2"></i> ${t.header.navMatcher}`;
  if (tabCLI) tabCLI.innerHTML = `<i data-lucide="terminal"></i> ${t.header.navCLI}`;

  // 3. Hero Section
  const heroBadges = document.querySelectorAll('.hero-meta .badge');
  if (heroBadges.length >= 5) {
    heroBadges[0].innerHTML = `<i data-lucide="map-pin"></i> ${t.hero.badgeLocation}`;
    heroBadges[1].innerHTML = `<i data-lucide="award"></i> ${t.hero.badgeTG2}`;
    heroBadges[2].innerHTML = `<i data-lucide="languages"></i> ${t.hero.badgeJLPT}`;
    heroBadges[3].innerHTML = `<i data-lucide="plane"></i> ${t.hero.badgeReloc}`;
    heroBadges[4].innerHTML = `<i data-lucide="volume-2"></i> ${t.hero.badgeVoice}`;
  }

  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) heroTitle.innerHTML = `${t.hero.greeting} <span class="gradient-text">Andriyanto NA</span>`;

  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) heroSubtitle.innerText = t.hero.subtitle;

  const heroBio = document.querySelector('.hero-bio');
  if (heroBio) heroBio.innerHTML = t.hero.bio;

  const statLabels = document.querySelectorAll('.hero-stats-row .stat-lbl');
  if (statLabels.length >= 6) {
    statLabels[0].innerText = t.hero.stats.users;
    statLabels[1].innerText = t.hero.stats.uptime;
    statLabels[2].innerText = t.hero.stats.monteCarlo;
    statLabels[3].innerText = t.hero.stats.n8n;
    statLabels[4].innerText = t.hero.stats.roi;
    statLabels[5].innerText = t.hero.stats.domain;
  }

  // Hero CTAs
  const ctaButtons = document.querySelectorAll('.hero-cta button');
  if (ctaButtons.length >= 2) {
    ctaButtons[0].innerHTML = `<i data-lucide="message-circle"></i> ${t.hero.ctaChat}`;
    ctaButtons[1].innerHTML = `<i data-lucide="cpu"></i> ${t.hero.ctaAgriSensa}`;
  }

  // 4. Chat View Header & Prompts
  const chatTwinTitle = document.querySelector('.chat-twin-info div div:first-child');
  const chatTwinSub = document.querySelector('.chat-twin-info div div:last-child');
  if (chatTwinTitle) chatTwinTitle.innerText = t.chat.title;
  if (chatTwinSub) chatTwinSub.innerText = t.chat.subtitle;

  const chatInput = document.getElementById('chat-input');
  if (chatInput) chatInput.placeholder = t.chat.inputPlaceholder;

  const sendBtn = document.querySelector('.chat-send-btn');
  if (sendBtn) sendBtn.innerHTML = `<i data-lucide="send"></i> ${t.chat.sendBtn}`;

  // Prompt Chips
  const promptBar = document.querySelector('.chat-prompts-bar');
  if (promptBar && t.chat.promptChips) {
    const chipIcons = ['award', 'sparkles', 'cpu', 'trending-up', 'globe', 'plane'];
    promptBar.innerHTML = t.chat.promptChips.map((chipText, i) => `
      <span class="prompt-chip"><i data-lucide="${chipIcons[i] || 'sparkles'}"></i> ${chipText}</span>
    `).join('');

    promptBar.querySelectorAll('.prompt-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.innerText.trim();
        if (chatInput) chatInput.value = text;
        handleUserSubmit(text);
      });
    });
  }

  // Reset chat initial message if no custom history
  const messagesContainer = document.getElementById('chat-messages');
  if (messagesContainer && TwinState.chatHistory.length === 0) {
    messagesContainer.innerHTML = '';
    appendMessage('twin', t.chat.greetingMsg);
  }

  // 5. Re-render dynamic views with localized data
  initFeaturedProjects();
  initAgriSensaView();
  initSkillMatrix();
  initTimeline();
  initEducation();

  initLucideIcons();
}

// --------------------------------------------------------------------------
// Navigation & View Switching
// --------------------------------------------------------------------------
function initViewTabs() {
  const tabButtons = document.querySelectorAll('.tab-control-btn, .nav-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetView = btn.dataset.view;
      if (!targetView) return;
      switchView(targetView);
    });
  });

  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(`view-${hash}`)) {
    switchView(hash);
  }
}

function switchView(viewName) {
  TwinState.activeTab = viewName;

  document.querySelectorAll('.tab-control-btn, .nav-btn').forEach(btn => {
    if (btn.dataset.view === viewName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  document.querySelectorAll('.view-section').forEach(sec => {
    sec.classList.remove('active');
  });

  const targetSection = document.getElementById(`view-${viewName}`);
  if (targetSection) {
    targetSection.classList.add('active');
    window.location.hash = viewName;
  }

  setTimeout(initLucideIcons, 50);
}

// --------------------------------------------------------------------------
// AI Digital Twin Conversational Engine
// --------------------------------------------------------------------------
function initChatSystem() {
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const messagesContainer = document.getElementById('chat-messages');
  const voiceToggle = document.getElementById('voice-toggle-btn');
  const clearChatBtn = document.getElementById('clear-chat-btn');

  const t = TRANSLATIONS[TwinState.currentLang] || TRANSLATIONS.id;

  if (TwinState.chatHistory.length === 0) {
    appendMessage('twin', t.chat.greetingMsg);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    handleUserSubmit(text);
  });

  if (voiceToggle) {
    voiceToggle.addEventListener('click', () => {
      TwinState.voiceEnabled = !TwinState.voiceEnabled;
      voiceToggle.classList.toggle('active', TwinState.voiceEnabled);
      if (TwinState.voiceEnabled) {
        const voiceNotif = TwinState.currentLang === 'ja' 
          ? "ElevenLabs AI音声モードが有効化されました。" 
          : (TwinState.currentLang === 'en' ? "ElevenLabs AI Voice mode activated." : "Mode suara ElevenLabs Digital Twin diaktifkan.");
        speakText(voiceNotif);
      } else {
        if (currentAudio) { currentAudio.pause(); currentAudio = null; }
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      }
    });
  }

  if (clearChatBtn) {
    clearChatBtn.addEventListener('click', () => {
      messagesContainer.innerHTML = '';
      TwinState.chatHistory = [];
      const currT = TRANSLATIONS[TwinState.currentLang] || TRANSLATIONS.id;
      appendMessage('twin', currT.chat.resetDone);
    });
  }
}

async function handleUserSubmit(userText) {
  appendMessage('user', userText);
  showTypingIndicator();

  try {
    let responseText = '';
    if (TwinState.engineMode === 'gemini') {
      responseText = await queryGeminiAPI(userText);
    } else {
      await new Promise(r => setTimeout(r, 500));
      responseText = generateSemanticTwinResponse(userText, TwinState.currentLang);
    }

    hideTypingIndicator();
    appendMessage('twin', responseText);

    if (TwinState.voiceEnabled) {
      speakText(cleanMarkdownForTTS(responseText));
    }
  } catch (err) {
    hideTypingIndicator();
    const fallbackResponse = generateSemanticTwinResponse(userText, TwinState.currentLang);
    appendMessage('twin', fallbackResponse);
  }
}

function appendMessage(sender, markdownText) {
  const container = document.getElementById('chat-messages');
  if (!container) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-msg ${sender}`;

  const avatar = document.createElement('div');
  avatar.className = 'msg-avatar';
  avatar.innerHTML = sender === 'twin' ? '<i data-lucide="bot"></i>' : '<i data-lucide="user"></i>';

  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.innerHTML = renderSimpleMarkdown(markdownText);

  if (sender === 'twin') {
    const t = TRANSLATIONS[TwinState.currentLang] || TRANSLATIONS.id;
    const audioBtn = document.createElement('button');
    audioBtn.className = 'msg-audio-btn';
    audioBtn.innerHTML = `<i data-lucide="volume-2"></i> ${t.chat.audioBtn}`;
    audioBtn.onclick = () => speakText(cleanMarkdownForTTS(markdownText));
    bubble.appendChild(audioBtn);
  }

  msgDiv.appendChild(avatar);
  msgDiv.appendChild(bubble);
  container.appendChild(msgDiv);

  container.scrollTop = container.scrollHeight;
  initLucideIcons();
}

function showTypingIndicator() {
  const container = document.getElementById('chat-messages');
  let indicator = document.getElementById('typing-indicator');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.id = 'typing-indicator';
    indicator.className = 'chat-msg twin';
    indicator.innerHTML = `
      <div class="msg-avatar"><i data-lucide="cpu"></i></div>
      <div class="msg-bubble typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    container.appendChild(indicator);
    container.scrollTop = container.scrollHeight;
    initLucideIcons();
  }
}

function hideTypingIndicator() {
  const indicator = document.getElementById('typing-indicator');
  if (indicator) indicator.remove();
}

// --------------------------------------------------------------------------
// Multi-Language Semantic Knowledge Engine (ID, EN, JA)
// --------------------------------------------------------------------------
function generateSemanticTwinResponse(query, lang = 'id') {
  const q = query.toLowerCase();

  // 1. Suzuki Flower Farm & Tokutei Ginou 2 (TG2) in Japan
  if (q.includes('suzuki') || q.includes('flower') || q.includes('tg2') || q.includes('tokutei') || (q.includes('jepang') && q.includes('ujian')) || q.includes('特定技能') || q.includes('鈴木')) {
    if (lang === 'ja') {
      return `**鈴木フラワーファーム（愛知県田原市）での職務経歴 ＆ 農林水産省「特定技能2号（農業）」合格実績:**\n\n- **勤務先**: 鈴木フラワーファーム (Suzuki Flower Farm)\n- **所在地**: 愛知県田原市\n- **在籍期間**: **2023年6月 – 現在（継続中）**\n- **担当職務**: *農業オペレーションスペシャリスト（施設園芸・精密花卉栽培）*\n\n**主な職務内容と実績:**\n- 輸出基準・最高品質を満たす花卉の精密栽培管理。\n- 温室ハウス内の複合環境制御（自動温度・湿度・日射・自動換気）および精密養液点滴灌水（施肥）の運用。\n- 日本の**5S（整理・整頓・清掃・清潔・躾）**およびカイゼン（業務効率化）の徹底。\n\n**🏆 高度専門資格 — 農林水産省「特定技能2号（農業）」合格:**\n- 日本政府（農林水産省）が管掌する最難関の現場リーダー・管理者向け国家試験**「特定技能2号」に合格**。\n- 現場監督者レベルの熟練した技術力と管理能力が公的に証明されており、**在留期間更新の上限撤廃および家族帯同が可能な長期専門職ビザ**の要件を満たしています。`;
    }
    if (lang === 'en') {
      return `**Professional Experience at Suzuki Flower Farm & Passed Japan's MAFF Tokutei Ginou 2 (TG2) Exam:**\n\n- **Company**: Suzuki Flower Farm (鈴木フラワーファーム)\n- **Location**: Tahara City, Aichi Prefecture, Japan\n- **Period**: **June 2023 – Present (Ongoing)**\n- **Role**: *Agricultural Operations Specialist (Floriculture & Precision Farming)*\n\n**Key Responsibilities & Operational Rigor:**\n- Managed high-grade floriculture operations conforming to Japanese export quality standards.\n- Controlled automated greenhouse microclimate (temperature, humidity, ventilation) and precision nutrient fertigation systems.\n- Implemented strict Japanese **5S Methodology (Seiri, Seiton, Seiso, Seiketsu, Shitsuke)** and continuous Kaizen improvements.\n\n**🏆 Prestigious Qualification — Passed Tokutei Ginou 2 (TG2):**\n- Officially **passed the Tokutei Ginou 2 (Specified Skilled Worker II - Agriculture)** examination certified by Japan's Ministry of Agriculture, Forestry and Fisheries (MAFF).\n- TG2 validates expert supervisor-level agricultural competence and provides eligibility for indefinite visa renewals and family sponsorship in Japan.`;
    }
    return `**Pengalaman Kerja di Suzuki Flower Farm (鈴木フラワーファーム) & Kelulusan Ujian TG2 Jepang:**\n\n- **Perusahaan**: Suzuki Flower Farm (鈴木フラワーファーム)\n- **Lokasi**: Tahara-shi, Prefektur Aichi, Jepang\n- **Periode**: **Juni 2023 – Saat ini (Masih Berlanjut)**\n- **Peran**: *Agricultural Operations Specialist (Floriculture & Precision Farming)*\n\n**Tanggung Jawab & Keahlian Operasional:**\n- Mengelola seluruh siklus operasional budidaya tanaman hias / florikultura presisi dengan standar mutu ekspor Jepang.\n- Mengatur otomasi mikroklimat greenhouse (suhu, kelembapan, pencahayaan, ventilasi otomatis) dan sistem fertigasi nutrisi presisi.\n- Menerapkan metodologi **5S Jepang (Seiri, Seiton, Seiso, Seiketsu, Shitsuke)** dan Kaizen untuk efisiensi alur kerja panen dan pascapanen.\n\n**🏆 Kualifikasi Prestisius — Lulus Ujian Tokutei Ginou 2 (TG2):**\n- **Status**: Telah **lulus ujian kualifikasi keahlian tingkat lanjut Tokutei Ginou 2 (TG2 / Specified Skilled Worker II)** bidang pertanian yang diselenggarakan oleh Kementerian Pertanian, Kehutanan dan Perikanan Jepang (MAFF).\n- **Signifikansi**: Kualifikasi TG2 mengakui keahlian teknis dan kepemimpinan tingkat supervisor (*expert/leader level*), serta memberikan hak izin kerja profesional jangka panjang di Jepang (dapat diperpanjang tanpa batas waktu dan berhak membawa keluarga).`;
  }

  // 2. AgriSensa Ecosystem (agrisensaofficial.com vs mirai39.streamlit.app)
  if (q.includes('agrisensa') || q.includes('agrisensaofficial') || q.includes('mirai39') || q.includes('streamlit') || q.includes('railway') || q.includes('deepseek') || q.includes('n8n')) {
    if (lang === 'ja') {
      return `**AgriSensa AI — 統合スマート農業＆MLOpsエコシステム (v2.5):**\n\n1. **🌐 商用エンタープライズ版 ([agrisensaofficial.com](https://agrisensaofficial.com))**:\n   - **フロントエンド**: **Next.js 16 + Tailwind CSS**（Vercel Edge、モバイルファーストUI）。\n   - **AI推論＆MCPエンジン**: **Railway Cloud**上のFastAPIマイクロサービス ([API Docs](https://ai-engine-production-cc99.up.railway.app/docs))、**DeepSeek-V3**推論とDOI学術論文データベース連動。\n   - **MLOps推論API**: **Railway Cloud**上のFastAPIマイクロサービス ([API Docs](https://mlops-api-production-afaf.up.railway.app/docs))、土壌レーダー診断とSHAP説明可能性。\n   - **n8n自動化**: **14の自動化ワークフロー** ([n8n instance](https://n8n-production-999a.up.railway.app))。\n   - **モンテカルロリスクシミュレーション**: **10,000回試行**の天候・市場価格リスク分析 (VaR 95%)。\n\n2. **📱 Streamlit分析ハブ ([mirai39.streamlit.app](https://mirai39.streamlit.app/))**:\n   - 時系列予測・GISマップ分析ハブ（**1,000名以上**のアクティブユーザー、稼働率99.5%）。`;
    }
    if (lang === 'en') {
      return `**AgriSensa AI — Unified Smart Agriculture & MLOps Ecosystem (v2.5):**\n\n1. **🌐 Enterprise Production Platform ([agrisensaofficial.com](https://agrisensaofficial.com))**:\n   - **Frontend**: Built with **Next.js 16 + Tailwind CSS** on Vercel Edge with mobile-first UX.\n   - **AI Reasoning & MCP Engine**: FastAPI microservice on **Railway Cloud** ([Docs API](https://ai-engine-production-cc99.up.railway.app/docs)), powered by **DeepSeek-V3** with DOI-indexed agronomic research.\n   - **MLOps Inference API**: FastAPI microservice on **Railway Cloud** ([Docs API](https://mlops-api-production-afaf.up.railway.app/docs)) for soil radar diagnostics and SHAP explainability.\n   - **n8n Orchestrator**: **14 automated workflows** on Railway Cloud ([n8n instance](https://n8n-production-999a.up.railway.app)).\n   - **Stochastic Monte Carlo Risk Engine**: **10,000 iterations** for weather volatility, crop risk, and 95% Value at Risk (VaR).\n\n2. **📱 Streamlit Platform Hub ([mirai39.streamlit.app](https://mirai39.streamlit.app/))**:\n   - Interactive data-centric hub for fast geospatial Folium mapping and time series forecasting (**1,000+ active users**, 99.5% uptime).`;
    }
    return `**AgriSensa AI — Unified Smart Agriculture & MLOps Ecosystem (v2.5):**\n\nSaya membagi platform AgriSensa ke dalam dua pilar utama:\n\n1. **🌐 Enterprise Production Platform ([agrisensaofficial.com](https://agrisensaofficial.com))**:\n   - **Frontend**: Dibangun dengan **Next.js 16 + Tailwind CSS** di-deploy di Vercel Edge dengan UI mobile-first.\n   - **AI Reasoning & MCP Engine**: Microservice FastAPI di **Railway Cloud** ([Docs API](https://ai-engine-production-cc99.up.railway.app/docs)), ditenagai model **DeepSeek-V3** dengan basis data riset ilmiah ber-DOI (IPB, BRIN, FAO, Elsevier).\n   - **MLOps Inference API**: Microservice FastAPI di **Railway Cloud** ([Docs API](https://mlops-api-production-afaf.up.railway.app/docs)) untuk inferensi radar tanah dan SHAP explainability.\n   - **Orkestrator n8n**: **14 automated workflows** di Railway Cloud ([n8n instance](https://n8n-production-999a.up.railway.app)).\n   - **Simulasi Stokastik Monte Carlo**: Engine simulasi **10.000 iterasi** untuk mitigasi risiko cuaca, fluktuasi harga, dan 95% Value at Risk (VaR).\n   - **Laboratorium Pupuk & HET**: Skema subsidi HET Permentan RI dan formulasi C/N pupuk organik.\n\n2. **📱 Streamlit Platform Hub ([mirai39.streamlit.app](https://mirai39.streamlit.app/))**:\n   - Hub interaktif data-centric untuk visualisasi cepat, peramalan time series, dan pemetaan geospasial Folium/GIS yang telah melayani **1.000+ pengguna aktif** dengan **99.5% uptime**.`;
  }

  // 3. Monte Carlo & ESG Carbon
  if (q.includes('monte carlo') || q.includes('karbon') || q.includes('carbon') || q.includes('esg') || q.includes('risiko') || q.includes('risk') || q.includes('var') || q.includes('モンテカルロ')) {
    if (lang === 'ja') {
      return `**AgriSensa AI (v2.5) における高度分析モジュール:**\n\n1. **📈 モンテカルロ リスクエンジン (`/monte-carlo`)**:\n   - Box-Muller変換を用いた正規分布による**10,000回の確率論的試行**。\n   - 異常気象リスクや市場価格変動をシミュレートし、期待純利益、黒字確率(%)、および**95% Value at Risk (VaR)**を算出。\n\n2. **📊 ESGカーボンフットプリント算定モデル (`/analyst`)**:\n   - 化学肥料と有機肥料の配合比率から温室効果ガス**Scope 1-3 (N2O および CO2e)**排出量を自動算定。`;
    }
    if (lang === 'en') {
      return `**Advanced Analytics in AgriSensa AI (v2.5):**\n\n1. **📈 Monte Carlo Stochastic Risk Engine (`/monte-carlo`)**:\n   - Executes **10,000 stochastic runs** using Box-Muller normal distributions.\n   - Simulates extreme weather volatility, crop failure, and market price fluctuations to calculate net profit expectations, profitability probability (%), and **95% Value at Risk (VaR)**.\n\n2. **📊 ESG Carbon Footprint Modeling (`/analyst`)**:\n   - Calculates **Scope 1-3 GHG emissions (N2O and CO2e)** from chemical vs. organic fertilizer allocations to support sustainable farming certifications.`;
    }
    return `Di dalam **AgriSensa AI (v2.5)**, saya mengimplementasikan dua modul analitik tingkat lanjut:\n\n1. **📈 Monte Carlo Risk Engine (`/monte-carlo`)**:\n   - Menjalankan **10.000 iterasi stokastik** menggunakan distribusi normal Box-Muller.\n   - Mensimulasikan volatilitas cuaca ekstrem, risiko kegagalan panen, dan fluktuasi harga pasar untuk menghasilkan ekspektasi laba bersih, probabilitas profitabilitas (%), estimasi ROI, dan **Value at Risk (VaR 95%)**.\n\n2. **📊 Model Jejak Karbon ESG (`/analyst`)**:\n   - Menghitung emisi gas rumah kaca **Scope 1-3 (N2O dan CO2e)** dari alokasi pemupukan kimia vs organik untuk mendukung sertifikasi pertanian berkelanjutan.`;
  }

  // 4. Marketing Analytics (MMM, CLV, Churn)
  if (q.includes('mmm') || q.includes('marketing') || q.includes('clv') || q.includes('churn') || q.includes('adstock') || q.includes('ga4') || q.includes('マーケティング')) {
    if (lang === 'ja') {
      return `**マーケティング分析 ＆ グロース最適化実績:**\n\n- **ベイズ流マーケティング・ミックス・モデリング (Bayesian MMM)**: アドストック効果と飽和関数による広告予算最適化。\n- **顧客アナリティクス**: 解約予測（精度**85%**）および顧客生涯価値（CLV）モデリング。\n- **事業インパクト**: マーケティング**ROI 40%向上**、レポート自動化による業務工数**60%削減**を達成。`;
    }
    if (lang === 'en') {
      return `**Marketing Analytics & Growth Optimization Portfolio:**\n\n- **Bayesian MMM**: Modeled *Adstock & Saturation* curves for optimal multi-channel marketing budget allocation.\n- **Customer Analytics**: Built churn prediction models (**85% accuracy**) and Customer Lifetime Value (CLV) scoring.\n- **Business Impact**: Delivered **40% ROI boost** and reduced automated reporting time by **60%**.`;
    }
    return `Sebagai pelengkap data science, saya memiliki portofolio **Marketing Analytics & Growth Optimization**:\n\n- **Bayesian MMM**: Menggunakan efek *Adstock & Saturation* untuk alokasi anggaran iklan optimal.\n- **Customer Analytics**: Prediksi churn dengan akurasi **85%** dan pemodelan Customer Lifetime Value (CLV).\n- **Hasil Nyata**: Memberikan peningkatan **ROI 40%** dan memangkas waktu pembuatan laporan hingga **60%**.`;
  }

  // 5. Relocation / Visa Sponsorship / Hiring
  if (q.includes('relocation') || q.includes('visa') || q.includes('pindah') || q.includes('sponsor') || q.includes('lowongan') || q.includes('hire') || q.includes('remote') || q.includes('rekrut') || q.includes('ビザ') || q.includes('採用')) {
    if (lang === 'ja') {
      return `**採用および転居・ビザスポンサーシップに関する情報:**\n\n- **希望職種**: **AIエンジニア**, **MLOpsエンジニア**, **農業データサイエンティスト**, **フルスタックAIエンジニア**。\n- **勤務地・転居**: **日本国内およびグローバル（APAC/海外/リモート）への転居・ビザ取得可能**。\n- **現住所**: 日本・愛知県（UTC+9）。\n- **言語**: インドネシア語（母国語）、英語（業務遂行レベル）、日本語（**JLPT N3取得 ＆ 特定技能2号合格**）。\n- **連絡先**: **yandri918@gmail.com** | **+81-80-7698-8509** | [LinkedIn](https://linkedin.com/in/andriyanto)。`;
    }
    if (lang === 'en') {
      return `**Career Availability & Visa Sponsorship Status:**\n\n- **Open Roles**: **AI Engineer**, **MLOps Engineer**, **Agricultural Data Scientist**, or **Full-Stack AI Developer**.\n- **Relocation & Visa**: **Fully Open to Relocation & Visa Sponsorship** (Japan, APAC, Global / Remote).\n- **Location**: Aichi Prefecture, Japan (UTC+9).\n- **Languages**: Indonesian (Native), English (Professional Working), Japanese (**JLPT N3 Certified & Passed TG2**).\n- **Direct Contact**: **yandri918@gmail.com** | **+81-80-7698-8509** | [LinkedIn](https://linkedin.com/in/andriyanto).`;
    }
    return `**Ketersediaan Karir & Status Relokasi:**\n\n- **Status**: Terbuka (*Open to Work*) untuk posisi **AI Engineer**, **MLOps Engineer**, **Agricultural Data Scientist**, atau **Full-Stack AI Developer**.\n- **Relokasi & Visa**: **Open to Relocation & Visa Sponsorship** (Jepang, APAC, Global / Remote).\n- **Domisili**: Aichi, Jepang (UTC+9).\n- **Bahasa**: Indonesia (Native), Inggris (Professional Working), Jepang (**JLPT N3 Certified** & **Lulus TG2**).\n- **Kontak**: **yandri918@gmail.com** | **+81-80-7698-8509** | [LinkedIn](https://linkedin.com/in/andriyanto).`;
  }

  // 6. Japan Experience & 5S
  if (q.includes('jepang') || q.includes('japan') || q.includes('5s') || q.includes('jlpt') || q.includes('n3') || q.includes('yamasa') || q.includes('fujikikou') || q.includes('日本')) {
    if (lang === 'ja') {
      return `**日本における5年以上のプロフェッショナル実務経歴:**\n\n1. **🌸 鈴木フラワーファーム (愛知県田原市, 2023年6月 - 現在・継続中)**:\n   - *農業オペレーションスペシャリスト（施設園芸）*。\n   - **農林水産省「特定技能2号（農業）」合格**（現場リーダー・監督者レベル）。\n2. **🌿 山佐の庭 (静岡県, 2022 - 2023)**:\n   - 5S手法とデータに基づく緑地・造園オペレーションの最適化。\n3. **🏭 株式会社フジキコー (静岡県, 2009 - 2012)**:\n   - 産業機械製造および精密機器保全の3年間集中技術研修修了。\n4. **📜 語学資格**: **日本語能力試験 JLPT N3 取得**。`;
    }
    if (lang === 'en') {
      return `**Over 5 Years of Professional Excellence in Japan:**\n\n1. **🌸 Suzuki Flower Farm (Aichi, June 2023 - Present & Ongoing)**:\n   - *Agricultural Operations Specialist (Floriculture)*.\n   - **Passed Japan's MAFF Tokutei Ginou 2 (TG2)** Agricultural Supervisor qualification.\n2. **🌿 Yamasa no Niwa (Shizuoka, 2022 - 2023)**:\n   - Japanese 5S methodology and data-driven landscape operations.\n3. **🏭 PT Fujikikou (Shizuoka, 2009 - 2012)**:\n   - 3-Year Intensive Industrial Manufacturing & Machine Maintenance Training.\n4. **📜 Certification**: **JLPT N3 (Japanese Language Proficiency Test)**.`;
    }
    return `Saya memiliki pengalaman panjang tinggal dan bekerja dengan standar profesional tinggi di **Jepang** (lebih dari 5 tahun):\n\n1. **🌸 Suzuki Flower Farm (Aichi, Juni 2023 - Saat ini & Masih Berlanjut)**:\n   - *Agricultural Operations Specialist (Floriculture)*.\n   - **Lulus Ujian Tokutei Ginou 2 (TG2)** bidang pertanian Jepang (tingkat supervisor/expert).\n2. **🌿 Yamasa no Niwa (Shizuoka, 2022 - 2023)**:\n   - Menerapkan metodologi 5S Jepang dan optimalisasi operasional lanskap berbasis data.\n3. **🏭 PT Fujikikou (Shizuoka, 2009 - 2012)**:\n   - 3-Year Intensive Technical Training di bidang manufaktur industri & pemeliharaan mesin presisi.\n4. **📜 Kemampuan Bahasa**: Bersertifikat resmi **JLPT N3 (Japanese Language Proficiency Test)**.`;
  }

  // Default fallback
  if (lang === 'ja') {
    return `ご質問ありがとうございます！私は **AI & MLOps エンジニア、農業データサイエンティスト** の Andriyanto NA です。\n\n以下のテーマについてお答えできます:\n- 商用本番エコシステム **[agrisensaofficial.com](https://agrisensaofficial.com)** (Next.js 16 + Railway Cloud FastAPI + n8n + DeepSeek-V3)\n- **[mirai39.streamlit.app](https://mirai39.streamlit.app/)** 分析ハブ\n- **10,000回 モンテカルロ シミュレーション** および ESGカーボンモデル\n- **鈴木フラワーファーム** での施設園芸オペレーション ＆ **特定技能2号（農業）** 合格実績、日本での就労・ビザ状況。`;
  }
  if (lang === 'en') {
    return `Thank you for your inquiry! I am Andriyanto NA, **AI & MLOps Engineer and Agricultural Data Scientist**.\n\nYou can explore:\n- Enterprise Production Platform **[agrisensaofficial.com](https://agrisensaofficial.com)** (Next.js 16 + Railway Cloud FastAPI + n8n + DeepSeek-V3)\n- Interactive **[mirai39.streamlit.app](https://mirai39.streamlit.app/)** hub\n- Stochastic risk simulations via **Monte Carlo (10,000 Runs)** and ESG Carbon modeling\n- Operational floriculture at **Suzuki Flower Farm**, passing **Tokutei Ginou 2 (TG2)** in Japan, or relocation & visa sponsorship.`;
  }
  return `Terima kasih atas pertanyaannya! Saya adalah **AI & MLOps Engineer serta Agricultural Data Scientist**.\n\nAnda dapat menanyakan hal-hal seputar:\n- Ekosistem Enterprise **[agrisensaofficial.com](https://agrisensaofficial.com)** (Next.js 16 + Railway Cloud FastAPI + n8n + DeepSeek-V3)\n- Hub interaktif **[mirai39.streamlit.app](https://mirai39.streamlit.app/)**\n- Simulasi risiko **Monte Carlo (10.000 Runs)** dan model ESG Karbon Scope 1-3\n- Pengalaman kerja di **Suzuki Flower Farm (Aichi)**, kelulusan ujian **TG2 Jepang**, sertifikasi **JLPT N3**, atau status relokasi & visa kerja.`;
}

// --------------------------------------------------------------------------
// Live Gemini API Query (Serverless Endpoint + Direct Fallback)
// --------------------------------------------------------------------------
async function queryGeminiAPI(prompt) {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: prompt })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.reply) return data.reply;
    }
  } catch (e) {
    // Serverless not available
  }

  const apiKey = TwinState.apiKey || localStorage.getItem('gemini_api_key');
  if (apiKey) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const systemInstruction = `You are the official Digital Twin AI of Andriyanto NA. Speak in first person with a sharp, professional demeanor. Support Indonesian, English, and Japanese based on user language:
- Roles: AI & MLOps Engineer | Agricultural Data Scientist | Agritech Full-Stack Developer.
- Location: Aichi, Japan | Open to Relocation & Visa Sponsorship (Global / APAC / Japan).
- Languages: Indonesian (Native), English (Professional Working), Japanese (JLPT N3 & Tokutei Ginou 2 / TG2 Certified).
- Flagship Platform: AgriSensa AI (v2.5) at https://agrisensaofficial.com (Next.js 16, Railway Cloud FastAPI microservices on Port 8000/8001, n8n with 14 automated workflows, DeepSeek-V3 reasoning engine, Monte Carlo 10k runs, ESG Carbon modeling).
- Streamlit Hub: https://mirai39.streamlit.app/ (1,000+ active users, 99.5% uptime).
- Marketing Analytics: Bayesian MMM (Adstock & Saturation), GA4 tracking, Multi-Touch Attribution, Churn Prediction (85% accuracy), CLV.
- AI Forecasting & Opt: Time Series (Prophet, ARIMA), Multi-Objective Optimization (Pymoo), Real-time Retraining.
- Work History: Suzuki Flower Farm in Aichi Japan (June 2023 - Present, floriculture operations, TG2 passed), Yamasa no Niwa (5S ops in Shizuoka Japan), Kodim (11 yrs agri instructor), Tokopedia Mitra (supervisor), GrabKios (behavioral data), 8Villages (chili project), Fujikikou (3-yr technical trainee in Japan).
- Education: UTEL University (B.S. Computer Engineering 2026), Universitas Terbuka (B.Econ 2027).
- Contact: yandri918@gmail.com, +81-80-7698-8509, github.com/yandri918, linkedin.com/in/andriyanto.
Answer in structured, readable markdown.`;

    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemInstruction}\n\nUser Question: ${prompt}` }]
        }
      ]
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const data = await res.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, respon tidak dapat dihasilkan.";
    }
  }

  return generateSemanticTwinResponse(prompt, TwinState.currentLang);
}

// --------------------------------------------------------------------------
// Featured Projects Showcase Renderer
// --------------------------------------------------------------------------
function initFeaturedProjects() {
  const container = document.getElementById('projects-grid-container');
  if (!container) return;

  const t = TRANSLATIONS[TwinState.currentLang] || TRANSLATIONS.id;
  const projectsTitle = document.querySelector('#view-projects h2');
  const projectsSub = document.querySelector('#view-projects p');
  if (projectsTitle) projectsTitle.innerText = t.projects.heading;
  if (projectsSub) projectsSub.innerText = t.projects.subheading;

  container.innerHTML = PROFILE_DATA.featuredProjects.map((proj, idx) => `
    <div class="glass-panel" style="padding: 1.6rem; display: flex; flex-direction: column; justify-content: space-between; border-color: rgba(255,255,255,0.09);">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.6rem;">
          <span class="badge ${idx === 0 ? 'badge' : (idx === 1 ? 'badge-cyan' : 'badge-indigo')}">
            <i data-lucide="${idx === 0 ? 'award' : (idx === 1 ? 'globe' : 'cpu')}"></i> ${proj.period}
          </span>
          <span class="mono" style="font-size: 0.72rem; color: var(--text-dim);">PROJ-0${idx+1}</span>
        </div>
        <h3 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--text-main);">${proj.title}</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.55; margin-bottom: 1rem;">
          ${proj.description}
        </p>
      </div>

      <div>
        <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.65rem 0.85rem; margin-bottom: 1rem;">
          <div style="font-size: 0.72rem; font-weight: 700; color: var(--emerald-400); text-transform: uppercase; margin-bottom: 0.35rem;">${t.projects.highlightsLabel}</div>
          <ul style="font-size: 0.78rem; color: var(--text-muted); margin-left: 1.1rem;">
            ${proj.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
        </div>
        
        <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 1rem;">
          ${proj.tech.map(tech => `<span class="skill-chip" style="font-size: 0.72rem; padding: 0.25rem 0.55rem;">${tech}</span>`).join('')}
        </div>

        <button class="btn-pill btn-secondary project-discuss-btn" data-project-idx="${idx}" style="width: 100%; justify-content: center; font-size: 0.78rem;">
          <i data-lucide="message-circle"></i> ${t.projects.btnDetails}
        </button>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.project-discuss-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.projectIdx, 10);
      const proj = PROFILE_DATA.featuredProjects[idx];
      if (proj) {
        switchView('chat');
        setTimeout(() => {
          handleUserSubmit(`Ceritakan lebih detail mengenai arsitektur dan dampak dari proyek '${proj.title}'.`);
        }, 200);
      }
    });
  });

  initLucideIcons();
}

// --------------------------------------------------------------------------
// AgriSensa Blueprint Renderer
// --------------------------------------------------------------------------
function initAgriSensaView() {
  const container = document.getElementById('agrisensa-layers-container');
  const servicesContainer = document.getElementById('agrisensa-services-container');
  const modulesContainer = document.getElementById('agrisensa-modules-container');

  if (servicesContainer) {
    servicesContainer.innerHTML = PROFILE_DATA.flagshipProject.services.map(srv => `
      <a href="${srv.url}" target="_blank" rel="noopener" class="glass-panel" style="padding: 1rem 1.25rem; display: flex; justify-content: space-between; align-items: center; text-decoration: none; color: inherit; transition: var(--transition-fast);">
        <div>
          <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-main); display: flex; align-items: center; gap: 0.4rem;">
            ${srv.name} <i data-lucide="external-link" style="width: 14px; height: 14px; color: var(--cyan-400);"></i>
          </div>
          <div style="font-size: 0.75rem; color: var(--text-dim);">${srv.platform} &bull; <span class="mono" style="color: var(--cyan-400);">${srv.url.replace('https://', '')}</span></div>
        </div>
        <span class="badge ${srv.status.includes('Live') || srv.status.includes('Online') ? 'badge' : 'badge-cyan'}">${srv.status}</span>
      </a>
    `).join('');
  }

  if (container) {
    container.innerHTML = PROFILE_DATA.flagshipProject.architecture.map((layer, idx) => `
      <div class="glass-panel arch-layer-card" data-layer-idx="${idx}">
        <span class="layer-step-num">0${idx + 1}</span>
        <div class="arch-icon">
          <i data-lucide="${getLayerIcon(idx)}"></i>
        </div>
        <h3 class="arch-layer-title">${layer.layer}</h3>
        <div class="arch-layer-tech">${layer.tech}</div>
        <p class="arch-layer-desc">${layer.desc}</p>
      </div>
    `).join('');

    container.querySelectorAll('.arch-layer-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.layerIdx, 10);
        const layer = PROFILE_DATA.flagshipProject.architecture[idx];
        if (layer) {
          switchView('chat');
          setTimeout(() => {
            handleUserSubmit(`Jelaskan lebih mendalam tentang komponen ${layer.layer} (${layer.tech}) pada AgriSensa AI.`);
          }, 200);
        }
      });
    });
  }

  if (modulesContainer) {
    modulesContainer.innerHTML = PROFILE_DATA.flagshipProject.modules.map(mod => `
      <div class="glass-panel" style="padding: 1rem 1.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
          <strong style="color: var(--emerald-400); font-size: 0.9rem;">${mod.name}</strong>
          <code class="mono" style="font-size: 0.75rem; color: var(--cyan-400);">${mod.code}</code>
        </div>
        <p style="font-size: 0.8rem; color: var(--text-muted);">${mod.desc}</p>
      </div>
    `).join('');
  }

  initLucideIcons();
}

function getLayerIcon(idx) {
  const icons = ['layout', 'cpu', 'activity', 'trending-up', 'git-merge'];
  return icons[idx] || 'layers';
}

function initSkillMatrix() {
  const container = document.getElementById('skills-matrix-container');
  if (!container) return;

  const t = TRANSLATIONS[TwinState.currentLang] || TRANSLATIONS.id;
  const skillsTitle = document.querySelector('#view-skills h2');
  const skillsSub = document.querySelector('#view-skills p');
  if (skillsTitle) skillsTitle.innerText = t.skills.heading;
  if (skillsSub) skillsSub.innerText = t.skills.subheading;

  container.innerHTML = PROFILE_DATA.skills.categories.map(cat => `
    <div class="glass-panel skill-category-card">
      <div class="skill-category-header">
        <i data-lucide="${cat.icon}" style="color: var(--emerald-400); width: 22px; height: 22px;"></i>
        <h3 style="font-size: 1.05rem;">${cat.title}</h3>
      </div>
      <div class="skill-chips-wrap">
        ${cat.items.map(item => `
          <span class="skill-chip" data-skill-name="${encodeURIComponent(item)}">
            ${item}
          </span>
        `).join('')}
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.skill-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const skillName = decodeURIComponent(chip.dataset.skillName);
      if (skillName) {
        switchView('chat');
        setTimeout(() => {
          handleUserSubmit(`Bagaimana pengalaman dan keahlianmu dalam menggunakan ${skillName}?`);
        }, 200);
      }
    });
  });

  initLucideIcons();
}

function initTimeline() {
  const container = document.getElementById('timeline-container');
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!container) return;

  const t = TRANSLATIONS[TwinState.currentLang] || TRANSLATIONS.id;
  const timelineTitle = document.querySelector('#view-timeline h2');
  const timelineSub = document.querySelector('#view-timeline p');
  if (timelineTitle) timelineTitle.innerText = t.timeline.heading;
  if (timelineSub) timelineSub.innerText = t.timeline.subheading;

  if (filterBtns.length >= 4) {
    filterBtns[0].innerText = t.timeline.filterAll;
    filterBtns[1].innerText = t.timeline.filterJapan;
    filterBtns[2].innerText = t.timeline.filterIndo;
  }

  renderTimelineNodes(PROFILE_DATA.experience);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      let filtered = PROFILE_DATA.experience;
      if (filter === 'JP') filtered = PROFILE_DATA.experience.filter(e => e.country === 'JP');
      if (filter === 'ID') filtered = PROFILE_DATA.experience.filter(e => e.country === 'ID');
      if (filter === 'agri') filtered = PROFILE_DATA.experience.filter(e => e.badge.toLowerCase().includes('agri') || e.badge.toLowerCase().includes('organic') || e.badge.toLowerCase().includes('sustainable'));

      renderTimelineNodes(filtered);
    });
  });
}

function renderTimelineNodes(items) {
  const container = document.getElementById('timeline-container');
  if (!container) return;

  container.innerHTML = items.map(exp => `
    <div class="timeline-node">
      <div class="timeline-marker"></div>
      <div class="glass-panel timeline-card">
        <div class="timeline-top">
          <div>
            <h3 class="timeline-role">${exp.role}</h3>
            <div class="timeline-company">${exp.company} &bull; <span style="color: var(--text-dim); font-size: 0.8rem;">${exp.location}</span></div>
          </div>
          <span class="badge ${exp.country === 'JP' ? 'badge-cyan' : ''}">${exp.period}</span>
        </div>
        ${exp.impact ? `<div style="font-size: 0.82rem; font-weight: 600; color: var(--emerald-400); margin-bottom: 0.5rem;"><i data-lucide="zap" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle;"></i> ${exp.impact}</div>` : ''}
        <ul class="timeline-points">
          ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');

  initLucideIcons();
}

function initEducation() {
  const container = document.getElementById('education-container');
  const certContainer = document.getElementById('certs-container');

  if (container) {
    container.innerHTML = PROFILE_DATA.education.map(edu => `
      <div class="glass-panel" style="padding: 1.5rem; margin-bottom: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
          <div>
            <h3 style="font-size: 1.1rem; color: var(--text-main);">${edu.degree}</h3>
            <div style="color: var(--emerald-400); font-weight: 600; font-size: 0.9rem;">${edu.institution}</div>
          </div>
          <span class="badge badge-indigo">${edu.period}</span>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-muted);">${edu.details}</p>
      </div>
    `).join('');
  }

  if (certContainer) {
    certContainer.innerHTML = PROFILE_DATA.certifications.map(cert => `
      <div class="glass-panel" style="padding: 1rem; display: flex; align-items: center; gap: 0.85rem;">
        <div style="width: 38px; height: 38px; border-radius: var(--radius-sm); background: rgba(16, 185, 129, 0.12); color: var(--emerald-400); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          <i data-lucide="${cert.icon}"></i>
        </div>
        <div>
          <div style="font-size: 0.88rem; font-weight: 600; color: var(--text-main);">${cert.name}</div>
          <div style="font-size: 0.75rem; color: var(--text-dim);">${cert.issuer} &bull; ${cert.level}</div>
        </div>
      </div>
    `).join('');
  }

  initLucideIcons();
}

// --------------------------------------------------------------------------
// Recruiter Matcher & Job Fit Evaluator
// --------------------------------------------------------------------------
function initMatcher() {
  const form = document.getElementById('matcher-form');
  const jdInput = document.getElementById('jd-input');
  const resultCard = document.getElementById('matcher-result-card');

  if (!form || !jdInput) return;

  const t = TRANSLATIONS[TwinState.currentLang] || TRANSLATIONS.id;
  const matcherTitle = document.querySelector('#view-matcher h2');
  const matcherSub = document.querySelector('#view-matcher p');
  if (matcherTitle) matcherTitle.innerText = t.matcher.heading;
  if (matcherSub) matcherSub.innerText = t.matcher.subheading;
  if (jdInput) jdInput.placeholder = t.matcher.jdPlaceholder;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const jdText = jdInput.value.trim().toLowerCase();
    if (!jdText) return;

    const keywords = [
      { key: 'python', weight: 15, name: 'Python Engineering' },
      { key: 'next.js', weight: 15, name: 'Next.js & Frontend' },
      { key: 'fastapi', weight: 15, name: 'FastAPI Microservices' },
      { key: 'machine learning', weight: 15, name: 'Machine Learning Pipelines' },
      { key: 'mlops', weight: 15, name: 'MLOps & Containerization' },
      { key: 'deepseek', weight: 10, name: 'LLM & DeepSeek Reasoning' },
      { key: 'monte carlo', weight: 10, name: 'Monte Carlo Stochastic Risk' },
      { key: 'n8n', weight: 10, name: 'n8n Workflow Automation' },
      { key: 'agriculture', weight: 10, name: 'Agritech & Precision Farming' },
      { key: 'japan', weight: 10, name: 'Japan 5S Standards & JLPT N3' },
      { key: 'marketing', weight: 10, name: 'Bayesian MMM & Growth Analytics' },
      { key: 'relocation', weight: 10, name: 'Open to Global Relocation' }
    ];

    let score = 35;
    let matched = [];

    keywords.forEach(kw => {
      if (jdText.includes(kw.key)) {
        score += kw.weight;
        matched.push(kw.name);
      }
    });

    score = Math.min(score, 98);

    const currT = TRANSLATIONS[TwinState.currentLang] || TRANSLATIONS.id;

    resultCard.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span style="font-weight: 700; color: var(--text-main);">${currT.matcher.scoreLabel}</span>
          <span class="badge ${score >= 75 ? 'badge' : 'badge-cyan'}" style="font-size: 0.95rem;">${score}% MATCH</span>
        </div>
        <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.08); border-radius: 4px; overflow: hidden;">
          <div style="width: ${score}%; height: 100%; background: linear-gradient(90deg, var(--emerald-400), var(--cyan-400));"></div>
        </div>
      </div>

      <div style="margin-bottom: 1rem;">
        <div style="font-size: 0.8rem; font-weight: 600; color: var(--emerald-400); margin-bottom: 0.4rem;">${currT.matcher.skillsFound}</div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
          ${matched.length > 0 ? matched.map(m => `<span class="badge" style="font-size: 0.72rem;"><i data-lucide="check"></i> ${m}</span>`).join('') : '<span style="font-size: 0.8rem; color: var(--text-muted);">Keahlian umum AI & MLOps berlaku.</span>'}
        </div>
      </div>

      <div style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.85rem; font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
        <strong>${currT.matcher.conclusionTitle}</strong> Andriyanto NA memiliki profil teknis yang sangat cocok untuk posisi ini dengan kombinasi keahlian <em>Full-Stack AI Engineering, MLOps, Riset Agronomi, dan Standar Manajemen 5S Jepang</em>.
      </div>
    `;

    initLucideIcons();
  });
}

// --------------------------------------------------------------------------
// Twin-CLI Terminal Console
// --------------------------------------------------------------------------
function initTwinCLI() {
  const cliInput = document.getElementById('cli-input');
  const outputEl = document.getElementById('cli-output');

  if (!cliInput || !outputEl) return;

  cliInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const raw = cliInput.value.trim();
      cliInput.value = '';
      if (!raw) return;

      const userLine = document.createElement('div');
      userLine.innerHTML = `<span class="term-prompt">andriyanto@twin:~$</span> ${escapeHTML(raw)}`;
      outputEl.appendChild(userLine);

      handleCLICommand(raw, outputEl);
    }
  });
}

function handleCLICommand(cmd, outputEl) {
  const parts = cmd.split(' ');
  const root = parts[0].toLowerCase();
  const arg = parts.slice(1).join(' ');

  let resultHTML = '';

  switch (root) {
    case 'help':
      const currT = TRANSLATIONS[TwinState.currentLang] || TRANSLATIONS.id;
      resultHTML = currT.cli.helpText;
      break;

    case 'bio':
    case 'whoami':
      resultHTML = `<strong>${PROFILE_DATA.name}</strong>\n${PROFILE_DATA.headline}\nLocation: ${PROFILE_DATA.location}\nRelocation: ${PROFILE_DATA.relocationStatus}`;
      break;

    case 'skills':
      resultHTML = `Top Skills: ${PROFILE_DATA.skills.top.join(', ')}`;
      break;

    case 'agrisensa':
      resultHTML = `<strong>${PROFILE_DATA.flagshipProject.name}</strong>\n* Main Portal: https://agrisensaofficial.com\n* AI Engine API: https://ai-engine-production-cc99.up.railway.app/docs\n* MLOps API: https://mlops-api-production-afaf.up.railway.app/docs\n* n8n Workflows: https://n8n-production-999a.up.railway.app (14 workflows)\n* Streamlit Hub: https://mirai39.streamlit.app/`;
      break;

    case 'projects':
      resultHTML = PROFILE_DATA.featuredProjects.map((p, i) => `[0${i+1}] ${p.title} (${p.period})\n    Stack: ${p.tech.join(', ')}\n    Highlights: ${p.highlights.join(' | ')}`).join('\n\n');
      break;

    case 'japan':
    case 'exp':
      resultHTML = `* Suzuki Flower Farm (Aichi, Japan, 2023-Present) - Floriculture & MAFF TG2 Passed\n* Yamasa no Niwa (Shizuoka, Japan, 2022-2023) - 5S & Data Landscape\n* PT Fujikikou (Shizuoka, Japan, 2009-2012) - 3-Year Technical Trainee\n* Certified JLPT N3 (Japanese Language Proficiency)`;
      break;

    case 'edu':
      resultHTML = PROFILE_DATA.education.map(ed => `* ${ed.degree} - ${ed.institution} (${ed.period})`).join('\n') + `\n* JLPT N3 (Japanese Language Proficiency Test Certified)`;
      break;

    case 'contact':
      resultHTML = `Email: ${PROFILE_DATA.contact.email}\nPhone: ${PROFILE_DATA.contact.mobile}\nGitHub: ${PROFILE_DATA.contact.github}\nLinkedIn: ${PROFILE_DATA.contact.linkedin}\nOfficial Site: https://agrisensaofficial.com`;
      break;

    case 'clear':
      outputEl.innerHTML = '';
      return;

    case 'ask':
      if (!arg) {
        resultHTML = `Error: Please provide a query. Example: ask explain AgriSensa architecture`;
      } else {
        const reply = generateSemanticTwinResponse(arg, TwinState.currentLang);
        resultHTML = `[Digital Twin]:\n${reply}`;
      }
      break;

    default:
      resultHTML = `Command not recognized: '${root}'. Type 'help' for available commands.`;
  }

  const resDiv = document.createElement('div');
  resDiv.style.color = '#cbd5e1';
  resDiv.style.marginBottom = '0.75rem';
  resDiv.innerHTML = resultHTML.replace(/\n/g, '<br>');
  outputEl.appendChild(resDiv);

  outputEl.scrollTop = outputEl.scrollHeight;
}

// --------------------------------------------------------------------------
// ElevenLabs High-Fidelity Neural Voice Synthesizer (TTS)
// --------------------------------------------------------------------------
let currentAudio = null;

async function speakText(text) {
  const cleanText = cleanMarkdownForTTS(text);
  if (!cleanText) return;

  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  const elevenApiKey = localStorage.getItem('elevenlabs_api_key') || 'sk_cfa49f35aa0a32013355722aef5ff5756f0168e899447c52';
  const voiceId = localStorage.getItem('elevenlabs_voice_id') || 'pNInz6obpgDQGcFmaJgB';

  updateAudioPlayingState(true);

  try {
    let audioUrl = null;

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText, voiceId: voiceId })
      });
      if (res.ok) {
        const blob = await res.blob();
        audioUrl = URL.createObjectURL(blob);
      }
    } catch (e) {
      // Local fallback
    }

    if (!audioUrl && elevenApiKey) {
      const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'xi-api-key': elevenApiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: cleanText.substring(0, 1000),
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        })
      });

      if (res.ok) {
        const blob = await res.blob();
        audioUrl = URL.createObjectURL(blob);
      }
    }

    if (audioUrl) {
      currentAudio = new Audio(audioUrl);
      currentAudio.onended = () => updateAudioPlayingState(false);
      currentAudio.onerror = () => {
        updateAudioPlayingState(false);
        fallbackWebSpeech(cleanText, TwinState.currentLang);
      };
      await currentAudio.play();
      return;
    }

    fallbackWebSpeech(cleanText, TwinState.currentLang);

  } catch (err) {
    console.warn("ElevenLabs TTS fallback triggered:", err);
    fallbackWebSpeech(cleanText, TwinState.currentLang);
  }
}

function fallbackWebSpeech(cleanText, lang = 'id') {
  if (!('speechSynthesis' in window)) {
    updateAudioPlayingState(false);
    return;
  }
  const utterance = new SpeechSynthesisUtterance(cleanText);
  if (lang === 'ja') {
    utterance.lang = 'ja-JP';
  } else if (lang === 'en') {
    utterance.lang = 'en-US';
  } else {
    utterance.lang = 'id-ID';
  }
  utterance.rate = 1.05;
  utterance.pitch = 1.0;

  utterance.onend = () => updateAudioPlayingState(false);
  utterance.onerror = () => updateAudioPlayingState(false);

  window.speechSynthesis.speak(utterance);
}

function updateAudioPlayingState(isPlaying) {
  const btn = document.getElementById('voice-toggle-btn');
  if (btn) {
    if (isPlaying) {
      btn.style.boxShadow = '0 0 15px rgba(6, 182, 212, 0.6)';
    } else {
      btn.style.boxShadow = '';
    }
  }
}

function cleanMarkdownForTTS(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/`{1,3}.*?`{1,3}/g, '')
    .replace(/[#\-_*•]/g, ' ')
    .trim();
}

// --------------------------------------------------------------------------
// Settings & Config
// --------------------------------------------------------------------------
function initSettings() {
  const radioSemantic = document.getElementById('engine-semantic');
  const radioGemini = document.getElementById('engine-gemini');
  const apiKeyInput = document.getElementById('gemini-key-input');
  const saveKeyBtn = document.getElementById('save-key-btn');

  if (TwinState.engineMode === 'gemini') {
    if (radioGemini) radioGemini.checked = true;
  } else {
    if (radioSemantic) radioSemantic.checked = true;
  }

  if (apiKeyInput && TwinState.apiKey) {
    apiKeyInput.value = TwinState.apiKey;
  }

  if (radioSemantic) {
    radioSemantic.addEventListener('change', () => {
      TwinState.engineMode = 'semantic';
      localStorage.setItem('engine_mode', 'semantic');
    });
  }

  if (radioGemini) {
    radioGemini.addEventListener('change', () => {
      TwinState.engineMode = 'gemini';
      localStorage.setItem('engine_mode', 'gemini');
    });
  }

  if (saveKeyBtn && apiKeyInput) {
    saveKeyBtn.addEventListener('click', () => {
      TwinState.apiKey = apiKeyInput.value.trim();
      localStorage.setItem('gemini_api_key', TwinState.apiKey);
      const msg = TwinState.currentLang === 'ja' ? 'Gemini APIキーがローカルに保存されました！' : (TwinState.currentLang === 'en' ? 'Gemini API Key saved locally!' : 'Gemini API Key tersimpan secara lokal!');
      alert(msg);
    });
  }
}

// --------------------------------------------------------------------------
// Contact Modal
// --------------------------------------------------------------------------
function initModal() {
  const modal = document.getElementById('contact-modal');
  const closeBtn = document.getElementById('close-modal-btn');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }
}

function openContactModal() {
  const modal = document.getElementById('contact-modal');
  if (modal) modal.classList.add('open');
}

function renderSimpleMarkdown(text) {
  let html = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" style="color: var(--cyan-400); text-decoration: underline;">$1</a>');

  const lines = html.split('\n');
  let inList = false;
  let out = [];

  for (let line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
      if (!inList) {
        out.push('<ul>');
        inList = true;
      }
      out.push(`<li>${trimmed.substring(2)}</li>`);
    } else {
      if (inList) {
        out.push('</ul>');
        inList = false;
      }
      if (trimmed) {
        out.push(`<p>${trimmed}</p>`);
      }
    }
  }
  if (inList) out.push('</ul>');

  return out.join('');
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
