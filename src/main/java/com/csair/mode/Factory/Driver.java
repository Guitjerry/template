package com.csair.mode.Factory;

/**
 * Created by mac on 16/12/20.
 */
public class Driver {
    public static Car driverCar(String s){
        if("benchi".equals(s)){
            return new BenChiCar();
        }
        if("baoma".equals(s)){
            return new BaoMaCar();
        }
        return null;
    }
}
