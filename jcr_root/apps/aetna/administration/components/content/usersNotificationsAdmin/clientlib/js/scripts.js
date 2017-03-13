$(function() {
	usersNotificationsAdmin.init();
})

/**
 * Class with the different methods related to 
 * Users Notifications Admin tool.
 */
var usersNotificationsAdmin = {
    init: function() {
        this.getTreePanel();
	},

	/**
	 * Method to create required components to shown a search path dialog with tree structure of the site.
	 */
	getTreePanel: function(){

         	this.treePanel = new CQ.Ext.tree.TreePanel({
            border:false,
            autoScroll: true,
            autoShow: true,
            containerScroll: true,
            expanded:true,
            // CQ.Ext.tree.TreeLoader config
            loader: {
                dataUrl:CQ.HTTP.externalize("/bin/wcm/siteadmin/tree.json"),
                requestMethod:"GET",
                // request params
                baseParams: {
                    predicate: "hierarchy",
                    "_charset_": "utf-8"
                },				
                // change request params before loading
                listeners: {
                    beforeload: function(loader, node) {
                        this.baseParams.path = node.getPath();
                    }
                },
                // attributes for all nodes created by the loader
                baseAttrs: {
                    singleClickExpand:true
                    //iconCls:"folder"
                }
            },			
            listeners: {
                click: function(n) {
                    //console.log('click on node ' , n);
                }
            },
        
            // CQ.Ext.tree.TreeNode config
            root: {
                nodeType:"async",
                text:CQ.I18n.getMessage("Select a Path"),
                name:"/content",
                expanded:true
            }
        });

         this.tree = new CQ.Ext.Window({
            id:"pathSearch-tree",
            title:"Select path page to monitor",
            hidden:true,
            layout:"fit",
            collapsible:false,
            renderTo:"CQ",
            width:400,
            height:450,
            y:900,
            closeAction:'hide',
            items: this.treePanel,
            buttons:[{
                text:"Select",
                handler: function() {
                    // set selected path to corresponding input
                    var path = usersNotificationsAdmin.treePanel.getSelectionModel().getSelectedNode().getPath();
                    // tree use double '/', but admin tool only need to save 1, replace // so it saved correctly
                    usersNotificationsAdmin.tree.inputField.val(path.replace('//','/'));
                    usersNotificationsAdmin.tree.hide();
                }	
            },{
                text:"Cancel",
                handler: function() {
                    usersNotificationsAdmin.tree.hide();
                }
            }]
        });

	},

	/**
	 * Method to show the search path dialog. 
	 */
    searchPath: function(element) {
    	inputField = $(element).prevAll('input');
    	var pathToOpen = inputField.val();
        this.treePanel.selectPath(this.treePanel.getRootNode().getPath());
        this.tree.show();
        this.tree.inputField = inputField;
        if(pathToOpen != null && pathToOpen != '') {
        	// add extra '/' because tree panel needs it to display correctly the selected path
            this.treePanel.selectPath('/'+ pathToOpen);
        }
        return null;
	}
}