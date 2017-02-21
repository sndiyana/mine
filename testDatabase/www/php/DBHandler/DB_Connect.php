<?php
class DB_Connect {

	//constructor
	function __construct() {

	}

	//destructor
	/*function __destruct($con) {
		$this->close($con);
	}
    */

	//Connecting to database
	public function connect() {
		require_once 'DB_Config.php';
		//connecting to mysql
		$con = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD);
		//selecting database
		mysqli_select_db($con, DB_DATABASE);
		mysqli_query($con, "SET NAMES utf8");
		mysqli_query($con, "SET CHARACTER_SET_CLIENT=utf8");
		mysqli_query($con, "SET CHARACTER_SET_RESULTS=utf8");
        mysqli_query($con, "SET time_zone = 'Asia/Singapore'");

		//return database handler
		return $con;
	}

	//Closing database connection
	/*
    public function close($con) {
		mysqli_close($con);
	}
    */
}

?>