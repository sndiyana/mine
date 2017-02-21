angular.module('starter.controllers')

.controller('HomeCtrl', function ($scope, $location, $ionicPopup, $http) {
    $scope.data = {};
    var otp;
	var hp;
	var name;

    $scope.login = function () {
		$scope.loginForm={};
		var shortHP;
		//Create a random otp number 
		var r = Math.floor(Math.random() * (999999 - 1111 + 1)) + 1111;
		$http.post("http://52.74.181.188/swifty/loadRM.php?id=" + $scope.data.id).success(function (response) {
			hp = response.records[0].hp;
			localStorage.setItem("rm", $scope.data.id);
			shortHP = hp.substring(7);
			otp = r;

			//shows otp popup on screen
			$http.post("http://52.74.181.188/swifty/otpSMS.php?otp=" + otp + "&hp=" + hp).success(function (response) {
				var myPopup = $ionicPopup.show({
                    templateUrl: "templates/otpForm.html",
                    title: 'Please enter the OTP sent to ****' + shortHP,
                    scope: $scope,
                    buttons: [
                        {text: 'Cancel'},
                        {text: '<b>Save</b>',
                            type: 'button-assertive submit',
                            onTap: function (e) {
                                if ($scope.loginForm.otp == otp) {
                                    $location.path('/menu');
                                } else {
                                    alert("Incorrect OTP");
                                }
                            }
                        },
                    ]
                });
			});
        });
    }
})

