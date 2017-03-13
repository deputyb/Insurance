<%@include file="/apps/aetna/components/global/global.jsp" %>
<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<div class="column-links-wrapper">
	<c:forEach var="linkIndex" begin="1" end="3">
		<div class="column-link">
			<div class="column-link-inner">
				<c:if test="${!isEditMode}">	
					<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);  %>
					<span class="arrowWhiteSmall">
				</c:if>
				<cq:include path="link-${linkIndex}" resourceType="aetna/components/global/content/link" />
				<c:if test="${isEditMode}">
					<span class="arrowWhiteSmall">
				</c:if>
				</span>
			</div>
		</div>
	</c:forEach>
</div>	
<c:if test="${isEditMode}">
	<style>
		.columnLinks {
			margin: 40px -29px -7px;
			width: 398px;
		}
		.columnLinks .column-link {
			width: 132px;
		}
		.columnLinks .column-link .column-link-inner .link {
			float: left;
		}
	</style>
</c:if>