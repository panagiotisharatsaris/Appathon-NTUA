function initMap() {
  var uluru = {lat: 40, lng: 10};
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 1.5, center: uluru});

	var location = 'Greece';
	var request = new XMLHttpRequest()
	request.open('GET', 'https://nominatim.openstreetmap.org/search?format=json&q=' + location, true)
	request.onload = function () {
	  var data = JSON.parse(this.response)
	  var latlng = {lat:parseFloat(data[0].lat), lng:parseFloat(data[0].lon)}
	  var marker = new google.maps.Marker({position: latlng, map: map,animation:google.maps.Animation.BOUNCE});
	  var infowindow = new google.maps.InfoWindow({
		  content:location
		});

		google.maps.event.addListener(marker, 'click', function() {
		  infowindow.open(map,marker);
		}); 
     }
	request.send();
	
}




