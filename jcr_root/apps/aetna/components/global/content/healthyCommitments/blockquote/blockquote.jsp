<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
	<c:when test="${not empty properties.text}">
		<div class="container-fluid">
			<div class="row-fluid">
				<div class="span-12">
					<div class="span2 quote open-quote">
						<img src="/common/css/healthy-commitments-clientlibs/images/quotes-open.png" />
					</div>
					<div class="span9 quote-wrapper">
						<div class="quoteText">${properties.text}</div>
						<div class="quoteAuthor">${properties.author}</div>
						<div class="quoteAuthorInfo">${properties.authorinformation}</div>
					</div>
					<div class="span2 quote close-quote">
						<img src="/common/css/healthy-commitments-clientlibs/images/quotes-close.png" />
					</div>
				</div>
			</div>
		</div>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Double click to configure Blockquote component
		</c:if>
	</c:otherwise>
</c:choose>