<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:choose>
    <c:when test="${not empty properties.statename}">
    	<div class="row-fluid">
    		<div class="span12">
    			<aetna-forms:getFormField node="${currentNode}" validationProperty="statevalidations" />
    			<cq:include script="componentlabel.jsp" />
    			<cq:include script="fragments/statefield.jsp" />
    			<cq:include script="componentdescription.jsp" />
    			<c:remove var="formField" />
			</div>
		</div>
    </c:when>
    <c:otherwise>
    	<c:if test="${isEditMode}">
			Double click to configure State Selection component
		</c:if>
    </c:otherwise>
</c:choose>