var map;
var markers  = new Array();
var markersNum = -1;

var clearMarkers = function() {
    for(var i=0; i <= markersNum; i++){
        markers[i].setMap(null);
    }
    markers = new Array();
};
 
var loadMap = function(canvas, position) {	
	if(position != null) {
		latitude = position.coords.latitude ;
		longitude = position.coords.longitude ;
	}
	
	$(document).off('pageshow', '#'+mapPage);

	$(document).on('pageshow', '#'+mapPage,function(e,data){
		
		if(mapPage == 'map') {
			var h = $(window).height() - $.mobile.activePage.find("div[data-role='header']:visible").outerHeight();
			var w = $(window).width();
			$('#'+canvas).css('height', h);
			$('#'+canvas).css('width',w);
		}
		
		//map.setCenter(marker.getPosition());
		google.maps.event.trigger(document.getElementById(canvas), "resize");
	});

   // This is the minimum zoom level that we'll allow
   var minZoomLevel = 15;

   map = new google.maps.Map(document.getElementById(canvas), {
	  zoom: 17,
	  center: new google.maps.LatLng(latitude, longitude),
	  mapTypeId: google.maps.MapTypeId.ROADMAP
   });

   
   if(mapPage != 'map') {
		markersNum = 0;
		markers[0] = new google.maps.Marker({
			position: new google.maps.LatLng(latitude, longitude),
			map: map
		});
   }
   

	// Listen for the dragend event
   google.maps.event.addListener(map, 'click', function(e) {

		 var x =  e.latLng.lng(),
		 y =  e.latLng.lat();
		  

		 if(mapPage == 'map') {
			map.setCenter(new google.maps.LatLng(y, x));
			addJamPopupOpen(y, x);
		 }
		 else {
			markers[0].setPosition(new google.maps.LatLng(y, x));
			map.setCenter(markers[0].getPosition());
		 }
		 
   }); 

   // Limit the zoom level
   google.maps.event.addListener(map, 'zoom_changed', function() {
	 if (map.getZoom() < minZoomLevel) map.setZoom(minZoomLevel);
   });  
	   
	   
	   
	//});
}

function getRealContentHeight(divider) {
    var header = $.mobile.activePage.find("div[data-role='header']:visible");
    var footer = $.mobile.activePage.find("div[data-role='footer']:visible");
    var content = $.mobile.activePage.find("div[data-role='content']:visible:visible");
    var viewport_height = $(window).height();

    var content_height = viewport_height - header.outerHeight() - footer.outerHeight();
    if((content.outerHeight() - header.outerHeight() - footer.outerHeight()) <= viewport_height) {
        content_height -= (content.outerHeight() - content.height());
    } 
    return content_height/divider;
}
