var bottomSubmitButtonsCode  = '<div class="row"><div class="bottomBtns"><input type="submit" class="blueBtn" value="Submit"><a href="#" class="blueBtn graybg">Clear Form</a></div></div>';

// to select text nodes that are next to an element
$.fn.nextNode = function(){
	  var contents = $(this).parent().contents();
	  return contents.get(contents.index(this)+1);
}

$( document ).ready(function() {
	 $("form").submit(function (e) {
	        e.preventDefault(); 
	        
            // to replace tr on a table to ul li instead of div
            var ulSection = false;//$("#createLi").prop( "checked" );
            var addContentWrappers = $("#contentWrapper").prop( "checked" );
            
            // to keep source but change only dropdowns, radios and checkboxes
            var keepTable = $("#keepTable").prop( "checked");
            
        	var result = reformatHtml(ulSection,keepTable);
        	
            // add wrapper to dropdowns
        	result.find("select").wrap("<div class='selectWrap clientSize mobile100'>" );
            
            // remove br not needed in most cases
            // if required, it could be added manually on the form code
        	result.find("br").remove();
        	
        	fixRadioStyle(result);
        	
        	// replaces selectes (yes/no) with radios
        	replaceDropDownsYesNo(result);
        	
         	// replace submit image with new code
        	result.find(".row input[alt=Submit]").parent().replaceWith(bottomSubmitButtonsCode);
        	
        	if(addContentWrappers) {
            	// add mobile container
            	var mobileContainer = ('<div class="formMobileContent hidden-desktop">There is not a mobile version for this form</div>');
            	
            	// desktop wrapper
            	var desktopWrapper = $('<div class="formContent visible-desktop">');
            	desktopWrapper.append(result.children());
            	$("#resultHtml").val(desktopWrapper.wrap('<result>').parent().html()  + mobileContainer);
            	
        	} else {
            	$("#resultHtml").val(result.html());
        	}
	    });
});


function reformatHtml(ulSection, keepTable) {
	
    var sourceHtml = $("#originalHtml").val();
    var tempDom = $('<temp>').append($.parseHTML(sourceHtml));
    
    // add type=text to input without it, so they could be styled with current css 
    tempDom.find("input:not([type])").attr('type', 'text');
    
    var result = $('<result>');
    
	    // loop throught tables extracting table row content into divs
	    // and replacing the table
	    tempDom.find('table').each(function( indexT ) {
	    	var formSection = $('<div class="formSection">');
	    	if(keepTable) {	
	    		 $(this).wrap(formSection);
	    	 } else {
		    	
			    if(ulSection) {
		    		// add ul wrapper for list
			    	var ul = $('<ul>');
			    	formSection.append(ul);
		    		formSection = formSection.find('ul');
		    	}	
		    	
			    // loop table rows
			    $(this).find('tr').each(function( index ) {
			    	var divRow =  $('<div class="row">');
			    	
			    	//if is set to use list instead of div
			    	if(ulSection) {
			    		divRow =  $('<li>');
			    	}	    	
			    	
			    	$(this).find('td').each(function( indexTd ) {
			    		//ignore spacer td, only gif image on td
			    		if($(this).html().indexOf("chrome_spacer.gif") < 0 || $(this).children().length > 1) {
			    			
			    			// change subtitles with image number to h4 tag
			    			if($(this).html().indexOf("images/structure/numbers") >= 0) {
			    				var subtitle = $("<h4>");
			    				subtitle.append($(this).find("b").text());
			    				$(this).find("b").first().replaceWith(subtitle);
			    				
			    				// remove images
			    				$(this).find("img").remove();
			    				formSection.append($(this).html());
			    				
			    				// it's the formsection title, break to next row
			    				return false;
			    				//divRow.append($(this).html());
			    				
			    			} else {
			    	    		// count inputs, if more than one, then add a wrapper 
			    	    		// to display inputs inline
			    	    		if($(this).find("input").size() > 1){
			    	    			divRow.append($('<div class="sameLine">').append($(this).html()));	
			    	    		} else {
			    	    			divRow.append($(this).html());	
			    	    		}
			    			}
			    		}
			        });
			    	
			    	formSection.append(divRow);
			    });
		
			    if(ulSection) {
			    	formSection = formSection.parent(); // select div and no the wrapper ul
		    	}	
		    	
			    //add new divs section to form instead of table
			    $(this).replaceWith(formSection);
	    	 }
		    
	    });
    
    
    return tempDom;
	
}


function fixRadioStyle(form) {
	form.find("input[type=checkbox],input[type=radio]").each(function( index ) {
		
		// get the text after the radio used as a label
		var inputLabel = $(this).nextNode();
		
		// set id attribute with name value if it doesn't have one
		if(!$(this).is("[id]")){
			$(this).attr("id", $(this).attr("name")+index);
		}
		
		
		// create label tag for current input
		var label = $('<label>');
		label.html("<span></span>" + inputLabel.data);
		label.attr("for", $(this).attr("id"));
		$(this).after(label);
		
		// wrap with class checkbox so it could be style
		$(this).next('label').andSelf().wrapAll('<div class="checkBox">');

		// delete text next to inputs
		inputLabel.remove();
		
	});
}


function replaceDropDownsYesNo(form) {

	// loop all selects where options are yes and no
	form.find('select option:contains("Yes")').parent().find('option:contains("No")').parent().each(function( index ) {
		// create code for radios
		var radioYes = $('<div class="checkBox"><input type="radio" value="yes" name="' + 
			$(this).attr('name') + '" id="' + $(this).attr('name') + '1"><label for="' + 
			$(this).attr('name') + '1"><span></span>Yes </label></div>');

		var radioNo = $('<div class="checkBox"><input type="radio" value="no" name="' + 
		$(this).attr('name') + '" id="' + $(this).attr('name') + '2"><label for="' + 
		$(this).attr('name') + '2"><span></span>No </label></div>');
		
		var newElementToReplaceSelect = $('<div class="sameLine">');
		newElementToReplaceSelect.append(radioYes).append(radioNo);
		
		// replace select with radios
		$(this).parent().replaceWith(newElementToReplaceSelect);
		
	});
}
