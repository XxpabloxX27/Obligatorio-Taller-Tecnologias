"user strict"
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Tipo = Schema({
  nombre : String,
  descripcion : String
});
const Ubicacion = Schema({
  nombre : String,
  descripcion : String,
  tipo: String,
  latitud : String,
  longitud : String,
  aprobado : Boolean,
  valoracion : String,
  comentario : String,
  tipo : {type : Tipo}
});
module.exports = mongoose.model("Ubicaciones",Ubicacion);
