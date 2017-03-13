<%@page import= "com.day.cq.wcm.api.components.IncludeOptions" %>
<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:if test="${!isEditMode}">
	<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
</c:if>
<cq:include path="topicHeader" resourceType="/apps/aetna/components/global/content/topicHeader"/>

<div class="template topic-template">
	<div class="container-fluid module hidden-phone whitebg">
		<div class="row-fluid breadcrumb">
            <div class="span12">
            	<c:if test="${!isEditMode}">
	            	<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
	            </c:if>
            	<cq:include path="breadcrumb" resourceType="/apps/aetna/components/global/content/breadcrumb"/>
            </div>
        </div>
    </div>
    <c:if test="${!isEditMode}">
		<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
	</c:if>
    <cq:include path="legalNotices" resourceType="/apps/aetna/components/global/content/legalNotices"/>
	
	<div id="main" tabindex="-1">
		<cq:include path="parsys" resourceType="/libs/foundation/components/parsys"/>
	</div>
    
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
</div>