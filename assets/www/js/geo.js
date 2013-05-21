var latitude;
var longitude;
var mapPage;
var position;

var getLocation = function(onError) {
	navigator.splashscreen.show();
	navigator.geolocation.getCurrentPosition(onSuccessGetLocation, onError);	
};

var onSuccessGetLocation = function(p) {
	position = p;
	$.mobile.changePage("#"+mapPage);
	if(mapPage == 'map') {
		getJam();
	}
	else {
		navigator.splashscreen.hide();
	}
}

var showPosition = function(position) {
	latitude = position.coords.latitude ;
	longitude = position.coords.longitude ;
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
};

// onError Callback receives a PositionError object
//
function onGeoError(error) {
    alert("Nie mogê okreœliæ Twojego po³o¿enia.");
}

