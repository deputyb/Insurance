<%--request.getParameterMap().isEmpty()request.getParameterMap().isEmpty()request.getParameterMap().isEmpty()request.getParameterMap().isEmpty()request.getParameterMap().isEmpty()((HashMap) (request.getParameterMap()).toString()

  Page Link Report component.

  This is a date filter for aetna page link report.

--%>
<%@ page import="javax.jcr.Node,com.aetna.cq.bl.reporting.pageLink.controller.PageLinkUtil,com.day.cq.commons.jcr.JcrUtil,com.aetna.cq.bl.reporting.pageLink.controller.ReportCacheController,com.aetna.cq.bl.reporting.pageLink.entity.ReportCache,java.util.Calendar,java.util.GregorianCalendar,java.text.SimpleDateFormat"%>
<%@include file="/libs/foundation/global.jsp"%><%
%><%@page session="false" %>
<%
	ReportCacheController rcController = new ReportCacheController(resource.getResourceResolver().adaptTo(Session.class));
	rcController.loadReportCache();
	ReportCache rc = rcController.getReportCache();
	String[] filterPaths = properties.get("pathFilters",String[].class);
	SimpleDateFormat dateFormat = new SimpleDateFormat("EEE, d MMM yyyy HH:mm:ss");
	
	// If date is null means the report has never run and needs to run the generation
	if (rc.getLastSyncDate() == null){
		rcController.generateReportCache(resource, filterPaths);
		rc = rcController.getReportCache();
	}else{
		int syncInterval = Integer.parseInt(properties.get("syncInterval","7"));
		Calendar runSync = (Calendar)rc.getLastSyncDate().clone();
		runSync.add(Calendar.DATE, syncInterval);
		
		if (runSync.compareTo(GregorianCalendar.getInstance()) < 0){
			rcController.generateReportCache(resource, filterPaths);
			rc = rcController.getReportCache();
		}
		
	}
%>	

<script type="text/javascript">
	var baseURL= "<%=currentNode.getPath()%>";
</script>
 
<div class="plHeader">
	<p>Last snapshot of links taken on : <span class="plDate"><%= dateFormat.format( rc.getLastSyncDate().getTime() ) %></span><span class="plRefresh"> </span></p>
</div>	
<div class="loading-modal"></div>
