<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
	<c:when test="${not empty properties.text}">
		<div class="slide<c:if test="${not empty properties.specialTabletLandscapeClass}"> tablet-center-landscape</c:if>"  
			<c:set scope="request" var="imageName" value="image"/><c:set scope="request" var="dataAttr" value="data-bgd"/>
			<cq:include script="../../utils/render.dataimage.jsp" /> 
			<c:set scope="request" var="imageName" value="tabletImage"/><c:set scope="request" var="dataAttr" value="data-bgt"/>
			<cq:include script="../../utils/render.dataimage.jsp" />>
	        <div class="row-fluid">
				<div class="container-fluid">
					<div class="visible-phone">
						<c:set scope="request" var="imageName" value="mobileImage"/>
				        <c:set scope="request" var="imageAltParam" value="imageAlt"/>
				        <c:set scope="request" var="imageAlt" value="${properties.imageAlt}"/>
				        <c:set scope="request" var="imageTitle" value="${properties.imageTitle}"/>
				        
				        <cq:include script="../../utils/render.image.jsp" />
					</div>
					<div class="slide-copy span6">
						<cq:text property="text" />
					</div>
				</div>
			</div>
		</div>   
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Click on 'Edit' button to configure the Hero Slideshow Item component
		</c:if>
	</c:otherwise>
</c:choose>