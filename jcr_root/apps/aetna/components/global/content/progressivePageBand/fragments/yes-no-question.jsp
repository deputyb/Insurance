<%@include file="/apps/aetna/components/global/global.jsp" %>
<div class="question-wrapper">
	<div class="question-inner-wrapper">
		<h5>${properties.questionlabel}</h5>
		<div class="answers-wrapper">
			<a href="#" class="answer-label yes" data-answer="yes"
				<c:if test="${not empty properties.yesonclick}"> onclick="${properties.yesonclick}"</c:if>>${properties.yeslabel}</a>
			<a href="#" class="answer-label no" data-answer="no"<c:if test="${yesNoZipType}"> data-zip-input="true"</c:if>
				<c:if test="${not empty properties.noonclick}"> onclick="${properties.noonclick}"</c:if>>${properties.nolabel}</a>
		</div>
	</div>
</div>