
var jamX, jamY;
var jams;
var currentJam;

var voteJam = function(x){
	navigator.splashscreen.show();
	
	inputdata = {
		'action' : null,
		'id': jams[currentJam].id,
		'vote' : x
	};
	
	sendRequest(URL_SERVICE+'/report', 'VOTE', inputdata, onSuccessVoteJam, onErrorVoteJam);
};

var onSuccessVoteJam = function(data) {
	alert("G³os zosta³ oddany. ");
	getJam();
};

var onErrorVoteJam = function(XMLHttpRequest, textStatus, errorThrown) { 
	navigator.splashscreen.hide();
	alert("Brak po³¹czenia z internetem." + errorThrown);
};


var addJamPopupOpen = function(y, x) {
	jamY = y;
	jamX = x;
	
	$('#jamPopup').popup("open");
	$("#descriptionNewJamTxt").val('');
}

var getJam = function(){

	$('#jamPopup').popup("close");
	$('#jamInfoPopup').popup("close");
	
	inputdata = {
		'action' : null,
		'id': currentUserID,
	};
	
	sendRequest(URL_SERVICE+'/report', 'LIST', inputdata, onSuccessGetJam, onErrorGetJam);
};

var onSuccessGetJam = function(data) {

	jams = data;
	markersNum = -1;
	
	clearMarkers();
		
		for(var i=0;i<data.length;i++){
			var element = data[i];
			markersNum = i;
			markers[i] = new google.maps.Marker({
				position: new google.maps.LatLng(element.lat, element.lon),
				map: map,
			}); 
			
			markers[i].setTitle('m' + i);
			
			google.maps.event.addListener(markers[i], "click", function() {
				currentJam = parseInt(this.getTitle().substring(1));
				
				$('#jamInfoPopup').popup("open");
				
				$("#votePlusJamTxt").text('Plusów: '+jams[currentJam].plus);
				$("#voteMinusJamTxt").text('Minusów: '+jams[currentJam].minus);
				$("#descriptionJamTxt").text(jams[currentJam].description);
			});
		}
	
	navigator.splashscreen.hide();
};

var onErrorGetJam = function(XMLHttpRequest, textStatus, errorThrown) { 
	navigator.splashscreen.hide();
	alert("Brak po³¹czenia z internetem." + errorThrown);
};

var addJam = function(){
	navigator.splashscreen.show();
	
	inputdata = {
		'action' : null,
		'id': currentUserID,
		'lat' : map.getCenter().lat() ,
		'lon' : map.getCenter().lng() ,
		'description' : $('#descriptionNewJamTxt').val()
	};
	
	sendRequest(URL_SERVICE+'/report', 'ADDJAM', inputdata, onSuccessAddJam, onErrorAddJam);
};

var onSuccessAddJam = function(data) {
	alert("Informacja zosta³a dodana.");
	getJam();
};

var onErrorAddJam = function(XMLHttpRequest, textStatus, errorThrown) { 
	navigator.splashscreen.hide();
	alert("Brak po³¹czenia z internetem." + errorThrown);
};