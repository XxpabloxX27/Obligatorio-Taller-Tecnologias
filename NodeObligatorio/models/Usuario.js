"user strict"
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Usuario = Schema({
  nombre : String,
  apellido : String,
  mail: String,
  contraseña : String,
  tipo : String
});
module.exports = mongoose.model("Usuarios",Usuario);
