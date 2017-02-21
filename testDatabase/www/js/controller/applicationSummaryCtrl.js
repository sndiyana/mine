angular.module('starter.controllers')

.controller('ApplicationSummaryCtrl', function ($scope, $location, compData, acctTypeData, $ionicModal, $ionicPopup,$http) {
           
			$scope.acct = acctTypeData.getData();
            $scope.names = compData.getData();
            $scope.contactPerson = {
                reg_num: '',
                name: '',
                contact_num: '',
                email: '',
                gender: ''
            };
			
			$scope.loadContactPerson = function () {
                $http.post("http://52.74.181.188/swifty/loadContactPerson.php?reg_num=" + $scope.names[0].regNum).success(function (response) {
                    $scope.contactPersons = response.records;
                });

            };
			
			$scope.loadServices = function () {
                $http.post("http://52.74.181.188/swifty/loadSelectedServices.php?reg_num=" + $scope.names[0].regNum).success(function (response) {
                    $scope.loadServices = response.records;
                });
            };
			$scope.loadServices();
            $scope.loadContactPerson();
			
			var logo = 'data:image/jpeg;base64,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';
			var blob = "";
			var scanner = 'data:image/jpeg;base64,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';
			var icon = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAkACQAAD/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAAD//gA8Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2ODApLCBxdWFsaXR5ID0gOTAKAP/bAEMAAgEBAgEBAgICAgICAgIDBQMDAwMDBgQEAwUHBgcHBwYHBwgJCwkICAoIBwcKDQoKCwwMDAwHCQ4PDQwOCwwMDP/bAEMBAgICAwMDBgMDBgwIBwgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIABcAFwMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP2V/wCCi/xT8X/A39gv4yeMvAEHn+NfC3g3VdU0bCJIYLiG1kdZgjqyyGPb5gjKkSFAmDur+Mb4Rftr/GX4Y/tL2PxS8M/ELxt/ws7+0I7oay+pz3l9qc28Hy7guzG6SQ/K8Uu9JAxVlYMQf6Yv+DjT/gu9q3/BKHwt4V8F/DfT9F1T4q+OrWe/WfU42mtvD2nq3lLcmIFfMllk8wRAkoDbyF1YbVf8N9P/AGvl+BH7MXwv/aR8I6Totl8eda+IWsaRd3Evgfwr/wAIzaJpMGnXizWdlHpaSWty39rWgEqShgbadgQWj2AH9e/hm7vtQ8O2NxqVmum6lcW0Ul1aLKJhaylQXjDjhtrEjcODjNFfFH/BBb/gsCn/AAV7/ZX1TX9a0vTfD3xE8F6gmmeJdM08yfY28xN9vdwByzJDMBIoRnZleCQEkbWJQB+e3/B2b/wSv+On7W/7UvhP4s/D3wbD4i8D+G/A1vouqXo1mxtJLK5TUbyXaYriaN2UrcxYMYYZ3Zxjn8ivGHjqLxL+xL8Pf2e7PwfqUPxI8M+Ptc8S3t7Je25tJ4L6z022ijjIOfMLWTBwxCqIYyGfzCsRRQB+7n/Bor/wTx+Ln7Enwu+MHiH4m+GYfDen/EiTRJPD4GqWt5JeR2ovxLIwt5JBGubhAA5DEhvlAAJKKKAP/9k=';
			var plus ='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAdAB0DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD7+/4Ky/8ABWK+/Zr1yT4b/DWS1PjZoVl1XVZYxNHocbjKRoh+Vp2X5vm+VFIJBJAH5xeAvh/8d/2//F+rf2LN40+KOs6RGlzfC88TQx/Y0lZgjIt5cxRqpZGG2EYGOQMjMvgP4fat+39+3zdaC2sRaLq3xO8TaxdC/ubdrpLIJFeXiIYwyFlWK2WEDcMDaecYP6nf8Exv+CX2tfsCePfF2s6r4z0vxQnibT7ayjitNLkszbmKSRyxLSvuzvxgY6V8DCnic2xPPO/sbtaNK1ldaPrtd2e/3f1ticVknh/kiw+HUHmDpxmlOMpOblLll70bWirT5Y88fhTabev5f/B39tf43/sQfEq80uz8U68k3hu/l07VfDGt6i2qack0EhjmgC+ZIkZDKy77dwOMgsMGv2s/Yn/bA8P/ALbHwNs/GGhxyWcwkNpqenStul0y7QAvET/EvIZWH3lYHg5A+C/2qv8Aghn4l1vxv8UfiV/wszQbex1LUtY8VLYHQZWljjklmuhCZPtABYAhSwXHfb2r5V/4J4/t7+Iv2M08VS6Haw3dv4ui0+eW3nb5IJIhP86/7TLKqk9xEvpWmBxOJy3EKlir+zle12nt1Vv61OfijI8m43yiWYZDyPF0uTm5YuCblvGXMle2rT1a5bX1K/7dPwW8SfsTftweKrbTLzWPDbTapda94Z1XTLqWxnjs7xpTiCeJldTGsstu21gdoIPDEH6m/wCCHP7VurXfxV+In/CzPirrd9p0OkWJsR4t8Wz3EKSmabeYRdzEBtoXJTnG3PUV+gX7Xf7GHgb9tX4fr4f8Z2EjNasZdP1K1fyr3TJTwWikweDgBlIKsAMjgEfjf+3x/wAE2V/Yy8YWent4wh8WWl8DJbm40QW81uucYdhMyu3HVVQH0FGKwGIy7E/WqK5qd27Xta+ln+m5OQ8V5Rxpk39gZlL2WLcYx5uTmbUGpc0XbS9ndNxs27XMP9q39qf4j3X7TfxVtdO+LHxKbw83i/WYbO2tfGOof2ebT7bMsccUaz+V5Pl4Cqo2bcADFfU3/BE//gnno/xj+Fvirxt460QXGh6vPa2PhyKRSgaO28/z50/2HaVEBHH7g1Y/YA/4Ii+Ffir4U0Xxx448WXmt6LcBZYvD1hp/9nwtg/cmm82R5F4xhBHxxX6meHdAsfCuhWem6bZ2+n6fYQrb21tbxiOKCNRhUVRwFAAAArpyjJ6tSr9bxe2rSbvv+FjxfETxGy/CZe+H+Hn7/uxqVIxcLcjWi0Tcm1q9krpN30//2Q==';
			$scope.appInfo;
			
			$scope.loadInfo = function () {
				$http.post("http://52.74.181.188/swifty/loadSummaryInfo.php?reg_num=" + $scope.names[0].regNum).success(function (response) {
				$scope.appInfo =  response.records;
				return $scope.appInfo;
				});
               
			};
			$scope.loadInfo();
			
			/*$scope.loadContactPerson = function () {
				$http.post("http://52.74.181.188/swifty/loadContactPerson.php?reg_num=3").success(function (response) {
				$scope.cp = response.records;
				//contactList.updateData(response.records);
				});	
			};
               
			$scope.loadContactPerson();*/
			
			$scope.apply = function () {
			var appInfo = $scope.loadInfo();
			var doc = new jsPDF();
			

			//header-left
			doc.setFontSize(10);
			doc.addImage(logo, 'JPEG', 10, 10);
			doc.text(10, 24, "Oversea-Chinese Banking Corporation Limited");
			doc.text(10, 27, "65 Chulia Street OCBC Center Singapore 049513");
			doc.text(10, 30, "Tel(65) 6538 1111");
			doc.text(10, 33, "www.ocbc.com");
			
			//header-right
			doc.addImage(scanner, 'JPEG', 130, 10);
			doc.addImage(scanner, 'JPEG', 155, 10);
			doc.setFontSize(16);
			doc.setFontType("bold");
			doc.text(130, 24, "APPLICATION FORM");
			doc.text(130, 29, "FOR BUSINESS ACCOUNT");
			
			//type of account-header
			doc.setDrawColor(0);
			doc.setFillColor(255,0,0);
			doc.rect(10, 40 , 190, 5, 'F'); 
			doc.setFontSize(13);
			doc.setTextColor(255, 255, 255);
			doc.text(15, 44, "Account Type");
			
			//type of account
			doc.setFontSize(10);
			doc.setTextColor(0, 0, 0);
			doc.setFontType("normal");
			doc.text(15, 52, "Singapore Dollar Account: ");
			doc.setFontSize(11);
			doc.setFontType("bold");
			doc.text(58, 52, $scope.appInfo[0].acct_type);
			
			//customer info-header
			doc.setDrawColor(0);
			doc.setFillColor(255,0,0);
			doc.rect(10, 55 , 190, 5, 'F'); 
			doc.setFontSize(13);
			doc.setTextColor(255, 255, 255);
			doc.text(15, 59, "Customer Information");
			
			//customer info
			doc.setFontSize(10);
			doc.setTextColor(0, 0, 0);
			doc.setFontType("normal");
			doc.text(15, 67, "Registered Name: ");
			doc.text(100, 67, "Registration No: ");
			doc.text(100, 75, "Classification of Business: ");
			doc.text(15, 75, "Nature of Business: ");
			doc.text(15, 83, "Registered Address: ");
			doc.text(100, 83, "Telephone: ");
			doc.text(138, 83, "Fax: ");
			
			doc.setFontType("bold");
			doc.setFontSize(10);
			doc.text(44, 67, $scope.appInfo[0].name);
			doc.text(126, 67, $scope.appInfo[0].reg_num);
			doc.text(46,75, $scope.appInfo[0].business_area);
			doc.text(141,75, $scope.appInfo[0].business_type);
			doc.text(118,83, $scope.appInfo[0].phone);
			doc.text(146,83, $scope.appInfo[0].fax);
			
			//check business address length
			var fromTop = 83;
			var add = $scope.appInfo[0].business_address;
			
			if(add.length > 21) {
				for(var k = 0; k <= add.length; k=k+23) {
					if(k+46 > add.length) {
						doc.text(48,fromTop, add.substring(k,add.length));
						fromTop += 8;
						break;
					} else {
						doc.text(48,fromTop, add.substring(k,k+22));
						fromTop += 8;
					}
				}
			}
			
			//contact person-header
			doc.setDrawColor(0);
			doc.setFillColor(255,0,0);
			doc.rect(10, fromTop , 190, 5, 'F'); 
			doc.setFontSize(13);
			doc.setTextColor(255, 255, 255);
			fromTop += 4;
			doc.text(15, fromTop, "List of Contact Person");
			
			//contact person
			var imageL = fromTop + 4;
			var textL = imageL + 5;
			var i = 0;
			for(i = 0; i < $scope.contactPersons.length; i++) {
				doc.addImage(icon, 'JPEG', 15, imageL);
				doc.setFontSize(10);
				doc.setTextColor(0, 0, 0);
				doc.setFontType("normal");
				doc.text(22, textL, "Name: ");
				doc.text(85, textL, "IC: ");
				doc.text(125, textL, "Mobile: ");
					
				doc.setFontType("bold");
				doc.setFontSize(11);
				doc.text(35, textL, $scope.contactPersons[i].name);
				doc.text(92, textL, $scope.contactPersons[i].IC);
				doc.text(138,textL, $scope.contactPersons[i].contact_num);
						
				imageL += 10;
				textL = imageL + 5
			}
			
			//Additional Services header
			fromTop = textL ;
			doc.setDrawColor(0);
			doc.setFillColor(255,0,0);
			doc.rect(10, fromTop , 190, 5, 'F'); 
			doc.setFontSize(13);
			doc.setTextColor(255, 255, 255);
			fromTop += 4;
			doc.text(15, fromTop, "Subscriptions For Electronic Services");
			
			//additional services
			var imageL = fromTop + 4;
			var textL = imageL +5;
			var i = 0;
			for(i = 0; i < $scope.loadServices.length; i++) {
				doc.addImage(plus, 'JPEG', 15, imageL);
				doc.setFontSize(10);
				doc.setTextColor(0, 0, 0);
				doc.setFontType("normal");
				doc.text(24, textL, "ID: ");
				doc.text(37, textL, "Service Name: ");
				doc.text(155, textL, "Price: ");
					
				doc.setFontType("bold");
				doc.setFontSize(11);
				doc.text(30, textL, $scope.loadServices[i].id);
				doc.text(62, textL, $scope.loadServices[i].serviceName);
				doc.text(165,textL, $scope.loadServices[i].price);
						
				imageL += 10;
				textL = imageL + 5
			}
			
			//doc.save("no.pdf");
			var out = doc.output();
			
			var formdata = "";
			
			var a = new ArrayBuffer(out.length);
			var i = new Uint8Array(a);
			for (var e = 0; e < out.length; e++) {
			   i[e] = out.charCodeAt(e);
			}
			blob = new Blob([a], {type: 'application/pdf', encoding: 'raw'});
			
			var fd = new FormData();
			fd.append('userfile', blob, $scope.appInfo[0].reg_num+ '.pdf');
			fd.append('id', $scope.appInfo[0].reg_num);
			$http.post('http://52.74.181.188/swifty/uploadPDF.php', fd, {
				transformRequest: angular.identity,
				headers: {'Content-Type': undefined}
			}).success(function (response) {
				//alert(response)}) 
			});
		};

            $ionicModal.fromTemplateUrl('templates/signature.html', {
                scope: $scope,
                //animation: 'slide-in-up',
            }).then(function (modal) {
                $scope.modal = modal;
            });


            $scope.sign = function () {
                $scope.modal.show();
            };

            var signaturePad = "";
            $scope.sign = function () {
                $scope.modal.show();
                var canvas = document.getElementById('signatureCanvas');
                signaturePad = new SignaturePad(canvas);
            }
            $scope.sign.hide = function () {
                $scope.modal.hide();
            }
            $scope.clearCanvas = function () {
                signaturePad.clear();
            }
            $scope.saveCanvas = function () {
                var sigImg = signaturePad.toDataURL();
                $scope.signature = sigImg;
                //$http.post("http://52.74.181.188/swifty/signature.php", {signature: $scope.signature});
                $scope.modal.hide();
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
            
            $scope.searchBusinessContact = function () {
                $http.post("http://52.74.181.188/swifty/searchBusinessContact.php?reg_num=" + $scope.names[0].regNum).success(function (response) {
                    $scope.contactPerson = response.records;
                    $scope.sendSms($scope.contactPerson);
                    $scope.sendEmail($scope.contactPerson);
                    
                });

            };
            
              $scope.sendEmail = function (data) {
                for (var i = 0; i < data.length; i++) {
                    $http.post("http://52.74.181.188/swifty/sendEmail.php?email=" + data[i].email + "&name=" + data[i].name + "&reg_num="  + $scope.names[0].regNum).success(function () {
                    });
                }
            };

            $scope.sendSms = function (data) {
                for (var i = 0; i < data.length; i++) {
                    //alert(data[i].contact_num);
                    $http.post("http://52.74.181.188/swifty/sendSms.php?mobile=" + data[i].contact_num).success(function () {
                    });
                }
				//$scope.sendEmail(data);
            };

            $scope.nextP = function () {
                $location.path('/termsAndConditions');
            };
            $scope.backOne = function () {
                $location.path('cardDesign');
            };

            $scope.nextPTwo = function () {
                // activate SMS function unhide only the first line
                $scope.searchBusinessContact();
                //$scope.sendSms();
				$scope.apply();
				var alertPopup = $ionicPopup.alert({
                    title: 'Confirm',
                    template: 'Complete Application?',
                    buttons: [{text: 'Cancel'}, {text: '<b> OK </b>', type: 'button-assertive', onTap: function (e) {
                                $location.path('completeAcct');
                            }}]
                });
            };

            $scope.back2 = function () {
                $location.path('/applicationSummary');
            };


        })