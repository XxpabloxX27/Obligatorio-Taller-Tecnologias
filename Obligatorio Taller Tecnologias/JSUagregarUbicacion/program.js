
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
    getUbicaciones();

});

function AgregarUbicacion(){
  var nombre = $("#txtNombre").val();
  var descrip = $("#txtDescripcion").val();
  var tipo = $("#txtTipo").val();
  var lat = $("#txtLat").val();
  var lon = $("#txtLon").val();
  var aprob = false;
  var ubicacion ={
    nombre : nombre,
    descripcion : descrip,
    tipo : tipo,
    latitud : lat,
    longitud : lon,
    aprobado : aprob
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

      //  var tblBody = document.getElementById("tblBody");
        //tblBody.innerHTML = "";
        for(var i = 0; i<ubicaciones.length; i++)
        {
          //tblBody.innerHTML+="<tr onclick = 'CenterMap("+ ubicaciones[i].latitud +","+ubicaciones[i].longitud+")'><td>"+ ubicaciones[i].nombre +"</td><td>"+ ubicaciones[i].descripcion +"</td><td>"+ ubicaciones[i].tipo +"</td></tr>";
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
            '<p>'+ ubicaciones[i].descripcion +'</p>'+
            '</div>'+
            '</div>'
          });
          bindInfoWindow(marcador,map,infoWindow,marcador.contenido);
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
