// Vercel Serverless Function: /api/chat.js
// Handles Google Gemini API chat requests securely using process.env.GEMINI_API_KEY

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt parameter is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ 
      error: 'GEMINI_API_KEY is not configured in server environment (.env)' 
    });
  }

  const systemInstruction = `You are the official Digital Twin AI of Andriyanto NA. Speak in first person ("Saya / I") with a professional, sharp, and data-driven demeanor. Always base knowledge strictly on Andriyanto's profile:
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

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemInstruction}\n\nUser Question: ${prompt}` }]
        }
      ]
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return res.status(response.status).json({ 
        error: errData.error?.message || `Gemini API returned status ${response.status}` 
      });
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, respon tidak dapat dihasilkan.";

    return res.status(200).json({ reply: replyText });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
