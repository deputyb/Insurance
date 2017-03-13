<%@include file="/apps/aetna/components/global/global.jsp"%>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:set var="resourcePath" value="<%= resource.getPath() %>" />
<c:set var="inheritedFooter" value="${resourcePath != footerPath && noFooterResource == null}" />

<c:choose>
	<c:when test="${inheritedFooter && isEditMode}">
		<div style="color: black;">
			<c:set var="inheritFooterPage" value="<%= NodeUtils.getResourcePage((String) request.getAttribute("footerPath")) %>" />
			The configuration for Footer is inherited from <a style="color: black;" href="${inheritFooterPage}">${inheritFooterPage}</a><br/>
			If you want to overwrite the inherited configuration, click on 'Edit' button and configure Footer component normally. 
		</div>
	</c:when>
	<c:otherwise>
		<c:set var="colqty" value="5" />
		
		<c:if test="${not empty properties.isfourcolumns}">
			<c:set var="colqty" value="4" />
		</c:if>
		
		<footer>
			<div class="container-fluid<c:if test="${empty properties.isfourcolumns}"> fivecolumn</c:if>">
        		<div class="row-fluid">
        		
                    <c:forEach var="colIndex" begin="1" end="${colqty}">
                        <div class="span3">
                        	<c:if test="${isEditMode}">	
								<div style="border: 1px solid black; padding: 3px; margin-bottom: 10px;">
									Links for the column
							</c:if>
							
                            <ul>
                            	<c:if test="${!isEditMode}">	
									<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
								</c:if>
								<cq:include path="list-links-${colIndex}" resourceType="foundation/components/parsys" />
                            </ul>
                            
                            <c:if test="${isEditMode}">	
								</div>
							</c:if>
                         </div>
                    </c:forEach>

                </div>
			
				<c:if test="${not empty properties.copyrighttext}">
					<div class="row-fluid">
						<div class="span6 copyright">${properties.copyrighttext}</div>
						<c:if test="${empty properties.hideSocialLinks}">
							<div class="span6 icons">
								<c:forEach var="actualIconIndex" begin="1" end="6">
									<c:set var="actualIcon" value="icon${actualIconIndex}icon" />
									<c:set var="actualLink" value="icon${actualIconIndex}link" />
									<c:set var="actualText" value="icon${actualIconIndex}text" />
									<c:set var="actualInterstitial" value="icon${actualIconIndex}interstitial"/>
									<c:set var="actualOnClick" value="icon${actualIconIndex}onclick"/>
									<c:if test="${not empty properties[actualIcon]}">
										<a target="_blank" class="social ${properties[actualInterstitial]}" href="${properties[actualLink]}"
											<c:if test="${not empty properties[actualOnClick]}"> onclick="${properties[actualOnClick]}"</c:if>>
											<img src="${properties[actualIcon]}" width="24" height="24" alt="${properties[actualText]}" />
										</a>
									</c:if>
								</c:forEach>						
							</div>
						</c:if>
					</div>
					
				</c:if>
			</div>
		</footer>
	</c:otherwise>
</c:choose>
