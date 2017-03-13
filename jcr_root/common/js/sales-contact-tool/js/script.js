// ========== DROPDOWN LOGIC =========== //

$('.drop-down-show-hide').hide();

$('#first-choice').change(function(){
	$('#small , #mid , #national , #public').prop('selectedIndex',0);
	$(this).find("option").each(function() {
		$('#' + this.value).hide();
});
    $('#' + this.value).show();
});


$('#first-choice').change( function() {

	$('#smiley , .smallGroup , .natMarket , .publicLabor , .midMarket , .medCare, .indFam').hide();
	
     if($(this).val() == "inf"){
		$('#smiley , .smallGroup , .natMarket , .publicLabor , .midMarket , .medCare').hide();
		$('.indFam').show();
     }
});

$('#first-choice').change( function() {
     if($(this).val() == "medicare"){
		$('#smiley , .smallGroup , .natMarket , .publicLabor , .midMarket , .indFam').hide();
		$('.medCare').show();
     }
});


$('#second-choice').change(function(){

    $(this).find("option").each(function() {
		$('#' + this.value).hide();
});
    $('#' + this.value).show();
});


$('#small').change(function(){

    $(this).find("option").each(function() {
		$('#' + this.value).hide();
		$('#smiley , .indFam , .natMarket , .publicLabor , .midMarket , .medCare').hide();
});
    $('#' + this.value).show();
	$('.smallGroup').show();
});



$('#mid').change(function(){

    $(this).find("option").each(function() {
		$('#' + this.value).hide();
		$('#smiley , .indFam , .natMarket , .publicLabor , .smallGroup , .medCare').hide();
});
    $('#' + this.value).show();
	$('.midMarket').show();
});


$('#national').change(function(){

    $(this).find("option").each(function() {
		$('#' + this.value).hide();
		$('#smiley , .indFam , .smallGroup , .publicLabor , .midMarket , .medCare').hide();
});
    $('#' + this.value).show();
	$('.natMarket').show();
});


$('#public').change(function(){

    $(this).find("option").each(function() {
		$('#' + this.value).hide();
		$('#smiley , .indFam , .natMarket , .smallGroup , .midMarket , .medCare').hide();
});
    $('#' + this.value).show();
	$('.publicLabor').show();
});

$(function () {
	  $("#first-choice").change(function() {
	    var val = $(this).val();
	    if(val === "base") {
	        $("#smiley").show();
	    }
	    else if(val === "client_form") {
	        $("#smiley").hide();
	    }
	  });
	});

$(function () {
  $("#first-choice").change(function() {
    var val = $(this).val();
    if(val === "national") {
        $("#smiley").show();
    }
    else if(val === "client_form") {
        $("#smiley").hide();
    }
  });
});

$(function () {
  $("#first-choice").change(function() {
    var val = $(this).val();
    if(val === "mid") {
        $("#smiley").show();
    }
    else if(val === "client_form") {
        $("#smiley").hide();
    }
  });
});

$(function () {
  $("#first-choice").change(function() {
    var val = $(this).val();
    if(val === "small") {
        $("#smiley").show();
    }
    else if(val === "client_form") {
        $("#smiley").hide();
    }
  });
});

$(function () {
  $("#first-choice").change(function() {
    var val = $(this).val();
    if(val === "public") {
        $("#smiley").show();
    }
    else if(val === "client_form") {
        $("#smiley").hide();
    }
  });
});

$(function () {
  $("#first-choice").change(function() {
    var val = $(this).val();
    if(val === "base") {
        $("#second-choice").show();
    }
    else if(val === "small") {
        $("#second-choice").hide();
    }
	else if(val === "inf") {
        $("#second-choice").show();
    }
	else if(val === "mid") {
        $("#second-choice").hide();
    }
	else if(val === "national") {
        $("#second-choice").hide();
    }
	else if(val === "public") {
        $("#second-choice").hide();
    }
	else if(val === "medicare") {
        $("#second-choice").show();
    }
  });
});