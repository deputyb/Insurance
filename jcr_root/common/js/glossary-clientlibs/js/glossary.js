$(function() {
	if (Aetna.isCQPreviewMode) {		
		bindGlossaryComponent();
	}
});

function bindGlossaryComponent() {	
	if ($('.glossary').length > 0) {		
		$('.glossary-section-selector a').click(function(e) {
			e.preventDefault();
			var dataGlossarySection = $(this).attr('data-glossary-section');
			
			$('.glossary-section').hide();
			$('div[data-glossary-section="' + dataGlossarySection + '"]').fadeIn();
			$('.glossary a').removeClass('selected');
			$('.glossary a[data-glossary-section="' + dataGlossarySection + '"]').addClass('selected');
			
			unBindOnHashChange();
			window.location.hash = dataGlossarySection;
			bindOnHashChange();
			$('html, body').animate({ scrollTop: $('.glossary').offset().top - 100 }, 600);
		});
		
		bindOnHashChange();
		checkDeepLinking();
	}
}

var bindOnHashChange = function() {
	setTimeout(function() {
		if ("onhashchange" in window) {
			$(window).bind('hashchange', checkDeepLinking);
		}
	}, 100);
}

var unBindOnHashChange = function() {
	if ("onhashchange" in window) {
		$(window).unbind('hashchange', checkDeepLinking);
	}
}

var checkDeepLinking = function() {
	var hash = window.location.hash;
	
	if (hash && hash != '#' && hash != '') {
		hash = hash.replace('#', '');
		$('a[data-glossary-section=' + hash + ']').click();
	} else {
		$('.glossary a[data-glossary-section="A"]').addClass('selected');
	}
}