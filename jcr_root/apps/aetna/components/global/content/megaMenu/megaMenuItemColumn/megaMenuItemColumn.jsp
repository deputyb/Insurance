<%@include file="/apps/aetna/components/global/global.jsp"%>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<%--<div class="fiveCol<c:if test="${not empty properties.isDoubleColumn}"> twoCol</c:if>"> --%>
	<c:if test="${not empty properties.isDoubleColumn}">
		<c:if test="${!isEditMode}">	
			<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
		</c:if>
		
		<cq:include path="col-title-panel" resourceType="foundation/components/parsys" />
		
		<span class="span6 col1">
	</c:if>
	
	<c:if test="${!isEditMode}">
		<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
	</c:if>
	<cq:include path="col-panel-1" resourceType="foundation/components/parsys" />
	
	<c:if test="${not empty properties.isDoubleColumn}">
		</span>
		
		<c:if test="${!isEditMode}">	
			<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
		</c:if>
		
		<span class="span6 col2">
			<cq:include path="col-panel-2" resourceType="foundation/components/parsys" />
		</span>
	</c:if>
<%--</div> --%>