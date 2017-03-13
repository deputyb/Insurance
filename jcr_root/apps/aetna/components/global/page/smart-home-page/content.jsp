<%@page import= "com.day.cq.wcm.api.components.IncludeOptions" %>
<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<div class="template smart-homepage-template" id="main" tabindex="-1">	
	<cq:include path="home-teaser" resourceType="cq/personalization/components/teaser"/>
	<cq:include path="parsys" resourceType="foundation/components/parsys"/>
    <c:choose>
    	<c:when test="${!isEditMode}">
    		<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
    	</c:when>
    	<c:otherwise>
    		<style>
    			.newsHub {
    				background-color: transparent;
    			}
				.home-slideshow-wrapper.slideshow-wrapper {
					height: auto!important;
				}
    		</style>
    	</c:otherwise>
    </c:choose>
    <cq:include path="newsHub" resourceType="/apps/aetna/components/global/content/newsHub" />
    
    <c:if test="${!isEditMode}">
		<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
	</c:if>
    <cq:include path="legalNotices" resourceType="/apps/aetna/components/global/content/legalNotices"/>
</div>