$(document).ready(function(){

	$(".plRefresh").click(function(){
		
		console.log("Start");
		var url = baseURL + ".json";
		
		$("body").addClass("loading");
		$.ajax({
			type:"POST",
			url: url,
			success: function(data){
				$(".plDate").html(data);
				CQ.reports.Report.theInstance.reload();
				console.log(data);					
			},
			complete: function(){
				$("body").removeClass("loading");
			}
		});
	});
});