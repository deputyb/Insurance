Aetna.DDItem = CQ.Ext.extend(CQ.form.CompositeField, {

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
    title : null,

    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    isLink : null,

     constructor : function(config) {
        config = config || {};
        var defaults = {
            "border" : true,
            "labelWidth" : 45,
            "layout" : "form"
        };
        config = CQ.Util.applyDefaults(config, defaults);
        Aetna.DDItem.superclass.constructor.call(this, config);
    },

    // overriding CQ.Ext.Component#initComponent
    initComponent : function() {
        Aetna.DDItem.superclass.initComponent.call(this);

        // Hidden field
        this.hiddenField = new CQ.Ext.form.Hidden({
            name : this.name
        });

        this.add(this.hiddenField);

        // Link type
        this.isLink = new CQ.form.Selection({
            cls : "linkType",
            fieldLabel : "Is Link?: ",
            width : "90%",
            hidden : true,
            maxLength : 90,
            fieldDescription : "Select to display link, deselect otherwise",
            labelStyle : "margin-left : 5px;",
            type : 'checkbox',
            defaultValue : true,
            listeners : {
            	selectionchanged : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.add(this.isLink);

        // URL
        this.url = new CQ.form.PathField({
            cls : "url",
            fieldLabel : "URL: ",
            fieldDescription : "Path to the link",
            labelStyle : "margin-left : 5px;",
            width : 193, 
            listeners : {
                change : {
                    scope : this,
                    fn : this.updateHidden
                },
                dialogclose : {
                	scope : this,
                	fn : this.updateHidden
                },
                dialogselect : {
                	scope : this,
                	fn : this.updateHidden
                },
                statesave : {
                	scope : this,
                	fn : this.updateHidden
                }
            }
        });
        this.add(this.url);

        // Link title
        this.title = new CQ.Ext.form.TextField({
            cls : "linkTitle",
            fieldLabel : "Title: ",
            width : "90%",
            maxLength : 90,
            fieldDescription : "String that will be displayed as item.",
            labelStyle : "margin-left : 5px;",
            listeners : {
            	change : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.add(this.title);


    },



    processInit : function(path, record) {  
        this.url.processInit(path, record);
        this.title.processInit(path, record);
        this.isLink.processInit(path, record);
    },

    setValue : function(value) {
        var link = JSON.parse(value);
        this.url.setValue(link.url);          
        this.title.setValue(link.title);
        this.isLink.setValue(link.isLink);
        this.hiddenField.setValue(value);
    },

    getValue : function() {
        return this.getRawValue();
    },

    getRawValue : function() {

        var link = {
            "url" : this.url.getValue(),
            "title" : this.title.getValue(),
            "isLink" : this.isLink.getValue()[0] == 'true',
        };

        return JSON.stringify(link);
    },

    updateHidden : function() {
        this.hiddenField.setValue(this.getValue());
    }
});
CQ.Ext.reg('aetna.dditem', Aetna.DDItem);   