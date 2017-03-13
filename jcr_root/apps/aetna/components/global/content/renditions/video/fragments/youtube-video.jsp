<%@include file="/apps/aetna/components/global/global.jsp" %>
<script type="text/javascript">
	var yt_int; 
	
	initYT = function() {
		$(".videoContent.video-youtube iframe").each(function() {
		    // If "enablejsapi" is not set on the iframe's src, set it:
		    if (this.src.indexOf("enablejsapi") === -1) {
		      // check if there is another url parameter
		      var prefix = (this.src.indexOf("?") === -1) ? "?" : "&amp;";
		      this.src += prefix + "enablejsapi=1";
		    }
        });
	};    

	//  loads the IFrame Player API, needed to pause YT videos on iFrames 
	$.getScript("https://www.youtube.com/player_api", function() {
		yt_int = setInterval(function(){
		    if(typeof YT === "object"){
		    	initYT();
		        clearInterval(yt_int);
		    }
		},500);
	});
	

</script>

<div class="videoWrapper">
	${properties.youtubeembedcode}
</div>