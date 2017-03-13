<%@include file="/apps/aetna/components/global/global.jsp"%>

<div class="container-fluid module modIntMap padding48">
	<div class="row-fluid">
				<div class="row-fluid">
					<div class="span6">
						<h2 class="greenText">Aetna and Medicaid</h2>
					</div>
					<div class="span6">
						<form>
							<div class="selectWrap"><select>
								<option value="">Select your state</option>
								<option value="arizona">Arizona</option>
								<option value="delaware">Delaware</option>
								<option value="illinois">Illinois</option>
								<option value="newYork">New York</option>
								<option value="pennsylvania">Pennsylvania</option>
								<option value="texas">Texas</option>
								<option value="virginia">Virginia</option>
							</select></div>
						</form>
					</div>
				</div>
			<div class="span12 wrapMiddle">
				<h4 class="grayText"></h4>
			</div>
			<div class="wrapMiddle">
				<div class="usIntMap visible-desktop">
					<div class="intMap medicaid">
						<div id="arizona" class="az state on"><a href="javascript:void(0)" class="aetnamap-az" onclick="Aetna.analytics.omniture.linkCode('aeCustLnk','Select Your State',this,'Arizona');s.tl(this,'o',linkText,null,'navigate');return false;"></a></div>
						<div id="delaware" class="de state on"><a href="javascript:void(0)" class="aetnamap-de" onclick="Aetna.analytics.omniture.linkCode('aeCustLnk','Select Your State',this,'Delaware');s.tl(this,'o',linkText,null,'navigate');return false;"></a>
						<a href="javascript:void(0)" class="aetnamap-de two" onclick="Aetna.analytics.omniture.linkCode('aeCustLnk','Select Your State',this,'Delaware');s.tl(this,'o',linkText,null,'navigate');return false;"></a></div>
						<div id="illinois" class="il state on"><a href="javascript:void(0)" class="aetnamap-il" onclick="Aetna.analytics.omniture.linkCode('aeCustLnk','Select Your State',this,'Illinois');s.tl(this,'o',linkText,null,'navigate');return false;"></a>
						<a href="javascript:void(0)" class="aetnamap-il two" onclick="Aetna.analytics.omniture.linkCode('aeCustLnk','Select Your State',this,'Illinois');s.tl(this,'o',linkText,null,'navigate');return false;"></a></div>
						<div id="newYork" class="ny state on"><a href="javascript:void(0)" class="aetnamap-ny" onclick="Aetna.analytics.omniture.linkCode('aeCustLnk','Select Your State',this,'New York');s.tl(this,'o',linkText,null,'navigate');return false;"></a>
						<a href="javascript:void(0)" class="aetnamap-ny two" onclick="Aetna.analytics.omniture.linkCode('aeCustLnk','Select Your State',this,'New York');s.tl(this,'o',linkText,null,'navigate');return false;"></a></div>
						<div id="pennsylvania" class="pa state on"><a href="javascript:void(0)" class="aetnamap-pa" onclick="Aetna.analytics.omniture.linkCode('aeCustLnk','Select Your State',this,'Pennsylvania');s.tl(this,'o',linkText,null,'navigate');return false;"></a></div>
						<div id="texas" class="tx state on"><a href="javascript:void(0)" class="aetnamap-tx" onclick="Aetna.analytics.omniture.linkCode('aeCustLnk','Select Your State',this,'Texas');s.tl(this,'o',linkText,null,'navigate');return false;"></a>
						<a href="javascript:void(0)" class="aetnamap-tx two" onclick="Aetna.analytics.omniture.linkCode('aeCustLnk','Select Your State',this,'Texas');s.tl(this,'o',linkText,null,'navigate');return false;"></a>
						<a href="javascript:void(0)" class="aetnamap-tx three" onclick="Aetna.analytics.omniture.linkCode('aeCustLnk','Select Your State',this,'Texas');s.tl(this,'o',linkText,null,'navigate');return false;"></a></div>
						<div id="virginia" class="va state on"><a href="javascript:void(0)" class="aetnamap-va" onclick="Aetna.analytics.omniture.linkCode('aeCustLnk','Select Your State',this,'Virginia');s.tl(this,'o',linkText,null,'navigate');return false;"></a>
						<a href="javascript:void(0)" class="aetnamap-va two" onclick="Aetna.analytics.omniture.linkCode('aeCustLnk','Select Your State',this,'Virginia');s.tl(this,'o',linkText,null,'navigate');return false;"></a>
						<a href="javascript:void(0)" class="aetnamap-va three" onclick="Aetna.analytics.omniture.linkCode('aeCustLnk','Select Your State',this,'Virginia');s.tl(this,'o',linkText,null,'navigate');return false;"></a></div>
					</div>		
				</div><!--/.usIntMap-->
			</div>			
	</div><!--/.row-fluid-->
	<div style="display: none; top: 20px;" class="infoBox texas">
			<h4>Texas</h4>
			<p>
				<a href="http://parklandhmo.com/" target="_blank" onclick="Aetna.analytics.omniture.linkCode('aeAetnaExit','State tooltip links',this,'Parkland Community Health Plan (Dallas)');s.tl(this,'e',linkText);">Parkland Community Health Plan (Dallas)</a><br>
				<a href="http://www.christushealthplan.org/" target="_blank" onclick="Aetna.analytics.omniture.linkCode('aeAetnaExit','State tooltip links',this,'CHRISTUS Health Plan (Nueces)');s.tl(this,'e',linkText);">CHRISTUS Health Plan (Nueces)</a><br>
				<a href="http://www.aetnamedicaid.com/default_en.asp" target="_blank" onclick="Aetna.analytics.omniture.linkCode('aeAetnaExit','State tooltip links',this,'Aetna Better Health of Texas (Bexar and Tarrant)');s.tl(this,'e',linkText);">Aetna Better Health of Texas (Bexar and Tarrant)</a>
			</p>
			<a href="#" class="close"></a>
	</div>
	<div style="display: none; top: 20px;" class="infoBox arizona">
			<h4>Arizona</h4>
			<p>
				<a href="http://www.mercycareplan.com/default.aspx" target="_blank" onclick="Aetna.analytics.omniture.linkCode('aeAetnaExit','State tooltip links',this,'Mercy Care Plan');s.tl(this,'e',linkText);">Mercy Care Plan</a><br>
				<a href="http://www.mercycareplan.com/mca/" target="_blank" onclick="Aetna.analytics.omniture.linkCode('aeAetnaExit','State tooltip links',this,'Mercy Care Advantage (HMO SNP)');s.tl(this,'e',linkText);">Mercy Care Advantage (HMO SNP)</a>
			</p>
			<a href="#" class="close"></a>
	</div>
	<div style="display: none; top: 20px;" class="infoBox delaware">
			<h4>Delaware</h4>
			<p>
				<a href="http://www.delawarephysicianscare.com/" target="_blank" onclick="Aetna.analytics.omniture.linkCode('aeAetnaExit','State tooltip links',this,'Delaware Physicians Care');s.tl(this,'e',linkText);">Delaware Physicians Care</a>
			</p>
			<a href="#" class="close"></a>
	</div>
	
	<div style="display: none; top: 20px;" class="infoBox illinois">
			<h4>Illinois</h4>
			<p>
				<a href="http://www.aetnabetterhealth.com/Illinois/default.aspx" target="_blank" onclick="Aetna.analytics.omniture.linkCode('aeAetnaExit','State tooltip links',this,'Aetna Better Health of Illinois');s.tl(this,'e',linkText);">Aetna Better Health of Illinois</a>
			</p>
			<a href="#" class="close"></a>
	</div>
	
	<div style="display: none; top: 20px;" class="infoBox newYork">
			<h4>New York</h4>
			<p>
				<a href="http://www.aetnabetterhealth.com/ny/" target="_blank" onclick="Aetna.analytics.omniture.linkCode('aeAetnaExit','State tooltip links',this,'Aetna Better Health of New York');s.tl(this,'e',linkText)">Aetna Better Health of New York</a>
			</p>
			<a href="#" class="close"></a>
	</div>
	<div style="display: none; top: 20px;" class="infoBox pennsylvania">
			<h4>Pennsylvania</h4>
			<p>
				<a href="http://www.aetnabetterhealth.com/Pennsylvania/default.aspx" target="_blank" onclick="Aetna.analytics.omniture.linkCode('aeAetnaExit','State tooltip links',this,'Aetna Better Health');s.tl(this,'e',linkText);">Aetna Better Health</a><br>
				<a href="http://www.aetnabetterhealth.com/pennsylvania" target="_blank" onclick="Aetna.analytics.omniture.linkCode('aeAetnaExit','State tooltip links',this,'Aetna Better Health Kids CHIP');s.tl(this,'e',linkText);">Aetna Better Health Kids CHIP</a>
			</p>
			<a href="#" class="close"></a>
	</div>
	<div style="display: none; top: 20px;" class="infoBox virginia">
			<h4>Virginia</h4>
			<p><a href="http://www.majestacare.com/" target="_blank" onclick="Aetna.analytics.omniture.linkCode('aeAetnaExit','State tooltip links',this,'MajestaCare');s.tl(this,'e',linkText);">MajestaCare</a></p>
			<a href="#" class="close"></a>
	</div>

	<div class="row-fluid mapSubText">
		<div class="span6">
			<p>We manage plans across the country including the Children's Health Insurance Plan (CHIP), plans for people on Medicaid and Medicare and long-term care programs. Our plans go by different names in different states, but they all offer the same high-quality care.</p>
		</div>
	</div>
					
</div>