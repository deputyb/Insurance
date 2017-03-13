<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<div class="template" id="main" tabindex="-1">
	<%-- Hero Slideshow section --%>
    <c:if test="${!isEditMode}">
		<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
	</c:if>
    <cq:include path="teaser" resourceType="cq/personalization/components/teaser"/>
	<div class="hidden-phone">
		<%-- News Hub section --%>
		<c:choose>
	    	<c:when test="${!isEditMode}">
	    		<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
	    	</c:when>
	    	<c:otherwise>
	    		<style>
	    			.newsHub {
	    				background-color: transparent;
	    			}
	    		</style>
	    	</c:otherwise>
	    </c:choose>
		<cq:include path="newsHub" resourceType="/apps/aetna/components/global/content/newsHub" />
		
		<%-- Legal Notices section --%>
	    <c:if test="${!isEditMode}">
			<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
		</c:if>
	    <cq:include path="legalNotices" resourceType="/apps/aetna/components/global/content/legalNotices"/>
	</div>
	
	<%-- Content section --%>
	<c:if test="${!isEditMode}">
		<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
	</c:if>
	<cq:include path="parsys" resourceType="/libs/foundation/components/parsys"/>
    
    <c:if test="${!isEditMode}">
	    <div class="visible-phone">
	    	<%-- News Hub Footer section --%>
			<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
	    	<cq:include path="newsHub" resourceType="/apps/aetna/components/global/content/newsHub" />
	    
	    	<%-- Legal Notices Footer section --%>
			<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
		    <cq:include path="legalNotices" resourceType="/apps/aetna/components/global/content/legalNotices"/>
	    </div>    
	</c:if>
</div>