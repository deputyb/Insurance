/**
 * File for SmartImage widget utils methods.

 */
Aetna.SmartImageUtils = {
	checkRestrictedAccessImage: function(imageComponent) {
		var imageRawValue = imageComponent.getRawValue();
		var imagePath = imageRawValue.replace(/(\[reference:"|" "image\/jpeg" [0-9]*\])/g, '');
		
		// Add the metadata path of the image
		imagePath += '/jcr:content/metadata.json';
		
		CQ.Ext.Ajax.request({
            "url": imagePath,
            "method": "GET",
            "success": function(response, options) {
            	var imageMetadata = JSON.parse(response.responseText);
            	
            	// Check if the image has the restricted access flag activated
            	if (imageMetadata['ae:restrictedaccess'] 
            		&& imageMetadata['ae:restrictedaccess'] == 'true') {
            		var restrictedAccessPaths = imageMetadata['ae:restrictedaccesspaths'];
            		var actualPage = window.location.pathname;
            		var actualPageNoExtension;
            		var invalidMessage = 'The selected image is not valid to be used in this page.';
            		
            		// Check if the page is opened with the iframe            		
            		if (actualPage == '/cf') {
            			actualPage = window.location.hash.replace('#', '');
            		}
            		
            		actualPageNoExtension = actualPage.replace('.html', '');
            		
            		// Check if the restricted access path is just one string
            		if (typeof restrictedAccessPaths == 'string') {
            			restrictedAccessPaths = new Array(restrictedAccessPaths);
            		}
            		
            		// Check if the actual page is under the restricted paths
            		for (var indexPath = 0; indexPath < restrictedAccessPaths.length; indexPath++) {
            			if (restrictedAccessPaths[indexPath] == actualPage || 
            					actualPageNoExtension.indexOf(restrictedAccessPaths[indexPath]) > -1) {
            				return;
            			}
            		}
            		
            		// Show the restricted error message
            		CQ.Ext.Msg.show({
                        title: 'Error',
                        msg: invalidMessage,
                        buttons: CQ.Ext.MessageBox.OK,
                        icon: CQ.Ext.MessageBox.ERROR
                    });
            		
            		// Invalidates the image
            		setTimeout(function() {
            			imageComponent.reset();
            			imageComponent.markInvalid(invalidMessage);
            		}, 300);
            	}
            },
            "failure": function(response, options) {
            	
            }
        });
	}
}