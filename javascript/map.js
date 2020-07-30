function GetMap() {
  var map = new Microsoft.Maps.Map('#myMap');
  map.setView({
      mapTypeId: Microsoft.Maps.MapTypeId.road,
      center: new Microsoft.Maps.Location(0, 0),
      zoom: 1
  });
	var location = 'Greece';
	var request = new XMLHttpRequest()
	request.open('GET', 'https://nominatim.openstreetmap.org/search?format=json&q=' + location, true)
	request.onload = function () {
	  var data = JSON.parse(this.response)
	  var latlng = {lat:parseFloat(data[0].lat), lng:parseFloat(data[0].lon)}
	  var pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(parseFloat(data[0].lat), parseFloat(data[0].lon)), {
	        title: location,
	        subTitle: 'City Center',
	        text: '1'
	    });

	//Add the pushpin to the map
	    map.entities.push(pin);
     }
	request.send();
	

    
	
}




