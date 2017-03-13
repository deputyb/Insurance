<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
    <c:when test="${not empty properties.title}">    	
    	<c:set scope="request" var="imageName" value="image"/>
    	<c:set scope="request" var="renditionSize" value="1600.376"/>
    	<c:set scope="request" var="prefix" value="hc" />
		<div class="topic-header short"> 
			<div class="topic-header-bg" style="<cq:include script="../../utils/render.backgroundimage.rendition.jsp" />"></div>
			<div class="container-fluid noPadding">
				<div class="row-fluid">
					<div class="span6 visible-phone">
						<c:set var="imageName" value="image" scope="request" />
						<c:set var="renditionSize" value="767.350" scope="request" />
						<c:set scope="request" var="prefix" value="hc" />
				        <cq:include script="../../utils/render.image.rendition.jsp" />
					</div>
					<div class="span6 heading">
						<h1><cq:text property="title" /></h1>
						<p><cq:text property="text" /></p>
					</div>
				</div><!--/.row-fluid-->
			</div><!--/.container-fluid-->
		</div>
    </c:when>
    <c:otherwise>
    	Double click to configure Healthy Commitments Overview Module
    </c:otherwise>
</c:choose>