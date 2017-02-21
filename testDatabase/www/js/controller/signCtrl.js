angular.module('starter.controllers')

.controller('signCtrl', function ($scope, $http, $ionicPopup, $location, compData) {
               $scope.setting = {};
    $scope.names = compData.getData();
               
    $scope.loadContactPerson = function () {
        $http.post("http://52.74.181.188/swifty/loadSignatory.php?reg_num=" + $scope.names[0].regNum).success(function (response) {
            $scope.contactPerson = response.records;
        });
               
    };
               
    $scope.loadContactPerson();
               
    $scope.next = function() {
			$http.post("http://52.74.181.188/swifty/updateSignCondition.php?regNum=" + $scope.names[0].regNum + "&c=" + $scope.setting.choice).success(function (response) {
						$location.path('onlineAcct');
      });
    };
               
})