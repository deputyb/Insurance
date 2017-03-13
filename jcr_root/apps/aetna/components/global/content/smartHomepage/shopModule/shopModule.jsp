<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
    <c:when test="${not empty properties.dropdownlabel}">
    	<c:choose>
	    	<c:when test="${isEditMode}">
	    		<c:set var="styleAttr" value="style=\"border: 1px solid white; padding: 10px; margin-bottom: 10px;\"" />
	    	</c:when>
	    	<c:otherwise>
	    		<c:set var="class" value=" hidden-element" />
	    	</c:otherwise>
	    </c:choose>
    	<div class="open-layout">
			<div class="span6">
	   			<h2>${properties.dropdownlabel}</h2>
	   		</div>
	    	<div class="selectWrap span6">
	    		<select class="js-insurance-type-select">
	            	<option value="default">${properties.dropdowndefaultoption}</option>
	                <c:if test="${not empty properties.dropdownoptionseparator}">
	                	<option disabled="disabled">${properties.dropdownoptionseparator}</option>
	               	</c:if>
	               	<c:forEach var="option" varStatus="optionStatus" items="${properties.dropdownoptions}">
	               		<option value="${optionStatus.count}">${option}</option>
	               	</c:forEach>
	            </select>
	        </div>
	   		<div class="shop-module-content span12">
	   			<div class="shop-module-content-default">
	   				<p>&nbsp;</p>
	   				<p>&nbsp;</p>
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
	   			</div>
	        	<c:forEach var="option" varStatus="optionStatus" items="${properties.dropdownoptions}">
	        		<div class="shop-module-content-${optionStatus.count}${class}"${styleAttr}>
	        			<c:if test="${isEditMode}">
	        				<p>Content that will be displayed when the option '${option}' is selected.</p>
	        			</c:if>
	        			<cq:include path="option-${optionStatus.count}-content" resourceType="foundation/components/parsys" />
	        		</div>
	        	</c:forEach>
	        </div>
	        <div class="mobile-wrapper<c:if test="${!isEditMode}"> mobile-wrapper-hidden-desktop</c:if> span12">
	        	<div class="mobile-links">
		        	<c:if test="${not empty properties.mobilelink1text && not empty properties.mobilelink1url}">
		        		<a href="<%= PageUtils.getResolvedPath(properties.get("mobilelink1url", ""), "#", slingRequest, pageContext) %>"
		        			<c:if test="${not empty properties.mobilelink1targetblank}"> target="_blank"</c:if>
		        			<c:if test="${not empty properties.mobilelink1onclick}"> onclick="${properties.mobilelink1onclick}"</c:if>
		        			<c:if test="${not empty properties.mobilelink1interstitial}"> class="${properties.mobilelink1interstitial}"</c:if>
		        			<c:if test="${not empty properties.mobilelink1interstitialdeeplink}"> data-interstitial-deeplink="${properties.mobilelink1interstitialdeeplink}"</c:if>>${properties.mobilelink1text}</a>
		        	</c:if>
		        	<c:if test="${not empty properties.mobilelink1text && not empty properties.mobilelink1url && not empty properties.mobilelink2text && not empty properties.mobilelink2url}">
		        		<span class="separator">|</span>
		        	</c:if>
		        	<c:if test="${not empty properties.mobilelink2text && not empty properties.mobilelink2url}">
		        		<a href="<%= PageUtils.getResolvedPath(properties.get("mobilelink2url", ""), "#", slingRequest, pageContext) %>"
		        			<c:if test="${not empty properties.mobilelink2targetblank}"> target="_blank"</c:if>
		        			<c:if test="${not empty properties.mobilelink2onclick}"> onclick="${properties.mobilelink2onclick}"</c:if>
		        			<c:if test="${not empty properties.mobilelink2interstitial}"> class="${properties.mobilelink2interstitial}"</c:if>
		        			<c:if test="${not empty properties.mobilelink2interstitialdeeplink}"> data-interstitial-deeplink="${properties.mobilelink2interstitialdeeplink}"</c:if>>${properties.mobilelink2text}</a>
		        	</c:if>
		        </div>
	        </div>
	    </div>
    </c:when>
    <c:otherwise>
    	<c:if test="${isEditMode}">
			Double click to configure the Shop Module
		</c:if>
    </c:otherwise>
</c:choose>