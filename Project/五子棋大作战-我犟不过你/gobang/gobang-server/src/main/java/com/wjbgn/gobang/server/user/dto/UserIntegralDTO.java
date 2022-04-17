package com.wjbgn.gobang.server.user.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.wjbgn.gobang.server.utils.PageDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * Description:
 * Create Date: 2022-04-07T10:29:18.521
 *
 * @author wjbgn
 * @version 1.0
 */
@Data
@ApiModel(value = "UserIntegralDTO", description = "数据传输对象UserIntegralDTO")
public class UserIntegralDTO extends PageDTO {

    /**
     *
     */
    @ApiModelProperty(notes = "")
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long id;

    /**
     *
     */
    @ApiModelProperty(notes = "")
    private String username;

    /**
     *
     */
    @ApiModelProperty(notes = "")
    private Integer integral;

    /**
     * 积分类型
     */
    @ApiModelProperty(notes = "积分类型")
    private String type;

    /**
     *
     */
    @ApiModelProperty(notes = "")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;

    /**
     *
     */
    @ApiModelProperty(notes = "")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updateTime;

    /**
     * 是否删除，1是，0否
     */
    @ApiModelProperty(notes = "是否删除，1是，0否")
    private Integer isDelete;

}
