package com.csair.util;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.io.IOException;

/**
 * Created by mac on 16/12/14.
 * JSOp工具类
 */
public class JsopUtil {
    public static Document connect(String url){
        if (url == null || url.isEmpty())
        {
            throw new IllegalArgumentException("The input url('" + url + "') is invalid!");
        }
        try
        {
            return Jsoup.connect(url).timeout(100 * 1000).get();
        } catch (IOException e)
        {
            e.printStackTrace();
            return null;
        }
    }
}
