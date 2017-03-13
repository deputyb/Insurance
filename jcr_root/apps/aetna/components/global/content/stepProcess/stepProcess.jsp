<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:set var="href" value="<%= PageUtils.getResolvedPath(properties.get("stepTitleURL", ""), "#", slingRequest, pageContext) %>" />
<c:choose>
	<c:when test="${not empty properties.step}">
		
		<c:if test="${not empty properties.title}">
		 	<h4>${properties.title}</h4>
		</c:if>
		
		<c:set var="stepClass" value="body" />
		<c:set var="stepTag" value="p" />
		
		<c:if test="${not empty properties.usestepheaderclass}">
			<c:set var="stepClass" value="heading" />
			<c:set var="stepTag" value="h5" />
		</c:if>

		<div class="stepWrap ${stepClass}">
			<div class="circle">${properties.step}</div>
			<c:choose>
				<c:when test="${not empty properties.steptitleURL}">
					<a href="<%= PageUtils.getResolvedPath(properties.get("steptitleURL", ""), "#", slingRequest, pageContext) %>" target="${properties.target}"><${stepTag} class="circleTitle">${properties.stepTitle}</${stepTag}></a>
				</c:when>
				<c:otherwise>
					<${stepTag} class="circleTitle">${properties.stepTitle}</${stepTag}>
				</c:otherwise>
			</c:choose>
			
		</div>
		
		<c:if test="${not empty properties.text}">
			<cq:text property="text"/>
		</c:if>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Double click to configure Step Process component
		</c:if>
	</c:otherwise>
</c:choose>