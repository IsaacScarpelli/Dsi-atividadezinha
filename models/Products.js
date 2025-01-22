const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  nome: {type: String, required: true},
  tipo: {type: String, required: true},
  quantidade: {type: Number, required: true, min:0}
});

module.exports = mongoose.model('Products', productSchema);