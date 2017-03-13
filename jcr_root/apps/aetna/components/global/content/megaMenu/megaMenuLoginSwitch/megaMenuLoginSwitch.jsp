<%@include file="/apps/aetna/components/global/global.jsp"%>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:if test="${isEditMode || not empty properties.loginavailable}">
	<c:if test="${isEditMode}">
		<h5 style="color: white;">Login available? ${not empty properties.loginavailable}</h5>
		<div style="margin: 5px; padding: 5px; border: 1px solid white;">
			<p style="color: white;">Include here the components related to the Login form</p>
	</c:if>	
	<cq:include path="parsys" resourceType="foundation/components/parsys" />
	<c:if test="${isEditMode}">
		</div>
	</c:if>
</c:if>
<c:if test="${isEditMode || empty properties.loginavailable}">
	<c:if test="${isEditMode}">
		<div style="margin: 5px; padding: 5px; border: 1px solid white;">
			<p style="color: white;">Message to display when the Login form is not available</p>
	</c:if>	
	<cq:text property="text"/>
	<c:if test="${isEditMode}">
		</div>
	</c:if>
</c:if>