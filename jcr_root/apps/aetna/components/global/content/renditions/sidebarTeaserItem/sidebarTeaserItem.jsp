<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<%String subheading = "";%>
<c:choose>
	<c:when test="${not empty properties.subheading}">
	    <c:set scope="request" var="imageName" value="image"/>
        <c:set scope="request" var="dataAttr" value="" />
        <c:set scope="request" var="renditionSize" value="90.90" />
        <c:set scope="request" var="imageURL" value="${properties.imageURL}"/>
        
        <c:if test="${not empty properties.target}">
        	<c:set var="target" value=" target=\"_blank\"" />
        </c:if>
        
        <c:if test="${not empty properties.onclick}">
			<c:set var="onclick" value=" onclick=\"${properties.onclick}\""/>
		</c:if>

		<c:if test="${not empty properties.interstitial}">
			<c:set var="linkClasses" value="${properties.interstitial}"/>
		</c:if>
		
		<a href="<%= PageUtils.getResolvedPath(properties.get("href", ""), "#", slingRequest, pageContext) %>"${target}${onclick}
		<c:if test="${not empty linkClasses}"> class="${linkClasses}"</c:if>>
			<div class="sidebar-cta<c:if test="${not empty properties.hasfirstelementclass}"> first</c:if>">
				<cq:include script="../../utils/render.image.rendition.jsp" />
				<div class="ctaInfo">
					<h4>
                        <%  subheading = properties.get("subheading", "");
							boolean code = StringUtils.contains (subheading,"&#");
							boolean supClass = StringUtils.contains (subheading,"superscript");
							String superscript = "<span class=\"superscript\">";

    						if (code || supClass){
								String [] splittedText = StringUtils.split(subheading);
                                String lastWord = "";
                                String lastText = "";

                                if (code) {
                                    String sm = superscript + "SM" + "</span>";
                                    lastText = StringUtils.replace(splittedText[splittedText.length-1], "&#8480", sm);
                                    lastWord = "<span class=\"nowrap\">" + 
                                            lastText +
                                        "</span>";
                                    subheading = "";
                                    for (int i = 0; i < splittedText.length-1; i++) {
										subheading += " " + splittedText[i];
                                    }

                                    subheading += " " + lastWord;

                                }
                                if (supClass) {
                                    lastWord = "<span class=\"nowrap\">" + 
                                        splittedText[splittedText.length-2] + " " +
                                        splittedText[splittedText.length-1] +
                                        "</span>";
                                    subheading = "";
                                    for (int i = 0; i < splittedText.length-2; i++) {
										subheading += " " + splittedText[i];
                                    }
                                    subheading += " " + lastWord;
                                }
							}%>
                        <span><%= subheading %></span>
					</h4>
					<p>${properties.text}</p>
				</div>
			</div>
		</a>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Click on 'Edit' button to configure the Sidebar Teaser Item component
		</c:if>
	</c:otherwise>
</c:choose>