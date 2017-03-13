<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:set var="filter" value="${properties.filter}"/>
<c:choose>
	<c:when test="${not empty properties.text}">
		<div class="slide ${filter}<c:if test="${not empty properties.specialTabletLandscapeClass}"> tablet-center-landscape</c:if>"
			<c:set var="imageName" value="image" scope="request" />
			<c:set var="renditions" value="1600.334,1024.403" />
			<c:set var="dataAttrsStr" value="data-bgd,data-bgt" />
			<c:set var="dataAttrs" value="${fn:split(dataAttrsStr, ',')}" scope="request" />
			<c:set var="renditionSizes" value="${fn:split(renditions, ',')}" scope="request" />
			<c:set var="prefix" value="hero" scope="request"/>
			<cq:include script="../../utils/render.dataimage.rendition.jsp" />>
	        <div class="row-fluid">
				<div class="container-fluid">
					<div class="visible-phone">
						<c:set var="imageName" value="image" scope="request" />
						<c:set var="dataAttr" value="" scope="request" />
						<c:set var="renditionSize" value="767.350" scope="request" />
						<c:set var="prefix" value="hero" scope="request"/>
				        <cq:include script="../../utils/render.image.rendition.jsp" />
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