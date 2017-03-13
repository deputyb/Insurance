var Aetna = Aetna || {};

Aetna.EmergencyMessage = function() {
	var EMERGENCY_MESSAGE_COOKIE = "emergency-message-closed";
	var ANIMATION_TIME = 1200;
	var emergencyMessageEl = $('.emergency-message-wrapper');
	
	/**
	 * Function to bind the exit icon listener.
	 */
	var bindExitIconListener = function() {
		$('.exit-icon a', emergencyMessageEl).click(function(e) {
			e.preventDefault();
			
			saveClosedEmergencyMessage();
			animateEmergencyMessage(false);
		});
	};
	
	/**
	 * Function to animate the display of the emergency message.
	 * 
	 * @param openAnimation boolean indicating if the animation is to open the message
	 */
	var animateEmergencyMessage = function(openAnimation) {
		var isDesktopMegamenuLayout = $(window).width() > 914;
		var headerBarEl = $('.headerBar');
		var oldBrowserMessageEl = $('#badBrowser');
		var emergencyMessageHeight = emergencyMessageEl.outerHeight();
		var headerBarHeight = headerBarEl.outerHeight();
		var megamenuContentEl = $('.togglePanelWrapper');
		var oldBrowserMessageHeight = 0;
		var oldBrowserMessageConfigured = oldBrowserMessageEl.is(':visible');
		
		if (isDesktopMegamenuLayout) {
			var pathSelectorEl = $('.pathSelector');
			var fixedHeaderWrapperEl = $('.fixedHeaderWrap');
			var pathSelectorHeight = pathSelectorEl.outerHeight() - 1;
		} else {
			var contentWrapperEl = $('.content-wrapper');
		}
		
		// Check if the old browser message is displayed
		if (oldBrowserMessageConfigured) {
			oldBrowserMessageHeight = oldBrowserMessageEl.outerHeight();
			emergencyMessageEl.addClass('separator');
		}	
		
		if (openAnimation) {
			if (isDesktopMegamenuLayout) {
				// Order of the animation matters
				fixedHeaderWrapperEl.animate({'min-height': emergencyMessageHeight + headerBarHeight + pathSelectorHeight + oldBrowserMessageHeight}, ANIMATION_TIME);
				emergencyMessageEl.removeClass('hidden').css('top', -emergencyMessageHeight).animate({top : oldBrowserMessageHeight}, ANIMATION_TIME);
				headerBarEl.animate({top : emergencyMessageHeight + oldBrowserMessageHeight}, ANIMATION_TIME);
				pathSelectorEl.animate({top : emergencyMessageHeight + headerBarHeight + oldBrowserMessageHeight}, ANIMATION_TIME);
				
				// Place the megamenu content
				megamenuContentEl.css('top', emergencyMessageHeight + headerBarHeight + pathSelectorHeight + oldBrowserMessageHeight - 1);
			} else {
				// Order of the animation matters
				headerBarEl.css('cssText', 'position: fixed !important');
				emergencyMessageEl.removeClass('hidden');
				emergencyMessageHeight = emergencyMessageEl.outerHeight();
				headerBarEl.animate({top : emergencyMessageHeight}, ANIMATION_TIME);
				emergencyMessageEl.css('top', -emergencyMessageHeight).animate({top : 0}, ANIMATION_TIME);
				contentWrapperEl.animate({top : emergencyMessageHeight + headerBarHeight}, ANIMATION_TIME);
				
				// Place the megamenu content
				megamenuContentEl.css({'top' : emergencyMessageHeight, 'overflow-y' : 'auto'});
			}
		} else {
			if (isDesktopMegamenuLayout) {
				// Order of the animation matters
				pathSelectorEl.animate({top : headerBarHeight + oldBrowserMessageHeight}, ANIMATION_TIME);
				headerBarEl.animate({top : oldBrowserMessageHeight}, ANIMATION_TIME);
				emergencyMessageEl.animate({top : -emergencyMessageHeight}, ANIMATION_TIME);
				fixedHeaderWrapperEl.animate({'min-height':  headerBarHeight + pathSelectorHeight + oldBrowserMessageHeight}, ANIMATION_TIME);
				
				if (oldBrowserMessageConfigured) {
					// Place the megamenu content
					megamenuContentEl.css({'top' : headerBarHeight + pathSelectorHeight + oldBrowserMessageHeight - 1});
				} else {
					// Remove the megamenu content placement
					megamenuContentEl.removeAttr('style');
				}
			} else {
				// Order of the animation matters
				headerBarEl.animate({top : 0}, ANIMATION_TIME, 'swing', function() {
					headerBarEl.removeAttr('style');
				});
				contentWrapperEl.animate({top : headerBarHeight}, ANIMATION_TIME);
				emergencyMessageEl.animate({top : -emergencyMessageHeight}, ANIMATION_TIME);
				
				// Remove the megamenu content placement
				megamenuContentEl.removeAttr('style');
			}
		}
	};
	
	/**
	 * Function to store the cookie that the user closed the emergency message.
	 */
	var saveClosedEmergencyMessage = function() {
		$jq.cookie(EMERGENCY_MESSAGE_COOKIE, 'true');
	};
	
	/**
	 * Function to check if the emergency message should be displayed.
	 * 
	 * @return Result of the verification
	 */
	var displayEmergencyMessageDisplay = function() {
		return !$jq.cookie(EMERGENCY_MESSAGE_COOKIE);
	};
	
	/**
	 * Initialization function.
	 */
	this.init = function() {
		// Check if the emergency message should be displayed
		if (displayEmergencyMessageDisplay()) {
			bindExitIconListener();
			
			setTimeout(function() {
				animateEmergencyMessage(true);
			}, 1000);
		} else {
			emergencyMessageEl.remove();
		}
	};
}

$(function() {
	if (Aetna.isCQPreviewMode) {
		var emergencyMessage = new Aetna.EmergencyMessage();
		emergencyMessage.init();
	}	
});