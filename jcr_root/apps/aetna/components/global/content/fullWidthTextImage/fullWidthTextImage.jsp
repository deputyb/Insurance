<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
    <c:when test="${not empty properties.text}">    
    	<c:set scope="request" var="imageName" value="image"/>
    	
    	<c:if test="${not empty properties.backgroundcolor}">
    		<c:set var="containerClass" value="${properties.backgroundcolor}" />
    	</c:if>
    	
    	<c:if test="${not empty properties.lesspadding}">
    		<c:set var="containerClass" value="${containerClass} lessPadding" />
    	</c:if>
        
		<div class="container-fluid module col1bgMod ${properties.height} ${containerClass}" 
			style="max-width: none; 
					background-position: 50%;
					background-color: #EFF8FB; 
				<cq:include script="../utils/render.backgroundimage.jsp" />">
			<div class="row-fluid">
				<div class="span12 visible-phone">
					<div class="img loadImg">
						<c:set scope="request" var="imageName" value="mobileImage"/>
				    	<c:set scope="request" var="imageAltParam" value="imageAlt"/>
				        <c:set scope="request" var="imageAlt" value="${properties.imageAlt}"/>
				        <c:set scope="request" var="imageTitle" value="${properties.imageTitle}"/>
				        <c:set scope="request" var="cssClass" value="visible-phone"/>
				        <c:set scope="request" var="dataImgName" value="true"/>
				        
				        <cq:include script="../utils/render.image.jsp" />
					</div>
				</div>
				<div class="span6<c:if test="${properties.layout == 'imagetext'}"> offset6</c:if>">
					<cq:text property="text" />
				</div>
			</div>
		</div>
    </c:when>
    <c:otherwise>
    	<c:if test="${isEditMode}">
    		<div class="container-fluid module col1bgMod">
				Double click to configure the Topic Text Image component
			</div>
		</c:if>
    </c:otherwise>
</c:choose>