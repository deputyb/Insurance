<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
    <c:when test="${not empty properties.linksqty}">
    	<c:if test="${not empty properties.title}">    
			<h4>${properties.title}</h4>
		</c:if>
		
		<c:choose>
			<c:when test="${isEditMode}">
				<div style="padding: 30px 2.5%;border: 2px solid #eee;border-top: none;">
			</c:when>
			<c:otherwise>
				<p>
			</c:otherwise>
		</c:choose>
		
		<c:set var="linksLength" value="${properties.linksqty}" />
		
		<c:forEach var="linkIndex" begin="1" end="${properties.linksqty}">
			<c:if test="${!isEditMode}">
            	<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);%>
        	</c:if>
        	
            <cq:include path="link${linkIndex}" resourceType="aetna/components/global/content/link" />
            
            <c:if test="${linkIndex != linksLength}">
            	<br />
            </c:if>
		</c:forEach>
		
		<c:choose>
			<c:when test="${isEditMode}">
				</div>
			</c:when>
			<c:otherwise>
				</p>
			</c:otherwise>
		</c:choose>
    </c:when>
    <c:otherwise>
    	<c:if test="${isEditMode}">
			Double click to configure Related Links component
		</c:if>
    </c:otherwise>
</c:choose>