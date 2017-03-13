<%@include file="/apps/aetna/components/global/global.jsp" %>
<%@page import="com.aetna.cq.bl.components.glossary.controller.GlossaryController" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<jsp:useBean scope="request" id="glossaryController" 
	class="com.aetna.cq.bl.components.glossary.controller.GlossaryController">
	<jsp:setProperty name="glossaryController" property="glossaryResource" value="<%= resource %>" />
</jsp:useBean>

<cq:include script="fragments/glossary-selector.jsp" />
<div class="glossary-section-content">
	<div class="row-fluid">
		<c:forEach items="${glossaryController.glossarySections}" 
			var="glossarySection" varStatus="glossarySectionStatus">
			<div class="span12<c:if test="${!isEditMode}"> glossary-section</c:if>"
				data-glossary-section="${glossarySection.sectionName}">
				<c:choose>
					<c:when test="${!isEditMode}">
						<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);%>
					</c:when>
					<c:otherwise>
						<div style="padding: 10px; margin: 10px; border: 1px solid black;">
							<p>Section "${glossarySection.sectionName}". Drop the Glossary Items bellow.</p>
					</c:otherwise>
				</c:choose>
				<cq:include path="glossary-section-${glossarySection.sectionName}"
					resourceType="foundation/components/parsys" />
				<c:if test="${isEditMode}">
					</div>
				</c:if>
			</div>
		</c:forEach>
	</div>
</div>
<cq:include script="fragments/glossary-selector.jsp" />
<cq:includeClientLib css="aetna.glossary"/>
<cq:includeClientLib js="aetna.glossary"/>