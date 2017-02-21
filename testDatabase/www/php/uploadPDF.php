<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(-1);
    
    header("Access-Control-Allow-Origin: *");
    
    session_start();
    require_once('./DBHandler/DB_Functions.php');

// Create connection
//http://stackoverflow.com/questions/18382740/cors-not-working-php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}
    
		$dbFunctions = new DB_Functions();
    $conn = $dbFunctions->getthedatabasehandler();
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 
		
	/*$outp = "";
	$flag = false;
	
	$params = json_decode(file_get_contents('php://input'), true);
   $image = $params['pdf'];
   $id = $params['id'];
    
    if((isset($image) && isset($id)) != ""){
			$sql = "UPDATE  business_app SET  pdf = ( '$image' ) WHERE  reg_num = '$id'";
			$result = $conn->query($sql);
			$flag = true;
			$outp = "success";
    }
 
	 if(!$flag) {
		 $outp = "error";;
	 }
	 if(isset($outp)){
		 echo $outp;
	 }*/
	 
if($_FILES['userfile']['size'] > 0)
{
$fileName = $_FILES['userfile']['name'];
$tmpName  = $_FILES['userfile']['tmp_name'];
$fileSize = $_FILES['userfile']['size'];
$fileType = $_FILES['userfile']['type'];
$id= $_POST['id'];

$fp      = fopen($tmpName, 'r');
$content = fread($fp, filesize($tmpName));
$content = addslashes($content);
fclose($fp);

if(!get_magic_quotes_gpc())
{
    $fileName = addslashes($fileName);
}
$sql =  "UPDATE business_app SET pdfName='" . $fileName . "', pdfSize='" . $fileSize . "', pdfType='" . $fileType . "', pdf='" . $content . "'  WHERE reg_num='$id'";
//$result = mysqli_query($con, "UPDATE business_app SET pdfName='" . $fileName . "', pdfSize='" . $fileSize . "', pdfType='" . $fileType . "', pdf='" . $content . "'  WHERE reg_num = 2");
$result = $conn->query($sql);
return $result;
echo "<br>File $fileName uploaded<br>";
}
    $conn->close();
    
?>

 