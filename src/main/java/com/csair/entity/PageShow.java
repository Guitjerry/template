package com.csair.entity;

public class PageShow {
    private int allcount;//总条数
    private int size;//一页显示的条数
    private int current;//当前页数

    public int getAllcount() {
        return allcount;
    }

    public void setAllcount(int allcount) {
        this.allcount = allcount;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public int getCurrent() {
        return current;
    }

    public void setCurrent(int current) {
        this.current = current;
    }

    public PageShow(int allcount, int size, int current) {
        this.allcount = allcount;
        this.size = size;
        this.current = current;
    }
}
