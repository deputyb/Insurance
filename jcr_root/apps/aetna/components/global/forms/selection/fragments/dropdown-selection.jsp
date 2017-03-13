<c:if test="${not empty properties.label}">
	<cq:include script="componentlabel.jsp" />
</c:if>
<div class="selectWrap">
	<select id="${properties.name}" name="${properties.name}" <cq:include script="validations.jsp" />>
		<c:forEach var="option" items="${properties.options}" varStatus="optionStatus">
			<c:choose>
				<c:when test="${fn:contains(option, '=')}">
					<c:set var="optionDivision" value="${fn:split(option, '=')}" />
					<option value="${optionDivision[0]}">${optionDivision[1]}</option>
				</c:when>
				<c:otherwise>
					<c:set var="optionValue" value="${option}" />
					<c:if test="${optionStatus.count == 1 && not empty properties.firstoptionblank}">
						<c:set var="optionValue" value="" />
					</c:if>
					<option value="${optionValue}">${option}</option>
				</c:otherwise>
			</c:choose>
		</c:forEach>
	</select>
</div>