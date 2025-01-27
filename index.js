require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const site = require('./site.js');

const app = express();

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

// Conectando ao MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.log("Erro ao conectar ao MongoDB:", err));

// Rota principal
app.get('/', (req, res) => {
  res.json({
    text: "testando!"
  });
});

// Rota para administrar o site (admin)
app.get('/admin/*', (req, res) => {
  res.send(site()); // Invocar a função site() para a resposta
});

// Rota da API de produtos
app.use("/api/products", productRoutes);

// Inicializar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
