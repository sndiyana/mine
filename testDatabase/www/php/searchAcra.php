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
			$outp="";
			$num = "";
      if(isset($_GET['regNum']) && $_GET['regNum'] != 0){
        $num = $_GET['regNum'];
        $sql = "SELECT * FROM acra where status = 1 AND reg_num = '$num'";
        $result = $conn->query($sql);
        while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            //if ($outp != "") {
            //    $outp .= ",";
           // }
            $outp .= '{"reg_num":"'  . $rs["reg_num"] . '",';
            $outp .= '"name":"'  . $rs["name"]  . '",';
            $outp .= '"phone":"'  . $rs["phone"]  . '",';
            $outp .= '"fax":"'  . $rs["fax"] . '",';
            
        }} else {
					if((isset($_GET['name']) && isset($_GET['year']))!= 0) {
            $name = $_GET['name'];
            $year = $_GET['year'];
            $sql = "SELECT * FROM acra where status = 1 AND name = '$name' AND EXTRACT(year FROM incorporation_date) = '$year'";
            $result = $conn->query($sql);
            while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
               // if ($outp != "") {
               //     $outp .= ",";
                //}
                $num = $rs["reg_num"];
                $outp .= '{"reg_num":"'  . $rs["reg_num"] . '",';
                $outp .= '"name":"'  . $rs["name"]  . '",';
                $outp .= '"phone":"'  . $rs["phone"]  . '",';
                $outp .= '"fax":"'  . $rs["fax"] . '",';
								   
            }
					}}
          if ($outp != "") {
            $sql = "SELECT * FROM acra_comp_add where reg_num = '$num'";
            $result = $conn->query($sql);
            while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
              $outp .= '"address":"'  . $rs["address"] . '",';
              $outp .= '"country":"'  . $rs["country"] . '",';
            }
          
            $sql = "SELECT a.reg_num as id,l.activity as activity FROM acra_activities a,activitylist l where a.reg_num = '$num' AND a.activityID = l.id ";
            $result = $conn->query($sql);
            while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
              $outp .= '"activity":"'  . $rs["activity"] . '"}';
            }
          }
          if ($outp != "") {
            $outp ='{ "records":[ '.$outp.' ]}';
          } else {
              $outp = "empty";
          }
        $conn->close();
        echo($outp);
      
    ?>

