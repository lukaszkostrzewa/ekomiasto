var inputdata;
var news;

var currentNews;

var getNewsList = function(){
	navigator.splashscreen.show();
	
	inputdata = {
		'action' : null
	};
	
	sendRequest(URL_SERVICE+'/news', 'LIST', inputdata, onSuccessGetNewsList, onErrorGetNewsList);
};

var onSuccessGetNewsList = function(data) {
	$.mobile.changePage( "#news");
	createNewsList("newsList", data);
	navigator.splashscreen.hide();
};

var onErrorGetNewsList = function(XMLHttpRequest, textStatus, errorThrown) { 
	navigator.splashscreen.hide();
	
	alert("Brak po³¹czenia z internetem." + errorThrown);
};

var openNews = function(id) {
	//alert("ID: " + news[id]["id"] + "\n" + "Address: " + news[id]["address"] + "\n" + "Description: " + news[id]["description"] + "\n" + "Date: " + news[id]["date"] + "\n" + "Points: " + news[id]["points"]);
	
	$.mobile.changePage( "#new");

	$('#newsNameTxt').text(news[id]["title"]);
	$('#newsDateTxt').text(news[id]["date"]);
	$('#newsContentTxt').text(news[id]["description"]);
	$('#newsWebsite').attr("rel",news[id]["website"]);
};

var createNewsList = function(list, json){
	news = json;
	
	$("#"+list).children().remove('li');
	
	for(var i=0;i<json.length;i++){
        var element = json[i];
		
        
		$("#"+list).append("<li><a id=\"news" + i + "\" >" + element["title"] + "</a></li>"); 
		$("#"+list).listview("refresh");
		
		$("#news"+i).off("click");
		$("#news"+i).on("click",function(){
			var x = parseInt(this.id.substring(4));
			openNews(x);
		});
		
		
		
    }
	
	if(json.length <= 0) {
		$("#"+list).append("<li> Brak. </li>"); 
	}
	
	
}