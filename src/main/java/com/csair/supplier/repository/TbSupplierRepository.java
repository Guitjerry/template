package com.csair.supplier.repository;

import com.csair.supplier.entity.TbSupplier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Administrator on 2017\7\27 0027.
 */
public interface TbSupplierRepository extends JpaRepository<TbSupplier,Integer>{
    Page<TbSupplier> findAll(Pageable pageable);
}
