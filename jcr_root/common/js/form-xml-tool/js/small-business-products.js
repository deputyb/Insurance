var xmlRetrieved = "";
var cachedHtmlElements = {};
var linkAnalyticsStr = "Aetna.analytics.omniture.linkCode('aeCustLnk','Learn More',this);s.tl(this,'o',linkText,null,'navigate');return false;";
var pdfAnalyticsStr = "Aetna.analytics.omniture.linkCode('aeDownLnk','[Link Name]',this);s.tl(this,'o',linkText);";

if (Aetna.isCQPreviewMode) {
	$(function() {
		var toolSource = $('.tool-source a');
		toolSource.hide();
		
		if (toolSource.length > 0) {
			$.ajax({
				type: "GET",
				url: toolSource.attr('href'),
				dataType: "xml",
				success: function(xml) {
					var statesDropdownListEl = $('#cb-state');
					xmlRetrieved = xml;
							
					$(xml).find('business').each(function() {		
						$(this).find('state').each(function(){
							var stateName = $(this).attr('name');		
							var stateNameId = Aetna.FormXmlTool.normalizeId(stateName);
							
							statesDropdownListEl.append('<option value="' + stateNameId + '">' + stateName + '</option>');
						});
					});
		
					bindStateChangeEvent();
					bindInterstitial();
					checkDeepLinking();
					Aetna.FormXmlTool.bindOnHashChange();
				}
			});
		
			var bindStateChangeEvent = function() {
				$('#cb-state').change(function() {			
					var stateNameId = $(this).val();
					
					Aetna.FormXmlTool.unBindOnHashChange();
					window.location.hash = stateNameId;
					Aetna.FormXmlTool.bindOnHashChange();

					if (stateNameId != 'none') {
						var stateName = $("#cb-state option:selected").text();
						Aetna.analytics.omniture.linkCode('aeTMFNav','small-business:' + stateName + ':regex',this);
						s.tl(this,'o',linkText);
						
						if (!cachedHtmlElements[stateNameId]) {
							var stateEl = $('<div id="section-states-' + stateNameId + '" class="form-section"></div>');
							var sectionEl = null;
							var sectionHasForms = false;
							
							stateEl.append('<h4 class="state-name">' + stateName + '</h4>');
							
							$(xmlRetrieved).find('state[name="' + stateName +'"]').each(function() {
								if ($('section' , $(this)).length > 0) {
									sectionEl = $('<div class="accordion-container" id="accordion-' + Aetna.FormXmlTool.guid() + '"></div>');
								}
								
								if ($('super-section' , $(this)).length > 0) {
									$('super-section' , $(this)).each(function(indexSuperSection, elementSuperSection) {
										sectionEl = $('<div class="super-section"></div>');
										
										if (indexSuperSection != 0) {
											sectionEl.append('<p>&nbsp;</p>');
										}
										
										sectionEl.append('<h4>' + $('introduction-header' , $(elementSuperSection)).text() + '</h4>');
										sectionEl.append('<p>' + $('introduction-text' , $(elementSuperSection)).text() + '</p>');
										
										generateFormSectionContent($(this), stateEl, sectionEl);
									});
								} else {
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
														sectionWrapperEl.append(Aetna.FormXmlTool.processLink($(form), linkAnalyticsStr, pdfAnalyticsStr));
													});
												} else {
													sectionWrapperEl.append(Aetna.FormXmlTool.processLink($(childSection), linkAnalyticsStr, pdfAnalyticsStr));
												}			
											});
											
											sectionEl.append(sectionWrapperEl);
										}
									});
								}
								
								$('#forms-wrapper .row-fluid .span12').html(stateEl);
								
								if ($('section' , $(this)).length > 0) {
									if (sectionHasForms) {
										stateEl.append('<p>&nbsp;</p>');
									}
									
									stateEl.append(sectionEl);
									accordionInit(bindSmallBusinessAccordionBeforeActivateCallback);
								} else if ($('super-section' , $(this)).length == 0) {
									stateEl.addClass('frame');
								}
								
								cachedHtmlElements[stateNameId] = stateEl;
							});
						} else {
							$('#forms-wrapper .row-fluid .span12').html(cachedHtmlElements[stateNameId]);
							
							if ($('.accordion-container', cachedHtmlElements[stateNameId]).length > 0) {
								accordionInit(bindSmallBusinessAccordionBeforeActivateCallback);
							}
						}
					} else {
						$('.form-section').hide();
					}
				});
			}
			
			var bindSmallBusinessAccordionBeforeActivateCallback = function(event, ui) {
				var selectedStateText = $("#cb-state option:selected").text();
				if (ui.newPanel.context) {
					var selectedAcordionText = ui.newPanel.context.textContent;
					Aetna.analytics.omniture.linkCode('aeContExp',selectedStateText + ':' + selectedAcordionText,ui.newPanel);
					s.tl(ui.newPanel,'o',linkText);
				}
			}
			
			var generateFormSectionContent = function(el, stateEl, sectionEl) {
				var tempSectionEl = $('<div class="accordion-container" id="accordion-' + Aetna.FormXmlTool.guid() + '"></div>');
				
				el.children().each(function(indexChild, child) {
					if ($(child).is('form')) {
						sectionEl.append('<p>&nbsp;</p>');
						sectionEl.append(Aetna.FormXmlTool.processLink($(child), linkAnalyticsStr, pdfAnalyticsStr));
						sectionEl.append('<p>&nbsp;</p>');
						sectionHasForms = true;
					} else if ($(child).is('section')) {
						var sectionName = $(child).attr('name');
						var sectionWrapperEl = $('<div></div>');
						
						tempSectionEl.append('<h5 class="accheading">' + sectionName + '</h5>');
						
						$(child).children().each(function(indexChildSection, childSection) {
							if ($(childSection).is('subsection')) {
								if (indexChildSection != 0) {
									sectionWrapperEl.append('<p>&nbsp;</p>');
								}
								
								sectionWrapperEl.append('<p>' + $(childSection).attr('name') + '</p>');
								
								$(childSection).children().each(function(indexForm, form) {
									sectionWrapperEl.append(Aetna.FormXmlTool.processLink($(form), linkAnalyticsStr, pdfAnalyticsStr));
								});
							} else {
								sectionWrapperEl.append(Aetna.FormXmlTool.processLink($(childSection), linkAnalyticsStr, pdfAnalyticsStr));
							}			
						});
						
						tempSectionEl.append(sectionWrapperEl);
					}
				});
				
				if ($('section' , el).length > 0) {
					if (sectionHasForms) {
						stateEl.append('<p>&nbsp;</p>');
					}
					
					sectionEl.append(tempSectionEl);
					accordionInit(bindSmallBusinessAccordionBeforeActivateCallback);
				}
				
				stateEl.append(sectionEl);
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