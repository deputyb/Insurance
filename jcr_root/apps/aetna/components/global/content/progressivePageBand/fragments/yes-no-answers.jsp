<%@include file="/apps/aetna/components/global/global.jsp" %>
<div class="answers-content">
	<div class="yes-answer<c:if test="${!isEditMode}"> hidden-element</c:if>">
		<c:if test="${properties.type == 'yesnoquestionzipcodeinput' && !isEditMode}">
			<div class="teaser-loading hidden-element">
	       		<div class="teaser-loading-wrapper">
	       			<img src="/common/images/designs/global/green-spin.gif" alt="loading" />
	       		</div>
	       	</div>
	    </c:if>
		<c:if test="${isEditMode}">
			<div style="border: 1px solid #cccccc; margin: 10px; padding: 10px;">
				<p style="color: #cccccc; font-weight: bold;">Drop here the content to display when the user selects "Yes" from the question above</p>
		</c:if>
		<cq:include path="yes-answer" resourceType="foundation/components/parsys" />
		<c:if test="${isEditMode}">
			</div>
		</c:if>
	</div>
	<div class="no-answer<c:if test="${!isEditMode}"> hidden-element</c:if>">
		<c:choose>
			<c:when test="${yesNoZipType}">
				<cq:include script="fragments/zip-code-content.jsp" />
			</c:when>
			<c:otherwise>
				<c:if test="${isEditMode}">
					<div style="border: 1px solid #cccccc; margin: 10px; padding: 10px;">
						<p style="color: #cccccc; font-weight: bold;">Drop here the content to display when the user selects "No" from the question above</p>
				</c:if>
				<cq:include path="no-answer" resourceType="foundation/components/parsys" />
				<c:if test="${isEditMode}">
					</div>
				</c:if>
			</c:otherwise>
		</c:choose>
	</div>
</div>
<c:remove var="yesNoZipType" />