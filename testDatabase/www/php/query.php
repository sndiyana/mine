<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(-1);

header("Access-Control-Allow-Origin: *");

session_start();
require_once('./DBHandler/DB_Functions.php');
$dbFunctions = new DB_Functions();
$conn = $dbFunctions->getthedatabasehandler();

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$sql = "SELECT * FROM user";
$result = $conn->query($sql);
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"Username":"'  . $rs["username"] . '",';
    $outp .= '"Password":"'   . $rs["password"] . '"}'; 
       
}
$outp ='{ "records":[ '.$outp.' ]}';
$conn->close();
echo($outp);
?>