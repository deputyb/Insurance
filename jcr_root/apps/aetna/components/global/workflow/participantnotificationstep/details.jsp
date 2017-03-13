<%--
  Copyright 1997-2009 Day Management AG
  Barfuesserplatz 6, 4001 Basel, Switzerland
  All Rights Reserved.

  This software is the confidential and proprietary information of
  Day Management AG, ("Confidential Information"). You shall not
  disclose such Confidential Information and shall use it only in
  accordance with the terms of the license agreement you entered into
  with Day.

  ==============================================================================

  Overlay this to include detailed information into step rendering.

--%><%@page session="false" 
            import="com.day.cq.i18n.I18n,
                    com.day.cq.security.UserManager,
                    com.day.cq.security.UserManagerFactory,
                    com.day.cq.security.Authorizable,
                    com.day.cq.wcm.api.components.DropTarget,
                    com.day.cq.xss.ProtectionContext,
                    com.day.cq.xss.XSSProtectionException,
                    com.day.cq.xss.XSSProtectionService,
                    javax.jcr.Session,
                    org.apache.commons.lang3.StringEscapeUtils" %><%
%><%@include file="/libs/foundation/global.jsp"%><%

    XSSProtectionService xss = sling.getService(XSSProtectionService.class);

    I18n i18n = new I18n(slingRequest);

    String participant = properties.get("metaData/PARTICIPANT", String.class);
    String cls = "";
    if (participant == null || participant.equals("")) {
        participant = i18n.get("No user or group selected.");
    } else {
        Session sess = slingRequest.getResourceResolver().adaptTo(Session.class);
        UserManagerFactory usrMgrFactory = sling.getService(UserManagerFactory.class);
        UserManager um = usrMgrFactory.createUserManager(sess);

        Authorizable auth;
        if (participant.startsWith("/")) {
            auth = um.findByHome(participant);
        } else {
            auth = um.get(participant);
        }
        if (auth != null) {
            cls = auth.isUser() ? "user" : "group";
            participant = auth.getName();
        } else {
            participant = i18n.get("Selected user or group does not exist.");
        }
    }
    if (xss != null) {
        try {
            participant = xss.protectForContext(ProtectionContext.PLAIN_HTML_CONTENT, participant);
        } catch (XSSProtectionException e) {
            log.warn("Unable to protect step participant '{}'", participant);
        }
    }

%><div ext:qtip="<%= StringEscapeUtils.escapeHtml4(participant) %>" class="<%= DropTarget.CSS_CLASS_PREFIX + "participant " + cls %>">
    <div class="participant-icon">&nbsp;</div><span class="step-details"><%= StringEscapeUtils.escapeHtml4(participant) %></span>
</div>