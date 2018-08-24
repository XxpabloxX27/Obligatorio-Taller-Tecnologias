$(document).ready(function(){

    $('#characterLeft').text('250 characters left');
    $('#txtDescripcion').keydown(function () {
        var max = 250;
        var len = $(this).val().length;
        if (len >= max) {
            $('#characterLeft').text('No hay mas caracteres disponibles');
            $('#characterLeft').addClass('red');
            $('#btnAgregar').addClass('disabled');
        }
        else {
            var ch = max - len;
            $('#characterLeft').text(ch + ' caracteres disponibles');
            $('#btnAgregar').removeClass('disabled');
            $('#characterLeft').removeClass('red');
        }
            });
      getTipos();
      var tipo = sessionStorage.getItem("tipo");
      if(tipo == "usuario"  || tipo == "null" ){
        window.open("login.html",'_self');

      }


});

function AgregarTipo(){
  var nombre = $("#txtNombre").val();
  var descrip = $("#txtDescripcion").val();
  var tipo ={
    nombre : nombre,
    descripcion : descrip,
  }

$.ajax({
  type:"POST",
  dataType: "json",
  data: JSON.stringify(tipo),
  contentType: 'application/json',
  url:"http://localhost:8060/api/wsAgregarTipo",
  success:function(data){
    alert("bien");
    getTipos();
  },
  error:function(data){
    alert("todo mal");
  }
});
};

function getTipos()
{
  $.ajax({
     type: "GET",
     url: "http://localhost:8060/api/wsTipos",
     success: function(data){
       marker = null;
        var tipos = data.tipos;

        var tblBody = document.getElementById("tblBody");
        tblBody.innerHTML = "";
        for(var i = 0; i<tipos.length; i++)
        {

          tblBody.innerHTML+="<tr><td>"+ tipos[i].nombre +"</td><td>"+ tipos[i].descripcion +"</td><td><input type='button' value='Editar' onclick='EditarTipo(\""+tipos[i]._id+"\")'/><input type='button' value='Borrar' onclick='BorrarTipo(\""+tipos[i]._id+"\")'/></td></tr>";


        }


     },
     error: function(data)
     {

     }
   })
}

function BorrarTipo(idtipo){
  var id = {idtipo:idtipo}
  $.ajax({
  type:"DELETE",
  data:JSON.stringify(id),
  contentType:'application/json',
  url:"http://localhost:8060/api/wsDeleteTipo",
  success:function(data){
    alert("todo bien");
    getTipos();
  },
  error:function(data){
alert("todo mal");
  }
});
}

function EditarTipo(idtipo){
  var tipo = {
    nombre : $("#txtNombre").val(),
    descripcion : $("#txtDescripcion").val(),
  }
  var tip = {
    tipo : tipo,
    idtipo : idtipo
  }
  $.ajax({
  type:"PUT",
  data:JSON.stringify(tip),
  contentType:'application/json',
  url:"http://localhost:8060/api/wsUpdateTipo",
  success:function(data){
    alert("todo bien");
    getTipos();
  },
  error:function(data){
alert("todo mal");
  }
})
}
