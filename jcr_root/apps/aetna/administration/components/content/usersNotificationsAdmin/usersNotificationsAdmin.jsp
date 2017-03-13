<%@taglib prefix="sling" uri="http://sling.apache.org/taglibs/sling/1.0" %>
<%@include file="/apps/aetna/components/global/global.jsp" %>

<sling:defineObjects />
<cq:setContentBundle/>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" ng-app>
	<head>
		<c:set var="resourceType" value="<%= resource.getResourceType() %>" />
	    <title>Aetna Users Notifications Administration</title>
	    <meta http-equiv="Content-Type" content="text/html; utf-8" />
	    <link type="text/css" rel="stylesheet" href="/libs/cq/ui/widgets/themes/default.css">
	    <link type="text/css" rel="stylesheet" href="/libs/cq/tagging/widgets/themes/default.css">
	    <script src="/libs/cq/ui/resources/cq-ui.js" type="text/javascript"></script>
	    
	    <cq:includeClientLib css="cq.widgets"/>
	    <cq:includeClientLib css="cq.packaging"/>
	    <cq:includeClientLib css="aetna.administration.usersnotificationsadmin"/>
	    <cq:includeClientLib js="cq.widgets"/>
	    <cq:includeClientLib js="aetna.administration.usersnotificationsadmin"/>
	</head>
	<body ng-controller="UsersNotificationsAdminController">
	    <div class="cq-packagemgr-ielayoutfixer"></div>
	    <h1 class="cq-packagemgr">Aetna Users Notifications Administration</h1>
	
		<section>
			<p>This console allows to Aetna Administrators to configure which users will receive
			email notifications when a site page is published. </p>
		</section>
		
		<%-- Stored configuration --%>
		<section ng-init="apiEndpointList = '${currentNode.path}.infinity.json'">
			<fieldset>
				<legend>Stored Configuration</legend>
				<div class="row">
					<div class="span12">
						<table id="stored-configuration" class="table table-striped table-hover table-bordered">
							<thead>
								<tr>
									<th>Title</th>
									<th>Users</th>
									<th colspan="2" class="align-center">Operations</th>
								</tr>
							</thead>
							<tbody>
								<tr ng-repeat="configuration in configurations">
									<td>{{ configuration.title }}</td>
									<td>
										<ul>
											<li ng-repeat="email in configuration.emailAddresses">{{ email.address }}</li>
										</ul>
									</td>
									<td class="align-center">
										<input type="button" value="Edit" ng-click="editConfiguration($index)" class="btn btn-warning" />
									</td>
									<td class="align-center">
										<input type="button" value="Delete" ng-click="deleteConfiguration($index)" class="btn btn-danger" />
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="span2 offset10 align-right">
			    		<input type="button" ng-click="addConfiguration()" class="btn" value="Add Configuration" />
			    	</div>
				</div>
			</fieldset>
		</section>
	
		<%-- Add configuration panel --%>
		<section ng-show="showAddConfigurationPanel" ng-init="apiEndpointSave = '${currentNode.path}'">
		    <form id="email-configuration" method="post" action="${currentNode.path}/config-{{ formGuid }}" enctype="multipart/form-data">
                <fieldset>
                    <legend>Add/Edit Configuration</legend>

                    <div class="row">
                        <div class="span12">
                            <label>Title</label>
                            <input type="text" name="title" ng-model="selectedConfiguration.title" class="span8" required />
                            <span class="help-block">Configuration title to identify this notification settings.</span>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="span12">
                            <label>Email Address Sender</label>
                            <input type="text" name="emailSender" ng-model="selectedConfiguration.emailSender" class="span8" required />
                            <span class="help-block">Include the email address sender that will be used for the notification emails.</span>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="span12">
                            <label>Email Subject</label>
                            <input type="text" name="emailSubject" ng-model="selectedConfiguration.emailSubject" class="span8" required />
                            <span class="help-block">Include the email subject that will be used for the notification emails.</span>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="span12">
                            <label>Email Body</label>
                            <textarea name="emailBody" rows="6" ng-model="selectedConfiguration.emailBody" class="span8" required></textarea>
                            <p class="help-block">Include the email body that will be used for the notification emails. You can use the 
                            	next placeholders:</p>
                            <ul>
                            	<li>[page-link] to include the value of the actual published page.</li>
                            	<li>[comment] to include the comment that the user included in the previous step of the workflow.</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="span9">
                            <div class="row">
                                <div class="span4">
                                    <label>Email Addresses</label>
                                </div>
                            </div>
                            <div ng-repeat="emailAddress in selectedConfiguration.emailAddresses" class="row">
                                <div class="span4">
                                    <input ng-model="emailAddress.address" name="emailAddresses" type="text" placeholder="Type the email address" class="span4" required />
                                </div>
                                <div class="span1">
                                    <button ng-click="removeEmailAddress($index)" class="btn" >Remove</button> 
                                </div>
                            </div>
                            <div class="row">
                                <div class="span12">
                                    <span class="help-block">Add the email addresses that will be notified.</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="span12">
			                        <input type="button" value="Add email address" ng-click="addEmailAddress()" class="btn" />
                                </div>
                            </div>
                        </div>
                    </div>
    <!--                 
                    <div class="row property-wrapper">
                        <div class="span12">
                            <label>Path</label>
                            <div id="path-wrapper"></div>
                            <input type="text" name="path" ng-model="selectedConfiguration.path" class="span8" required />
                            <span class="help-block">Select the path that will be listened for page activations. 
                                All the children pages will be listened too.</span>
                        </div>
                    </div>   
-->
                    <div class="row">
                        <div class="span9">
                            <div class="row">
                                <div class="span4">
                                    <label>Paths:</label>
                                </div>
                            </div>
                            <div ng-repeat="path in selectedConfiguration.path" class="row">
                                <div class="span5">
                                    <input ng-model="path.path" name="path" type="text" placeholder="Type the path that will be listened for page activations" class="span4" required />
								    <a href="#" onclick="usersNotificationsAdmin.searchPath(this);return false;">
										<i class="icon-search"></i>
									</a>
                                </div>
                                <div class="span1">
                                    <button ng-click="removePath($index)" class="btn" >Remove</button> 
                                </div>
                            </div>
                            <div class="row">
                                <div class="span12">
                                    <span class="help-block">Add the path that will be listened for page activations.
                                    	All the children pages will be listened too.</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="span12">
			                        <input type="button" value="Add path" ng-click="addPath()" class="btn" />
                                </div>
                            </div>
                        </div>
                    </div>                    
                    
                                     
                    
                    <div class="row">
	                    <div class="span12">
	    					<input type="hidden" name="emailAddresses@TypeHint" value="String[]" />
	    					<input type="hidden" name="path@TypeHint" value="String[]" />
						    <input type="hidden" name=":redirect" value="${currentPage.path}.html" />	                    
	                        <input type="submit" value="Save configuration" class="btn btn-success" />
	                    </div>
                    </div>
                </fieldset>
		    </form>
		</section>
		
		<div id="confirmationModal" class="modal hide fade" role="dialog" aria-labelledby="confirmationModalLabel" aria-hidden="true">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
				<h4>Are you sure you want to delete the configuration?</h4>
			</div>
			<div class="modal-body">
				<p><b>Path:</b></p>
				<ul>
					<li ng-repeat="listPaths in selectedConfiguration.path">{{ listPaths.path }}</li>
				</ul>
				<p><b>Title</b>: {{ selectedConfiguration.title }}</p>			
				<p><b>Email Address Sender</b>: {{ selectedConfiguration.emailSender }}</p>
				<p><b>Email Subject</b>: {{ selectedConfiguration.emailSubject }}</p>
				<p><b>Email Body</b>: {{ selectedConfiguration.emailBody }}</p>
				<p><b>Email Addresses:</b></p>
				<ul>
					<li ng-repeat="email in selectedConfiguration.emailAddresses">{{ email.address }}</li>
				</ul>
			</div>
			<div class="modal-footer">
				<div>
					<form action="${currentNode.path}/{{ selectedConfiguration.id }}" method="post" enctype="multipart/form-data">
						<button class="btn" data-dismiss="modal">Close</button>
						<input type="hidden" value="delete" name=":operation" />
						<input type="hidden" name=":redirect" value="${currentPage.path}.html" />
						<input type="submit" value="Delete" class="btn btn-danger" />
					</form>	
				</div>
			</div>
		</div>
	</body>
</html>