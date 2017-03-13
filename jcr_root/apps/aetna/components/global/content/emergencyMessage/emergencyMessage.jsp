<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<jsp:useBean id="emergencyMessageController" class="com.aetna.cq.bl.components.emergencymessage.controller.EmergencyMessageController" />
<c:set var="isConfigurationValid" value="<%= emergencyMessageController.isConfigurationValid(resource) %>" />
<cq:includeClientLib css="aetna.emergencymessage" />
<div class="emergency-message-wrapper<c:if test="${!isEditMode}"> hidden</c:if>">
	<div class="container-fluid">
		<div class="row-fluid">
			<c:if test="${isConfigurationValid}">
				<div class="exit-icon">
					<a href="#"></a>
				</div>
			</c:if>
			<div class="span8 offset2">
				<c:if test="${!isConfigurationValid && isEditMode}">
					<div style="float: left; margin-right: 10px;">Configure the Emergency Message in the next Body Text component</div>
					<div style="float: left;">
				</c:if>
				<cq:include path="content" resourceType="aetna/components/global/content/articleModule" />
				<c:if test="${!isConfigurationValid && isEditMode}">
					</div>
				</c:if>
			</div>
		</div>
	</div>
</div>
<cq:includeClientLib js="aetna.emergencymessage" />
<c:if test="${isEditMode}">
	<style>
		.emergency-message-wrapper {
			position: relative;
			z-index: 0;
			<c:if test="${!isConfigurationValid}">
				padding: 0;
			</c:if>
		}
	</style>
	<script>
		$(function() {
			$('header').css('top', $('.emergency-message-wrapper').offset().top + $('.emergency-message-wrapper').outerHeight());	
		});
	</script>
</c:if>