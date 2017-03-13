<%@page import= "com.day.cq.wcm.api.components.IncludeOptions" %>
<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<div class="article-header"><cq:include path="title" resourceType="/apps/aetna/components/global/content/title"/></div>
<div class="template article-template">
  <div class="container-fluid"> 
    <cq:include path="legalNotices" resourceType="/apps/aetna/components/global/content/legalNotices"/>
    <div class="row-fluid" id="main" tabindex="-1">
        <div class="span12 bodyContent">
        	<c:if test="${!isEditMode}">
				<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
			</c:if>
        	<cq:include path="column1" resourceType="/libs/foundation/components/parsys"/>
        </div>
    </div>
    <cq:include path="extra" resourceType="/libs/foundation/components/parsys"/>
    <div class="container-fluid newsTop greenbg"></div>
  </div>
</div>