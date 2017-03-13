<%@include file="/apps/aetna/components/global/global.jsp" %><%


%>

<c:set var="renderImage" value="<%= currentNode != null && currentNode.hasNode("image") && (currentNode.getNode("image").hasProperty("fileReference") || currentNode.getNode("image").hasNode("file")) %>" />

<div class="articleModule">
	<c:set var="renderClass" value="legalNotice"/>

	<c:if test="${not empty properties.renderClass}">
		<c:set var="renderClass" value="${properties.renderClass}"/>
	</c:if>

    
    <c:if test="${renderImage}">
        <c:set var="renderClass" value="boxWithImg"/>
    </c:if>
    <div class="${renderClass}">
	<%-- Check if the image has to be rendered or not --%>
	<c:if test="${renderImage}">
		<div class="leftImg">
			<c:set scope="request" var="imageName" value="image"/>
	        <c:set scope="request" var="imageAltParam" value="imageAlt"/>
	        <c:set scope="request" var="imageAlt" value="${properties.imageAlt}"/>
	        <c:set scope="request" var="imageTitle" value="${properties.imageTitle}"/>
	        <c:set scope="request" var="imageURL" value="${properties.imageURL}"/>
	        
	        <cq:include script="../utils/render.image.jsp" />
		</div>

		<div class="textRight">
	</c:if>

	<cq:text property="text"/>
	
	<c:if test="${renderImage}">
		</div>
	</c:if>
    </div>
</div>