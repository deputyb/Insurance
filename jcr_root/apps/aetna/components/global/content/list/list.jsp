<%@include file="/apps/aetna/components/global/global.jsp"%>

<c:set var="isEditMode"
	value="<%=(WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode
					.fromRequest(request) == WCMMode.DESIGN)%>" />

<%
	PageManager pm = currentPage.getPageManager();
%>

<c:choose>

	<c:when test="${not empty properties.colqty}">
		<jsp:useBean id="listController" class="com.aetna.cq.bl.widgets.list.controller.ListController">
			<jsp:setProperty name="listController" property="slingRequest" value="<%=slingRequest%>" />
			<jsp:setProperty name="listController" property="pageContext" value="<%=pageContext%>" />
		</jsp:useBean>

		<div class="article-template">
			<div class="container-fluid">
				<div class="row-fluid">

					<c:set var="itemqty" value="${properties.itemqty}" />

					<c:set var="colqty" value="${properties.colqty}" />

					<c:if test="${colqty > 1}">
						<c:set var="span" value="span6" />
					</c:if>

					<c:if test="${not empty properties.underlined}">
						<c:set var="underlined" value="underlined" />
					</c:if>

					<c:if test="${not empty properties.audience}">
                        <c:set var="class" value=" class='${properties.audience}'"/>
                    </c:if>

					<c:set var="urls" 
						value="<%= listController.getListItemLinks(currentNode.getPath(), "links", resourceResolver)%>" />



					<c:set var="colqty" value="<%=request.getAttribute("colqty")%>" />
					<c:if test="${colqty > 1}">
						<c:set var="span" value="span6" />
					</c:if>


                    <% int itemDisplayedIndex = 0;%>
					<c:forEach var="colIndex" begin="1" end="${properties.colqty}">
						<ul class="${span} ${underlined}">
							<c:forEach var="itemIndex" begin="1" end="${properties.itemqty}">
                                <c:set var="listItem" value="<%= listController.getListItem(itemDisplayedIndex)%>" />
								<c:if test="${not empty listItem}">
									<li>
										<c:set var="url" value="${listItem.url}" />
                                        <c:set var="pageURL" 
                                        	value="<%= pm.getPage((String) pageContext.getAttribute("url"))%>" />
										<c:if test="${not empty pageURL}">
												<c:set var="title" value="<%=((Page) pageContext
														.getAttribute("pageURL"))
															.getTitle()%>" />
										</c:if>

        								<c:if test="${not empty listItem.title}">
											<c:set var="title" value="${listItem.title}" />
										</c:if>

                                        <c:choose>
                                            <c:when test="${!listItem.isLink}">
                                                ${title}
                                            </c:when> 
                                            <c:otherwise>
                                                <a href="${url}"title="${title}" ${class}>${title}</a>
                                            </c:otherwise> 
                                        </c:choose>

                                        <% itemDisplayedIndex++;%>
                                    </li>
								</c:if>
							</c:forEach>
						</ul>
					</c:forEach>

				</div>
			</div>
		</div>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
        	Click on 'Edit' button to configure list component
        </c:if>
	</c:otherwise>

</c:choose>
