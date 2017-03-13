<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
	<c:when test="${not empty properties.itemsqty}">
		<div class="container-fluid">
			<div class="row-fluid<c:if test="${!isEditMode}"> row-hc</c:if>">
				<div class="<c:if test="${!isEditMode}">slideshow-wrapper</c:if>">
					<div class="hero">
						<c:if test="${!isEditMode}">
							<div class="bxslider">
						</c:if>
						<c:forEach var="itemsIndex" begin="1" end="${properties.itemsqty}">
							<c:if test="${isEditMode}">
								<div style="padding: 10px; margin: 10px; border: 1px solid black; display: inline-block;">
									<p>Drop the components for the slideshow item ${itemsIndex} here</p>
							</c:if>
							<div class="span12">
								<cq:include path="hero-slideshow-item-${itemsIndex}" resourceType="foundation/components/parsys" />
							</div>
							<c:if test="${isEditMode}">
								</div>
								<style>
									.slideshow .row-fluid {
										background: white;
									}
								</style>
							</c:if>
						</c:forEach>
						<c:if test="${!isEditMode}">
							</div>
						</c:if>
						<div class="row-fluid pagination">
							<div class="container-fluid pagination-holder"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Double click to configure Slideshow component
		</c:if>
	</c:otherwise>
</c:choose>