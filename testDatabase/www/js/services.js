var OCRService = angular.module('starter.services', [])
OCRService.factory('ocrService', ['$http', function ($http,$scope){
    var results = [];
        var formData="";

	return {
		getResults: function(imgURI){
                                formData = new FormData();
                                formData.append('file', imgURI,'id.jpeg');
                                //formData.append('url','https://lh5.googleusercontent.com/xadwVV2rkjAkNjZp3Onq0n4mb4iIzCT1v5Uo87c1-4jzpSpdGyXIUtgH5H8ZvrQDccvdJPrGRahvXdXNOItWNkmqR6Zcn7edL3qSoYfve8D3Moq8j00a5x9wnAtouvIezzGXUHo');
                                formData.append('apikey','f44b920b3188957');
                                formData.append('isOverlayRequired',true);
                                var req = 
                                    {
                                        method: 'POST',
                                        url: 'https://api.ocr.space/parse/image',
                                        data: formData,//Object.toparams(myobject),
                                        headers: {'Content-Type': undefined}
                                    }
                                return $http(req).then(function(response){
                                    results = response;
                                  //  alert(JSON.stringify(response));
                                    return results;
                                });
		}
	};
}]);