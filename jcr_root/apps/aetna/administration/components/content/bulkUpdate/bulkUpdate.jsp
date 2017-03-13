<%@taglib prefix="sling" uri="http://sling.apache.org/taglibs/sling/1.0" %>
<%@include file="/apps/aetna/components/global/global.jsp" %>

<sling:defineObjects />
<cq:setContentBundle/>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" ng-app>
	<head>
		<c:set var="resourceType" value="<%= resource.getResourceType() %>" />
	    <title>Aetna Bulk Update</title>
	    <meta http-equiv="Content-Type" content="text/html; utf-8" />
	    <link type="text/css" rel="stylesheet" href="/libs/cq/ui/widgets/themes/default.css">
	    <link type="text/css" rel="stylesheet" href="/libs/cq/tagging/widgets/themes/default.css">
	    <script src="/libs/cq/ui/resources/cq-ui.js" type="text/javascript"></script>
	    
	    <cq:includeClientLib css="cq.packaging"/>
	    <cq:includeClientLib css="aetna.administration.bulkupdate"/>
	    <cq:includeClientLib js="aetna.administration.bulkupdate"/>
	</head>
	<body ng-controller="BulkUpdateController">
	    <div class="cq-packagemgr-ielayoutfixer"></div>
	    <h1 class="cq-packagemgr">Aetna Bulk Update</h1>
	
		<%-- Query form --%>
		<section>
			<form ng-submit="executeQuery()">
				<fieldset>
				    <legend>Search</legend>
				    
				    <div class="row">
					    <div class="span12">
						    <label>SQL Query</label>
						    <textarea ng-model="query" rows="4" class="span12"></textarea>
						    <span class="help-block">Type the SQL Query that you want to request.</span>
					    </div>
				    </div>
				    <div class="row">
				    	<div class="span2 offset10 align-right">
				    		<img ng-show="queryInProgress" src="<%= resource.getResourceType() %>/images/spin.gif" />
				    		<input type="submit" class="btn" value="Execute" />
				    	</div>
				    </div>
				  </fieldset>
			</form>
		</section>
		
		<%-- Query results --%>
		<section>
			<fieldset>
				<legend>{{ resultsMsg }}</legend>
				
				<div class="row">
					<div id="results-wrapper" class="span12">
						<table id="results" class="table table-striped table-hover">
							<thead>
								<tr>
									<th>
										<input type="checkbox" ng-change="selectAllResults()" ng-model="allResultsSelected" />
									</th>
									<th>#</th>
									<th>Node Path</th>
								</tr>
							</thead>
							<tbody>
								<tr ng-repeat="result in queryResults.results"> 
									<td><input type="checkbox" ng-model="result.selected" /></td> 
									<td>{{ $index + 1 }}</td>
									<td>{{ result.path }}</td> 
								</tr>
							</tbody>
						</table>
					</div>
					<div ng-show="queryResults.results" class="span12">
						<span class="help-block">Select the results that you want to update.</span>
					</div>
				</div>
			</fieldset>
		</section>
		
		<section>
			<fieldset ng-show="queryResults.results">
				<legend>Update Information</legend>
				
				<span class="help-block">Add the properties that you want to modify for the selected nodes.</span>
				
				<div ng-repeat="property in properties" class="property-wrapper span9">
					<div class="row">
						<div class="span4">
							<label>Property name</label>
						</div>
						<div class="span4">
							<label>Value</label>
						</div>
					</div>
					<div class="row">
						<div class="span4">
							<input ng-model="property.name" type="text" placeholder="Type the property name" class="span4" />
						</div>
						<div class="span4">
							<input ng-model="property.value" type="text" placeholder="Type the property value" class="span4" />
						</div>
						<div class="span1">
							<button ng-click="removeProperty($index)" class="btn" >Remove</button> 
						</div>
					</div>
				</div>
				
				<div id="add-property-wrapper">
					<button ng-click="addProperty()" class="btn">Add property</button>
					<button ng-click="prepareBulkUpdate()" class="btn btn-success">Perform Bulk Update</button>
				</div>
			</fieldset>
		</section>

		<div id="confirmationModal" class="modal hide fade" role="dialog" aria-labelledby="confirmationModalLabel" aria-hidden="true">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
				<h4>Are you sure you want to perform the bulk update?</h4>
			</div>
			<div class="modal-body">
				<strong>The properties that will be updated are:</strong>
				<ul>
					<li ng-repeat="property in properties">
						{{ property.name }} : {{ property.value }}
					</li>
				</ul>
				<strong>The nodes that will be updated are:</strong>
				<ul>
					<li ng-repeat="node in selectedNodePaths">
						<span ng-show="node.done"><i class="icon-ok"></i>  </span>{{ node.path }}
					</li>
				</ul>
			</div>
			<div class="modal-footer">
				<div id="bulk-update-results">
					<strong>Results: {{ queryDoneCount }} of {{ selectedNodePaths.length }}</strong>
				</div>
				<div>
					<button class="btn" data-dismiss="modal">Close</button>
					<button ng-click="performBulkUpdate()" class="btn btn-success {{ proceedButtonClass }}">Proceed</button>
				</div>
			</div>
		</div>
	</body>
</html>