<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017\7\25 0025
  Time: 15:15
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="w" uri="http://javacrazyer.iteye.com/tags/pager" %>
<html>
<head>
    <title>供货商列表</title>
    <c:import url="../../../common/pc/include.jsp"></c:import>
</head>
<input name="msg" value="supplier" type="hidden" action="ajax_supplier_edit" about="">
<body path="<%=request.getContextPath()%>">
    <div class="container-fluid">
        <div class="row">
            <c:import url="../../../common/pc/header.jsp"></c:import>
        </div>
        <div class="row">
            <c:import url="../../../common/pc/leftcommon.jsp"></c:import>
            <!--右侧内容-->
            <div class="col-md-10">


                <c:if test="${fn:length(supplierList)==0}">

                    <div class="waicheng" >
                        <div style="font-size: 20px;font-weight: bold">查询不到相关数据.</div>
                        <hr>
                            <%--<div><img src="<%=request.getContextPath() %>/images/nofound.png"></div>--%>
                    </div>

                </c:if>

                <button type="button" title="新增供货商" class="btn btn-primary" onclick="slidePanel('adddiv','addSupplier')"> 新增供货商</button>

                <c:if test="${fn:length(supplierList)>0}">


                        <table class="table table-bordered  table-hover f-mt10">
                            <tr class="info">
                                <th>供货商名称</th>
                                <th>年龄</th>
                                <th>手机</th>
                                <th>性别</th>
                                <th>图片</th>
                                <th>地址</th>
                                <th>排序</th>
                                <th>说明</th>
                                <th>操作</th>
                            </tr>
                    <c:forEach items="${supplierList}" var="supplier">
                            <tr >

                                <td>${supplier.name}</td>
                                <td>${supplier.age}</td>
                                <td>${supplier.phone}</td>

                                <td>
                                    <c:choose>
                                        <c:when test="${1 == supplier.sex}">
                                            男
                                        </c:when>
                                        <c:otherwise>
                                            女
                                        </c:otherwise>
                                    </c:choose>
                                </td>
                            <td><c:if test="${supplier.picurl!=null}"><img src="<%=request.getContextPath()%>/${picth}/${supplier.picurl}"></c:if></td>
                                <td>${supplier.addr}</td>
                                <td>${supplier.sort}</td>
                                <td>${supplier.note}</td>
                                <td><button type="button" title="修改" class="btn btn-info"  onclick="slidePanel('adddiv','addSupplier?id=${supplier.id}')">  修改</button><button type="button" title="删除" class="btn btn-info f-ml10" onclick="deleteObj(${supplier.id})" > 删除</button></td>

                            </tr>
                    </c:forEach>
                        </table>
                       <w:pager pageNo="${pageShow.current}" recordCount="${pageShow.allcount}" pageSize="${pageShow.size}" url="list"></w:pager>

                </c:if>


            </div>
        </div>
    </div>

    <div id="adddiv" style="width: 40%;top:30%!important;right: 30%"></div>
    <div id="addchildrendiv" style="width: 40%;top:30%!important;right: 30%"></div>
</body>
</html>


<script>

    function deleteObj(id) {
        var mymessage=confirm("你确定删除该记录吗");
        if(mymessage==true){
            $.ajax({
                url: "ajax_supplier_delete",
                data: {"supplierid":id},
                success: function(msg){
                    toastrSuccessMessage('删除成功','信息提示');
                    location.reload();
                }
            });
        }
    }

</script>

