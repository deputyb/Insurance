<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<%-- interstitial inclusion --%>
<c:set var="interstitialPath" value="<%= NodeUtils.getInheritedNodeReference(currentPage, "interstitialWindow") %>" scope="request" />


<c:if test="${interstitialPath == null}">
	<c:set var="interstitialPath" value="interstitialWindow" scope="request" />
	<c:set var="noInterstitialResource" value="true" scope="request" />
</c:if>

<c:choose>
	<c:when test="${!isEditMode}">	
		<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
		<cq:include path="${interstitialPath}" resourceType="/apps/aetna/components/global/content/interstitialWindow" />
	</c:when>
	<c:otherwise>
		<cq:include path="interstitialWindow" resourceType="/apps/aetna/components/global/content/interstitialWindow" />
	</c:otherwise>
</c:choose>
	
<c:remove var="interstitialPath" />
<c:remove var="noInterstitialResource" />
