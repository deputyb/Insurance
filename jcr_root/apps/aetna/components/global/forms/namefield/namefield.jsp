<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:choose>
    <c:when test="${not empty properties.firstnamename}">
    	<div class="row-fluid">
    		<div class="span12">
	    		<cq:include script="componentlabel.jsp" />
	    		<c:if test="${not empty properties.firstnameplaceholder}">
	    			<c:set var="firstNamePlaceholder" value=" placeholder=\"${properties.firstnameplaceholder}\"" />
	    		</c:if>
	    		<c:if test="${not empty properties.lastnameplaceholder}">
	    			<c:set var="lastNamePlaceholder" value=" placeholder=\"${properties.lastnameplaceholder}\"" />
	    		</c:if>
	    		<div class="col col1">
					<input type="text" id="${properties.firstnamename}" name="${properties.firstnamename}"${firstNamePlaceholder} />
				</div>
				<div class="col col2">
					<input type="text" id="${properties.lastnamename}" name="${properties.lastnamename}"${lastNamePlaceholder} />
				</div>
				<cq:include script="componentdescription.jsp" />
			</div>
		</div>
    </c:when>
    <c:otherwise>
    	<c:if test="${isEditMode}">
			Double click to configure Name Field component
		</c:if>
    </c:otherwise>
</c:choose>