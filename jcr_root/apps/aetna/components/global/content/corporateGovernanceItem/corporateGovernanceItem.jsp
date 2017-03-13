<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:set var="hasMobileImage" value="<%= currentNode != null && currentNode.hasNode("mobileImage") && (currentNode.getNode("mobileImage").hasProperty("fileReference") || currentNode.getNode("mobileImage").hasNode("file")) %>" />
<c:set var="hasSignatureMobileImage" value="<%= currentNode != null && currentNode.hasNode("signatureMobileImage") && (currentNode.getNode("signatureMobileImage").hasProperty("fileReference") || currentNode.getNode("signatureMobileImage").hasNode("file")) %>" />
<c:choose>
	<c:when test="${not empty properties.heading}">
		<div class="row-fluid">
			<div class="span4 main-image">
				<c:if test="${hasMobileImage}">
		    		<div class="img loadImg">
		    	</c:if>
		    	
		        <c:set scope="request" var="imageName" value="image"/>
		        <c:set scope="request" var="imageAltParam" value="imageAlt"/>
		        <c:set scope="request" var="imageAlt" value="${properties.imageAlt}"/>
		        <c:set scope="request" var="imageTitle" value="${properties.imageTitle}"/>
		        <c:set scope="request" var="imageURL" value="${properties.imageURL}"/>
		        
		        <c:if test="${hasMobileImage && !isEditMode}">
			        <c:set scope="request" var="dataImgName" value="true"/>
		        	<c:set scope="request" var="cssClass" value="hidden-phone"/>
		        </c:if>
		        <cq:include script="../utils/render.image.jsp" />
		        
		        <c:if test="${hasMobileImage}">
			        <c:set scope="request" var="imageName" value="mobileImage"/>
			        <c:set scope="request" var="imageAltParam" value="imageAlt"/>
			        <c:set scope="request" var="imageAlt" value="${properties.imageAlt}"/>
			        <c:set scope="request" var="imageTitle" value="${properties.imageTitle}"/>
			        <c:set scope="request" var="imageURL" value="${properties.imageURL}"/>
			        <c:set scope="request" var="dataImgName" value="true"/>
			        <c:set scope="request" var="cssClass" value="visible-phone"/>
			        <div class="mobile-img-wrapper">
			        	<cq:include script="../utils/render.image.jsp" />
			        </div>
			    </c:if>
			    
			    <c:if test="${hasMobileImage}">
		    		</div>
		    	</c:if>
			</div>
			<div class="span8">
				<h2>${properties.heading}</h2>
				<h4>${properties.subheading}</h4>
				${properties.text}
				<c:set scope="request" var="imageName" value="signatureimage"/>
		        <c:set scope="request" var="imageAltParam" value="signatureImageAlt"/>
		        <c:set scope="request" var="imageAlt" value="${properties.signatureImageAlt}"/>
		        <c:set scope="request" var="imageTitle" value="${properties.signatureImageTitle}"/>
		        <c:set scope="request" var="imageURL" value="${properties.signatureImageURL}"/>
		        <c:if test="${hasSignatureMobileImage && !isEditMode}">
			        <c:set scope="request" var="dataImgName" value="true"/>
		        	<c:set scope="request" var="cssClass" value="hidden-phone"/>
		        </c:if>
		        <c:if test="${hasSignatureMobileImage}">
		    		<div class="img loadImg">
		    	</c:if>
		        <div class="right">
		        	<cq:include script="../utils/render.image.jsp" />
			        <c:if test="${hasSignatureMobileImage}">
				        <c:set scope="request" var="imageName" value="signatureMobileImage"/>
				        <c:set scope="request" var="imageAltParam" value="signatureMobileImageAlt"/>
				        <c:set scope="request" var="imageAlt" value="${properties.signatureImageAlt}"/>
				        <c:set scope="request" var="imageTitle" value="${properties.signatureImageTitle}"/>
				        <c:set scope="request" var="imageURL" value="${properties.signatureImageURL}"/>
				        <c:set scope="request" var="dataImgName" value="true"/>
				        <c:set scope="request" var="cssClass" value="visible-phone"/>
				        <cq:include script="../utils/render.image.jsp" />
				    </c:if>
					</div>
		        <c:if test="${hasSignatureMobileImage}">
		    		</div>
		    	</c:if>
			</div>
		</div>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Double click to configure Corporate Governance item component
		</c:if>
	</c:otherwise>
</c:choose>