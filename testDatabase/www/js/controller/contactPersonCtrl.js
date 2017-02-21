angular.module('starter.controllers')

.controller('contactPersonCtrl', function ($scope, $ionicPopup, $http, $ionicModal, $filter, $location, $window, compData, contactList, acraEData) {
            $scope.names = compData.getData();
            var counter = 0;

            $scope.acraE = acraEData.getData();

            $scope.results = {};
            $scope.contactPersons = [{
            }];

            $scope.reset = function () {
                $scope.contactPerson = {
                    IC: '',
                    reg_num: '',
                    name: '',
                    position: '',
                    citizenship: '',
                    dob: '',
                    contact_num: '',
                    email: '',
                    gender: ''
                };
            };

            $scope.resetServices = function () {
                $scope.servicesSelected = [];
            };
            $scope.loadContactPerson = function () {
                $http.post("http://52.74.181.188/swifty/loadContactPerson.php?reg_num=" + $scope.names[0].regNum).success(function (response) {
                    $scope.contactPersons = response.records;
                });

            };

            $scope.loadContactPerson();

            $ionicModal.fromTemplateUrl('templates/editContactPerson.html', {
                scope: $scope,
            }).then(function (modal) {
                $scope.modal1 = modal;
            });
            $ionicModal.fromTemplateUrl('templates/addContactPerson.html', {
                scope: $scope,
            }).then(function (modal) {
                $scope.modal2 = modal;
            });
            $scope.openModal = function (index) {
                $scope.contactSelected = $scope.contactPersons[index];
                if (index == null) {
                    $scope.addContact = {};
                    $scope.modal2.show();
                } else {
                    $scope.modal1.show();
                }
            };

            $scope.closeModal = function () {
                $scope.modal1.hide();
            };

            $scope.openModal2 = function () {
                $scope.modal2.show();
            };

            $scope.closeModal2 = function () {
                $scope.modal2.hide();
            };
            //Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function () {
                $scope.modal.remove();
            });

            // Execute action on hide modal
            $scope.$on('modal.hidden', function () {
                // Execute action
            });

            // Execute action on remove modal
            $scope.$on('modal.removed', function () {
                // Execute action
            });

            // Image upload
            $scope.showPopup = function () {
                $scope.data = {}


                var myPopup = $ionicPopup.show({
                    template: '<input type = "text" ng-model = "data.model">',
                    title: 'Pop up to choose image',
                    subTitle: '',
                    scope: $scope,
                    buttons: [
                        {text: 'Cancel'}, {
                            text: '<b>Save</b>',
                            type: 'button-positive',
                            onTap: function (e) {

                                if (!$scope.data.model) {
                                    //don't allow the user to close unless he enters model...
                                    e.preventDefault();
                                } else {
                                    return $scope.data.model;
                                }
                            }
                        }
                    ]
                });

                myPopup.then(function (res) {
                });
            };
        /*$scope.showAddContactModal = function () {
                $scope.modal2.show();
        };*/

            $scope.deleteConfirm = function (ic) {

                var confirmPopup = $ionicPopup.confirm({
                    title: 'Delete contact person???',
                    template: 'Deleting will lost all the data of this contact.',
                    buttons: [
                        {text: 'Cancel'},
                        {text: 'YES',
                            type: 'button-positive',
                            onTap: function (e) {
                                $http.post("http://52.74.181.188/swifty/deleteContactPerson.php?ic=" + ic).success(function () {
                                    $scope.loadContactPerson();
                                    $scope.reset();

                                })

                            }}
                    ]
                });
            };

            $scope.addContactRecord = function (form) {
                /*if (!(contact.name === "")
                        && !(contact.ic === "")
                        && !(contact.gender === "")
                        && !(contact.dob === "")
                        && !(contact.email === "")
                        && !(contact.contact_no === "")
                        && !(contact.citizenship === "")
                        && !(contact.position === "")) {
                    contact.dob = $filter('date')(contact.dob, "yyyy-MM-dd");

                    if (contact.ic == "S9335483D" || contact.ic == "S9335483O" || contact.ic == "s9335483D") {
                        $http.post("http://52.74.181.188/swifty/addContactPerson.php?name=" + contact.name + "&ic=" + contact.ic
                                + "&contact_no=" + contact.contact_no
                                + "&email=" + contact.email + "&reg_num=" + $scope.names[0].regNum + "&dob=" + contact.dob + "&gender=" + contact.gender
                                + "&citizenship=" + contact.citizenship + "&position=" + contact.position).success(function () {
                            //$scope.reset();
                            $scope.loadContactPerson();
                            $scope.reset();
                            // alert();
                        });
                    } else {

                        alert("User is not authorized");
                    }

                    $scope.modal2.hide();
                }*/
                if(form.$valid){
                   $scope.addContact.dobReformat = $filter('date')($scope.addContact.dob, "yyyy-MM-dd"); 
                //$scope.addContact.dob | "yyyy-mm-dd";
                    //$scope.addContact.address = $scope.addContact.adress + " Singapore " + $scope.addContact.address.postal;
                    $http.post("http://52.74.181.188/swifty/addContactPerson.php?name=" + $scope.addContact.name + "&ic=" + $scope.addContact.ic
                                + "&contact_no=" + $scope.addContact.contact_no
                                + "&email=" + $scope.addContact.email + "&reg_num=" + $scope.names[0].regNum + "&dob=" + $scope.addContact.dobReformat + "&gender=" + $scope.addContact.gender
                                + "&citizenship=" + $scope.addContact.citizenship + "&position=" + $scope.addContact.position).success(function () {
                            //$scope.reset();
                            $scope.loadContactPerson();
                            $scope.modal2.hide();
                    });
                }
            };


            $scope.getContactPerson = function (ic) {
                for (i = 0; i < $scope.contactPersons.length; i++) {
                    var contact = $scope.contactPersons[i];
                    if (contact.IC === ic) {
                        return contact;
                    }
                }
            };

            $scope.contactSwitch = function (ic, isChecked) {
                var contactSelected = $scope.getContactPerson(ic);
                contactSelected.isContact = isChecked;
            };

            $scope.signatorySwitch = function (ic, isChecked) {
                var contactSelected = $scope.getContactPerson(ic);
                contactSelected.isSignatory = isChecked;
            };

            $scope.saveContactSignatory = function () {
                for (i = 0; i < $scope.contactPersons.length; i++) {
                    var contact = $scope.contactPersons[i];
                    $http.post("http://52.74.181.188/swifty/saveContactSignatory.php?IC=" + contact.IC + "&isSignatory=" + contact.isSignatory + "&isContact=" + contact.isContact).success(function () {
                    });
                }
            };

            $scope.editRecord = function (contact, ic) {
                if (ic == "S9412721A") {
                    localStorage.setItem("toCall", contact.contact_no);
                    localStorage.setItem("toEmail", contact.email);
                } else {
                    localStorage.setItem("toCall2", contact.contact_no);
                    localStorage.setItem("toEmail2", contact.email);
                }
                // alert(ic);

                $http.post("http://52.74.181.188/swifty/editContactPerson.php?contact_no=" + contact.contact_no
                        + "&email=" + contact.email + "&IC=" + ic).success(function () {

                    $scope.loadContactPerson();
                    $scope.reset;


                });

                $scope.modal1.hide();
            };

            //check if ID is uploaded or not and show message

            /*           $scope.showMessage=function (index) {
             }
             */

            $scope.showMessage = false;
            //alert($scope.results);


            $scope.back = function () {
                var alertPopup = $ionicPopup.alert({
                    title: 'Confirm',
                    template: 'View Summary?',
                    buttons: [{text: 'Cancel'}, {text: '<b> OK </b>', type: 'button-assertive', onTap: function (e) {
                                $location.path('acctSummary');
                            }}]
                });
            };

            $scope.next = function () {
                $scope.saveContactSignatory();
							$location.path('signCondition');

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

        .controller('onlineCtrl', function ($scope, $ionicPopup, $http, $ionicModal, $filter, $location, compData) {
            $scope.names = compData.getData();
                    
            $scope.cName = $scope.names[0].name;
            $scope.cName = $scope.cName + "SG";
                
            $scope.username = "";
            $scope.updateUsename = false;

            $scope.editCU = function () {
                if($scope.updateUsename) {
                    $scope.updateUsename = false;
                } else {
                    $scope.updateUsename = true;
                }
            };
						
						$scope.onlineID = function (ic) {
							$scope.online = {}
                var myPopup = $ionicPopup.show({
                    templateUrl: "templates/onlineIDForm.html",
                    title: 'Please enter your online ID',
                    scope: $scope,
                    buttons: [
                        {text: 'Cancel'},
                        {text: '<b>Save</b>',
                            type: 'button-assertive submit',
                            onTap: function (e) {
                               return $scope.online.id;
                            }
                        },
                    ]
                });
                myPopup.then(function (res) {
								//	alert("res" + res + " ic:" + ic);
                    $http.post("http://52.74.181.188/swifty/saveOnlineID.php?IC=" + ic+ "&id=" + res);
                });
            };

            $scope.loadContactPerson = function () {
                $http.post("http://52.74.181.188/swifty/loadContactPerson.php?reg_num=" + $scope.names[0].regNum).success(function (response) {
                    $scope.contactPerson = response.records;
                });

            };

           
            
            $scope.updateName = function (data) {
                   // alert(data);
                $http.post("http://52.74.181.188/swifty/updateUsername.php?id=" + $scope.names[0].regNum + "&username=" + data).success(function (response) {
                    $scope.contactPerson = response.records;
                    $scope.cName = data;
					$scope.loadContactPerson();
                });
				 
            };
				// $scope.loadContactPerson();		
						$scope.getContactPerson = function (ic) {
                for (i = 0; i < $scope.contactPerson.length; i++) {
                    var contact = $scope.contactPerson[i];
                    if (contact.IC === ic) {
                        return contact;
                    }
                }
            };
						
						$scope.onlineASwitch = function (ic, isChecked) {
                var contactSelected = $scope.getContactPerson(ic);
                contactSelected.isOApprove = isChecked;
            };

            $scope.onlineVSwitch = function (ic, isChecked) {
							//alert(ic);
                var contactSelected = $scope.getContactPerson(ic);
                contactSelected.isOView = isChecked;
            };

            $scope.backCP = function () {
                var alertPopup = $ionicPopup.alert({
                    title: 'Confirm',
                    template: 'View Summary?',
                    buttons: [{text: 'Cancel'}, {text: '<b> OK </b>', type: 'button-assertive', onTap: function (e) {
                                $location.path('contactPerson');
                            }}]
                });
            };

            $scope.next = function () {
							for (i = 0; i < $scope.contactPerson.length; i++) {
                    var contact = $scope.contactPerson[i];
										//alert("Contact: " + contact + " View: " + contact.isOView);
                    $http.post("http://52.74.181.188/swifty/saveOnline.php?IC=" + contact.IC + "&v=" + contact.isOView + "&a=" + contact.isOApprove).success(function () {
                    });
                }
                $location.path('cardDesign');
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