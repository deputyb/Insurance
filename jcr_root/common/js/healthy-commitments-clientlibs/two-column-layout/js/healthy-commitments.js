Aetna.HealthyCommitments = {
	init: function() {
		Aetna.HealthyCommitments.placeTwoColumnBottomImage();
		setTimeout(Aetna.HealthyCommitments.placeTwoColumnBottomImage, 1000);
		
		$(window).resize(function() {
			Aetna.HealthyCommitments.placeTwoColumnBottomImage();
		});
	},
	placeTwoColumnBottomImage : function() {
		$('.twoColumnLayout .image-bottom').each(function() {
			var componentContainer = $(this).closest('.row-fluid');
			var columnContainer = $(this).parent();
			
			$('img', this).css('bottom', -(componentContainer.outerHeight() - 
						columnContainer.outerHeight() - parseInt(componentContainer.css('padding-bottom').replace('px', ''))));
		});
	}
}

$(function() {
	Aetna.HealthyCommitments.init();
});