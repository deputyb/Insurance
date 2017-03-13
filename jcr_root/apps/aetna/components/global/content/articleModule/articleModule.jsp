<%@include file="/apps/aetna/components/global/global.jsp" %><%
%>

<c:choose>
	<c:when test="${not empty properties.isTopic}">
		<c:set var="isTopic" value="${properties.isTopic}" />
	</c:when>
	<c:otherwise>
		<c:set var="isTopic" value="<%= Boolean.parseBoolean(currentStyle.get("topic","false")) %>" />
	</c:otherwise>
</c:choose>


<c:if test="<%= properties.get("greyBackgroundWhiteText", null) != null %>">
	<c:set var="divClasss" value="greyBackground-whiteText container-fluid" />
</c:if>

<c:choose>
    <c:when test="${isTopic}">
        <div class="text ${divClasss}">
    </c:when>
    <c:otherwise>
        <div class="articleModule ${divClasss}">
    </c:otherwise>
</c:choose>
	<cq:text property="text"/>
</div>