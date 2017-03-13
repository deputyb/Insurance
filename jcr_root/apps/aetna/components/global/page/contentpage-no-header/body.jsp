<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:set var="geolocationClientId" value="<%= NodeUtils.getInheritedProperty(resource, "geolocationclientid", "") %>" />
<body class="blank"<c:if test="${not empty properties.interstitial}"> data-restricted-interstitial="true"</c:if><c:if test="${not empty properties.interstitialsessioncookie}"> data-interstitial-session-cookie="${properties.interstitialsessioncookie}"</c:if>
	<c:if test="${not empty properties.activategeolocation}"> data-activate-geolocation="true"<c:if test="${not empty geolocationClientId}"> data-geolocation-api-client-id="${geolocationClientId}"</c:if>
	<c:if test="${not empty properties.deactivatesafarigeolocation}"> data-deactivate-safari-geolocation="true"</c:if></c:if>>
	<c:if test="${fn:length(htmlEntryManager.bodyTopEntries) > 0}">
		<c:forEach var="htmlEntry" items="${htmlEntryManager.bodyTopEntries}">
			${htmlEntry}
		</c:forEach>
	</c:if>
    <div class="js-on">
    	<a class="skip-main" href="#main" tabindex="1">Skip to main content</a>
        <!-- Client Context STARTS here -->
        <cq:include path="clientcontext" resourceType="cq/personalization/components/clientcontext"/>
        <!-- Client Context ENDS here -->
    <div class="content router-content">
   		<cq:include path="content" script="content.jsp"/>
   		
   		<cq:include script="footer.jsp" />
		
    </div>  <!--end content-->
</div>
</div>
    <cq:include script="analytics.jsp" />
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
			<cq:include path="noJS" resourceType="/apps/aetna/components/global/content/noJs" />
		</c:otherwise>
	</c:choose>
	<%-- END NoJS configuration and inclusion --%>
	<cq:includeClientLib js="aetna.personalization"/>
	<c:if test="${fn:length(htmlEntryManager.bodyBottomEntries) > 0}">
		<c:forEach var="htmlEntry" items="${htmlEntryManager.bodyBottomEntries}">
			${htmlEntry}
		</c:forEach>
	</c:if>
</body>

