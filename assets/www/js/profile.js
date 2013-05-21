var openProfile = function(id) {
	//alert("ID: " + profileRanking[id]["id"] + "\n" + "avatar: " + profileRanking[id]["avatar"] + "\n" + "Description: " + profileRanking[id]["description"] + "\n" + "status: " + profileRanking[id]["status"] + "\n" + "Points: " + profileRanking[id]["points"]);
	
	$.mobile.changePage("#userProfile");

	$('#userAvatar').attr("src","img/avatars/"+profileRanking[id]["avatar"]+".gif");
	$('#statusUserImg').attr("src","img/status/"+profileRanking[id]["statusID"]+".png");
	$('#usernameTxt').text('  '+profileRanking[id]["login"]);
	$('#reputationUserTxt').text(profileRanking[id]["rep"]+'%');
	$('#registrationDateUserTxt').text(profileRanking[id]["registered"]);
	$('#signatureUserTxt').text(profileRanking[id]["description"]);
};

var getProfile = function(){
	navigator.splashscreen.show();
	
	inputdata = {
		'action' : null,
		'id': currentUserID
	};
	
	sendRequest(URL_SERVICE+'/user', 'MYPROFILE', inputdata, onSuccessGetProfile, onErrorGetProfile);
};

var onSuccessGetProfile = function(data) {
	openProfileEdit(data[0]);
	navigator.splashscreen.hide();
};

var onErrorGetProfile = function(XMLHttpRequest, textStatus, errorThrown) { 
	navigator.splashscreen.hide();
	alert("Brak po³¹czenia z internetem." + errorThrown);
};

var setProfile = function(){
	navigator.splashscreen.show();
	
	inputdata = {
		'action' : null,
		'id': currentUserID,
		'description' : $('#signatureUserEditTxt').val()
	};
	
	sendRequest(URL_SERVICE+'/user', 'EDITMYPROFILE', inputdata, onSuccessSetProfile, onErrorSetProfile);
};

var onSuccessSetProfile = function(data) {
	alert("Profil zosta³ zaaktualizowany.");
	$.mobile.changePage("#home");
	navigator.splashscreen.hide();
};

var onErrorSetProfile = function(XMLHttpRequest, textStatus, errorThrown) { 
	navigator.splashscreen.hide();
	alert("Brak po³¹czenia z internetem." + errorThrown);
};

var openProfileEdit = function(userinfo) {
	//alert("ID: " + data["id"] + "\n" + "avatar: " + data["avatar"] + "\n" + "Description: " + data["description"] + "\n" + "status: " + data["status"] + "\n" + "Points: " + data["points"]);
	$.mobile.changePage("#myProfile");

	$('#userAvatarEdit').attr("src","img/avatars/"+userinfo["avatar"]+".gif");
	$('#statusUserImgEdit').attr("src","img/status/"+userinfo["statusID"]+".png");
	$('#usernameEditTxt').text('  '+userinfo["login"]);
	$('#reputationUserEditTxt').text(userinfo["rep"]+'%');
	$('#registrationDateUserEditTxt').text(userinfo["registered"]);
	$('#signatureUserEditTxt').text(userinfo["description"]);
};