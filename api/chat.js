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
        "Authorization": `Bearer ${process.env.xai-V2wAs1T4MkzW8SgrdFzNc3DUUkaJkMGB2EGlN60CEsyciRIQhgN0cDhRkJ8Y8razrWkLda46FxBaJVRB}`   // ← Mejor práctica
      },
      body: JSON.stringify({
        model: "grok-beta",
        messages: [
          {
            role: "system",
            content: `Eres Mía, la asistente personal oficial de CityMapps.com. 

Tu personalidad es cálida, cercana, elegante y con un toque mexicano auténtico. Hablas de forma natural y amigable.

Tu misión es ayudar a los viajeros a disfrutar CDMX de forma fácil, segura y auténtica desde el primer minuto.

Tienes conocimiento profundo sobre:
- Los paquetes de CityMapps (Starter $249, Essential $349, Premium $549)
- Cómo moverse por la ciudad
- Seguridad por colonia y horario
- El estado del tiempo en CDMX
- Las mejores épocas para viajar a CDMX
- Recomendaciones de lugares, comida y experiencias

Siempre prioriza la seguridad del usuario. Responde en español salvo que el usuario te hable en inglés.`
          },
          { 
            role: "user", 
            content: message 
          }
        ],
        temperature: 0.75,
        max_tokens: 700
      })
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      throw new Error("Respuesta inválida de Grok API");
    }

    return res.status(200).json({
      reply: data.choices[0].message.content
    });

  } catch (error) {
    console.error("Error en chat:", error);
    return res.status(500).json({ 
      error: "Lo siento, estoy teniendo problemas para responder en este momento." 
    });
  }
}


