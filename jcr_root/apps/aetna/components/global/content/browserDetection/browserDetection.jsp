<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:set var="resourcePath" value="<%= resource.getPath() %>" />
<c:set var="inheritBrowserDetectPage" value="${resourcePath != browserDetectPath && noBrowserDetectResource == null}" />



<c:choose>
	<c:when test="${inheritBrowserDetectPage && isEditMode}">
		<div style="color: black;">
			<c:set var="inheritBrowserDetectPage" value="<%= NodeUtils.getResourcePage((String) request.getAttribute("browserDetectPath")) %>" />
			The configuration for Browser Detection is inherited from <a style="color: black;" href="${inheritBrowserDetectPage}">${inheritBrowserDetectPage}</a>.
			To overwrite, click on 'Edit' button and configure the component normally. 
		</div>
	</c:when>
	<c:otherwise>	
		<c:choose>
			<c:when test="${(empty properties.isDisableBrowserDetect) and ((not empty properties.ieText) or (not empty properties.safariText))}">

     			<c:if test="${isEditMode}">
     				Edit Browser Detection message.
     			</c:if>
                <div class="hidden-phone">
                    <div id="badBrowser" class="badBrowser" style="display:none;">
                        <div id="ieMsg" style="display:none;">
							<cq:text property="ieText"/>
                        </div>
                        <div id="safariMsg" style="display:none;">
                            <cq:text property="safariText"/>
                        </div>
                    </div>
                </div>

                <%-- IE - Starts --%>
                <c:set var="versionProp" value="${properties.ieVersions}" />
                <c:set var="ieVersionValues" value="" />
                <c:choose>
                    <c:when test="${fn:length(versionProp) > 0}">
                        <c:forEach var="version" varStatus="versionStatus" items="${versionProp}">
                            <c:if test="${versionStatus.count != 1}">
                                <c:set var="ieVersionValues" value="${ieVersionValues}," />
                            </c:if>
                            <c:set var="ieVersionValues" value="${ieVersionValues}'${version}'" />
                        </c:forEach>
                    </c:when>
                </c:choose>
                <%-- IE - Ends --%>

                <%-- Safari - Starts --%>
                <c:set var="versionProp" value="${properties.safariVersions}" />
                <c:set var="safariVersionValues" value="" />
                <c:choose>
                    <c:when test="${fn:length(versionProp) > 0}">
                        <c:forEach var="version" varStatus="versionStatus" items="${versionProp}">
                            <c:if test="${versionStatus.count != 1}">
                                <c:set var="safariVersionValues" value="${safariVersionValues}," />
                            </c:if>
                            <c:set var="safariVersionValues" value="${safariVersionValues}'${version}'" />
                        </c:forEach>
                    </c:when>
                </c:choose>
                <%-- Safari - Ends --%>
				<cq:includeClientLib css="aetna.browserdetect"/>
                <script>

					var ieNonSupportedVer = [${ieVersionValues}];
					var safariNonSupportedVer = [${safariVersionValues}];

                </script>

				<cq:includeClientLib js="aetna.browserdetect"/>
			</c:when>
     		<c:otherwise>
     			<c:if test="${isEditMode}">
     				There is no configuration set for the Browser Detection message or browser detection is disabled. Click on 'Edit' button to configure the component.
     			</c:if>
     		</c:otherwise>
     	</c:choose>
	</c:otherwise>
</c:choose>