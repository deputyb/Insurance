// Aetna Custom Widget to create a zip input market link
Aetna.ZipInputMarketLink = CQ.Ext.extend(CQ.form.CompositeField, {
    
	/**
     * @private
     * @type CQ.Ext.form.Hidden
     */
    hiddenField : null,

    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    linkId : null,
    
    /**
     * @private
     * @type CQ.form.PathField
     */
    url : null,
    
    /**
     * @private
     * @type CQ.form.PathField
     */
    mobileUrl : null,
    
    constructor : function(config) {
        config = config || {};
        var defaults = {
            "border" : true,
            "labelWidth" : 45,
            "layout" : "form"
        };
        config = CQ.Util.applyDefaults(config, defaults);
        Aetna.ZipInputMarketLink.superclass.constructor.call(this, config);
    },

    // overriding CQ.Ext.Component#initComponent
    initComponent : function() {
        Aetna.ZipInputMarketLink.superclass.initComponent.call(this);

        // Hidden field
        this.hiddenField = new CQ.Ext.form.Hidden({
            name : this.name
        });

        this.add(this.hiddenField);

        // Link id
        this.linkId = new CQ.Ext.form.TextField({
            cls : "link-id",
            fieldLabel : "Link ID: ",
            width : "90%",
            maxLength : 90,
            allowBlank : true,
            labelStyle : "margin-left : 5px;",
            listeners : {
            	change : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.add(this.linkId);
        
        // URL
        this.url = new CQ.form.PathField({
            cls : "url",
            fieldLabel : "URL: ",
            allowBlank : true,
            labelStyle : "margin-left : 5px;",
            width : "100%",
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
        
        // Mobile URL
        this.mobileUrl = new CQ.form.PathField({
            cls : "mobileUrl",
            fieldLabel : "Mobile URL: ",
            allowBlank : true,
            labelStyle : "margin-left : 5px;",
            width : "100%",
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
        this.add(this.mobileUrl);
    },

    processInit : function(path, record) {  
    	this.linkId.processInit(path, record);
        this.url.processInit(path, record);
        this.mobileUrl.processInit(path, record);
    },

    setValue : function(value) {
        var entry = value;
        this.linkId.setValue(entry.linkId);
        this.url.setValue(entry.url);
        this.mobileUrl.setValue(entry.mobileUrl);
        this.hiddenField.setValue(value);
    },

    getValue : function() {
        return this.getRawValue();
    },

    getRawValue : function() {
        var entry = {
        	"linkId" : this.linkId.getValue(),
    		"url" : this.url.getValue(),
            "mobileUrl" : this.mobileUrl.getValue()
        };
        return entry;
    },

    updateHidden : function() {
        this.hiddenField.setValue(this.getValue());
    }
    
});
CQ.Ext.reg('aetna.zipinputmarketlink', Aetna.ZipInputMarketLink);   
