<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<%-- Footer inclusion --%>
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
	
<c:remove var="footerPath" />
<c:remove var="noFooterResource" />