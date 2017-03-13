<%@include file="/apps/aetna/components/global/global.jsp"%>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:set var="resourcePath" value="<%= resource.getPath() %>" />
<c:set var="inheritJSPage" value="${resourcePath != jsPath && noJSResource == null}" />

<c:if test="${isEditMode}">
	<style>
 		.noJs {
 			margin-top: 100px;
 			display: block;
 			min-height: 80px;
 		}
 	</style>
 	<div style="margin: 0 10px 10px; padding: 10px; border: 1px solid black;">
 		<p>Please configure No-JS message by double clicking this component. This will be displayed when the browser has the JavaScript functionality deactivated.</p>
</c:if>
		
<c:choose>
	<c:when test="${inheritJSPage && isEditMode}">
		<div style="color: black;">
			<c:set var="inheritJSPage" value="<%= NodeUtils.getResourcePage((String) request.getAttribute("jsPath")) %>" />
			The configuration for NoJS text is inherited from <a style="color: black;" href="${inheritJSPage}">${inheritJSPage}</a><br/>
			If you want to overwrite the inherited configuration, click on 'Edit' button and configure noJS component normally. 
		</div>
	</c:when>
	<c:otherwise>	
		<c:choose>
			<c:when test="${not empty properties.text}">
		        <div class="<c:if test="${!isEditMode}">nojs </c:if>container-fluid">
		            <div class="row-fluid">
		                <div class="span12">
							<cq:text property="text"/>
		                </div>
		            </div>
		        </div>
			</c:when>
     		<c:otherwise>
     			<c:if test="${isEditMode}">
     				There's not configuration yet for the No JS message.
     			</c:if>
     		</c:otherwise>
     	</c:choose>
	</c:otherwise>
</c:choose>

<c:if test="${isEditMode}">
	</div>
</c:if>
