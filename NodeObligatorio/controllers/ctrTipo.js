const tipos = require("../models/Tipo");
function PostTipo(req,res){
  console.log(req.body);
  var tipo = new tipos();
  tipo.nombre = req.body.nombre;
  tipo.descripcion = req.body.descripcion;
  tipo.save((err,tipoIngresado)=>{
    if(err){
      res.status(500).send({msg:"Error al guardar"});
    }
    res.status(200).send({tipoIngresado});
  })
}

function getTipos(req,res)
{
  tipos.find({}, (err, tipos) => {

      if(err) return res.status(500).send({msg:"Error al realziar la petición"});
      if(!tipos) return res.status(404).send({msg:"tipos inexistente"});

      res.status(200).send({tipos});
  })
}

function getTipo(req,res)
{
  console.log(req.body);
  console.log(req.body.id);
  let id = req.body.id;
  tipos.findById(id,(err,tipo) => {
    if(err) return res.status(500).send({msg:"Error al realziar la petición"});
    if(!tipo) return res.status(404).send({msg:"Tipo inexistente"});

    res.status(200).send({tipo});
  })
}




function deleteTipo(req,res){
  let idtipo = req.body.idtipo;
  console.log(idtipo);
  tipos.findById(idtipo,(err,tipo) =>{
    if(err) return res.status(500).send({msg:"Error al realizar la peticion"})
    if(!tipo) return res.status(404).send({msg:"Tipo no existe"});

    tipo.remove(err =>{
      if(err) return res.status(500).send({msg:"Error al realziar la petición"});
              res.status(200).send({msg:"Tipo borrado"});
    })
  })
}

function updateTipo(req,res){
  let idtipo = req.body.idtipo;
  let entityUpdate = req.body.tipo;
  tipos.findByIdAndUpdate(idtipo,entityUpdate,(err,tipoUpdate) =>{
    if(err) return res.status(500).send({msg:"Error al realizar la peticion"});
    res.status(200).send({msg:"Tipo Actualizado"});
  })

}

module.exports = {
  PostTipo,
  getTipo,
  getTipos,
  updateTipo,
  deleteTipo
}
