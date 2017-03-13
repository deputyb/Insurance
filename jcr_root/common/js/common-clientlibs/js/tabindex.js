var Aetna = Aetna || {};

Aetna.TabIndex = function() {
	Aetna.TabIndex.counter = 1;
	var TAB_INDEX_ATTR = 'tabindex';
	
	var clearTabIndexes = function(context) {
		if (!context) {
			context = $('body');
		}
		
		$('*', context).each(function() {
			$(this).removeAttr(TAB_INDEX_ATTR);
		});
	};
	
	var setTabIndexes = function(elements) {
		elements.each(function() {
			$(this).attr(TAB_INDEX_ATTR, Aetna.TabIndex.counter++);
		})
	};
	
	var setSkipToMainContentTabIndex = function() {
		var skipMainLink = $('.skip-main'); 
		var mainContent = $('#main');
		var mainContentOffsetTop = mainContent.offset().top;
		var headerHeight = $('.pathSelector').outerHeight() +
			$('.headerBar').outerHeight();
		var animationSpeed = 1;
		
		setTabIndexes(skipMainLink);
		mainContent.attr(TAB_INDEX_ATTR, '-1');
		
		// Make the scroll animation only when it's different than 0
		if (mainContentOffsetTop != headerHeight) {
			animationSpeed = 400;
		}

		skipMainLink.click(function() {
			$('html, body').animate({scrollTop: mainContentOffsetTop - headerHeight}, animationSpeed);
		});
	};
	
	var setHeaderBarIndexes = function() {
		setTabIndexes($('.headerBar a:visible'));
	};
	
	var setDesktopMegamenuTabIndexes = function() {
		setTabIndexes($('.searchformdesktop input'));
		
		$('.pathSelector li a, .pathSelector .right-link a:first').each(function() {
			var thisEl = $(this);
			var menuLinkItemId = thisEl.attr('data-menulinkitem');
			
			// Set the main mega menu section link tabindex
			setTabIndexes(thisEl);
			
			if (menuLinkItemId) {
				var menuPanelIndex = parseInt(menuLinkItemId) + 1;
				
				// Set the tabindex to the links inside the mega menu section 
				setTabIndexes($('a[href]', $('.menu-panel-' + menuPanelIndex)));
			}
			
			thisEl.keydown(function(e) {
				var keyCode = e.keyCode;
				
				// Check if the key code is valid
				if (keyCode == 0) {
					keyCode = e.charCode;
				}
				
				// Check if the pressed key is the up or down arrows
				if (keyCode == 38) {
					e.preventDefault();
					thisEl.parent().mouseleave();
				} else if (keyCode == 40) {
					e.preventDefault();
					thisEl.parent().mouseenter();
				}
			});
		});
	};
	
	var setMobileMegamenuTabIndexes = function() {
		setTabIndexes($('.searchformmobile input'));
		setTabIndexes($('.universalMenu .default .currPath a'));
		
		$('.universalMenu .default .topicLink').each(function() {
			var thisEl = $(this);
			setTabIndexes(thisEl);
			
			thisEl.parent().siblings().each(function(index, sibling) {
				setTabIndexes($('a', $(sibling)));
			});
		});
		
		setTabIndexes($('.mobileSubnav .megaMenuLink a'));
		
		$('.topicLink').on('keypress', function(e) {
			var keyCode = e.keyCode;
			
			// Check if the key code is valid
			if (keyCode == 0) {
				keyCode = e.charCode;
			}
			
			if (keyCode == 13) {
				$(this).click();
			}
		});
	};
	
	var setAccordionTabIndexes = function() {
		var accordions = $('.accordion');
		
		// Check if there are accordions in the page
		if (accordions.length > 0) {
			accordions.each(function() {
				var accordionHeader;
				
				// Set the breadcrumb links indexes first
				setTabIndexes($('.breadcrumb a'));
				
				// Set the links before the accordion
				$('#main .section').each(function() {
					var thisEl = $(this);
					
					// Check if the section is the accordion to break the loop
					if (thisEl.hasClass('accordion')) {
						return false;
					} else {
						setTabIndexes($('a', thisEl));
					}
				});
				
				// Set the accordion header tab and the links inside each accordion item
				$('.ui-accordion-header', $(this)).each(function() {
					accordionHeader = $(this);
					setTabIndexes(accordionHeader);
					setTabIndexes($('a', accordionHeader.next()));
				});
			});
		}
	};
	
	this.init = function() {
		clearTabIndexes();
		setSkipToMainContentTabIndex();
		setHeaderBarIndexes();
		
		if ($(window).width() <= 767) {
			setMobileMegamenuTabIndexes();
		} else {
			setDesktopMegamenuTabIndexes();
		}
		
		setAccordionTabIndexes();
	}
}

$(function() {$("#interClose").focus();});

$(function() {
	if (Aetna.isCQPreviewMode) {
		var tabIndex = new Aetna.TabIndex();
		tabIndex.init();
	}
});