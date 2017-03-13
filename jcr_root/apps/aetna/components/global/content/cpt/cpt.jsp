<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:set var="formAction" value="${properties.formaction}" />
<c:set var="formTitle" value="${properties.title}" />
<c:if test="${empty formTitle}">
	<c:set var="formTitle" value="${properties.title}" />
</c:if>
<div class="presert-search-not-available-msg<c:if test="${empty properties.turnOffFunctionality}"> hidden-presert-comp</c:if>">
			${properties.precertsearchnotavailablemsg}
</div>
<div class="articleModule<c:if test="${not empty properties.turnOffFunctionality && not isEditMode}"> hidden-presert-comp</c:if>">
	<c:choose>
		<c:when test="${not empty properties.formaction}">
		    <h3>${formTitle}</h3>
		    <c:if test="${not empty properties.subheading}">
		    	<p>${properties.subheading}</p>
		    </c:if>
		    <form action="<%= PageUtils.getResolvedPath(properties.get("formaction", ""), "#", slingRequest, pageContext) %>">
			    <c:if test="${not empty properties.formerrormessage}">
			    	<p class="<c:if test="${!isEditMode}">hidden </c:if>form-error-msg">${properties.formerrormessage}</p>
			    </c:if>
		    	<c:forEach begin="1" end="${properties.numinputs}" varStatus="indexInput">
		    		<input type="text" name="input-${indexInput.count}" />
		    	</c:forEach>
		    	<input type="submit" class="blueBtn" value="${properties.submittitle}">
		    	<c:if test="${not empty properties.interstitialonsubmit}">
			    	<a href="#" class="external external-session hidden"></a>
			    </c:if>
		    </form>
		</c:when>
		<c:otherwise>
			<c:if test="${isEditMode}">
				Double click to edit the Form Boxes component
			</c:if>
		</c:otherwise>
	</c:choose>
</div>