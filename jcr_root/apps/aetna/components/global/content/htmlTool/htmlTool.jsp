<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
    <c:when test="${not empty properties.text or not empty properties.inlinejs}">
    	<c:if test="${not empty properties.text}">   
        	<cq:text property="text"/>
        </c:if>
        <c:forEach var="currentJS" items="${properties.scripts}">
            <script type="text/javascript" src="<%= PageUtils.getMappedAbsoutePath((String)pageContext.getAttribute("currentJS"),slingRequest) %>"></script>
        </c:forEach>
        <c:forEach var="currentCSS" items="${properties.cssstylesheet}">
            <link rel="stylesheet" type="text/css" href="<%= PageUtils.getMappedAbsoutePath((String)pageContext.getAttribute("currentCSS"),slingRequest) %>" media="screen" />
        </c:forEach>
        <c:if test="${not empty properties.inlinejs}">
	        <c:choose>
		        <c:when test="${isEditMode}">
		        	<div style="margin: 10px; padding: 10px; background: #eeeeee; border: 1px solid black;">
		        		<p>Inline JavaScript code starts here</p>
		        </c:when>
		        <c:otherwise>
		        	<script>
		        </c:otherwise>
		    </c:choose>
	        ${properties.inlinejs}
	        <c:choose>
		        <c:when test="${isEditMode}">
		        	</div>
		        </c:when>
		        <c:otherwise>
		        	</script>
		        </c:otherwise>
	       	</c:choose>
       	</c:if>
    </c:when>
    <c:otherwise>
        <c:if test="${isEditMode}">
            Double click to configure the tool area
        </c:if>
    </c:otherwise>
</c:choose>