<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" 
	value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
	<c:when test="${not empty properties.sectionname}">
		<c:if test="${isEditMode}">
			<div style="padding: 10px; margin: 10px; border: 1px solid black;">
				<p>Deep Links Section ID: ${properties.sectionname}</p>
		</c:if>
		<div class="deep-link-section<c:if test="${!isEditMode}"> hidden-element</c:if>" data-name="${properties.sectionname}">
			<c:if test="${!isEditMode}">	
				<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY); %>
			</c:if>
			<cq:include path="section-content" resourceType="foundation/components/parsys" />
		</div>
		<c:if test="${isEditMode}">
			</div>
		</c:if>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			<p>Double click to configure the Progressive Page DeepLinks Section component.</p>
		</c:if>
	</c:otherwise>
</c:choose>