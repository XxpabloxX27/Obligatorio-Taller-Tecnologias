'use strict'
const express = require("express");
const api = express.Router();
//const ctrPersona = require("./controllers/ctrPersona");
const ctrUbicacion = require("./controllers/ctrUbicacion");

api.post("/wsAgregarUbicacion",ctrUbicacion.PostUbicacion);
api.get("/ubicacion", ctrUbicacion.getUbicaciones);/*
api.get("/persona/:idPersona", ctrPersona.getPersona);
api.post("/persona",ctrPersona.addPersona);
api.put("/persona/:idPersona", ctrPersona.updatePersona);*/
api.delete("/ubicacion/:idPersona",ctrPersona.deletePersona);

module.exports = api;
