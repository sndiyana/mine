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

$message="";
// Check connection
    if(isset($_GET['contactNum'])){
        $contactNum = $_GET['contactNum'];
        $name = $_GET['name'];
        $email = $_GET['email'];
        $regNum = $_GET['regNum'];
        $dob = $_GET['dob'];
        $gender = $_GET['gender'];
       // $sql = "INSERT INTO business_user WHERE contact_num = '$contactNum' ";
        $sql = "INSERT INTO business_user (name,contact_num, email, reg_num, dob, gender) VALUES ('$name','$contactNum','$email','$regNum','$dob','$gender')";
      
        $result = $conn->query($sql);
        
        $conn->close();
        echo("good job!");
      }else{
        echo("you messed up.");
      }
?>
