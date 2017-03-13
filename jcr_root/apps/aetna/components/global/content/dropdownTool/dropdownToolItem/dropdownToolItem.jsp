<%@include file="/apps/aetna/components/global/global.jsp" %>
<%@page import="com.aetna.cq.bl.components.dropdowntool.controller.DropdownToolController" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
        
<c:choose>
	<c:when test="${not empty properties.optiontitle}">
		<c:if test="${!isEditMode}">
			<c:set var="dropdownToolOption" value="<%= ((DropdownToolController) request.getAttribute("dropdownToolController")).generateOptionEntity(currentNode) %>" />
		</c:if> 
		<div class="dropdown-tool-item<c:if test="${!isEditMode}"> hidden</c:if><c:if test="${not empty properties.includeborder}"> border</c:if>"
			data-option-name="${dropdownToolOption.value}">
			<c:if test="${isEditMode}">
				<div style="border: 1px solid black; margin: 5px; padding: 5px;">
					<p>Drop here the content for the "${properties.optiontitle}" option.</p>
			</c:if>
	        <cq:include path="item-content" resourceType="foundation/components/parsys"/>
	       	<c:if test="${isEditMode}">
	       		</div>
	       	</c:if>
		</div>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Double click to edit the Dropdown Tool Item component
		</c:if>
	</c:otherwise>
</c:choose>