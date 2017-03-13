/*
OnlineOpinion v5.9.3
Released: 09/21/2015. Compiled 09/30/2015 12:09:31 PM -0500
Branch: 5.9.3 efe6bf2541deb563c2a9884b2a3034c881047acf
Components: Full
UMD: disabled
The following code is Copyright 1998-2015 Opinionlab, Inc. All rights reserved. Unauthorized use is prohibited. This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. https://urldefense.proofpoint.com/v2/url?u=http-3A__www.opinionlab.com&d=BQICAg&c=wluqKIiwffOpZ6k5sqMWMBOn0vyYnlulRJmmvOXCFpM&r=E8SpJ4HIr7VisYmh0iI1Ud-mgBGCOQ9mFR0O7XvLSBE&m=lVWWXw41Y271XZryRU0zDRGSpX-YzCosG4xVeY_SOzw&s=N3Zv_KMTCuALxc3hFJ5oFJFNMexp0BS6lfJIuB-3e0k&e= 
*/

/* global window, OOo */

(function (w, o) {
  'use strict';

    o.oo_launch = function(e, feedback) {
      var evt = e || window.event;
      o[feedback].show(evt);
    };

    o.tabFeedbackShow = function(evt) {
        var TLcookie = "TLAETGuid";
        if (OOo.readCookie('TLAETGuid') == null) {
            TLcookie = "JSESSIONID_102";
        }

        o.oo_tab = new o.Ocode({
          disableMobile: true,
          tealeafCookieName: TLcookie,
          customVariables: {
              pp_responses: o.readCookie('pp-responses'),
              SessionPersistence: o.readCookie('SessionPersistence'),
              audience: typeof ClientContext != "undefined" ? ClientContext.get("/profile/audience") : "",
              member: typeof ClientContext != "undefined" ? ClientContext.get("/profile/audience/member") : "",
              language: typeof ClientContext != "undefined" ? ClientContext.get("/profile/language") : ""
          }
        });

        o.oo_launch(evt, 'oo_tab');
    }

    o.createTab = function () {
        var el,
            tab_cust = document.createElement('div'),
            tab_div  = document.createElement('div'),
            regSpan  = document.createElement('span');
        tab_cust.id = 'oo_tab';
        tab_cust.className = 'oo_tab_right';
        tab_cust.style.index = '0';
        document.body.appendChild(tab_cust);
        el = document.getElementById('oo_tab');
        el.appendChild(tab_div);
        el.appendChild(regSpan);
        var isFacebookApp = /FBAN/.test(navigator.userAgent);
        var isGoogleSearchApp = /GSA/.test(navigator.userAgent);

        if (OOo.Browser.isMobile || navigator.userAgent.match(/Android/i) || isFacebookApp || isGoogleSearchApp) {
            tab_cust.style.display = 'none';
        }
        // Add the event listener for the tab re-init then display function to happen onclick of the tab element
        o.addEventListener(tab_cust, 'click', function(event) {
            o.tabFeedbackShow(event);
        }, false);
    }
    o.createTab();

})(window, OOo);