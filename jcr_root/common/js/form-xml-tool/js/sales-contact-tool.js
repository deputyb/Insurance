var jsonFormDefinition = {};
var xmlRetrieved = "";
Aetna.FormXmlTool.deepliking = true;

$jq(function() {
	if (Aetna.isCQPreviewMode) {
		var isIE8 = navigator.userAgent.indexOf('MSIE 8.0') >= 0;
		var toolSource = $jq('.tool-source a');
		
		if (toolSource.length > 0) {			
			$jq('#smiley img').attr('src', $jq('.tool-image img').attr('src'));
			
			$jq.ajax({
				type: "GET",
				url: toolSource.attr('href'),
				dataType: "xml",
				success: function(xml) {
					xmlRetrieved = xml;
					var businessSelectEl = $jq('#cb-business');

					businessSelectEl.append('<option value="none">Select a business segment</option>');
					
					$jq(xml).find('business').each(function(){
						var businessName = $jq(this).attr('name');
						var businessNameId = Aetna.FormXmlTool.normalizeId(businessName);
						var jsonBusiness = {
								name: businessName,
								states: []
						};
		
						businessSelectEl.append('<option value="' + businessNameId + '">' + businessName + '</option>');
		
						jsonFormDefinition[Aetna.FormXmlTool.normalizeId(businessName)] = jsonBusiness;
					});
		
					bindStateChangeEvent();
					bindBusinessChangeEvent();
					checkDeepLinking();
					Aetna.FormXmlTool.bindOnHashChange();
				}
			});
		
			var bindBusinessChangeEvent = function() {
				$jq('#cb-business').change(function() {
					var selectedBusiness = $jq('#cb-business option:selected').text();
					var selectedBusinessValue = $jq('#cb-business').val();
					
					if (Aetna.FormXmlTool.deepliking) {
						Aetna.FormXmlTool.unBindOnHashChange();
						window.location.hash = selectedBusinessValue;
						Aetna.FormXmlTool.bindOnHashChange();
					}
					
					if (selectedBusinessValue != 'none') {
						var business = $jq(xmlRetrieved).find('business[name="'+selectedBusiness+'"]');
						
						if (business.attr('special-business')) {
							$jq('#cb-state').empty()
								.attr('disabled', 'disabled');
							
							var selectedBusiness = $jq('#cb-business').val();
							var selectedBusinessText = $jq('#cb-business option:selected').text();
							var businessNameId = Aetna.FormXmlTool.normalizeId(selectedBusinessText);
				
							$jq('.form-section').hide();
							
							var stateEl = $jq('<div id="section-' + businessNameId + '" class="form-section"></div>');

							$jq(xmlRetrieved).find('business[name="'+ selectedBusinessText +'"]').each(function(){
								stateEl.append(processBusinessRenderization(this, stateEl));							
							});
							
							$jq('#forms-wrapper .row-fluid .span12').empty().append(stateEl);

                            if (!isMobileBrowser()) {
                            	$jq('a[href^="tel:"]').removeAttr("href");
							}
							
							stateEl.show();
							$jq('#smiley').hide();
							
							Aetna.analytics.omniture.linkCode('aeTMFNav',selectedBusinessText,this);
							s.tl(this,'e',linkText);
							return;
						} else {
							$jq('#cb-state').empty()
								.append('<option value="none">Refine by</option>');
	
							business.find('state').each(function(){
								var stateName = $jq(this).attr('name');
								var stateId = Aetna.FormXmlTool.normalizeId(stateName);
	
								$jq('#cb-state').append('<option value="' + stateId + '">' + stateName + '</option>');
							});
							
							$jq('#cb-state').removeAttr('disabled');
						}
					} else {
						$jq('#cb-state').empty()
							.append('<option value="none">Refine by</option>')
							.attr('disabled', 'disabled');				
					}
					
					$jq('#smiley').show();
					$jq('.form-section').hide();
				});
			}
		
			var bindStateChangeEvent = function() {
				$jq('#cb-state').change(function() {			
					var selectedState = $jq(this).val();
					var selectedBusiness = $jq('#cb-business').val();
					
					Aetna.FormXmlTool.unBindOnHashChange();
					window.location.hash = selectedBusiness + '|' + selectedState;
					Aetna.FormXmlTool.bindOnHashChange();
					
					if (selectedState != 'none') {
						var selectedBusinessText = $jq('#cb-business option:selected').text();
						var selectedStateText = $jq('#cb-state option:selected').text();
						var businessNameId = Aetna.FormXmlTool.normalizeId(selectedBusinessText);
			
						$jq('.form-section').hide();
						
						var stateNameId = Aetna.FormXmlTool.normalizeId(selectedStateText);
						var stateEl = $jq('<div id="section-' + businessNameId + '-' + stateNameId + '" class="form-section"></div>');

						$jq(xmlRetrieved).find('business[name="'+ selectedBusinessText +'"]').find('state[name="'+ selectedStateText +'"]').each(function(){
							stateEl.append(processBusinessRenderization(this, stateEl));							
						});
						
						$jq('#forms-wrapper .row-fluid .span12').empty().append(stateEl);

						$jq('#section-' + selectedBusiness + '-' + selectedState).show();

                        if (!isMobileBrowser()) {
                        	$jq('a[href^="tel:"]').removeAttr("href");
						}
						
						$jq('#smiley').hide();
						
						Aetna.analytics.omniture.linkCode('aeTMFNav',selectedBusinessText + ':' + selectedStateText,this);
						s.tl(this,'e',linkText);
					} else {
						$jq('#smiley').show();
						$jq('.form-section').hide();
					}
				});
			}
			
			var processBusinessRenderization = function(info, stateEl) {
				// Generate the headers
				var headers = generateHeaders(info);
				
				// Determine the layout to render
				var layoutToRender = determineLayoutToRender(headers);
				
				if (layoutToRender == 1) {
					return processSmallGroupHTML(headers, info, stateEl);
				} else if (layoutToRender == 2) {
					return processIndividualHTML(headers, info, stateEl);
				} else if (layoutToRender == 6) {
					return processMedicareHTML(headers, info, stateEl);
				} else {
					return processCommonHTML(headers, info, stateEl);
				}
			}
			
			var generateHeaders = function(info) {
				var headers = [];

				$jq('entry', $jq(info)).each(function(index, element) {					
					if (index == 0) {
						$jq('value', $jq(element)).each(function(indexValue, elementValue) {
							headers.push($jq(elementValue).attr('name'));
						});
					}
				});
				
				return headers;
			};
			
			var processSmallGroupHTML = function(headers, info, stateEl) {				
				stateEl.append('<div class="span3 pt30 m0 hidden-phone">' + 
						'<h5 class="noMargin grey">' + headers[1] + ':</h5></div>');
				stateEl.append('<div class="span9 pt30 m0 hidden-phone">' + 
						'<h5 class="noMargin grey">' + headers[0] + ':</h5></div>');
				
				$jq('entry', $jq(info)).each(function(index, element) {
					var values = $jq('value', $jq(element));
					var wrapperEl = $jq('<div style="display: inline-block; width: 100%;"></div>');
					var prompt = '';
					
					var states = $jq(values[2]).text().split(', ');
					var statesEl = $jq('<div class="span9 pt30 m0"><h5 class="noMargin grey visible-phone heading-space">' + headers[0] + ':</h5></div>');
					var statesPanels = [$jq('<div class="span3 hidden-phone" style="padding-left: 0;"></div>'), 
					                    $jq('<div class="span3 hidden-phone" style="padding-left: 0;"></div>'),
					                    $jq('<div class="span3 hidden-phone" style="margin-right: 0px; padding-left: 0;"><div>')];
					var statesPanelsMobile = $jq('<div class="span3 pt30 m0 visible-phone heading-space" style="padding-top: 0!important;"></div>');
					                    
					if (values.length == 4) {
						prompt = '<br/>Prompt: ' + $jq(values[3]).text();
					}
					
					wrapperEl.append('<div class="span3 pt30 m0">' +
							'<h5 class="noMargin grey visible-phone heading-space">' + headers[1] + ':</h5><h5 class="noMargin">' + 
							'<a class="mobileNumber" href="tel:' + $jq(values[1]).text() + '">' + $jq(values[1]).text() +
							'</a>' + prompt + '</h5></div>');
					
					for (var indexState = 0; indexState < states.length; indexState++) {
						statesPanels[indexState % statesPanels.length].append(
								'<p>' + states[indexState] + '</p>');
						statesPanelsMobile.append('<p>' + states[indexState] + '</p>');
					}
					
					for (var indexStatePanel = 0; indexStatePanel < statesPanels.length; indexStatePanel++) {
						statesEl.append(statesPanels[indexStatePanel]);
					}
					
					wrapperEl.append(statesEl);
					wrapperEl.append(statesPanelsMobile);
					stateEl.append(wrapperEl);
				});
				
				return stateEl;
			};
			
			var processIndividualHTML = function(headers, info, stateEl) {								
				stateEl.append('<div class="span3 pt30 m0 hidden-phone">' + 
						'<h5 class="noMargin grey">' + headers[0] + ':</h5></div>');
				stateEl.append('<div class="span3 pt30 m0 hidden-phone">' + 
						'<h5 class="noMargin grey">' + headers[1] + ':</h5></div>');
				stateEl.append('<div class="span3 pt30 m0 hidden-phone">' + 
						'<h5 class="noMargin grey">' + headers[2] + ':</h5></div>');
				stateEl.append('<div class="span3 pt30 m0 hidden-phone">' + 
						'<h5 class="noMargin grey">' + headers[3] + ':</h5></div>');
				
				$jq('entry', $jq(info)).each(function(index, element) {
					var values = $jq('value', $jq(element));
					var indexCell = 0;
					var wrapperEl = $jq('<div style="display: inline-block; width: 100%;"></div>');
					var statesEl = $jq('<div class="span3 pt30 m0">' +
							'<h5 class="noMargin grey visible-phone heading-space">' + headers[3] + ':</h5></div>');
					var states;
					var email;
					
					var phoneNumber = $jq(values[1]).text().split('(');
					
					wrapperEl.append('<div class="span3 pt30 m0">' + 

							'<h5 class="noMargin grey visible-phone heading-space">' + headers[0] + ':</h5>' +
							'<h5 class="noMargin">' + $jq(values[indexCell++]).text() + '</h5></div>');
					
					if (phoneNumber.length > 1) {
						wrapperEl.append('<div class="span3 pt30 m0">' + 
								'<h5 class="noMargin grey visible-phone heading-space">' + headers[1] + ':</h5>' +
								'<h5 class="noMargin">' + phoneNumber[0] + '</h5>' +
								'<h5 class="noMargin"><a class="mobileNumber" href="tel:' + phoneNumber[1].replace(')', '') + '">(' + 
								phoneNumber[1] + '</a></h5><br/>' + 
								'<h5 class="noMargin">Fax: ' + $jq(values[4]).text() + '</h5></div>');
					} else {
						wrapperEl.append('<div class="span3 pt30 m0">' + 
								'<h5 class="noMargin grey visible-phone heading-space">' + headers[1] + ':</h5>' +
								'<h5 class="noMargin"><a class="mobileNumber" href="tel:' + phoneNumber[0] + '">' + 
								phoneNumber[0] + '</a></h5><br/>' + 
								'<h5 class="noMargin">Fax: ' + $jq(values[4]).text() + '</h5></div>');
					}
					
					indexCell++;
					email = $jq(values[indexCell]).text();					
					
					wrapperEl.append('<div class="span3 pt30 m0">' + 
							'<h5 class="noMargin grey visible-phone heading-space">' + headers[2] + ':</h5>' +
							'<h5 class="noMargin"><a href="mailto:' + email + '">' + 
							getIEEmailAddress(email) + '</a></h5></div>');
					
					indexCell++;
					
					states = $jq(values[indexCell]).text().split(', ');
					
					for (var indexState = 0; indexState < states.length; indexState++) {
						statesEl.append('<p>' + states[indexState] + '</p>');
					}
					
					wrapperEl.append(statesEl);					
					stateEl.append(wrapperEl);
				});
				
				return stateEl;
			};
			
			var processMedicareHTML = function(headers, info, stateEl) {								
				stateEl.append('<div class="span3 pt30 m0 hidden-phone">' + 
						'<h5 class="noMargin grey">' + headers[0] + ':</h5></div>');
				stateEl.append('<div class="span9 pt30 m0 hidden-phone">' + 
						'<h5 class="noMargin grey">' + headers[1] + ':</h5></div>');
				
				$jq('state', $jq(info)).each(function(index, element) {
					var wrapperEl = $jq('<div style="display: inline-block; width: 100%;"></div>');
					var contactEl = $jq('<div class="span3 pt30 m0">' + 
							'<h5 class="noMargin grey visible-phone heading-space">' + headers[0] + ':</h5></div>');
					var notesEl = $jq('<div class="span9 pt30 m0">' + 
							'<h5 class="noMargin grey visible-phone heading-space">' + headers[1] + ':</h5></div>');
					
					$jq('entry', $jq(element)).each(function(indexEntry, entry) {
						var values = $jq('value', $jq(entry));
						var contactPerson = '';
						var indexCell = 0;
						
						if (values.length == 2) {
							contactPerson = $jq(values[0]).text();
							indexCell++;
						}
						
						contactEl.append('<h5>' + contactPerson + '</h5>');
						notesEl.append('<p class="extraPad">' + $jq(values[indexCell]).text() + '</p>');
					});
					
					wrapperEl.append(contactEl);
					wrapperEl.append(notesEl);
					wrapperEl.append('<div><p>&nbsp;</p><p>&nbsp;</p></div>');
					stateEl.append(wrapperEl);
				});
				
				return stateEl;
			};
			
			var processCommonHTML = function(headers, info, stateEl) {								
				stateEl.append('<div class="span3 pt30 m0 hidden-phone">' + 
						'<h5 class="noMargin grey">' + headers[1] + ':</h5></div>');
				stateEl.append('<div class="span3 pt30 m0 hidden-phone">' + 
						'<h5 class="noMargin grey">' + headers[2] + ':</h5></div>');
				stateEl.append('<div class="span3 pt30 m0 hidden-phone">' + 
						'<h5 class="noMargin grey">' + headers[3] + ':</h5></div>');
				stateEl.append('<div class="span3 pt30 m0 hidden-phone">' + 
						'<h5 class="noMargin grey">' + headers[4] + ':</h5></div>');
				
				$jq('entry', $jq(info)).each(function(index, element) {
					var values = $jq('value', $jq(element));
					var indexCell = 0;
					var wrapperEl = $jq('<div style="display: inline-block; width: 100%;"></div>');
					var statesEl = $jq('<div class="span3 pt30 m0">' + 
							'<h5 class="noMargin grey visible-phone heading-space">' + headers[4] + ':</h5></div>');
					var states;
					var email;
					
					if (values.length >= 5) {
						indexCell++;
					}
					
					wrapperEl.append('<div class="span3 pt30 m0">' +
							'<h5 class="noMargin grey visible-phone heading-space">' + headers[1] + ':</h5>' +
							'<h5 class="noMargin">' + $jq(values[indexCell++]).text() + '</h5></div>');
					
					wrapperEl.append('<div class="span3 pt30 m0">' +
							'<h5 class="noMargin grey visible-phone heading-space">' + headers[2] + ':</h5>' +
							'<h5 class="noMargin"><a class="mobileNumber" href="tel:' + $jq(values[indexCell]).text() + '">' + $jq(values[indexCell++]).text() + '</a></h5></div>');
					
					email = $jq(values[indexCell]).text();
					
					wrapperEl.append('<div class="span3 pt30 m0">' +
							'<h5 class="noMargin grey visible-phone heading-space">' + headers[3] + ':</h5>' +
							'<h5 class="noMargin"><a href="mailto:' + email + '">' + 
							getIEEmailAddress(email) + '</a></h5></div>');
					
					indexCell++;
					
					states = $jq(values[indexCell]).text().split(', ');
					
					for (var indexState = 0; indexState < states.length; indexState++) {
						statesEl.append('<p>' + states[indexState] + '</p>');
					}
					
					wrapperEl.append(statesEl);			
					wrapperEl.append('<div><p>&nbsp;</p></div>');
					stateEl.append(wrapperEl);
				});
				
				return stateEl;
			};
			
			var determineLayoutToRender = function(headers) {
				var joinHeaders = headers.join();
				
				if (joinHeaders.indexOf('Email address') == -1) {
					if (joinHeaders.indexOf('Contact person') == -1) {
						return 1;
					} else {
						return 6;
					}
				} else if (joinHeaders.indexOf('Fax number') > -1) {
					return 2;
				} else {
					return 3;
				}
			}
			
			var getIEEmailAddress = function(email) {
				if (isIE8) {
					var emailDivision = email.split('@');
					email = emailDivision[0] + '<br/>@' + emailDivision[1]; 
				}
				
				return email;
			}
		}
	}
});

var checkDeepLinking = function() {
	var hash = window.location.hash;
	
	if (hash && hash != '#' && hash != '') {
		hash = hash.replace('#', '');
		
		if (hash.indexOf('|') > -1) {
			var hashDivision = hash.split('|');
			
			Aetna.FormXmlTool.deepliking = false;
			$jq('#cb-business').val(hashDivision[0]);
			$jq('#cb-business').trigger('change');
			Aetna.FormXmlTool.deepliking = true;
			
			$jq('#cb-state').val(hashDivision[1]);
			$jq('#cb-state').trigger('change');
		} else {
			$jq('#cb-business').val(hash);
			$jq('#cb-business').trigger('change');
		}
	}
}