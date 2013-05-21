var inputdata;
var profileRanking;

var currentRanking;

var getRankingList = function(){
	navigator.splashscreen.show();
	
	inputdata = {
		'action' : null
	};
	
	sendRequest(URL_SERVICE+'/user', 'RANKING', inputdata, onSuccessGetRankingList, onErrorGetRankingList);
};

var onSuccessGetRankingList = function(data) {
	$.mobile.changePage("#ranking");
	createRankingList("profileRankingList", data);
	navigator.splashscreen.hide();
};

var onErrorGetRankingList = function(XMLHttpRequest, textStatus, errorThrown) { 
	navigator.splashscreen.hide();
	
	alert("Brak po³¹czenia z internetem." + errorThrown);
};

var createRankingList = function(list, json){
	profileRanking = json;
	
	$("#"+list).children().remove('li');
	
	for(var i=0;i<json.length;i++){
        var element = json[i];
		
        
		$("#"+list).append("<li><a id=\"userProfileRanking" + i + "\" >" + element["login"] + "</a></li>"); 
		$("#"+list).listview("refresh");
		
		$("#userProfileRanking"+i).off("click");
		$("#userProfileRanking"+i).on("click",function(){
			var x = parseInt(this.id.substring(18));
			openProfile(x);
		});
		
    }
	
	if(json.length <= 0) {
		$("#"+list).append("<li> Brak. </li>"); 
	}
	
	
}
