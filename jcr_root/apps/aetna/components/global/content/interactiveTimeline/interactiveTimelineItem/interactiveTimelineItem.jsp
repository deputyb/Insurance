<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:if test="${isEditMode}">
	<div style="border: 1px solid black; margin: 10px; padding: 10px;">
</c:if>
<c:choose>
	<c:when test="${not empty properties.timelineposition}">
		<span class="timeline-arrow" style="left: ${timelineItem.leftPosition - 0.5}%"
			data-timeline-year="${timelineItem.year}" data-timeline-index="${timelineItem.index - 1}"></span>
		<c:if test="${!isEditMode}">
           	<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);%>
       	</c:if>	
       	<div class="item-content-wrapper">
        	<cq:include path="item-content" resourceType="foundation/components/parsys" />
        </div>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Double click to configure Interactive Timeline Item component
		</c:if>
	</c:otherwise>
</c:choose>
<c:if test="${isEditMode}">
	</div>
</c:if>