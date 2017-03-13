var xmlRetrieved = "";
var linkAnalyticsStr = "Aetna.analytics.omniture.linkCode('aeCustLnk','Learn More',this);s.tl(this,'o',linkText,null,'navigate');return false;";
var pdfAnalyticsStr = "Aetna.analytics.omniture.linkCode('aeDownLnk','[Link Name]',this);s.tl(this,'o',linkText);";

//if (Aetna.isCQPreviewMode) {
	$(function() {
		var toolSource = $('.tool-source a');
		if (Aetna.isCQPreviewMode) {
			toolSource.hide();
		}
		if (toolSource.length > 0) {
			$.ajax({
				type: "GET",
				url: toolSource.attr('href'),
				dataType: "xml",
				success: function(xml) {
					xmlRetrieved = xml;
							
					// loop all hix component
					$(".planHixSection").each(function(indexHixPlan, elementHixPlan) {
						
						var planYear = $(this).attr('data-year');
						var planState = $(this).attr('data-state');
						var planSectionName = $(this).attr('data-plan');
						var planContentHolder = $(elementHixPlan).find('.articleModule');
						
						$(xml).find('business').each(function() {
							var contentLoaded =  false;
							// Select configured states
							$(this).find('state[name="' + planState +'"]').each(function(){
								// Loop state years
								$('super-section' , $(this)).each(function(indexSuperSection, elementSuperSection) {
									var yearSection = $(elementSuperSection).find("introduction-header").text();
									
									if(yearSection == planYear) {
										$(elementSuperSection).find('section[name="' + $.trim(planSectionName) +'"]').each(function() {
											
											$(this).find('subsection').each(function(indexPlan, sectionPlan){
												var planTableEl = $('<table cellspacing="0" cellpadding="0" border="0" class="column bgrows col2"></table>');
												var namePlan = $(sectionPlan).attr('name');
												var planHeaderRowEl = $('<tr class="tableHeader"><td colspan="2">'+ namePlan + '</td></tr>');
												$(planTableEl).append(planHeaderRowEl);
												
												// loop through links
												$(this).find('form').each(function(indexLink, planLink){
													var link = Aetna.FormXmlTool.processLink($(planLink), linkAnalyticsStr, pdfAnalyticsStr,true)
													var planLinkRowEl = $('<tr class="tableColumn"></tr>');
													var tdLink = $('<td></td>');
													
													tdLink.append(link);
													planLinkRowEl.append(tdLink);
													
													var notes = $(planLink).find('notes').text();
													if(notes && notes != '') {
														planLinkRowEl.append('<td>'+ notes + '</td>');
													}
													
													$(planTableEl).append(planLinkRowEl);
												});
												
												$(planContentHolder).append(planTableEl);
												contentLoaded =  true;
											});
										});
									}
								});
							});
							// State or plan not found
							if(!contentLoaded && ! Aetna.isCQPreviewMode) {
								$(planContentHolder).html('<br/><p>Not HIX plan content found for configured plan.  Please review the configured values.</p>')
							}
						});
					});
				}
			});
		}
	});
//}

