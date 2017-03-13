<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:if test="${isEditMode}">
	<c:choose>
		<c:when test="${not empty properties.state}">
			<div class="mapLink">
				<c:choose>
					<c:when test="${not empty properties.statenamedropdown}">
						<h5>Link - ${properties.statenamedropdown}</h5>
					</c:when>
					<c:otherwise>
						<h5>Link - ${properties.statename}</h5>
					</c:otherwise>
				</c:choose>
				<div style="padding-left: 10px;">
					<p><span class="mapHeader">URL: </span>${properties.href}</p>
				</div>
			</div>
		</c:when>
		<c:otherwise>
			Double click to configure US Map Link Item component
		</c:otherwise>
	</c:choose>
</c:if>