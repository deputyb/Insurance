<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:set var="hasBottomImage" value="<%= currentNode != null && currentNode.hasNode("image") && (currentNode.getNode("image").hasProperty("fileReference") || currentNode.getNode("image").hasNode("file")) %>" />
<c:choose>
    <c:when test="${not empty properties.columndistribution}">
    	<cq:includeClientLib css="aetna.healthycommitmentstwocolumnlayout"/>
		<cq:includeClientLib js="aetna.healthycommitmentstwocolumnlayout"/>
    	<c:set var="layoutDistribution" value="${fn:split('4,8', ',')}" />
    	<c:if test="${properties.columndistribution == '70-30'}">
    		<c:set var="layoutDistribution" value="${fn:split('8,4', ',')}" />
    	</c:if>    	
		<div class="container-fluid">
			<div class="row-fluid<c:if test="${not empty properties.bluebg}"> blue-gb</c:if>">
				<div class="span${layoutDistribution[0]}<c:if test="${not empty properties.separator}"> separator horizontal-separator</c:if>">
					<c:if test="${!isEditMode}">
		            	<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
		            </c:if>
					<cq:include path="column1" resourceType="foundation/components/parsys" />
					<c:if test="${hasBottomImage}">
				        <c:set scope="request" var="imageName" value="image"/>
				        <c:set scope="request" var="imageAltParam" value="imageAlt"/>
				        <div class="image-bottom">
				        	<cq:include script="../../utils/render.image.jsp" />
				        </div>
					</c:if>
				</div>
				<div class="span${layoutDistribution[1]} text-align-bottom">
					<c:if test="${!isEditMode}">
		            	<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
		            </c:if>
					<cq:include path="column2" resourceType="foundation/components/parsys" />
				</div>
			</div><!--/.row-fluid-->
		</div><!--/.container-fluid-->
    </c:when>
    <c:otherwise>
    	Double click to configure 2 Column Layout - Healthy Commitments
    </c:otherwise>
</c:choose>