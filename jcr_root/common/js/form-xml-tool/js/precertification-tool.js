var xmlRetrieved = "";
Aetna.FormXmlTool.PrecertificationTool = {};

$(function() {
	if (Aetna.isCQPreviewMode) {
		Aetna.FormXmlTool.PrecertificationTool.getSource();	
	}
});


Aetna.FormXmlTool.PrecertificationTool.getSource = function() {
	var toolSource = $('.tool-source a');
	toolSource.hide();

	if (toolSource.length > 0) {			
		$.ajax({
			type: "GET",
			url: toolSource.attr('href'),
			dataType: "xml",
			success: function(xml) {
				xmlRetrieved = xml;

				Aetna.FormXmlTool.PrecertificationTool.codes = {};
				$(xml).find('section').each(function(){
					var sectionIndex = $(this).attr('index');
					var codes = $(this).find('codes').text()
					var arrayCodes = codes.split(',');

					var sectionName = "section"+ sectionIndex + "Codes";
                    Aetna.FormXmlTool.PrecertificationTool.codes[sectionName] = arrayCodes;
				});

				var params = Aetna.FormXmlTool.PrecertificationTool.getParams();
				Aetna.FormXmlTool.PrecertificationTool.createInternalNav(params);
				Aetna.FormXmlTool.PrecertificationTool.renderContent(params);
				Aetna.FormXmlTool.PrecertificationTool.bindAnchorEvents();
			}
		});
	}
}

Aetna.FormXmlTool.PrecertificationTool.getParams = function() {
	var indexSearch = window.location.search.indexOf('?');
	var params = [];

	if (indexSearch != -1) {
		var pairs = window.location.search.substring(indexSearch + 1, window.location.search.length).split('&');

		for (var indexPair = 0; indexPair < pairs.length; indexPair++) {
			nameVal = pairs[indexPair].split('=');

			if (nameVal[1] && nameVal[1] != '') {
                if (nameVal[0].indexOf('input-') == 0 || nameVal[0].indexOf('textfield') == 0) {
                    params.push(unescape(nameVal[1]));
                }
			}
		}
	}

	return params;
}

Aetna.FormXmlTool.PrecertificationTool.createInternalNav = function(queryParamsArray) {
	var internalNav = $('#cpt-codes');

	for (var indexParam = 0; indexParam < queryParamsArray.length; indexParam++) {
		internalNav.append('<li><h5><a href="#" data-anchor="' + queryParamsArray[indexParam]  + '">' + 
				queryParamsArray[indexParam] + '</a></h5></li>');
	}
}

Aetna.FormXmlTool.PrecertificationTool.renderContent = function(queryParamsArray) {
	var codesQty = Aetna.FormXmlTool.PrecertificationTool.getCodesQty();
	var codeFound = false;
	var actualQueryParam;

	for (var indexParam = 0; indexParam < queryParamsArray.length; indexParam++) {
		codeFound = false;
		actualQueryParam = queryParamsArray[indexParam].toUpperCase();

		for (var indexCode = 0; indexCode <= codesQty; indexCode++) {
			if (Aetna.FormXmlTool.PrecertificationTool.codeInArray(
					Aetna.FormXmlTool.PrecertificationTool.codes['section' + indexCode + 'Codes'],
					actualQueryParam)) {
				Aetna.FormXmlTool.PrecertificationTool.setContent('precertification-section-' + indexCode, 
						queryParamsArray[indexParam]);
				codeFound = true;
				break;
			}
		}

		bindInterstitial();

		if (!codeFound && queryParamsArray[indexParam] && queryParamsArray[indexParam] != '') {
			Aetna.FormXmlTool.PrecertificationTool.setContent('precertification-section-default', 
					queryParamsArray[indexParam]);
		}
	}
}

Aetna.FormXmlTool.PrecertificationTool.setContent = function(elId, queryParam) {
	var content = $('#forms-wrapper .span12');
	var el = $('#' + elId);

	if (el.length > 0) {
		content.append(el.html().replace(/\[param-placeholder\]/g, queryParam));
	}
}

Aetna.FormXmlTool.PrecertificationTool.codeInArray = function(array, code) {
	if (array) {
		for (var indexCode = 0; indexCode < array.length; indexCode++) {
			if (array[indexCode] == code) {
				return true;
			}
		}
	}

	return false;
}

Aetna.FormXmlTool.PrecertificationTool.getCodesQty = function() {
	var maxCodeKey = 0;
	var tempCodeKey;

	$.each(Aetna.FormXmlTool.PrecertificationTool.codes, function(key, value) {
		tempCodeKey = parseInt(key.replace('section', '').replace('Codes', ''));

		if (tempCodeKey > maxCodeKey) {
			maxCodeKey = tempCodeKey;
		}
	});

	return maxCodeKey;
}

Aetna.FormXmlTool.PrecertificationTool.bindAnchorEvents = function() {
	$('#cpt-codes a').click(function() {
		var target = $('a[name="' + $(this).attr('data-anchor') + '"]');
		var scrollTopPos = target.offset().top - $('.fixedHeaderWrap').outerHeight();

		// Check if browser is firefox to adjust the top position
		if (navigator.userAgent.indexOf('Firefox') > -1) {
			scrollTopPos += 10;
		}

		if ($(window).width() > 914) {
			scrollTopPos -= 15;
		} else {
			scrollTopPos -= 65;
		}
		
		$('html, body').animate({ scrollTop: scrollTopPos }, 100);
	});
}