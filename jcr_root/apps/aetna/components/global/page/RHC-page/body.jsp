<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<body>
<c:if test="${isEditMode}">
    <br/>
    <h2>RHC: ${currentPage.title}</h2>
    <h3>Content:</h3>
	<p>The paragraph system below will be shown in Global RHC component when linked to this page:</p>
</c:if>	
    <div class="js-on">
		<c:if test="${!isEditMode}">
			<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
		</c:if>

	    <div class="content-wrapper">    
			<cq:include path="content" script="content.jsp"/>
	    </div><!--end content-wrapper-->
	
	</div>

</body>

