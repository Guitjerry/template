package com.csair.category.service;

import com.csair.category.entity.Category;

import java.util.List;

/**
 * Created by Administrator on 2017\7\25 0025.
 */
public interface CategoryService {
    /**
     * 查找所有父类分类
     * @return
     */
    public List<Category> findAll();

    /**
     * 查询子类
     * @param parentid
     * @return
     */
    public List<Category> findAllChildrenByParentid(Integer parentid);
}
