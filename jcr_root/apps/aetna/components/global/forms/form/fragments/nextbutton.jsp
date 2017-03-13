<%@include file="/apps/aetna/components/global/global.jsp" %>
<div class="form-submit-buttons span12"<c:if test="${isEditMode}"> style="float: none;"</c:if>>
<c:set var="nextBtnValue" value="Next"/>
	<c:if test="${empty properties.nextbuttontext}">
		<c:set var="nextBtnValue" value="${properties.nextbuttontext}"/>
	</c:if>
	<a href="#" class="blueBtn nextToPreviewButton">${nextBtnValue}</a>
</div>