<!--
// **********************************************************************
// filename : GroupCnvForm.js
// 4/14/2003 : v01.00 : Chuck O'Rourke : initial creation
// (c) 2003 Aetna
// Pupose: Group Conversion Calculator Form Validation
// ***********************************************************************
// ***********************************************************************
// function DoValidate:
// Purpose: This function validates values in the age and conversionamt fields and calls
// function Main in GroupCnvCalc.js which performs calculation.
// ***********************************************************************
function DoValidate(frm){
    var tn = new Number( );
    var ts = new String();
    var retVal = false;
    tn = frm.age.value;
    ts = frm.age.value;
    if ( tn < 1 || tn > 100 || ts.search( "[^0-9]" ) != -1 ) {
        alert( "Please enter an age between 1 and 100." );
        frm.age.focus();
        frm.age.select();
        retVal = false;
    }
    else{
        ts = ScrubNumber(frm.conversionamt.value);
        // var re = /,/g;
        ns = ts //.replace( re, "");
        tn = new Number(ns);
        ns = ScrubNumber(ns);
        // if ( tn <= 0 || ns.search( "[^0-9\.]" ) != -1 ) {
        if ( tn <= 0 ) {
            alert( "Conversion Amount must be a numeric value greater than zero." );
            frm.conversionamt.focus();
            frm.conversionamt.select();
            retVal = false;
        }
        else{
            Main(frm)
            frm.conversionamt.value = FormatCurrency(tn.toString());
            // frm.thisaction.value = "doCalc";
        }
    }
    return retVal;
}
// ***********************************************************************
// function DoClear:
// Purpose: This function clears form fields
// ***********************************************************************
function DoClear(frm){
    inClear = true;
    frm.age.value = "0";
    frm.conversionamt.value = "0";
    frm.annual.value = "";
    frm.semiannual.value = "";
    frm.quarterly.value = "";
    frm.monthly.value = "";
    frm.age.focus();
    frm.age.select();
    return true;
}
-->