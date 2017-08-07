<%--
  Created by IntelliJ IDEA.
  User: jerry
  Date: 2017/3/1
  Time: 13:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<link href="<%=request.getContextPath()%>/css/oa.css" rel="stylesheet">

<html>
<head>
    <c:import url="../../common/pc/include.jsp"></c:import>
    <title>校园易购</title>

</head>
<body>
<input type="hidden" value="<%=request.getContextPath() %>" id="baseuri">
<div class="top-content back">

    <div class="inner-bg">
        <div class="container">
            <div class="row">
                <div class="col-sm-8 col-sm-offset-2 text">
                    <h1><strong>校园易购在线商城系统</strong></h1>

                </div>
            </div>
            <div class="row">
                <div class="col-sm-6 col-sm-offset-3 form-box">
                    <div class="form-top">
                        <div class="form-top-left">
                            <h3>系统登录</h3>
                            <p>请输入账号与密码:</p>
                        </div>
                        <div class="form-top-right">
                            <i class="fa fa-key"></i>
                        </div>
                    </div>
                    <div class="form-bottom">
                        <form role="form"  method="post" class="login-form">
                            <div class="form-group">
                                <label class="sr-only" for="form-username">Username</label>
                                <input type="text" name="username" placeholder="Username..." class="form-username form-control" id="form-username">
                            </div>
                            <div class="form-group">
                                <label class="sr-only" for="form-password">Password</label>
                                <input type="password" name="password" placeholder="Password..." class="form-password form-control" id="form-password">
                            </div>
                            <button type="button" class="btn" onclick="login()">登录</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>

    </div>
</div>
</body>
</html>
<script>
    function login() {
        var username = $("input[name='username']").val();
        var password = $("input[name='password']").val();
        var param = {"username":username,"password":password}
        $.ajax({
            type: "POST",
            url: "loginsure",
            data: param,
            success: function(data){
                var obj = eval("("+data+")");
                if(obj.status=='fail'){
                    toastrErrorMessage(obj.msg,'信息提示');
                }else if(obj.status=='success'){
                    toastrSuccessMessage(obj.msg,'信息提示');

                    var ua = navigator.userAgent;
                    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
                        isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
                        isAndroid = ua.match(/(Android)\s+([\d.]+)/),
                        isMobile = isIphone || isAndroid;
                    if(!isMobile) {
                        location.href = $('#baseuri').val()+'/pc/index';
                    }else {
////                        location.href = $('#baseuri').val()+'/pc/chepai/reportList?msg=chepaiport';
//                        location.href = $('#baseuri').val()+'/mobile/chepai/newReportList?msg=chepaiport';
                    };

                }
            }
        });
    }
</script>