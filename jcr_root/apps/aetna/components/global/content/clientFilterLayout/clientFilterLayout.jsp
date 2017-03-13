<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:set var="filter" value="${properties.filter}"/>
<c:set var="hideDefaultContainer" value="${properties.hideDefaultContainer}"/>


	<c:choose>
		<c:when test="${isEditMode}">
			<div class="edit" style="margin: 0 10px 10px; padding: 10px; border: 1px solid black;">
				<div> Client Specific Layout component.</div>
		</c:when>
		<c:otherwise>
			<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY); %>
		</c:otherwise>
	</c:choose>
	
	<c:if test="${isEditMode}">
		<div style="margin: 0 10px 10px; padding: 10px; border: 1px solid blue;">
			<div>Drop the components for your client content according to configured filter in the next panel.</div>
	</c:if>	
		<c:if test="${not empty filter || isEditMode}">
			<div class="clientFilterSpecific ${filter}">
				<cq:include path="client-specific-content" resourceType="/libs/foundation/components/parsys" />
			</div>
		</c:if>	
	<c:if test="${isEditMode}">
		</div>
	</c:if>		
	
	<c:if test="${isEditMode}">
		<div style="margin: 0 10px 10px; padding: 10px; border: 1px solid green;">
			<div>Default content components</div>
	</c:if>		
		<div class="default ${filter} <c:if test="${not empty hideDefaultContainer}">only-client</c:if>	">
			<cq:include path="default-content" resourceType="/libs/foundation/components/parsys" />
		</div>
	<c:if test="${isEditMode}">
		</div>
	</c:if>		
	
<c:if test="${isEditMode}">
	</div>
</c:if>

