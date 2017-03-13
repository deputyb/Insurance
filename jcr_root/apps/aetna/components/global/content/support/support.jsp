<%@include file="/apps/aetna/components/global/global.jsp" %>

<jsp:useBean id="stateContactSupportController" class="com.aetna.cq.bl.widgets.statecontactsupport.controller.StateContactSupportController"></jsp:useBean>
<c:set var="statesInfo" value="<%= stateContactSupportController.getStatesContactSupportInfo(currentNode.getPath(), "statesinformation", resourceResolver) %>" />

<div class="container-fluid module padding48 reachUs greenbg mainSupport">
    <div class="contentGroup">
        <div class="row-fluid">
            <div class="span12">
                <h2 class="whiteText">
                    <c:choose>
                        <c:when test="${not empty properties.title}">
                            ${properties.title}
                        </c:when>
                        <c:otherwise>
                            We're here to support you
                        </c:otherwise>
                    </c:choose>              
                </h2>
                
            </div><!--end .span12-->
        </div><!--/row-fluid-->
        <div class="row-fluid">
            <div class="span6">
                <c:choose>
                    <c:when test="${not empty properties.col1toptext}">
                        ${properties.col1toptext}
                    </c:when>
                    <c:otherwise>
                        <h3 class="whiteText">On the phone:</h3>
                        <p>Once you've enrolled, you can reach us by calling the number on your Aetna ID card.</p>
                    </c:otherwise>
                </c:choose>               
                <%-- States information --%>
                <c:if test="${fn:length(statesInfo) > 0}">
	                <form>
	                    <div class="selectWrap"><select class="numChange">
	                        <option value="">Select Your State</option>
	                        <c:forEach var="stateInfo" items="${statesInfo}">
	                        	<option value="${stateInfo.state}">${stateInfo.stateName}</option>
	                        </c:forEach>
	                    </select></div>
	                </form>
	                <div class="hixNumbers">
	                    <c:forEach var="stateInfo" items="${statesInfo}">
		                    <div class="hixNumber hixTab ${stateInfo.state}">
		                        <div class="ct">
		                            <div class="span12">
		                                ${stateInfo.supportText}
		                                <a class="mobileNumber strong" onclick="s_objectID=&quot;tel:${stateInfo.telephone}_2&quot;;return this.s_oc?this.s_oc(e):true">${stateInfo.telephone}</a>
		                                ${stateInfo.schedule}
		                            </div>
		                        </div>
		                    </div>
	                    </c:forEach>                
	                </div>
	            </c:if>

                <c:choose>
                    <c:when test="${not empty properties.col1bottomtext}">
                        ${properties.col1bottomtext}
                    </c:when>
                    <c:otherwise>
                        <p><span class="subheading">Do you have a certified speech or hearing disability?</span>
                            Call <span class="strong"><a href="tel:711" class="whiteLink">711</a></span> and we'll help you.
                        </p>
                        <p><span class="subheading">Do you need help in another language?</span>
                            Our Customer Service representatives can connect you to a special line where you can talk to someone in your own language, receive oral interpretation and request written translations of documents into another language.
                        </p>
                        <div class="hixNumbers spanish">
                            <div class="hixNumber hixTab">
                                <ul class="bulleted">
                                    <li>Para obtener asistencia en Espa&#241;ol, por favor llame al <a class="mobileNumber strong" onclick="s_objectID=&quot;tel:1-855-586-6957_2&quot;;return this.s_oc?this.s_oc(e):true">1-855-586-6957</a></li>
                                </ul>
                            </div>
                        </div>
                        <p>We offer these services at no cost to you.</p>
                    </c:otherwise>
                </c:choose> 
            </div>
            <div class="span6">
                <c:choose>
                    <c:when test="${not empty properties.col2text}">
                        ${properties.col2text}
                    </c:when>
                    <c:otherwise>
                        <h3 class="whiteText">Online:</h3>
                        <p>You can use our e-mail form if you're not a member or if you prefer not to log in. We'll need your personal and contact information so we can get back to you. We respond to messages from 8 a.m.-6 p.m. (ET), Monday-Friday.</p>
                        <a class="whiteLinkBold arrowWhiteSmall" href="https://member.aetna.com/MemberPublic/featureRouter/forms?page=contactPublicForm" onclick="Aetna.analytics.omniture.click(this, 278)">Email Form</a>
                    </c:otherwise>
                </c:choose>               
            </div>
        </div><!--/.row-fluid-->
    </div><!--/.contentGroup-->
    <div class="row-fluid hidden-phone">
        
    </div><!--/.row-fluid-->
</div>