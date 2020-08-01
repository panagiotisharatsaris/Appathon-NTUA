function GetMap() {
  var map = new Microsoft.Maps.Map('#myMap');
  map.setView({
      mapTypeId: Microsoft.Maps.MapTypeId.road,
      center: new Microsoft.Maps.Location(0, 0),
      zoom: 1
  });

  var i;
  for (i=0;i<result.length;i=i+2){
	var location = result[i];
        var count=result[i+1];
	var request = new XMLHttpRequest()
        //	request.open('GET', 'http://dev.virtualearth.net/REST/v1/Locations?maxResults=1&key=AgvK9x-Z_OlQKTFUyyZXUNl7e0zIK2eYjLNF4ZUa4p4eV8rsu7h_C4Kds6jpu4fB&countryRegion='+location, true)
	request.open('GET', 'https://nominatim.openstreetmap.org/search?format=json&q=' + location, true)
	request.onload = function () {
	  var data = JSON.parse(this.response)
	  var latlng = {lat:parseFloat(data[0].lat), lng:parseFloat(data[0].lon)}
	  var pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(parseFloat(data[0].lat), parseFloat(data[0].lon)), {
	        title: location,
	        text: count
	    });
          setTimeout(() => {  console.log(""); }, 2000);

	    map.entities.push(pin);
     }
	request.send();
}

    
	
}




