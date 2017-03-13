<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
	<c:when test="${not empty properties.slidesqty}">
		<c:set var="slideshowTag" value="ul" />
		
		<c:if test="${isEditMode}">
			<c:set var="slideshowTag" value="div" />
		</c:if>
		
		<${slideshowTag} class="bxslider"<c:if test="${isEditMode}"> style="padding:10px; border: 2px solid #eee;"</c:if>>

			<c:forEach var="slideIndex" begin="1" end="${properties.slidesqty}">
				<c:if test="${!isEditMode}">
					<li>
						<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);%>
				</c:if>
				
				<cq:include path="slide${slideIndex}" resourceType="aetna/components/global/content/slideshow/slideshowItem" />
				
				<c:if test="${!isEditMode}">
					</li>
				</c:if>
			</c:forEach>

		</${slideshowTag}>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Click on 'Edit' button to configure the Slideshow component
		</c:if>
	</c:otherwise>
</c:choose>