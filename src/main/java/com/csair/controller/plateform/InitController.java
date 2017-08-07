package com.csair.controller.plateform;
import com.csair.util.JsonUtilTemp;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * 初始化controller
 */
@Controller
@RequestMapping(value="/pc")
public class InitController {
    @RequestMapping(value="/index")
    public String index(){
        return "pc/index";

    }
    @RequestMapping("/login")
    public String login(HttpServletRequest request){
        return "pc/login";
    }
    @RequestMapping(value = "/loginsure",method = RequestMethod.POST)
    public void loginsure(HttpServletRequest request, HttpServletResponse response, String username, String password, String requesturi){
        if(StringUtils.isEmpty(username)){
            JsonUtilTemp.returnFailJson(response,"账户不能为空!");
            return;
        }
        if(StringUtils.isEmpty(password)){
            JsonUtilTemp.returnFailJson(response,"密码不能为空!");
            return;
        }
        //测试账户
//        if("admin".equals(username)&&"123".equals(password)){
//            //保存到session
//            request.getSession().setAttribute("username","admin");
//            JsonUtilTemp.returnSucessJson(response,"成功登录系统");
//            return;
//        }

        if(username.equals("admin")&&password.equals("123")){
            //保存到session
            request.getSession().setAttribute("username","admin");
            JsonUtilTemp.returnSucessJson(response,"成功登录系统");
        }else{
            JsonUtilTemp.returnFailJson(response,"账户或者密码错误!");
        }
    }
}
