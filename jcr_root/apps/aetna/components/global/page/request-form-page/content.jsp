<%@page import= "com.day.cq.wcm.api.components.IncludeOptions" %>
<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<div class="article-header"><cq:include path="title" resourceType="/apps/aetna/components/global/content/title"/></div>
<div class="template article-template">
  <div class="container-fluid">    
    <div class="row-fluid breadcrumb">
		<div class="span10">
        	<c:if test="${!isEditMode}">
	         	<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
	         </c:if>
        	<cq:include path="breadcrumb" resourceType="/apps/aetna/components/global/content/breadcrumb"/>
        </div>
        <div class="span2">
		</div>
    </div>

    <div class="row-fluid">
        <div class="span12 bodyContent">
        	<c:if test="${!isEditMode}">
				<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
			</c:if>
        	<cq:include path="column1" resourceType="/libs/foundation/components/parsys"/>
        </div>
    </div>
    <cq:include path="extra" resourceType="/libs/foundation/components/parsys"/>
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
</div>