<%@include file="/apps/aetna/components/global/global.jsp" %>
<%@page import="com.aetna.cq.bl.components.zipcodeinput.service.ZipCodeInputService,
				com.aetna.cq.bl.components.zipcodeinput.entity.MarketSegment"%>
<c:set var="isEditMode" 
	value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<% ZipCodeInputService zipCodeInputService = sling.getService(ZipCodeInputService.class); %>
<c:set var="zipCodeIndentifier" value="<%= zipCodeInputService.getZipCodeIdentifier(currentNode) %>" />
<div class="progressive-page-login-wrapper progressive-page-wrapper">
	<c:choose>
		<c:when test="${not empty properties.questionlabel}">
			<c:if test="${not empty properties.title}">
				<div class="title-wrapper">
					<h4>${properties.title}</h4>
					<c:if test="${not empty properties.tooltiptext}">
						<div class="tooltip-icon-wrapper">
							<a href="#" class="tooltip-icon">
								<span class="hidden">Help</span>
							</a>
						</div>
						<div class="tooltip-content<c:if test="${!isEditMode}"> hidden-element</c:if>">
							<div class="exit-icon">
								<a href="#"></a>
							</div>
							<div class="tooltip-content-wrapper">${fn:replace(fn:replace(properties.tooltiptext, '<p>', ''), '</p>', '')}</div>
						</div>
					</c:if>
				</div>
			</c:if>
			<div class="question-wrapper">
				<div class="question-inner-wrapper">
					<p><span>${properties.questionlabel}</span>
						<span class="answers-wrapper">
							<a href="#" class="answer-label yes" data-answer="yes"
								<c:if test="${not empty properties.yesonclick}"> data-onclick="${properties.yesonclick}"</c:if>>${properties.yeslabel}</a>
							<a href="#" class="answer-label no" data-answer="no"<c:if test="${yesNoZipType}"> data-zip-input="true"</c:if>
								<c:if test="${not empty properties.noonclick}"> data-onclick="${properties.noonclick}"</c:if>>${properties.nolabel}</a>
						</span>
					</p>
				</div>
			</div>
			<div class="answers-content">
				<div class="yes-answer">
					<c:if test="${isEditMode}">
						<div style="margin: 5px; padding: 5px; border: 1px solid white;">
							<p>Content of the 'Yes' Answer</p>
					</c:if>
					<cq:include path="yes-answer-content-parsys" resourceType="foundation/components/parsys" />
					<c:if test="${isEditMode}">
						</div>
					</c:if>					
				</div>
				<div class="no-answer zip-code-wrapper<c:if test="${!isEditMode}"> hidden-element</c:if>">
					<c:if test="${isEditMode}">
						<div style="margin: 5px; padding: 5px; border: 1px solid white;">
							<p>Content of the 'No' Answer</p>
					</c:if>
					<div class="zip-code-form">
						<form action="<%= zipCodeInputService.getZipCodeServicePath() %>">
							<div class="row-fluid">
								<div class="zip-input-wrapper">
									<label for="${zipCodeIndentifier}">${properties.zipcodetext}</label>
									<input id="${zipCodeIndentifier}" class="zip-code" name="zip-code" type="text" />
								</div>
								<div class="county-dropdown-wrapper hidden-element">
									<div class="county-form-item">
										<div class="selectWrap span6">
								    		<select id="county-${zipCodeIndentifier}" class="js-county-select">
								            	<option value="default">${properties.countydropdowndefaultoption}</option>
								            	<c:if test="${not empty properties.countydropdownoptionseparator}">
								                	<option disabled="disabled">${properties.countydropdownoptionseparator}</option>
								               	</c:if>
								            </select>
								        </div>
									</div>
								</div>
							</div>
							<div class="login-button-wrapper">
								<c:if test="${not empty properties.submitbuttonerrormessageinvalidzip}">
									<div class="invalid-zip-code-wrapper<c:if test="${!isEditMode}"> hidden-element</c:if>">
										<p>${properties.submitbuttonerrormessageinvalidzip}</p>
									</div>
								</c:if>
								<div class="login-campaign<c:if test="${!isEditMode}"> hidden-element</c:if>">
									<cq:include path="login-content" resourceType="cq/personalization/components/teaser" />
								</div>
								<div class="default-login-button-wrapper">
									<a href="#" class="blueBtn whiteBtn full-width disabled"
										<c:if test="${not empty properties.buttonnonewtab}"> target="_blank"</c:if>
										<c:if test="${not empty properties.buttonnoonclick}"> data-onclick="${properties.buttonnoonclick}"</c:if>>
										<span class="">${properties.buttonnolabel}</span>
									</a>
								</div>
								<div class="submit-button-error<c:if test="${!isEditMode}"> hidden-element</c:if>">
					   				<span class="arrow"></span>
					   				<div class="submit-button-error-wrapper">
					   					<div class="error zip-error">${properties.submitbuttonerrormessage}</div>
					   				</div>
					   			</div>
							</div>
						</form>
					</div>
					<c:if test="${isEditMode}">
						</div>
					</c:if>
				</div>
			</div>
		</c:when>
		<c:otherwise>
			<c:if test="${isEditMode}">
				<p>Double click to configure the Progressive Page Login component.</p>
			</c:if>
		</c:otherwise>
	</c:choose>
</div>
<c:if test="${isEditMode}">
	<style>
		.progressive-page-login-wrapper p {
			color: white;
		}
		
		.progressive-page-wrapper .tooltip-content {
			position: relative;
			float: left;
			left: 0;
			top: 0;
			max-width: 50%;
		}
	</style>
</c:if>