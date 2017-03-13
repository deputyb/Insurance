<%@include file="/apps/aetna/components/global/global.jsp" %>
<%@page import="com.aetna.cq.bl.components.analytics.utils.AnalyticsUtils, com.aetna.cq.bl.components.analytics.entity.WebTreandsMetadata" %>

<c:forEach var="metadata" items="<%= AnalyticsUtils.getWebTreandsMetadata(currentPage) %>">
	<meta name="${metadata.type}" content="${metadata.value}" />
</c:forEach>