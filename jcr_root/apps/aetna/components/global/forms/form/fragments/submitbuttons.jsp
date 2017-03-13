<%@include file="/apps/aetna/components/global/global.jsp" %>
<div class="form-submit-buttons span12"<c:if test="${isEditMode}"> style="float: none;"</c:if>>
	<c:set var="submitBtnValue" value="Submit" />
	<c:if test="${not empty properties.submittext}">
		<c:set var="submitBtnValue" value="${properties.submittext}" />
	</c:if>
	<c:set var="submitBtnClass" value="blueBtn" />
	<c:if test="${not empty properties.submitwhitebutton}">
		<c:set var="submitBtnClass" value="${submitBtnClass} whiteBtn" />	
	</c:if>
	<input type="submit" class="${submitBtnClass}" value="${submitBtnValue}">
	<c:if test="${not empty properties.clearformbtntext}">
		<a href="#" class="blueBtn graybg">${properties.clearformbtntext}</a>
	</c:if>
</div>