package com.csair.controller.plateform;

import com.csair.entity.PageShow;
import com.csair.supplier.entity.TbSupplier;
import com.csair.supplier.repository.TbSupplierRepository;
import com.csair.util.CommArray;
import com.csair.util.Const;
import com.csair.util.JsonUtilTemp;
import com.csair.util.PropertyUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Created by Administrator on 2017\7\27 0027.
 */
@Controller
@RequestMapping("/pc/tbsupplier/*")
public class TbSupplierController {
    @Autowired
    private TbSupplierRepository tbSupplierRepository;
    @RequestMapping(value = "list")
    public String listSupplers(HttpServletRequest request, HttpServletResponse response, String msg, Integer pageNo){
        pageNo=pageNo==null?1:pageNo;
        Pageable pageable = new PageRequest(pageNo-1,Const.PAGE_SIZE,Sort.Direction.DESC,"id");//按age排序

        Page<TbSupplier> tbSupplierPage = tbSupplierRepository.findAll(pageable);
        int allcount = tbSupplierRepository.findAll().size();//总共的数量
        List<TbSupplier> supplierList =tbSupplierPage.getContent();//当前页查询的数据

        PageShow pageShow = new PageShow(allcount, Const.PAGE_SIZE,pageNo-1);
        String picth = PropertyUtil.getProperty("imagepath");
        if(supplierList!=null&&supplierList.size()>0){
            request.setAttribute("supplierList",supplierList);
            request.setAttribute("picth",picth);

            request.setAttribute("pageShow",pageShow);
            request.setAttribute("msg",msg);
        }
        return "pc/tbsupplier/list";
    }
    @RequestMapping(value = "addSupplier")
    public String addSupplier(HttpServletRequest request, HttpServletResponse response, String msg,Integer id){
        CommArray commArray = new CommArray();
        request.setAttribute("CommArray",commArray);
        if(id!=null&&id>0){
            TbSupplier tbSupplier = tbSupplierRepository.findOne(id);
            request.setAttribute("tbSupplier",tbSupplier);
        }
        return "pc/tbsupplier/addSupplier";
    }
    @RequestMapping(value = "ajax_supplier_edit")
    public void ajax_supplier_edit(HttpServletRequest request, HttpServletResponse response, TbSupplier tbSupplier,Integer supplierid){
        tbSupplierRepository.save(tbSupplier);
        //更新
        if(tbSupplier!=null&&tbSupplier.getId()>0){
            tbSupplierRepository.saveAndFlush(tbSupplier);
        }
        JsonUtilTemp.returnSucessJson(response,"保存成功");
    }
    @RequestMapping(value = "ajax_supplier_delete")
    public void ajax_supplier_delete(HttpServletRequest request, HttpServletResponse response, Integer supplierid){
        TbSupplier tbSupplier = tbSupplierRepository.findOne(supplierid);
        tbSupplierRepository.delete(supplierid);
        //更新

        JsonUtilTemp.returnSucessJson(response,"删除成功");
    }
}
