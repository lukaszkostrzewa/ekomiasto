var inputdata;
var events;

var currentEvent;

var getEventsList = function(){
	navigator.splashscreen.show();
	
	inputdata = {
		'action' : null
	};
	
	sendRequest(URL_SERVICE+'/event', 'LIST', inputdata, onSuccessGetEventList, onErrorGetEventList);
};

var onSuccessGetEventList = function(data) {
	$.mobile.changePage( "#events");
	createEventList("eventsList", data);
	navigator.splashscreen.hide();
};

var onErrorGetEventList = function(XMLHttpRequest, textStatus, errorThrown) { 
	navigator.splashscreen.hide();
	
	alert("Brak po³¹czenia z internetem." + errorThrown);
};

var openEvent = function(id) {
	//alert("ID: " + events[id]["id"] + "\n" + "Address: " + events[id]["address"] + "\n" + "Description: " + events[id]["description"] + "\n" + "Date: " + events[id]["date"] + "\n" + "Points: " + events[id]["points"]);
	
	$.mobile.changePage( "#event");

	$('#eventPartnerIcon').attr("src","img/1.png");
	$('#eventNameTxt').text(events[id]["title"]);
	$('#eventDateTxt').text(events[id]["date"]);
	$('#eventPlaceTxt').text(events[id]["address"]);
	$('#eventDescriptionTxt').text(events[id]["description"]);
	$('#eventOrganizerTxt').text(events[id]["organizer"]);
	$('#eventWebsite').attr("rel",events[id]["website"]);
};

var createEventList = function(list, json){
	events = json;
	
	$("#"+list).children().remove('li');
	
	for(var i=0;i<json.length;i++){
        var element = json[i];
		
        
		$("#"+list).append("<li><a id=\"event" + i + "\" >" + element["title"] + "</a></li>"); 
		$("#"+list).listview("refresh");
		
		$("#event"+i).off("click");
		$("#event"+i).on("click",function(){
			var x = parseInt(this.id.substring(5));
			openEvent(x);
		});
		
		
		
    }
	
	if(json.length <= 0) {
		$("#"+list).append("<li> Brak. </li>"); 
	}
	
	
}