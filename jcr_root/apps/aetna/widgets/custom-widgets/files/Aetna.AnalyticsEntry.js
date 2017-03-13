// Aetna Custom Widget to create an analytics entry element
Aetna.AnalyticsEntry = CQ.Ext.extend(CQ.form.CompositeField, {

     /**
     * @private
     * @type CQ.Ext.form.Hidden
     */
    hiddenField : null,

    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    htmlCode : null,

    /**
     * @private
     * @type CQ.Ext.form.Selection
     */
    position : null,

    constructor : function(config) {
        config = config || {};
        var defaults = {
            "border" : true,
            "labelWidth" : 45,
            "layout" : "form"
        };
        config = CQ.Util.applyDefaults(config, defaults);
        Aetna.AnalyticsEntry.superclass.constructor.call(this, config);
    },

    // overriding CQ.Ext.Component#initComponent
    initComponent : function() {
        Aetna.AnalyticsEntry.superclass.initComponent.call(this);

        // Hidden field
        this.hiddenField = new CQ.Ext.form.Hidden({
            name : this.name
        });
        this.add(this.hiddenField);

        // htmlCode
        this.htmlCode = new CQ.Ext.form.TextArea({
            cls : "htmlCode",
            fieldLabel : "HTML Code: ",
            allowBlank : false,
            width : "90%",
            height: 100,
            fieldDescription : "Code to include.",
            labelStyle : "margin-left : 5px;",
            listeners : {
            	change : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.add(this.htmlCode);

        // position
        this.position = new CQ.form.Selection({
            cls : "position",
            fieldLabel : "Position: ",
            width : "90%",
            fieldDescription : "Select where do you want to include the code.",
            allowBlank : false,
            labelStyle : "margin-left : 5px;",
            type : 'select',
            options : [
	           {
	               value: "HEAD_TOP",
	               text: "Head Top",
	               qtip: "Head Top"
	           },
	           {
	               value: "HEAD_BOTTOM",
	               text: "Head Bottom",
	               qtip: "Head Bottom"
	           },
	           {
	               value: "BODY_TOP",
	               text: "Body Top",
	               qtip: "Body Top"
	           },
	           {
	               value: "BODY_BOTTOM",
	               text: "Body Bottom",
	               qtip: "Body Bottom"
	           }
            ],
            listeners : {
            	selectionchanged : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.add(this.position);
    },

    processInit : function(path, record) {  
        this.htmlCode.processInit(path, record);
        this.position.processInit(path, record);
    },

    setValue : function(value) {
        var analyticsEntry = JSON.parse(value);
        this.htmlCode.setValue(analyticsEntry.htmlCode);          
        this.position.setValue(analyticsEntry.position);
        this.hiddenField.setValue(value);
    },

    getValue : function() {
        return this.getRawValue();
    },

    getRawValue : function() {
        var analyticsEntry = {
            "htmlCode" : this.htmlCode.getValue(),
            "position" : this.position.getValue(),
        };

        return JSON.stringify(analyticsEntry);
    },

    updateHidden : function() {
        this.hiddenField.setValue(this.getValue());
    }
});
CQ.Ext.reg('aetna.analyticsentry', Aetna.AnalyticsEntry);   