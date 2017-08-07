package com.csair.spring.simpleSpringIoc;

/**
 * 存放解析bean的XML信息.
 */
public class SpringBean {
    private String name;
    private String type;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}

