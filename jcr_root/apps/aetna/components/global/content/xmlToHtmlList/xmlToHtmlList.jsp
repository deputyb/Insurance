<%@include file="/apps/aetna/components/global/global.jsp" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page  trimDirectiveWhitespaces="true"%>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<jsp:useBean scope="request" id="xmlToHtmlController" 
	class="com.aetna.cq.bl.components.xmltohtml.controller.XmlToHtmlController">
	<jsp:setProperty name="xmlToHtmlController" property="xmlToHtmlResource" value="<%= resource %>" />
</jsp:useBean>
<c:choose>
    <c:when test="${not empty properties.xmlSource}"> 
			<c:choose>
			    <c:when test="${fn:length(xmlToHtmlController.pdfUrls) > 0}">
						<c:forEach items="${xmlToHtmlController.pdfUrls}" var="pdfUrl" varStatus="pdfUrlStatus">
								<li><a href="${pdfUrl.urlPath}">${pdfUrl.urlPath}</a></li>
						</c:forEach>
				</c:when>
			    <c:otherwise>
			        <c:if test="${isEditMode}">
			            Selected source file doesn't have any &lt;url&gt; tag, or it is not a valid xml file. <br/>
			            Please select a valid XML file containing &lt;url&gt; tags.
			        </c:if>
			    </c:otherwise>  
		    </c:choose>  
    </c:when>
    <c:otherwise>
	        <c:if test="${isEditMode}">
	            Source XML file not set, edit component to configure the XML file to use.
	        </c:if>
	    </c:otherwise>
</c:choose>
