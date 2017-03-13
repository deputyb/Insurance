<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
    <c:when test="${not empty properties.text}">
        <div class="shop-module-preview-wrapper">
       		<h5 class="whiteText">${properties.text}
       			<a class="arrowWhiteSmall ${properties.linkinterstitial}" href="#"<c:if test="${not empty properties.linkonclick}"> onclick="${properties.linkonclick}"</c:if>>
       				<b>${properties.linktext}</b>
       			</a>
       		</h5>
       		<c:if test="${not empty properties.mobilelink1url || not empty properties.mobilelink2url}">
	       		<div class="mobile-wrapper<c:if test="${!isEditMode}"> mobile-wrapper-hidden-desktop</c:if> span12">
		        	<div class="mobile-links">
			        	<c:if test="${not empty properties.mobilelink1text && not empty properties.mobilelink1url}">
			        		<c:choose>
			        			<c:when test="${not empty properties.desktoplink1url}">
			        				<a href="<%= PageUtils.getResolvedPath(properties.get("mobilelink1url", ""), "#", slingRequest, pageContext) %>"
					        			<c:if test="${not empty properties.mobilelink1targetblank}"> target="_blank"</c:if>
					        			<c:if test="${not empty properties.mobilelink1onclick}"> onclick="${properties.mobilelink1onclick}"</c:if>
					        			data-desktop-link="<%= PageUtils.getResolvedPath(properties.get("desktoplink1url", ""), "#", slingRequest, pageContext) %>"
					        			class="mobile-only ${properties.mobilelink1interstitial}"
					        			<c:if test="${not empty properties.mobilelink1interstitialdeeplink}"> data-interstitial-deeplink="${properties.mobilelink1interstitialdeeplink}"</c:if>>${properties.mobilelink1text}</a>
			        			</c:when>
			        			<c:otherwise>
			        				<a href="<%= PageUtils.getResolvedPath(properties.get("mobilelink1url", ""), "#", slingRequest, pageContext) %>"
					        			<c:if test="${not empty properties.mobilelink1targetblank}"> target="_blank"</c:if>
					        			<c:if test="${not empty properties.mobilelink1onclick}"> onclick="${properties.mobilelink1onclick}"</c:if>
					        			<c:if test="${not empty properties.mobilelink1interstitial}"> class="${properties.mobilelink1interstitial}"</c:if>
					        			<c:if test="${not empty properties.mobilelink1interstitialdeeplink}"> data-interstitial-deeplink="${properties.mobilelink1interstitialdeeplink}"</c:if>>${properties.mobilelink1text}</a>
			        			</c:otherwise>
			        		</c:choose>
			        	</c:if>
			        	<c:if test="${not empty properties.mobilelink1text && not empty properties.mobilelink1url && not empty properties.mobilelink2text && not empty properties.mobilelink2url}">
			        		<span class="separator">|</span>
			        	</c:if>
			        	<c:if test="${not empty properties.mobilelink2text && not empty properties.mobilelink2url}">
			        		<c:choose>
			        			<c:when test="${not empty properties.desktoplink2url}">
			        				<a href="<%= PageUtils.getResolvedPath(properties.get("mobilelink2url", ""), "#", slingRequest, pageContext) %>"
					        			<c:if test="${not empty properties.mobilelink2targetblank}"> target="_blank"</c:if>
					        			<c:if test="${not empty properties.mobilelink2onclick}"> onclick="${properties.mobilelink2onclick}"</c:if>
					        			data-desktop-link="<%= PageUtils.getResolvedPath(properties.get("desktoplink2url", ""), "#", slingRequest, pageContext) %>"
					        			class="mobile-only ${properties.mobilelink2interstitial}"
					        			<c:if test="${not empty properties.mobilelink2interstitialdeeplink}"> data-interstitial-deeplink="${properties.mobilelink2interstitialdeeplink}"</c:if>>${properties.mobilelink2text}</a>
			        			</c:when>
			        			<c:otherwise>
			        				<a href="<%= PageUtils.getResolvedPath(properties.get("mobilelink2url", ""), "#", slingRequest, pageContext) %>"
					        			<c:if test="${not empty properties.mobilelink2targetblank}"> target="_blank"</c:if>
					        			<c:if test="${not empty properties.mobilelink2onclick}"> onclick="${properties.mobilelink2onclick}"</c:if>
					        			<c:if test="${not empty properties.mobilelink2interstitial}"> class="${properties.mobilelink2interstitial}"</c:if>
					        			<c:if test="${not empty properties.mobilelink2interstitialdeeplink}"> data-interstitial-deeplink="${properties.mobilelink2interstitialdeeplink}"</c:if>>${properties.mobilelink2text}</a>
			        			</c:otherwise>
			        		</c:choose>
			        	</c:if>
			        </div>
		        </div>
			</c:if>
       	</div>
    </c:when>
    <c:otherwise>
    	<c:if test="${isEditMode}">
			Double click to configure the Shop Module Preview
		</c:if>
    </c:otherwise>
</c:choose>