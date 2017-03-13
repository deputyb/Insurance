<%@include file="/apps/aetna/components/global/global.jsp"%>
<cq:setContentBundle />

<c:set var="isEditMode"
	value="<%=(WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode
					.fromRequest(request) == WCMMode.DESIGN)%>" />
<c:set var="searchType" value="searchformdesktop" />
<c:set var="searchIdA" value="globalSearch" />

<c:if test="${not empty currentStyle.isMobileSearch}">
	<c:set var="isMobileSearch" value="true" />
	<c:set var="searchType" value="searchformmobile" />
	<c:set var="searchId" value="mobileSearch" />
</c:if>

<c:if test="${not empty properties.searchLinkTarget}">
	<c:set var="searchLinkTarget" value="_blank"/>
</c:if>

<c:if test="${isEditMode}">
	<div class="row-fluid">
		<div class="span7 bodyContent">
</c:if>

<div class="searchField">
	<form class="searchAgainForm"
		action="<%=PageUtils.getResolvedPath(currentPage.getPath(), "#", slingRequest,
					pageContext)%>">
		<label name="searchAgain">${currentStyle.label}</label> <input
			type="text" name="query" id="${searchIdA}"
			value="${currentStyle.searchLabel}" /> <input type="submit" value=""
			class="search" title="search">
		<c:if test="${isMobileSearch == null}">
			<input type="submit" title="search" class="search hidden-phone"
				value="">
		</c:if>
	</form>
</div>

<script type="text/javascript">
	var searchTarget="${searchLinkTarget}";
</script>

<div class="searchResults">
	<div class="resultStats">
		<!-- RESULT STATS HERE-->
		
	</div><!--/.resultStats-->
	<div class="featuredResultWrap">
		<!--FEATURED RESULT HERE-->
		
	</div><!--/.featuredResult-->
	<div class="results">
		<!--SEARCH RESULTS HERE-->
	
	</div><!--/.results-->	
</div><!--/.searchResults-->

<div class="paging searchp">
	<ul>
		
	</ul>
</div><!--end .paging-->

<!--end .paging-->
<c:if test="${isEditMode}">
	</div>
	</div>
</c:if>
