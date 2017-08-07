toastrDefaults={
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}
/**
 *
 * @param type 类型
 * @param msg 信息
 * @param title 标题
 * @param option 具体参数
 */
var toastrSuccessMessage=function(msg,title,option){
    var optionsParam= $.extend({},toastrDefaults,option);
    toastr.options=optionsParam;
    toastr['success'](msg,title)
}
var toastrInfoMessage=function(msg,title,option){
    var optionsParam= $.extend({},toastrDefaults,option);
    toastr.options=optionsParam;
    toastr['info'](msg,title)
}
var toastrWarnMessage=function(msg,title,option){
    var optionsParam= $.extend({},toastrDefaults,option);
    toastr.options=optionsParam;
    toastr['warning'](msg,title)
}
var toastrErrorMessage=function(msg,title,option){
    var optionsParam= $.extend({},toastrDefaults,option);
    toastr.options=optionsParam;
    toastr['error'](msg,title)
}