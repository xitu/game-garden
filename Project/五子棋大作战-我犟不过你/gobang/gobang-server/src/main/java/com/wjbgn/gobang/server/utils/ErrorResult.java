package com.wjbgn.gobang.server.utils;

import lombok.Data;

import java.util.Date;

@Data
public class ErrorResult {

    private Integer code;
    private String message;
    private String path;
    private Boolean success;
    private Date timestamp;
}