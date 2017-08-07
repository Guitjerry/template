/**
 * 新增自定义验证规则
 * @author pigy
 * 2014.12.25
 */

// 身份证验证   
jQuery.validator.addMethod("idCard", function(value, element) {   
    var idCard = /^(\d{18}$|^\d{17}(\d|X|x))$/;
    if(idCard.test(value)){
       if($(param).length>0){
       	  var birthday;
       	  if(value.length == 15){  
      	  	birthday = "19"+value.substr(6,6);  
 	      } else if(value.length == 18){  
      	  	birthday = value.substr(6,8);  
   	   	  }
       	  birthday = birthday.replace(/(.{4})(.{2})/,"$1-$2-");
       	  $(param).val(birthday);
       }
    }
    return this.optional(element) || (idCard.test(value));
}, "请正确填写您的身份证号码");
//增加身份证class验证规则
jQuery.validator.addClassRules("idCard", {
  idCard: true
});