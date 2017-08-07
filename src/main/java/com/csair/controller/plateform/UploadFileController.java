package com.csair.controller.plateform;

import com.csair.util.Const;
import com.csair.util.JsonUtilTemp;
import com.csair.util.PropertyUtil;
import com.csair.util.UploadFile;
import com.csair.vo.UploadResultVo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@Controller
public class UploadFileController {
    @Value("${http.uploadpicpath}")
    private String uploadpicpath;//上传头像地址
    /**
     * @throws Exception

     *
     *             方法名: upload <br />
     *             描述: 上传文件<br />
     *             参数：<br />
     * @param request
     * @param response
     * <br />
     * @return void <br />
     * @throws
     */
    @RequestMapping(value = "/uploadfile")

    public void uploadfile(HttpServletRequest request, HttpServletResponse response) throws Exception {

        final String uploadPath = PropertyUtil.getProperty("uploadpicpath");
        final String uploadUrl = request.getContextPath()+"/upload";

        try{

            String fullUploadPath = uploadPath  + "/";
            String fullUploadUrl = uploadUrl  + "/";
            UploadFile up = new UploadFile(request, fullUploadPath);

                UploadResultVo vo;
                up.saveFile();
                if (null!=up.saveFile && up.saveFile.exists()) {
                    vo = new UploadResultVo(up.fileName, fullUploadUrl + up.fileName, up.oriName);
                } else {
                    vo = new UploadResultVo(false, "上传失败", "", "");
                }
                JsonUtilTemp.returnJson(vo,response);

        }catch(Exception exp){
            JsonUtilTemp.returnExceptionJson(response, "上传失败"+exp.getMessage());
        }
    }
}
