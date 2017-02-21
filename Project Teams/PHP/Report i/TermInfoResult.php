<?php
//step 1: connect to the database server, to a specific database
$conn = mysqli_connect('localhost', 'root', '','is480');

if (!$conn) {
    exit( 'Could not connect:'.mysqli_connect_error($conn) );
}

//step 2a
$stmt = mysqli_stmt_init($conn);
mysqli_stmt_prepare($stmt , 'SELECT distinct ay.AYTerm, ay.Approx_Number_Teams as "Approx Num Teams", 
   IF(t1.numT IS NULL, "0", t1.numT) as "Total Teams Registered",
   t2.spprsr as "Total Number of Faculty members Assigned"
   FROM term ay left outer join (SELECT term, COUNT(name) as numT from team GROUP BY term) 
   t1 on ay.AYTerm = t1.term left outer join (SELECT AYTerm, COUNT(distinct email) as spprsr 
   from term t left outer join assignment a on t.AYTerm = a.term and (role = "Supervisor") GROUP BY term)
   t2 on t2.AYTerm = ay.AYTerm where term = ?');

//step 2b
mysqli_stmt_bind_param($stmt, 's', $term);

//step 3
$term = $_POST["term"];
mysqli_stmt_execute($stmt);

//step 4a
mysqli_stmt_bind_result($stmt, $term, $approxteam, $totalteam, $faculty);

//step 4b 
print '<table border = 2 bordercolor = purple>';
$metadata = mysqli_stmt_result_metadata($stmt);
while ($finfo = mysqli_fetch_field($metadata)) {
    print '<th>'. $finfo->name.'</th>';
}
print '</tr>';

//step 4b 
while (mysqli_stmt_fetch($stmt)) {
    print '<tr>';
        print '<td>'.$term.'</td>';
        print '<td>'.$approxteam.'</td>';
        print '<td>'.$totalteam.'</td>';
        print '<td>'.$faculty.'</td>';
    print '</tr>';
}
print '</table><br><br>';

//step 2a
$stmt1 = mysqli_stmt_init($conn);
mysqli_stmt_prepare($stmt1 , 'select name as "Faculty Name",
SUM(role = "Supervisor") as "Number of teams assigned as Supervisor", 
SUM(role = "Primary Reviewer") as "Number of teams assigned as Primary Reviewer", 
SUM(role = "Secondary Reviewer") as "Number of teams assigned as Secondary Reviewer" 
from assignment a, faculty f
where a.email = f.email
and term = ?
group by a.email');

//step 2b
mysqli_stmt_bind_param($stmt1, 's', $term);

//step 3
$term = $_POST["term"];
mysqli_stmt_execute($stmt1);

//step 4a
mysqli_stmt_bind_result($stmt1, $name, $sp, $pr, $sr);

//step 4b 
print '<table border = 2 bordercolor = purple>';
$metadata = mysqli_stmt_result_metadata($stmt1);
while ($finfo = mysqli_fetch_field($metadata)) {
    print '<th>'. $finfo->name.'</th>';
}
print '</tr>';

//step 4b 
while (mysqli_stmt_fetch($stmt1)) {
    print '<tr>';
        print '<td>'.$name.'</td>';
        print '<td>'.$sp.'</td>';
        print '<td>'.$pr.'</td>';
        print '<td>'.$sr.'</td>';
    print '</tr>';
}
print '</table>';

//step 5a
mysqli_stmt_close($stmt);
mysqli_stmt_close($stmt1);

//step 5b
mysqli_close($conn);

?>
