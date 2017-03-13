var Aetna = Aetna || {};
Aetna.isCQPreviewMode = (typeof(CQ) == 'undefined' || typeof(CQ.WCM) == 'undefined'  || CQ.WCM.getMode() === CQ.WCM.MODE_PREVIEW);
Aetna.formAnalyticsSubmit = false;
Aetna.interstitial = {
	sessionCookie : 'interstitial-cookie',
	restrictedCookie : 'interstitial-restricted-cookie',
	restrictedSessionCookie : 'interstitial-session-restricted-cookie',
	onLoadPageInterstitial: ''
}

var $jq = jQuery; 

$(function(){

	$('.content-wrapper a[href^="#"]').click(function(e) {  
		var target = $(this.hash);  
		if (target.length == 0) {
			target = $('a[name="' + this.hash.substr(1) + '"]');  
		}
		if (!$(this).parent().hasClass('interstitial') && target.length > 0) { 
			var scrollTopPos = target.offset().top - $('.fixedHeaderWrap').outerHeight();
			
			// Check if browser is firefox to adjust the top position
			if (navigator.userAgent.indexOf('Firefox') > -1) {
				scrollTopPos -= 80;
			} else if (navigator.userAgent.indexOf('MSIE') > -1) {
				scrollTopPos -= 100;
			}
			
			if ($(window).width() > 914) {
				scrollTopPos += 70;
			} else {
				scrollTopPos += 20;
			}
			
			$('html, body').animate({ scrollTop: scrollTopPos }, 100);
			e.preventDefault();
		}
	});

	//user change font size function
	$('.fontSmall').click(function(e){
		e.preventDefault();
		$('body').css('font-size','12px');
	});
	$('.fontMedium').click(function(e){
		e.preventDefault();
		$('body').css('font-size','16px');
	});
	$('.fontLarge').click(function(e){
		e.preventDefault();
		$('body').css('font-size','20px');
	});
	
	//Delete extra p section into interstitial message section
	 $("div.interstitial div.message").children("small").hide();

$("table.defTable > tbody > tr:odd").addClass("odd");
$("table.defTable > tbody > tr:not(.odd)").addClass("even");  
var newsTitle = $('.newsTitle span').width();
$('.newsTitle span').parent('.newsTitle').width(newsTitle + 1);

	$(window).on('orientationchange', function(){ $('input[type=text]').blur(); } );
	
	$('.template .col1bgMod .row-fluid ul.span6.underlined:last-child').addClass("last");
	$('.span4 ul.underlined li:last-child').addClass("last");
	
function matchHeight3 () {	
	var commonHeight = $('.container-fluid.module.graybg .span3').closest('.row-fluid').height();
	var commonHeightW = $('.container-fluid.module.whitebg.txtDivide .span4').closest('.row-fluid').height();
	var commonHeight6 = $('.container-fluid.module.graybg .span6').closest('.row-fluid').height();
	if($(window).width() >= 767){
		$('.container-fluid.module.graybg .span3').height(commonHeight);
		$('.container-fluid.module.whitebg.txtDivide .span4').height(commonHeightW);
		$('.container-fluid.module.graybg .span6').height(commonHeight6);
	}
}
matchHeight3();	
$(window).load(function() {
	centerInter();
	setTimeout(centerInter, 200);
});
function matchHeight4 () {
	var commonHeights = $('.container-fluid.module.graybg.imgtxt.txtDivide .span4').closest('.row-fluid').height();
	$('.container-fluid.module.graybg.imgtxt.txtDivide .span4').height(commonHeights);

	var commonHeightsB = $('.columnLayout.section .container-fluid.module.whitebg.imgtxt .span4').closest('.row-fluid').height();
	$('.columnLayout.section .container-fluid.module.whitebg.imgtxt .span4 .container-fluid.modImgText').height(commonHeightsB - 48);
}
if($(window).width() >= 767){	
matchHeight4();
}
	$('.template .col1bgMod .row-fluid ul.span6.underlined:last-child').addClass("last");

	$('.printPage').click(function(e){
		e.preventDefault();
		
		if (Aetna.Video && Aetna.Video.player) {
			Aetna.Video.player.play();
			Aetna.Video.player.pause();
		}
		
		window.print();
	});
	
	$(window).resize(function(){
		//$('input[type=text]').blur();
		if($(window).width() >= 767){ 
		$('.container-fluid.module.graybg.imgtxt.txtDivide .span4').height('auto');
		$('.columnLayout.section .container-fluid.module.whitebg.imgtxt .span4 .container-fluid.modImgText').height('auto');
		matchHeight4();
		}
		$('.container-fluid.module.graybg .span3').height('auto');
		$('.container-fluid.module.graybg .span6').height('auto');
		matchHeight3();
		centerInter();
		
	} );
	
	// ***************** interstitial window handlers ***********
	bindInterstitial();
	
	if (Aetna.isCQPreviewMode) {
		var initInterstitial = $('.external.external-init, #restricted-interstitial');
		
		// Check if interstitial is opened on page load 
		if (initInterstitial.length > 0) {
			var initInterstitalId = initInterstitial.attr('class').replace('external-init', '').replace('external-session', '').replace('external-restricted', '').replace('external', '').replace(/ /g, '');
			var initInterstitialInterout = $('#' + initInterstitalId);
			
			if (initInterstitialInterout.length > 0) {
				initInterstitialInterout.attr('interstitial-init', 'true');
			} else {
				$($('.interout')[0]).attr('interstitial-init', 'true');
			}
			
			$('.interout').each(function(index, interout) {
				var interoutEl = $(interout);
				
				// Init interstitial bindings
				if (interoutEl.attr('interstitial-init') != null) {
					$(".interlink", interoutEl).click(function(e){
						
						var restrictedSessionAttr = $('body').attr('data-interstitial-session-cookie');
						
						if ($(this).attr('data-class') == 'external-session') {
							setInterstitialCookie();
						}
						
						if ($(this).attr('data-class-restricted') == 'external-restricted') {
							setInterstitialRestrictedCookie($(this));
						}
						
						$(".interout").hide().addClass("rewinded");
						
						// Check if the restricted cookie should be handled as a session for multiple pages
						if (restrictedSessionAttr && verifyInterstitialSessionRestrictedCookie() == 1) {
							var actualRestrictedSessionCookie = $jq.cookie(Aetna.interstitial.restrictedSessionCookie);
							$jq.cookie(Aetna.interstitial.restrictedSessionCookie, 
									actualRestrictedSessionCookie + '|' + restrictedSessionAttr, { path: '/' });
						}
						
						$('body').removeClass('lock-scroll');
					});
					
					$(".interlink-back", interoutEl).click(function(e){
						e.preventDefault();
						window.history.back();
					});
				} else {
					// close window to cancel link
					interoutEl.click(function(e){
						if ($(e.target).attr("class") == 'interout') {
							// to affect only to outer div
							e.preventDefault();
							interoutEl.hide().addClass("rewinded").removeClass("on-top-interstitial");
							$('body').removeClass('lock-scroll');
						}
					});
					
					// close window after open a new tab
					$(".interlink, .interlink-back", interoutEl).click(function(e){
						if ($(this).attr('data-class') == 'external-session') {
							setInterstitialCookie();
						}
						if ($(this).attr('data-class-restricted') == 'external-restricted') {
							setInterstitialRestrictedCookie($(this));
						}
						if ($(this).hasClass('interlink-back')) {
							e.preventDefault();
						}
						$(this).closest('.interout').hide().addClass("rewinded");
						$('body').removeClass('lock-scroll');
					});
				}
			});
			
			if (initInterstitial.attr('id') != 'restricted-interstitial') {
				initInterstitial.click();
			}
			
			$(".interout").removeClass("rewinded");
			centerInter();
		} else {
			// close window to cancel link
			$(".interout").click(function(e){
				var elClass = $(e.target).attr("class");
				if (elClass && (elClass.indexOf('interout') > -1 || elClass.indexOf('interstitial-video') > -1)) {
					// to affect only to outer div
					e.preventDefault();
					$(this).hide().addClass("rewinded");
					$('body').removeClass('lock-scroll');
				}
			});
			
			// close window after open a new tab
			$(".interout .interlink, .interout .interlink-back").click(function(e){
				if ($(this).attr('data-class') == 'external-session') {
					setInterstitialCookie();
				}
				if ($(this).attr('data-class-restricted') == 'external-restricted') {
					setInterstitialRestrictedCookie($(this));
				}
				if ($(this).hasClass('interlink-back')) {
					e.preventDefault();
				}
				$(this).closest(".interout").hide().addClass("rewinded");
				$('body').removeClass('lock-scroll');
				// Check if a video is present
				if (Aetna.Video) {
					Aetna.Video.player.stop();
					Aetna.Video.player.pause();
				}
				
				//if YT video, pause videos when closing interstitial
				if($(this).closest(".interout").find(".videoContent.video-youtube iframe").length > 0) {
					// pause all YT videos
					$(".videoContent.video-youtube iframe").each(function() {
						$(this)[0].contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
					});
				}
			});
		}
		
		$('.external-restricted').click(function() {
			setInterstitialRestrictedCookie($(this));
			return true;
		});
		
		executeCPTFormVerification();
		executeFormWrapperVerification();
	}
	
	//$('.interout .interstitial').css('top', ($(window).height() - $('.interout .interstitial').outerHeight()) / 2);
	// end interstitial
	
	$(window).resize(function(){
		checkQuickLinks();
		setMegaMenuTitlesHeight();
		centerInter();
		placeInterstitialVideo();
		loadImages();
	});

	$('.searchformdesktop, .searchformmobile').submit(function(e){
		e.preventDefault();
		
		var actionPath = $(this).attr('action');
		var query = $('input[type=text]', $(this)).val();
		$jq.cookie('s_previousPage', s.pageName, { path: '/' });
		window.location.href = actionPath + '?query=' + query;
		return false;
	});

	var ie8Compat = function() {
	        var agentStr = navigator.userAgent;
	        if ( agentStr.indexOf('MSIE') === -1 ) {
	        	return false;
		    }
	        if ( agentStr.indexOf('MSIE 6.0') > -1 ) {
	        	if ( window.location.href.indexOf('index.html') == -1){
	                window.location = "/errors/browser-not-supported.html";
	                return true;
	            }else{
	                window.location = "index-ie6.html";
	                return true;	            
	            }
			}
	        if ( agentStr.indexOf('MSIE 7.0') > -1 ) {
	            if ( agentStr.indexOf('Trident/4.0') > -1 ) {
	            	// alert("WARNING: You are operating in Internet Explorer 8 Compatibility View. THIS SITE DOES NOT FUNCTION PROPERLY IN THIS VIEW. To access Aetna.com, you must turn off the compatibility view in your settings under the 'Tools' menu.");
	                return true;
	            } else if ( agentStr.indexOf('Trident/5.0') > -1 ) {
	            	// alert("WARNING: You are operating in Internet Explorer 9 Compatibility View. THIS SITE DOES NOT FUNCTION PROPERLY IN THIS VIEW. To access Aetna.com, you must turn off the compatibility view in your settings under the 'Tools' menu.");
	                return true;
	            } else if ( agentStr.indexOf('Trident/6.0') > -1 ) {
	            	// alert("WARNING: You are operating in Internet Explorer 10 Compatibility View. THIS SITE DOES NOT FUNCTION PROPERLY IN THIS VIEW. To access Aetna.com, you must turn off the compatibility view in your settings under the 'Tools' menu.");
	                return true;
	            } else if ( agentStr.indexOf('Trident') == -1 ) {
	            	// alert("WARNING: You are operating in Internet Explorer 7. THIS SITE DOES NOT FUNCTION PROPERLY IN THIS BROWSER. To access Aetna.com, please use a different browser.");
	                //window.location = "/individuals-families/browser-not-supported.html";
	                return true;
	            } else {
	                return false;
	            }
	        } else {
	            return false;
	        }
	    }
	Modernizr.addTest('ie8compat', ie8Compat);
	
	Modernizr.addTest('positionfixed', function () {
	    var test  = document.createElement('div'),
	      control = test.cloneNode(false),
	         fake = false,
	         root = document.body || (function () {
	            fake = true;
	            return document.documentElement.appendChild(document.createElement('body'));
			});
	});
	Modernizr.load({
	  test: Modernizr.positionfixed,
	  yep : 'js/overthrow.js',
	  nope: ''
	});
	if(!$('html').hasClass('no-positionfixed')){
		$('meta[name*=viewport]').attr('content', 'user-scalable=no');
	}
	// autoselect dropdowns
	$(".autoSubmit").change( function(e) {
      	var location = $(this).val();
      	var selectedOption = $(this).get(0).selectedIndex;
      	
      	// clear all options
		$(this).find('option').attr('selected',false);
		
		// commented per AETNADEV-191, option selected doesn't need to be reset
 		//$(this).find('option:first').attr('selected',true);
		//$(this).find('select option:eq(0)').prop('selected', true);
		//$('.autoSubmit').prop('selectedIndex',0);
		//$(this).get(0).selectedIndex = 0;
		
		// per AETNADEV-191, mark clicked option as selected
      	$(this).find('option:eq(' + selectedOption + ')').prop('selected', true);
		
		if(location != ""){
			$(this).find('option:first-child').attr('selected',true);
			if(location.indexOf(".pdf") > 0   // pdf open in new window
					&& $(window).width() >= 767){  //on mobile open in same window
				var open = window.open(location);
				if (open == null || typeof(open)=='undefined') // if there is a popupblocker
					window.location = location;
			} else {
				window.location = location;
			}
		}
		$(this).trigger('blur');
    });
	
	loadImages();
	
	//Health Care exchange dropdown function (change state exchange phone number on select change)
	$('.numChange').change(function(e) {
		//e.preventDefault();
		var state = $(this).val();
		if(state != ''){
			if($('.hixTab').hasClass('current')){
				$('.hixTab.current').removeClass('current').fadeOut(800, function(){
					changeEsStatePhoneNumber(state);
				})
			}
			else{
				changeEsStatePhoneNumber(state);
			}
			Aetna.analytics.omniture.click(this, 151, state)
		}
		else{
			$('.hixTab.current').removeClass('current').fadeOut(800, function(){
				
			})
		}
		$(this).trigger('blur');
	});
	
	//If dropdown has the option selected it should display Phone #
	if($('.numChange').length != 0){
		var state = $('.numChange').val();
		if(state != ''){
			if($('.hixTab').hasClass('current')){
				$('.hixTab.current').removeClass('current').fadeOut(800, function(){
					changeEsStatePhoneNumber(state);
				})
			}
			else{
				changeEsStatePhoneNumber(state);
			}
			Aetna.analytics.omniture.click(this, 151, state)
		}
		else{
			$('.hixTab.current').removeClass('current').fadeOut(800, function(){
				
			})
		}
		$(this).trigger('blur');
	}
	
	//adjust height for enrollment steps
	if($('.enrollSteps').length != 0){
		// get highest element step
		var highestValue = 0; 
		var highestElement;  // the highest element
		// if not mobile
		if($(window).width() > 767){
			$(".enrollSteps").children(".row-fluid").children().each(function () {
			    $this = $(this);
			    if ( $this.height() > highestValue ) {
			    	highestElement = this;
			    	highestValue = $this.height();
			    }
			});
			
			$(".enrollSteps").children(".row-fluid").children(".span3").height(highestValue);
		}
	}
	
	
	//adjust height  for democolumn with borders
	var demoColumnWithBorderElement = $('.democolumnLayout .txtDivide');
	if(demoColumnWithBorderElement.length != 0){
		// get highest element step
		var highestValue = 0; 
		var highestElement;  // the highest element
		// if not mobile
		if($(window).width() > 767){
			demoColumnWithBorderElement.children(".row-fluid").children().each(function () {
			    $this = $(this);
			    if ( $this.height() > highestValue ) {
			    	highestElement = this;
			    	highestValue = $this.height();
			    }
			});
			
			demoColumnWithBorderElement.children(".row-fluid").children(".span6").height(highestValue);
			demoColumnWithBorderElement.children(".row-fluid").children(".span4").height(highestValue);
			demoColumnWithBorderElement.children(".row-fluid").children(".span3").height(highestValue);
			demoColumnWithBorderElement.children(".row-fluid").children(".span2").height(highestValue);
		}
	}
	
	// adjust pager position on hero slider
	var sliderItemHeight = $(".bxslider li:visible img").height();
	$(document).ready(function(){
		// with height of 170 or less for small hero image, pager should have less space, 
		if(sliderItemHeight < 170) {
			$(".slideshow-wrapper .bx-pager").css("margin-top","1%")
		} 
	});
    $(window).resize(function() {
    	var sliderItemHeight = $(".bxslider li:visible img").height();
		if(sliderItemHeight < 170) {
			$(".slideshow-wrapper .bx-pager").css("margin-top","1%");
		} else{
			$(".slideshow-wrapper .bx-pager").css("margin-top","");
		}
    });
	

	function changeEsStatePhoneNumber(state) {
		$('.hixTab.'+state + ', .hixNumbers.spanish .hixNumber').fadeIn(800).addClass('current');		
		var mobilePhoneNumber = $('.hixTab.current .ct .strong');
		var esMobilePhoneNumber = $('.hixNumbers.spanish .mobileNumber');
		var statePhoneNumber = $('.hixTab.current .ct .strong').text();

		//if is mobile add the telephone link
		if(jQuery.browser.mobile){
			mobilePhoneNumber.attr('href', 'tel:' + statePhoneNumber);
			esMobilePhoneNumber.attr('href', 'tel:' + statePhoneNumber);
		}

		esMobilePhoneNumber.text(statePhoneNumber);
	}

	/**Global (mobile): Handles viewport resizing bug on fluid layout */
	(function(doc) {

		var addEvent = 'addEventListener',
		    type = 'gesturestart',
		    qsa = 'querySelectorAll',
		    scales = [1, 1],
		    meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

		function fix() {
			meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
			doc.removeEventListener(type, fix, true);
		}

		if ((meta = meta[meta.length - 1]) && addEvent in doc) {
			fix();
			scales = [.25, 1.6];
			doc[addEvent](type, fix, true);
		}

	}(document));
	
	//quick links click event handler
	$('.quicklinksAll').click(function(e){
		e.preventDefault();
		toggleQuickLinks();
	});
	
	var el = $('input[type=text], textarea');
	    el.focus(function(e) {
	        if (e.target.value == e.target.defaultValue)
	            e.target.value = '';
	    });
	    el.blur(function(e) {
	        if (e.target.value == '')
	            e.target.value = e.target.defaultValue;
	});

    //if it not is mobile it should delete all the :tel links
    if (!isMobileBrowser()) {
        $('a[href^="tel:"]').removeAttr("href");
        setMegaMenuTitlesHeight();
    }

    // Call to the thte second news link
    getSecondNewsLink();
    
    // Set the current year
    setCurrentYear();
    
    // Call the method to set the mobile only links
    setMobileOnlyLinks();
    
    // Call method to check the restricted interstitial pages
    verifyRestrictedInterstitialPage();
    
    // Biography items binding
    bindBioItemsCallbacks();
    
    // Integration of internal HTTPS links
    httpsLinksIntegration();
});

function isMobileBrowser() {
	return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|GT-N7100|Opera Mini/i.test(navigator.userAgent);
}

function executeCPTFormVerification() {
	if ($('.cpt').length > 0) {
		$('.cpt form').submit(function(e) {
			if (!Aetna.formAnalyticsSubmit) {
				var formEl = $(this);
				var externalLink = $('.external', formEl);
				var continueLinkHref = formEl.attr('action') + '?';
				var proceedSubmit = true;
				var emptyForm = true;
				var textfieldValue;
				var formSubmitResult;
				
				$('input[type=text]', formEl).each(function(index, textfield) {
					textfieldValue = $(textfield).val();
					
					if (textfieldValue != '') {
						if (textfieldValue.length == 5) {
							emptyForm = false;
							proceedSubmit = proceedSubmit && true;
							continueLinkHref += $(textfield).attr('name') + '=' + textfieldValue + '&';
						} else {
							proceedSubmit = false;
						}
					} else {
						proceedSubmit = proceedSubmit && true;
					}
				});
				
				formSubmitResult = !emptyForm && proceedSubmit;
				
				if (formSubmitResult) {
					$('.form-error-msg', formEl).addClass('hidden');
					Aetna.analytics.omniture.linkCode('aeToolUseA','CPT Codes Search',this);
					s.tl(this,'e',linkText);
					
					if (externalLink.length > 0 && !verifyInterstitialCookie(Aetna.interstitial.sessionCookie)) {
						externalLink.attr('href', continueLinkHref.substring(0, continueLinkHref.length - 1));
						externalLink.click();
						return false;
					} else{
						if (!Aetna.formAnalyticsSubmit) {
							setTimeout(function() {
								Aetna.formAnalyticsSubmit = true;
								formEl.submit();
							}, 800);
							return false;
						}
						return false;
					}
				} else {
					$('.form-error-msg', formEl).removeClass('hidden');
				}
				
				return formSubmitResult;
			} else {
				return true;
			}
		});
		
		$('.cpt form input[type=text]').keypress(function(e) {		
			var keyCode = e.keyCode;
			
			// Check if the key code is valid
			if (keyCode == 0) {
				keyCode = e.charCode;
			}
			
			if (keyCode != 13 && keyCode != 8 && !(keyCode >= 35 && keyCode <= 46)) {
				if ($(this).val().length > 4) {
					return false;
				}
			}
		});
	}
}

function executeFormWrapperVerification() {
	if ($('.form-wrapper').length > 0) {
		$('.form-wrapper form').submit(function(e) {
			var proceedSubmit = true;
			var form = $(this);
			
			if (!Aetna.formAnalyticsSubmit) {
				$('input', $(this)).each(function(index, textfield) {
					proceedSubmit = proceedSubmit && $(textfield).val() != '';
				});
				
				if (proceedSubmit) {
					var analyticsJSMethod = form.attr('data-form-method-analytics');
					
					setInterstitialRestrictedCookie(form);
					
					if (analyticsJSMethod) {
						Aetna.analytics.omniture.linkCode(analyticsJSMethod,form.attr('data-form-name-analytics'),this);
						s.tl(this,'e',linkText);
						
						setTimeout(function() {
							Aetna.formAnalyticsSubmit = true;
							form.submit();
						}, 800);
						return false;
					}
				}
				
				return false;
			} else {
				return true;
			}
		});
	}
}

function checkQuickLinks(){
	if($(window).width() > 787){
		if(!$('.quicklinks').hasClass('open')){
			$('.quicklinks').addClass('open');
			$('.quicklinksExpand').css('display','');
		}
	}
	else{
		$('.quicklinks').removeClass('open');
		$('.quicklinksExpand').css('display','none');
	}
}

function toggleQuickLinks(){
	$('.quicklinksExpand').slideToggle(function(){});
	if($('.quicklinks').hasClass('open')){
		$('.quicklinks').removeClass('open');
		$('.quicklinks li').css('visibility','');
		$('.quicklinks .quicklinks-explantion').removeClass('on');
	}else{
		$('.quicklinks').addClass('open');
		$('.quicklinks li').css('visibility','hidden');
		$('.quicklinks .quicklinks-explantion').addClass('on');
		
	}	
		
}

/**
 * Function that provides the ajax call to get the latest news hub link
 */
function getSecondNewsLink() {
	var secondNewsSource = $('.secondNewsSource');
	
	var secondNewsSourceAttr = secondNewsSource.attr('data-second-news-souce');
	
	if (secondNewsSourceAttr) {
		$.ajax(secondNewsSourceAttr, {
			dataType: 'xml',
			success: function(data) {
				var rssItems = $('item', $(data));
				
				if (rssItems.length > 0) {
					var rssFirstNews = $(rssItems[0]);
					secondNewsSource.html('<a href="' + 
							$('link', rssFirstNews).text() + '" onclick="' + 
							secondNewsSource.attr('data-second-news-onclick') + '"><span class="arrowWhiteSmall">' +
							$('title', rssFirstNews).text()
							+ '</span></a>');
					secondNewsSource.removeClass('hidden');
				}
			},
			error: function(e, e2, e3) {
				$('.secondNewsFallback').removeClass('hidden');
				getSecondNewsLinkAux(secondNewsSource);
			}
		});
	} else {
		$('.secondNewsFallback').removeClass('hidden');
	}
	
	getSecondNewsLinkAux(secondNewsSource);
}

function getSecondNewsLinkAux(secondNewsSource) {
	var newsLinks = $('a', secondNewsSource.parent());
	
	if (newsLinks.length === 1 && !$('.secondNewsFallback').hasClass('hidden')) {
		$(newsLinks[0]).parent().removeClass('withAlert');
	}
}

/**
 * Function to dynamically set the current year.
 */
function setCurrentYear() {
	var copyrightEl = $('footer .copyright, .current-year');
	
	if (copyrightEl.length > 0) {
		var currentYear = new Date().getFullYear();
		
		copyrightEl.each(function(index, element) {
			var elementEl = $(element);
			var elementHtml = elementEl.html().replace('[current-year]', currentYear);
			elementEl.html(elementHtml);
		});
	}
}

function setMobileOnlyLinks() {
	if (!isMobileBrowser()) {
		$('a.mobile-only').each(function(indexLink, link) {
			$(link).attr('href', $(link).attr('data-desktop-link'));
		});
		
		$('a[href^="tel:"]').removeAttr("href");
	}
}

/**
 * Function to set the heights of the megamenu column titles.
 */
function setMegaMenuTitlesHeight() {
	var windowWidth = $(window).width(); 

	if (windowWidth >= 914) {
		var max = -1;
		$('.universalMenu .actual .topicLink').each(function() {
			$(this).css('height', 'auto');
		    var h = $(this).height(); 
		    max = h > max ? h : max;
		});
		
		if (max > 0) {
			$('.universalMenu .actual .topicLink').height(max);
		}
	} else {
		$('.universalMenu .topicLink').height('auto');
	}
}
/**
 * Function center the interstitial.
 */
function centerInter() {
	var windowHeight = $(window).height() - 100;
	
	$('.interstitialParsys .interstitial').each(function(index, element) {
		var parsys = $(element).find(".parsys");
		
		// If parsys is bigger than the overlay it set a height so that the content can
		// be scroll
		parsys.css("height", "auto");

		if (windowHeight < parsys.height()){
			parsys.first().css("height", windowHeight + "px");
		}
		
		// Check if the content of a parsys is a shop module or a login module
		if (parsys.find('.shop-module-wrapper').length > 0 ||
			parsys.find('.progressive-page-login-wrapper').length > 0) {
			$(element).css({
				'padding': '2px', 
				'margin-left' : 0, 
				'max-height' : '85%',
				'left': ($(window).width() - $(element).outerWidth()) / 2
			});
		}
	});

	if ($(window).width() >= 767){

		$('.interstitial').each(function(index, element) {
			var interstitialSize = $('.windowSize', $(this));
			
			// if window is bigger than the interstitial
			if ($(window).height() > $(element).height()+130){
				$(element).css({
			        'margin-top' : -($(element).height() + 65 + 30) /2 
			    });	
			} else {
				var heightDif = (($(element).height() - $(window).height())/2) +68;
				$(element).css({
			        'margin-top' : -(($(element).height() + 65 + 30 ) /2) +heightDif 
			    });	
			}
			
			//Removes overwrite
			$(this).removeClass(function (index, css) {
	    		return (css.match (/(^|\s)overwrite-\S+/g) || []).join(' ');
			});
			
			// Check if the interstitial has a new size to set
			if (interstitialSize.length > 0) {
				$(this).addClass(interstitialSize.attr('wsize'));
			}
		});
    } else {
    	$('.interstitial').each(function(index, element) {
    		$(element).css({
    	    	'margin-right' : -($(element).width() + 20) /2,
    	        'margin-top' : -($(element).height() + 20) /2 
    	    });
    	});
    }
} 
function mobCenterInter() {
	centerInter();
	setTimeout(centerInter, 200);
}
function bindInterstitial() {
	// ***************** interstitial window handlers ***********
	$(document).on('click', '.external a, a.external', function(e) {
		var interlinkEl = $(".interout .interlink");
		var externalSession = false;
		var externalRestricted = false;
		var linkClasses = $(this).attr('class').split(' ');
		var actualClass;
		var actualClassEl;
		var interoutEl = $($(".interout").get(0));
		
		// Determine which interstitial use
		for (var indexClass = 0; indexClass < linkClasses.length; indexClass++) {
			actualClass = linkClasses[indexClass];
			// Check if the class is valid
			if (actualClass != 'external' 
				&& actualClass != 'external-session' 
				&& actualClass != 'external-restricted') {
				actualClassEl = $('#' + actualClass);
				// Check if the given class correspond to the interstitial id
				if (actualClassEl.length > 0 && actualClassEl.hasClass('interout')) {
					interoutEl = actualClassEl;
					break;
				}
			}
		}
		
		if ($(this).hasClass('external-restricted') && 
				!verifyInterstitialCookie(Aetna.interstitial.restrictedCookie)) {
			externalRestricted = true;
		}
		if ($(this).hasClass('external-session')) {
			externalSession = true;
			
			if (!verifyInterstitialCookie(Aetna.interstitial.sessionCookie)) {
				e.preventDefault();
			} else {
				return true;
			}
		} else {
			e.preventDefault();
		}

		//Removes overwrite
		$(interoutEl.children(0).children(0)).removeClass (function (index, css) {
    		return (css.match (/(^|\s)overwrite-\S+/g) || []).join(' ');
		});

		//check if the resize is overwritten.
		if(interoutEl.find(".windowSize").length > 0 ){
			var sizeClass = $(interoutEl.find(".windowSize")[0]).attr("wsize");
			$(interoutEl.children(0).children(0)).addClass(sizeClass);
		}

		//Check is interstitial has redirect component and redirects instead of 
		if(interoutEl.find(".redirect").length > 0 ){
			 var redirect = $(interoutEl.find(".redirect")[0]);
			 var rhref = redirect.attr("href");
			 var rtarget = redirect.attr("target");
			 if (rtarget = undefined){
			 	window.location.href = rhref;
			 }else{
			 	window.open(rhref,rtarget);
			 }
			 
		}else{
			var attz = $(this).attr("href");
			var targetz = $(this).attr("target");
			var progressivePageLoginWrapper = interoutEl.find('.progressive-page-login-wrapper');
			
			// Check if the interstitial has a progressive login module
			if (progressivePageLoginWrapper.length > 0) {
				var ppResponses = Aetna.Settings.ProgressivePages.get();
				
				if (Aetna.SmartHomePage && Aetna.SmartHomePage.setLanguageParam) {
					attz = Aetna.SmartHomePage.setLanguageParam(attz);
				}

				progressivePageLoginWrapper.find('.yes-answer a').attr('href', attz).attr('target', targetz);
				Aetna.Settings.DeepLink = $(this).attr('data-interstitial-deeplink');
				
				// Check if the zip code is saved as a setting to trigger function to set the proper link
				if (ppResponses && ppResponses.zipCode) {
					progressivePageLoginWrapper.find('.zip-code').keypress().keyup();
					
					if (ppResponses.county) {
						$('.js-county-select', progressivePageLoginWrapper).val(ppResponses.county)
							.change()
							.parents('.county-form-item')
							.fadeIn()
							.css('display', 'inline-block');;
					}
					
					Aetna.SmartHomePage.showDeepLink();
				}
			} else {
				$(".interout .interlink").attr("href", attz);
				$(".interout .interlink").attr("target", targetz);
			}
			
			if (externalSession) {
				interlinkEl.attr("data-class", 'external-session');
			} else {
				interlinkEl.removeAttr('data-class');
			}
			
			if (externalRestricted) {
				$(".interout .interlink").attr("data-class-restricted", 'external-restricted');
			} else {
				interlinkEl.removeAttr('data-class-restricted');
			}
			
			interoutEl.removeClass("rewinded");
			
			if ($(".interout:visible").length == 1){
				interoutEl.addClass("on-top-interstitial");
			}
			interoutEl.show();
			$('body').addClass('lock-scroll');
			
			centerInter();
			if($(window).width() <= 914){ 
				mobCenterInter();
			}
			
			// Check if the interstitial has a video element to resize it
			if ($('.video', interoutEl).length > 0) {
				if (Aetna.Video && Aetna.Video.resizeVideo) {
					Aetna.Video.resizeVideo();
				}
				
				placeInterstitialVideo();
				// Tweak for Safari because the video height is not updated correctly on the first load
				if (navigator.userAgent.indexOf('Safari') > -1) {
					placeInterstitialVideo();
				}
			}
			
			$('.interstitial .message').scrollTop(0);
		}
	});
}
function verifyInterstitialCookie(cookieName) {
	var interstitialCookie = $jq.cookie(cookieName);
	
	if (interstitialCookie) {
		var pathnamesArray = interstitialCookie.split('|');
		
		for (var indexPathname = 0; indexPathname < pathnamesArray.length; indexPathname++) {
			if (pathnamesArray[indexPathname] == window.location.pathname) {
				return true;
			}
		}
		
		return false;
	}
}
function verifyInterstitialSessionRestrictedCookie() {
	var restrictedSessionAttr = $('body').attr('data-interstitial-session-cookie');
	
	if (restrictedSessionAttr) {
		var restrictedSessionCookie = $jq.cookie(Aetna.interstitial.restrictedSessionCookie);
		
		if (restrictedSessionCookie) {
			var sessions = restrictedSessionCookie.split('|');
			
			for (var indexSession = 0; indexSession < sessions.length; indexSession++) {
				if (sessions[indexSession] === restrictedSessionAttr) {
					return 2;
				}
			}
		}
		
		return 1;
	} else {
		return 0;
	}
}
function setInterstitialCookie(cookieName) {
	var interstitialCookie = $jq.cookie(Aetna.interstitial.sessionCookie);
	
	if (!interstitialCookie) {
		interstitialCookie = '';
	}
	
	interstitialCookie += '|' + window.location.pathname;
	
	$jq.cookie(Aetna.interstitial.sessionCookie, interstitialCookie, { path: '/' });
}
function setInterstitialRestrictedCookie(el) {
	var interstitialRestrictedCookie = $jq.cookie(Aetna.interstitial.restrictedCookie);
	var target = el.attr('href');
	
	if (!interstitialRestrictedCookie) {
		interstitialRestrictedCookie = '';
	}
	
	// Check if the element is a form or a link
	if (!target) {
		target = el.attr('action');
	}
	
	interstitialRestrictedCookie += '|' + target;
	
	$jq.cookie(Aetna.interstitial.restrictedCookie, interstitialRestrictedCookie, { path: '/' });
}
function verifyRestrictedInterstitialPage() {
	if ($('body').attr('data-restricted-interstitial') && Aetna.isCQPreviewMode) {
		var interstitialSessionCheck = verifyInterstitialSessionRestrictedCookie();
		
		if (!verifyInterstitialCookie(Aetna.interstitial.restrictedCookie) &&
				(interstitialSessionCheck == 0 || interstitialSessionCheck == 1)) {
			$('#restricted-interstitial').click();
		}
	}
}
function placeInterstitialVideo() {
	var interstitialVideo = $('.interstitialVideo');
	if (interstitialVideo.length > 0) {
		var windowHeight = (navigator.userAgent.indexOf('iPhone') > -1) ? window.innerHeight : $(window).innerHeight();
		$('.interstitial', interstitialVideo).each(function() {
			var interstitial = $(this);
			interstitialVideo = interstitial.closest('.interstitialVideo');
			
			var interstitialClose = $('.close', interstitialVideo);
			var interstititalTop = (windowHeight - interstitial.outerHeight()) / 2;
			interstitial.css('top', interstititalTop);
			interstitialClose.css({'top': interstititalTop - (interstitialClose.height() / 2),
				'left' : interstitial.offset().left + interstitial.outerWidth() - (interstitialClose.width() / 2)});
		});
	}
}
function bindBioItemsCallbacks() {
	var bioItems = $('.bio-item-toggle a');
	
	if (bioItems.length > 0) {
		bioItems.click(function(e) {
			e.preventDefault();
			var thisEl = $(this);
			$('a', thisEl.parent()).removeClass('hidden');
			$(this).addClass('hidden');
			thisEl.closest('.biographyItem').find('.hidden-text').slideToggle();
			
			if (thisEl.hasClass('closed')) {
				Aetna.analytics.omniture.linkCode('aeContExp',$('.bio-item-wrapper h3', thisEl.parent().parent()).text(),this);
				s.tl(this,'o',linkText);
			}
		});
	}
}
function httpsLinksIntegration() {
	// Integration of https internal links
	$('.content-wrapper a[data-use-https="true"]').each(function() {
		var actualHref = $(this).attr('href');
		var pageFullDomain = 'https://' + location.host;
			
		// The link is internal
		if (actualHref && actualHref.indexOf('/') == 0) {
			$(this).attr('href', pageFullDomain + actualHref);
		}
	});
}

function loadImages() {
	if($(window).width() >= 767){
		$('.loadImg').each(function(index){
			imgLoad = $(this).find('.hidden-phone').attr('data-imgname');
			$(this).find('.hidden-phone').attr('src', imgLoad);
		});
	}
	else{
		$('.loadImg').each(function(index){
			imgLoad = $(this).find('.visible-phone').attr('data-imgname');
			$(this).find('.visible-phone').attr('src', imgLoad);
		});
	}	
}

String.prototype.capitalize = function () {
	var capitalizeWord = function(word) {
		return word.charAt(0).toUpperCase() + word.slice(1);
	};
	
	var words = this.toLowerCase().split(' ');
	var capitalizedString = '';
	
	if (words.length > 1) {
		for (var indexWord = 0; indexWord < words.length; indexWord++) {
			capitalizedString += capitalizeWord(words[indexWord]) + ' ';
		}
		
		capitalizedString = capitalizedString.substring(0, capitalizedString.length - 1);
	} else {
		capitalizedString = capitalizeWord(this.toLowerCase());
	}
  
	return capitalizedString;
};

/*Feedback code grabbed from http://www.aetna.com/assets_aetnaCom/onlineopinionS3tS/oo_engine.js*/
/* OnlineOpinion (S3tS v3.1) */

/* This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. */

var custom_var,_sp='%3A\\/\\/',_rp='%3A//',_poE=0.0, _poX=0.0,_sH=screen.height,_d=document,_w=window,_ht=escape(_w.location.href),_hr=_d.referrer,_tm=(new Date()).getTime(),_kp=0,_sW=screen.width;function _fC(_u){_aT=_sp+',\\/,\\.,-,_,'+_rp+',%2F,%2E,%2D,%5F';_aA=_aT.split(',');for(i=0;i<5;i++){eval('_u=_u.replace(/'+_aA[i]+'/g,_aA[i+5])')}return _u};function O_LC(){_w.open('https://secure.opinionlab.com/ccc01/comment_card.asp?time1='+_tm+'&time2='+(new Date()).getTime()+'&prev='+_fC(escape(_hr))+'&referer='+_fC(_ht)+'&height='+_sH+'&width='+_sW+'&custom_var='+custom_var,'comments','width=535,height=192,screenX='+((_sW-535)/2)+',screenY='+((_sH-192)/2)+',top='+((_sH-192)/2)+',left='+((_sW-535)/2)+',resizable=yes,copyhistory=yes,scrollbars=no')};function _fPe(){if(Math.random()>=1.0-_poE){O_LC();_poX=0.0}};function _fPx(){if(Math.random()>=1.0-_poX)O_LC()};window.onunload=_fPx;function O_GoT(_p){_d.write('<a href=\'javascript:O_LC()\'>'+_p+'</a>');_fPe()}
