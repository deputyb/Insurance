<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:if test="${isEditMode}">
	<div style="color: black;">
</c:if>

<c:choose>
	<c:when test="${not empty properties.itemsqty}">
		<c:if test="${isEditMode}">
			<div style="padding:10px; border: 2px solid #eee;">
		</c:if>
		
		<c:forEach var="itemIndex" begin="1" end="${properties.itemsqty}">
			<c:if test="${!isEditMode}">
				<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);%>
			</c:if>
			<!--<cq:include path="item${itemIndex}" resourceType="aetna/components/global/content/sidebarTeaser/sidebarTeaserItem" />-->
            <cq:include path="item${itemIndex}" resourceType="/libs/foundation/components/parsys"/>
		</c:forEach>
		
		<c:if test="${isEditMode}">
			</div>
		</c:if>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			<div style="color: black;">
				Click on 'Edit' button to configure the Sidebar Teaser component
			</div>
		</c:if>
	</c:otherwise>
</c:choose>

<c:if test="${isEditMode}">
	</div>
</c:if>