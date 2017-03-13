<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:choose>
	<c:when test="${not empty properties.layout}">
		<c:set var="imageName" value="image" scope="request" />
		<c:set var="renditions" value="1600.575,1024.403" />
		<c:set var="dataAttrsStr" value="data-bgd,data-bgt" />
		<c:set var="dataAttrs" value="${fn:split(dataAttrsStr, ',')}" scope="request" />
		<c:set var="renditionSizes" value="${fn:split(renditions, ',')}" scope="request" />
		<c:set var="prefix" value="home" scope="request"/>
		<div class="slide<c:if test="${not empty properties.specialTabletClass}"> tablet-left-image</c:if><c:if test="${not empty properties.specialTabletLandscapeClass}"> tablet-center-landscape</c:if>" 
			<cq:include script="../../../utils/render.dataimage.rendition.jsp" />>
	        <div class="row-fluid">
				<div class="container-fluid">
					<div class="visible-phone">
						<c:set var="imageName" value="image" scope="request" />
						<c:set var="dataAttr" value="" scope="request" />
						<c:set var="renditionSize" value="767.350" scope="request" />
						<c:set var="prefix" value="home" scope="request"/>
				        <cq:include script="../../../utils/render.image.rendition.jsp" />
					</div>
					<div class="span7 <c:if test="${properties.layout == 'imagecontent'}"> offset5 </c:if>content">
						<h2>${properties.heading}</h2>
						<c:if test="${not empty properties.subheading}">
							<h3<c:if test="${properties.subheadingstyle == 'darkgray'}"> class="darkgray"</c:if>>${properties.subheading}</h3>
						</c:if>
						<cq:include path="home-slideshow-item-content" resourceType="foundation/components/parsys" />
					</div>
				</div>
			</div>
		</div>   
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Click on 'Edit' button to configure the Home Slideshow Item component
		</c:if>
	</c:otherwise>
</c:choose>