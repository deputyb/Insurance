var myBrowserName;

function detectBrowser() {

    var lesserThan = "lt ";
    
    var N= navigator.appName;
    var UA= navigator.userAgent;
    var temp;
    
    var browserVersion= UA.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    var trident = !!navigator.userAgent.match(/Trident\/7.0/);

	var mobileBrowsers = isMobileBrowser();
	var isIpad = /iPad/i.test(UA);

    if(browserVersion && (temp= UA.match(/version\/([\.\d]+)/i))!= null && !mobileBrowsers && !isIpad)
    browserVersion[2]= temp[1];
    browserVersion= browserVersion? [browserVersion[1], browserVersion[2]]: [N, navigator.appVersion,'-?'];
    
    if(browserVersion != null) {
        
        myBrowserName = browserVersion[0];
        var myBrowserVersion = browserVersion[1];
        if(trident && getIElatestVersion != -1) {
            myBrowserVersion = getIElatestVersion();
            myBrowserName = "MSIE";
        }

        var oldBrowser = false;

        if(myBrowserName == "MSIE") {
            oldBrowser = compareBrowserVersion(ieNonSupportedVer, lesserThan, myBrowserVersion);
        } else if(myBrowserName == "Safari") {
            oldBrowser = compareBrowserVersion(safariNonSupportedVer, lesserThan, myBrowserVersion);
        } 

        
        return oldBrowser;
    }
}

function getIElatestVersion() {
    var rv = -1;
    var ua = navigator.userAgent;
    var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
        rv = parseFloat( RegExp.$1 );
    
    return rv;
}

function compareBrowserVersion(nonSupportedVer, lesserThan, myBrowserVersion) {
    var isOldBrowser = false;
    for (var i=0; i < nonSupportedVer.length; i++) {
        if(nonSupportedVer[i].length >= lesserThan.length 
           && nonSupportedVer[i].substring(0, lesserThan.length) == lesserThan 
        && cmpVersion(myBrowserVersion, nonSupportedVer[i].substring(lesserThan.length)) < 0) {
            isOldBrowser = true;
            break;
        } else if(cmpVersion(myBrowserVersion, nonSupportedVer[i]) == 0) {
            isOldBrowser = true;
            break;
        }
    }

    return isOldBrowser;
}

function cmpVersion(a, b) {
    var i, cmp, len, re = /(\.0)+[^\.]*$/;
    a = (a + '').replace(re, '').split('.');
    b = (b + '').replace(re, '').split('.');
    len = Math.min(a.length, b.length);
    for( i = 0; i < len; i++ ) {
        cmp = parseInt(a[i], 10) - parseInt(b[i], 10);
        if( cmp !== 0 ) {
            return cmp;
        }
    }
    return a.length - b.length;
}


if(Aetna.isCQPreviewMode){

	var isOldBrowser = detectBrowser();

    if(isOldBrowser) { 


        if ($(window).width() > 979) {
            $( document ).ready(function() {
                document.getElementById("badBrowser").style.display = 'block';
                if(myBrowserName == "Safari") {
                	document.getElementById("safariMsg").style.display = 'block';
                } else {
                    document.getElementById("ieMsg").style.display = 'block';
                }

                $('.badBrowser').css({"z-index":"9000"});
                $('.headerBar').css({"top":"30px"});
                $('.pathSelector').css({"top":"95px"});
                $('.togglePanelWrapper').css({"top":"143px"});
        
            });
        }
	}
}