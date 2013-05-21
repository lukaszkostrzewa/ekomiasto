var inputdata;

var validateEmail = function(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 

var loginUser = function(){

	if($('#nickLoginTxt').val() == "") {
		alert("WprowadŸ nazwê u¿ytkownika.");
		return;
	}

	if($('#emailLoginTxt').val() != "" && validateEmail($('#emailLoginTxt').val()) == false) {
		alert("Podany e-mail jest nieprawd³owy");
		return;
	}

	navigator.splashscreen.show();
	
	inputdata = {
		'action' : null,
		'login' : $('#nickLoginTxt').val(),
		'email' : $('#emailLoginTxt').val()
	};
	
	sendRequest(URL_SERVICE+'/user', 'LOGIN', inputdata, onSuccessLogin, onErrorLogin);
};

var onSuccessLogin = function(data) {
	currentUserID = data[0].id;
	currentUser = $('#nickLoginTxt').val();
	
	if(data[0].message == 'OKNEW') {
		alert("Zapraszamy, " + currentUser + "!");
	}
	
	$.mobile.changePage( "#home");
	navigator.splashscreen.hide();
};

var onErrorLogin = function(XMLHttpRequest, textStatus, errorThrown) { 
	navigator.splashscreen.hide();
	
	alert("Brak po³¹czenia z internetem. " + errorThrown);
	navigator.splashscreen.hide();
};
