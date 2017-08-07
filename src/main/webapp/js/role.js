/**
 * 框架默认事件
 *
 * 接收参数
 *   role : 规则
 *
 *   data-target : 关联控制对象
 *
 *   data-id : 操作id
 *
 *   data-action : 操作动作
 *
 *   data-config ：配置参数,采用json格式，不支持嵌套
 *
 *   data-url : ajax请求地址
 *
 *   data-alert : 是否需要弹出框   true/false
 */

(function (object) {
    //支持的规则
    var _ROLES = {
        searchForm: "searchForm",
        editForm: "editForm",
        select: "select",
        linkSelect: "linkSelect",
        op: "op",
        deleteOp: "deleteOp",
        updateOp: "updateOp",
        ajaxpost: "ajaxpost",
        editor: "editor",
        datepicker: "datepicker",
        upload: "upload",
        page: "pager",
        chosen: "chosen",
        searchBtn: "searchBtn",
        defaultData: "defaultData",
        showPicurl: "showPicurl",		//编辑显示上传图片规则
        redirect: "redirect",	//默认跳转规则
        timeArea: "timeArea",
        selMember: "selMember",  //打开会员选择框
        sureMember: "sureMember",  //选择会员
        cancelMember: "cancelMember", //取消会员选择
        synchroSubmit: "synchroSubmit",	//同步提交
        toExport: "toExport",	//导出
        exportForm: "exportForm",	//默认导出的表单
        hundred:"hundred"

    };

    //外部方法
    object.role = {
        autoload: function () {
            window.Util.showBox.init();
            window.Util.datetimepicker.init();
            var roleSelector;

            for (i in _ROLES) {
                roleSelector = "[role*='_" + _ROLES[i] + "']";


                if ($(roleSelector).length > 0) {
                    switch (_ROLES[i]) {

                        case _ROLES.searchForm:
                            _func.tableHover(roleSelector);
                            break;

                        case _ROLES.editForm:
                            _func.initVidate(roleSelector);
                            break;

                        case _ROLES.select:
                            _func.initCheckBox(roleSelector);
                            break;

                        case _ROLES.page:
                            _func.initPage(roleSelector);
                            break;

                        case _ROLES.linkSelect:
                            _func.initLinkSelect(roleSelector);
                            break;

                        case _ROLES.op:
                            _func.initOperating(roleSelector);
                            break;

                        case _ROLES.deleteOp:
                            //删除默认出提示框
                            _func.initConfirm(roleSelector);
                            break;

                        case _ROLES.ajaxpost:
                            _func.initSearch(roleSelector);
                            break;

                        case _ROLES.updateOp:
                            _func.initUpdate(roleSelector);
                            break;

                        case _ROLES.editor:
                            _func.initEditor(roleSelector);
                            break;

                        case _ROLES.datepicker:
                            break;

                        case _ROLES.upload:
                            _func.initUpload(roleSelector);
                            break;

                        case _ROLES.chosen:
                            _func.initChosen(roleSelector);
                            break;

                        case _ROLES.searchBtn:
                            _func.initSearchBtn(roleSelector);
                            break;

                        case _ROLES.defaultData:
                            _func.initDefaultData(roleSelector);
                            break;

                        case _ROLES.showPicurl:
                            _func.initShowPicurl(roleSelector);
                            break;
                        case _ROLES.redirect:
                            _func.initRedirect(roleSelector);
                            break;
                        case _ROLES.timeArea:
                            $(roleSelector).each(function () {
                                _func.initTimeArea($(this));
                            });
                            break;
                        case _ROLES.selMember:
                            _func.initSelMember(roleSelector);
                            break;
                        case _ROLES.sureMember:
                            _func.initSureMember(roleSelector);
                            break;
                        case _ROLES.cancelMember:
                            _func.initCancelMember(roleSelector);
                            break;
                        case _ROLES.synchroSubmit:
                            _func.initSynchroSubmit(roleSelector);
                            break;
                        case _ROLES.toExport:
                            _func.initToExport(roleSelector);
                            break;
                        case _ROLES.hundred:
                        _func.hundred(roleSelector);
                        break;
                    }
                }
            }
        },
        reSetTimeArea: function () {
            $("[role*=_timeArea]").empty();
            $("[role*=_timeArea]").each(function () {
                _func.initTimeArea($(this));
            });
        }
    };

    //内部方法
    var _func = {

        /**
         * 初始化默认跳转规则
         * 跳转规则需要在[role*=_editForm]元素中设置 redirect-url(跳转目标地址)
         * @param  roleSelector
         */
        initRedirect: function (roleSelector) {
            $(document).on('click', roleSelector, function () {
                var red_url = $("[role*=" + _ROLES.editForm + "]").attr("redirect-url");
                window.location.href = red_url;
            });

        },
        //导出
        initToExport: function (roleSelector) {
            $(document).on('click', roleSelector, function () {
                var masks = '<div class="js-masks" style="display:none;position:fixed;top:0;left:0;background:rgba(0,0,0,0.6);width:100%;height:100%;z-index:999;">'
                        +'<div class="f24 fb" style="width:400px;height:200px;position: absolute;top: 50%;left: 50%;margin-left:-200px;font-size:24px; color: #fff;margin-top: -100px;">'
                            +'导出执行中...请不要关闭当前页面!!<br>'
                            +'导出成功后，请自行刷新'
                        +'</div>'
                    +'</div>';
                if(0 == $(".js-masks").length)
                    $("body").append(masks);
                var _targetForm = $(this).attr("data-target");
                if (undefined != _targetForm) {
                    _targetForm = $('#' + _targetForm);
                }
                var _defaultForm = $("[role*=" + _ROLES.exportForm + "]");
                if (_defaultForm.length == 0) {
                    _defaultForm = $("[role*=" + _ROLES.searchForm + "]");
                }
                var _isTakeParam = $(this).attr("data-takeparam");
                var _before = $(this).attr("data-before");  //  提交前回调函数
                if(_before != undefined && _before !=''){
                    if(!eval(_before)){
                        return false;
                    }
                }

                $(".js-masks").show();
                var _action = $(this).attr("data-action");
				if(undefined !== _action){
					var localHref = location.href;
					var startIdx = localHref.indexOf("/", 10);
					var lastIdx = localHref.lastIndexOf("/");
					_action = _export + localHref.substring(startIdx + 1, lastIdx + 1) + _action;
				}
				var exportFlag = $("input[name='_export_uid']");
				if(0 == exportFlag.length){
					var theForm = _targetForm == undefined ? _defaultForm : _targetForm;
					theForm.append('<input name="_export_uid" type="hidden" value="' + _export_uid + '">');
				}
                if (_isTakeParam) {
                    $.each((_targetForm == undefined ? _defaultForm : _targetForm).find("input"), function () {
                        $(this).val($(this).val().trim());
                    });
                    window.location.replace(undefined == _action ? "export" : _action + '?' + (undefined == _targetForm ? encodeURI(_defaultForm.serialize().replace(/\+/g, "")) : encodeURI(_targetForm.serialize().replace(/\+/g, ""))));
                } else {
                    window.location.replace(undefined == _action ? "export" : _action);
                }
            });
        },
        hundred:function(roleSelector){
            $(roleSelector).blur(function(){
                $('#hundred').remove();
                var $num = $(roleSelector).val();
                if(Number($num)%100 != 0){
                    $(roleSelector).after('<label for="paid" generated="true" id="hundred" class="error">请输入100的倍数的</label>');
                    return false;
                }
            })
        },
        //同步提交
        initSynchroSubmit: function (roleSelector) {
            $(document).on('click', roleSelector, function () {
                var _action = $(this).attr("data-action");
                var _form = $(this).parents("form");
                var _before = $(this).data("before");
                if (undefined != _before) {
                    var flag = eval(_before);
                    if (!flag) {
                        return;
                    }
                }

                if (undefined != _action && $.trim(_action).toString().length > 0) {
                    if (_form.length > 0) {
                        _form.attr("action", _action);
                    } else {
                        $("[role*=" + _ROLES.editForm + "]").attr("action", _action);
                    }
                }
                if (_form.length > 0) {
                    _form.attr("data-issyn", "true");
                    _form.submit();
                } else {
                    $("[role*=" + _ROLES.editForm + "]").attr("data-issyn", "true");
                    $("[role*=" + _ROLES.editForm + "]").submit();
                }

            });
        },
        //初始化编辑页面上传图片显示
        initShowPicurl: function (roleSelector) {
            window.Util.upload.showPicurl(roleSelector);
        },

        //初始化默认值
        initDefaultData: function (roleSelector) {
            $(roleSelector).each(function (index, _this) {
                var defaultValut = $(_this).attr("data-defaultvalue");
                var isFilterZero = $(_this).data("zero")=="1"?false:true;
                if(isFilterZero && 0==defaultValut){
                    return;
                }
                if (null !== defaultValut && "" !== defaultValut ) {
                    if ($(_this).is('[type="radio"]')) {	//单选按钮
                        defaultValut == $(_this).val() ? $(_this).attr("checked", true) : "";
                    }
                    else if ($(_this).is('select')) {	//下拉框
                        $(_this).val(defaultValut);
                        $(_this).is("[role*=_linkSelect]") ? $(_this).trigger('change') : "";
                    }
                }
            });
        },

        //初始化搜索按钮
        initSearchBtn: function (roleSelector) {
            $(document).on('click', roleSelector, function () {
                var _before = $(this).data("before");
                if (undefined != _before) {
                    var flag = eval(_before);
                    if (!flag) {
                        return;
                    }
                }
                $('[role=_' + _ROLES.searchForm + ']').find("input[name=pageno]").val(0);
                var inputs = $('[role=_' + _ROLES.searchForm + ']').find('input');
                $.each(inputs, function () {
                    $(this).val($(this).val().trim());
                });
                $('[role=_' + _ROLES.searchForm + ']').submit();
            });
        },

        //初始化chosen
        initChosen: function (roleSelector) {
            window.Util.chosen.init(roleSelector);
        },

        //初始化编辑器
        initEditor: function (roleSelector) {
            $.each($(roleSelector), function (i,_this) {
                var opt = $(_this).data("opt");
                window.Util.editor.init("#"+$(_this).attr("id"),undefined == opt?null:opt);
            });

        },

        //验证绑定
        initVidate: function (roleSelector) {
            var target = $(roleSelector);
            if (target.data('validate') === true) {	//如果需要验证
                window.Util.validatetion.init(roleSelector);
            }
        },

        //初始化分页工具条
        initPage: function (roleSelector) {
            var pageWrap = $(roleSelector);
            var pageUl = pageWrap.find('ul'),
                preBtn = pageUl.find('#prePage'),
                nextBtn = pageUl.find('#nextPage'),
                currPageNum = pageWrap.data('currpagenum'),	//当前页号
                activeElement = pageWrap.find('.active a'),	//当前选中的元素
                pageSize = pageWrap.data('endindex');	//当前尾页

            $(document).on('click', roleSelector + " ul", function (e) {
                var _target = $(e.target);
                //上一页
                if (_target.is(preBtn) && currPageNum > 1) {
                    $('input[name="pageno"]').val(currPageNum - 1);
                    activeElement.parent().removeClass('active').prev().addClass('active');
                    $('[role=_' + _ROLES.searchForm + ']').submit();
                }
                //下一页
                else if (_target.is(nextBtn) && currPageNum < pageSize) {
                    $('input[name="pageno"]').val(currPageNum + 1);
                    activeElement.parent().removeClass('active').next().addClass('active');
                    $('[role=_' + _ROLES.searchForm + ']').submit();
                }
                //直接点击页号
                else if (!_target.is(nextBtn) && !_target.is(preBtn)) {
                    if (_target.data('page')) {
                        $('input[name="pageno"]').val(_target.data('page'));
                        _target.parent().addClass('active').siblings().removeClass('active');
                        $('[role=_' + _ROLES.searchForm + ']').submit();
                    }
                }
            });

            $('#toPagenoBtn').bind('click', function (e) {
                var maxSize = $('#toPagenoBtn').attr("data-pagecount");
                var minSize = 0;
                if (parseInt($('#toPageno').val()) != 0 && !parseInt($('#toPageno').val())) {
                    $.messager.show("请输入数字页码", {placement: 'center'});
                    return false;
                }
                if (parseInt($('#toPageno').val()) <= minSize) {
                    $.messager.show("请输入大于0的页码", {placement: 'center'});
                    return false;
                }
                if (parseInt($('#toPageno').val()) > maxSize) {
                    $.messager.show("请输入不大于" + maxSize + "的页码", {placement: 'center'});
                    return false;
                }
                $('input[name="pageno"]').val($('#toPageno').val());
                $('[role=_' + _ROLES.searchForm + ']').submit();
            });

            //$(document).on('keypress',"#toPageno",function(e) {
            //     if(e.which == 13) {
            //     	var maxSize = parse$('#toPagenoBtn').attr("data-pagecount");
            //    	 var minSize = 0;
            //    	 if(parseInt($('#toPageno').val()) != 0 && !parseInt($('#toPageno').val())){
            //    	 	$.messager.show("请输入数字页码",{placement:'center'});
            //    	 	return false;
            //    	 }
            //    	 if(parseInt($('#toPageno').val()) <= minSize){
            //    	 	$.messager.show("请输入大于0的页码",{placement:'center'});
            //    	 	return false;
            //    	 }
            //    	 if(parseInt($('#toPageno').val()) > maxSize){
            //    	 	$.messager.show("请输入不大于"+maxSize+"的页码",{placement:'center'});
            //    	 	return false;
            //    	 }
            //  	  $('input[name="pageno"]').val($('#toPageno').val());
            //   	  $('[role=_'+_ROLES.searchForm+']').submit();
            //   }
            //});

            $('#toPageno').bind('keydown', function (event) {
                //如果输入的字符是在0-9之间，或者是backspace、DEL键
                if (((event.keyCode > 47) && (event.keyCode < 58)) || (event.keyCode == 13) || (event.keyCode == 8) || (event.keyCode == 46) || event.keyCode >= 96 && event.keyCode <= 105) {
                    return true;
                }
                else {
                    return false;
                }
            });


        },

        //全选
        initCheckBox: function (roleSelector) {
            var target = $(roleSelector).data("target");
            $(document).on('click', roleSelector, function () {
                var callback = $(this).attr("data-callback");
                $(target).not('[disabled]').prop("checked", $(roleSelector).prop("checked"));
                //
                if(undefined != callback && callback != ''){
                    eval(callback);
                }
            });
        },

        //联动下拉列表
        initLinkSelect: function (roleSelector) {
            $(roleSelector).each(function () {
                var _this = $(this), initUrl = _this.first().data('initurl'), paramstr = _this.data("param");
                var paramArray;
                if (undefined != paramstr) {
                    paramArray = paramstr.split(",");	//逗号分隔
                }
                if (initUrl !== undefined) {
                    window.Util.ajax.post(initUrl, '', function (data) {
                        $.each(data, function (i) {
                            var child;
                            if(data[i].code!= undefined ){
                                child = $('<option value="' + data[i].value + '" data-code="' + data[i].code + '">' + data[i].name + '</option>');
                            }else{
                                child = $('<option value="' + data[i].value + '">' + data[i].name + '</option>');
                            }
                            _this.append(child);
                        });
                        _func.initDefaultData("[role*=_defaultData]");	//	update by pigy
                        _this.trigger("chosen:updated");
                    });
                }
            });
            $(document).on('change', roleSelector, function () {
                var _this = $(this),
                    target = _this.data('target'),
                    url = _this.data('url'),
                    val = _this.val(),
                    paramstr = _this.data("param"),
                    initUrl = _this.data('initurl'),
					ignoreCode = _this.attr('data-ignoreCode');
                var targetCallback = _this.attr("data-targetcallback");
				if(undefined == ignoreCode){
					ignoreCode = 0;
				}
                var param = {
                    id:val,
					ignorecode:ignoreCode
                };	//最终参数
                var paramArray;
                if (undefined != paramstr) {
                    paramArray = paramstr.split(",");
                    if(undefined != paramArray && paramArray.length > 0){
                        $.each(paramArray,function(i,_this){
                            var tempArray = _this.split("=");
                            param[tempArray[0]]=tempArray[1];
                        });
                    }
                }

                if (undefined === target)
                    target = _this.next('select');
                else {
                    var targets = target.split(",");
                    var urls = url.split(",");
                    var tempArray = new Array();
                    for (var i in targets) {
                        var tempobj = {};
                        tempobj.target = $('#' + targets[i]);
                        tempobj.url = urls[i];
                        tempArray.push(tempobj);
                    }
                    target = tempArray;
                }
                if ($(this).data('value') !== val) {
                    $(this).data('value', val);
                    if (target.length > 0) {
                        $.each(target, function (y) {
                            _func.clearLinkSelect(target[y].target);	//清空子下拉列表的值
                            if (null != val && val.toString().length > 0 && val > 0) {	//值不为""就发送请求
                                window.Util.ajax.post(target[y].url, param, function (data) {
                                    if(undefined != targetCallback && targetCallback != ""){
                                        eval(targetCallback);
                                    }else{
                                        if (undefined != data && data.length > 0) {
                                            $.each(data, function (i) {
                                                var child = $('<option value="' + data[i].value + '">' + data[i].name + '</option>');
                                                target[y].target.append(child);
                                            });
                                        }
                                        //加载完子节点后判断是否需要默认选中
                                        target[y].target.attr('data-defaultvalue') !== undefined && _func.initDefaultData(target[y].target);
                                        target[y].target.attr('data-defaultvalue', "");//清空默认值
                                        target[y].target.trigger("chosen:updated");
                                    }
                                });
                            }
                        });

                    }
                }
            });
        },

        /**
         * 遍历联动下拉列表
         * 如果存在子节点，下拉选项改变，联动的所有子下拉列表的值全部清空
         */
        clearLinkSelect: function (target) {
            if (target.children('[data-default]').length > 0) {
                target.children(':not([data-default])').remove();
            } else {
                target.children(':not(:first)').remove();
            }

            target.trigger("chosen:updated");
            if (typeof target.data("target") != 'undefined') {
                _func.clearLinkSelect($('#' + target.data("target")));
            }
        },

        //提示
        initConfirm: function (roleSelector) {
            $(document).on('click', roleSelector, function () {
                var _this = $(this);
                window.Util.dialog.confirm(function (reslut) {
                    if (reslut) {
                        _func.initDelete(_this);
                    }

                }, '你确认要进行该操作吗?');
            });
        },

        //删除
        initDelete: function (roleSelector) {
            _func.initHandle(roleSelector, function (ret) {
                if (ret.result) {
                    $('[role=_' + _ROLES.searchForm + ']').submit();
                } else {
                    var msg = $.messager.show(ret.msg, {placement: 'center'});
                }
            });
        },

        //改变状态
        initUpdate: function (roleSelector) {
            $(document).on('click', roleSelector, function () {
                var _this = $(this);
                window.Util.dialog.confirm(function (reslut) {
                    if (reslut) {
                        _func.initHandle(_this, function (ret) {
                            if (ret.result) {
                                window.location.reload(true);
                            } else {
                                var msg = $.messager.show(ret.msg, {placement: 'center'});
                            }
                        });
                    }

                }, '你确认要进行该操作吗?');

            });
        },

        //搜索
        initSearch: function (roleSelector) {
            $(document).on('click', roleSelector, function () {
                $('[role=_' + _ROLES.searchForm + ']').submit();
            });
        },

        //初始上传
        initUpload: function (roleSelector) {
            if ($(roleSelector).length > 0) {
                window.Util.upload.init(roleSelector);
            }
        },

        initOperating: function (roleSelector) {
            $(document).on('click', roleSelector, function () {
                if (ret.result) {
                    var _this = $(this);
                    _func.initHandle(_this, function (ret) {
                        var isAlert = _this.data('alert');
                        if (isAlert) {
                            var msg = $.messager.show('处理成功', {placement: 'center'});
                            window.location.reload(true);
                        } else {
                            window.location.reload(true);
                        }
                    });
                } else {
                    var msg = $.messager.show(ret.msg, {placement: 'center'});
                }
            });
        },

        initHandle: function (selector, callback) {
            var url = selector.data('url'),
                dataID = selector.data('id'),
                action = selector.data('action'),
                param = '',
                isSerialize = false,
                actionIdName = "_action_id";
            if (undefined === action) {
                action = "";
            }
            if (undefined === dataID) {
                var ids = $('.table input[type=checkbox]:checked');
                if (ids.length !== 0) {
                    param = ids.map(function () {
                        return $(this).data("id");
                    }).get().join(",");
                }
                actionIdName = "_action_ids";
            } else {
                param = dataID;
            }
            if (param == '') {
                alert("请选择需操作项。");
            } else {
                if ($('[role=_' + _ROLES.searchForm + ']').find("input[name='" + actionIdName + "']").length > 0 && $('[role=_' + _ROLES.searchForm + ']').find("input[name='_action']").length > 0) {
                    $('[role=_' + _ROLES.searchForm + ']').find("input[name='" + actionIdName + "']").val(param);
                    $('[role=_' + _ROLES.searchForm + ']').find("input[name='_action']").val(action);
                    isSerialize = true;
                } else {
                    if (url.indexOf("?") > -1) {
                        url = url + '&_action=' + action + '&' + actionIdName + '=' + param;
                    } else {
                        url = url + '?_action=' + action + '&' + actionIdName + '=' + param;
                    }
                }

                window.Util.ajax.post(url, isSerialize ? $('[role=_' + _ROLES.searchForm + ']').serialize() : '', function (ret) {
                    if (typeof callback == 'function')
                        callback(ret);
                });
            }
        },

        /*时间段选择
         *如果已确定时间段，如套餐时间  在roleSelector添加属性：@data-timePeriod=""
         *data-selectend  在不是套餐的情况下使用，是否可以选择结束时间
         *data-name 命名结束和开始下拉框name，以','分隔
         *data-val 设置初始值
         *data-limit 限制是时间跨度
         */
        initTimeArea: function (roleSelector) {
            var $role = roleSelector,
                timeArea = $role.attr('data-timePeriod'),
                $name = ($role.data('name')).split(','),
                $val = $role.data('val'),
                selectend = $role.data('selectend'),
                limit = parseInt($role.attr('data-limit')),
                $timepicker = $role.data('timepicker');
            var $area = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'],
                startObj = $('<div class="startTime pull-left" style="width:80px;">'
                    + '<select name="' + $name[0] + '" class="form-control js-package-starttime" style="width:100%;"></select></div>'),
                centerObj = $('<span class="pull-left">&nbsp;-&nbsp;</span>'),
                endTimeObj = $('<div class="endTime pull-left" style="width:80px;">'
                    + '<select name="' + $name[1] + '" class="form-control js-package-endtime" style="width:100%;"></select></div>');
            endTxtObj = $('<span class="js-package-endtxt" style="line-height:30px;"></span>');
            inputObj = $('<input type="hidden" name="' + $name[1] + '"></input>');
            if (limit === undefined)
                limit = 1;
            $role.append(startObj);
            $role.append(centerObj)
            if (timeArea === undefined && selectend) {
                $role.append(endTimeObj);
            } else {
                $role.append(endTxtObj);
                $role.append(inputObj);
            }
            var startSelect = $role.find('.startTime select'), endSelect = $role.find('.endTime select');
            $.each($area.slice(limit * 2), function (key, value) {
                endSelect.append('<option value=' + value + '>' + value + '</option>');
            });
            if (timeArea === undefined && selectend) {
                $.each($area, function (key, value) {
                    startSelect.append('<option value=' + value + '>' + value + '</option>');
                });
                $(startSelect).chosen();
                $(endSelect).chosen();
                startSelect.attr('data-value', startSelect.val());
                endSelect.attr('data-value', endSelect.val());
            } else {
                var $arr = $area;
                if (timeArea) {
                    if (parseInt(timeArea) < 2)
                        timeArea = 2;
                    var sp1 = timeArea.toString().split('.')[1], sidx;
                    sidx = parseInt(timeArea) * 2 - 1;
                    if (sp1 !== undefined && sp1 == 5) {
                        sidx = parseInt(timeArea) * 2;
                    }
                    var $arr = $area.slice(0, $area.length - sidx - 1);
                }
                $.each($arr, function (key, value) {
                    startSelect.append('<option value=' + value + '>' + value + '</option>');
                });
                $(startSelect).chosen();
                var $val = startSelect.val(), $clock = $val.split(':'), $endClock;
                if (timeArea) {
                    if (parseInt(timeArea) < 2)
                        timeArea = 2;
                    var sp1 = timeArea.toString().split('.')[1], $point;
                    if (sp1 !== undefined && sp1 == 5)
                        sp1 = 30;
                    else
                        sp1 = 0;
                    $point = parseInt(sp1) + parseInt($clock[1]);
                    $endClock = parseInt($clock[0]) + parseInt(timeArea);
                    if ($point == 60) {
                        $endClock = ($endClock + 1) + ':00';
                    } else {
                        if ($point == 0)
                            $point = '00';
                        $endClock = $endClock + ":" + $point;
                    }
                } else {
                    $endClock = (parseInt($clock[0]) + 2) + ":" + $clock[1];
                }
                endTxtObj.html($endClock);
                inputObj.val($endClock);
                startSelect.attr('data-value', startSelect.val());
            }

            if ($val !== undefined) {
                var $valArr = $val.split(',');
                if ($valArr[0] !== undefined) {
                    startSelect.chosen('destroy');
                    startSelect.find('option[value="' + $valArr[0] + '"]').prop('selected', 'selected');
                    startSelect.chosen();
                }
                if ($valArr[1] !== undefined) {
                    endSelect.chosen('destroy');
                    endSelect.find('option[value="' + $valArr[1] + '"]').prop('selected', 'selected');
                    endSelect.chosen();
                }
            }

            //开始时间选择
            startSelect.bind('change', function () {
                var $val = $(this).val();
                $index = $area.indexOf($val), oldVal = $(this).attr('data-value');
                var $dt = new Date(), $hr = $dt.getHours(), $mt = $dt.getMinutes();
                if ($index > $area.length - limit * 2 - 1) {
                    $(this).val(oldVal);
                    $(this).siblings('.chosen-container').find('.chosen-single span').html(oldVal);
                    //$(this).find('option[value="'+oldVal+'"]').attr('selected','selected');
                    var msg = $.messager.show('该时间段超出服务时段，请重新选择', {placement: 'center'});
                    return false;
                }
                if ($($timepicker).length > 0 && $($timepicker).val() == ($dt.getFullYear() + '-' + window.Util.appendZero($dt.getMonth() + 1) + '-' + window.Util.appendZero($dt.getDate()))) {
                    var $varr = $val.split(':');
                    if ($hr + 2 > $varr[0]) {
                        $(this).val(oldVal);
                        $(this).siblings('.chosen-container').find('.chosen-single span').html(oldVal);
                        var msg = $.messager.show('该时间段不可选，请重新选择', {placement: 'center'});
                        return false;
                    }
                }
                $(this).attr('data-value', $(this).val());
                if (timeArea === undefined) {
                    var $arr = $area.slice($index + limit * 2), $end = $(this).parent().siblings('.endTime'), $sel = $end.find('select');
                    $sel.chosen('destroy');
                    $sel.empty();
                    $.each($arr, function (key, value) {
                        $sel.append('<option value=' + value + '>' + value + '</option>');
                    });
                    $sel.chosen();
                } else {
                    if (parseInt(timeArea) < 2)
                        timeArea = 2;
                    var $clock = $val.split(':'), $endClock = parseInt($clock[0]) + parseInt(timeArea);
                    var sp1 = timeArea.toString().split('.')[1], $point;
                    if (sp1 !== undefined && sp1 == 5)
                        sp1 = 30;
                    else
                        sp1 = 0;
                    $point = parseInt(sp1) + parseInt($clock[1]);
                    if ($point == 60) {
                        $endClock = ($endClock + 1) + ':00';
                    } else {
                        if ($point == 0)
                            $point = '00';
                        $endClock = $endClock + ":" + $point;
                    }
                    $(this).parent().siblings('.js-package-endtxt').html($endClock);
                    $(this).parent().siblings('input').val($endClock);
                }
            });
        },

        tableHover: function (roleSelector) {
            $(roleSelector).find('.table tr').hover(function (e) {
                var target = $(e.target);
                if ($(this).find('table').length > 0)
                    return;
                target.parents('tr').eq(0).addClass('trHover');
            }, function (e) {
                $(roleSelector).find('table tr').removeClass('trHover');
                return false;
            });
        },

        /*
         * 编辑页会员选择
         */
        initSelMember: function (roleSelector) {
            $(document).on('click', roleSelector, function () {
                if ($('#frameWrap').length > 0) {
                    $('#frameWrap').show();
                    return false;
                }
                var $url = $(this).data('url');
                var $frame = $('<div id="frameWrap" class="frameWrap">'
                    + '<div class="frameWrap-lays"></div>'
                    + '<div class="frameWrap-ctn"><iframe style="width:750px;height:420px;border:none;" src=' + $url + '></iframe></div></div>');
                $('body').append($frame);
            });
        },

        initSureMember: function (roleSelector) {
            $(document).on('click', roleSelector, function () {
                var $id = $('.js-radio:checked').attr('id');
                var selBtn = $('[role*="_selMember"]', parent.document), tid = selBtn.data('id'), $name = selBtn.data('name').split(',');
                if ('undefined' == typeof($id)) {
                    $.messager.show('请选择。', {placement: 'center'});
                    return;
                }
                $(tid, parent.document).val($id);
                $.each($name, function (key, value) {
                    var dname = value.substring(1);
                    var dval = $('.js-radio:checked').data(dname);
                    $(value, parent.document).html(decodeURI(dval));
                });
                $('#frameWrap', parent.document).hide();
            });
        },

        initCancelMember: function (roleSelector) {
            $(document).on('click', roleSelector, function () {
                $('#frameWrap', parent.document).hide();
            });
        }

    };
})(window.Core = window.Core || {});


//自动加载
$(function () {
    window.Core.role.autoload();
});
