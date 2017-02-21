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
    
    if((isset($_GET['gender']) && isset($_GET['name']) && isset($_GET['mobile']) && isset($_GET['email'])) != ""){
			$gender = $_GET['gender'];
			$name = $_GET['name'];
			$email = $_GET['email'];
			$mobile = $_GET['mobile'];
			$sql = "INSERT INTO business_user(reg_num,name,email, contact_num,gender,dob) values('1','$name','$email','$mobile','$gender','1990-06-01');";
			$result = $conn->query($sql);
    }
    
    if((isset($_GET['currency']) && isset($_GET['chequeNum']) && isset($_GET['delivery'])) != ""){
			$currency = $_GET['currency'];
			$numCheque = $_GET['chequeNum'];
			$delivery = $_GET['delivery'];
			$sql = "INSERT INTO business_account(reg_num,currency,numChequeBook,delivery) values('1','$currency','$numCheque','$delivery');";
			$result = $conn->query($sql);
    }
    
    $conn->close();
echo($outp);
    
?>

