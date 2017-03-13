<!--
// **********************************************************************
// filename : LibFuncs.js
// 5/1/2003 : v01.00 : Chuck O'Rourke : initial creation
// (c) 2003 Aetna
// Pupose: Library of Commonly Used Functions
// ***********************************************************************
var arrParametersAndValues;
var strQueryString = "";
var strRateIdentifier;
var arrRateIdentifier = new Array();
var arrRateName = new Array();

// Retrieves the querystring part of the URL and creates an array from it. This holds the values used to calculate rates.
// ex. of a URL w/ querystring "http://www.aetna.com?&age=31&amount=3000". "&age=31&amount=3000" is the querystring part.
function CreateQuerystringArray(){
	var strParametersAndValues = unescape(window.location.search.substring(1,window.location.search.length));         // actually retrieves the querystring
	arrParametersAndValues = strParametersAndValues.split("&");     // uses the "split" built in javascript function
									// to create an array of values from the querystring
}

// Retrieves the value associated with a name from the querystring. ex. if querystring is "?&age=31&Amount=3000"
// then if you pass this function "age" it will return "31".
function GetQuerystringValue(strControlName){
	strFindIndexOf = "=";
	for (var x = 0; x < arrParametersAndValues.length; x++){
		var intIndex = arrParametersAndValues[x].indexOf(strFindIndexOf);
		if (arrParametersAndValues[x].substring(0,intIndex) == strControlName){
			var strReturnVal = arrParametersAndValues[x].substring(intIndex + 1, (arrParametersAndValues[x].length));
			return strReturnVal;
		}
	}
}

function GetVariationsValue(x){
	strFindIndexOf = "=";
	if (arrParametersAndValues[x].indexOf(strFindIndexOf) != -1){
		var intIndex = arrParametersAndValues[x].indexOf(strFindIndexOf) + 1;
		var strReturnVal = arrParametersAndValues[x].substring(intIndex, (arrParametersAndValues[x].length));
		return strReturnVal;
	}
}

function GetVariationsDescriptions(x){
	strFindIndexOf = "=";
	if (arrParametersAndValues[x].indexOf(strFindIndexOf) != -1){
		var intIndex = arrParametersAndValues[x].indexOf(strFindIndexOf);
		var strReturnDesc = arrParametersAndValues[x].substring(0, intIndex);
		return strReturnDesc;
	}
}

function VariationValueAliases(strControlName){
	if (strControlName == "LifetimeMaximum"){
		return "Lifetime Maximum instead";
	}
	if (strControlName == "BenefitBank"){
		return "Benefit Bank included";
	}
	if (strControlName == "ReturnContribution"){
		return "Return of Contribution included";
	}
	if (strControlName == "PaidUp6510"){
		return "Paid Up: 65/10 included";
	}
	if (strControlName == "InflationCoverage"){
		return "Inflation Coverage included";
	}
	if (strControlName == "HomeCareCost"){
		return "Home Healthcare instead";
	}
	if (strControlName == "EligibleGroup"){
		return "Eligible Group";
	}
	if (strControlName == "InformalCareBenefit"){
		return "Informal Care instead";
	}
	else{
		return strControlName;
	}
}

// pass this function a form object and it will use it's name and value to build the querystring
function BuildQueryString(objFormControl){
	strQueryString = strQueryString + GetControlNameValue(objFormControl,true) + "&";
	return strQueryString;
}

function AddRateIdentifierToQueryString(strRateIdentifierDescription, strRateIdentifier){
	if (VerifyRateIdentifierValid(strRateIdentifier)){
		strQueryString = strQueryString + strRateIdentifierDescription + "=" + strRateIdentifier + "&";
		return true;
	}
	else{
		return false;
	}
}

// appends together the URL and the querystring
function GoToURLPlusQueryString(strURL){
	strTempURL = strURL + "?" + strQueryString.substring(0,strQueryString.length - 1);
	window.location.href = strTempURL;
	return;
}

// pass the appropriate parameters and a new browser window will open for the URL. The bln variables should be "yes" or "no"
function PopUpWindow(windowname, strURL, blnToolbar, blnmenubar, blnScrollbars, blnResizable){
	window.open(strURL, windowname,"toolbar=" + blnToolbar + ",menubar=" + blnmenubar + ",scrollbars=" + blnScrollbars + ",resizable=" + blnResizable);
	return;
}

function CreateRateIdentifierString(){
	var AlternativeValue;
	var intIndex = 0;
	for (var intArgIndex = 0; intArgIndex < CreateRateIdentifierString.arguments.length; intArgIndex++){
		strRateIdentifier = strRateIdentifier + GetControlNameValue(CreateRateIdentifierString.arguments[intArgIndex],false);
	}
	return strRateIdentifier;
}

function GetNotSelectedDescription(objFormControl,intIndex){
	RetVal = objFormControl.options[intIndex].text + " " + VariationValueAliases(objFormControl.name);
	return RetVal;
}

function GetValueNotSelected(objFormControl,intIndex){
	RetVal = objFormControl.options[intIndex].value;
	return RetVal;
}

function GetControlNameValue(objFormControl,blnNameAndValue){
	var RetVal;
  // Determine which radio button is checked
	if (typeof objFormControl.type == 'undefined'){
		if (objFormControl[0].type == "radio"){
			for (var intChosen = 0; intChosen < objFormControl.length; intChosen++){
				if (objFormControl[intChosen].checked){
					if (blnNameAndValue == true){
						return objFormControl[intChosen].name + "=" + objFormControl[intChosen].value;
					}
					else{
						return objFormControl[intChosen].value;
					}
				}
			}
		}
	}
  // Get text box name and value
	if ((objFormControl.type == "text") || (objFormControl.type == "hidden")){
		if (blnNameAndValue == true){
			return objFormControl.name + "=" + objFormControl.value;
		}
		else{
			return objFormControl.value;
		}
	}
  // Determine which option in a select(Combo or List Box) is selected
	if (objFormControl.type == "select-one"){
		if (blnNameAndValue == true){
			return objFormControl.name + "=" + objFormControl.options[objFormControl.selectedIndex].value;
		}
		else{
			return objFormControl.options[objFormControl.selectedIndex].value;
		}
	}	
  // Determine if a checkbox is checked
	if (objFormControl.type == "checkbox"){
		if (objFormControl.checked){
			if (blnNameAndValue == true){
				return objFormControl.name + "=" + objFormControl.value;
			}
			else{
				return objFormControl.value;
			}
		}
	}
	return RetVal;
}

// verify that combination of choices is valid
function VerifyRateIdentifierValid(strIdentifier){
	for (var intIndex = 0; intIndex < RateArray.length; intIndex++){
		if (RateArray[intIndex].FactorID == strIdentifier){
			return true;
		}
		else{
			retVal = false;
		}
	}
	return retVal;
}

// Set this form element to an empty string
function clearField(form_item){
	form_item.value = "";
}

// Convert a numeric vlaue to a currency formatted string
function FormatCurrency(dblNumber){
	dblNumber = dblNumber.toString().replace(/\$|\,/g,'');  // Remove nasty characters

	if(isNaN(dblNumber)){                                   // if any good characters are not left...
        	dblNumber = "0";
	}

	var sign  = (dblNumber == (dblNumber = Math.abs(dblNumber)));     // Do the math
	dblNumber   = Math.floor(dblNumber*100+0.50000000001);
	var dblCents = dblNumber % 100;
	dblNumber   = Math.floor(dblNumber/100).toString();

	if(dblCents < 10){                                      // 2 digit decimal
        	dblCents = "0" + dblCents;
	}

						                             // Insert commas where necessary
	for (var i = 0; i < Math.floor((dblNumber.length-(1+i))/3); i++){        
        	dblNumber = dblNumber.substring(0,dblNumber.length-(4*i+3)) + ',' + dblNumber.substring(dblNumber.length-(4*i+3));
	}
	return (((sign)?'':'-') + '$ ' + dblNumber + '.' + dblCents);		// Return the final formatted result	
}

// rounds number to intDecPlaces decimal places, defaults to 2
function Rounding(dblNumber, intDecimalPlaces) {
	intDecimalPlaces = (!intDecimalPlaces ? 2 : intDecimalPlaces);
    	return Math.round(dblNumber*Math.pow(10,intDecimalPlaces))/Math.pow(10,intDecimalPlaces);
}

// Strip out certain characters of a string
function StringFilter(strInput) {
	strTemp = strInput.value;
      	filteredValues = "$, ";     // Characters stripped out
      	var i;
      	var returnString = "";
      	for (i = 0; i < strTemp.length; i++) {  // Search through string and append to unfiltered values to returnString.
        	var c = strTemp.charAt(i);
         	if (filteredValues.indexOf(c) == -1){
            		returnString += c;
		}
      	}
      	return returnString;
}

// Turn numbers like 100.10234 to a "$ 100.10" string 
function MakeCurrency(strValue){

	var strFrmt = /\d*.\d\d/;                // Regular expression for 2 digit floating point

      	var strTemp = strValue.toString();       // Convert the passed number value to a text string

	if (strTemp.indexOf(".") == -1) {        // If no decimal point, add ".00"
         	strTemp = strTemp + ".00"; 
      	}
	else{
         	strTemp = strTemp + "0";         // Otherwise add a "0" to be sure regular expression doesn't fail
      	}                                    	 // (it needs at least 2 places after the decimal to operate properly)

      return("$ " + strFrmt.exec(strTemp));      // Add a "$" in front, instantiate proper currency format
   }

function ScrubNumber(dblNum){
	return dblNum.toString().replace(/\$|\,/g,'');
}

function AddCommasToNumber(dblNum){
	dblNum = ScrubNumber(dblNum);
	dblNum = Rounding(dblNum);

	if(isNaN(dblNum)){                             // if any good characters are not left...
        	return dblNum;
	}

	if (dblNum < 1 && dblNum > -1){
		return dblNum;
	}

	dblNum = new String(dblNum);

	var sign  = (dblNum == (dblNum = Math.abs(dblNum)));     // Do the math
	dblNum   = Math.floor(dblNum*100+0.50000000001);
	var dblCents = dblNum % 100;
	dblNum   = Math.floor(dblNum/100).toString();

	for (var i = 0; i < Math.floor((dblNum.length-(1+i))/3); i++){        
        	dblNum = dblNum.substring(0,dblNum.length-(4*i+3)) + ',' + dblNum.substring(dblNum.length-(4*i+3));
	}

	if(dblCents < 10){                               // 2 digit decimal
        	dblCents = "0" + dblCents;
	}
	if (dblCents > 0){
		dblNum = ((sign)?'':'-') + dblNum + "." + dblCents;
	}
	else{
		dblNum = ((sign)?'':'-') + dblNum;
	}
	return dblNum;
}

function RoundThousand(dblValue){
	var tmpNumber = Math.floor(dblValue);
	tmpNumber = tmpNumber.toString();
	intLength = tmpNumber.length;
	if (intLength >= 4){
		intNumber = parseInt(tmpNumber.substring(tmpNumber.length - 3,tmpNumber.length - 2));
		if (intNumber > 0){
			var tmpValue = tmpNumber.substring(0,tmpNumber.length - 3) + "000"
			var intValue = parseInt(tmpValue) + 1000;
		}
		else{
			var tmpValue = tmpNumber.substring(0,tmpNumber.length - 3) + "000"
			var intValue = tmpValue;
		}
	}
	else{
		var intValue = tmpNumber;
	}
	return intValue;	
}

function ReverseBoolean(blnValue){
	if (blnValue){
		return false;
	}
	else{
		return true;
	}
}
-->