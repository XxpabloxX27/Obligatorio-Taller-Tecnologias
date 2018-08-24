$(document).ready(function(){


    getUsuarios();

});


function AgregarUsuario(){
    var nombre = $("#txtNombre").val();
    var apellido = $("#txtApellido").val();
    var mail = $("#txtMail").val();
    var contraseña = $("#txtContraseña").val();
    var usuario ={
      nombre : nombre,
      apellido:apellido,
      mail : mail,
      contraseña : contraseña

    }

    $.ajax({
      type:"POST",
      dataType: "json",
      data: JSON.stringify(usuario),
      contentType: 'application/json',
      url:"http://localhost:8060/api/wsAgregarUsuario",
      success:function(data){
        alert("bien");

        getUsuarios();
      },
      error:function(data){
        alert("todo mal");
      }
    });
  }


  function getUsuarios()
  {
    $.ajax({
       type: "GET",
       url: "http://localhost:8060/api/wsUsuarios",
       success: function(data){

          var usuarios = data.usuarios;

          var tblBody = document.getElementById("tblBody");
          tblBody.innerHTML = "";
          for(var i = 0; i<usuarios.length; i++)
          {

            tblBody.innerHTML+="<tr ><td>"+ usuarios[i].nombre +"</td><td>"+ usuarios[i].mail +"</td></tr>";

          }


       },
       error: function(data)
       {

       }
     })
  }
