var inClear = false;

function DoValidate(frm){
//	if ( inClear == true )
//		return true;

	var tn = new Number( );
	var ts = new String();
	var retVal = true;
    
//	var list = document.frm.age;
	
	tn = frm.age.options[frm.age.selectedIndex].value;
	ts = frm.age.options[frm.age.selectedIndex].value;

	if ( tn < 0 || tn > 100 || ts.search( "[^0-9]" ) != -1 ) {
		alert( "Please select an Age Band." );
		retVal = false;
	}
	else{
		ts = frm.coverage.value;
		ns = ScrubNumber(ts);
		tn = new Number(ns);
    
	    	if ( tn <= 0 ) {
    			alert( "Please enter a Life Insurance amount greater than zero." );
	    	}
		else{
	    		Main(frm);
			frm.coverage.value = FormatCurrency(tn);
//    			frm.thisaction.value = "doCalc";
    		}
	}

	return retVal;
}

function DoClear(frm)
{
//	inClear = true;
	frm.age.value = "0";
	frm.coverage.value = "0";
	frm.insurance.value = "";
	frm.monthly.value = "";
	frm.annualized.value = "";
	frm.coverage.focus();
	frm.coverage.select()

	return true;
}