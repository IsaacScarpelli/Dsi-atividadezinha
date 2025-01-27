require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const path = require("path"); // Para trabalhar com caminhos de arquivos
const cors = require("cors");

const app = express();

// Middleware para servir arquivos estáticos, como o index.html
app.use(express.static(path.join(__dirname, "public"))); // Se seu HTML estiver na pasta 'public'

// Conectar ao MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.log("Erro ao conectar ao MongoDB:", err));

// Rotas da API
app.use("/api/products", productRoutes);

// Rota para servir o HTML (se não usar a pasta estática)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html")); // Ajuste o caminho para o seu arquivo HTML
});

// Inicializar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
