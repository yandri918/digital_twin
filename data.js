// Knowledge Graph & Dataset Extracted from Profile.pdf, CV, and AgriSensa AI Production README
const PROFILE_DATA = {
  name: "Andriyanto NA",
  headline: "AI & MLOps Engineer | Agricultural Data Scientist | Agritech Full-Stack Developer",
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
      { 
        name: "AgriSensa AI (Official Enterprise Platform)", 
        url: "https://agrisensaofficial.com", 
        type: "Enterprise Production (Next.js 16 + Railway Cloud + DeepSeek-V3)",
        mirror: "https://agrisensawebapp.vercel.app"
      },
      { 
        name: "AgriSensa Streamlit Hub", 
        url: "https://mirai39.streamlit.app/", 
        type: "Interactive Streamlit App" 
      },
      { 
        name: "Agritech Portfolio", 
        url: "https://agritech-portofolio.vercel.app/", 
        type: "Portfolio" 
      },
      { 
        name: "Latest Portfolio / Blog", 
        url: "https://porto-terbaru.vercel.app/", 
        type: "Portfolio" 
      }
    ]
  },
  status: {
    openTo: [
      "AI Engineer",
      "MLOps / AI Systems Engineer",
      "Agricultural Data Scientist",
      "Agritech Engineer",
      "Marketing Analytics Specialist",
      "Full-Stack AI Software Engineer"
    ],
    targetDomains: ["Agritech & Environmental Intelligence", "Applied Machine Learning & MLOps", "Marketing Analytics", "ClimateTech", "Enterprise AI Products"],
    availability: "Based in Aichi, Japan | Open to Relocation & Visa Sponsorship (Global / Remote / Hybrid / On-site)"
  },
  summary: {
    bio: "AI Engineer & Agricultural Data Scientist with proven track record of designing and deploying full-stack production AI systems. Creator and Lead Developer of AgriSensa AI (agrisensaofficial.com), an enterprise precision agriculture ecosystem built on Next.js 16, Railway Cloud microservices (FastAPI), n8n workflow automation (14 workflows), DeepSeek-V3 reasoning, and 10,000-run Monte Carlo risk simulations.",
    philosophy: "I bridge the gap between cutting-edge AI research, production-grade cloud software engineering, and real-world domain operations. From high-throughput APIs to field-tested agronomic models with Japanese 5S precision, I build reliable, scalable AI products that deliver measurable business and environmental value."
  },
  keyMetrics: [
    { value: "1,000+", label: "Active Stakeholders", icon: "users" },
    { value: "99.5%", label: "Cloud SLA Uptime", icon: "activity" },
    { value: "10,000", label: "Monte Carlo Runs", icon: "trending-up" },
    { value: "14", label: "n8n Auto Workflows", icon: "git-merge" },
    { value: "40%", label: "Marketing ROI Boost", icon: "target" },
    { value: "11+ Yrs", label: "Agriculture Domain", icon: "sprout" }
  ],
  engineeringApproach: [
    {
      phase: "Data & Environmental Ingestion",
      icon: "database",
      desc: "ETL pipelines, PostgreSQL + pgvector, BigQuery, and real-time GIS microclimate feeds."
    },
    {
      phase: "AI Reasoning & MLOps Modeling",
      icon: "cpu",
      desc: "DeepSeek-V3 reasoning engine, 10,000-run Monte Carlo risk simulations, SHAP explainable ML, and Roboflow CV."
    },
    {
      phase: "Workflow Orchestration",
      icon: "git-merge",
      desc: "14 automated production workflows on n8n for data sync, document parsing, and agentic task execution."
    },
    {
      phase: "Cloud Microservices",
      icon: "server",
      desc: "Distributed FastAPI microservices on Railway Cloud (Port 8000 MLOps & Port 8001 AI Engine) with Docker."
    },
    {
      phase: "Frontend & Edge Delivery",
      icon: "layers",
      desc: "Next.js 16 + Tailwind CSS on Vercel Edge with Japanese 5S operational precision and mobile-first drawer UX."
    }
  ],
  flagshipProject: {
    name: "AgriSensa AI — Unified Smart Agriculture & MLOps Ecosystem (v2.5)",
    tagline: "Enterprise Precision Agriculture & MLOps Intelligence Platform",
    url: "https://agrisensaofficial.com",
    streamlitUrl: "https://mirai39.streamlit.app/",
    overview: "Production-grade enterprise AI ecosystem deployed across Vercel Edge and Railway Cloud. Integrates Next.js 16, FastAPI microservices, n8n orchestrator (14 workflows), DeepSeek-V3 reasoning engine, 10,000-run Monte Carlo risk engine, and scientific agronomy databases with DOI-certified literature.",
    services: [
      { name: "Website Resmi (Domain Utama)", platform: "Vercel Edge", url: "https://agrisensaofficial.com", status: "Live Production" },
      { name: "Frontend Web App Mirror", platform: "Vercel Edge", url: "https://agrisensawebapp.vercel.app", status: "Live Mirror" },
      { name: "AI Reasoning & MCP Engine", platform: "Railway Cloud", url: "https://ai-engine-production-cc99.up.railway.app/docs", status: "Online FastAPI (Port 8001)" },
      { name: "MLOps Inference API", platform: "Railway Cloud", url: "https://mlops-api-production-afaf.up.railway.app/docs", status: "Online FastAPI (Port 8000)" },
      { name: "n8n Workflow Orchestrator", platform: "Railway Cloud", url: "https://n8n-production-999a.up.railway.app", status: "14 Active Workflows" },
      { name: "Streamlit Platform Hub", platform: "Streamlit Cloud", url: "https://mirai39.streamlit.app/", status: "Online Interactive Hub" }
    ],
    architecture: [
      {
        layer: "Frontend Edge Experience",
        tech: "Next.js 16, TypeScript, Tailwind CSS & Recharts",
        desc: "Interactive mobile-first dashboard (agrisensaofficial.com) with sticky bottom navigation and responsive drawer menu."
      },
      {
        layer: "AI Reasoning & MCP Engine",
        tech: "FastAPI, DeepSeek-V3 & Internal Research Base",
        desc: "Scientific SOP generator with DOI journal citations, ESG Scope 1-3 carbon modeling, and autonomous advisory (Port 8001)."
      },
      {
        layer: "MLOps Inference & Soil Diagnostics",
        tech: "FastAPI, Scikit-Learn, Roboflow & SHAP",
        desc: "Multi-parameter soil radar chart diagnostics (N, P, K, pH, rainfall) and explainable AI weight attributions (Port 8000)."
      },
      {
        layer: "Stochastic Risk Simulation",
        tech: "Monte Carlo Engine (10,000 Runs) & Box-Muller",
        desc: "Simulates crop loss, price volatility, net profit probability, and 95% Value at Risk (VaR)."
      },
      {
        layer: "Workflow Orchestration & Database",
        tech: "n8n (14 Workflows), PostgreSQL + pgvector",
        desc: "Automates document parsing, real-time data ingestion, and vector embeddings in private Railway VPC."
      }
    ],
    modules: [
      { code: "/sop", name: "Generator SOP Budidaya", desc: "GAP agronomy standards, 6-phase Gantt timeline, M-48 botanical pesticides, and PDF export with DOI citations." },
      { code: "/fertilizer", name: "Laboratorium Pupuk & HET", desc: "3-tier pricing (Subsidized HET, Commercial, Custom), Nutrient-to-Weight solver, and C/N organic POC formulas." },
      { code: "/analyst", name: "Data Analyst & ESG Karbon", desc: "Autonomous agronomy advisor and Scope 1-3 GHG (N2O and CO2e) carbon footprint calculator." },
      { code: "/documents", name: "Perpustakaan Riset & Parser", desc: "Document intelligence engine for PDF, DOCX, XLSX, and CSV parsing with 200+ pages research library." },
      { code: "/monte-carlo", name: "10.000 Runs Monte Carlo", desc: "Stochastic risk simulation for weather volatility, crop failure, profit probability, and VaR 95%." },
      { code: "/mlops", name: "Laboratorium MLOps", desc: "Multi-parameter soil radar analysis and SHAP feature weighting." },
      { code: "/rab", name: "Generator RAB Baku", desc: "Scalable agricultural cost estimation per hectare with PDF budget table export." },
      { code: "/market", name: "Intelijen Pasar ID & JP", desc: "Daily commodity price tracker across Indonesia (PIKJ, Caringin) and Japan (Niigata, Nagano)." },
      { code: "/chat", name: "Asisten AI DeepSeek-V3", desc: "Tropical agronomy context-injected AI chatbot with structured markdown rendering." }
    ]
  },
  featuredProjects: [
    {
      title: "AgriSensa AI — Enterprise Unified Smart Agriculture & MLOps Ecosystem",
      period: "2024 - Present (Production v2.5)",
      tech: ["Next.js 16", "FastAPI", "DeepSeek-V3", "Railway Cloud", "n8n (14 Workflows)", "PostgreSQL", "Monte Carlo (10k Runs)"],
      description: "Full-stack enterprise precision agriculture platform hosted on paid cloud infrastructure (Vercel Edge + Railway Cloud). Combines AI reasoning, scientific SOP generation, fertilizer HET calculators, 10,000-run Monte Carlo risk simulations, and MLOps APIs.",
      highlights: ["Live at agrisensaofficial.com", "14 n8n Automated Workflows", "Railway Cloud FastAPI Microservices", "99.5% Cloud SLA Uptime"]
    },
    {
      title: "AgriSensa Streamlit Platform",
      period: "2024 - Present",
      tech: ["Python", "Streamlit", "Plotly", "Pandas", "Scikit-Learn", "Folium"],
      description: "Interactive data-centric agriculture hub providing rapid prototyping, time-series visualizations, and agronomic modeling tools.",
      highlights: ["Live at mirai39.streamlit.app", "1,000+ Active Users", "Interactive GIS Spatial Maps"]
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
      title: "Resource Optimization & Geospatial Platform",
      period: "2024 - 2025",
      tech: ["GIS", "Folium", "Plotly", "PostgreSQL", "Python"],
      description: "Built optimization and predictive maintenance modules for complex operations. Developed geospatial dashboards for operational monitoring and route efficiency.",
      highlights: ["30% Operational Efficiency Improvement", "Geospatial Monitoring Dashboard", "Predictive Maintenance"]
    }
  ],
  skills: {
    top: [
      "Python", "Next.js 16", "FastAPI", "DeepSeek-V3", "n8n Orchestration", 
      "Docker", "Railway Cloud", "Vercel Edge", "PostgreSQL & pgvector", 
      "Prophet & ARIMA", "Pymoo Optimization", "Monte Carlo Simulations", 
      "Roboflow CV", "BigQuery", "GIS & Folium", "Streamlit", "Japanese 5S"
    ],
    categories: [
      {
        title: "AI & MLOps Engineering",
        icon: "cpu",
        items: [
          "FastAPI Microservices (Port 8000/8001)", "DeepSeek-V3 Reasoning", "SHAP Explainability", 
          "n8n Automation (14 Workflows)", "Docker Containerization", "Railway Cloud & Vercel Edge", "PostgreSQL + pgvector"
        ]
      },
      {
        title: "Precision Agritech & Risk Modeling",
        icon: "sprout",
        items: [
          "Monte Carlo Simulation (10,000 Runs)", "GAP Scientific SOP Generator", "Fertilizer HET & Nutrient Solver", 
          "ESG Carbon Footprint (Scope 1-3)", "GIS & Geospatial Analysis (Folium)", "PHT Resep M-48", "Organic Agriculture"
        ]
      },
      {
        title: "Applied Machine Learning & Optimization",
        icon: "brain",
        items: [
          "Time Series (Prophet, ARIMA)", "Multi-Objective Optimization (Pymoo)", "PyTorch & TensorFlow", 
          "Computer Vision (Roboflow)", "Bayesian Methods", "Scikit-Learn"
        ]
      },
      {
        title: "Marketing Analytics & Growth",
        icon: "trending-up",
        items: [
          "Bayesian MMM (Adstock & Saturation)", "Customer Lifetime Value (CLV)", "Churn Prediction (85% Accuracy)",
          "GA4 Event Tracking & Funnel Analysis", "Multi-Touch Attribution (MTA)"
        ]
      },
      {
        title: "Full-Stack Web & Delivery",
        icon: "layers",
        items: [
          "Next.js 16 (App Router)", "TypeScript", "Tailwind CSS", "Streamlit", "Recharts", "REST APIs", "Vercel Serverless"
        ]
      },
      {
        title: "Operational Rigor & Japanese Standards",
        icon: "award",
        items: [
          "Japanese 5S Methodology", "Kaizen Continuous Improvement", "Data-Driven Management", "JLPT N3 Certified"
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
      impact: "Enhanced operational efficiency and crop quality consistency using Japanese 5S standards.",
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
        "Achieved 100% project targets ahead of schedule and improved merchant activation."
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
        "Monitored campaign performance and adoption metrics at field level with structured interviews."
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
        "Managed agronomic data collection and field operations for a 2-hectare chili project."
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
    "Jelaskan ekosistem resmi AgriSensa AI di agrisensaofficial.com dan bedanya dengan Streamlit mirai39.",
    "Bagaimana arsitektur microservices Railway Cloud (FastAPI), n8n, dan Next.js 16 pada AgriSensa?",
    "Jelaskan simulasi risiko Monte Carlo (10.000 Runs) dan modul ESG Karbon Scope 1-3.",
    "Ceritakan tentang Marketing Mix Modeling (Bayesian MMM) dan akurasi Churn 85%.",
    "Ceritakan pengalaman kerja di Jepang, sertifikasi JLPT N3, dan penerapan 5S.",
    "Apakah kamu bersedia untuk relokasi (Open to Relocation & Visa Sponsorship)?"
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PROFILE_DATA;
}
