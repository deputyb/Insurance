var urlReq = "search-hypertension.xml";
$(function(){
	//var requestSent = window.location.href;
	urlParam = $(location).attr('href').split('?')[1];
	if(urlParam != undefined){
		query = urlParam.split('=')[1].split('&')[0].replace(/\+/g,' ');
		query = query.replace(/%20/g, " ");
		$('input[name=searchPageInput]').val(query);
		//urlReq = "http://www.aetna.com/search/results.aspx?cfg=wwwaetnacom&query="+query;
		featuredStory(query);
		aetnaSearch(urlReq);
	}
	
	$('form.searchAgainForm').submit(function(){
		$('form.searchAgainForm input').blur();
		query = $('input[name=searchPageInput]').val();
		//urlReq = "http://www.aetna.com/search/results.aspx?cfg=wwwaetnacom&query="+query;
		aetnaSearch(urlReq);
		featuredStory(query);
		return false;
	});
	$('.paging').delegate('li.curr a', 'click', function(event){
		event.preventDefault();
	});
	$('.paging').delegate('a', 'click', function(event){
		event.preventDefault();
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
		query = $('input[name=searchPageInput]').val();
		//urlReq = "http://www.aetna.com/search/results.aspx?cfg=wwwaetnacom&query="+query+"&offset="+offset;
		if(offset == 0){
			featuredStory(query);
		}
		else{
			$('.featuredResultWrap').html("");
		}
		aetnaSearch(urlReq);
	});
	$('.results').delegate('a.spellSuggest', 'click', function(e){
		e.preventDefault();
		query = $(this).text();
		query = $.trim(query);
		$('input[name=searchPageInput]').val(query);
		//urlReq = "http://www.aetna.com/search/results.aspx?cfg=wwwaetnacom&query="+query;
		featuredStory(query);
		aetnaSearch(urlReq);
	});
	$('.resultStats').delegate('a.spellOff', 'click', function(event){
		event.preventDefault();
		urlReq = urlReq + "&spell=suggest";
		featuredStory(query);
		aetnaSearch(urlReq);
	});

});

function featuredStory(query){
	$.ajax({
		url: "http://www.aetna.com/search/api/healthline?query="+query,
		type: 'GET',
		dataType: 'json',
		success: function (data) {
		    displayFeatured(data);
		}
	});
}

function aetnaSearch(urlReq){
$.ajax({ 
      url: urlReq, 
	  dataType:"xml",
	  success: function (data) { 
		$('.results, .resultStats, .paging ul').html("");
		var query = $(data).find("Input").find("InputField[Name='query']").find("Value").text();
		var totalResults = $(data).find("ResultCount").text();
		if(totalResults <= 10 && totalResults > 0){
			displayResults(data);
			//createPaging(data);
		}
		else if(totalResults > 10){
			//$('.searchResults').fadeOut(500, function() { 
				$(this).empty();
				displayResults(data);
				createPaging(data);
			//});
		}
		else{
			/*There are no results, need to display this message*/
			var spellSuggest = $(data).find("QueryTransforms").find("QueryTransform[Name='FastQT_DidYouMean']").find("Value").text();
			if(spellSuggest != ""){
				$('.results').append('<p>Did you mean: <a href="" class="spellSuggest">'+spellSuggest+'</a></p>');
			}
			$('.results').append('<p>No Result(s) Found. Please modify your search terms and try again.</p>');
			
		}
		
	  } 
                
 });
}

function displayResults(response){
	$('.searchResults').addClass('on');
	var spellOff = "";
	var query = $(response).find("Input").find("InputField[Name='query']").find("Value").text();
	var searchTime = $(response).find("TimeUsed").text();
	var hitCount = $(response).find("Hits").text();
	var upToResult = $(response).find("CurMax").text();
	if(upToResult-9>0){
		startResult =  upToResult - 9;
	}
	else{
		startResult = 1;
	}
	var totalResults = $(response).find("ResultCount").text();
	spellOff = $(response).find("QueryTransforms").find("QueryTransform[Name='FastQT_DidYouMean']").find("Value").text();
	if(spellOff != ""){
		$('.resultStats').html('<p class="noMargin"><span class="redText">Showing results for '+spellOff+'.</span> Search instead for: <a href="#" class="spellOff">'+query+'</a></p><p class="ltGrayText">'+startResult+' to '+upToResult+' of '+totalResults+' results returned in '+searchTime+' seconds</p>');
	}
	else{
		$('.resultStats').html('<p class="noMargin"><span class="redText">Showing results for '+query+'.</span></p><p class="ltGrayText">'+startResult+' to '+upToResult+' of '+totalResults+' results returned in '+searchTime+' seconds</p>');
	}
	$(response).find("Results").find("Result").each(function(){
	     //grab each response item
		listingTitle = $(this).find("ResultField[Name='title']").find("Value").text();
		listingDesc = $(this).find("ResultField[Name='teaser']").find("Value").text();
		actualUrl = $(this).find("ResultField[Name='url']").find("Value").text();
		
		$('.results').append('<div class="searchResult"><h4><a href="'+actualUrl+'">'+listingTitle+'</a></h4><a href="'+actualUrl+'" class="link">'+actualUrl+'</a><p>'+listingDesc+'</p></div>');
		
	});
}

function displayFeatured(healthline){
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
	totalPages = Math.round(parseInt($(response).find("ResultCount").text())/10);
	var upToPage = 5;
	var downToPage = 1
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