<%@include file="/apps/aetna/components/global/global.jsp"%>
<jsp:useBean id="renditionsController"
	class="com.aetna.cq.bl.components.renditions.controller.RenditionsController"></jsp:useBean>
<c:set var="renditionsInformation"
	value="<%= renditionsController.getAssetRenditions(resource,
					(String) request.getAttribute("imageName"),
					(String[]) request.getAttribute("renditionSizes"),
					(String[]) request.getAttribute("dataAttrs"),
					(String) request.getAttribute("prefix"),
					slingRequest) %>" />
<c:forEach var="renditionElement" items="${renditionsInformation}">
	 ${renditionElement.imageDataAttr}="${renditionElement.imagePath}"
</c:forEach>
<c:remove var="imageName" />
<c:remove var="renditionSizes" />
<c:remove var="dataAttrs"/>
<c:remove var="prefix"/>
