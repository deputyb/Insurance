<%@include file="/apps/aetna/components/global/global.jsp" %>
<jsp:useBean id="renditionsController"
	class="com.aetna.cq.bl.components.renditions.controller.RenditionsController"></jsp:useBean>
<c:set var="renditionElement"
	value="<%=renditionsController.getAssetRendition(resource,
					(String) request.getAttribute("imageName"),
					(String) request.getAttribute("renditionSize"),
					(String) request.getAttribute("dataAttr"), 
					(String) request.getAttribute("prefix"),
					slingRequest)%>" />
<c:if test="${not empty renditionElement.imagePath}">background-image: url(${renditionElement.imagePath})</c:if>
<c:remove var="imageName" />
<c:remove var="renditionSize" />
<c:remove var="dataAttr" />
<c:remove var="prefix"/>