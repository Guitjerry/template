package com.csair.spring.simpleSpringIoc;

import java.util.concurrent.atomic.AtomicLong;

/**
 * 要获取的bean.
 */
public class MyBean {

    public MyBean() {
    }

    private String account;
    private int status;

    public String getAccount() {
        System.out.println("mybean创建成功");
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
