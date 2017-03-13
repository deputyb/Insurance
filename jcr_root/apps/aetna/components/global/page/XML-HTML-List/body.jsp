<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<body>
	<c:if test="${!isEditMode}"><% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %></c:if>
	<cq:include path="component" resourceType="/apps/aetna/components/global/content/xmlToHtmlList"/>
</body>