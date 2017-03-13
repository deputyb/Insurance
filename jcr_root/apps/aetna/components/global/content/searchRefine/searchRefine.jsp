<%@include file="/apps/aetna/components/global/global.jsp"%>

<c:set var="isEditMode" value="<%=(WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN)%>" />
<div class="sidebar-cta">
	<div class="search-refine-wrapper">
		<c:choose>
			<c:when test="${not empty properties.title}">
				<h4>${properties.title}</h4>
				<c:if test="${not empty properties.subtitle}">
					<h5>${properties.subtitle}</h5>
				</c:if>
			</c:when>
			<c:otherwise>
				<c:if test="${isEditMode}">
					<div style="color: black;">Double click to configure Search Refine component</div>
				</c:if>
			</c:otherwise>
		</c:choose>
		<div class="search-refine-results"></div>
	</div>
</div>