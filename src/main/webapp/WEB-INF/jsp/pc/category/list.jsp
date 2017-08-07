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
<html>
<head>
    <title>商品分类列表</title>
    <c:import url="../../../common/pc/include.jsp"></c:import>
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <c:import url="../../../common/pc/header.jsp"></c:import>
        </div>
        <div class="row">
            <c:import url="../../../common/pc/leftcommon.jsp"></c:import>
            <!--右侧内容-->
            <div class="col-md-10">


                <c:if test="${fn:length(categories)==0}">

                    <div class="waicheng" >
                        <div style="font-size: 20px;font-weight: bold">查询不到相关数据.</div>
                        <hr>
                            <%--<div><img src="<%=request.getContextPath() %>/images/nofound.png"></div>--%>


                    </div>

                </c:if>

                <button type="button" title="新增一级类目" class="btn btn-primary" onclick="slidePanel('adddiv','addcategory')"> 新增一级类目</button>

                <c:if test="${fn:length(categories)>0}">


                        <table class="table table-bordered  table-hover f-mt10">
                            <tr class="info">
                                <th>分类名称</th>
                                <th>分类编码</th>
                                <th>父分类</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                    <c:forEach items="${categories}" var="category">
                            <tr >

                                <td class="showtds" parentid="${category.id}">${category.name}<a onclick="showchildren(${category.id})" class="f-ml10"><i class="icon icon-chevron-up"></i></a></td>
                                <td>${category.code}</td>
                                <td>${category.parentname}</td>
                                <td>${category.status}</td>
                                <td><button type="button" title="新增二级类目" class="btn btn-primary"  onclick="showchildrendiv(${category.id},'${category.name}')" > 新增二级类目</button></td>
                            </tr>
                    </c:forEach>
                        </table>

                </c:if>


            </div>
        </div>
    </div>
    <div id="adddiv" style="width: 40%;top:30%!important;right: 30%"></div>
    <div id="addchildrendiv" style="width: 40%;top:30%!important;right: 30%"></div>
    <input name="msg" value="category" type="hidden">
</body>
</html>

<script>


    //添加子类
    function showchildrendiv(parentid,parentname) {
        slidePanel("addchildrendiv","addchildrenCategory?parentid="+parentid+"&parentname="+ encodeURI(encodeURI(parentname)),"addchildrenCategor");
    }
    function showchildren(parentid) {
        var appends = $('tr[parenttag='+parentid+']');
        if(appends.length>0){
            var singleappends =$(appends[0]);
            $(singleappends.prev('tr')).find('.icon-chevron-down').removeClass('icon-chevron-down').addClass('icon-chevron-up');
            for(var j=0;j<appends.length;j++){
                $(appends[j]).remove();
            }
            return;
        }
        $.ajax({
            url: "listchildrenCategory?parentid="+parentid,
            success:function (data) {
                var obj = eval("("+data+")");
                if(obj.status=="success"){
                    $('.showtds').each(function () {
                        var targetElement = $(this);
                        if(obj.entity.length<=0){
                            return;
                        }
                        if(obj.entity[0].parentid==targetElement.attr('parentid')){
                            targetElement.children('a').children('.icon-chevron-up').removeClass('icon-chevron-up').addClass('icon-chevron-down');
                            var tds = obj.entity;
                            for(var i=0;i<tds.length;i++){
                                var nametd = "<td >"+"<span style='padding-left: 40px;color: #f1a325'>"+obj.entity[i].name+"</span></td>";
                                var codetd = "<td>"+obj.entity[i].code+"</td>";
                                var statustd = "<td>"+obj.entity[i].status+"</td>";
                                var parentidtd = "<td>"+obj.entity[i].parentname+"</td>";
                                var opt = "<td>"+"</td>";
                                var newElement = $("<tr parenttag="+obj.entity[i].parentid+ ">"+nametd+codetd+parentidtd+statustd+opt+"</tr>");

                                var parent = targetElement.parent("tr").parent("tbody");
                                newElement.insertAfter(targetElement.parent("tr"));
                                //如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面
                            }

                        }
                    })

                }

            }
            
        });
    }

</script>
