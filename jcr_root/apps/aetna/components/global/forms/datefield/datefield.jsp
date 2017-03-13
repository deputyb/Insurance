<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:choose>
    <c:when test="${not empty properties.monthname}">
    	<div class="row-fluid">
    		<div class="span12">
    			<aetna-forms:getFormField node="${currentNode}" validationProperty="monthvalidations" />
	    		<cq:include script="componentlabel.jsp" />
	    		<c:set var="monthfieldlabelaccessibility" value="Month" />
	    		<c:set var="dayfieldlabelaccessibility" value="Day" />
	    		<c:set var="yearfieldlabelaccessibility" value="Year" />
	    		<c:if test="${not empty properties.monthfieldlabelaccessibility}">
	    			<c:set var="monthfieldlabelaccessibility" value="${properties.monthfieldlabelaccessibility}" />
	    		</c:if>
	    		<c:if test="${not empty properties.dayfieldlabelaccessibility}">
	    			<c:set var="dayfieldlabelaccessibility" value="${properties.dayfieldlabelaccessibility}" />
	    		</c:if>
	    		<c:if test="${not empty properties.yearfieldlabelaccessibility}">
	    			<c:set var="yearfieldlabelaccessibility" value="${properties.yearfieldlabelaccessibility}" />
	    		</c:if>
	    		<div class="date-errors"></div>
	    		<div class="date-wrapper">
		    		<c:if test="${not empty properties.monthplaceholder}">
		    			<c:set var="monthPlaceholder" value=" placeholder=\"${properties.monthplaceholder}\"" />
		    		</c:if>
		    		<c:if test="${not empty properties.dayplaceholder}">
		    			<c:set var="dayPlaceholder" value=" placeholder=\"${properties.dayplaceholder}\"" />
		    		</c:if>
		    		<c:if test="${not empty properties.yearplaceholder}">
		    			<c:set var="yearPlaceholder" value=" placeholder=\"${properties.yearplaceholder}\"" />
		    		</c:if>
		    		<div class="col col1">
						<input type="text" aria-label="${properties.label} - ${monthfieldlabelaccessibility}" id="${properties.monthname}" name="${properties.monthname}"${monthPlaceholder} 
							<cq:include script="validations.jsp" /> />
					</div>
					<div class="col col2"> / </div>
					<div class="col col3">
						<aetna-forms:getFormField node="${currentNode}" validationProperty="dayvalidations" />
						<input type="text" aria-label="${properties.label} - ${dayfieldlabelaccessibility}" id="${properties.dayname}" name="${properties.dayname}"${dayPlaceholder} 
							<cq:include script="validations.jsp" /> />
					</div>
					<div class="col col4"> / </div>
					<div class="col col5">
						<aetna-forms:getFormField node="${currentNode}" validationProperty="yearvalidations" />
						<input type="text" aria-label="${properties.label} - ${yearfieldlabelaccessibility}" id="${properties.yearname}" name="${properties.yearname}"${yearPlaceholder} 
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
			Double click to configure Date Field component
		</c:if>
    </c:otherwise>
</c:choose>