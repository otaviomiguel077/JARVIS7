require("dotenv").config();

const express = require("express");
const OpenAI = require("openai");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const client = new OpenAI();

app.post("/chat", async (req, res) => {
  try {
    const mensagem = req.body.mensagem;

    if (!mensagem) {
      return res.status(400).json({
        erro: "Mensagem não informada."
      });
    }

    const response = await client.responses.create({
      model: "gpt-5.5",
      instructions:
        "Você é JARVIS, um assistente pessoal inteligente, educado e prestativo. Responda em português do Brasil.",
      input: mensagem
    });

    res.json({
      resposta: response.output_text
    });

  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: erro.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`JARVIS servidor online na porta ${PORT}`);
});