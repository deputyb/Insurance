/*************************************************************************
*
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2012 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by trade secret or copyright law.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/

/**
 * @class CUI.rte.plugins.LinkDialog
 * @extends CQ.form.rte.ui.BaseWindow
 * @private
 * The LinkDialog is a dialog for creating a link.
 * @constructor
 * Creates a new LinkDialog.
 * @param {Object} config The config object
 */
CQ.form.rte.plugins.AnalyticsLinkDialog = CQ.Ext.extend(CQ.form.rte.ui.BaseWindow, {

    constructor: function(config) {
        config = config || { };
        var defaults = {
            "title": CQ.I18n.getMessage("Hyperlink"),
            "modal": true,
            "width": 400,
            "height": 180,
            "dialogItems": 	[
                           	 {
                           		 "itemId": "href",
                           		 "name": "href",
                           		 "parBrowse": true,
                           		 "anchor": CQ.themes.Dialog.ANCHOR,
                           		 "fieldLabel": CQ.I18n.getMessage("Link to"),
                           		 "xtype": "pathfield",
                           		 "ddGroups": [
                           		              CQ.wcm.EditBase.DD_GROUP_PAGE,
                           		              CQ.wcm.EditBase.DD_GROUP_ASSET
                           		              ],
               		              "fieldDescription": CQ.I18n.getMessage("Drop files or pages from the Content Finder"),
               		              "listeners": {
               		            	  "dialogselect": {
               		            		  "fn": this.selectAnchor,
               		            		  "scope": this
               		            	  },
               		            	  "render": this.initHrefDragAndDrop
               		              },
               		              "validator": CUI.rte.Utils.scope(this.validateLink, this),
               		              "validationEvent": "keyup",
               		              "escapeAmp": true
                           	 },
                           	 {
                           		 "itemId": "mobileHref",
                           		 "name": "mobileHref",
                           		 "parBrowse": true,
                           		 "anchor": CQ.themes.Dialog.ANCHOR,
                           		 "fieldLabel": CQ.I18n.getMessage("Mobile Link to"),
                           		 "xtype": "pathfield",
                           		 "ddGroups": [
                           		              CQ.wcm.EditBase.DD_GROUP_PAGE,
                           		              CQ.wcm.EditBase.DD_GROUP_ASSET
                           		              ],
               		              "fieldDescription": CQ.I18n.getMessage("Link that will be open from a mobile device"),
               		              "listeners": {
               		            	  "dialogselect": {
               		            		  "fn": this.selectAnchor,
               		            		  "scope": this
               		            	  },
               		            	  "render": this.initHrefDragAndDrop
               		              },
               		              "validator": CUI.rte.Utils.scope(this.validateMobileLink, this),
               		              "validationEvent": "keyup",
               		              "escapeAmp": true
                           	 },
                           	 {
                           		 "itemId": "targetBlank",
                           		 "name": "targetBlank",
                           		 "xtype": "checkbox",
                           		 "boxLabel": CQ.I18n.getMessage("Open in new window"),
                           		 "value": "targetBlank"
                           	 },
                           	{
                           		 "itemId": "useHttps",
                           		 "name": "useHttps",
                           		 "xtype": "checkbox",
                           		 "boxLabel": CQ.I18n.getMessage("Use HTTPS"),
                           		 "fieldDescription": "Applicable only for internal links",
                           		 "value": "useHttps"
                           	 },
                           	 {
                           		 "itemId": "interstitial",
                           		 "name": "interstitial",
                           		 "type" : "select",
                           		 "xtype": "selection",
                           		 "width" : 250,
                           		 "fieldLabel": CQ.I18n.getMessage("Interstitial"),
                           		 "fieldDescription": CQ.I18n.getMessage("Select the interstitial window to display"),
                           		 "value": "interstitial",
                           		 "options" : "/services/article-module-interstitial?page=" + window.location.pathname
                           	 },
                           	 {
                           		 "itemId": "interstitialdeeplink",
                           		 "name": "interstitialdeeplink",
                           		 "xtype": "textfield",
                           		 "width" : 250,
                           		 "fieldLabel": CQ.I18n.getMessage("Interstitial Deep Link"),
                           		 "fieldDescription": CQ.I18n.getMessage("ID of the interstitial deep link configured in the market"),
                           		 "value": "interstitial"
                           	 }
                           	 ]
        };
        CQ.Util.applyDefaults(config, defaults);
        CQ.form.rte.plugins.AnalyticsLinkDialog.superclass.constructor.call(this, config);
    },

    /**
     * @private
     */
    selectAnchor: function(pathfield, path, anchor) {
        // custom path + anchor handling
        path = CQ.HTTP.encodePath(path);
        // encodePath will not encode '&', so we're doing it here, as other callees of
        // encodePath might rely on that documented behaviour - see bug #30206
        path = path.replace(/&/g, "%26");
        if (anchor && (anchor.length > 0)) {
            path += ".html#" + anchor;
        }
        pathfield.setValue(path);
    },

    /**
     * <p>Note that this method is executed in the scope of the pathfield.</p>
     * @private
     */
    initHrefDragAndDrop: function() {
        if (this.ddGroups) {
            if (typeof(this.ddGroups) == "string") {
                this.ddGroups = [ this.ddGroups ];
            }
            var field = this;
            var target = new CQ.wcm.EditBase.DropTarget(this.el, {
                "notifyDrop": function(dragObject, evt, data) {
                    if (dragObject && dragObject.clearAnimations) {
                        dragObject.clearAnimations(this);
                    }
                    if (dragObject.isDropAllowed(this)) {
                        if (data.records && data.single) {
                            var record = data.records[0];
                            var path = record.get("path");
                            path = CQ.HTTP.encodePath(path);
                            // again, '&' needs to be encoded explicitly - see bug #30206
                            path = path.replace(/&/g, "%26");
                            field.setValue(path);
                            evt.stopEvent();
                            return true;
                        }
                        return false;
                    }
                }
            });

            var dialog = this.findParentByType(CQ.form.rte.plugins.AnalyticsLinkDialog);
            dialog.on("activate", function(dialog) {
                if (dialog && dialog.el && this.highlight) {
                    var dialogZIndex = parseInt(dialog.el.getStyle("z-index"), 10);
                    if (!isNaN(dialogZIndex)) {
                        this.highlight.zIndex = dialogZIndex + 1;
                    }
                }
            }, target);
            dialog.on("deactivate", function(dialog) {
                if (dialog && dialog.el && this.highlight) {
                    var dialogZIndex = parseInt(dialog.el.getStyle("z-index"), 10);
                    if (!isNaN(dialogZIndex)) {
                        this.highlight.zIndex = dialogZIndex + 1;
                    }
                }
            }, target);
            var editorKernel = dialog.getParameter("editorKernel");
            dialog.on("show", function() {
                editorKernel.fireUIEvent("preventdrop");
                CQ.WCM.registerDropTargetComponent(field);
            }, target);
            dialog.on("hide", function() {
                CQ.WCM.unregisterDropTargetComponent(field);
                editorKernel.fireUIEvent("reactivatedrop");
            }, target);

            for (var i = 0; i < this.ddGroups.length; i++) {
                target.addToGroup(this.ddGroups[i]);
            }
            target.removeFromGroup(CQ.wcm.EditBase.DD_GROUP_DEFAULT);
            this.dropTargets = [ target ];
        }
    },

    /**
     * Gets a field with the provided key from this panel.
     *
     * @param {String} key Field name
     */
    getField: function(key) {
        var items = this.find("name", "./" + key);
        if( (CUI.rte.Utils.isArray(items)) && (items.length > 0) )
            return items[0];
    },

    preprocessModel: function() {
        var showAdvanced = false;
        if (this.objToEdit && this.objToEdit.dom) {
            this.objToEdit.href = CUI.rte.HtmlRules.Links.getLinkHref(
                    this.objToEdit.dom);
            var com = CUI.rte.Common;
            var attribNames = com.getAttributeNames(this.objToEdit.dom, false,
                function(dom, attribName, attribNameLC) {
                    // exclude href, rte_href & target from generic attribute handling, as
                    // they are handled explicitly and not genrically
                    return attribNameLC == com.HREF_ATTRIB || attribNameLC == "href"
                            || attribNameLC == "target";
                });
            for (var i = 0; i < attribNames.length; i++) {
                var attribName = attribNames[i];
                var value = com.getAttribute(this.objToEdit.dom, attribName);
                if (typeof value !== 'undefined') {
                    this.objToEdit.attributes[attribName] = value;
                }
            }
            if (this.objToEdit.attributes.onclick) {
                showAdvanced = true;
            }
        }
        var advancedField = this.getField("linkdialog/cq:linkTrackingTab");
        if (advancedField) {
        	var onClickEventField = this.getField("linkdialog/cq:onClickEvent");
        	
        	if (onClickEventField && onClickEventField.getValue() != '') {
        		advancedField.expand(false);
        	}
        }
    },

    dlgFromModel: function() {
        var hrefField = this.getFieldByName("href");
        var mobileHrefField = this.getFieldByName("mobileHref");
        
        if (hrefField) {
            var value = "";
            
            if (this.objToEdit) {
                var href = this.objToEdit.href;
                if (href) {
                	var desktopLink = this.objToEdit.attributes['data-desktop-link'];
                    
                    if (desktopLink) {                    	
                    	value = desktopLink;
                    	
                    	mobileHrefField.setValue(href);
                    	
                    	if (this.objToEdit.attributes.class) {
                    		this.objToEdit.attributes.class = this.objToEdit.attributes.class.replace('mobile-only', '');
                    	}
                    } else {
                    	value = href;
                    	mobileHrefField.setValue('');
                    }
                }
            }
            
            hrefField.setValue(value);
        }
        var interstitialField = this.getFieldByName("interstitial");
        if (interstitialField) {
        	var interstitialValue = "";
            if (this.objToEdit && this.objToEdit.attributes &&
            		this.objToEdit.attributes.interstitial) {
                interstitialValue = this.objToEdit.attributes.interstitial;
            }

            interstitialField.setValue(interstitialValue);

            var classField = this.getFieldByName("class");

            if (classField && this.objToEdit.attributes.class) {
                var interstitialClass = this.objToEdit.attributes.class;
    
                if (interstitialClass) {
                    for (var indexOption = 1; indexOption < interstitialField.options.length; indexOption++) {
                        // Check if the interstitial value is present in the class
                        if (this.objToEdit.attributes.class.indexOf(interstitialField.options[indexOption].value) > -1) {
                            interstitialClass = this.objToEdit.attributes.class.replace(interstitialField.options[indexOption].value, '');
                            interstitialField.setValue(interstitialField.options[indexOption].value);
                        }
                    }
        
                    this.objToEdit.attributes.class = $.trim(interstitialClass);
                    classField.setValue(this.objToEdit.attributes.class);
                }
            }
        }
        
        var targetBlankField = this.getFieldByName("targetBlank");
        if (targetBlankField) {
            var target = (this.objToEdit && this.objToEdit.target
                    ? this.objToEdit.target.toLowerCase() : null);
            targetBlankField.setValue(target == "_blank");
        }
        
        var useHttpsField = this.getFieldByName("useHttps");
        if (useHttpsField) {
            var useHttps = (this.objToEdit && this.objToEdit.attributes['data-use-https']
                    ? this.objToEdit.attributes['data-use-https'].toLowerCase() : null);
            useHttpsField.setValue(useHttps);
        }
        
        var interstitialDeepLinkField = this.getFieldByName("interstitialdeeplink");
        if (interstitialDeepLinkField) {
        	var interstitialDeepLink = (this.objToEdit && this.objToEdit.attributes['data-interstitial-deeplink']
                    ? this.objToEdit.attributes['data-interstitial-deeplink'] : null);
        	interstitialDeepLinkField.setValue(interstitialDeepLink);
        }

        var onClickEventField = this.getField("linkdialog/cq:onClickEvent");

        if (onClickEventField) {
            var onClickEvent = "";
            if (this.objToEdit) {
                var onClickEvent = this.objToEdit.attributes.onclick;
                if (typeof onClickEvent !== 'undefined') {
                    events = onClickEvent;
                }
                
            }
            onClickEventField.setValue(onClickEvent);
        }
        
        this.setHeight(545);
        
        var actualDialogPosition = this.getPosition();
        
        if (!this.newYPosition) {
        	this.newYPosition = actualDialogPosition[1] - 100;
        	this.setPosition(actualDialogPosition[0], this.newYPosition);
        }
    },

    dlgToModel: function() {
        if (this.objToEdit) {
            var hrefField = this.getFieldByName("href");
            var mobileHrefField = this.getFieldByName("mobileHref");
            var newClass = this.getFieldByName("class").getValue();
            
            if (hrefField) {
                var href = hrefField.getValue();
                
                if (href) {
                    this.objToEdit.href = href;
                    
                    // Check if the mobile href was configured
                    if (mobileHrefField) {
                        var mobileHref = mobileHrefField.getValue();
                        
                        if (mobileHref && mobileHref != '') {
                        	this.objToEdit.href = mobileHref;
                            this.objToEdit.mobileHref = href;
                            
                            this.objToEdit.attributes['data-desktop-link'] = href;
                            newClass += (newClass == '' ? '' : ' ') + 'mobile-only';
                        } else {
                        	this.objToEdit.mobileHref = null;
                        	this.objToEdit.attributes['data-desktop-link'] = null; 
                        }
                    }
                }
            }
            
            var interstitialField = this.getFieldByName("interstitial");
            
            if (interstitialField) {
                this.objToEdit.attributes.interstitial = interstitialField.getValue() || "";
				this.objToEdit.attributes.class = newClass + (newClass == '' ? '' : ' ') + this.objToEdit.attributes.interstitial;
                this.objToEdit.attributes.interstitial = '';
                this.getFieldByName("class").setValue(this.objToEdit.attributes.class);
            }
            
            var targetBlankField = this.getFieldByName("targetBlank");
            if (targetBlankField) {
                if (targetBlankField.getValue()) {
                    this.objToEdit.target = "_blank";
                } else {
                    this.objToEdit.target = null;
                }
            }
            
            var useHttpsField = this.getFieldByName("useHttps");
            if (useHttpsField) {
                if (useHttpsField.getValue()) {
                    this.objToEdit.attributes['data-use-https'] = "true";
                } else {
                    this.objToEdit.attributes['data-use-https'] = null;
                }
            }
            
            var interstitialDeepLinkField = this.getFieldByName("interstitialdeeplink");
            if (interstitialDeepLinkField) {
            	var interstitialDeepLink = interstitialDeepLinkField.getValue();
                if (interstitialDeepLink != null && interstitialDeepLink != '') {
                    this.objToEdit.attributes['data-interstitial-deeplink'] = interstitialDeepLink;
                }
            }
            
            var onClickEventField = this.getField("linkdialog/cq:onClickEvent");
            
            if (onClickEventField) {
                this.objToEdit.attributes.onclick = onClickEventField.getValue() || "";
            }
        }
    },

    enableSCFields: function(state) {
        var onClickEventField = this.getField("linkdialog/cq:onClickEvent");
        if(state) {
            onClickEventField.enable();
        } else {
            onClickEventField.disable();
        }
    },

    postprocessModel: function() {
        var linkRules = this.parameters.linkRules;
        if (linkRules) {
            linkRules.applyToObject(this.objToEdit);
            
            if (this.objToEdit.attributes['data-desktop-link']) {
            	var tempHref = this.objToEdit.href;
            	
            	this.objToEdit.href = this.objToEdit.attributes['data-desktop-link'];
            	
            	// Apply the HTML rules to set thep proper link value
            	linkRules.applyToObject(this.objToEdit);
            	
            	this.objToEdit.attributes['data-desktop-link'] = this.objToEdit.href;
            	this.objToEdit.href = tempHref;            	
            }
        }
    },

    validateLink: function() {
        return this.validateGenericLink(this.getFieldByName("href"));
    },
    
    validateMobileLink: function() {
        return this.validateGenericLink(this.getFieldByName("mobileHref"));
    },
    
    validateGenericLink: function(field) {
        var href = field;
        if (!href) {
            return false;
        }
        href = href.getValue();
        var linkRules = this.getParameter("linkRules");
        if (!linkRules) {
            return (href.length > 0);
        }
        return linkRules.validateHref(href);
    }

});

// register LinkDialog component as xtype
CQ.Ext.reg("rtelinkdialog", CQ.form.rte.plugins.AnalyticsLinkDialog);