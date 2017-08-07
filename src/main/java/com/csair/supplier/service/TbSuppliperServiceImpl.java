package com.csair.supplier.service;

import com.csair.supplier.entity.TbSupplier;
import com.csair.supplier.repository.TbSupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Service(value = "")
public class TbSuppliperServiceImpl implements TbSuppliperService{
    @PersistenceContext(unitName="localPU")
    @Qualifier(value = "entityManagerFactory")
    protected EntityManager em;
    @Autowired
    private TbSupplierRepository tbSupplierRepository;
    public void updateTbSuppliper(TbSupplier tbSupplier) {

    }
}
