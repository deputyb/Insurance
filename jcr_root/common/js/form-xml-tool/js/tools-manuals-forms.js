var jsonFormDefinition = {};
var xmlRetrieved = "";
Aetna.FormXmlTool.AccordionUI = null;
Aetna.FormXmlTool.interstitialOpen = false;
Aetna.FormXmlTool.interstitialCookie = 'forms-interstitial-display';
Aetna.FormXmlTool.deepliking = true;
var linkAnalyticsStr = "Aetna.analytics.omniture.linkCode('aeCustLnk','Learn More',this);s.tl(this,'o',linkText,null,'navigate');return false;";
var pdfAnalyticsStr = "Aetna.analytics.omniture.linkCode('aeDownLnk','[Link Name]',this);s.tl(this,'o',linkText);";

$(function() {
	if (Aetna.isCQPreviewMode) {
		var toolSource = $('.tool-source a');
		
		if (toolSource.length > 0) {
			$('#smiley img').attr('src', $('.tool-image img').attr('src'));
			
			$.ajax({
				type: "GET",
				url: toolSource.attr('href'),
				dataType: "xml",
				success: function(xml) {
					xmlRetrieved = xml;
					var businessSelectEl = $('#cb-business');
					var pdfLinkHtml = '<span class="pdfLink">';
					var pdfLinkEndHtml = '</span>';
		
					businessSelectEl.append('<option value="none">Select the size of your business</option>');
					
					$(xml).find('business').each(function(){
						var businessName = $(this).attr('name');
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
				$('#cb-business').change(function() {
					var selectedBusiness = $('#cb-business option:selected').text();
					var selectedBusinessValue = $('#cb-business').val();
					
					if (Aetna.FormXmlTool.deepliking) {
						Aetna.FormXmlTool.unBindOnHashChange();
						window.location.hash = selectedBusinessValue;
						Aetna.FormXmlTool.bindOnHashChange();
					}
					
					if (selectedBusinessValue != 'none') {
			
						$('#cb-state').empty()
							.append('<option value="none">Select state/region</option>');

						$(xmlRetrieved).find('business[name="'+selectedBusiness+'"]').find('state').each(function(){
							var stateName = $(this).attr('name');
							var stateId = Aetna.FormXmlTool.normalizeId(stateName);

							$('#cb-state').append('<option value="' + stateId + '">' + stateName + '</option>');
						});
						
						$('#cb-state').removeAttr('disabled');
					} else {
						$('#cb-state').empty()
							.append('<option value="none">Select state/region</option>')
							.attr('disabled', 'disabled');				
					}
					
					$('#smiley').show();
					$('.form-section').hide();
				});
			}
		
			var bindStateChangeEvent = function() {
				$('#cb-state').change(function() {			
					var selectedState = $(this).val();
					
					if (selectedState != 'none') {
						var selectedBusiness = $('#cb-business').val();
						var selectedBusinessText = $('#cb-business option:selected').text();
						var selectedStateText = $('#cb-state option:selected').text();
						var businessNameId = Aetna.FormXmlTool.normalizeId(selectedBusinessText);
			
						Aetna.FormXmlTool.unBindOnHashChange();
						window.location.hash = selectedBusiness + '|' + selectedState;
						Aetna.FormXmlTool.bindOnHashChange();
						
						$('.form-section').hide();
						
						var stateNameId = Aetna.FormXmlTool.normalizeId(selectedStateText);
						var stateEl = $('<div id="section-' + businessNameId + '-' + stateNameId + '" class="form-section"></div>');
						
						stateEl.hide()
							.append('<h4 class="state-name">' + selectedStateText + '</h4>');
						
						if($(xmlRetrieved).find('business[name="'+ selectedBusinessText +'"]').find('state[name="'+ selectedStateText +'"]').find('section').length){
							var sectionEl = $('<div class="accordion-container" id="accordion-' + Aetna.FormXmlTool.guid() + '"></div>');
							
							$(xmlRetrieved).find('business[name="'+ selectedBusinessText +'"]').find('state[name="'+ selectedStateText +'"]').find('section').each(function(){
								var sectionName = $.trim($(this).attr('name')).replace('\n', '<br/>');
								var sectionWrapperEl = $('<div></div>');
								var sectionClass = 'accheading';
								
								if (sectionName.indexOf('Administrative') >= 0) {
									sectionClass += ' external';
								}
								
								sectionEl.append('<h5 class="' + sectionClass + '">' + sectionName + '</h5>');

								$(this).find('form').each(function(){
									sectionWrapperEl.append(Aetna.FormXmlTool.processLink($(this), linkAnalyticsStr, pdfAnalyticsStr));
								});

								sectionEl.append(sectionWrapperEl);
							});
							
							stateEl.append(sectionEl);
						} else{
							$(xmlRetrieved).find('business[name="'+ selectedBusinessText +'"]').find('state[name="'+ selectedStateText +'"]').find('form').each(function(){
								stateEl.append(Aetna.FormXmlTool.processLink($(this), linkAnalyticsStr, pdfAnalyticsStr));
							});
						}

						$('#forms-wrapper .row-fluid .span12').empty().append(stateEl);

						$('#section-' + selectedBusiness + '-' + selectedState).show();

						$('#smiley').hide();
						
						Aetna.analytics.omniture.linkCode('aeTMFNav',selectedBusinessText + ':' + selectedStateText,this);
						s.tl(this,'e',linkText);
					} else {
						$('#smiley').show();
						$('.form-section').hide();
					}

					// Check if the cookie for the interstitial display exists
					if (!$jq.cookie(Aetna.FormXmlTool.interstitialCookie)) {
						accordionInit(toolsAdministrativeAccordionBeforeActivateCallback);
						bindInterstitialContinueLink();
					} else {
						accordionInit(toolsAdministrativeOmniAccordionBeforeActivateCallback);
					}

				});
			}
			
			var bindInterstitialContinueLink = function() {
				$(".interout .interlink").unbind('click');
				$(".interout .interlink").click(function(e){
					e.preventDefault();
					var cookiePath = window.location.pathname;
					
					// Check if navigator is IE to write a different cookie path
					if (navigator.userAgent.indexOf('MSIE') >= 0) {
						cookiePath = '/';
					}
					
					$jq.cookie(Aetna.FormXmlTool.interstitialCookie, 'true', { path: cookiePath });
					$(".interout").addClass("rewinded");
					$(".interout").hide();
					Aetna.FormXmlTool.interstitialOpen = true;
					Aetna.FormXmlTool.AccordionUI.newHeader.click();
				});	
			}

			var toolsAdministrativeOmniAccordionBeforeActivateCallback = function(event, ui) {
				var selectedBusinessText = $('#cb-business option:selected').text();
				var selectedStateText = $('#cb-state option:selected').text();
				
				if (ui.newPanel.context) {
					var selectedAcordionText = ui.newPanel.context.textContent;
					Aetna.analytics.omniture.linkCode('aeContExp',selectedBusinessText + ':' + selectedStateText + ':' + selectedAcordionText,ui.newPanel);
					s.tl(ui.newPanel,'o',linkText);
				}
			}		
			
			var toolsAdministrativeAccordionBeforeActivateCallback = function(event, ui) {

				var selectedBusinessText = $('#cb-business option:selected').text();
				var selectedStateText = $('#cb-state option:selected').text();
				var selectedAcordionText = ui.newPanel.context.textContent;
				Aetna.analytics.omniture.linkCode('aeContExp',selectedBusinessText + ':' + selectedStateText + ':' + selectedAcordionText,ui.newPanel);
				s.tl(ui.newPanel,'o',linkText);
				if (!Aetna.FormXmlTool.interstitialOpen) {
					if (ui.newHeader.hasClass('external')) {						
						event.preventDefault();
						var interstitialToUse = $(".interout");
						var interstitialWindow = $('.interstitialWindow');
						
						if (interstitialWindow.length > 0) {
							interstitialToUse = $(".interout", interstitialWindow);
						}
						
						interstitialToUse.removeClass("rewinded");
						interstitialToUse.show();
						Aetna.FormXmlTool.AccordionUI = ui;
						centerInter();
					}
				}
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
			$('#cb-business').val(hashDivision[0]);
			$('#cb-business').trigger('change');
			Aetna.FormXmlTool.deepliking = true;
			
			$('#cb-state').val(hashDivision[1]);
			$('#cb-state').trigger('change');			
		} else {
			$('#cb-business').val(hash);
			$('#cb-business').trigger('change');
		}
	}
}