Aetna.VideoUtils = {
	manageConfigurationTabs : function(widget) {
		var tabPanel;
		var fieldValue;
		
		// Check the widget type to see how to evaluate the fields
		if (widget.getXType() == 'dialog') {
			tabPanel = widget.find('xtype', 'tabpanel')[0];
			fieldValue = tabPanel.find('name', './videotype')[0].getValue();
		} else {
			tabPanel = widget.findParentByType('tabpanel');
			fieldValue = widget.getValue();
		}
		
		var setRequiredFieldsValues = function(requiredFields, value) {
			var actualFieldValue;
			
			for (var indexRequiredField = 0; indexRequiredField < requiredFields.length; indexRequiredField++) {
				actualFieldValue = requiredFields[indexRequiredField].getValue(); 

				if (actualFieldValue == '' || actualFieldValue == '.') {
					requiredFields[indexRequiredField].setValue(value);
				}
			}
		}
		
		var manageTab = function(tab, visible) {
			var requiredFields = tab.find('allowBlank', false);
			var tabEl = $(tab.tabEl);
			
			if (visible) {
				tabEl.show();
				
				setRequiredFieldsValues(requiredFields, '');
			} else {
				tabEl.hide();
				
				setRequiredFieldsValues(requiredFields, '.');
			}		
		};
		
		var manageFileVideoTab = function(visible) {
			var videoConfigurationTab = tabPanel.find('title', 'Video Configuration')[0];
			var videoImageTab = tabPanel.find('title', 'Image')[0];
			
			manageTab(videoConfigurationTab, visible);
			manageTab(videoImageTab, visible);
		}
		
		var manageYouTubeTab = function(visible) {
			var youTubeTab = tabPanel.find('title', 'YouTube Configuration')[0];
			
			manageTab(youTubeTab, visible);
		}
		
		// Check which tab to display
		if (fieldValue == 'youtube') {
			manageFileVideoTab(false);
			manageYouTubeTab(true);
		} else {
			manageFileVideoTab(true);
			manageYouTubeTab(false);
		}
	}
}