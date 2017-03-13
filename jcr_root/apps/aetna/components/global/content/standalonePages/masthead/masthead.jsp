<%@include file="/apps/aetna/components/global/global.jsp"%>
<%@page import="com.aetna.cq.common.cq.utils.NodeUtils" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<div class="<c:if test="${!isEditMode}">fixedHeaderWrap </c:if>removeMobile">
	<c:if test="${isEditMode}">
		<style>
			header {
				position: absolute;
				top: 0;
				z-index: 0;
			}
		</style>
	</c:if>
	<header>
		<div class="headerBar">
			<div class="container-fluid">
				<div class="row-fluid header">
					<div class="span3 logo">
						<img alt="logo" src="/common/images/designs/logo.png" />						
					</div>
					<c:if test="${not empty properties.showSearchbox}">
						<div class="span6">&nbsp;</div>
						<div class="span3 mainMenu">
							<ul>
								<li class="searchwrap">
									<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
									<cq:include path="search"
										resourceType="/apps/aetna/components/global/content/search" />
								</li>
							</ul>
						</div>
					</c:if>
				</div><!--end row-fluid *header row-->
			</div><!--/.fluid-container-->
		</div><!--end .headerBar-->
	</header>
</div>