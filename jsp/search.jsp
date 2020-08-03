<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=greek"/>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>

	<script>
		function results(dis){
		   $.ajax({ url:"http://ClinicalTrials.gov/api/query/full_studies?max_rnk=100&expr="+dis,
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
	<title>Clinical Trials Search</title>
</head>

<body>
	 <h1 >Loading ...</h1>
	 <%
	     String disease=request.getParameter("disease");
	 %>
	<script>results('<%=disease%>')  </script>

</body>
</html> 
