<%@include file="/apps/aetna/components/global/global.jsp"%>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
	<c:when test="${not empty properties.id}">
		<c:choose>
			<c:when test="${!isEditMode}">
				<div id="${properties.id}" class="interout terms interstitial-video">
					<a href="#" class="interlink-back close"></a>
					<div class="interstitial-wrapper">
						<div class="interstitial">
							<cq:include path="video" resourceType="aetna/components/global/content/renditions/video" />
						</div>
					</div>
				</div>
			</c:when>
			<c:otherwise>
				<div style="margin: 0 10px 10px; padding: 10px; border: 1px solid black;">
					<p>Configure the video that will be displayed in the overlay</p>
					<cq:include path="video" resourceType="aetna/components/global/content/renditions/video" />
				</div>
			</c:otherwise>
		</c:choose>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Double click to configure the Interstitial Video component
		</c:if>
	</c:otherwise>
</c:choose>