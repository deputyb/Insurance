<%@taglib prefix="sling" uri="http://sling.apache.org/taglibs/sling/1.0" %>
<%@include file="/apps/aetna/components/global/global.jsp" %>

<sling:defineObjects />
<cq:setContentBundle/>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" ng-app>
	<head>
		<c:set var="resourceType" value="<%= resource.getResourceType() %>" />
	    <title>Aetna DAM Renditions Management</title>
	    <meta http-equiv="Content-Type" content="text/html; utf-8" />
	    <link type="text/css" rel="stylesheet" href="/libs/cq/ui/widgets/themes/default.css">
	    <link type="text/css" rel="stylesheet" href="/libs/cq/tagging/widgets/themes/default.css">
	    <script src="/libs/cq/ui/resources/cq-ui.js" type="text/javascript"></script>
	    
	    <cq:includeClientLib css="cq.widgets"/>
	    <cq:includeClientLib css="cq.packaging"/>
	    <cq:includeClientLib css="aetna.administration.dam-renditions-management"/>
	    <cq:includeClientLib js="cq.widgets"/>
	    <cq:includeClientLib js="aetna.administration.dam-renditions-management"/>
	</head>
	<body ng-controller="DamRenditionsManagementController">
	    <div class="cq-packagemgr-ielayoutfixer"></div>
	    <h1 class="cq-packagemgr">Aetna DAM Renditions Management</h1>
	
		<%-- Search Configuration form --%>
		<section>
			<form ng-submit="executeQueryGeneration()">
				<fieldset>
				    <legend>Search Configuration</legend>
				    
				    <div class="row">
					    <div class="span12">
						    <label>Path to search</label>
						    <div id="path-wrapper"></div>
						    <span class="help-block">Select the path in JCR where you want to look for DAM images.</span>
					    </div>
				    </div>
				    <div class="row">
					    <div class="span12">
						    <label>Additional Conditions</label>
						    <textarea ng-model="conditions" rows="4" class="span12"></textarea>
						    <span class="help-block">Type the extra conditions that you want to include in the query in a SQL format. These will be included at the end of the SQL final query.</span>
					    </div>
				    </div>
				    <div class="row">
				    	<div class="span2 offset10 align-right">
				    		<input type="submit" class="btn" value="Generate Query" />
				    	</div>
				    </div>
				</fieldset>
			</form>
		</section>
		
		<%-- Query form --%>
		<section>
			<form ng-submit="executeQuery()">
				<fieldset>
				    <legend>Query</legend>
				    
				    <div class="row">
					    <div class="span12">
						    <label>SQL Query</label>
						    <textarea id="txt-query" ng-model="query" rows="4" class="span12" disabled="disabled"></textarea>
						    <span class="help-block">SQL Query that will be executed.</span>
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
						<span class="help-block">Select the renditions that you want to delete.</span>
					</div>
				</div>
			</fieldset>
		</section>
		
		<section>
			<fieldset ng-show="queryResults.results">
				<legend>Renditions delete</legend>
				
				<span class="help-block">Click on the 'Delete Renditions' button to delete the selected renditions.</span>
				
				<div id="actions-wrapper">
					<button ng-click="prepareRenditionsDeletion()" class="btn btn-danger">Perform Renditions Delete</button>
				</div>
			</fieldset>
		</section>

		<div id="confirmationModal" class="modal hide fade" role="dialog" aria-labelledby="confirmationModalLabel" aria-hidden="true">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
				<h4>Are you sure you want to perform the renditions delele?</h4>
			</div>
			<div class="modal-body">
				<strong>The renditions that will be deleted are:</strong>
				<ul>
					<li ng-repeat="node in selectedNodePaths">
						<span ng-show="node.done"><i class="icon-ok"></i>  </span>{{ node.path }}
					</li>
				</ul>
			</div>
			<div class="modal-footer">
				<div id="tool-results">
					<strong>Results: {{ queryDoneCount }} of {{ selectedNodePaths.length }}</strong>
				</div>
				<div>
					<button class="btn" data-dismiss="modal">Close</button>
					<button ng-click="performRenditionsDeletion()" class="btn btn-danger {{ proceedButtonClass }}">Proceed</button>
				</div>
			</div>
		</div>
	</body>
</html>