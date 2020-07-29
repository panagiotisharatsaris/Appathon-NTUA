function initMap() {
  // The location of Uluru
  var uluru = {lat: 40, lng: 10};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 1.5, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map,animation:google.maps.Animation.BOUNCE});

  var infowindow = new google.maps.InfoWindow({
	  content:"Hello World!"
	});

	google.maps.event.addListener(marker, 'click', function() {
	  infowindow.open(map,marker);
	}); 

	//const geocoder = new google.maps.Geocoder();
	//address="Greece"
    //geocodeAddress(geocoder, map,address);
    
}

function geocodeAddress(geocoder, resultsMap,address) {
    geocoder.geocode(
      {
        address: address
      },
      (results, status) => {
        if (status === "OK") {
          resultsMap.setCenter(results[0].geometry.location);
          new google.maps.Marker({
            map: resultsMap,
            position: results[0].geometry.location
          });
        } else {
          alert(
            "Geocode was not successful for the following reason: " + status
          );
        }
      }
    );
  }


