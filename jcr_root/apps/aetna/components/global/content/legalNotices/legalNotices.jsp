<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

	<!-- to style legal notices-->
    <c:if test="${not empty properties.text}" >
        <c:set var="wrapClass" value="bottom-utilities" />
    </c:if>

    <!-- to style footnotes-->
    <c:if test="${not empty properties.rtText}" >
        <c:set var="wrapClass" value="container-fluid module whitebg smallText" />
    </c:if>

	<c:set var="disclaimer" value="disclaimer" />
	<c:set var="footnote" value="footnote" />

<c:choose>
    <c:when test="${empty properties.text && properties.style == disclaimer && empty properties.title}">   
        <!-- Disclaimer -->
        <c:if test="${not empty properties.rtText}" >
        	<div class="footnote">
            <c:if test="${!isEditMode}" >
            	<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
            </c:if>
            <cq:text property="rtText"/>
			</div>
		</c:if>
    </c:when>
    <c:otherwise>
        <c:choose>
            <c:when test="${not empty properties.text || properties.style == footnote || not empty properties.title}">    
    			<div class="container-fluid">
        			<div class="${wrapClass}">    
            			<div class="row-fluid">

                        <!-- Footnotes -->
                    	<c:if test="${not empty properties.rtText}" >
                            <div class="span12">
                            	<c:if test="${!isEditMode}" >
                                	<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
                                </c:if>
                                <cq:text property="rtText"/>
                            </div>
                   		</c:if>

                        <!-- Legal Notices -->
                        <c:if test="${not empty properties.title}" >
                            <div class="span12 legal">
                                 <c:set var="href" value="<%= PageUtils.getResolvedPath(properties.get("link", ""), "#", slingRequest, pageContext) %>" />
                                <a href="${href}" title="legal notices" class="arrowGraySmall"<c:if test="${not empty properties.onclick}"> onclick="${properties.onclick}"</c:if>>
                                    <span class="legalTitle"><cq:text property="title"/></span>
                                    <c:if test="${!isEditMode}" >
                                        <% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
                                    </c:if>
                                    <cq:text property="text"/>
                                </a>
                            </div>
                        </c:if>
        				</div><!-- row-fluid -->
            		</div> <!-- wrapClass -->
    			</div> <!-- container-fluid -->
    		</c:when>
            <c:otherwise>
                <c:if test="${isEditMode}">
                    Double click to configure the Footnote / Legal Notices / Disclaimer area
                </c:if>
            </c:otherwise>
		</c:choose>
    </c:otherwise>
</c:choose>