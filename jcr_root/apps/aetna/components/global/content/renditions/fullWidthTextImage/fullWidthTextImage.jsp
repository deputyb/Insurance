<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
    <c:when test="${not empty properties.text}">    
    	<c:set scope="request" var="imageName" value="image"/>
    	<c:set scope="request" var="renditionSize" value="1600.576"/>
    	<c:set scope="request" var="prefix" value="error"/>
    	
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
				<cq:include script="../utils/render.backgroundimage.rendition.jsp" />">
			<div class="row-fluid">
				<div class="span12 visible-phone">
					<div class="img loadImg">		        
				        <c:set var="imageName" value="image" scope="request" />
						<c:set var="dataAttr" value="" scope="request" />
						<c:set var="renditionSize" value="767.350" scope="request" />
						<c:set var="cssClass" value="visible-phone" scope="request" />
				        <c:set var="dataImgName" value="true" scope="request"/>
				        <cq:include script="../../utils/render.image.rendition.jsp" />
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