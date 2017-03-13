<%@page import= "com.day.cq.wcm.api.components.IncludeOptions" %>
<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:if test="${!isEditMode}">
	<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
</c:if>
<cq:include path="topicHeader" resourceType="/apps/aetna/components/global/content/topicHeader"/>

<div class="template topic-template">
	<c:if test="${!isEditMode}">
		<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
	</c:if>
    <cq:include path="legalNotices" resourceType="/apps/aetna/components/global/content/legalNotices"/>
    <div id="main" tabindex="-1">
		<cq:include path="parsys" resourceType="/libs/foundation/components/parsys"/>
	</div>
	<div class="container-fluid newsTop greenbg"></div>
</div>