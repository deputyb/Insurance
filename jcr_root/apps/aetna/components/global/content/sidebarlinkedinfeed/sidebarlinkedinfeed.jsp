<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
	<c:when test="${not empty properties.linkedinaccount}">
		<cq:includeClientLib css="aetna.linkedin" />
		<cq:includeClientLib js="aetna.linkedin" />
		<script type="text/javascript">
            Aetna.LinkedIn.linkedInAccount = '${properties.linkedinaccount}';
		</script>
		<script type="text/javascript" src="//platform.linkedin.com/in.js">
		  	api_key: ${properties.linkedinaccountapikey}
			<c:if test="${not empty properties.linkedinfeedactive}">
		  		onLoad: Aetna.LinkedIn.onLinkedInLoad
			</c:if>
		  authorize: true
		  lang: en_US
		</script>
		<div class="sidebar-linkedin-feed">
			<c:if test="${not empty properties.title}">
				<h4>${properties.title}</h4>
				<hr />
			</c:if>
			<div class="linked-in-buttons-wrapper">
				<c:if test="${not empty properties.linkedinfeedactive}">
					<div class="login-button">
						<script type="in/Login"></script>				
					</div>
				</c:if>
				<div class="follow-button">
					<script type="IN/FollowCompany" data-id="${properties.linkedinaccount}" data-counter="none"></script>
				</div>
			</div>
			<c:if test="${not empty properties.linkedinfeedactive}">
				<div class="linked-in-updates-wrapper hidden">
					<c:if test="${not empty properties.recentupdatestitle}">
						<p><b>${properties.recentupdatestitle}</b></p>
					</c:if>
					<div class="header-wrapper">
						<div class="thumbnail-image">
							<a href="#"<c:if test="${not empty properties.onclick}"> onclick="${properties.onclick}"</c:if> target="_blank"
								<c:if test="${not empty properties.interstitial}"> class="${properties.interstitial}"</c:if>><img src="" /></a>
						</div>
						<div class="title">
							<a href="#"<c:if test="${not empty properties.onclick}"> onclick="${properties.onclick}"</c:if> target="_blank"
								<c:if test="${not empty properties.interstitial}"> class="${properties.interstitial}"</c:if>></a>
						</div>
					</div>
					<div class="body">
						<p></p>
					</div>
					<div class="update-links">
						<div class="like-link">
							<a href="https://www.linkedin.com/company/${properties.linkedinaccount}" target="_blank"
								<c:if test="${not empty properties.interstitial}"> class="${properties.interstitial}"</c:if>>Like (<span class="likes-qty"></span>)</a>
						</div>
						<div class="separator"></div>
						<div class="comment-link">
							<a href="https://www.linkedin.com/company/${properties.linkedinaccount}" target="_blank"
								<c:if test="${not empty properties.interstitial}"> class="${properties.interstitial}"</c:if>>Comment (<span class="comments-qty"></span>)</a>
						</div>
						<div class="separator"></div>
						<div class="share-link">
							<a href="https://www.linkedin.com/company/${properties.linkedinaccount}" target="_blank"
								<c:if test="${not empty properties.interstitial}"> class="${properties.interstitial}"</c:if>>Share</a>
						</div>
						<div class="separator"></div>
						<div class="date-link">
							<a href="https://www.linkedin.com/company/${properties.linkedinaccount}" target="_blank"
								<c:if test="${not empty properties.interstitial}"> class="${properties.interstitial}"</c:if>></a>
						</div>
					</div>
						
				</div>
			</c:if>
			<div class="feed-not-available-msg">
				${properties.linkedinnotavailablemsg}
			</div>
		</div>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			<div style="color: black;">Double click to configure Sidebar LinkedIn Feed component</div> 
		</c:if>
	</c:otherwise>	
</c:choose>