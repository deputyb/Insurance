<%@include file="/apps/aetna/components/global/global.jsp" %>
<%@page import="org.apache.sling.api.resource.ResourceResolverFactory" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<jsp:useBean id="usMapController" class="com.aetna.cq.bl.components.usmap.controller.USMapController">
	<jsp:setProperty name="usMapController" property="slingRequest" value="<%= request %>" />
	<jsp:setProperty name="usMapController" property="pageContext" value="<%= pageContext %>" />
	<jsp:setProperty name="usMapController" property="resourceResolverFactory" value="<%= sling.getService(ResourceResolverFactory.class) %>" />	
</jsp:useBean>
<c:set var="usMapEntities" value="<%= usMapController.generateUSMap(resource) %>" />

<c:set var="titleClass" value="span10" />
<c:set var="titleTextClass" value="span9" />
<c:set var="dropdownClass" value="span3" />
<c:if test="${properties.dropdownwidth == 'wide'}">
	<c:set var="titleClass" value="span6" />
	<c:set var="dropdownClass" value="span6" />
	<c:set var="titleTextClass" value="span6" />
</c:if>

<cq:includeClientLib css="aetna.usmap"/>
<div class="usmap module container-fluid padding48">
	<div class="wrapTop">
		<div class="row-fluid">
			<div class="${titleClass}">
				<c:if test="${not empty properties.title}">
					<h2 class="greenText">${properties.title}</h2>
				</c:if>
			</div>
			<c:if test="${not empty properties.headertext}">
				<div class="${titleTextClass}">
					${properties.headertext}
				</div>
			</c:if>
			<div class="${dropdownClass}">
				<form>
					<div class="selectState selectWrap">
						<select>
							<option value="">Select your state</option>
							<c:forEach items="${usMapEntities}" var="mapEntity">
								<c:if test="${mapEntity.mapEntityType == 'link'}">
									<option value="${mapEntity.linkClass}" 
										data-overwrite-title="${mapEntity.overwriteLinkTitle}">${mapEntity.title}</option>
								</c:if>
							</c:forEach>
						</select>
					</div>
				</form>		
			</div>
		</div>
	</div><!-- end WrapTop -->
	<div class="wrapMiddle">
		<div class="statemap visible-desktop">
			<div class="map-default map-section">
				<c:forEach items="${usMapEntities}" var="mapEntity">
					<c:set var="stateClass" value="state-${mapEntity.linkClass} state on" />
					
					<c:if test="${mapEntity.overwriteLinkTitle}">
						<c:set var="stateClass" value="state-overwrite-${mapEntity.linkClass}" />
					</c:if>
					
					<div class="${stateClass}"<c:if test="${mapEntity.overwriteLinkTitle}"> data-overwrite-title="${mapEntity.title}"</c:if>>
						<c:forEach begin="1" end="${mapEntity.sectors}" varStatus="sector">
							<a href="${mapEntity.url}" class="s${sector.count}" data-state="${mapEntity.linkClass}"
								<c:if test="${mapEntity.mapEntityType == 'link'}"> onclick="Aetna.analytics.omniture.linkCode('aeCustLnk','State Selection',this,'${mapEntity.title}');s.tl(this,'o',linkText,null,'navigate');return false;"</c:if>></a>
						</c:forEach>
					</div>
				</c:forEach>
			</div>

			<c:choose>
				<c:when test="${isEditMode}">
					</div>
					<div class="mapItems">
						<div style="border: 1px solid black; padding: 10px; margin: 10px;">
							<p>Drop the US Map Link components here</p>
				</c:when>
				<c:otherwise>
					<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);%>
				</c:otherwise>
			</c:choose>			
			<cq:include path="map-default" resourceType="foundation/components/parsys" />
			<c:if test="${isEditMode}">
				</div>
			</c:if>
		</div>
		<div class="row-fluid">
			<div class="span12">
				<div class="visible-phone"><p>&nbsp;</p></div>
				<div class="statemap-popup-content hidden-desktop"></div>
			</div>
		</div>
	</div><!-- end WrapMiddle -->
	<c:if test="${not empty properties.footertext}">
		<div class="wrapBottom" >
			<div class="row-fluid">
				<div class="span6 otherPlans">
					${properties.footertext}
				</div>
			</div>	
		</div><!-- end Wrapbottom -->
	</c:if>
</div>
<cq:includeClientLib js="aetna.usmap"/>