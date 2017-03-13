<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="hasImage" value="<%= currentNode != null && currentNode.hasNode("image") && (currentNode.getNode("image").hasProperty("fileReference") || currentNode.getNode("image").hasNode("file")) %>" />
<div class="boxWithImg">
	<div class="leftImg">
		<c:choose>
			<c:when test="${hasImage}">
				<c:set scope="request" var="imageName" value="image"/>
		        <c:set scope="request" var="imageAltParam" value="imageAlt"/>
		        <c:set scope="request" var="imageAlt" value="${properties.imageAlt}"/>
		        <c:set scope="request" var="imageTitle" value="${properties.imageTitle}"/>
		        <c:set scope="request" var="imageURL" value="${properties.imageURL}"/>
		        <c:set scope="request" var="URLTarget" value="${target}"/>
		        <cq:include script="../utils/render.image.jsp" />
			</c:when>
			<c:otherwise>
				<img src="<%=PageUtils.getMappedAbsoutePath("/content/dam/aetna/images/logos/harvardPartnership.jpg", slingRequest)%>">
			</c:otherwise>
		</c:choose>
	</div>
	<div class="textRight">
		<c:choose>
			<c:when test="${not empty properties.text}">
				${properties.text}
			</c:when>
			<c:otherwise>
				<p>Aetna InteliHealth<span class="superscript">&reg;</span>, with content partner Harvard Medical School, provides you with top-quality health information and breaking medical news. Known as The Trusted Source<span class="superscript">&reg;</span>, the website is recognized as a leading authority on health and wellness.</p>
			</c:otherwise>
		</c:choose>
	</div>
</div>