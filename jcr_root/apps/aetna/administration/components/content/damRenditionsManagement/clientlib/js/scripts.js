$(function() {
	damRenditionsManagementScript.init();
})

/**
 * Class with the different methods related to 
 * DAM Renditinos Management local script.
 */
var damRenditionsManagementScript = {
	/**
	 * Method to initialize the script.
	 */
	init: function() {
		this.renderPathfield();
	},

	/**
	 * Method to render the pathfield where to search for assets.
	 */
	renderPathfield: function() {
		var path = new CQ.form.PathField({
			id: 'search-pathfield',
		    rootPath: "/content/dam",
		    showTitlesInTree: false
		});
		
		path.render('path-wrapper');
	},
	
	/**
	 * Method to process the onchange event of the pathfield.
	 */
	onPathfieldChange: function() {
		$('#txt-query').val($('#search-pathfield').val());
	}
}