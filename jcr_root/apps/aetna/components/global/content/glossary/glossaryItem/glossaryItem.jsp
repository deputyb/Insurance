<%@include file="/apps/aetna/components/global/global.jsp" %>
<%@page import="com.aetna.cq.bl.components.glossary.controller.GlossaryController" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:choose>
	<c:when test="${not empty properties.term}">
		<div class="row-fluid">
			<div class="span4">
				<p><b>${properties.term}</b></p>
			</div>
			<div class="span8">
				${properties.meaning}
			</div>
		</div>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Double click to configure Glossary Item component
		</c:if>
	</c:otherwise>
</c:choose>