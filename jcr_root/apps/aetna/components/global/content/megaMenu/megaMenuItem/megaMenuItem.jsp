<%@include file="/apps/aetna/components/global/global.jsp"%>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
	<c:when test="${not empty properties.title}">
		<c:if test="${isEditMode}">
			<div style="margin-top: 5px"> 
				<h4 style="color: white;">"${properties.title}" panel</h4>
		</c:if>
		
		<c:if test="${properties.panelsqty > 0}">			
			<%-- Mobile current item title --%>
			<c:if test="${isEditMode || empty properties.hideNavOnDesktop}">
				<div class="span12 visible-phone currPath">
					<c:if test="${not empty properties.target}">
						<c:set var="target" value=" target=\"${properties.target}\""/>
					</c:if>
					
					<c:if test="${not empty properties.onclick}">
						<c:set var="onclick" value=" onclick=\"${properties.onclick}\""/>
					</c:if>
					
					<a href="<%= PageUtils.getResolvedPath(properties.get("href", ""), "#", slingRequest, pageContext) %>"
						<c:if test="${not empty properties.audience}"> class="${properties.audience}"</c:if> 
						title="${properties.title}"${target}${onclick}>${properties.title}</a>				
				</div>
				
				<%-- Subtitle --%>
				<c:if test="${not empty properties.subtitle}">
					<div class="subtitle span12">
						<p>${properties.subtitle}</p>
					</div>
				</c:if>
			</c:if>
			
			<%-- Main links.  If hide nav, then nav links will only be shown on mobile layout. And on desktop only main link panels --%>
			<nav class="<c:if test="${!isEditMode && not empty properties.hideNavOnDesktop}"> visible-phone</c:if>">
				<% 
					int panelIndex = 1;
					String panelNodeName;
					String panelNodeClass;
					Node panelNode;
					boolean hasQuickLinks;
				%>
				<c:forEach var="panelIndex" begin="1" end="${properties.panelsqty}">
					<% 
						panelNodeName = "panel-col-" + Integer.toString(panelIndex);
						panelNodeClass = StringUtils.EMPTY;
						hasQuickLinks = false;
						
						if (currentNode.hasNode(panelNodeName)) {
							panelNode = currentNode.getNode("panel-col-" + Integer.toString(panelIndex));
							
							if (panelNode.hasProperty("isDoubleColumn")) {
								panelNodeClass = " twoCol";
							}
							
							if (panelNode.hasProperty("isQuickLinks")) {
								panelNodeClass += " quickLinksArea";
								hasQuickLinks = true;
							}							
						}
						
						panelIndex++;
					%>
					<div class="fiveCol<%= panelNodeClass %> <c:if test="${properties.panelsqty == 5}">sixCol</c:if><c:if test="${not empty properties.narrowColumns}"> narrowCol</c:if>">
						<c:if test="${!isEditMode}">	
							<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
						</c:if>
						<c:if test="<%= hasQuickLinks %>">
							<div class="quickLinksAreaContent">
						</c:if>
						<cq:include path="panel-col-${panelIndex}" resourceType="aetna/components/global/content/megaMenu/megaMenuItemColumn" />
						<c:if test="<%= hasQuickLinks %>">
							</div>
						</c:if>
					</div>
				</c:forEach>
				
				<%-- Mobile links --%>
				<div class="span12<c:if test="${!isEditMode}"> visible-phone</c:if>">
					<c:if test="${isEditMode}">	
						<div style="border: 1px solid white; margin-top: 20px; padding: 3px; margin-bottom: 10px;">
							Please insert the "only mobile" links here
					</c:if>
					
					<ul class="mobileSubnav">
						<c:if test="${!isEditMode}">	
							<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
						</c:if>
						<cq:include path="mobile-links" resourceType="foundation/components/parsys" />
					</ul>
					
					<c:if test="${isEditMode}">	
						</div>
					</c:if>
				</div>
				
				<%-- Right link panel --%>
				<c:if test="${isEditMode}">
					<div class="row-fluid">
						<div style="display: inline-block; width: 100%; background-color: #098BA7;">
							<h5 style="color: white; float: left; display: inline-block;">Content for Right Link:
								<cq:include path="right-link" resourceType="aetna/components/global/content/link" />
							</h5>
						</div>
						<c:choose>
							<c:when test="${not empty properties.twoColumnsRightPanel}">
								<div class="span8" style="background-color: #098BA7;">
									<div class="span6">
										<cq:include path="right-content-col1" resourceType="foundation/components/parsys" />
									</div>
									<div class="span6">
										<cq:include path="right-content-col2" resourceType="foundation/components/parsys" />
									</div>
									<div class="span12">
										<cq:include path="right-content" resourceType="foundation/components/parsys" />
									</div>
								</div>
							</c:when>
							<c:otherwise>
								<div class="span4" style="background-color: #098BA7;">
									<cq:include path="right-content" resourceType="foundation/components/parsys" />
								</div>
							</c:otherwise>
						</c:choose>
					</div>
				</c:if>
				 
				<%-- Feedback link --%>
				<c:if test="${not empty properties.feedbackTitle}">
					<div class="span3">
						<ul>
							<li class="feedback visible-phone"><a href="javascript:O_LC();">${properties.feedbackTitle}</a></li>
						</ul>
					</div>
				</c:if>
			</nav>
		</c:if>		
		
		<c:if test="${isEditMode}">
			</div>
		</c:if>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Click on 'Edit' button to configure the MegaMenu Item component
		</c:if>
	</c:otherwise>
</c:choose>