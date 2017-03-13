<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:set var="newsAlert" value="${properties.newsAlert}" />

<c:choose>
    <c:when test="${not empty properties.text}">    
		<c:if test="${not empty properties.target}">
			<c:set var="target" value=" target='${properties.target}'"/>
		</c:if>

		<c:if test="${not empty properties.class}">
            <c:set var="linkClasses" value="${properties.class}"/>
		</c:if>

		<c:if test="${not empty properties.audience}">
            <c:set var="linkClasses" value="${linkClasses} ${properties.audience}"/>
		</c:if>
		
		<%-- Old Interstitial configuration --%>
		<c:if test="${not empty properties.showInterstitial}">
			<c:set var="linkClasses" value="${linkClasses} external"/>
		</c:if>
		
		<%-- New Interstitial configuration --%>
		<c:if test="${not empty properties.interstitial}">
            <c:set var="linkClasses" value="${linkClasses} ${properties.interstitial}"/>
		</c:if>		
		
		<c:set var="linkClasses" value="newsFeed alert ${linkClasses}"/>
		
		<c:if test="${not empty linkClasses}">
			<c:set var="class" value="class=\"${linkClasses}\""/>
		</c:if>
		
		<c:if test="${not empty properties.id}">
			<c:set var="id" value=" id='${properties.id}'"/>
		</c:if>

		<c:if test="${not empty properties.onclick}">
			<c:set var="onclick" value=" onclick=\"${properties.onclick}\""/>
		</c:if>

		<c:set var="href" value="<%= PageUtils.getResolvedPath(properties.get("href", ""), "#", slingRequest, pageContext) %>" />
		
				
       	<a href="${href}"${target}${class}${id}${onclick}>
       		<c:if test="${not empty newsAlert}"><span class="alertText">ALERT</span></c:if><span class="arrowWhiteSmall">${properties.text}</span>
		</a>
    </c:when>
    <c:otherwise>
    	<c:if test="${isEditMode}">
			Double click to configure the Link
		</c:if>
    </c:otherwise>
</c:choose>