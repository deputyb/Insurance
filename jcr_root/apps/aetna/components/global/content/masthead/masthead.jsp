<%@include file="/apps/aetna/components/global/global.jsp"%>
<%@page import="com.aetna.cq.common.cq.utils.NodeUtils" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:set var="logoImg" value="<%= NodeUtils.getInheritedResolvedPathProperty(resource, "primaryLogo/fileReference", "/common/images/designs/logo.png", slingRequest, pageContext) %>" />
<c:set var="logoAlt" value="<%= NodeUtils.getInheritedProperty(resource, "logoAlt", "logo") %>" />
<c:set var="logoTitle" value="<%= NodeUtils.getInheritedProperty(resource, "logoTitle", "") %>" />
<c:set var="logoUrl" value="<%= NodeUtils.getInheritedProperty(resource, "logoUrl", "") %>" />
<c:set var="isEmergencyMessageConfigured" value="<%= NodeUtils.nodeHasChildrenNodes(currentNode, "emergency-message") %>" />
<c:if test="${not empty logoUrl}">
	<c:set var="logoUrl" value="<%= PageUtils.getResolvedPath((String) pageContext.getAttribute("logoUrl"), "#", slingRequest, pageContext) %>" />
</c:if>
<div class="<c:if test="${!isEditMode}">fixedHeaderWrap </c:if>removeMobile">

	<%-- BrowserDetection configuration and inclusion --%>
	<c:set var="browserDetectPath" value="<%= NodeUtils.getInheritedNodeReference(currentPage, "masthead/browserDetect") %>" scope="request" />

	<c:if test="${browserDetectPath == null}">
		<c:set var="browserDetectPath" value="browserDetect" scope="request" />
		<c:set var="noBrowserDetectResource" value="true" scope="request" />
	</c:if>

	<c:choose>
		<c:when test="${!isEditMode}">	
			<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
			<cq:include path="${browserDetectPath}" resourceType="/apps/aetna/components/global/content/browserDetection" />
		</c:when>
		<c:otherwise>
			<cq:include path="browserDetect" resourceType="/apps/aetna/components/global/content/browserDetection" />
		</c:otherwise>
	</c:choose>
	<%-- END BrowserDetection configuration and inclusion --%>
	
	<c:if test="${isEditMode || isEmergencyMessageConfigured}">
		<cq:include path="emergency-message" resourceType="/apps/aetna/components/global/content/emergencyMessage" />
	</c:if>

	<c:set var="menuPath" value="<%= NodeUtils.getInheritedNodeReference(currentPage, "masthead/menu") %>" scope="request" />
	
	<c:if test="${menuPath == null}">
		<c:set var="menuPath" value="menu" scope="request" />
		<c:set var="noMenuResource" value="true" scope="request" />
	</c:if>
	
	<c:choose>
		<c:when test="${!isEditMode}">	
			<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
			<cq:include path="${menuPath}" resourceType="/apps/aetna/components/global/content/megaMenu/megaMenu" />
		</c:when>
		<c:otherwise>
			<cq:include path="menu" resourceType="/apps/aetna/components/global/content/megaMenu/megaMenu" />
		</c:otherwise>
	</c:choose>		

	<c:if test="${isEditMode}">
		<style>
			header {
				position: absolute;
				top: 25px;
				z-index: 0;
			}
		</style>
	</c:if>
	
	<header>
		<div class="headerBar">
			<div class="container-fluid">
				<div class="row-fluid header">
					<div class="span3 logo">
						<c:if test="${not empty logoUrl}">
							<a href="${logoUrl}">
						</c:if>
						<img alt="${logoAlt}"<c:if test="${not empty logoTitle}"> title="${logoTitle}"</c:if> src="${logoImg}" />
						<c:if test="${not empty logoUrl}">
							</a>
						</c:if>						
					</div>
					<nav class="span6">
						<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
						<cq:include path="global-nav" resourceType="/apps/aetna/components/global/content/globalNav" />
					</nav>
					<div class="span3 mainMenu">
						<ul>
							<li class="searchwrap">
								<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
								<cq:include path="search"
									resourceType="/apps/aetna/components/global/content/search" />
							</li>
						</ul>
					</div>
				</div>
				<!--end row-fluid *header row-->
			</div>
			<!--/.fluid-container-->
		</div>
		<!--end .headerBar-->
		
	
	</header>
</div>


