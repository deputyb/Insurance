<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" scope="request" 
	value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<div class="progressive-page-band-wrapper progressive-page-wrapper">
	<div class="container-fluid progressive-page-band-wrapper-inner type-${properties.type}">
		<div class="row-fluid">
			<div class="span12">
				<c:choose>
					<c:when test="${not empty properties.type}">
						<div class="title-wrapper">
							<h4>${properties.title}</h4>
						</div>
						<c:choose>
							<c:when test="${properties.type == 'yesnoquestion'}">
								<cq:include script="fragments/yes-no-question.jsp" />
							</c:when>
							<c:when test="${properties.type == 'zipcodeinput'}">
								<cq:include script="fragments/zip-code-input.jsp" />
							</c:when>
							<c:when test="${properties.type == 'yesnoquestionzipcodeinput'}">
								<c:set var="yesNoZipType" value="${true}" scope="request" />
								<cq:include script="fragments/yes-no-question.jsp" />
								<cq:include script="fragments/zip-code-input.jsp" />
							</c:when>
						</c:choose>
						<div class="arrow hidden-element"></div>
					</c:when>
					<c:otherwise>
						<c:if test="${isEditMode}">
							Double click to configure Progressive Page Band component
						</c:if>
					</c:otherwise>
				</c:choose>
			</div>
		</div>
	</div>
	<c:choose>
		<c:when test="${properties.type == 'yesnoquestion' || properties.type == 'yesnoquestionzipcodeinput'}">
			<cq:include script="fragments/yes-no-answers.jsp" />
		</c:when>
		<c:when test="${properties.type == 'zipcodeinput'}">
			<cq:include script="fragments/zip-code-content.jsp" />
		</c:when>
	</c:choose>
</div>