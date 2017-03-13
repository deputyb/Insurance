<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:if test="${isEditMode}">
	<div style="border: 1px solid #cccccc; margin: 10px; padding: 10px;">
		<p style="color: #cccccc; font-weight: bold;">Configure the Campaign that will be used to display content according to the user ZIP code</p>
</c:if>
<div class="zip-code-content-wrapper<c:if test="${!isEditMode}"> hidden</c:if>">
	<cq:include path="zip-code-content" resourceType="cq/personalization/components/teaser" />
</div>
<c:if test="${isEditMode}">
	</div>
</c:if>   