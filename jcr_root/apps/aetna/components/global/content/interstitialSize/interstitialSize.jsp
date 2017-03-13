<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
    <c:when test="${not empty properties.width}">    
		<c:choose>
			<c:when test="${isEditMode}">
				<h5>Interstitial Size</h5>
				<p><b>Size:</b>${properties.width}<br/>
			</c:when>
			<c:otherwise>
				<span wsize="overwrite-${properties.width}" class="windowSize"></span>
			</c:otherwise>
		</c:choose>
    </c:when>
    <c:otherwise>
    	<c:if test="${isEditMode}">
			Double click to configure the Interstitial Window Size
		</c:if>
    </c:otherwise>
</c:choose>