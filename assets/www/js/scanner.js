var scanQRCode = function() {
  window.plugins.barcodeScanner.scan( function(result) {
        if(result.text != '') {
			sendCode(result.text);
		}
    }, function(error) {
        alert("Nie uda³o siê zeskanowaæ kodu.");
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
		alert("Kod zaakceptowany! Zdob¹dŸ wszystkie kody, by wype³niæ EKOMisjê!");
	}
	else if(data[0].RESPONSE == 'MISSIONCOMPLETED') {
		alert("Misja zosta³a ukoñczona! Gratulacje!");
	}
	else if(data[0].RESPONSE == 'NOSUCHCODE') {
		alert("Nie ma takiego kodu!");
	}
	else if(data[0].RESPONSE == 'USERSCANNED') {
		alert("Kod zosta³ ju¿ zeskanowany wczeœniej.");
	}
	else if(data[0].RESPONSE == 'EXPIRED') {
		alert("Limit u¿yæ kodu zosta³ wyczerpany.");
	}
	else if(data[0].RESPONSE == 'REWARD') {
		if(data[0].received == false) {
			alert("Ten kod upowa¿nia Ciê do odebrania nagrody: " + data[0].reward + " (" + data[0].partner + ")!");
		}
		else {
			alert("Ten kod upowa¿ni³ Ciê do odebrania nagrody: " + data[0].reward + " (" + data[0].partner + ").");
		}
	}
	else {
		alert("Wyst¹pi³ b³¹d.");
	}
	getAccount();
	navigator.splashscreen.hide();
};

var onErrorSendCode = function(XMLHttpRequest, textStatus, errorThrown) { 
	navigator.splashscreen.hide();
	
	alert("Brak po³¹czenia z internetem." + errorThrown);
};