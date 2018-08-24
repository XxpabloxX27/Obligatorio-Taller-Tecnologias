
var marker;
var markers = [];
var map;
var infoWindow;
$(document).ready(function(){
      map = initMap();
      infoWindow = new google.maps.InfoWindow();
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
        $('#characterLeftComentario').text('250 characters left');
        $('#txtComentario').keydown(function () {
            var maxC = 250;
            var lenC = $(this).val().length;
            if (lenC >= maxC) {
                $('#characterLeftComentario').text('No hay mas caracteres disponibles');
                $('#characterLeftComentario').addClass('red');
                $('#btnAgregar').addClass('disabled');
            }
            else {
                var chC = maxC - lenC;
                $('#characterLeftComentario').text(chC + ' caracteres disponibles');
                $('#btnAgregar').removeClass('disabled');
                $('#characterLeftComentario').removeClass('red');
            }



    });
    getUbicaciones();
    getTipos();
    var tipo = sessionStorage.getItem("tipo");
    if(tipo == "usuario"  || tipo == "null" ){
      window.open("login.html",'_self');

    }

});

function AgregarUbicacion(){

  var e = document.getElementById("slt");
  var selectId = e.options[e.selectedIndex].value;


  $.ajax({
     type: "GET",
     url: "http://localhost:8060/api/wsTipos",
     success: function(data){
       var tipo;
        var tipos = data.tipos;
        for(var i = 0; i<tipos.length; i++)
        {
          if(tipos[i]._id == selectId){
            tipo = tipos[i];
          }
        }
        var nombre = $("#txtNombre").val();
        var descrip = $("#txtDescripcion").val();
        var comentario = $("#txtComentario").val();
        var lat = $("#txtLat").val();
        var lon = $("#txtLon").val();
        var aprob = true;
        var valoracion = $("#sltValorar").val();
        var ubicacion ={
          nombre : nombre,
          descripcion : descrip,
          tipo : tipo,
          latitud : lat,
          longitud : lon,
          aprobado : aprob,
          valoracion : valoracion,
          comentario : comentario
        }

      $.ajax({
        type:"POST",
        dataType: "json",
        data: JSON.stringify(ubicacion),
        contentType: 'application/json',
        url:"http://localhost:8060/api/wsAgregarUbicacion",
        success:function(data){
          alert("bien");
          marker = null;
          getUbicaciones();
        },
        error:function(data){
          alert("todo mal");
        }
      });


     },
     error: function(data)
     {

     }
   })
};


function initMap() {
  var map;
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:-34.960159, lng:-54.942453},
    zoom: 14
  });
  google.maps.event.addListener(map, 'click', function(event) {

      mouseLocation = event.latLng;
      placeMarker(mouseLocation,map);
});
return map;
}

function placeMarker(location, map){
  if(marker){
    marker.setPosition(location);
  }else{
      marker = new google.maps.Marker({
      position : location,
      map: map,

    });
  }


  document.getElementById("txtLat").value = marker.getPosition().lat();
  document.getElementById("txtLon").value = marker.getPosition().lng();
  google.maps.event.addListener(marker,'dragend',function(){
    var lat = marker.getPosition().lat();
    var lon = marker.getPosition().lng();
    $('#txtLat').val(lat);
    $('#txtLon').val(lon);
  });
}

function latlongMarker(lat,lon){
  document.getElementById("txtLat").value = "";
  document.getElementById("txtLon").value = "";
  document.getElementById("txtLat").value = lat;
  document.getElementById("txtLon").value = lon;
}



function AgregarMarker(){
  var marcador = new google.maps.Marker({
    position : marker.position,
    map: map,
    draggable: false
  });
  markers.push(marcador);
  marker = null;
}

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
          //tipo = ubicaciones[i].tipo.nombre;
          if(ubicaciones[i].aprobado == true)
          {

          tblBody.innerHTML+="<tr onclick = 'CenterMap("+ ubicaciones[i].latitud +","+ubicaciones[i].longitud+")'><td>"+ ubicaciones[i].nombre +"</td><td>"+ ubicaciones[i].descripcion +"</td><td>"+ubicaciones[i].tipo.nombre+"</td></tr>";
          var marcador = new google.maps.Marker({
            position :{
              lat: parseFloat(ubicaciones[i].latitud),
              lng: parseFloat(ubicaciones[i].longitud)
            },
            map : map,
            draggable:false,
            contenido : '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">'+ubicaciones[i].nombre+'</h1>'+
            '<div id="bodyContent">'+
            '<p>Descripcion : '+ ubicaciones[i].descripcion +'</p>'+'<p>Valoracion : '+ubicaciones[i].valoracion+' / 5 Estrellas</p>'+'<p>Opiniones : '+ubicaciones[i].comentario+'</p>'+
            '</div>'+
            '</div>'
          });
          bindInfoWindow(marcador,map,infoWindow,marcador.contenido);
        }
        }


     },
     error: function(data)
     {

     }
   })
}


function bindInfoWindow(marker, map, infowindow, html) {
    marker.addListener('click', function() {
        infowindow.setContent(html);
        infowindow.open(map, this);
    });
}


function CenterMap(lat,lon){
  map.setCenter({
    lat : lat,
    lng : lon
  })
  $("#txtLat").val(lat);
  $("#txtLon").val(lon);
}

function getTipos()
{
  $.ajax({
     type: "GET",
     url: "http://localhost:8060/api/wsTipos",
     success: function(data){
       marker = null;
        var tipos = data.tipos;

        var tblBody = document.getElementById("slt");
        tblBody.innerHTML = "";
        for(var i = 0; i<tipos.length; i++)
        {

          tblBody.innerHTML+="<option value="+tipos[i]._id+">"+tipos[i].nombre+"</option>";

        }


     },
     error: function(data)
     {

     }
   })
}
