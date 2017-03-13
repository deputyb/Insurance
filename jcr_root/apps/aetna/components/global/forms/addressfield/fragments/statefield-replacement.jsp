<c:choose>
	<c:when test="${not empty stateReplacementArray}">
		<c:set var="containsReplacement" value="false" />
		<c:forEach items="${stateReplacementArray}" var="actualStateReplacement">
			<c:if test="${fn:contains(actualStateReplacement, state.name)}">
				<option value="${fn:split(actualStateReplacement, '|')[1]}">${fn:split(actualStateReplacement, '|')[1]}</option>
				<c:set var="containsReplacement" value="true" />
			</c:if>
		</c:forEach>
		<c:if test="${not containsReplacement}">
			<option value="${fn:toUpperCase(state.code)}">${state.name}</option>
		</c:if>
	</c:when>
	<c:otherwise>
		<option value="${fn:toUpperCase(state.code)}">${state.name}</option>
	</c:otherwise>
</c:choose>