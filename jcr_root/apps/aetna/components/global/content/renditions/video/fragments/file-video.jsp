<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="autoplay" value="${properties.autoplay}"/>
<c:if test="${empty autoplay}">
	<c:set var="autoplay" value="false"/>
</c:if>
<c:set var="height" value="${properties.height}"/>
<c:if test="${empty height}">
	<c:set var="height" value="404"/>
</c:if>
<c:set var="width" value="${properties.width}"/>
<c:if test="${empty width}">
	<c:set var="width" value="720"/>
</c:if>
<c:set var="renditionSize" value="${width}.${height}"/>
<c:set var="dataAttr" value="thumbnailImage"/>

<c:set var="dataAttrs" value="${fn:split(dataAttr, ',')}" scope="request" />
<c:set var="renditionSizes" value="${fn:split(renditionSize, ',')}" scope="request" />
<c:set var="imageName" value="image" scope="request" />

<script>
    var urls = [];
    <c:forEach var="url" items="${properties.urls}">
        urls.push("<c:out value="${url}"/>");
    </c:forEach>
    var <cq:include script="../../utils/render.dataimage.rendition.jsp" />;
    
    if (thumbnailImage == "null") {
    	thumbnailImage = "/common/images/dam/AboutUs/Topic/topic-14/PHP3070330_rf-d-to1.jpg";
    }
</script>

<div id="videoPlayerDiv"></div>

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
			    
			    try {
					Aetna.Video.resizeVideo();
			        Aetna.Video.player = new DJSPlayer(DJSPSetup);
			    } finally {
					Aetna.Video.resizeVideo();
			    }
			});
		}
	};
	
    // init player on document ready
	Aetna.Video.init();
</script>
<!-- end video player -->