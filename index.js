require("dotenv").config();

const OpenAI = require("openai");
const readline = require("readline");
const https = require("https");
const tls = require("tls");

const agent = new https.Agent({
  ca: tls.rootCertificates.join("\n"),
});

const client = new OpenAI({
  fetch: async (url, options) => {
    return fetch(url, {
      ...options,
      agent,
    });
  },
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function perguntar(texto) {
  if (texto.toLowerCase() === "sair") {
    rl.close();
    return;
  }

  try {
    const response = await client.responses.create({
      model: "gpt-5.5",
      instructions:
        "Você é JARVIS, um assistente pessoal inteligente, educado e prestativo. Responda em português do Brasil.",
      input: texto,
    });

    console.log("\nJARVIS:", response.output_text);
  } catch (erro) {
    console.error("\nErro:", erro.message);
  }

  rl.question("\nVocê: ", perguntar);
}

console.log("=================================");
console.log("          JARVIS ONLINE");
console.log("=================================");
console.log("Digite sua mensagem.");
console.log("Digite 'sair' para encerrar.\n");

rl.question("Você: ", perguntar);