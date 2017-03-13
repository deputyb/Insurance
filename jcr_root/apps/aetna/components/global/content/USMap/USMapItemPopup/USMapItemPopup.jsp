<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:choose>
	<c:when test="${not empty properties.state}">
		<div<c:if test="${!isEditMode}"> class="infoBox state-popup-${properties.state}"</c:if>>
			<h5 class="state-name"><c:if test="${isEditMode}">Popup - </c:if>${properties.statename}</h5>
			<c:if test="${isEditMode}">
				<div style="padding-left: 10px;">
			</c:if>
			${properties.popupcontent}
			<c:if test="${isEditMode}">
				</div>
			</c:if>
			<a href="#" class="close"></a>
		</div>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Double click to configure US Map Popup Item component
		</c:if>
	</c:otherwise>
</c:choose>