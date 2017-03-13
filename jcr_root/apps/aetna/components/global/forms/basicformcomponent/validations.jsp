<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:forEach var="validation" items="${formField.validations}">
	<c:set var="validationErrorMessage" value="data-msg-${validation.type}=\"${validation.errorMessage}\"" />
	<c:choose>
		<c:when test="${validation.type == 'equalTo'}">
			data-rule-equalTo="#${validation.equalToField}" ${validationErrorMessage}
		</c:when>
		<c:when test="${validation.type == 'minlength' || validation.type == 'maxlength'}">
			data-rule-${validation.type}="${validation.numField}" ${validationErrorMessage}
		</c:when>
		<c:otherwise>
			data-rule-${validation.type}="true" ${validationErrorMessage}
		</c:otherwise>
	</c:choose>
</c:forEach>