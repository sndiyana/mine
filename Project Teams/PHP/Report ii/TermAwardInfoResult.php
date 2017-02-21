<?php
//step 1: connect to the database server, to a specific database
$conn = mysqli_connect('localhost', 'root', '','is480');

if (!$conn) {
    exit( 'Could not connect:'.mysqli_connect_error($conn) );
}

//step 2a
$stmt = mysqli_stmt_init($conn);
mysqli_stmt_prepare($stmt , 'SELECT distinct n.Team, temp2.t1 as Supervisor, temp2.t2 as PrimaryReviewer,
 temp2.t3 as SecondaryReviewer, temp3.proposal as Proposal, temp3.ascore as Acceptance, 
 temp3.mtscore as MidTerm, temp3.finalscore as Final, temp3.presentation as Presentation, 
 temp3.overall as Overall,
 f.name as NominatedBy, n.Reason, temp.votes as Votes,
 IF(Winner = 1, "Yes", "No") as "Winner?"

from team t, nomination n, faculty f,

(Select term, faculty, award, team, count(voting_faculty) as votes From faculty_vote group by team) as temp,

(select distinct a.team,t.Title,a.term, MAX(IF(role="Supervisor",f.name,null)) as t1,MAX(IF(role="Primary Reviewer",f.name,null)) as t2,
	MAX(IF(role="Secondary Reviewer",f.name,null)) as t3
from assignment a, faculty f, team t where a.team = t.name and a.term = t.term and a.email = f.email group by team) as temp2,

(SELECT  g.Term, g.Team_name as Team, 
	   SUM((if(Assessed_Stage = "Proposal", ROUND((r.weightage /100 * g.score), 2), 0))) as proposal,
       MAX(if(Assessed_Stage = "Proposal", Percentage, 0)) as "Proposal%",
	   SUM((if(Assessed_Stage = "Acceptance", ROUND((r.weightage /100 * g.score), 2), 0))) as ascore,
       MAX(if(Assessed_Stage = "Acceptance", Percentage, 0)) as "Acceptance%",
       SUM((if(Assessed_Stage = "Midterm", ROUND((r.weightage /100 * g.score), 2), 0))) as mtscore,
       MAX(if(Assessed_Stage = "Midterm", Percentage, 0)) as "MidTerm%",
       SUM((if(Assessed_Stage = "Final", ROUND((r.weightage /100 * g.score), 2), 0))) as finalscore,
       MAX(if(Assessed_Stage = "Final", Percentage, 0)) as "Final%",
       SUM((if(Assessed_Stage = "Presentation", ROUND((r.weightage /100 * g.score), 2), 0))) as presentation,
       MAX(if(Assessed_Stage = "Presentation", Percentage, 0)) as "presentation%",
       SUM((ROUND((r.weightage /100) * g.score *(Percentage/100), 2))) as overall
FROM team t left outer join grade g on g.term = t.term and g.team_name = t.name 
 left outer join assessment a on a.check_point = g.assessed_stage 
 left outer join assignment ass on g.faculty = ass.email and g.team_name = ass.team 
 left outer join role r on ass.role=r.name and g.term = ass.term
GROUP BY t.term, t.name) as temp3

where t.name = n.Team and t.term = n.term and n.term = ? and n.award = ?

AND n.Faculty = f.email AND n.Faculty = temp.faculty and n.term = temp.term and n.team  = temp.team and n.award = temp.award
	and temp2.team = n.team and temp2.term and temp3.term = n.term and temp3.team = n.team Order by n.team desc;');

//step 2b
mysqli_stmt_bind_param($stmt, 'ss', $term, $award);

//step 3
$term = $_POST["ayterm"];
$award = $_POST["award"];
mysqli_stmt_execute($stmt);

//step 4a
mysqli_stmt_bind_result($stmt, $team, $supervisor, $primary, $secondary,$proposal, $acceptance, $midterm, $final, $presentation,$overall, $facultyName, $reason, $votes, $winner);

//step 4b 
print '<table border = 1 bordercolor = purple width = 75%> ';
$metadata = mysqli_stmt_result_metadata($stmt);
while ($finfo = mysqli_fetch_field($metadata)) {
    print '<th>'. $finfo->name.'</th>';
}
print '</tr>';

//step 4b 
while (mysqli_stmt_fetch($stmt)) {
    print '<tr>';
        print '<td>'.$team.'</td>';
		print '<td>'.$supervisor.'</td>';
		print '<td>'.$primary.'</td>';
		print '<td>'.$secondary.'</td>';
		print '<td>'.$proposal.'</td>';
		print '<td>'.$acceptance.'</td>';
		print '<td>'.$midterm.'</td>';
		print '<td>'.$final.'</td>';
		print '<td>'.$presentation.'</td>';
		print '<td>'.$overall.'</td>';
        print '<td>'.$facultyName.'</td>';
        print '<td>'.$reason.'</td>';
        print '<td>'.$votes.'</td>';
		print '<td>'.$winner.'</td>';
    print '</tr>';
}
print '</table><br><br>';

/*//step 2a
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
print '</table>'; */

//step 5a
mysqli_stmt_close($stmt);
//mysqli_stmt_close($stmt1);

//step 5b
mysqli_close($conn);

?>
