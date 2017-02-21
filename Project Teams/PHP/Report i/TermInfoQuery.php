<?php
//step 1: connect to the database server, to a specific database
$conn = mysqli_connect('localhost', 'root', '','is480');

if (!$conn){
    exit( 'Could not connect:'.mysqli_connect_error($conn) );
}

//step 2a: init and prepare statement (connection statement)
$stmt = mysqli_stmt_init($conn);
mysqli_stmt_prepare($stmt , 'Select ayterm from term');

//step 2b: bind parameters

//step 3: perform the query (execute statement)
mysqli_stmt_execute($stmt);

//step 4a: bind result vairables 
mysqli_stmt_bind_result($stmt, $ayterm);
?>

<html>
<head><title>Function One</title></head>
<body>
<form method="post" action="TermInfoResult.php">
Select Term: 
<select name="term"> 
<option selected = "selected">--Select--</option>;
<?php
//step 4b: fetch values - headers
while (mysqli_stmt_fetch($stmt)) {
    print "<option value = $ayterm>$ayterm</option>";
}
?>
</select>

<input type="submit" value=" Get Term Info " />
</form>
</body>
</html>

<?php
//step 5a: close statement
mysqli_stmt_close($stmt);

//step 5b: close the connection
mysqli_close($conn);

?>