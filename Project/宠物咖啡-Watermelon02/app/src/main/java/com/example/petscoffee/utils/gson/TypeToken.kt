package com.example.petscoffee.utils.gson

import java.lang.reflect.ParameterizedType
import java.lang.reflect.Type

abstract class TypeToken<T> {
    private val type: Type

    init {
        val genericSuperclass = this::class.java.genericSuperclass
        /*if(genericSuperclass instanceof Class){
            throw new RuntimeException("Missing type parameter.");
        }*/
        val parameterizedType = genericSuperclass as ParameterizedType
        val typeArguments = parameterizedType.getActualTypeArguments()
        type = typeArguments[0]
    }

    fun getType(): Type {
        return type
    }
}
