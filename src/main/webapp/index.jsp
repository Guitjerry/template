<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017\7\20 0020
  Time: 13:13
  To change this template use File | Settings | File Templates.
--%>
<%
    String getUserAgent=request.getHeader("User-Agent").toLowerCase();
    if(null == getUserAgent){
        response.sendRedirect("pc/login");
    }
    getUserAgent = getUserAgent.toLowerCase();

    if(getUserAgent.indexOf("iphone")>-1
            || getUserAgent.indexOf("android")>-1
            || getUserAgent.indexOf("phone")>-1
            || getUserAgent.indexOf("ucbrowser")>-1
            || getUserAgent.indexOf("micromessenger")>-1){
        response.sendRedirect("pc/login");
    }else{
        response.sendRedirect("pc/login");
    }
%>
