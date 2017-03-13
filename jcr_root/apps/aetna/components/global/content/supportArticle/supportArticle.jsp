<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<c:choose>
    <c:when test="${not empty properties.col1text}">
		<div class="container-fluid module padding48 reachUs greenbg">
		    <div class="contentGroup">
		    	<c:if test="${not empty properties.title}">
			        <div class="row-fluid">
			            <div class="span12">
			                <h2 class="whiteText">${properties.title}</h2>
			            </div><!--end .span12-->
			        </div><!--/row-fluid-->
			    </c:if>
		        <div class="row-fluid">
		            <div class="span6">
		                <cq:text property="col1text" />
		            </div>
		            <div class="span6">
		                <cq:text property="col2text" />
		            </div>
		        </div><!--/.row-fluid-->
		    </div><!--/.contentGroup-->
		</div>
	</c:when>
    <c:otherwise>
    	<c:if test="${isEditMode}">
			Double click to configure the Article Contact Us component
		</c:if>
    </c:otherwise>
</c:choose>