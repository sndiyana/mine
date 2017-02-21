<?php
class DB_Functions {

    private $db;

    //put your code here
    // constructor
    function __construct() {
        require_once 'DB_Connect.php';
        // connecting to database
        $this->db = new DB_Connect();
        $this->db->connect();
    }

    public function getthedatabasehandler() {
        return $this->db->connect();
    }

    // destructor
    function __destruct() {
        //$con=$this->db->connect();
        //$this->db->close($con);
    }


/*
    public function updateUser($hash, $salt, $username_register)
    {
        $con=$this->db->connect();

        $query=("UPDATE USER SET PASSWORD='$hash', SALT='$salt'
				WHERE USERNAME='$username_register'");

        if (!mysqli_query($con, $query))
        {
            die('Error: ' . mysqli_error($con)); return 0;
        }
        return 1;
    }
    */
}

?>