angular.module('starter.controllers')

.controller("CameraCtrl", function ($scope, $cordovaCamera, $ionicModal, $http, $location, $ionicPopup, compData, icData, acraEData, ocrService) {
            $scope.myCroppedImage='';
            $scope.myImage= '';
            $scope.icImg = '';
            var placeholderImg = {
                src:'./img/No-image-found.jpg'
            };
            $scope.icImg = placeholderImg.src; 
            var canvas = "";
            var context = "";
            var IC = {
                fractionOfHeightLB :5/54,
                fractionOfHeightUB: 12/54,
                fractionOfWidthLB:30/81,
                fractionOfWidthUB: 57/81,
                value: ""
            };
            var name = {
                fractionOfHeightLB : 17/54,// distance of name from top of IC/ IC total height (lower bound)
                fractionOfHeightUB: 28/54,// distance of name from top of IC/ IC total height (upper bound)
                value: "",
                words:[]
            };            
            var race = {
                fractionOfHeightLB :35/54,
                fractionOfHeightUB: 19/27,
                value: ""
            };
            var dob = {
                fractionOfHeightLB :41/54,
                fractionOfHeightUB: 44/54,
                fractionOfWidthLB: 3/86,
                fractionOfWidthUB: 47/86,
                value:""
            };
            var sex = {
                fractionOfHeightLB :20/27,
                fractionOfHeightUB: 5/6,
                fractionOfWidthLB: 47/85,
                fractionOfWidthUB: 1,
                value: ""
            };
            var country = {
                fractionOfHeightLB :23/27,
                fractionOfHeightUB: 26/27,
                value:""
            };
            var photo = {
                fractionOfHeightLB :5/18,
                fractionOfHeightUB: 20/27,
                fractionOfWidthLB: 1/17,
                fractionOfWidthUB: 22/85
            };
            
            var address = {
                fractionOfHeightLB :41/54,
                fractionOfHeightUB: 25/27,
                value : "",
                words : []
            };
            
            var initialImage = {
                height: 0,
                width: 0
            };
            
            var lineSpace = {
                fractionOfHeight : 1/54
            }
            
            $scope.contactPerson = {
                IC: "",
                name: "",
                dob: "",
                gender: "",
                citizenship: ""
            };
            $scope.editDetailsModal="";
            $ionicModal.fromTemplateUrl('templates/editContactPerson.html', {
                scope: $scope
            })
            .then(function (modal) {
                $scope.editDetailsModal = modal;
            });
            
            $scope.openModal = function(modalName){
                if(modalName ==='edit'){
                    $scope.editDetailsModal.show();
                }
            };
            
            $scope.blockingObject = {block:true};
            var convertDataURLToBlob = function(dataURL){
                img = dataURL;
                var b = atob(img.split(',')[1]);
                var m = img.split(',')[0].split(':')[1].split(';')[0];
                var a = new ArrayBuffer(b.length);
                var i = new Uint8Array(a);
                for (var e = 0; e < b.length; e++) {
                    i[e] = b.charCodeAt(e);
                }
                blob = new Blob([a], {type: m});
            };
            
            $scope.reassembleWords = function(words){
                var space = lineSpace.fractionOfHeight * initialImage.height;
                var wordsLength = Object.keys(words).length;
                var store = [];
                var temp = [];
                var answer = "";
                var minLeft = 99999;
                var top = 0;
                for(var i = 0; i < wordsLength; i++){
                    if(words[i].Top - top >= space ){
                        while(store.length!==0){
                            var popped = store.pop().WordText;
                            answer = answer + " " + popped;
                        }
                        store.length = 0;
                        minLeft = 99999;
                    }
                    if(words[i].Left < minLeft){
                        store.push(words[i]);
                        minLeft = words[i].Left; 
                    }else{
                        var peek = store.slice(-1)[0];
                        while(words[i].Left > peek.Left){
                            var popped = store.pop();
                            temp.push(popped);
                            if(store.length !== 0){
                                peek = store.slice(-1)[0];
                            }else{
                                break;
                            }
                        } 
                        store.push(words[i]);
                        while(temp.length !== 0){
                            store.push(temp.pop());
                        } 
                    }
                    top = words[i].Top;
                }
                //for(var j = 0; j < store.size; j++){
                while(store.length!==0){
                    var popped = store.pop().WordText;
                    answer = answer + " " + popped;
                }
                return answer;
            }; 
         
              $scope.retrieve = function (backOrFront) {
                ocrService.getResults(blob).then(function (response) {
                    $scope.parsedText = JSON.stringify(response);//response.data.ParsedResults[0].ParsedText;
                   // alert($scope.parsedText);
                    //parsedResults = response.data.ParsedResults[0].ParsedText;//TextOverlay.Lines[0].Words;
                  //  alert("Please Wait");
                    var lines = response.data.ParsedResults[0].TextOverlay.Lines;
                    var linesLength = Object.keys(lines).length;
                 //   alert("Thank you for your patience");
                    for (var i = 0; i < linesLength; i++) {
                        var currentLine = lines[i];
                        var wordsLength = Object.keys(currentLine.Words).length;
                        if(backOrFront === 0){
                            var minICH = IC.fractionOfHeightLB * initialImage.height;
                            var maxICH = IC.fractionOfHeightUB * initialImage.height;
                            var minICW = IC.fractionOfWidthLB * initialImage.width;
                            var maxICW = IC.fractionOfWidthUB * initialImage.width;
                            var minNameH = name.fractionOfHeightLB * initialImage.height;
                            var maxNameH = name.fractionOfHeightUB * initialImage.height;
                            var minRaceH = race.fractionOfHeightLB * initialImage.height;
                            var maxRaceH = race.fractionOfHeightUB * initialImage.height;
                            var minDobOrSexH = dob.fractionOfHeightLB * initialImage.height;
                            var maxDobOrSexH = dob.fractionOfHeightUB * initialImage.height;
                            var minDobW = dob.fractionOfWidthLB * initialImage.width;
                            var maxDobW = dob.fractionOfWidthUB * initialImage.width;
                            var minCountryH = country.fractionOfHeightLB * initialImage.height;
                            var maxCountryH = country.fractionOfHeightUB * initialImage.height;
                            
                            for(var z = 0; z < wordsLength ; z++){
                                var currentWord = currentLine.Words[z];
                                if(currentWord.Top>=minICH && currentWord.Top <= maxICH && currentWord.Left>=minICW && currentWord.Left<=maxICW){
                                    IC.value = currentWord.WordText;
                                }else if(currentWord.Top>=minNameH && currentWord.Top <= maxNameH){
                                    name.words.push(currentWord);
                                }else if(currentWord.Top>=minRaceH && currentWord.Top <= maxRaceH){
                                    race.value = currentWord.WordText;
                                }else if(currentWord.Top>=minDobOrSexH && currentWord.Top<=maxDobOrSexH){
                                    if(currentWord.Left>=minDobW && currentWord.Left<=maxDobW){
                                        dob.value = currentWord.WordText;
                                    }else{
                                        sex.value = currentWord.WordText;
                                    }
                                }else if(currentWord.Top>=minCountryH && currentWord.Top<=maxCountryH){
                                    country.value = currentWord.WordText;
                                }
                            }
                        }else{
                            var minAddH = address.fractionOfHeightLB * initialImage.height;
                            var maxAddH = address.fractionOfHeightUB * initialImage.height;
                            for(var z = 0; z < wordsLength ; z++){
                                var currentWord = currentLine.Words[z];
                                if(currentWord.Top>=minAddH && currentWord.Top <= maxAddH){
                                    address.words.push(currentWord);
                                }
                            }
                    }
                }
                if(backOrFront === 0){
                    //$location.path('/backIc');
                    //try{
                    $scope.contactPerson.name = $scope.reassembleWords(name.words);
                    $scope.contactPerson.position = "Director";
                    //}catch(err){
                    //    alert(err);
                    //$scope.openModal("edit");
                    //}
                    
                    $scope.contactPerson.IC = IC.value;
                    $scope.contactPerson.dob = dob.value;
                    $scope.contactPerson.gender = sex.value;
                    $scope.contactPerson.citizenship = "citizen of " + country.value;
                    icData.updateData($scope.contactPerson);
                    $location.path('/backIc');
                   // $scope.openModal("edit"); 
                }else{
                    $scope.contactPerson= icData.getData();                    
                    try{
                        $scope.contactPerson.address = $scope.reassembleWords(address.words);    
                    }catch(err){
                        
                    }
                    //$scope.contactPerson.IC = IC.value;
                    //$scope.contactPerson.dob = dob.value;
                    //$scope.contactPerson.gender = sex.value;
                    //$scope.contactPerson.citizenship = "citizen of " + country.value;
                    $scope.openModal("edit");
                }
            },function(err){
                $scope.error = err;
            });
        };
            
            var toDataURL = function (imageType, quality) {
               // alert(canvas.toDataURL.apply(canvas, arguments));
                return canvas.toDataURL.apply(canvas, arguments);
            };
            $scope.closeModal = function(){
                $scope.editDetailsModal.hide();
            };
            
            $scope.editRecord = function(contactPerson,ic){
                $scope.editDetailsModal.hide();
                $scope.nextP();
                $scope.editDetailsModal.remove();
            };
            
            function detectVerticalSquash(img) {
            var iw = img.naturalWidth, ih = img.naturalHeight;
            var canvas = document.createElement('canvas');
            canvas.width = 1;
            canvas.height = ih;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            var data = ctx.getImageData(0, 0, 1, ih).data;
            // search image edge pixel position in case it is squashed vertically.
            var sy = 0;
            var ey = ih;
            var py = ih;
            while (py > sy) {
                var alpha = data[(py - 1) * 4 + 3];
                if (alpha === 0) {
                    ey = py;
                } else {
                    sy = py;
                }
                py = (ey + sy) >> 1;
            }
            var ratio = (py / ih);
            return (ratio===0)?1:ratio;
            }

            /**
            * A replacement for context.drawImage
            * (args are for source and destination).
            */
            var drawImageIOSFix = function(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
                var vertSquashRatio = detectVerticalSquash(img);
                // Works only if whole image is displayed:
                // ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
                // The following works correct also when only a part of the image is displayed:
                ctx.drawImage(img, sx * vertSquashRatio, sy * vertSquashRatio, 
                                   sw * vertSquashRatio, sh * vertSquashRatio, 
                                   dx, dy, dw, dh );
            };
            var getIcPhoto = function(imageData){
                    var icImg = new Image();
                    var minPhotoH = photo.fractionOfHeightLB * initialImage.height;
                    var maxPhotoH = photo.fractionOfHeightUB * initialImage.height;
                    var minPhotoW = photo.fractionOfWidthLB * initialImage.width;
                    var maxPhotoW = photo.fractionOfWidthUB * initialImage.width;
                    canvas = document.createElement('canvas');//document.getElementById('myCanvas');
                    canvas.width = 100;
                    canvas.height = 100;
                    context = canvas.getContext('2d'); 
                /*    
                    var sourceX = .8/8.5* icImg.width;
                    var sourceY = 1.5/5.4*icImg.height;
                    var sourceWidth =  (1.8/8.5) * icImg.width ; 
                    var sourceHeight = (2.5/5.4) * icImg.height;
                    var destWidth = sourceWidth;
                    var destHeight = sourceHeight;
                    var destX = canvas.width / 2 - destWidth / 2;
                    var destY = canvas.height / 2 - destHeight / 2; */
                    icImg.onLoad = function(){
                        var sourceX = .8/8.5* icImg.naturalWidth;
                        var sourceY = 1.5/5.4*icImg.naturalHeight;
                        var sourceWidth =  (1.8/8.5) * icImg.naturalWidth ; 
                        var sourceHeight = (2.5/5.4) * icImg.naturalHeight;
                        var destWidth = sourceWidth;
                        var destHeight = sourceHeight;
                        var destX = canvas.width / 2 - destWidth / 2;
                        var destY = canvas.height / 2 - destHeight / 2;
                        //context.drawImage(icImg, 0, 0, initialImage.width, initialImage.height);
                        try{
                            //context.drawImage(icImg, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);  
                            drawImageIOSFix(context,icImg, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
                        }catch(err){
                            alert("error in drawing image! : " + err);
                        }
                    }
                    icImg.src = imageData;
                    var icPhotoDataURL = toDataURL("image/png",0.92); 
                    $scope.icImg =  icPhotoDataURL;
                    //img = $scope.imgURI;
                    
            };
            $scope.callTestFunction = function(backOrFront){
                    var imageData = '';
                    $scope.blockingObject.render(function(dataURL){
                        imageData = dataURL;
                        var i = new Image(); 
                        i.addEventListener("load", function(){
                            initialImage.height = this.naturalHeight;
                            initialImage.width = this.naturalWidth;
                        });
                        i.src = imageData;
                    });
                    convertDataURLToBlob(imageData);
                    getIcPhoto(imageData);
                    try{
                        alert("Fetching OCR results. May take a while. Please be patient!");
                        $scope.retrieve(backOrFront); 
                    }catch(e) {
                        //$scope.openModal("edit");
                    };
            };
            
            $scope.blockingObject.callback=function(dataURL){
            };
            
  
            var handleFileSelect=function(evt) {
                var file=evt.currentTarget.files[0];
                var reader = new FileReader();
                reader.onload = function (evt) {
                  $scope.$apply(function($scope){
                    $scope.myImage=evt.target.result;
                  });
                };
                reader.readAsDataURL(file);
            };
            angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
            angular.element(document.querySelector('#fileInput2')).on('change',handleFileSelect);
            
            //$scope.directors = acraEData.getData();
            $scope.imgURI = "";
            var img = "";
            var blob = "";
            var nric = "";
            var flag = false;
            var flag2 = false;
            $scope.names = compData.getData();
            $scope.acraE = acraEData.getData();
            $scope.returnCP = function () {
                $location.path('contactPerson');
            };

            $scope.contactP = function () {
                $location.path('contactPerson');
            };



            $scope.camera1 = function () {
                alert("Please zoom in after taking photo");
                var options = {
                    quality: 100,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 250,
                    targetHeight: 250,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: true
                };

                $cordovaCamera.getPicture(options).then(function (imageData) {
                    $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    img = $scope.imgURI;
                    var b = atob(img.split(',')[1]);
                    var m = img.split(',')[0].split(':')[1].split(';')[0];
                    var a = new ArrayBuffer(b.length);
                    var i = new Uint8Array(a);
                    for (var e = 0; e < b.length; e++) {
                        i[e] = b.charCodeAt(e);
                    }
                    blob = new Blob([a], {type: m});
                    $scope.retrieve();
                }, function (err) {
                    // An error occured. Show a message to the user
                });
            }

            $scope.camera2 = function () {
                alert("Please zoom in after taking photo");
                var options = {
                    quality: 100,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 278,
                    targetHeight: 278,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: true
                };

                $cordovaCamera.getPicture(options).then(function (imageData) {
                    $scope.imgURI2 = "data:image/jpeg;base64," + imageData;
                    img2 = $scope.imgURI;
                    $scope.updatePerson();

                }, function (err) {
                    // An error occured. Show a message to the user
                });
            };

            $scope.updatePerson = function () {
                var link = 'http://52.74.181.188/swifty/upload.php';
                $http.post(link, {image: $scope.imgURI2, id: $scope.names[0].regNum}).success(function (response) {
                    $scope.user = response.records;
                    flag2 = true;                                                                                                                  //$location.path('/businessDetail');
                }).error(function (error) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'ERROR! ',
                        template: error,
                        buttons: [{text: '<b> OK </b>', type: 'button-assertive'}]
                    })
                });
            };
            
        $scope.getDirector = function(ic){
            for(i = 0; i < $scope.directors.length; i++){
                var contact = $scope.directors[i];
                if(contact.nric === ic){
                    return contact;
                }
            }
        };
        
        
        $scope.verify = function (nric) {
            for (var i = 0; i < $scope.acraE.length; i++) {
                if ($scope.acraE[i].nric === nric) {
                    return i;
                }
            }
            ;
            return -1;
        };

        $scope.nextP = function () {
            //alert(JSON.stringify($scope.contactPerson));
            if(!($scope.contactPerson === undefined)){
                var check = $scope.verify($scope.contactPerson.IC);
            }
            var link = 'http://52.74.181.188/swifty/addPerson.php';
            try{
                $http.post(link, {image: $scope.croppedImage, id: $scope.names[0].regNum, ic: $scope.contactPerson.IC, citizen: $scope.contactPerson.citizenship, position: $scope.contactPerson.position, eName: $scope.contactPerson.name, address: $scope.contactPerson.address}).success(function (response) {
                    $scope.addApplication($scope.contactPerson.IC);
                }).error(function (error) {
                    $location.path('/businessDetail');
                });
            }catch(err){
                 $location.path('/businessDetail');
            }
        }; 

        $scope.addApplication = function (nric) {
            var link = 'http://52.74.181.188/swifty/addApp.php';
            try{
                $http.post(link, {id: $scope.names[0].regNum, ic: nric, rm: localStorage.getItem("rm")}).success(function (response) {
                    $location.path('/businessDetail');
                }).error(function (error) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'ERROR! ',
                        template: error,
                        buttons: [{text: '<b> OK </b>', type: 'button-assertive'}]
                    })
                });
            }catch(err){
               
            }
        };

        $scope.switch = false;
        $scope.showText = function (show) {
            $scope.switch = show;
        };


            $scope.back = function () {
                var alertPopup = $ionicPopup.alert({
                    title: 'Confirm',
                    template: 'Verify ACRA Business Details?',
                    buttons: [{text: 'Cancel'}, {text: '<b> OK </b>', type: 'button-assertive', onTap: function (e) {
                                $location.path('receivedAcraDetails');
                            }}]
                });
            };

            $scope.logout = function () {
                var alertPopup = $ionicPopup.alert({
                    title: 'Confirm Logout?',
                    buttons: [{text: 'Cancel', type: 'button-light'}, {text: '<b> OK </b>', type: 'button-assertive', onTap: function (e) {
                                $location.path('/home');
                            }}]
                });
            };

            $scope.menu = function () {
                var alertPopup = $ionicPopup.alert({
                    title: 'Return to Main Menu',
                    buttons: [{text: 'Cancel', type: 'button-light'}, {text: '<b> OK </b>', type: 'button-assertive', onTap: function (e) {
                                $location.path('/menu');
                            }}]
                });
            };
        })
		