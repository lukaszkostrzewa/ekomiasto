var inputdata;
var partners;

var currentPartner;

var getPartnersList = function(){
	navigator.splashscreen.show();
	
	inputdata = {
		'action' : null
	};
	
	sendRequest(URL_SERVICE+'/partner', 'LIST', inputdata, onSuccessGetPartnerList, onErrorGetPartnerList);
};

var onSuccessGetPartnerList = function(data) {
	$.mobile.changePage("#partners");
	createPartnerList("partnersList", data);
	navigator.splashscreen.hide();
};

var onErrorGetPartnerList = function(XMLHttpRequest, textStatus, errorThrown) { 
	navigator.splashscreen.hide();
	
	alert("Brak po³¹czenia z internetem." + errorThrown);
};

var openPartner = function(id) {
	$.mobile.changePage("#partner");

	$('#partnerIcon').attr("src","img/"+partners[id]["id"]+".png");
	$('#partnerNameTxt').text(partners[id]["name"]);
	$('#partnerWebsite').attr("rel",partners[id]["website"]);
	$('#partnerDescriptionTxt').text(partners[id]["description"]);
};

var createPartnerList = function(list, json){
	partners = json;
	
	$("#"+list).children().remove('li');
	
	for(var i=0;i<json.length;i++){
        var element = json[i];
		
        
		$("#"+list).append("<li><a id=\"partner" + i + "\" >" + element["name"] + "</a></li>"); 
		$("#"+list).listview("refresh");
		
		$("#partner"+i).off("click");
		$("#partner"+i).on("click",function(){
			var x = parseInt(this.id.substring(7));
			openPartner(x);
		});
		
		
		
    }
	
	if(json.length <= 0) {
		$("#"+list).append("<li> Brak. </li>"); 
	}
	
	
}