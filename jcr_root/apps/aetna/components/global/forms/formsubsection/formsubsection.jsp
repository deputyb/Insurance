<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:choose>
	<c:when test="${not empty properties.id}">
		<div id="${properties.id}"<c:if test="${isEditMode}"> style="margin: 10px;padding: 10px; border: 1px solid black;"</c:if>>
			<c:if test="${isEditMode}">
				<p>Drop the components for the "${properties.id}" form subsection</p>
			</c:if>
		<cq:include path="form-subsection-content" resourceType="foundation/components/parsys" />
		</div>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Double click to configure the Form subsection component
		</c:if>
	</c:otherwise>
</c:choose>