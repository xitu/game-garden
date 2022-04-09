package com.wjbgn.gobang.server.utils;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * description: 分页参数父类
 * @author: weirx
 * @time: 2022/1/18 13:37
 */
@Data
public class PageDTO {

    @ApiModelProperty(notes  = "查询条数")
    private Integer limit;

    @ApiModelProperty(notes  = "页数")
    private Integer page;
}
