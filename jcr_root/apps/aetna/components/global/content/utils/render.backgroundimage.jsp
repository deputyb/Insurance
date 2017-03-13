<%@include file="/apps/aetna/components/global/global.jsp" %><%
    Image img = null;

    // Verify if the resource was loaded
    if (resource != null) {
        img = new Image(resource, (String) request.getAttribute("imageName"));
        
        if (img.hasContent()) {
        	Node imageNode;
        	
          img.setItemName(Image.NN_FILE, "image");
          img.setItemName(Image.PN_REFERENCE, "imageReference");
          img.setSelector(".img");
          img.setDoctype(Doctype.fromRequest(request));
            
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
%><c:if test="<%= (img != null) %>">background-image: url(<%= img.getSrc() %>)</c:if>

<c:remove var="imageName" />
<c:remove var="imageAltParam" />
<c:remove var="imageAlt" />
<c:remove var="imageTitle" />
<c:remove var="imageURL" />
<c:remove var="dataImgName" />
<c:remove var="cssClass" />