var ubicacion;


$(document).ready(function(){
    getUbicaciones();
});





function getUbicaciones()
{
  $.ajax({
     type: "GET",
     url: "http://localhost:8060/api/ubicacion",
     success: function(data){
       marker = null;
        var ubicaciones = data.ubicaciones;

        var tblBody = document.getElementById("tblBody");
        tblBody.innerHTML = "";
        for(var i = 0; i<ubicaciones.length; i++)
        {
          if(ubicaciones[i].aprobado == false)
          {
          tblBody.innerHTML+="<tr><td>"+ ubicaciones[i].nombre +"</td><td>"+ ubicaciones[i].descripcion +"</td><td>"+ ubicaciones[i].tipo +"</td><td><input type='button' value='Agregar' onclick='ConfirmarUbicacion(\""+ubicaciones[i]._id+"\")'/><input type='button' value='Borrar' onclick='BorrarUbicacion(\""+ubicaciones[i]._id+"\")'/></td></tr>";

        }
        }


     },
     error: function(data)
     {

     }
   })
}



function BorrarUbicacion(idubic){
  var id = {idubic:idubic}
  $.ajax({
  type:"DELETE",
  data:JSON.stringify(id),
  contentType:'application/json',
  url:"http://localhost:8060/api/wsDeleteUbicacion",
  success:function(data){
    alert("todo bien");
    getUbicaciones();
  },
  error:function(data){
alert("todo mal");
  }
})
getUbicaciones();
}


function getUbicacion(id)
{
  var location;
  $.ajax({
     type: "GET",
     url: "http://localhost:8060/api/ubicacion",
     success: function(data){
        var ubicaciones = data.ubicaciones;
        for(var i = 0; i<ubicaciones.length; i++)
        {
          if(ubicaciones[i]._id == id){
            location = ubicaciones[i];
          }
        }
     },
     error: function(data)
     {

     }
   })
   return location
}





function ConfirmarUbicacion(idubic){
  var location;
  $.ajax({
     type: "GET",
     url: "http://localhost:8060/api/ubicacion",
     success: function(data){
        var ubicaciones = data.ubicaciones;
        for(var i = 0; i<ubicaciones.length; i++)
        {
          if(ubicaciones[i]._id == idubic){
            location = ubicaciones[i];
          }
        }
        var ubicacion = location;
        ubicacion.aprobado = true;
        var ubic = {
          ubicacion : ubicacion,
          idubic : idubic
        }
        $.ajax({
          type:"PUT",
          data:JSON.stringify(ubic),
          contentType:'application/json',
          url:"http://localhost:8060/api/wsUpdateUbicacion",
          success:function(data){
            alert("todo bien");
            getUbicaciones();
          },
          error:function(data){
            alert("todo mal");
          }
        })
     },
     error: function(data)
     {

     }
   })
   getUbicaciones();
 }
