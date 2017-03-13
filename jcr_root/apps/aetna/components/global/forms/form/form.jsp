<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" scope="request" />
<cq:includeClientLib css="aetna.forms"/>
<c:choose>
	<c:when test="${not empty properties.action}">
		<c:set var="previousButtonText" value="${properties.previousbuttontext}" />
		<c:set var="nextButtonText" value="${properties.nextbuttontext}" />
		<c:set var="formName" value="MailServlet" />
		
		<c:if test="${empty previousButtonText}">
			<c:set var="previousButtonText" value="Previous" />
		</c:if>
		<c:if test="${empty nextButtonText}">
			<c:set var="nextButtonText" value="Next" />
		</c:if>
		<c:if test="${not empty properties.name}">
			<c:set var="formName" value="${properties.name}" />
		</c:if>
		
		<div class="row-fluid">
			<c:if test="${isEditMode}">
				<p style="background: #eeeeee; padding: 10px; margin-top: 24px; border: 1px dotted black;">-- Form component starts here --</p>
			</c:if>
	   		<form name="${formName}" action="${properties.action}" method="${properties.method}"
	   			<c:if test="${not empty properties.multipartformdata}"> enctype="multipart/form-data"</c:if>
	   			<c:if test="${not empty properties.newtab}"> target="_blank"</c:if>>
	   			<c:choose>
	   				<c:when test="${fn:length(properties.mobilesectiontitles) > 0}">
	   					<c:forEach items="${properties.mobilesectiontitles}" var="section" varStatus="sectionStatus">
	   						<div class="wizard-section<c:if test="${!isEditMode && sectionStatus.count != 1}"> hide</c:if>" 
	   							data-section-id="${sectionStatus.count}">
		   						<c:if test="${isEditMode}">
		   							<div style="padding: 10px; border: 1px solid black; margin-bottom: 10px;">
		   								<p>Drop the form components for section "${section}" here</p>
		   						</c:if>
		   						<div class="visible-phone">
		   							<div class="wizard">
			   							<div class="wizard-info">${sectionStatus.count} of ${fn:length(properties.mobilesectiontitles)}</div>
			   							<div class="wizard-title">
			   								<h4>${section}</h4>
			   							</div>
			   						</div>
		   						</div>
		   						<cq:include path="form-content-${sectionStatus.count}" resourceType="foundation/components/parsys"/>
		   						<c:if test="${isEditMode}">
		   							</div>
		   						</c:if>
		   						<div class="visible-phone">
		   							<div class="wizard-buttons">
		   								<c:if test="${sectionStatus.count != 1}">
			   								<a href="#" class="blueBtn graybg wizard-button-previous">${previousButtonText}</a>
			   							</c:if>
			   							<c:if test="${sectionStatus.count != fn:length(properties.mobilesectiontitles)}">
			   								<a href="#" class="blueBtn graybg wizard-button-next">${nextButtonText}</a>
			   							</c:if>
			   						</div>
		   						</div>
		   						<c:if test="${sectionStatus.count == fn:length(properties.mobilesectiontitles)}">
		   							<c:if test="${not empty properties.previewform}">
				   						<div class="hidden-desktop">
				   					</c:if>
		   								<cq:include script="fragments/submitbuttons.jsp" />	
		   							<c:if test="${not empty properties.previewform}">		   								
			   							</div>
		   							</c:if>
	   							</c:if>
		   					</div>
	   					</c:forEach>
	   					<c:if test="${not empty properties.previewform}">		   								
							<div class="visible-desktop">
								<cq:include script="fragments/nextbutton.jsp"/>
							</div>
						</c:if>
	   					<c:if test="${not empty properties.previewform}">
							<c:if test="${not isEditMode}">
								<cq:includeClientLib js="aetna.forms.previewform"/>
								<cq:includeClientLib css="aetna.forms.previewform"/>
								<div class="preview-form-principal-container col-md-12 hidden-phone hidden-tablet" data-title="${properties.previewformtitle}">
									<div class ="preview-form-container articleModule ">
										<table class="column bgrows defTable preview-form-table">
											<tbody></tbody>
										</table>
									</div>
									<div class="span12 previousButtonContainer">
										<a href="#" class="previewPreviousButton blueBtn">Previous</a>
									</div>
									<div class="span12 printButtonContainer">
										<a href="#" class="previewPrintButton blueBtn printPage">Print</a>
									</div>
									<cq:include script="fragments/submitbuttons.jsp" />
								</div>
							</c:if>
							<c:if test="${isEditMode}">
								<p style="background: #eeeeee; padding: 10px; margin-top: 24px; border: 1px dotted black;">---There will be the preview form---</p>
							</c:if>
  						</c:if>
	   				</c:when>
	   				<c:otherwise>
	   					<c:if test="${isEditMode}">
   							<div style="padding: 10px; border: 1px solid black;">
   								<p>Drop the form components here</p>
   						</c:if>
	   					<cq:include path="form-content-1" resourceType="foundation/components/parsys" />
	   					<c:if test="${isEditMode}">
   							</div>
   						</c:if>
						<c:if test="${not empty properties.previewform}">
							<div class="hidden-desktop">
						</c:if>
						<cq:include script="fragments/submitbuttons.jsp" />	
						<c:if test="${not empty properties.previewform}">		   								
							</div>
						</c:if>
	   				</c:otherwise>
	   			</c:choose>
	   		</form>
	   		<c:if test="${isEditMode}">
				<p style="background: #eeeeee; padding: 10px; margin-top: 24px; border: 1px dotted black;">-- Form component ends here --</p>
			</c:if>
		</div>
		<cq:includeClientLib js="aetna.forms"/>
		<c:if test="${not empty properties.jscode}">
			<script type="text/javascript">
				$(function() {
					if (Aetna.isCQPreviewMode) {
						${properties.jscode}
					}
				});
			</script>
		</c:if>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Double click to configure the Form component
		</c:if>
	</c:otherwise>
</c:choose>