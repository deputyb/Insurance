<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<div class="articleModule">
	<c:choose>
		<c:when test="${not empty properties.formaction}">
		    <c:if test="${not empty properties.heading}">
		    	<h3>${properties.heading}</h3>
		    </c:if>
		    <c:if test="${not empty properties.subheading}">
		    	<p>${properties.subheading}</p>
		    </c:if>
		    <form action="<%= PageUtils.getResolvedPath(properties.get("formaction", ""), "#", slingRequest, pageContext) %>"
		    	<c:if test="${not empty properties.formnameanalytics}"> data-form-name-analytics="${properties.formnameanalytics}"</c:if>
		    	<c:if test="${not empty properties.formmethodanalytics}"> data-form-method-analytics="${properties.formmethodanalytics}"</c:if>>
		    	<c:if test="${isEditMode}">
		    		<div style="border: 1px solid black; padding: 20px;"><p>Drag and drop the form components here</p>
		    	</c:if>
		    	
		    	<c:if test="${!isEditMode}">
		         	<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
		         </c:if>
		    	<cq:include path="form-content" resourceType="foundation/components/parsys" />
		    	
		    	<c:if test="${isEditMode}">
		    		</div>
		    	</c:if> 
		    	
		    	<c:if test="${not empty properties.formmethodanalytics}">
		    		<a class="form-analytics hidden" href="<%= PageUtils.getResolvedPath(properties.get("formaction", ""), "#", slingRequest, pageContext) %>">${properties.formnameanalytics}</a>
		    	</c:if>
		    </form>
		</c:when>
		<c:otherwise>
			<c:if test="${isEditMode}">
				Double click to edit the Form Wrapper component
			</c:if>
		</c:otherwise>
	</c:choose>
</div>