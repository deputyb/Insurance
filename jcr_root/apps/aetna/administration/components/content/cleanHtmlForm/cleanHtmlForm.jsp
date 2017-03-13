<%@taglib prefix="sling" uri="http://sling.apache.org/taglibs/sling/1.0" %>
<%@include file="/apps/aetna/components/global/global.jsp" %>

<sling:defineObjects />
<cq:setContentBundle/>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" ng-app>
	<head>
		<c:set var="resourceType" value="<%= resource.getResourceType() %>" />
	    <title>Aetna Clean HTML Form</title>
	    <meta http-equiv="Content-Type" content="text/html; utf-8" />
	    <link type="text/css" rel="stylesheet" href="/libs/cq/ui/widgets/themes/default.css">
	    <link type="text/css" rel="stylesheet" href="/libs/cq/tagging/widgets/themes/default.css">
	    <script src="/libs/cq/ui/resources/cq-ui.js" type="text/javascript"></script>
	    
	    <cq:includeClientLib css="cq.packaging"/>
	    <cq:includeClientLib css="aetna.administration.cleanHtmlForm"/>
	    <cq:includeClientLib js="aetna.administration.cleanHtmlForm"/>
	</head>
	<body>
	    <div class="cq-packagemgr-ielayoutfixer"></div>
	    <h1 class="cq-packagemgr">Aetna Clean HTML Form</h1>
	
		<%-- Original form --%>
		<section>
			<form action="#">
				<fieldset>
				    <legend>Original Form</legend>
				    
				    <div class="row">
					    <div class="span12">
						    <label>HTML Code</label>
						    <textarea id="originalHtml" rows="15" class="span12"></textarea>
						    <span class="help-block">Copy the original form HTML code to be formatted.</span>
					    </div>
				    </div>
				    
				    <div class="row">
				    	<div class="span12">
					    	<input type="checkbox" name="contentWrapper" checked value="cw" id="contentWrapper">
							<label for="contentWrapper">Add wrappers for desktop and mobile</label>
						</div>
				    </div>
				    <div class="row">
				    	<div class="span12">
					    	<input type="checkbox" name="keepTable" value="kt" id="keepTable">
							<label for="keepTable">Keep Tables (Only replace dropdowns and radios)</label>
						</div>
				    </div>				    
				    
				    <div class="row">
				    	<div class="span2 offset10 align-right">
				    		<input type="submit" class="btn" value="Process HTML" />
				    	</div>
				    </div>				    
			  </fieldset>
			</form>
		</section>
		
		<%-- Formatted form --%>
		<section>
			<fieldset>
				<legend>Result</legend>
				
		    	<div class="row">
				    <div class="span12">
					    <label>Formatted HTML Code</label>
					    <textarea id="resultHtml" rows="15" class="span12"></textarea>
					    <span class="help-block">Copy this HTML code to the HTML tool on the cq form page.</span>
				    </div>
			    </div>
			</fieldset>
		</section>
	</body>
</html>