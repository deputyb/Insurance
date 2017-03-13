var Aetna = Aetna || {};

Aetna.DropdownTool = function() {
	var select = $('.dropdown-tool-wrapper select');
	var useDeeplinking = select.attr('data-use-deeplinking') == 'true';
	var analyticsCode = select.attr('data-onchange');
	
	var bindSelectEvent = function() {
		select.change(function() {
			var thisEl = $(this);
			var selectedValue = thisEl.val();
			
			$('.dropdown-tool-wrapper .dropdown-tool-item').addClass('hidden');
			
			if (selectedValue != '') {
				$('.dropdown-tool-wrapper .dropdown-tool-item[data-option-name="' + selectedValue + '"]').removeClass('hidden');
				
				if (useDeeplinking) {
					unBindOnHashChange();
					window.location.hash = selectedValue;
					bindOnHashChange();
				}
				
				if (analyticsCode) {
					eval(analyticsCode.replace('[selected-option]', $('option[value="' + selectedValue + '"]', thisEl).text()));
				}
			}
		});
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
			select.val(hash);
			select.trigger('change');
		}
	}
	
	this.init = function() {
		bindSelectEvent();
		
		if (useDeeplinking) {
			bindOnHashChange();
			checkDeepLinking();
		}
	}
};

$(function() {
	if (Aetna.isCQPreviewMode) {
		var dropdownTool = new Aetna.DropdownTool();
		dropdownTool.init();
	}
});