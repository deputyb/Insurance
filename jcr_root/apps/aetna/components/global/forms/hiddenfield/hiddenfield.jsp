<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:choose>
    <c:when test="${not empty properties.name}">
		<c:choose>
			<c:when test="${!isEditMode}">
				<input type="hidden" name="${properties.name}" value="${properties.value}" />
			</c:when>
			<c:otherwise>
				<p style="margin: 0;"><b>Hidden field: ${properties.name}:</b> ${properties.value}</p>
			</c:otherwise>
		</c:choose>
    </c:when>
    <c:otherwise>
    	<c:if test="${isEditMode}">
			Double click to configure Hidden Field component
		</c:if>
    </c:otherwise>
</c:choose>