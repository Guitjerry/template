package com.csair.category.service;

import com.csair.category.entity.Category;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

/**
 * Created by Administrator on 2017\7\25 0025.
 */
@Service(value = "categoryService")
public class CategoryServiceImpl implements CategoryService{
    @PersistenceContext(unitName="localPU")
    @Qualifier(value = "entityManagerFactory")
    protected EntityManager em;
    public List<Category> findAll() {
        Query query = em.createQuery(" from Category where parentid is null");
        return query.getResultList();
    }

    public List<Category> findAllChildrenByParentid(Integer parentid) {
        String hql =" from Category where parentid=?1";
        Query query = em.createQuery(hql);
        query.setParameter(1,parentid);
        return query.getResultList();
    }
}
