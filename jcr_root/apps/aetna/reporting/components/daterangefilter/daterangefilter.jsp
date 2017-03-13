<%--request.getParameterMap().isEmpty()request.getParameterMap().isEmpty()request.getParameterMap().isEmpty()request.getParameterMap().isEmpty()request.getParameterMap().isEmpty()((HashMap) (request.getParameterMap()).toString()

  Date range filter for Report component.

  This is a date filter for aetna page audit report.

--%>
<%@ page import="javax.jcr.Node"%>
<%@include file="/libs/foundation/global.jsp"%><%
%><%@page session="false" %><%
%>

<script type="text/javascript">
	var baseURL= "<%=currentNode.getPath()%>";
</script>
<form id="daPicker">
	<label>Date range</label>
	<input type="text" name="startDate" class="datepicker" value="<%=properties.get("startDate","")%>"/>
	<input type="text" name="endDate" class="datepicker" value="<%=properties.get("endDate","")%>"/>
	<input type="button" id="dateRangeBut" value="Search"/>
</form>

<div class="loading-modal"></div>

