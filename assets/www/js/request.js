var sendRequest = function(urlAddress, actionRequest, requestData, onSuccess, onError) {
	requestData.action = actionRequest;

	$.ajax( {
		url : urlAddress,
		type : 'POST',
		data : requestData,
		dataType : 'json',
		success: onSuccess,
		error: onError 
	});
};