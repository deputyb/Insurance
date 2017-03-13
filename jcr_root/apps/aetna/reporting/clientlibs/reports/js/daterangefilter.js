$(document).ready(function(){
	
	$(".datepicker").datepicker({
	    //comment the beforeShow handler if you want to see the ugly overlay
	    beforeShow: function() {
	        setTimeout(function(){
	            $('.ui-datepicker').css('z-index', 9000);
	        }, 0);
	    }
	});
	
	$("[name=startDate]").blur(function(){
		if(this.value==""){
			$(this).addClass("error");
		}else{
			$(this).removeClass("error");
		}
	});

	$("[name=endDate]").blur(function(){
		if(this.value==""){
			$(this).addClass("error");
		}else{
			$(this).removeClass("error");
		}
	});
	
	$("#dateRangeBut").click(function(){
		var url = baseURL + ".json";
		
		var valid = true;
		
		//Validates dates
		if ($("[name=startDate]").val() == ""){
			$("[name=startDate]").addClass("error");
			valid = false;
		}
		
		if ($("[name=endDate]").val() == ""){
			$("[name=endDate]").addClass("error");
			valid = false;
		}
		
		if (valid){
			console.log($("#daPicker").serialize());
			$("body").addClass("loading");
			$.ajax({
				type:"POST",
				url: url,
				data: $("#daPicker").serialize(),
				success: function(data){
					CQ.reports.Report.theInstance.reload();
					console.log(data);
				},
				complete: function(){
					$("body").removeClass("loading");
				}
			});
		}
		
		return false;	
	});
});