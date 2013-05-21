var inputdata;
var ecomissions;

var currentEcomission;

var getEcomissionsList = function(){
	navigator.splashscreen.show();
	
	inputdata = {
		'action' : null
	};
	
	sendRequest(URL_SERVICE+'/ecomission', 'LIST', inputdata, onSuccessGetEcomissionList, onErrorGetEcomissionList);
};

var onSuccessGetEcomissionList = function(data) {
	$.mobile.changePage( "#ecomissions");
	createEcomissionList("ecomissionsList", data);
	navigator.splashscreen.hide();
};

var onErrorGetEcomissionList = function(XMLHttpRequest, textStatus, errorThrown) { 
	navigator.splashscreen.hide();
	
	alert("Brak po³¹czenia z internetem." + errorThrown);
};

var openEcomission = function(id) {
	//alert("ID: " + ecomissions[id]["id"] + "\n" + "Address: " + ecomissions[id]["address"] + "\n" + "Description: " + ecomissions[id]["description"] + "\n" + "Date: " + ecomissions[id]["date"] + "\n" + "Points: " + ecomissions[id]["points"]);
	
	$.mobile.changePage( "#ecomission");

	$('#ecomissionPartnerIcon').attr("src","img/"+ecomissions[id]["partnerID"]+".png");
	$('#ecomissionNameTxt').text(ecomissions[id]["title"]);
	$('#ecomissionPointsTxt').text(ecomissions[id]["points"]);
	$('#ecomissionDeadlineTxt').text(ecomissions[id]["date"]);
	$('#ecomissionPlaceTxt').text(ecomissions[id]["address"]);
	$('#ecomissionDescriptionTxt').text(ecomissions[id]["description"]);
	$('#ecomissionPartnerTxt').text(ecomissions[id]["partnerName"]);
};

var createEcomissionList = function(list, json){
	ecomissions = json;
	
	$("#"+list).children().remove('li');
	
	for(var i=0;i<json.length;i++){
        var element = json[i];
		
        
		$("#"+list).append("<li><a id=\"ecomission" + i + "\" >" + element["title"] + "</a></li>"); 
		$("#"+list).listview("refresh");
		
		$("#ecomission"+i).off("click");
		$("#ecomission"+i).on("click",function(){
			var x = parseInt(this.id.substring(10));
			openEcomission(x);
		});
		
		
		
    }
	
	if(json.length <= 0) {
		$("#"+list).append("<li> Brak. </li>"); 
	}
	
	
}