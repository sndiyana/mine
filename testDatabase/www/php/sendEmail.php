<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(-1);
    
    header("Access-Control-Allow-Origin: *");
    
    session_start();
    require_once('./DBHandler/DB_Functions.php');
    $dbFunctions = new DB_Functions();
    $conn = $dbFunctions->getthedatabasehandler();
	
	require_once('./mail/class.phpmailer.php');
	require_once('./mail/class.smtp.php');
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 
    
    if (isset($_GET['reg_num'])) {
    $reg_num = $_GET['reg_num'];
}

    if (isset($_GET['name'])) {
    $name = $_GET['name'];
}

    if (isset($_GET['email'])) {
    $email = $_GET['email'];
}

$string = file_get_contents("http://52.74.181.188/swifty/readPdf.php?regNum=" . $reg_num . "");
	
	$mail = new PHPMailer();
	$mail->IsSMTP();
	$mail->SMTPDebug = 1;
	
	$mail->SMTPAuth = true;
	$mail->SMTPSecure = 'ssl';
	
	$mail->Host = "smtp.gmail.com";
	$mail->Port = 465;
	$mail->Username = "swiftysmu@gmail.com";
	$mail->Password = "watch2016";
	
	$mail->SetFrom('swiftysmu@gmail.com', 'OCBC Notifications');
	$mail->Subject = "Your corporate account has been created.";
	$mail->MsgHTML('Dear Valued Customer, <br><br>You have just created a corporate account with us. Do refer to the attachment for your account summary details.<br><br>Thank you and have a nice day.');
	$mail->AddAddress($email, $name);
        $mail->AddStringAttachment($string,'OCBC Corporate Account Summary.pdf');
	
	if($mail->Send()) {
	  echo "Message sent!";
	} else {
	  echo "Mailer Error: " . $mail->ErrorInfo;
	}
    
    $conn->close();
    
?>

