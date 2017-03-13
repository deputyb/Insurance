$(function(){
	var fileInput = $('#_content_aetna-taskmanager_aetna-task-request-form_jcr_content_column1_start_request_file1');
	if (fileInput.length > 0) {
		fileInput.click(addPlusIcon);
	}
	addPlusIcon();
});


function addPlusIcon() {
	var fileInput = $('#_content_aetna-taskmanager_aetna-task-request-form_jcr_content_column1_start_request_file1');
	if (fileInput.length > 0 && $('span.addFile').length <=0) {
    	 var icon = document.createElement("span");
    	 icon.className = "addFile";
         icon.onclick = function() {
        	 addMultiFile();
         };
         icon.innerHTML = "&nbsp;[+]";
         fileInput.parent().parent().after(icon);
    }
}

function addMultiFile() {
	var fileUploadCode = '<div class="form_rightcol"><input id="_content_aetna-taskmanager_aetna-task-request-form_jcr_content_column1_start_request_file1" class="form_field form_field_file" name="request_file1" type="file" size="37">  <span class="form_mv_remove" onclick="removeMultivalue(this);">[&ndash;]</span></div>';	
	var fileFirstInput = $('#_content_aetna-taskmanager_aetna-task-request-form_jcr_content_column1_start_request_file1:first');
	
	if( fileFirstInput) {
		var inputWrapperList = fileFirstInput.parent().parent().find('.form_rightcol');
		inputWrapperList.last().parent().append(fileUploadCode);
	}
}

function removeMultivalue(element) {
	var removeIcon = $(element);
	
	if( removeIcon) {
		var inputWrapper = removeIcon.parent();
		inputWrapper.remove();
	}
}



