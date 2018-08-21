const ubicaciones = require("../models/Ubicacion");
function PostUbicacion(req,res){
  console.log(req.body);
  var ubicacion = new ubicaciones();
  ubicacion.nombre = req.body.nombre;
  ubicacion.descripcion = req.body.descripcion;
  ubicacion.tipo = req.body.tipo;
  ubicacion.latitud = req.body.latitud;
  ubicacion.longitud = req.body.longitud;
  ubicacion.save((err,ubicacionIngresada)=>{
    if(err){
      res.status(500).send({msg:"Error al guardar"});
    }
    res.status(200).send({ubicacionIngresada});
  })
}

function getUbicaciones(req,res)
{
  ubicaciones.find({}, (err, ubicaciones) => {

      if(err) return res.status(500).send({msg:"Error al realziar la petición"});
      if(!ubicaciones) return res.status(404).send({msg:"Ubicacion inexistente"});

      res.status(200).send({ubicaciones});
  })
}

function deleteUbicacion(req,res){
  let idubic = req.params.idubic;
  ubicaciones.findById(idbuic,(err,ubicacion) =>{
    if(err) return res.status(500).send({msg:"Error al realizar la peticion"})
    if(!ubicacion) return res.status(404).send({msg:"Ubicacion no existe"});

    ubicacion.remove(err =>{
      if(err) return res.status(500).send({msg:"Error al realziar la petición"});
              res.status(200).send({msg:"Ubicacion borrada"});
    })
  })
}

module.exports = {
  PostUbicacion,
  getUbicaciones,
  deleteUbicacion
}
