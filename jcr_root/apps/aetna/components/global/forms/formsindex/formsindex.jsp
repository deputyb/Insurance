<%@include file="/apps/aetna/components/global/global.jsp" %>
<%@page import="com.aetna.cq.bl.common.entity.Link" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:choose>
	<c:when test="${not empty properties.paths}">
		<jsp:useBean class="com.aetna.cq.bl.components.forms.controller.FormsController" id="formsController" />
		<c:set var="links" value="<%= formsController.getFormIndex(resource, "paths") %>" />
		<c:forEach items="${links}" var="link">
			<a href="<%= PageUtils.getResolvedPath(((Link) pageContext.getAttribute("link")).getUrl(), "#", slingRequest, pageContext)  %>">${link.title}</a><br/>
		</c:forEach>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Double click to configure the Forms Index component
		</c:if>
	</c:otherwise>
</c:choose>