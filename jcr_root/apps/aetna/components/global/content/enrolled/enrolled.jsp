<%@include file="/apps/aetna/components/global/global.jsp" %>
<div class="container-fluid module padding48 graybg enrollSteps">
	<div class="row-fluid">
		<div class="span12">
			<h2 class="noMargin">
				<c:choose>
					<c:when test="${not empty properties.title}">
						${properties.title}
					</c:when>
					<c:otherwise>
						Once you've enrolled		
					</c:otherwise>
				</c:choose>
			</h2>
			<c:choose>
				<c:when test="${not empty properties.text}">
					${properties.text}
				</c:when>
				<c:otherwise>
					<p>Once you've purchased an Aetna health benefits or insurance plan on the exchange, here's what you can expect:</p>
				</c:otherwise>
			</c:choose>
			<p>
				<h4 class="enrollStepText whiteText noPadding">
					<c:choose>
						<c:when test="${not empty properties.subheading}">
							${properties.subheading}
						</c:when>
						<c:otherwise>
							Getting started
						</c:otherwise>
					</c:choose>
				</h4>
			</p>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span3">
			<div class="step">
				<span class="one enrollStep"></span>
				<h4 class="enrollStepText whiteText">
					<c:choose>
						<c:when test="${not empty properties.titlestep1}">
							${properties.titlestep1}
						</c:when>
						<c:otherwise>
							Activate your coverage
						</c:otherwise>
					</c:choose>
				</h4>
			</div>
			<c:choose>
				<c:when test="${not empty properties.richtext1}">
					<div class="stepText">
						${properties.richtext1}
					</div>
				</c:when>
				<c:otherwise>
				
					<p class="fl">
						<c:choose>
							<c:when test="${not empty properties.textstep1}">
								${properties.textstep1}
							</c:when>
							<c:otherwise>
								You'll receive a "What Comes Next" letter from us, along with your first month's premium invoice. Pick the payment method that works for you.
							</c:otherwise>
						</c:choose>
					</p>
					<c:set var="renderBullets" value="${fn:length(properties.bulletsstep1) > 0}" />
					<c:if test="${renderBullets}">
						<ul class="bulleted fl">
						<c:forEach var="bullet" items="${properties.bulletsstep1}">
							<c:set var="bulletText" value="${fn:replace(fn:replace(bullet, '</p>', ''), '<p>', '')}" />
							<c:if test="${not empty bulletText}">
								<li>${bulletText}</li>
							</c:if>
						</c:forEach>
						</ul>
					</c:if>
				</c:otherwise>
			</c:choose>				
		</div>
		<div class="span3 stepTwo">
			<div class="step">
				<span class="two enrollStep"></span>
				<h4 class="enrollStepText whiteText">
					<c:choose>
						<c:when test="${not empty properties.titlestep2}">
							${properties.titlestep2}
						</c:when>
						<c:otherwise>
							Get a quick overview
						</c:otherwise>
					</c:choose>
				</h4>
			</div>
			<c:choose>
				<c:when test="${not empty properties.richtext2}">
					<div class="stepText">
						${properties.richtext2}
					</div>
				</c:when>
				<c:otherwise>			
					<p class="fl">
						<c:choose>
							<c:when test="${not empty properties.textstep2}">
								${properties.textstep2}
							</c:when>
							<c:otherwise>
								Now that you're officially enrolled, you'll get information to help you understand your plan and the many features it offers you, including:
							</c:otherwise>
						</c:choose>
					</p>
					<ul class="bulleted fl">
						<c:set var="renderBullets" value="${fn:length(properties.bulletsstep2) > 0}" />
						<c:choose>
							<c:when test="${renderBullets}">
								<c:forEach var="bullet" items="${properties.bulletsstep2}">
									<c:set var="bulletText" value="${fn:replace(fn:replace(bullet, '</p>', ''), '<p>', '')}" />
									<c:if test="${not empty bulletText}">
										<li>${bulletText}</li>
									</c:if>
								</c:forEach>
							</c:when>
							<c:otherwise>
								<li>A <span class="strong">"quick start"</span> guide that walks you through three easy steps to begin getting the most from your plan.</li>
								<li>Your <span class="strong">ID card</span> with the phone number to your Member Services team, in case you have any questions.</li>
							</c:otherwise>
						</c:choose>
					</ul>
				</c:otherwise>
			</c:choose>
		</div>
		<div class="span3 stepThree">
			<div class="step">
				<span class="three enrollStep"></span>
				<h4 class="enrollStepText whiteText">
					<c:choose>
						<c:when test="${not empty properties.titlestep3}">
							${properties.titlestep3}
						</c:when>
						<c:otherwise>
							Get connected
						</c:otherwise>
					</c:choose>
				</h4>
			</div>
			<c:choose>
				<c:when test="${not empty properties.richtext3}">
					<div class="stepText">
						${properties.richtext3}
					</div>
				</c:when>
				<c:otherwise>			
					<p class="fl">
						<c:choose>
							<c:when test="${not empty properties.textstep3}">
								${properties.textstep3}
							</c:when>
							<c:otherwise>
								Register for our online and mobile self-serve resources. They give you access to the information you need, when you need it. Quick, convenient, and hassle-free!
							</c:otherwise>
						</c:choose>
					</p>
					<c:set var="renderBullets" value="${fn:length(properties.bulletsstep3) > 0}" />
					<c:if test="${renderBullets}">
						<ul class="bulleted fl">
						<c:forEach var="bullet" items="${properties.bulletsstep3}">
							<c:set var="bulletText" value="${fn:replace(fn:replace(bullet, '</p>',''), '<p>', '')}" />
							<c:if test="${not empty bulletText}">
								<li>${bulletText}</li>
							</c:if>
						</c:forEach>
						</ul>
					</c:if>
				</c:otherwise>
			</c:choose>
		</div>
		<div class="span3">
			<div class="step">
				<span class="four enrollStep"></span>
				<h4 class="enrollStepText whiteText">
					<c:choose>
						<c:when test="${not empty properties.titlestep4}">
							${properties.titlestep4}
						</c:when>
						<c:otherwise>
							Personal information
						</c:otherwise>
					</c:choose>
				</h4>
			</div>
			<c:choose>
				<c:when test="${not empty properties.richtext4}">
					<div class="stepText">
						${properties.richtext4}
					</div>
				</c:when>
				<c:otherwise>				
					<p class="fl">
						<c:choose>
							<c:when test="${not empty properties.textstep4}">
								${properties.textstep4}
							</c:when>
							<c:otherwise>
								When you are enrolled with us and need to change any personal information, contact the exchange/marketplace. This includes changing your address or phone number. 
							</c:otherwise>
						</c:choose>
					</p>
					<c:set var="renderBullets" value="${fn:length(properties.bulletsstep4) > 0}" />
					<c:if test="${renderBullets}">
						<ul class="bulleted fl">
						<c:forEach var="bullet" items="${properties.bulletsstep4}">
							<c:set var="bulletText" value="${fn:replace(fn:replace(bullet, '</p>', ''), '<p>', '')}" />
							<c:if test="${not empty bulletText}">
								<li>${bulletText}</li>
							</c:if>
						</c:forEach>
						</ul>
					</c:if>
				</c:otherwise>
			</c:choose>
		</div>
	</div>
</div>