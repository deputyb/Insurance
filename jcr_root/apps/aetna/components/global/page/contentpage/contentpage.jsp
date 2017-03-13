<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<%
    // read the redirect target from the 'page properties' and perform the
    // redirect if WCM is disabled.
    String location = PageUtils.getResolvedPath(properties.get(PageUtils.STR_REDIRECT_TARGET, ""), "", slingRequest, pageContext);
	boolean isRedirectPage = false;

    if (location.length() > 0) {        
    	// check for recursion
        if (!location.equals(currentPage.getPath())) {
        	isRedirectPage = true;
        } else {
            response.sendError(HttpServletResponse.SC_NOT_FOUND);
            return;
        }
    }
    // set doctype
    currentDesign.getDoctype(currentStyle).toRequest(request);
    //determine the language from the page properties set for the site
    String languageCode = PageUtils.getPageLanguage(currentPage).getLanguage();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" lang="<%= languageCode %>" xml:lang="<%= languageCode %>">
	<c:choose>
		<c:when test="<%= isRedirectPage %>">
			<c:if test="${isEditMode}">
				<cq:include script="head.jsp"/>
			</c:if>
			<body>
				<c:choose>
					<c:when test="${isEditMode}">
						On Preview or Publish mode, this page will redirect to <a href="<%= location %>"><%= location %></a>
					</c:when>
					<c:otherwise>
						<script>window.location.href = '<%= location %>';</script>
					</c:otherwise>
				</c:choose>
			</body>
		</c:when>
		<c:otherwise>
			<cq:include script="head.jsp"/>
			<cq:include script="body.jsp"/>
		</c:otherwise>
	</c:choose>
</html>
