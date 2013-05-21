var inputdata;
var myRewards;

var currentMyReward;

var getMyRewardsList = function(){
	navigator.splashscreen.show();
	
	inputdata = {
		'id': currentUserID,
		'action' : null
	};
	
	sendRequest(URL_SERVICE+'/reward', 'MYLIST', inputdata, onSuccessGetMyRewardList, onErrorGetMyRewardList);
};

var onSuccessGetMyRewardList = function(data) {
	$.mobile.changePage("#myRewards");
	createMyRewardList("myRewardsList", data);
	navigator.splashscreen.hide();
};

var onErrorGetMyRewardList = function(XMLHttpRequest, textStatus, errorThrown) { 
	navigator.splashscreen.hide();
	
	alert("Brak po³¹czenia z internetem." + errorThrown);
};

var createMyRewardList = function(list, json){
	myRewards = json;
	
	$("#"+list).children().remove('li');
	
	for(var i=0;i<json.length;i++){
        var element = json[i];
		
        
		$("#"+list).append("<li><a id=\"myReward" + i + "\" >" + element["title"] + "</a></li>"); 
		$("#"+list).listview("refresh");
		
		$("#myReward"+i).off("click");
		$("#myReward"+i).on("click",function(){
			var x = parseInt(this.id.substring(8));
			buyRewardDialog(x);
		});
		
		
		
    }
	
	if(json.length <= 0) {
		$("#"+list).append("<li> Brak. </li>"); 
	}
	
	
}

var buyReward = function() {
	navigator.splashscreen.show();
	
	inputdata = {
		'id': currentUserID,
		'rewardID' : myRewards[currentMyReward]["id"],
		'action' : null
	};
	
	sendRequest(URL_SERVICE+'/reward', 'BUY', inputdata, onSuccessBuyReward, onErrorBuyReward);
}

var onSuccessBuyReward = function(data) {
	if(data[0].message == 'OK') {
		alert("Pomyœlnie zrealizowano transakcjê. SprawdŸ swoj¹ skrzynkê mailow¹.");
	}
	else if(data[0].message == 'OUTOFSTOCK') {
		alert("Oferta zosta³a wyczerpana.");
	}
	getAccount();
	navigator.splashscreen.hide();
};

var onErrorBuyReward = function(XMLHttpRequest, textStatus, errorThrown) { 
	navigator.splashscreen.hide();
	
	alert("Brak po³¹czenia z internetem." + errorThrown);
};

var onConfirmBuy = function(button) {
    if(button == '1') {
		alert('Luzik.');
	}
	else {
		buyReward();
	}
}

// Show a custom confirmation dialog
//
function buyRewardDialog(x) {
	currentMyReward = x;
    navigator.notification.confirm(
        'Nagroda kosztuje '+myRewards[x]["points"] + ' punktów. Kontynuowaæ?',  
        onConfirmBuy,             
        'PotwierdŸ zakup',         
        ['Nie','Tak']           // buttonLabels
    );
}