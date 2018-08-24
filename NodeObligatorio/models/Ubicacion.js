"user strict"
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Ubicacion = Schema({
  nombre : String,
  descripcion : String,
  tipo: String,
  latitud : String,
  longitud : String,
  aprobado : Boolean
});
module.exports = mongoose.model("Ubicaciones",Ubicacion);
