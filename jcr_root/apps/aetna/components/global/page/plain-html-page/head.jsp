<%@include file="/apps/aetna/components/global/global.jsp" %>
<%
    String xs = Doctype.isXHTML(request) ? "/" : "";
	String favIcon = "https://www.aetna.com/favicon.ico";
%>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<jsp:useBean id="pagePropertiesController" class="com.aetna.cq.bl.widgets.pageProperties.controller.PagePropertiesController">
	<jsp:setProperty name="pagePropertiesController" property="slingRequest" value="<%=slingRequest%>" />
	<jsp:setProperty name="pagePropertiesController" property="pageContext" value="<%=pageContext%>" />
</jsp:useBean>
<c:set var="htmlEntryManager" value="<%= pagePropertiesController.getHtmlEntries(currentPage) %>" scope="request" />
<head>
	<c:if test="${fn:length(htmlEntryManager.headTopEntries) > 0}">
		<c:forEach var="htmlEntry" items="${htmlEntryManager.headTopEntries}">
			${htmlEntry}
		</c:forEach>
	</c:if>
	<c:if test="<%= properties.get("hideInRobots", null) != null %>">
    	<meta name="robots" content="noindex, nofollow" />
    </c:if>
	<meta name="viewport" content="width=device-width, initial-scale=1"<%=xs%>>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8"<%=xs%>>
    <meta http-equiv="keywords" content="<%= StringEscapeUtils.escapeHtml(WCMUtils.getKeywords(currentPage, false)) %>"<%=xs%>>
    <meta name="description" content="<%= StringEscapeUtils.escapeHtml(properties.get("jcr:description", "")) %>"<%=xs%>>
    <meta name="format-detection" content="telephone=no" />
    
    <cq:include script="/libs/wcm/core/components/init/init.jsp"/>
    <% if (favIcon != null) { %>
        <link rel="icon" type="image/vnd.microsoft.icon" href="<%= favIcon %>"/>
        <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="<%= favIcon %>"/>
    <% } %>
    <title><%= currentPage.getTitle() == null ? currentPage.getName() : currentPage.getTitle() %></title>

    <cq:includeClientLib css="aetna.common"/>
    
	<!--[if lte IE 9]>
        <script src="/common/js/common-clientlibs/js/jquery.xdomainrequest.min.js"></script>
    <![endif]-->
	<!--[if lt IE 9]>
        <script src="/common/js/common-clientlibs/js/html5shiv.js"></script>
        <link href="/common/css/common-clientlibs/css/ie8.css" rel="stylesheet" media="screen">
    <![endif]-->
    
    <!-- canonicalPath -->
	<c:set var="canonicalTag" value="<%= PageUtils.getResolvedPath(properties.get("canonicaltag", currentPage.getPath()), "#", slingRequest, pageContext) %>"/>
	<link rel="canonical" href="http<c:if test="${empty properties.usehttpforcanonicaltag}">s</c:if>://www.aetna.com${canonicalTag}"/> 
	<!--/ canonicalPath -->
	<c:if test="${fn:length(htmlEntryManager.headBottomEntries) > 0}">
		<c:forEach var="htmlEntry" items="${htmlEntryManager.headBottomEntries}">
			${htmlEntry}
		</c:forEach>
	</c:if>
</head>
