package com.csair.redis;

import redis.clients.jedis.Jedis;

import java.util.List;

/**
 * Created by mac on 16/12/16.
 */
public class RedisTest {
    public static void main(String[] args) {
        Jedis jedis = new Jedis("localhost");
        jedis.rpush("messages", "Hello how are you?");

        jedis.rpush("messages", "Fine thanks. I'm having fun with redis.");

        jedis.rpush("messages", "I should look into this NOSQL thing ASAP");

        List<String> values = jedis.lrange("messages", 0, -1);

        System.out.println(values);
    }
}
