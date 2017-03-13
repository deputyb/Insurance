<%@taglib prefix="sling" uri="http://sling.apache.org/taglibs/sling/1.0" %>
<%@include file="/apps/aetna/components/global/global.jsp" %>

<sling:defineObjects />
<cq:setContentBundle/>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<c:set var="resourceType" value="<%= resource.getResourceType() %>" />
		<c:set var="assetPath" value="<%= slingRequest.getRequestPathInfo().getSuffix() %>" />
	    <title>Aetna DAM Renditions Creation</title>
	    <meta http-equiv="Content-Type" content="text/html; utf-8" />
	    <link type="text/css" rel="stylesheet" href="/libs/cq/ui/widgets/themes/default.css">
	    <link type="text/css" rel="stylesheet" href="/libs/cq/tagging/widgets/themes/default.css">
	    <script src="/libs/cq/ui/resources/cq-ui.js" type="text/javascript"></script>
	    
	    <cq:includeClientLib css="cq.packaging"/>
	    <cq:includeClientLib css="aetna.administration.damrenditionscreation"/>
	    <cq:includeClientLib js="aetna.administration.damrenditionscreation"/>
	</head>
	<body>
		<div class="cq-packagemgr-ielayoutfixer"></div>
	    <h1 class="cq-packagemgr">Aetna DAM Renditions Creation</h1>
  		
  		<section>
			<p>This console allows to Aetna DAM Administrators to create new renditions for the actual asset.</p>
		</section>	
		
		<c:choose>
			<c:when test="${not empty assetPath}">
				<div id="error-msg" class="alert alert-error hidden">
					There was an error creating the rendition. Please try again or contact the system administrator. 
				</div>
				
				<div id="success-msg" class="alert alert-success hidden">
					The rendition was successfully created. Please check it <a href="" target="_blank">here</a>. 
				</div>
				
		  		<section>
		  			<fieldset>
						<legend>Asset Rendition</legend> 
				  		<div class="container-fluid eg-container" id="basic-example">
				    		<div class="row eg-main">
				      			<div>
				        			<div class="eg-wrapper">
				          				<img class="cropper" src="${assetPath}" alt="Picture">
				        			</div>
				      			</div>
				      			<div>
				      				<div class="clearfix">
						      			<div class="docs-toolbar">
											<div class="btn-group">
												<button id="zoomIn" class="btn" type="button" title="Zoom In">
												    <span class="glyphicon icon-zoom-in"></span>
												</button>
												<button id="zoomOut" class="btn" type="button" title="Zoom Out">
												    <span class="glyphicon icon-zoom-out"></span>
												</button>
												<button id="clear" class="btn" type="button" title="Clear">
												    <span class="glyphicon icon-remove"></span>
												</button>
											</div>
										</div>
							    	</div>
				      			</div>
				    		</div>
						</div>
					</fieldset>
				</section>
				
				<section>
		  			<fieldset>
						<legend>Rendition Data</legend>
						<div class="container-fluid eg-data">
							<div class="row">
					       		<div class="input-prepend input-append input-align-right">
						            <span class="add-on">Width</span>
						            <input id="dataWidth" type="text" placeholder="width">
						            <span class="add-on">px</span>
					       		</div>
					       	</div>
					       	<div class = "row">
					       		<div class="input-prepend input-append">
						            <span class="add-on">Height</span>
						            <input id="dataHeight" type="text" placeholder="height">
						            <span class="add-on">px</span>
					       		</div>
					       	</div>
					   		<div class="row">
					   			<div class="input-prepend input-append">
					   				<span class="add-on">Prefix</span>
					   				<input id="dataPrefix" type="text" placeholder="prefix">
					   			</div>
					   		</div>
					       	<div class="row">
								<div>
									<input type="hidden" name="currentPage" value="<%= currentPage.getPath() %>.html" />
						    		<input type="submit" id="prepare-create-rendition" class="btn create-rendition-btn-aling" value="Create Rendition" />
						    	</div>
						    </div>
				     	</div>
					</fieldset>
				</section>
				
				<div id="confirmationModal" class="modal hide fade" role="dialog" aria-labelledby="confirmationModalLabel" aria-hidden="true">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
						<h4>Are you sure you want to create the rendition with the next information?</h4>
					</div>
					<div class="modal-body">
						<ul>
							<li id="modal-asset-path">
								Asset path: <span>${assetPath}</span>
							</li>
							<li id="modal-rendition-name">
								Rendition name: <span></span>
							</li>
							<li id="modal-x">
								X: <span></span>px
							</li>
							<li id="modal-y">
								Y: <span></span>px
							</li>
							<li id="modal-width">
								Width: <span></span>px
							</li>
							<li id="modal-height">
								Height: <span></span>px
							</li>
							<li id="modal-prefix">
								Prefix: <span></span>
							</li>
						</ul>
					</div>
					<div class="modal-footer">
						<div>
							<img id="img-spin" class="hidden" src="<%= resource.getResourceType() %>/images/spin.gif" />
							<button class="btn" data-dismiss="modal">Close</button>
							<button id="create-rendition" class="btn btn-success">Proceed</button>
						</div>
					</div>
				</div>
			</c:when>
			<c:otherwise>
				<div class="alert alert-error">
					There's no asset specified to create a rendition. <br/>
					Please include the asset path as the URL suffix to load the Renditions Creation tool. 
				</div>
			</c:otherwise>
		</c:choose>
	</body>	
</html>