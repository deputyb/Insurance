var Aetna = Aetna || {};
Aetna.FormXmlTool = {
	pdfRegex : new RegExp(/.pdf/i),
	oldHash : ''
};
Aetna.isCQPreviewMode = (typeof(CQ) == 'undefined' || typeof(CQ.WCM) == 'undefined'  || CQ.WCM.getMode() === CQ.WCM.MODE_PREVIEW);

Aetna.FormXmlTool.processLink = function(linkEl, onclickString, onclickPDFString, hideNote) {
	var pdfLinkHtml = '<span class="pdfLink">';
	var pdfLinkEndHtml = '</span>';
	var actualLinkText = linkEl.find('name').text();
	var actualLinkUrl = linkEl.find('url').text();
	var actualLinkTarget = linkEl.find('target').text();
	var actualLinkClass = linkEl.find('class').text(); 	
	var actualLinkTextOnclick = actualLinkText;
	var actualPdfLink = '';
	var actualPdfLinkEnd = '';
	var targetAttr = '';
	var classAttr = '';
	var linkNotes = '';
	var onclick = '';
	var hideNotes = hideNote || false;

    if (actualLinkText.indexOf("'") > -1) {
		actualLinkText = actualLinkText.replace(/'/g, "");
    }
    
    if (actualLinkTextOnclick.indexOf("<span class=\"sup\">&reg;</span>") > -1) {
    	actualLinkTextOnclick = actualLinkTextOnclick.replace("<span class=\"sup\">&reg;</span>", "");
    }

	if (Aetna.FormXmlTool.pdfRegex.test(actualLinkUrl) > 0) {
		actualPdfLink = pdfLinkHtml;
		actualPdfLinkEnd = pdfLinkEndHtml;
		
		if (onclickPDFString && onclickPDFString != '') {
			onclick = ' onclick="' + onclickPDFString.replace('[Link Name]', actualLinkTextOnclick) + '"'; 
		}
	} else if (onclickString && onclickString != '') {
		onclick = ' onclick="' + onclickString + '"'; 
	}
	
	if (Aetna.FormXmlTool.openLinkInNewTab(actualLinkUrl,actualLinkTarget)) {
		targetAttr = ' target="_blank"';
		
		// Check the analytics tag
		if (onclick.indexOf('return false;') > -1) {
			onclick = onclick.replace('return false;', '').replace(',null,\'navigate\'', '');
		}
	}
	
	if (linkEl.find('notes').length > 0 && !hideNotes) {
		linkNotes = linkEl.find('notes').text();
	}
	
	if (linkEl.find('interstitial').length > 0) {
		actualLinkClass += ' external';
	}
	
	if (actualLinkClass != ''){
		classAttr = ' class="'+ actualLinkClass +'"';
	}
	
	return $('<a href="' + actualLinkUrl + '"' + targetAttr + classAttr + onclick + '>' + actualPdfLink + 
			actualLinkText + actualPdfLinkEnd + '</a> ' + linkNotes + '<br/>');
}

Aetna.FormXmlTool.s4 = function() {
	return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
};

Aetna.FormXmlTool.guid = function() {
	return Aetna.FormXmlTool.s4() + Aetna.FormXmlTool.s4() + '-' + 
		Aetna.FormXmlTool.s4() + '-' + Aetna.FormXmlTool.s4() + '-' +
		Aetna.FormXmlTool.s4() + '-' + Aetna.FormXmlTool.s4() + 
		Aetna.FormXmlTool.s4() + Aetna.FormXmlTool.s4();
}

Aetna.FormXmlTool.openLinkInNewTab = function(link, target) {
	if (Aetna.FormXmlTool.pdfRegex.test(link) || link.indexOf('aetna.com') == -1 || target == "blank") {
		return true;
	} else {
		return false;
	}
}

Aetna.FormXmlTool.normalizeId = function(id) {
	return id.toLowerCase().replace(/ /g, '-').replace(/\./g, '').replace(/\+/g, '').replace(/\(/g, '').replace(/\)/g, '');
}

Aetna.FormXmlTool.bindOnHashChange = function() {
	setTimeout(function() {
		if ("onhashchange" in window) {
			$(window).bind('hashchange', checkDeepLinking);
		}
	}, 200);
}

Aetna.FormXmlTool.unBindOnHashChange = function() {
	if ("onhashchange" in window) {
		$(window).unbind('hashchange', checkDeepLinking);
	}
}