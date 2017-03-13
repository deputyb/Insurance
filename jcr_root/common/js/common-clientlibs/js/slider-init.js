

function sliderInit() {	
	var windowWidth = $(window).width();
	var setSliderHeight = function(thisEl) {
		if (windowWidth < 768) {
			// Function to select the height of the slider based on the max height of the slides
			// Another workaround is to use adaptiveHeight: true as an option of the slider
			// plugin but this will increase and decrease the height of the slider 
			
			// Get the max height of the slides
			var maxHeight = 0;
			var actualSlideHeight;
			
			$('li', thisEl).each(function(index, element) {
				actualSlideHeight = $(element).outerHeight();
				
				if (actualSlideHeight > maxHeight) {
					maxHeight = actualSlideHeight;
				}
			});
			
			thisEl.closest('.bx-viewport').height(maxHeight);
		}
	};
		
	$('.bxslider').each(function(index, element) {
		var thisEl = $jq(element);
		var slideshowWrapper = thisEl.closest('.slideshow-wrapper');
		var homeSlideshowWrapper = thisEl.closest('.home-slideshow-wrapper');
		
		if(!slideshowWrapper.attr('initialized')) {
			var heroSlideShow = thisEl.closest('.heroSlideshow');
            var campaignWrapper = heroSlideShow.closest('.campaign');

            var sliderConfig = {
				auto: true,
				pause: 7000,
				controls: thisEl.closest('.row-hc').length > 0,
				mode: 'fade',
                preloadImages: 'all'
			};
            				
            if ($('li.homeSlideshowItem', thisEl).length == 1) {
				sliderConfig.auto = false;
				sliderConfig.pager = false;
			}
			
			// Check if the slider is in the home page
			if (homeSlideshowWrapper.length > 0) {
				var windowRatio = 1;
				
				if (screen && screen.deviceXDPI && screen.logicalXDPI) {
					windowRatio = screen.deviceXDPI / screen.logicalXDPI;
				}
				
				// Check if the window is 1024 width or more to build the slider
				if (($(window).width() * windowRatio) >= 1024) {
					sliderConfig.pagerCustom = homeSlideshowWrapper.find('.pagination-wrapper');
				} else {
					slideshowWrapper.find('.slide').each(function(index, element) {
						swapHero(element);
					});
					
					return;
				}
			}
			
			thisEl.bxSlider(sliderConfig);
			
			slideshowWrapper.find('.slide').each(function(index, element) {
				swapHero(element);
			});
			
			//workaround to get pagination into grid. by default spanned 100% of page
			if ($('.pagination-holder .bx-pager', slideshowWrapper).length == 0) {
				$('.pagination-holder', slideshowWrapper).append($('.bx-pager', slideshowWrapper));
			}
			
			// Check if the slider is inside a campaign teaser
            if (campaignWrapper.length > 0) {
            	var initializedHero = $('div[initialized="true"]', campaignWrapper);
            	
            	if (initializedHero.length > 0) {
            		initializedHero.parent().remove();
            	}
            }
            
			slideshowWrapper.attr('initialized', true);

			setTimeout(function() {
				setSliderHeight(thisEl);
			}, 0);
		}
	});
		
	$(window).resize(function(){
		$('.bxslider').each(function(index, element) {
			var thisEl = $jq(element);
			var slideshowWrapper = thisEl.closest('.slideshow-wrapper');
			var homeSlideshowWrapper = thisEl.closest('.home-slideshow-wrapper');
			
			// If the browser is IE8, the resize functionality was unabled because it's causing problems
			// when the client context is updated
			if (homeSlideshowWrapper.length > 0 && navigator.userAgent.indexOf('MSIE 8.0') == -1) {
				if ($(window).width() >= 1024) {
					if (!slideshowWrapper.attr('initialized')) {
						var sliderConfig = {
							auto: $('li.homeSlideshowItem', thisEl).length != 1,
							pause: 7000,
							controls: thisEl.closest('.row-hc').length > 0,
							mode: 'fade',
			                preloadImages: 'all'
						};
						
						if (windowWidth < 1024) {
							sliderConfig.pagerCustom = homeSlideshowWrapper.find('.pagination-wrapper');
						}
						
						thisEl.bxSlider(sliderConfig).reloadSlider();
						slideshowWrapper.attr('initialized', true);
					}
				} else if (slideshowWrapper.attr('initialized')) {
					thisEl.bxSlider().destroySlider();
					slideshowWrapper.removeAttr('initialized');
					
					setTimeout(function() {
						$('.heroSlideshowItem').show().css('position', 'inherit');
						$('.bx-viewport').css('height', 'auto');
					}, 200);
				}
			}
			
			slideshowWrapper.find('.slide').each(function(index, element) {
				swapHero(element);
			});
		});
	});
}

function swapHero(element){
	var winWidth = $(window).width();
	if(winWidth > 1023){
		bgImg = $(element).attr('data-bgd');
	}
	else if(winWidth < 1024 && winWidth > 767){
		bgImg = $(element).attr('data-bgt');
	}
	else{
		bgImg = ""
	}
	$(element).css('background-image', 'url("'+bgImg+'")');
}