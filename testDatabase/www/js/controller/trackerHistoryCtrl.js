angular.module('starter.controllers')

 .controller('TrackerHistoryCtrl', function ($ionicPopup,$location,$scope,$compile,$ionicModal,$http) {
  $scope.username=localStorage.getItem("rm");   
  $scope.labels = ['Jan','Feb','Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov','Dec'];
  $scope.series = ['Actual', 'Target'];
  $scope.colors=["#46BFBD","#FDB45C"];
  $scope.data = [
    [0,0,0,0,1,0,0,0,2,0,0,1],
    [10,10,10,10,10,10,10,10,10,10,10,10]
  ];
  $scope.loadProgress = function () {
    $http.post("http://52.74.181.188/swifty/loadProgressHistory.php?username="+$scope.username).success(function (response) {
              $scope.results = response.records; 
              var a= response.records[0]["actual"]; 
              var actual = a.split(',').map(Number);              
              var t= response.records[0]["target"]; 
              var target = t.split(',').map(Number);              
              $scope.data=[actual,target];    
		
            
    });
  };
  $scope.loadProgress();
  
      $scope.menu = function() {
      $location.path("/menu");
      }
      $scope.tracker = function() {
      $location.path("/tracker");
      }
	  $scope.logout = function () {
		var alertPopup = $ionicPopup.alert({
		title: 'Confirm Logout?',
		buttons: [{text: 'Cancel', type: 'button-light'}, {text: '<b> OK </b>', type: 'button-assertive', onTap: function (e) {
					$location.path('/home');
				}}]
	});
    };
  })