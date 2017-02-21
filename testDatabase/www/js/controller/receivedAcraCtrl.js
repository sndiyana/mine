angular.module('starter.controllers')

.controller('ReceivedAcraDetailsCtrl', function ($scope, $http, $location, $ionicPopup, acraEData, compData, $ionicListDelegate, ocrService) {

            //collapse and expand
            $scope.show1 = true;
            $scope.show2 = true;
            $scope.show3 = true;
			
			//About Company tab
            $scope.click1 = function ($event) {
                $event.stopPropagation();
				if($scope.show1 == false) {
					$scope.show1 = !$scope.show1;
				}
                $scope.show2 = false;
                $scope.show3 = false;
                $ionicListDelegate.closeOptionButtons();
            }
			//Contact Details tab
            $scope.click2 = function ($event) {
                $event.stopPropagation();
				if($scope.show2 == false) {
					$scope.show2 = !$scope.show2;
				}
                $scope.show1 = false;
                $scope.show3 = false;
                $ionicListDelegate.closeOptionButtons();
            }
			// Employee Profile tab
            $scope.click3 = function ($event) {
                $event.stopPropagation();
				if($scope.show3 == false) {
					$scope.show3 = !$scope.show3;
				}
                $scope.show2 = false;
                $scope.show1 = false;
                $ionicListDelegate.closeOptionButtons();
            }

            $scope.hideAll = function () {
                $scope.show1 = false;
                $ionicListDelegate.closeOptionButtons();
            };
			
			//retrieve company info
            $scope.names = compData.getData();
           
		   //retrieve employee list
            $scope.loadAcraE = function () {
                $scope.directors = acraEData.getData();
            };

            $scope.loadAcraE();

            $scope.directors = acraEData.getData();

            $scope.back = function () {
                var alertPopup = $ionicPopup.alert({
                    title: 'Confirm',
                    template: 'Process a new business?',
                    buttons: [{text: 'Cancel'}, {text: '<b> OK </b>', type: 'button-assertive', onTap: function (e) {
                                $location.path('acraDetails');
                            }}]
                });
            };

            $scope.next = function () {
                //transferring from acra db to our db
				if($scope.names[0].address.indexOf("#") !== -1) {
				$scope.names[0].address = ($scope.names[0].address).replace("#","+%23");
				}
                $http.post("http://52.74.181.188/swifty/setBusinessDetails.php?regNum=" + $scope.names[0].regNum + "&activity=" + $scope.names[0].activity + "&name=" + $scope.names[0].name + "&phone=" + $scope.names[0].phone + "&fax=" + $scope.names[0].fax + "&address=" + $scope.names[0].address + "&company_type=" + $scope.names[0].company_type);
                for (i = 0; i < $scope.directors.length; i++) {
                    $http.post("http://52.74.181.188/swifty/setBusinessContact.php?regNum=" + $scope.names[0].regNum + "&IC=" + $scope.directors[i].nric + "&name=" + $scope.directors[i].eName + "&position=" + $scope.directors[i].position + "&citizenship=" + $scope.directors[i].citizen);
                }
                $location.path('camera');
                //$location.path('/businessDetail');
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