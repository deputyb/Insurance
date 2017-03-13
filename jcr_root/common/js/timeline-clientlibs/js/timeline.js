var timelineObj = {};

$jq(function() {
	if (Aetna.isCQPreviewMode) {		
		bindTimeline();
	}
});

function bindTimeline() {
	initTimeline();
	bindTimelineMarkEvents();
	checkDeepLinking();
	bindOnHashChange();
	
	$jq(window).resize(function(){
		initTimeline();
	});
}

function initTimeline() {
	var timelineSlider = $jq('.bxslider-timeline');
	
	if (timelineSlider.length > 0) {
		if ($jq(window).width() > 767) {
			if (!timelineObj.slider) {
				timelineSlider.each(function(index, element) {
					var thisEl = $jq(element);
					
					timelineObj.slider = thisEl.bxSlider({
						auto: false,
						controls: true,
						mode: 'horizontal',
						infiniteLoop: false,
						hideControlOnEnd: true,
						easing: 'linear',
						pager: false,
						onSlideBefore: function(slideEl, oldIndex, newIndex) {
							var sliderYear = $jq('.timeline-arrow', slideEl).attr('data-timeline-year');
								
							unBindOnHashChange();
							window.location.hash = sliderYear;
							bindOnHashChange();
						}
					});
				});
			}
			
			$jq('.interactiveTimelineItem').css('opacity', 1);
			$jq('.timeline-img').css({ 'position' : 'inherit' });
			
			if (timelineObj.mobile) {
				$jq(document).unbind('scroll');
				timelineObj.mobile = false;
			}
		} else {
			if (!timelineObj.mobile) {
				var timelineItemsTop = [];
				timelineObj.offset = $jq('.timeline-img').offset();
				
				var onScrollFunction = function() {
					var scrollPosition = $jq(document).scrollTop() + 120;
					var actualTimelineItem;
					
					$jq('.interactiveTimelineItem').css('opacity', 0.4);
					$jq('.interactiveTimelineItem h3, .interactiveTimelineItem span, .item-content-wrapper').removeClass('active');
					
					if (scrollPosition >= timelineItemsTop[timelineItemsTop.length - 1]) {
						activateTimelineItem($jq($jq('.interactiveTimelineItem').get(timelineItemsTop.length - 1)));
					} else {				
						for (var indexItem = 0; indexItem < timelineItemsTop.length; indexItem++) {
							if (scrollPosition >= timelineItemsTop[indexItem] &&
									scrollPosition < timelineItemsTop[indexItem + 1]) {
								activateTimelineItem($jq($jq('.interactiveTimelineItem').get(indexItem)));
							}
						}
					}
					
					if (scrollPosition >= timelineObj.offset.top) {
						$jq('.timeline-img').css({ 'position' : 'fixed', 'top' : 70, 'left' : timelineObj.offset.left });
						$jq('.interactiveTimeline .bxslider-timeline').addClass('active');
					} else {
						$jq('.timeline-img').css({ 'top' : timelineObj.offset.top, 'position' : 'inherit' });
						$jq('.interactiveTimeline .bxslider-timeline').removeClass('active');
					}
				}
				
				setTimeout(function() {
					$jq('.interactiveTimelineItem').each(function(index, element) {
						timelineItemsTop.push($jq(element).offset().top);
					});
					
					$jq(document).scroll(onScrollFunction);
					
					onScrollFunction();
				}, 500);
			}
			
			timelineObj.mobile = true;
			
			if (timelineObj.slider) {
				timelineObj.slider.destroySlider();
				timelineObj.slider = null;
				setTimeout(function() {
					$jq('.interactiveTimelineItem').css('width', 'auto');
					$jq('.bxslider-timeline').css('-webkit-transform', 'initial');
				}, 100);
			}
		}
	}
}

function bindTimelineMarkEvents() {
	$jq('.timeline-mark').click(function() {
		timelineObj.slider.goToSlide($jq(this).attr('data-item-index') - 1);
	});
}

function activateTimelineItem(actualTimelineItem) {
	var timelineYear = $jq('.timeline-arrow', actualTimelineItem).attr('data-timeline-year');
	actualTimelineItem.css('opacity', 1);
	$jq('h3, span, .item-content-wrapper', actualTimelineItem).addClass('active');
	
	unBindOnHashChange();
	window.location.hash = timelineYear;
	bindOnHashChange();
}

var checkDeepLinking = function() {
	var hash = window.location.hash;
	
	if (hash && hash != '#' && hash != '') {
		var timelineEl;
		hash = hash.replace('#', '');
		timelineEl = $jq('.timeline-arrow[data-timeline-year=' + hash + ']');
		
		if (timelineEl) {
			if (timelineObj.slider) {			
				var timelineIndex = timelineEl.attr('data-timeline-index');
				
				if (timelineIndex) {
					timelineObj.slider.goToSlide(parseInt(timelineIndex));
				}
			} else {
				$jq(window).scrollTop(timelineEl.offset().top - 70);
			}
		}
	}
}

function bindOnHashChange() {
	setTimeout(function() {
		if ("onhashchange" in window) {
			$jq(window).bind('hashchange', checkDeepLinking);
		}
	}, 200);
}

function unBindOnHashChange() {
	if ("onhashchange" in window) {
		$jq(window).unbind('hashchange', checkDeepLinking);
	}
}