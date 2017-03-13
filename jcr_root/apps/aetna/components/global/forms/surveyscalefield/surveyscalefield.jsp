<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:set var="renderTitles" value="true" />
<c:forEach begin="1" end="5" var="actualValue">
	<c:set var="key" value="label${actualValue}item" />
	<c:set var="renderTitles" value="${renderTitles && not empty properties[key]}" />	
</c:forEach>
<c:choose>
    <c:when test="${not empty properties.name}">
    	<div class="row-fluid">
    		<div class="span12">
    			<c:if test="${not empty properties.surveytoplabel}">
	    			<div class="survey-scale-top-label">
	   					<label>${properties.surveytoplabel}</label>
	   				</div>
	   			</c:if>
    			<div class="survey-scale-parent">
    				<div class="survey-scale-label hidden-desktop">
    					<cq:include script="componentlabel.jsp" />
    				</div>
    				<c:if test="${renderTitles}">
    					<div class="survey-scale-row">
	    					<div class="survey-question"></div>
	    					<div class="survey-values">
	    						<div class="survey-values-wrapper">
	    							<c:forEach begin="1" end="5" var="actualValue">
				    					<div class="checkBox survey-value">
					    					<c:set var="key" value="label${actualValue}item" />
					    					<c:if test="${not empty properties[key]}">
					    						<c:set var="renderHiddenPhone" value="${actualValue != 1 && actualValue != 5}" />
					    						<div class="survey-label-item<c:if test="${renderHiddenPhone}"> visible-desktop</c:if>">${properties[key]}</div>
					    					</c:if>
										</div>
									</c:forEach>
								</div>
							</div>
						</div>
    				</c:if>
    				<div class="survey-scale-row">
    					<div class="survey-question">
    						<cq:include script="componentlabel.jsp" />
						</div>
    					<div class="survey-values">
    						<div class="survey-values-wrapper">
	    						<c:forEach begin="1" end="5" var="actualValue">
				    				<div class="checkBox survey-value">
										<input type="radio" id="${properties.name}-${actualValue}" name="${properties.name}" value="${actualValue}" />
										<label for="${properties.name}-${actualValue}">
											<div class="radio-wrapper">
												<span></span>
											</div>
											<div class="radio-label-wrapper hidden-desktop">${actualValue}</div>
										</label>
									</div>
				    			</c:forEach>
				    		</div>
    					</div>
    				</div>
				</div>
				<cq:include script="componentdescription.jsp" />
			</div>
		</div>
    </c:when>
    <c:otherwise>
    	<c:if test="${isEditMode}">
			Double click to configure Survey Scale Field component
		</c:if>
    </c:otherwise>
</c:choose>