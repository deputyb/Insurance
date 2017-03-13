<%@taglib prefix="sling" uri="http://sling.apache.org/taglibs/sling/1.0" %>
<%@include file="/apps/aetna/components/global/global.jsp" %>

<sling:defineObjects />
<cq:setContentBundle/>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
	    <title>Aetna Componets List</title>
	    <meta http-equiv="Content-Type" content="text/html; utf-8" />
	    <script src="/libs/cq/ui/resources/cq-ui.js" type="text/javascript"></script>
	    <link type="text/css" rel="stylesheet" href="/libs/cq/ui/widgets/themes/default.css">
	    <link type="text/css" rel="stylesheet" href="/libs/cq/tagging/widgets/themes/default.css">
	    
	    <cq:includeClientLib css="cq.packaging"/>
	    
	    <script src="/etc/clientlibs/foundation/jquery.js" type="text/javascript"></script>
	    <script src="/etc/clientlibs/foundation/shared.js" type="text/javascript"></script>
	    <script src="/libs/cq/ui/widgets.js" type="text/javascript"></script>
	    <script src="/libs/cq/ui/widgets/themes/default.js" type="text/javascript"></script>
	</head>
	<body>
	    <div class="cq-packagemgr-ielayoutfixer"></div>
	    <h1 class="cq-packagemgr">Aetna Components List</h1>
	
		<%
			final String COMPONENTS_LIST_PATH = "/apps/aetna/components/global/content";
			List<String[]> componentsList = new ArrayList<String[]>();
			Node componentsNode = resourceResolver.getResource(COMPONENTS_LIST_PATH).adaptTo(Node.class);
			
			processComponents(componentsNode, componentsList);
		%>
		
		<c:set var="components" value="<%= componentsList %>" />
		
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Description</th>
					<th>Path</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach items="${components}" var="component">
					<tr>
						<td>${component[0]}</td>
						<td>${component[1]}</td>
						<td>${component[2]}</td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
		
		<br/><br/>
	</body>
</html>

<%! 

	public void processComponents(Node actualNode, List<String[]> componentsList) {
		
		try {
			// Check if the actual node is a component
			if (actualNode.getPrimaryNodeType().isNodeType("cq:Component")) {
				String[] componentInfo = new String[3];
				
				if (actualNode.hasProperty("jcr:title")) {
					componentInfo[0] = actualNode.getProperty("jcr:title").getString();
				} else {
					componentInfo[0] = "";	
				}
				
				if (actualNode.hasProperty("jcr:description")) {
					componentInfo[1] = actualNode.getProperty("jcr:description").getString();	
				} else {
					componentInfo[1] = "";
				}
				
				componentInfo[2] = actualNode.getPath();
				
				componentsList.add(componentInfo);
			}
			
			if (actualNode.hasNodes()) {
				NodeIterator iterator = actualNode.getNodes();
				
				while (iterator.hasNext()) {
					processComponents(iterator.nextNode(), componentsList);		
				}
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}

%>