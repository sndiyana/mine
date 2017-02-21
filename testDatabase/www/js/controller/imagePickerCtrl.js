angular.module('starter.controllers')

 .controller('ImagePickerController', function ($scope, $cordovaCamera, $jrCrop, $http, $ionicPopup, compData, $ionicModal, addedCardData, $location, $ionicModal) {
			//Default values for Dropdown list
            $scope.showFirstCard = false;
            $scope.showSecondCard = false;
            $scope.showThirdCard = false;
            $scope.showSampleCard = true;
			var choice;
			
			//show or upload company card design
            $scope.firstCard = function () {
				choice = 'customlogo';
                $scope.showFirstCard = true;
                $scope.showSecondCard = false;
                $scope.showThirdCard = false;
                $scope.showSampleCard = false;
            };
			
			//show Company name card design
            $scope.secondCard = function () {
				choice = 'ocbclogo';
                $scope.showSecondCard = true;
                $scope.showFirstCard = false;
                $scope.showThirdCard = false;
                $scope.showSampleCard = false;
            };
			
			//show default OCBC card design
            $scope.thirdCard = function () {
				choice = 'customname';
                $scope.showThirdCard = true;
                $scope.showFirstCard = false;
                $scope.showSecondCard = false;
                $scope.showSampleCard = false;
            };

            $scope.names = compData.getData();
            // alert($scope.names[0].regNum);

            $scope.back = function () {
                var alertPopup = $ionicPopup.alert({
                    title: 'Edit online Account?',
                    buttons: [{text: 'Cancel', type: 'button-light'}, {text: '<b> OK </b>', type: 'button-assertive', onTap: function (e) {
                                $location.path('/onlineAcct');
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

            $scope.contact = {
                IC: '', 
				reg_num: '',
                name: '',
                position: '',
                citizenship: '',
                dob: '',
                contact_num: '',
                email: '',
                gender: ''
            };

            $scope.loadContact = function () {
                $http.post("http://52.74.181.188/swifty/loadSignatory.php?reg_num="  + $scope.names[0].regNum).success(function (response) {
                    $scope.contact = response.records;
                    // alert($scope.contact);
                });
            };

            $scope.loadContact();
			
			
			//Start updating Card Details for chosen signatory			
			$ionicModal.fromTemplateUrl('templates/updateCardDetails.html', {
                scope: $scope,
            }).then(function (modal) {
                $scope.modal = modal;
            });

            $scope.openModal = function (index) {
                $scope.contactSelected = $scope.contact[index];
                $scope.modal.show();
            };

            $scope.closeModal = function () {
                $scope.modal.hide();
            };
			
            //Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function () {
                $scope.modal.remove();
            });

            // Execute action on hide modal
            $scope.$on('modal.hidden', function () {
                // Execute action
            });

            // Execute action on remove modal
            $scope.$on('modal.removed', function () {
                // Execute action
            });

			$scope.editRecord = function (contact, ic) {
                $http.post("http://52.74.181.188/swifty/addCardHolder.php?id=" + $scope.names[0].regNum + "&n=" + contact.name + "&IC=" + ic + "&w=" + contact.netts + "&s=" + contact.sign).success(function () {
                    $scope.reset;

                });

                $scope.modal.hide();
            };

            $scope.getImage = function () {
                // Image picker will load images according to these settings
                var options = {
                    quality: 100,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    //sourceType:srcType,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    //targetWidth: 250,
                    //targetHeight: 250,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };

                $cordovaCamera.getPicture(options).then(function (imageData) {
                    $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    $jrCrop.crop({
                        url: $scope.imgURI,
                        width: 410,
                        height: 100
                    }).then(function (canvas) {
                        $scope.image = canvas.toDataURL();
                    }, function () {
                        // User canceled or couldn't load image.
                    });

                }, function (err) {
                    // An error occured. Show a message to the user
                });
            };

            $scope.takeImage = function () {
                var options = {
                    quality: 100,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 400,
                    targetHeight: 400,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
                $cordovaCamera.getPicture(options).then(function (imageData) {
                    $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    $jrCrop.crop({
                        url: $scope.imgURI,
                        width: 488,
                        height: 103
                    }).then(function (canvas) {
                        // success!
                        //var image = canvas.toDataURL();
                        $scope.image = canvas.toDataURL();
                    }, function () {
                        // User canceled or couldn't load image.
                    });

                }, function (err) {
                    // An error occured. Show a message to the user
                });
                //});
            };
			
			//upload logo to db based on user selection
            $scope.uploadLogo = function (choice) {
                //$location.path('/applicationSummary');
                if (choice === "customlogo") {
                    var link = 'http://52.74.181.188/swifty/uploadLogo.php';
                    $http.post(link, {image: $scope.image, id: $scope.names[0].regNum}).success(function (response) {
                        $scope.user = response.records;
                        $location.path('/applicationSummary');
                    }).error(function (error) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'ERROR! ',
                            template: error,
                            buttons: [{text: '<b> OK </b>', type: 'button-assertive'}]
                        })
                    });
                } else if (choice === "customname") {
                    var link = 'http://52.74.181.188/swifty/uploadLogo.php';
                    $http.post(link, {image: choice.custom, id: $scope.names[0].regNum}).success(function (response) {
                        $scope.user = response.records;
						$location.path('/applicationSummary');
                    }).error(function (error) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'ERROR! ',
                            template: error,
                            buttons: [{text: '<b> OK </b>', type: 'button-assertive'}]
                        })
                    });
                } else {
                    var link = 'http://52.74.181.188/swifty/uploadLogo.php';
                    $http.post(link, {image: "ocbclogo", id: $scope.names[0].regNum}).success(function (response) {
                        $scope.user = response.records;
                        $location.path('/applicationSummary');
                    }).error(function (error) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'ERROR! ',
                            template: error,
                            buttons: [{text: '<b> OK </b>', type: 'button-assertive'}]
                        })
                    });
                }
            };

        }
        )