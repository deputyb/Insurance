<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<div class="home-slideshow-wrapper <c:if test="${!isEditMode}">slideshow-wrapper</c:if>">
	<jsp:useBean id="homeSlideshowController" class="com.aetna.cq.bl.components.homeslideshow.controller.HomeSlideshowController"></jsp:useBean>
	<c:set var="homeSlideshowPaginationItems" value="<%= homeSlideshowController.generateHomeSlideshowPagination(resource) %>" />
	<c:choose>
		<c:when test="${isEditMode}">
			<div style="padding: 0 10px 20px; margin: 0 10px; border: 1px solid black;">
				Drop in this panel, the Home Slideshow Items components to build the slideshow.
		</c:when>
		<c:otherwise>
			<div class="home">
		</c:otherwise>
	</c:choose>
	
	<c:if test="${!isEditMode}">
		<ul class="bxslider">
		<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);%>
	</c:if>
	
	<cq:include path="home-slideshow-items" resourceType="foundation/components/parsys" />
	
	<c:if test="${!isEditMode}">
		</ul>
	</c:if>
	
	<div class="row-fluid pagination">
		<div class="container-fluid pagination-holder">
			<c:if test="${!isEditMode && fn:length(homeSlideshowPaginationItems) > 1}">
				<div class="bx-pager bx-default-pager pagination-wrapper ">
					<c:forEach var="homeSlideshowItem" items="${homeSlideshowPaginationItems}">
						<a data-slide-index="${homeSlideshowItem.id}" href="#"<c:if test="${not empty homeSlideshowItem.paginationOnClick}"> onclick="${homeSlideshowItem.paginationOnClick}"</c:if>>
							<span class="arrow white"></span>
							<span class="arrow background"></span>
							<span class="heading">${homeSlideshowItem.paginationHeading}</span>
							<span class="subheading">${homeSlideshowItem.paginationSubheading}</span>
						</a>
					</c:forEach>
				</div>
			</c:if>
		</div>
	</div>
	
	</div>
</div>