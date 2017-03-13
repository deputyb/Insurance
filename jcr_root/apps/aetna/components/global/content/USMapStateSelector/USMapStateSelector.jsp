<%@include file="/apps/aetna/components/global/global.jsp"%>

<div class="container-fluid module mapMod padding48">
	<div class="row-fluid">
	    	<div class="wrapTop">
				<div class="span10"><h2 class="greenText">Find out if Aetna products are available on exchanges in your state</h2></div>
	</div>
	<div class="row-fluid">			
			<div class="span9">
				<p class="grayText">In 2014, we're offering individual plans on exchanges in some states. To learn more about what's available, use the drop-down to select each state:</p>
			</div>
			<div class="span2 offset1">
				<form>
					<div class="selectWrap" style="width:275px">
					<select id="dynamic_select" class="autoSubmit" style="width:110%;"
					onchange="Aetna.analytics.omniture.linkCode('aeCustLnk','State Selection',this,this.value);s.tl(this,'o',linkText);">
						<option value="">Select Your State</option>
						<option value="health-insurance-exchange/arizona-health-insurance-exchange.html">Arizona</option>
						<option value="health-insurance-exchange/district-of-columbia-health-insurance-exchange.html">District of Columbia</option>
						<option value="health-insurance-exchange/florida-health-insurance-exchange.html">Florida</option>
						<option value="health-insurance-exchange/illinois-health-insurance-exchange.html">Illinois</option>
						<option value="health-insurance-exchange/oklahoma-health-insurance-exchange.html">Oklahoma</option>
						<option value="health-insurance-exchange/pennsylvania-health-insurance-exchange.html">Pennsylvania</option>
						<option value="health-insurance-exchange/texas-health-insurance-exchange.html">Texas</option>
						<option value="health-insurance-exchange/virginia-health-insurance-exchange.html">Virginia</option>
					</select></div>
				</form>
			</div>
			<div class="articleSpacer span12"></div>
		</div><!--end wrapTop-->
			<div class="wrapMiddle">
				<div class="usIntMap visible-desktop">
					<div class="intMap medicaid">
						
						<div class="az state on"><a href="health-insurance-exchange/arizona-health-insurance-exchange.html" class="aetnamap-az" onclick="Aetna.analytics.omniture.linkCode('aeCustLnk','State Selection',this,'Arizona');s.tl(this,'o',linkText,null,'navigate');return false;"></a></div>
						
						<div class="dc state on"><a href="health-insurance-exchange/district-of-columbia-health-insurance-exchange.html" class="aetnamap-dc" onclick="Aetna.analytics.omniture.linkCode('aeCustLnk','State Selection',this,'district-of-columbia');s.tl(this,'o',linkText,null,'navigate');return false;"></a><a href="health-insurance-exchange/district-of-columbia-health-insurance-exchange.html" class="aetnamap-dc two" onclick="Aetna.analytics.omniture.linkCode('aeCustLnk','State Selection',this,'district-of-columbia');s.tl(this,'o',linkText,null,'navigate');return false;"></a></div>
						
						<div id="florida" class="fl state on"><a href="health-insurance-exchange/florida-health-insurance-exchange.html" class="aetnamap-fl" onclick="Aetna.analytics.omniture.linkCode('aeCustLnk','State Selection',this,'florida');s.tl(this,'o',linkText,null,'navigate');return false;"></a></div>
						
						<div id="illinois" class="il state on"><a href="health-insurance-exchange/illinois-health-insurance-exchange.html" class="aetnamap-il" onclick="Aetna.analytics.omniture.linkCode('aeCustLnk','State Selection',this,'illinois');s.tl(this,'o',linkText,null,'navigate');return false;"></a><a href="health-insurance-exchange/illinois-health-insurance-exchange.html" class="aetnamap-il two" onclick="Aetna.analytics.omniture.linkCode('aeCustLnk','State Selection',this,'illinois');s.tl(this,'o',linkText,null,'navigate');return false;"></a></div>
						
						<div id="pennsylvania" class="pa state on"><a href="health-insurance-exchange/pennsylvania-health-insurance-exchange.html" class="aetnamap-pa" onclick="Aetna.analytics.omniture.linkCode('aeCustLnk','State Selection',this,'pennsylvania');s.tl(this,'o',linkText,null,'navigate');return false;"></a></div>
						
						<div id="texas" class="tx state on"><a href="health-insurance-exchange/texas-health-insurance-exchange.html" class="aetnamap-tx" onclick="Aetna.analytics.omniture.linkCode('aeCustLnk','State Selection',this,'texas');s.tl(this,'o',linkText,null,'navigate');return false;"></a><a href="health-insurance-exchange/texas-health-insurance-exchange.html" class="aetnamap-tx two" onclick="Aetna.analytics.omniture.linkCode('aeCustLnk','State Selection',this,'texas');s.tl(this,'o',linkText,null,'navigate');return false;"></a><a href="health-insurance-exchange/texas-health-insurance-exchange.html" class="aetnamap-tx three" onclick="Aetna.analytics.omniture.linkCode('aeCustLnk','State Selection',this,'texas');s.tl(this,'o',linkText,null,'navigate');return false;"></a></div>
						<div class="ok state on"><a href="health-insurance-exchange/oklahoma-health-insurance-exchange.html" class="aetnamap-ok" onclick="Aetna.analytics.omniture.linkCode('aeCustLnk','State Selection',this,'oklahoma');s.tl(this,'o',linkText,null,'navigate');return false;"></a><a href="health-insurance-exchange/oklahoma-health-insurance-exchange.html" class="aetnamap-ok two" onclick="Aetna.analytics.omniture.linkCode('aeCustLnk','State Selection',this,'oklahoma');s.tl(this,'o',linkText,null,'navigate');return false;"></a></div>
						
						<div id="virginia" class="va state on"><a href="health-insurance-exchange/virginia-health-insurance-exchange.html" class="aetnamap-va" onclick="Aetna.analytics.omniture.linkCode('aeCustLnk','State Selection',this,'virginia');s.tl(this,'o',linkText,null,'navigate');return false;"></a><a href="health-insurance-exchange/virginia-health-insurance-exchange.html" class="aetnamap-va two" onclick="Aetna.analytics.omniture.linkCode('aeCustLnk','State Selection',this,'virginia');s.tl(this,'o',linkText,null,'navigate');return false;"></a><a href="health-insurance-exchange/virginia-health-insurance-exchange.html" class="aetnamap-va three" onclick="Aetna.analytics.omniture.linkCode('aeCustLnk','State Selection',this,'virginia');s.tl(this,'o',linkText,null,'navigate');return false;"></a></div>
						
					</div>		
				</div><!--/.usIntMap-->
			</div>
			<div class="span6">
				<p class="noMargin otherPlans">Don't forget -- you can also buy a plan by shopping with Aetna. However, you won't be able to apply for financial help when you <a href=" https://healthinsurance.aetna.com/" target="_blank" onclick="Aetna.analytics.omniture.linkCode('aeAetnaExitA','Shop for an Aetna plan today',this);s.tl(this,'e',linkText);">buy directly from us</a>.
				</p>
			</div>
			
	</div><!--/.row-fluid-->


	<!--  <div class="row-fluid mapSubText">
		<div class="span6">
			<p>We manage plans across the country including the Children's Health Insurance Plan (CHIP), plans for people on Medicaid and Medicare and long-term care programs. Our plans go by different names in different states, but they all offer the same high-quality care.</p>
		</div>
	</div>	-->
					
</div>
