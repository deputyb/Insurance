<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
    <c:when test="${not empty properties.text}">  
    	<c:if test="${not empty properties.lesspadding}">
    		<c:set var="containerClass" value=" lessPadding" />
    	</c:if>
     	<c:if test="${not empty properties.cssclass}">
    		<c:set var="containerClass" value="${containerClass} ${properties.cssclass}" />
    	</c:if>
    	<c:set var="imageURL" value="${properties.imageURL}" />
    	<c:if test="${empty imageURL && not empty properties.interstitial}">
    		<c:set var="classes" value="${properties.interstitial}" />
    		<c:set scope="request" var="linkClass" value="${classes}" />
    		<c:set var="imageURL" value="#" />
    	</c:if>
		<div class="container-fluid module col2bgMod ${properties.height} whitebg ${containerClass}">
			<div class="row-fluid">
				<c:set scope="request" var="imageName" value="image"/>
				<c:set scope="request" var="renditionSize" value="767.350" />
		        <c:set scope="request" var="imageURL" value="${imageURL}"/>
	    		<c:set scope="request" var="cssClass" value="visible-phone"/>
	    		<c:set scope="request" var="dataImgName" value="true"/>
	    		<c:set scope="request" var="linkOnclick" value="${properties.onclick}"/>
	    		<c:set scope="request" var="dataAttr" value="" />

				<div class="span12 visible-phone img loadImg">
					<cq:include script="../../utils/render.image.rendition.jsp" />
                </div>

				<c:set scope="request" var="imageName" value="image"/>
				<c:choose>
					<c:when test="${properties.height == 'tall'}">
						<c:set scope="request" var="renditionSize" value="600.576"/>
					</c:when>
					<c:otherwise>
						<c:set scope="request" var="renditionSize" value="600.384"/>
					</c:otherwise>
				</c:choose>
				<c:set scope="request" var="imageURL" value="${imageURL}"/>
		        <c:set scope="request" var="cssClass" value="hidden-phone${classes}" />
		        <c:set scope="request" var="dataImgName" value="true"/>
	        
				<c:choose>
					<c:when test="${properties.layout == 'textimage'}">
						<div class="span6">
							<cq:text property="text"/>
						</div><!--/.span6-->
						<c:if test="${not empty imageURL}">
							<a href="${imageURL}" class="${classes}"<c:if test="${not empty properties.onclick}"> onclick="${properties.onclick}"</c:if>>
						</c:if>
						<div class="span6 modBG" style="<cq:include script="../utils/render.backgroundimage.rendition.jsp" />">
						</div>
						<c:if test="${not empty imageURL}">
							</a>
						</c:if>
					</c:when>
					<c:otherwise>
						<c:if test="${not empty imageURL}">
							<a href="${imageURL}" class="${classes}"<c:if test="${not empty properties.onclick}"> onclick="${properties.onclick}"</c:if>>
						</c:if>
						<div class="span6 modBG" style="<cq:include script="../utils/render.backgroundimage.rendition.jsp" />">
						</div>
						<c:if test="${not empty imageURL}">
							</a>
						</c:if>
						<div class="span6">
							<cq:text property="text"/>
						</div><!--/.span6-->
					</c:otherwise>
				</c:choose>
			</div><!--.row-fluid-->
		</div>
    </c:when>
    <c:otherwise>
    	<c:if test="${isEditMode}">
			Double click to configure the One-Column with Image on Side component
		</c:if>
    </c:otherwise>
</c:choose>