/**
 * Aetna Non SSL Redirection namespace and object
 */
Aetna.NonSslRedirection = {
	init: function() {
		var actualHref;
		var actualAction;
		var pageFullDomain = 'http://' + location.host;
		
		// Go through all the links of the page and set them to use http instead of the default protocol
		$('a').each(function(index, link) {
			actualHref = $(link).attr('href');
			
			// The link is internal
			if (actualHref && actualHref.indexOf('/') == 0) {
				$(link).attr('href', pageFullDomain + actualHref);
			}
		});
		
		// Go through all the search forms of the page and set them to use http instead of the default protocol
		$('form.searchformmobile, form.searchformdesktop').each(function(index, form) {
			actualAction = $(form).attr('action');
			
			// The form is internal
			if (actualAction && actualAction.indexOf('/') == 0) {
				$(form).attr('action', pageFullDomain + actualAction);
			}
		});
	}
}

$(function() {
	if (Aetna.isCQPreviewMode) {
        Aetna.NonSslRedirection.init();
	}
});