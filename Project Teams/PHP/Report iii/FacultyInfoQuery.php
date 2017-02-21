<html>
<head><title>Price Query</title></head>
<body>
<form method="post" action="FacultyInfoResult.php">
Select Faculty Email:
<select name="email">

<?php

//Step 1: Connect to the database server, to a specific database
$conn = mysqli_connect('localhost', 'root', '', 'is480');
if (!$conn)
	{  exit( 'Could not connect:'  
           .mysqli_connect_error($conn) ); 	
  }
  
//Step 2a: Init & Prepare Statement
$stmt = mysqli_stmt_init($conn);
mysqli_stmt_prepare($stmt, 'Select distinct email from faculty'); 

//Step 2b: Bind parameters
mysqli_stmt_bind_param($stmt);

//Step 3: Perform the query (execute statement)
mysqli_stmt_execute($stmt);

//Step 4a: Bind result variables
mysqli_stmt_bind_result($stmt, $email);

//Step 4b: Fetch Values – headers 
//mysqli_stmt_fetch($stmt);
print '<option selected ="selected">-- Select  --</option>';
while(mysqli_stmt_fetch($stmt)) { 
        print '<option value="'. $email.'">'. $email .'</option>';   
}

//Step 5a: Close Statement
mysqli_stmt_close($stmt);

//Step 5b: Close the Connection
mysqli_close($conn);
?>
</select>


<input type="submit" value="Get Faculty Info" />
</form>
</body>
</html>

