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

$username = $_GET['username'];
$id = $_GET['id'];

$sql = "SELECT count(*)'total' , m.target from rm_progress p, rm_monthlytarget m 
where username='swifty' 
and  m.id='$id'
and p.monthlytarget_id = m.id";
        $result = $conn->query($sql);
        $outp = "";
        while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            if ($outp != "") {
                $outp .= ",";
            }
            $outp .= '{"actual":"'  . $rs["total"] . '",';		
           // $outp .= '{"username":"'  . $rs["username"]  . '",';   
            $outp .= '"target":"' . $rs["target"]  . '"}'; 			
          
        }

$outp = '{ "records":[ ' . $outp . ' ]}';
$conn->close();
echo($outp);
?>

