var urlReq = "";
var currentSearchDomain = location.hostname;
var urlSearch = "//"+currentSearchDomain+"/search/results.aspx?";
//var urlHealthline = "//"+currentSearchDomain+"/search/api/healthline?query=";
var useSuggestSpell = false;

if (currentSearchDomain.indexOf('aetna.com') == -1) {
	urlSearch = '//' + location.hostname + ':' + location.port + '/services/ajax/search?';
} 

$(function(){
	if (location.pathname.indexOf("search-results") > -1) {
		var params = getUrlParams();
		var searchType = determineSearch(params);
		var suggestedSpell = useSuggestSpell ? '&spell=suggest' : '';

		$('input[name=query]').val(params.query.replace(/\+/g, ' '));
		$('meta[name="WT.oss"]').attr('content', params.query);
		
		// Check the search to perform
		if (searchType == 0) {
			urlReq = urlSearch + 'cfg=wwwaetnacom&query=';
			//featuredStory(params.query);
			aetnaSearch(urlReq + params.query + suggestedSpell);
		} else if (searchType == 1) {
			var selectYearEL = $('<select class="year" name="YearSelect"></select>');
			var selectYearWrapperEl = $('<div class="year-wrapper"></div>');
			var years = fillYearDropdown(params);
			
			for (var indexYear = 0; indexYear < years.length; indexYear++) {
				selectYearEL.append(years[indexYear]);
			}
			
			selectYearWrapperEl.append(selectYearEL);
			selectYearWrapperEl.insertAfter($('.searchAgainForm label[name="searchAgain"]'));
			
			// Pharmacy
			urlReq = urlSearch + objToUrl(params);
			aetnaSearch(urlReq + suggestedSpell);
		} else if (searchType == 2) {
			// Medical
			urlReq = urlSearch + 'cfg=wwwaetnacom&cat=CPBs&query=';
			aetnaSearch(urlReq + params.query + suggestedSpell);
		}
		
		$('.searchAgainForm').each(function(index, element) {
			var seachForm = $(element);
			
			$.each(params, function(key, value) {
				if (key != 'query' && key != 'YearSelect') {
					seachForm.append('<input type="hidden" name="' + key + '" value="' + value + '" />');
				}
			});
		});
	}

	$('.paging').delegate('li.curr a', 'click', function(event){
		event.preventDefault();
	});
	$('.paging').delegate('a', 'click', function(event){
		event.preventDefault();
		var suggestedSpell = useSuggestSpell ? '&spell=suggest' : '';
		
		$('html,body').animate({scrollTop: 0}, 500);
		if($(this).parent('li').hasClass('next')){
			currOffset = $('.paging li.curr a').attr('data-offset');
			offset = parseInt(currOffset) + 10;
		}
		else if($(this).parent('li').hasClass('prev')){
			currOffset = $('.paging li.curr a').attr('data-offset');
			offset = parseInt(currOffset) - 10;
		}
		else if($(this).parent('li').hasClass('first')){
			offset = 0;
		}
		else if($(this).parent('li').hasClass('last')){
			offset = parseInt($('.paging li.last a').attr('data-offset'));
		}
		else{
			offset = $(this).attr('data-offset');
		}
		query = $('input[name=query]').val();
		
		if(offset == 0){
			//featuredStory(query);
		}
		else{
			$('.featuredResultWrap').html("");
		}
		
		// Check if the query has to be added to the URL or it already includes it
		if (urlReq.indexOf('cfg=wwwcpcpbext') > -1) {
			query = '';
		}
		
		aetnaSearch(urlReq + query + "&offset=" + offset + suggestedSpell);
	});
	$('.results').delegate('a.spellSuggest', 'click', function(e){
		e.preventDefault();
		var suggestedSpell = useSuggestSpell ? '&spell=suggest' : '';
		query = $(this).text();
		query = $.trim(query);
		$('input[name=query]').val(query);
		//featuredStory(query);
		aetnaSearch(urlReq + query + suggestedSpell);
	});
	$('.resultStats').delegate('a.spellOff', 'click', function(event){
		event.preventDefault();
		var query = $('input[name=query]').val();
		//featuredStory(query);
		aetnaSearch(urlReq + query + "&spell=off");
		useSuggestSpell = true;
	});

	if ($('.form-wrapper .dropdown .year').length > 0) {
		var selectYearOptions = $('.form-wrapper .dropdown select.year option');
		var years = '';
		
		for (var indexYear = 0; indexYear < selectYearOptions.length; indexYear++) {
			years += $(selectYearOptions[indexYear]).attr('value') + '-';
		}

		selectYearOptions.closest('form').append($('<input type="hidden" name="years" value="' + 
				years.substring(0, years.length - 1) + '" />'));
	}
});

function getUrlParams() {
	var indexSearch = window.location.search.indexOf('?');
	var params = {};
	
	if (indexSearch != -1) {
		var pairs = window.location.search.substring(indexSearch + 1, window.location.search.length).split('&');
		var nameVal;
		var paramName;
		
		for (var indexPair = 0; indexPair < pairs.length; indexPair++) {
			nameVal = pairs[indexPair].split('=');
			
			if (nameVal[1] && nameVal[1] != '') {
				params[unescape(nameVal[0])] = unescape(nameVal[1]);
			}
		}
	}
	
	return params;
}

function objToUrl(params) {
	var result = '';
	
	$.each(params, function(key, value) {
		result += key + '=' + value + '&';
	});
	
	return result.substring(0, result.length - 1);
}

function determineSearch(params) {
	if (paramInObj(params, 'cfg', 'wwwcpcpbext')) {
		return 1;		// Pharmacy search
	} else if (paramInObj(params, 'cat', 'CPBs')) {
		return 2;		// Medical
	} else if (paramInObj(params, 'query', '')) {
		return 0;		// Global search
	}
}

function paramInObj(obj, param, value) {
	return obj[param] && (obj[param] == value || param == 'query');
}

function fillYearDropdown(params) {
	var years = [];
	var configuredYears = params.years.split('-');
	
	for (var indexYear = 0; indexYear < configuredYears.length; indexYear++) {
		var optionYear = '<option';
		
		if (configuredYears[indexYear] == params.YearSelect) {
			optionYear += ' selected="selected"';
		}
		
		optionYear += '>' + configuredYears[indexYear] + '</option>';
		years.push(optionYear);
	}
	
	return years;
}

function featuredStory(query){
	$.ajax({
		url: urlHealthline+query,
		type: 'GET',
		dataType: 'json',
		success: function(data) {
		    displayFeatured(data, query);
		}
	});
}

function aetnaSearch(urlReq){
	var query = urlReq.split('query=')[1];
	query = query.split('&')[0];
$.ajax({ 
      url: urlReq, 
	  dataType:"xml",
	  success: function (data) { 
		$('.results, .resultStats, .paging ul').html("");
		var query = $(data).find("Input").find("InputField[Name='query']").find("Value").text();
		var totalResults = $(data).find("ResultCount").text();
		$('meta[name="WT.oss"]').attr('content', query);
		$('meta[name="WT.oss_r"]').attr('content', totalResults );
      _tag.dcsCollect();
      	if(totalResults <= 10 && totalResults > 0){
			displayResults(data);
			//createPaging(data);
			createRefineSearch(data);
			Aetna.analytics.omniture.linkCode('search','SERP (successful results)', this, query);
			s.tl(this,'o',linkText,null,'navigate');
			return false;
		}
		else if(totalResults > 10){
			//$('.searchResults').fadeOut(500, function() { 
				$(this).empty();
				displayResults(data);
				createRefineSearch(data);
				createPaging(data);
			//});
				Aetna.analytics.omniture.linkCode('search','SERP (successful results)', this, query);
				s.tl(this,'o',linkText,null,'navigate');
				return false;
		}
		else{
			/*There are no results, need to display this message*/
			var spellSuggest = $(data).find("QueryTransforms").find("QueryTransform[Name='FastQT_DidYouMean']").find("Value").text();
			if(spellSuggest != ""){
				$('.resultStats').append('<p class="noMargin"><span class="redText">Showing results for "'+$.trim(spellSuggest)+'".</span> Search instead for: <a href="#" class="spellOff">'+query+'</a></p>');
			}
			$('.results').append('<p>No Result(s) Found. Please modify your search terms and try again.</p>');
			Aetna.analytics.omniture.linkCode('search','SERP (unsuccessful results)', this, query);
			s.tl(this,'o',linkText,null,'navigate');
			return false;
		}
		
	  } 
                
 });
}

function displayResults(response){
	$('.searchResults').addClass('on');
	var query = $(response).find("Input").find("InputField[Name='query']").find("Value").text();
	var searchTime = $(response).find("TimeUsed").text();
	var hitCount = $(response).find("Hits").text();
	hitCountDisplay = parseInt(hitCount)-1;
	var upToResult = $(response).find("CurMax").text();
	if(upToResult-9>0){
		startResult =  upToResult - hitCountDisplay;
	}
	else{
		startResult = 1;
	}
	var totalResults = $(response).find("ResultCount").text();
	var spellSuggest = $(response).find("QueryTransforms").find("QueryTransform[Name='FastQT_DidYouMean']").find("Value").text();
	if(spellSuggest != ""){
		query = $.trim(spellSuggest);
	}
	$('.resultStats').html('<p class="noMargin"><span class="redText">Showing results for '+query+'.</span></p><p class="ltGrayText">'+startResult+' to '+upToResult+' of '+totalResults+' results returned in '+searchTime+' seconds</p>');
	$(response).find("Results").find("Result").each(function(){
	     //grab each response item
		listingTitle = $(this).find("ResultField[Name='title']").find("Value").text();
		listingDesc = $(this).find("ResultField[Name='teaser']").find("Value").text();
		actualUrl = $(this).find("ResultField[Name='url']").find("Value").text();
		
		$('.results').append('<div class="searchResult"><h4><a href="'+actualUrl+'" target="'+searchTarget+'">'+listingTitle+'</a></h4><a href="'+actualUrl+'" class="link">'+actualUrl+'</a><p>'+listingDesc+'</p></div>');
		
	});
}

function displayFeatured(healthline, query){
	$('.featuredResultWrap').html("");
	if(healthline.MetaSearchMatch == "yes"){
		var featuredHtml = "";
		featuredHtml += '<div class="featuredResult"><h4><a href="'+healthline.Link+'">'+healthline.Title+'</a></h4>';
		featuredHtml += '<p>Look here for a broad range of information on your search topic in one convenient location. Findings may include health content, local area doctors, cost of care information, relevant Aetna policies and more.</p>';
		var categories = new Array();
		var categories2 = new Array();
		var counter = 0;
		$.each(healthline.Categories, function(index, category){
			counter = counter+1;
			if(counter < 5){
				var s = '<li><a href="'+category.Link+'">'+category.Title+'</a></li>';
				categories[index] = s;
			}
			else{
				var s2 = '<li><a href="'+category.Link+'">'+category.Title+'</a></li>';
				categories2[index] = s2;
			}
		});
		featuredHtml += '<ul>'+categories.join("")+'</ul><ul>'+categories2.join("")+'</ul></div>';
		$('.featuredResultWrap').append(featuredHtml);
	} else {
	}
}

function createPaging(response){
	if($(window).width() > 767){
		createPagingDesktop(response);
	}
	else{
		createPagingMobile(response);
	}
}

function createPagingDesktop(response){
	pagiHtml = "";
	totalPages = Math.round(parseInt($(response).find("ResultCount").text())/10)+1;
	currPage = $(response).find("Paging").find("PagingField[Current='true']").attr('Name');
	if(currPage != 1 ){
		pagiHtml += '<li class="prev"><a href="#" data-offset="10">Previous</a></li>';
		pagiHtml += '<li class="first"><a href="#">First</a></li>';
	}
	$(response).find("Paging").find("PagingField").each(function(){
		offset = $(this).attr("Offset");	
		name = $(this).attr("Name");
		current = $(this).attr("Current");
			if(current == "true"){
				pagiHtml += '<li class="curr"><a href="#" data-offset="'+offset+'">'+name+'</a></li>';
			}
			else if(name != "Previous" && name != "Next"){
				pagiHtml += '<li><a href="#" data-offset="'+offset+'">'+name+'</a></li>';
			}	
	});
	if(currPage != totalPages){
		lastPage = Math.floor(parseInt($(response).find("ResultCount").text())/10)*10;
		pagiHtml += '<li class="last"><a href="#" data-offset="'+lastPage+'">Last</a></li>';
		pagiHtml +='<li class="next"><a href="#" data-offset="10">Next</a></li>';
	}
	$('.paging ul').empty().append(pagiHtml);
	
}
function createPagingMobile(response){
	pagiHtml = "";
	currPage = parseInt($(response).find("Paging").find("PagingField[Current='true']").attr('Name'));
	totalPages = Math.round(parseInt($(response).find("ResultCount").text())/10) + 1;
	var upToPage = 5;
	var downToPage = 1
	if (totalPages < upToPage) {
		upToPage = totalPages;
	}
	if(currPage >= 5){
		upToPage = currPage + 2;
		if(upToPage > totalPages-2){
			upToPage = totalPages;
		}
		downToPage = currPage - 2;
	}
	if(currPage != 1 ){
		pagiHtml += '<li class="prev"><a href="#" data-offset="10">Prev</a></li>';
	}
	for(var i=downToPage; i<=upToPage;i++){
		offset = (i*10)-10;
		if(i == currPage){
			pagiHtml += '<li class="curr"><a href="#" data-offset="'+offset+'">'+i+'</a></li>';
		}
		else{
			pagiHtml += '<li><a href="#" data-offset="'+offset+'">'+i+'</a></li>';
		}
	}
	if(currPage != totalPages){
		pagiHtml +='<li class="next"><a href="#" data-offset="10">Next</a></li>';
	}
	$('.paging ul').empty().append(pagiHtml);
}

function createRefineSearch(response) {
	var searchRefineEl = $('.search-refine-results');
	
	if (searchRefineEl.length > 0) {
		var navigatorModifiers = $(response).find('Navigators Navigator[Name="cpbclassnavigator"] Modifier');
		var actualModifier;
		var actualModiferName;
		var actualModiferAction;
		var actualModifierState;
		
		if (navigatorModifiers.length > 0) {
			navigatorModifiers.each(function(index, modifier) {
				actualModifier = $(modifier);
				actualModiferName = $('DisplayName', actualModifier).text();
				actualModiferAction = $('Action', actualModifier).text();
				
				if (actualModifier.attr('Active') == 'true') {
					actualModifierState = ' <span>(back)</span>';
				} else {
					actualModifierState = ' (' + actualModifier.attr('Count') + ')';
				}
				
				searchRefineEl.append('<a href="#" data-modifer-action="' + actualModiferAction + 
						'">' + actualModiferName + actualModifierState + '</a>');
			});
			
			$('.search-refine-results a').click(function() {
				var searchForm = $('.searchAgainForm');
				
				if ($('span', $(this)).length == 0) {
					var hiddenConfig = $(this).attr('data-modifer-action').split(':');
					searchForm.append('<input type="hidden" value="' + hiddenConfig[1] + 
							'" name="' + hiddenConfig[0] + '" />');
				} else {
					$('input[name="cpbclassnavigator"]', searchForm).remove();
				}
				
				searchForm.submit();
			});
		}
	}
}