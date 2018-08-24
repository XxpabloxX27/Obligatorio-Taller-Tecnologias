'use strict'
const express = require("express");
const api = express.Router();
//const ctrPersona = require("./controllers/ctrPersona");
const ctrUbicacion = require("./controllers/ctrUbicacion");
const ctrUsuario = require("./controllers/ctrUsuario");

api.post("/wsAgregarUbicacion",ctrUbicacion.PostUbicacion);
api.get("/ubicacion", ctrUbicacion.getUbicaciones);/*
api.get("/persona/:idPersona", ctrPersona.getPersona);
api.post("/persona",ctrPersona.addPersona);
api.put("/persona/:idPersona", ctrPersona.updatePersona);*/
api.delete("/wsDeleteUbicacion",ctrUbicacion.deleteUbicacion);
api.put("/wsUpdateUbicacion",ctrUbicacion.updateUbicacion);
api.post("/wsAgregarUsuario",ctrUsuario.postUsuario);
api.get("/wsUsuarios",ctrUsuario.getUsuarios);
api.delete("/wsDeleteUsuario",ctrUsuario.deleteUsuario);

module.exports = api;
