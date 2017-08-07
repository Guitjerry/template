<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017\7\27 0027
  Time: 16:34
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>新增供货商</title>
    <c:import url="../../../common/pc/include.jsp"></c:import>
</head>
<body >
<div class="main-container" >

    <div class="panel panel-info f-pd10" style="background-color:#f08300;color: #fff">
        新增
    </div>
    <form  class="form-horizontal" role="_editForm form" action="ajax_supplier_edit" data-validate="true"  id="editForm" >

        <div class="form-group f-mt20">
            <label for="exampleInputAccount4" class="col-sm-2">*名称:</label>
            <div class="col-md-6 col-sm-6">
                <input type="text" name="name" class="form-control " id="exampleInputAccount4" placeholder="名称" value="${tbSupplier.name}">
            </div>
        </div>
        <div class="form-group">
            <label for="exampleInputcode4" class="col-sm-2">年龄:</label>
            <div class="col-md-6 col-sm-6">
                <input type="text" name="age" class="form-control" id="exampleInputcode4" placeholder="年龄" value="${tbSupplier.age}">
            </div>
        </div>
        <div class="form-group">
            <label for="exampleInputphone" class="col-sm-2">手机:</label>
            <div class="col-md-6 col-sm-6">
                <input type="text" name="phone" class="form-control" id="exampleInputphone" placeholder="手机号码" value="${tbSupplier.phone}">
            </div>
        </div>
        <div class="form-group">
            <label  class="col-sm-2">性别:</label>
            <div class="col-md-6 col-sm-6 ">
                <select name="sex" class="table-select cm-w200" role="_defaultData"
                        data-defaultValue="${(null==tbSupplier.sex)?'':tbSupplier.sex}">
                    <c:if test="${CommArray.arr_sex!= null}">
                        <c:forEach var="arrItem" items="${CommArray.arr_sex}" varStatus="i" begin="1" >
                            <option value="${i.index }">${arrItem }</option>
                        </c:forEach>
                    </c:if>
                </select>
            </div>
        </div>

        <div class="form-group">
            <label class="col-sm-2">地址:</label>
            <div class="col-md-6 col-sm-6">
                <input type="text" name="addr" class="form-control"  placeholder="地址" value="${tbSupplier.addr}">
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2">头像:</label>
            <div class="col-sm-6 col-md-6">

                <div class="upload-viewer">
                                    <span class="imgDelete icon-remove-sign" title="清空图片" data-baseurl="<%=request.getContextPath()%>"
                                          data-defaultPhoto="<%=request.getContextPath()%>/images/default-photo.jpg" data-file=""></span>
                    <a href="javascript:void(0);"></a>
                    <img src="<%=request.getContextPath()%>/images/default-photo.jpg" border="0" width="100%">
                </div>
                <input type="hidden" name="picurl"
                       id="picurl" value="<%=request.getContextPath()%>/${picth}/${tbSupplier.picurl}" class=""/>
                <input class="fileupload" id="fileupload1" type="file" name="files[]" role="_upload"
                       data-show="true" data-target="picurl" accept="image/gif,image/jpeg,image/png">
            </div>
        </div>

        <div class="form-group">
            <label class="col-sm-2">备注:</label>
            <div class="col-md-6 col-sm-6">
                <textarea name="note" class="form-control" placeholder="备注" value="${tbSupplier.note}"></textarea>
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
