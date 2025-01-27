  require("dotenv").config();
  const express = require("express");
  const mongoose = require("mongoose");
  const productRoutes = require("./routes/productRoutes");
  const site = require('./site.js');

  const app = express();

  // Middleware
  app.use(express.json());

  // Conectando ao MongoDB
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Conectado ao MongoDB"))
    .catch((err) => console.log("Erro ao conectar ao MongoDB:", err));

  // Rotas

  // Rota para a página do Admin
  app.get('/admin/:id', (req, res) => {
      const id = req.params.id;
      res.send(site(id)); // Chamando a função 'site' e passando o 'id'
  });

  // Rota de API de produtos
  app.use("/api/products", productRoutes);

  // Rota principal
  app.get('/', (req, res) => {
    res.json({
      text: "testando!"
    });
  });

  // Inicializar o servidor
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
 