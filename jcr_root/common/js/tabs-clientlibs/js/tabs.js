Aetna.Tabs = {
	init : function() {
		// Unbind the anchors click event
		$('.content-wrapper .tabs a[href^="#"]').unbind('click');
		
		// Initialize the tabs functionality
		$('.tabs .tabs-container').tabs();
		
		//Set size of tabs
		Aetna.Tabs.widthTabs();

		// Center the tabs
		Aetna.Tabs.centerTabs();
		$(window).resize(function() {
			Aetna.Tabs.centerTabs();
		});
	},
	centerTabs : function() {
		var tabHeight = $('.tabs .ui-tabs .ui-tabs-nav li').outerHeight();
		$('.tabs .ui-tabs .ui-tabs-nav li a').each(function(index, tab) {
			$(this).css('padding-top', '0');
			$(this).css('padding-bottom','0');
			var linkHeight = $(this).outerHeight();
			$(this).css('padding-top', (tabHeight - linkHeight) / 2);
			$(this).css('padding-bottom',(tabHeight - linkHeight) / 2);
		});
	},
	widthTabs: function() {
		$('.tabs .ui-tabs .ui-tabs-nav li').each(function(){
			var tabswidth= $($(this).parent()).width()
			var itemqty= $($(this).parent()).attr("itemqty");
			$(this).css("width", (98/ itemqty) + "%");
		});
	}

}

$(function() {
	if (Aetna.isCQPreviewMode) {		
		Aetna.Tabs.init();
	}
});