<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
	<c:when test="${not empty properties.text}">
		<c:if test="${not empty properties.id}">
			<c:set var="id" value=" id=\"${properties.id}\"" />
		</c:if>
		
		<c:if test="${not empty properties.class}">
			<c:set var="class" value=" ${properties.class}" />
		</c:if>
		
		<c:if test="${not empty properties.target}">
			<c:set var="target" value=" target=\"${properties.target}\"" />
		</c:if>
		
		<c:if test="${not empty properties.onclick}">
			<c:set var="onclick" value=" onclick=\"${properties.onclick}\"" />
		</c:if>
		
		<p><a href="" class="pdfLink${class}"${id}${target}${onclick}>${properties.text}</a> ${properties.sectext}</p>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Double click to configure the PDF item component
		</c:if>
	</c:otherwise>
</c:choose>