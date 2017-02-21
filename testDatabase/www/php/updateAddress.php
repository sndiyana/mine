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

// Check connection
      if(isset($_GET['regNum'])){
        $num = $_GET['regNum'];
        $add = $_GET['address'];
        $sql = "UPDATE business_info SET alt_address= '$add' where reg_num='$num'";
        
        $result = $conn->query($sql);
        
        $conn->close();
        echo("good job!");
      }else{
        echo("you messed up.");
      }
?>
