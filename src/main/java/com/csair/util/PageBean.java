package com.csair.util;

import java.util.List;

/**
 * 分页显示的标准类,基本操作,是先给予-当前页数一共的数据条数-每页显示的条数,
 *  然后在初始化该类,得到总共页数,和开始序号和结束序号,
 *  然后数据库分页用到开始序号和结束序号,得到数据集合后赋值给该类的list属性,
 *
 * 然后把该类发送到jsp页面,进行访问
 * @author admin
 *
 * @param <T>
 */
public class PageBean<T> {
    private int pageIndex;//当前页数
    private int pageSize;//一共的页数
    private int count;//数据条数
    private int pageCount;//每页的数据条数
    private int start;//起始数据位置
    private int end;//结束
    private List<T> list=null;

    public void init(){
        /*根count 和pageCount计算页数pageSize
         */
        int pageSize_x=(int)count/pageCount;
        if(count>=pageCount){
            this.pageSize=count%pageCount==0?pageSize_x:pageSize_x+1;
        }else{
            this.pageSize=1;
        }
        //判断页数和当前页数
        if(pageIndex>pageSize){
            pageIndex=pageSize;
        }
        if(pageIndex<1){
            pageIndex=1;
        }
        //根据当前页计算起始和结束条目
        this.start=(pageIndex-1)*pageCount+1;
        this.end=pageIndex*pageCount;
    }

    public PageBean(int pageIndex, int count, int pageCount) {
        super();
        this.pageIndex = pageIndex;
        this.count = count;
        this.pageCount = pageCount;
    }

    public PageBean(int pageIndex, int count, int pageCount, List<T> list) {
        super();
        this.pageIndex = pageIndex;
        this.count = count;
        this.pageCount = pageCount;
        this.list = list;
    }

    public PageBean() {
        super();
        // TODO Auto-generated constructor stub
    }
    @Override
    public String toString() {
        return "PageBean [count=" + count + ", end=" + end + ", list=" + list
                + ", pageCount=" + pageCount + ", pageIndex=" + pageIndex
                + ", pageSize=" + pageSize + ", start=" + start + "]";
    }
    public int getPageIndex() {
        return pageIndex;
    }
    public void setPageIndex(int pageIndex) {
        this.pageIndex = pageIndex;
    }
    public int getPageSize() {
        return pageSize;
    }
    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }
    public int getCount() {
        return count;
    }
    public void setCount(int count) {
        this.count = count;
    }
    public int getPageCount() {
        return pageCount;
    }
    public void setPageCount(int pageCount) {
        this.pageCount = pageCount;
    }
    public int getStart() {
        return start;
    }
    public void setStart(int start) {
        this.start = start;
    }
    public int getEnd() {
        return end;
    }
    public void setEnd(int end) {
        this.end = end;
    }
    public List<T> getList() {
        return list;
    }
    public void setList(List<T> list) {
        this.list = list;
    }

}