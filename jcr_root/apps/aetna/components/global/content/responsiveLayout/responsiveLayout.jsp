<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<div<c:if test="${not empty properties.type && !isEditMode}"> class="${properties.type}"</c:if>>
	<c:choose>
		<c:when test="${isEditMode}">
			<div style="margin: 0 10px 10px; padding: 10px; border: 1px solid black;">
				<div>Drop the components you want to to configure for responsive layout in the next panel.
				<c:if test="${not empty properties.type}">Actual selected layout type is: <b>${properties.type}</b></c:if></div>
		</c:when>
		<c:otherwise>
			<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY); %>
		</c:otherwise>
	</c:choose>
	
	<cq:include path="responsive-content" resourceType="/libs/foundation/components/parsys" />
	
	<c:if test="${isEditMode}">
		</div>
	</c:if>
</div>