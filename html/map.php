<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" type="text/css" href="../css/map.css" />
<link rel="icon" type="image/png" href="../graphics/logo.png""/>
<title>Map Search</title>
<script src="../javascript/menu.js"></script>
<script src="../javascript/map.js"></script>
  <script type='text/javascript'
            src='http://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=AgvK9x-Z_OlQKTFUyyZXUNl7e0zIK2eYjLNF4ZUa4p4eV8rsu7h_C4Kds6jpu4fB' 
            async defer></script>

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


<p class="aligncenter">
    <img src="../graphics/logo.png" alt="centered image" />
</p>      

<p class="aligncenter" style="font-size:25px;color:#2B3856" alt="centered image">
    Advanced Search For Clinical Trials Worldwide
</p>      
<span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776; MENU</span>

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
$res=array();
if($result = mysqli_query($conn, $sql)){
    if(mysqli_num_rows($result) > 0){
  
        while($row = mysqli_fetch_array($result)){
		 array_push($res,$row['country'],$row['count']);
        }
        mysqli_free_result($result);
    } else{
        
    }
} else{
    echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
}

?> 
<script>var result = [<?php echo '"'.implode('","',  $res ).'"' ?>];</script>
<div id="myMap" style="position:relative;width:600px;height:400px;"></div>


</body>
</html> 
