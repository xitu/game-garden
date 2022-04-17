package com.wjbgn.gobang.server.user.entity;

import com.alibaba.fastjson.annotation.JSONField;
import com.baomidou.mybatisplus.annotation.*;
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
@TableName(value = "gobang_user_integral")
public class UserIntegralDO {

    /**
     *
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    public UserIntegralDO(String username, Integer integral, String type, LocalDateTime createTime) {
        this.username = username;
        this.integral = integral;
        this.type = type;
        this.createTime = createTime;
    }


    public UserIntegralDO(String username) {
        this.username = username;
    }

    public UserIntegralDO(Integer integral) {
        this.integral = integral;
    }

    public UserIntegralDO(String username, String type) {
        this.username = username;
        this.type = type;
    }

    public UserIntegralDO() {
    }

    /**
     *
     */
    private String username;

    /**
     *
     */
    private Integer integral;

    /**
     * 积分类型
     */
    private String type;

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
