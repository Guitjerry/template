(function(){

    //class为.wBox_close为关闭
    $.fn.showBox = function(options){
        var defaults = {
            wBoxURL: "../images/box/",
            opacity: 0.5,//背景透明度
            callBack: null,
            closeCallBack : null,
            noTitle: false,
            show:true,
            timeout:0,
            target:null,
            requestType:'iframe',//iframe,ajax,img
            title: "",
            drag:true,
            autoFix:true,
            disableClose:false,
            ifameName:'_showBoxIframe',
            iframeclassName: "defaultBox",
            html: ''//Box内容
        },_this=this;
        this.YQ = $.extend(defaults, options);
        this.initPara=new Array();
        var loading=null;
        var loadingFrame=1;
        var loadingTimer;
        //var isIE6 = $.browser.msie && $.browser.version < 7 && !window.XMLHttpRequest
        var  boxHtml = '<div id="_showBox"><div id="headerDrag"></div><div id="header"><span class="box_title">'+_this.YQ.title+'</span>';
        if(!_this.YQ.disableClose)
            boxHtml += '<a href="javascript:void(0)" id="close"><i class="icon icon-remove"></i></a>';
        boxHtml += '</div><div id="content"></div></div>';
        var B = null, C = null, $win = $(window),$t=$(this);//B背景，C内容jquery div
        this.showBox=function (){
            //页面遮罩
            $("#_showBox_overlay").remove();
            $("#_showBox").remove();
            B = $("<div id='_showBox_overlay'></div>").hide().css('opacity', _this.YQ.opacity).appendTo('body').fadeIn(300);
            C = $(boxHtml).appendTo('body');
            L = $("<div class='box_loading' style='display:none;'><div></div></div>").appendTo('body');
            handleClick();
            loading_showActivity($(".box_loading"));
            //loadingHelper.show(C);
            $("iframe[name="+_this.YQ.ifameName+"]").load(function(){$(".box_loading").hide();clearInterval(loadingTimer);setPosition();});


        }

        /*
         * 处理点击
         * @param {string} what
         */
        function handleClick(){
            //开始加载页面时加一个遮罩层
            var con = C.find("#content");
            if (_this.YQ.requestType && $.inArray(_this.YQ.requestType, ['iframe', 'ajax','img'])!=-1) {
                if (_this.YQ.requestType === "img") {
                    var img = $("<img />");
                    img.attr("src",_this.YQ.target);
                    img.load(function(){
                        img.appendTo(con.empty());
                    });
                } else {
                    if (_this.YQ.requestType === "ajax") {
                        $.get(_this.YQ.target, function(data){
                            con.html(data);
                        })

                    } else {
                        if(_this.YQ.iframeclassName!=='defaultBox')
                            _this.YQ.autoFix==false;
                        ifr = $("<iframe name="+_this.YQ.ifameName+" class='"+_this.YQ.iframeclassName+"' style='overflow-x:hidden;' frameborder='0' src='" + _this.YQ.target + "'></iframe>");
                        ifr.appendTo(con.empty());
                        //ie6需要改变一次src
                        /*if(isIE6)
                         ifr.attr("src",_this.YQ.target);	*/
                        ifr.load(function(){
                            $it = $(this).contents();
                            //根据内容设置iframe高宽
                            if(_this.YQ.autoFix){
                                C.find("iframe[name="+_this.YQ.ifameName+"]").removeClass(_this.YQ.iframeclassName);
                                C.find("iframe[name="+_this.YQ.ifameName+"]").css("height",0+"px");
                                C.find("iframe[name="+_this.YQ.ifameName+"]").css("width",0+"px");
                                C.find("iframe[name="+_this.YQ.ifameName+"]").css("height",$it.outerHeight(true)+"px");
                                C.find("iframe[name="+_this.YQ.ifameName+"]").css("width",$it.outerWidth(true)+"px");
                                if(C.find("iframe[name="+_this.YQ.ifameName+"]").height()+50>$(window).height()){
                                    C.find("iframe[name="+_this.YQ.ifameName+"]").css("height",$(window).height()-50+'px');
                                }
                                C.find('#content').css('height',C.find("iframe[name="+_this.YQ.ifameName+"]").height()+'px');
                                //初始化居中
                                var left = ($(window.parent).width()-C.find("#_showBox").width())/2;
                                var top = ($(window.parent).height()-C.find("#_showBox").height())/2;
                                C.find("#_showBox").css({
                                    "left": left,
                                    "top": top
                                });
                            }
                        });
                    }
                }
                //setPosition();
            }
            afterHandleClick();
        }

        /*
         * 处理点击之后的处理
         */
        function afterHandleClick(){
            C.show();
            if(!_this.YQ.disableClose){
                C.find('#close').click(_this.close);
                $(document).unbind('keydown').bind('keydown', function(e){
                    if (e.keyCode === 27)
                        _this.close();
                    return true;
                });
            }
            //处理是否返回和拖拉
            typeof _this.YQ.callBack === 'function' ? _this.YQ.callBack() : null;
            !_this.YQ.noTitle&&_this.YQ.drag?drag():null;
            if(_this.YQ.timeout){
                setTimeout(_this.close,_this.YQ.timeout);
            }

        }

        /*
         *loading动画
         *2013-1-8
         */
        function loading_showActivity(object){

            loading=object;
            clearInterval(loadingTimer);
            loading.show();
            $(".box_loading").css({
                left: ($(window).width()/2)+20+"px",
                top: ($(window).height()/2)+"px"
            });
            loading.show();
            loadingTimer = setInterval(function(){
                if (!loading.is(':visible')){
                    clearInterval(loadingTimer);
                    return;
                }
                $('div', loading).css('top', (loadingFrame * -40) + 'px');
                loadingFrame = (loadingFrame + 1) % 12;
            },66);
        }
        function loading_move(){
            setTimeout(function(){
                $(".box_loading").hide();
                clearInterval(loadingTimer);
            },5000);
        }

        /*
         * 设置wBox的位置
         */
        function setPosition(){
            if (!C) {
                return false;
            }
            var height=C.height();
            var width = C.width(),  lt = calPosition(width,height);
            C.css({
                left: lt[0],
                top: lt[1]
            });
            var $h = $("body").height(), $wh = $win.height(),$hh=$("html").height();
            $h = Math.max($h, $wh);
            B.height($h).width($win.width())
        }

        /*
         * 计算wBox的位置
         * @param {number} w 宽度
         */
        function calPosition(w,h){
            l = ($win.width() - w) / 2;
            t = ($win.height()-h) / 2;
            return [l, t];
        }

        /*
         * 拖拽函数drag
         */
        function drag(){
            var ua = navigator.userAgent.toLowerCase();
            var isMobile,mouseStart,mouseMove,mouseUp;
            isMobile=ua.match(/ipad/i);
            onDownFn = isMobile ? "touchstart" : "mousedown";
            onMoveFn = isMobile ? "touchmove" : "mousemove";
            onUpFn = isMobile ? "touchend" : "mouseup";
            onOutFn = isMobile ? "touchend" : "mouseout";

            var dx, dy, moveout=false;
            var T = C.find('#headerDrag').css('cursor', 'move');
            T.bind("selectstart", function(){
                return false;
            });
            T.css("-moz-user-select","none");

            T.bind(onDownFn,function(e){
                //为iframe添加一个透明遮罩层，使拖动顺畅
                var inner=$("<div id='tmp_layout' style='top:"+$(this).height()+"px; left:0px; position:absolute; width:100%; height:100%; z-index:1; background-color:#ff0000;  filter:alpha(opacity=0); opacity:0;'></div>");
                C.prepend(inner);
                var xPoint=0,yPoint=0;
                if(isMobile){
                    xPoint = window.event.changedTouches[0].pageX;
                    xPoint = window.event.changedTouches[0].pageY;
                }else{
                    xPoint = e.clientX;
                    yPoint = e.clientY;
                }

                dx = xPoint - parseInt(C.css("left"));
                dy = yPoint - parseInt(C.css("top"));
                C.bind(onMoveFn,move).bind(onOutFn,out).bind(onUpFn,up);
                T.bind(up);
            });

            /*
             * 移动改变生活
             * @param {Object} e 事件
             */

            function move(e){
                var xPoint=0,yPoint=0;
                moveout = false;
                if(isMobile){
                    xPoint = window.event.changedTouches[0].pageX;
                    xPoint = window.event.changedTouches[0].pageY;
                }else{
                    xPoint = e.clientX;
                    yPoint = e.clientY;
                }
                if (xPoint - dx < 0) {
                    l = 0;
                } else {
                    if (xPoint - dx > $win.width() - C.width()) {
                        l = $win.width() - C.width();
                    } else {
                        l = xPoint - dx;
                    }
                    if(yPoint - dy > $win.height() - C.height()){
                        h=$win.height() - C.height();
                    }
                    else{
                        h=yPoint - dy;
                    }
                }
                C.css({
                    left: l,
                    top: h
                });
            }

            /*
             * 你已经out啦！
             * @param {Object} e 事件
             */
            function out(e){
                moveout = true;
                setTimeout(function(){
                    moveout && up(e);
                }, 10);
            }

            /*
             * 放弃
             * @param {Object} e事件
             */
            function up(e){
                $(this).find('#header').css("-moz-user-select","");
                $("#tmp_layout").remove();
                if(parseInt(C.css('top'))<0)
                    C.css('top',0);
                C.unbind(onMoveFn, move).unbind(onOutFn, out);
                T.unbind(onUpFn, up);
            }

        }

        /*
         * 关闭弹出框就是移除还原
         */
        this.close=function (){
            if (C) {
                B.remove();
                C.remove();
                C.stop().fadeOut(300, function(){
                    C.remove();
                })
                $(".box_loading").hide();
                clearInterval(loadingTimer);
                typeof _this.YQ.closeCallBack === 'function' ? _this.YQ.closeCallBack() : null;
            }
        }

        /*
         * 触发click事件
         */
        $win.resize(function(){
            setPosition();
        });

        _this.YQ.show?_this.showBox():$t.click(function(){
            _this.showBox();
            return false;
        });
        return this;
    };
})(jQuery);


