<%--
  Created by IntelliJ IDEA.
  User: dnys
  Date: 2016/11/17
  Time: 15:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="zh-CN">
<style>
    .checks{
        width: 100%;
        height: 100%;
        background: rgba(102, 102, 102, 0.07);
        z-index: 9999;
        opacity: 0.5;
    }
</style>

<head>
    <input type="hidden" name="platform" value="<%=request.getContextPath()%>" id="platform">
    <title>Title</title>

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <%--<script type="text/javascript" src="../js/bootstrap-table.js"></script>--%>
    <link href="<%=request.getContextPath()%>/css/bootstrap.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/dist/css/zui.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/css/common.min.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/css/toastr.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/css/showbox.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/css/main.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/css/tab-fix.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/css/admin-tag.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/libs/fileupload/fileupload.css" rel="stylesheet">

</head>
</html>
<script type="text/javascript" src="<%=request.getContextPath()%>/dist/js/jquery.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/dist/js/zui.js"></script>

<script type="text/javascript" src="<%=request.getContextPath()%>/js/bootstrap.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/zui.min.js"></script>

<script type="text/javascript" src="<%=request.getContextPath()%>/js/toastr.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/rdcp.toastr.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/showbox.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/role.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/util.js"></script>

<script type="text/javascript" src="<%=request.getContextPath()%>/libs/validation/jquery.metadata.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/libs/validation/jquery.validate.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/libs/validation/additional-methods.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/libs/validation/message_zhCN.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/slidePanel.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/libs/fileupload/jquery.iframe-transport.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/libs/fileupload/jquery.ui.widget.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/libs/fileupload/jquery.fileupload.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery.validate.js"></script>
<script>
    var platform=$('#platform').val();
</script>
