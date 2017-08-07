package com.csair.util;

/**
 * Created by Administrator on 2017\7\21 0021.
 */
public class Const {
    /**静态文件*/
    public static final String[] RESOURCES =  new String[] { "jpg", "png", "gif", "css","js", "swf", "ttf", "woff","mp4","webm" };
    public static String[] arr_sex = {"", "男", "女"};

    public String[] getArr_sex() {
        return arr_sex;
    }

    public void setArr_sex(String[] arr_sex) {
        this.arr_sex = arr_sex;
    }
    public static  final Integer PAGE_SIZE=2;

}
