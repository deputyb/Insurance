<%@include file="/apps/aetna/components/global/global.jsp" %>
<%@page import="com.aetna.cq.bl.components.zipcodeinput.service.ZipCodeInputService,
				com.aetna.cq.bl.components.zipcodeinput.entity.MarketSegment"%>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
	<c:when test="${not empty properties.zipcodetext}">
		<% ZipCodeInputService zipCodeInputService = sling.getService(ZipCodeInputService.class); %>
		<c:set var="zipCodeIndentifier" value="<%= zipCodeInputService.getZipCodeIdentifier(currentNode) %>" />
		<div class="zip-code-wrapper" data-page-language="<%= currentPage.getLanguage(false).getLanguage() %>">
			<div class="zip-code-form">
				<form action="<%= zipCodeInputService.getZipCodeServicePath() %>">
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
				</form>
			</div>
			<div class="market-segments-wrapper">
				<c:if test="${isEditMode}">
					<div style="padding: 5px; margin: 5px; border: 1px solid white;">
						<p>Drop here the Shop Information Section components</p>
				</c:if>
				<c:if test="${!isEditMode}">	
					<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY); %>
				</c:if>
				<cq:include path="shop-information-content" resourceType="foundation/components/parsys" />
				<c:if test="${isEditMode}">
					</div>
				</c:if>
				<div class="market-segment market-segment-error<c:if test="${!isEditMode}"> hidden-element</c:if>">
					<p>${properties.ziperrormsg}</p>
					<p>&nbsp;</p>
				</div>
			</div>
			<div class="shop-button">
	   			<p>
	   				<span class="hidden-phone">
	   					<a href="#" class="blueBtn disabled">
	   						<span class="arrowGraySmall">${properties.defaultshopbuttonlabel}</span>
	   					</a>
	   				</span>
	   				<span class="visible-phone">
	   					<a href="#" class="blueBtn disabled">
	   						<span class="arrowGraySmall">${properties.defaultmobileshopbuttonlabel}</span>
	   					</a>
	   				</span>
	   			</p>
	   			<div class="shop-button-error<c:if test="${!isEditMode}"> hidden-element</c:if>">
	   				<span class="arrow"></span>
	   				<div class="shop-button-error-wrapper">
	   					<div class="error default-error">${properties.shopbuttonerrormsg}</div>
	   					<div class="error zip-error">${properties.shopbuttonerrormsginvalidzip}</div>
	   				</div>
	   			</div>
			</div>
		</div>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Double click to edit the  Zip Code Input component
		</c:if>
	</c:otherwise>
</c:choose>
<c:if test="${isEditMode}">
	<script>Aetna.language = '<%= currentPage.getLanguage(false) %>';</script>
</c:if>