<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:choose>
	<c:when test="${not empty properties.heading}">
		<div class="row-fluid">
			<div class="span4 main-image">
		    	<div class="img loadImg">
			    	<c:set scope="request" var="imageName" value="image"/>
			        <c:set scope="request" var="dataAttr" value="" />
			        <c:set scope="request" var="renditionSize" value="369.518" />
			        <c:set scope="request" var="prefix" value="corporate-governance" />
		        	
			        <c:if test="${!isEditMode}">
				        <c:set scope="request" var="dataImgName" value="true"/>
			        	<c:set scope="request" var="cssClass" value="hidden-phone"/>
			        </c:if>
			        <cq:include script="../../utils/render.image.rendition.jsp" />
			        
			        <c:set scope="request" var="imageName" value="image"/>
			        <c:set scope="request" var="dataAttr" value="" />
			        <c:set scope="request" var="renditionSize" value="767.350" />
			        <c:set scope="request" var="prefix" value="corporate-governance" />
			        <c:if test="${!isEditMode}">
				        <c:set scope="request" var="dataImgName" value="true"/>
				    </c:if>
			        <c:set scope="request" var="cssClass" value="visible-phone"/>
			        <div class="mobile-img-wrapper">
			        	<cq:include script="../../utils/render.image.rendition.jsp" />
			        </div>
		    	</div>
			</div>
			<div class="span8">
				<h2>${properties.heading}</h2>
				<h4>${properties.subheading}</h4>
				${properties.text}
		        
		    	<div class="img loadImg">
			        <div class="right signature">
				        <c:set scope="request" var="imageName" value="signatureimage"/>
				        <c:set scope="request" var="dataAttr" value="" />
			        	<c:set scope="request" var="renditionSize" value="266.126" />
			        	<c:set scope="request" var="prefix" value="corporate-governance-signature" />
				        <cq:include script="../../utils/render.image.rendition.jsp" />
					</div>
				</div>
			</div>
		</div>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Double click to configure Corporate Governance item component
		</c:if>
	</c:otherwise>
</c:choose>