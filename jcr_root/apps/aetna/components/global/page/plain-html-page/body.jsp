<%@page import= "com.day.cq.wcm.api.components.IncludeOptions" %>
<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:set var="geolocationClientId" value="<%= NodeUtils.getInheritedProperty(resource, "geolocationclientid", "") %>" />
<body class="whitebg"<c:if test="${not empty properties.interstitial}"> data-restricted-interstitial="true"</c:if><c:if test="${not empty properties.interstitialsessioncookie}"> data-interstitial-session-cookie="${properties.interstitialsessioncookie}"</c:if>
	<c:if test="${fn:length(htmlEntryManager.bodyTopEntries) > 0}">
		<c:forEach var="htmlEntry" items="${htmlEntryManager.bodyTopEntries}">
			${htmlEntry}
		</c:forEach>
	</c:if>
	<c:if test="${not empty properties.activategeolocation}"> data-activate-geolocation="true"<c:if test="${not empty geolocationClientId}"> data-geolocation-api-client-id="${geolocationClientId}"</c:if>
	<c:if test="${not empty properties.deactivatesafarigeolocation}"> data-deactivate-safari-geolocation="true"</c:if></c:if>>
	<div class="container-fluid">
		<div class="row-fluid">
			<div class="span12">
				<cq:include path="parsys" resourceType="/libs/foundation/components/parsys"/>
			</div>
		</div>
	</div>
	<c:if test="${fn:length(htmlEntryManager.bodyBottomEntries) > 0}">
		<c:forEach var="htmlEntry" items="${htmlEntryManager.bodyBottomEntries}">
			${htmlEntry}
		</c:forEach>
	</c:if>
</body>