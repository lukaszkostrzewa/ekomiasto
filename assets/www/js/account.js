var inputdata;
var profileAccount;

var currentAccount;

var getAccount = function(){
	navigator.splashscreen.show();
	
	inputdata = {
		'action' : null,
		'id': currentUserID
	};
	
	sendRequest(URL_SERVICE+'/user', 'MYPROFILE', inputdata, onSuccessGetAccount, onErrorGetAccount);
};

var onSuccessGetAccount = function(data) {
	openAccount(data[0]);
	navigator.splashscreen.hide();
};

var onErrorGetAccount = function(XMLHttpRequest, textStatus, errorThrown) { 
	navigator.splashscreen.hide();
	
	alert("Brak po³¹czenia z internetem." + errorThrown);
};

var openAccount = function(data) {
	//alert("ID: " + profileRanking[id]["id"] + "\n" + "avatar: " + profileRanking[id]["avatar"] + "\n" + "Description: " + profileRanking[id]["description"] + "\n" + "status: " + profileRanking[id]["status"] + "\n" + "Points: " + profileRanking[id]["points"]);
	
	$.mobile.changePage("#account");

	$('#statusUserAccountImg').attr("src","img/status/"+data["statusID"]+".png");
	//$('#usernameAccountTxt').text('  '+data["login"]);
	$('#ecopointsAccountTxt').text('  '+data["points"]);
};