<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="autoplay" value="<%=properties.get("autoplay", "false") %>" />
<c:set var="height" value="<%=properties.get("height", "404") %>" />
<c:set var="width" value="<%=properties.get("width", "720") %>" />

<script>
    var urls = [];
    <c:forEach var="url" items="${properties.urls}">
        urls.push("<c:out value="${url}"/>");
    </c:forEach>
    var thumbnailImage = "";
    <c:set scope="request" var="imageName" value="image"/><c:set scope="request" var="dataAttr" value="thumbnailImage"/>
    <cq:include script="../utils/render.dataimage.jsp" />;
    if(thumbnailImage == "null"){
    	thumbnailImage = "/common/images/dam/AboutUs/Topic/topic-14/PHP3070330_rf-d-to1.jpg";
    }
</script>
<div class="row-fluid">
    <div class="span12">
        <div class="videoContent">
            <div id="videoPlayerDiv">
            </div>
        </div><!--/.videoContent-->
        <div class="videoTranscript">
        <h3>${properties.transcriptHeader}</h3>
        <div>
        	${properties.text}
        </div>
        </div>
    </div> 
</div>

 <!-- video player -->
    <!-- needed for browser detection to work -->
    <cq:includeClientLib css="aetna.video"/>
    <cq:includeClientLib js="aetna.video"/>
    <script type="text/javascript">
    	Aetna.Video = {
    			player: null,
    			resizeVideo : function() {
    				var paddedRatio = 0.9;
		        	var playerParent = $("#videoPlayerDiv").parent().parent();
		        	var ipadVideoClicker = $("#vjs-ipad-clicker");
		            var ppW = playerParent.innerWidth();
		            var resizedW;
	                var resizedH;
		            
		            if (ppW < 768) {
		                resizedW = ppW * paddedRatio;
		                resizedH = resizedW * Aetna.Video.resizeRatio;
		            } else {
		            	resizedW = $("#DJSPvideoPlayerDivvideoPlayerDiv").attr('width');
		            	resizedH = $("#DJSPvideoPlayerDivvideoPlayerDiv").attr('height');
		            }
		            
		            $("#DJSPvideoPlayerDivvideoPlayerDiv").width(resizedW).height(resizedH);
	                $(".videoContent").width(resizedW).height(resizedH);
	                
	                if (ipadVideoClicker.length > 0) {
	                	ipadVideoClicker.width(resizedW);
	                }
    			},
    			vidWidth : ${width},
    			vidHeight : ${height},
    			resizeRatio : 1,
    			init : function() {
    				$(document).ready(function() {
    			        var DJSPSetup = {
    				        videoName : '${properties.videoname}',
    				        videoWidth : Aetna.Video.vidWidth,
    				        videoHeight : Aetna.Video.vidHeight,
    				        shouldShowControls : true,
    				        progressIntervals : 4,
    				        showCaptionsBelowPlayer : false,
    				        showControlsBelowPlayer : false,
    				        autoPlay : ${autoplay},
    				        autoHideControls : false,
    				        videoPaths : urls,
    				        videoPosterframe : thumbnailImage,
    				        divToContainPlayer : 'videoPlayerDiv' // id only
    			        }   

    			        Aetna.Video.resizeRatio = Aetna.Video.vidHeight / Aetna.Video.vidWidth;

    			        $(window).resize(function() {
    			        	Aetna.Video.resizeVideo();
    			        });
    			        try{
    			        	Aetna.Video.resizeVideo();
    			        	Aetna.Video.player = new DJSPlayer(DJSPSetup);
    			        }finally{
    			        	Aetna.Video.resizeVideo();
    			        }
    			             
    			    });
    			}
    	}
        // init player on document ready
    	Aetna.Video.init();
    </script>
    <!-- end video player -->