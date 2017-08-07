package com.csair.util;

/**
 * Created by Administrator on 2017\7\28 0028.
 */
public class CommArray {
    public CommArray() {
    }
    /**
     * 静态初始化器，线程安全
     */
    public static final CommArray instance = new CommArray();

    public static CommArray getInstance() {
        return instance;
    }
    public static String[] arr_sex = {"请选择", "男", "女"};

    public String[] getArr_sex() {
        return arr_sex;
    }

    public void setArr_sex(String[] arr_sex) {
        this.arr_sex = arr_sex;
    }
}
