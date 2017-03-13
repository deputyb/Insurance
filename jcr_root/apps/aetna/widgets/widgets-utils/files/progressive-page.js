Aetna.ProgressivePage = {
	emptyPlaceholder : '[empty]',
	
	hideConfigurationTabs : function(field) {	
		var tabPanel = field.findParentByType('tabpanel');
		var yesNoQuestionTab = tabPanel.find('title', 'Yes/No Question')[0];
		var zipCodeInputTab = tabPanel.find('title', 'ZIP Code Input')[0];
		var fieldValue = field.getValue();

		// Make all the fields visible
		this.showYesNoQuestionTab(yesNoQuestionTab);
		this.showZipCodeInputTab(zipCodeInputTab);
		
		// Check the selected value to show the proper content
		if (fieldValue == '') {
   			this.hideYesNoQuestionTab(yesNoQuestionTab);
   			this.hideZipCodeInputTab(zipCodeInputTab);
		} else if (fieldValue == 'yesnoquestion') {
			this.hideZipCodeInputTab(zipCodeInputTab);
		} else if (fieldValue == 'zipcodeinput') {
			this.hideYesNoQuestionTab(yesNoQuestionTab);
        }
	},
	
	showYesNoQuestionTab : function(yesNoQuestionTab) {
		$(yesNoQuestionTab.tabEl).show();
		
		this.clearFieldValue(yesNoQuestionTab, './questionlabel');
		this.clearFieldValue(yesNoQuestionTab, './yeslabel');
		this.clearFieldValue(yesNoQuestionTab, './nolabel');
	},
	
	showZipCodeInputTab : function(zipCodeInputTab) {
		$(zipCodeInputTab.tabEl).show();
		
		this.clearFieldValue(zipCodeInputTab, './zipcodetext');
		this.clearFieldValue(zipCodeInputTab, './countydropdowndefaultoption');
		this.clearFieldValue(zipCodeInputTab, './submitbuttonlabel');
		this.clearFieldValue(zipCodeInputTab, './submitbuttonerrormessage');
		this.clearFieldValue(zipCodeInputTab, './submitbuttonerrormessageinvalidzip');
	},
	
	hideYesNoQuestionTab : function(yesNoQuestionTab) {
		$(yesNoQuestionTab.tabEl).hide();
		
		this.setFieldEmptyPlaceholder(yesNoQuestionTab, './questionlabel');
		this.setFieldEmptyPlaceholder(yesNoQuestionTab, './yeslabel');
		this.setFieldEmptyPlaceholder(yesNoQuestionTab, './nolabel');
	},
	
	hideZipCodeInputTab : function(zipCodeInputTab) {
		$(zipCodeInputTab.tabEl).hide();
		
		this.setFieldEmptyPlaceholder(zipCodeInputTab, './zipcodetext');
		this.setFieldEmptyPlaceholder(zipCodeInputTab, './countydropdowndefaultoption');
		this.setFieldEmptyPlaceholder(zipCodeInputTab, './submitbuttonlabel');
		this.setFieldEmptyPlaceholder(zipCodeInputTab, './submitbuttonerrormessage');
		this.setFieldEmptyPlaceholder(zipCodeInputTab, './submitbuttonerrormessageinvalidzip');
	},
	
	clearFieldValue : function(container, fieldName) {		
		this.setFieldValue(container, fieldName, this.emptyPlaceholder, '');
	},
	
	setFieldEmptyPlaceholder : function(container, fieldName) {
		this.setFieldValue(container, fieldName, '', this.emptyPlaceholder);
	},
	
	setFieldValue : function(container, fieldName, comparissonValue, notDefaultValueStr) {
		var field = container.find('name', fieldName)[0];
		var fieldValue = field.getValue();
		
		if (fieldValue == comparissonValue) {
			if (field.defaultValue) {
				fieldValue = field.defaultValue;
			} else {
				fieldValue = notDefaultValueStr;
			}
			
			field.setValue(fieldValue); 
		}
	}
}