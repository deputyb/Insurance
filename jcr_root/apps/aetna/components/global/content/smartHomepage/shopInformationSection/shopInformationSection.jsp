<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
    <c:when test="${not empty properties.marketname}">
    	<c:if test="${isEditMode}">
			<div style="padding: 10px; margin: 10px; border: 1px solid white;">
				<p>Shop Information for Market: ${properties.marketname}</p>
		</c:if>
		<div class="market-segment market-segment-${properties.marketname}<c:if test="${!isEditMode}"> hidden-element</c:if>">
			<c:if test="${!isEditMode}">	
				<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY); %>
			</c:if>
			<cq:include path="shop-information-section-content" resourceType="foundation/components/parsys" />
		</div>
		<c:if test="${isEditMode}">
			</div>
		</c:if>
    </c:when>
    <c:otherwise>
    	<c:if test="${isEditMode}">
			Double click to configure the Shop Information Section component
		</c:if>
    </c:otherwise>
</c:choose>