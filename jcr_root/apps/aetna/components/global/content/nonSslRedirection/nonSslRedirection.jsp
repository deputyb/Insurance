<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" scope="request" />

<c:choose>
	<c:when test="${isEditMode}">
		<div style="border: 1px solid black; background: #eeeeee; padding: 10px;">
			<p> -- Non SSL Redirection component -- </p>
		</div>
	</c:when>
	<c:otherwise>
		<cq:includeClientLib js="aetna.non-ssl-redirection"/>
	</c:otherwise>
</c:choose>