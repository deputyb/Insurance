var Aetna = Aetna || {};
Aetna.isCQPreviewMode = (typeof(CQ) == 'undefined' || typeof(CQ.WCM) == 'undefined'  || CQ.WCM.getMode() === CQ.WCM.MODE_PREVIEW);
if (Aetna.isCQPreviewMode) {
	window.location.assign("../index.html");
}