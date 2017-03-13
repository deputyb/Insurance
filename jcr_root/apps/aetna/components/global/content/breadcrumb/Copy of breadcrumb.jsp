<%@include file="/apps/aetna/components/global/global.jsp"%><%
%><%@ page import="java.util.Iterator,
        com.day.cq.wcm.api.PageFilter,
        com.day.cq.wcm.api.NameConstants,
        com.day.cq.wcm.api.Page" %><%

    // get starting point of trail
    long level = currentStyle.get("absParent", 2L);
    // adjusting for additional level of site structure	
	level = level +1;
    long endLevel = currentStyle.get("relParent", 1L);
    String delimStr = currentStyle.get("delim", "&nbsp;&gt;&nbsp;");
    String trailStr = currentStyle.get("trail", "");
    int currentLevel = currentPage.getDepth();
    String delim = "";
    %><ul>
	<li class="noLink">Aetna</li>
	<%
    while (level < currentLevel - endLevel) {
        Page trail = currentPage.getAbsoluteParent((int) level);
        if (trail == null) {
            break;
        }
        String title = trail.getNavigationTitle();
        if (title == null || title.equals("")) {
            title = trail.getNavigationTitle();
        }
        if (title == null || title.equals("")) {
            title = trail.getTitle();
        }
        if (title == null || title.equals("")) {
            title = trail.getName();
        }
        
        level++;
        %>       
        <li>
            <%if (level < currentLevel - endLevel) {
	            if (!trail.isHideInNav()){%>
	            	<a href="<%= trail.getPath()+".html" %>"><%= title %></a>
	            	<span class="bread-arrow"></span>
	            <%}
            } else {
			%>
            	<span><%= title %></span>
            <%
        }%>
        </li><%

        delim = delimStr;
        
    }
    if (trailStr.length() > 0) {
        %><%= trailStr %><%
    }

%></ul>