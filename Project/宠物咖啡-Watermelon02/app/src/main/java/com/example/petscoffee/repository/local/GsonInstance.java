package com.example.petscoffee.repository.local;

import com.google.gson.Gson;

public class GsonInstance {
    //单例程gson，注册了InterfaceAdapter,用于序列化CoffeeShop对象
    private static GsonInstance gsonInstance;
    private static Gson gson;

    public static Gson getGsonInstance() {
        if (gsonInstance == null) {
            gsonInstance = new GsonInstance();
        }
        return getGson();
    }

    private static Gson getGson() {
        if (gson == null) {
            gson = new Gson();
        }
        return gson;
    }
}
