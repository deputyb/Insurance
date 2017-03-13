<%@taglib prefix="sling" uri="http://sling.apache.org/taglibs/sling/1.0" %>
<%@include file="/apps/aetna/components/global/global.jsp" %>

<sling:defineObjects />
<cq:setContentBundle/>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" ng-app>
	<head>
		<c:set var="resourceType" value="<%= resource.getResourceType() %>" />
	    <title>Aetna DAM Metadata Import/Export</title>
	    <meta http-equiv="Content-Type" content="text/html; utf-8" />
	    <link type="text/css" rel="stylesheet" href="/libs/cq/ui/widgets/themes/default.css">
	    <link type="text/css" rel="stylesheet" href="/libs/cq/tagging/widgets/themes/default.css">
	    <script src="/libs/cq/ui/resources/cq-ui.js" type="text/javascript"></script>
	    
	    <cq:includeClientLib css="cq.widgets"/>
	    <cq:includeClientLib css="cq.packaging"/>
	    <cq:includeClientLib css="aetna.administration.dam-metadata-import-export"/>
	    <cq:includeClientLib js="cq.widgets"/>
	    <cq:includeClientLib js="aetna.administration.dam-metadata-import-export"/>
	</head>
	<body ng-controller="DamMetadataImportExportController">
	    <div class="cq-packagemgr-ielayoutfixer"></div>
	    <h1 class="cq-packagemgr">Aetna DAM Metadata Import/Export</h1>
	
		<section>
			<p>This console allows to Aetna Administrators to import or export the metadata from the DAM.</p>
		</section>	
		
		<c:if test="${not empty param.result}">
			<div class="row">
				<div class="span12">
			    	<c:choose>
				    	<c:when test="${param.result == 'error'}">
							<div class="alert alert-error">
								There was an error processing the file. Please review it and try again.
							</div>
						</c:when>
						<c:when test="${param.result == 'success'}">
							<div class="alert alert-success">
								The file was correctly imported. Please check the DAM assets for the results of the process.
							</div>
						</c:when>
					</c:choose>
				</div>
			</div>
		</c:if>
					
		<section>
			<fieldset>
				<legend>Operation</legend>
				<div class="row">
					<div class="span12">
						<label class="radio">
							<input type="radio" name="operation" value="import" ng-click="changePanelDisplay('import')" />
							Import
						</label>
						<label class="radio">
							<input type="radio" name="operation" value="export" ng-click="changePanelDisplay('export')" />
							Export
						</label>
						<span class="help-block">Select the operation to perform.</span>
					</div>
				</div>
			</fieldset>
		</section>
		
		<%-- Stored assets metadata --%>
		<section ng-init="apiEndpointList = '/services/aetna/dam/metadata'" ng-show="panelsDisplay.export">
			<fieldset>
				<legend>Export Asset Metadata</legend>
				<div class="row">
					<div class="span12">
						<label>Path for export operation</label>
                        <input type="text" name="path-for-export" ng-model="exportConfig.path" class="span8" required />
                        <span class="help-block">Include the path to use as the base for export procedure</span>
					</div>
				</div>
				<div class="row">
					<div class="span12">
						<label class="radio">
							<input type="radio" name="exportType" ng-model="exportConfig.exportType" value="json" />
							See results here
						</label>
						<label class="radio">
							<input type="radio" name="exportType" ng-model="exportConfig.exportType" value="excel" />
							Export to Excel file
						</label>
						<span class="help-block">Select the operation to perform.</span>
					</div>
				</div>
				<div class="row">
					<div class="span2 offset10 align-right">
						<img ng-show="queryInProgress" src="<%= resource.getResourceType() %>/images/spin.gif" />
			    		<input type="button" ng-click="executeExport()" class="btn" value="Export" />
			    	</div>
			    </div>
				<div class="row" ng-show="displayExportResults">
					<div id="results-wrapper" class="span12">
						<table class="table table-striped table-hover table-bordered">
							<thead>
								<tr>
									<th>Path</th>
									<th>Identifier</th>
									<th>Title</th>
									<th>Description</th>
								</tr>
							</thead>
							<tbody>
								<tr ng-repeat="asset in assets">
									<td>{{ asset.path }}</td> 
									<td>{{ asset.identifier }}</td>
									<td>{{ asset.title }}</td>
									<td>{{ asset.description }}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</fieldset>
		</section>
		
		<%-- Import assets metadata --%>
		<section ng-show="panelsDisplay.import">
			<fieldset>
				<legend>Import Asset Metadata</legend>
				<form action="{{ apiEndpointList }}" enctype="multipart/form-data" method="post">
					<div class="row">
						<div class="span12">
							<label>File</label>
	                        <input type="file" name="file" />
							<span class="help-block">Select the file with the assets metadata to import.</span>
						</div>
					</div>
					<div class="row">
						<div class="span2 offset10 align-right">
							<input type="hidden" name="currentPage" value="<%= currentPage.getPath() %>.html" />
				    		<input type="submit" class="btn" value="Import" />
				    	</div>
				    </div>
				</form>
			</fieldset>
		</section>
	</body>
</html>