<%@include file="/apps/aetna/components/global/global.jsp" %>
<%@page session="false" %>
<%@page import="com.day.cq.wcm.foundation.forms.FormsHelper"%>
<%@taglib prefix="sling" uri="http://sling.apache.org/taglibs/sling/1.0" %>
<%@page import="com.day.cq.wcm.foundation.forms.FormsConstants"%>
<sling:defineObjects/>

<%
	slingRequest.setAttribute("confirmationpage",properties.get("confirmationpage", ""));
	slingRequest.setAttribute("errorpage",properties.get("errorpage", ""));
    FormsHelper.setForwardPath(slingRequest, properties.get("servletpath", ""));
    FormsHelper.setRedirectToReferrer(request, true);
%>