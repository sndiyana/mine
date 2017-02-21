<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(-1);

session_start();
require_once('./DBHandler/DB_Functions.php');

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

$dbFunctions = new DB_Functions();
$conn = $dbFunctions->getthedatabasehandler();

$message = "";
// Check connection

if (isset($_GET['reg_num'])) {
    $reg_num = $_GET['reg_num'];
}

if (isset($_GET['data'])) {
    $data = $_GET['data'];
}

$sql = "DELETE FROM business_service WHERE reg_num = '$reg_num' AND service_id ='$id'";
$result = $conn->query($sql);


if ($conn->query($sql) === TRUE) {
    // echo "Record updated successfully";
    $count++;
} else {
    // echo "Error updating record: " . $conn->error;
}

$conn->close();

?>

