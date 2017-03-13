<c:if test="${not empty properties.checkboxsameline}">
	<c:set var="sameLine" value=" sameLine" />
</c:if>
<c:if test="${not empty properties.label}">
	<fieldset>
		<legend><c:if test="${formField.fieldRequired}"><span class="required-field">*</span></c:if>${properties.label}</legend>
</c:if>
<c:forEach var="option" items="${properties.options}">
	<div class="checkBox${sameLine}">
		<c:choose>
			<c:when test="${fn:contains(option, '=')}">
				<c:set var="optionDivision" value="${fn:split(option, '=')}" />
				<input type="radio" id="${properties.name}-${optionDivision[0]}" name="${properties.name}" value="${optionDivision[0]}"
					<cq:include script="validations.jsp" /> />
				<label for="${properties.name}-${optionDivision[0]}"><span></span>${optionDivision[1]}</label>
			</c:when>
			<c:otherwise>
				<c:set var="cleanHtmlOption" value="${fn:replace(fn:replace(option, '<sup>', ''), '</sup>', '')}" />
				<c:set var="cleanOption" value="${fn:toLowerCase(fn:replace(cleanHtmlOption, ' ', '-'))}" />
				<input type="radio" id="${properties.name}-${cleanOption}" name="${properties.name}" value="${cleanHtmlOption}"
					<cq:include script="validations.jsp" /> />
				<label for="${properties.name}-${cleanOption}"><span></span>${option}</label>
			</c:otherwise>
		</c:choose>
	</div>
</c:forEach>
<c:if test="${not empty properties.label}">
	</fieldset>
</c:if>