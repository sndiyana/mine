angular.module('starter.controllers')

.controller('menuCtrl', function ($scope, $http, $ionicPopup, $location) {
    $scope.name = localStorage.getItem("rm");
    $scope.data = {};
    $scope.apply = function () {
        $location.path('/acraDetails');
    }

    $scope.appt = function () {
        $location.path('/appointment');
    };

    $scope.track = function () {
      $location.path('/tracker');
    };
    $scope.logout = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Confirm Logout?',
            buttons: [{text: 'Cancel', type: 'button-light'}, {text: '<b> OK </b>', type: 'button-assertive', onTap: function (e) {
                        $location.path('/home');
                    }}]
        })
    };
})

