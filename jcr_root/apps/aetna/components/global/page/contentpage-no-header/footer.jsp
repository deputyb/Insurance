<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<%-- Footer inclusion --%>
<div class="hidden-phone">
	<c:if test="${isEditMode}">
		<div style="border: 1px solid black; padding: 10px; margin: 10px;">
			<div>Please configure Desktop footer in the next component</div>
	</c:if>
			
	<c:set var="footerPath" value="<%= NodeUtils.getInheritedNodeReference(currentPage, "footer") %>" scope="request" />
	
	<c:if test="${footerPath == null}">
		<c:set var="footerPath" value="footer" scope="request" />
		<c:set var="noFooterResource" value="true" scope="request" />
	</c:if>
	
	<c:choose>
		<c:when test="${!isEditMode}">	
			<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
			<cq:include path="${footerPath}" resourceType="/apps/aetna/components/global/content/footer/footer" />
		</c:when>
		<c:otherwise>
			<cq:include path="footer" resourceType="/apps/aetna/components/global/content/footer/footer" />
		</c:otherwise>
	</c:choose>
	
	<c:if test="${isEditMode}">
		</div>
	</c:if>
</div>
	
<c:remove var="footerPath" />
<c:remove var="noFooterResource" />
	
<%-- Mobile Footer inclusion --%>
<div<c:if test="${!isEditMode}"> class="visible-phone"</c:if>>
	<c:if test="${isEditMode}">
		<div style="border: 1px solid black; padding: 10px; margin: 10px;">
			<div>Please configure Mobile footer in the next component</div>
	</c:if>
				
	<c:set var="footerPath" value="<%= NodeUtils.getInheritedNodeReference(currentPage, "mobile-footer") %>" scope="request" />
	
	<c:if test="${footerPath == null}">
		<c:set var="footerPath" value="mobile-footer" scope="request" />
		<c:set var="noFooterResource" value="true" scope="request" />
	</c:if>
	
	<c:choose>
		<c:when test="${!isEditMode}">	
			<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
			<cq:include path="${footerPath}" resourceType="/apps/aetna/components/global/content/footer/footer" />
		</c:when>
		<c:otherwise>
			<cq:include path="mobile-footer" resourceType="/apps/aetna/components/global/content/footer/footer" />
		</c:otherwise>
	</c:choose>

	<c:if test="${isEditMode}">
		</div>
	</c:if>
</div>