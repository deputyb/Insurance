// Aetna Custom Widget to create a menu link element
Aetna.MetaTag = CQ.Ext.extend(CQ.form.CompositeField, {

     /**
     * @private
     * @type CQ.Ext.form.Hidden
     */
    hiddenField : null,

    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    nameTag : null,

    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    content : null,


     constructor : function(config) {
        config = config || {};
        var defaults = {
            "border" : true,
            "labelWidth" : 45,
            "layout" : "form"
        };
        config = CQ.Util.applyDefaults(config, defaults);
        Aetna.MetaTag.superclass.constructor.call(this, config);
    },

    // overriding CQ.Ext.Component#initComponent
    initComponent : function() {
        Aetna.MetaTag.superclass.initComponent.call(this);

        // Hidden field
        this.hiddenField = new CQ.Ext.form.Hidden({
            name : this.name
        });

        this.add(this.hiddenField);

        // nameTag
        this.nameTag = new CQ.Ext.form.TextField({
            cls : "nameTag",
            fieldLabel : "Name: ",
            width : "90%",
            maxLength : 90,
            fieldDescription : "Name property in meta tag",
            labelStyle : "margin-left : 5px;",
            listeners : {
            	change : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.add(this.nameTag);

        //content
        this.content = new CQ.Ext.form.TextField({
            cls : "content",
            fieldLabel : "Content: ",
            width : "90%",
            maxLength : 500,
            fieldDescription : "Content property in meta tag",
            labelStyle : "margin-left : 5px;",
            listeners : {
            	change : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.add(this.content);
    },

    processInit : function(path, record) {  
        this.nameTag.processInit(path, record);
        this.content.processInit(path, record);
    },

    setValue : function(value) {
        var link = JSON.parse(value);
        this.nameTag.setValue(link.nameTag);          
        this.content.setValue(link.content);
        this.hiddenField.setValue(value);
    },

    getValue : function() {
        return this.getRawValue();
    },

    getRawValue : function() {

        var link = {
            "nameTag" : this.nameTag.getValue(),
            "content" : this.content.getValue(),
        };

        return JSON.stringify(link);
    },

    updateHidden : function() {
        this.hiddenField.setValue(this.getValue());
    }
});
CQ.Ext.reg('aetna.metatag', Aetna.MetaTag);   