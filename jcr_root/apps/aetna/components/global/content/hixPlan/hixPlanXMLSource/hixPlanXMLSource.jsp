<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:if test="${isEditMode}">
	<div>The next link should be used to configure the tool source XML for HIX plan component. It will be hidden in Preview or Publish mode.</div>
</c:if>
<cq:include path="tool-source" resourceType="/apps/aetna/components/global/content/link"/>


<script type="text/javascript" src="<%= PageUtils.getMappedAbsoutePath("/common/js/form-xml-tool/js/form-xml-tool.js",slingRequest) %>"></script>
<script type="text/javascript" src="<%= PageUtils.getMappedAbsoutePath("/common/js/form-xml-tool/js/hix-tool.js",slingRequest) %>"></script>
        
