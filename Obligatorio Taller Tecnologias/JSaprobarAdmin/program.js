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
          tblBody.innerHTML+="<tr><td>"+ ubicaciones[i].nombre +"</td><td>"+ ubicaciones[i].descripcion +"</td><td>"+ ubicaciones[i].tipo +"</td><td><input type='button' value='Agregar' onclick='ConfirmarUbicacion("+ubicaciones[i]._id+")'/><input type='button' value='Borrar' onclick='BorrarUbicacion("+ubicaciones[i]._id+")'/></td></tr>";

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

}


function getUbicacion(id){
  $.ajax({
     type: "GET",
     url: "http://localhost:8060/api/getUbicacion",
     success: function(data){
       marker = null;
        var ubicacion = data.ubicacion;
}




function ConfirmarUbicacion(idubic){
  var ubicacion = {
    nombre : $("#txtNombre").val(),
    descripcion : $("#txtDescripcion").val(),
    tipo : $("#txtTipo").val(),
    latitud : $("#txtLat").val(),
    longitud : $("#txtLon").val(),
  }
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
initMap();
}
