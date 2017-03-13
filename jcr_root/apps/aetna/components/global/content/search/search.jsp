<%@include file="/apps/aetna/components/global/global.jsp" %>
<cq:setContentBundle/>

<c:set var="searchType" value="searchformdesktop" />
<c:set var="searchId" value="globalSearch" />

<c:set var="resultsURL"  value="<%= currentStyle.get("resultsURL", "") %>" />
<c:set var="searchLabel" value="${currentStyle.searchLabel}" />
<c:set var="inheritedIsMobileSearch" value="" />

<%-- Check if it is the search included on masthead to be display on mobile,
look design properties for page where it is inherited
--%>
<c:if test="${isSearchOnMenuItem == 'true'}">
	<%
		// get corresponding inheritage page design node
    	Node designSearchNode =  PageUtils.getDesignSearchNode(resourceResolver, currentStyle);
    	
		if (designSearchNode != null) {
			String inheritedIsMobileSearch = PageUtils.getPropertyFromNode(designSearchNode, "isMobileSearch");
			if(StringUtils.isNotBlank(inheritedIsMobileSearch)){
				pageContext.setAttribute("inheritedIsMobileSearch",inheritedIsMobileSearch);
			} 
			
			String inheritedResultsURL = PageUtils.getPropertyFromNode(designSearchNode, "resultsURL");
			if(StringUtils.isNotBlank(inheritedResultsURL)){
				pageContext.setAttribute("resultsURL",inheritedResultsURL); 
			}		
			
			String inheritedSearchLabel = PageUtils.getPropertyFromNode(designSearchNode, "searchLabel");
			if(StringUtils.isNotBlank(inheritedSearchLabel)){
				pageContext.setAttribute("searchLabel",inheritedSearchLabel); 
			}			
		}
	 %>
	 
	<c:set var="isMobileSearch" value="true" />
	<c:set var="searchType" value="searchformmobile" />
	<c:set var="searchId" value="mobileSearch" /> 
</c:if>

<form class="${searchType}" action="<%= PageUtils.getResolvedPath(pageContext.getAttribute("resultsURL").toString(), "#", slingRequest, pageContext) %>">
	<span class="roundCorner roundLeft"></span><input type="text" class="<c:if test="${isMobileSearch == null}">globalSearch </c:if>placeholder" id="${searchId}" value="${searchLabel}" /><span class="roundCorner roundRight"></span>
	<input type="submit" title="search" class="search" value="">
</form>