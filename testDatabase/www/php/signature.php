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
$params = json_decode(file_get_contents('php://input'), true);


    if(isset($params['signature'])){
      $signature=$params['signature'];
      
       // $sql = "INSERT INTO business_user WHERE contact_num = '$contactNum' ";
$encoded_image = explode(",", $signature)[1];
$decoded_image = base64_decode($encoded_image);
$signatureimg='signature.png';
file_put_contents($signatureimg, $decoded_image);
        $sql = "INSERT INTO business_card(reg_num,signature) VALUES ('10','$signature')";
        
        $result = $conn->query($sql);
        if($result){
          echo("good job!");
        }
        $conn->close();
        
      }else{
        echo("you messed up.");
      }
?>
