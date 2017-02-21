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

if (isset($_POST['upload']) && $_FILES['userfile']['size'] > 0) {
    $fileName = $_FILES['userfile']['name'];
    $tmpName = $_FILES['userfile']['tmp_name'];
    $fileSize = $_FILES['userfile']['size'];
    $fileType = $_FILES['userfile']['type'];

    $fp = fopen($tmpName, 'r');
    $content = fread($fp, filesize($tmpName));
    $content = addslashes($content);
    fclose($fp);
    
    
    if (!get_magic_quotes_gpc()) {
        $fileName = addslashes($fileName);
    }
   

    $sql = "INSERT INTO upload (name, size, type, content ) " .
            "VALUES ('$fileName', '$fileSize', '$fileType', '$content')";
    $result = $conn->query($sql);
    
     
     
$conn->close();
header('Location: http://52.74.181.188/swifty/businessDetails.html');

}
?>

