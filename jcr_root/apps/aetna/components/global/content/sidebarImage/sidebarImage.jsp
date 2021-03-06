<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:set var="hasDesktopImage" value="<%= currentNode != null && currentNode.hasNode("image") && (currentNode.getNode("image").hasProperty("fileReference") || currentNode.getNode("image").hasNode("file")) %>" />
	
<c:choose>	
    <c:when test="${hasDesktopImage}">
        <c:set scope="request" var="imageName" value="image"/>
        <c:set scope="request" var="imageAltParam" value="imageAlt"/>
        <c:set scope="request" var="imageAlt" value="${properties.imageAlt}"/>
        <c:set scope="request" var="imageTitle" value="${properties.imageTitle}"/>
        <c:set scope="request" var="imageURL" value="${properties.imageURL}"/>
        
        <div class="sidebar-image">
        	<cq:include script="../utils/render.image.jsp" />
        </div>
    </c:when>
    <c:otherwise>
    	<c:if test="${isEditMode}">
        	<div style="color: black;">
        		Double click to configure Sidebar Image component
        	</div>
        </c:if>
    </c:otherwise>
</c:choose>