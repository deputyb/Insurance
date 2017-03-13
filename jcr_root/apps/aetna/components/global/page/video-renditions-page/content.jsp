<%@page import= "com.day.cq.wcm.api.components.IncludeOptions" %>
<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<div class="article-header"><cq:include path="title" resourceType="aetna/components/global/content/title"/></div>
<div class="template article-template">
  <div class="container-fluid">    
    <div class="row-fluid breadcrumb">
		<div class="span10">
        	<c:if test="${!isEditMode}">
	         	<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
	         </c:if>
        	<cq:include path="breadcrumb" resourceType="aetna/components/global/content/breadcrumb"/>
        </div>
        <div class="span2">
        	<c:if test="${!isEditMode}">
	         	<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
	         </c:if>
         	<cq:include path="print-share" resourceType="aetna/components/global/content/printShare"/>
		</div>
    </div>
 
    <cq:include path="legalNotices" resourceType="aetna/components/global/content/legalNotices"/>
    
    <div class="row-fluid" id="main" tabindex="-1">
        <div class="span12 bodyContent">
        	<c:if test="${!isEditMode}">
	         	<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
	         </c:if>
        	<cq:include path="pre-video" resourceType="foundation/components/parsys"/>
        	
        	<cq:include path="video" resourceType="aetna/components/global/content/renditions/video"/>
        	
        	<c:if test="${!isEditMode}">
	         	<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
	         </c:if>
        	<cq:include path="post-video" resourceType="foundation/components/parsys"/>
        </div>
    </div>
    <cq:include path="extra" resourceType="foundation/components/parsys"/>
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
  <cq:include path="newsHub" resourceType="aetna/components/global/content/newsHub" /> 
</div>