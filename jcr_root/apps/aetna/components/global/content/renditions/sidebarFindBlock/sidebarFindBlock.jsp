<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
	
<c:choose>	
    <c:when test="${not empty properties.title}">
        <c:set scope="request" var="imageName" value="image"/>
        <c:set scope="request" var="renditionSize" value="600.384" />
        
        <c:if test="${not empty properties.linktarget}">
        	<c:set var="target" value=" target=\"_blank\"" />
        </c:if>
        
        <c:if test="${not empty properties.onclick}">
			<c:set var="onclick" value=" onclick=\"${properties.onclick}\""/>
		</c:if>
        
        <a href="<%= PageUtils.getResolvedPath(properties.get("link", ""), "#", slingRequest, pageContext) %>"${target}${onclick}>
			<div class="sidebarFind" style="<cq:include script="../../utils/render.backgroundimage.rendition.jsp" />">
				<div class="findBox">
					<h3>${properties.title}<span class="arrowWhiteBig"></span></h3>
					<p>${properties.text}</p>
				</div>
			</div>
		</a>
    </c:when>
    <c:otherwise>
    	<c:if test="${isEditMode}">
        	<div style="color: black;">
        		Double click to configure Doc / Rx Find Sidebar Block component
        	</div>
        </c:if>
    </c:otherwise>
</c:choose>