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

  var i;
  for (i=0;i<result.length;i=i+2){
	var location = result[i];
        var count=result[i+1];
        sleep(1000)
	var request = new XMLHttpRequest()

	request.open('GET', 'https://nominatim.openstreetmap.org/search?format=json&q=' + location, true)
	request.onload = function () {
	  var data = JSON.parse(this.response)

	  var pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(parseFloat(data[0].lat), parseFloat(data[0].lon)));
          
          map.entities.push(pin);
     }
	request.send();
}
}



