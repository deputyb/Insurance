Aetna.Global = {
	Geolocation : {
		deactivateSafariCheckboxListener : function(field) {
			var deactivateSafariGeolocationFieldArray = field.findParentByType('dialogfieldset').find('name', './deactivatesafarigeolocation');
			var isChecked = field.getValue()[0] == 'true';
			
			// Check if the deactivate Safari field exists
			if (deactivateSafariGeolocationFieldArray && deactivateSafariGeolocationFieldArray.length > 0) {
				// Check if the checkbox is checked
				if (isChecked) {
					deactivateSafariGeolocationFieldArray[0].setVisible(true);
				} else {
					deactivateSafariGeolocationFieldArray[0].setVisible(false);
					deactivateSafariGeolocationFieldArray[0].setValue(false);
				}
			}
		}
	}
}