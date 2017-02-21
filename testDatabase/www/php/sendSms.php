<?php

header("Access-Control-Allow-Origin: *");
//http://stackoverflow.com/questions/18382740/cors-not-working-php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}


$id = "75040002";  //Get this under the Web API section
$password = "swifty123";  //You need to set this under Account Profile
$type = "A";  //A for ASCII message content
//$mobile = "6596511112";  //Change this to a valid mobile number, alwasy include country code

if (isset($_GET['mobile'])) {
    $mobile = $_GET['mobile'];
}

$message = "From OCBC: Your corporate account has been created successfully. A seperate message will be sent to you once the account is approved in 3-5 business working days.";

$message = urlencode($message);

$send_url = "https://www.commzgate.net/gateway/SendMsg?ID=" . $id . "&Password=" . $password . "&Mobile=" . $mobile . "&Type=" . $type . "&Message=" . $message . "";


$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $send_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$result = curl_exec($ch);
curl_close($ch);

print $result;
echo $result;

/*
  if ($result != null) {
  echo("Yay");
  } else {
  echo("Nay");
  }

 */
?>


