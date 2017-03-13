<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:choose>
    <c:when test="${not empty properties.name}">
    	<aetna-forms:getFormField node="${currentNode}" validationProperty="validations" />
    	<div class="row-fluid">
    		<div class="span12">
	    		<cq:include script="componentlabel.jsp" />
	    		<c:if test="${not empty properties.placeholder}">
	    			<c:set var="placeholder" value=" placeholder=\"${properties.placeholder}\"" />
	    		</c:if>
	    		<div class="choose-file-btn-wrapper">
	    			<a href="#" class="choose-file-btn blueBtn">${properties.buttonlabel}</a>
	    		</div>
	    		<div class="choose-file-txt-wrapper">
		    		<input type="text" name="${properties.name}-txt" readonly="readonly" class="choose-file-txt" ${placeholder} 
		    			<cq:include script="validations.jsp"/> />
		    	</div>
				<input type="file" id="${properties.name}" name="${properties.name}" class="hidden">
				<cq:include script="componentdescription.jsp" />
			</div>
		</div>
		<c:remove var="formField" />
    </c:when>
    <c:otherwise>
    	<c:if test="${isEditMode}">
			Double click to configure File Field component
		</c:if>
    </c:otherwise>
</c:choose>