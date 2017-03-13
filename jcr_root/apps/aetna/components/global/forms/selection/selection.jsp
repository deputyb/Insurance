<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:choose>
    <c:when test="${not empty properties.name}">
    	<div class="row-fluid">
    		<div class="span12">
    			<aetna-forms:getFormField node="${currentNode}" validationProperty="validations" />
	    		<c:choose>
					<c:when test="${properties.type == 'radio'}">
						<%@ include file="fragments/radio-selection.jsp" %>
					</c:when>
					<c:when test="${properties.type == 'checkbox'}">
						<%@ include file="fragments/checkbox-selection.jsp" %>
					</c:when>
					<c:when test="${properties.type == 'dropdown'}">
						<%@ include file="fragments/dropdown-selection.jsp" %>
					</c:when>
					<c:when test="${properties.type == 'multiple'}">
						<%@ include file="fragments/multiple-selection.jsp" %>
					</c:when>
				</c:choose>
				<cq:include script="componentdescription.jsp" />
			</div>
		</div>
		<c:remove var="formField" />
    </c:when>
    <c:otherwise>
    	<c:if test="${isEditMode}">
			Double click to configure Selection component
		</c:if>
    </c:otherwise>
</c:choose>