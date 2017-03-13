<%@include file="/apps/aetna/components/global/global.jsp" %>
<jsp:useBean id="listController" class="com.aetna.cq.bl.widgets.list.controller.ListController">
    <jsp:setProperty name="listController" property="slingRequest" value="<%=slingRequest%>" />
    <jsp:setProperty name="listController" property="pageContext" value="<%=pageContext%>" />
</jsp:useBean>

<c:set var="isEditMode"
	value="<%=(WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode
					.fromRequest(request) == WCMMode.DESIGN)%>" />

<%
			PageManager pm = currentPage.getPageManager();
%>

<div class="articleModule">
    <div class="selectWrap mobile100">
        <c:choose>
            <c:when test="${not empty properties.default}">

                    <select class="autoSubmit">
                        <option value="">${properties.default}</option>
                    <c:set var="urls" 
                                    value="<%= listController.getListItemLinks(currentNode.getPath(), "links", resourceResolver)%>" />
                        <c:forEach var="listItem" items="${urls}">
                            <c:set var="url" value="${listItem.url}" />
                            <c:set var="pageURL" value="<%= pm.getPage((String) pageContext.getAttribute("url"))%>" />
            
                            <c:if test="${not empty pageURL}">
                                <c:set var="title" value="<%=((Page) pageContext.getAttribute("pageURL")).getTitle()%>" />
                            </c:if>

                            <c:if test="${not empty listItem.title}">
                                <c:set var="title" value="${listItem.title}" />
                            </c:if>

                            <option value="${url}">${title}</option>
                         </c:forEach>
                    </select>
            </c:when>
            <c:otherwise>
                <c:if test="${isEditMode}">
            	Add links on Dialog
                </c:if>
            </c:otherwise>
    	</c:choose>
</div>
</div>