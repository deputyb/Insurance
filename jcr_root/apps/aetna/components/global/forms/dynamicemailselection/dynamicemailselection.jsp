<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" scope="request" />

<c:choose>
	<c:when test="${not empty properties.inputname}">
		<jsp:useBean id="formsController" class="com.aetna.cq.bl.components.forms.controller.FormsController" />
		<c:set var="emailConditions" value="<%= formsController.getEmailConditions(resource) %>" />
		<c:choose>
			<c:when test="${isEditMode}">
				<div style="margin: 10px; padding: 10px; border: 1px solid black; background: #eeeeee;">
					<p><b>Dynamic Email Selection</b></p>
					<p>Input name: ${properties.inputname}</p>
					<c:forEach var="emailCondition" varStatus="emailConditionStatus" items="${emailConditions}">
						<p>Input value: ${emailCondition.inputValue}<br/> Email Address: ${emailCondition.emailAddress}</p> 
					</c:forEach>
					<p>Default email address: ${properties.defaultemailaddress}</p>
				</div>
			</c:when>
			<c:otherwise>
				<div class="conditions hidden" data-input-name="${properties.inputname}"
					data-default-email-address="${properties.defaultemailaddress}"
					<c:forEach var="emailCondition" varStatus="emailConditionStatus" items="${emailConditions}">
						data-input-value-${emailConditionStatus.count}="${emailCondition.inputValue}" 
						data-email-address-${emailConditionStatus.count}="${emailCondition.emailAddress}" 
					</c:forEach>
					></div>
			</c:otherwise>
		</c:choose>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Double click to configure Dynamic Email Selection component
		</c:if>
	</c:otherwise>
</c:choose>