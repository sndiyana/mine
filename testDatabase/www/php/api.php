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
// Create connection
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$sql = "SELECT * FROM user";
$result = $conn->query($sql);

//http://stackoverflow.com/questions/15485354/angular-http-post-to-php-and-undefined
//$username = mysqli_real_escape_string($conn, $_POST['username']);
//$password = mysqli_real_escape_string($conn, $_POST['password']);

/*$postdata = file_get_contents("php://input");
$username = "";
$password = "";
if (isset($postdata) && $postdata != '{}') {
    $request = json_decode($postdata);
    $username = $request->username;
    $password = $request->password;
*/
    $params = json_decode(file_get_contents('php://input'), true);
    $username = $params['username'];
    $password = $params['password'];
    if ((isset($username) && $username != "" ) && ( isset($password) && $password != "") ){
        while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            $user = $rs['username'];
            $pass = $rs['password'];

            if ($username == $user && $password == $pass) {
                $message  = "success";
                //header("Location: http://localhost/testsaveandexit.html");
                break;
            } else {
                $message =  "Username Password mismatch";
            }
            //$outp .= '{"Username":"'  . $rs["username"] . '",';
            //$outp .= '"Password":"'   . $rs["password"] . '"}'; 
        }
    } else {
        $message=  "Empty username/password parameter!";
    }
//}
//else {
//    $message=  "Empty username/password parameter!";
//}

if(isset($message)){
echo  $message;
}
$conn->close();
?>