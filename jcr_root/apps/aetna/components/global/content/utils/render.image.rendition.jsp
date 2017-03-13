<%@include file="/apps/aetna/components/global/global.jsp"%>
<jsp:useBean id="renditionsController"
	class="com.aetna.cq.bl.components.renditions.controller.RenditionsController"></jsp:useBean>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:set var="renditionElement"
	value="<%=renditionsController.getAssetRendition(resource,
					(String) request.getAttribute("imageName"),
					(String) request.getAttribute("renditionSize"),
					(String) request.getAttribute("dataAttr"), 
					(String) request.getAttribute("prefix"),
					slingRequest)%>" />

<c:if test="${empty dataImgName}">
	<c:set var="imageSrc" value="${renditionElement.imagePath}" />
</c:if>
<c:if test="${!empty imageURL}">
	<c:set var="location"
		value="<%= PageUtils.getResolvedPath(
						(String) request.getAttribute("imageURL"), "",
						slingRequest, pageContext) %>" />
	<a href="${location}" title="${renditionElement.imageAlt}"
		<c:if test="${not empty linkClass}"> class="${linkClass}"</c:if>
		<c:if test="${not empty linkTarget}"> target="${linkTarget}"</c:if>
		<c:if test="${not empty linkOnclick}"> onclick="${linkOnclick}"</c:if>>
</c:if>
<c:choose>
	<c:when test="${isEditMode && empty imageSrc}">
		<p>The selected image doesn't have the proper rendition to display. 
			Please make sure that the image has the next rendition: <c:if test="${not empty prefix}">${prefix}.</c:if>${renditionSize}.jpg</p>
	</c:when>
	<c:otherwise>
		<img src="${imageSrc}" alt="${renditionElement.imageAlt}"
			title="${renditionElement.imageAlt}"
			<c:if test="${not empty cssClass}"> class="${cssClass}"</c:if>
			<c:if test="${not empty dataImgName}"> data-imgname="${renditionElement.imagePath}"</c:if> />
	</c:otherwise>
</c:choose>
<c:if test="${!empty imageURL}">
	</a>
</c:if>
<c:remove var="imageName" />
<c:remove var="imageURL" />
<c:remove var="linkClass" />
<c:remove var="linkTarget" />
<c:remove var="linkOnclick" />
<c:remove var="renditionSize" />	
<c:remove var="dataAttr" />
<c:remove var="cssClass" />
<c:remove var="dataImgName" />
<c:remove var="prefix"/>