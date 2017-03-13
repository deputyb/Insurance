<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:choose>
    <c:when test="${not empty properties.paramname}">
    	<div class="row-fluid">
    		<div class="span12">
	    		<c:choose>
	    			<c:when test="${isEditMode}">
	    				Request parameter to render: ${properties.paramname}
	    			</c:when>
	    			<c:otherwise>
	    				${param[properties.paramname]}
	    			</c:otherwise>
	    		</c:choose>
			</div>
		</div>
    </c:when>
    <c:otherwise>
    	<c:if test="${isEditMode}">
			Double click to configure Request Parameter Render component
		</c:if>
    </c:otherwise>
</c:choose>