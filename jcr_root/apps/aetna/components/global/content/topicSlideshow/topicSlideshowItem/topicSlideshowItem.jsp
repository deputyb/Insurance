<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
	<c:when test="${not empty properties.title}">
		<c:set scope="request" var="imageName" value="mobileImage"/>
		
		<li class="slide${slideIndex} tourSlides" style="<cq:include script="../../utils/render.backgroundimage.jsp" />">
	        <div class="row-fluid">
	        	<div class="container-fluid">
	                <div class="visible-phone">
					    <c:set scope="request" var="imageName" value="image"/>
				        <c:set scope="request" var="imageAltParam" value="imageAlt"/>
				        <c:set scope="request" var="imageAlt" value="${properties.imageAlt}"/>
				        <c:set scope="request" var="imageTitle" value="${properties.imageTitle}"/>
				        <c:set scope="request" var="imageURL" value="${properties.imageURL}"/>
	                    
	                    <cq:include script="../../utils/render.image.jsp" />
	                </div>
	                
	                <div class="slide-copy span3 offset2">
	                    <h3 class="whiteText noMargin"><cq:text property="title"/></h3>
	                    
	                	<p class="whiteText noMargin"><cq:text property="text"/></p>
	                    
	                    <c:if test="${not empty properties.target}">
	                        <c:set var="target" value=" target='${properties.target}'"/>
	                    </c:if>
	                    
	                    <c:set var="href" value="<%= PageUtils.getResolvedPath(properties.get("href", ""), "#", slingRequest, pageContext) %>" />
	                	<p><a class="arrowWhiteSmall whiteText noMargin" href="${href}"${target}><cq:text property="linkText"/></a></p>
	                </div>
	            </div>
			</div>
		</li>   
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Click on 'Edit' button to configure the Topic Slideshow Item component
		</c:if>
	</c:otherwise>
</c:choose>