<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
    <c:when test="${not empty properties.layout}">
    	<c:set var="spanWidth" value="<%= PageUtils.divideColumnLayout(12, properties.get("layout", "1")) %>" />
    	
    	<c:if test="${empty properties.useGutter}">
    		<c:set var="containerClass" value=" imgtxt" />
    	</c:if>
    	
    	<c:if test="${not empty properties.useColumnDivision}">
    		<c:set var="containerClass" value="${containerClass} txtDivide" />
    	</c:if>

    	<c:if test="${not empty properties.imgIgnoreColumnDivision}">
    		<c:set var="containerClass" value="${containerClass} imgunDivide" />
    	</c:if>
    	    	
    	<c:if test="${not empty properties.includePadding}">
    		<c:set var="containerClass" value="${containerClass} padding48" />
    	</c:if>
    	
    	<c:if test="${isEditMode}">
    		<div style="border: 2px solid #eee; margin-bottom: 10px; padding: 10px 0;">
    	</c:if>
    	
    	<div class="container-fluid module ${properties.backgroundColor}${containerClass}">
    		<%-- Title --%>
    		<c:if test="${not empty properties.title}">
	    		<div class="row-fluid">
					<div class="span12 titleBar">
						<h2>${properties.title}</h2>
						
						<%-- Subtitle --%>
    					<c:if test="${not empty properties.subtitle}">
    						<p>${properties.subtitle}</p>
    					</c:if>
					</div>
				</div>
			</c:if>
			
    		<%-- Columns --%>
			<div class="row-fluid">
					
		    	<c:forEach var="indexColumn" begin="1" end="${properties.layout}">	
		    		<c:if test="${indexColumn == properties.layout }">
		    			<c:set var="isLast" value=" last" />
		    		</c:if>   		
			        <div class="span${spanWidth}${isLast}">			    		
						<c:if test="${!isEditMode}">
			            	<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);%>
			        	</c:if>	
			            <cq:include path="column-${indexColumn}" resourceType="/libs/foundation/components/parsys" />
			   		</div>
		        </c:forEach>
    	
    		</div>	
		</div>
		<c:if test="${isEditMode}">
    		</div>
    	</c:if>
    </c:when>
    <c:otherwise>
    	<c:if test="${isEditMode}">
			Click on 'Edit' button to configure Layout Component
		</c:if>
    </c:otherwise>
</c:choose>