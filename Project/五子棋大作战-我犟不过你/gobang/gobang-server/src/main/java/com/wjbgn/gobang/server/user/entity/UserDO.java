package com.wjbgn.gobang.server.user.entity;

import com.alibaba.fastjson.annotation.JSONField;
import com.baomidou.mybatisplus.annotation.*;
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
@TableName(value = "gobang_user")
public class UserDO {
    public UserDO(String username) {
        this.username = username;
    }

    public UserDO() {
    }

    /**
     *
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 用户名
     */
    private String username;

    /**
     * 密码
     */
    private String password;

    /**
     * 邮箱
     */
    private String email;

    /**
     *
     */
    @TableField(fill = FieldFill.INSERT)
    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;

    /**
     *
     */
    @TableField(fill = FieldFill.INSERT_UPDATE)
    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updateTime;

    /**
     * 是否删除，1是，0否
     */
    private Integer isDelete;

}
