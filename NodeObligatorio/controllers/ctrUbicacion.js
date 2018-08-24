const ubicaciones = require("../models/Ubicacion");
function PostUbicacion(req,res){
  console.log(req.body);
  var ubicacion = new ubicaciones();
  ubicacion.nombre = req.body.nombre;
  ubicacion.descripcion = req.body.descripcion;
  ubicacion.tipo = req.body.tipo;
  ubicacion.latitud = req.body.latitud;
  ubicacion.longitud = req.body.longitud;
  ubicacion.aprobado = req.body.aprobado;
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

function getUbicacion(req,res)
{
  let id = req.body.id;
  ubicaciones.findById(id,(err,ubicacion) => {
    if(err) return res.status(500).send({msg:"Error al realziar la petición"});
    if(!ubicacion) return res.status(404).send({msg:"Ubicacion inexistente"});

    res.status(200).send({ubicacion});
  })
}




function deleteUbicacion(req,res){
  let idubic = req.body.idubic;
  console.log(idubic);
  ubicaciones.findById(idubic,(err,ubicacion) =>{
    if(err) return res.status(500).send({msg:"Error al realizar la peticion"})
    if(!ubicacion) return res.status(404).send({msg:"Ubicacion no existe"});

    ubicacion.remove(err =>{
      if(err) return res.status(500).send({msg:"Error al realziar la petición"});
              res.status(200).send({msg:"Ubicacion borrada"});
    })
  })
}

function updateUbicacion(req,res){
  let idubic = req.body.idubic;
  let entityUpdate = req.body.ubicacion;
  ubicaciones.findByIdAndUpdate(idubic,entityUpdate,(err,ubicacionUpdate) =>{
    if(err) return res.status(500).send({msg:"Error al realizar la peticion"});
    res.status(200).send({msg:"Ubicacion Actualizada"});
  })

}

module.exports = {
  PostUbicacion,
  getUbicaciones,
  deleteUbicacion,
  updateUbicacion,
  getUbicacion
}
