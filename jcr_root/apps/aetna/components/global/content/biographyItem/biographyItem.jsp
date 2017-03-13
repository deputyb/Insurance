<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:set var="openToggleCopy" value="${currentStyle.opentogglecopy}" />
<c:set var="closeToggleCopy" value="${currentStyle.closetogglecopy}" />
<c:if test="${empty openToggleCopy}">
	<c:set var="openToggleCopy" value="Show More" />
</c:if>
<c:if test="${empty closeToggleCopy}">
	<c:set var="closeToggleCopy" value="Show Less" />
</c:if>
<c:choose>
	<c:when test="${not empty properties.heading}">
		<div class="row-fluid">
			<div class="bio-item-wrapper">
				<div class="span2">
			        <c:set scope="request" var="imageName" value="image"/>
			        <c:set scope="request" var="imageAltParam" value="imageAlt"/>
			        <c:set scope="request" var="imageAlt" value="${properties.imageAlt}"/>
			        <c:set scope="request" var="imageTitle" value="${properties.imageTitle}"/>
			        <c:set scope="request" var="imageURL" value="${properties.imageURL}"/>
			        <cq:include script="../utils/render.image.jsp" />
				</div>
				<div class="span10">
					<h3>${properties.heading}</h3>
					<p><b>${properties.subheading1}
						<c:if test="${not empty properties.subheading2}"><br/>${properties.subheading2}</c:if></b></p>
					<c:if test="${not empty properties.teasertext}">
						${properties.teasertext}
					</c:if>
					<c:if test="${not empty properties.hiddentext}">
						<div class="hidden-text">${properties.hiddentext}</div>
					</c:if>
				</div>
				<div style="clear:both;"></div>
			</div>
			<div class="bio-item-toggle span2 offset10">
				<a href="#" class="closed">${openToggleCopy}
					<span class="arrow"></span>
				</a>
				<a href="#" class="opened hidden">${closeToggleCopy}
					<span class="arrow"></span>
				</a>
			</div>
		</div>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Double click to configure Biography item component
		</c:if>
	</c:otherwise>
</c:choose>