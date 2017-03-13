/**
 * Aetna Forms namespace and object
 */
Aetna.Forms = {
		Wizard : {
			actualItem : 1,
			init: function() {
				$('.wizard-button-previous').click(function(e) {
					e.preventDefault();
					Aetna.Forms.Wizard.showSection(--Aetna.Forms.Wizard.actualItem);
				});
				
				$('.wizard-button-next').click(function(e) {
					e.preventDefault();
					Aetna.Forms.Wizard.showSection(++Aetna.Forms.Wizard.actualItem);
				});
			},
			showSection : function(sectionId) {
				$('.wizard-section').hide();
				$('.wizard-section[data-section-id="' + sectionId + '"]').fadeIn();
				
				if ($(window).width() < 768) {
					$('body').animate({ scrollTop: $('.basicformcomponent').offset().top -80 }, 500);
				}
			}
		},
		Validator : {
			formReferences: [],
			init : function() {
				$('.form form').each(function() {
					var newValidationReference = 
						$(this).validate({
							ignore: '.ignore',
							focusInvalid: false,
							errorPlacement: function(error, element) {
								if (element.is('input[type="checkbox"]') || 
										element.is('input[type="radio"]')) {
									error.insertAfter(element.closest('fieldset').find('legend'));
								} else if (element.is('select')) {
									if (element.is('select.address-state') && element.closest('.stateselection').length == 0) {
										error.prependTo(element.closest('.col2'));
									} else {
										error.insertAfter(element.closest('.span12').find('label'));
									}
								} else {
		                        	error.prependTo(element.parent());
		                        	
		                        	if (element.closest('.right-content-panel').length > 0) {
		                        		element.parent().find('input').attr({placeholder: '', value: ''});
		                        		
		                        		if (element.attr('type') == 'password') {
		                        			element.show().unbind('focus').unbind('blur').siblings('input').remove();
		                        		}
		                        	}
		                        }

                                var errorElementLabel = $('label[for="' + element.attr('id') + '"]').text().replace(/\*/g, '');
                                s.sendFormEvent('e', s.pageName, 
									element.closest('form').attr('name'), errorElementLabel);
		              		}, 
		              		invalidHandler: function(form, validator) {
		              			var scrollTopPos = $(validator.errorList[0].element).closest('.basicformcomponent')
                                						.offset().top - $('.fixedHeaderWrap').outerHeight();
                                var windowWidth = $(window).width();

		              	        if (!validator.numberOfInvalids() || $(form.target).closest('.right-content-panel').length > 0) {
		              	            return;
		              	        }

                                if (windowWidth > 1024) {
									scrollTopPos -= 15;
                                } else if (windowWidth <= 1024 && windowWidth > 914) {
		            				scrollTopPos -= 30;
		            			} else {		
                                    scrollTopPos -= 75;

		            				// Check if a form wizard exists
		            				if (windowWidth < 768) {
                                        var errorFieldWrapper = $(validator.errorList[0].element).closest('.basicformcomponent');
		            					var wizardSection = errorFieldWrapper.closest('.wizard-section');

		            					if (wizardSection.length > 0) {
		            						var sectionId = wizardSection.attr('data-section-id');

		            						Aetna.Forms.Wizard.actualItem = parseInt(sectionId);
		            						Aetna.Forms.Wizard.showSection(Aetna.Forms.Wizard.actualItem);

                                            // Recalculate the position after the proper wizard section is displayed
                                        	scrollTopPos = errorFieldWrapper.offset().top - $('.fixedHeaderWrap').outerHeight() - 70;
		            					}
 		            				}
		            			}

		            			$('html, body').animate({ scrollTop: scrollTopPos }, 250);
		              	    },
                            submitHandler: function(form) {
                                s.sendFormEvent('s', s.pageName, $(form).attr('name'));   
                                setTimeout(function() {
									form.submit();
                                }, 400);
                            }
						});
					Aetna.Forms.Validator.formReferences.push(newValidationReference);
				})
			}
		},
		AutoTab : {
			init : function() {
				Aetna.Forms.AutoTab._dateFieldAutoTab();
                Aetna.Forms.AutoTab._phoneFieldAutoTab();
			},
			_dateFieldAutoTab : function(elementObj) {
				var elementEl = elementObj || $('.datefield');
				
				elementEl.each(function() {
					var thisObj = $(this);
					
					$('input', thisObj).each(function(index, element) {
						// Check if the field is the year
						if (index == 2) {
							Aetna.Forms.AutoTab._bindAutoTab($(element), 4);
						} else {
							Aetna.Forms.AutoTab._bindAutoTab($(element), 2);
						}
					});
				});
			},
			_phoneFieldAutoTab : function() {
				$('.phonefield').each(function() {
					var thisObj = $(this);
					
					$('input', thisObj).each(function(index, element) {
						// Check if the field is the last one
						if (index == 2) {
							Aetna.Forms.AutoTab._bindAutoTab($(element), 4);
						} else {
							Aetna.Forms.AutoTab._bindAutoTab($(element), 3);
						}
					});
				});
			},
			_bindAutoTab : function(obj, maxChars) {
				$(obj).keyup(function(key) {
                    if ($(this).val().length == maxChars) {
						jQuery.tabNext();
                        return;
                    }
				});
			}
		},
		DropdownHandler: {
			init : function() {
				$(document).on('focus', '.form select', function() {
					if ($(window).width() < 768) {
						$(this).css({'font-size': '1em', 'line-height': '1.2'});
					}
				});

				$(document).on('change', '.form select', function() {
					var selectedValue = $('option:selected', $(this)).text();

					if ($(window).width() < 768) {
						if (selectedValue.length > 30) {
							if (selectedValue.length > 70) {
								$(this).css({'font-size': '0.6em', 'line-height': '1.9'});
							} else { 
								$(this).css({'font-size': '0.8em', 'line-height': '1.4'});
							}
						} else {
							$(this).css({'font-size': '1em', 'line-height': '1.2'});
						}

						$(this).blur();
					}
				});
			}
		},
		DynamicEmailSelection : {
			init : function() {
				var dynamicEmailSelection = $('.dynamicemailselection .conditions');
				
				if (dynamicEmailSelection.length > 0) {
					var inputName = dynamicEmailSelection.attr('data-input-name');
					var defaultEmailAddress = dynamicEmailSelection.attr('data-default-email-address');
					var inputValues = {};
					var emailAddresses = {};
					var emailConditions = {};
					
					// Process the attributes of the element
					$.each(dynamicEmailSelection[0].attributes, function() {
						if (this.name.indexOf('data-input-value-') > -1) {
							inputValues[this.name.replace('data-input-value-', '')] = this.value;
						} else if (this.name.indexOf('data-email-address-') > -1) {
							emailAddresses[this.name.replace('data-email-address-', '')] = this.value;
						}
					});
					
					// Build the emails condition object
					$.each(inputValues, function(key, value) {
						emailConditions[value] = emailAddresses[key];
					});
					
					// Bind the event of the given input
					$('select[name="' + inputName + '"]').change(function() {
						var selectedValue = $(this).val();
						var emailToUse = emailConditions[selectedValue];
						var toField = $('input[name="to"]');
						
						if (toField.length == 0) {
							toField = $('<input type="hidden" name="to" value="" />');
							$(this).closest('form').append(toField);
						}
						
						if (emailToUse) {
							toField.val(emailToUse);
						} else {
							toField.val(defaultEmailAddress);
						}
					});
				}
			}
		},
		
		CreateFieldsTabIndex:{
			init:function(resetTabIndex){
				if(resetTabIndex){
					Aetna.TabIndex.counter = 0;
					$("*").each(function(){
						if($(this).attr("tabindex")){
							$(this).removeAttr("tabindex");
						}
					});
				}
				$(".template form div.basicformcomponent, .template form .form-submit-buttons").each(function(index, formSection){
					if($(formSection).hasClass('formsubsection')){
						Aetna.Forms.CreateFieldsTabIndex.formSubSectionsTabbing(formSection, Aetna.TabIndex.counter);
					}else{
						Aetna.Forms.CreateFieldsTabIndex.formBasicSectionsTabbing(formSection, Aetna.TabIndex.counter);
					}
				});
			},
			
			formSubSectionsTabbing:function(formSection, initialIndex){
				var tabIndex = 0;
				var isSelectionComponent= false;
				tabIndex = initialIndex + 1;
				
				$(formSection).find("div.basicformcomponent").each(function(index, basicComponent){
					isSelectionComponent = $(basicComponent).hasClass('selection');
					if(initialIndex == 0){
						 if(isSelectionComponent){
							 Aetna.Forms.CreateFieldsTabIndex.doSelectionFieldTabIndex($(basicComponent), tabIndex);
						 }else{
							 Aetna.Forms.CreateFieldsTabIndex.doSimpleFieldTabIndex($(basicComponent), tabIndex);
						 }
					 }else{
						 if(isSelectionComponent){
							 Aetna.Forms.CreateFieldsTabIndex.doSelectionFieldTabIndex($(basicComponent), Aetna.TabIndex.counter);
						 }else{
							 Aetna.Forms.CreateFieldsTabIndex.doSimpleFieldTabIndex($(basicComponent), Aetna.TabIndex.counter);
						 } 
					 }
				});
			},
			
			formBasicSectionsTabbing:function(formSection, initialIndex){
				var tabIndex = 0;
				tabIndex = initialIndex + 1;
				var isSelectionComponent  = $(formSection).hasClass('selection');
				
				if(initialIndex == 0){
					 if(isSelectionComponent){
						 Aetna.Forms.CreateFieldsTabIndex.doSelectionFieldTabIndex($(formSection), tabIndex);
					 }else{
						 Aetna.Forms.CreateFieldsTabIndex.doSimpleFieldTabIndex($(formSection), tabIndex);
					 }
				 }else{
					 if(isSelectionComponent){
						 Aetna.Forms.CreateFieldsTabIndex.doSelectionFieldTabIndex($(formSection), Aetna.TabIndex.counter);
					 }else{
						 Aetna.Forms.CreateFieldsTabIndex.doSimpleFieldTabIndex($(formSection), Aetna.TabIndex.counter);
					 } 
				 }
			},
			
			doSimpleFieldTabIndex:function(argFormSection, argTabIndex){
				var tabIndexCounter = argTabIndex;
				if($('input,textarea,select,legend',argFormSection).attr("tabindex") == undefined){
					$('input,textarea,select,legend',argFormSection).each(function(){
						$(this).attr('tabindex' , tabIndexCounter);
						tabIndexCounter = tabIndexCounter + 1;
						Aetna.TabIndex.counter = tabIndexCounter;
					});
				}
			},
			doSelectionFieldTabIndex:function(argSelectionFormSection, argTabIndex,isSubSectionComponent){
				var tabIndexCounter = argTabIndex;
				if(argSelectionFormSection.has('select').length){
					if($('select', argSelectionFormSection).attr("tabindex") == undefined){
						$('select', argSelectionFormSection).each(function(){
							$(this).attr('tabindex' , tabIndexCounter);
							tabIndexCounter = tabIndexCounter + 1;
							Aetna.TabIndex.counter = tabIndexCounter;
						});
					}
				}else{
					if($('div.checkBox,legend', argSelectionFormSection).attr("tabindex") == undefined){
						$('div.checkBox,legend', argSelectionFormSection).each(function(){
							$(this).attr('tabindex' , tabIndexCounter);
							tabIndexCounter = tabIndexCounter + 1;
							Aetna.TabIndex.counter = tabIndexCounter;
						});
					}
				}	
			},
			checkSelectElements:function(activeSelectElement){
				$(activeSelectElement).closest('div.span12').find('div.checkBox').each(function(){
					if($(this).find("span").hasClass("set-background-position")){
						$(this).find("span").removeClass("set-background-position");
					}
				});
				if($(activeSelectElement).find("input[type='checkbox']").length){
					$(activeSelectElement).find("span").addClass("set-checkbox-background");
				}else{
					$(activeSelectElement).find("span").addClass("set-background-position");
				}
			}
		},
		
		addCssIERadioButtons:{
			listenersSet : false,
			init: function() {
				// IE8 fixes for custom radio buttons and checkboxes and listeners are not set
				if (navigator.userAgent.indexOf('MSIE 8.0') > -1 &&
						!Aetna.Forms.addCssIERadioButtons.listenersSet) {
					$(document).on('click', '.checkBox', function(e) {
						$(this).siblings().children('label').removeClass('checked-r');
					}); 
	
					$(document).on('click', '.article-template .checkBox input[type="radio"]+label', function(e) {
						$('input[type="radio"]', $(this).parent()).click();
						$(this).toggleClass('checked-r');
					});
					
					$(document).on('click', '.article-template .checkBox input[type="checkbox"]+label', function(e) {
						$('input[type="checkbox"]', $(this).parent()).click();        
						$(this).toggleClass('checked');
					}); 
					
					Aetna.Forms.addCssIERadioButtons.listenersSet = true;
				}
			}
		},
		manageIELoginErrorMsgs: function() {
			$(document).on('click', '.right-content form .textinput .error', function() {
				var inputNameAttrValue = $(this).attr('id').replace('-error', '');
				$(this).parent().find('input').focus();
			});
		}
}

$(function() {
	if (Aetna.isCQPreviewMode) {
        Aetna.Forms.AutoTab.init();
		Aetna.Forms.Wizard.init();
		Aetna.Forms.Validator.init();
		Aetna.Forms.DropdownHandler.init();
		Aetna.Forms.DynamicEmailSelection.init();
		Aetna.Forms.CreateFieldsTabIndex.init(false);
		$('input, textarea').placeholder();
		
		if (Aetna.Forms.Preview) {
			Aetna.Forms.Preview.init();
			$("a.nextToPreviewButton").click(function(e){
				e.preventDefault();
				var formValidator = $(this).closest(".form form").validate();
				var isValidate = formValidator.form();
				if(!isValidate){
					Aetna.Forms.Preview.doPreviousAction();
				}
			});
		}
	}
	
	// Input file binding methods
	$('.choose-file-btn').click(function(e) {
		e.preventDefault();
		$('input[type="file"]', $(this).closest('.filefield')).click();
	});
	
	$('input[type="file"]').change(function() {
		$('.choose-file-txt', $(this).closest('.filefield')).val($(this).val());
	});
	
	// force clean input placeholders for old browsers so  they don't get submitted
	$('.form.basicformcomponent form').submit(function() {
          var $inputs = $('.placeholder', this).each(clearPlaceholder);
	  });
	
	$('.checkBox').keydown(function(e) {
		var keyCode = e.keyCode;
		
		// Check if the key code is valid
		if (keyCode == 0) {
			keyCode = e.charCode;
		}
		
		if (keyCode == 13 || keyCode == 32) {
			e.preventDefault();
			$(this).find('input').click();
		}
	});
	
	$(".article-template .checkBox input[type='radio'] + label").click(function(){
		Aetna.Forms.CreateFieldsTabIndex.checkSelectElements($(this));
	});
	
	$('#form-section-more-npi').find('select').change(function(){
		setTimeout(function(){
			Aetna.Forms.CreateFieldsTabIndex.init(true);
		},1000);
	});
	
	
	// IE8 fixes for custom radio buttons and checkboxes
	if (navigator.userAgent.indexOf('MSIE 8.0') > -1) {
		Aetna.Forms.addCssIERadioButtons.init();
		Aetna.Forms.manageIELoginErrorMsgs();
	}
});

// from jquery.placeholder
function clearPlaceholder(event, value) {
	var input = this;
	var $input = $(input);
	
	if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
		if ($input.data('placeholder-password')) {
			$input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
			// If `clearPlaceholder` was called from `$.valHooks.input.set`
			if (event === true) {
				return $input[0].value = value;
			}
			$input.focus();
		} else {
			input.value = '';
			$input.removeClass('placeholder');
			//input == safeActiveElement() && input.select();
		}
	}
}

