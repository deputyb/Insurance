<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:set var="geolocationClientId" value="<%= NodeUtils.getInheritedProperty(resource, "geolocationclientid", "") %>" />
<body<c:if test="${not empty properties.interstitial}"> data-restricted-interstitial="true"</c:if><c:if test="${not empty properties.interstitialsessioncookie}"> data-interstitial-session-cookie="${properties.interstitialsessioncookie}"</c:if>
	<c:if test="${not empty properties.activategeolocation}"> data-activate-geolocation="true"<c:if test="${not empty geolocationClientId}"> data-geolocation-api-client-id="${geolocationClientId}"</c:if></c:if>>
	<c:if test="${fn:length(htmlEntryManager.bodyTopEntries) > 0}">
		<c:forEach var="htmlEntry" items="${htmlEntryManager.bodyTopEntries}">
			${htmlEntry}
		</c:forEach>
	</c:if>
    <div class="js-on">
		<c:if test="${!isEditMode}">
			<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
		</c:if>
	    
	    <div class="content-wrapper">    
			<cq:include path="content" script="content.jsp"/>
	
	        <a href="javascript:O_LC();" class="suggestionsLink"><span class="suggestionsIcon"></span>Feedback</a>	
	    </div><!--end content-wrapper-->
	
		<cq:include script="analytics.jsp" />
	</div>
	<c:if test="${fn:length(htmlEntryManager.bodyBottomEntries) > 0}">
		<c:forEach var="htmlEntry" items="${htmlEntryManager.bodyBottomEntries}">
			${htmlEntry}
		</c:forEach>
	</c:if>
</body>

