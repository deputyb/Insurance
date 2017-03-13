<%--request.getParameterMap().isEmpty()request.getParameterMap().isEmpty()request.getParameterMap().isEmpty()request.getParameterMap().isEmpty()request.getParameterMap().isEmpty()((HashMap) (request.getParameterMap()).toString()

  Page Link Report component.

  This is a date filter for aetna page link report.

--%><%@ page import="javax.jcr.Node,com.aetna.cq.bl.reporting.pageLink.controller.PageLinkUtil,com.day.cq.commons.jcr.JcrUtil,com.aetna.cq.bl.reporting.pageLink.controller.ReportCacheController,com.aetna.cq.bl.reporting.pageLink.entity.ReportCache,java.util.Calendar,java.util.GregorianCalendar,java.text.SimpleDateFormat"%><%@include file="/libs/foundation/global.jsp"%><%
%><%@page session="false" %><%
	ReportCacheController rcController = new ReportCacheController(resource.getResourceResolver().adaptTo(Session.class));
	rcController.loadReportCache();
	ReportCache rc = rcController.getReportCache();
	String[]filterPaths = properties.get("pathFilters",String[].class);
	SimpleDateFormat dateFormat = new SimpleDateFormat("EEE, d MMM yyyy HH:mm:ss");
	
	rcController.generateReportCache(resource, filterPaths);
	rc = rcController.getReportCache();

%><%= dateFormat.format( rc.getLastSyncDate().getTime() ) %>
