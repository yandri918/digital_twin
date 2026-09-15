/**
 * Local Development Server for Andriyanto NA Digital Twin
 * Zero-dependency Node.js HTTP server that handles:
 * 1. Static file serving (HTML, CSS, JS, Images, JSON)
 * 2. Vercel Serverless Function mock for /api/chat (Google Gemini)
 * 3. Vercel Serverless Function mock for /api/tts (ElevenLabs)
 * 4. Automatic .env loading
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Load .env file
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split(/\r?\n/).forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...values] = trimmed.split('=');
        const val = values.join('=').trim().replace(/^["']|["']$/g, '');
        process.env[key.trim()] = val;
      }
    });
  }
}

loadEnv();

const PORT = process.env.PORT || 4173;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg'
};

const server = http.createServer(async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = parsedUrl.pathname;

  // 2. API Route: /api/chat (Google Gemini)
  if (pathname === '/api/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const data = JSON.parse(body || '{}');
        const prompt = data.prompt;
        const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

        if (!apiKey) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ 
            error: 'GEMINI_API_KEY belum diisi di file .env lokal!' 
          }));
          return;
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

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const geminiRes = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              role: 'user',
              parts: [{ text: `${systemInstruction}\n\nUser Question: ${prompt}` }]
            }]
          })
        });

        if (!geminiRes.ok) {
          const errData = await geminiRes.json().catch(() => ({}));
          res.writeHead(geminiRes.status, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: errData.error?.message || 'Gemini API call failed' }));
          return;
        }

        const resData = await geminiRes.json();
        const reply = resData.candidates?.[0]?.content?.parts?.[0]?.text || 'Maaf, respon tidak dapat dihasilkan.';
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reply }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // 3. API Route: /api/tts (ElevenLabs)
  if (pathname === '/api/tts' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const data = JSON.parse(body || '{}');
        const text = data.text;
        const apiKey = process.env.ELEVENLABS_API_KEY;
        const voiceId = process.env.ELEVENLABS_VOICE_ID || 'pNInz6obpgDQGcFmaJgB';
        const modelId = process.env.ELEVENLABS_MODEL_ID || 'eleven_multilingual_v2';

        if (!apiKey) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'ELEVENLABS_API_KEY belum diisi di .env' }));
          return;
        }

        const elRes = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
          method: 'POST',
          headers: {
            'xi-api-key': apiKey,
            'Content-Type': 'application/json',
            'Accept': 'audio/mpeg'
          },
          body: JSON.stringify({
            text: text,
            model_id: modelId,
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
              style: 0.2,
              use_speaker_boost: true
            }
          })
        });

        if (!elRes.ok) {
          const errData = await elRes.text().catch(() => '');
          res.writeHead(elRes.status, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: errData || 'ElevenLabs error' }));
          return;
        }

        const audioBuffer = await elRes.arrayBuffer();
        res.writeHead(200, {
          'Content-Type': 'audio/mpeg',
          'Content-Length': Buffer.byteLength(Buffer.from(audioBuffer))
        });
        res.end(Buffer.from(audioBuffer));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // 4. Static Files
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(__dirname, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      res.writeHead(200, { 
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`[Digital Twin Local Server] Running on http://localhost:${PORT}`);
  console.log(`- Gemini API status: ${process.env.GEMINI_API_KEY ? 'Configured ✅' : 'Missing in .env ⚠️'}`);
  console.log(`- ElevenLabs status: ${process.env.ELEVENLABS_API_KEY ? 'Configured ✅' : 'Missing in .env ⚠️'}`);
});
