package com.csair.spring.simpleSpringIoc;

import org.apache.commons.collections.map.HashedMap;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import java.net.URL;
import java.util.*;

/**
 * 模拟Spring写一个Spring的容器
 * ApplicationContext context = new FileSystemXmlApplicationContext("src/applicationContext.xml");
 * Category category = (Category) context.getBean("Category");
 * <bean id="" class=""></bean>
 *
 * 1.定义存储bean的实体 SpringBeanConfig(id,type)
 * 2.定义List<SpringBean> beanInits 存放解析的Bean,定义Map  beanMap存放(key 为bean的id  value为bean实体)
 * 3.新增方法praseXml(String xmlname)解析testSpring.xml把bean信息赋值给SpringBean保存到beanInits中
 * 4.新增方法parseBean实例化bean，利用反射得到实体并保存到beanMap中
 */
public class TestApplicationContext {
    private String xmlname;
    private List<SpringBean> beanInits = new ArrayList<SpringBean>();//存放解析的Bean
    private Map<String,Object> beanMap = new HashMap<String, Object>();//beanMap存放(key 为bean的id  value为bean实体)

    public TestApplicationContext(String xmlname) {
        this.xmlname = xmlname;
        parseXml(xmlname);
    }
    public String getXmlname() {
        return xmlname;
    }

    public void setXmlname(String xmlname) {
        this.xmlname = xmlname;
    }

    public List<SpringBean> getBeanInits() {
        return beanInits;
    }

    public void setBeanInits(List<SpringBean> beanInits) {
        this.beanInits = beanInits;
    }

    public Map<String, Object> getBeanMap() {
        return beanMap;
    }

    public void setBeanMap(Map<String, Object> beanMap) {
        this.beanMap = beanMap;
    }

    /**
     * 解析配置文件 把bean信息赋值给SpringBean保存到beanInits中
     * @param xmlname 文件名
     * @return
     */
    public void parseXml(String xmlname){
        //创建一个读取器
        SAXReader saxReader = new SAXReader();
        Document document=null;

        try {
            //获取要读取的配置文件的路径
            URL url = this.getClass().getClassLoader().getResource(xmlname);
            document = saxReader.read(url);
            //获取根元素
            Element rootElement = document.getRootElement();
            List<Element> elements = rootElement.elements();
            for(Element element:elements){
                String id = element.attributeValue("id");
                String type = element.attributeValue("class");
                SpringBean springBean = new SpringBean();
                springBean.setName(id);
                springBean.setType(type);
                beanInits.add(springBean);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    /**
     * 把bean名称，与实例化的bean放到Map中
     */
    public  void  parseBean(){
        if(beanInits.size()>0&&beanInits!=null){
            for(SpringBean springBean:beanInits){
                if(springBean.getName()!=null&&!springBean.getName().equals("")){
                    try {
                        Object obj = Class.forName(springBean.getType()).newInstance();
                        beanMap.put(springBean.getName(),obj);
                    } catch (Exception e) {
                        System.out.println("bean实例化失败");
                        e.printStackTrace();
                    }
                }
            }
        }
    }

    /**
     * 根据bean名称获取bean
     * @param beanname
     * @return
     */
    public Object getBean(String beanname){
        return beanMap.get(beanname);
    }

    public static void main(String[] args) {
        //解析配置文件
        TestApplicationContext testApplicationContext = new TestApplicationContext("com/csair/spring/simpleSpringIoc/BeanConfig.xml");
        //实例化bean
        testApplicationContext.parseBean();
        MyBean myBean =(MyBean) testApplicationContext.getBean("mybean");
    }
}
