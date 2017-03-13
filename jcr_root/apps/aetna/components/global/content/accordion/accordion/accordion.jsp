<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:set var="isPreviewMode" value="<%= WCMMode.fromRequest(request) == WCMMode.PREVIEW %>" />
<c:choose>
	<c:when test="${not empty properties.itemsqty}">
		<jsp:useBean id="accordionController" class="com.aetna.cq.bl.components.accordion.controller.AccordionController" scope="request" />
		<c:set var="useDeepLink" value="${not empty properties.usedeeplinking}" scope="request" />
        <c:if test="${isPreviewMode}">
			<style>
                .ui-widget {
					font-family: Calibri, Candara, Segoe, 'Segoe UI', Arial, sans-serif;
                    font-size: 1em;
                    line-height: 24px;
                }
                .ui-helper-reset {
                    ine-height: 24px;
                }
                .ui-accordion .ui-accordion-header {
                    margin-top: 0;
                    border-radius: 0;
		            border: 0;
		            font-family: Calibri, Arial, sans-serif;
		            font-size: 24px;
		            line-height: 24px;
                }

                .ui-accordion .ui-accordion-header .ui-accordion-header-icon {
                    position: static;
				}
           	</style>
        </c:if>
		<div class="accordion-container<c:if test="${not empty properties.nopaddingclass}"> noPadding</c:if><c:if test="${not empty properties.noborderclass}"> noBorder</c:if>" 
			id="accordion-<%= currentNode.getIdentifier() %>"<c:if test="${not empty properties.includeexpansionanalytics}"> data-track-analytics-expansion="true"</c:if>
			<c:if test="${useDeepLink}"> data-deep-linking="true"</c:if>>
			<c:if test="${isEditMode}">
				<% accordionController.checkAccordionItemsIntegrity(resource); %>
	            <div style="padding:10px; border: 2px solid #eee;">
	        </c:if>
	                    
	        <c:forEach var="itemIndex" begin="1" end="${properties.itemsqty}">
				<c:if test="${!isEditMode}">
	            	<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);%>
	        	</c:if>	
	            <cq:include path="item${itemIndex}" resourceType="aetna/components/global/content/accordion/accordionItem" />
	        </c:forEach>	
	        
	        <c:if test="${isEditMode}">
	            </div>
	        </c:if>
		</div>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Click on 'Edit' button to configure the Accordion component
		</c:if>
	</c:otherwise>
</c:choose>