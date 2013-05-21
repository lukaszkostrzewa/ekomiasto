var inputdata;
var myEcomissions;

var currentMyEcomission;

var getMyEcomissionsList = function(){
	navigator.splashscreen.show();
	
	inputdata = {
		'id': currentUserID,
		'action' : null
	};
	
	sendRequest(URL_SERVICE+'/ecomission', 'MYLIST', inputdata, onSuccessGetMyEcomissionList, onErrorGetMyEcomissionList);
};

var onSuccessGetMyEcomissionList = function(data) {
	$.mobile.changePage( "#myEcomissions");
	createMyEcomissionList("myEcomissionsList", data);
	navigator.splashscreen.hide();
};

var onErrorGetMyEcomissionList = function(XMLHttpRequest, textStatus, errorThrown) { 
	navigator.splashscreen.hide();
	
	alert("Brak po³¹czenia z internetem." + errorThrown);
};

var openMyEcomission = function(id) {
	//alert("ID: " + myEcomissions[id]["id"] + "\n" + "Address: " + myEcomissions[id]["address"] + "\n" + "Description: " + myEcomissions[id]["description"] + "\n" + "Date: " + myEcomissions[id]["date"] + "\n" + "Points: " + myEcomissions[id]["points"]);
	
	$.mobile.changePage( "#myEcomission");

	$('#myEcomissionPartnerIcon').attr("src","img/"+myEcomissions[id]["partnerID"]+".png");
	$('#myEcomissionNameTxt').text(myEcomissions[id]["title"]);
	$('#myEcomissionPointsTxt').text(myEcomissions[id]["points"]);
	$('#myEcomissionDeadlineTxt').text(myEcomissions[id]["date"]);
	$('#myEcomissionPlaceTxt').text(myEcomissions[id]["address"]);
	$('#myEcomissionDescriptionTxt').text(myEcomissions[id]["description"]);
	$('#myEcomissionProgressTxt').text(myEcomissions[id]["completed"] + "/" + myEcomissions[id]["total"]);
	$('#myEcomissionPartnerTxt').text(myEcomissions[id]["partnerName"]);
};

var createMyEcomissionList = function(list, json){
	myEcomissions = json;
	
	$("#"+list).children().remove('li');
	
	for(var i=0;i<json.length;i++){
        var element = json[i];
		
        
		$("#"+list).append("<li><a id=\"myEcomission" + i + "\" >" + element["title"] + "<span class=\"ui-li-count\">" + element["completed"] + "/" + element["total"] + "</span></a></li>"); 
		$("#"+list).listview("refresh");
		
		$("#myEcomission"+i).off("click");
		$("#myEcomission"+i).on("click",function(){
			var x = parseInt(this.id.substring(12));
			openMyEcomission(x);
		});
		
		
		
    }
	
	if(json.length <= 0) {
		$("#"+list).append("<li> Brak. </li>"); 
	}
	
	
}