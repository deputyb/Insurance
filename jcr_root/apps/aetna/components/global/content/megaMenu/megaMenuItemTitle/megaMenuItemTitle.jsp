<%@include file="/apps/aetna/components/global/global.jsp"%>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
	<c:when test="${not empty properties.title}">
		<c:if test="${not empty properties.titleseo}">
			<h2 class="section-heading">${properties.titleseo}</h2>
		</c:if>
		
		<span class="topicLink">
			<a title="${properties.title}">${properties.title}</a>
			<span class="topicPlus"></span>
		</span>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Double click to configure the Mega Menu Item Title component
		</c:if>
	</c:otherwise>
</c:choose>