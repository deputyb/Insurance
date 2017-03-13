<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:if test="${not empty properties.label}">
	<label<c:if test="${not empty properties.name}"> for="${properties.name}"</c:if>><c:if test="${formField.fieldRequired}"><span class="required-field">*</span></c:if>${properties.label}
</c:if>