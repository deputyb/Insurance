<%@include file="/apps/aetna/components/global/global.jsp" %>
<%@page import="com.aetna.cq.common.content.usstates.*" %>
<c:set var="usStates" value="<%= USStatesUtils.getStates(resourceResolver) %>" />
<c:if test="${not empty properties.statedefaultoption}">
	<c:set var="defaultOption" value="<option value=\"\">${properties.statedefaultoption}</option>" />
	<c:if test="${not empty properties.stateanotherdefaultoption}">
		<c:set var="anotherDefaultOption" value="<option value=\"${properties.stateanotherdefaultoption}\">${properties.stateanotherdefaultoption}</option>" />
	</c:if>
</c:if>
<c:if test="${properties.type == 'multiple'}">
	<c:set var="multipleStateSelectionType" value="multipleSelectWrap" />
</c:if>
<c:if test="${not empty properties.statereplacements}">
	<c:set var="stateReplacementArray" value="${fn:split(properties.statereplacements, ',')}" />
</c:if>
<div class="selectWrap ${multipleStateSelectionType}">
	<aetna-forms:getFormField node="${currentNode}" validationProperty="statevalidations" />
	<c:set var="renderAllStates" value="${empty properties.states}" />
	<select class="address-state" aria-label="${properties.label} - ${properties.statedefaultoption}" name="${properties.statename}"<cq:include script="validations.jsp" />
		<c:if test="${not empty multipleStateSelectionType}"> multiple</c:if>>${defaultOption}${anotherDefaultOption}
		<c:forEach items="${usStates}" var="state">
			<c:choose>
				<c:when test="${!renderAllStates}">
					<c:forEach items="${properties.states}" var="stateToRender">
						<c:if test="${state.code == stateToRender}">
							<%@ include file="statefield-replacement.jsp" %>
						</c:if>
					</c:forEach>
				</c:when>
				<c:otherwise>
					<%@ include file="statefield-replacement.jsp" %>
				</c:otherwise>
			</c:choose>
		</c:forEach>
	</select>
</div>