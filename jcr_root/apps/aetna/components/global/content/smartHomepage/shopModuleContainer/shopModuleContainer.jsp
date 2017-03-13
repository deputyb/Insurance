<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<div class="shop-module-wrapper ${properties.size}" data-page-language="<%= currentPage.getLanguage(false).getLanguage() %>">
	<div class="container-fluid">
		<div class="row-fluid">
			<c:if test="${properties.size == 'tall'}">
				<div class="exit-icon hidden-phone">
					<a href="#"></a>
				</div>
			</c:if>
			<div class="span8 offset2">
				<cq:include path="shop-content" resourceType="foundation/components/parsys" />
			</div>
			<c:if test="${not empty properties.moretext}">
        		<div class="more-link<c:if test="${!isEditMode}"> visible-phone</c:if>">
        			<a href="#">${properties.moretext}<br/>
        				<span class="arrow-wrapper">
	        				<span class="arrow white"></span>
	        				<span class="arrow background"></span>
	        			</span>
        			</a>
        		</div>
        	</c:if>
			<c:if test="${not empty properties.languagetext}">
				<div class="language-toggle">
					<a href="#"<c:if test="${not empty properties.languageonclick}"> onclick="${properties.languageonclick}"</c:if>>${properties.languagetext}</a>
				</div>
			</c:if>
  		</div>
	</div>
</div>
<c:if test="${isEditMode}">
	<style>
		.shop-module-wrapper .more-link {
			float: left;
			position: relative !important;
			width: 100%;
		}
	</style>
</c:if>