package com.csair.util;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

/**
 * Created by dnys on 2016/11/16.
 */
public final class JPAUtils {
    private static EntityManagerFactory entityManagerFactory;
    private static ThreadLocal<EntityManager> ems = new ThreadLocal<EntityManager>();

    static {
        entityManagerFactory = Persistence.createEntityManagerFactory("helloworld");
    }

    public static EntityManagerFactory getEntityManagerFactory() {
        return entityManagerFactory;
    }

    public static EntityManager getEntityManager() {
        EntityManager em = ems.get();
        if (null == em) {
            em = entityManagerFactory.createEntityManager();
            ems.set(em);
        }
        return em;
    }

    public static void freeEntityManager() {
        EntityManager em = ems.get();
        if (null != em) {
            ems.remove();
            em.close();
        }
    }
}