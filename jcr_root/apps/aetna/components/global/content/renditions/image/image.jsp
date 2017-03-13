<%@include file="/apps/aetna/components/global/global.jsp" %>
<jsp:useBean id="imageController" class="com.aetna.cq.bl.components.renditions.controller.ImageController" />
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:set var="hasDesktopImage" value="<%= currentNode != null && currentNode.hasNode("image") && (currentNode.getNode("image").hasProperty("fileReference") || currentNode.getNode("image").hasNode("file")) %>" />

<c:set var="renditionSizes" value="<%= imageController.getImageRenditionSizes(currentNode, currentPage)%>" />



<c:if test="${not empty properties.target}">
	<c:set var="target" value=" target=\"${properties.target}\"" />
</c:if>
	
<c:choose>	
    <c:when test="${hasDesktopImage}">
    	<div class="img loadImg">
    	
	    	<%-- Desktop Image --%>
	        <c:set scope="request" var="imageName" value="image"/>
	        <c:set scope="request" var="imageURL" value="${properties.imageURL}"/>
	        <c:set scope="request" var="URLTarget" value="${target}"/>
	        <c:set scope="request" var="renditionSize" value="${renditionSizes[0]}"/>
	        <c:if test="${fn:length(renditionSizes) >= 3}">
	        	<c:set scope="request" var="prefix" value="${renditionSizes[2]}"/>
	        </c:if>
	        
	        <c:if test="${not empty properties.interstitial}">
	        	<c:set scope="request" var="linkClass" value="${properties.interstitial}" />
	        </c:if>
	        
	        <%-- Desktop Image --%>
	        <c:if test="${!isEditMode}">
		        <c:set scope="request" var="dataImgName" value="true"/>
		        <c:set scope="request" var="cssClass" value="hidden-phone"/>
		        
		        <%-- Render the desktop image first --%>
		    	<cq:include script="../../utils/render.image.rendition.jsp" />
		    	<%-- Set the attributes for the mobile image --%>
		    	<c:set scope="request" var="imageName" value="image"/>
		    	<c:set scope="request" var="imageURL" value="${properties.imageURL}"/>
		    	<c:set scope="request" var="URLTarget" value="${target}"/>
		    	<c:set scope="request" var="renditionSize" value="${renditionSizes[1]}" />
		        <c:set scope="request" var="dataImgName" value="true"/>
		        <c:set scope="request" var="cssClass" value="visible-phone"/>
		        <c:if test="${fn:length(renditionSizes) == 4}">
		        	<c:set scope="request" var="prefix" value="${renditionSizes[3]}"/>
		        </c:if>
		    </c:if>
	        
	        <cq:include script="../../utils/render.image.rendition.jsp" />
		</div>
		<c:remove var="linkClass" />
    </c:when>
    <c:otherwise>
    	<c:if test="${isEditMode}">
        	Double click to configure Image component
        </c:if>
    </c:otherwise>
</c:choose>