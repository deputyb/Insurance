<%@include file="/apps/aetna/components/global/global.jsp" %>
<%@page import="com.aetna.cq.bl.components.accordion.controller.AccordionController" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:if test="${isEditMode}">
	<div style="margin-bottom: 15px;">
</c:if>
        
<c:choose>
	<c:when test="${not empty properties.title}">
		<c:if test="${isEditMode}">
			<div style="padding:10px; border: 2px solid #eee;">
		</c:if>
		<c:set var="accordionItemTitleValue" value="<%= ((AccordionController) request.getAttribute("accordionController")).generateAccordionDeepLinkValue(resource) %>" />
        <h5 class="accheading" data-deep-link="${accordionItemTitleValue}">${properties.title}</h5>
		<div<c:if test="${not empty properties.noarrowlink}"> class="noarrowlink"</c:if>>
			<c:if test="${useDeepLink && isEditMode}"><p style="background: #eee; padding: 2px 5px; border: 1px dotted black;">DeepLink for the current item: ${accordionItemTitleValue}</p></c:if>
			<cq:include path="accordion-item-content" resourceType="/libs/foundation/components/parsys"/>
		</div>
		<c:if test="${isEditMode}">
			</div>
		</c:if>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Click on 'Edit' button to configure the Accordion Item component
		</c:if>
	</c:otherwise>
</c:choose>

<c:if test="${isEditMode}">
	</div>
</c:if>