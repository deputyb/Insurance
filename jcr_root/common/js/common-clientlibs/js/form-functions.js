/** Functions used on forms source got from original forms **/

function numbersOnly(num)
{
	var charCode = (num.which) ? num.which : event.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;
	
	return true;
}

/* Auto tab for zip code/ phone numbers */
function autoTab(field)
{
	if (field.value.length == field.getAttribute("maxlength"))
		field.form.elements[getIndex(field)+1].focus();
}

function getIndex(field)
{
	for(i=0; i < field.form.elements.length; i++)
	{
		if(field.form.elements[i] == field)
			return i;
	}
}

/*new functions used on forms*/
function newRow(classId, limit)
{
	var elementsNumber =  $("." + classId).size();
	if (elementsNumber < limit ) {
		var newElement = $("." + classId).first().clone();
		newElement.attr("name", $("." + classId).first().attr("name") + elementsNumber);
		newElement.find("label").remove();
		newElement.find("a").remove();
		// change id input
		
		$("." + classId).last().after(newElement);
	}
	return false;
}

//This function is responsible for checking which button is pressed. If user clicks the right mouse button then an alert is coming out that "Right Click Not Allowed!".

function whichButton(event)
{
if (event.button==2)//For right click
{
alert("Right Click Not Allowed!");
}

}

//This function is responsible for checking which key is being pressed. If user presses ctrl key then the an alert is coming out that "Sorry, this functionality is disabled.".

function noCTRL(e)
{
	var code = (document.all) ? event.keyCode:e.which;
	
	var msg = "Sorry, this functionality is disabled.";
	if (parseInt(code)==17) // This is the Key code for CTRL key
	{
		alert(msg);
		window.event.returnValue = false;
	}
}

$( document ).ready(function() {
	$(".bottomBtns .blueBtn.graybg").click(function(){
		$(this).closest('form').get(0).reset();
		return false;
	});
});

