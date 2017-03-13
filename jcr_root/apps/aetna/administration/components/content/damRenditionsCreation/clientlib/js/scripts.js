var $image;

var firstZoom = true;

var $originalData;

var $dataX, $dataY, $dataHeight,  $dataWidth, cropper;

var $elementZoomEventSource;

var $isZoomInButtonClicked = false;

var $originalX, $originalY;

var $initialImageData = {
		width:"",
		height:""
};

var $isKeyUpEvent = false;
var $isMoved = false;


$(function() {
	$dataHeight = $("#dataHeight"), $dataWidth = $("#dataWidth"), cropper;
	
	
	$image = $(".cropper");
	
	
	$image.cropper({
		  mouseWheelZoom:false,
		  autoCropArea:0.50,
		  resizable:false,
		  built:function(){
			var data = $image.cropper("getCropBoxData");
			$dataHeight.val(Math.trunc(data.height));
			$dataWidth.val(Math.trunc(data.width));
			setInitialImageData();
		  },
		  dragend:function(){
			  var data =$image.cropper("getCropBoxData");
			  if(!isZoomIn() && $isZoomInButtonClicked == true){
				  $dataHeight.val(Math.trunc(data.height));
				  $dataWidth.val(Math.trunc(data.width));
				  return;
			  }
		  },
		  dragstart:function(){
			  $isMoved = true;
		  },
		  crop:function(data){
			  if($elementZoomEventSource != undefined && $elementZoomEventSource == "zoomIn" && isZoomIn() && $isMoved != true){
				  $dataHeight.val(Math.trunc(data.height));
				  $dataWidth.val(Math.trunc(data.width)); 
				  $elementZoomEventSource = "";
				  return;
			  }else if(!isImageZoomOut() && isZoomIn() && $isKeyUpEvent != true && $elementZoomEventSource != undefined && $elementZoomEventSource == "zoomOut"){
				  $dataHeight.val(Math.trunc(data.height));
				  $dataWidth.val(Math.trunc(data.width));
				  return;
			  }
			  
			  $isKeyUpEvent = false;
			  $isMoved = false;
		  }
	});
	
	cropper = $image.data("cropper");

	$("#clear").click(function() {
		location.reload()
	});
	$("#zoomIn").click(function() {
		$elementZoomEventSource = $("#zoomIn").attr("id");
		var data = $image.cropper("getCropBoxData");
		$isZoomInButtonClicked = true;
		$originalX = data.left; 
		$originalY = data.top;
		$image.cropper("zoom", 0.1);
	});
	$("#zoomOut").click(function() {
		$elementZoomEventSource = $("#zoomOut").attr("id");
		var data = $image.cropper("getCropBoxData");
		$originalX = data.left; 
		$originalY = data.top;
		$image.cropper("zoom", -0.1);
		if(firstZoom == true && isImageZoomOut()){
			setDataPreZoom();
		}
		if(isImageZoomOut()){
			setDataPostZoom();
		}
	});
	$("#getData").click(function() {
		$("#showData").val(JSON.stringify($image.cropper("getData")));
	});
	$dataWidth.keyup(function(e) {
		$isKeyUpEvent = true;
		setCroppingParam(e, 'width', parseInt($(this).val()));
	});
	$dataHeight.keyup(function(e) {
		$isKeyUpEvent = true;
		setCroppingParam(e, 'height', parseInt($(this).val()));
	});
	
	$('button[type="button"]').tooltip();

	$("#prepare-create-rendition").click(
			function() {
				var imageData = $image.cropper("getData",true);
				var cropData = $image.cropper("getCropBoxData");
				var imagePrefix = "";
				var width  = $dataWidth.val();
				var height = $dataHeight.val();
				

				if ($('#dataPrefix').val() != undefined
						&& $('#dataPrefix').val() != "") {
					imagePrefix = $('#dataPrefix').val() + '.';
				}

				$('#modal-rendition-name span').text(
						imagePrefix + width + '.' + height
								+ '.jpg');
				$('#modal-x span').text(imageData.x);
				$('#modal-y span').text(imageData.y);
				$('#modal-width span').text(width);
				$('#modal-height span').text(height);
				$('#modal-prefix span').text(imagePrefix);
				$('#confirmationModal').modal('show');

				$('#success-msg, #error-msg').addClass('hidden');
			});

	$('#create-rendition').click(
			function() {
				
				
				var spinEl = $('#img-spin');
				var imageData = $image.cropper("getData",true);

				imageData.assetPath = $('#modal-asset-path span').text();

				imageData.prefix = $("#modal-prefix span").text();
			
				spinEl.removeClass('hidden');
				
				var cropBoxData = $image.cropper("getCropBoxData");
				imageData.rescaleWidth = $dataWidth.val();
				imageData.rescaleHeight = $dataHeight.val();

				$.ajax('/services/aetna/dam/renditions/creation', {
					type : 'POST',
					data : imageData,
					success : function(data, textStatus, jqXHR) {
						var prefix = "";
						var width;
						var height;
						width = imageData.rescaleWidth;
						height = imageData.rescaleHeight;
						if ($('#dataPrefix').val() != undefined
								&& $('#dataPrefix').val() != "") {
							prefix = $('#dataPrefix').val() + '.';
						}
						$('#success-msg').removeClass('hidden').find('a').attr(
								'href',
								imageData.assetPath
										+ '/jcr:content/renditions/' 
										+ prefix
										+ width + '.'
										+ height + '.jpg');
					},
					error : function(jqXHR, textStatus, errorThrown) {
						$('#error-msg').removeClass('hidden');
					},
					complete : function(jqXHR, textStatus) {
						spinEl.addClass('hidden');
						$('#confirmationModal').modal('hide');
						$(window).scrollTop(0);
					}
				});
			});
});

function setCroppingParam(e, param, value) {
	var key = e.charCode || e.keyCode || 0;
	// allow backspace, tab, delete, enter, arrows, numbers and keypad numbers
	// ONLY
	// home, end, period, and numpad decimal
	if (key == 13 || key == 46 || key == 110 || key == 190
			|| (key >= 35 && key < 37) || (key >= 48 && key <= 57)
			|| (key >= 96 && key <= 105)) {
		var obj = {};

		if (!value) {
			value = 0;
		}
		var cropBoxData = $image.cropper("getCropBoxData");
		obj.width = Math.trunc(cropBoxData.width);
		obj.height = Math.trunc(cropBoxData.height);
		obj.x = Math.trunc(cropBoxData.left);
		obj.y = Math.trunc(cropBoxData.top);
		
		switch(param) {
	    case "width":
	        obj.width = value;
	        break;
	    case "height":
	        obj.height = value;
	        break;
	    case "x":
	        obj = value;
	    case "y":
	    	obj.top = value;
		}
		$image.cropper("setCropBoxData", obj);
	}
}

function setDataPreZoom(){
	$originalData = $image.cropper("getCropBoxData");
	firstZoom = false;
}

function setDataPostZoom(){
	var tmpData = $originalData;
	$dataHeight.val(Math.trunc(tmpData.height));
	$dataWidth.val(Math.trunc(tmpData.width));
}


function isImageZoomOut(){
	var currentData = $image.cropper("getImageData",true);
	
	var width = currentData.width;
	var height = currentData.height;
	
	if($initialImageData.width > width || $initialImageData.height > height){
		return true;
	}
	return false;
}

function isZoomIn(){
	var currentData = $image.cropper("getImageData",true);
	
	var width = currentData.width;
	var height = currentData.height;
	
	if($initialImageData.width < width || $initialImageData.height < height){
		return true;
	}
	return false;
}

function setInitialImageData(){
	var imageData = {}; 
	
	imageData = $image.cropper("getImageData",true);
	
	if(imageData.naturalWidth > imageData.width){
		$initialImageData.width = imageData.naturalWidth
	}else{
		$initialImageData.width = imageData.width;
	}
	
	if(imageData.naturalHeight > imageData.height){
		$initialImageData.height = imageData.naturalHeight;
	}else{
		$initialImageData.height = imageData.height;
	}
	
}
