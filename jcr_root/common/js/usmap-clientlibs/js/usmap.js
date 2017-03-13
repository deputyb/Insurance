/** Interactive map component initialization **/
Aetna.InteractiveMap = {
	init : function() {
		/**
		 * Bind UI Events method
		 */
		var bindUIEvents = function() {
			$('.usmap select').change(function(e){
				var value = $(this).val();
				var selectedState = $("option:selected", this); 
				var selectedStateText = selectedState.text();
				var overwriteTitle = $("option:selected", this).attr("data-overwrite-title");
				
				if (value != null && value != '') {
					var stateSection = null;
					
					if (overwriteTitle == 'true') {
						stateSection = $('.state-overwrite-' + value + '[data-overwrite-title="' + selectedStateText + '"] a');
					} else {
						stateSection = $('.state-' + value + ' a');
					}
					
					Aetna.analytics.omniture.linkCode('aeCustLnk','State Selection',
							stateSection[0],selectedStateText);
					s.tl(this,'o',linkText,null,'navigate');
					
					setTimeout(function() {
						window.location = stateSection.attr('href');
					}, 400);
					
					return false;
				}
				
				$(this).trigger('blur');
			});
			
			$('.usmap .state.on a').unbind('click');
			$('.usmap .state.on a').click(function(e) {
				// Check if the clicked state should open a popup
				if ($(this).attr('href') == '#') {
					e.preventDefault();
					showPopup($(this).attr('data-state'));
				}
			});
			
			$('.usmap .close').unbind('click');
			$('.usmap .close').click(function(e){
				e.preventDefault();
				$(this).parent().hide();
			})
		};
		
		/**
		 * Show popup method.
		 */
		var showPopup = function(value) {
			var stateSection = $('.state-' + value + ' a');
			
			$('.infoBox').hide();
			
			if (value != null && $(window).width() > 1024) {
				var state = stateSection.parent();
				var statePosition = state.position();
				var popup = $('.infoBox.state-popup-' + value);
				popup.css({
					'left' : statePosition.left - ((popup.outerWidth() - state.outerHeight()) / 2),
					'top' : statePosition.top - popup.outerHeight() - 20,
					'display' : 'block'
				});
			}
			
			// Set the mobile content of the popup
			$('.statemap-popup-content').html($('.infoBox.state-popup-' + value).html());
			
			Aetna.analytics.omniture.linkCode('aeCustLnk','Select Your State',this,$('.state-name', popup).text());
			s.tl(this,'o',linkText,null,'navigate');
			return false;
		};
		
		bindUIEvents();
	}
}

$(function() {
	if (Aetna.isCQPreviewMode) {
		Aetna.InteractiveMap.init();
	}
});
