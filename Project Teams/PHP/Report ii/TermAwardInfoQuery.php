<html>
<head><title>Function Two</title>
<script language=JavaScript>
function reload(form){
var val=form.ayterm.options[form.ayterm.options.selectedIndex].value; 
self.location='TermAwardInfoQuery.php?ayterm=' + val ;
}
</script></head>
<body>
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


<form method="post" action="TermAwardInfoResult.php" >
Select Term:    
<select name="ayterm" onchange="reload(this.form)"> 

    <?php $term = $_GET['ayterm'];?>
    <option selected = "selected">--Select--</option>;
    <?php
//step 4b: fetch values - headers
while (mysqli_stmt_fetch($stmt)) {
        if ($ayterm == @$term) {
        print "<option selected value = $ayterm>$ayterm</option>";
        } else {
        print "<option value = $ayterm>$ayterm</option>";
        }
}

?>
</select>
<?php$term = $_GET['ayterm'];?>
<br>
Select Award: 
<select name="award" > 
<option selected = "selected">-------Select One-------</option>;
<?php
//step 2a: init and prepare statement (connection statement)
$stmt1 = mysqli_stmt_init($conn);
if (strlen(@$term) > 0) { 
    mysqli_stmt_prepare($stmt1 , 'select distinct name 
	from award a, sis_award sa where a.name = sa.award_name OR a.name IN 
	(select donor_award from donor_availability where term  = ?)');
    //step 2b: bind parameters
    mysqli_stmt_bind_param($stmt1, 's', $term);
    //step 3: perform the query (execute statement)
    $term = $_GET["ayterm"]; 
    mysqli_stmt_execute($stmt1);
    //step 4a: bind result vairables
    mysqli_stmt_bind_result($stmt1, $award);
    //step 4b: fetch values - headers
    while (mysqli_stmt_fetch($stmt1)) {
        print '<option value ="'. $award.'">'.$award.'</option>';
		//'<option value="'. $pid.'">'. $description .'</option>';
    }
} else {
    mysqli_stmt_prepare($stmt1 , 'Select name from award');
    //step 3: perform the query (execute statement)
    mysqli_stmt_execute($stmt1);

    //step 4a: bind result vairables
    mysqli_stmt_bind_result($stmt1, $name);

    //step 4b: fetch values - headers
    while (mysqli_stmt_fetch($stmt1)) {
        print "<option value = $name>$name</option>";
    }
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
mysqli_stmt_close($stmt1);

//step 5b: close the connection
mysqli_close($conn);

?>