<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:if test="${isEditMode}">
	<div style="margin-bottom: 15px;">
</c:if>
        
<c:choose>
	<c:when test="${not empty properties.title}">
		<c:if test="${isEditMode}">
        	<h5>Tab: ${properties.title}</h5>
        </c:if>
		<cq:include path="tab-item-content" resourceType="foundation/components/parsys"/>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Double click to configure the Tabs Item component
		</c:if>
	</c:otherwise>
</c:choose>

<c:if test="${isEditMode}">
	</div>
</c:if>