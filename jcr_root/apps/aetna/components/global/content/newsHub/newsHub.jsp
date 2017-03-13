<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />
<c:set var="title" value="${currentStyle.title}" />

<c:if test="${not empty properties.title}">
	<c:set var="title" value="${properties.title}" />
</c:if>

<c:set var="firstNewsText" value="${properties.firstnewstext}" />
<c:set var="firstNewsAlert" value="${properties.firstnewsalert}" />
<c:set var="firstNewsLink" value="${properties.firstnewslink}" />
<c:set var="firstInterstitial" value="${properties.firstinterstitial}" />
<c:set var="onClick" value="${properties.onclick}" />
<c:set var="secondNewsText" value="${properties.secondstaticnewstext}" />
<c:set var="secondNewsAlert" value="${properties.secondstaticnewsalert}" />
<c:set var="secondStaticNewsLink" value="${properties.secondstaticnewslink}" />
<c:set var="secondStaticOnClick" value="${properties.secondstaticonclick}" />
<c:set var="secondInterstitial" value="${properties.secondinterstitial}" />
<c:set var="hideInComponentLinks" value="${properties.hideInComponentLinks}" />


<div class="container-fluid newsTop greenbg">
	<c:choose>
	    <c:when test="${not empty title}">  
			<div class="row-fluid">
	            <div class="span12">
                    <div class="newsTitle"><span>${title}</span></div>
                    <div class="newsPosts">
                    
						<c:if test="${!isEditMode}">
		            		<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);%>
		        		</c:if>
                        <cq:include path="links" resourceType="/libs/foundation/components/parsys"/>

						<c:if test="${empty hideInComponentLinks}">
		                    	<c:if test="${not empty firstNewsText}">
			                        <a class="newsFeed alert ${firstInterstitial}" href="<%= PageUtils.getResolvedPath((String)pageContext.getAttribute("firstNewsLink"), "#", slingRequest, pageContext) %>"
		                            <c:if test="${not empty onClick}"> onclick="${onClick}"</c:if>>
			                        	<c:if test="${not empty firstNewsAlert}"><span class="alertText">ALERT</span></c:if><span class="arrowWhiteSmall">${firstNewsText}</span>
			                        </a>
			                    </c:if>
			                    <c:if test="${not empty secondNewsText}">
			                        <a class="newsFeed ${secondInterstitial}" href="<%= PageUtils.getResolvedPath((String)pageContext.getAttribute("secondStaticNewsLink"), "#", slingRequest, pageContext) %>"
		                            <c:if test="${not empty secondStaticOnClick}"> onclick="${secondStaticOnClick}"</c:if>>
			                        	<c:if test="${not empty secondNewsAlert}"><span class="alertText">ALERT</span></c:if><span class="arrowWhiteSmall">${secondNewsText}</span>
			                        </a>
			                    </c:if>
	                    </c:if>
                        <span class="secondNewsSource newsFeed hidden<c:if test="${not empty currentStyle.firstnewstext}"> withAlert</c:if>" 
	                        <c:if test="${not empty currentStyle.secondnewssource}">
	                        	data-second-news-souce="${currentStyle.secondnewssource}"
	                        </c:if>
	                        <c:if test="${not empty currentStyle.secondonclick}">
	                        	data-second-news-onclick="${currentStyle.secondonclick}"
	                        </c:if>
	                    ></span>
	                    <c:if test="${not empty currentStyle.secondnewstext}">
	                    	<span class="secondNewsFallback newsFeed withAlert hidden">
		                    	<a class="newsLink ${currentStyle.secondinterstitial}" href="<%= PageUtils.getResolvedPath(currentStyle.get("secondnewslink", ""), "#", slingRequest, pageContext) %>"
	                            <c:if test="${not empty currentStyle.secondonclick}"> onclick="${currentStyle.secondonclick}"</c:if>>
		                        	<c:if test="${not empty currentStyle.secondnewsalerttext}"><span class="alertText">${currentStyle.secondnewsalerttext}</span></c:if> ${currentStyle.secondnewstext}
		                        </a>
		                	</span>
		                </c:if>
                    </div>
	            </div>
	        </div>
	    </c:when>
	    <c:otherwise>
	    	<c:if test="${isEditMode}">
				Please go to Design mode to Edit News Hub component
			</c:if>
	    </c:otherwise>
	</c:choose>
</div>