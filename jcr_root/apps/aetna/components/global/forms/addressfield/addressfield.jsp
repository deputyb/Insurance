<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:choose>
    <c:when test="${not empty properties.address1name}">
    	<div class="row-fluid">
    		<div class="span12">
    			<aetna-forms:getFormField node="${currentNode}" validationProperty="address1validations" />
	    		<cq:include script="componentlabel.jsp" />
	    		<c:if test="${not empty properties.address1placeholder}">
	    			<c:set var="address1Placeholder" value=" placeholder=\"${properties.address1placeholder}\"" />
	    		</c:if>
	    		<c:if test="${not empty properties.address2placeholder}">
	    			<c:set var="address2Placeholder" value=" placeholder=\"${properties.address2placeholder}\"" />
	    		</c:if>
	    		<c:if test="${not empty properties.cityplaceholder}">
	    			<c:set var="cityPlaceholder" value=" placeholder=\"${properties.cityplaceholder}\"" />
	    		</c:if>
	    		<c:if test="${not empty properties.zipplaceholder}">
	    			<c:set var="zipPlaceholder" value=" placeholder=\"${properties.zipplaceholder}\"" />
	    		</c:if>
	    		<c:if test="${not empty properties.zipplus4Placeholder}">
	    			<c:set var="zipplus4Placeholder" value=" placeholder=\"${properties.zipplus4Placeholder}\"" />
	    		</c:if>
	    		<div class="full-row">
	    			<input type="text" aria-label="${properties.label} - ${properties.address1placeholder}" name="${properties.address1name}"${address1Placeholder} 
	    				<cq:include script="validations.jsp" /> />
	    		</div>
	    		<div class="full-row">
	    			<aetna-forms:getFormField node="${currentNode}" validationProperty="address2validations" />
		    		<input type="text" aria-label="${properties.label} - ${properties.address2placeholder}" name="${properties.address2name}"${address2Placeholder} 	
		    			<cq:include script="validations.jsp" /> />
		    	</div>
		    	<div class="col col1">
		    		<aetna-forms:getFormField node="${currentNode}" validationProperty="cityvalidations" />
		    		<input type="text" aria-label="${properties.label} - ${properties.cityplaceholder}" name="${properties.cityname}"${cityPlaceholder} 
		    			<cq:include script="validations.jsp" /> />
		    	</div>
		    	<div class="col col2">
		    		<cq:include script="fragments/statefield.jsp" />
		    	</div>
		    	<div class="col col3 <c:if test="${not empty properties.showZipplus4}">shortercol3 float-left</c:if>">
		    		<aetna-forms:getFormField node="${currentNode}" validationProperty="zipvalidations" />
		    		<input type="text" aria-label="${properties.label} - ${properties.zipplaceholder}" name="${properties.zipname}"${zipPlaceholder} 
		    			<cq:include script="validations.jsp" /> />
		    	</div>
		    	<c:if test="${not empty properties.showZipplus4}">
		    		<div class="col zip-divider float-left">
		    			<p>-</p>
		    		</div>
		    		<div class="col col4 float-left">
			    		<aetna-forms:getFormField node="${currentNode}" validationProperty="zipplus4validations" />
			    		<input type="text" aria-label="${properties.label} - ${properties.zipplus4Placeholder}" name="${properties.ziplus4name}"${zipplus4Placeholder} 
			    			<cq:include script="validations.jsp" /> />
		    		</div>
		    	</c:if>
				<cq:include script="componentdescription.jsp" />
			</div>
		</div>
		<c:remove var="formField" />
    </c:when>
    <c:otherwise>
    	<c:if test="${isEditMode}">
			Double click to configure Address Field component
		</c:if>
    </c:otherwise>
</c:choose>