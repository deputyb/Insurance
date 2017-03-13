<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<div class="glossary-section-selector">
	<div class="row-fluid">
		<div class="span12">
			<c:forEach items="${glossaryController.glossarySections}" var="glossarySection">
				<c:choose>
					<c:when test="${glossarySection.enabled}">
						<a href="#${glossarySection.sectionName}" 
							data-glossary-section="${glossarySection.sectionName}">${glossarySection.sectionName}</a>
					</c:when>
					<c:otherwise>
						<span>${glossarySection.sectionName}</span>
					</c:otherwise>
				</c:choose>
			</c:forEach>
		</div>
	</div>
</div>