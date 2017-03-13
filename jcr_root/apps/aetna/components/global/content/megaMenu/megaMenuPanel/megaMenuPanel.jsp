<%@include file="/apps/aetna/components/global/global.jsp"%>
<%@page import="com.aetna.cq.bl.components.megamenu.controller.MegaMenuController" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

	<c:if test="${isEditMode}">
		<style>
			.universalMenu.togglePanel{
				display:block;
			}
		</style>
	</c:if>


<% MegaMenuController megaMenuController = (MegaMenuController) request.getAttribute("megaMenuController"); %>
<c:set var="megamenuItems" scope="request" value="<%= megaMenuController.generateMainMegaMenuNav(currentNode, slingRequest, pageContext) %>" />
<c:set var="isStandAlonePage" value="true" />
<c:choose>
	<c:when test="${not empty properties.itemsqty}">
		<div class="universalMenu togglePanel<c:if test="${not empty properties.hideonmobile}"> hidden-phone</c:if><c:if test="${not empty properties.shopmenu}"> shopMenu</c:if> <c:if test="<%=megaMenuController.isEmpty(currentNode) %>">universalMenu-empty</c:if>">
			<%-- Column section --%> 
			<div class="container-fluid menu-container <c:if test="<%=megaMenuController.isEmpty(currentNode) %>">menu-container-empty</c:if>">
				<c:if test="${!isEditMode}">
					<div class="row-fluid visible-phone">
						<div class="span12">
							<c:set var="isSearchOnMenuItem" scope="request" value="true"/>
							<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
							<cq:include path="search" resourceType="/apps/aetna/components/global/content/search" />
							<c:set var="isSearchOnMenuItem" scope="request" value="false"/>
						</div>
					</div>
				</c:if>
				<c:forEach var="itemIndex" begin="1" end="${properties.itemsqty}">
					<div class="row-fluid menu-panel-${itemIndex} 
						<c:choose><c:when test="${fn:contains(currentPage.path, fn:replace(megamenuItems[itemIndex - 1].url,'.html', '')) && !isEditMode}"> default actual<c:set var="isStandAlonePage" value="false"/></c:when><c:otherwise> <c:if test="${!isEditMode }"> hidden </c:if></c:otherwise></c:choose>">
						<c:if test="${!isEditMode}">
							<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
						</c:if>
						<cq:include path="mega-menu-item-${itemIndex}" resourceType="aetna/components/global/content/megaMenu/megaMenuItem" />
					</div>
				</c:forEach>
				<c:if test="${isStandAlonePage}">
					<div class="row-fluid">
						<div class="span12<c:if test="${!isEditMode}"> visible-phone</c:if>"<c:if test="${isEditMode}"> style="border: 1px solid white; margin: 20px 0;"</c:if>>
							<c:choose>
								<c:when test="${isEditMode}">
									<h5 style="margin-top: 20px; color: white;">
										Include here the links that will be displayed in the mobile megamenu for standalong pages.
									</h5>
								</c:when>
								<c:otherwise>
									<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
								</c:otherwise>
							</c:choose>
							
							<ul class="mobileSubnav">
								<cq:include path="standalone-mobile-links" resourceType="foundation/components/parsys" />
							</ul>
							
							<%-- Feedback link --%>
							<c:if test="${isEditMode}">
								<span>Use the next link to configure the Feedback link.</span>
							</c:if>
							<ul>
								<li class="feedback<c:if test="${!isEditMode}"> visible-phone</c:if>">
									<cq:include path="feedback-link" resourceType="aetna/components/global/content/link" />
								</li>
							</ul>
						</div>
					</div>
				</c:if>
			</div>
		</div>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			<div style="padding-bottom: 10px;">
				Click on 'Edit' button to configure MegaMenu Panel.
			</div>
		</c:if>
	</c:otherwise>
</c:choose>