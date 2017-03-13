<%@include file="/apps/aetna/components/global/global.jsp"%>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
	<c:when test="${not empty properties.text}">
		${fn:replace(fn:replace(properties.text, '<p>', ''), '</p>', '')}
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Double click to configure the Footer Link component
		</c:if>
	</c:otherwise>
</c:choose>