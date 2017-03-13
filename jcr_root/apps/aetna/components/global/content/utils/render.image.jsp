<%@include file="/apps/aetna/components/global/global.jsp" %>

<%
    Image img = null;
			
    String location = PageUtils.getResolvedPath((String) request.getAttribute("imageURL"), "", slingRequest, pageContext);
    
    // Verify if the resource was loaded
    if (resource != null) {
        img = new Image(resource, (String) request.getAttribute("imageName"));
        if (img.hasContent()) {
        	Node imageNode;
        	String dataImgName = (String) request.getAttribute("dataImgName");
        	
          img.setItemName(Image.NN_FILE, "image");
          img.setItemName(Image.PN_REFERENCE, "imageReference");
          img.setSelector(".img");
          img.setDoctype(Doctype.fromRequest(request));
          img.setAlt((String)request.getAttribute("imageAlt"));
          img.setTitle((String)request.getAttribute("imageTitle"));
            
			    imageNode = resourceResolver.getResource(img.getPath()).adaptTo(Node.class);
        	
          // Get the real path of the image
        	if (imageNode.hasProperty("fileReference")) {
        		img.setSrc(imageNode.getProperty("fileReference").getString());				
        	} else if (imageNode.hasNode("file")) {
        		imageNode = imageNode.getNode("file").getNode("jcr:content");
        		img.setSrc(imageNode.getPath());
        	}
          
          // use the mapped absolute path of this image
          img.setSrc(PageUtils.getMappedAbsoutePath(img.getSrc(), slingRequest));
        }
    }
    
	String target = "target=\"_top\""; 
	if(request.getAttribute("URLTarget") != null){
		target = (String) request.getAttribute("URLTarget");
	}
%>

<c:if test="${empty dataImgName}">
	<c:set var="imageSrc" value="<%= img.getSrc() %>" />
</c:if>

<c:if test="${!empty imageURL}">
	<a href="<%= location %>" <c:if test="${not empty linkClass}"> class="${linkClass}" </c:if>title="${imageTitle}" <%= target %><c:if test="${not empty linkOnclick}"> onclick="${linkOnclick}"</c:if>>
</c:if>
<c:choose>
	<c:when test="<%= (img != null) %>">
		<img src="${imageSrc}" title="<%= img.getTitle() %>" alt="<%= img.getAlt() %>"
			<c:if test="${not empty cssClass}"> class="${cssClass}"</c:if> 
			<c:if test="${not empty dataImgName && dataImgName}"> data-imgname="<%= img.getSrc() %>"</c:if> /></c:when>
  	<c:otherwise>${imageTitle}</c:otherwise>
</c:choose>
<c:if test="${!empty imageURL}"></a></c:if>

<c:remove var="imageName" />
<c:remove var="imageAltParam" />
<c:remove var="imageAlt" />
<c:remove var="imageTitle" />
<c:remove var="imageURL" />
<c:remove var="dataImgName" />
<c:remove var="cssClass" />
<c:remove var="URLTarget" />
<c:remove var="linkClass" />
<c:remove var="linkOnclick" />
