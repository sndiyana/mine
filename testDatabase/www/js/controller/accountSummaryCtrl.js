angular.module('starter.controllers')

.controller('AccountSummaryCtrl', function ($scope, compData, addedServicesData, acctTypeData, priceData, $http, $ionicModal, $filter, $location, $ionicPopup) {
            //$scope.company = compData.getData();
			$scope.acra = compData.getData()[0];
            var regNum = $scope.acra.regNum;
           // $scope.totalPrice = 0;
            $scope.acctType = "";

            $scope.retrieveAcctType = function () {
                $scope.acctType = acctTypeData.getData();
            };
            $scope.retrieveAcctType();
            $scope.loadSavedServices = {
                id: '',
                serviceName: '',
                price: '',
            };


            $scope.loadSelectedServices = function () {
                $http.post("http://52.74.181.188/swifty/loadSelectedServices.php?reg_num=" + regNum).success(function (response) {
                    $scope.loadSavedServices = response.records;
					$scope.totalPrice = 0;
                    for (var i = 0; i < $scope.loadSavedServices.length; i++) {
                        $scope.totalPrice += parseInt($scope.loadSavedServices[i].price);
                    }
                    priceData.updateData($scope.totalPrice);
                    addedServicesData.updateData($scope.loadSavedServices);
                });
            };

            $scope.loadSelectedServices();

            $scope.editAcct = function () {
                $location.path('/selectAcct');
            };

            // edit below path (To: chaw su/susan)
            $scope.next = function () {
                $location.path('/contactPerson');
                //$location.path('/cardDesign');
            };

            $scope.back = function () {
                var alertPopup = $ionicPopup.alert({
                    title: 'Confirm',
                    template: 'Edit services?',
                    buttons: [{text: 'Cancel'}, {text: '<b> OK </b>', type: 'button-assertive', onTap: function (e) {
                                $location.path('/editServices');
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



            $scope.removeServiceRecord = function (id) {
                $http.post("http://52.74.181.188/swifty/removeServices.php?reg_num=" + regNum + "&id=" + id).success(function () {
                    $scope.loadSelectedServices();
                    $location.path('/acctSummary');
                });
            };

        }
        )