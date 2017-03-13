Aetna.Forms.Preview = {
	topPageTitleHistory: "", 	
	init: function(){
		
		$(".preview-form-principal-container").hide();

		$(".nextToPreviewButton").click(function(e){
			e.preventDefault();
			Aetna.Forms.Preview.doHideFormSections();
			previewTable = $('.preview-form-table');
			$('tbody', previewTable).remove();
			previewTable.append('<tbody></tbody>');
			$(".preview-form-principal-container").show();
			
			var formFields = $(".form.basicformcomponent form div.basicformcomponent");
			
			Aetna.Forms.Preview.getTableRows(formFields,previewTable);
			$('html,body').animate({ scrollTop: 0 }, 'slow');
		});
		
		$(".previewPreviousButton").click(function(e){
			e.preventDefault();
			Aetna.Forms.Preview.doPreviousAction();
			$('html,body').animate({ scrollTop: 0 }, 'slow');
		});
		
		if (navigator.userAgent.indexOf('iPad') > -1) {
			$('.form-submit-buttons').each(function() {
				if ($(this).closest('.preview-form-principal-container').length == 0) {
					$(this).parent().removeClass('hidden-desktop');
				} else {
					$(this).remove();
				}
			});
		}
	},

	getTableRows: function(argFormFields, previewTable){
		argFormFields.each(function(index, element){
			if($(this).hasClass('datefield')){
				previewTable.append(Aetna.Forms.Preview.doTableDateRow($(this)));
			}

			else if($(this).hasClass('textinput')){
				previewTable.append(Aetna.Forms.Preview.doTableTextRow($(this)));
			}

			else if($(this).hasClass('phonefield')){
				previewTable.append(Aetna.Forms.Preview.doTablePhoneRow($(this)));
			}

			else if($(this).hasClass('selection')){
				previewTable.append(Aetna.Forms.Preview.doTableSelectionRow($(this)));
			}
		});
	},
	
	doTableDateRow:function(argDatefields){
		var month = $($('input', argDatefields)[0]);
		var day = $($('input', argDatefields)[1]);
		var year = $($('input', argDatefields)[2]);
		if(month.val() != undefined && day.val() != undefined && day.val() != undefined){
			var dateFieldOutput = month.val() + '/' + day.val() + '/' + year.val();
			var tableDateRow = '<tr>' + '<td><b>' + argDatefields.find("label").text() + '</b></td>' + '<td>' + dateFieldOutput + '</td>' + '</tr>';
			return tableDateRow;
		}
	},
	doTableTextRow:function(argTextFields){
		if(argTextFields.find("input").val() != undefined){
			var tableTextRow = '<tr>' + '<td><b>' + argTextFields.find("label").text() + '</b></td>' + '<td>' + argTextFields.find("input").val() + '</td>' + '</tr>';
			return tableTextRow;
		}
	},
	doTablePhoneRow:function(argPhoneFields){
		if($($('input', argPhoneFields)[0]).val() != undefined && $($('input', argPhoneFields)[1]).val() != undefined &&  $($('input', argPhoneFields)[2]).val() != undefined){
			var tablePhoneRow = '<tr>' + '<td><b>' + argPhoneFields.find("label").text() + '</b></td>' + '<td>' +  
				$($('input', argPhoneFields)[0]).val() + '-' + $($('input', argPhoneFields)[1]).val() + '-' + $($('input', argPhoneFields)[2]).val() + '</td>' + '</tr>';
			
			return tablePhoneRow;
		}
	},
	doTableSelectionRow:function(argSelectionFields){
		var tableSelection;
		var isSelectElement = argSelectionFields.find("select");
		if(isSelectElement.length == 0){
			$($('.checkBox',argSelectionFields).each(function(index, element){
				$($('input', $(element)).each(function(index, el){
					if($(el).is(':checked')){
						tableSelection   = '<tr>' + '<td><b>' + $(element).find("label").text() + '<b></td>' + '<td>' + $(element).find('input').val() + '</td>' + '</tr>';
					}
				}));
			}));
		}else{
			if(argSelectionFields.find("select").val() != undefined){
				tableSelection = '<tr>' + '<td><b>' + argSelectionFields.find("label").text() + '</b></td>' + '<td>' + argSelectionFields.find("select").val() + '</td>' + '</tr>';
			}
		}
		
		return tableSelection;
	},
	
	doHideFormSections:function(){
		if($(".form.basicformcomponent form div.wizard-section").length > 0){	
			$(".form.basicformcomponent form div.wizard-section").each(function(){
				$(this).hide();
			});
		}else{
			$(".form.basicformcomponent form div.basicformcomponent").each(function(){
				$(this).hide();
			});
		}
		$("div.bodyContent").children(".articleModule").hide();
		Aetna.Forms.Preview.setPreviewFormTopPageaTitle();
		$(".nextToPreviewButton").hide();
	},
	
	doPreviousAction:function(){
		$(".form.section.basicformcomponent").children("h5").remove();
		if($(".form.basicformcomponent form div.wizard-section").length > 0){
			$(".form.basicformcomponent form div.wizard-section").show();
		}else{
			$(".form.basicformcomponent form div.basicformcomponent").each(function(){
				$(this).show();
			});
		}
		$("div.bodyContent").children(".articleModule").hide();
		$(".nextToPreviewButton").show();
		$("div.bodyContent").children(".articleModule").show();
		$(".preview-form-principal-container").hide();
	},
	
	setPreviewFormTopPageaTitle:function(){
		var previewFormTitle = $("div.preview-form-principal-container").attr("data-title");
		if(previewFormTitle != undefined  && previewFormTitle != ""){
			Aetna.Forms.Preview.topPageTitleHistory = $("div.title").find("span").text();
			var htmlTitleSection = "<h5>" + previewFormTitle + "</h5>";
			$("div.bodyContent").children().each(function(index, compo){
				if(!$(this).is(":hidden") && !$(this).hasClass("hiddenfield")){
					$(this).prepend(htmlTitleSection);
					return null;
				}
			});
		}
		
	},
	
	resetOriginalTitlePage:function(){
		$("div.title").find("span").text(Aetna.Forms.Preview.topPageTitleHistory);
	}
}