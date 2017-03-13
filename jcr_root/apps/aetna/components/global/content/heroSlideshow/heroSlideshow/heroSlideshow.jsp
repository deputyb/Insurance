<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<div class="<c:if test="${!isEditMode}">slideshow-wrapper</c:if>">			<%-- slideshow-wrapper start --%>
	<c:choose>
		<c:when test="${isEditMode}">
			<div style="padding: 0 10px 20px; margin: 0 10px; border: 1px solid black;">
				Drop in this panel, the Hero Slideshow Items components to build the slideshow.
		</c:when>
		<c:otherwise>
			<div class="hero">			<%-- hero init --%>
		</c:otherwise>
	</c:choose>
	
	<c:if test="${!isEditMode}">
		<ul class="bxslider">
		<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);%>
	</c:if>
	
	<cq:include path="hero-slideshow-items" resourceType="/libs/foundation/components/parsys" />
	
	<c:if test="${!isEditMode}">
		</ul>
	</c:if>
	
	
	<div class="row-fluid pagination">
		<div class="container-fluid pagination-holder"></div>
	</div>
	
	</div>	<%-- hero end --%>
</div>		<%-- slideshow-wrapper end --%>
<script type="text/javascript">
/** Slider component initialization **/
$(function() {
	if (Aetna.isCQPreviewMode) {		
		sliderInit();
	}
});
</script>