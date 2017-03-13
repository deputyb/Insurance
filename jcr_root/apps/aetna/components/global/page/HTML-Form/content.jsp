<%@page import= "com.day.cq.wcm.api.components.IncludeOptions" %>
<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<div class="article-header"><cq:include path="title" resourceType="/apps/aetna/components/global/content/title"/></div>
<div class="template article-template">
  <div class="container-fluid">    
    <div class="row-fluid breadcrumb">
	    <div class="span12">
	    	<c:if test="${!isEditMode}">
		      <% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
		    </c:if>
        	<cq:include path="breadcrumb" resourceType="/apps/aetna/components/global/content/breadcrumb"/>
        </div>        
    </div>

    <cq:include path="legalNotices" resourceType="/apps/aetna/components/global/content/legalNotices"/>
    <div class="row-fluid" id="main" tabindex="-1">
        <div class="span7 bodyContent">
          <c:if test="${!isEditMode}">
        <% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
      </c:if>
          <cq:include path="component" resourceType="/apps/aetna/components/global/content/htmlTool"/>
        </div>
    </div>
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