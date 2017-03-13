<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
	<c:when test="${not empty properties.title}">
        <c:set scope="request" var="imageName" value="image"/>
        <c:set scope="request" var="imageAltParam" value="imageAlt"/>
        <c:set scope="request" var="imageAlt" value="${properties.imageAlt}"/>
        <c:set scope="request" var="imageTitle" value="${properties.imageTitle}"/>
        <c:set scope="request" var="imageURL" value="${properties.imageURL}"/>
                
        <div class="slideHeaderTxt"><p>${properties.title}</p></div>
	  	<cq:include script="../../utils/render.image.jsp" />
     	<div class="slideBodyTxt"><p>${properties.text}</p></div>        
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Click on 'Edit' button to configure the Slideshow Item component
		</c:if>
	</c:otherwise>
</c:choose>