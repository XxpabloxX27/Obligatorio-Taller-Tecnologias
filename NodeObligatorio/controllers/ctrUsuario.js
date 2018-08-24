const usuarios = require("../models/Usuario");
function postUsuario(req,res){
  console.log(req.body);
  var usuario = new usuarios();
  usuario.nombre = req.body.nombre;
  usuario.apellido = req.body.apellido;
  usuario.mail = req.body.mail;
  usuario.contraseña = req.body.contraseña;
  usuario.save((err,usuarioIngresado)=>{
    if(err){
      res.status(500).send({msg:"Error al guardar"});
    }
    res.status(200).send({usuarioIngresado});
  })
}

function getUsuarios(req,res)
{
  usuarios.find({}, (err, usuarios) => {

      if(err) return res.status(500).send({msg:"Error al realziar la petición"});
      if(!usuarios) return res.status(404).send({msg:"Usuario inexistente"});

      res.status(200).send({usuarios});
  })
}

function deleteUsuario(req,res){
  let idusu = req.params.idusu;
  usuarios.findById(idusu,(err,ubicacion) =>{
    if(err) return res.status(500).send({msg:"Error al realizar la peticion"})
    if(!usuario) return res.status(404).send({msg:"Usuario no existe"});

    usuario.remove(err =>{
      if(err) return res.status(500).send({msg:"Error al realziar la petición"});
              res.status(200).send({msg:"Usuario borrada"});
    })
  })
}

module.exports = {
  postUsuario,
  getUsuarios,
  deleteUsuario
}
