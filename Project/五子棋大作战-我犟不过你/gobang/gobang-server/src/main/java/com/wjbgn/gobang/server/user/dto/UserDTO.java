package com.wjbgn.gobang.server.user.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.wjbgn.gobang.server.utils.PageDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * Description:
 * Create Date: 2022-03-29T11:34:09.441
 *
 * @author wjbgn
 * @version 1.0
 */
@Data
@ApiModel(value = "UserDTO", description = "数据传输对象UserDTO")
public class UserDTO extends PageDTO {

    /**
     *
     */
    @ApiModelProperty(notes = "")
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long id;

    /**
     * 用户名
     */
    @ApiModelProperty(notes = "用户名")
    private String username;

    /**
     * 密码
     */
    @ApiModelProperty(notes = "密码")
    private String password;

    /**
     * 邮箱
     */
    @ApiModelProperty(notes = "邮箱")
    private String email;

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

    private String token;

    public UserDTO(String username, String token) {
        this.username = username;
        this.token = token;
    }

    public UserDTO() {
    }
}
