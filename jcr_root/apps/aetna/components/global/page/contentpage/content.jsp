<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:if test="${!isEditMode}">
	<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
</c:if>
<div class="template article-template">
	<div class="container-fluid">
		<div class="span12">
			<c:if test="${!isEditMode}">
				<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
			</c:if>
			<cq:include path="breadcrumb" resourceType="/apps/aetna/components/global/content/breadcrumb"/>
		</div>	
				
		<div id="main" tabindex="-1">
			<cq:include path="content" resourceType="/libs/foundation/components/parsys"/>
		</div>
	</div><!--/.container-fluid-->
</div><!--end .template-->
