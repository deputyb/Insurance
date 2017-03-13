<%@include file="/apps/aetna/components/global/global.jsp"%>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<jsp:useBean id="menuLinkController" class="com.aetna.cq.bl.widgets.menulink.controller.MenuLinkController">
    <jsp:setProperty name="menuLinkController" property="slingRequest" value="<%= slingRequest %>" />
    <jsp:setProperty name="menuLinkController" property="pageContext" value="<%= pageContext %>" />
    <jsp:setProperty name="menuLinkController" property="resolver" value="<%= resourceResolver %>" />
    <jsp:setProperty name="menuLinkController" property="scriptHelper" value="<%= sling %>" />
</jsp:useBean>
<% String globalNavPath = menuLinkController.getConfiguredGlobalNavPath(currentPage, currentStyle.getPath()); %>
<c:set var="menuLinks" value="<%= menuLinkController.getMenuLinks(globalNavPath, "menuLinks") %>" />

<c:choose>
    <c:when test="${fn:length(menuLinks) > 0}">
        <c:set var="index" value="0"/>

		<ul class="mainMenu">
			<li class="visible-phone">
				<a href="#" class="menuToggle megaMenu">
					<span class="menuIcon">&nbsp;</span>
				</a>
			</li>
            <c:forEach var="menuLink" varStatus="menuLinkStatus" items="${menuLinks}">
            	<c:if test="${menuLinkStatus.count != 1}">
            		<li class="separator hidden-phone"><span></span></li>
            	</c:if>
				<li class="hidden-phone">
					<c:choose>
						<c:when test="${menuLink.type == 'megaMenuOpen'}">
							<c:set var="linkClass" value="menuToggle megaMenu" />
							<c:set var="regularLink" value="false" />
						</c:when>
						<c:when test="${menuLink.type == 'megaMenuOpenRegular'}">
							<c:set var="linkClass" value="menuToggle hidden-phone" />
							<c:set var="regularLink" value="true" />
						</c:when>
						<c:when test="${menuLink.type == 'megaMenuShop'}">
							<c:set var="linkClass" value="external Shop-Interstitial hidden-phone" />
							<c:set var="regularLink" value="true" />
						</c:when>
						<c:otherwise>
							<c:set var="linkClass" value="hidden-phone" />
							<c:set var="regularLink" value="true" />
						</c:otherwise>	
					</c:choose>
				
					<a href="${menuLink.url}" data-menulinkitem="${menuLinkStatus.count - 1}" title="${menuLink.title}" class="${linkClass}"
						<c:if test="${!regularLink}"> id="universalMenu"</c:if>
						<c:if test="${not empty menuLink.target}"> target="${menuLink.target}"</c:if>
						<c:if test="${not empty menuLink.onClick}"> onclick="${menuLink.onClick}"</c:if>>
						${menuLink.title}
					</a>
				</li>
				
		        <c:set var="index" value="${index + 1}"/>
			</c:forEach>
		</ul>
		<c:if test="${isEditMode && empty currentNode}">
			<c:set var="globalNavPath" value="<%= globalNavPath %>" />
			<c:set var="globalNavPath" value="${fn:replace(globalNavPath, '/jcr:content/masthead/global-nav', '.html')}" />
			<div class="span12" style="position: relative; top: -65px; background-color: rgba(238,238,238,0.3); border: 1px solid gray;">
				The configuration Global Nav is being inherited from <a href="${globalNavPath}">${globalNavPath}</a>. 
				If you want to overwrite the inherited configuration, edit the Global Nav component normally.</div>
		</c:if>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Please go to CQ Design mode to configure the Global Navigation component
		</c:if>
	</c:otherwise>
</c:choose>