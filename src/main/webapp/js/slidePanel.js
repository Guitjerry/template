var slideDefault={
  success:null
};
/**
 * 开启滑动框函数
 * @param id 滑出框id
 * @param url 嵌入页面地址
 */
var slidePanel=function(id,url,p,position){
    var settings = $.extend({},slideDefault, p);


    var panel=$('.sys_slidePanel');
    var _div=$("#"+id);
    for(var i=0;i<panel.length;i++){
        if($(panel[i]).attr('isOpen')=='true'&&id!=panel[i].id){
            $(function(){_closeSlidePanel(panel[i].id);});
        }
    }
    if(url==undefined||url==null||url==""){
        if(_div.attr('href')==undefined||_div.attr('href')==""){

            _openSlidePanel(id,position);
            if(settings.success){
                settings.success();
            }
        }
        else{
            _div.load(_div.attr('href'),"",function(){
                _openSlidePanel(id);
                _div.attr('openType','url'); //打开类型为链接型 为关闭的时候清空数据
                if(settings.success){
                    settings.success();
                }

            });
        }

    }
    else{
        _div.load(url,"",function(){
            _openSlidePanel(id,position);
            _div.attr('openType','url'); //打开类型为链接型 为关闭的时候清空数据
            if(settings.success){
                settings.success();
            }
        });
    }
}
/**
 * 关闭函数
 */
var closeSlidePanel=function(){
    var panel=$('.sys_slidePanel');
    for(var i=0;i<panel.length;i++){
        if($(panel[i]).attr('isOpen')=='true'){
            $(function(){_closeSlidePanel(panel[i].id);});
        }
    }
    $('#mask').hide();
}
var _openSlidePanel=function(id,position){
    position=position==undefined?"":position;
    var _div=$('#'+id);
    var _width=_div.width();
    var _top = _div.css('top');
    var _right = _div.css('right');
    if(_width>960){
        _width=960;
        _div.width(_width);
    }
    if(_div.attr('isOpen')!='true'){
        _div.css({'background':'#fff','border':'2px solid #F2F2F2','position': 'absolute','width':_width,'top':_top,'right':_right,'z-index':2000,'position':'absolute'});
        _div.append("<div style='position: absolute;z-index: 9999;left: -8px;top: -8px;width: 16px;height: 16px;'>"+
            "<a  href='javascript:void(0);' onclick=\"_closeSlidePanel('"+id+"')\"></a></div>");

        _div.addClass('sys_slidePanel');
        _div.attr('isOpen','true');
        // _div.animate({right:_right});
        _div.show();

    }
}
var _closeSlidePanel=function (id){
    var _div=$('#'+id);
    var _width=_div.width();
    _div.attr('isOpen','false');
    if(_div.attr('opentype')=='url'){
        _div.css({right:'30%'});
        _div.empty();
        _div.hide();
        return;
    }


};
var slideP={};
slideP.open=function(id,url,p,position){
    slidePanel(id,url,p);
}
slideP.close=function(p){
    closeSlidePanel();
}