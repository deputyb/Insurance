<!--
// **********************************************************************
// filename : ImputedIncomeCalc.js
// 4/11/2003 : v01.00 : Chuck O'Rourke : initial creation
// (c) 2003 Aetna
// Pupose: Imputed Income Rating Engine
// ***********************************************************************

// ***********************************************************************
// function Main:
// Purpose: This function is called by the calculate button and calls all the other functions
//          that peforms various premium calculations.
// Note: In the syntax "function Main(frm)" frm is a reference to
//       the html form and gives programmatic access to html elements such
//       as the text box named "age". frm.age.value returns the current value of that text box.
// ***********************************************************************

function Main(frm){

// In the following two lines I retrieve the users input from the age select control and the coverage
// text box control and read them into two variables intAge and dblCoverage. These variables are passed to
// various functions that produce an insurance amount over $50,000 and a monthly and annual tax amount.

	var intAge = frm.age.options[frm.age.selectedIndex].value;
	var dblCoverage = ScrubNumber(frm.coverage.value);

// The next two lines set the dblFactor and dblCoverageOverFiftyGrand values which are used to 
// compute the monthly and annual tax amounts

	var dblFactor = setFactor(intAge);
	var dblCoverageOverFiftyGrand = setCoverage(dblCoverage);

// In the following three lines I retrieve the insurance amount over $50,000 and monthly and annual tax amount
// and place those values in insurance, monthly and annual text boxes for display on the HTML form.

	frm.insurance.value = FormatCurrency(setCoverage(dblCoverage));
	frm.monthly.value = FormatCurrency(getMonthlyAmount(intAge, dblFactor, dblCoverageOverFiftyGrand));
	frm.annualized.value = FormatCurrency(getYearlyAmount(intAge, dblFactor, dblCoverageOverFiftyGrand));
}

// returns the monthly tax amount
function getMonthlyAmount(intAge, dblFactor, dblCoverageOverFiftyGrand){
	var retval = (dblCoverageOverFiftyGrand / 1000) * dblFactor;
	return retval;
}

// returns the Annaul tax amount
function getYearlyAmount(intAge, dblFactor, dblCoverageOverFiftyGrand){
	var retval = getMonthlyAmount(intAge, dblFactor, dblCoverageOverFiftyGrand) * 12;
	return retval;
}

// Returns the factor that is part of the calculation that sets the monthly and annual tax values
function setFactor(intAge){
	if (intAge == '0'){
		var Factor = 0.050000000000000003;
	}
	if  (intAge == '1'){
			var Factor = 0.06;
		}
	if (intAge == '2'){
			var Factor = 0.08;
		}
	if (intAge == '3'){
			var Factor = 0.09;
		}
	if (intAge == '4'){
			var Factor = 0.10;
		}
	if (intAge == '5'){
			var Factor = 0.15;
		}
	if (intAge == '6'){
			var Factor = 0.23;
		}
	if (intAge == '7'){
			var Factor = 0.43;
		}
	if (intAge == '8'){
			var Factor = 0.66;
		}
	if (intAge == '9'){
			var Factor = 1.27;
		}
	if (intAge == '10'){
		var Factor = 2.0600000000000001;
	}
	return Factor;
}

// Returns a value for the Insurance amount over $50,000.
function setCoverage(dblCoverage){
	if (dblCoverage > 50000){
		var coverage = dblCoverage - 50000;
	}
	else{
		var coverage = 0.0;
	}
	return coverage;
}
-->