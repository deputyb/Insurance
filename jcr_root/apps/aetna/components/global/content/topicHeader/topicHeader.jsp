<%@include file="/apps/aetna/components/global/global.jsp" %>


<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:set var="hasMobileImage" value="<%= currentNode != null && currentNode.hasNode("mobileImage") && (currentNode.getNode("mobileImage").hasProperty("fileReference") || currentNode.getNode("mobileImage").hasNode("file")) %>" />

<c:choose>
    <c:when test="${not empty properties.title}">    	
    	<c:set var="backgroundScript" value="../utils/render.backgroundimage.jsp"/>
    	<c:set var="imageScript" value="../utils/render.image.jsp"/>
    	<c:set scope="request" var="imageName" value="image"/>
    	<c:if test="${!hasMobileImage}">
    		<c:set var="backgroundScript" value="../utils/render.backgroundimage.rendition.jsp"/>
	        <c:set scope="request" var="dataAttr" value="" />
	        <c:set scope="request" var="renditionSize" value="800.504" />
	        <c:set var="imageScript" value="../utils/render.image.rendition.jsp"/>
    	</c:if>
		
		<div class="topic-header ${properties.height}<c:if test="${not empty properties.centerimage}"> center-bg-image</c:if>"> 
			<div class="topic-header-bg">
				<div class="left header-bg"></div>
				<div class="right header-bg" style="<cq:include script="${backgroundScript}" />"></div>
			</div>
			<div class="container-fluid noPadding">
				<div class="row-fluid">
					<div class="span6 visible-phone">
						<c:choose>
							<c:when test="${!hasMobileImage}">
					    		<c:set var="backgroundScript" value="../utils/render.backgroundimage.rendition.jsp"/>
					    		<c:set var="imageScript" value="../utils/render.image.rendition.jsp"/>
					    		<c:set scope="request" var="imageName" value="image"/>
						        <c:set scope="request" var="dataAttr" value="" />
						        <c:set scope="request" var="renditionSize" value="767.350" />
					    	</c:when>
					    	<c:otherwise>
					    		<c:set scope="request" var="imageName" value="mobileImage"/>
					    	</c:otherwise>
					    </c:choose>
		
				        <cq:include script="${imageScript}" />
					</div>
					<div class="span6 heading">
						<h1><cq:text property="title" /></h1>
						<p><cq:text property="text" /></p>
					</div>
				</div><!--/.row-fluid-->
			</div><!--/.container-fluid-->
		</div>
    </c:when>
    <c:otherwise>
    	Double click to configure Overview Module
    </c:otherwise>
</c:choose>