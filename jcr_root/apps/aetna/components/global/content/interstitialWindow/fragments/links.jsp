<%@include file="/apps/aetna/components/global/global.jsp"%>

<c:if test="${not empty properties.backLink}">
	<c:set var="isBackLinkIncluded" value="true" />
</c:if>

<c:if test="${isBackLinkIncluded}">
	<a href="#" class="interlink-back">${properties.backLink}</a>
</c:if>
<a href="#" class="interlink<c:if test="${isBackLinkIncluded}"> right-link</c:if>"<c:if test="${empty properties.continueLinkSameWindow}"> target="_blank"</c:if>>${instertitialContinue}</a>