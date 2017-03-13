<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />


<c:choose>
    <c:when test="${not empty properties.year && not empty properties.planName  && not empty properties.statePlan}">

		<div class="planHixSection" data-state="${properties.statePlan}" data-year="${properties.year}" data-plan="${properties.planName}">
			<div class="articleModule ">
				<c:if test="${isEditMode}">
					<br/>
					<p> Double click to configure the HIX plan content to display.</p>
				</c:if>
			</div>
		</div>
    </c:when>
    <c:otherwise>
        <c:if test="${isEditMode}">
            Double click to configure the HIX plan content to display. Also HIX Plan XML Source component should be added and configured in the page.
        </c:if>
    </c:otherwise>
</c:choose>
