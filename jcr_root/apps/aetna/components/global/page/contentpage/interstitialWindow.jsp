<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<jsp:useBean id="interstitialController" class="com.aetna.cq.bl.components.interstitial.controller.InterstitialController"/>

<%-- interstitial inclusion --%>
<c:set var="interstitialPath" value="<%= NodeUtils.getInheritedNodeReference(currentPage, "interstitialWindow") %>" scope="request" />

<c:if test="${interstitialPath == null}">
	<c:set var="interstitialPath" value="interstitialWindow" scope="request" />
	<c:set var="noInterstitialResource" value="true" scope="request" />
</c:if>

<c:choose>
	<c:when test="${!isEditMode}">	
		<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
		<cq:include path="${interstitialPath}" resourceType="/apps/aetna/components/global/content/interstitialWindow" />
	</c:when>
	<c:otherwise>
		<cq:include path="interstitialWindow" resourceType="/apps/aetna/components/global/content/interstitialWindow" />
	</c:otherwise>
</c:choose>

<c:set var="inheritedExtraInterstitials" value="<%= interstitialController.getInheritedInterstitials(currentPage) %>" />
<c:if test="${fn:length(inheritedExtraInterstitials) > 0}">
	<c:if test="${isEditMode}">
		<div style="margin: 0 10px 10px; padding: 10px; border: 1px solid black;">
	</c:if>
	<c:forEach var="actualInheritedInterstitial" items="${inheritedExtraInterstitials}">
		<c:choose>
			<c:when test="${!isEditMode}">
				<sling:include path="${actualInheritedInterstitial}" />
			</c:when>
			<c:otherwise>
				<div>The interstitial defined at ${actualInheritedInterstitial} will be inherited in Preview mode.</div>
			</c:otherwise>
		</c:choose>
	</c:forEach>
	<c:if test="${isEditMode}">
		</div>
	</c:if>
</c:if>	

<c:remove var="interstitialPath" />
<c:remove var="noInterstitialResource" />
