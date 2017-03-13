<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
	<c:when test="${not empty properties.twitteraccount}">
		<div class="sidebar-twitter-feed">
			<c:if test="${not empty properties.title}">
				<h4>${properties.title}</h4>
				<hr />
			</c:if>
			<div class="twitter-feed-wrapper">
				<c:choose>
					<c:when test="${not empty properties.twitterfeedactive}">
						<div class="twitter-timeline" href="https://twitter.com/${properties.twitteraccount}" 
							data-widget-id="${properties.twitterwidgetid}"				
							data-chrome="noheader nofooter noborders"
							height="200" data-tweet-limit="1">
							<div class="twitter-feed-msg">${properties.twitternotavailablemsg}</div>
						</div>
						<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
					</c:when>
					<c:otherwise>
						<div class="twitter-feed-msg">${properties.twitternotavailablemsg}</div>
					</c:otherwise>
				</c:choose>
			</div>
			<c:if test="${not empty properties.buttontitle}">
				<div class="button-wrapper">
					<a href="${properties.buttonlink}" class="blueBtn<c:if test="${not empty properties.buttoninterstitial}"> ${properties.buttoninterstitial}</c:if>"
						<c:if test="${not empty properties.buttontarget}"> target="_blank"</c:if>
						<c:if test="${not empty properties.buttononclick}"> onclick="${properties.buttononclick}"</c:if>>${properties.buttontitle}</a>
				</div>
			</c:if>
			<c:if test="${not empty properties.copy}">
				<hr class="social-splitter" />
				<div class="social-wrapper">
					<div class="copy">${properties.copy}</div>
					<div class="social-icons">
						<c:if test="${not empty properties.facebooklink}">
							<a href="${properties.facebooklink}"
								<c:if test="${not empty properties.facebookinterstitial}"> class="${properties.facebookinterstitial}"</c:if>
								<c:if test="${not empty properties.facebooklinktarget}"> target="_blank"</c:if>
								<c:if test="${not empty properties.facebooklinkonclick}"> onclick="${properties.facebooklinkonclick}"</c:if>>
								<c:set var="facebookLink" value="<%= PageUtils.getResolvedPath("/common/images/designs/social-icons-d-facebook.gif", "", slingRequest, pageContext) %>" />
								<img src="${facebookLink}" alt="Facebook" />
							</a>
						</c:if>
						<c:if test="${not empty properties.twitterlink}">
							<a href="${properties.twitterlink}"
								<c:if test="${not empty properties.twitterinterstitial}"> class="${properties.twitterinterstitial}"</c:if>
								<c:if test="${not empty properties.twitterlinktarget}"> target="_blank"</c:if>
								<c:if test="${not empty properties.twitterlinkonclick}"> onclick="${properties.twitterlinkonclick}"</c:if>>
								<c:set var="twitterLink" value="<%= PageUtils.getResolvedPath("/common/images/designs/social-icons-d-twitter.gif", "", slingRequest, pageContext) %>" />
								<img src="${twitterLink}" alt="Twitter" />
							</a>
						</c:if>
						<c:if test="${not empty properties.youtubelink}">
							<a href="${properties.youtubelink}"
								<c:if test="${not empty properties.youtubeinterstitial}"> class="${properties.youtubeinterstitial}"</c:if>
								<c:if test="${not empty properties.youtubelinktarget}"> target="_blank"</c:if>
								<c:if test="${not empty properties.youtubelinkonclick}"> onclick="${properties.youtubelinkonclick}"</c:if>>
								<c:set var="youtubeLink" value="<%= PageUtils.getResolvedPath("/common/images/designs/social-icons-d-youtube.gif", "", slingRequest, pageContext) %>" />
								<img src="${youtubeLink}" alt="YouTube" />
							</a>
						</c:if>
						<c:if test="${not empty properties.additionallink}">
							<a href="${properties.additionallink}"
								<c:if test="${not empty properties.additionalinterstitial}"> class="${properties.additionalinterstitial}"</c:if>
								<c:if test="${not empty properties.additionallinktarget}"> target="_blank"</c:if>
								<c:if test="${not empty properties.additionallinkonclick}"> onclick="${properties.additionallinkonclick}"</c:if>>
								<img src="${properties.additionalIcon}" alt="${properties.additionalAltText}" />
							</a>
						</c:if>
					</div>
				</div>
			</c:if>
		</div>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			<div style="color: black;">Double click to configure Sidebar Twitter Feed component</div> 
		</c:if>
	</c:otherwise>	
</c:choose>