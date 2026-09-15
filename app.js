/**
 * Andriyanto NA - Digital Twin Application Logic (v2.5)
 * Integrates:
 * 1. Semantic AI Persona Engine (Profile + CV + AgriSensa v2.5 Ecosystem)
 * 2. ElevenLabs High-Fidelity Neural Voice Synthesizer
 * 3. Featured Projects Showcase (Enterprise AgriSensa, Streamlit Hub, Bayesian MMM/CLV, Pymoo, Geospatial)
 * 4. Interactive AgriSensa Architecture & Live Railway Cloud Endpoints
 * 5. Career Timeline with Multi-Country Filters & Quantified Impacts
 * 6. Recruiter Job Fit Evaluator with Relocation/Visa context
 * 7. Interactive Twin-CLI Terminal
 */

// State Management
const TwinState = {
  activeTab: 'chat',
  voiceEnabled: false,
  apiKey: localStorage.getItem('gemini_api_key') || '',
  engineMode: localStorage.getItem('engine_mode') || 'semantic',
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
  const promptChips = document.querySelectorAll('.prompt-chip');
  const voiceToggle = document.getElementById('voice-toggle-btn');
  const clearChatBtn = document.getElementById('clear-chat-btn');

  if (TwinState.chatHistory.length === 0) {
    appendMessage('twin', `**Halo! Saya Digital Twin resmi dari Andriyanto NA.** 🤖🌾\n\nSaya merepresentasikan keahlian saya sebagai **AI & MLOps Engineer, Agricultural Data Scientist, dan Creator platform AgriSensa AI**.\n\n**Info Ekosistem Utama:**\n- 🌐 **[agrisensaofficial.com](https://agrisensaofficial.com)**: Platform Enterprise berbayar saya (*Next.js 16 + Railway Cloud FastAPI + n8n 14 workflows + DeepSeek-V3 Reasoning + Monte Carlo 10.000 Runs*).\n- 📱 **[mirai39.streamlit.app](https://mirai39.streamlit.app/)**: Hub interaktif data-centric berbasis Streamlit.\n- 🎙️ Didukung **ElevenLabs AI Neural Voice** untuk interaksi audio alami!\n\nSilakan tanyakan detail arsitektur, API Railway Cloud, keahlian Machine Learning/MLOps, atau peluang kolaborasi & relokasi kerja!`);
  }

  promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const text = chip.innerText.trim();
      input.value = text;
      handleUserSubmit(text);
    });
  });

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
        speakText("Mode suara ElevenLabs Digital Twin diaktifkan.");
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
      appendMessage('twin', `Percakapan telah direset. Ada yang ingin Anda tanyakan seputar portofolio dan sistem AI saya?`);
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
    appendMessage('twin', `*Catatan:* Terjadi penyesuaian koneksi (${err.message}). Menjawab dengan Semantic Knowledge Engine.`);
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
    audioBtn.innerHTML = '<i data-lucide="volume-2"></i> Dengarkan (ElevenLabs)';
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
// Semantic Knowledge Grounding Engine (AgriSensa v2.5 Ecosystem)
// --------------------------------------------------------------------------
function generateSemanticTwinResponse(query) {
  const q = query.toLowerCase();

  // 1. AgriSensa Ecosystem & agrisensaofficial.com vs mirai39.streamlit.app
  if (q.includes('agrisensa') || q.includes('agrisensaofficial') || q.includes('mirai39') || q.includes('streamlit') || q.includes('railway') || q.includes('deepseek') || q.includes('n8n')) {
    return `**AgriSensa AI — Unified Smart Agriculture & MLOps Ecosystem (v2.5):**\n\nSaya membagi platform AgriSensa ke dalam dua pilar utama:\n\n1. **🌐 Enterprise Production Platform ([agrisensaofficial.com](https://agrisensaofficial.com))**:\n   - **Frontend**: Dibangun dengan **Next.js 16 + Tailwind CSS** di-deploy di Vercel Edge dengan UI mobile-first.\n   - **AI Reasoning & MCP Engine**: Microservice FastAPI di **Railway Cloud** ([Docs API](https://ai-engine-production-cc99.up.railway.app/docs)), ditenagai model **DeepSeek-V3** dengan basis data riset ilmiah ber-DOI (IPB, BRIN, FAO, Elsevier).\n   - **MLOps Inference API**: Microservice FastAPI di **Railway Cloud** ([Docs API](https://mlops-api-production-afaf.up.railway.app/docs)) untuk inferensi radar tanah dan SHAP explainability.\n   - **Orkestrator n8n**: **14 automated workflows** di Railway Cloud ([n8n instance](https://n8n-production-999a.up.railway.app)).\n   - **Simulasi Stokastik Monte Carlo**: Engine simulasi **10.000 iterasi** untuk mitigasi risiko cuaca, fluktuasi harga, dan 95% Value at Risk (VaR).\n   - **Laboratorium Pupuk & HET**: Skema subsidi HET Permentan RI dan formulasi C/N pupuk organik.\n\n2. **📱 Streamlit Platform Hub ([mirai39.streamlit.app](https://mirai39.streamlit.app/))**:\n   - Hub interaktif data-centric untuk visualisasi cepat, peramalan time series, dan pemetaan geospasial Folium/GIS yang telah melayani **1,000+ pengguna aktif** dengan **99.5% uptime**.`;
  }

  // 2. Monte Carlo Simulation & ESG Carbon
  if (q.includes('monte carlo') || q.includes('karbon') || q.includes('esg') || q.includes('risiko') || q.includes('var')) {
    return `Di dalam **AgriSensa AI (v2.5)**, saya mengimplementasikan dua modul analitik tingkat lanjut:\n\n1. **📈 Monte Carlo Risk Engine (`/monte-carlo`)**:\n   - Menjalankan **10.000 iterasi stokastik** menggunakan distribusi normal Box-Muller.\n   - Mensimulasikan volatilitas cuaca ekstrem, risiko kegagalan panen, dan fluktuasi harga pasar untuk menghasilkan ekspektasi laba bersih, probabilitas profitabilitas (%), estimasi ROI, dan **Value at Risk (VaR 95%)**.\n\n2. **📊 Model Jejak Karbon ESG (`/analyst`)**:\n   - Menghitung emisi gas rumah kaca **Scope 1-3 (N2O dan CO2e)** dari alokasi pemupukan kimia vs organik untuk mendukung sertifikasi pertanian berkelanjutan.`;
  }

  // 3. Marketing Analytics (MMM, CLV, Churn)
  if (q.includes('mmm') || q.includes('marketing') || q.includes('clv') || q.includes('churn') || q.includes('adstock') || q.includes('ga4')) {
    return `Sebagai pelengkap data science, saya memiliki portofolio **Marketing Analytics & Growth Optimization**:\n\n- **Bayesian MMM**: Menggunakan efek *Adstock & Saturation* untuk alokasi anggaran iklan optimal.\n- **Customer Analytics**: Prediksi churn dengan akurasi **85%** dan pemodelan Customer Lifetime Value (CLV).\n- **Hasil Nyata**: Memberikan peningkatan **ROI 40%** dan memangkas waktu pembuatan laporan hingga **60%**.`;
  }

  // 4. AI Forecasting, Time Series & Pymoo Optimization
  if (q.includes('forecasting') || q.includes('pymoo') || q.includes('prophet') || q.includes('arima') || q.includes('time series') || q.includes('optimasi')) {
    return `Di bidang peramalan dan optimasi, saya membangun **AI Forecasting & Multi-Objective Optimization System**:\n\n- **Time Series**: Prophet, ARIMA, dan TensorFlow untuk peramalan harga komoditas dan panen.\n- **Multi-Objective Optimization (Pymoo)**: Menemukan solusi Pareto optimal antara maksimasi output produksi dan minimasi biaya input.\n- **Real-Time Retraining**: Pipeline retraining otomatis yang di-trigger via event REST API.`;
  }

  // 5. Relocation / Visa Sponsorship / Hiring
  if (q.includes('relocation') || q.includes('visa') || q.includes('pindah') || q.includes('sponsor') || q.includes('lowongan') || q.includes('hire') || q.includes('remote') || q.includes('rekrut')) {
    return `**Ketersediaan Karir & Status Relokasi:**\n\n- **Status**: Terbuka (*Open to Work*) untuk posisi **AI Engineer**, **MLOps Engineer**, **Agricultural Data Scientist**, atau **Full-Stack AI Developer**.\n- **Relokasi & Visa**: **Open to Relocation & Visa Sponsorship** (Jepang, APAC, Global / Remote).\n- **Domisili**: Aichi, Jepang (UTC+9).\n- **Bahasa**: Indonesia (Native), Inggris (Professional Working), Jepang (**JLPT N3 Certified**).\n- **Kontak**: **yandri918@gmail.com** | **+81-80-7698-8509** | [LinkedIn](https://linkedin.com/in/andriyanto).`;
  }

  // 6. Pengalaman di Jepang / Suzuki Flower Farm / TG2 / 5S / Yamasa / Fujikikou / JLPT N3
  if (q.includes('jepang') || q.includes('japan') || q.includes('suzuki') || q.includes('flower') || q.includes('tg2') || q.includes('tokutei') || q.includes('5s') || q.includes('jlpt') || q.includes('n3') || q.includes('yamasa') || q.includes('fujikikou')) {
    return `Saya memiliki pengalaman kerja dan kualifikasi keahlian tingkat lanjut yang kuat di **Jepang**:\n\n1. **🌸 Suzuki Flower Farm (鈴木フラワーファーム) — Tahara, Aichi (Juni 2023 - Saat ini & Masih Berlanjut)**:\n   - Bertugas sebagai *Agricultural Operations Specialist (Floriculture)* mengelola manajemen operasional budidaya bunga presisi, otomasi greenhouse, dan irigasi terukur.\n   - **Kualifikasi Tingkat Lanjut**: Telah **lulus ujian Tokutei Ginou 2 (TG2 / Specified Skilled Worker II)** bidang pertanian Jepang, membuktikan keahlian manajerial dan teknis pertanian tingkat tinggi serta berhak atas status kerja profesional jangka panjang di Jepang.\n\n2. **🌿 Yamasa no Niwa / Yamasa Japan — Shizuoka (2022 - 2023)**:\n   - Menerapkan metodologi **5S Jepang** dan pendekatan data-driven untuk optimalisasi operasional lanskap & konsistensi kualitas tanaman.\n\n3. **🏭 PT Fujikikou — Shizuoka (2009 - 2012)**:\n   - Menjalani *3-Year Technical Training* di bidang manufaktur industri, pemeliharaan mesin, dan standarisasi disiplin kerja Jepang.\n\n4. **📜 Sertifikasi Bahasa**: Pemegang sertifikat resmi **JLPT N3 (Japanese Language Proficiency Test)**.`;
  }

  // 7. Pengalaman Kerja di Indonesia
  if (q.includes('tokopedia') || q.includes('grabkios') || q.includes('kudo') || q.includes('8villages') || q.includes('kodim') || q.includes('karir') || q.includes('pengalaman')) {
    return `**Ringkasan Pengalaman Kerja Profesional:**\n\n1. **Tokopedia Mitra — PT Impact Power Mandiri (2021-2022)**: Supervisor & Customer Analytics. Mencapai 100% target proyek lebih awal dan standarisasi SOP merchant.\n2. **GrabKios Indonesia (2018-2020)**: Digital Services & Customer Analytics. Menganalisis behavioral data transaksi merchant & meningkatkan retensi agen.\n3. **PT 8Villages Indonesia (2017-2018)**: Program Coordinator. Mengelola proyek cabai 2 hektar dan pelatihan teknologi digital untuk petani.\n4. **Kodim Pesisir Selatan (2015-Present)**: Certified Agriculture Instructor & Supervisor Pertanian Organik (11 tahun).\n5. **Yamasa no Niwa Japan (2022-2023)** & **Fujikikou Japan (2009-2012)**: Operasional 5S & Manufaktur.`;
  }

  // 8. Pendidikan & Sertifikasi
  if (q.includes('pendidikan') || q.includes('kuliah') || q.includes('universitas') || q.includes('utel') || q.includes('ut') || q.includes('sertifikat')) {
    return `**Latar Belakang Akademik & Sertifikasi:**\n\n- **UTEL University, Mexico**: *Bachelor of Science in Computer Engineering* (Lulus April 2026).\n- **Universitas Terbuka Indonesia**: *Bachelor of Economics (S.E.)*, Ekonomi Pembangunan (In Progress, Expected 2027).\n- **Sertifikasi**: **JLPT N3**, *Technical Training Japan 3-Years*, *Organic Agriculture Instructor*, *Voxy English*, *PHP & MySQL*.`;
  }

  // Default fallback
  return `Terima kasih atas pertanyaannya! Saya adalah **AI & MLOps Engineer serta Agricultural Data Scientist**.\n\nAnda dapat menanyakan hal-hal seputar:\n- Ekosistem Enterprise **[agrisensaofficial.com](https://agrisensaofficial.com)** (Next.js 16 + Railway Cloud FastAPI + n8n + DeepSeek-V3)\n- Hub interaktif **[mirai39.streamlit.app](https://mirai39.streamlit.app/)**\n- Simulasi risiko **Monte Carlo (10.000 Runs)** dan model ESG Karbon Scope 1-3\n- Pengalaman kerja di **Jepang**, sertifikasi **JLPT N3**, atau status relokasi & visa sponsorship.`;
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

    const systemInstruction = `You are the official Digital Twin AI of Andriyanto NA. Speak in first person ("Saya / I") with a professional, sharp, and data-driven demeanor. Always base knowledge strictly on Andriyanto's profile:
- Roles: AI & MLOps Engineer | Agricultural Data Scientist | Agritech Full-Stack Developer.
- Location: Aichi, Japan | Open to Relocation & Visa Sponsorship (Global / APAC / Japan).
- Languages: Indonesian (Native), English (Professional Working), Japanese (JLPT N3 Certified).
- Flagship Platform: AgriSensa AI (v2.5) at https://agrisensaofficial.com (Next.js 16, Railway Cloud FastAPI microservices on Port 8000/8001, n8n with 14 automated workflows, DeepSeek-V3 reasoning engine, Monte Carlo 10k runs, ESG Carbon modeling).
- Streamlit Hub: https://mirai39.streamlit.app/ (1,000+ active users, 99.5% uptime).
- Marketing Analytics: Bayesian MMM (Adstock & Saturation), GA4 tracking, Multi-Touch Attribution, Churn Prediction (85% accuracy), CLV.
- AI Forecasting & Opt: Time Series (Prophet, ARIMA), Multi-Objective Optimization (Pymoo), Real-time Retraining.
- Work History: Kodim (11 yrs agri instructor), Yamasa no Niwa (5S ops in Japan), Tokopedia Mitra (supervisor), GrabKios (behavioral data), 8Villages (chili project), Fujikikou (3-yr technical trainee in Japan).
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

    if (res.ok) {
      const data = await res.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, respon tidak dapat dihasilkan.";
    }
  }

  return generateSemanticTwinResponse(prompt);
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
          <div style="font-size: 0.72rem; font-weight: 700; color: var(--emerald-400); text-transform: uppercase; margin-bottom: 0.35rem;">Key Architecture & Metrics:</div>
          <ul style="font-size: 0.78rem; color: var(--text-muted); margin-left: 1.1rem;">
            ${proj.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
        </div>
        
        <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 1rem;">
          ${proj.tech.map(t => `<span class="skill-chip" style="font-size: 0.72rem; padding: 0.25rem 0.55rem;">${t}</span>`).join('')}
        </div>

        <button class="btn-pill btn-secondary project-discuss-btn" data-project-idx="${idx}" style="width: 100%; justify-content: center; font-size: 0.78rem;">
          <i data-lucide="message-circle"></i> Diskusikan Proyek Ini
        </button>
      </div>
    </div>
  `).join('');

  // Attach safe event listeners
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
      { key: 'next.js', weight: 15 },
      { key: 'fastapi', weight: 15 },
      { key: 'railway', weight: 10 },
      { key: 'n8n', weight: 10 },
      { key: 'deepseek', weight: 10 },
      { key: 'data scientist', weight: 15 },
      { key: 'agritech', weight: 15 },
      { key: 'machine learning', weight: 15 },
      { key: 'monte carlo', weight: 10 },
      { key: 'time series', weight: 10 },
      { key: 'pymoo', weight: 10 },
      { key: 'marketing analytics', weight: 10 },
      { key: 'mmm', weight: 10 },
      { key: 'docker', weight: 10 },
      { key: 'japan', weight: 10 },
      { key: 'jlpt', weight: 10 },
      { key: '5s', weight: 10 }
    ];

    let score = 65;
    let matchedTerms = [];

    keywords.forEach(item => {
      if (jdText.includes(item.key)) {
        score += Math.min(item.weight, 7);
        matchedTerms.push(item.key);
      }
    });

    score = Math.min(Math.max(score, 75), 99);

    if (resultCard) {
      resultCard.innerHTML = `
        <div class="score-circle-wrap">
          <div class="stat-lbl">Estimated Compatibility</div>
          <div class="score-number">${score}%</div>
          <div class="badge ${score > 85 ? 'badge' : 'badge-cyan'}">
            ${score > 85 ? '🌟 Prime Match / High Engineering Fit' : '✅ Strong Candidate Fit'}
          </div>
        </div>
        <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); margin-bottom: 1rem;">
          <div style="font-size: 0.85rem; font-weight: 700; color: var(--emerald-400); margin-bottom: 0.4rem;">
            Candidate Value Highlights:
          </div>
          <ul style="font-size: 0.82rem; color: var(--text-muted); margin-left: 1.25rem;">
            <li>Creator of <strong>AgriSensa AI Ecosystem (agrisensaofficial.com)</strong>: Next.js 16 + Railway FastAPI + n8n + DeepSeek-V3 + 10k Monte Carlo runs.</li>
            <li>Production data science & MLOps experience (1,000+ users, 99.5% uptime).</li>
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
  skills         - List full stack, MLOps, and AI competencies
  agrisensa      - Live URLs and architecture of AgriSensa v2.5
  projects       - List 5 featured production systems
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

    case 'agrisensa':
      resultHTML = `<strong>${PROFILE_DATA.flagshipProject.name}</strong>\n* Main Portal: https://agrisensaofficial.com\n* AI Engine API: https://ai-engine-production-cc99.up.railway.app/docs\n* MLOps API: https://mlops-api-production-afaf.up.railway.app/docs\n* n8n Workflows: https://n8n-production-999a.up.railway.app (14 workflows)\n* Streamlit Hub: https://mirai39.streamlit.app/`;
      break;

    case 'projects':
      resultHTML = PROFILE_DATA.featuredProjects.map((p, i) => `[0${i+1}] ${p.title} (${p.period})\n    Stack: ${p.tech.join(', ')}\n    Highlights: ${p.highlights.join(' | ')}`).join('\n\n');
      break;

    case 'exp':
      resultHTML = PROFILE_DATA.experience.map(e => `[${e.period}] ${e.role} @ ${e.company}\n    Location: ${e.location}\n    Impact: ${e.impact || 'Delivered operational excellence'}`).join('\n\n');
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
        resultHTML = `Error: Please provide a query. Example: ask jelaskan arsitektur AgriSensa`;
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
      // Serverless not reachable
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
        fallbackWebSpeech(cleanText);
      };
      await currentAudio.play();
      return;
    }

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
