$(function(){
	$('body').addClass('vgrid').addClass('hgrid');
	fullHeight();
	$(window).resize(function(){
		fullHeight();
	});
	$('.vgridToggle').click(function(event){
		event.preventDefault();
		if($('body').hasClass('vgrid')){
			$('body').removeClass('vgrid');
		}
		else{
			$('body').addClass('vgrid');
		}
	});
	$('.vgrid6pxToggle').click(function(event){
		event.preventDefault();
		if($('body').hasClass('vgrid6px')){
			$('body').removeClass('vgrid6px');
		}
		else{
			$('body').addClass('vgrid6px');
		}
	});
	$('.hgridToggle').click(function(event){
		event.preventDefault();
		if($('body').hasClass('hgrid')){
			$('body').removeClass('hgrid');
		}
		else{
			$('body').addClass('hgrid');
		}
	});
});

function fullHeight(){
	if($(window).width() > 767){
		$('.fullheight').height($('body').height());
		
	}
	else{
		$('.fullheight').css('height', '');
	}
}