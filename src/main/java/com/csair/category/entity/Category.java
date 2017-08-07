package com.csair.category.entity;

import javax.persistence.*;

/**
 * 分类表
 * Created by dnys on 2016/11/16.
 */
@Entity
@Table(name="category")
public class Category {
    private static final long serialVersionUID = 1L;

    private Integer id;
    private Integer parentid;//父节点
    private String name;//分类名称
    private Integer sort;//排序
    private String code;//编码
    private int status;//状态
    private String parentname;
    @Id
    @TableGenerator(name = "myGenerator", table = "myidlist", pkColumnName = "keyname", pkColumnValue = "category", valueColumnName = "keyid", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "myGenerator")
    @Column(name = "id")
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    @Column(name="name")
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    @Column(name="sort")
    public Integer getSort() {
        return sort;
    }
    public void setSort(Integer sort) {
        this.sort = sort;
    }
    @Column(name="code")
    public String getCode() {
        return code;
    }
    public void setCode(String code) {
        this.code = code;
    }
    @Column(name="status")

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
    @Column(name="parentid")
    public Integer getParentid() {
        return parentid;
    }

    public void setParentid(Integer parentid) {
        this.parentid = parentid;
    }
    @Column(name="parentname")
    public String getParentname() {
        return parentname;
    }

    public void setParentname(String parentname) {
        this.parentname = parentname;
    }
}
