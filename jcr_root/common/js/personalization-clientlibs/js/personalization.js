var Aetna = Aetna || {};

Aetna.Personalization = {
	teaserLoadingCallbacks : []
}

$(function(){
	$('.audience.producer').click(function(event){
		ClientContext.set('/profile/audience','Producer')
	});

	$('.audience.navinet').click(function(event){
		ClientContext.set('/profile/audience','Navinet')
	});

	$('.audience.Precert').click(function(event){
		ClientContext.set('/profile/audience','Precert')
	});

	$('.audience.CPB').click(function(event){
		ClientContext.set('/profile/audience','CPB')
	});

	$('.audience.Claims').click(function(event){
		ClientContext.set('/profile/audience','Claims')	
	});
	
	//listen ajax calls to get teasers when are finish
	 $(document).ajaxStop(checkTeaserLoaded);
	 
	//listen for the store profile registration
	CQ_Analytics.ClientContextUtils.onStoreRegistered("profile", loadRHC);

	
});

//These is run on the function Aetna.analytics.omniture.linkCode. It checks the s object to see if there is need to change the audience
function checkAudienceLink(){
	if((s["eVar24"] != undefined) && (s["eVar24"].toLowerCase()=="login:producers")){
		ClientContext.set('/profile/audience','Producer');
	}

	if((s["prop31"] != undefined) && (s["prop31"].toLowerCase()=="exited to navinet")){
		ClientContext.set('/profile/audience','Navinet');
	}
}

// Checks the page url. To see if there is a change of audience. 
$(function(){
	var url =  document.URL;

	//Checks url to set the audience 
	if (url.indexOf("precertification") > -1){
		ClientContext.set('/profile/audience','Precert');
	}

	if (url.indexOf("clinical-policy") > -1){
		ClientContext.set('/profile/audience','CPB');
	}

	if (url.indexOf("claims-payment-reimbursement") > -1){
		ClientContext.set('/profile/audience','Claims');
	}

	//Saves the entry page in session storage.
	if(sessionStorage != undefined){
		if (sessionStorage.entryPage == undefined){
			sessionStorage.entryPage = s.pageName;
		}
		ClientContext.set('/profile/entryPage',sessionStorage.entryPage);
	}

});

// handles display on personalize RHC
function loadRHC() {
	// Validate audience RHC for producer teaser, if it is producer audience, then it will hide page current rhc and only shows producer teaser
	if (ClientContext.get('/profile/audience') == 'Producer' && Aetna.isCQPreviewMode) {
		var sidebarEl = $('#sidebar-right');
		
		// Perform the operation only when personalization components are present
		if ($('.teaser', sidebarEl).length > 0) {
			var globalRHCEl = $('.globalRHC', sidebarEl);
			
			// in case component globalRHC is used to import rhc content from other page
			if (globalRHCEl.length > 0){
				globalRHCEl.children('div:not(.teaser)').hide();
			} else {
				sidebarEl.children('div:not(.teaser)').hide();
			}
		}
	}
	
	//per default right side bar is hidden.  After sidebar content is set, then it would be shown that way flickering will be avoid
	$('#sidebar-right').removeClass('hidden');
}

//Check for condition after teasers are loaded on page 
function checkTeaserLoaded() {
	sliderInit();

	// handles the lazy image load
	loadImages();
	
	// Execute each other personalization callbacks
	for (var indexCallback = 0; indexCallback < Aetna.Personalization.teaserLoadingCallbacks.length; indexCallback++) {
		Aetna.Personalization.teaserLoadingCallbacks[indexCallback]();
	}
}

