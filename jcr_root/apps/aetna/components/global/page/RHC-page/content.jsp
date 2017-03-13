<%@page import= "com.day.cq.wcm.api.components.IncludeOptions" %>
<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />


<div class="template article-template">
  <div class="container-fluid">    
    <div class="row-fluid">
        <div id="sidebar-right" class="span4 noPadding">
            <c:if test="${!isEditMode}">
				<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
			</c:if>
            <cq:include path="column2" resourceType="/libs/foundation/components/parsys"/>
        </div>
    </div>
  </div>
</div>