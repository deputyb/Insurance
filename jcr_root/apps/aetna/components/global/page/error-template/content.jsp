<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:if test="${!isEditMode}">
	<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
</c:if>
<div class="template article-template" id="main" tabindex="-1">
	<div class="container-fluid">				
		<cq:include path="content" resourceType="/apps/aetna/components/global/content/topicTextImage"/>
	</div><!--/.container-fluid-->
</div><!--end .template-->
	    
	    
