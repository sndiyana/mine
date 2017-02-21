angular.module('starter.controllers')

.controller('TrackerCtrl', function ($ionicPopup,$location,$scope,$compile,$ionicModal,$filter,$http) {
   $scope.username=localStorage.getItem("rm"); 
   $scope.labels = ["Target", "Actual"];
  $scope.data = [];
  $scope.colors=["#46BFBD","#FDB45C"];
   $scope.options = {legend: {display: true,onClick: function (e) {
   e.stopPropagation();}}};
   $scope.date =  $filter('date')(new Date(), "MMMM yyyy");
    $scope.month =  $filter('date')(new Date(), "MM");
  $scope.loadProgress = function () {
    $http.post("http://52.74.181.188/swifty/loadProgress.php?username=" + $scope.username + "&id="+$scope.month).success(function (response) {
             $scope.results = response.records; 
              $scope.data1= response.records[0]["actual"];     
              $scope.data2= response.records[0]["target"]; 
              $scope.data=[$scope.data1,$scope.data2];     
            
    });
  };
  
  $scope.loadProgress();
 
      $scope.menu = function() {
      $location.path("/menu");
      }
      $scope.tracker = function() {
      $location.path("/tracker");
      }
      $scope.trackerHistory = function() {
        $location.path("/tracker-history");
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