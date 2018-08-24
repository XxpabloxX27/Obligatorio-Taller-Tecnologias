'use strict'
const express = require("express");
const api = express.Router();
const ctrTipo = require("./controllers/ctrTipo");
const ctrUbicacion = require("./controllers/ctrUbicacion");
const ctrUsuario = require("./controllers/ctrUsuario");

api.post("/wsAgregarUbicacion",ctrUbicacion.PostUbicacion);
api.get("/ubicacion", ctrUbicacion.getUbicaciones);
api.delete("/wsDeleteUbicacion",ctrUbicacion.deleteUbicacion);
api.put("/wsUpdateUbicacion",ctrUbicacion.updateUbicacion);
api.post("/wsAgregarUsuario",ctrUsuario.postUsuario);
api.get("/wsUsuarios",ctrUsuario.getUsuarios);
api.delete("/wsDeleteUsuario",ctrUsuario.deleteUsuario);
api.get("/wsUbicacion",ctrUbicacion.getUbicacion);
api.post("/wsAgregarTipo",ctrTipo.PostTipo);
api.get("/wsTipos",ctrTipo.getTipos);
api.get("/wsTipo",ctrTipo.getTipo);
api.delete("/wsDeleteTipo",ctrTipo.deleteTipo);
api.put("/wsUpdateTipo",ctrTipo.updateTipo);

module.exports = api;
