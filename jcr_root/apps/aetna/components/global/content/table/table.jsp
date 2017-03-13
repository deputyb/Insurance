<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
    <c:when test="${not empty properties.rowsqty}">
    	<%-- Determine if the columns should have the same width --%>
    	<c:if test="${not empty properties.colssamewidth}">
    		<c:set var="colsWidth" value=" width=\"${100 / properties.colsqty}%\"" />
    	</c:if>
    	
    	<%-- Process the table classes --%>
    	<c:forEach var="class" items="${properties.classes}">
    		<c:set var="classes" value="${class} ${classes}" />
    	</c:forEach>
    	
    	<c:if test="${not empty properties.removetextspacing}">
    		<c:set var="classes" value="${classes} removetextspacing" />
    	</c:if>
		<table<c:if test="${not empty classes}"> class="${classes}"</c:if>
			<c:if test="${not empty properties.colssamewidth}"> width="100%"</c:if>>
			<c:forEach var="rowIndex" begin="1" end="${properties.rowsqty}">
				<%-- Table header or body tag set --%>
				<c:choose>
					<c:when test="${not empty properties.firstrowheader && rowIndex == 1}">
						<thead>
					</c:when>
					<c:when test="${(empty properties.firstrowheader && rowIndex == 1) || (not empty properties.firstrowheader && rowIndex == 2)}">
						<tbody>
					</c:when>
				</c:choose>			
			
				<c:set var="rowClass" value="" />
				
				<%-- Table header or body tag set --%>
				<c:if test="${not empty properties.firstrowheader && rowIndex == 1}">
					<c:set var="rowClass" value="tableHeader" />
				</c:if>
				
				<tr<c:if test="${not empty rowClass}"> class="${rowClass}"</c:if>>
					<c:forEach var="colIndex" begin="1" end="${properties.colsqty}">
						<c:choose>
							<c:when test="${rowIndex == 1 && properties.firstrowcolspan}">
								<c:if test="${colIndex == 1}">
									<td${colsWidth} colspan="${properties.rowsqty}">
										<c:if test="${!isEditMode}">
											<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);%>
										</c:if>
										<cq:include path="cell-${rowIndex}-${colIndex}" resourceType="aetna/components/global/content/articleModule" />
									</td>
								</c:if>
							</c:when>
							<c:otherwise>
								<td${colsWidth}>
									<c:if test="${!isEditMode}">
										<% IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);%>
									</c:if>
									<cq:include path="cell-${rowIndex}-${colIndex}" resourceType="aetna/components/global/content/articleModule" />
								</td>
							</c:otherwise>
						</c:choose>
					</c:forEach>
				</tr>
				
				<%-- Table header or body tag set --%>
				<c:choose>
					<c:when test="${not empty properties.firstrowheader && rowIndex == 1}">
						</thead>
					</c:when>
					<c:when test="${rowIndex == properties.rowsqty}">
						</tbody>
					</c:when>
				</c:choose>
			</c:forEach>
		</table>
    </c:when>
    <c:otherwise>
    	<c:if test="${isEditMode}">
			Click on Edit button to configure the Table component
		</c:if>
    </c:otherwise>
</c:choose>