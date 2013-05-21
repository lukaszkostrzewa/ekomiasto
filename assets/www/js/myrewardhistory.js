var inputdata;
var myRewardHistory;

var currentMyRewardHistory;

var getMyRewardHistoryList = function(){
	navigator.splashscreen.show();
	
	inputdata = {
		'id': currentUserID,
		'action' : null
	};
	
	sendRequest(URL_SERVICE+'/user', 'REWARDHISTORY', inputdata, onSuccessGetMyRewardHistoryList, onErrorGetMyRewardHistoryList);
};

var onSuccessGetMyRewardHistoryList = function(data) {
	$.mobile.changePage("#myRewardHistory");
	createMyRewardHistoryList("myRewardHistoryList", data);
	navigator.splashscreen.hide();
};

var onErrorGetMyRewardHistoryList = function(XMLHttpRequest, textStatus, errorThrown) { 
	navigator.splashscreen.hide();
	
	alert("Brak po³¹czenia z internetem." + errorThrown);
};

var createMyRewardHistoryList = function(list, json){
	myRewardHistory = json;
	
	$("#"+list).children().remove('li');
	
	for(var i=0;i<json.length;i++){
        var element = json[i];
		
        //alert(element["received"]);
		$("#"+list).append("<li><a id=\"myRewardHistory" + i + "\" >" + element["title"] + "<span class=\"ui-li-count\">" + (element["received"] == true ? "ODEBRANO" : "DO ODBIORU") + "</span></a></li>"); 
		$("#"+list).listview("refresh");
		
		$("#myRewardHistory"+i).off("click");
		$("#myRewardHistory"+i).on("click",function(){
			var x = parseInt(this.id.substring(15));
			if(myRewardHistory[x]["received"] == false) printRewardDialog(x);
		});
		
		
		
    }
	
	if(json.length <= 0) {
		$("#"+list).append("<li> Brak. </li>"); 
	}
	
	
}

var printReward = function() {
	navigator.splashscreen.show();
	
	inputdata = {
		'id': currentUserID,
		'urid' : myRewardHistory[currentMyRewardHistory]["urid"],
		'action' : null
	};
	
	sendRequest(URL_SERVICE+'/user', 'PRINT', inputdata, onSuccessPrintReward, onErrorPrintReward);
}

var onSuccessPrintReward = function(data) {
	alert("Pomyœlnie wydrukowano. SprawdŸ swoj¹ skrzynkê mailow¹.");
	$.mobile.changePage("#account");
	navigator.splashscreen.hide();
};

var onErrorPrintReward = function(XMLHttpRequest, textStatus, errorThrown) { 
	navigator.splashscreen.hide();
	
	alert("Brak po³¹czenia z internetem." + errorThrown);
};

var onConfirmPrint = function(button) {
    if(button == '1') {
		alert('Luzik.');
	}
	else {
		printReward();
	}
}

// Show a custom confirmation dialog
//
function printRewardDialog(x) {
	currentMyRewardHistory = x;
    navigator.notification.confirm(
        'Wydrukowaæ kupon raz jeszcze?',  
        onConfirmPrint,             
        'PotwierdŸ druk',         
        ['Nie','Tak']           // buttonLabels
    );
}