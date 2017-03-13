var Aetna = Aetna || {};

/**
 * SmartHomePage class.
 */
Aetna.SmartHomePage = function() {
	var isBrowserIE8IE9 = navigator.userAgent.indexOf("MSIE 8.0") > -1 ||
		navigator.userAgent.indexOf("MSIE 9.0") > -1;
	var isBrowserIE8 = navigator.userAgent.indexOf("MSIE 8.0") > -1;
	
	/**
	 * Initialization of the Shop Module Container.
	 */
	var initShopModuleContainer = function() {
		var headerBarHeight = $('header').height();
		
		$(document).on('click', '.shopModuleContainer .more-link a', function(e) {
			e.preventDefault();			
			var nextComponentPosition = $(this).closest('.teaser').next().offset();
			$('html, body').animate({ scrollTop: nextComponentPosition.top - headerBarHeight }, 500);
		});
		
		$(document).on('click', '.shopModuleContainer .exit-icon a', function(e) {
			e.preventDefault();
			var thisEl = $(this);
			var thisElParent = thisEl.parent();
			
			thisElParent.siblings('.more-link').css('position' , 'relative');
			thisEl.closest('.shop-module-wrapper').animate({padding: 0}, 600);
			thisElParent.fadeOut();
		});
	};
	
	/**
	 * Initialization of the Shop Module
	 */
	var initShopModule = function() {
		var TOOLTIP_ACTIONS = {
			SHOW : 0,
			HIDE : 1,
			SHOW_AND_HIDE : 2
		};
		
		var showProperShopPanel = function(select, value) {
			var shopModule = select.closest('.shopModule');
			
			shopModule.find('.shop-module-content > div').hide();

			$('.shop-module-content-' + value, shopModule).fadeIn();
			
			// Check if the module is inside the interstitial
			if (shopModule.closest('.interstitial').length > 0) {
				centerInter();
			}
		};
		
		var showTooltip = function(tooltipIconEl, tooltipAction) {
			var tooltipContent = tooltipIconEl.parent().siblings('.tooltip-content');
			
			/** Function to be used as the callback for the user clicks on any part of the page
			 *  to close the tooltip.
			 */  
			var externalClickCallback = function() {					
				// Dequeue is used to remove the last event from the effect queue 
				// Make the exit-icon visible because it's automatically hidden by dequeue method
				tooltipContent.dequeue().clearQueue().stop();
				tooltipContent.fadeOut();
				tooltipContent.siblings('.tooltip-icon-wrapper').find('.tooltip-icon').animate({ 'opacity' : 1 });
				
				$(this).off('click', externalClickCallback);
			};
			
			tooltipIconEl.animate({ 'opacity' : 0.6 });
			tooltipContent.find('.exit-icon').show();
			
			// Check for the given action to perform
			if (tooltipAction == TOOLTIP_ACTIONS.SHOW || tooltipAction == TOOLTIP_ACTIONS.SHOW_AND_HIDE) {
				tooltipContent
					.css('opacity', 0)
					.show()
					.animate({'opacity': 1}, 400);
			}
			
			if (tooltipAction == TOOLTIP_ACTIONS.HIDE || tooltipAction == TOOLTIP_ACTIONS.SHOW_AND_HIDE) {
				tooltipContent
					.animate({'opacity': 1}, 4000)
					.animate({'opacity': 0}, 400, function() {
						$(this).hide();
					
						tooltipIconEl.animate({ 'opacity' : 1 });
					});
			}
			
			// If the user clicks on the tooltip, it desappears
			tooltipIconEl.closest('.interout,.right-content-panel').click(externalClickCallback);
		};		
		
		$(document).on('change', '.shopModule .js-insurance-type-select', function() {
			var selectEl = $(this);
			var value = selectEl.val();
			
			if (isBrowserIE8IE9) {
				selectEl.blur();
			}
			
			showProperShopPanel(selectEl, value);
		});
		
		// Set the mouseover event only if the browser is not mobile
		if (!isMobileBrowser() && !/iPad/i.test(navigator.userAgent)) {
			$(document).on('mouseover', '.shopModule .tooltip-icon, .progressive-page-wrapper .tooltip-icon', function() {
				showTooltip($(this), TOOLTIP_ACTIONS.SHOW);
			});
			$(document).on('mouseout', '.shopModule .tooltip-icon, .progressive-page-wrapper .tooltip-icon', function() {
				showTooltip($(this), TOOLTIP_ACTIONS.HIDE);
			});
		} else {
			$(document).on('click', '.shopModule .tooltip-icon, .progressive-page-wrapper .tooltip-icon', function() {
				showTooltip($(this), TOOLTIP_ACTIONS.SHOW_AND_HIDE);
			});
		}
		
		$(document).on('click', '.shopModule .tooltip-icon, .zip-code-wrapper .tooltip-content .exit-icon, .progressive-page-wrapper .tooltip-icon .exit-icon', function(e) {
			e.preventDefault();
		});
		
		$(document).on('click', '.shop-module-content-default a', function(e) {
			e.preventDefault();
		});
	};
	
	/**
	 * Initialization of the ZIP code input
	 */
	var initZipCodeInput = function() {
		var isInputValidLength = false;
		var actualZipCode;
		var zipCodeServiceResponse;
		
		var getSelectionText = function() {
		    var text = '';
		    
		    if (window.getSelection) {
		        text = window.getSelection().toString();
		    } else if (document.selection && document.selection.type != "Control") {
		        text = document.selection.createRange().text;
		    }
		    
		    if (text == '' && document.activeElement && document.activeElement.value && !isBrowserIE8) {
		    	var activeElement = document.activeElement;
		    	var valueForActiveElement = document.activeElement.value;
		    	text = valueForActiveElement.substring(activeElement.selectionStart, activeElement.selectionEnd)
		    }
		    
		    return text;
		};
		
		$(document).on('keypress', '.zip-code', function(e) {
			var thisVal = $(this).val();
			var inputLength = thisVal.length;
			var selectionText = getSelectionText();
			var keyCode = e.keyCode;
			
			// Check if the key code is valid
			if (keyCode == 0) {
				keyCode = e.charCode;
			}
			
			// Allow: backspace, delete
			if ($.inArray(keyCode, [46, 8]) !== -1 || (selectionText != '' && selectionText.length > 1)) {
				isInputValidLength = false;
				return;
			}
			
			// Allow: tab, Ctrl, Command, home, end, left, right, down, up
			if (keyCode == 9 || e.metaKey || e.ctrlKey || (keyCode >= 35 && keyCode <= 40)) {
				return;
			}
			
			// Allow: Enter when the zip input has 5 digits
			if (keyCode == 13 && inputLength == 5) {
				e.preventDefault();
				
				var windowWidth = $(window).width();
				var zipCodeMarket = $(this).closest('.zip-code-wrapper');
				var marketSegment = zipCodeMarket.find('.market-segment:visible');
				
				// Check if the form is inside the shop module
				if (marketSegment.length > 0) {
					var shopButton;
					
					if (windowWidth > 767) {
						shopButton = marketSegment.find('.hidden-phone a');
					} else {
						shopButton = marketSegment.find('.visible-phone a'); 
					}
					
					shopButton[0].click();
				} else if (zipCodeMarket.closest('.progressive-page-login-wrapper').length > 0) {
					zipCodeMarket.find('a')[0].click();
				}
				
				return;
			}
			
			// Allow: programmatic keypress event
			if (keyCode == null) {
				isInputValidLength = true;
				Aetna.Settings.fireAnalytics = false;

				return;
			} else {
				Aetna.Settings.fireAnalytics = true;
			}
			
			// Allow: backspace, delete, tab
	        if (
	        	// Allow numbers  and a max size of 6
	            (keyCode >= 48 && keyCode <= 57) && !e.shiftKey && (inputLength < 5 || selectionText != '')) {
	        	
	        	if (inputLength === 4 || (inputLength === 5 && selectionText != '' && selectionText.length === 1)) {
	        		isInputValidLength = true;
	        	} else {
	        		isInputValidLength = false;
	        	}
	        } else {
	            e.preventDefault();
	            
	            // Mark the field as invalid only when it has less than 5 characters
	            if (inputLength < 5) {
	            	isInputValidLength = false;
	            }
	        }
		});
		
		$(document).on('paste', '.zip-code', function(e) {
			var pattern = /^\d{1,5}$/g;
			var pastedText;
			var fieldValue = $(this).val();
			var selectedText = getSelectionText();

			// Get the clipboard data
			if (e.originalEvent.clipboardData) {
				pastedText = (e.originalEvent || e).clipboardData.getData('text/plain');
			} else if (window.clipboardData) {
				pastedText = window.clipboardData.getData('Text');
			}
			
			// Check if the selected text is the same zip code
			if (fieldValue.indexOf(selectedText) > -1) {
				fieldValue = fieldValue.replace(selectedText, pastedText);
			} else {
				fieldValue += pastedText; 
			}
			
			if (!pattern.test(fieldValue)) {
				e.preventDefault();
			} else {
				isInputValidLength = true;
			}
		});
		
		// Check the user agent to see if the browser is Samsung with default browser
		if (navigator.userAgent.toLowerCase().indexOf('samsung') > -1
			|| navigator.userAgent.toLowerCase().indexOf('sm-') > -1) {
			// Hack to make the zip input work on Samsung default browsers
			$(document).on('keyup', '.zip-code', function(e) {
				var thisEl = $(this);
				var thisValue = thisEl.val();
				var inputLength = thisValue.length;
				var keyCode = 0;
				
				if (thisValue.length > 0) {
					keyCode = thisValue[(inputLength - 1)].charCodeAt()
				}

				// Allow: backspace, delete, tab
		        if (
		        	// Allow numbers  and a max size of 6
		            (keyCode >= 48 && keyCode <= 57) && !e.shiftKey && inputLength <= 5) {
		        	if (inputLength === 5) {
		        		isInputValidLength = true;
		        	} else {
		        		isInputValidLength = false;
		        	}
		        } else {
		            e.preventDefault();
		            thisEl.val(thisValue.substring(0, inputLength - 1));
		            
		            // Mark the field as invalid only when it has less than 5 characters
		            if (inputLength <= 5) {
		            	isInputValidLength = false;
		            } else {
		            	e.stopPropagation();
		            }
		        }
			});
		}
		
		$(document).on('keyup', '.zip-code', function(e) {
			var thisEl = $(this);
			var thisVal = thisEl.val();
			var isShopModuleContent = thisEl.closest('.shop-module-content').length > 0;
			var isProgressiveLoginModule = thisEl.closest('.progressive-page-login-wrapper').length > 0;
			var isProgressiveBandModule = thisEl.closest('.progressive-page-band-wrapper').length > 0;
			var keyCode = e.keyCode;
			var zipCodeForm = thisEl.closest('.zip-code-form');
			var county = Aetna.Settings.ProgressivePages.get().county;
			var cachedZipCode = Aetna.Settings.ProgressivePages.get().zipCode;
			
			var disableSubmitButton = function() {
				if (isShopModuleContent) {
					$('.market-segment').hide();
					$('.zip-code-form').siblings('.shop-button')
						.fadeIn();
				} else if (isProgressiveLoginModule) {
					var loginForm = thisEl.closest('form');
						
					// Show the default button
					loginForm.find('.login-button-wrapper .default-login-button-wrapper').fadeIn();
					
					// Hide the campaign
					loginForm.find('.login-button-wrapper .login-campaign').hide();
				} else if (isProgressiveBandModule) {
					thisEl.parent().parent()
						.siblings('.submit-button-wrapper')
						.find('.blueBtn.whiteBtn')
						.addClass('disabled')
						.attr('href', '#');
				}
			}

			// Must not always hide the county div
			if (cachedZipCode !== thisVal) {
				$('.county-dropdown-wrapper', zipCodeForm).hide();
				zipCodeForm.removeClass('county-selection');
			}
			
			// Check if the key code is valid
			if (keyCode == 0) {
				keyCode = e.charCode;
			}

			// Allow: home, end, left, right, down, up, Return (Enter)
			if ((keyCode >= 35 && keyCode <= 40) || (keyCode == 13 && thisVal.length == 5)
					|| $.inArray(keyCode, [9, 16, 93, 17, 18, 91]) !== -1) {
				return;
			}
			
			// Allow: backspace, delete
			if ($.inArray(keyCode, [46, 8]) !== -1 || getSelectionText() != '') {
				actualZipCode = thisVal;
			}

			// Check if the input is valid
			if (thisVal.length === 5 && isInputValidLength) {	
				// Function to manage the county response and place them in the proper dropdown
				var manageCountyResponse = function(data) {
					var countySelect = $('.js-county-select', zipCodeForm);
					var countyArray;
					
					$('.county-dropdown-wrapper', zipCodeForm).fadeIn().css('display', 'inline-block');
				
					$('.js-county-select option', zipCodeForm).each(function(index, element) {
						var thisEl = $(element);
						
						if (index != 0 && !thisEl.attr('disabled')) {
							thisEl.remove();
						}
					});
					
					for (var indexMarket = 0; indexMarket < data.length; indexMarket++) {
						countyArray = data[indexMarket].counties;
						
						for (var indexCounty = 0; indexCounty < countyArray.length; indexCounty++) {
							countySelect.append($('<option>',{
								value: countyArray[indexCounty],
								text: countyArray[indexCounty]
							}));
						}
					}
					
					zipCodeForm.addClass('county-selection');

					countySelect.off('change').on('change', function(e1) {
						var thisEl = $(this);
						
						// Find the market by the given county
						var findMarketByCounty = function(county) {
							for (var indexMarket = 0; indexMarket < zipCodeServiceResponse.length; indexMarket++) {
								for (var indexCounty = 0; indexCounty < zipCodeServiceResponse[indexMarket].counties.length; indexCounty++) {
									if (zipCodeServiceResponse[indexMarket].counties[indexCounty] == county) {
										return new Array(zipCodeServiceResponse[indexMarket]);
									}
								}
							}
							
							return null;								
						};
						
						county = thisEl.val();

						if (county != 'default') {
							// Check if the event was trigger programmatically to trigger or not the analytics
							if (e1.srcElement) {
								Aetna.Settings.fireAnalytics = true;
							}
							
							// Replicate the selected county for the others county dropdowns
							if (e1.srcElement && thisEl.closest('.progressive-page-band-wrapper').length == 0) {
								$('.js-county-select').each(function(index, element) {
									if (element != thisEl[0]) {
										$(element).val(county).change();
									}
								});
							}
							
							Aetna.Settings.ProgressivePages.clientContextFlag = true;
							
							serviceCallback(findMarketByCounty(county));
							Aetna.Settings.ProgressivePages.setCountyResponse(thisVal, county);
							Aetna.SmartHomePage.manageDynamicContentPlaceholders();
						} else {
							disableSubmitButton();
						}
					});
				};
				
				// Service callback function 
				var serviceCallback = function(data) {
					var marketData;
					var validMarket = false;
					
					// Check if the response has or not counties
					if (data.length > 1) {
						manageCountyResponse(data);
						validMarket = true;
					} else {
						marketData = data[0];
						validMarket = marketData.market.toLowerCase() != 'invalid';
						
						if (Aetna.Settings.ProgressivePages.clientContextFlag) {
							// check if market response is valid, if not, audience should not be set
							if (validMarket) {
								// Check if the component is the band to avoid the set of the audience
								if (!isProgressiveBandModule) {
									ClientContext.set('/profile/audience', marketData.market);
									
									// Check if the analytics should be fired
									if (Aetna.Settings.fireAnalytics || Aetna.Settings.fireAnalyticsFirstTime) {
										Aetna.SmartHomePage.fireAnalyticsSegmentEvent(marketData.market);
										
										Aetna.Settings.fireAnalyticsFirstTime = false;
									}
									
									Aetna.Settings.ProgressivePages.clientContextFlag = false;
									Aetna.Settings.ProgressivePages.zipCodeInvalidFlag = false;
								}
							} else {
								Aetna.Settings.ProgressivePages.zipCodeInvalidFlag = true;
							}
						}
					}
					
					if (validMarket) {
						if (county && zipCodeForm.hasClass('county-selection')) {
							Aetna.Settings.ProgressivePages.setCountyResponse(thisVal, county);
						} else {
							Aetna.Settings.ProgressivePages.setZipCodeResponse(thisVal);
						}
					} else {
						Aetna.Settings.ProgressivePages.zipCodeInvalidFlag = true;
					}
					
					if (isShopModuleContent) {
						var teaserWrapperEl = zipCodeForm.siblings('.market-segments-wrapper');
						
						$('.market-segment').hide();

						// Check if the market data was returned
						if (marketData != null) {
							var selectedSegment = $('.market-segment-' + marketData.market);
							
							if (!county) {
								$('.county-dropdown-wrapper', zipCodeForm).hide();
								zipCodeForm.removeClass('county-selection');
							}
							
							selectedSegment.fadeIn();
							$('.zip-code-form').siblings('.shop-button').hide();
							
							// Check if the module is inside the interstitial
							if (thisEl.closest('.interstitial').length > 0) {
								centerInter();
							}
						}
					} else if (isProgressiveLoginModule) {
						var loginUrl;

						if (marketData == null) {
							zipCodeForm.addClass('county-selection');
                        } else if (validMarket && marketData) {
                        	var loginForm = thisEl.closest('form');
                        	
                        	Aetna.Settings.Market.set(marketData.market);
                        	
                        	// Show and hide the components according to the actual zip value
                        	loginForm.find('.login-campaign').fadeIn();
                        	loginForm.find('.login-button-wrapper .default-login-button-wrapper').hide();
                        	
							// Check if the login module should open a Deep Link
							if (Aetna.Settings.DeepLink) {
								Aetna.SmartHomePage.showDeepLink();
							}
                        }
					} else if (isProgressiveBandModule) {
						var progressivePageBandWrapper = zipCodeForm.closest('.progressive-page-band-wrapper');
						
						Aetna.Settings.skipPrepopulation = true;
						
						if (marketData == null) {
							zipCodeForm.addClass('county-selection');
                        } else if (marketData.market.toLowerCase() != 'invalid') {
                        	progressivePageBandWrapper
        						.find('.blueBtn.whiteBtn')
        						.removeClass('disabled');
                        	Aetna.SmartHomePage.selectedMarket = marketData.market;
                        }
					}
				};
				
				var cachedResponse = Aetna.Settings.ZipCode.getServiceCache(thisVal);
				
				// Check if the response is cached
				if (!cachedResponse) {
					$.ajax(thisEl.closest('form').attr('action') + thisVal + '.format.json', {
						success: function(data) {
							zipCodeServiceResponse = data;
							Aetna.Settings.ZipCode.setServiceCache(thisVal, data);
							
							// Execute the callback
							serviceCallback(data);
						}
					});
				} else {
					zipCodeServiceResponse = cachedResponse;
					
					// Execute the callback
					serviceCallback(cachedResponse);
				}
				
				actualZipCode = thisVal;
			} else {
				disableSubmitButton();
			}
		});
		
		$(document).on('click', '.shop-button a', function(e) {
			e.preventDefault();
			
			var thisEl = $(this);
			var shopButton = thisEl.closest('.shop-button');
			var shopButtonError = shopButton.find('.shop-button-error');
			var zipCodeForm = shopButton.siblings('.zip-code-form');
			
			$('.error', shopButtonError).hide();
			
			// Check which error to display
			if (zipCodeForm.find('.zip-code').val().length < 5 || 
					(zipCodeForm.hasClass('county-selection') && zipCodeForm.find('select').val() == 'default')) {
				// Show the default message
				$('.default-error', shopButtonError).show();
			} else {
				// Show the zip invalid message
				$('.zip-error', shopButtonError).show();
			}
			
			shopButtonError.fadeIn().delay(4000).fadeOut();
		});
	};
	
	/**
	 * Initialization of the class
	 */
	this.init = function() {
		initShopModuleContainer();
		initShopModule();
		initZipCodeInput();
	}
};

/**
 * Function to hide and show the proper deeplink content in the Secure Links interstitial
 */
Aetna.SmartHomePage.showDeepLink = function() {
	var interstitialZipCodeForm = $('.interstitial .progressive-page-login-wrapper .zip-code-form');
	$('.deep-link-section', interstitialZipCodeForm).hide();
	$('.deep-link-section[data-name="' + Aetna.Settings.DeepLink + '"]', interstitialZipCodeForm).show();
}

/**
 * Function to get the URL paramters and initialize the ZIP code in case that exists.
 */
Aetna.SmartHomePage.getZipCodeParameters = function() {
	var urlParams = getUrlParams();
	
	// Check if the zip code parameter comes in the URL
	if (urlParams.zipCode) {
		// Check if the county parameter comes in the URL
		if (urlParams.county) {
			Aetna.Settings.ProgressivePages.setCountyResponse(urlParams.zipCode, urlParams.county.capitalize());
		} else {
			Aetna.Settings.ProgressivePages.setZipCodeResponse(urlParams.zipCode);
		}
		
		$('.external.Shop-Interstitial').click();
	}
}

/**
 * Initialize the geolocation zip code load if exists.
 */
Aetna.SmartHomePage.initGeolocationZipLoad = function() {	
	if (!Aetna.SmartHomePage.Geolocation.flagIsServiceExecuted) {
		var storedZipCode = Aetna.SmartHomePage.Geolocation.getGeolocationZip();
		
		// Check if the zip code is stored to prepopulate the Shop overlay
		if (storedZipCode) {
			Aetna.SmartHomePage.populateShopZipCode(storedZipCode);
		}
	}
};

/**
 * Class to handle the operations related to the geolocation zip code.
 */
Aetna.SmartHomePage.Geolocation = {
	COOKIE_GEOLOCATION_ZIP : 'geolocation-zip-code',
	COOKIE_CONFIG : { path: '/'},
	flagIsServiceExecuted : false,
	getGeolocationZip : function() {
		return $jq.cookie(this.COOKIE_GEOLOCATION_ZIP);
	},
	setGeolocationZip : function(zipCode) {
		$jq.cookie(this.COOKIE_GEOLOCATION_ZIP, zipCode, this.COOKIE_CONFIG);
	},
	removeGeolocationZip : function() {
		$jq.removeCookie(this.COOKIE_GEOLOCATION_ZIP, this.COOKIE_CONFIG);
	}
};

/**
 * Function to populate the Shop ZIP Code.
 * 
 * @param zipCode ZIP code to set
 */
Aetna.SmartHomePage.populateShopZipCode = function(zipCode) {
	var zipCodeForm = $('.shop-module-content .zip-code-form');
	var zipCodeEl = $('.zip-code', zipCodeForm);
	
	// Check if the zip code field is present
	if (zipCodeEl.length > 0 && !Aetna.SmartHomePage.Geolocation.flagIsServiceExecuted) {
		$.ajax(zipCodeEl.closest('form').attr('action') + zipCode + '.format.json', {
			success: function(data) {
				Aetna.Settings.ZipCode.setServiceCache(zipCode, data);
				
				if (data[0].market) {
					var shopModuleWrapper = zipCodeEl.closest('.shop-module-wrapper');
					var selectedSegment = $('.market-segment-' + data[0].market, shopModuleWrapper);
					var optionContent = zipCodeEl.closest('.parsys');
					var selectedOptionValue = optionContent.attr('class')
						.replace('parsys', '')
						.replace(' ', '')
						.replace('option-', '')
						.replace('-content', '');
					
					// Select the proper option that opens the zip code input
					$('.js-insurance-type-select', shopModuleWrapper).val(selectedOptionValue)
						.change();
					
					zipCodeEl.val(zipCode);

					if (data.length > 1) {
						$('.js-county-select', zipCodeForm)
							.parents('.county-form-item')
							.fadeIn()
							.css('display', 'inline-block');
						$('.county-dropdown-wrapper', zipCodeForm)
							.fadeIn()
							.css('display', 'inline-block');
						zipCodeForm.addClass('county-selection');
					} else {
						$('.market-segment', shopModuleWrapper).hide();
						selectedSegment.fadeIn();
						zipCodeForm.siblings('.shop-button').hide();
						
						ClientContext.set('/geolocation/address/countryCode', 'US');
						ClientContext.set('/profile/audience', data[0].market);
					}
					
					// Check if the module is inside the interstitial
					if (zipCodeEl.closest('.interstitial').length > 0) {
						centerInter();
					}
					
					// Save the zip code in a cookie for future visits
					Aetna.SmartHomePage.Geolocation.setGeolocationZip(zipCode);
					Aetna.SmartHomePage.Geolocation.flagIsServiceExecuted = true;
				}
			}
		});
	}
}

/**
 * Function to initialize the zip code prepopulation from the stored zip code.
 * 
 * @param setClientContext Boolean indicating if the ClientContext should 
 * 			be set with the result of the ZIP Code Service
 */
Aetna.SmartHomePage.initZipCodePrepopulation = function(setClientContext) {
	var progressivePagesResponses = Aetna.Settings.ProgressivePages.get();
	
	// Check if the prepopulation should be skipped
	if (!Aetna.Settings.skipPrepopulation) {
		// Check if the zip code is valid
		if (progressivePagesResponses.zipCode && !Aetna.Settings.ProgressivePages.zipCodeInvalidFlag) {
			// Check if the client context should be set
			if (setClientContext) {
				var zipCodeForm = $('.progressive-page-login-wrapper form');
				
				// Check if the login form is present
				if (zipCodeForm.length > 0) {
					$.ajax(zipCodeForm.first().attr('action') + progressivePagesResponses.zipCode + '.format.json', {
						success: function(data) {
							Aetna.Settings.ZipCode.setServiceCache(progressivePagesResponses.zipCode, data);
							
							if (data[0].market) {
								// Set the ClientContext
								ClientContext.set('/profile/audience', data[0].market);
							}
						}
					});
				}
			} else {
				Aetna.Settings.ProgressivePages.clientContextFlag = true;
			}
			
			// Open the proper value of the panels
			$('.zip-code').each(function() {
				var thisEl = $(this);
				var progressivePageWrapper = thisEl.closest('.progressive-page-wrapper');
				var shopModuleWrapper = thisEl.closest('.shop-module-wrapper');
				
				if (thisEl.val() != progressivePagesResponses.zipCode) {
					// Set the zip code value
					thisEl.val(progressivePagesResponses.zipCode);
					
					// Check the module that wraps the zip code input
					if (progressivePageWrapper.length > 0) {
						$('.answer-label.no', progressivePageWrapper).click();
						thisEl.keypress().keyup();
						
						// Check if the component is the progressive page band
						if (progressivePageWrapper.hasClass('progressive-page-band-wrapper') && 
							progressivePageWrapper.find('.zip-code-form.county-selection').length == 0) {
							$('.zip-code-form a.blueBtn.whiteBtn', progressivePageWrapper).removeClass('disabled').click(); 
						}
					} else if (shopModuleWrapper.length > 0) {
						var optionContent = thisEl.closest('.parsys');
						var selectedOptionValue = optionContent.attr('class')
							.replace('parsys', '')
							.replace(' ', '')
							.replace('option-', '')
							.replace('-content', '');
						
						// Select the proper option that opens the zip code input
						$('.js-insurance-type-select', shopModuleWrapper).val(selectedOptionValue)
							.change();
						
						thisEl.keypress().keyup();
	
						if (progressivePagesResponses.county) {
							$('.js-county-select').val(progressivePagesResponses.county)
								.change()
								.parents('.county-form-item')
								.fadeIn()
								.css('display', 'inline-block');;
						}
					}
				}
			});
			
			// Remove the zip code geolocation cookie
			Aetna.SmartHomePage.Geolocation.removeGeolocationZip();
			Aetna.SmartHomePage.Geolocation.flagIsServiceExecuted = true;
		} else if (progressivePagesResponses.yes || progressivePagesResponses.no) {
			var answer = 'no'; 
			
			if (progressivePagesResponses.yes) {
				answer = 'yes';
			} 
			
			$('.progressive-page-wrapper').each(function() {
				var thisEl = $(this);
				
				if (thisEl.hasClass('progressive-page-login-wrapper') || thisEl.find('.answers-wrapper').length > 0) {
					$('.answer-label.' + answer, thisEl).click();
				}
			});
		} else {
			// If there are no selections for the components, set the 'Yes' answer for the
			// login module
			$('.progressive-page-login-wrapper .answer-label.yes').click();
		}
		
		// Check if there's no ZIP code stored, which means that the default segment will be loaded
		if (!progressivePagesResponses.zipCode && (Aetna.Settings.fireAnalytics || Aetna.Settings.fireAnalyticsFirstTime)) {
			Aetna.SmartHomePage.fireAnalyticsSegmentEvent('Default');
			
			Aetna.Settings.fireAnalyticsFirstTime = false;
		}
	} else {
		Aetna.Settings.skipPrepopulation = false;
		Aetna.Settings.ProgressivePages.clientContextFlag = true;
	}
};

/**
 * Function to clear the ZIP code fields before the user leaves the page to allow the
 * right functioning of the Back button and the SHP.
 */
Aetna.SmartHomePage.clearZipCodeFields = function() {
	$(window).on('unload', function() {
		$('.zip-code').val('');
	});
}

/**
 * Function to set the proper content for the placeholders of the campaigns.
 */
Aetna.SmartHomePage.manageDynamicContentPlaceholders = function() {
	var language = ClientContext.get('/profile/language') === 'es' ? 'SPANISH' : 'ENGLISH';
	var progressivePageResponses = Aetna.Settings.ProgressivePages.get(); 
	var zipCode = progressivePageResponses.zipCode;
	var county = progressivePageResponses.county;
	
	$('.campaign a').each(function() {
		Aetna.SmartHomePage.setLinkDynamicParameters($(this), language, zipCode, county);
	});
}

/**
 * Function to set the proper link dynamic parameters to the given link
 * 
 * @link Link jQuery element
 * @language Actual language to set (optional)
 * @zipCode Actual ZIP code (optional)
 * @county Actual County (optional)
 */
Aetna.SmartHomePage.setLinkDynamicParameters = function(link, language, zipCode, county) {
	if (link && link.length > 0) {
		var dataHref = link.attr('data-href');
		var href;
		
		// Check if the language parameter is present
		if (!language) {
			language = ClientContext.get('/profile/language') === 'es' ? 'SPANISH' : 'ENGLISH';
		}
		
		// Check if the zip code parameter is present
		if (!zipCode) {
			zipCode = Aetna.Settings.ProgressivePages.get().zipCode;
		}
		
		// Check if the county code parameter is present
		if (!county) {
			county = Aetna.Settings.ProgressivePages.get().county;
			
			// Check if the county is not null
			if (!county) {
				county = '';
			}
		}
		
		// Check if the href has already been processed and stored in data-href
		if (!dataHref) {
			href = link.attr('href');
			link.attr('data-href', href);
		} else {
			href = dataHref;
		}
		
		if (href) {
			// Change the language and zip code
			href = href
					.replace(/\[Language\]/g, language)
					.replace(/\[Zip\]/g, zipCode)
					.replace(/\[County\]/g, county);
				
			// Set the href attribute
			link.attr('href', href);
		}
	}
}

/**
 * Function to set the proper height for the columns inside the Campaigns.
 */
Aetna.SmartHomePage.setColumnsTitleHeights = function() {
	if ($(window).width() > 767) {
		$('.teaser .columnLayout').each(function() {
			var titles = $('h4', $(this));
			var maxHeight = 0;
			
			// Reset the titles height
			titles.height('auto');
			
			titles.each(function() {
				var titleHeight = $(this).height();
				
				if (titleHeight > maxHeight) {
					maxHeight = titleHeight;
				}
			});
			
			if(maxHeight == 0) {
				// set a default in case no maxHeight is set
				maxHeight = 90;
			}
			
			titles.height(maxHeight);
		});
	}
}

/**
 * Function to hide the County dropdown
 * 
 * @param progressivePageWrapper Progressive Page Wrapper DOM object
 */
Aetna.SmartHomePage.hideCountyDropdown = function(progressivePageWrapper) {
	var zipCodeForm = progressivePageWrapper.find('.zip-code-form');
	
	$('.county-dropdown-wrapper', zipCodeForm).hide();
	zipCodeForm.removeClass('county-selection');
}

/**
 * Function to fire the analytics call to SiteCatalyst
 * 
 * @param segment Name of the segment to fire the analytics for
 */
Aetna.SmartHomePage.fireAnalyticsSegmentEvent = function(segment) {
	Aetna.analytics.omniture.linkCode('aeUserTypeA', 'Segment Load', this, segment);
	s.tl(this,'e',linkText);
}

/**
 * ProgressivePage class.
 */
Aetna.ProgressivePage = function() {
	var initYesNoQuestion = function() {
		$('.progressive-page-wrapper .answers-wrapper a').click(function(e) {
			e.preventDefault();
			
			var thisEl = $(this);
			
			// Check if the answer is already selected
			if (!thisEl.hasClass('selected')) {
				var answer = thisEl.attr('data-answer');
				var progressivePageWrapper = thisEl.closest('.progressive-page-wrapper'); 
				var answersContent = progressivePageWrapper.find('.answers-content');
				var zipCodeWrapper = thisEl.closest('.question-wrapper').siblings('.zip-code-wrapper');
				
				thisEl.siblings('a').removeClass('selected');
				thisEl.addClass('selected').parent().addClass('answered');
				answersContent.children().hide();
				$('.' + answer + '-answer', answersContent).fadeIn();
				
				// Check if the ZIP code input is present as the No answer
				if (zipCodeWrapper.length > 0) {
					progressivePageWrapper.find('div.arrow').hide();
					
					if (answer === 'no') {
						zipCodeWrapper.fadeIn().css('display', 'inline-block');
						progressivePageWrapper.find('.zip-code-content-wrapper').addClass('hidden');
						Aetna.Settings.ProgressivePages.setNoResponse();
					} else {						
						var progressiveBandLoadingSpin = progressivePageWrapper.find('.yes-answer .teaser-loading');
						
						// Check if the progressive page band component has the loading spin
						if (progressiveBandLoadingSpin.length > 0) {
							$('.yes-answer.parsys', answersContent).hide();
							progressiveBandLoadingSpin.fadeIn().delay(1000).fadeOut(400, function() {
								$('.yes-answer.parsys', answersContent).show();
							});
						}
						
						zipCodeWrapper.hide();
						progressivePageWrapper.find('div.arrow').show();
						
						// Clean the zip code input and stored value
						$('input[type="text"]', zipCodeWrapper).val('');
						// disabling the submit button as zipcode is empty
						zipCodeWrapper.find('.blueBtn.whiteBtn').addClass('disabled').attr('href', '#');
						
						Aetna.SmartHomePage.hideCountyDropdown(progressivePageWrapper);
						
						Aetna.Settings.ProgressivePages.setYesResponse();
					}
				} else {
					if (answer == 'no') {
						Aetna.Settings.ProgressivePages.setNoResponse();
					} else {
						Aetna.Settings.ProgressivePages.setYesResponse();
					}
					
					progressivePageWrapper.find('div.arrow').show();
				}
				
				// Check if the answer is inside the login component
				if (progressivePageWrapper.hasClass('progressive-page-login-wrapper')) {
					var disabledLoginButton = function() {
						// Show the default button
						progressivePageWrapper.find('.login-button-wrapper .default-login-button-wrapper').fadeIn();
						
						// Hide the campaign
						progressivePageWrapper.find('.login-button-wrapper .login-campaign').hide();
					};
					
					// Check if the answer is yes to remove the disabled class
					if (answer === 'yes') {						
						$('.yes-answer a', answersContent).removeClass('disabled').find('span').removeClass('arrowGraySmall');
						
						disabledLoginButton();
						
						// Clean the zip code input and stored value
						$('input[type="text"]', progressivePageWrapper).val('');	
						
						Aetna.SmartHomePage.hideCountyDropdown(progressivePageWrapper);
						
						Aetna.Settings.ProgressivePages.setYesResponse();
					} else {
						$('.yes-answer a', answersContent).addClass('disabled').find('span').addClass('arrowGraySmall');
						
						disabledLoginButton();
						
						Aetna.Settings.ProgressivePages.setNoResponse();
					}
				}
				
				// Check if the module is inside an interstitial to center it
				if (progressivePageWrapper.closest('.interstitial').length > 0) {
					centerInter();
				}
				
				// Check if the analytics call should be fired
				if (e.srcElement) {
					eval(thisEl.attr('data-onclick'));
				}
			}
		});
	};
	
	var initSubmitButton = function() {
		var displayErrorBubble = function(buttonEl, zipCodeInputEl, countySelectEl, displayDefaultError) {
			var submitButtonError = buttonEl.closest('.zip-code-wrapper').find('.submit-button-error');
			var zipCodeInputOffset = zipCodeInputEl.offset();
			var bubbleLeftPosition = 0;
			var bubbleTopPosition = 0;
			var windowWidth = $(window).width();
			
			// Set the Zip input error message
			var placeZipInputErrorMessage = function() {
				if (windowWidth >= 768) {
					bubbleLeftPosition = zipCodeInputOffset.left + zipCodeInputEl.width() + 20;
					bubbleTopPosition = zipCodeInputOffset.top;
				} else {
					bubbleLeftPosition = zipCodeInputOffset.left - ((submitButtonError.outerWidth() - zipCodeInputEl.outerWidth()) / 2);
					bubbleTopPosition = zipCodeInputOffset.top + zipCodeInputEl.height() + 20;
				}
			};
			
			if (displayDefaultError) {
				// Check if the county select is present
				if (countySelectEl && countySelectEl.length > 0 && countySelectEl.is(':visible')) {
					var countyDropdownWrapper = countySelectEl.closest('.county-dropdown-wrapper');	
					var countyDropdownOffset = countyDropdownWrapper.offset();
					
					if (windowWidth >= 768) {
						bubbleLeftPosition = countyDropdownOffset.left + countyDropdownWrapper.width() + 20;
						bubbleTopPosition = countyDropdownOffset.top;
					} else {
						bubbleLeftPosition = countyDropdownOffset.left - ((submitButtonError.outerWidth() - countyDropdownWrapper.outerWidth()) / 2);
						bubbleTopPosition = countyDropdownOffset.top + countyDropdownWrapper.height() + 10;
					}
				} else {
					placeZipInputErrorMessage();
				}
				
				submitButtonError.find('.error').hide();
				submitButtonError.find('.default-error').show();
			} else {
				placeZipInputErrorMessage();
				
				submitButtonError.find('.error').hide();
				submitButtonError.find('.zip-error').show();
			}
			
			// Show and place the error message
			submitButtonError
				.fadeIn()
				.offset({top : bubbleTopPosition, left : bubbleLeftPosition})
				.delay(4000)
				.fadeOut();
		};
		
		$('.progressive-page-band-wrapper .zip-code-form a.blueBtn.whiteBtn').click(function(e) {
			e.preventDefault();
			var thisEl = $(this);
			var zipCodeForm = thisEl.closest('form'); 
			var zipCodeInput = zipCodeForm.find('.zip-code');
			var zipCode = zipCodeInput.val();
			
			// Check if the button has the 'disabled' class
			if (thisEl.hasClass('disabled')) {
				var countySelect = $('.js-county-select', zipCodeForm);
				
				// Check if the county is visible and has a value selected
				displayErrorBubble(thisEl, zipCodeInput, countySelect, zipCodeInput.val().length < 5 || (zipCodeForm.parent().hasClass('county-selection') && countySelect.val() == 'default'));
			} else {
				var county = null;
				var progressivePageBandWrapper = zipCodeForm.closest('.progressive-page-band-wrapper');
				
				// Check if the market data was returned
				if (Aetna.SmartHomePage.selectedMarket && 
						Aetna.SmartHomePage.selectedMarket.toLowerCase() != 'invalid') {
					var onclickEvent = thisEl.attr('data-onclick');
					var countySelectEl = $('.js-county-select', zipCodeForm);
					var progressiveBandLoadingSpin = progressivePageBandWrapper.find('.teaser .teaser-loading');
					var progressiveBandCampaign = progressivePageBandWrapper.find('.campaign');
					
					// Get the county is visible and selected
					if (countySelectEl.is(':visible')) {
						var countyValue = countySelectEl.val();
						
						if (countyValue && countyValue != '' && countyValue != 'default') {
							county = countyValue;
						}
					}
										
					if (county) {
						Aetna.Settings.ProgressivePages.setCountyResponse(zipCode, county);
						
						// Replicate the selected county for the others county dropdowns
						$('.js-county-select').each(function(index, element) {
							var elementEl = $(element);
							
							if (elementEl.closest('.progressive-page-band-wrapper').length == 0) {
								elementEl.val(county).change();
							}
						});
					} else {
						Aetna.Settings.ProgressivePages.setZipCodeResponse(zipCode);
					}
					
					progressivePageBandWrapper.find('.zip-code-content-wrapper').removeClass('hidden');
					
					ClientContext.set('/geolocation/address/countryCode', 'US');
					ClientContext.set('/profile/audience', Aetna.SmartHomePage.selectedMarket);
					
					progressivePageBandWrapper.find('div.arrow').show();
					Aetna.Settings.Market.set(Aetna.SmartHomePage.selectedMarket);
					
					// Do the scroll of the page
					if (e.srcElement) {
						$('html,body').animate({
							scrollTop: progressivePageBandWrapper.find('.zip-code-form').offset().top 
										- $('.headerBar').outerHeight() 
										- $('.pathSelector').outerHeight()
						}, 500);
					}
					
					// Check if the progressive page band component has the loading spin
					if (progressiveBandLoadingSpin.length > 0) {
						progressiveBandCampaign.hide();
						progressiveBandLoadingSpin.fadeIn().delay(1000).fadeOut(400, function() {
							progressiveBandCampaign.show();
							Aetna.SmartHomePage.setColumnsTitleHeights();
						});
					}
					
					// Fire the analytics call
					Aetna.SmartHomePage.fireAnalyticsSegmentEvent(Aetna.SmartHomePage.selectedMarket);
					
					Aetna.Settings.ProgressivePages.clientContextFlag = false;
					Aetna.Settings.ProgressivePages.zipCodeInvalidFlag = false;
					
					if (onclickEvent) {
						eval(onclickEvent.replace(/\[market\]/g, Aetna.SmartHomePage.selectedMarket));
					}
				} else if (!e.srcElement) {
					// When the county is remembered
					progressivePageBandWrapper.find('.zip-code-content-wrapper').removeClass('hidden');
					progressivePageBandWrapper.find('div.arrow').show();
				} else {
					progressivePageBandWrapper.find('div.arrow').hide();
					progressivePageBandWrapper.find('.zip-code-content-wrapper').addClass('hidden');
					
					displayErrorBubble(thisEl, zipCodeInput, null, false);
				}
			}
		});
	};
	
	var initLoginRegisterButton = function() {
		$('.progressive-page-login-wrapper a.blueBtn.whiteBtn').click(function(e) {
			var thisEl = $(this);
			
			if (thisEl.hasClass('disabled')) {
				e.preventDefault();
				
				var zipCodeForm = thisEl.closest('form');
				var zipCodeInput = zipCodeForm.find('.zip-code');
				var countySelect = $('.js-county-select', zipCodeForm);
				
				if (zipCodeInput.val().length < 5 || 
						(zipCodeForm.parent().hasClass('county-selection') && countySelect.val() == 'default')) {
					thisEl.parent().siblings('.submit-button-error').fadeIn().delay(4000).fadeOut();
				} else {
					thisEl.parent().siblings('.invalid-zip-code-wrapper').fadeIn().delay(4000).fadeOut();
				}
			} else {
				var dataOnClick = thisEl.attr('data-onclick');
				
				if (dataOnClick) {
					var market = Aetna.Settings.Market.get();
					
					if (market) {
						dataOnClick = dataOnClick.replace(/\[market\]/g, market);
					}
					
					eval(dataOnClick);
				}
			}
		});
	};
	
	/**
	 * Initialization of the class
	 */
	this.init = function() {
		initYesNoQuestion();
		initSubmitButton();
		initLoginRegisterButton();
	};
};

/**
 * Aetna Site Settings class.
 */
Aetna.Settings = {
	ProgressivePages : {
		COOKIE_RESPONSES : 'pp-responses',
		cookieConfig : { 
			expires: 365, 
			path: '/' 
		},
		clientContextFlag : false,
		zipCodeInvalidFlag : false,	
		setYesResponse : function() {
			var responses = Aetna.Settings.ProgressivePages.get();
			responses.yes = true;
			responses.no = false;
			responses.zipCode = null;
			Aetna.Settings.ProgressivePages.set(responses);
		},
		setNoResponse : function() {
			var responses = Aetna.Settings.ProgressivePages.get();
			responses.yes = false;
			responses.no = true;
			Aetna.Settings.ProgressivePages.set(responses);
		},
		setZipCodeResponse : function(zipCode) {
			var responses = Aetna.Settings.ProgressivePages.get();
			responses.yes = false;
			responses.no = true;
			responses.zipCode = zipCode;
			responses.county = null;
			Aetna.Settings.ProgressivePages.set(responses);
		},
		setCountyResponse : function(zipCode, county) {
			var responses = Aetna.Settings.ProgressivePages.get();
			responses.yes = false;
			responses.no = true;
			responses.zipCode = zipCode;
			responses.county = county;
			Aetna.Settings.ProgressivePages.set(responses);
		},
		set : function(responses) {
			$jq.cookie(Aetna.Settings.ProgressivePages.COOKIE_RESPONSES, JSON.stringify(responses), 
				Aetna.Settings.ProgressivePages.cookieConfig);
		},
		get : function() {
			var responses = $jq.cookie(Aetna.Settings.ProgressivePages.COOKIE_RESPONSES);
			
			if (responses) {
				return JSON.parse(responses);
			} else {
				return {};
			}
		},
		clean : function() {
			$jq.removeCookie(Aetna.Settings.ProgressivePages.COOKIE_RESPONSES,
					Aetna.Settings.ProgressivePages.cookieConfig);
		}
	},
	ZipCode : {
		LOCAL_STORAGE_ZIP_CODE_SERVICE_CACHE : 'zip-code-service-cache',
		serviceCache : null,
		getServiceCache : function(zipCode) {
			// Check if a first call has been done to the service to refresh local
			if (Aetna.Settings.ZipCode.serviceCache) {
				// Check if the response is already out of the localStorage
				if (Aetna.Settings.ZipCode.serviceCache.zipCode == zipCode) {
					return Aetna.Settings.ZipCode.serviceCache.response;
				} else if (localStorage) {
					var serviceCached = 
						localStorage.getItem(Aetna.Settings.ZipCode.LOCAL_STORAGE_ZIP_CODE_SERVICE_CACHE);
					
					if (serviceCached) {
						var jsonCached = JSON.parse(serviceCached);
						
						if (jsonCached.zipCode == zipCode) {
							Aetna.Settings.ZipCode.serviceCache = jsonCached;
							return jsonCached.response;
						}
					}
				}
			} else {
				Aetna.Settings.ZipCode.serviceCache = {};
				return null;
			}
		},
		setServiceCache : function(zipCode, response) {
			if (localStorage) {
				localStorage.setItem(Aetna.Settings.ZipCode.LOCAL_STORAGE_ZIP_CODE_SERVICE_CACHE, 
						JSON.stringify({ zipCode : zipCode, response : response }));
			}
		},
	},
	Market : {
		value : null,
		get : function() {
			return Aetna.Settings.Market.value;
		},
		set : function(value) {
			Aetna.Settings.Market.value = value;
		}
	},
	DeepLink : '',
	skipPrepopulation: false,
	fireAnalytics: false,
	fireAnalyticsFirstTime: true
};

$(function() {
	if (Aetna.isCQPreviewMode) {
		var initializeSmartHomePage = ($('.shopModuleContainer ').length > 0 
				|| $('.campaign-smart-home-page').length > 0 
				|| $('.progressive-page-wrapper').length > 0);
		
		// Check if the Shop Module is present to load the JS
		if (initializeSmartHomePage) {
			var smartHomePage = new Aetna.SmartHomePage();
			smartHomePage.init();
		}
		
		// Check if the Progressive page is present to load the JS
		if ($('.progressive-page-wrapper').length > 0) {
			var progressivePage = new Aetna.ProgressivePage();
			progressivePage.init();
		}
		
		if (initializeSmartHomePage) {
			Aetna.SmartHomePage.getZipCodeParameters();
			Aetna.SmartHomePage.initZipCodePrepopulation();
			Aetna.SmartHomePage.clearZipCodeFields();
			Aetna.Personalization.teaserLoadingCallbacks.push(Aetna.SmartHomePage.initZipCodePrepopulation);
			Aetna.Personalization.teaserLoadingCallbacks.push(Aetna.SmartHomePage.initGeolocationZipLoad);
			Aetna.Personalization.teaserLoadingCallbacks.push(Aetna.SmartHomePage.showDeepLink);
			Aetna.Personalization.teaserLoadingCallbacks.push(setMobileOnlyLinks);
			Aetna.Personalization.teaserLoadingCallbacks.push(Aetna.SmartHomePage.manageDynamicContentPlaceholders);
			Aetna.Personalization.teaserLoadingCallbacks.push(accordionInit);
			Aetna.Personalization.teaserLoadingCallbacks.push(Aetna.SmartHomePage.setColumnsTitleHeights);
		}
		
	}
});

