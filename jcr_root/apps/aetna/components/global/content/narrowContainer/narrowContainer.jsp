<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<div class="container-fluid">
	<div class="row-fluid">
		<div class="span12">
			<c:if test="${isEditMode}">
				<div style="border: 1px solid black; padding: 10px;">
					<p>Drop the items in the Parsys below for the Narror - Container</p>
					<div>
			</c:if>
			<c:if test="${!isEditMode}">
				<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
			</c:if>
			<cq:include path="narrow-parsys" resourceType="foundation/components/parsys" />
			<c:if test="${isEditMode}">
					</div>
				</div>
			</c:if>
		</div>
	</div>
</div>