<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
    <c:when test="${not empty properties.text}">    
    	<c:set scope="request" var="imageName" value="image"/>
		<c:if test="${not empty properties.target}">
			<c:set var="target" value=" target='${properties.target}'"/>
		</c:if>

		<c:if test="${not empty properties.class}">
            <c:set var="linkClasses" value="${properties.class}"/>
		</c:if>

		<c:if test="${not empty properties.audience}">
            <c:set var="linkClasses" value="${linkClasses} ${properties.audience}"/>
		</c:if>
		
		<%-- Old Interstitial configuration --%>
		<c:if test="${not empty properties.showInterstitial}">
			<c:set var="linkClasses" value="${linkClasses} external"/>
		</c:if>
		
		<%-- New Interstitial configuration --%>
		<c:if test="${not empty properties.interstitial}">
            <c:set var="linkClasses" value="${linkClasses} ${properties.interstitial}"/>
		</c:if>		
		
		<c:if test="${not empty linkClasses}">
			<c:set var="class" value="class=\"${linkClasses}\""/>
		</c:if>
		
		<c:if test="${not empty properties.id}">
			<c:set var="id" value=" id='${properties.id}'"/>
		</c:if>

		<c:if test="${not empty properties.onclick}">
			<c:set var="onclick" value=" onclick=\"${properties.onclick}\""/>
		</c:if>

		<c:set var="href" value="<%= PageUtils.getResolvedPath(properties.get("href", ""), "#", slingRequest, pageContext) %>" />
		   	        
		<div class="container-fluid center-container ${properties.height} ${containerClass}" style="<cq:include script="../utils/render.backgroundimage.jsp" />;height:${properties.imageHeight}px;max-width:${properties.imageMaxWidth}px">
			<div class="absolute-center">
					<a href="${href}"${target}${class}${id}${onclick}>${properties.text}<span class="arrowWhiteBig"></span></a>
			</div>
		</div>
    </c:when>
    <c:otherwise>
    	<c:if test="${isEditMode}">
    		<div class="container-fluid module col1bgMod">
				Double click to configure the Image Button dialog.
			</div>
		</c:if>
    </c:otherwise>
</c:choose>