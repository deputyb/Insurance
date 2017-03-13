<%@include file="/apps/aetna/components/global/global.jsp" %>

<c:set var="isEditMode" value="<%= (WCMMode.fromRequest(request) == WCMMode.EDIT || WCMMode.fromRequest(request) == WCMMode.DESIGN) %>" />

<div class="container-fluid">
    <div class="row-fluid">
        <div class="topic">                    
            <c:choose>
                <c:when test="${not empty properties.slidesqty}">
                	<h2 class="slideHeaderTxt whiteText"><cq:text property="title" /></h2>
                    <ul class="bxslider">

                        <c:forEach var="slideIndex" begin="1" end="${properties.slidesqty}">
                        	<c:set var="slideIndexRequest" value="${slideIndex}" scope="request" />

                            <cq:include path="slide${slideIndex}" resourceType="aetna/components/global/content/topicSlideshow/topicSlideshowItem" />
                        </c:forEach>
            
                    </ul>
                </c:when>
                <c:otherwise>
                    <c:if test="${isEditMode}">
                        Click on 'Edit' button to configure the Slideshow component
                    </c:if>
                </c:otherwise>
            </c:choose>
        </div>
    </div>
</div>