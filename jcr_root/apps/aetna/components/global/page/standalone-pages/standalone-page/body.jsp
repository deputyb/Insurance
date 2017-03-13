<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:set var="geolocationClientId" value="<%= NodeUtils.getInheritedProperty(resource, "geolocationclientid", "") %>" />
<body<c:if test="${not empty properties.interstitial}"> data-restricted-interstitial="true"</c:if><c:if test="${not empty properties.interstitialsessioncookie}"> data-interstitial-session-cookie="${properties.interstitialsessioncookie}"</c:if>
	<c:if test="${not empty properties.activategeolocation}"> data-activate-geolocation="true"<c:if test="${not empty geolocationClientId}"> data-geolocation-api-client-id="${geolocationClientId}"</c:if>
	<c:if test="${not empty properties.deactivatesafarigeolocation}"> data-deactivate-safari-geolocation="true"</c:if></c:if>>
	<c:if test="${fn:length(htmlEntryManager.bodyTopEntries) > 0}">
		<c:forEach var="htmlEntry" items="${htmlEntryManager.bodyTopEntries}">
			${htmlEntry}
		</c:forEach>
	</c:if>
    <div class="js-on">
        <!-- Client Context STARTS here -->
        <cq:include path="clientcontext" resourceType="cq/personalization/components/clientcontext"/>
        <!-- Client Context ENDS here -->
		<c:if test="${!isEditMode}">
			<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
		</c:if>
	    <cq:include path="masthead" resourceType="/apps/aetna/components/global/content/standalonePages/masthead"/>
	    
	    <div class="content-wrapper">    
			<cq:include path="content" script="content.jsp"/>
	   		
	   		<cq:include script="footer.jsp" />
			
	    </div><!--end content-wrapper-->
	
		<cq:include script="analytics.jsp" />
	</div>
	
	<%-- NoJS configuration and inclusion --%>
	<c:set var="jsPath" value="<%= NodeUtils.getInheritedNodeReference(currentPage, "noJS") %>" scope="request" />

	<c:if test="${jsPath == null}">
		<c:set var="jsPath" value="noJS" scope="request" />
		<c:set var="noJSResource" value="true" scope="request" />
	</c:if>

	<c:choose>
		<c:when test="${!isEditMode}">	
			<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
			<cq:include path="${jsPath}" resourceType="/apps/aetna/components/global/content/noJs" />
		</c:when>
		<c:otherwise>
			<style>
				.masthead {
					min-height: 58px;
				}
			</style>
			<cq:include path="noJS" resourceType="/apps/aetna/components/global/content/noJs" />
		</c:otherwise>
	</c:choose>
	<%-- END NoJS configuration and inclusion --%>
	
	<%-- Script to include hidden interstitial window --%>
	<cq:include script="interstitialWindow.jsp" />
	<c:if test="${not empty properties.interstitial}">
		<a href="#" id="restricted-interstitial" class="${properties.interstitial} external-init external-session"></a>
	</c:if>	
	<c:if test="${!isEditMode}">
		<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
	</c:if>
	<c:if test="${isEditMode}">
		<div style="border: 1px solid black; padding: 10px; margin: 10px;">
			Drop here the extra interstitial components that you want to include in the page
	</c:if>
	<cq:include path="extra-interstitials" resourceType="foundation/components/parsys"/>
	<c:if test="${isEditMode}">
		</div>
	</c:if>
    <cq:includeClientLib js="aetna.personalization"/>	
	<cq:includeClientLib css="aetna.onlineopinionV5"/>
	<cq:includeClientLib js="aetna.onlineopinionV5"/>
	<noscript>This JavaScript enables OnlineOpinion, a method for collecting secure feedback data.</noscript>
	<c:if test="${fn:length(htmlEntryManager.bodyBottomEntries) > 0}">
		<c:forEach var="htmlEntry" items="${htmlEntryManager.bodyBottomEntries}">
			${htmlEntry}
		</c:forEach>
	</c:if>
</body>