angular.module('starter.controllers')

 .controller('AppointmentCtrl', function ($ionicPopup,$location,$scope,$compile,uiCalendarConfig,$ionicModal,$http,$cordovaContacts) {
         $scope.username=localStorage.getItem("rm"); 
		 var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
         $scope.changeTo = 'Hungarian';
       
    
    /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, timezone, callback) {
      var s = new Date(start).getTime() / 1000;
      var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
      callback(events);
    };

    $scope.calEventsExt = {
       color: '#f00',
       textColor: 'yellow',
       events: [ 
         
        ]
    };
    /* alert on eventClick */
    $scope.alertOnEventClick = function( date){
        $scope.alertMessage = (date.id+date.title + date.start + date.end   );
       
    };
    /* alert on Drop */
     $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };
    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };
    /* add custom event*/
    $scope.addEvent = function() {
      $scope.events.push({
        title: 'Open Sesame',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        className: ['openSesame']
      });
    };
    
    /* Change View */
    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
      if(uiCalendarConfig.calendars[calendar]){
        uiCalendarConfig.calendars[calendar].fullCalendar('render');
        
      }
    };
     /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) { 
        element.attr({'tooltip': event.title,
                     'tooltip-append-to-body': true,'data-tap-disabled':true});
        $compile(element)($scope);
    };
    
    
    $ionicModal.fromTemplateUrl('templates/addAppt.html', {
                scope: $scope,
                //animation: 'slide-in-up',
      }).then(function (modal) {
          $scope.modal = modal;
      });
    $ionicModal.fromTemplateUrl('templates/editAppt.html', {
        scope: $scope,
        //animation: 'slide-in-up',
    }).then(function (modal) {
        $scope.modal2 = modal;
    });       
    $scope.openModal = function (date) {
        $scope.startdate = date.start;
        //$scope.appt.start = date.start;
       // alert($scope.appt.start);
        $scope.modal.show();   
    };
    $scope.closeModal = function () {
        $scope.modal.hide();
    };
    $scope.openModal2 = function (date) {
        //alert(date.id+date.title + date.start + date.end   );
        $scope.apptSelected=date;
        $scope.appt = date;
        $scope.appt.start = date.start.toISOString();
        $scope.appt.start = new Date( $scope.appt.start);
         $scope.appt.start =new Date( $scope.appt.start.getTime() + ( $scope.appt.start.getTimezoneOffset() * 60000 ) );
        //alert($scope.appt.start);
        //console.log($scope.appt.start);
        $scope.appt.end = date.end.toISOString();
        $scope.appt.end = new Date( $scope.appt.end);
         $scope.appt.end =new Date( $scope.appt.end.getTime() + ( $scope.appt.end.getTimezoneOffset() * 60000 ) );
         
        $scope.modal2.show(); 
        
    };
    
    
    $scope.closeModal2 = function () {
        $scope.modal2.hide();
    };

    /* config object */
      $scope.uiConfig = {
      calendar:{
        height: 700,
        selectable: true,
        selectHelper: true,
        editable: true,
        //googleCalendarApiKey: 'AIzaSyAvEG1n2yvmHtMGiHVTT0bWOYkgCmkjaeY',
        //eventLimit: true,
        customButtons: {
        reload: {
            text: "Add",
            click: function() {
              $scope.resetAppointment();
               $scope.modal.show(); 
            }
        }
        },
        header:{
          left: 'month,agendaWeek,agendaDay',
          center: 'title',
          right: 'reload prev,next'
        },
       // select:$scope.openModal,
        //dayClick: $scope.openModal,
       
        eventClick: $scope.openModal2,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.renderCalender
        
      }
    };
    
    /* Add New Appointment */
    $scope.appt = {
                id:'',
                title: '',
                start: '',
                end: '',
                venue: '',
                remark: ''
            };
    $scope.contact = {
        name:'',
        email:'',
        number:''
    };
    $scope.apptSelected = {
                id:'',
                title: '',
                start: '',
                end: '',
                venue: '',
                name:'',
                email:'',
                number:'',
                remark: ''
            };
	$scope.resetAppointment = function () {
		 //$scope.events=[];
		 //$scope.eventSources2 =[];
		  $scope.appt = {
                id:'',
                title: '',
                start: '',
                end: '',
                venue: '',
                remark: ''
            };
      $scope.contact = {
        name:'',
        email:'',
        number:''
    };   
		};
   $scope.events=[];
	$scope.name = localStorage.getItem("rm");
    $scope.loadAppointment=function(){
     //$scope.eventSources2 =[$scope.calEventsExt, $scope.eventsF, $scope.events];
        $http.post("http://52.74.181.188/swifty/loadAppointment.php?username=" + $scope.username).success(function (response) {
       $('#calendar').fullCalendar('removeEvents');
       $('#calendar').fullCalendar('rerenderEvents' );
           for(var i=0;i<response.records.length;i++){
                        $scope.events[i]= response.records[i];            
                      }
           // $('#calendar').fullCalendar('addEventSource', $scope.events);     
                  });   
  }
  $scope.loadAppointment();
  
    $scope.addAppt = function (appt,contact) {
    
                 $http.post("http://52.74.181.188/swifty/addAppointment.php?title=" + appt.title + "&start=" +appt.start
                                + "&end="+appt.end+ "&venue=" + appt.venue + "&remark=" + appt.remark+"&username=" + $scope.username
                                +"&number="+contact.number+"&name="+contact.name+"&email="+contact.email).success(function () {
							$scope.loadAppointment();
        
                   /*$http.post("http://52.74.181.188/swifty/sendSmsAppt.php?mobile=" + contact.number + "&start=" + appt.start + "&end=" + appt.end + "&venue=" + appt.venue).success(function () {
                    
                    });*/
                            
                        });
                    $scope.resetAppointment();
                    $scope.closeModal();
                };
              
    /*Edit Appointment*/
    
     $scope.editAppointment = function (appt,apptSelectedId,contact) {
                $http.post("http://52.74.181.188/swifty/editAppointment.php?id="+apptSelectedId+"&title=" + appt.title
                        + "&start=" + appt.start + "&end=" + appt.end+"&venue="+appt.venue+"&remark="+appt.remark +"&username=" + $scope.username +
            "&number="+contact.number+"&name="+contact.name+"&email="+contact.email).success(function () {
                    $scope.loadAppointment();
                });
          $scope.resetAppointment();
          $scope.modal2.hide();
            };
    /*Delete Appointment*/
     $scope.deleteAppointment = function (apptSelectedId) {
       //$scope.events.splice(apptSelectedId,1);
       
        $http.post("http://52.74.181.188/swifty/deleteAppointment.php?id=" + apptSelectedId).success(function () {
        $scope.loadAppointment();		
        });
         $scope.closeModal2();
		 
    };
    $scope.changeLang = function() {
      if($scope.changeTo === 'Hungarian'){
        $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
        $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
        $scope.changeTo= 'English';
      } else {
        $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        $scope.changeTo = 'Hungarian';
      }
    };
    /* event sources array*/
    //$scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];

    /******/
    $scope.settings = {
    enableFriends: true
  };
  $scope.getContact = function() {
    $scope.contact.name="";
    $scope.contact.number="";
    $scope.contact.email="";
    $cordovaContacts.pickContact().then(function(result) {
    $scope.contact.name=result.name.formatted;
    $scope.contact.number=result.phoneNumbers[0].value+"";
    $scope.contact.email=result.emails[0].value;
    
    });
  };
  $scope.getContacts = function() {
    $cordovaContacts.find({multiple: true}).then(function(result) {
    });
  }
  
  $scope.change=function(){
    $scope.appt.end=$scope.appt.start;
  }
  
  $scope.menu = function() {
    $location.path("/menu");
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
  
   /***** RM Tracker ******************************************************/
 .controller('TrackerCtrl', function ($ionicPopup,$location,$scope,$compile,$ionicModal,$http) {
   $scope.username=localStorage.getItem("rm"); 
   $scope.labels = ["Target", "Actual"];
  $scope.data = [];
  $scope.colors=["#46BFBD","#FDB45C"];
   $scope.options = {legend: {display: true,onClick: function (e) {
   e.stopPropagation();}}};

  $scope.loadProgress = function () {
    $http.post("http://52.74.181.188/swifty/loadProgress.php?username=" + $scope.username + "&id=9").success(function (response) {
             $scope.results = response.records; 
              $scope.data1= response.records[0]["target"];     
              $scope.data2= response.records[0]["actual"]; 
              $scope.data=[$scope.data1,$scope.data2];     
            
    });
  };
  $scope.loadProgress();
 
      $scope.menu = function() {
      $location.path("/sidemenu");
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