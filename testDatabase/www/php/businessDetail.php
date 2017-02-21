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
    if((isset($_GET['sCountry']) && isset($_GET['sPayment']) && isset($_GET['sNum']) && isset($_GET['sTransaction']))!= ""){
			$sCountry = $_GET['sCountry'];
			$sPayment = $_GET['sPayment'];
			$sNum = $_GET['sNum'];
			$sTrans = $_GET['sTransaction'];
			$sql = "INSERT INTO business_suppliers(reg_num,country,payment_method, avg_num_payment,avg_transaction) values('1','$sCountry','$sPayment','$sNum','$sTrans');";
			$result = $conn->query($sql);
    }
    
    if((isset($_GET['cCountry']) && isset($_GET['cPayment']) && isset($_GET['cNum']) && isset($_GET['cTransaction']))!= ""){
			$cCountry = $_GET['cCountry'];
			$cPayment = $_GET['cPayment'];
			$cNum = $_GET['cNum'];
			$cTrans = $_GET['cTransaction'];
			$sql = "INSERT INTO business_customers(reg_num,country,payment_method, avg_num_payment,avg_transaction) values('1','$cCountry','$cPayment','$cNum','$cTrans');";
			$result = $conn->query($sql);
    }
    
    $conn->close();
echo($outp);
    
?>

