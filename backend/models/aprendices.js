// models/aprendices.js
const mongoose = require('mongoose');

// Esquema para el código de verificación
const verificationSchema = new mongoose.Schema({
  code: { type: String },
  expiresAt: { type: Date }
}, { _id: false });

const aprendizSchema = new mongoose.Schema({
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  nombreUsuario: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  nombrePrograma: { type: String, required: true },
  numeroFicha: { type: String, required: true },
  password: { type: String, required: true },
  verificacion: { type: verificationSchema } // Documento anidado para verificación
});

const Aprendices = mongoose.model('Aprendices', aprendizSchema);

module.exports = Aprendices;
