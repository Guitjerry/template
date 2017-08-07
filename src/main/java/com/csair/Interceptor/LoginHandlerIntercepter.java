package com.csair.Interceptor;
import com.csair.util.CheckMobile;
import com.csair.util.Const;
import org.apache.log4j.Logger;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * 登录拦截器
 */
public class LoginHandlerIntercepter extends HandlerInterceptorAdapter {
//    private String[] m_suffixs = Const.RESOURCES;;
    public static Logger logger = Logger.getLogger(LoginHandlerIntercepter.class);
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object handler) throws Exception {
        String contextPath;
        String requestURI;
        String userAgent = httpServletRequest.getHeader("USER-AGENT");
        requestURI = httpServletRequest.getRequestURI().replaceAll("\\/\\/", "/");
        //过滤后缀,直接跳过
//        for (String suffix : m_suffixs) {
//            if (requestURI.endsWith("." + suffix)) {
//                return super.preHandle(httpServletRequest, httpServletResponse, handler);
//            }
//        }
        boolean isphone = CheckMobile.check(userAgent);
        boolean flag = false;
        if(isphone){
            flag=true;
        }else{
            //不在登录页面
            if(requestURI.indexOf("login")<=0){
                //说明处在编辑的页面
                HttpSession session = httpServletRequest.getSession();
                String username = (String) session.getAttribute("username");
                session.setMaxInactiveInterval(30*60);//以秒为单位，即在没有活动30分钟后，session将失效
                if(username!=null){
                    //登陆成功的用户
                    flag=true;
                }else{
                    //没有登陆，转向登陆界面
                    httpServletResponse.sendRedirect(httpServletRequest.getContextPath()+"/pc/login");
                    flag=false;
                }
            }else{

                flag=true;
            }
        }
        return flag;
    }

    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }

    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }
}
