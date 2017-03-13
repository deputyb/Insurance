<!--
// **********************************************************************
// filename : GroupCnvCalc.js
// 4/1/2003 : v01.00 : Chuck O'Rourke : initial creation
// (c) 2003 Aetna
// Pupose: Group Conversion Calculator
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
	var intAge = frm.age.value; 				 // age from html form

	var intRateAge = intAge - 1; 				 // age minus one because arrays are zero based

	var dblConversionAmount = frm.conversionamt.value; 	 // Conversion Amount from html form
	dblConversionAmount = ScrubNumber(dblConversionAmount);  // Removes "$" and "," chars
	dblConversionAmount = parseFloat(dblConversionAmount);

// The following pairs of lines first return a rate from an array and then cast that value as a floating point integer

	var dblAnnualRate = RateArray[intRateAge].Annual; 	
	dblAnnualRate = Rounding(dblAnnualRate,2);

	var dblSemiAnnualRate = RateArray[intRateAge].SemiAnnual;
	dblSemiAnnualRate = Rounding(dblSemiAnnualRate,2);

	var dblQuarterlyRate = RateArray[intRateAge].Quarterly;
	dblQuarterlyRate = Rounding(dblQuarterlyRate,2);

	var dblMonthlyRate = RateArray[intRateAge].Monthly;
	dblMonthlyRate = Rounding(dblMonthlyRate,2);

// The following pairs of lines perform two function. First they run the calculation and then place the value in the table.

	var dblAnnualAmount = Calculate(dblConversionAmount, dblAnnualRate, dblAnnualRate, 1.0, 15)
	frm.annual.value = FormatCurrency(dblAnnualAmount);

	var dblSemiAnnualAmount = Calculate(dblConversionAmount, dblAnnualRate, dblSemiAnnualRate, 0.51500000000000001, 8)
	frm.semiannual.value = FormatCurrency(dblSemiAnnualAmount);

	var dblQuarterlyAmount = Calculate(dblConversionAmount, dblAnnualRate, dblQuarterlyRate, 0.26250000000000001, 4.5)
	frm.quarterly.value = FormatCurrency(dblQuarterlyAmount);

	var dblMonthlyAmount = Calculate(dblConversionAmount, dblAnnualRate, dblMonthlyRate, 0.085000000000000006, 2)
	frm.monthly.value = FormatCurrency(dblMonthlyAmount);

	return;
}

function Calculate(dblConversionAmount,	dblAnnualRate, dblBaseRate, dblFrequencyFactor, dblFee){
// if the conversion amount is less than 10,000 the code overides the base rate and uses the annual rate
// if the conversion amount is greater than or equal to 10,000 the code sets the frequency factor to 1.0
	if (dblConversionAmount < 10000){
		dblBaseRate = dblAnnualRate;
	}
	else{
		dblFrequencyFactor = 1.0;
	}
// The following line gets the premium surcharge by calling the GetPremiumSurcharge function which is right
// after this function
	var dblPremiumSurcharge = GetPremiumSurcharge(dblConversionAmount);
	var dblRate = (dblBaseRate + dblPremiumSurcharge) * dblFrequencyFactor;
	dblRate = Rounding(dblRate);
	dblFee = Rounding(dblFee);
	dblConversionAmount = Rounding(dblConversionAmount,2);
	var dblRv = (dblConversionAmount / 1000) * parseFloat(dblRate) + parseFloat(dblFee);
	return Rounding(dblRv,2);
}

// This function sets the premium surcharge value for the calculate function. It accepts the conversion amount
// as a parameter called dblAmount
function GetPremiumSurcharge(dblAmount){
	var rv = 0;
	if (dblAmount < 6000){
		rv = 5;
	}
	else{
		if (dblAmount < 7000){
			rv = 4;
		}
		else{
			if (dblAmount < 8000){
				rv = 3;
			}
			else{
				if (dblAmount < 9000){
					rv = 2;
				}
				else{
					if (dblAmount < 10000){
						rv = 1.0;
					}
					else{
						rv = 0.0;
					}
				}
			}
		}
	}
	return rv;
}

-->