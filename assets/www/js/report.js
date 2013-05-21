var inputdata;

var sendReport = function(){
	navigator.splashscreen.show();
	
	inputdata = {
		'action' : null,
		'id' : currentUserID,
		'user' : currentUser ,
		'lat' : map.getCenter().lat() ,
		'lon' : map.getCenter().lng() ,
		'type' : $('#reportType').val() ,
		'description' : $('#reportDescription').val() ,
		'photo' : photoString
	};
	
	sendRequest(URL_SERVICE+'/notification', 'SEND', inputdata, onSuccessSendReport, onErrorSendReport);
};

var onSuccessSendReport = function(data) {
	navigator.splashscreen.hide();
	alert("Zg³oszenie zosta³o wys³ane.");
	$.mobile.changePage( "#mycity");
};

var onErrorSendReport = function(XMLHttpRequest, textStatus, errorThrown) { 
	navigator.splashscreen.hide();
	alert("Brak po³¹czenia z internetem." + errorThrown);
};