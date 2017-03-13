<%@page import="com.day.cq.wcm.api.components.IncludeOptions"%>
<%@include file="/apps/aetna/components/global/global.jsp"%>

<c:set var="isEditMode"
	value="<%=(WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode
					.fromRequest(request) == WCMMode.DESIGN)%>" />

<c:if test="${!isEditMode}">
	<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY); %>
</c:if>
<cq:include path="topicHeader" resourceType="/apps/aetna/components/global/content/topicHeader" />
<div class="template article-template html-form-tool">
	<div class="container-fluid">
		<div class="row-fluid breadcrumb">
			<div class="span12">
				<c:if test="${!isEditMode}">
					<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY); %>
				</c:if>
				<cq:include path="breadcrumb" resourceType="/apps/aetna/components/global/content/breadcrumb" />
			</div>
		</div>

		<cq:include path="legalNotices" resourceType="/apps/aetna/components/global/content/legalNotices" />
		<c:choose>
			<c:when test="${isEditMode}">
				<div class="row-fluid">
					<div class="span12">
						<div>The next component should be used to configure the tool source.
							It will be hidden in Preview or Publish mode.</div>
						<cq:include path="tool-source" resourceType="/apps/aetna/components/global/content/link" />
						<br/>
					</div>
				</div>
				
				<div class="row-fluid">
					<div class="span12">
						<div>The next component should be used to configure the tool image.
							It will be hidden in Preview or Publish mode. Leave it blank if the image is not required.</div>
						<cq:include path="tool-image" resourceType="/apps/aetna/components/global/content/renditions/image" />
						<br/>
					</div>
				</div>
			</c:when>
			<c:otherwise>
				<div class="hidden" id="main" tabindex="-1">
					<cq:include path="tool-source" resourceType="/apps/aetna/components/global/content/link" />
					<cq:include path="tool-image" resourceType="/apps/aetna/components/global/content/renditions/image" />
				</div>	
			</c:otherwise>
		</c:choose>
		
		<cq:include path="component" resourceType="/apps/aetna/components/global/content/htmlTool" />
	</div>

	<c:choose>
		<c:when test="${!isEditMode}">
			<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY); %>
		</c:when>
		<c:otherwise>
			<style>
				.newsHub {
					background-color: transparent;
				}
			</style>
		</c:otherwise>
	</c:choose>
	<cq:include path="newsHub" resourceType="/apps/aetna/components/global/content/newsHub" />
</div>