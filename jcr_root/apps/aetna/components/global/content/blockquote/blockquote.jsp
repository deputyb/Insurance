<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
	<c:when test="${not empty properties.text}">
		<div class="quoteText">${properties.text}</div>
		<div class="quoteAuthor">${properties.author}</div>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Double click to configure Blockquote component
		</c:if>
	</c:otherwise>
</c:choose>