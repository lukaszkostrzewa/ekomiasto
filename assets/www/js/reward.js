var inputdata;
var rewards;

var currentReward;

var getRewardsList = function(){
	navigator.splashscreen.show();
	
	inputdata = {
		'action' : null
	};
	
	sendRequest(URL_SERVICE+'/reward', 'LIST', inputdata, onSuccessGetRewardList, onErrorGetRewardList);
};

var onSuccessGetRewardList = function(data) {
	$.mobile.changePage("#rewards");
	createRewardList("rewardsList", data);
	navigator.splashscreen.hide();
};

var onErrorGetRewardList = function(XMLHttpRequest, textStatus, errorThrown) { 
	navigator.splashscreen.hide();
	
	alert("Brak po³¹czenia z internetem." + errorThrown);
};

var openReward = function(id) {
	//alert("ID: " + rewards[id]["id"] + "\n" + "Address: " + rewards[id]["address"] + "\n" + "Description: " + rewards[id]["description"] + "\n" + "Date: " + rewards[id]["date"] + "\n" + "Points: " + rewards[id]["points"]);
	
	$.mobile.changePage( "#reward");

	$('#rewardPartnerIcon').attr("src","img/"+rewards[id]["partnerID"]+".png");
	$('#rewardNameTxt').text(rewards[id]["title"]);
	$('#rewardPointsTxt').text(rewards[id]["points"]);
	$('#rewardQuantityTxt').text(rewards[id]["quantity"]);
	$('#rewardDescriptionTxt').text(rewards[id]["description"]);
	$('#rewardPartnerTxt').text(rewards[id]["partnerName"]);
};

var createRewardList = function(list, json){
	rewards = json;
	
	$("#"+list).children().remove('li');
	
	for(var i=0;i<json.length;i++){
        var element = json[i];
		
        
		$("#"+list).append("<li><a id=\"reward" + i + "\" >" + element["title"] + "</a></li>"); 
		$("#"+list).listview("refresh");
		
		$("#reward"+i).off("click");
		$("#reward"+i).on("click",function(){
			var x = parseInt(this.id.substring(6));
			openReward(x);
		});
		
		
		
    }
	
	if(json.length <= 0) {
		$("#"+list).append("<li> Brak. </li>"); 
	}
	
	
}