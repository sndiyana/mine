
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova','starter.controllers','starter.service', 'ngImgCrop', 'starter.services', 'jrCrop', 'ngMessages','ui.calendar',"chart.js"])

        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                $ionicPlatform.ready(function () {
                    if (window.cordova && window.cordova.plugins.Keyboard) {
                        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                        // for form inputs)
                        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                        // Don't remove this line unless you know what you are doing. It stops the viewport
                        // from snapping when text inputs are focused. Ionic handles this internally for
                        // a much nicer keyboard experience.
                        cordova.plugins.Keyboard.disableScroll(true);
                    }
                    if (window.StatusBar) {
                        StatusBar.styleDefault();
                    }
                });
            });
        })
  
  
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider

                    .state('acraDetails', {
                         cache: false,
                        url: "/acraDetails",
                        templateUrl: "templates/acraDetails.html",
                        controller: "AcraDetailsCtrl"
                    })

                    .state('completeAcct', {
                         cache: false,
                        url: "/completeAcct",
                        templateUrl: "templates/completeAcct.html",
                        controller: "ApplicationSummaryCtrl"
                    })


                    .state('receivedAcraDetails', {
                         cache: false,
                        url: "/receivedAcraDetails",
                        templateUrl: "templates/receivedAcraDetails.html",
                        controller: "ReceivedAcraDetailsCtrl"
                    })

                    .state('camera', {
                        cache: false,
                        url: "/camera",
                        templateUrl: "templates/camera.html",
                        controller: "CameraCtrl"
                    })
                    
                    .state('backIc', {
                        cache: false,
                        url: "/backIc",
                        templateUrl: "templates/backIc.html",
                        controller: "CameraCtrl"
                    })
                    

                    .state('businessDetail', {
                        cache: false,
                        url: "/businessDetail",
                        templateUrl: "templates/businessDetails.html",
                        controller: "detailCtrl"
                    })

                    .state('selectAcctType', {
                         cache: false,
                        url: "/selectAcct",
                        templateUrl: "templates/selectAcctType.html", //"templates/selectAcctType.html"
                        controller: "detailCtrl"
                    })

                    .state('uploadDocument', {
                        cache: false,
                        url: "/uploadDocument",
                        templateUrl: "templates/uploadDocument.html",
                        controller: "CameraCtrl"
                    })

                    .state('home', {
                         cache: false,
                        url: "/home",
                        templateUrl: "templates/home.html",
                        controller: "HomeCtrl"
                    })

                    .state('cardDesign', {
                         cache: false,
                        url: "/cardDesign",
                        templateUrl: "templates/cardDesign.html",
                        controller: "ImagePickerController"
                    })

                    .state('applicationSummary', {
                         cache: false,
                        url: "/applicationSummary",
                        templateUrl: "templates/applicationSummary.html",
                        controller: "ApplicationSummaryCtrl"
                    })


                    .state('termsAndConditions', {
                         cache: false,
                        url: "/termsAndConditions",
                        templateUrl: "templates/t&c.html",
                        controller: "ApplicationSummaryCtrl"
                    })

                    .state('menu', {
                         cache: false,
                        url: "/menu",
                        templateUrl: "templates/menu.html",
                        controller: "menuCtrl"
                    })

                    .state('editServices', {
                         cache: false,
                        url: "/editServices",
                        templateUrl: "templates/editServices.html",
                        controller: "ServicesCtrl"
                    })

                    .state('acctSummary', {
                        cache: false,
                        url: "/acctSummary",
                        templateUrl: "templates/acctSummary.html",
                        controller: "AccountSummaryCtrl"
                    })

                    .state('contactPerson', {
                        cache: false,
                        url: "/contactPerson",
                        templateUrl: "templates/contactPerson.html",
                        controller: "contactPersonCtrl"
                    })

                    .state('onlineAcct', {
                        cache: false,
                        url: "/onlineAcct",
                        templateUrl: "templates/onlineAcct.html",
                        controller: "onlineCtrl"
                    })
										
                    .state('signCondition', {
                       cache: false,
                        url: "/signCondition",
                       templateUrl:"templates/signCondition.html",
                       controller: "signCtrl"
                    })
					
					 .state('tracker', {
                        cache: false,
                        url: "/tracker",
                        templateUrl: "templates/tracker.html",
                        controller: "TrackerCtrl"
                      
                    })
					 .state('tracker-history', {
                        cache: false,
                        url: "/tracker-history",
                        templateUrl: "templates/tracker-history.html",
                        controller: "TrackerHistoryCtrl"
                      
                    })
					.state('poa', {
                        cache: false,
                        url: "/poa",
                        templateUrl: "templates/poa.html",
                        controller: "ReceivedAcraDetailsCtrl"
                      
                    })
					.state('appointment', {
                        cache: false,
                        url: "/appointment",
                        templateUrl: "templates/calendar.html",
                        controller: "AppointmentCtrl"
                    });

            $urlRouterProvider.otherwise("/home");

        })