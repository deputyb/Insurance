<%--

  Date range filter for Report component.

  This is a date filter for aetna page audit report.

--%>
<%@ page import="java.util.Enumeration,java.util.HashMap,java.util.Calendar,com.aetna.cq.bl.reporting.filter.controller.ReportFilterController,javax.jcr.Session" %>
<%@include file="/libs/foundation/global.jsp"%>
<%@page session="false" %><%
	Session session = resource.getResourceResolver().adaptTo(Session.class);
	String searchResultPath= "/var/report-cache" + currentPage.getPath();
	String dataPath = "/var/audit/com.day.cq.wcm.core.page";
	currentPage.adaptTo(Node.class).getNode("jcr:content/report").setProperty("rootPath", searchResultPath);
	session.save();
	String startDate = request.getParameter("startDate");
	String endDate = request.getParameter("endDate");
	ReportFilterController rf = new ReportFilterController(resource, searchResultPath, dataPath);
	currentNode.setProperty("startDate",startDate);
	currentNode.setProperty("endDate",endDate);
	rf.setStartDate(startDate);
	rf.setEndDate(endDate);
	rf.cleanFolder();
	rf.doSearch();
%>
{
    "status": "done",
}
