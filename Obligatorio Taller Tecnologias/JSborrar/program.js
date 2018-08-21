var marker;
var map;
var infoWindow;
$(document).ready(function(){
      map = initMap();
      infoWindow = new google.maps.InfoWindow();
      getUbicaciones();

});



function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:-34.960159, lng:-54.942453},
    zoom: 14
  });
  /*google.maps.event.addListener(map, 'click', function(event) {

      mouseLocation = event.latLng;
      placeMarker(mouseLocation,map);
});*/
return map;
}

/*function placeMarker(location, map){
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
*/

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

          tblBody.innerHTML+=
          '<tr onclick = "CenterMap('+ ubicaciones[i].latitud +','+ubicaciones[i].longitud+')">'+
          '<td>'+ ubicaciones[i].nombre +'</td>'+
          '<td>'+ ubicaciones[i].descripcion +'</td>'+
          '<td>'+ ubicaciones[i].tipo +'</td>'+
          '<td><button type="button" class="btn btn-default btn-lg" onclick = "EditarUbicacion('+ ubicaciones[i].latitud +','+ubicaciones[i].longitud+','+ubicaciones[i]._id+')" ><span class="glyphicon glyphicon-pencil"></span></button>'+
          '<button type="button" class="btn btn-default btn-lg" onclick = "EditarUbicacion('+ ubicaciones[i].latitud +','+ubicaciones[i].longitud+','+ubicaciones[i]._id+')"><span class="glyphicon glyphicon-remove"></span></button></td></tr>'
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


function BorrarUbicacion(){}


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
  //$("#txtLat").val(lat);
  //$("#txtLon").val(lon);
}
