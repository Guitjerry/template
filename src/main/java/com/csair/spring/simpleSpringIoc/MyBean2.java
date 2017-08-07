package com.csair.spring.simpleSpringIoc;

/**
 * Created by mac on 16/12/21.
 */
public class MyBean2 {
    private String author;
    private int sort;

    public MyBean2() {
    }

    public String getAuthor() {
        System.out.println("mybean2创建成功");
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getSort() {
        return sort;
    }

    public void setSort(int sort) {
        this.sort = sort;
    }
}
