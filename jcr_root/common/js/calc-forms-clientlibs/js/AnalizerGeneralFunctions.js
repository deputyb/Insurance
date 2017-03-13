function frmlifeneeds_DoValidate()
{
var tn = new Number( );
var ty = new Number( );
var ts = new String("");
var totexpense = new Number( );
var totyears = new Number( );
tn = new Number(document.frmlifeneeds.expense1.value);
ts = new String(document.frmlifeneeds.expense1.value);
if ( ts == "" )
{
alert( "Invalid amt entered for 'immediate expenses'.\nPlease enter a numeric dollar amount." );
document.frmlifeneeds.expense1.focus();
document.frmlifeneeds.expense1.select();
return;
}
else
{
ts = document.frmlifeneeds.expense1.value;
var re = /,/g;
ns = ts.replace( re, "");
tn = new Number(ns);
if ( tn > 700000 || ns.search( "[^0-9\.]" ) != -1 )
{
alert( "Value entered for 'immediate expenses' must be a numeric dollar amount from 0 to 700,000." );
document.frmlifeneeds.expense1.focus();
document.frmlifeneeds.expense1.select();
return;
}
else
{
totexpense = totexpense + tn;
document.frmlifeneeds.expense1.value = tn.toString();
}
}
tn = new Number(document.frmlifeneeds.expense2.value);
ty = new Number(document.frmlifeneeds.years2.value);
tys = new String(document.frmlifeneeds.years2.value);
ts = new String(document.frmlifeneeds.expense2.value);
if ( ts == "" )
{
alert( "Invalid amt entered for 'housing expenses'.\nPlease enter a numeric dollar amount." );
document.frmlifeneeds.expense2.focus();
document.frmlifeneeds.expense2.select();
return;
}
else
{
ts = document.frmlifeneeds.expense2.value;
var re = /,/g;
ns = ts.replace( re, "");
tn = new Number(ns);
if ( tn > 700000 || ns.search( "[^0-9\.]" ) != -1 )
{
alert( "Value entered for 'housing expenses' must be a numeric dollar amount from 0 to 700,000." );
document.frmlifeneeds.expense2.focus();
document.frmlifeneeds.expense2.select();
return;
}
else
ns = tys.replace( re, "");
ty = new Number(ns)
if ( ns == "" || ns.search( "[^0-9\.]" ) != -1 )
{
alert( "Value entered for 'number of years' must be a number between 0 and 99." );
document.frmlifeneeds.years2.focus();
document.frmlifeneeds.years2.select();
return;
}
else
{
totyears = tn * ty;
totexpense = totexpense + totyears;
document.frmlifeneeds.expense2.value = tn.toString();
}
}
tn = new Number(document.frmlifeneeds.expense3.value);
ts = new String(document.frmlifeneeds.expense3.value);
if ( ts == "" )
{
alert( "Invalid amt entered for 'child education'.\nPlease enter a numeric dollar amount." );
document.frmlifeneeds.expense3.focus();
document.frmlifeneeds.expense3.select();
return;
}
else
{
ts = document.frmlifeneeds.expense3.value;
var re = /,/g;
ns = ts.replace( re, "");
tn = new Number(ns);
if ( tn > 700000 || ns.search( "[^0-9\.]" ) != -1 )
{
alert( "Value entered for 'child education' must be a numeric dollar amount from 0 to 700,000." );
document.frmlifeneeds.expense3.focus();
document.frmlifeneeds.expense3.select();
return;
}
else
{
totexpense = totexpense + tn;
document.frmlifeneeds.expense3.value = tn.toString();
}
}
tn = new Number(document.frmlifeneeds.expense4.value);
ty = new Number(document.frmlifeneeds.years4.value);
tys = new String(document.frmlifeneeds.years4.value);
ts = new String(document.frmlifeneeds.expense4.value);
if ( ts == "" )
{
alert( "Invalid amt entered for 'installment debt'.\nPlease enter a numeric dollar amount." );
document.frmlifeneeds.expense4.focus();
document.frmlifeneeds.expense4.select();
return;
}
else
{
ts = document.frmlifeneeds.expense4.value;
var re = /,/g;
ns = ts.replace( re, "");
tn = new Number(ns);
if ( tn > 700000 || ns.search( "[^0-9\.]" ) != -1 )
{
alert( "Value entered for 'installment debt' must be a numeric dollar amount from 0 to 700,000." );
document.frmlifeneeds.expense4.focus();
document.frmlifeneeds.expense4.select();
return;
}
else
ns = tys.replace( re, "");
ty = new Number(ns)
if ( ns == "" || ns.search( "[^0-9\.]" ) != -1 )
{
alert( "Value entered for 'number of years' must be a number between 0 and 99." );
document.frmlifeneeds.years4.focus();
document.frmlifeneeds.years4.select();
return;
}
else
{
totyears = tn * ty;
totexpense = totexpense + totyears;
document.frmlifeneeds.expense4.value = tn.toString();
}
}
tn = new Number(document.frmlifeneeds.expense5.value);
ty = new Number(document.frmlifeneeds.years5.value);
tys = new String(document.frmlifeneeds.years5.value);
ts = new String(document.frmlifeneeds.expense5.value);
if ( ts == "" )
{
alert( "Invalid amt entered for 'household expenses'.\nPlease enter a numeric dollar amount." );
document.frmlifeneeds.expense5.focus();
document.frmlifeneeds.expense5.select();
return;
}
else
{
ts = document.frmlifeneeds.expense5.value;
var re = /,/g;
ns = ts.replace( re, "");
tn = new Number(ns);
if ( tn > 700000 || ns.search( "[^0-9\.]" ) != -1 )
{
alert( "Value entered for 'household expenses' must be a numeric dollar amount from 0 to 700,000." );
document.frmlifeneeds.expense5.focus();
document.frmlifeneeds.expense5.select();
return;
}
else
ns = tys.replace( re, "");
ty = new Number(ns)
if ( ns == "" || ns.search( "[^0-9\.]" ) != -1 )
{
alert( "Value entered for 'number of years' must be a number between 0 and 99." );
document.frmlifeneeds.years5.focus();
document.frmlifeneeds.years5.select();
return;
}
else
{
totyears = tn * ty;
totexpense = totexpense + totyears;
document.frmlifeneeds.expense5.value = tn.toString();
}
}
tn = new Number(document.frmlifeneeds.currlifeamt.value);
ts = new String(document.frmlifeneeds.currlifeamt.value);
if ( ts == "" )
{
alert( "Invalid amt entered for 'current life cvg'.\nPlease enter a numeric dollar amount." );
document.frmlifeneeds.currlifeamt.focus();
document.frmlifeneeds.currlifeamt.select();
return;
}
else
{
ts = document.frmlifeneeds.currlifeamt.value;
var re = /,/g;
ns = ts.replace( re, "");
tn = new Number(ns);
if ( tn > 700000 || ns.search( "[^0-9\.]" ) != -1 )
{
alert( "Value entered for 'current life cvg' must be a numeric dollar amount from 0 to 700,000." );
document.frmlifeneeds.currlifeamt.focus();
document.frmlifeneeds.currlifeamt.select();
return;
}
else
{
totexpense = totexpense - tn;
document.frmlifeneeds.newlifeamt.value = totexpense.toString();
document.frmlifeneeds.currlifeamt.value = tn.toString();
}
}
return;
}
function frmlifeneeds_DoClear()
{
document.frmlifeneeds.expense1.value = "";
document.frmlifeneeds.expense2.value = "";
document.frmlifeneeds.years2.value = "";
document.frmlifeneeds.expense3.value = "";
document.frmlifeneeds.expense4.value = "";
document.frmlifeneeds.years4.value = "";
document.frmlifeneeds.expense5.value = "";
document.frmlifeneeds.years5.value = "";
document.frmlifeneeds.currlifeamt.value = "";
document.frmlifeneeds.newlifeamt.value = "";
} 