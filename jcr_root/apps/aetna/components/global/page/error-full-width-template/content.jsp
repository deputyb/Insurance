<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:if test="${!isEditMode}">
	<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
</c:if>
<div class="template article-template error-template" id="main" tabindex="-1">
	<div class="container-fluid" style="margin-right: 0px;margin-left: 0px;max-width: none;">								
		<cq:include path="content" resourceType="/apps/aetna/components/global/content/renditions/fullWidthTextImage"/>
	</div><!--/.container-fluid-->
</div><!--end .template-->
	    

