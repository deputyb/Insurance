if (Aetna.isCQPreviewMode) {
	$(function() {
		var toolSource = $('#aetna-tool-source');
		
		if (toolSource.length > 0) {
			$.ajax({
				type: "GET",
				url: toolSource.attr('src'),
				dataType: "xml",
				success: function(xml) {
					var linkAnalyticsStr = "Aetna.analytics.omniture.linkCode('aeCustLnk','Learn More',this);s.tl(this,'o',linkText,null,'navigate');return false;";
					var pdfAnalyticsStr = "Aetna.analytics.omniture.linkCode('aeDownLnk','[Link Name]',this);s.tl(this,'o',linkText);";
					var stateDropdownListEl = $('#cb-state');
							
					$(xml).find('state').each(function() {	
						var stateName = $(this).attr('name');
						var stateId = Aetna.FormXmlTool.normalizeId(stateName.replace("/",""));
						var stateEl = $('<div id="section-state-' + stateId + '" class="form-section"></div>');
						var sectionEl = null;
						var sectionHasForms = false;
						
						stateEl.hide()
						.append('<h4 class="state-name">' + stateName + '</h4>');
					
						if ($('section' , $(this)).length > 0) {
							sectionEl = $('<div class="accordion-container" id="accordion-' + Aetna.FormXmlTool.guid() + '"></div>');
						}						

						$(this).children().each(function(indexChild, child) {
							if ($(child).is('form')) {
								stateEl.append(Aetna.FormXmlTool.processLink($(child), linkAnalyticsStr, pdfAnalyticsStr));
								sectionHasForms = true;
							} else if ($(child).is('section')) {
								var sectionName = $(child).attr('name');
								var sectionWrapperEl = $('<div></div>');
								
								sectionEl.append('<h5 class="accheading">' + sectionName + '</h5>');
								
								$(child).children().each(function(indexChildSection, childSection) {
									if ($(childSection).is('subsection')) {
										if (indexChildSection != 0) {
											sectionWrapperEl.append('<p>&nbsp;</p>');
										}
										
										sectionWrapperEl.append('<p>' + $(childSection).attr('name') + '</p>');
										
										$(childSection).children().each(function(indexForm, form) {
											sectionWrapperEl.append(Aetna.FormXmlTool.processLink($(form)));
										});
									} else {
										sectionWrapperEl.append(Aetna.FormXmlTool.processLink($(childSection)));
									}			
								});
								
								sectionEl.append(sectionWrapperEl);
							}
						});
						
						if ($('section' , $(this)).length > 0) {
							if (sectionHasForms) {
								stateEl.append('<p>&nbsp;</p>');
							}
							
							stateEl.append(sectionEl);
						} else {
							stateEl.addClass('frame');
						}
						
						$('#forms-wrapper .row-fluid .span12').append(stateEl);			
						stateDropdownListEl.append('<option value="' + stateId + '">' + stateName + '</option>');						
					});
					
					bindStateChangeEvent();
					bindInterstitial();
					checkDeepLinking();
					Aetna.FormXmlTool.bindOnHashChange();
				}
			});
		
			var bindStateChangeEvent = function() {
				$('#cb-state').change(function() {			
					var selectedState = $(this).val();

					if (selectedState != 'select-your-state') {
						var selectedStateText = $("#cb-state option:selected").text();
						/*Aetna.analytics.omniture.linkCode('aeTMFNav','small-business:' + selectedStateText + ':regex',this);
						s.tl(this,'o',linkText);*/
						$('.form-section').hide();
						$('#smiley').hide();
						$('#section-state-' + selectedState).show();
					} else {
						$('.form-section').hide();
						$('#smiley').show();
					}
					
					Aetna.FormXmlTool.unBindOnHashChange();
					window.location.hash = selectedState;
					Aetna.FormXmlTool.bindOnHashChange();
				});
			}			
		}
	});
}

var checkDeepLinking = function() {
	var hash = window.location.hash;
	
	if (hash && hash != '#' && hash != '') {
		hash = hash.replace('#', '');
		
		$('#cb-state').val(hash);
		$('#cb-state').trigger('change');
	}
}