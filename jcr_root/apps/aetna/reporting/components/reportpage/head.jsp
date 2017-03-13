<%@page session="false"%><%@include file="/libs/foundation/global.jsp" %><%
%><%@ page import="com.day.cq.commons.Doctype, org.apache.commons.lang3.StringEscapeUtils" %><%
    String xs = Doctype.isXHTML(request) ? "/" : "";
%><head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8"<%=xs%>>
    <meta name="keywords" content="<%= StringEscapeUtils.escapeHtml4(WCMUtils.getKeywords(currentPage)) %>"<%=xs%>>
    <meta name = "format-detection" content = "telephone=no" />
    <cq:include script="init.jsp"/>
    <cq:include script="stats.jsp"/>
    <% currentDesign.writeCssIncludes(pageContext); %>
    <!-- Common report style (so we won't have to copy it for each report type) -->
    <link rel="stylesheet" href="/etc/designs/reports/report.css" type="text/css">
    <title><%= currentPage.getTitle() == null ? StringEscapeUtils.escapeHtml4(currentPage.getName()) : StringEscapeUtils.escapeHtml4(currentPage.getTitle()) %></title>
    
    <!-- canonicalPath -->
	<c:set var="pagePath" value="<%=currentPage.getPath()%>"/>
	<c:set var="staticPath" value="${fn:replace(pagePath, 'content/aetna/', '')}" />
	
	<link rel="canonical" href="http://www.aetna.com${staticPath}.html"/> 
	<!--/ canonicalPath -->
</head>
