<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="../javascript/menu.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>
<script type="text/javascript">
        function sear(dis)
            {
                $.ajax({
                    type: "get",
                    url: "ClinicalTrials.gov/api/query/full_studies?expr="+dis,
                    success: function(msg){      
                            $('#output').append(msg);
                    }
                });
            });

        });
</script>
<link rel="icon" type="image/png" href="../graphics/logo.png""/>
<title>Clinical Trials Search</title>
</head>

<body onload="sear()">
      <% String d = request.getParameter("disease"); %>
      <div id="output"></div>

</script>  
</body>
</html> 
