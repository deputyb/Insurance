<c:if test="${not empty properties.label}">
	<cq:include script="componentlabel.jsp" />
</c:if>
<div class="selectWrap multipleSelectWrap">
	<select id="${properties.name}" name="${properties.name}" <cq:include script="validations.jsp" /> multiple>
		<c:forEach var="option" items="${properties.options}">
			<c:choose>
				<c:when test="${fn:contains(option, '=')}">
					<c:set var="optionDivision" value="${fn:split(option, '=')}" />
					<option value="${optionDivision[0]}">${optionDivision[1]}</option>
				</c:when>
				<c:otherwise>
					<option value="${option}">${option}</option>
				</c:otherwise>
			</c:choose>
		</c:forEach>
	</select>
</div>