<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
    <c:when test="${not empty currentStyle.printlinktext}">
		<ul class="printShare">
			<li class="noLink printPage">
				<a href="">${currentStyle.printlinktext}</a>
			</li>
			<li>
				<a id="util-bookmarks" href="http://www.addthis.com/bookmark.php" style="text-decoration:none;" onmouseover="return addthis_open(this, '', '[URL]', '[TITLE]');" onmouseout="addthis_close();" onclick="return addthis_sendto();">${currentStyle.sharelinktext}</a>
			</li>
		</ul>
	</c:when>
	<c:otherwise>
		<c:if test="${isEditMode}">
			Configure the Print - Share component on Design Mode
		</c:if>
	</c:otherwise>
</c:choose>