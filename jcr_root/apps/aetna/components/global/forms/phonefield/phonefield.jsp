<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:choose>
    <c:when test="${not empty properties.part1name}">
    	<div class="row-fluid">
    		<div class="span12">
    			<aetna-forms:getFormField node="${currentNode}" validationProperty="part1validations" />
	    		<cq:include script="componentlabel.jsp" />
	    		<c:set var="part1fieldlabelaccessibility" value="Area code" />
	    		<c:set var="part2fieldlabelaccessibility" value="Second three digits" />
	    		<c:set var="part3fieldlabelaccessibility" value="Last four digits" />
	    		<c:if test="${not empty properties.part1fieldlabelaccessibility}">
	    			<c:set var="part1fieldlabelaccessibility" value="${properties.part1fieldlabelaccessibility}" />
	    		</c:if>
	    		<c:if test="${not empty properties.part2fieldlabelaccessibility}">
	    			<c:set var="part2fieldlabelaccessibility" value="${properties.part2fieldlabelaccessibility}" />
	    		</c:if>
	    		<c:if test="${not empty properties.part3fieldlabelaccessibility}">
	    			<c:set var="part3fieldlabelaccessibility" value="${properties.part3fieldlabelaccessibility}" />
	    		</c:if>
	    		<div class="phone-wrapper">
		    		<c:if test="${not empty properties.part1placeholder}">
		    			<c:set var="part1Placeholder" value=" placeholder=\"${properties.part1placeholder}\"" />
		    		</c:if>
		    		<c:if test="${not empty properties.part2placeholder}">
		    			<c:set var="part2Placeholder" value=" placeholder=\"${properties.part2placeholder}\"" />
		    		</c:if>
		    		<c:if test="${not empty properties.part3placeholder}">
		    			<c:set var="part3Placeholder" value=" placeholder=\"${properties.part3placeholder}\"" />
		    		</c:if>
		    		<div class="col col1">
						<input type="text" aria-label="${properties.label} - ${part1fieldlabelaccessibility}" id="${properties.part1name}" name="${properties.part1name}"${part1Placeholder} 
							<cq:include script="validations.jsp" /> />
					</div>
					<div class="col col2"> - </div>
					<div class="col col3">
						<aetna-forms:getFormField node="${currentNode}" validationProperty="part2validations" />
						<input type="text" aria-label="${properties.label} - ${part2fieldlabelaccessibility}" id="${properties.part2name}" name="${properties.part2name}"${part2Placeholder} 
							<cq:include script="validations.jsp" /> />
					</div>
					<div class="col col4"> - </div>
					<div class="col col5">
						<aetna-forms:getFormField node="${currentNode}" validationProperty="part3validations" />
						<input type="text" aria-label="${properties.label} - ${part3fieldlabelaccessibility}" id="${properties.part3name}" name="${properties.part3name}"${part3Placeholder} 
							<cq:include script="validations.jsp" /> />
					</div>
				</div>
				<cq:include script="componentdescription.jsp" />
			</div>
		</div>
		<c:remove var="formField" />
    </c:when>
    <c:otherwise>
    	<c:if test="${isEditMode}">
			Double click to configure Phone Field component
		</c:if>
    </c:otherwise>
</c:choose>