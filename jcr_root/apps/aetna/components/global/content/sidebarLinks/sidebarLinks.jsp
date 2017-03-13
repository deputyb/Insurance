<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:if test="${isEditMode}">
	<div style="color: black;">
</c:if>
        	
<c:choose>
    <c:when test="${not empty properties.linksqty}">
    	<div class="sidebar-links">
			<c:if test="${not empty properties.title}">
				<div class="sidebar-title">
					<h3>${properties.title}</h3>
				</div>
			</c:if>
			
			<ul class="underlined">
				<c:forEach var="linkIndex" begin="1" end="${properties.linksqty}">
					<c:if test="${!isEditMode}">
		            	<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);%>
		        	</c:if>
		        	
		        	<li>
		            	<!--<cq:include path="link${linkIndex}" resourceType="aetna/components/global/content/link" />-->
                        <c:if test="${!isEditMode}">
		            		<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);%>
		        		</c:if>
                        <cq:include path="link${linkIndex}" resourceType="/libs/foundation/components/parsys"/>
		            </li>
				</c:forEach>
			</ul>
		</div>
    </c:when>
    <c:otherwise>
    	<c:if test="${isEditMode}">
        	Click on 'Edit' to configure the Sidebar Links
        </c:if>
    </c:otherwise>
</c:choose>

<c:if test="${isEditMode}">
	</div>
</c:if>