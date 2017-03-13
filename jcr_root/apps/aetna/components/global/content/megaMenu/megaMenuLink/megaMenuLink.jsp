<%@include file="/apps/aetna/components/global/global.jsp"%>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
	<c:when test="${not empty properties.text}">
		<c:if test="${not empty properties.target}">
			<c:set var="target" value=" target='${properties.target}'"/>
		</c:if>
		
		<c:if test="${not empty properties.privateLink}">
			<c:set var="linkClass" value="lock" />
		</c:if>

		<c:if test="${not empty properties.mainMobileLink}">
			<c:set var="linkClass" value="${linkClass} pathChange" />
		</c:if>

        <c:if test="${not empty properties.hrefmobile}">
        	<c:set var="mobileLink" value="${properties.hrefmobile}" />
		</c:if>

		<c:set var="linkTitle" value="<%= properties.get("text", "").replaceAll("<[^<^>]*>", StringUtils.EMPTY) %>" />
		
		<c:if test="${not empty properties.audience}"> 
			<c:set var="linkClasses" value="${properties.audience}"/>
		</c:if>
		
		<%-- Old Interstitial configuration --%>
		<c:if test="${not empty properties.showInterstitial}"> 
			<c:set var="linkClasses" value="${linkClasses} external"/>
		</c:if>
		
		<%-- New Interstitial configuration --%>
		<c:if test="${not empty properties.interstitial}"> 
			<c:set var="linkClasses" value="${linkClasses} ${properties.interstitial}"/>
		</c:if>
		
		<c:if test="${not empty properties.interstitialdeeplink}">
			<c:set var="interstitialDeepLink" value=" data-interstitial-deeplink=\"${properties.interstitialdeeplink}\"" />
		</c:if>

        <div<c:if test="${not empty linkClass}"> class="${linkClass}"</c:if>>
            <c:choose>
	            <c:when test="${not empty mobileLink}">
	                <a href="<%= PageUtils.getResolvedPath(properties.get("hrefmobile", ""), "#", slingRequest, pageContext) %>"
	                	${interstitialDeepLink} class="mobile-only ${linkClasses}" title="${linkTitle}"${target}
	                    <c:if test="${not empty properties.onclick}"> onclick="${properties.onclick}"</c:if>
	                    data-desktop-link="<%= PageUtils.getResolvedPath(properties.get("href", ""), "#", slingRequest, pageContext) %>">${properties.text}</a>
	            </c:when>
	            <c:otherwise>
	                <a href="<%= PageUtils.getResolvedPath(properties.get("href", ""), "#", slingRequest, pageContext) %>"
	                    ${interstitialDeepLink} class="${linkClasses}" title="${linkTitle}"${target}
	                        <c:if test="${not empty properties.onclick}"> onclick="${properties.onclick}"</c:if>>${properties.text}</a>
	            </c:otherwise>
	    	</c:choose>
		</div>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Double click to configure the MegaMenu Link component
		</c:if>
	</c:otherwise>
</c:choose>