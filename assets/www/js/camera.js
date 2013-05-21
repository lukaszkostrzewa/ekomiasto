var pictureSource;   // picture source
var destinationType; // sets the format of returned value 
var photoString;

// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
  $('#capturePhotoBtn').text('Zmieñ zdjêcie').button("refresh");
  photoString = imageData;
}

function capturePhoto() {
  // Take picture using device camera and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
	destinationType: destinationType.DATA_URL });
}

 
function onFail(message) {
  //...
}
