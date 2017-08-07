package com.csair.mode.Factory;

/**
 * Created by mac on 16/12/20.
 */
public class BenChiDriver implements Driver2 {
    @Override
    public Car driver() {
        return new BenChiCar();
    }
}
