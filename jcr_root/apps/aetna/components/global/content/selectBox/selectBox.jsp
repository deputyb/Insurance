<%@include file="/apps/aetna/components/global/global.jsp" %>
<div class="articleModule">
	<div class="checkBox">
		<h4><cq:text property="instruction"/></h4>
		<form>
            <%
			String[] items = properties.get("options", String[].class);
			if (items != null) { 
                for (int i = 0; i < items.length ; i++){
                %>
                    <input type="radio" name="cc" id="c<%= i %>">
                	<label for="c1"><span></span><%= items[i]%></label>
                <%
                }
			}
    		%>
			<input type="submit" class="blueBtn" value="Next">
		</form>
	</div><!--/.relatedLinks-->
</div>