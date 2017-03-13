var Aetna = Aetna || {};
var linkText = "";
var type = "";
Aetna.analytics = Aetna.analytics || {};



Aetna.analytics.util = (function($) {
   var _getQueryStringValue = function(sParam) {
      var sPageURL = window.location.search.substring(1);
      var sURLVariables = sPageURL.split('&');
      for (var i = 0; i < sURLVariables.length; i++) 
      {
         var sParameterName = sURLVariables[i].split('=');
         if (sParameterName[0] == sParam) 
         {
            return sParameterName[1];
         }
      }
   };

   return {getQueryStringValue : _getQueryStringValue};
}(jQuery));

Aetna.analytics.omniture = (function($) {
		var attrExtraParam;
		var  _linkCode = function (func,click, obj, extraParam) {
		
		s.forceLinkTracking=true;
		
		var t = Aetna.analytics.omniture.funciones[func]; //this is defined in omniture.js
		
	    var vars = "";
	    var isSearchEvent = false;
	    
	    linkText =  (click.indexOf("[") > -1) ? _getInnerLinkText(obj) :click;
	    
	    if (extraParam != null){
	    	if (func == 'aeUserTypeA') {
	    		attrExtraParam = extraParam;
	    	} else {
		    	linkText = extraParam;
		    	
		    	if (func == 'search') {
		    		isSearchEvent = true;
		    	}
	    	}
	    }
	    type = t.general.Type;
	 
	     
	     if (t.general.Channel != null)
	    	 s.channel = t.general.Channel;
	    
	    /**
	     * Assigns general info about the function
	     * */
	    $.each(t.general, function(key, value) {
	    	if (value != "" && value != " " && value != null ) {
		    	if (key.indexOf("prop") > -1 || key.indexOf("eVar") > -1) {
		    		if (vars != "") {
			    		vars += ",";
		    		}
		            vars += key;
		    	}
		    	
		    	value =  _replaceDynamicValue(value, linkText);
		    	s[key] = value;
	    	}
	    });

	    var clickVar = "";
	    var customEvents = "";
	    
	    /**
	     * Assigns custom info about the click
	     * */
	    for(i=0; i < t.values.length; i++){
	    	var currentObject = t.values[i]; 
	    	clickVar = currentObject.Click;
	    	if (clickVar === click || 
	    			(click.endsWith('regex') && clickVar.startsWith(click.split(':')[0]))){
	    		i = t.values.length;
	    		$.each(currentObject,function(key, value) {
	    			if (key.indexOf("prop") > -1 || key.indexOf("eVar") > -1){
			    		if (vars != "")
				    		vars += ",";
			            vars += key;
	    			}
	    			if (key.indexOf("prop3") > -1 && value === ""){
	    				value = clickVar;
	    			} 
	    			
	    			if (key.indexOf("prop3") > -1 && value.indexOf("[Link Name]") > -1){
	    				if (obj.text) {
	    					linkText = obj.text.trim();
	    				} else if (obj.innerText) {
	    					linkText = obj.innerText;
	    				}
	    			}
	    			
	    			if (key.indexOf("prop4") > -1 && value.indexOf("[Link Name]") > -1){
	    				if (obj.text) {
	    					linkText = obj.text.trim();
	    				} else if (obj.innerText) {
	    					linkText = obj.innerText;
	    				}
	    			}
	    			
	    			if (key.indexOf("prop5") > -1 && value.indexOf("[Link Name]") > -1){
	    				if (obj.text) {
	    					linkText = obj.text.trim();
	    				} else if (obj.innerText) {
	    					linkText = obj.innerText;
	    				}
	    			}
	    			
	    			if (key.indexOf("Type") > -1){
	    				type = value;
	    			}
	    			
	    			if (key.indexOf("events") > -1) {
	    				customEvents = value;
	    			}
	    			
	    			value =  _replaceDynamicValue(value, linkText);
	    			s[key] = value;
	    	    })
	    
	    	    if (click.endsWith('regex')) {
	    	    	s.prop3 = click.replace(':regex', '').replace(click.split(':')[0] + ':', '');
	    		}
	    	}
	    	
	    	
	    	if (clickVar.indexOf("Mega Menu") > -1)
	            linkText = "Mega Menu";	    	
	    }
	    
	    var props16and17 = "prop17"; //always fire prop17
	    
	    props16and17 = "prop16," + props16and17;
	    s.prop16 = obj.href;

	    //these didn't exist in the solution design spreadsheet, but are supposed to fire with click tracking
	    s.prop17 = s.pageName; 
	    
	  //if this is a menu expand do not add props 16 and 17
	    if (clickVar.indexOf("Expand") == -1)    
	       vars = (vars != "") ? vars + "," + props16and17 : props16and17;
	  
	  //if there were no variables assigned in the spreadsheet (just the default prop16 and prop17 from the line above) then default to the following 
	      if (vars == props16and17) {
	         vars = props16and17 + ",prop3,eVar3";
	         s.prop3 = linkText;
	         s.eVar3 = "D=c3";
	      }
	      
	    //assign the variables
	      s.linkTrackVars = vars;
	     
	      //also append events if there is event data
	      if (s.linkTrackEvents != "None") {
	         s.linkTrackVars = vars + ",events";
	      } 
	      
	      //if event1 fires, meaning first visit, then there shouldn't be a previous visit and c11 should not fire
	      if (s.events.indexOf("event1") > -1 && !isSearchEvent)
	         s.prop11 = "";
	      
        //Checks audience for personalization 
        checkAudienceLink() ;
	      
		  //clear out the previous events
		     if (t.general.events != "" && t.general.events != " " && t.general.events != null) {
		         s.linkTrackEvents = t.general.events;
		         s.events = t.general.events;
		     } else if (customEvents != "") {
		    	 s.linkTrackEvents = customEvents;
		         s.events = customEvents;
		     } else {
		         s.linkTrackEvents = "None";
		     }
	    
	}// ends linkCode
   
   var _click = function(obj, n, lt) {
	  s.forceLinkTracking=true;
      n = n - 3; //omniture tags start on row 3 of the tracking spec
      var t = Aetna.analytics.omniture.tags[n]; //this is defined in omniture.js
      linkText = (lt) ? lt : _getInnerLinkText(obj);
      
      if (t.Click.indexOf("Mega Menu") > -1)
         linkText = "Mega Menu";

      //clear out the previous events
      if (t.events != "" && t.events != " ") {
         s.linkTrackEvents = t.events;
         s.events = t.events;
      } else {
         s.linkTrackEvents = "None";
      }

      s.channel = t.Channel;

      var i = 1;
      var vars = "";
      
      //loop through all the props
      for (i = 1; i <= 33; i++) {
         var prop = t["prop" + i];

         if (prop != "" && prop != " " && prop != null) {
            if (vars != "")
               vars += ",";

            vars += "prop" + i;
            prop = _replaceDynamicValue(prop, linkText, attrExtraParam);
            s["prop" + i] = prop;
         }   
      }
      
      //loop through all of evars
      for (i = 1; i <= 33; i++) {
         var evar = t["eVar" + i];

         if (evar != "" && evar != " " && evar != null) {
            if (vars != "")t
               vars += ",";
            
            vars += "eVar" + i;
            prop = _replaceDynamicValue(evar, linkText, attrExtraParam);
            s["eVar" + i] = evar;
         }
      }
      
      var props16and17 = "prop17"; //always fire prop17

   
            props16and17 = "prop16," + props16and17;
            s.prop16 = obj.href;
      
         
      //these didn't exist in the solution design spreadsheet, but are supposed to fire with click tracking
      s.prop17 = s.pageName;  

      //if this is a menu expand do not add props 16 and 17
      if (t.Click.indexOf("Expand") == -1)    
         vars = (vars != "") ? vars + "," + props16and17 : props16and17;

      //create the hier1 property value
      /* this is taken care of in s_code.js already
      var myhier = location.pathname;
      myhier = myhier.replace(".html", "");
      myhier = "ae" + myhier.replace(/\//g, "|"); 
      s.hier1 = (myhier == "ae|") ? "ae" : myhier; //remove the trailing | if it is just "ae"
      */

      //if there were no variables assigned in the spreadsheet (just the default prop16 and prop17 from the line above) then default to the following 
      if (vars == props16and17) {
         vars = props16and17 + ",prop3,eVar3";
         s.prop3 = linkText;
         s.eVar3 = "D=c3";
      }

      //assign the variables
      s.linkTrackVars = vars;
     
      //also append events if there is event data
      if (s.linkTrackEvents != "None") {
         s.linkTrackVars = vars + ",events";
      }
      
      //if event1 fires, meaning first visit, then there shouldn't be a previous visit and c11 should not fire
      if (s.events.indexOf("event1") > -1)
         s.prop11 = "";
      
      try {
         if (obj.target == "_blank" ||  t.Click.indexOf("Expand") > -1) {
            s.tl(obj, t.Type, linkText);
         }
         else {
        	 type = t.Type;
        	 s.tl(obj, t.Type, linkText, null, "navigate");
        	 return false;
         }
      }
      catch(e) {
          s.tl(obj, t.Type, linkText); 
      }      
   }
   //end _click
   
   //this replaces any variables defined in the solution design spreadsheet with the appropriate value
   var _replaceDynamicValue = function(p, linkText, extraParam) {
      if (p.indexOf("[") > -1) {
         if (p.indexOf("[Referring Domain]") > -1) {
            return p.replace("[Referring Domain]", location.referrer);
         }
         else if (p.indexOf("[previous s.pageName]") > -1) {
        	 if (window.location.search.indexOf('query=') > -1) {
        		 var previousPageName = $jq.cookie('s_previousPage');
        		 $.removeCookie('s_previousPage', { path: '/' });
        		 return p.replace("[previous s.pageName]", previousPageName);
        	 } else {
        		 return p.replace("[previous s.pageName]", document.referrer);
        	 }
         } 
         else if (p.indexOf("[Router Selection]") > -1) {
            return p.replace("[Router Selection]", linkText);
         }  
         else if (p.indexOf("[Section Name]") > -1) {
            var section = location.pathname;
            section = section.replace(".html", "");
            var tmp = section.split("/");
            section = tmp[tmp.length - 1];            
            return p.replace("[Section Name]", section);
         } 
         else if (p.indexOf("[Link Name]") > -1) {
            return p.replace("[Link Name]", linkText);
         } 
         else if (p.indexOf("[Headline]") > -1) {
            return p.replace("[Headline]", linkText);
         } 
         else if (p.indexOf("[Related Topics Links]") > -1) {
            return p.replace("[Related Topics Links]", linkText);
         } 
         else if (p.indexOf("[In This Section Links]") > -1) {
            return p.replace("[In This Section Links]", linkText);    
         } 
         else if (p.indexOf("[Video name]") > -1) {
            return p.replace("[Video name]", linkText);
         }
         else if (p.indexOf("[State]") > -1) {
            return p.replace("[State]", linkText);
         }
         else if (p.indexOf("[Aetna Property Name]") > -1) {
            return p.replace("[Aetna Property Name]", linkText);
         }
         else if (p.indexOf("[Search Term]") > -1) {
            return p.replace("[Search Term]", linkText);
         }
         else if (p.indexOf("[Market]") > -1) {
             return p.replace("[Market]", attrExtraParam);
          }
         else {
            return p;
         }
      } else {
         return p; 
      }
   }
   //end _replaceDynamicValue
   
   var _getInnerLinkText = function(el) {
      if (el.getElementsByTagName) {
         var inner = el.getElementsByTagName("*");
         
         if (inner.length > 0)
	         inner = inner[inner.length - 1];
         else
            inner = el;         

         try {
            return $(inner).text();
         } catch(error) {
            return "";
         }
      }
   }
   //end _getInnerLinkText 
   
   return {click:_click,linkCode:_linkCode, getInnerLinkText:_getInnerLinkText};
}(jQuery));

String.prototype.endsWith = function(s) {
	return this.length >= s.length && this.substr(this.length - s.length) == s;
}

String.prototype.startsWith = function(s) {
	return this.length >= s.length && this.indexOf(s) == 0;
}