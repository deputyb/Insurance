<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
    <c:when test="${not empty properties.text}">
    	<c:if test="${isEditMode}">
    		<p><i>Result section ${properties.resultid}</i></p>
    	</c:if>
		<div id="precertification-section-${properties.resultid}"<c:if test="${!isEditMode}"> class="hidden"</c:if>>
        <a name="[param-placeholder]"></a>
	        <h5 class="cpthead">
	          CPT<span class="sup">&reg;</span> Code [param-placeholder]
	        </h5>
	        ${properties.text}
    	</div>
    </c:when>
    <c:otherwise>
        <c:if test="${isEditMode}">
            Double click to configure the Precert Search Results Item component
        </c:if>
    </c:otherwise>
</c:choose>