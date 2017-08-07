/**
 * 公用工具类
 * @author 
 */
(function(object){

	//外部方法
	//ajax
	object.ajax = {
		get : function(url, param, callback, async, dataType) {
			_func.ajax("get", url, param, callback, async, dataType);
		},
		post : function(url, param, callback, async, dataType){
			_func.ajax("post", url, param, callback,async, dataType);
		}
	};

	//confirm和alert
	object.dialog = {
		alert : function(callback,promptStr) {
			_func.dialog(callback,promptStr);
		},
		confirm : function(callback,promptStr) {
			_func.dialog(callback,promptStr,true);
		}
	};
	
	object.upload = {
		init : function(selector){
			_func.fileupload(selector);
			_func.trgUpload();
			_func.clearImg();
		},
		showPicurl:function(selector){	//编辑时显示已上传的图片
			_func.showPicurl(selector);
		}
	};

	object.validatetion = {
		validator:null,
		init : function(selector){
			$(selector).each(function(){_func.validatetion($(this));});
		}
	};

	object.editor = {
		editor:null,
		init:function(selector){
			if(selector.indexOf('*')!=-1){
				selector = selector.replace("*","");
			}
			_func.editor(selector);
		}

	};
	
	object.showBox = {
		init : function(){
			_func.showBox();
		},
		closeBox : function(callback){
			_func.closeBox(callback);
		}
	};
	
	object.datetimepicker = {
		init : function(){
			_func.datetimepicker();
		}
	}

	object.chosen = {
		init : function(selector){
			_func.chosen(selector);
		}
	}
	
	//日期加0  2015-1-26
	object.appendZero = function(obj){
		if (obj < 10) return "0" + obj; else return obj;
	}

	//内部方法
  	var _func = {
		ajax : function(type, url, param, callback, async, dataType) {
			$.ajax({  
				type:type,
				url:url,
				cache:false,
				ifModified: true,
				async: undefined === async ? true : async,
				data:param,
				dataType:undefined === dataType ? "json" : dataType,
				success:function(data){
					//success
					callback(data);
				},
				error:function(XMLHttpRequest, textStatus){
					callback({result:false, msg:XMLHttpRequest.status});
					XMLHttpRequest = null;
				},
				complete:function (XMLHttpRequest, textStatus,errorThrown) {
		 			XMLHttpRequest = null;
		 		}
			});
		},
		
		dialog : function(callback,promptStr,confirm) {
			if(confirm){
				bootbox.confirm(undefined === promptStr ? "Are you sure?" : promptStr,callback);
			}else{
				bootbox.alert(undefined === promptStr ? "Are you sure?" : promptStr,callback);
			}
			
		},
		
		template : "<div class=\"upload-viewer\"><span class=\"imgDelete icon-remove-sign\" title=\"清空图片\" data-file=\"%f\"></span><a href=\"javascript:void(0);\"></a><img src=\"%s\" border=\"0\" width=\"100\"></div>",
		
		fileupload : function(selector){
			upload = $(selector);
			upload.each(function(i){
				var config = $(this).data('config');
					_parent = $(this).parent(),
					inputID = $(this).attr('id');
				if(config !=undefined){
					var img = config.image,
				   		txt = config.text;
				}
				var uploadWrap = $('<div class="fileupload-wrap"><span class="trigger-btn" data-target="'+inputID+'"></span></div>');
				$(this).css({
					visibility: 'hidden',
					'z-index': 999,
					position: 'relative',
				});
				if(img != undefined){
					uploadWrap.find('trigger-btn').css({
						'background-image': 'url('+img+')'
					})
				}
				uploadWrap.find('.trigger-btn').text(txt === undefined ? '上传' : txt);
				var fileInput = $(this).detach();
				uploadWrap.append(fileInput);
				_parent.append(uploadWrap);
			});
			upload.fileupload({
				url : $('body').attr('path')+'/uploadfile',
				dataType: 'json',
				change: function(e,data){
					var fileInput = $(e.target),fileTypeExts = fileInput.attr('accept');
					var json = _func._toJson(data);
					fileInput.data('error','false');
					$.each(json.files,function(index, file){
						var filename = file.name,fileExt=(/[.]/.exec(filename)) ? /[^.]+$/.exec(filename.toLowerCase()) : '';
						if(fileExt == 'jpg')
						   fileExt = 'jpeg';
						if(fileTypeExts.indexOf(fileExt)==-1){
							fileInput.val('');
							var msg = $.messager.show('文件类型不正确，请选择正确文件！', {placement: 'center'});
							fileInput.data('error','true');
							return;
						}
					});
				},
				add : function(e, data){
					var fileInput = $(e.target);
					if(fileInput.data('error')=='false')
					   data.submit();
					else
					   return false;
				},
				done: function(e,data){
					var json = _func._toJson(data),
					    result = json.result;
					if(result.result){		//if(result.files.length>0){
						var fileInput = $(e.target),
							target = fileInput.data('target'),
							wrap = fileInput.parent().parent();
						if (typeof(target) != 'undefined')
						{
							 $('#'+target).val(result.name);
						}
						if(fileInput.data("show")){
							var upload_viewer = wrap.find(".upload-viewer");
							if(upload_viewer.length>0){
								upload_viewer.eq(0).children(".imgDelete").data("file",result.name);
								upload_viewer.eq(0).children("img").attr("src",result.url);
							}
							else{
								wrap.prepend(_func.template.replace("%f", result.name).replace("%s", result.url)).fadeIn();
							}
						}
						//fileInput.val(result.files[0].name);
					}else{
						var msg = $.messager.show(json.msg, {placement: 'center'});
					}
				}
			});
		},
		trgUpload : function(){
			$(document).on('click','.trigger-btn',function(){
				var target = $(this).data('target');
				$('#'+target).trigger('click');
			});
		},
		clearImg : function(){
			$(document).on('click', '.upload-viewer .imgDelete', function(){
				//var filename = $(this).data('file');
				//$(this).parent().empty().html('暂无图片').parent().find('input').val('');
//				$(this).parent().remove();
	//			window.Util.ajax.post(url, {filename: filename}, function(ret){
	//				if (ret.result) {
	//				}else{
	//				}
	//			});
				var baseurl = $(this).data("baseurl");
				var default_photo = $(this).data("defaultphoto");
				if(undefined == baseurl || undefined == default_photo){
					$(this).parent().remove();
				}else{
					$(this).siblings("img").attr("src",default_photo);
				}
			});
		},
		showPicurl:function(selector){
			$(selector).each(function(index,_this){
				var baseurl = $(_this).data("baseurl");
				var wrap = $(_this).parent();
				var filename = $(_this).val();
				var upload_viewer = wrap.find(".upload-viewer");
				if(upload_viewer.length>0){
					upload_viewer.eq(0).children(".imgDelete").data("file",filename);
					upload_viewer.eq(0).children("img").attr("src",baseurl+filename);
				}
				else
				{
					wrap.prepend(_func.template.replace("%f", filename).replace("%s", baseurl+filename)).fadeIn();
				}
			});
		},
		_toJson : function(arg){
			if("" == arg) return "";
			if(typeof(arg) == "object"){
				return arg;
			}else{
				return jQuery.parseJSON(arg);
			}
		},
		validatetion : function(selector){
			var form = $(selector);
			var flag =false;
			object.validatetion.validator = form.validate({
		        errorPlacement: function(error,element){		//用于自定义错误显示位置
		        	if(element.data('error')==='_myError'){	
		        		error.addClass('myerror');
		        		error.appendTo(element.parent());
		        	}else{
		        		error.appendTo(element.parent());
		        	}
		        },

		         submitHandler:function(form){	//提交前触发
                     _func.loading("show");
                     _func.ajax("post", form.action, $(form).serialize(), function (data) {
                         if (data.status == 'success') {
                             toastrSuccessMessage("信息提示", "提交成功");
                             setTimeout(function () {
                                 location.reload();
                             }, 1000)
                         }
                     })

// 						var overlays = $('<div style="position:fixed;left:0px;top:0px;width:100%;height:100%;">'
// 						               +'<div style="position:absolute;left:0px;top:0px;width:100%;height:100%;background-color:#fff;filter:alpha(opacity=0);opacity:0;"></div>'
// 									   +'<div class="submitLoading"></div></div>');
// 						$('body').append(overlays);
// 		            	if(data.result){
// 		            		var redirect_url = $("[role*=_editForm]").attr("redirect-url");
// 		            		if(undefined != redirect_url && redirect_url.toString().length>0)	//如果存在跳转链接
// 		            		{
// 								if(undefined !== data.ret){
// 									var retdata = data.ret,retString = '?';
// 									$.each(retdata,function(key,value){
// //										if(retString == '?')
// //										  retString = retString + key + '=' + value;
// //										else
// //										  retString = '&' + retString + key + '=' + value;
//
// 										retString += key + '=' + value+'&';
// 								    });
// 									redirect_url = redirect_url + retString;
// 								}
// 								window.location.replace(redirect_url);
// 		            		}
// 		            		else if($(form).data('callback') != undefined && $(form).data('callback') !=''){
// 		            			eval($(form).data('callback'));
// 		            		}
// 		            		else{
// 			            		_func.closeBox(function(){
// 			            			$('[role=_searchForm]',window.top.document).submit();
// 			            		});//关闭
// 		            		}
// 							overlays.remove();
// 		            	}else{
// 							var msg = $.messager.show(data.msg, {placement: 'center'});
// 							overlays.remove();
// 						}
// 		            });
// 		            form.submit();
		        },
		        highlight: function(element, errorClass) {  //针对验证的表单设置高亮  
                	// $(element).parents('div.form-group').children("div").addClass('has-error');
                	// $(element).css("display","inline"); 
            	},success: function(element) {	//验证成功，去除元素错误框样式
				    // $(element).parents('div.has-error').removeClass('has-error');
				}
		    });
		    $.validator.addMethod('isServiceTime',function(value, element, param){
		    	var arr = value.toString().split('.');
		    	if(arr[1]){
		    	  if(arr[1].length>1)
		    	     return false;
		    	  if(arr[1]!=0 && arr[1]!=5)
		    	     return false;
		    	}
		    	return this.optional(element) || ( value >= param[0] && value <= param[1] );
		    },"服务时段超出范围");
		    //下单时间选择
		    $.validator.addMethod('checkOrderTime',function(value, element , param){
		    	var startobj = $('select[name='+param[0]+']'),dt = new Date(),hr = dt.getHours(),mt = dt.getMinutes();
		    	var dtString = dt.getFullYear()+'-'+window.Util.appendZero(dt.getMonth()+1)+'-'+window.Util.appendZero(dt.getDate());
		    	var starVal = startobj.val(),sval = starVal.split(':');
		    	if(value == dtString){
		    		if(hr+2 > sval[0])
					  return false;
		    	}
		    	return true;
		    },"服务时段超出范围");
		},
		editor : function(selector){
			
			if(typeof KindEditor != "undefined"){
				object.editor.editor = KindEditor.create(selector, {
					resizeType : 0,
					minWidth : 400,
					allowPreviewEmoticons : false,
					langType:"zh_CN",
					pasteType:1,
					filterMode : false,
					themeType : 'simple',
					urlType:'domain',
					uploadJson:$('body').attr('path')+'/uploadfile?from=kindeditor&filetype=image',
					items : ['source','template','fontname', 'fontsize', '|', 'forecolor', 'hilitecolor',
							'bold', 'italic', 'underline', 'removeformat', '|',
							'justifyleft', 'justifycenter', 'justifyright',
							'insertorderedlist', 'insertunorderedlist', '|',
							'link','|','source' ,'quickformat','code','lineheight','image'],
					afterBlur: function(){this.sync();}

				});				
			}
		},
		showBox : function(){
			$a = '[target=_box]';
			$(document).on('click',$a,function(){
				var boxClass = $(this).attr("boxclass");
				var title = $(this).attr("title");
				var href = $(this).attr("href");
				if("" == boxClass || undefined == boxClass)
					$(this).showBox({title: title,target:href});
				else
					$(this).showBox({title: title,target:href,autoFix:false,iframeclassName:boxClass});
				return false;
			});
		},
		closeBox : function(callback){
			$("#_showBox",window.top.document).stop().fadeOut(300, function(){
				$("#_showBox_overlay",window.top.document).remove();
				$("#_showBox",window.top.document).remove();				
			});
			if(typeof callback == 'function'){
				callback();
			}
		},
		datetimepicker : function(){
			if($.fn.datetimepicker)
			{
				/*
				 *data-target="#endtime" 关联时间
				 *data-today="true" 限制当天以前的时间不可选
				 */
				var linkDate = function(ev){
					var _this = $(this);
					setTimeout(function(){_this.blur();},200);
					var target = $(this).data('target'),$date = new Date($(this).val());
					$date = new Date($date.getTime()+60*60*1000);
					if(typeof target != undefined){
						if(target.indexOf('from') > -1){
							$(target).datetimepicker('setEndDate',$date);
						}else{
							$(target).datetimepicker('setStartDate',$date);
						}
						
					}
				}
				var showDate = function(){
					var $today = $(this).data('today');
					if($today){
						var $date = new Date();
						$date = new Date($date.getTime()+60*60*1000);
						$(this).datetimepicker('setStartDate',$date);
					}
				}
				
				$('.form-datetime').datetimepicker(
				{
					weekStart: 1,
					todayBtn:  1,
					autoclose: 1,
					todayHighlight: 1,
					startView: 2,
					minView: 1,
					forceParse: 0,
					showMeridian: 1,
					format: 'yyyy-mm-dd hh:00'
				}).on('changeDate',linkDate).on('show',showDate);
				$('.form-date').datetimepicker(
				{
					language:  'zh-CN',
					weekStart: 1,
					todayBtn:  1,
					autoclose: 1,
					todayHighlight: 1,
					startView: 2,
					minView: 2,
					forceParse: 0,
					format: 'yyyy-mm-dd'
				}).on('changeDate',linkDate).on('show',showDate);
				$('.form-time').datetimepicker({
					language:  'zh-CN',
					weekStart: 1,
					todayBtn:  1,
					autoclose: 1,
					todayHighlight: 1,
					startView: 1,
					minView: 0,
					maxView: 1,
					forceParse: 0,
					format: 'hh:ii'
				}).on('changeDate',linkDate).on('show',showDate);
				$('.form-month').datetimepicker({
					language:  'zh-CN',
					weekStart: 1,
					autoclose: 1,
					todayHighlight: 1,
					startView: 3,
					minView: 3,
					forceParse: 0,
					format:'yyyy-mm'
				}).on('changeDate',linkDate).on('show',showDate);
			}
		},
		chosen:function(selector){
			$(selector).each(function(index,_this){
				var defaultVal = $(_this).data("defaultvalue");
				if(null!=defaultVal && typeof defaultVal != "undefined"){
					if(typeof defaultVal == 'string' && defaultVal.indexOf(",")>-1){
						var arrs = defaultVal.split(',');
						for(var i in arrs){
							$(_this).children('[value='+arrs[i]+']').attr("selected",true);
						}
					}else{
						$(_this).val(defaultVal);
					}
				}
			})
			$(selector).chosen({});
			$(selector).change(function(){	//用于修正应用chosen的select有值的时候，木有隐藏validation插件提示的错误信息
				if($(this).val() != null && $(this).siblings('.error').length>0){
					$(this).siblings('.error').remove();
				}
			});

		},
        //loading
        loading : function(opt){
            var loading = $('<div id="loading" style="position:fixed;left:0;top:0;width:100%;height:100%;z-index:10000;"></div>');
            loading.append('<div style="width:100%;height:100%;opacity:0.2;background-color:#fff"></div>');
            loading.append('<div class="leftLoading"></div>');
            if(opt=="show"){
                $('body').append(loading);
            }else{
                $('#loading').remove();
            }
        }


	};
})(window.Util = window.Util || {});

