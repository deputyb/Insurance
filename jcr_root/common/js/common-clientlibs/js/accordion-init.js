/** Accordiong component initialization **/
Aetna.Accordion = {
	hashValue: null,
	instance: null,
	onHashChange: function() {
		if ("onhashchange" in window) {
			$(window).bind('hashchange', Aetna.Accordion.openDeepLink);
		}
	},
	openDeepLink: function() {
		Aetna.Accordion.hashValue = Aetna.Accordion.getHashValue();
		
		if (Aetna.Accordion.hashValue) {
			var activeItem = parseInt(Aetna.Accordion.hashValue);
			
			// Check if the hash is a position or a value
			if (isNaN(activeItem)) {
				$('.ui-accordion-header', Aetna.Accordion.instance).each(function(index) {
					if ($(this).attr('data-deep-link') == Aetna.Accordion.hashValue) {
						activeItem = index;
						return false;
					}
				});
			}
			
			Aetna.Accordion.instance.accordion("option", "active", activeItem);
		}
	},
	getHashValue: function() {
		var hash = window.location.hash;
		
		if (hash && hash != '#' && hash != '') {
			return hash.replace('#', '');
		}
	}
}

$jq(function() {
	accordionInit();
});

function accordionInit(accordionBeforeActivateCallback) {
	if (Aetna.isCQPreviewMode) {
		Aetna.Accordion.hashValue = Aetna.Accordion.getHashValue();
		var activeItem = false;
		var accordionUseDeeplinking = false;
		var accordionContainers = $jq('.accordion-container'); 
		
		if (accordionContainers.length > 0) {
			accordionContainers.each(function(index, element){			
				$jq(element).accordion({ 
					header: 'h5.accheading', 
					collapsible: true,
					animated: 'slide',
					clearStyle: true,
					active: false,
					autoHeight:false,
					heightStyle:'content',
					activate : function (event, ui){
						if ($jq(element).attr('data-track-analytics-expansion')) {
							accordionTrackAnalyticsExpansion(event, ui)
						}
						
						if(ui.newHeader.offset() != undefined){
							if($(window).width() > 768){
								window.scrollTo(0, ui.newHeader.offset().top-144);
								ui.newPanel.css('height',''); 
							}
							else{
								window.scrollTo(0, ui.newHeader.offset().top-60);  
								ui.newPanel.css('height','');
							}
						}
						
						if (ui.oldHeader.length > 0) {
							ui.oldHeader.attr('tabindex', ui.oldHeader.attr('data-tabindex'));
						}
						
						if (ui.newHeader.length > 0) {
							ui.newHeader.attr('tabindex', ui.newHeader.attr('data-tabindex'));
						}
					},
					beforeActivate: function(event, ui) {
						ui.newHeader.attr('data-tabindex', ui.newHeader.attr('tabindex'));
						if (accordionBeforeActivateCallback) {
							accordionBeforeActivateCallback(event, ui);
						}
					}
				});
				
				accordionUseDeeplinking = $jq(element).attr('data-deep-linking');
				
				if (accordionUseDeeplinking) {
					Aetna.Accordion.instance = $jq(element);
					
					Aetna.Accordion.openDeepLink();				
					Aetna.Accordion.onHashChange();
				}
			});
			
			$('.accordion-container h2, .accordion-container h3').click(function(){
				collapseAllButClicked($jq(this).parent());			
			});
		}
	}
}

function collapseAllButClicked(element) {
	var currAccordion = element.attr("id");
	$jq('.accordion-container').not(document.getElementById(currAccordion)).accordion({ active : false });
}
function showAccordionTop(element) {
	window.scrollTo(0, element.offset().top);
}
function accordionTrackAnalyticsExpansion(event, ui) {
	if (ui.newHeader.length > 0 && ui.newPanel.length > 0) {
		Aetna.analytics.omniture.linkCode('aeContExp',ui.newHeader.text(),this);
		s.tl(this,'o',linkText);
	}
}