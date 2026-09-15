// Knowledge Graph & Dataset Extracted from Profile.pdf & andriyanto_atas_new_en.docx
const PROFILE_DATA = {
  name: "Andriyanto NA",
  headline: "AI Engineer | Agricultural Data Scientist | Agritech Engineer | Marketing Analytics Specialist | MLOps",
  location: "Aichi, Japan",
  regionalContext: "Aichi, Japan & Jakarta / West Sumatra, Indonesia",
  relocationStatus: "Open to Relocation & Visa Sponsorship (Japan, APAC, Global)",
  contact: {
    mobile: "+81-80-7698-8509 (08076988509)",
    email: "yandri918@gmail.com",
    linkedin: "https://www.linkedin.com/in/andriyanto",
    linkedinDisplay: "linkedin.com/in/andriyanto",
    github: "https://github.com/yandri918",
    githubDisplay: "github.com/yandri918",
    address: "Aichi ken tahara shi nagasawa chou nagasawa 14, Japan",
    websites: [
      { name: "AgriSensa Official", url: "https://agrisensaofficial.com", type: "Flagship Platform" },
      { name: "Personal Streamlit Hub", url: "https://mirai39.streamlit.app/", type: "Streamlit App" },
      { name: "Agritech Portfolio", url: "https://agritech-portofolio.vercel.app/", type: "Portfolio" },
      { name: "Latest Portfolio / Blog", url: "https://porto-terbaru.vercel.app/", type: "Portfolio" }
    ]
  },
  status: {
    openTo: [
      "AI Engineer",
      "Agricultural Data Scientist",
      "Agritech Engineer",
      "Machine Learning / MLOps Engineer",
      "LLM / Generative AI Engineer",
      "Marketing Analytics Specialist"
    ],
    targetDomains: ["Agritech & Environmental Intelligence", "Applied Machine Learning", "Marketing Analytics", "ClimateTech", "AI Products"],
    availability: "Based in Aichi, Japan | Open to Relocation & Visa Sponsorship (Global / Remote / Hybrid / On-site)"
  },
  summary: {
    bio: "Agricultural Data Scientist & Agritech / AI Engineer with proven experience developing AI-driven forecasting, anomaly detection, marketing analytics (MMM, CLV, Churn), and geospatial intelligence systems. Lead Developer of Agrisensa platform with 1,000+ active users and 99.5% uptime. Strong background in environmental data modeling, production analytics, and applied machine learning with Japanese 5S operational rigor.",
    philosophy: "I don't see AI as just a model-building exercise. My goal is to bridge the gap between AI research, robust software engineering, and real-world domain operations—turning models into reliable, high-uptime products that drive measurable business and environmental value."
  },
  keyMetrics: [
    { value: "1,000+", label: "Active Users (AgriSensa)", icon: "users" },
    { value: "99.5%", label: "Platform Uptime", icon: "activity" },
    { value: "40%", label: "Marketing ROI Boost", icon: "trending-up" },
    { value: "85%", label: "Churn Model Accuracy", icon: "target" },
    { value: "30%", label: "Efficiency Gain (Mining/GIS)", icon: "zap" },
    { value: "11+ Yrs", label: "Agriculture Domain", icon: "sprout" }
  ],
  engineeringApproach: [
    {
      phase: "Data & Environmental Feeds",
      icon: "database",
      desc: "ETL pipelines, big data modeling with BigQuery & PostgreSQL, geospatial integration with GIS & Folium."
    },
    {
      phase: "Modeling & Optimization",
      icon: "cpu",
      desc: "Time Series (Prophet, ARIMA), ML/DL (PyTorch, TensorFlow, Scikitlearn), Multi-objective Optimization (Pymoo), Bayesian MMM."
    },
    {
      phase: "AI Systems & GenAI",
      icon: "bot",
      desc: "LLM integration (Google Gemini, LangChain), RAG, Roboflow Computer Vision, and multimodal AI orchestration."
    },
    {
      phase: "MLOps & CI/CD",
      icon: "git-merge",
      desc: "Containerization (Docker, Kubernetes), Automated Retraining Pipelines, GitHub Actions, and SHAP Explainability."
    },
    {
      phase: "Product Delivery",
      icon: "layers",
      desc: "Modular FastAPI microservices, Streamlit interactive dashboards, Vercel edge deployment, and Japanese 5S standard."
    }
  ],
  flagshipProject: {
    name: "AgriSensa Intelligence Platform",
    tagline: "AI-Powered Agriculture Intelligence & Geospatial Analytics Platform",
    overview: "Production-grade multimodule agricultural intelligence platform supporting 1,000+ active users with 99.5% uptime. Built around real-world agricultural challenges across Indonesia and APAC, combining Google Gemini LLM assistance, Roboflow Computer Vision for plant disease diagnosis, Bayesian & time-series price/yield forecasting, real-time weather feeds, and interactive GIS spatial maps.",
    stats: {
      users: "1,000+ Active Users",
      uptime: "99.5% Uptime SLA",
      modules: "25+ Production Modules",
      stack: "Python, GCP, BigQuery, Gemini, Streamlit, Docker, Folium"
    },
    architecture: [
      {
        layer: "Generative AI Assistant",
        tech: "Google Gemini LLM & LangChain",
        desc: "Multimodal agronomic chat, context-aware pest mitigation recommendations, and conversational advisory."
      },
      {
        layer: "Computer Vision Pipeline",
        tech: "Roboflow & PyTorch",
        desc: "Automated leaf health diagnosis, crop pathology classification, and disease bounding box detection."
      },
      {
        layer: "Predictive Modeling & Forecasting",
        tech: "Prophet, ARIMA, Scikit-Learn, Bayesian Methods & SHAP",
        desc: "Commodity price trend forecasting, harvest yield estimation, and explainable feature attribution."
      },
      {
        layer: "Geo-Spatial & Environmental Intelligence",
        tech: "GIS, Folium, BigQuery & OpenWeather APIs",
        desc: "Interactive spatial maps, soil moisture index monitoring, microclimate analytics, and regional zoning."
      },
      {
        layer: "Backend & Cloud Microservices",
        tech: "FastAPI, Docker, Streamlit & Vercel",
        desc: "High-throughput modular API endpoints, real-time retraining pipeline, and scalable cloud deployment."
      }
    ]
  },
  featuredProjects: [
    {
      title: "AgriSensa Intelligence Platform",
      period: "2024 - Present",
      tech: ["Python", "GCP", "BigQuery", "Gemini LLM", "Roboflow", "Streamlit", "Folium"],
      description: "Built agricultural intelligence platform with 25+ AI modules for forecasting, anomaly detection, and production optimization. Achieved 99.5% uptime and supported 1,000+ active users.",
      highlights: ["1,000+ Active Users", "99.5% Uptime", "Real-time GIS & Weather Feeds"]
    },
    {
      title: "Marketing Mix Modeling (MMM) & Customer Analytics Suite",
      period: "2024 - 2025",
      tech: ["Bayesian MMM", "GA4", "Prophet", "Pymoo", "PostgreSQL", "Python"],
      description: "Developed Bayesian Marketing Mix Modeling with adstock and saturation for optimal budget allocation. Implemented GA4 event tracking, multi-touch attribution (MTA), customer lifetime value (CLV) modeling, and churn prediction.",
      highlights: ["85% Churn Prediction Accuracy", "Bayesian Adstock & Saturation", "Multi-Touch Attribution"]
    },
    {
      title: "AI Forecasting & Multi-Objective Optimization System",
      period: "2024 - 2025",
      tech: ["Prophet", "ARIMA", "TensorFlow", "Pymoo", "REST APIs", "Docker"],
      description: "Built forecasting models for demand prediction, trend analysis, and multi-objective operational optimization using Pymoo with automated real-time retraining pipelines.",
      highlights: ["Multi-Objective Optimization (Pymoo)", "Real-time Retraining Pipeline", "REST API Microservices"]
    },
    {
      title: "Marketing Analytics Platform",
      period: "2023 - 2024",
      tech: ["Python", "Scikit-Learn", "Pandas", "Plotly", "Streamlit"],
      description: "Built unified marketing dashboard integrating MMM, customer segmentation, and predictive ROI analytics. Automated reporting workflows across multiple campaign channels.",
      highlights: ["40% ROI Improvement via ML Targeting", "60% Reduction in Analysis Time", "Automated Reporting"]
    },
    {
      title: "Resource Optimization & Geospatial Platform",
      period: "2024 - 2025",
      tech: ["GIS", "Folium", "Plotly", "PostgreSQL", "Python"],
      description: "Built optimization and predictive maintenance modules for complex operations. Developed geospatial dashboards for operational monitoring and route efficiency.",
      highlights: ["30% Operational Efficiency Improvement", "Geospatial Monitoring Dashboard", "Predictive Maintenance"]
    }
  ],
  skills: {
    top: [
      "Python", "PyTorch", "TensorFlow", "Prophet", "ARIMA", "Bayesian MMM",
      "Pymoo Optimization", "FastAPI", "Docker", "Kubernetes", "Google Gemini", 
      "LangChain", "Vector DB / RAG", "Roboflow CV", "BigQuery", "PostgreSQL", 
      "GIS & Folium", "Streamlit", "Japanese 5S Methodology"
    ],
    categories: [
      {
        title: "Agritech & Environmental Intelligence",
        icon: "sprout",
        items: [
          "Crop Yield & Price Forecasting", "Anomaly Detection", "GIS & Geospatial Analysis (Folium)",
          "Production Optimization", "Environmental Data Modeling", "Precision Agriculture", "Organic Farming"
        ]
      },
      {
        title: "Applied Machine Learning & Optimization",
        icon: "brain",
        items: [
          "Time Series (Prophet, ARIMA)", "PyTorch & TensorFlow", "Scikit-learn", 
          "Multi-Objective Optimization (Pymoo)", "Computer Vision (Roboflow)", "SHAP (Explainable AI)", "Bayesian Methods"
        ]
      },
      {
        title: "LLM & Generative AI",
        icon: "sparkles",
        items: [
          "Google Gemini API", "LangChain Orchestration", "RAG Systems", "Vector Databases", "Prompt Engineering", "Multimodal Advisory"
        ]
      },
      {
        title: "Marketing Analytics & Growth (Supporting)",
        icon: "trending-up",
        items: [
          "Bayesian MMM (Adstock & Saturation)", "Customer Lifetime Value (CLV)", "Churn Prediction (85% Accuracy)",
          "GA4 Tracking & Funnel Analysis", "Multi-Touch Attribution (MTA)", "Customer Segmentation"
        ]
      },
      {
        title: "Data Engineering & Cloud Infrastructure",
        icon: "server",
        items: [
          "BigQuery (GCP)", "PostgreSQL", "ETL Pipelines", "Docker & Kubernetes", 
          "FastAPI & Flask REST APIs", "GitHub Actions (CI/CD)", "Vercel & Streamlit Cloud"
        ]
      },
      {
        title: "Operational Excellence & Japanese Standards",
        icon: "award",
        items: [
          "Japanese 5S Methodology", "Kaizen & Operational Standardization", "Data-Driven Management", "Cross-Cultural Communication (JLPT N3)"
        ]
      }
    ]
  },
  languages: [
    { name: "Indonesian", level: "Native / Mother Tongue" },
    { name: "English", level: "Professional Working Proficiency (Voxy Certified)" },
    { name: "Japanese", level: "Working Proficiency (JLPT N3 Certified & 3-Year Japan Trainee / Resident)" }
  ],
  experience: [
    {
      role: "Agriculture Operations Specialist",
      company: "Yamasa no Niwa / Yamasa Japan",
      period: "2022 - 2023 (1 tahun)",
      location: "Shizuoka, Japan",
      badge: "Japan / 5S Excellence",
      country: "JP",
      impact: "Enhanced operational efficiency and crop quality consistency.",
      highlights: [
        "Applied data-driven approaches and Japanese 5S methodology to optimize landscape operations.",
        "Improved crop quality consistency and standardized production processes in Japanese agricultural environment."
      ]
    },
    {
      role: "Customer Analytics & Operations Specialist (Supervisor)",
      company: "Tokopedia Mitra — PT Impact Power Mandiri",
      period: "2021 - 2022 (1 tahun 5 bulan)",
      location: "Indonesia",
      badge: "Growth & Analytics",
      country: "ID",
      impact: "Achieved 100% project targets ahead of schedule; reduced operational errors.",
      highlights: [
        "Supervised merchant onboarding and activation across assigned territories.",
        "Monitored activation rate, retention, funnel progression, and transaction metrics.",
        "Identified onboarding bottlenecks and escalated issues with structured evidence.",
        "Achieved 100% project targets ahead of schedule and improved merchant activation by identifying funnel drop-off points."
      ]
    },
    {
      role: "Digital Services & Customer Analytics Specialist",
      company: "GrabKios Indonesia — PT Kudo Teknologi Indonesia",
      period: "2018 - 2020 (2 tahun)",
      location: "Indonesia",
      badge: "Behavioral Analytics",
      country: "ID",
      impact: "Improved agent activation & retention; surfaced high-frequency friction clusters.",
      highlights: [
        "Collected behavioral data on agent onboarding, transactions, and product adoption.",
        "Identified friction points and created evidence-based hypotheses for root causes.",
        "Monitored campaign performance and adoption metrics at field level with structured interviews.",
        "Surfaced high-frequency operational clusters that directly improved onboarding flows and support."
      ]
    },
    {
      role: "Agriculture Program Coordinator",
      company: "PT 8Villages Indonesia",
      period: "2017 - 2018 (1 tahun)",
      location: "Indonesia",
      badge: "Digital Agriculture",
      country: "ID",
      impact: "Improved farmer productivity and strengthened data-driven decision-making.",
      highlights: [
        "Led digital agriculture initiatives and trained farmers on mobile technology adoption.",
        "Managed agronomic data collection and field operations for a 2-hectare chili project.",
        "Acted as liaison between institutional investors and farmer groups."
      ]
    },
    {
      role: "Agriculture Instructor & Organic Supervisor",
      company: "Kodim Pesisir Selatan",
      period: "2015 - Present (11 tahun)",
      location: "Sumatera Barat, Indonesia",
      badge: "Instructor & Sustainable Farming",
      country: "ID",
      impact: "Increased regional adoption of low-cost, sustainable organic farming practices.",
      highlights: [
        "Delivered organic farming training for military personnel and local farming communities.",
        "Promoted sustainable cultivation techniques and certified organic fertilizer production pipelines."
      ]
    },
    {
      role: "Technical Trainee / Intern",
      company: "PT Fujikikou / Fujikikou",
      period: "2009 - 2012 (3 tahun)",
      location: "Shizuoka, Japan",
      badge: "Japan / Manufacturing & 5S",
      country: "JP",
      impact: "Applied 5S principles and Japanese precision work discipline in production environments.",
      highlights: [
        "Completed 3-year intensive technical training in industrial manufacturing and machine maintenance in Shizuoka, Japan.",
        "Mastered 5S methodology, quality inspection standards, and Japanese manufacturing discipline."
      ]
    }
  ],
  education: [
    {
      institution: "UTEL University, Mexico",
      degree: "Bachelor of Science in Computer Engineering",
      period: "2023 - Graduated April 2026",
      location: "International / Remote while based in Japan",
      details: "Focus on software architecture, computer systems, machine learning fundamentals, algorithm optimization, and distributed systems."
    },
    {
      institution: "Universitas Terbuka Indonesia",
      degree: "Bachelor of Economics (S.E.), Ekonomi Pembangunan",
      period: "2023 - Expected 2027 (In Progress)",
      location: "Indonesia / Distance Learning",
      details: "Focus on development economics, agricultural econometric modeling, market dynamics, and quantitative policy analytics."
    }
  ],
  certifications: [
    { name: "JLPT N3 (Japanese Language Proficiency Test)", issuer: "Japan Foundation / JEES", level: "Certified N3", icon: "languages" },
    { name: "Technical Training Certification - Japan (3 Years)", issuer: "JITCO / Fujikikou Japan", level: "Completed (3 Years)", icon: "award" },
    { name: "Organic Agriculture Instructor Certification", issuer: "Lembaga Sertifikasi Pertanian", level: "Certified Instructor", icon: "sprout" },
    { name: "Voxy English Proficiency Certificate", issuer: "Voxy", level: "Intermediate (Professional Working)", icon: "award" },
    { name: "Sertifikat Pemrograman PHP & MySQL Database", issuer: "Platform Terakreditasi", level: "Certified", icon: "code" },
    { name: "Sertifikat JavaScript & JQuery Dasar", issuer: "Platform Terakreditasi", level: "Certified", icon: "code" }
  ],
  presetPrompts: [
    "Ceritakan tentang dirimu dan profil keahlianmu.",
    "Jelaskan arsitektur AgriSensa AI dan metrik 1.000+ pengguna & 99.5% uptime.",
    "Bagaimana keahlianmu di bidang Marketing Analytics (Bayesian MMM, Churn, CLV)?",
    "Ceritakan pengalaman kerja di Jepang, sertifikasi JLPT N3, dan penerapan 5S.",
    "Bagaimana pengalamanmu dalam time series forecasting (Prophet, ARIMA) dan optimasi Pymoo?",
    "Apakah kamu bersedia untuk relokasi (Open to Relocation & Visa Sponsorship)?"
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PROFILE_DATA;
}
