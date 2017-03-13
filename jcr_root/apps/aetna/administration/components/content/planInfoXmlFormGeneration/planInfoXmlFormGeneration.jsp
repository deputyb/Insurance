<%@taglib prefix="sling" uri="http://sling.apache.org/taglibs/sling/1.0" %>
<%@include file="/apps/aetna/components/global/global.jsp" %>

<sling:defineObjects />
<cq:setContentBundle/>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" ng-app>
	<head>
		<c:set var="resourceType" value="<%= resource.getResourceType() %>" />
	    <title>Aetna Plan-Info XML Form Generation</title>
	    <meta http-equiv="Content-Type" content="text/html; utf-8" />
	    <link type="text/css" rel="stylesheet" href="/libs/cq/ui/widgets/themes/default.css">
	    <link type="text/css" rel="stylesheet" href="/libs/cq/tagging/widgets/themes/default.css">
	    <script src="/libs/cq/ui/resources/cq-ui.js" type="text/javascript"></script>
	    
	    <cq:includeClientLib css="cq.packaging"/>
	    <cq:includeClientLib css="aetna.administration.planinfoxmlformgeneration"/>
	    <cq:includeClientLib js="aetna.administration.planinfoxmlformgeneration"/>
	</head>
	<body ng-controller="PlanInfoXmlFormGenerationController">
	    <div class="cq-packagemgr-ielayoutfixer"></div>
	    <h1 class="cq-packagemgr">Aetna Plan-Info XML Form Generation</h1>
	
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
				    	<div class="span2 offset10 align-right">
				    		<input type="hidden" name="fileType" value="hix" />
				    		<input type="hidden" name="currentPage" value="<%= currentPage.getPath() %>.html" />
				    		<input type="submit" class="btn" value="Execute" />
				    	</div>
				    </div>
				</fieldset>
			</form>
		</section>
	</body>
</html>