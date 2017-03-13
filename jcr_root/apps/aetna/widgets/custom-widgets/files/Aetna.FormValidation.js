// Aetna Custom Widget to create a form validation element
Aetna.FormValidation = CQ.Ext.extend(CQ.form.CompositeField, {
    
    /**
     * @private
     * @type CQ.Ext.form.Hidden
     */
    hiddenField : null,

    /**
     * @private
     * @type CQ.form.Selection
     */
    validationType : null,
    
    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    equalToField : null,
    
    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    numField : null,
    
    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    errorMessage : null,

    constructor : function(config) {
        config = config || {};
        var defaults = {
            "border" : true,
            "labelWidth" : 45,
            "layout" : "form"
        };
        config = CQ.Util.applyDefaults(config, defaults);
        Aetna.FormValidation.superclass.constructor.call(this, config);
    },

    // overriding CQ.Ext.Component#initComponent
    initComponent : function() {
        Aetna.FormValidation.superclass.initComponent.call(this);

        // Hidden field
        this.hiddenField = new CQ.Ext.form.Hidden({
            name : this.name
        });

        this.add(this.hiddenField);
        
        // Validation Type
        this.validationType = new CQ.form.Selection({
            cls : "validationType",
            fieldLabel : "Type: ",
            width : "90%",
            maxLength : 90,
            fieldDescription : "Select the type of validation to include.",
            allowBlank : true,
            labelStyle : "margin-left : 5px;",
            type : 'select',
            options : [
	           {
	               value: "required",
	               text: "Required field",
	               qtip: "Required field"
	           },
	           {
	               value: "email",
	               text: "Email field",
	               qtip: "Email field"
	           },
	           {
	               value: "equalTo",
	               text: "Equal to field",
	               qtip: "Equal to field"
	           },
	           {
	               value: "number",
	               text: "Number field",
	               qtip: "Number field"
	           },
	           {
	               value: "letterswithbasicpunc",
	               text: "Only text field",
	               qtip: "Only text field"
	           },
	           {
	               value: "minlength",
	               text: "Min length",
	               qtip: "Min length"
	           },
	           {
	               value: "maxlength",
	               text: "Max length",
	               qtip: "Max length"
	           }
            ],
            listeners : {
            	selectionchanged : {
                    scope : this,
                    fn : this.renderHiddenFields
                }
            }
        });
        this.add(this.validationType);
        
        // Equal to field
        this.equalToField = new CQ.Ext.form.TextField({
            cls : "equalToField",
            fieldLabel : "Equal To field: ",
            width : "90%",
            maxLength : 90,
            fieldDescription : "Name of the field that should be the same to the actual one.",
            allowBlank : true,
            labelStyle : "margin-left : 5px;",
            hidden : this.validationType.getValue() !== 'equalTo',
            listeners : {
            	change : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.add(this.equalToField);
        
        // Num field
        this.numField = new CQ.Ext.form.TextField({
            cls : "numField",
            fieldLabel : "Num field: ",
            width : "90%",
            maxLength : 90,
            fieldDescription : "Number with the constraint selected.",
            allowBlank : true,
            labelStyle : "margin-left : 5px;",
            hidden : this.validationType.getValue() !== 'minlength' && this.validationType.getValue() !== 'maxlength' ,
            listeners : {
            	change : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.add(this.numField);

        // Error Message
        this.errorMessage = new CQ.Ext.form.TextField({
            cls : "errorMessage",
            fieldLabel : "Error Message: ",
            width : "90%",
            maxLength : 90,
            fieldDescription : "String that will be displayed as the error message of the validation.",
            allowBlank : false,
            labelStyle : "margin-left : 5px;",
            listeners : {
            	change : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.add(this.errorMessage);
    },

    processInit : function(path, record) {  
        this.validationType.processInit(path, record);
        this.equalToField.processInit(path, record);
        this.numField.processInit(path, record);
        this.errorMessage.processInit(path, record);
    },

    setValue : function(value) {
        var validation = JSON.parse(value);
        this.validationType.setValue(validation.validationType);
        this.equalToField.setValue(validation.equalToField);  
        this.numField.setValue(validation.numField);  
        this.errorMessage.setValue(validation.errorMessage);
        this.hiddenField.setValue(value);
    },

    getValue : function() {
        this.equalToFieldRestriction();
        this.numFieldRestriction();
        return this.getRawValue();
    },

    getRawValue : function() {
        var validation = {
            "validationType" : this.validationType.getValue(),
            "equalToField" : this.equalToField.getValue(),
            "numField" : this.numField.getValue(),
            "errorMessage" : this.errorMessage.getValue()
        };
        return JSON.stringify(validation);
    },
    
    renderHiddenFields : function() {
    	this.equalToFieldRestriction();   
    	this.numFieldRestriction();
    	this.updateHidden();
    },
    
    equalToFieldRestriction : function() {
    	this.equalToField.setVisible(this.validationType.getValue() === 'equalTo');
    },
    
    numFieldRestriction : function() {
    	var validationType = this.validationType.getValue();
    	this.numField.setVisible(validationType === 'minlength' || 
    			validationType === 'maxlength');
    },

    updateHidden : function() {
        this.hiddenField.setValue(this.getValue());
    }
    
});
CQ.Ext.reg('aetna.formvalidation', Aetna.FormValidation);   