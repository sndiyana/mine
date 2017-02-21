<?php

//Step 1: Connect to the database server, to a specific database
$conn = mysqli_connect('localhost', 'root', '', 'is480');
if (!$conn)
	{  exit( 'Could not connect:'  
           .mysqli_connect_error($conn) ); 	
  }
  print ("A :Expertise of the faculty member.");
//A: Init & Prepare Statement 
$stmt = mysqli_stmt_init($conn);
mysqli_stmt_prepare($stmt, 'select name as FacultyName, office , expertise 
from faculty f ,faculty_expertise fe
where f.email=fe.email and f.email=?'); 

//A: Bind parameters 
mysqli_stmt_bind_param($stmt, 's', $email);

  
//B: Init & Prepare Statement 
//$stmt1 = mysqli_stmt_init($conn);



//Step 3: Perform the query (execute statement)
$email = $_POST['email'];

mysqli_stmt_execute($stmt);
//mysqli_stmt_execute($stmt1);
//Step 4a: Bind result variables
mysqli_stmt_bind_result($stmt, $name, $office, $expertise);

//Step 4b: Fetch Values – headers 
print '<table border=2 bordercolor=purple>';
	print '<tr>';
	$metadata =mysqli_stmt_result_metadata($stmt);
	while ($finfo = mysqli_fetch_field($metadata)) {
		print '<th>'.$finfo->name.'</th>';
	}
	print '</tr>';

	while (mysqli_stmt_fetch($stmt)) {
		print '<tr>';
			print '<td>'.$name.'</td>';
			print '<td>'.$office.'</td>';
			print '<td>'.$expertise.'</td>';		
		print '</tr>';
	}
	print '</table>';
print '</br>';
print '</br>';


print "B: Details of the team the faculty has been a supervisor";

mysqli_stmt_prepare($stmt, "select t.name as TeamName, t.title as ProjectTitle, contact as ProjectContacts, p.term as TermRegistered
from assignment a, team t, project p, project_contacts pc
where a.team = t.name and a.term=t.term and
role ='supervisor' and email=?
and t.title=p.title and pc.title=p.title"); 

//B: Bind parameters 
mysqli_stmt_bind_param($stmt, 's', $email);
$email = $_POST['email'];
mysqli_stmt_execute($stmt);
mysqli_stmt_bind_result($stmt, $team, $title, $contact , $term);
print '<table border=2 bordercolor=purple>';
	print '<tr>';
	$metadata =mysqli_stmt_result_metadata($stmt);
	while ($finfo = mysqli_fetch_field($metadata)) {
		print '<th>'.$finfo->name.'</th>';
	}
	print '</tr>';

	while (mysqli_stmt_fetch($stmt)) {
		print '<tr>';
			print '<td>'.$team.'</td>';
			print '<td>'.$title.'</td>';
			print '<td>'.$contact.'</td>';	
			print '<td>'.$term.'</td>';	
		print '</tr>';
	}
	print '</table>';
	
	// query 3
	print '</br>';
print '</br>';
	
	
print "C: Details of the team the faculty has been a primary reviewer";

mysqli_stmt_prepare($stmt, "select t.name as TeamName, t.title as ProjectTitle, contact as ProjectContacts, p.term as TermRegistered
from assignment a, team t, project p, project_contacts pc
where a.team = t.name and a.term=t.term and
role ='Primary Reviewer' and email=?
and t.title=p.title and pc.title=p.title"); 

//C: Bind parameters 
mysqli_stmt_bind_param($stmt, 's', $email);
$email = $_POST['email'];
mysqli_stmt_execute($stmt);
mysqli_stmt_bind_result($stmt, $team, $title, $contact , $term);
print '<table border=2 bordercolor=purple>';
	print '<tr>';
	$metadata =mysqli_stmt_result_metadata($stmt);
	while ($finfo = mysqli_fetch_field($metadata)) {
		print '<th>'.$finfo->name.'</th>';
	}
	print '</tr>';

	while (mysqli_stmt_fetch($stmt)) {
		print '<tr>';
			print '<td>'.$team.'</td>';
			print '<td>'.$title.'</td>';
			print '<td>'.$contact.'</td>';	
			print '<td>'.$term.'</td>';	
		print '</tr>';
	}
	print '</table>';
	
		print '</br>';
print '</br>';
print "D: Details of the team the faculty has been a Secondary Reviewer";

mysqli_stmt_prepare($stmt, "select t.name as TeamName, t.title as ProjectTitle, contact as ProjectContacts, p.term as TermRegistered
from assignment a, team t, project p, project_contacts pc
where a.team = t.name and a.term=t.term and
role ='Secondary Reviewer' and email=?
and t.title=p.title and pc.title=p.title"); 

//D: Bind parameters 
mysqli_stmt_bind_param($stmt, 's', $email);
$email = $_POST['email'];
mysqli_stmt_execute($stmt);
mysqli_stmt_bind_result($stmt, $team, $title, $contact , $term);
print '<table border=2 bordercolor=purple>';
	print '<tr>';
	$metadata =mysqli_stmt_result_metadata($stmt);
	while ($finfo = mysqli_fetch_field($metadata)) {
		print '<th>'.$finfo->name.'</th>';
	}
	print '</tr>';

	while (mysqli_stmt_fetch($stmt)) {
		print '<tr>';
			print '<td>'.$team.'</td>';
			print '<td>'.$title.'</td>';
			print '<td>'.$contact.'</td>';	
			print '<td>'.$term.'</td>';	
		print '</tr>';
	}
	print '</table>';
	print '</br>';
print '</br>';
	print "E: Details of the teams the faculty member has nominated for awards";

mysqli_stmt_prepare($stmt, "select team , title , award , type , reason ,t.term 
from nomination n, team t , award a
where faculty=?
and t.name = n.team
and a.name=n.award"); 

//E: Bind parameters 
mysqli_stmt_bind_param($stmt, 's', $email);
$email = $_POST['email'];
mysqli_stmt_execute($stmt);
mysqli_stmt_bind_result($stmt, $team, $title, $award , $type , $reason, $term);
print '<table border=2 bordercolor=purple>';
	print '<tr>';
	$metadata =mysqli_stmt_result_metadata($stmt);
	while ($finfo = mysqli_fetch_field($metadata)) {
		print '<th>'.$finfo->name.'</th>';
	}
	print '</tr>';

	while (mysqli_stmt_fetch($stmt)) {
		print '<tr>';
			print '<td>'.$team.'</td>';
			print '<td>'.$title.'</td>';
			print '<td>'.$award.'</td>';	
			print '<td>'.$type.'</td>';	
			print '<td>'.$reason.'</td>';	
			print '<td>'.$term.'</td>';	
		print '</tr>';
	}
	print '</table>';
	
	
//Step 5a: Close Statement
mysqli_stmt_close($stmt);

//Step 5b: Close the Connection
mysqli_close($conn);
?>

