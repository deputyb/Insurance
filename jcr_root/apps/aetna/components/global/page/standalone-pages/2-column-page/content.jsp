<%@page import= "com.day.cq.wcm.api.components.IncludeOptions" %>
<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:set var="hasTwoColumns" value="<%=(currentNode != null && currentNode.hasNode("column2")) %>" />
<div class="article-header"><cq:include path="title" resourceType="/apps/aetna/components/global/content/title"/></div>
<div class="template article-template">
  <div class="container-fluid">     
    <cq:include path="legalNotices" resourceType="/apps/aetna/components/global/content/legalNotices"/>
    <div class="row-fluid" id="main" tabindex="-1">
        <div class="span7 bodyContent">
        	<c:if test="${!isEditMode}">
				<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
			</c:if>
        	<cq:include path="column1" resourceType="/libs/foundation/components/parsys"/>
        </div>
        <c:if test="${(isEditMode) || (hasTwoColumns)}">
        <div id="sidebar-right" class="span4 noPadding <c:if test="${!isEditMode}"> hidden </c:if>">
            <c:if test="${!isEditMode}">
				<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
			</c:if>
            <cq:include path="column2" resourceType="/libs/foundation/components/parsys"/>
        </div>
        </c:if>
    </div>
    <cq:include path="extra" resourceType="/libs/foundation/components/parsys"/>
  </div>
  <div class="container-fluid newsTop greenbg"></div>   
</div>