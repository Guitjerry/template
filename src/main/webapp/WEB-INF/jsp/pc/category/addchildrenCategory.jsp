<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017\7\25 0025
  Time: 17:09
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>

    <c:import url="../../../common/pc/include.jsp"></c:import>
</head>
<body >
<div class="main-container" id="mainContainer">
    <div class="panel panel-info f-pd10" style="background-color:#f08300;color: #fff">
        新增二级类目
    </div>
    <form  class="form-horizontal" action="ajax_category_edit" data-validate="true"  id="editForm" method="post">

        <div class="form-group f-mt20">
            <label for="exampleInputAccount4" class="col-sm-2">分类名称</label>
            <div class="col-md-6 col-sm-6">
                <input type="text" name="name" class="form-control" id="exampleInputAccount4" placeholder="名称">
            </div>
        </div>
        <div class="form-group">
            <label for="exampleInputcode4" class="col-sm-2">分类编码</label>
            <div class="col-md-6 col-sm-6">
                <input type="text" name="code" class="form-control" id="exampleInputcode4" placeholder="编码">
            </div>
        </div>
        <div class="form-group">
            <label  class="col-sm-2">父分类</label>
            <div class="col-md-6 col-sm-6">
                <input type="text" name="parentname"  class="form-control" value="${parentname}">
            </div>
        </div>
        <div class="form-group none">
            <label  class="col-sm-2">父分类</label>
            <div class="col-md-6 col-sm-6">
                <input type="text" name="parentid"  class="form-control" value="${parentid}">
            </div>
        </div>
        <div class="form-group">
            <label  class="col-sm-2">排序</label>
            <div class="col-md-6 col-sm-6">
                <input type="text" class="form-control" name="sort"  placeholder="排序">
            </div>
        </div>
        <div class="cm-tac">
            <button class="btn btn-info " type="submit">确定</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button class="btn " type="button" onclick="closeSlidePanel()">取消</button>
        </div>

    </form>

</div>

</body>
</html>
