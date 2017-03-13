var Aetna = Aetna || {};
Aetna.MegaMenu = Aetna.MegaMenu || {
	open : false,
	closeMegamenu : true,
	fireAnalytics : true,
	hasMegamenuItems : false
}

$(function(){
	var mblMenu = false;
	var topicLink = $('.topicLink');
	var menuOpen = false;
	var rightContentOpen = false;
	var mobileMenuWidth  = '-84.375%';
	var mobileContentWidth = '15.625%';
	var tabletSelectedSection = '';
	var clickedTopic;
	var tmrMenu;
	var tmrHoverMenu;
	// used for firefox dropdown issue
	var isCountySelectSelected = false;
	
	$.fn.cancelZoom = function()
    {
        return this.each(cancelZoom);
    };
 
    // Usage:
    $('input:text,select,textarea').cancelZoom();
	
    if (Aetna.isCQPreviewMode) {
	    $('.universalMenu nav').each(function(index, nav) {
	    	if (!$(this).hasClass('visible-phone')) {
	    		Aetna.MegaMenu.hasMegamenuItems = true;
	    	}
	    });
    } else {
    	Aetna.MegaMenu.hasMegamenuItems = true;
    }
    
    if (!Aetna.MegaMenu.hasMegamenuItems) {
    	$('.menuToggle').parent().addClass('visible-phone');
		$('.mainMenu li.divider').addClass('hidden');
    }
	
	$('.universalMenu.togglePanel').css({
		/*opacity:1,
		height:'auto',
		padding:'32px 0px 0px 0px'*/
	});
	
	$jq('.fixedHeaderWrap').zIndex(100);
	
	if(getWindowWidth() < 914){
		$jq('.content-wrapper').zIndex(0);
	}
	
	
	$("#globalSearch").focus(function(){
		$('html, body').animate({ scrollTop: $(".js-on").offset().top }, 0);$(".fixedHeaderWrap.removeMobile").addClass("lose").delay(501).queue(function(next){
		   $(this).removeClass("lose");
		    next();
			});
	
	  }).blur(function(){
	       $(".fixedHeaderWrap.removeMobile").removeClass("lose");
	 }); 
	
	//show/hide menu panel sections -- hiding after the dom is loaded for SEO/accessibility
	if (Aetna.isCQPreviewMode) {	
		$('.universalMenu,.togglePanelWrapper').hide();
	}
	
	$('html').click(function(){
		if($('.universalMenu').hasClass('open') && getWindowWidth() > 914 && Aetna.MegaMenu.closeMegamenu){
			currPanel = $('.universalMenu.open');
			menu = $('.menuToggle.active');
			menu.removeClass('active');
			//desktopToggleMenu(menu, currPanel);
		} else {
			Aetna.MegaMenu.closeMegamenu = true;
		}
	});
	$('.togglePanelWrapper, .menuToggle').click(function(e) {
		// Check if the actual clicked element has the interstitial class
		if (!$(e.target).hasClass('external')) {
			e.stopPropagation();
		}
	})
	//set mobile menu possibly on load
	setMenu();
	
	
	//check for mobile/desktop resets on screen resize
	if (Aetna.isCQPreviewMode) {
		$(window).resize(function(){
			var windowsWidth = getWindowWidth(); 
			setMenu();
			smallMenu();
			setHover(windowsWidth);
			
			if (windowsWidth > 914) {
				$('.removeMobile').addClass('fixedHeaderWrap');
			} else {
				$jq('.content-wrapper').zIndex(0);
			}
		});
		
		
	}
	
	
	// register/unregister hover for desktop view
	function setHover(windowsWidth) {
		$('.menuToggleItem').parent().unbind('mouseenter mouseleave');
		$('.togglePanelWrapper').unbind('mouseenter mouseleave');
		$('.pathSelector .right-link').unbind('mouseenter mouseleave');
		
		if (windowsWidth > 914) {
			$('.menuToggleItem').parent().hover(
				function(event) {
					var thisEl = $(this);
					tmrHoverMenu = setTimeout(function() {
						var menu = thisEl.find('a:first');
						clearTimeout(tmrMenu);
						togglesMenuContainer(menu, true);
					}, 500);					
				}, 
				function(event) {
					var menu = $(this);
					clearTimeout(tmrHoverMenu);
					tmrMenu = setTimeout(function() {
						togglesMenuContainer(menu,false);
					}, 150);
				}
			);
		
			// adds hover on menu panels items
			$('.togglePanelWrapper').on('mouseenter', function(e) {
				clearTimeout(tmrMenu);
			}).on('mouseleave', function(e) {
				var menu = $(this);
				tmrMenu = setTimeout(function() {
					togglesMenuContainer(menu,false);
				}, 150);
			});	
			
			$('.pathSelector .right-link').hover(
				function(event) {
					isCountySelectSelected = false;
					tmrHoverMenu = setTimeout(function() {
						togglesRightContainer(true);
					}, 500);
				}, 
				function(event) {
					if (!isCountySelectSelected) {
						clearTimeout(tmrHoverMenu);
						togglesRightContainer(false);
					}
					
					isCountySelectSelected = false;
				}
			);	
			
	
			// workaround to fix dropdown issue on firefox
			$('.right-content-panel select').hover(
				function(event) { 
					event.stopPropagation();
					isCountySelectSelected = true;
				}, 
				function(event) {
					// set to false after selecting option
					if(event.target.nodeName == 'OPTION') {
						isCountySelectSelected = false;
					}
				}
			);
			
		} 
	}
	
	// register clicks events for mega menu 
	function setClicks() {
		$('.menuToggleItem').click(function(event) {
			event.preventDefault();
			var menu = $(this);
			if(menuOpen) {
				// menu is shown, check if section clicked link is the same
				if(tabletSelectedSection ==  menu.attr("href")) {
					//another click to same section, redirect to section
					window.location = menu.attr("href");
				} else {
					togglesMenuContainer(menu, true);
				}
			} else {
				togglesMenuContainer(menu, true);
			}
		});
		
		$('.pathSelector li .arrowSmallDown').click(function(event) {
			event.preventDefault();
			var menu = $(this).parent().find('a:first');
			if(menuOpen && tabletSelectedSection ==  menu.attr("href")) {
				togglesMenuContainer(menu, false);
			} else {
				togglesMenuContainer(menu, true);
			}
		});		
		
		$('.pathSelector .right-link>a, .pathSelector .right-link>span').click(function(event) {
				event.preventDefault();
				if(rightContentOpen) {
					togglesRightContainer(false);
				} else {
					togglesRightContainer(true);
				}
			}
		);
		
		// set cookie to handle cross audience login references
		$('.right-content-panel .columnLinks a').click(function(event) {
				$jq.cookie('login-menu-open', 'true', { path: '/' });
			}
		);
		
		// add transparent overlay behind megamenu to click out and close megamenu
		$("body").append('<div id="overlay" style="display:none;background-color:transparent;position:absolute;top:0;left:0;height:100%;width:100%;z-index:8888"></div>');
		
		$('#overlay').click(function(event) {
			event.preventDefault();
			if(menuOpen) {
				togglesMenuContainer($(this), false);
			}
		}
	);		
		

	}	
	
	function setMenu() {	
		if(getWindowWidth() < 914) {
			$('.removeMobile').removeClass('fixedHeaderWrap');
			// MOBILE NAV
			if (!mblMenu) {
				mblMenu = true;
				mblMenuReset();
				
				topicLink.click(function(event) {
					event.preventDefault();
					//reset
					var thisIndex = topicLink.index(this);
					clickedTopic = $(this);
					mblTopicToggle(thisIndex, clickedTopic)
				});
				
				if (menuOpen) {
					$('body').addClass('mblMenuOpen');
					$('.togglePanelWrapper').show();
					$('.content-wrapper').css( 'marginLeft', mobileMenuWidth );
					//$('.menuToggle').removeClass('active');	
					if(!$('a.megaMenu.menuToggle').hasClass('active')){
						$('.menuToggle').removeClass('active');
						$('.megaMenu.menuToggle').addClass('active');
						var currPanel = $($('.universalMenu')[0]);
						currPanel.css('display', 'block');
						$($('.universalMenu')[1]).removeClass('open').hide();
						currPanel.addClass('open');
						
						//mblMenuToggle($('.megaMenu.menuToggle'), currPanel);
					}
					
								
				}
				
			}
		} else {
			topicLink.off('click');
			topicLink.parent().parent().find('ul').show();
		if (mblMenu) {
				mblMenu = false;
				$('body').removeClass('mblMenuOpen');
				$('.content-wrapper').css('marginLeft', '0');
				if (menuOpen) {
					//$('.universalMenu').show();
					//$('.togglePanel').addClass('open');
					//$('.menuToggle').addClass('active');
				};
			};
		}	
	} /*END setMenu()*/
	
	// 
	$('.menuToggle').click(function(event) {
		event.preventDefault();
		var menu = $(this);
		var menuLinkItem = menu.attr('data-menulinkitem');
		
		//add the active class to the clicked link & remove from others if any
		if(menu.hasClass('active')){
			menu.removeClass('active')
		}
		else{
			$('.menuToggle').removeClass('active')
			menu.addClass('active')
		}
		var currPanel = $($('.universalMenu')[0]);
		
		menuLinkItem = parseInt(menuLinkItem) + 1;
		
		//MOBILE MENU CLICK
		if (mblMenu) {
			mblMenuToggle(menu, currPanel);
		}
		else {
			//desktop menu toggle
			//toggle the menu and open appropriate panel for the clicked item
		  	desktopToggleMenu(menu, currPanel, menuLinkItem);
		}
		
		
	}); /*END menuToggle.click event handler*/


	if (Aetna.isCQPreviewMode) {
		// Add listeners for section menu hover
		setHover(getWindowWidth());	
		
		// Add listener for section click
		setClicks();
		
		// check cross reference if login menu was expanded and link to different audience was clicked
		var loginMenuExpanded = $jq.cookie('login-menu-open');
		if(loginMenuExpanded == 'true'){
			togglesRightContainer(true);
			
			// set back to false
			$jq.cookie('login-menu-open', 'false', { path: '/' });
		}		
	}

	
	// Toggles menu panel when hover on a main menu item
	function togglesMenuContainer(menu, isHoverIn) {
		var menuLinkItem = menu.attr('data-menulinkitem');
		
		//add the active class to the hover link & remove from others if any
		$('.pathSelector li').removeClass('active');
		$('.menuToggleItem').removeClass('active');
		if(isHoverIn) {		
			menu.parent().find("span.arrowSmallDown").removeClass("arrowUp");
			//if(isHoverIn){
				menu.addClass('active');
				menu.parent().addClass('active');
				menu.parent().find("span.arrowSmallDown").addClass("arrowUp");
				tabletSelectedSection = menu.attr("href");
			//}
			
			//var currPanel = $($('.universalMenu')[0]); // all submenus will be only in one panel
			
			//toggle the menu and open appropriate panel for the hover item
			menuLinkItem = parseInt(menuLinkItem) + 1;
		
			desktopShowMenu(menu, menuLinkItem);
			setQuickLinksHeight(menuLinkItem);
			
			// hide right login menu with if open
			togglesRightContainer(false);
			
			$("#overlay").show();
		} else {
			desktopHideMenu();
			$("#overlay").hide();
		}
		
		menuOpen = isHoverIn;
	}	
	
	function desktopShowMenu(menu, index){
		var currPanel = $($('.universalMenu')[0]); // all submenus in first panel
		
		// hide all menu panels
		$('.universalMenu').removeClass('open').hide();
		
		// show corresponding panel
		currPanel.addClass('open').show(0, function(){
//			Aetna.analytics.omniture.click(menu[0], 54);
		});
		
		// show menu container
		$('.togglePanelWrapper').show();
		
		// Set menu container with corresponding content for each section
		currPanel.find(".menu-container .row-fluid").addClass('hidden').hide();
		var menuPanel = ".menu-panel-"+ index;
		currPanel.find(menuPanel).removeClass('hidden').show();
	}		
	
	
	function desktopHideMenu(){
		var currPanel = $($('.universalMenu')[0]); // // all submenus in first panel
		if(currPanel.hasClass('open')){
			$('.togglePanelWrapper').animate({'height':'hide'}, 100, function(){
				currPanel.removeClass('open').hide();
				Aetna.MegaMenu.fireAnalytics = true;
			});
		}
		else if($('.togglePanel').hasClass('open')){
			$('.togglePanel.open').removeClass('open').fadeOut(700, function() {
				currPanel.addClass('open').fadeIn(700);
				Aetna.MegaMenu.fireAnalytics = true;
			});		
		}	
		
		// hide menu content for all sections
		currPanel.find(".menu-container .row-fluid").addClass('hidden');
	}		
	
	//Desktop menu toggle function
	function desktopToggleMenu(menu, currPanel, index){
		if(currPanel.hasClass('open')){
			$('.togglePanelWrapper').animate({'height':'toggle'}, 700, function(){
				currPanel.removeClass('open').hide("fast");
				menu.unbind('click', false);
				$("#overlay").remove();
				$('.headerBar').css({'top' : Aetna.MegaMenu.audienceBarHeight, 'position' : 'fixed'});
				Aetna.MegaMenu.fireAnalytics = true;
				
				currPanel.find(".menu-container .row-fluid").addClass('hidden');
			});
		}
		else if($('.togglePanel').hasClass('open')){
			$('.togglePanel.open').removeClass('open').fadeOut(700, function() {
				currPanel.addClass('open').fadeIn(700);
				menu.unbind('click', false);
				$("#overlay").remove();
				Aetna.MegaMenu.fireAnalytics = true;
			});		
		}
		else{
			var menuPanel = ".menu-panel-"+ index;
			currPanel.find(".menu-container .row-fluid").addClass('hidden');
			currPanel.find(menuPanel).removeClass('hidden');
			
			currPanel.addClass('open').show("fast", function(){				
				if (Aetna.MegaMenu.fireAnalytics) {
					// Aetna.analytics.omniture.click(this, 54);
				}
				Aetna.MegaMenu.fireAnalytics = true;
				
				smallMenu();
				
				$('.togglePanelWrapper').animate({'height':'toggle'}, 700, function(){
					menu.unbind('click', false);
					$("#overlay").remove();
				});
				$('.headerBar').css({'top' : 'inherit', 'position' : 'inherit'});
				$(window).scrollTop(0);
			});
		}
		menuOpen = !menuOpen; 
		
		Aetna.MegaMenu.open = !Aetna.MegaMenu.open; 
	}
	
	function mblMenuToggle(menu, currPanel){
		var offset  =  menuOpen == false ? mobileMenuWidth  : '0';
		
		if(menuOpen){
			$('body').removeClass('mblMenuOpen');
			$('.content-wrapper').css("margin-left", offset);
            $("#overlay").remove();
            $(".togglePanelWrapper.overthrow").delay( 500 ).css('display', 'none');
		}
		else{
			$(".togglePanel .menu-container .row-fluid.actual").removeClass('hidden');
			$('.content-wrapper').css("margin-left", offset);
			$('body').addClass('mblMenuOpen');
			$("#overlay").remove();
			$(".togglePanelWrapper.overthrow").css('display', 'block');
		}
		if (!menuOpen) {
			//$('.togglePanelWrapper').css('right','0');
			currPanel.css('display', 'block');
			$('.togglePanelWrapper').scrollTop(0);
			currPanel.addClass('open');
			$("#overlay").remove();
			Aetna.analytics.omniture.click(this, 54);
			
		}  else {
				window.setTimeout(function(){
					//$('.togglePanelWrapper,.universalMenu').css('right','-85%');
					$('.togglePanelWrapper').scrollTop(0);
					$('.togglePanel').removeClass('open');
					$("#overlay").remove();
					//reset
					topicLink.parent().parent().find('ul').hide();
					topicLink.parent().parent().removeClass('selectedTopic');
	  				topicLink.removeClass('topicLinkSelected');	
	  				topicLink.find('.topicPlus').removeClass('topicMinus');
				}, 0)
		}
		menuOpen = !menuOpen;
	}
	
	function mblTopicToggle(thisIndex, clickedTopic){
		var openedOffset = 0;

		topicLink.each(function( index ) {

			var thisTopic = $(this);

			//for scrollto when panel already opened
			if(thisTopic.parent().parent().hasClass('selectedTopic')){
				if (thisIndex > index) {
					openedOffset = thisTopic.parent().parent().find('ul').outerHeight(true); //use outerHeight to include pad/marg
				}
			}

		 	// if this topicLick clicked
		 	if (index == thisIndex) {
			  	//if unopened
			  	if (thisTopic.parent().parent().find('ul').css('display') == "none"){
			  		thisTopic.parent().parent().addClass('selectedTopic');
			  		thisTopic.addClass('topicLinkSelected');
			  		thisTopic.find('.topicPlus').addClass('topicMinus');	
			  		thisTopic.parent().parent().find('ul').slideToggle();

			  	//already open, close	
			  	} else {
			  		thisTopic.parent().parent().find('ul').slideToggle(400, function() {
			  			mblMenuReset()
			  		});
			  	}					  	
			//hide others	
			} else {
			  	thisTopic.parent().parent().find('ul').slideUp(400, function() {
			  		thisTopic.parent().parent().removeClass('selectedTopic');
			  		thisTopic.removeClass('topicLinkSelected');
			  		thisTopic.find('.topicPlus').removeClass('topicMinus');
			  	});
			}
		});
		//scrollToDiv(clickedTopic, openedOffset);
	}
	
	//RESET THE MOBILE MENU after it is closed or on screen resize from desktop to mobile
	function mblMenuReset(){
		topicLink.parent().parent().find('ul').hide();
		//remove any previously added styles
		topicLink.parent().parent().removeClass('selectedTopic');
		topicLink.removeClass('topicLinkSelected');	
		topicLink.find('.topicPlus').removeClass('topicMinus');
	}

	function scrollToDiv(element, openedOffset){
		if (openedOffset == undefined) {
			openedOffset = 0;
		} 
		var alreadyScrolled = $('.togglePanelWrapper').scrollTop();
		
		var offset = element.offset();
		var offsetTop = offset.top;
		var bodyScroll = $('body').scrollTop();
		var totalScroll = alreadyScrolled + offsetTop - openedOffset - bodyScroll;

		
		$('.togglePanelWrapper').animate({
				scrollTop: totalScroll
		}, 400);
	}
	
	function smallMenu(){
		if(getWindowWidth() > 914){
			winHt = $(window).height();
			//menuHt = $('.universalMenu.open').height();
			headBarHt = $('.headerBar').height() - Aetna.MegaMenu.audienceBarHeight;
			$('.universalMenu').css({
				'max-height': winHt-headBarHt-30+'px',
				'overflow-y': 'auto'
			});
			if($('.universalMenu.open').height() == winHt-headBarHt-30){
				$('header').addClass('headerShadow');
			}
			else{
				$('header').removeClass('headerShadow');
			}
			
		}
		else{
			$('.universalMenu').css({
				'max-height': '',
				'overflow-y': ''
			});
		}
	}
	
	function setScrollNav() {
		$(window).scroll(function() {		
			if (!Aetna.MegaMenu.open) {
				$('.headerBar').css({'top' : Aetna.MegaMenu.audienceBarHeight, 'position' : 'fixed'});
			} else {
				if ($(window).scrollTop() >= $('.togglePanelWrapper').height()) {
					$('.headerBar').css({'top' : Aetna.MegaMenu.audienceBarHeight, 'position' : 'fixed'});
				} else {
					$('.headerBar').css({'top' : 'inherit', 'position' : 'inherit'});
				}
			}
		});
	}
	
	function setQuickLinksHeight(indexPanel) {
		var menuPanel = ".menu-panel-" + indexPanel;
		var quickLinksAreaParent = $('.quickLinksArea', $(menuPanel)).parent();
		var panelObj;
		var panelHeight;
		
		// Check if the height is already set
		if (!quickLinksAreaParent.attr('data-height-set')) {
			quickLinksAreaParent.each(function() {
				var thisObj = $(this);
				var maxHeight = 0;
				
				$('> div', thisObj).each(function(index, elementPanel) {
					panelObj = $(elementPanel);
					panelHeight = panelObj.height();
					
					if (panelHeight > maxHeight && !panelObj.hasClass('quickLinksAreaContent')) {
						maxHeight = panelHeight;
					}
				});
				
				$('.quickLinksAreaContent', thisObj).height(maxHeight - 32);
				thisObj.attr('data-height-set', true);
			});
		}
	}
	
	if (Aetna.isCQPreviewMode) {		
		if (getWindowWidth() > 914) {
			setScrollNav();
		}
	} else {
		$('.headerBar').css('position', 'inherit');
	}
});

function getWindowWidth() {
	var windowWidth = $(window).width();
	
	if (window.innerWidth && window.innerWidth > windowWidth) {
		windowWidth = window.innerWidth;
	}
	
	return windowWidth;
}

//Toggles right content where login form is shown
function togglesRightContainer(isHoverIn) {
	//hide container
	$('.right-content-panel').addClass("hidden");
	$('.right-content-panel').stop(2).hide();
	$('.pathSelector .right-link').find("span").removeClass("arrowUp");
	if(isHoverIn){
		$('.right-content-panel').removeClass("hidden");
		$('.right-content-panel').stop(2).show();
		$('.pathSelector .right-link').find("span").addClass("arrowUp");
		var linkObj = $('.pathSelector .right-link>a');
//		Aetna.analytics.omniture.click(linkObj[0], 285);
	}
	
	rightContentOpen = isHoverIn;
}

if (navigator.userAgent.indexOf('MSIE 8.0') > -1) {
	(function(d,b){var c=b.documentElement;var a=b.body;var e=function(g,h,f){if(typeof g[h]==="undefined"){Object.defineProperty(g,h,{get:f})}};e(d,"innerWidth",function(){return c.clientWidth});e(d,"innerHeight",function(){return c.clientHeight});e(d,"scrollX",function(){return d.pageXOffset||c.scrollLeft});e(d,"scrollY",function(){return d.pageYOffset||c.scrollTop});e(b,"width",function(){return Math.max(a.scrollWidth,c.scrollWidth,a.offsetWidth,c.offsetWidth,a.clientWidth,c.clientWidth)});e(b,"height",function(){return Math.max(a.scrollHeight,c.scrollHeight,a.offsetHeight,c.offsetHeight,a.clientHeight,c.clientHeight)});return e}(window,document));
}

function cancelZoom()
{
    var d = document,
        viewport,
        content,
        maxScale = ',maximum-scale=',
        maxScaleRegex = /,*maximum\-scale\=\d*\.*\d*/;
 
    // this should be a focusable DOM Element
    if(!this.addEventListener || !d.querySelector) {
        return;
    }
 
    viewport = d.querySelector('meta[name="viewport"]');
    content = viewport.content;
 
    function changeViewport(event)
    {
        // http://nerd.vasilis.nl/prevent-ios-from-zooming-onfocus/
        viewport.content = content + (event.type == 'blur' ? (content.match(maxScaleRegex, '') ? '' : maxScale + 10) : maxScale + 1);
    }
 
    // We could use DOMFocusIn here, but it's deprecated.
    this.addEventListener('focus', changeViewport, true);
    this.addEventListener('blur', changeViewport, false);
}
