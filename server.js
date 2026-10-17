require("dotenv").config();

const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

app.post("/chat", async (req, res) => {
  try {
    const mensagem = req.body.mensagem;

    if (!mensagem) {
      return res.status(400).json({
        erro: "Mensagem não informada."
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: mensagem,
      config: {
        systemInstruction:
          "Você é JARVIS 7, um assistente pessoal inteligente, educado, prestativo e futurista. Responda sempre em português do Brasil. Seja objetivo, mas explique quando necessário. Seu nome é JARVIS."
      }
    });

    res.json({
      resposta: response.text
    });

  } catch (erro) {
    console.error("Erro Gemini:", erro);

    res.status(500).json({
      erro: erro.message
    });
  }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`JARVIS 7 conectado ao Gemini na porta ${PORT}`);
  console.log(`Acesse pelo celular: http://192.168.2.38:${PORT}`);
});
