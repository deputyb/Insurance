<%--
  Copyright 1997-2010 Day Management AG
  Barfuesserplatz 6, 4001 Basel, Switzerland
  All Rights Reserved.

  This software is the confidential and proprietary information of
  Day Management AG, ("Confidential Information"). You shall not
  disclose such Confidential Information and shall use it only in
  accordance with the terms of the license agreement you entered into
  with Day.

  ==============================================================================

  Default head script.

  Draws the HTML head with some default content:
  - includes the WCML init script
  - includes the head libs script
  - includes the favicons
  - sets the HTML title
  - sets some meta data

  ==============================================================================

--%><%@include file="/apps/aetna/components/global/global.jsp" %>
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
	<meta http-equiv="X-UA-Compatible" content="IE=edge" >
    <meta name="viewport" content="width=device-width, initial-scale=1"<%=xs%>>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8"<%=xs%>>
    <meta http-equiv="keywords" content="<%= StringEscapeUtils.escapeHtml(WCMUtils.getKeywords(currentPage, false)) %>"<%=xs%>>
    <meta name="description" content="<%= StringEscapeUtils.escapeHtml(properties.get("jcr:description", "")) %>"<%=xs%>>
    <meta name="format-detection" content="telephone=no" />
    <c:forEach var="metatag" items="<%= pagePropertiesController.getListItemLinks(currentNode.getPath(), "metatags", resourceResolver)%>">
        <meta name="${metatag.nameTag}" content="${metatag.content}" />
    </c:forEach>
    <cq:include script="analytics-metadata.jsp" />

    <c:if test="<%= properties.get("hideInRobots", null) != null %>">
    	<meta name="robots" content="noindex, nofollow" />
    </c:if>
    
    <cq:include script="/libs/wcm/core/components/init/init.jsp"/>
    <% if (favIcon != null) { %>
    <link rel="icon" type="image/vnd.microsoft.icon" href="<%= favIcon %>"/>
    <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="<%= favIcon %>"/>
    <% } %>
    <title><%= currentPage.getTitle() == null ? currentPage.getName() : currentPage.getTitle() %></title>
    


    <!-- Foresee STARTS here...-->
	<script src="/foresee/foresee-trigger.js" type="text/javascript"></script>
	<!-- Foresee ENDS here...-->
    
    <c:if test="${isEditMode}">
		<cq:includeClientLib js="aetna.widgets"/>
		<cq:includeClientLib categories="aetna.rte.analyticslink"/>
	</c:if>    

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
	
	<cq:includeClientLib css="aetna.common"/>
	<c:if test="${fn:length(htmlEntryManager.headBottomEntries) > 0}">
		<c:forEach var="htmlEntry" items="${htmlEntryManager.headBottomEntries}">
			${htmlEntry}
		</c:forEach>
	</c:if>
</head>
