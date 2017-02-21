angular.module('starter.controllers')

.controller('AcraDetailsCtrl', function ($scope, $state, $location, $http, $ionicPopup, compData, acraEData) {
    $scope.data = {};
    var regNum = "";
    var name = "";
    var year = "";

    $scope.next = function () {
        regNum = $scope.data.regNum;
        name = $scope.data.regName;
        year = $scope.data.regYear;
		//retrieving company info
        if (regNum || (name && year)) {
            $http.post("http://52.74.181.188/swifty/searchAcra.php?id=" + regNum + "&name=" + name + "&year=" + year).success(function (response) {
                if (response.records[0].status == "error") {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Unable to Process ',
                        template: response.records[0].msg,
                        buttons: [{text: '<b> OK </b>', type: 'button-assertive', onTap: function (e) {
                                    $location.path('acraDetails');
                                }}]
                    })
                } else {
					//storing data in a service for info to be reused later
                    compData.updateData(response.records);
                    var r = response.records[0].regNum;

                    $http.post("http://52.74.181.188/swifty/loadAcraE.php?id=" + r).success(function (response) {
                        $scope.acraE = response.records;
                        acraEData.updateData($scope.acraE);
						localStorage.setItem("addV",0);
                        $state.go('receivedAcraDetails');
                       //$location.path('cardDesign');
                    })
                }
            })
        } else {
            alert("Please fill out either your company's registration no OR your company's name and year of incorporation");
        }

    };

    $scope.logout = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Confirm Logout?',
            buttons: [{text: 'Cancel', type: 'button-light'}, {text: '<b> OK </b>', type: 'button-assertive', onTap: function (e) {
                        $location.path('/home');
                    }}]
        })
    };

    $scope.menu = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Return to Main Menu',
            buttons: [{text: 'Cancel', type: 'button-light'}, {text: '<b> OK </b>', type: 'button-assertive', onTap: function (e) {
                        $location.path('/menu');
                    }}]
        })
    };


})

