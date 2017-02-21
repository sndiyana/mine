angular.module('starter.controllers')

.controller('ServicesCtrl', function ($scope, $ionicPopup, compData, addedServicesData, $http, $ionicModal, $filter, $location, acctTypeData) {
          //  $scope.company = compData.getData();
			$scope.acctName = acctTypeData.getData();
			$scope.acra = compData.getData()[0];
            var regNum = $scope.acra.regNum;
						
            $scope.results = {};
            //added
            $scope.selected = [];
            $scope.servicesSelected = [];
            $scope.services = {
                id: '',
                serviceName: '',
                price: '',
                info: ''
            };

            $scope.resetServices = function () {
                $scope.servicesSelected = [];
            };

            $scope.loadServices = function () {
                $http.post("http://52.74.181.188/swifty/loadServices.php?reg_num=" + regNum).success(function (response) {
                    $scope.services = response.records;
                    $scope.selected = addedServicesData.getData();
                });
            };
						
            $scope.$on('$ionicView.enter', function () {
                // code to run each time view is entered
                $scope.loadServices();
            });

            //$scope.loadServices();
            $scope.editServiceRecord = function (data) {
							//alert(data);
                $scope.data = $filter('filter')(data, {checked: true})
                var $arr = "";
                for (var i = 0; i < data.length; i++) {
                    if (data[i].checked) {
                        $arr += data[i].id + ",";
                    }
                }
                $http.post("http://52.74.181.188/swifty/confirmServices.php?reg_num=" + regNum + "&data=" + $arr + "&acct=" + $scope.acctName).success(function () {
                    //$scope.PostDataResponse = $data;
                    $scope.loadServices();
                    $location.path('/acctSummary');

                });

            };

            $scope.back2 = function () {
                var alertPopup = $ionicPopup.alert({
                    title: 'Confirm',
                    template: 'Select a new account?',
                    buttons: [{text: 'Cancel'}, {text: '<b> OK </b>', type: 'button-assertive', onTap: function (e) {
                                $location.path('/selectAcct');
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