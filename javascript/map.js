function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


function GetMap() {
  var map = new Microsoft.Maps.Map('#myMap');
  map.setView({
      mapTypeId: Microsoft.Maps.MapTypeId.road,
      center: new Microsoft.Maps.Location(0, 0),
      zoom: 1
  });
  var pins=new Microsoft.Maps.EntityCollection();
  var i;
  console.log("hi");
  for (i=0;i<result.length;i=i+2){
	var location = result[i];
        var count=result[i+1];
        sleep(5000)
	var request = new XMLHttpRequest()
        //	request.open('GET', 'http://dev.virtualearth.net/REST/v1/Locations?maxResults=1&key=AgvK9x-Z_OlQKTFUyyZXUNl7e0zIK2eYjLNF4ZUa4p4eV8rsu7h_C4Kds6jpu4fB&countryRegion='+location, true)
	request.open('GET', 'https://nominatim.openstreetmap.org/search?format=json&q=' + location, true)
	request.onload = function () {
	  var data = JSON.parse(this.response)

	  var pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(parseFloat(data[0].lat), parseFloat(data[0].lon)));
          pin.metadata = {
                title: location,
	        text: count
            };
          pins.push(pin);
     }
	request.send();
}

   map.entities.push(pins); 
	
}



