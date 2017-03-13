<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
    <c:when test="${not empty properties.text}">    
		<div class="container-fluid modImgText">
			<div class="row-fluid">
				<c:set scope="request" var="imageName" value="image"/>
		        <c:set scope="request" var="imageAltParam" value="imageAlt"/>
		        <c:set scope="request" var="imageAlt" value="${properties.imageAlt}"/>
		        <c:set scope="request" var="imageTitle" value="${properties.imageTitle}"/>
		        <c:set scope="request" var="imageURL" value="${properties.imageURL}"/>
					        
				<c:choose>
					<c:when test="${properties.layout == 'textimage'}">
						<div class="span9">
							<cq:text property="text"/>
						</div><!--/.span9-->
						<div class="leftImg span3">
					        <cq:include script="../utils/render.image.jsp" />
						</div>
					</c:when>
					<c:otherwise>
						<div class="leftImg span3">					        
					        <cq:include script="../utils/render.image.jsp" />
						</div>
						<div class="span9">
							<cq:text property="text"/>
						</div><!--/.span9-->
					</c:otherwise>
				</c:choose>
			</div><!--.row-fluid-->
		</div>
    </c:when>
    <c:otherwise>
    	<c:if test="${isEditMode}">
			Double click to configure the Body Text with Image on Side component
		</c:if>
    </c:otherwise>
</c:choose>