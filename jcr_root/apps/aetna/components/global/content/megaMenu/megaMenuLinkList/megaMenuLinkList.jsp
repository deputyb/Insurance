<%@include file="/apps/aetna/components/global/global.jsp"%>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:if test="${isEditMode}">	
	<div style="border: 1px solid white; padding: 3px; margin-bottom: 10px;">
		Links of the list
</c:if>

<c:if test="${not empty properties.includeSeparator}">
	<c:set var="listClass" value=" class=\"hrUnder\"" />
</c:if>

<ul${listClass}>
	<c:if test="${!isEditMode}">	
		<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
	</c:if>
	<cq:include path="list-links" resourceType="foundation/components/parsys" />
</ul>

<c:if test="${isEditMode}">	
	</div>
</c:if>