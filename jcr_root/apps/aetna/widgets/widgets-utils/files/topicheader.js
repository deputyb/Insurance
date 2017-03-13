Aetna.Topic = {
	hideImageTab : function(dialog) {
		var mobileTab = dialog.find("title", "Mobile Image");
		var mobileImage = mobileTab[0];
		
		// Check if the mobile image is configured
		if (!mobileImage.hasData()) {
			$(mobileTab[0].tabEl).hide();
		}
	}
}