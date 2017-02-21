<?php

// variables can only be got with $_REQUEST ?
$titre_event = $_REQUEST['titre_event'];
$start = $_REQUEST['start'];
$end = $_REQUEST['end'];
$allday = $_REQUEST['allday'];
$where_event = $_REQUEST['where_event'];
$content_event = $_REQUEST['content_event'];

/********************************************
        GOOGLE API CONNECTION
********************************************/

    /************************************************
      Make an API request authenticated with a service account.
     ************************************************/
    require_once 'fullcalendar/google-api-php-client-master/src/Google/autoload.php'; // or wherever autoload.php is located

    /************************************************
      The name is the email address value provided  as part of the service account (not your  address!)
      cf. : https://console.developers.google.com/project/<your account>
     ************************************************/
    $client_id = '12345467-123azer123aze123aze.apps.googleusercontent.com'; // YOUR Client ID
    $service_account_name = '12345467-123azer123aze123aze@developer.gserviceaccount.com'; // Email Address in the console account

    $key_file_location = 'fullcalendar/google-api-php-client-master/API_Project-35c93db58757.p12'; // key.p12 to create in the Google API console

    if (strpos($client_id, "googleusercontent") == false || !strlen($service_account_name) || !strlen($key_file_location)) {
        echo "no credentials were set.";
        exit;
    }

    /** We create service access ***/
    $client = new Google_Client();  

    /************************************************
    If we have an access token, we can carry on.  (Otherwise, we'll get one with the help of an  assertion credential.)
    Here we have to list the scopes manually. We also supply  the service account
     ************************************************/
    if (isset($_SESSION['service_token'])) {
            $client->setAccessToken($_SESSION['service_token']);
    }
    $key = file_get_contents($key_file_location);
    $cred = new Google_Auth_AssertionCredentials(
        $service_account_name,
    array('https://www.googleapis.com/auth/calendar'), // ou calendar_readonly
    $key
);

    $client->setAssertionCredentials($cred);
    if ($client->getAuth()->isAccessTokenExpired()) {
        $client->getAuth()->refreshTokenWithAssertion($cred);
    }
    $_SESSION['service_token'] = $client->getAccessToken();

/********************************************
        END OF GOOGLE API CONNECTION
********************************************/

/*********** AT LAAAAST, WE PUSH THE EVENT IN GOOGLE CALENDAR ***************/
// Get the API client and construct the service object.
$service = new Google_Service_Calendar($client);

// We get the calendar
$calendarId = 'Google_login@gmail.com'; // or whatever calendar you like where you have editable rights


    /************* INSERT ****************/
$event = new Google_Service_Calendar_Event(array(
    'summary' => $titre_event, 
    'location' => $where_event,
    'description' => $content_event,
    'start' => array(
        'dateTime' => $start, //'2015-06-08T15:00:00Z'
        'timeZone' => 'Europe/Paris',
    ),
    'end' => array(
        'dateTime' => $end,
        'timeZone' => 'Europe/Paris',
    ),
    /* in case you need that :
    'attendees' => array(
        array('email' => 'lpage@example.com'),
        array('email' => 'sbrin@example.com'),
    ),*/
    'reminders' => array(
        'useDefault' => FALSE,
        'overrides' => array(
            array('method' => 'email', 'minutes' => 20)
    ),
        ),
));

$event = $service->events->insert($calendarId, $event);
printf('Event created: %s', $event->htmlLink);

?>