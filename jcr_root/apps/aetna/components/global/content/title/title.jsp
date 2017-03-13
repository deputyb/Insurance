<%@include file="/apps/aetna/components/global/global.jsp" %><%
%><%@ page import="com.day.cq.commons.DiffInfo,
        com.day.cq.commons.DiffService" %><%

    // first calculate the correct title - look for our sources if not set in paragraph
    String title = properties.get(NameConstants.PN_TITLE, String.class);
    if (title == null || title.equals("")) {
        title = resourcePage.getPageTitle();
    }
    if (title == null || title.equals("")) {
        title = resourcePage.getTitle();
    }
    if (title == null || title.equals("")) {
        title = resourcePage.getName();
    }

    // check if we need to compute a diff
    String diffOutput = null;
    
    DiffInfo diffInfo = resource.adaptTo(DiffInfo.class);
    if (diffInfo != null) {
        DiffService diffService = sling.getService(DiffService.class);
        ValueMap map = ResourceUtil.getValueMap(diffInfo.getContent());
        String diffText = map.get(NameConstants.PN_TITLE, "");
        // if the paragraph has no own title, we use the current page title(!)
        if (diffText == null || diffText.equals("")) {
            diffText = title;
        }
        diffOutput = diffInfo.getDiffOutput(diffService, title, diffText, false);
        if (title.equals(diffOutput)) {
            diffOutput = null;
        }
    }
    String defType = currentStyle.get("defaultType", "large");
    
    // use image title if type is "small" but not if diff should be displayed
    if (properties.get("type", defType).equals("small") && diffOutput == null) {
        
        String suffix = currentDesign.equals(resourceDesign) ? "" : "/" + currentDesign.getId();
        // add mod timestamp to avoid client-side caching of updated images
        long tstamp = properties.get("jcr:lastModified", properties.get("jcr:created", System.currentTimeMillis()));
        suffix += "/" + tstamp + ".png";
        String xs = Doctype.isXHTML(request) ? "/" : "";


    // large title
    } else if (diffOutput == null) {        
        %><div class="container-fluid">
            <div class="row-fluid">
                <div class="span12">
                    <h1><span><%= title %></span></h1>
                </div>
            </div><!--/.row-fluid-->
           </div><!--/.container-fluid--><%
    } else {
        // don't escape diff output
        %><h1><%= diffOutput %></h1><%

    }
%>