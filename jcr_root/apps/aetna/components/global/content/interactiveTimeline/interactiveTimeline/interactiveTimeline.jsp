<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<jsp:useBean id="timelineController" class="com.aetna.cq.bl.components.timeline.controller.TimelineController"></jsp:useBean>
<c:set var="timelineItems" value="<%= timelineController.generateTimelineItems(currentNode) %>" />

<c:choose>
	<c:when test="${not empty properties.timelineitems}">
        <div class="timeline-img img loadImg">
        	<c:set scope="request" var="imageName" value="image"/>
	        <c:set scope="request" var="imageAltParam" value="imageAlt"/>
	        <c:set scope="request" var="imageAlt" value="${properties.imageAlt}"/>
	        <c:set scope="request" var="imageTitle" value="${properties.imageTitle}"/>
	        <c:set scope="request" var="dataImgName" value="true"/>
		    <c:set scope="request" var="cssClass" value="hidden-phone"/>
        	<cq:include script="../../utils/render.image.jsp" />
        	
        	<c:set scope="request" var="imageName" value="mobileImage"/>
	        <c:set scope="request" var="imageAltParam" value="imageAlt"/>
	        <c:set scope="request" var="imageAlt" value="${properties.imageAlt}"/>
	        <c:set scope="request" var="imageTitle" value="${properties.imageTitle}"/>
	        <c:set scope="request" var="dataImgName" value="true"/>
	        <c:set scope="request" var="cssClass" value="visible-phone"/>
	        <cq:include script="../../utils/render.image.jsp" />
        </div>
        
        <div class="timeline-marks hidden-phone">
   			<c:forEach items="${timelineItems}" var="currentTimelineItem" varStatus="timelineStatus">
   				<span class="timeline-mark" data-item-index="${timelineStatus.count}" style="left: ${currentTimelineItem.leftPosition}%"></span>
   			</c:forEach>
        </div>
		
		<div class="bxslider-timeline">
			<c:choose>
				<c:when test="${isEditMode}">
					<c:forEach var="itemIndex" begin="1" end="${properties.timelineitems}">
			            <cq:include path="item-${itemIndex}" resourceType="aetna/components/global/content/interactiveTimeline/interactiveTimelineItem" />
			        </c:forEach>
				</c:when>
				<c:otherwise>
					<c:forEach items="${timelineItems}" var="currentTimelineItem" varStatus="timelineIndex">
						<c:set var="timelineItem" value="${currentTimelineItem}" scope="request" />
						<cq:include path="item-${currentTimelineItem.index}" resourceType="aetna/components/global/content/interactiveTimeline/interactiveTimelineItem" />
					</c:forEach>
				</c:otherwise>
			</c:choose>
	    </div>
	    
	    <cq:includeClientLib css="aetna.timeline"/>
	    <cq:includeClientLib js="aetna.timeline"/>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Double click to configure Interactive Timeline component
		</c:if>
	</c:otherwise>
</c:choose>