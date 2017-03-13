<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<jsp:useBean scope="request" id="dropdownToolController" 
	class="com.aetna.cq.bl.components.dropdowntool.controller.DropdownToolController"></jsp:useBean>
<cq:includeClientLib css="aetna.dropdowntool" />
<c:choose>
	<c:when test="${not empty properties.dropdowndefaultoption}">
		<div class="dropdown-tool-wrapper">
			<div class="select-wrapper">
				<c:if test="${not empty properties.dropdownlabel}">
					<label for="select-${currentNode.identifier}">${properties.dropdownlabel}</label>
				</c:if>
				<div class="selectWrap">
					<c:set var="dropdownOptions" value="<%= dropdownToolController.generateDropdownOptions(resource) %>" />
					<select id="select-${currentNode.identifier}" data-use-deeplinking="${not empty properties.usedeeplinking}"
						<c:if test="${not empty properties.analyticsjscode}"> data-onchange="${properties.analyticsjscode}"</c:if>>
						<option value="">${properties.dropdowndefaultoption}</option>
						<c:if test="${not empty properties.dropdownoptionseparator}">
							<option value="" disabled="disabled">${properties.dropdownoptionseparator}</option>
						</c:if>
						<c:forEach var="actualDropdownOption" items="${dropdownOptions}">
							<option value="${actualDropdownOption.value}">${actualDropdownOption.title}</option>
						</c:forEach>
					</select>
				</div>
			</div>
			<c:if test="${isEditMode}">
				<div style="border: 1px solid black; margin: 5px; padding: 5px;">
					<p>Drop here the "Dropdown Tool Item" components to build the whole component.</p>
			</c:if>
			<cq:include path="dropdown-tool-content" resourceType="foundation/components/parsys"/>
			<c:if test="${isEditMode}">
				</div>
			</c:if>
		</div>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Double click to configure the Dropdown Tool component.
		</c:if>
	</c:otherwise>
</c:choose>
<cq:includeClientLib js="aetna.dropdowntool" />