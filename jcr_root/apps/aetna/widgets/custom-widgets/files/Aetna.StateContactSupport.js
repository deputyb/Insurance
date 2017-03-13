// Aetna Custom Widget to create a US State Contact Support element
Aetna.StateContactSupport = CQ.Ext.extend(CQ.form.CompositeField, {
    
    /**
     * @private
     * @type CQ.Ext.form.Hidden
     */
    hiddenField : null,

    /**
     * @private
     * @type CQ.form.Selection
     */
    state : null,
    
    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    supportText : null,
    
    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    telephone : null,
    
    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    schedule : null,

    constructor : function(config) {
        config = config || {};
        var defaults = {
            "border" : true,
            "labelWidth" : 70,
            "layout" : "form"
        };
        config = CQ.Util.applyDefaults(config, defaults);
        Aetna.StateContactSupport.superclass.constructor.call(this, config);
    },

    // overriding CQ.Ext.Component#initComponent
    initComponent : function() {
        Aetna.StateContactSupport.superclass.initComponent.call(this);

        // Hidden field
        this.hiddenField = new CQ.Ext.form.Hidden({
            name : this.name
        });

        this.add(this.hiddenField);

        // State
        this.state = new CQ.form.Selection({
            cls : "state",
            fieldLabel : "State: ",
            width : "60%",
            fieldDescription : "Select the state to display.",
            allowBlank : false,
            labelStyle : "margin-left : 5px;",
            type : 'select',
            options : [
	           {
	               value: "al",
	               text: "Alabama",
	               qtip: "Alabama"
	           },
	           {
	               value: "ak",
	               text: "Alaska",
	               qtip: "Alaska"
	           },
	           {
	               value: "az",
	               text: "Arizona",
	               qtip: "Arizona"
	           },
	           {
	               value: "ar",
	               text: "Arkansas",
	               qtip: "Arkansas"
	           },
	           {
	               value: "ca",
	               text: "California",
	               qtip: "California"
	           },
	           {
	               value: "co",
	               text: "Colorado",
	               qtip: "Colorado"
	           },
	           {
	               value: "ct",
	               text: "Connecticut",
	               qtip: "Connecticut"
	           },
	           {
	               value: "de",
	               text: "Delaware",
	               qtip: "Delaware"
	           },
	           {
	               value: "fl",
	               text: "Florida",
	               qtip: "Florida"
	           },
	           {
	               value: "ga",
	               text: "Georgia",
	               qtip: "Georgia"
	           },
	           {
	               value: "hi",
	               text: "Hawaii",
	               qtip: "Hawaii"
	           },
	           {
	               value: "id",
	               text: "Idaho",
	               qtip: "Idaho"
	           },
	           {
	               value: "il",
	               text: "Illinois",
	               qtip: "Illinois"
	           },
	           {
	               value: "in",
	               text: "Indiana",
	               qtip: "Indiana"
	           },
	           {
	               value: "ia",
	               text: "Iowa",
	               qtip: "Iowa"
	           },
	           {
	               value: "ks",
	               text: "Kansas",
	               qtip: "Kansas"
	           },
	           {
	               value: "ky",
	               text: "Kentucky",
	               qtip: "Kentucky"
	           },
	           {
	               value: "la",
	               text: "Louisiana",
	               qtip: "Louisiana"
	           },
	           {
	               value: "me",
	               text: "Maine",
	               qtip: "Maine"
	           },
	           {
	               value: "md",
	               text: "Maryland",
	               qtip: "Maryland"
	           },
	           {
	               value: "ma",
	               text: "Massachusetts",
	               qtip: "Massachusetts"
	           },
	           {
	               value: "mi",
	               text: "Michigan",
	               qtip: "Michigan"
	           },
	           {
	               value: "mn",
	               text: "Minnesota",
	               qtip: "Minnesota"
	           },
	           {
	               value: "ms",
	               text: "Mississippi",
	               qtip: "Mississippi"
	           },
	           {
	               value: "mo",
	               text: "Missouri",
	               qtip: "Missouri"
	           },
	           {
	               value: "mt",
	               text: "Montana",
	               qtip: "Montana"
	           },
	           {
	               value: "ne",
	               text: "Nebraska",
	               qtip: "Nebraska"
	           },
	           {
	               value: "nv",
	               text: "Nevada",
	               qtip: "Nevada"
	           },
	           {
	               value: "nh",
	               text: "New Hampshire",
	               qtip: "New Hampshire"
	           },
	           {
	               value: "nj",
	               text: "New Jersey",
	               qtip: "New Jersey"
	           },
	           {
	               value: "nm",
	               text: "New Mexico",
	               qtip: "New Mexico"
	           },
	           {
	               value: "ny",
	               text: "New York",
	               qtip: "New York"
	           },
	           {
	               value: "nc",
	               text: "North Carolina",
	               qtip: "North Carolina"
	           },
	           {
	               value: "nd",
	               text: "North Dakota",
	               qtip: "North Dakota"
	           },
	           {
	               value: "oh",
	               text: "Ohio",
	               qtip: "Ohio"
	           },
	           {
	               value: "ok",
	               text: "Oklahoma",
	               qtip: "Oklahoma"
	           },
	           {
	               value: "or",
	               text: "Oregon",
	               qtip: "Oregon"
	           },
	           {
	               value: "pa",
	               text: "Pennsylvania",
	               qtip: "Pennsylvania"
	           },
	           {
	               value: "ri",
	               text: "Rhode Island",
	               qtip: "Rhode Island"
	           },
	           {
	               value: "sc",
	               text: "South Carolina",
	               qtip: "South Carolina"
	           },
	           {
	               value: "sd",
	               text: "South Dakota",
	               qtip: "South Dakota"
	           },
	           {
	               value: "tn",
	               text: "Tennessee",
	               qtip: "Tennessee"
	           },
	           {
	               value: "tx",
	               text: "Texas",
	               qtip: "Texas"
	           },
	           {
	               value: "ut",
	               text: "Utah",
	               qtip: "Utah"
	           },
	           {
	               value: "vt",
	               text: "Vermont",
	               qtip: "Vermont"
	           },
	           {
	               value: "va",
	               text: "Virginia",
	               qtip: "Virginia"
	           },
	           {
	               value: "wa",
	               text: "Washington",
	               qtip: "Washington"
	           },
	           {
	               value: "wv",
	               text: "West Virginia",
	               qtip: "West Virginia"
	           },
	           {
	               value: "wi",
	               text: "Wisconsin",
	               qtip: "Wisconsin"
	           },
	           {
	               value: "wy",
	               text: "Wyoming",
	               qtip: "Wyoming"
	           },
	           {
	               value: "ad",
	               text: "American Samoa",
	               qtip: "American Samoa"
	           },
	           {
	               value: "dc",
	               text: "District of Columbia",
	               qtip: "District of Columbia"
	           },
	           {
	               value: "gu",
	               text: "Guam",
	               qtip: "Guam"
	           },
	           {
	               value: "mp",
	               text: "Northern Mariana Islands",
	               qtip: "Northern Mariana Islands"
	           },
	           {
	               value: "pr",
	               text: "Puerto Rico",
	               qtip: "Puerto Rico"
	           },
	           {
	               value: "vi",
	               text: "United States Virgin Islands",
	               qtip: "United States Virgin Islands"
	           },
            ],
            listeners : {
            	selectionchanged : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.add(this.state);
        
        // Support Text
        this.supportText = new CQ.Ext.form.TextField({
            cls : "supportText",
            fieldLabel : "Support Text: ",
            width : "95%",
            fieldDescription : "Text to describe support information",
            allowBlank : false,
            labelStyle : "margin-left : 5px;",
            listeners : {
            	change : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.add(this.supportText);
        
        // Telephone
        this.telephone = new CQ.Ext.form.TextField({
            cls : "telephone",
            fieldLabel : "Telephone: ",
            width : "95%",
            fieldDescription : "Text to show the telephone number",
            allowBlank : false,
            labelStyle : "margin-left : 5px;",
            listeners : {
            	change : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.add(this.telephone);
        
        // Schedule
        this.schedule = new CQ.Ext.form.TextField({
            cls : "schedule",
            fieldLabel : "Schedule: ",
            width : "95%",
            fieldDescription : "Text to show the schedule information",
            allowBlank : false,
            labelStyle : "margin-left : 5px;",
            listeners : {
            	change : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.add(this.schedule);        
    },

    processInit : function(path, record) {  
        this.state.processInit(path, record);
        this.supportText.processInit(path, record);
        this.telephone.processInit(path, record);
        this.schedule.processInit(path, record);
    },

    setValue : function(value) {
        var stateInfo = JSON.parse(value);
        this.state.setValue(stateInfo.state);          
        this.supportText.setValue(stateInfo.supportText);
        this.telephone.setValue(stateInfo.telephone);
        this.schedule.setValue(stateInfo.schedule);
        this.hiddenField.setValue(value);
    },

    getValue : function() {
        return this.getRawValue();
    },

    getRawValue : function() {
        var stateInfo = {
            "state" : this.state.getValue(),
            "stateName" : this.state.comboBox.value,
            "supportText" : this.supportText.getValue(),
            "telephone" : this.telephone.getValue(),
            "schedule" : this.schedule.getValue()
        };
        
        return JSON.stringify(stateInfo);
    },

    updateHidden : function() {
        this.hiddenField.setValue(this.getValue());
    }
    
});
CQ.Ext.reg('aetna.stateContactSupport', Aetna.StateContactSupport);   