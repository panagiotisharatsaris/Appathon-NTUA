<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>

<script>
function results(dis){
   $.ajax({ url:"http://ClinicalTrials.gov/api/query/full_studies?expr="+dis,
            type: "GET",
            contentType:'text/xml; charset=UTF-8',
            datatype:'xml',
            async: false,
            success: function(data){
               $('body').html('<pre>'+data+'<pre>');
            }
         });
}
</script>
<link rel="icon" type="image/png" href="../graphics/logo.png""/>
<title>Clinical Trials Search</title>
</head>

<body>
 <%
     String disease=request.getParameter("disease");
 %>
<script>results('<%=disease%>')  </script>

</body>
</html> 
