<c:if test="${not empty properties.label}">
	<fieldset>
		<legend><c:if test="${formField.fieldRequired}"><span class="required-field">*</span></c:if>${properties.label}</legend>
</c:if>
<c:forEach var="option" items="${properties.options}">
	<div class="checkBox checkbox-wrapper">
		<c:choose>
			<c:when test="${fn:contains(option, '=')}">
				<c:set var="optionDivision" value="${fn:split(option, '=')}" />
				<input type="checkbox" id="${properties.name}-${optionDivision[0]}" name="${properties.name}" value="${optionDivision[0]}"
					<cq:include script="validations.jsp" /> />
				<label for="${properties.name}-${optionDivision[0]}"><span></span>${optionDivision[1]}</label>
			</c:when>
			<c:otherwise>
				<c:set var="cleanOption" value="${fn:toLowerCase(fn:replace(option, ' ', '-'))}" />
				<input type="checkbox" id="${properties.name}-${cleanOption}" name="${properties.name}" value="${option}"
					<cq:include script="validations.jsp" /> />
				<label for="${properties.name}-${cleanOption}"><span></span>${option}</label>									
			</c:otherwise>
		</c:choose>
	</div>
</c:forEach>
<c:if test="${not empty properties.label}">
	</fieldset>
</c:if>