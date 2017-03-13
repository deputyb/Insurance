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
	    		<c:if test="${not empty properties.width && properties.width != 'full-width'}">
	    			<c:set var="class" value=" class=\"${properties.width}\"" />
	    		</c:if>
	    		<div class="text-input-wrapper">
					<c:choose>
						<c:when test="${properties.type == 'textarea'}">
							<textarea rows="5" id="${properties.name}" name="${properties.name}"${placeholder}
								<cq:include script="validations.jsp" />${class}></textarea>
						</c:when>
						<c:otherwise>
							<c:choose>
								<c:when test="${properties.type == 'password'}">
									<c:set var="inputType" value="password" />
								</c:when>
								<c:otherwise>
									<c:set var="inputType" value="text" />
								</c:otherwise>
							</c:choose>
							<input type="${inputType}" id="${properties.name}" name="${properties.name}"${placeholder}
								<cq:include script="validations.jsp"/>${class}>
						</c:otherwise>
					</c:choose>
				</div>
				<cq:include script="componentdescription.jsp" />
			</div>
		</div>
		<c:remove var="formField" />
    </c:when>
    <c:otherwise>
    	<c:if test="${isEditMode}">
			Double click to configure Text Input component
		</c:if>
    </c:otherwise>
</c:choose>