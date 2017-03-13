<%@include file="/apps/aetna/components/global/global.jsp"%>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
    <c:when test="${not empty properties.subHeading}">
		<div class="article-template">
			<div class="nextStepCont">
				<div class="left"><h4 class="blueText">${properties.subHeading}</h4></div>
				<div class="right">${properties.text}</div>
			</div>
		</div>
		<script type="text/javascript">
			$(document).ready(function() {
				var centerNextStep = (function(){
					var parent = $(".nextStepCont");
				    var child = $(".nextStepCont").children(".left");
				    
					if ($(window).width() > 768){
					    var vCenter = ((parent.height()-parent.css("padding-top").replace("px","")-child.height())/2);
					    child.css("padding-top",vCenter + "px");							
					}else{
						child.css("padding-top","");
					}
				});
				centerNextStep();
		        $(window).resize(function() {
		        	centerNextStep();
		        });
			});
		</script>
    </c:when>
    <c:otherwise>
        <c:if test="${isEditMode}">
        	Double click to configure Next Step component
        </c:if>
    </c:otherwise>
</c:choose>