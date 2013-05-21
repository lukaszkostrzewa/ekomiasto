var scanQRCode = function() {
  window.plugins.barcodeScanner.scan( function(result) {
        if(result.text != '') {
			sendCode(result.text);
		}
    }, function(error) {
        alert("Nie uda�o si� zeskanowa� kodu.");
       }
    );
}

var sendCode = function(text){
	navigator.splashscreen.show();
	
	inputdata = {
		'action' : null,
		'hash' : text,
		'id': currentUserID
	};
	
	sendRequest(URL_SERVICE+'/code', 'SEND', inputdata, onSuccessSendCode, onErrorSendCode);
};

var onSuccessSendCode = function(data) {
	
	if(data[0].RESPONSE == 'OK') {
		alert("Kod zaakceptowany! Zdob�d� wszystkie kody, by wype�ni� EKOMisj�!");
	}
	else if(data[0].RESPONSE == 'MISSIONCOMPLETED') {
		alert("Misja zosta�a uko�czona! Gratulacje!");
	}
	else if(data[0].RESPONSE == 'NOSUCHCODE') {
		alert("Nie ma takiego kodu!");
	}
	else if(data[0].RESPONSE == 'USERSCANNED') {
		alert("Kod zosta� ju� zeskanowany wcze�niej.");
	}
	else if(data[0].RESPONSE == 'EXPIRED') {
		alert("Limit u�y� kodu zosta� wyczerpany.");
	}
	else if(data[0].RESPONSE == 'REWARD') {
		if(data[0].received == false) {
			alert("Ten kod upowa�nia Ci� do odebrania nagrody: " + data[0].reward + " (" + data[0].partner + ")!");
		}
		else {
			alert("Ten kod upowa�ni� Ci� do odebrania nagrody: " + data[0].reward + " (" + data[0].partner + ").");
		}
	}
	else {
		alert("Wyst�pi� b��d.");
	}
	getAccount();
	navigator.splashscreen.hide();
};

var onErrorSendCode = function(XMLHttpRequest, textStatus, errorThrown) { 
	navigator.splashscreen.hide();
	
	alert("Brak po��czenia z internetem." + errorThrown);
};