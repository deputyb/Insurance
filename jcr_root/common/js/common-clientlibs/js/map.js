/** Interactive map component initialization **/
(function($) {
	$.fn.interactiveMap = function(options){
		/*var defaults = {
			states: "az,de,fl"
		};
		var settings = $.extend({}, defaults, options);
		
		var statesOn = settings.states;
		statesOn = settings.states.split(',');
		*/
		$('.modIntMap .state:not(".on") a').click(function(e){
			e.preventDefault();
		});
		$('.modIntMap .state.on a').click(function(e){
			e.preventDefault();
			var state = $(this).parent('.state').attr("id");
			$('.infoBox').css('display','none');
			if(state != null){
				var position = $(this).position();
				var xPos = position.left;
				var yPos = position.top;
				$('.infoBox.'+state).css({
					'left':xPos,
					'top':yPos,
					'display':'block'
				});
			} 
		});	
		$('.modIntMap .close').click(function(e){
			e.preventDefault();
			$(this).parent('.infoBox').css('display','none');
		})
		$('.modIntMap select').change(function(){
			var state = $(this).val();
			$('.infoBox').css('display','none');
			if(state != null && $(window).width() > 1024){
				var position = $("#"+state+" a").position();
				var xPos = position.left;
				var yPos = position.top;
				$('.infoBox.'+state).css({
					'left':xPos,
					'top':yPos,
					'display':'block'
				});
			}
			else if(state != null && $(window).width() <= 1024){
				$('.infoBox.'+state).css({
					'display':'block',
					'left':'',
					'top':'20px'
				});
			}
			$(this).trigger('blur');
			Aetna.analytics.omniture.click(this, 187, state);
		});
		$(window).resize(function(){
			if($(window).width() <= 1024){
				$('.infoBox').css({
					'left':'',
					'top':'20px'
				});
			}
			
			
		})
		
		
	}
}( jQuery ));
(function($) {
	$(document).ready(function(){
		$('.modIntMap').interactiveMap();
	});
}( jQuery ));
