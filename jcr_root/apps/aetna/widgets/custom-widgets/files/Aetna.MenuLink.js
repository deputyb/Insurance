// Aetna Custom Widget to create a menu link element
Aetna.MenuLink = CQ.Ext.extend(CQ.form.CompositeField, {
    
    /**
     * @private
     * @type CQ.Ext.form.Hidden
     */
    hiddenField : null,

    /**
     * @private
     * @type CQ.form.PathField
     */
    url : null,
    
    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    linkTitle : null,
    
    /**
     * @private
     * @type CQ.form.Selection
     */
    linkType : null,
    
    /**
     * @private
     * @type CQ.form.Selection
     */
    linkTarget : null,
    
    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    onClick : null,

    constructor : function(config) {
        config = config || {};
        var defaults = {
            "border" : true,
            "labelWidth" : 45,
            "layout" : "form"
        };
        config = CQ.Util.applyDefaults(config, defaults);
        Aetna.MenuLink.superclass.constructor.call(this, config);
    },

    // overriding CQ.Ext.Component#initComponent
    initComponent : function() {
        Aetna.MenuLink.superclass.initComponent.call(this);

        // Hidden field
        this.hiddenField = new CQ.Ext.form.Hidden({
            name : this.name
        });

        this.add(this.hiddenField);

        // URL
        this.url = new CQ.form.PathField({
            cls : "url",
            fieldLabel : "URL: ",
            fieldDescription : "Path of the page targeted by the link",
            allowBlank : false,
            labelStyle : "margin-left : 5px;",
            width : 193, 
            listeners : {
                change : {
                    scope : this,
                    fn : this.updateHidden
                },
                dialogselect : {
                	scope : this,
                	fn : this.updateHidden
                }
            }
        });
        this.add(this.url);
        
        // Link title
        this.linkTitle = new CQ.Ext.form.TextField({
            cls : "linkTitle",
            fieldLabel : "Title: ",
            width : "90%",
            maxLength : 90,
            fieldDescription : "String that will be displayed as the link title.",
            allowBlank : false,
            labelStyle : "margin-left : 5px;",
            listeners : {
            	change : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.add(this.linkTitle);

        // Link type
        this.linkType = new CQ.form.Selection({
            cls : "linkType",
            fieldLabel : "Type: ",
            width : "90%",
            maxLength : 90,
            fieldDescription : "Select the type of the actual link.",
            allowBlank : false,
            labelStyle : "margin-left : 5px;",
            type : 'select',
            options : [
	           {
	               value: "regular",
	               text: "Regular Link",
	               qtip: "Regular Link"
	           },
	           {
	               value: "megaMenuOpenRegular",
	               text: "Mega Menu Open Regular Link",
	               qtip: "Mega Menu Open Regular Link"
	           },
	           {
	               value: "megaMenuOpen",
	               text: "Mega Menu Open Main Link",
	               qtip: "Mega Menu Open Main Link"
	           },
               {
                   value: "megaMenuShop",
                   text: "Mega Menu Shop Link",
                   qtip: "Mega Menu Shop Link"
               }

            ],
            listeners : {
            	selectionchanged : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.add(this.linkType);
        
        // Link target
        this.linkTarget = new CQ.form.Selection({
            cls : "linkTarget",
            fieldLabel : "Target: ",
            width : "90%",
            maxLength : 90,
            fieldDescription : "Select the target of the actual link.",
            allowBlank : true,
            labelStyle : "margin-left : 5px;",
            type : 'select',
            options : [
	           {
	               value: "_blank",
	               text: "_blank",
	               qtip: "_blank"
	           },
	           {
	               value: "_parent",
	               text: "_parent",
	               qtip: "_parent"
	           },
	           {
	               value: "_self",
	               text: "_self",
	               qtip: "_self"
	           },
	           {
	               value: "_top",
	               text: "_top",
	               qtip: "_top"
	           }
            ],
            listeners : {
            	selectionchanged : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.add(this.linkTarget);
        
        // onClick event
        this.onClick = new CQ.Ext.form.TextField({
            cls : "onClick",
            fieldLabel : "onClick: ",
            width : "90%",
            maxLength : 350,
            fieldDescription : "JavaScript code to execute on click.",
            allowBlank : true,
            labelStyle : "margin-left : 5px;",
            listeners : {
            	change : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.add(this.onClick);
    },

    processInit : function(path, record) {  
        this.url.processInit(path, record);
        this.linkTitle.processInit(path, record);
        this.linkType.processInit(path, record);
        this.linkTarget.processInit(path, record);
        this.onClick.processInit(path, record);
    },

    setValue : function(value) {
        var link = JSON.parse(value);
        this.url.setValue(link.url);          
        this.linkTitle.setValue(link.linkTitle);
        this.linkType.setValue(link.linkType);
        this.linkTarget.setValue(link.linkTarget);
        this.onClick.setValue(link.onClick);
        this.hiddenField.setValue(value);
    },

    getValue : function() {
        return this.getRawValue();
    },

    getRawValue : function() {
        var link = {
            "url" : this.url.getValue(),
            "linkTitle" : this.linkTitle.getValue(),
            "linkType" : this.linkType.getValue(),
            "linkTarget" : this.linkTarget.getValue(),
            "onClick" : this.onClick.getValue()
        };
        return JSON.stringify(link);
    },

    updateHidden : function() {
        this.hiddenField.setValue(this.getValue());
    }
    
});
CQ.Ext.reg('aetna.menulink', Aetna.MenuLink);   