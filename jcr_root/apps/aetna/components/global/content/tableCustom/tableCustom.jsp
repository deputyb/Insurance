<%@page session="false"%><%@ page import="com.day.cq.wcm.foundation.Placeholder" %>
<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<%
    String classicPlaceholder = "<img src=\"/libs/cq/ui/resources/0.gif\" class=\"cq-table-placeholder\" alt=\"\">";
    String placeholder = Placeholder.getDefaultPlaceholder(slingRequest, component, classicPlaceholder);
%>

<c:forEach var="class" items="${properties.classes}">
    <c:set var="classes" value="${class} ${classes}" />
</c:forEach>

<c:set var="tableId" value="table${currentNode.identifier}" />

<div id="${tableId}" class="tableBase">
    <cq:text property="tableData" escapeXml="false" placeholder="<%= placeholder %>"/>
</div>

<c:if test="${not empty classes}">
    <script>
        $('#${tableId} table').attr("class",$('#${tableId} table').prop("class") + " ${classes}");
    </script>
</c:if> 