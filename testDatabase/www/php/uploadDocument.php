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

// Create connection
    
$outp = "";
    
    if((isset($_GET['image'])) != ""){
			$image = $_GET['image'];
			$sql = "INSERT INTO business_info(file) values($image) where reg_num=2";
			$result = $conn->query($sql);
    }
 
    
    $conn->close();
echo($outp);
    
?>

