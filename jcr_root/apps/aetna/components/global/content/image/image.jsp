<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:set var="hasDesktopImage" value="<%= currentNode != null && currentNode.hasNode("image") && (currentNode.getNode("image").hasProperty("fileReference") || currentNode.getNode("image").hasNode("file")) %>" />
<c:set var="hasMobileImage" value="<%= currentNode != null && currentNode.hasNode("mobileImage") && (currentNode.getNode("mobileImage").hasProperty("fileReference") || currentNode.getNode("mobileImage").hasNode("file")) %>" />

<c:if test="${not empty properties.target}">
	<c:set var="target" value=" target=\"${properties.target}\"" />
</c:if>
	
<c:choose>	
    <c:when test="${hasDesktopImage}">
    	<c:if test="${hasMobileImage}">
    		<div class="img loadImg">
    	</c:if>
    	
    	<%-- Desktop Image --%>
        <c:set scope="request" var="imageName" value="image"/>
        <c:set scope="request" var="imageAltParam" value="imageAlt"/>
        <c:set scope="request" var="imageAlt" value="${properties.imageAlt}"/>
        <c:set scope="request" var="imageTitle" value="${properties.imageTitle}"/>
        <c:set scope="request" var="imageURL" value="${properties.imageURL}"/>
        <c:set scope="request" var="URLTarget" value="${target}"/>
        
        <c:if test="${not empty properties.interstitial}">
        	<c:set scope="request" var="linkClass" value="${properties.interstitial}" />
        </c:if>
        
        <%-- Desktop Image --%>
        <c:if test="${hasMobileImage && !isEditMode}">
	        <c:set scope="request" var="dataImgName" value="true"/>
	        <c:set scope="request" var="cssClass" value="hidden-phone"/>
	        
	        <%-- Render the desktop image first --%>
	    	<cq:include script="../utils/render.image.jsp" />
	    	
	    	<%-- Set the attributes for the mobile image --%>
	    	<c:set scope="request" var="imageName" value="mobileImage"/>
	        <c:set scope="request" var="imageAltParam" value="imageAlt"/>
	        <c:set scope="request" var="imageAlt" value="${properties.imageAlt}"/>
	        <c:set scope="request" var="imageTitle" value="${properties.imageTitle}"/>
	        <c:set scope="request" var="imageURL" value="${properties.imageURL}"/>
	        <c:set scope="request" var="dataImgName" value="true"/>
	        <c:set scope="request" var="cssClass" value="visible-phone"/>
	        <c:set scope="request" var="URLTarget" value="${target}"/>
	    </c:if>
        
        <cq:include script="../utils/render.image.jsp" />
        
        <c:if test="${hasMobileImage}">
			</div>
		</c:if>
		<c:remove var="linkClass" />
    </c:when>
    <c:otherwise>
    	<c:if test="${isEditMode}">
        	Double click to configure Image component
        </c:if>
    </c:otherwise>
</c:choose>