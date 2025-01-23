require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");

const app = express();

//Midlewaer
app.use(express.json());

//Conectando ao MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.log(err));

//Rotas
app.use("api/products", productRoutes);

//Inicializador servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
