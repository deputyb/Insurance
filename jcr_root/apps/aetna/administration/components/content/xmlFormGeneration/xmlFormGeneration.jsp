<%@taglib prefix="sling" uri="http://sling.apache.org/taglibs/sling/1.0" %>
<%@include file="/apps/aetna/components/global/global.jsp" %>

<sling:defineObjects />
<cq:setContentBundle/>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" ng-app>
	<head>
		<c:set var="resourceType" value="<%= resource.getResourceType() %>" />
	    <title>Aetna XML Form Generation</title>
	    <meta http-equiv="Content-Type" content="text/html; utf-8" />
	    <link type="text/css" rel="stylesheet" href="/libs/cq/ui/widgets/themes/default.css">
	    <link type="text/css" rel="stylesheet" href="/libs/cq/tagging/widgets/themes/default.css">
	    <script src="/libs/cq/ui/resources/cq-ui.js" type="text/javascript"></script>
	    
	    <cq:includeClientLib css="cq.packaging"/>
	    <cq:includeClientLib css="aetna.administration.xmlformgeneration"/>
	    <cq:includeClientLib js="aetna.administration.xmlformgeneration"/>
	</head>
	<body ng-controller="XmlFormGenerationController">
	    <div class="cq-packagemgr-ielayoutfixer"></div>
	    <h1 class="cq-packagemgr">Aetna XML Form Generation</h1>
	
		<section>
			<form action="/services/xml-form-generation" enctype="multipart/form-data" method="POST">
				<fieldset>
				    <legend>Configuration</legend>
				    <c:if test="${not empty param.result}">
				    	<c:choose>
					    	<c:when test="${param.result == 'error'}">
								<div class="alert alert-error">
									There was an error processing the file. Please review the parameters you are using
									and try again.
								</div>
							</c:when>
							<c:when test="${param.result == 'success'}">
								<div class="alert alert-success">
									The file was correctly generated. It was automatically saved into CQ5/AEM. A version for 
									it was also created.
								</div>
							</c:when>
						</c:choose>
					</c:if>
				    <div class="row">
					    <div class="span12">
						    <label>Excel file to process</label>
						    <input type="file" ng-model="file" name="file"/>
						    <span class="help-block">Select the file that contains the data to process.</span>
						    <p>&nbsp;</p>
					    </div>
				    </div>
				    <div class="row">
					    <div class="span12">
						    <label>Type of file</label>
						    <select ng-model="fileType" ng-change="changeFileType()" name="fileType">
						    	<option value="tools-manuals">Tools, Manuals &amp; Forms</option>
						    	<option value="small-business">Small Business Plans by State</option>
						    	<option value="sales-reference">Sales Contact Tool</option>
						    	<option value="precertification-list">Precertification Lists</option>
						    	<option value="zip-codes-per-market">ZIP Codes per Market</option>
						    </select>
						    <span class="help-block">Select the type to process according to each tool.</span>
						    <p>&nbsp;</p>
					    </div>
				    </div>
				    <div class="row" ng-show="showExcelSheetsIndexes">
					    <div class="span12">
						    <label>Excel sheets names</label>
						    <input type="text" name="sheetIndexes" class="span6" />
						    <span class="help-block">Type the name of the Excel sheets that contains a unique category separated by a pipe character "|". <br/>
							    For example: Individuals, Families and Sole|Medicare.</span>
						    <p>&nbsp;</p>
					    </div>
				    </div>
				    <div class="row">
				    	<div class="span2 offset10 align-right">
				    		<img ng-show="executionInProgress" src="<%= resource.getResourceType() %>/images/spin.gif" />
				    		<input type="hidden" name="currentPage" value="<%= currentPage.getPath() %>.html" />
				    		<input type="submit" class="btn" value="Execute" />
				    	</div>
				    </div>
				</fieldset>
			</form>
		</section>
	</body>
</html>