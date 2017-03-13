<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:if test="${isEditMode}">
	<div>The next link should be used to configure the tool source. It will be hidden in Preview or Publish mode.</div>
</c:if>
<cq:include path="tool-source" resourceType="/apps/aetna/components/global/content/link"/>

<c:choose>
    <c:when test="${not empty properties.resultsqty}">
	    <c:if test="${not empty properties.turnOffFunctionality && not isEditMode}">
			<div class = "hidden-presert-comp">
		</c:if>   
		        <div class="results-static">
					<div class="container-fluid">
						<div class="row-fluid">
							<div class="span12">
					      		<br/><br/>
					      		<h5 class="search-subtitle">CPT<span class="sup">&reg;</span> Codes Searched: </h5>
					      		<ul id="cpt-codes"></ul>
					      		<br><br><hr noshade size="2" color="#e8e8e8"><br>
					    	</div>
					  	</div>
					</div>
		        	<div class="tool">
					    <div class="container-fluid module drop-down-show-hide" id="forms-wrapper">
					      	<div class="row-fluid">
					        	<div class="span12"></div>
					      	</div>
					    </div>
					    <c:forEach var="actualIndex" begin="1" end="${properties.resultsqty}">
					    	<c:if test="${!isEditMode}">
					    		<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY); %>
					    	</c:if>
					    	<cq:include path="result-${actualIndex}" resourceType="aetna/components/global/content/precertSearchResults/precertSearchResultsItem" />
					    </c:forEach>
					    
					    <c:choose>
					    	<c:when test="${!isEditMode}">
					    		<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY); %>
					    	</c:when>
					    	<c:otherwise>
					    		<div style="border: 1px solid black; padding: 5px">
					    			<p>The next Precert Results Item is the default for unfound results</p>
					    	</c:otherwise>
					    </c:choose>
					    <cq:include path="result-default" resourceType="aetna/components/global/content/precertSearchResults/precertSearchResultsDefaultItem" />
					    <c:if test="${isEditMode}">
				    		</div>
				    	</c:if> 
					</div>
				</div>
				<c:if test="${not empty properties.returnlinktext}">
					<div class="container-fluid">    
			   			<div class="row-fluid">
			       			<div class="span12">
			         			<p><a href="<%= PageUtils.getResolvedPath(properties.get("returnlinkurl", ""), "#", slingRequest, pageContext) %>">${properties.returnlinktext}</a><br/><br/></p>
			       			</div>
			     		</div>
					</div>
				</c:if>
   		<c:if test="${not empty properties.turnOffFunctionality && not isEditMode}">
			</div>
		</c:if>
		<c:if test="${not empty properties.turnOffFunctionality}">
			<div class="presert-search-not-available-msg">
				${properties.precertsearchnotavailablemsg}
			</div>   
		</c:if>
        <link rel="stylesheet" type="text/css" href="<%= PageUtils.getMappedAbsoutePath("/common/css/form-xml-tool/css/styles.css",slingRequest) %>" media="screen" />
        <script type="text/javascript" src="<%= PageUtils.getMappedAbsoutePath("/common/js/form-xml-tool/js/form-xml-tool.js",slingRequest) %>"></script>
        <script type="text/javascript" src="<%= PageUtils.getMappedAbsoutePath("/common/js/form-xml-tool/js/precertification-tool.js",slingRequest) %>"></script>
    </c:when>
    <c:otherwise>
        <c:if test="${isEditMode}">
            Double click to configure the Precert Search Results component
        </c:if>
    </c:otherwise>
</c:choose>