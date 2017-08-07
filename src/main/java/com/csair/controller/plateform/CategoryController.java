package com.csair.controller.plateform;

import com.csair.category.entity.Category;
import com.csair.category.repository.CategoryRepository;
import com.csair.category.service.CategoryService;
import com.csair.util.CommArray;
import com.csair.util.JsonUtilTemp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.List;

/**
 * Created by dnys on 2016/11/16.
 */
//@Controller
//@RequestMapping(value="/category")
//public class CategoryController {
//    @Autowired
//    private CategoryService categoryService;
//    @RequestMapping(name="/test")
//    public ModelAndView test(ModelAndView modelView){
//        Category category = new Category();
//        category.setName("jack");
//        category.setSort(1);
//        category.setStatus("1");
//        categoryService.saveCategory(category);
//        return new ModelAndView("login","category",category);
//    }
//}
@Controller
@RequestMapping(value="/pc/category/*")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private CategoryRepository categoryRepository;

    /**
     * 类目列表
     * @param request
     * @return
     */
    @RequestMapping(value="/list")
    public String selectCategory(HttpServletRequest request, String msg){
        List<Category> categories =  categoryService.findAll();

        if(categories.size()>0){
            request.setAttribute("categories",categories);

        }
        request.setAttribute("msg",msg);
        return "pc/category/list";
    }

    /**
     * 保存类目
     * @param request
     * @param category
     * @param response
     */
    @RequestMapping(value = "ajax_category_edit")
    public void ajax_category_edit(HttpServletRequest request,Category category,HttpServletResponse response){
        try{

            categoryRepository.save(category);
            JsonUtilTemp.returnSucessJson(response,"添加成功");
        }catch (Exception e){
            JsonUtilTemp.returnFailJson(response,e.getMessage());
        }



    }

    /**
     * 添加分类
     * @param request
     * @param response
     */
    @RequestMapping(value = "/addcategory")
    public String addCategory(HttpServletRequest request,Category category,HttpServletResponse response){

       return "pc/category/addcategory";

    }

    /**
     * 添加子分类
     * @param request
     * @param response
     */
    @RequestMapping(value = "/addchildrenCategory")
    public String addchildrencategory(HttpServletRequest request,Integer parentid,String parentname,HttpServletResponse response){
        try {
            parentname =  java.net.URLDecoder.decode(parentname,"utf-8");
            request.setAttribute("parentname",parentname);
            request.setAttribute("parentid",parentid);
        } catch (Exception e) {
            e.printStackTrace();
        }


        return "pc/category/addchildrenCategory";

    }
    @RequestMapping(value = "/listchildrenCategory")
    public void listchildrenCategory(HttpServletRequest request,Integer parentid,HttpServletResponse response){
        try{
            List<Category> categories = categoryService.findAllChildrenByParentid(parentid);
            JsonUtilTemp.returnObjAndSuccessJson(categories,response);
        }catch (Exception e){
            e.printStackTrace();
            JsonUtilTemp.returnFailJson(response,"查询失败,"+e.getMessage());
        }



    }

}
