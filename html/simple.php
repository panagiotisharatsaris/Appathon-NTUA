<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=greek"/>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="../css/simple_search.css" />
	<script src="../javascript/menu.js"></script>
	<link rel="icon" type="image/png" href="../graphics/logo.png""/>
	<title>Simple Search</title>
</head>

<body>

	<div id="mySidenav" class="sidenav">
	  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
	  <a href="home.html">Home Page</a>
	  <a href="simple_search.html">Simple Search</a>
	  <a href="map_search.html">Map Search</a>
	  <a href="jspsearch.html">Clinical Trials Search</a>
	  <a href="contact.html">Contact</a>
	</div>

	<span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776; MENU</span>
	<div class="main-block" style="white-space:nowrap;overflow-x:scroll;">
	     <?php

		$disease=$_POST["disease"];
		$drug=$_POST["drug"];
		$date=$_POST["date"];
		$servername = "localhost";
		$username = "root";
		$password = "";
		$dbname = "HealthMap";

		// Create connection
		$conn = new mysqli($servername, $username, $password,$dbname);

		// Check connection
		if ($conn->connect_error) {
		  die("Connection failed: " . $conn->connect_error);
		}
		if ($date!=''){
			$sql = "SELECT C.countries AS country,COUNT(C.id) AS count FROM ClinicalTrials AS C WHERE C.drugs LIKE '%".$drug."%'  AND C.disease LIKE '%".$disease."%' AND CAST(RIGHT(C.date,4) AS SIGNED)>=".$date." GROUP BY C.countries ORDER BY COUNT(C.id) DESC";}
		else{
			$sql = "SELECT C.countries AS country,COUNT(C.id) AS count FROM ClinicalTrials AS C WHERE C.drugs LIKE '%".$drug."%'  AND C.disease LIKE '%".$disease."%'  GROUP BY C.countries ORDER BY COUNT(C.id) DESC";
		}

		if($result = mysqli_query($conn, $sql)){
		    if(mysqli_num_rows($result) > 0){
		      echo '<div id="table-wrapper">';
		      echo '<div id="table-scroll">';
			echo "<table>";
			    echo "<tr>";
				echo "<th>Country</th>";
				echo "<th>Number of Clinical Trials</th>";
			    echo "</tr>";
			while($row = mysqli_fetch_array($result)){
			    echo "<tr>";
				echo "<td>" . $row['country'] . "</td>";
				echo "<td>" . $row['count'] . "</td>";
			    echo "</tr>";
			}
			echo "</table>";
			echo "</div>";
			echo "</div>";
			// Free result set
			mysqli_free_result($result);
		    } else{
			echo "No records matching your search were found.";
		    }
		} else{
		    echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
		}

	?> 


	      
	</div>



</body>
</html> 
