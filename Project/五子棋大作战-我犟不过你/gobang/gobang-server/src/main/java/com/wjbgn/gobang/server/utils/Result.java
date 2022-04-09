package com.wjbgn.gobang.server.utils;

import com.wjbgn.gobang.server.enums.CommonReturnEnum;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

/**
 * description: 公共返回对象封装
 *
 * @author: weirx
 * @time: 2022/1/18 13:35
 */
@Data
@ApiModel(value = "返回对象封装", description = "返回对象封装")
public class Result<T> implements Serializable {
    private static final long serialVersionUID = 1L;

    @ApiModelProperty(notes = "返回码", required = true)
    private int code;

    @ApiModelProperty(notes = "返回数据")
    private T data;

    @ApiModelProperty(notes = "返回信息", required = true)
    private String msg;

    public Result() {

    }

    /**
     * description: 成功返回, 不指定参数
     *
     * @return: com.wjbgn.stater.dto.Result<T>
     * @author: weirx
     * @time: 2022/1/18 13:37
     */
    public static <T> Result<T> success() {
        return restResult(null, CommonReturnEnum.SUCCESS.getCode(), CommonReturnEnum.SUCCESS.getName());
    }

    /**
     * description: 成功返回，指定msg
     *
     * @param msg
     * @return: com.wjbgn.stater.dto.Result<T>
     * @author: weirx
     * @time: 2022/1/18 13:38
     */
    public static <T> Result<T> success(String msg) {
        return restResult(null, CommonReturnEnum.SUCCESS.getCode(), msg);
    }

    /**
     * description: 成功返回，指定对象
     *
     * @param data
     * @return: com.wjbgn.stater.dto.Result<T>
     * @author: weirx
     * @time: 2022/1/18 13:38
     */
    public static <T> Result<T> success(T data) {
        return restResult(data, CommonReturnEnum.SUCCESS.getCode(), CommonReturnEnum.SUCCESS.getName());
    }

    /**
     * description: 成功返回，指定msg,data
     *
     * @param msg
     * @param data
     * @return: com.wjbgn.stater.dto.Result<T>
     * @author: weirx
     * @time: 2022/1/18 13:38
     */
    public static <T> Result<T> success(String msg, T data) {
        return restResult(data, CommonReturnEnum.SUCCESS.getCode(), msg);
    }

    /**
     * description: 成功返回，指定code,msg,data
     *
     * @param code
     * @param msg
     * @param data
     * @return: com.wjbgn.stater.dto.Result<T>
     * @author: weirx
     * @time: 2022/1/18 13:38
     */
    public static <T> Result<T> success(int code, String msg, T data) {
        return restResult(data, code, msg);
    }


    /**
     * description: 失败返回
     *
     * @return: com.wjbgn.stater.dto.Result<T>
     * @author: weirx
     * @time: 2022/1/18 13:38
     */
    public static <T> Result<T> failed() {
        return restResult(null, CommonReturnEnum.FAILED.getCode(), CommonReturnEnum.FAILED.getName());
    }

    /**
     * description: 失败返回，指定msg
     *
     * @param msg
     * @return: com.wjbgn.stater.dto.Result<T>
     * @author: weirx
     * @time: 2022/1/18 13:38
     */
    public static <T> Result<T> failed(String msg) {
        return restResult(null, CommonReturnEnum.FAILED.getCode(), msg);
    }

    /**
     * description: 失败返回，指定msg,data
     *
     * @param msg
     * @param data
     * @return: com.wjbgn.stater.dto.Result<T>
     * @author: weirx
     * @time: 2022/1/18 13:39
     */
    public static <T> Result<T> failed(String msg, T data) {
        return restResult(data, CommonReturnEnum.FAILED.getCode(), msg);
    }

    /**
     * description: 失败返回，指定code,msg,data
     *
     * @param code
     * @param msg
     * @param data
     * @return: com.wjbgn.stater.dto.Result<T>
     * @author: weirx
     * @time: 2022/1/18 13:39
     */
    public static <T> Result<T> failed(int code, String msg, T data) {
        return restResult(data, code, msg);
    }

    private static <T> Result<T> restResult(T data, int code, String msg) {
        Result<T> apiResult = new Result();
        apiResult.setCode(code);
        apiResult.setData(data);
        apiResult.setMsg(msg);
        return apiResult;
    }
}