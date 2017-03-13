<%@include file="/apps/aetna/components/global/global.jsp" %>
<%@page import="com.aetna.cq.bl.components.zipcodeinput.service.ZipCodeInputService,
				com.aetna.cq.bl.components.zipcodeinput.entity.MarketSegment"%>
<% ZipCodeInputService zipCodeInputService = sling.getService(ZipCodeInputService.class); %>
<c:set var="zipCodeIndentifier" value="<%= zipCodeInputService.getZipCodeIdentifier(currentNode) %>" />
<div class="zip-code-wrapper<c:if test="${yesNoZipType && !isEditMode}"> hidden-element</c:if>">
	<div class="span8 offset2">
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
				<div class="submit-button-wrapper">
					<a href="#" class="blueBtn whiteBtn disabled"<c:if test="${not empty properties.submitbuttononclick}"> data-onclick="${properties.submitbuttononclick}"</c:if>>
						<span>${properties.submitbuttonlabel}</span>
					</a>
				</div>
			</form>
		</div>
	</div>
	<div class="submit-button-error<c:if test="${!isEditMode}"> hidden-element</c:if>">
		<span class="arrow"></span>
		<div class="submit-button-error-wrapper">
			<div class="error default-error">${properties.submitbuttonerrormessage}</div>
			<div class="error zip-error">${properties.submitbuttonerrormessageinvalidzip}</div>
		</div>
	</div>
</div>