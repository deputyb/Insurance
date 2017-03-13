<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
	<c:when test="${not empty properties.itemsqty}">
		<div class="tabs-container">
			<c:choose>
				<c:when test="${isEditMode}">
		            <div style="padding:10px; border: 2px solid #eee;">
		        </c:when>
	        	<c:otherwise>
	        		<jsp:useBean id="tabsController" class="com.aetna.cq.bl.components.tabs.controller.TabsController" />
	        		<c:set var="tabs" value="<%= tabsController.getTabs(resource) %>" />
	        		
	        		<ul itemQty="${properties.itemsqty}">
						<c:forEach items="${tabs}" var="tab" varStatus="tabStatus" end="${properties.itemsqty-1}">
							<li><a href="#tabs-${tabStatus.count - 1}">${tab}</a></li>
						</c:forEach>	        			
	        		</ul>
	        	</c:otherwise>
	        </c:choose>
	                    
	        <c:forEach var="itemIndex" begin="1" end="${properties.itemsqty}">
				<c:if test="${!isEditMode}">
	            	<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);%>
	        	</c:if>
	        	<div id="tabs-${itemIndex - 1}">
	            	<cq:include path="item${itemIndex}" resourceType="aetna/components/global/content/tabs/tabsItem" />
	            </div>
	        </c:forEach>	
	        
	        <c:if test="${isEditMode}">
	            </div>
	        </c:if>
		</div>
        <c:if test="${!isEditMode}">
			<cq:includeClientLib css="aetna.tabs"/>
			<cq:includeClientLib js="aetna.tabs"/>
		</c:if>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Double click to configure the Tabs component
		</c:if>
	</c:otherwise>
</c:choose>