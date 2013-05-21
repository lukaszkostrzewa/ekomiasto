var currentUser;
var currentUserID;

var URL_SERVICE = 'http://ekomiastokrakow.appspot.com';

$(document).bind("mobileinit", function() { 
    $.mobile.defaultPageTransition = 'slide';
});

var loadURL = function(url){
    navigator.app.loadUrl(url, { openExternal:true });
    return false;
} 

