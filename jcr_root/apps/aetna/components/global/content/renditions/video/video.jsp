<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
	<c:when test="${not empty properties.videotype || not empty properties.videoname}">
		<div class="row-fluid">
		    <div class="span12">
		        <div class="videoContent video-${properties.videotype}">
	            	<c:choose>
						<c:when test="${properties.videotype == 'youtube'}">
							<cq:include script="fragments/youtube-video.jsp" />
						</c:when>
						<c:otherwise>
							<cq:include script="fragments/file-video.jsp" />
						</c:otherwise>
					</c:choose>
		        </div><!--/.videoContent-->
		        <div class="videoTranscript">
		        	<c:if test="${not empty properties.transcriptHeader}">
			        	<h3>${properties.transcriptHeader}</h3>
			        </c:if>
			        <c:if test="${not empty properties.text}">
				        <div>
				        	${properties.text}
				        </div>
				    </c:if>
		        </div>
		    </div> 
		</div>
	</c:when>
	<c:otherwise>
		Double click to configure the Video Display component
	</c:otherwise>
</c:choose>