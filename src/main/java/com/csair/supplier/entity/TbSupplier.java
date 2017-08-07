package com.csair.supplier.entity;

import javax.persistence.*;

/**
 * Created by mac on 16/12/18.
 * 供货商
 */
@Table(name = "TB_SUPPLIER")
@Entity
public class TbSupplier {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY) // MYSQL时可以这样使用自增
    @SequenceGenerator(name = "TestSequence", sequenceName = "SEQ_Test", allocationSize=1)
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name = "status")
    private int status;//0有效 1无效
    @Column(name = "createtime")
    private String createtime;
    @Column(name = "sort")
    private int sort;//排序
    @Column(name = "phone")
    private String phone;//手机号码
    @Column(name = "addr")
    private String addr;//地址
    @Column(name = "sex")
    private String sex;//性别
    @Column(name = "picurl")
    private String picurl;//头像地址
    @Column(name = "note")
    private String note;//说明
    @Column(name = "age")
    private String age;//年龄
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getCreatetime() {
        return createtime;
    }

    public void setCreatetime(String createtime) {
        this.createtime = createtime;
    }

    public int getSort() {
        return sort;
    }

    public void setSort(int sort) {
        this.sort = sort;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddr() {
        return addr;
    }

    public void setAddr(String addr) {
        this.addr = addr;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getPicurl() {
        return picurl;
    }

    public void setPicurl(String picurl) {
        this.picurl = picurl;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }
}
