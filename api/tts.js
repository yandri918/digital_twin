// Vercel Serverless Function: /api/tts.js
// Handles ElevenLabs Text-to-Speech requests securely

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text, voiceId, modelId } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text parameter is required' });
  }

  const apiKey = process.env.ELEVENLABS_API_KEY || 'sk_cfa49f35aa0a32013355722aef5ff5756f0168e899447c52';
  const selectedVoiceId = voiceId || process.env.ELEVENLABS_VOICE_ID || 'pNInz6obpgDQGcFmaJgB'; // Adam / Male voice
  const selectedModelId = modelId || process.env.ELEVENLABS_MODEL_ID || 'eleven_multilingual_v2';

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${selectedVoiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'xi-api-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text,
        model_id: selectedModelId,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const audioBuffer = await response.arrayBuffer();
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.send(Buffer.from(audioBuffer));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
