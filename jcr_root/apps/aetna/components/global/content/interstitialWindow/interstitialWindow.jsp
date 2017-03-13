<%@include file="/apps/aetna/components/global/global.jsp"%>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:set var="resourcePath" value="<%= resource.getPath() %>" />
<c:set var="inheritedInterstitial" value="${interstitialPath != null && resourcePath != interstitialPath && noInterstitialResource == null}" />

<%-- Default Values --%>
<c:set var="instertitialTitle" value="You are now leaving the Aetna website" />
<c:set var="instertitialMessage" value="No message set yet" />
<c:set var="instertitialContinue" value="Continue >" scope="request" />

<c:if test="${not empty properties.title}">
	<c:set var="instertitialTitle" value="${properties.title}" />
</c:if>

<c:if test="${not empty properties.detailMessage}">
	<c:set var="instertitialMessage" value="${properties.detailMessage}" />
</c:if>
<c:if test="${fn:startsWith(instertitialMessage, '<p')}">
	<jsp:useBean id="interstitialController" class="com.aetna.cq.bl.components.interstitial.controller.InterstitialController"/>
	<c:set var="instertitialMessage" value="<%=interstitialController.doCleanInterstitialMessage(properties.get("detailMessage",""))%>"/>
</c:if>

<c:if test="${not empty properties.continueLink}">
	<c:set var="instertitialContinue" value="${properties.continueLink}" scope="request" />
</c:if>

<c:choose>
	<c:when test="${inheritedInterstitial && isEditMode}">
		<c:choose>
			<c:when test="${empty properties.id}">
				<div style="margin: 0 10px 10px; padding: 10px; border: 1px solid black;">
					<c:set var="inheritedInterstitialPage" value="<%= NodeUtils.getResourcePage((String) request.getAttribute("interstitialPath")) %>" />
					The configuration for interstitial page is inherited from <a style="color: black;" href="${inheritedInterstitialPage}">${inheritedInterstitialPage}</a><br/>
					If you want to overwrite the inherited configuration, click on 'Edit' button and configure interstitial component normally. 
				</div>
			</c:when>
			<c:otherwise>
				<c:if test="${isEditMode}">
					Double click to configure the interstitial component
				</c:if>
			</c:otherwise>
		</c:choose>
	</c:when>
	<c:otherwise>
		<c:choose>
			<c:when test="${isEditMode}">
				<div style="margin: 0 10px 10px; padding: 10px; border: 1px solid black;">
					<p>Please configure interstitial window message by double clicking this component.</p>
					
					<p><strong>Title:</strong> ${instertitialTitle}
					<br><strong>Subtitle:</strong> ${properties.subtitle}
					<br><strong>Message:</strong> ${instertitialMessage}		
					<c:if test="${not empty properties.backLink}">
						<br><strong>Back link:</strong> ${properties.backLink}						
					</c:if>
					<br><strong>Continue link:</strong> ${instertitialContinue}</p>
				</div>
			</c:when>
			<c:otherwise>
				<div<c:if test="${not empty properties.id}"> id="${properties.id}"</c:if> 
					class="interout<c:if test="${not empty properties.detailLargeMessage}"> terms</c:if>">
                   		<div class="interstitial">
                     	<c:if test="${not empty properties.exiticon}">
							<a href="#" class="interlink-back close" <c:if test="${not empty properties.id}">id="interClose"</c:if>></a>
						</c:if>

						<h5>${instertitialTitle}</h5>						
						
						<c:if test="${not empty properties.subtitle}">
							<p><b>${properties.subtitle}</b></p>
						</c:if>
						
						<c:if test="${empty properties.layout || properties.layout == 'title-subtitle-links-message'}">
							<cq:include script="fragments/links.jsp" />
						</c:if>
						
						<div class="message">
							<c:if test="${empty properties.detailLargeMessage}">
								<p class="original-message-section"><small>
							</c:if>	
							${instertitialMessage}
							<c:if test="${empty properties.detailLargeMessage}">
								</small></p>
							</c:if>
						</div>
						
						<c:if test="${properties.layout == 'title-subtitle-message-links'}">
							<cq:include script="fragments/links.jsp" />
						</c:if>
					</div>
				</div>				
			</c:otherwise>
		</c:choose>
	</c:otherwise>
</c:choose>
<c:remove var="instertitialContinue" />