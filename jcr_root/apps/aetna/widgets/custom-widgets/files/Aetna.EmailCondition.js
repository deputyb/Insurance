// Aetna Custom Widget to create an email custom condition for forms
Aetna.EmailCondition = CQ.Ext.extend(CQ.form.CompositeField, {

     /**
     * @private
     * @type CQ.Ext.form.Hidden
     */
    hiddenField : null,

    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    inputValue : null,

    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    emailAddress : null,


    constructor : function(config) {
        config = config || {};
        var defaults = {
            "border" : true,
            "labelWidth" : 45,
            "layout" : "form"
        };
        config = CQ.Util.applyDefaults(config, defaults);
        Aetna.EmailCondition.superclass.constructor.call(this, config);
    },

    // overriding CQ.Ext.Component#initComponent
    initComponent : function() {
        Aetna.EmailCondition.superclass.initComponent.call(this);

        // Hidden field
        this.hiddenField = new CQ.Ext.form.Hidden({
            name : this.name
        });

        this.add(this.hiddenField);

        // inputValue
        this.inputValue = new CQ.Ext.form.TextField({
            cls : "inputValue",
            allowBlank : false,
            fieldLabel : "Input Value: ",
            width : "90%",
            maxLength : 90,
            fieldDescription : "Selected value to compare",
            labelStyle : "margin-left : 5px;",
            listeners : {
            	change : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.add(this.inputValue);

        // emailAddress
        this.emailAddress = new CQ.Ext.form.TextField({
            cls : "emailAddress",
            allowBlank : false,
            fieldLabel : "Email Address: ",
            width : "90%",
            maxLength : 500,
            fieldDescription : "Email address to use when the value is selected",
            labelStyle : "margin-left : 5px;",
            listeners : {
            	change : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.add(this.emailAddress);
    },

    processInit : function(path, record) {  
        this.inputValue.processInit(path, record);
        this.emailAddress.processInit(path, record);
    },

    setValue : function(value) {
        var emailCondition = JSON.parse(value);
        this.inputValue.setValue(emailCondition.inputValue);          
        this.emailAddress.setValue(emailCondition.emailAddress);
        this.hiddenField.setValue(value);
    },

    getValue : function() {
        return this.getRawValue();
    },

    getRawValue : function() {

        var emailCondition = {
            "inputValue" : this.inputValue.getValue(),
            "emailAddress" : this.emailAddress.getValue(),
        };

        return JSON.stringify(emailCondition);
    },

    updateHidden : function() {
        this.hiddenField.setValue(this.getValue());
    }
});
CQ.Ext.reg('aetna.emailcondition', Aetna.EmailCondition);   