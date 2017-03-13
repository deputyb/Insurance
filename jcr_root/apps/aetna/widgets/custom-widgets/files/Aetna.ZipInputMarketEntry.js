// Aetna Custom Widget to create a zip input market entry
Aetna.ZipInputMarketEntry = CQ.Ext.extend(CQ.form.CompositeField, {
    
	/**
	 * String with the type of widget to render.
	 * Possible values: shop, login
	 */
	type : '',
	
    /**
     * @private
     * @type CQ.Ext.form.Hidden
     */
    hiddenField : null,

    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    segmentName : null,
    
    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    text : null,
    
    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    textEs : null,
        
    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    linkTitle : null,
    
    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    linkTitleEs : null,
    
    /**
     * @private
     * @type CQ.form.PathField
     */
    url : null,
    
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
    
    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    mobileText : null,
    
    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    mobileTextEs : null,
    
    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    mobileLinkTitle : null,
    
    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    mobileLinkTitleEs : null,

    /**
     * @private
     * @type CQ.form.PathField
     */
    mobileUrl : null,
    
    /**
     * @private
     * @type CQ.form.Selection
     */
    mobileLinkTarget : null,

    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    mobileOnClick : null,
    
    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    mobile2LinkTitle : null,
    
    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    mobile2LinkTitleEs : null,

    /**
     * @private
     * @type CQ.form.PathField
     */
    mobile2Url : null,
    
    /**
     * @private
     * @type CQ.form.Selection
     */
    mobile2LinkTarget : null,

    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    mobile2OnClick : null,
    
    /**
      * @type CQ.form.PathField
     */
    loginUrl : null,
    
    /**
     * @private
     * @type CQ.form.PathField
     */
    mobileLoginUrl : null,
    
    /**
     * @private
     * @type CQ.form.MultiField
     */
    loginDeepLinks : null,
    
    isShopModule : false,
    isLoginModule : false,
    isLanguageEnglish : false, 
    
    constructor : function(config) {
        config = config || {};
        var defaults = {
            "border" : true,
            "labelWidth" : 45,
            "layout" : "form"
        };
        config = CQ.Util.applyDefaults(config, defaults);
        Aetna.ZipInputMarketEntry.superclass.constructor.call(this, config);
    },

    // overriding CQ.Ext.Component#initComponent
    initComponent : function() {
        Aetna.ZipInputMarketEntry.superclass.initComponent.call(this);

        this.isShopModule = this.type == 'shop';
        this.isLoginModule = this.type == 'login';
        this.isLanguageEnglish = Aetna.language == 'en';
        
        // Hidden field
        this.hiddenField = new CQ.Ext.form.Hidden({
            name : this.name
        });

        this.add(this.hiddenField);

        // Segment name
        this.segmentName = new CQ.Ext.form.TextField({
            cls : "segmen-name",
            fieldLabel : "Segment Name: ",
            width : "90%",
            maxLength : 90,
            fieldDescription : "Name of the segment to map.",
            allowBlank : false,
            labelStyle : "margin-left : 5px;",
            listeners : {
            	change : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.add(this.segmentName);
        
        // Text
        this.text = new CQ.Ext.form.TextField({
            cls : "text",
            fieldLabel : "Text: ",
            width : "90%",
            maxLength : 90,
            fieldDescription : "String that will be displayed as the main message.",
            allowBlank : true,
            labelStyle : "margin-left : 5px;",
            listeners : {
            	change : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.text.setVisible(this.isShopModule && this.isLanguageEnglish);
        this.add(this.text);
        
        // Spanish Text
        this.textEs = new CQ.Ext.form.TextField({
            cls : "text",
            fieldLabel : "Spanish Text: ",
            width : "90%",
            maxLength : 90,
            fieldDescription : "String that will be displayed as the main message in Spanish.",
            allowBlank : true,
            labelStyle : "margin-left : 5px;",
            listeners : {
            	change : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.textEs.setVisible(this.isShopModule && !this.isLanguageEnglish);
        this.add(this.textEs);
        
        // Link title
        this.linkTitle = new CQ.Ext.form.TextField({
            cls : "linkTitle",
            fieldLabel : "Link Title: ",
            width : "90%",
            maxLength : 90,
            fieldDescription : "String that will be displayed as the link title.",
            allowBlank : true,
            labelStyle : "margin-left : 5px;",
            listeners : {
            	change : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.linkTitle.setVisible(this.isShopModule && this.isLanguageEnglish);
        this.add(this.linkTitle);
        
        // Spanish Link title
        this.linkTitleEs = new CQ.Ext.form.TextField({
            cls : "linkTitle",
            fieldLabel : "Spanish Link Title: ",
            width : "90%",
            maxLength : 90,
            fieldDescription : "String that will be displayed as the link title in Spanish.",
            allowBlank : true,
            labelStyle : "margin-left : 5px;",
            listeners : {
            	change : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.linkTitleEs.setVisible(this.isShopModule && !this.isLanguageEnglish);
        this.add(this.linkTitleEs);
        
        // URL
        this.url = new CQ.form.PathField({
            cls : "url",
            fieldLabel : "URL: ",
            fieldDescription : "Path of the page targeted by the link. Use [Zip] to use the dynamic value from the user.",
            allowBlank : true,
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
        this.url.setVisible(this.isShopModule);
        this.add(this.url);

        // Link target
        this.linkTarget = new CQ.form.Selection({
            cls : "linkTarget",
            fieldLabel : "Open in a new tab/window: ",
            fieldDescription : "Check it to open the link in a new tab/window.",
            width : "90%",
            maxLength : 90,
            allowBlank : true,
            labelStyle : "margin-left : 5px;",
            type : 'checkbox',
            listeners : {
            	selectionchanged : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.linkTarget.setVisible(this.isShopModule);
        this.add(this.linkTarget);
        
        // onClick event
        this.onClick = new CQ.Ext.form.TextArea({
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
        this.onClick.setVisible(this.isShopModule);
        this.add(this.onClick);
        
        // Mobile Text
        this.mobileText = new CQ.Ext.form.TextField({
            cls : "mobile-text",
            fieldLabel : "Mobile Text: ",
            width : "90%",
            maxLength : 90,
            fieldDescription : "String that will be displayed as the main message in the mobile layout.",
            allowBlank : true,
            labelStyle : "margin-left : 5px;",
            listeners : {
            	change : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.mobileText.setVisible(this.isShopModule && this.isLanguageEnglish);
        this.add(this.mobileText);
        
        // Spanish Mobile Text
        this.mobileTextEs = new CQ.Ext.form.TextField({
            cls : "mobile-text",
            fieldLabel : "Spanish Mobile Text: ",
            width : "90%",
            maxLength : 90,
            fieldDescription : "String that will be displayed as the main message in the mobile layout in Spanish.",
            allowBlank : true,
            labelStyle : "margin-left : 5px;",
            listeners : {
            	change : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.mobileTextEs.setVisible(this.isShopModule && !this.isLanguageEnglish);
        this.add(this.mobileTextEs);
        
        // Mobile Link title
        this.mobileLinkTitle = new CQ.Ext.form.TextField({
            cls : "mobileLinkTitle",
            fieldLabel : "Mobile Link Title: ",
            width : "90%",
            maxLength : 90,
            fieldDescription : "String that will be displayed as the link title in the mobile layout.",
            allowBlank : true,
            labelStyle : "margin-left : 5px;",
            listeners : {
            	change : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.mobileLinkTitle.setVisible(this.isShopModule && this.isLanguageEnglish);
        this.add(this.mobileLinkTitle);
        
        // Spanish Mobile Link title
        this.mobileLinkTitleEs = new CQ.Ext.form.TextField({
            cls : "mobileLinkTitle",
            fieldLabel : "Spanish Mobile Link Title: ",
            width : "90%",
            maxLength : 90,
            fieldDescription : "String that will be displayed as the link title in the mobile layout in Spanish.",
            allowBlank : true,
            labelStyle : "margin-left : 5px;",
            listeners : {
            	change : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.mobileLinkTitleEs.setVisible(this.isShopModule && !this.isLanguageEnglish);
        this.add(this.mobileLinkTitleEs);
        
        // Mobile URL
        this.mobileUrl = new CQ.form.PathField({
            cls : "mobileUrl",
            fieldLabel : "Mobile URL: ",
            fieldDescription : "Path of the page targeted by the link in the mobile layout. Use [Zip] to use the dynamic value from the user.",
            allowBlank : true,
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
        this.mobileUrl.setVisible(this.isShopModule);
        this.add(this.mobileUrl);
        
        // Mobile Link target
        this.mobileLinkTarget = new CQ.form.Selection({
            cls : "mobileLinkTarget",
            fieldLabel : "Mobile link new tab/window: ",
            fieldDescription : "Check it to open the mobile link in a new tab/window.",
            width : "90%",
            maxLength : 90,
            allowBlank : true,
            labelStyle : "margin-left : 5px;",
            type : 'checkbox',
            listeners : {
            	selectionchanged : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.mobileLinkTarget.setVisible(this.isShopModule);
        this.add(this.mobileLinkTarget);
        
        // Mobile onClick event
        this.mobileOnClick = new CQ.Ext.form.TextArea({
            cls : "mobileOnClick",
            fieldLabel : "Mobile onClick: ",
            width : "90%",
            maxLength : 350,
            fieldDescription : "JavaScript code to execute on click on mobile layout.",
            allowBlank : true,
            labelStyle : "margin-left : 5px;",
            listeners : {
            	change : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.mobileOnClick.setVisible(this.isShopModule);
        this.add(this.mobileOnClick);
       
        // Mobile 2 Link title
        this.mobile2LinkTitle = new CQ.Ext.form.TextField({
            cls : "mobile2LinkTitle",
            fieldLabel : "Second Mobile Link Title: ",
            width : "90%",
            maxLength : 90,
            fieldDescription : "String that will be displayed as the link title in the mobile layout.",
            allowBlank : true,
            labelStyle : "margin-left : 5px;",
            listeners : {
            	change : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.mobile2LinkTitle.setVisible(this.isShopModule && this.isLanguageEnglish);
        this.add(this.mobile2LinkTitle);
        
        // Spanish Mobile 2 Link title
        this.mobile2LinkTitleEs = new CQ.Ext.form.TextField({
        	hidden : this.isLoginModule && this.isLanguageEnglish,
            cls : "mobile2LinkTitle",
            fieldLabel : "Spanish Second Mobile Link Title: ",
            width : "90%",
            maxLength : 90,
            fieldDescription : "String that will be displayed as the link title in the mobile layout in Spanish.",
            allowBlank : true,
            labelStyle : "margin-left : 5px;",
            listeners : {
            	change : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.mobile2LinkTitleEs.setVisible(this.isShopModule && !this.isLanguageEnglish);
        this.add(this.mobile2LinkTitleEs);
        
        // Mobile 2URL
        this.mobile2Url = new CQ.form.PathField({
            cls : "mobile2Url",
            fieldLabel : "Second Mobile URL: ",
            fieldDescription : "Path of the page targeted by the link in the mobile layout. Use [Zip] to use the dynamic value from the user.",
            allowBlank : true,
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
        this.mobile2Url.setVisible(this.isShopModule);
        this.add(this.mobile2Url);
        
        // Mobile 2 Link target
        this.mobile2LinkTarget = new CQ.form.Selection({
            cls : "mobile2LinkTarget",
            fieldLabel : "Second Mobile link new tab/window: ",
            fieldDescription : "Check it to open the mobile link in a new tab/window.",
            width : "90%",
            maxLength : 90,
            allowBlank : true,
            labelStyle : "margin-left : 5px;",
            type : 'checkbox',
            listeners : {
            	selectionchanged : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.mobile2LinkTarget.setVisible(this.isShopModule);
        this.add(this.mobile2LinkTarget);
        
        // Mobile 2 onClick event
        this.mobile2OnClick = new CQ.Ext.form.TextArea({
            cls : "mobile2OnClick",
            fieldLabel : "Second Mobile onClick: ",
            width : "90%",
            maxLength : 350,
            fieldDescription : "JavaScript code to execute on click on mobile layout.",
            allowBlank : true,
            labelStyle : "margin-left : 5px;",
            listeners : {
            	change : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.mobile2OnClick.setVisible(this.isShopModule);
        this.add(this.mobile2OnClick);

        // Login URL
        this.loginUrl = new CQ.form.PathField({
            cls : "loginUrl",
            fieldLabel : "Login URL: ",
            fieldDescription : "Path of the page targeted by the login link. Use [Zip] to use the dynamic value from the user.",
            allowBlank : true,
            labelStyle : "margin-left : 5px;",
            width : '100%', 
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
        this.loginUrl.setVisible(this.isLoginModule);
        this.add(this.loginUrl);
        
        // Mobile Login URL
        this.mobileLoginUrl = new CQ.form.PathField({
            cls : "mobileLoginUrl",
            fieldLabel : "Mobile Login URL: ",
            fieldDescription : "Path of the page targeted by the mobile login link. Use [Zip] to use the dynamic value from the user.",
            allowBlank : true,
            labelStyle : "margin-left : 5px;",
            width : '100%',
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
        this.mobileLoginUrl.setVisible(this.isLoginModule);
        this.add(this.mobileLoginUrl);
        
        // Login Deeplinks
        this.loginDeepLinks = new CQ.form.MultiField({
            cls : "loginDeepLinks",
            fieldLabel : "Login Deeplinks: ",
            fieldDescription : "List of Login Deep links.",
            allowBlank : true,
            labelStyle : "margin-left : 5px;",
            width : '85%', 
            fieldConfig : {
            	xtype : 'aetna.zipinputmarketlink'
            },
            listeners : {
                change : {
                    scope : this,
                    fn : this.updateHidden
                },
                valid : {
                	scope : this,
                	fn : this.updateHidden
                }
            }
        });
        this.loginDeepLinks.setVisible(this.isLoginModule);
        this.add(this.loginDeepLinks);
    },

    processInit : function(path, record) {  
    	this.segmentName.processInit(path, record);
    	this.text.processInit(path, record);
    	this.textEs.processInit(path, record);
        this.linkTitle.processInit(path, record);
        this.linkTitleEs.processInit(path, record);
        this.url.processInit(path, record);
        this.linkTarget.processInit(path, record);
        this.onClick.processInit(path, record);
        this.mobileText.processInit(path, record);
        this.mobileTextEs.processInit(path, record);
        this.mobileLinkTitle.processInit(path, record);
        this.mobileLinkTitleEs.processInit(path, record);
        this.mobileUrl.processInit(path, record);
        this.mobileLinkTarget.processInit(path, record);
        this.mobileOnClick.processInit(path, record);
        this.mobile2LinkTitle.processInit(path, record);
        this.mobile2LinkTitleEs.processInit(path, record);
        this.mobile2Url.processInit(path, record);
        this.mobile2LinkTarget.processInit(path, record);
        this.mobile2OnClick.processInit(path, record);
        this.loginUrl.processInit(path, record);
        this.mobileLoginUrl.processInit(path, record);
        this.loginDeepLinks.processInit(path, record);
    },

    setValue : function(value) {
        var entry = JSON.parse(value);
        this.segmentName.setValue(entry.segmentName);
        this.text.setValue(entry.text);
        this.textEs.setValue(entry.textEs);
        this.linkTitle.setValue(entry.linkTitle);
        this.linkTitleEs.setValue(entry.linkTitleEs);
        this.url.setValue(entry.url);
        this.linkTarget.setValue(entry.linkTarget);
        this.onClick.setValue(entry.onClick);
        this.mobileText.setValue(entry.mobileText);
        this.mobileTextEs.setValue(entry.mobileTextEs);
        this.mobileLinkTitle.setValue(entry.mobileLinkTitle);
        this.mobileLinkTitleEs.setValue(entry.mobileLinkTitleEs);
        this.mobileUrl.setValue(entry.mobileUrl);
        this.mobileLinkTarget.setValue(entry.mobileLinkTarget);
        this.mobileOnClick.setValue(entry.mobileOnClick);
        this.mobile2LinkTitle.setValue(entry.mobile2LinkTitle);
        this.mobile2LinkTitleEs.setValue(entry.mobile2LinkTitleEs);
        this.mobile2Url.setValue(entry.mobile2Url);
        this.mobile2LinkTarget.setValue(entry.mobile2LinkTarget);
        this.mobile2OnClick.setValue(entry.mobile2OnClick);
        this.loginUrl.setValue(entry.loginUrl);
        this.mobileLoginUrl.setValue(entry.mobileLoginUrl);
        this.loginDeepLinks.setValue(entry.loginDeepLinks);
        this.hiddenField.setValue(value);
    },

    getValue : function() {
        return this.getRawValue();
    },

    getRawValue : function() {
        var entry = {
        	"segmentName" : this.segmentName.getValue(),
    		"text" : this.text.getValue(),
    		"textEs" : this.textEs.getValue(),
    		"linkTitle" : this.linkTitle.getValue(),
    		"linkTitleEs" : this.linkTitleEs.getValue(),
    		"url" : this.url.getValue(),
            "linkTarget" : this.linkTarget.getValue(),
            "onClick" : this.onClick.getValue(),
            "mobileText" : this.mobileText.getValue(),
            "mobileTextEs" : this.mobileTextEs.getValue(),
            "mobileLinkTitle" : this.mobileLinkTitle.getValue(),
            "mobileLinkTitleEs" : this.mobileLinkTitleEs.getValue(),
            "mobileUrl" : this.mobileUrl.getValue(),
            "mobileLinkTarget" : this.mobileLinkTarget.getValue(),
            "mobileOnClick" : this.mobileOnClick.getValue(),
            "mobile2LinkTitle" : this.mobile2LinkTitle.getValue(),
            "mobile2LinkTitleEs" : this.mobile2LinkTitleEs.getValue(),
            "mobile2Url" : this.mobile2Url.getValue(),
            "mobile2LinkTarget" : this.mobile2LinkTarget.getValue(),
            "mobile2OnClick" : this.mobile2OnClick.getValue(),
            "loginUrl" : this.loginUrl.getValue(),
            "mobileLoginUrl" : this.mobileLoginUrl.getValue(),
            "loginDeepLinks" : this.loginDeepLinks.getValue()
        };
        return JSON.stringify(entry);
    },

    updateHidden : function() {
        this.hiddenField.setValue(this.getValue());
    }
    
});
CQ.Ext.reg('aetna.zipinputmarketentry', Aetna.ZipInputMarketEntry);   

/**
 * Initialization function to fill the dialog with the the default ZIP market information.
 */
Aetna.ZipInputMarketEntry.prototype.renderDefaultZipMarket = function(field, record, path) {	
	CQ.HTTP.get(CQ.HTTP.encodePath(field.name + '.json'), 
		function(options, success, response) { 
            var jsonResponse = JSON.parse(response.responseText);
            
            field.setValue(jsonResponse.defaultsegment);
		}
	);
}

/**
 * Initialization function to fill the dialog with the ZipInputMarketEntry information.
 */
Aetna.ZipInputMarketEntry.prototype.renderZipMarkets = function(field, record, path) {	
	CQ.HTTP.get(CQ.HTTP.encodePath(field.name + '.json'), 
		function(options, success, response) { 
            var jsonResponse = JSON.parse(response.responseText);
            
            for (var indexSegment = 0; indexSegment < jsonResponse.segments.length; indexSegment++) {
            	field.addItem(jsonResponse.segments[indexSegment]);
            }
		}
	);
}