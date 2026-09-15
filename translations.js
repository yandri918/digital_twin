/**
 * Andriyanto NA - Digital Twin Internationalization (i18n)
 * Complete multi-language dictionaries and localized datasets for Indonesian (ID), English (EN), and Japanese (JA)
 */

const TRANSLATIONS = {
  id: {
    langName: "Bahasa Indonesia",
    header: {
      tagline: "Profil Digital Twin AI Resmi",
      contactBtn: "Kontak & Diskusi",
      navChat: "AI Twin Chat",
      navProjects: "Proyek Unggulan",
      navAgriSensa: "AgriSensa AI v2.5",
      navSkills: "Radar Keahlian",
      navTimeline: "Riwayat Karir",
      navEducation: "Pendidikan & Sertifikasi",
      navMatcher: "Kesesuaian Posisi",
      navCLI: "Twin-CLI"
    },
    hero: {
      badgeLocation: "Aichi, Jepang",
      badgeTG2: "Lulus Ujian TG2 Pertanian Jepang",
      badgeJLPT: "Sertifikasi JLPT N3",
      badgeReloc: "Terbuka untuk Relokasi",
      badgeVoice: "Suara AI ElevenLabs",
      greeting: "Halo, Saya",
      subtitle: "AI & MLOps Engineer • Agricultural Data Scientist • Kreator AgriSensa AI",
      bio: "Fokus merancang dan mendeploy ekosistem kecerdasan buatan terpadu berskala enterprise. Lead Developer <strong><a href='https://agrisensaofficial.com' target='_blank' style='color: var(--emerald-400); text-decoration: underline;'>AgriSensa AI (v2.5)</a></strong> — platform pertanian presisi berbasis Next.js 16, Railway Cloud FastAPI, orkestrasi 14 workflow n8n, reasoning DeepSeek-V3, dan simulasi risiko stokastik Monte Carlo (10.000 Iterasi).",
      stats: {
        users: "Pengguna Aktif",
        uptime: "SLA Uptime",
        monteCarlo: "Simulasi Risiko",
        n8n: "Alur Otomatis n8n",
        roi: "Peningkatan ROI",
        domain: "Domain Pertanian"
      },
      ctaChat: "Mulai Diskusi (Suara & Teks)",
      ctaAgriSensa: "Ekosistem AgriSensa AI v2.5",
      ctaStreamlit: "Hub Platform Streamlit",
      twinVerified: "Digital Twin Terverifikasi",
      twinStatus: "Neural Persona & Model Pengetahuan Aktif"
    },
    chat: {
      title: "Percakapan Langsung dengan Digital Twin",
      subtitle: "Berbicara atas nama Andriyanto NA (Orang Pertama • Suara ElevenLabs)",
      voiceToggle: "Aktifkan Suara ElevenLabs",
      resetChat: "Reset Percakapan",
      greetingMsg: "**Halo! Saya Digital Twin resmi dari Andriyanto NA.** 🤖🌾\n\nSaya merepresentasikan keahlian saya sebagai **AI & MLOps Engineer, Agricultural Data Scientist, dan Creator platform AgriSensa AI**.\n\n**Info Ekosistem Utama:**\n- 🌐 **[agrisensaofficial.com](https://agrisensaofficial.com)**: Platform Enterprise berbayar (*Next.js 16 + Railway Cloud FastAPI + n8n 14 workflows + DeepSeek-V3 Reasoning + Monte Carlo 10.000 Runs*).\n- 📱 **[mirai39.streamlit.app](https://mirai39.streamlit.app/)**: Hub interaktif data-centric berbasis Streamlit (1.000+ pengguna).\n- 🌸 **Suzuki Flower Farm (Aichi, Jepang)**: Operasional florikultura presisi & telah **Lulus Ujian Tokutei Ginou 2 (TG2)** bidang pertanian Jepang!\n\nSilakan tanyakan detail arsitektur, API Railway Cloud, keahlian Machine Learning/MLOps, atau peluang relokasi kerja!",
      promptChips: [
        "Suzuki Flower Farm & Ujian TG2 Jepang",
        "Ceritakan ekosistem AgriSensa v2.5",
        "Arsitektur Railway Cloud & n8n",
        "Simulasi Monte Carlo (10.000 Runs)",
        "Pengalaman Jepang, 5S & JLPT N3",
        "Ketersediaan relokasi & visa kerja"
      ],
      inputPlaceholder: "Tanyakan apapun ke Digital Twin Andriyanto...",
      sendBtn: "Kirim",
      engineTitle: "Mode Mesin AI",
      engineSemantic: "Semantic Knowledge Engine (Bawaan)",
      engineGemini: "Google Gemini 1.5 Flash (Live API)",
      apiKeyLabel: "Gemini API Key (Opsional / Tersimpan Lokal):",
      saveKeyBtn: "Simpan Key",
      audioBtn: "Dengarkan (ElevenLabs)",
      resetDone: "Percakapan telah direset. Ada yang ingin Anda tanyakan seputar portofolio dan sistem AI saya?"
    },
    projects: {
      heading: "Portofolio Proyek Unggulan",
      subheading: "Implementasi end-to-end Machine Learning, AI Reasoning, Arsitektur Cloud, dan Marketing Analytics berskala produksi.",
      btnLive: "Buka Aplikasi Live",
      btnDetails: "Diskusikan Proyek Ini",
      highlightsLabel: "Pencapaian & Arsitektur Kunci:"
    },
    agriSensa: {
      heading: "Arsitektur AgriSensa AI (v2.5 Enterprise)",
      subheading: "Ekosistem Pertanian Presisi & MLOps Terpadu yang di-deploy di Vercel Edge dan Railway Cloud.",
      servicesTitle: "Status Layanan & Endpoint Cloud",
      archTitle: "Arsitektur Sistem Berlapis (5 Layer)",
      modulesTitle: "9 Modul Fungsional Produksi (/routes)"
    },
    skills: {
      heading: "Radar Keahlian & Matriks Teknologi",
      subheading: "Pemetaan kompetensi terukur di bidang AI/ML, Cloud Infrastructure, Full-Stack, dan Pertanian Presisi."
    },
    timeline: {
      heading: "Riwayat Pengalaman Profesional & Karir",
      subheading: "Rekam jejak kepemimpinan data, operasional berstandar Jepang (5S), dan AI engineering selama lebih dari 11 tahun.",
      filterAll: "Semua Karir",
      filterJapan: "🇯🇵 Pengalaman Jepang",
      filterIndo: "🇮🇩 Pengalaman Indonesia",
      impactLabel: "Dampak & Prestasi Utama:"
    },
    education: {
      heading: "Latar Belakang Pendidikan & Sertifikasi",
      subheading: "Kombinasi gelar akademik teknik komputer & ekonomi pembangunan dengan sertifikasi profesional internasional.",
      tabAcademic: "Gelar Akademik",
      tabCerts: "Sertifikasi Profesional"
    },
    matcher: {
      heading: "Evaluator Kesesuaian Posisi (Recruiter Matcher)",
      subheading: "Uji kecocokan kualifikasi Andriyanto NA terhadap deskripsi pekerjaan (Job Description) organisasi Anda.",
      jdPlaceholder: "Tempelkan kualifikasi / Job Description lowongan kerja di sini (contoh: AI Engineer, MLOps, Data Scientist, Agritech Developer)...",
      evalBtn: "Analisis Kesesuaian Profil",
      scoreLabel: "Tingkat Kesesuaian Profil",
      skillsFound: "Keahlian Relevan yang Terpenuhi:",
      conclusionTitle: "Kesimpulan Rekomendasi:"
    },
    cli: {
      heading: "Twin-CLI Interactive Console",
      subheading: "Terminal interaktif berbasis command-line untuk eksplorasi cepat profil, repositori, dan API endpoints.",
      welcome: "Ketik 'help' untuk melihat daftar perintah yang tersedia.",
      helpText: "Perintah yang tersedia:\n  bio        - Tampilkan ringkasan profil eksekutif\n  agrisensa  - Tampilkan arsitektur AgriSensa v2.5 & endpoint cloud\n  projects   - Daftar 5 proyek unggulan\n  japan      - Pengalaman Suzuki Flower Farm, TG2, dan Yamasa no Niwa\n  skills     - Tampilkan radar teknologi & framework\n  contact    - Informasi kontak, email, dan LinkedIn\n  clear      - Bersihkan layar konsol\n  help       - Tampilkan pesan bantuan ini"
    },
    contactModal: {
      title: "Hubungi & Jadwalkan Diskusi Teknis",
      subtitle: "Terbuka untuk posisi full-time, relokasi (Jepang / Global), kontrak AI engineering, dan kolaborasi riset.",
      closeBtn: "Tutup"
    },
    experience: [
      {
        role: "Agricultural Operations Specialist (Florikultura Presisi)",
        company: "Suzuki Flower Farm (鈴木フラワーファーム)",
        period: "Juni 2023 – Saat ini (Masih Berlanjut)",
        location: "Tahara-shi, Prefektur Aichi, Jepang",
        badge: "Jepang / Bersertifikasi TG2",
        country: "JP",
        impact: "Lulus Ujian Tokutei Ginou 2 (TG2) Bidang Pertanian Jepang & Manajemen Budidaya Florikultura Presisi.",
        highlights: [
          "Mengelola manajemen operasional budidaya tanaman hias / florikultura presisi dengan standar mutu ekspor Jepang.",
          "Mengendalikan otomasi mikroklimat greenhouse (suhu, kelembapan, ventilasi) dan sistem fertigasi nutrisi presisi.",
          "Menerapkan metodologi 5S Jepang (Seiri, Seiton, Seiso, Seiketsu, Shitsuke) dan Kaizen untuk efisiensi alur kerja harian.",
          "Berhasil lulus ujian kualifikasi keahlian tingkat lanjut Tokutei Ginou 2 (TG2) bidang pertanian dari Kementerian Pertanian Jepang (MAFF) dengan hak izin kerja profesional jangka panjang."
        ]
      },
      {
        role: "Spesialis Operasional Lanskap & 5S",
        company: "Yamasa no Niwa / Yamasa Japan",
        period: "2022 – 2023 (1 Tahun)",
        location: "Shizuoka, Jepang",
        badge: "Jepang / Standar 5S",
        country: "JP",
        impact: "Meningkatkan efisiensi operasional dan konsistensi kualitas tanaman dengan standar 5S Jepang.",
        highlights: [
          "Menerapkan pendekatan berbasis data dan metodologi 5S Jepang untuk optimalisasi operasional lanskap.",
          "Meningkatkan konsistensi mutu tanaman dan standarisasi SOP perawatan lingkungan budidaya Jepang."
        ]
      },
      {
        role: "Supervisor Customer Analytics & Operasional",
        company: "Tokopedia Mitra — PT Impact Power Mandiri",
        period: "2021 – 2022 (1 Tahun 5 Bulan)",
        location: "Indonesia",
        badge: "Growth & Analytics",
        country: "ID",
        impact: "Mencapai 100% target proyek lebih awal dari jadwal serta meminimalisir kesalahan operasional.",
        highlights: [
          "Mensupervisi proses onboarding dan aktivasi ribuan mitra merchant di wilayah operasional.",
          "Memantau rasio aktivasi, retensi, funnel transaksi, dan performa merchant berbasis data harian.",
          "Mengidentifikasi bottleneck onboarding dan mengeskalasi solusi SOP berbasis bukti terstruktur."
        ]
      },
      {
        role: "Spesialis Layanan Digital & Analitik Perilaku Mitra",
        company: "GrabKios Indonesia — PT Kudo Teknologi Indonesia",
        period: "2018 – 2020 (2 Tahun)",
        location: "Indonesia",
        badge: "Behavioral Analytics",
        country: "ID",
        impact: "Meningkatkan retensi & aktivasi agen; memetakan kluster friksi transaksi merchant.",
        highlights: [
          "Mengumpulkan dan menganalisis data behavioral transaksi mitra agen untuk adopsi produk digital.",
          "Mengidentifikasi pain points pengguna dan menyusun hipotesis perbaikan berbasis data lapangan.",
          "Memantau performa program kampanye lapangan dan retensi agen secara kuantitatif."
        ]
      },
      {
        role: "Koordinator Program Pertanian Digital",
        company: "PT 8Villages Indonesia",
        period: "2017 – 2018 (1 Tahun)",
        location: "Indonesia",
        badge: "Digital Agriculture",
        country: "ID",
        impact: "Meningkatkan produktivitas petani dan memperkuat pengambilan keputusan berbasis data.",
        highlights: [
          "Memimpin inisiatif agritech digital dan melatih ratusan petani dalam adopsi aplikasi seluler.",
          "Mengelola pengumpulan data agronomis dan operasional lapangan untuk proyek cabai seluas 2 hektar."
        ]
      },
      {
        role: "Instruktur Pertanian Organik & Supervisor Berkelanjutan",
        company: "Kodim Pesisir Selatan",
        period: "2015 – Saat ini (11+ Tahun)",
        location: "Sumatera Barat, Indonesia",
        badge: "Instruktur & Pertanian Berkelanjutan",
        country: "ID",
        impact: "Mendorong adopsi masif metode budidaya organik berbiaya rendah dan ramah lingkungan.",
        highlights: [
          "Memberikan pelatihan pertanian organik untuk personil dan kelompok tani binaan di daerah.",
          "Mengembangkan teknik budidaya ramah lingkungan dan lini produksi pupuk organik bersertifikasi."
        ]
      },
      {
        role: "Technical Trainee (Pemeliharaan Mesin & Manufaktur Industri)",
        company: "PT Fujikikou / Fujikikou Japan",
        period: "2009 – 2012 (3 Tahun)",
        location: "Shizuoka, Jepang",
        badge: "Jepang / Manufaktur & 5S",
        country: "JP",
        impact: "Menuntaskan 3 tahun pelatihan teknis intensif manufaktur presisi & kedisiplinan kerja Jepang.",
        highlights: [
          "Menjalani program pelatihan teknis 3 tahun dalam manufaktur industri dan pemeliharaan mesin presisi di Shizuoka, Jepang.",
          "Menguasai metodologi 5S, inspeksi kontrol kualitas ketat, dan budaya kerja manufaktur Jepang."
        ]
      }
    ]
  },

  en: {
    langName: "English",
    header: {
      tagline: "Official AI Digital Twin Profile",
      contactBtn: "Contact & Discuss",
      navChat: "AI Twin Chat",
      navProjects: "Featured Projects",
      navAgriSensa: "AgriSensa AI v2.5",
      navSkills: "Skill Radar",
      navTimeline: "Career Timeline",
      navEducation: "Education & Certifications",
      navMatcher: "Job Fit Matcher",
      navCLI: "Twin-CLI"
    },
    hero: {
      badgeLocation: "Aichi, Japan",
      badgeTG2: "MAFF TG2 Agriculture Passed",
      badgeJLPT: "JLPT N3 Certified",
      badgeReloc: "Open to Relocation",
      badgeVoice: "ElevenLabs AI Voice",
      greeting: "Hello, I am",
      subtitle: "AI & MLOps Engineer • Agricultural Data Scientist • Creator of AgriSensa AI",
      bio: "Specializing in architecting and deploying enterprise-grade AI ecosystems. Lead Developer of <strong><a href='https://agrisensaofficial.com' target='_blank' style='color: var(--emerald-400); text-decoration: underline;'>AgriSensa AI (v2.5)</a></strong> — precision agriculture platform built on Next.js 16, Railway Cloud FastAPI, 14 n8n automated workflows, DeepSeek-V3 reasoning, and 10,000-run stochastic Monte Carlo simulations.",
      stats: {
        users: "Active Users",
        uptime: "SLA Uptime",
        monteCarlo: "Risk Simulations",
        n8n: "n8n Workflows",
        roi: "Marketing ROI",
        domain: "Agri Domain"
      },
      ctaChat: "Start Chat (Voice & Text)",
      ctaAgriSensa: "AgriSensa AI v2.5 Ecosystem",
      ctaStreamlit: "Streamlit Platform Hub",
      twinVerified: "Verified Digital Twin",
      twinStatus: "Neural Persona & Knowledge Base Active"
    },
    chat: {
      title: "Direct Conversation with Digital Twin",
      subtitle: "Speaking on behalf of Andriyanto NA (1st Person • ElevenLabs Voice)",
      voiceToggle: "Toggle ElevenLabs Voice",
      resetChat: "Reset Conversation",
      greetingMsg: "**Hello! I am the official Digital Twin of Andriyanto NA.** 🤖🌾\n\nI represent my professional experience as an **AI & MLOps Engineer, Agricultural Data Scientist, and Creator of the AgriSensa AI platform**.\n\n**Core Ecosystem Highlights:**\n- 🌐 **[agrisensaofficial.com](https://agrisensaofficial.com)**: Paid Enterprise Platform (*Next.js 16 + Railway Cloud FastAPI + 14 n8n workflows + DeepSeek-V3 Reasoning + 10,000 Runs Monte Carlo*).\n- 📱 **[mirai39.streamlit.app](https://mirai39.streamlit.app/)**: Interactive data-centric Streamlit hub (1,000+ users).\n- 🌸 **Suzuki Flower Farm (Aichi, Japan)**: Precision floriculture operations & passed the prestigious **Tokutei Ginou 2 (TG2)** qualification in Agriculture!\n\nFeel free to ask about cloud architecture, Railway APIs, Machine Learning/MLOps pipelines, or career relocation opportunities!",
      promptChips: [
        "Suzuki Flower Farm & Japan TG2 Exam",
        "Explain AgriSensa v2.5 ecosystem",
        "Railway Cloud & n8n architecture",
        "Monte Carlo Simulations (10,000 Runs)",
        "Japan experience, 5S & JLPT N3",
        "Relocation & visa sponsorship status"
      ],
      inputPlaceholder: "Ask anything to Andriyanto's Digital Twin...",
      sendBtn: "Send",
      engineTitle: "AI Engine Mode",
      engineSemantic: "Semantic Knowledge Engine (Built-in)",
      engineGemini: "Google Gemini 1.5 Flash (Live API)",
      apiKeyLabel: "Gemini API Key (Optional / Stored Locally):",
      saveKeyBtn: "Save Key",
      audioBtn: "Listen (ElevenLabs)",
      resetDone: "Conversation has been reset. What would you like to explore about my portfolio and AI systems?"
    },
    projects: {
      heading: "Featured Engineering Projects",
      subheading: "Production-ready implementations spanning Machine Learning, AI Reasoning, Cloud Architecture, and Marketing Analytics.",
      btnLive: "Open Live Application",
      btnDetails: "Discuss This Project",
      highlightsLabel: "Key Architecture & Metrics:"
    },
    agriSensa: {
      heading: "AgriSensa AI Architecture (v2.5 Enterprise)",
      subheading: "Unified Precision Agriculture & MLOps Ecosystem deployed across Vercel Edge and Railway Cloud.",
      servicesTitle: "Live Cloud Services & API Endpoints",
      archTitle: "Layered System Architecture (5 Layers)",
      modulesTitle: "9 Production Functional Modules (/routes)"
    },
    skills: {
      heading: "Skill Radar & Technology Matrix",
      subheading: "Quantified competencies across AI/ML Engineering, Cloud Infrastructure, Full-Stack Development, and Precision Agronomy."
    },
    timeline: {
      heading: "Professional Career Timeline & Milestones",
      subheading: "Over 11 years of data leadership, Japanese 5S operational precision, and AI engineering excellence across Japan and Indonesia.",
      filterAll: "All Careers",
      filterJapan: "🇯🇵 Japan Experience",
      filterIndo: "🇮🇩 Indonesia Experience",
      impactLabel: "Key Impact & Distinction:"
    },
    education: {
      heading: "Academic Education & Certifications",
      subheading: "Dual academic background in Computer Engineering & Economics complemented by rigorous international certifications.",
      tabAcademic: "Academic Degrees",
      tabCerts: "Professional Certifications"
    },
    matcher: {
      heading: "Recruiter Job Fit Evaluator",
      subheading: "Evaluate Andriyanto NA's qualifications against your organization's specific Job Description.",
      jdPlaceholder: "Paste your job description or requirements here (e.g., AI Engineer, MLOps, Data Scientist, Agritech Full-Stack Developer)...",
      evalBtn: "Analyze Profile Match",
      scoreLabel: "Profile Match Score",
      skillsFound: "Matching Competencies Identified:",
      conclusionTitle: "Recommendation Conclusion:"
    },
    cli: {
      heading: "Twin-CLI Interactive Console",
      subheading: "Interactive command-line interface for rapid profile, repository, and API exploration.",
      welcome: "Type 'help' to view available commands.",
      helpText: "Available commands:\n  bio        - Display executive profile summary\n  agrisensa  - Display AgriSensa v2.5 architecture & cloud endpoints\n  projects   - List 5 featured projects\n  japan      - Experience at Suzuki Flower Farm, TG2, and Yamasa no Niwa\n  skills     - Display tech radar & frameworks\n  contact    - View contact info, email, and LinkedIn\n  clear      - Clear console output\n  help       - Show this help message"
    },
    contactModal: {
      title: "Contact & Schedule Technical Discussion",
      subtitle: "Open to full-time roles, global/Japan relocation, AI engineering contracts, and research collaboration.",
      closeBtn: "Close"
    },
    experience: [
      {
        role: "Agricultural Operations Specialist (Precision Floriculture)",
        company: "Suzuki Flower Farm (鈴木フラワーファーム)",
        period: "June 2023 – Present (Ongoing)",
        location: "Tahara City, Aichi Prefecture, Japan",
        badge: "Japan / TG2 Certified",
        country: "JP",
        impact: "Passed MAFF Tokutei Ginou 2 (TG2) Agriculture Exam & Managed Precision Floriculture.",
        highlights: [
          "Supervised high-precision floriculture operations, greenhouse environmental automation, and drip fertigation systems conforming to Japanese export standards.",
          "Applied Japanese 5S methodology (Seiri, Seiton, Seiso, Seiketsu, Shitsuke) and Kaizen to maintain plant quality consistency and post-harvest efficiency.",
          "Successfully passed Japan's Ministry of Agriculture, Forestry and Fisheries (MAFF) Tokutei Ginou 2 (TG2 / Specified Skilled Worker II) supervisor-level exam, obtaining long-term professional residency status in Japan."
        ]
      },
      {
        role: "Landscape Operations & 5S Specialist",
        company: "Yamasa no Niwa / Yamasa Japan",
        period: "2022 – 2023 (1 Year)",
        location: "Shizuoka, Japan",
        badge: "Japan / 5S Excellence",
        country: "JP",
        impact: "Enhanced operational efficiency and crop quality consistency using Japanese 5S standards.",
        highlights: [
          "Applied data-driven approaches and Japanese 5S methodology to optimize landscape operations.",
          "Improved crop quality consistency and standardized cultivation SOPs in a Japanese professional environment."
        ]
      },
      {
        role: "Customer Analytics & Operations Supervisor",
        company: "Tokopedia Mitra — PT Impact Power Mandiri",
        period: "2021 – 2022 (1 Year 5 Months)",
        location: "Indonesia",
        badge: "Growth & Analytics",
        country: "ID",
        impact: "Achieved 100% project targets ahead of schedule; minimized operational error rates.",
        highlights: [
          "Supervised merchant onboarding and activation pipelines across assigned regional territories.",
          "Monitored activation rate, retention, transaction funnels, and daily merchant engagement metrics.",
          "Identified onboarding bottlenecks and escalated structured, evidence-based SOP improvements."
        ]
      },
      {
        role: "Digital Services & Behavioral Analytics Specialist",
        company: "GrabKios Indonesia — PT Kudo Teknologi Indonesia",
        period: "2018 – 2020 (2 Years)",
        location: "Indonesia",
        badge: "Behavioral Analytics",
        country: "ID",
        impact: "Boosted merchant retention & activation; mapped high-friction transaction clusters.",
        highlights: [
          "Collected and modeled behavioral transaction data for digital product adoption across merchant networks.",
          "Diagnosed user friction points and formulated evidence-backed hypotheses for field operations.",
          "Monitored campaign performance and agent retention metrics with structured quantitative tracking."
        ]
      },
      {
        role: "Digital Agriculture Program Coordinator",
        company: "PT 8Villages Indonesia",
        period: "2017 – 2018 (1 Year)",
        location: "Indonesia",
        badge: "Digital Agriculture",
        country: "ID",
        impact: "Enhanced farmer productivity and reinforced data-driven cultivation decisions.",
        highlights: [
          "Led digital agriculture initiatives and trained hundreds of farmers on mobile app adoption.",
          "Managed agronomic data collection and field trials for a 2-hectare chili production project."
        ]
      },
      {
        role: "Certified Organic Agriculture Instructor & Sustainability Supervisor",
        company: "Kodim Pesisir Selatan",
        period: "2015 – Present (11+ Years)",
        location: "West Sumatra, Indonesia",
        badge: "Instructor & Sustainable Farming",
        country: "ID",
        impact: "Drove widespread regional adoption of cost-effective, eco-friendly organic farming systems.",
        highlights: [
          "Conducted organic farming workshops for military personnel and community farming groups.",
          "Promoted sustainable agricultural practices and certified organic fertilizer production pipelines."
        ]
      },
      {
        role: "Technical Manufacturing & Maintenance Trainee",
        company: "PT Fujikikou / Fujikikou Japan",
        period: "2009 – 2012 (3 Years)",
        location: "Shizuoka, Japan",
        badge: "Japan / Manufacturing & 5S",
        country: "JP",
        impact: "Completed 3-year rigorous technical training in precision machinery & Japanese work discipline.",
        highlights: [
          "Completed 3-year intensive technical training in industrial manufacturing and machine maintenance in Shizuoka, Japan.",
          "Mastered 5S methodology, strict quality inspection standards, and Japanese manufacturing discipline."
        ]
      }
    ]
  },

  ja: {
    langName: "日本語",
    header: {
      tagline: "公式AIデジタルツイン プロフィール",
      contactBtn: "お問い合わせ・面談",
      navChat: "AIツイン対話",
      navProjects: "主要プロジェクト",
      navAgriSensa: "AgriSensa AI v2.5",
      navSkills: "スキルレーダー",
      navTimeline: "職務経歴",
      navEducation: "学歴・保有資格",
      navMatcher: "求人マッチング",
      navCLI: "Twin-CLI"
    },
    hero: {
      badgeLocation: "日本・愛知県在住",
      badgeTG2: "農林水産省 特定技能2号 (農業) 合格",
      badgeJLPT: "日本語能力試験 JLPT N3 取得",
      badgeReloc: "ビザ取得・転居可能",
      badgeVoice: "ElevenLabs AI 音声",
      greeting: "こんにちは、",
      subtitle: "AI・MLOpsエンジニア • 農業データサイエンティスト • AgriSensa AI 開発責任者",
      bio: "エンタープライズ規模の統合人工知能エコシステムの設計・構築・運用に特化。次世代精密農業プラットフォーム<strong><a href='https://agrisensaofficial.com' target='_blank' style='color: var(--emerald-400); text-decoration: underline;'>「AgriSensa AI (v2.5)」</a></strong>開発者（Next.js 16、Railway Cloud FastAPI、14のn8n自動化ワークフロー、DeepSeek-V3推論、10,000回モンテカルロリスクシミュレーション）。",
      stats: {
        users: "アクティブユーザー",
        uptime: "クラウドSLA稼働率",
        monteCarlo: "リスク試行回数",
        n8n: "n8n自動化フロー",
        roi: "マーケティングROI",
        domain: "農業専門知見"
      },
      ctaChat: "対話を開始する（音声・テキスト）",
      ctaAgriSensa: "AgriSensa AI v2.5 エコシステム",
      ctaStreamlit: "Streamlit Hub を開く",
      twinVerified: "公式認証済みデジタルツイン",
      twinStatus: "ニューラルペルソナ＆知識ベース稼働中"
    },
    chat: {
      title: "デジタルツインとのリアルタイム対話",
      subtitle: "Andriyanto NA の知見を直接再現（一人称対話 • ElevenLabs AI 音声）",
      voiceToggle: "ElevenLabs 音声を切り替え",
      resetChat: "チャットをリセット",
      greetingMsg: "**こんにちは！Andriyanto NA の公式AIデジタルツインです。** 🤖🌾\n\n私は **AI & MLOps エンジニア、農業データサイエンティスト、そして AgriSensa AI の開発者** としての知見と実績を忠実に再現します。\n\n**主要エコシステムの概要:**\n- 🌐 **[agrisensaofficial.com](https://agrisensaofficial.com)**: 商用エンタープライズ版 (*Next.js 16 + Railway Cloud FastAPI + 14 n8nワークフロー + DeepSeek-V3 推論エンジン + 10,000回モンテカルロ*)\n- 📱 **[mirai39.streamlit.app](https://mirai39.streamlit.app/)**: データ分析ハブ (1,000名以上利用)\n- 🌸 **鈴木フラワーファーム（愛知県田原市）**: 精密花卉施設園芸オペレーションおよび **農林水産省「特定技能2号（農業）」合格** 実績！\n\nAIアーキテクチャ、FastAPIマイクロサービス、機械学習パイプライン、日本国内外での採用・転居についてお気軽にご質問ください！",
      promptChips: [
        "鈴木フラワーファーム & 特定技能2号合格",
        "AgriSensa v2.5 エコシステムの詳細",
        "Railway Cloud & n8n アーキテクチャ",
        "10,000回 モンテカルロ シミュレーション",
        "日本での職務経験・5S・JLPT N3",
        "ビザスポンサーシップ・転居可能状況"
      ],
      inputPlaceholder: "デジタルツインに何でも質問してください...",
      sendBtn: "送信",
      engineTitle: "AI推論エンジン選択",
      engineSemantic: "セマンティック知識エンジン（内蔵・推奨）",
      engineGemini: "Google Gemini 1.5 Flash (Live API)",
      apiKeyLabel: "Gemini API Key（任意 / ローカル保存）:",
      saveKeyBtn: "キーを保存",
      audioBtn: "音声を聞く (ElevenLabs)",
      resetDone: "対話履歴がリセットされました。プロジェクトや技術スタックについて何をお答えしましょうか？"
    },
    projects: {
      heading: "主要開発プロジェクト",
      subheading: "機械学習、AI推論、クラウドインフラ、マーケティング分析における商用実装実績。",
      btnLive: "ライブアプリを開く",
      btnDetails: "このプロジェクトについて質問する",
      highlightsLabel: "主な成果・アーキテクチャ:"
    },
    agriSensa: {
      heading: "AgriSensa AI アーキテクチャ (v2.5 Enterprise)",
      subheading: "Vercel Edge および Railway Cloud 上に展開された統合精密農業＆MLOpsプラットフォーム。",
      servicesTitle: "稼働中のクラウドサービス & API エンドポイント",
      archTitle: "5層構造システムアーキテクチャ",
      modulesTitle: "9つの商用本番モジュール (/routes)"
    },
    skills: {
      heading: "スキルレーダー ＆ 技術スタック",
      subheading: "AI/MLエンジニアリング、クラウドインフラ、フルスタック開発、精密農業における定量化された技術力。"
    },
    timeline: {
      heading: "職務経歴 ＆ キャリアタイムライン",
      subheading: "日本およびインドネシアにおける11年以上のデータ活用、5S現場統括、AIエンジニアリングの実務実績。",
      filterAll: "すべての経歴",
      filterJapan: "🇯🇵 日本での経歴",
      filterIndo: "🇮🇩 インドネシアでの経歴",
      impactLabel: "主要実績・成果:"
    },
    education: {
      heading: "学歴および保有資格",
      subheading: "コンピュータ工学および開発経済学の学士号と、厳格な国際・国家認定資格の融合。",
      tabAcademic: "取得学位・学歴",
      tabCerts: "公的・専門資格"
    },
    matcher: {
      heading: "求人要件適合性アナライザー (Recruiter Matcher)",
      subheading: "貴社の募集要項（Job Description）に対する Andriyanto NA のスキル適合度を即座に判定します。",
      jdPlaceholder: "募集要項や求める要件をここに貼り付けてください（例: AI Engineer, MLOps, Data Scientist, Full-Stack Developer）...",
      evalBtn: "適合度を分析する",
      scoreLabel: "総合適合度スコア",
      skillsFound: "一致した保有専門スキル:",
      conclusionTitle: "総合評価・採用提案:"
    },
    cli: {
      heading: "Twin-CLI インタラクティブコンソール",
      subheading: "プロフィール、リポジトリ、APIエンドポイントを素早く探索できるコマンドライン端末。",
      welcome: "'help' と入力すると利用可能なコマンド一覧が表示されます。",
      helpText: "利用可能コマンド一覧:\n  bio        - 概要エグゼクティブサマリー\n  agrisensa  - AgriSensa v2.5 構成 & クラウドAPI\n  projects   - 5つの主要開発プロジェクト一覧\n  japan      - 鈴木フラワーファーム・特定技能2号・山佐の庭\n  skills     - 技術スタック＆フレームワーク\n  contact    - 連絡先、メール、LinkedIn\n  clear      - 画面クリア\n  help       - ヘルプ表示"
    },
    contactModal: {
      title: "お問い合わせ・技術面談のご予約",
      subtitle: "正社員採用、日本・海外への転居、AI開発受託、共同研究など幅広く対応可能です。",
      closeBtn: "閉じる"
    },
    experience: [
      {
        role: "農業オペレーションスペシャリスト（施設園芸・精密花卉栽培）",
        company: "鈴木フラワーファーム (Suzuki Flower Farm)",
        period: "2023年6月 – 現在（継続勤務中）",
        location: "愛知県田原市",
        badge: "日本勤務 / 特定技能2号 合格",
        country: "JP",
        impact: "農林水産省「特定技能2号（農業）」合格 ＆ 精密花卉施設園芸オペレーション統括。",
        highlights: [
          "最高品質を満たす花卉の精密栽培管理、自動温室複合環境制御（温度・湿度・日射・換気）、および精密養液点滴施肥の運用統括。",
          "日本の5S（整理・整頓・清掃・清潔・躾）とカイゼンを徹底し、収穫・出荷業務の標準化と品質安定化を実現。",
          "農林水産省が管掌する最難関国家試験「特定技能2号（農業）」に合格し、長期在留および家族帯同が可能な専門監督者資格を取得。"
        ]
      },
      {
        role: "緑地管理・5Sオペレーションスペシャリスト",
        company: "山佐の庭（株式会社ヤマサ / Yamasa Japan）",
        period: "2022年 – 2023年（1年間）",
        location: "静岡県",
        badge: "日本勤務 / 5S徹底",
        country: "JP",
        impact: "日本標準の5S手法とデータに基づく緑地・造園オペレーションの最適化。",
        highlights: [
          "データ活用と5S手法を現場に導入し、造園・緑地管理オペレーションの作業効率を向上。",
          "植物の品質安定化と現場作業SOPの標準化を推進。"
        ]
      },
      {
        role: "顧客アナリティクス ＆ オペレーション統括（スーパーバイザー）",
        company: "Tokopedia Mitra — PT Impact Power Mandiri",
        period: "2021年 – 2022年（1年5ヶ月）",
        location: "インドネシア",
        badge: "グロース＆アナリティクス",
        country: "ID",
        impact: "プロジェクト目標を前倒しで100%達成、業務オペレーションのエラー率を削減。",
        highlights: [
          "数千店におよぶ加盟店（Merchant）のオンボーディングとアクティベーション推進を統括・指導。",
          "アクティベーション率、継続率、取引ファネルなどの日次データを監視・分析。",
          "オンボーディング時の課題を特定し、データに基づく構造化されたSOP改善策を提案・実行。"
        ]
      },
      {
        role: "デジタルサービス ＆ 行動データアナリティクススペシャリスト",
        company: "GrabKios Indonesia — PT Kudo Teknologi Indonesia",
        period: "2018年 – 2020年（2年間）",
        location: "インドネシア",
        badge: "行動アナリティクス",
        country: "ID",
        impact: "エージェントの定着率・稼働率向上、取引上の高頻度フリクション要因を特定。",
        highlights: [
          "デジタル商品取引におけるエージェントの利用行動データを収集・分析。",
          "ユーザーの利用障壁を特定し、現場課題に対する実証的改善仮説を策定。",
          "キャンペーン効果の定量的トラッキングと定着率改善施策を実施。"
        ]
      },
      {
        role: "デジタル農業プログラムコーディネーター",
        company: "PT 8Villages Indonesia",
        period: "2017年 – 2018年（1年間）",
        location: "インドネシア",
        badge: "スマート農業",
        country: "ID",
        impact: "農家の生産性向上とデータに基づく営農意思決定の強化を推進。",
        highlights: [
          "デジタル農業イニシアチブを牽引し、多数の農家へモバイル農業アプリの導入・活用トレーニングを実施。",
          "2ヘクタールの唐辛子実証プロジェクトにおける営農データ収集と圃場管理を担当。"
        ]
      },
      {
        role: "有機農業指導員 ＆ 持続可能農業スーパーバイザー",
        company: "Kodim Pesisir Selatan（インドネシア国軍地域司令部）",
        period: "2015年 – 現在（11年以上）",
        location: "西スマトラ州、インドネシア",
        badge: "指導員 / 有機農業推進",
        country: "ID",
        impact: "低コスト・環境配慮型の有機農法および認証有機肥料の普及を牽引。",
        highlights: [
          "軍関係者および地域農家グループ向けに有機農業の体系的トレーニングを実施。",
          "持続可能な有機栽培技術の普及および高品質な有機肥料生産ラインの立ち上げを支援。"
        ]
      },
      {
        role: "産業機械製造・精密機器保全 技能実習生",
        company: "株式会社フジキコー (PT Fujikikou / Japan)",
        period: "2009年 – 2012年（3年間）",
        location: "静岡県",
        badge: "日本勤務 / 製造・5S技術",
        country: "JP",
        impact: "静岡県にて3年間の集中技術研修を修了、日本の厳格な5Sと品質規律を体得。",
        highlights: [
          "産業機械製造および精密機械のメンテナンスに関する3年間の集中技術研修を修了。",
          "徹底した5S手法、品質検査基準、および日本の製造業における厳格な業務規律を習得。"
        ]
      }
    ]
  }
};
