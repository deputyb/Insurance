<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
    <c:when test="${not empty properties.href}">    
		<c:if test="${not empty properties.target}">
			<c:set var="target" value=" target='${properties.target}'"/>
		</c:if>

		<c:if test="${not empty properties.onclick}">
			<c:set var="onclick" value=" onclick=\"${properties.onclick}\""/>
		</c:if>

		<c:set var="href" value="<%= PageUtils.getResolvedPath(properties.get("href", ""), "#", slingRequest, pageContext) %>" />
		
		<c:choose>
			<c:when test="${isEditMode}">
				<h5>Interstitial Redirect Link</h5>
				<p><b>URL:</b>${href}<br/>
				<b>Target:</b>${properties.target}<br/>
			</c:when>
			<c:otherwise>
				<span href="${href}"${target}${onclick} class="redirect"></span>
			</c:otherwise>
		</c:choose>
    </c:when>
    <c:otherwise>
    	<c:if test="${isEditMode}">
			Double click to configure the Redirect Link
		</c:if>
    </c:otherwise>
</c:choose>