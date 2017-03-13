<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />


<c:if test="${isEditMode}">
	<div style="color: black;">
</c:if>

<c:choose>
	<c:when test="${not empty properties.RHCPathToImport}">
		<c:set var="RHCPath" value="${properties.RHCPathToImport}/jcr:content/column2" scope="request" />
		<c:choose>
			<c:when test="${!isEditMode}">	
				<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
				<cq:include path="${RHCPath}" resourceType="/libs/foundation/components/parsys"/>
			</c:when>
			<c:otherwise>
				<div style="margin-top: 10px; padding:10px; border: 2px solid black;">
					The content for Global RHC is imported from <a style="color: black;" href="${properties.RHCPathToImport}.html">${properties.RHCPathToImport}.html</a><br/>
					Editing here the components imported or adding new components, will update the original RHC and all Global RHC linked to it.
					
					<cq:include path="${RHCPath}" resourceType="/libs/foundation/components/parsys"/>
				</div>	
			</c:otherwise>
		</c:choose>		

	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">	
			<div style="padding:10px; border: 2px solid #eee;">
				Right click to edit component.
			</div>	
		</c:if>	
	</c:otherwise>
</c:choose>

<c:if test="${isEditMode}">
	</div>
</c:if>