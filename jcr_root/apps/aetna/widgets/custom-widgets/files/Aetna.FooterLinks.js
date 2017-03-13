// Aetna Custom Widget to create a menu link element
Aetna.FooterLinks = CQ.Ext.extend(CQ.form.CompositeField, {

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
            "labelWidth" : 80,
            "layout" : "form",
            "width" : 600
        };
        config = CQ.Util.applyDefaults(config, defaults);
        Aetna.FooterLinks.superclass.constructor.call(this, config);
    },

    // overriding CQ.Ext.Component#initComponent
    initComponent : function() {
        Aetna.FooterLinks.superclass.initComponent.call(this);

        // Hidden field
        this.hiddenField = new CQ.Ext.form.Hidden({
            name : this.name
        });

        this.add(this.hiddenField);

        // URLS
        this.urls = new CQ.form.MultiField({
            fieldLabel : "URLs per column: ",
            labelStyle : "margin-left : 5px;",

        });
        this.add(this.urls);

    },



    processInit : function(path, record) {  
        this.urls.processInit(path, record);
    },

    setValue : function(value) {
        var link = JSON.parse(value);
        this.urls.setValue(link.urls);      
        this.hiddenField.setValue(value);
    },

    getValue : function() {
        return this.getRawValue();
    },

    getRawValue : function() {

        var link = {
            "urls" : this.urls.getValue(),
        };

        return JSON.stringify(link);
    },

    updateHidden : function() {
        this.hiddenField.setValue(this.getValue());
    }
});
CQ.Ext.reg('aetna.footerlinks', Aetna.FooterLinks);   