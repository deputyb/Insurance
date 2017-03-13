<%@include file="/apps/aetna/components/global/global.jsp"%>
<%@page import="com.aetna.cq.common.cq.utils.NodeUtils, com.aetna.cq.bl.common.entity.Link" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:set var="resourcePath" value="<%= resource.getPath() %>" />
<c:set var="inheritedMenu" value="${resourcePath != menuPath && noMenuResource == null}" />

<jsp:useBean id="megaMenuController" scope="request"
	class="com.aetna.cq.bl.components.megamenu.controller.MegaMenuController"></jsp:useBean>
<c:choose>
	<c:when test="${!isEditMode}">
		<c:if test="<%= currentNode.hasNode("mega-menu-panel-1") %>">
			<c:set var="megamenuItems" scope="request" 
				value="<%= megaMenuController.generateMainMegaMenuNav(currentNode.getNode("mega-menu-panel-1"), slingRequest, pageContext) %>" />
		</c:if>	
		<c:set var="selectedRightContentPanelPath" value="<%= megaMenuController.getLoginPanelPath(currentPage) %>" />
		<div class="pathSelector hidden-phone">
			<div class="container-fluid">
				<div class="row-fluid">
					<div class="span12">
						<ul>
							<c:forEach var="link" varStatus="status" items="${megamenuItems}">
								<c:set var="cleanLinkUrl" value="${fn:replace(link.url,'.html', '')}" />
								<li<c:if test="${fn:contains(currentPage.path, cleanLinkUrl)}"> class="current"<c:set var="currentMegaMenuItemIndex" value="${status.count}" /></c:if>>											
									
										<a href="${link.url}" data-menulinkitem="${status.count -1}" class="menuToggleItem megaMenu" title="${link.title}"<c:if test="${not empty link.target}"> target="${link.target}"</c:if>
											<c:if test="${not empty link.onClick}"> onclick="${link.onClick}"</c:if> data-item-index="${status.count -1}">
											${link.title}
										</a>
									<span class="arrowSmallDown blue">&nbsp;</span>
								</li>
								<c:if test="${fn:contains(selectedRightContentPanelPath, cleanLinkUrl)}">
									<c:set var="currentMegaMenuItemIndex" value="${status.count}" />
								</c:if>
							</c:forEach>
						</ul>
						<c:if test="${not empty currentMegaMenuItemIndex}">
							
							<c:set var="rightLinkPath" scope="request" value="mega-menu-panel-1/mega-menu-item-${currentMegaMenuItemIndex}/right-link" />
							<c:set var="currentMegaMenuItemPath" scope="request" value="${currentNode.path}/mega-menu-panel-1/mega-menu-item-${currentMegaMenuItemIndex}" />							
							<c:if test="<%= currentNode.hasNode((String)request.getAttribute("rightLinkPath")) %>">
								<c:set var="isRightPanelTwoColumns" value="<%= megaMenuController.isRightHandPanelTwoColumns(resourceResolver, (String)request.getAttribute("currentMegaMenuItemPath")) %>" />
								<div class="right-link">
										<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
										<cq:include path="mega-menu-panel-1/mega-menu-item-${currentMegaMenuItemIndex}/right-link" resourceType="aetna/components/global/content/link" />
									<span class="arrowSmallDown white">&nbsp;</span>	
									
									<div class="right-content-panel<c:if test="${isRightPanelTwoColumns}"> double-column</c:if> hidden">
										<c:if test="${isRightPanelTwoColumns}">
											<div class="span6 separator">
												<cq:include path="mega-menu-panel-1/mega-menu-item-${currentMegaMenuItemIndex}/right-content-col1" resourceType="foundation/components/parsys" />
											</div>
											<div class="span6">
												<cq:include path="mega-menu-panel-1/mega-menu-item-${currentMegaMenuItemIndex}/right-content-col2" resourceType="foundation/components/parsys" />
											</div>
										</c:if>	
										<div class="span12 content-wrapper<c:if test="${!isRightPanelTwoColumns}"> single-column</c:if>">
											<cq:include path="mega-menu-panel-1/mega-menu-item-${currentMegaMenuItemIndex}/right-content" resourceType="foundation/components/parsys" />
										</div>
									</div>
								</div>
							</c:if>	
						</c:if>
					</div>
				</div>
			</div>
		</div>
	</c:when>
	<c:otherwise>
		<style>
			.togglePanelWrapper.overthrow {
				padding: 0;
			}
			.togglePanelWrapper {
				position: relative;
				top: 65px;
				z-index: 5;
			}			
			.headerBar {
				top: 0; 
			}
			.megaMenu {
				margin-bottom: 90px;
			}
		</style>
	</c:otherwise>
</c:choose>

<div class="togglePanelWrapper overthrow">
	<c:choose>
		<c:when test="${inheritedMenu && isEditMode}">
			<c:set var="inheritMenuPage" value="<%= NodeUtils.getResourcePage((String) request.getAttribute("menuPath")) %>" />
			The configuration for Mega Menu is inherited from <a style="color: white;" href="${inheritMenuPage}">${inheritMenuPage}</a><br/>
			If you want to overwrite the inherited configuration, click on 'Edit' button and configure Mega Menu component normally. 
		</c:when>
		<c:otherwise>
			<c:choose>
				<c:when test="${not empty properties.panelsqty}">
					<c:forEach var="panelIndex" begin="1" end="${properties.panelsqty}">
						<c:if test="${!isEditMode}">	
							<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
						</c:if>
						<cq:include path="mega-menu-panel-${panelIndex}" resourceType="aetna/components/global/content/megaMenu/megaMenuPanel" />
					</c:forEach>
				</c:when>
				<c:otherwise>
					<c:if test="${isEditMode}">
						Click on 'Edit' button to configure Mega Menu component 
					</c:if>
				</c:otherwise>
			</c:choose>
		</c:otherwise>
	</c:choose>
</div>	
