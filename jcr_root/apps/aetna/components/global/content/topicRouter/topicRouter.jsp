<%@include file="/apps/aetna/components/global/global.jsp"%>
<c:set var="hasImage" value="<%= currentNode != null && currentNode.hasNode("image") && (currentNode.getNode("image").hasProperty("fileReference") || currentNode.getNode("image").hasNode("file")) %>" />
<c:set var="hasAnimationImage" value="<%= currentNode != null && currentNode.hasNode("animationimage") && (currentNode.getNode("animationimage").hasProperty("fileReference") || currentNode.getNode("animationimage").hasNode("file")) %>" />
	<div class="router"<c:if test="${hasImage}"><c:set scope="request" var="imageName" value="image"/> style="<cq:include script="../utils/render.backgroundimage.jsp" />"</c:if>>
		<div class="alertBar ie7Show">
			<div class="inner">
				<p>This site is best viewed in Internet Explorer&reg; 8 or higher. You can also try Firefox&reg;, Chrome<span class="superscript">TM</span>or Safari&reg;. <a href="http://windows.microsoft.com/en-us/internet-explorer/ie-10-worldwide-languages">Upgrade</a></p>
			</div>
		</div>
		<div class="animContainer"<c:if test="${hasAnimationImage}"><c:set scope="request" var="imageName" value="animationimage"/> style="<cq:include script="../utils/render.backgroundimage.jsp" />"</c:if>>
			<div class="container-fluid routerHeadingLinks">
				<div class="row-fluid">
					<div class="span6 logo martop40">
						<a href="#" title=""tabindex="1"><img src="/common/images/designs/logo.png" alt="logo"></a>
					</div>
					<div class="span5 martop40 offset1 visible-tablet visible-desktop ie7Hide">
						<c:choose>
							<c:when test="${not empty properties.desktoptext}">
								${properties.desktoptext}
							</c:when>
							<c:otherwise>
								<div>
									<h3 class="greenText">Welcome to Aetna</h3>
									<p>Find health plans and insurance solutions to fit your needs. Select an option below to learn more.</p>
								</div>
								<div class="underlined">
									<h3><span class="greyText">for</span> <a href="individuals-families.html" class="arrowBlueBig path if" onclick="Aetna.analytics.omniture.linkCode('aeRouter','for Individuals & Families',this);s.tl(this,'o',linkText,null,'navigate');return false;">Individuals &amp; Families</a></h3>
									<p>Learn about our insurance plans including medical, dental and Medicare. Plus, shop the Health Insurance Exchange/Marketplace, access member tools and more.</p>
									<p><a href="https://member.aetna.com/appConfig/login/login.fcc?TYPE=33554433&REALMOID=06-36d8cb4d-4ac1-44c7-b12d-a80fba4b718e&GUID=&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=-SM-xU5km2Pz5%2f9A%2f2FCwUlXE48HlDkyH9ruz3da8Iqw6pwcy09mgHFN5RmlkMNqguY5&TARGET=-SM-HTTPS%3a%2f%2fmember%2eaetna%2ecom%2fMbrLanding%2fRoutingServlet%3fcreateSession%3dtrue&WT.svl=Login_nav" 
											class="path if" onclick="Aetna.analytics.omniture.linkCode('aeLoginClkA','Login Exits',this);s.tl(this,'e',linkText,null,'navigate');return false;"><span class="icn login"></span><strong>Log In  / <span class="arrowBlueSmall">Register</span></strong></a></p> 
								</div> 	
								<div>
									<p class="audienceLink"><span class="greyText">for</span> <a href="employers-organizations.html" class="arrowBlueSmall path employers" onclick="Aetna.analytics.omniture.linkCode('aeRouter','for Employers & Organizations',this);s.tl(this,'o',linkText,null,'navigate');return false;">Employers &amp; Organizations</a></p>
									<p class="audienceLink"><span class="greyText">for</span> <a href="health-care-professionals.html" class="arrowBlueSmall path hcp" onclick="Aetna.analytics.omniture.linkCode('aeRouter','for Health Care Professionals',this);s.tl(this,'o',linkText,null,'navigate');return false;">Health Care Professionals</a></p>
									<p class="audienceLink"><span class="greyText">for</span> <a href="insurance-producer.html" class="arrowBlueSmall path producers" onclick="Aetna.analytics.omniture.linkCode('aeRouter','for Producers',this);s.tl(this,'o',linkText,null,'navigate');return false;">Producers</a></p>
								</div>
							</c:otherwise>
						</c:choose>
					</div><!--/.span6-->
					<div class="span5 martop40 offset1 ie7Show">
						<c:choose>
							<c:when test="${not empty properties.ie7text}">
								${properties.ie7text}
							</c:when>
							<c:otherwise>
								<div>
									<h3 class="greenText">Welcome to Aetna</h3>
								</div>
								<div class="underlined">
									<h3><span class="greyText">Individuals &amp; Families</span></h3>
									<p><a href="https://member.aetna.com/appConfig/login/login.fcc?TYPE=33554433&REALMOID=06-36d8cb4d-4ac1-44c7-b12d-a80fba4b718e&GUID=&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=-SM-xU5km2Pz5%2f9A%2f2FCwUlXE48HlDkyH9ruz3da8Iqw6pwcy09mgHFN5RmlkMNqguY5&TARGET=-SM-HTTPS%3a%2f%2fmember%2eaetna%2ecom%2fMbrLanding%2fRoutingServlet%3fcreateSession%3dtrue&WT.svl=Login_nav" 
											class="path if" onclick="Aetna.analytics.omniture.linkCode('aeLoginClkA','Login Exits',this);s.tl(this,'e',linkText,null,'navigate');return false;"><span class="icn login"></span><strong>Log In  / <span class="arrowBlueSmall">Register</span></strong></a></p>
									<p><a href="http://www.aetna.com/dse/search?site_id=docfind&langpref=en&tabKey=tab1" 
											class="path if"><strong><span class="arrowBlueSmall left-align">Search DocFind<span class="superscript">&reg;</span></span></strong></a></p> 		 
								</div> 	
								<div>
									<h3><span class="greyText">Producers</span></h3>
									<p><a href="https://www.aetna.com/producer_public/login.fcc?TYPE=33554433&REALMOID=06-aab84995-cc4b-11d5-8cb8-0008c7df6a81&GUID=&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=-SM-g96BoeA31Sn1BtbDw57yO6bTsqp6znM8Xzh%2bwJ0sKfnhlD9LVZJRNjMICttXsdG9&TARGET=-SM-https%3a%2f%2fwww%2eaetna%2ecom%2fproducer%2fLogin%2edo" 
											class="path if" onclick="Aetna.analytics.omniture.linkCode('aeLoginClkA','Login Exits',this);s.tl(this,'e',linkText,null,'navigate');return false;"><span class="icn login"></span><strong>Log In  / Register / <span class="arrowBlueSmall">Get a Quote</span></strong></a></p>
									<p><a href="https://pangea.geninfo.com/Aetna/Apply/" 
											class="path if"><strong><span class="arrowBlueSmall left-align">Become appointed with Aetna</span></strong></a></p> 
								</div>
								<div>
								        <p><span class="greyText left-align">for</span> <a href="employers-organizations.html" class="arrowBlueSmall path employers" onclick="Aetna.analytics.omniture.linkCode('aeRouter','for Employers & Organizations',this);s.tl(this,'o',linkText,null,'navigate');return false;">Employers &amp; Organizations</a></p>
								        <p><span class="greyText left-align">for</span> <a href="health-care-professionals.html" class="arrowBlueSmall path hcp" onclick="Aetna.analytics.omniture.linkCode('aeRouter','for Health Care Professionals',this);s.tl(this,'o',linkText,null,'navigate');return false;">Health Care Professionals</a></p>
								</div>
							</c:otherwise>
						</c:choose>
					</div><!--/.span6-->
				</div><!--/.row-fluid-->
				<div class="row-fluid visible-phone">
				</div><!--/.row-fluid-->	
				<div class="row-fluid">
					
				</div><!--/.row-fluid-->

			</div><!--/.container-fluid-->
			</div><!--/.routerLinks-->
		<div class="routerContent">
			<div class="container-fluid">
				<cq:include path="bottom" resourceType="/libs/foundation/components/parsys" />
			</div><!--/.container-fluid-->
	</div><!--/.router-->
	
<!--/.container-fluid-->
	</div><!--/.router-->
	
