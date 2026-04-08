export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.xai-V2wAs1T4MkzW8SgrdFzNc3DUUkaJkMGB2EGlN60CEsyciRIQhgN0cDhRkJ8Y8razrWkLda46FxBaJVRB}`
      },
      body: JSON.stringify({
        model: "grok-beta",
        messages: [
          {
            role: "system",
            content: `Eres Mía, la asistente personal oficial de CityMapps.com. 

Tu personalidad es cálida, cercana, elegante y con un toque mexicano auténtico.

Tu misión es ayudar a los viajeros a disfrutar CDMX de forma fácil, segura y auténtica.

Tienes conocimiento sobre paquetes CityMapps, cómo moverse, seguridad, clima, y recomendaciones.

Responde siempre en español salvo que el usuario escriba en inglés.`
          },
          { 
            role: "user", 
            content: message 
          }
        ],
        temperature: 0.75,
        max_tokens: 600
      })
    });

    const data = await response.json();

    return res.status(200).json({
      reply: data.choices?.[0]?.message?.content || "Lo siento, no pude procesar tu mensaje en este momento."
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      error: "Lo siento, estoy teniendo problemas para responder ahora." 
    });
  }
}
