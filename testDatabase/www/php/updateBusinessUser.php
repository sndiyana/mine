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
      }
      $name = null;
      $contact = null;
      $email = null;
      $dob = null;
      $gender = null;

      if(isset($_GET['name'])){
        $name = $_GET['name'];
      }
      if(isset($_GET['contact'])){
        $contact = $_GET['contact'];
      }
      if(isset($_GET['email'])){
        $email = $_GET['email'];
      }
      if(isset($_GET['dob'])){
        $dob = $_GET['dob'];
      }  
      if(isset($_GET['gender'])){
        $gender = $_GET['gender'];
      }                      
      $user = array(
        'name' => $name,
        'contact_num' => $contact,
        'email' => $email,
        'dob' => $dob,
        'gender' => $gender
      );

      $sql = "UPDATE business_user SET ";
      foreach ($user as $x => $x_value) {
          if(!empty($x_value)){
            $sql.="$x='$x_value'".",";
          }
      }
      
      $sql = rtrim($sql, ',');
      $sql.=" WHERE contact_num='$contactNum'".";";
        

      //  $result = $conn->query($sql);
        
        if ($conn->query($sql) === TRUE) {
            echo "Record updated successfully";
        } else {
            echo "Error updating record: " . $conn->error;
        }

        $conn->close();
        echo($sql);
//"UPDATE employee ". "SET emp_salary = $emp_salary ". "WHERE emp_id = $emp_id" ;
?>

