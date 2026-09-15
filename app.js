/**
 * Andriyanto NA - Digital Twin Application Logic (v2.5)
 * Integrates:
 * 1. Semantic AI Persona Engine (Profile + Full CV Context)
 * 2. Featured Projects Showcase (AgriSensa, Bayesian MMM/CLV, Pymoo Forecasting, Mining Geospatial)
 * 3. Speech Synthesis (TTS Voice)
 * 4. Interactive AgriSensa Architecture & Skill Visualizer
 * 5. Career Timeline with Multi-Country Filters & Quantified Impacts
 * 6. Recruiter Job Fit Evaluator with Relocation/Visa context
 * 7. Interactive Twin-CLI Terminal
 */

// State Management
const TwinState = {
  activeTab: 'chat',
  voiceEnabled: false,
  apiKey: localStorage.getItem('gemini_api_key') || '',
  engineMode: localStorage.getItem('engine_mode') || 'semantic', // 'semantic' or 'gemini'
  chatHistory: [],
  terminalHistory: []
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initLucideIcons();
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
});

function initLucideIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
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

  // Handle URL hash if present
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(`view-${hash}`)) {
    switchView(hash);
  }
}

function switchView(viewName) {
  TwinState.activeTab = viewName;

  // Update tabs active class
  document.querySelectorAll('.tab-control-btn, .nav-btn').forEach(btn => {
    if (btn.dataset.view === viewName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Toggle sections
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
  const promptChips = document.querySelectorAll('.prompt-chip');
  const voiceToggle = document.getElementById('voice-toggle-btn');
  const clearChatBtn = document.getElementById('clear-chat-btn');

  // Initial welcome message
  if (TwinState.chatHistory.length === 0) {
    appendMessage('twin', `**Halo! Saya Digital Twin resmi dari Andriyanto NA.** 🤖🌱\n\nSaya merepresentasikan keahlian saya sebagai **Agricultural Data Scientist, AI & Agritech Engineer, serta Marketing Analytics Specialist** berbasis di **Aichi, Jepang** (*Open to Relocation & Visa Sponsorship*).\n\nSilakan tanyakan apa saja seputar:\n- Platform **AgriSensa** (1,000+ pengguna aktif, 99.5% uptime)\n- **Marketing Analytics Suite** (Bayesian MMM, Churn 85% akurasi, GA4, CLV)\n- **AI Forecasting (Prophet, ARIMA) & Multi-Objective Optimization (Pymoo)**\n- Pengalaman kerja di **Jepang**, sertifikasi **JLPT N3**, dan metodologi **5S**!`);
  }

  // Prompt chips
  promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const text = chip.innerText.trim();
      input.value = text;
      handleUserSubmit(text);
    });
  });

  // Form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    handleUserSubmit(text);
  });

  // Voice toggle
  if (voiceToggle) {
    voiceToggle.addEventListener('click', () => {
      TwinState.voiceEnabled = !TwinState.voiceEnabled;
      voiceToggle.classList.toggle('active', TwinState.voiceEnabled);
      if (TwinState.voiceEnabled) {
        speakText("Mode suara Digital Twin Andriyanto diaktifkan.");
      } else {
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      }
    });
  }

  // Clear chat
  if (clearChatBtn) {
    clearChatBtn.addEventListener('click', () => {
      messagesContainer.innerHTML = '';
      TwinState.chatHistory = [];
      appendMessage('twin', `Percakapan telah direset. Ada yang ingin Anda diskusikan dengan Digital Twin Andriyanto?`);
    });
  }
}

async function handleUserSubmit(userText) {
  appendMessage('user', userText);
  showTypingIndicator();

  try {
    let responseText = '';
    if (TwinState.engineMode === 'gemini' && TwinState.apiKey) {
      responseText = await queryGeminiAPI(userText);
    } else {
      await new Promise(r => setTimeout(r, 600));
      responseText = generateSemanticTwinResponse(userText);
    }

    hideTypingIndicator();
    appendMessage('twin', responseText);

    if (TwinState.voiceEnabled) {
      speakText(cleanMarkdownForTTS(responseText));
    }
  } catch (err) {
    hideTypingIndicator();
    appendMessage('twin', `*Maaf, terjadi kendala teknis:* ${err.message}. Mengalihkan ke Semantic Knowledge Engine.`);
    const fallbackResponse = generateSemanticTwinResponse(userText);
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
    const audioBtn = document.createElement('button');
    audioBtn.className = 'msg-audio-btn';
    audioBtn.innerHTML = '<i data-lucide="volume-2"></i> Dengarkan';
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
// Semantic Knowledge Grounding Engine (Enriched with Profile + CV)
// --------------------------------------------------------------------------
function generateSemanticTwinResponse(query) {
  const q = query.toLowerCase();

  // 1. AgriSensa Platform
  if (q.includes('agrisensa') || q.includes('platform agrikultur') || q.includes('pengguna') || q.includes('uptime')) {
    return `**AgriSensa Intelligence Platform (2024 - Present)** adalah sistem intelligence agrikultur yang saya pimpin pengembangannya (*Lead Developer*).\n\n**Metrik & Kinerja:**\n- **1,000+ Pengguna Aktif** (petani, kelompok tani, dan stakeholder agribisnis).\n- **99.5% Uptime SLA** dengan arsitektur microservices cloud yang tangguh.\n- **25+ Modul AI Produksi** mencakup deteksi penyakit tanaman (*Roboflow CV*), asisten agronomist multimodal (*Google Gemini LLM*), peramalan harga komoditas & panen (*Prophet, ARIMA, Bayesian*), serta analitik spasial (*GIS, Folium, BigQuery*).\n\nKunjungi langsung di [agrisensaofficial.com](https://agrisensaofficial.com)!`;
  }

  // 2. Marketing Analytics & Bayesian MMM / CLV / Churn
  if (q.includes('mmm') || q.includes('marketing') || q.includes('clv') || q.includes('churn') || q.includes('adstock') || q.includes('ga4') || q.includes('attribution') || q.includes('roi')) {
    return `Sebagai pelengkap keahlian data science, saya memiliki portofolio kuat di **Marketing Analytics & Growth Optimization**:\n\n1. **Marketing Mix Modeling (MMM) Suite (2024-2025)**:\n   - Membangun model **Bayesian MMM** dengan efek *Adstock & Saturation* untuk alokasi budget marketing yang optimal.\n   - Menerapkan **Multi-Touch Attribution (MTA)** dan integrasi **GA4 event tracking** & cohort retention.\n2. **Customer Analytics & Churn Prediction**:\n   - Mengembangkan model churn dengan akurasi **85%**.\n   - Membangun estimasi **Customer Lifetime Value (CLV)** untuk segmentasi pengguna bernilai tinggi.\n3. **Marketing Analytics Platform (2023-2024)**:\n   - Memberikan peningkatan **ROI 40%** melalui targeting berbasis ML dan memangkas waktu analisis laporan hingga **60%**.`;
  }

  // 3. AI Forecasting, Time Series & Pymoo Optimization
  if (q.includes('forecasting') || q.includes('pymoo') || q.includes('prophet') || q.includes('arima') || q.includes('time series') || q.includes('optimasi') || q.includes('optimization')) {
    return `Di bidang peramalan dan optimasi, saya membangun **AI Forecasting & Multi-Objective Optimization System (2024-2025)**:\n\n- **Time Series Modeling**: Menggunakan **Prophet, ARIMA, dan TensorFlow** untuk peramalan harga komoditas pangan, peramalan panen, dan analisis tren permintaan pasar.\n- **Multi-Objective Optimization**: Menggunakan framework **Pymoo** untuk menyelesaikan masalah optimasi multi-kriteria (misal: memaksimalkan hasil sembari meminimalkan biaya input).\n- **Real-Time Retraining Pipeline**: Sistem dilengkapi pipeline retraining otomatis berbasis event & scheduled trigger melalui REST API FastAPI dan Docker.`;
  }

  // 4. Resource Optimization & Geospatial (Mining / Agri)
  if (q.includes('geospatial') || q.includes('gis') || q.includes('folium') || q.includes('mining') || q.includes('resource') || q.includes('tambang')) {
    return `Saya mengembangkan **Resource Optimization & Geospatial Platform (2024-2025)** menggunakan **GIS, Folium, Plotly, dan PostgreSQL**:\n\n- Membangun modul optimasi dan predictive maintenance operasional.\n- Mengembangkan dashboard monitoring geospasial interaktif yang berhasil **meningkatkan efisiensi operasional sebesar 30%**.`;
  }

  // 5. Relocation / Visa Sponsorship / Hiring / Open to Work
  if (q.includes('relocation') || q.includes('visa') || q.includes('pindah') || q.includes('sponsor') || q.includes('lowongan') || q.includes('hire') || q.includes('remote') || q.includes('rekrut') || q.includes('gaji')) {
    return `**Ketersediaan Kerja & Status Relokasi:**\n\n- **Status**: Terbuka untuk peluang kerja (*Open to Work*) sebagai **AI Engineer**, **Agricultural Data Scientist**, **Agritech Engineer**, atau **Marketing Analytics Specialist**.\n- **Relokasi & Visa**: **Open to Relocation & Visa Sponsorship** untuk posisi di Jepang, kawasan APAC, maupun global (Remote, Hybrid, atau On-site).\n- **Domisili Saat Ini**: Tahara-shi, Prefektur Aichi, Jepang (Zona Waktu UTC+9).\n- **Kemampuan Bahasa**: Indonesia (Native), Inggris (Professional Working), Jepang (**JLPT N3 Certified**).\n\nSilakan hubungi saya via email **yandri918@gmail.com**, WhatsApp/Mobile **+81-80-7698-8509**, atau [LinkedIn](https://linkedin.com/in/andriyanto).`;
  }

  // 6. Pengalaman di Jepang / 5S / Yamasa / Fujikikou / JLPT N3
  if (q.includes('jepang') || q.includes('japan') || q.includes('5s') || q.includes('jlpt') || q.includes('n3') || q.includes('yamasa') || q.includes('fujikikou') || q.includes('shizuoka') || q.includes('aichi')) {
    return `Saya memiliki latar belakang mendalam dengan standar kerja dan budaya profesional **Jepang**:\n\n- **Sertifikasi Bahasa**: Pemegang sertifikat resmi **JLPT N3 (Japanese Language Proficiency Test)**.\n- **Yamasa no Niwa / Yamasa Japan (Shizuoka, 2022-2023)**: Menerapkan pendekatan data-driven dan metodologi **5S Jepang** untuk mengoptimalkan operasional dan konsistensi kualitas tanaman.\n- **PT Fujikikou (Shizuoka, 2009-2012)**: Menjalani *3-Year Intensive Technical Training* di bidang manufaktur industri & pemeliharaan mesin, menanamkan kedisiplinan dan standarisasi kualitas ala Jepang.`;
  }

  // 7. Pengalaman Kerja di Indonesia (Tokopedia Mitra, GrabKios, 8villages, Kodim)
  if (q.includes('tokopedia') || q.includes('grabkios') || q.includes('kudo') || q.includes('8villages') || q.includes('kodim') || q.includes('karir') || q.includes('pengalaman')) {
    return `**Ringkasan Pengalaman Kerja Profesional:**\n\n1. **Tokopedia Mitra — PT Impact Power Mandiri (2021-2022)**: Supervisor & Customer Analytics. Mencapai 100% target proyek lebih awal dan meminimalisir kesalahan operasional melalui standarisasi SOP.\n2. **GrabKios Indonesia (2018-2020)**: Digital Services & Customer Analytics. Menganalisis behavioral data transaksi merchant & meningkatkan retensi agen.\n3. **PT 8Villages Indonesia (2017-2018)**: Program Coordinator. Mengelola proyek cabai 2 hektar dan pelatihan adopsi teknologi digital untuk petani.\n4. **Kodim Pesisir Selatan (2015-Present)**: Certified Agriculture Instructor & Supervisor Pertanian Organik.\n5. **Yamasa no Niwa Japan (2022-2023)** & **Fujikikou Japan (2009-2012)**: Operasional 5S & Manufaktur.`;
  }

  // 8. Pendidikan & Sertifikasi
  if (q.includes('pendidikan') || q.includes('kuliah') || q.includes('universitas') || q.includes('utel') || q.includes('ut') || q.includes('sertifikat') || q.includes('education')) {
    return `**Latar Belakang Akademik & Sertifikasi:**\n\n**Pendidikan:**\n- **UTEL University, Mexico**: *Bachelor of Science in Computer Engineering* (Lulus April 2026).\n- **Universitas Terbuka Indonesia**: *Bachelor of Economics (S.E.)*, Ekonomi Pembangunan (In Progress, Expected 2027).\n\n**Sertifikasi Utama:**\n- **JLPT N3** (Japanese Language Proficiency Test)\n- **Technical Training Certification - Japan (3 Years)**\n- **Organic Agriculture Instructor Certification**\n- **Voxy English Proficiency Certificate** (Intermediate)\n- **Sertifikasi Pemrograman PHP, MySQL Database, JavaScript & jQuery**`;
  }

  // 9. Summary & Who are you
  if (q.includes('siapa') || q.includes('who are you') || q.includes('tentang dirimu') || q.includes('profil') || q.includes('bio') || q.includes('perkenalkan')) {
    return `Saya **${PROFILE_DATA.name}**, seorang **Agricultural Data Scientist, AI & Agritech Engineer, serta Marketing Analytics Specialist** yang berbasis di **Aichi, Jepang**.\n\nSaya menggabungkan keahlian mendalam di bidang **Applied Machine Learning (Prophet, ARIMA, PyTorch, Pymoo)**, **LLM & Computer Vision (Gemini, Roboflow)**, dan **Geospatial Intelligence (BigQuery, GIS)** dengan pengalaman 11+ tahun di domain agrikultur dan disiplin operasional 5S Jepang.\n\nSebagai Lead Developer **AgriSensa**, platform yang saya bangun telah melayani 1,000+ pengguna dengan SLA uptime 99.5%.`;
  }

  // Default fallback
  return `Terima kasih atas pertanyaannya! Berdasarkan profil dan CV saya, saya adalah **Agricultural Data Scientist & AI/Agritech Engineer**.\n\nAnda dapat menanyakan hal-hal spesifik seperti:\n- Metrik platform **AgriSensa** (1,000+ users, 99.5% uptime)\n- Implementasi **Bayesian MMM, Churn Prediction (85%), & CLV**\n- Sistem peramalan **Prophet/ARIMA** dan optimasi multi-objektif **Pymoo**\n- Pengalaman kerja di **Jepang**, sertifikasi **JLPT N3**, atau status relokasi & visa.`;
}

// --------------------------------------------------------------------------
// Optional Live Gemini API Query
// --------------------------------------------------------------------------
async function queryGeminiAPI(prompt) {
  const apiKey = TwinState.apiKey;
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const systemInstruction = `You are the official Digital Twin AI of Andriyanto NA. Speak in first person ("Saya / I") with a professional, sharp, and data-driven demeanor. Always base knowledge strictly on Andriyanto's profile and CV:
- Roles: Agricultural Data Scientist | AI & Agritech Engineer | Marketing Analytics Specialist.
- Location: Aichi, Japan | Open to Relocation & Visa Sponsorship (Global / APAC / Japan).
- Languages: Indonesian (Native), English (Professional Working), Japanese (JLPT N3 Certified).
- Flagship Platform: AgriSensa (1,000+ active users, 99.5% uptime, 25+ modules, Gemini LLM, Roboflow CV, Prophet/ARIMA forecasting, GIS/BigQuery).
- Marketing Analytics: Bayesian MMM (Adstock & Saturation), GA4 tracking, Multi-Touch Attribution, Churn Prediction (85% accuracy), CLV, 40% ROI boost.
- AI Forecasting & Opt: Time Series (Prophet, ARIMA), Multi-Objective Optimization (Pymoo), Real-time Retraining.
- Geospatial: GIS, Folium, PostgreSQL (30% mining operational efficiency improvement).
- Work History: Kodim (11 yrs agri instructor), Yamasa no Niwa (5S ops in Japan), Tokopedia Mitra (customer analytics supervisor), GrabKios (behavioral data), 8Villages (chili project), Fujikikou (3-yr technical trainee in Japan).
- Education: UTEL University (B.S. Computer Engineering 2026), Universitas Terbuka (B.Econ 2027).
- Contact: yandri918@gmail.com, +81-80-7698-8509, github.com/yandri918, linkedin.com/in/andriyanto.`;

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

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `HTTP ${res.status}`);
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, respon tidak dapat dihasilkan.";
}

// --------------------------------------------------------------------------
// Featured Projects Showcase Renderer
// --------------------------------------------------------------------------
function initFeaturedProjects() {
  const container = document.getElementById('projects-grid-container');
  if (!container) return;

  container.innerHTML = PROFILE_DATA.featuredProjects.map((proj, idx) => `
    <div class="glass-panel" style="padding: 1.6rem; display: flex; flex-direction: column; justify-content: space-between; border-color: rgba(255,255,255,0.09);">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.6rem;">
          <span class="badge ${idx === 0 ? 'badge' : (idx === 1 ? 'badge-cyan' : 'badge-indigo')}">
            <i data-lucide="${idx === 0 ? 'award' : (idx === 1 ? 'trending-up' : 'cpu')}"></i> ${proj.period}
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
          <div style="font-size: 0.72rem; font-weight: 700; color: var(--emerald-400); text-transform: uppercase; margin-bottom: 0.35rem;">Key Achievements:</div>
          <ul style="font-size: 0.78rem; color: var(--text-muted); margin-left: 1.1rem;">
            ${proj.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
        </div>
        
        <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 1rem;">
          ${proj.tech.map(t => `<span class="skill-chip" style="font-size: 0.72rem; padding: 0.25rem 0.55rem;">${t}</span>`).join('')}
        </div>

        <button class="btn-pill btn-secondary" style="width: 100%; justify-content: center; font-size: 0.78rem;" onclick="discussProject('${proj.title}')">
          <i data-lucide="message-circle"></i> Diskusikan Proyek Ini
        </button>
      </div>
    </div>
  `).join('');

  initLucideIcons();
}

function discussProject(projectTitle) {
  switchView('chat');
  setTimeout(() => {
    handleUserSubmit(`Ceritakan lebih detail mengenai arsitektur dan dampak dari proyek '${projectTitle}'.`);
  }, 200);
}

// --------------------------------------------------------------------------
// AgriSensa Blueprint Renderer
// --------------------------------------------------------------------------
function initAgriSensaView() {
  const container = document.getElementById('agrisensa-layers-container');
  if (!container) return;

  container.innerHTML = PROFILE_DATA.flagshipProject.architecture.map((layer, idx) => `
    <div class="glass-panel arch-layer-card" onclick="inspectArchLayer(${idx})">
      <span class="layer-step-num">0${idx + 1}</span>
      <div class="arch-icon">
        <i data-lucide="${getLayerIcon(idx)}"></i>
      </div>
      <h3 class="arch-layer-title">${layer.layer}</h3>
      <div class="arch-layer-tech">${layer.tech}</div>
      <p class="arch-layer-desc">${layer.desc}</p>
    </div>
  `).join('');

  initLucideIcons();
}

function getLayerIcon(idx) {
  const icons = ['sparkles', 'eye', 'trending-up', 'map-pin', 'server'];
  return icons[idx] || 'layers';
}

function inspectArchLayer(idx) {
  const layer = PROFILE_DATA.flagshipProject.architecture[idx];
  switchView('chat');
  setTimeout(() => {
    handleUserSubmit(`Jelaskan lebih mendalam tentang komponen ${layer.layer} (${layer.tech}) pada AgriSensa AI.`);
  }, 200);
}

function initSkillMatrix() {
  const container = document.getElementById('skills-matrix-container');
  if (!container) return;

  container.innerHTML = PROFILE_DATA.skills.categories.map(cat => `
    <div class="glass-panel skill-category-card">
      <div class="skill-category-header">
        <i data-lucide="${cat.icon}" style="color: var(--emerald-400); width: 22px; height: 22px;"></i>
        <h3 style="font-size: 1.05rem;">${cat.title}</h3>
      </div>
      <div class="skill-chips-wrap">
        ${cat.items.map(item => `
          <span class="skill-chip" onclick="askAboutSkill('${item}')">
            ${item}
          </span>
        `).join('')}
      </div>
    </div>
  `).join('');

  initLucideIcons();
}

function askAboutSkill(skillName) {
  switchView('chat');
  setTimeout(() => {
    handleUserSubmit(`Bagaimana pengalaman dan keahlianmu dalam menggunakan ${skillName}?`);
  }, 200);
}

function initTimeline() {
  const container = document.getElementById('timeline-container');
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!container) return;

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
        ${exp.impact ? `<div style="font-size: 0.82rem; font-weight: 600; color: var(--emerald-400); margin-bottom: 0.5rem;"><i data-lucide="zap" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle;"></i> Impact: ${exp.impact}</div>` : ''}
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

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const jdText = jdInput.value.trim().toLowerCase();
    if (!jdText) return;

    const keywords = [
      { key: 'python', weight: 15 },
      { key: 'data scientist', weight: 15 },
      { key: 'agritech', weight: 15 },
      { key: 'machine learning', weight: 15 },
      { key: 'time series', weight: 15 },
      { key: 'prophet', weight: 10 },
      { key: 'arima', weight: 10 },
      { key: 'pymoo', weight: 10 },
      { key: 'optimization', weight: 10 },
      { key: 'marketing analytics', weight: 15 },
      { key: 'mmm', weight: 10 },
      { key: 'clv', weight: 10 },
      { key: 'churn', weight: 10 },
      { key: 'bigquery', weight: 10 },
      { key: 'gis', weight: 10 },
      { key: 'folium', weight: 10 },
      { key: 'llm', weight: 10 },
      { key: 'gemini', weight: 10 },
      { key: 'docker', weight: 10 },
      { key: 'japan', weight: 10 },
      { key: 'jlpt', weight: 10 },
      { key: '5s', weight: 10 }
    ];

    let score = 60;
    let matchedTerms = [];

    keywords.forEach(item => {
      if (jdText.includes(item.key)) {
        score += Math.min(item.weight, 8);
        matchedTerms.push(item.key);
      }
    });

    score = Math.min(Math.max(score, 70), 99);

    if (resultCard) {
      resultCard.innerHTML = `
        <div class="score-circle-wrap">
          <div class="stat-lbl">Estimated Compatibility</div>
          <div class="score-number">${score}%</div>
          <div class="badge ${score > 85 ? 'badge' : 'badge-cyan'}">
            ${score > 85 ? '🌟 Prime Match / High Compatibility' : '✅ Strong Candidate Fit'}
          </div>
        </div>
        <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); margin-bottom: 1rem;">
          <div style="font-size: 0.85rem; font-weight: 700; color: var(--emerald-400); margin-bottom: 0.4rem;">
            Candidate Value Highlights:
          </div>
          <ul style="font-size: 0.82rem; color: var(--text-muted); margin-left: 1.25rem;">
            <li>Lead Developer of <strong>AgriSensa (1,000+ users, 99.5% uptime)</strong>.</li>
            <li>Versatile in <strong>Applied ML, Bayesian MMM, Churn (85%), and Pymoo Optimization</strong>.</li>
            <li><strong>Open to Relocation & Visa Sponsorship</strong> (JLPT N3 Certified & 5S Standard).</li>
            ${matchedTerms.length > 0 ? `<li>Matched keywords in role: <code>${matchedTerms.slice(0, 6).join(', ')}</code></li>` : ''}
          </ul>
        </div>
        <button class="btn-pill btn-primary" onclick="openContactModal()" style="width: 100%; justify-content: center;">
          <i data-lucide="mail"></i> Hubungi Andriyanto Sekarang
        </button>
      `;
      initLucideIcons();
    }
  });
}

// --------------------------------------------------------------------------
// Twin-CLI Terminal Emulator
// --------------------------------------------------------------------------
function initTwinCLI() {
  const terminalInput = document.getElementById('cli-input');
  const terminalOutput = document.getElementById('cli-output');

  if (!terminalInput || !terminalOutput) return;

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawCmd = terminalInput.value.trim();
      terminalInput.value = '';
      if (!rawCmd) return;

      executeCliCommand(rawCmd, terminalOutput);
    }
  });
}

function executeCliCommand(cmd, outputEl) {
  const lineDiv = document.createElement('div');
  lineDiv.innerHTML = `<span class="term-prompt">andriyanto@twin:~$</span> ${escapeHTML(cmd)}`;
  outputEl.appendChild(lineDiv);

  const parts = cmd.split(' ');
  const root = parts[0].toLowerCase();
  const arg = parts.slice(1).join(' ');

  let resultHTML = '';

  switch (root) {
    case 'help':
      resultHTML = `
Available Commands:
  whoami         - Executive summary of Andriyanto NA
  skills         - List full stack, ML, and Marketing Analytics competencies
  projects       - List 5 featured production systems
  agrisensa      - Deep-dive into AgriSensa Intelligence Platform
  exp            - Career journey, quantified impacts & work history
  edu            - University degrees and certifications (JLPT N3)
  contact        - Direct contact info, GitHub, LinkedIn, and portfolios
  ask &lt;query&gt;    - Send query directly to Digital Twin AI
  clear          - Clear terminal window
      `;
      break;

    case 'whoami':
      resultHTML = `<strong>${PROFILE_DATA.name}</strong>\n${PROFILE_DATA.headline}\nLocation: ${PROFILE_DATA.location}\nRelocation: ${PROFILE_DATA.relocationStatus}`;
      break;

    case 'skills':
      resultHTML = `Top Skills: ${PROFILE_DATA.skills.top.join(', ')}`;
      break;

    case 'projects':
      resultHTML = PROFILE_DATA.featuredProjects.map((p, i) => `[0${i+1}] ${p.title} (${p.period})\n    Stack: ${p.tech.join(', ')}\n    Highlights: ${p.highlights.join(' | ')}`).join('\n\n');
      break;

    case 'agrisensa':
      resultHTML = `<strong>${PROFILE_DATA.flagshipProject.name}</strong>\nStats: ${PROFILE_DATA.flagshipProject.stats.users} | ${PROFILE_DATA.flagshipProject.stats.uptime}\nOverview: ${PROFILE_DATA.flagshipProject.overview}`;
      break;

    case 'exp':
      resultHTML = PROFILE_DATA.experience.map(e => `[${e.period}] ${e.role} @ ${e.company}\n    Location: ${e.location}\n    Impact: ${e.impact || 'Delivered operational excellence'}`).join('\n\n');
      break;

    case 'edu':
      resultHTML = PROFILE_DATA.education.map(ed => `* ${ed.degree} - ${ed.institution} (${ed.period})`).join('\n') + `\n* JLPT N3 (Japanese Language Proficiency Test Certified)`;
      break;

    case 'contact':
      resultHTML = `Email: ${PROFILE_DATA.contact.email}\nPhone: ${PROFILE_DATA.contact.mobile}\nGitHub: ${PROFILE_DATA.contact.github}\nLinkedIn: ${PROFILE_DATA.contact.linkedin}\nPortfolio: https://agrisensaofficial.com`;
      break;

    case 'clear':
      outputEl.innerHTML = '';
      return;

    case 'ask':
      if (!arg) {
        resultHTML = `Error: Please provide a query. Example: ask ceritakan tentang Bayesian MMM`;
      } else {
        const reply = generateSemanticTwinResponse(arg);
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
      alert('Gemini API Key tersimpan secara lokal!');
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

// --------------------------------------------------------------------------
// ElevenLabs High-Fidelity Neural Voice Synthesizer (TTS)
// --------------------------------------------------------------------------
let currentAudio = null;

async function speakText(text) {
  const cleanText = cleanMarkdownForTTS(text);
  if (!cleanText) return;

  // Stop any currently playing audio
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  const elevenApiKey = localStorage.getItem('elevenlabs_api_key') || 'sk_cfa49f35aa0a32013355722aef5ff5756f0168e899447c52';
  const voiceId = localStorage.getItem('elevenlabs_voice_id') || 'pNInz6obpgDQGcFmaJgB'; // Adam / Professional Male

  // Show audio playing badge if present
  updateAudioPlayingState(true);

  try {
    // 1. Try Vercel Serverless Endpoint first if on web server
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
      // Serverless not reachable (e.g. static local preview)
    }

    // 2. If serverless not available, call ElevenLabs direct API
    if (!audioUrl && elevenApiKey) {
      const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'xi-api-key': elevenApiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: cleanText.substring(0, 1000), // optimized chunk
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

    // 3. Play ElevenLabs Audio
    if (audioUrl) {
      currentAudio = new Audio(audioUrl);
      currentAudio.onended = () => updateAudioPlayingState(false);
      currentAudio.onerror = () => {
        updateAudioPlayingState(false);
        fallbackWebSpeech(cleanText);
      };
      await currentAudio.play();
      return;
    }

    // 4. Fallback to Web Speech API
    fallbackWebSpeech(cleanText);

  } catch (err) {
    console.warn("ElevenLabs TTS fallback triggered:", err);
    fallbackWebSpeech(cleanText);
  }
}

function fallbackWebSpeech(cleanText) {
  if (!('speechSynthesis' in window)) {
    updateAudioPlayingState(false);
    return;
  }
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'id-ID';
  utterance.rate = 1.05;
  utterance.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const idVoice = voices.find(v => v.lang.includes('id') || v.lang.includes('ID'));
  if (idVoice) utterance.voice = idVoice;

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
