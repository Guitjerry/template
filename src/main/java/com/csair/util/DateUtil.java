package com.csair.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 日期操作工具
 * Created by heyy on 2017/2/20.
 */
public class DateUtil {

    public final static String DATETIME = "yyyy-MM-dd HH:mm:ss";
    public final static String DATE = "yyyy-MM-dd";

    /**
     * 获取指定日期的前或后N天
     * @param date（指定日期）
     * @param count（负号指某日前）
     * @return
     */
    public static Date getNextDay(Date date,Integer count) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, count);
        date = calendar.getTime();
        return date;
    }
    /**
     * 日期类型转换成字符串类型
     * @param date
     * @return
     */
    public static String formatToStr(Date date){
        return formatToStr(date, DATETIME);
    }
    /**
     * 日期类型转换成字符串类型
     * @param date
     * @return
     */
    public static String formatToSimpleStr(Date date){
        return formatToStr(date, DATE);
    }

    /**
     * 日期类型转换成字符串类型
     * @param date
     * @param format
     * @return
     */
    public static String formatToStr(Date date, String format){
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        String formatTime = sdf.format(date);
        return formatTime;
    }

    /**
     * 字符串类型转换成日期类型
     * @param dateTime
     * @return
     */
    public static Date formatToDate(String dateTime){
        return formatToDate(dateTime, DATETIME);
    }

    /**字符串类型转换成日期类型
     *
     * @param dateTime
     * @return
     */
    public static Date formatToSimpleDate(String dateTime){
        return formatToDate(dateTime, DATE);
    }
    /**
     * 字符串类型转换成日期类型
     * @param dateTime
     * @param format
     * @return
     */
    public static Date formatToDate(String dateTime, String format){
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        Date date = null;
        try{
            date = sdf.parse(dateTime);
        }catch (Exception e){
            e.printStackTrace();
        }
        return date;
    }


    /**
     * 获取当天0点时间
     * @return
     */
    public static Date getNowDate(){
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.HOUR, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MINUTE, 0);
        return calendar.getTime();
    }
    public static String getNowDates(){
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        return df.format(new Date());
    }

    public static double getDatediff(Date dateto,Date datefrom){
        long beginTime = datefrom.getTime();
        long endTime = dateto.getTime();
        double betweenhours = ((double)(endTime - beginTime)) / (1000 * 60 * 60);
        return betweenhours;
    }
    public static double getDateDaydiff(Date dateto,Date datefrom){
        long beginTime = datefrom.getTime();
        long endTime = dateto.getTime();
        double betweendays = ((double)(endTime - beginTime)) / (1000 * 60 * 60*24);
        return betweendays;
    }
    public static double getDatediffSe(Date dateto,Date datefrom){
        long beginTime = datefrom.getTime();
        long endTime = dateto.getTime();
        double betweenhours = ((double)(endTime - beginTime)) / (1000);
        return betweenhours;
    }

    public static void main(String[] args) {
        System.out.println( getDatediff(DateUtil.formatToDate("2017-05-23 16:17:20"),DateUtil.formatToDate("2017-05-21 05:01:03")));
    }


}
