$(document).ready(function(){
  sessionStorage.setItem("mail",null);
  sessionStorage.setItem("pass",null);
  sessionStorage.setItem("tipo",null);

});

function IniciarSesion(){
  $.ajax({
     type: "GET",
     url: "http://localhost:8060/api/wsUsuarios",
     success: function(data){

       var mail = $("#txtMail").val();
       var pass = $("#txtPass").val();
        var usuarios = data.usuarios;
        for(var i = 0; i<usuarios.length; i++)
        {
          if(usuarios[i].mail == mail && usuarios[i].contraseña  == pass)
          {

            sessionStorage.setItem("mail",mail);
            sessionStorage.setItem("pass",pass);
            sessionStorage.setItem("tipo",usuarios[i].tipo);
          }

        }

        if(sessionStorage.getItem("tipo") == "usuario"){
          window.open("UagregarUbicacion.html",'_self');

        }
        else if(sessionStorage.getItem("tipo") == "administrador"){
          window.open("index.html",'_self');
        }
     },
     error: function(data)
     {

     }
   })
}
