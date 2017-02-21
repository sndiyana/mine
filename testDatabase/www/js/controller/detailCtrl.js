angular.module('starter.controllers')

.controller('detailCtrl', function ($scope, compData, acctTypeData, $http, $location, $ionicPopup, businessData) {
            $scope.acra = compData.getData()[0];
            var regNum = $scope.acra.regNum;
            if (!($scope.acra == null)) {
                $scope.acra.phone = parseInt($scope.acra.phone); //to convert phone into str
            }
			
			//Start of Business Details Page
            $scope.business = {
                name: $scope.acra.name,
                address: $scope.acra.address,
                alt_address: $scope.acra.address,
                phone: $scope.acra.phone,
                activity: $scope.acra.activity,
                company_type: $scope.acra.company_type,
                declaration: '',
                fatca: ''
            };
			
            $scope.declaration = "active"; //set radio button default
            $scope.toAcctType = function (form) {
               // if (form.$valid) {
                    $http.post("http://52.74.181.188/swifty/addSupplierDetails.php?regNum=" + regNum + "&supplierCountry=" + $scope.business.supplierCountry + "&supplierPayment=" + $scope.business.supplierPayment + "&supplierPaymentNum=" + $scope.business.supplierPaymentNum + "&supplierPaymentPeriod=" + $scope.business.supplierPeriod + "&supplierTransactionSize=" + $scope.business.supplierTransactionSize + "&supplierNotes=" + $scope.business.supplierNotes).success(function () {
                    })
                    .error(function () {
                        alert("Error updating database! Please contact admin):");
                    });
                    $http.post("http://52.74.181.188/swifty/addCustomerDetails.php?regNum=" + regNum + "&customerPayment=" + $scope.business.customerPayment + "&customerPaymentNum=" + $scope.business.customerPaymentNum + "&customerPaymentPeriod=" + $scope.business.customerPeriod + "&customerTransactionSize=" + $scope.business.customerTransactionSize + "&customerNotes=" + $scope.business.customerNotes).success(function () {
                    })
                    .error(function () {
                        alert("Error updating database!  Please contact admin):");
                    });
                    $http.post("http://52.74.181.188/swifty/addBusinessDetails.php?regNum=" + regNum + "&name=" + $scope.business.name + "&fatca=" + $scope.business.declaration + "&address=" + $scope.business.address + "&alt_address=" + $scope.business.alt_address + "&phone=" + $scope.business.phone + "&activity=" + $scope.business.activity + "&companyType=" + $scope.business.company_type).success(function () {
                    })
                            .error(function () {
                                alert("Error updating database!  Please contact admin):");
                            });
                    $location.path('/selectAcct');
               // } else {
                  //  alert("Please fill up all the required fields!")
               // }
            };

            $scope.toEditServices = function () {
                if (!($scope.acctChosen == "")) {
									$http.post("http://52.74.181.188/swifty/addAcctType.php?regNum=" + regNum + "&name=" + $scope.acctName).success(function () {
                    }).error(function () {
                      alert("Error updating database!  Please contact admin):");
                    });
                    $location.path('/editServices');
                } else {
                    alert("Please choose an account type!")
                }
            };

            $scope.back1 = function () {
                var alertPopup = $ionicPopup.alert({
                    title: 'Confirm',
                    template: 'Back to Scanning your NRIC?',
                    buttons: [{text: 'Cancel'}, {text: '<b> OK </b>', type: 'button-assertive', onTap: function (e) {
                                $location.path('/camera');
                            }}]
                })
            };

            $scope.back2 = function () {
                var alertPopup = $ionicPopup.alert({
                    title: 'Confirm',
                    template: 'Return to business detail',
                    buttons: [{text: 'Cancel'}, {text: '<b> OK </b>', type: 'button-assertive', onTap: function (e) {
                                $location.path('businessDetail');
                            }}]
                })
            };
			
			// End of Business Details Page

			// Start of Account Type page
            $scope.data = {};
            $scope.acctChosen = "";

            $scope.chooseAcct = function (acct) {
                if (!($scope.acctChosen == "") & !(acct === $scope.acctChosen)) {
                    var element = document.getElementById($scope.acctChosen);
                    if (!(element == null)) {
                        element.style.boxShadow = "none";
                    }
                }
                $scope.acctChosen = acct;
                if (acct === "BFA") {
                    $scope.acctName = "Business First Account";
                } else {
                    $scope.acctName = "Business Entrepreneur Account";
                }
                acctTypeData.updateData($scope.acctName);
                document.getElementById(acct).style.boxShadow = "0px 0px 50px #de121f"; //to make the stuff glow
                //console.log("accountChosen : " + $scope.acctName);
								

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
			
			//End of Select Account Page

        })